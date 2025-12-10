"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@notebook/ui/components/button";
import { Input } from "@notebook/ui/components/input";
import { Textarea } from "@notebook/ui/components/textarea";
import { Label } from "@notebook/ui/components/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@notebook/ui/components/dialog";
import { Plus } from "lucide-react";
import { createPost } from "@/src/api/post";
import { useMutation } from "@tanstack/react-query";
import { keys } from "@/src/constants/query-key";
import { toast } from "sonner";

export function CreatePostForm() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPostMutation = useMutation({
    mutationKey: keys.posts.create,
    mutationFn: createPost,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    createPostMutation.mutate(
      {
        title,
        content,
      },
      {
        onSuccess: () => {
          setTitle("");
          setContent("");
          setOpen(false);
        },
        onError: (err) => {
          toast.error(
            err instanceof Error ? err.message : "Failed to create post"
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Add a new post to your collection. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                disabled={createPostMutation.isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content..."
                rows={6}
                disabled={createPostMutation.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createPostMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createPostMutation.isPending}>
              {createPostMutation.isPending ? "Creating..." : "Create Post"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
