"use client";

import { getAllNotes } from "@/src/api/note";
import { Skeleton } from "@notebook/ui/components/skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { keys } from "@/src/constants/query-key";

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
  const { data: notes } = useSuspenseQuery({
    queryKey: keys.notes.all,
    queryFn: getAllNotes,
  });

  const router = useRouter();

  if (!notes || notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border rounded-lg border-dashed">
        <p className="text-muted-foreground mb-4">No notes found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
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

export function NotesListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-4 border rounded-lg cursor-pointer transition-colors"
        >
          {/* Title Skeleton */}
          <Skeleton className="h-5 w-3/4 mb-2 rounded-md" />

          {/* Content Skeleton (3 lines) */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
            <Skeleton className="h-4 w-2/3 rounded-md" />
          </div>

          {/* Date Skeleton */}
          <Skeleton className="h-3 w-24 mt-4 rounded-md" />
        </div>
      ))}
    </div>
  );
}
