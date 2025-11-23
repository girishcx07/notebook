import { describe, it, expect } from "vitest";
import app from "../index.js";

describe("Posts API", () => {
  describe("POST /posts", () => {
    it("should create a new post", async () => {
      const res = await app.request("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Test Post",
          content: "This is a test post content",
        }),
      });

      expect(res.status).toBe(201);
      const data = (await res.json()) as any;
      expect(data).toHaveProperty("id");
      expect(data.title).toBe("Test Post");
      expect(data.content).toBe("This is a test post content");
    });

    it("should validate required fields", async () => {
      const res = await app.request("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "",
        }),
      });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /posts/:id", () => {
    it("should get a post by id", async () => {
      // First create a post
      const createRes = await app.request("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Test Post for Get",
          content: "Content for get test",
        }),
      });

      const createdPost = (await createRes.json()) as any;

      // Then fetch it
      const getRes = await app.request(`/posts/${createdPost.id}`);
      expect(getRes.status).toBe(200);
      const data = (await getRes.json()) as any;
      expect(data.id).toBe(createdPost.id);
      expect(data.title).toBe("Test Post for Get");
    });

    it("should return 404 for non-existent post", async () => {
      const res = await app.request("/posts/99999");
      expect(res.status).toBe(404);
      const data = (await res.json()) as any;
      expect(data).toHaveProperty("error");
    });
  });

  describe("GET /posts", () => {
    it("should get all posts", async () => {
      const res = await app.request("/posts");
      expect(res.status).toBe(200);
      const data = (await res.json()) as any;
      expect(Array.isArray(data)).toBe(true);
    });
  });
});
