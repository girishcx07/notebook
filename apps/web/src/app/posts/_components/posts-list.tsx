"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@notebook/ui/components/card";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { keys } from "@/src/constants/query-key";
import { getAllPosts } from "@/src/api/post";

export function PostsList() {
  const { data: posts } = useSuspenseQuery({
    queryKey: keys.posts.all,
    queryFn: getAllPosts,
  });

  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground mb-4">No posts found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
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

export function PostsListSkeleton() {
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
