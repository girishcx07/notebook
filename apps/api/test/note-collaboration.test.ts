import { describe, it, expect, beforeAll, afterEach } from "vitest";
import { client } from "./client";
import { db, user, note, noteFollower, noteViewer } from "@notebook/db";
import { eq } from "drizzle-orm";

describe("Note Collaboration APIs", () => {
  // Use valid UUIDs for test data
  const testUserId = "550e8400-e29b-41d4-a716-446655440100";
  const testNoteId = "550e8400-e29b-41d4-a716-446655440101";
  const otherUserId = "550e8400-e29b-41d4-a716-446655440102";

  beforeAll(async () => {
    // Create test users first
    await db
      .insert(user)
      .values([
        {
          id: testUserId,
          email: "testnote@example.com",
          name: "Test Note User",
        },
        {
          id: otherUserId,
          email: "othernote@example.com",
          name: "Other Note User",
        },
      ])
      .onConflictDoNothing();

    // Create test note
    await db
      .insert(note)
      .values({
        id: testNoteId,
        title: "Test Note",
        content: "Test Content",
        status: "public",
        createdBy: testUserId,
      })
      .onConflictDoNothing();
  });

  afterEach(async () => {
    // Clean up test data after each test
    await db.delete(noteFollower).where(eq(noteFollower.noteId, testNoteId));
    await db.delete(noteViewer).where(eq(noteViewer.noteId, testNoteId));
  });

  describe("POST /note/:id/follow", () => {
    it("should follow a public note", async () => {
      const res = await client.note[":id"].follow.$post(
        {
          param: { id: testNoteId },
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
      const res = await client.note[":id"].follow.$post({
        param: { id: testNoteId },
      });

      expect(res.status).toBe(401);
    });

    it("should return 409 if already following", async () => {
      // Follow once
      await client.note[":id"].follow.$post(
        {
          param: { id: testNoteId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      // Try to follow again
      const res = await client.note[":id"].follow.$post(
        {
          param: { id: testNoteId },
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

  describe("DELETE /note/:id/follow", () => {
    it("should unfollow a note", async () => {
      // First follow
      await client.note[":id"].follow.$post(
        {
          param: { id: testNoteId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      // Then unfollow
      const res = await client.note[":id"].follow.$delete(
        {
          param: { id: testNoteId },
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
      const res = await client.note[":id"].follow.$delete(
        {
          param: { id: testNoteId },
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

  describe("GET /note/:id/followers", () => {
    it("should return follower list", async () => {
      const res = await client.note[":id"].followers.$get({
        param: { id: testNoteId },
        query: { limit: "10", offset: "0" },
      });

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body)).toBe(true);
    });

    it("should support pagination", async () => {
      const res = await client.note[":id"].followers.$get({
        param: { id: testNoteId },
        query: { limit: "5", offset: "5" },
      });

      expect(res.status).toBe(200);
    });
  });

  describe("POST /note/:id/view", () => {
    it("should record a view", async () => {
      const res = await client.note[":id"].view.$post(
        {
          param: { id: testNoteId },
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

    it("should increment view count on multiple views", async () => {
      // First view
      await client.note[":id"].view.$post(
        {
          param: { id: testNoteId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      // Second view
      const res = await client.note[":id"].view.$post(
        {
          param: { id: testNoteId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      expect(res.status).toBe(200);

      // Check stats
      const statsRes = await client.note[":id"].stats.$get({
        param: { id: testNoteId },
      });

      const stats = await statsRes.json();
      if ("error" in stats) {
        throw new Error(`Expected success but got error: ${stats.error}`);
      }
      expect(Number(stats?.totalViews)).toBeGreaterThanOrEqual(2);
    });

    it("should return 401 if not authenticated", async () => {
      const res = await client.note[":id"].view.$post({
        param: { id: testNoteId },
      });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /note/:id/viewers", () => {
    it("should return viewer list", async () => {
      const res = await client.note[":id"].viewers.$get({
        param: { id: testNoteId },
        query: { limit: "10" },
      });

      expect(res.status).toBe(200);
      const body = await res.json();
      expect(Array.isArray(body)).toBe(true);
    });

    it("should sort by most recent view", async () => {
      // Record some views
      await client.note[":id"].view.$post(
        {
          param: { id: testNoteId },
        },
        {
          headers: {
            "x-user-id": testUserId,
          },
        }
      );

      await client.note[":id"].view.$post(
        {
          param: { id: testNoteId },
        },
        {
          headers: {
            "x-user-id": otherUserId,
          },
        }
      );

      const res = await client.note[":id"].viewers.$get({
        param: { id: testNoteId },
        query: { limit: "10" },
      });

      const viewers = await res.json();
      if (viewers.length > 1) {
        const firstDate = new Date(viewers[0].lastViewedAt);
        const secondDate = new Date(viewers[1].lastViewedAt);
        expect(firstDate.getTime()).toBeGreaterThanOrEqual(
          secondDate.getTime()
        );
      }
    });
  });

  describe("GET /note/:id/stats", () => {
    it("should return note stats", async () => {
      const res = await client.note[":id"].stats.$get({
        param: { id: testNoteId },
      });

      expect(res.status).toBe(200);
      const body = await res.json();

      if ("error" in body) {
        throw new Error(`Expected stats but got error: ${body.error}`);
      }

      expect(body).toHaveProperty("followerCount");
      expect(body).toHaveProperty("viewerCount");
      expect(body).toHaveProperty("totalViews");
      expect(body).toHaveProperty("status");
    });

    it("should return 404 for non-existent note", async () => {
      const fakeNoteId = "550e8400-e29b-41d4-a716-999999999999";
      const res = await client.note[":id"].stats.$get({
        param: { id: fakeNoteId },
      });

      expect(res.status).toBe(404);
    });
  });

  describe("PATCH /note/:id/archive", () => {
    it("should archive note", async () => {
      const res = await client.note[":id"].archive.$patch(
        {
          param: { id: testNoteId },
          json: { archived: true },
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

    it("should unarchive note", async () => {
      const res = await client.note[":id"].archive.$patch(
        {
          param: { id: testNoteId },
          json: { archived: false },
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

    it("should return 403 if not owner", async () => {
      const res = await client.note[":id"].archive.$patch(
        {
          param: { id: testNoteId },
          json: { archived: true },
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
});
