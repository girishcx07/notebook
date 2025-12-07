import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db, note, workspace } from "@notebook/db";
import {
  createNoteSchema,
  getNoteByIdSchema,
  getNoteByUserIdSchema,
  getRecentNotesSchema,
  searchNoteSchema,
  updateNoteSchema,
} from "@notebook/schemas";
import { eq, desc, and } from "drizzle-orm";

const notesRoutes = new Hono()
  .post("/", zValidator("json", createNoteSchema), async (c) => {
    const data = c.req.valid("json");

    const [newNote] = await db
      .insert(note)
      .values({
        title: data.title,
        content: data.content,
        createdBy: data.userId,
        updatedBy: data.userId,
        workspaceId: data.workspaceId ?? null,
        status: data.status,
      })
      .returning();

    return c.json(newNote, 201);
  })

  .get(
    "/search",
    zValidator("query", searchNoteSchema),
    zValidator("json", getNoteByUserIdSchema),
    async (c) => {
      const { query } = c.req.valid("query");
      const { userId } = c.req.valid("json");

      const results = await db
        .select()
        .from(note)
        .where(and(eq(note.title, query), eq(note.createdBy, userId)))
        .orderBy(desc(note.createdAt));

      return c.json(results);
    }
  )

  .get("/recent", zValidator("query", getRecentNotesSchema), async (c) => {
    const { userId, limit } = c.req.valid("query");

    // Fetch recent notes
    const recentNotes = await db
      .select({
        id: note.id,
        title: note.title,
        content: note.content,
        updatedAt: note.updatedAt,
        pinned: note.pinned,
        workspaceId: note.workspaceId,
      })
      .from(note)
      .where(eq(note.createdBy, userId))
      .orderBy(desc(note.pinned), desc(note.updatedAt))
      .limit(limit);

    // Fetch recent workspaces
    const recentWorkspaces = await db
      .select({
        id: workspace.id,
        name: workspace.name,
        description: workspace.description,
        createdAt: workspace.createdAt,
      })
      .from(workspace)
      .where(eq(workspace.createdBy, userId))
      .orderBy(desc(workspace.createdAt))
      .limit(limit);

    // Combine and add type field
    const notesWithType = recentNotes.map((n) => ({
      ...n,
      type: "note" as const,
      name: n.title, // Alias for consistent interface
    }));

    const workspacesWithType = recentWorkspaces.map((w) => ({
      ...w,
      type: "workspace" as const,
      title: w.name, // Alias for consistent interface
      updatedAt: w.createdAt, // Use createdAt as updatedAt for workspaces
      pinned: false, // Workspaces don't have pinned status
    }));

    // Combine both arrays and sort by updatedAt
    const combined = [...notesWithType, ...workspacesWithType]
      .sort((a, b) => {
        // Sort by pinned first (notes only), then by date
        if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      })
      .slice(0, limit); // Limit the combined result

    return c.json(combined);
  })

  .get("/:id", zValidator("param", getNoteByIdSchema), async (c) => {
    const { id } = c.req.valid("param");

    const [singleNote] = await db
      .select()
      .from(note)
      .where(eq(note.id, id))
      .limit(1);

    if (!singleNote) {
      return c.json({ error: "Note not found" }, 404);
    }

    return c.json(singleNote);
  })

  .get("/", async (c) => {
    const allNotes = await db.select().from(note).orderBy(desc(note.createdAt));

    return c.json(allNotes);
  })

  .patch(
    "/:id",
    zValidator("param", getNoteByIdSchema),
    zValidator("json", updateNoteSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const data = c.req.valid("json");

      const [updatedNote] = await db
        .update(note)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(note.id, id))
        .returning();

      if (!updatedNote) {
        return c.json({ error: "Note not found" }, 404);
      }

      return c.json(updatedNote);
    }
  )

  .delete("/:id", zValidator("param", getNoteByIdSchema), async (c) => {
    const { id } = c.req.valid("param");

    const [deletedNote] = await db
      .delete(note)
      .where(eq(note.id, id))
      .returning();

    if (!deletedNote) {
      return c.json({ error: "Note not found" }, 404);
    }

    return c.json({ success: true, id: deletedNote.id });
  });

export default notesRoutes;
