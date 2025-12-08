"use client";

import { deletePost } from "@/src/api/post";
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
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface DeletePostButtonProps {
  postId: string;
}

/**
 * Render a "Delete" button that opens a confirmation dialog and deletes the specified post when confirmed.
 *
 * The component shows a destructive-styled button that opens a modal with cancel and confirm actions.
 * Confirming triggers a delete mutation for the given `postId`; on success the dialog closes, a success
 * toast is shown, and the router navigates to `/posts`. On error an error toast is shown.
 *
 * @param postId - The ID of the post to delete
 * @returns The JSX element containing the delete button and confirmation dialog
 */
export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const deletePostMutation = useMutation({
    mutationKey: keys.posts.deleteById(postId),
    mutationFn: deletePost,
  });

  const handleDelete = async () => {
    deletePostMutation.mutate(postId, {
      onSuccess: () => {
        setOpen(false);
        toast.success("Post deleted successfully");
        router.push("/posts");
      },
      onError: (err) => {
        toast.error(
          err instanceof Error ? err.message : "Failed to delete post"
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deletePostMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={deletePostMutation.isPending}
          >
            {deletePostMutation.isPending ? "Deleting..." : "Delete Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}