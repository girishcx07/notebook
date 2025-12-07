"use client";

import { getAllNotes } from "@/src/api/note";
import { keys } from "@/src/constants/query-key";
import { noteContainerVariants } from "@/src/lib/motion";
import { Skeleton } from "@notebook/ui/components/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AddNoteCard } from "./add-note-card";
import { NoteCard } from "./note-card";

import { getWorkspaces } from "@/src/api/workspace";
import { useSession } from "@/src/components/session-provider";
import { FolderCard } from "./folder-card";

export const NotesList = () => {
  return (
    <Suspense fallback={<NotesListSkeleton />}>
      <ErrorBoundary fallback={<p>Error fetching notes</p>}>
        <NotesListSuspense />
      </ErrorBoundary>
    </Suspense>
  );
};

export function NotesListSuspense() {
  const session = useSession();

  const { data: notes } = useSuspenseQuery({
    queryKey: keys.notes.all,
    queryFn: getAllNotes,
  });

  const { data: workspaces } = useSuspenseQuery({
    queryKey: keys.workspaces.all,
    queryFn: () => getWorkspaces(session?.user?.id || ""),
  });

  if (
    (!notes || notes.length === 0) &&
    (!workspaces || workspaces.length === 0)
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground mb-4">No notes or folders found</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={noteContainerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-5 md:grid-cols-4 lg:grid-cols-5"
    >
      <AddNoteCard />
      {workspaces?.map((workspace) => (
        <FolderCard key={workspace.id} workspace={workspace} />
      ))}
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </motion.div>
  );
}

export function NotesListSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-4 lg:grid-cols-5">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="p-6 border border-dashed rounded-xl">
          <Skeleton className="h-5 w-3/4 mb-3 rounded-md" />
          <Skeleton className="h-4 w-full mb-2 rounded-md" />
          <Skeleton className="h-4 w-5/6 mb-2 rounded-md" />
          <Skeleton className="h-4 w-2/3 rounded-md" />
          <Skeleton className="h-3 w-24 mt-4 rounded-md" />
        </div>
      ))}
    </div>
  );
}
