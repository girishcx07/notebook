import { z } from "zod";

// Schema for creating a new note
export const createNoteSchema = z.object({
  title: z.string().min(1, "Title is required").max(255, "Title too long"),
  content: z.string().min(1, "Content is required"),
  userId: z.string().min(1, "User ID is required"),
  workspaceId: z.string().optional(),
  status: z.enum(["private", "public", "request_access"]).default("private"),
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
    userId: z.string().min(1, "User ID is required").optional(),
    status: z.enum(["private", "public", "request_access"]).optional(),
  })
  .refine((data) => data.title || data.content, {
    message: "At least one field must be provided",
  });

// Schema for a complete note (with id and timestamps)
export const noteSchema = createNoteSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
});

// Schema for getting note by ID
export const getNoteByIdSchema = z.object({
  id: z.string(),
});

export const getNoteByUserIdSchema = z.object({
  userId: z.string(),
});

// Schema for searching notes
export const searchNoteSchema = z.object({
  query: z.string(),
});

// Schema for getting recent notes
export const getRecentNotesSchema = z.object({
  userId: z.string(),
  limit: z.coerce.number().optional().default(10),
});

export const createNoteFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  status: z.enum(["private", "public", "request_access"]),
});

// TypeScript types inferred from Zod schemas
export type CreateNote = z.infer<typeof createNoteSchema>;
export type UpdateNote = z.infer<typeof updateNoteSchema>;
export type Note = z.infer<typeof noteSchema>;

export type GetNoteById = z.infer<typeof getNoteByIdSchema>;
