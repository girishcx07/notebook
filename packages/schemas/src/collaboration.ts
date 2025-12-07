import { z } from "zod";

// Workspace follower schemas
export const followWorkspaceSchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace ID"),
});

export const unfollowWorkspaceSchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace ID"),
});

export const getWorkspaceFollowersSchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace ID"),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

// Workspace invitation schemas
export const inviteToWorkspaceSchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace ID"),
  userIds: z
    .array(z.string().uuid("Invalid user ID"))
    .min(1, "At least one user required"),
  role: z.enum(["admin", "member", "viewer"]).default("member"),
});

export const respondToInvitationSchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace ID"),
  action: z.enum(["accept", "decline"]),
});

export const removeWorkspaceMemberSchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace ID"),
  userId: z.string().uuid("Invalid user ID"),
});

// Workspace management schemas
export const archiveWorkspaceSchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace ID"),
  archived: z.boolean(),
});

export const updateWorkspaceVisibilitySchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace ID"),
  visibility: z.enum(["public", "private"]),
});

// Note follower schemas
export const followNoteSchema = z.object({
  noteId: z.string().uuid("Invalid note ID"),
});

export const unfollowNoteSchema = z.object({
  noteId: z.string().uuid("Invalid note ID"),
});

export const getNoteFollowersSchema = z.object({
  noteId: z.string().uuid("Invalid note ID"),
  limit: z.coerce.number().min(1).max(100).default(20),
  offset: z.coerce.number().min(0).default(0),
});

// Note viewer schemas
export const recordNoteViewSchema = z.object({
  noteId: z.string().uuid("Invalid note ID"),
});

export const getNoteViewersSchema = z.object({
  noteId: z.string().uuid("Invalid note ID"),
  limit: z.coerce.number().min(1).max(50).default(10),
});

// Note stats schema
export const getNoteStatsSchema = z.object({
  noteId: z.string().uuid("Invalid note ID"),
});

// Workspace stats schema
export const getWorkspaceStatsSchema = z.object({
  workspaceId: z.string().uuid("Invalid workspace ID"),
});

// Archive note schema
export const archiveNoteSchema = z.object({
  noteId: z.string().uuid("Invalid note ID"),
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
