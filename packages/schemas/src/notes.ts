import { z } from "zod";

// Schema for creating a new note
export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  content: z.string().min(1, "Content is required"),
});

// Schema for updating a note (partial)
export const updateNoteSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title too long")
      .optional(),
    content: z.string().min(1, "Content is required").optional(),
  })
  .refine((data) => data.title || data.content, {
    message: "At least one field must be provided",
  });

// Schema for a complete note (with id and timestamps)
export const noteSchema = createNoteSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Schema for getting note by ID
export const getNoteByIdSchema = z.object({
  id: z.string().transform(Number),
});

// TypeScript types inferred from Zod schemas
export type CreateNote = z.infer<typeof createNoteSchema>;
export type UpdateNote = z.infer<typeof updateNoteSchema>;
export type Note = z.infer<typeof noteSchema>;

export type GetNoteById = z.infer<typeof getNoteByIdSchema>;
