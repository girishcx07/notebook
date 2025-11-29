import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db, note } from "@notebook/db";
import {
  createNoteSchema,
  getNoteByIdSchema,
  getNoteByUserIdSchema,
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

  .get("/recent", async (c) => {
    const recentNotes = await db
      .select()
      .from(note)
      .orderBy(desc(note.pinned), desc(note.updatedAt))
      .limit(10);

    return c.json(recentNotes);
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
