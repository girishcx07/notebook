import { z } from "zod/v4";

export const NoteVisibilitySchema = z.enum([
  "PUBLIC",
  "AUTHENTICATED",
  "ORG",
  "SCHOOL",
  "CLASS",
  "PRIVATE",
]);

export const NoteUiVisibilitySchema = z.enum([
  "PRIVATE",
  "AUTHENTICATED",
  "PUBLIC",
]);

export const NoteListStatusSchema = z.enum(["active", "archived", "deleted"]);

const NoteBaseSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(120, "Title must be 120 characters or less"),
    content: z
      .string()
      .trim()
      .min(10, "Content must be at least 10 characters")
      .max(20_000, "Content must be 20,000 characters or less"),
    visibility: NoteVisibilitySchema.default("PRIVATE"),
    orgId: z.string().trim().min(1).nullish(),
    schoolId: z.string().trim().min(1).nullish(),
    classId: z.string().trim().min(1).nullish(),
  })
  .superRefine((value, ctx) => {
    if (value.visibility === "ORG" && !value.orgId) {
      ctx.addIssue({
        code: "custom",
        message: "orgId is required when visibility is ORG",
        path: ["orgId"],
      });
    }

    if (value.visibility === "SCHOOL" && !value.schoolId) {
      ctx.addIssue({
        code: "custom",
        message: "schoolId is required when visibility is SCHOOL",
        path: ["schoolId"],
      });
    }

    if (value.visibility === "CLASS" && !value.classId) {
      ctx.addIssue({
        code: "custom",
        message: "classId is required when visibility is CLASS",
        path: ["classId"],
      });
    }
  });

export const CreateNoteSchema = NoteBaseSchema;

export const UpdateNoteSchema = NoteBaseSchema.extend({
  id: z.string().uuid("A valid note id is required"),
});

export const NoteByIdSchema = z.object({
  id: z.string().uuid("A valid note id is required"),
});

export const NoteListSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().min(1).max(50).default(12),
  status: NoteListStatusSchema.default("active"),
});

export type NoteVisibility = z.infer<typeof NoteVisibilitySchema>;
export type NoteUiVisibility = z.infer<typeof NoteUiVisibilitySchema>;
export type NoteListStatus = z.infer<typeof NoteListStatusSchema>;
