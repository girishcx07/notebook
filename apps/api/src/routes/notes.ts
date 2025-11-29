import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db, notes } from "@notebook/db";
import {
  createNoteSchema,
  getNoteByIdSchema,
  updateNoteSchema,
} from "@notebook/schemas";
import { eq, desc } from "drizzle-orm";

const notesRoutes = new Hono()
  .post("/", zValidator("json", createNoteSchema), async (c) => {
    const data = c.req.valid("json");

    const [newNote] = await db
      .insert(notes)
      .values({
        title: data.title,
        content: data.content,
      })
      .returning();

    return c.json(newNote, 201);
  })
  .get("/:id", zValidator("param", getNoteByIdSchema), async (c) => {
    const { id } = c.req.valid("param");

    const [note] = await db
      .select()
      .from(notes)
      .where(eq(notes.id, id))
      .limit(1);

    if (!note) {
      return c.json({ error: "Note not found" }, 404);
    }

    return c.json(note);
  })
  .get("/", async (c) => {
    const allNotes = await db
      .select()
      .from(notes)
      .orderBy(desc(notes.createdAt));
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
        .update(notes)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(notes.id, id))
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
      .delete(notes)
      .where(eq(notes.id, id))
      .returning();

    if (!deletedNote) {
      return c.json({ error: "Note not found" }, 404);
    }

    return c.json({ success: true, id: deletedNote.id });
  });

export default notesRoutes;
