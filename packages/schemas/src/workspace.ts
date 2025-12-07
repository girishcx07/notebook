import { z } from "zod";

export const getWorkspacesSchema = z.object({
  userId: z.string(),
});

export type GetWorkspaces = z.infer<typeof getWorkspacesSchema>;

// Schema for creating a new workspace
export const createWorkspaceSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  userId: z.string().min(1, "User ID is required"),
  noteIds: z.array(z.string()).optional(), // For moving notes to workspace
});

// Schema for creating workspace from client (without userId)
export const createWorkspaceFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Name too long"),
  description: z.string().max(500, "Description too long").optional(),
  noteIds: z.array(z.string()).optional(),
});

// Schema for updating workspace
export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name too long")
    .optional(),
  description: z.string().max(500, "Description too long").optional(),
});

// TypeScript types
export type CreateWorkspace = z.infer<typeof createWorkspaceSchema>;
export type CreateWorkspaceForm = z.infer<typeof createWorkspaceFormSchema>;
export type UpdateWorkspace = z.infer<typeof updateWorkspaceSchema>;
