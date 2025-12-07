import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  db,
  workspace,
  workspaceFollower,
  workspaceMember,
} from "@notebook/db";
import {
  followWorkspaceSchema,
  unfollowWorkspaceSchema,
  getWorkspaceFollowersSchema,
  inviteToWorkspaceSchema,
  respondToInvitationSchema,
  removeWorkspaceMemberSchema,
  archiveWorkspaceSchema,
  updateWorkspaceVisibilitySchema,
  getWorkspaceStatsSchema,
} from "@notebook/schemas";
import { eq, and, sql } from "drizzle-orm";

const workspaceCollaborationRoutes = new Hono()
  // Follow a public workspace
  .post(
    "/:id/follow",
    zValidator("param", followWorkspaceSchema),
    async (c) => {
      const { id: workspaceId } = c.req.valid("param");
      const userId = c.req.header("x-user-id"); // TODO: Get from auth

      if (!userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Check if workspace is public
      const [ws] = await db
        .select()
        .from(workspace)
        .where(eq(workspace.id, workspaceId))
        .limit(1);

      if (!ws) {
        return c.json({ error: "Workspace not found" }, 404);
      }

      if (ws.visibility !== "public") {
        return c.json({ error: "Can only follow public workspaces" }, 403);
      }

      try {
        // Insert follower
        await db.insert(workspaceFollower).values({
          userId,
          workspaceId,
        });

        // Increment follower count
        await db
          .update(workspace)
          .set({
            followerCount: sql`${workspace.followerCount} + 1`,
          })
          .where(eq(workspace.id, workspaceId));

        return c.json({ success: true }, 201);
      } catch (error: any) {
        if (error.code === "23505") {
          // Unique constraint violation
          return c.json({ error: "Already following" }, 409);
        }
        throw error;
      }
    }
  )

  // Unfollow a workspace
  .delete(
    "/:id/follow",
    zValidator("param", unfollowWorkspaceSchema),
    async (c) => {
      const { id: workspaceId } = c.req.valid("param");
      const userId = c.req.header("x-user-id"); // TODO: Get from auth

      if (!userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const deleted = await db
        .delete(workspaceFollower)
        .where(
          and(
            eq(workspaceFollower.workspaceId, workspaceId),
            eq(workspaceFollower.userId, userId)
          )
        )
        .returning();

      if (deleted.length === 0) {
        return c.json({ error: "Not following" }, 404);
      }

      // Decrement follower count
      await db
        .update(workspace)
        .set({
          followerCount: sql`${workspace.followerCount} - 1`,
        })
        .where(eq(workspace.id, workspaceId));

      return c.json({ success: true });
    }
  )

  // Get workspace followers
  .get(
    "/:id/followers",
    zValidator("param", followWorkspaceSchema),
    zValidator("query", getWorkspaceFollowersSchema),
    async (c) => {
      const { id: workspaceId } = c.req.valid("param");
      const { limit, offset } = c.req.valid("query");

      const followers = await db
        .select({
          userId: workspaceFollower.userId,
          followedAt: workspaceFollower.followedAt,
        })
        .from(workspaceFollower)
        .where(eq(workspaceFollower.workspaceId, workspaceId))
        .limit(limit)
        .offset(offset);

      return c.json(followers);
    }
  )

  // Invite users to workspace
  .post(
    "/:id/invite",
    zValidator("param", followWorkspaceSchema),
    zValidator("json", inviteToWorkspaceSchema),
    async (c) => {
      const { id: workspaceId } = c.req.valid("param");
      const { userIds, role } = c.req.valid("json");
      const inviterId = c.req.header("x-user-id"); // TODO: Get from auth

      if (!inviterId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Check if inviter is owner or admin
      const [ws] = await db
        .select()
        .from(workspace)
        .where(eq(workspace.id, workspaceId))
        .limit(1);

      if (!ws) {
        return c.json({ error: "Workspace not found" }, 404);
      }

      if (ws.createdBy !== inviterId) {
        // TODO: Check if admin member
        return c.json({ error: "Only workspace owner can invite" }, 403);
      }

      // Insert invitations
      const invitations = userIds.map((userId) => ({
        id: crypto.randomUUID(),
        userId,
        workspaceId,
        role,
        status: "invited" as const,
        invitedBy: inviterId,
        invitedAt: new Date(),
      }));

      await db.insert(workspaceMember).values(invitations);

      return c.json({ success: true, invited: userIds.length }, 201);
    }
  )

  // Respond to invitation
  .patch(
    "/:id/invitation",
    zValidator("param", followWorkspaceSchema),
    zValidator("json", respondToInvitationSchema),
    async (c) => {
      const { id: workspaceId } = c.req.valid("param");
      const { action } = c.req.valid("json");
      const userId = c.req.header("x-user-id"); // TODO: Get from auth

      if (!userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const newStatus = action === "accept" ? "active" : "declined";

      const updated = await db
        .update(workspaceMember)
        .set({
          status: newStatus,
          respondedAt: new Date(),
        })
        .where(
          and(
            eq(workspaceMember.workspaceId, workspaceId),
            eq(workspaceMember.userId, userId),
            eq(workspaceMember.status, "invited")
          )
        )
        .returning();

      if (updated.length === 0) {
        return c.json({ error: "Invitation not found" }, 404);
      }

      return c.json({ success: true, status: newStatus });
    }
  )

  // Archive/unarchive workspace
  .patch(
    "/:id/archive",
    zValidator("param", followWorkspaceSchema),
    zValidator("json", archiveWorkspaceSchema),
    async (c) => {
      const { id: workspaceId } = c.req.valid("param");
      const { archived } = c.req.valid("json");
      const userId = c.req.header("x-user-id"); // TODO: Get from auth

      if (!userId) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // Check ownership
      const [ws] = await db
        .select()
        .from(workspace)
        .where(eq(workspace.id, workspaceId))
        .limit(1);

      if (!ws) {
        return c.json({ error: "Workspace not found" }, 404);
      }

      if (ws.createdBy !== userId) {
        return c.json({ error: "Only owner can archive workspace" }, 403);
      }

      await db
        .update(workspace)
        .set({
          archived,
          archivedAt: archived ? new Date() : null,
        })
        .where(eq(workspace.id, workspaceId));

      return c.json({ success: true, archived });
    }
  )

  // Get workspace stats
  .get(
    "/:id/stats",
    zValidator("param", getWorkspaceStatsSchema),
    async (c) => {
      const { id: workspaceId } = c.req.valid("param");

      const [ws] = await db
        .select({
          followerCount: workspace.followerCount,
          visibility: workspace.visibility,
        })
        .from(workspace)
        .where(eq(workspace.id, workspaceId))
        .limit(1);

      if (!ws) {
        return c.json({ error: "Workspace not found" }, 404);
      }

      // Count members
      const members = await db
        .select({ count: sql<number>`count(*)` })
        .from(workspaceMember)
        .where(
          and(
            eq(workspaceMember.workspaceId, workspaceId),
            eq(workspaceMember.status, "active")
          )
        );

      return c.json({
        followerCount: ws.followerCount,
        memberCount: members[0]?.count || 0,
        visibility: ws.visibility,
      });
    }
  );

// TODO: Add routes for workspace member management
// Remove workspace member
// .delete(
//   "/:id/members/:memberId",
//   zValidator("param", removeWorkspaceMemberSchema),
//   async (c) => {
//     const { id: workspaceId, memberId } = c.req.valid("param");
//     const userId = c.req.header("x-user-id"); // TODO: Get from auth

//     if (!userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const deleted = await db
//       .delete(workspaceMember)
//       .where(
//         and(
//           eq(workspaceMember.workspaceId, workspaceId),
//           eq(workspaceMember.userId, memberId)
//         )
//       )
//       .returning();

//     if (deleted.length === 0) {
//       return c.json({ error: "Member not found" }, 404);
//     }

//     return c.json({ success: true });
//   }
// )

// // Update workspace member role
// .patch(
//   "/:id/members/:memberId",
//   zValidator("param", updateWorkspaceMemberSchema),
//   async (c) => {
//     const { id: workspaceId, memberId } = c.req.valid("param");
//     const { role } = c.req.valid("json");
//     const userId = c.req.header("x-user-id"); // TODO: Get from auth

//     if (!userId) {
//       return c.json({ error: "Unauthorized" }, 401);
//     }

//     const updated = await db
//       .update(workspaceMember)
//       .set({
//         role,
//         updatedAt: new Date(),
//       })
//       .where(
//         and(
//           eq(workspaceMember.workspaceId, workspaceId),
//           eq(workspaceMember.userId, memberId)
//         )
//       )
//       .returning();

//     if (updated.length === 0) {
//       return c.json({ error: "Member not found" }, 404);
//     }

//     return c.json({ success: true });
//   }
// )
export default workspaceCollaborationRoutes;
