import { z } from 'zod';

// Schema for creating a new post
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  content: z.string().min(1, 'Content is required'),
});

// Schema for updating a post (partial)
export const updatePostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long').optional(),
  content: z.string().min(1, 'Content is required').optional(),
}).refine(data => data.title || data.content, {
  message: 'At least one field must be provided',
});

// Schema for a complete post (with id and timestamps)
export const postSchema = createPostSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// TypeScript types inferred from Zod schemas
export type CreatePost = z.infer<typeof createPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type Post = z.infer<typeof postSchema>;

// Schema for getting post by ID
export const getPostByIdSchema = z.object({
  id: z.string().transform(Number),
});

export type GetPostById = z.infer<typeof getPostByIdSchema>;
