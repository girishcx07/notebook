"use client";

import { Suspense } from "react";
import { DashboardContent } from "@/src/app/(dashboard)/_components/dashboard-content";
import { Button } from "@notebook/ui/components/button";
import { useCreateNote, useNotes } from "@/src/hooks/use-notes";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

function NotesList() {
  const { data: notes, isLoading } = useNotes();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading notes...</div>;
  }

  if (!notes || notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground mb-4">No notes found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note: any) => (
        <div
          key={note.id}
          className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors"
          onClick={() => router.push(`/dashboard/notes/${note.id}`)}
        >
          <h3 className="font-semibold mb-2">{note.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {note.content}
          </p>
          <div className="mt-4 text-xs text-muted-foreground">
            {new Date(note.updatedAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}

const Page = () => {
  const createNoteMutation = useCreateNote();
  const router = useRouter();

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
    <DashboardContent>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Notes</h1>
        <Button
          onClick={handleCreateNote}
          disabled={createNoteMutation.isPending}
        >
          <IconPlus className="mr-2 size-4" />
          Create Note
        </Button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <NotesList />
      </Suspense>
    </DashboardContent>
  );
};

export default Page;
