import { Suspense } from "react";
import { getAllPosts } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@notebook/ui/components/card";
import Link from "next/link";
import { CreatePostForm } from "./_components/create-post-form.js";

async function PostsList() {
  const posts = await getAllPosts();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post: any) => (
        <Link key={post.id} href={`/posts/${post.id}`}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="line-clamp-1">{post.title}</CardTitle>
              <CardDescription>
                {new Date(post.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {post.content}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function PostsListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="h-full">
          <CardHeader>
            <div className="h-6 bg-muted rounded animate-pulse" />
            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

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
