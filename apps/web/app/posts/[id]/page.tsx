import { notFound } from "next/navigation";
import { getPostById } from "@/lib/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@notebook/ui/components/card";
import { Button } from "@notebook/ui/components/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DeletePostButton } from "../_components/delete-post-button";
import { EditPostDialog } from "../_components/edit-post-dialog";

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPostById(parseInt(params.id));

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Link href="/posts">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>
      </Link>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">{post.title}</CardTitle>
              <CardDescription>
                Created: {new Date(post.createdAt).toLocaleDateString()} •
                Updated: {new Date(post.updatedAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <EditPostDialog post={post} />
              <DeletePostButton postId={post.id} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap">{post.content}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
