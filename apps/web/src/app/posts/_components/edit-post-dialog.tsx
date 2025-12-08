"use client";

import { updatePost } from "@/src/api/post";
import { keys } from "@/src/constants/query-key";
import { Button } from "@notebook/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@notebook/ui/components/dialog";
import { Input } from "@notebook/ui/components/input";
import { Label } from "@notebook/ui/components/label";
import { Textarea } from "@notebook/ui/components/textarea";
import { useMutation } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EditPostDialogProps {
  post: {
    id: string;
    title: string;
    content: string;
  };
}

/**
 * Render a button that opens a dialog allowing the user to edit a post's title and content.
 *
 * The dialog initializes fields from `post`, validates that at least one field is non-empty,
 * and submits changed fields via a mutation. The dialog closes on successful update and
 * shows toast errors for validation or mutation failures.
 *
 * @param post - The post to edit; must include `id`, `title`, and `content`.
 * @returns The dialog UI (JSX element) for editing the specified post.
 */
export function EditPostDialog({ post }: EditPostDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const editMutation = useMutation({
    mutationFn: updatePost,
    mutationKey: keys.posts.updateById(post.id),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() && !content.trim()) {
      toast.error("At least one field must be provided");
      return;
    }

    const updates: { title?: string; content?: string } = {};
    if (title !== post.title) updates.title = title;
    if (content !== post.content) updates.content = content;

    if (Object.keys(updates).length === 0) {
      setOpen(false);
      return;
    }

    editMutation.mutate(
      {
        id: post.id,
        content: content,
        title: title,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (err) => {
          toast.error(
            err instanceof Error ? err.message : "Failed to update post"
          );
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>
              Make changes to your post. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title..."
                disabled={editMutation.isPending}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content..."
                rows={6}
                disabled={editMutation.isPending}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={editMutation.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={editMutation.isPending}>
              {editMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}