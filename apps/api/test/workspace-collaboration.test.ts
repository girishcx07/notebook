import {
  db,
  user,
  workspace,
  workspaceFollower,
  workspaceMember,
} from "@notebook/db";
import { eq } from "drizzle-orm";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { client } from "./client";

describe("Workspace Collaboration APIs", () => {
  // Use valid UUIDs for test data
  const testUserId = "550e8400-e29b-41d4-a716-446655440000";
  const testWorkspaceId = "550e8400-e29b-41d4-a716-446655440001";
  const otherUserId = "550e8400-e29b-41d4-a716-446655440002";

  beforeAll(async () => {
    // Create test users first
    await db
      .insert(user)
      .values([
        { id: testUserId, email: "test@example.com", name: "Test User" },
        { id: otherUserId, email: "other@example.com", name: "Other User" },
      ])
      .onConflictDoNothing();

    // Create test workspace
    await db
      .insert(workspace)
      .values({
        id: testWorkspaceId,
        name: "Test Workspace",
        description: "Test Description",
        visibility: "public",
        createdBy: testUserId,
      })
      .onConflictDoNothing();
  });

  afterEach(async () => {
    // Clean up test data after each test
    await db
      .delete(workspaceFollower)
      .where(eq(workspaceFollower.workspaceId, testWorkspaceId));
    await db
      .delete(workspaceMember)
      .where(eq(workspaceMember.workspaceId, testWorkspaceId));
  });

  describe("POST /workspace/:id/follow", () => {
    it("should follow a public workspace", async () => {
      const res = await client.workspace[":id"].follow.$post(
        {
          param: { id: testWorkspaceId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      expect(res.status).toBe(201);
      const body = await res.json();
      if ("error" in body) {
        throw new Error(`Expected success but got error: ${body.error}`);
      }
      expect(body.success).toBe(true);
    });

    it("should return 401 if not authenticated", async () => {
      const res = await client.workspace[":id"].follow.$post({
        param: { id: testWorkspaceId },
      });

      expect(res.status).toBe(401);
    });

    it("should return 409 if already following", async () => {
      // Follow once
      await client.workspace[":id"].follow.$post(
        {
          param: { id: testWorkspaceId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      // Try to follow again
      const res = await client.workspace[":id"].follow.$post(
        {
          param: { id: testWorkspaceId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      expect(res.status).toBe(409);
    });
  });

  describe("DELETE /workspace/:id/follow", () => {
    it("should unfollow a workspace", async () => {
      // First follow
      await client.workspace[":id"].follow.$post(
        {
          param: { id: testWorkspaceId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      // Then unfollow
      const res = await client.workspace[":id"].follow.$delete(
        {
          param: { id: testWorkspaceId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      expect(res.status).toBe(200);
      const body = await res.json();
      if ("error" in body) {
        throw new Error(`Expected success but got error: ${body.error}`);
      }
      expect(body.success).toBe(true);
    });

    it("should return 404 if not following", async () => {
      const res = await client.workspace[":id"].follow.$delete(
        {
          param: { id: testWorkspaceId },
        },
        {
          headers: {
            "x-user-id": otherUserId,
          },
        }
      );

      expect(res.status).toBe(404);
    });
  });

  describe("GET /workspace/:id/followers", () => {
    it("should return follower list", async () => {
      const res = await client.workspace[":id"].followers.$get({
        param: { id: testWorkspaceId },
        query: { limit: "10", offset: "0" },
      });

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body)).toBe(true);
    });

    it("should support pagination", async () => {
      const res = await client.workspace[":id"].followers.$get({
        param: { id: testWorkspaceId },
        query: { limit: "5", offset: "5" },
      });

      expect(res.status).toBe(200);
    });
  });

  describe("POST /workspace/:id/invite", () => {
    it("should invite users to workspace", async () => {
      const inviteUserId1 = "550e8400-e29b-41d4-a716-446655440010";
      const inviteUserId2 = "550e8400-e29b-41d4-a716-446655440011";

      // Create users to be invited
      await db
        .insert(user)
        .values([
          {
            id: inviteUserId1,
            email: "invite1@example.com",
            name: "Invite User 1",
          },
          {
            id: inviteUserId2,
            email: "invite2@example.com",
            name: "Invite User 2",
          },
        ])
        .onConflictDoNothing();

      const res = await client.workspace[":id"].invite.$post(
        {
          param: { id: testWorkspaceId },
          json: {
            userIds: [inviteUserId1, inviteUserId2],
            role: "member",
          },
        },
        {
          headers: {
            "x-user-id": testUserId, // Owner
          },
        }
      );

      expect(res.status).toBe(201);
      const body = await res.json();
      if ("error" in body) {
        throw new Error(`Expected success but got error: ${body.error}`);
      }
      expect(body.invited).toBe(2);
    });

    it("should return 403 if not owner", async () => {
      const res = await client.workspace[":id"].invite.$post(
        {
          param: { id: testWorkspaceId },
          json: {
            userIds: ["550e8400-e29b-41d4-a716-446655440020"],
            role: "member",
          },
        },
        {
          headers: {
            "x-user-id": otherUserId,
          },
        }
      );

      expect(res.status).toBe(403);
    });
  });

  describe("PATCH /workspace/:id/invitation", () => {
    beforeAll(async () => {
      // Create invitation for testing
      await db
        .insert(workspaceMember)
        .values({
          id: crypto.randomUUID(),
          userId: otherUserId,
          workspaceId: testWorkspaceId,
          status: "invited",
          invitedBy: testUserId,
          invitedAt: new Date(),
        })
        .onConflictDoNothing();
    });

    it("should accept invitation", async () => {
      const res = await client.workspace[":id"].invitation.$patch(
        {
          param: { id: testWorkspaceId },
          json: {
            action: "accept",
          },
        },
        {
          headers: {
            "x-user-id": otherUserId,
          },
        }
      );

      expect(res.status).toBe(200);
      const body = await res.json();
      if ("error" in body) {
        throw new Error(`Expected success but got error: ${body.error}`);
      }
      expect(body.status).toBe("active");
    });
  });

  describe("PATCH /workspace/:id/archive", () => {
    it("should archive workspace", async () => {
      const res = await client.workspace[":id"].archive.$patch(
        {
          param: { id: testWorkspaceId },
          json: {
            archived: true,
          },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      expect(res.status).toBe(200);
      const body = await res.json();
      if ("error" in body) {
        throw new Error(`Expected success but got error: ${body.error}`);
      }
      expect(body.archived).toBe(true);
    });

    it("should unarchive workspace", async () => {
      const res = await client.workspace[":id"].archive.$patch(
        {
          param: { id: testWorkspaceId },
          json: {
            archived: false,
          },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      expect(res.status).toBe(200);
      const body = await res.json();
      if ("error" in body) {
        throw new Error(`Expected success but got error: ${body.error}`);
      }
      expect(body.archived).toBe(false);
    });
  });

  describe("GET /workspace/:id/stats", () => {
    it("should return workspace stats", async () => {
      const res = await client.workspace[":id"].stats.$get({
        param: { id: testWorkspaceId },
      });

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toHaveProperty("followerCount");
      expect(body).toHaveProperty("memberCount");
      expect(body).toHaveProperty("visibility");
    });
  });
});
