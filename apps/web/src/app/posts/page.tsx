import { Suspense } from "react";
import { CreatePostForm } from "./_components/create-post-form";
import { PostsList, PostsListSkeleton } from "./_components/posts-list";

export default function PostsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Posts</h1>
          <p className="text-muted-foreground mt-2">
            Manage and view all your posts
          </p>
        </div>
        <CreatePostForm />
      </div>

      <Suspense fallback={<PostsListSkeleton />}>
        <PostsList />
      </Suspense>
    </div>
  );
}
