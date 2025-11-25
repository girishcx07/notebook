"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { deletePost } from "@/src/lib/api";
import { Trash2 } from "lucide-react";

interface DeletePostButtonProps {
  postId: number;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");

    startTransition(async () => {
      try {
        await deletePost(postId);
        setOpen(false);
        router.push("/posts"); // Navigate back to posts list
        router.refresh(); // Revalidate server data
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete post");
      }
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
        {error && <p className="text-sm text-destructive">{error}</p>}
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete Post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
