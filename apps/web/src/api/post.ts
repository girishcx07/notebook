import { rpcClient } from "@/src/lib/api";

/**
 * Create a new post.
 *
 * @param title - The post's title
 * @param content - The post's content
 * @returns The created post object parsed from the response body
 * @throws Error if the API response is not OK
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
 * Retrieve a post by its ID.
 *
 * @param id - The ID of the post to fetch
 * @returns The parsed JSON body of the post
 * @throws `Error` with message "Post not found" and `cause` set to "post_not_found" if the server responds 404; otherwise throws `Error` with message "Failed to fetch post" for other non-OK responses
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
 * Fetches all posts.
 *
 * @returns The parsed JSON body containing the list of posts.
 * @throws Error if the request fails (message: "Failed to fetch posts").
 */
export async function getAllPosts() {
  const res = await rpcClient.posts.$get();

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return await res.json();
}

/**
 * Updates a post by ID with the provided fields.
 *
 * @param data - Object containing the post `id` and the fields to update (`title` and/or `content`).
 * @returns The updated post object as returned by the API.
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
 * Delete a post by ID.
 *
 * @param id - The ID of the post to delete.
 * @returns The parsed response body from the delete request.
 * @throws Error when the post is not found ("Post not found").
 * @throws Error when the delete request fails for other reasons ("Failed to delete post").
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