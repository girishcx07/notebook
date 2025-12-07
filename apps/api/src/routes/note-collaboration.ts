import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db, note, noteFollower, noteViewer } from "@notebook/db";
import {
  followNoteSchema,
  unfollowNoteSchema,
  getNoteFollowersSchema,
  recordNoteViewSchema,
  getNoteViewersSchema,
  getNoteStatsSchema,
  archiveNoteSchema,
} from "@notebook/schemas";
import { eq, and, sql, desc } from "drizzle-orm";

const noteCollaborationRoutes = new Hono()
  // Follow a note
  .post("/:id/follow", zValidator("param", followNoteSchema), async (c) => {
    const { id: noteId } = c.req.valid("param");
    const userId = c.req.header("x-user-id"); // TODO: Get from auth

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    // Check if note exists and is public
    const [n] = await db
      .select()
      .from(note)
      .where(eq(note.id, noteId))
      .limit(1);

    if (!n) {
      return c.json({ error: "Note not found" }, 404);
    }

    if (n.status !== "public") {
      return c.json({ error: "Can only follow public notes" }, 403);
    }

    try {
      // Insert follower
      await db.insert(noteFollower).values({
        userId,
        noteId,
      });

      // Increment follower count
      await db
        .update(note)
        .set({
          followerCount: sql`${note.followerCount} + 1`,
        })
        .where(eq(note.id, noteId));

      return c.json({ success: true }, 201);
    } catch (error: any) {
      if (error.code === "23505") {
        return c.json({ error: "Already following" }, 409);
      }
      throw error;
    }
  })

  // Unfollow a note
  .delete("/:id/follow", zValidator("param", unfollowNoteSchema), async (c) => {
    const { id: noteId } = c.req.valid("param");
    const userId = c.req.header("x-user-id"); // TODO: Get from auth

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const deleted = await db
      .delete(noteFollower)
      .where(
        and(eq(noteFollower.noteId, noteId), eq(noteFollower.userId, userId))
      )
      .returning();

    if (deleted.length === 0) {
      return c.json({ error: "Not following" }, 404);
    }

    // Decrement follower count
    await db
      .update(note)
      .set({
        followerCount: sql`${note.followerCount} - 1`,
      })
      .where(eq(note.id, noteId));

    return c.json({ success: true });
  })

  // Get note followers
  .get(
    "/:id/followers",
    zValidator("param", followNoteSchema),
    zValidator("query", getNoteFollowersSchema),
    async (c) => {
      const { id: noteId } = c.req.valid("param");
      const { limit, offset } = c.req.valid("query");

      const followers = await db
        .select({
          userId: noteFollower.userId,
          followedAt: noteFollower.followedAt,
        })
        .from(noteFollower)
        .where(eq(noteFollower.noteId, noteId))
        .limit(limit)
        .offset(offset);

      return c.json(followers);
    }
  )

  // Record a note view
  .post("/:id/view", zValidator("param", recordNoteViewSchema), async (c) => {
    const { id: noteId } = c.req.valid("param");
    const userId = c.req.header("x-user-id"); // TODO: Get from auth

    if (!userId) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    try {
      // Upsert viewer record
      const existing = await db
        .select()
        .from(noteViewer)
        .where(
          and(eq(noteViewer.noteId, noteId), eq(noteViewer.userId, userId))
        )
        .limit(1);

      if (existing.length > 0) {
        // Update existing
        await db
          .update(noteViewer)
          .set({
            lastViewedAt: new Date(),
            viewCount: sql`${noteViewer.viewCount} + 1`,
          })
          .where(
            and(eq(noteViewer.noteId, noteId), eq(noteViewer.userId, userId))
          );
      } else {
        // Insert new
        await db.insert(noteViewer).values({
          userId,
          noteId,
          viewCount: 1,
        });

        // Increment unique viewer count
        await db
          .update(note)
          .set({
            viewerCount: sql`${note.viewerCount} + 1`,
          })
          .where(eq(note.id, noteId));
      }

      return c.json({ success: true });
    } catch (error) {
      console.error("Error recording view:", error);
      return c.json({ error: "Failed to record view" }, 500);
    }
  })

  // Get note viewers
  .get(
    "/:id/viewers",
    zValidator("param", followNoteSchema),
    zValidator("query", getNoteViewersSchema),
    async (c) => {
      const { id: noteId } = c.req.valid("param");
      const { limit } = c.req.valid("query");

      const viewers = await db
        .select({
          userId: noteViewer.userId,
          lastViewedAt: noteViewer.lastViewedAt,
          viewCount: noteViewer.viewCount,
        })
        .from(noteViewer)
        .where(eq(noteViewer.noteId, noteId))
        .orderBy(desc(noteViewer.lastViewedAt))
        .limit(limit);

      return c.json(viewers);
    }
  )

  // Get note stats
  .get("/:id/stats", zValidator("param", getNoteStatsSchema), async (c) => {
    const { id: noteId } = c.req.valid("param");

    const [n] = await db
      .select({
        followerCount: note.followerCount,
        viewerCount: note.viewerCount,
        status: note.status,
      })
      .from(note)
      .where(eq(note.id, noteId))
      .limit(1);

    if (!n) {
      return c.json({ error: "Note not found" }, 404);
    }

    // Get total views
    const totalViews = await db
      .select({ total: sql<number>`sum(${noteViewer.viewCount})` })
      .from(noteViewer)
      .where(eq(noteViewer.noteId, noteId));

    return c.json({
      followerCount: n.followerCount,
      viewerCount: n.viewerCount,
      totalViews: totalViews[0]?.total || 0,
      status: n.status,
    });
  })

  // Archive/unarchive note
  .patch(
    "/:id/archive",
    zValidator("param", followNoteSchema),
    zValidator("json", archiveNoteSchema),
    async (c) => {
      const { id: noteId } = c.req.valid("param");
      const { archived } = c.req.valid("json");
      const userId = c.req.header("x-user-id"); // TODO: Get from auth

      if (!userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Check ownership
      const [n] = await db
        .select()
        .from(note)
        .where(eq(note.id, noteId))
        .limit(1);

      if (!n) {
        return c.json({ error: "Note not found" }, 404);
      }

      if (n.createdBy !== userId) {
        return c.json({ error: "Only owner can archive note" }, 403);
      }

      await db
        .update(note)
        .set({
          archived,
          archivedAt: archived ? new Date() : null,
        })
        .where(eq(note.id, noteId));

      return c.json({ success: true, archived });
    }
  );

export default noteCollaborationRoutes;
