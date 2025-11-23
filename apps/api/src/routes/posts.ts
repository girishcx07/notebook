import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { db, posts } from "@notebook/db";
import {
  createPostSchema,
  getPostByIdSchema,
  updatePostSchema,
} from "@notebook/schemas";
import { eq, desc } from "drizzle-orm";

const postsRoutes = new Hono()
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const data = c.req.valid("json");

    const [newPost] = await db
      .insert(posts)
      .values({
        title: data.title,
        content: data.content,
      })
      .returning();

    return c.json(newPost, 201);
  })
  .get("/:id", zValidator("param", getPostByIdSchema), async (c) => {
    const { id } = c.req.valid("param");

    const [post] = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .limit(1);

    if (!post) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json(post);
  })
  .get("/", async (c) => {
    const allPosts = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt));
    return c.json(allPosts);
  })
  .patch(
    "/:id",
    zValidator("param", getPostByIdSchema),
    zValidator("json", updatePostSchema),
    async (c) => {
      const { id } = c.req.valid("param");
      const data = c.req.valid("json");

      const [updatedPost] = await db
        .update(posts)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, id))
        .returning();

      if (!updatedPost) {
        return c.json({ error: "Post not found" }, 404);
      }

      return c.json(updatedPost);
    }
  )
  .delete("/:id", zValidator("param", getPostByIdSchema), async (c) => {
    const { id } = c.req.valid("param");

    const [deletedPost] = await db
      .delete(posts)
      .where(eq(posts.id, id))
      .returning();

    if (!deletedPost) {
      return c.json({ error: "Post not found" }, 404);
    }

    return c.json({ success: true, id: deletedPost.id });
  });

export default postsRoutes;
