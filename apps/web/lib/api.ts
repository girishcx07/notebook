import { hc } from "hono/client";
import type { AppType } from "@notebook/api/client";

// Initialize the RPC client with type safety
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
// Type assertion needed due to Hono's RPC client type inference limitations in Next.js
const rpcClient = hc<AppType>(apiUrl) as any;

// Example usage functions with full type safety

/**
 * Create a new post
 */
export async function createPost(title: string, content: string) {
  const res = await rpcClient.posts.$post({
    json: {
      title,
      content,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create post");
  }

  return await res.json();
}

/**
 * Get a post by ID
 */
export async function getPostById(id: number) {
  const res = await rpcClient.posts[":id"].$get({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }
    throw new Error("Failed to fetch post");
  }

  return await res.json();
}

/**
 * Get all posts
 */
export async function getAllPosts() {
  const res = await rpcClient.posts.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return await res.json();
}

/**
 * Update a post
 */
export async function updatePost(
  id: number,
  data: { title?: string; content?: string }
) {
  const res = await rpcClient.posts[":id"].$patch({
    param: { id: id.toString() },
    json: data,
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Post not found");
    }
    throw new Error("Failed to update post");
  }

  return await res.json();
}

/**
 * Delete a post
 */
export async function deletePost(id: number) {
  const res = await rpcClient.posts[":id"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Post not found");
    }
    throw new Error("Failed to delete post");
  }

  return await res.json();
}

// Export the client for advanced usage
export const client = rpcClient;
