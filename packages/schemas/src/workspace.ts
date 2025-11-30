import { z } from "zod";

export const getWorkspacesSchema = z.object({
  userId: z.string(),
});

export type GetWorkspaces = z.infer<typeof getWorkspacesSchema>;
