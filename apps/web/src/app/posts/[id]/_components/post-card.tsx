"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@notebook/ui/components/card";
import { EditPostDialog } from "../../_components/edit-post-dialog";
import { DeletePostButton } from "../../_components/delete-post-button";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPostById } from "@/src/api/post";

interface PostCardProps {
  postId: string;
}

export const PostCard = ({ postId }: PostCardProps) => {
  const { data: post } = useSuspenseQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
  });
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-3xl mb-2">{post?.title}</CardTitle>
            <CardDescription>
              Created: {new Date(post?.createdAt).toLocaleDateString()} •
              Updated: {new Date(post?.updatedAt).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <EditPostDialog post={post} />
            <DeletePostButton postId={postId} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="whitespace-pre-wrap">{post?.content}</p>
        </div>
      </CardContent>
    </Card>
  );
};
