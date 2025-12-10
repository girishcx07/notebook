import { z } from "zod";

// Param schemas (for URL parameters)
export const idParamSchema = z.object({
  id: z.string(),
});

// Workspace follower schemas
export const followWorkspaceSchema = idParamSchema;
export const unfollowWorkspaceSchema = idParamSchema;

export const getWorkspaceFollowersSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

// Workspace invitation schemas
export const inviteToWorkspaceSchema = z.object({
  userIds: z
    .array(z.string().uuid("Invalid user ID"))
    .min(1, "At least one user required"),
  role: z.enum(["admin", "member", "viewer"]).default("member"),
});

export const respondToInvitationSchema = z.object({
  action: z.enum(["accept", "decline"]),
});

export const removeWorkspaceMemberSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
});

// Workspace management schemas
export const archiveWorkspaceSchema = z.object({
  archived: z.boolean(),
});

export const updateWorkspaceVisibilitySchema = z.object({
  visibility: z.enum(["public", "private"]),
});

// Note follower schemas
export const followNoteSchema = idParamSchema;
export const unfollowNoteSchema = idParamSchema;

export const getNoteFollowersSchema = z.object({
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

// Note viewer schemas
export const recordNoteViewSchema = idParamSchema;

export const getNoteViewersSchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(10),
});

// Note stats schema
export const getNoteStatsSchema = idParamSchema;

// Workspace stats schema
export const getWorkspaceStatsSchema = idParamSchema;

// Archive note schema
export const archiveNoteSchema = z.object({
  archived: z.boolean(),
});

// TypeScript types
export type FollowWorkspace = z.infer<typeof followWorkspaceSchema>;
export type UnfollowWorkspace = z.infer<typeof unfollowWorkspaceSchema>;
export type GetWorkspaceFollowers = z.infer<typeof getWorkspaceFollowersSchema>;
export type InviteToWorkspace = z.infer<typeof inviteToWorkspaceSchema>;
export type RespondToInvitation = z.infer<typeof respondToInvitationSchema>;
export type RemoveWorkspaceMember = z.infer<typeof removeWorkspaceMemberSchema>;
export type ArchiveWorkspace = z.infer<typeof archiveWorkspaceSchema>;
export type UpdateWorkspaceVisibility = z.infer<
  typeof updateWorkspaceVisibilitySchema
>;
export type FollowNote = z.infer<typeof followNoteSchema>;
export type UnfollowNote = z.infer<typeof unfollowNoteSchema>;
export type GetNoteFollowers = z.infer<typeof getNoteFollowersSchema>;
export type RecordNoteView = z.infer<typeof recordNoteViewSchema>;
export type GetNoteViewers = z.infer<typeof getNoteViewersSchema>;
export type GetNoteStats = z.infer<typeof getNoteStatsSchema>;
export type GetWorkspaceStats = z.infer<typeof getWorkspaceStatsSchema>;
export type ArchiveNote = z.infer<typeof archiveNoteSchema>;
