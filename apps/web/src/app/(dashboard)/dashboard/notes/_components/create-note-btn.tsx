"use client";

import { keys } from "@/src/constants/query-key";
import { createNote } from "@/src/api/note";
import { Button } from "@notebook/ui/components/button";
import { IconPlus } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const CreateNoteBtn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: ({ title, content }: { title: string; content: string }) =>
      createNote({
        title,
        content,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: keys.notes.all });
    },
  });

  const handleCreateNote = async () => {
    try {
      const newNote = await createNoteMutation.mutateAsync({
        title: "Untitled Note",
        content: "Start writing...",
      });
      router.push(`/dashboard/notes/${newNote.id}`);
    } catch (error) {
      console.error("Failed to create note", error);
    }
  };
  return (
    <Button onClick={handleCreateNote} disabled={createNoteMutation.isPending}>
      <IconPlus className="mr-2 size-4" />
      Create Note
    </Button>
  );
};
