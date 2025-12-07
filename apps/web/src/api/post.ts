import { rpcClient } from "@/src/lib/api";

/**
 * Create a new post
 */
export async function createPost({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
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
export async function getPostById(id: string) {
  const res = await rpcClient.posts[":id"].$get({
    param: { id },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Post not found", {
        cause: "post_not_found",
      });
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
export async function updatePost(data: {
  title?: string;
  content?: string;
  id: string;
}) {
  const res = await rpcClient.posts[":id"].$patch({
    param: { id: data.id },
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
export async function deletePost(id: string) {
  const res = await rpcClient.posts[":id"].$delete({
    param: { id },
  });

  if (!res.ok) {
    if (res.status === 404) {
      throw new Error("Post not found");
    }
    throw new Error("Failed to delete post");
  }

  return await res.json();
}
