import { Suspense } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

import type { RouterOutputs } from "@acme/api";
import type { NoteListStatus } from "@acme/validators";
import { Button } from "@acme/ui/components/button";

import {
  DashboardPill,
  DashboardSurface,
} from "@/components/dashboard-surface";
import { useTRPC } from "@/lib/trpc";

const statusLabels: Record<NoteListStatus, string> = {
  active: "Active",
  archived: "Archived",
  deleted: "Deleted",
};

export function NoteList(props: {
  onPageChange: (nextPage: number) => void;
  onStatusChange: (nextStatus: NoteListStatus) => void;
  page: number;
  status: NoteListStatus;
}) {
  return (
    <DashboardSurface accent="blue" className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <DashboardPill>Notebook library</DashboardPill>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                My notes
              </h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                Review active work, archived notes, or soft-deleted entries in
                one calmer dashboard list.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["active", "archived", "deleted"] as const).map((status) => (
              <Button
                key={status}
                type="button"
                variant={props.status === status ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => props.onStatusChange(status)}
              >
                {statusLabels[status]}
              </Button>
            ))}
          </div>
        </div>

        <Suspense
          fallback={
            <>
              <NoteCardSkeleton />
              <NoteCardSkeleton />
              <NoteCardSkeleton />
            </>
          }
        >
          <NoteListContent
            page={props.page}
            status={props.status}
            onPageChange={props.onPageChange}
          />
        </Suspense>
      </div>
    </DashboardSurface>
  );
}

function NoteListContent(props: {
  onPageChange: (nextPage: number) => void;
  page: number;
  status: NoteListStatus;
}) {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.note.list.queryOptions({
      page: props.page,
      pageSize: 12,
      status: props.status,
    }),
  );

  if (data.items.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-white/70 bg-white/70 p-10 text-center shadow-sm dark:border-white/10 dark:bg-white/5">
        <p className="text-lg font-medium">
          No {statusLabels[props.status].toLowerCase()} notes
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          {props.status === "active"
            ? "Create your first note to start building the notebook foundation."
            : props.status === "archived"
              ? "Archived notes will appear here after you store them away."
              : "Soft-deleted notes will appear here until you restore them."}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {data.items.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}

      <div className="flex items-center justify-between pt-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={props.page <= 1}
          onClick={() => props.onPageChange(props.page - 1)}
        >
          Previous
        </Button>

        <p className="text-muted-foreground text-sm">Page {props.page}</p>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={!data.hasMore}
          onClick={() => props.onPageChange(props.page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

function NoteCard(props: {
  note: RouterOutputs["note"]["list"]["items"][number];
}) {
  return (
    <Link
      to="/notes/$noteId"
      params={{ noteId: props.note.id }}
      search={{
        page: 1,
        status: "active",
      }}
      className="group flex flex-col gap-3 rounded-[24px] border border-white/70 bg-white/75 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="line-clamp-1 text-left text-base font-semibold">
          {props.note.title}
        </h3>
        <span className="text-muted-foreground rounded-full border px-2 py-1 text-xs">
          {formatVisibility(props.note.visibility)}
        </span>
      </div>

      <p className="text-muted-foreground line-clamp-3 text-left text-sm">
        {props.note.content}
      </p>

      <div className="text-muted-foreground flex items-center justify-between text-xs">
        <span>
          Updated {new Date(props.note.updatedAt).toLocaleDateString()}
        </span>
        {props.note.deletedAt ? (
          <span>Soft deleted</span>
        ) : props.note.isArchived ? (
          <span>Archived</span>
        ) : (
          <span>Open</span>
        )}
      </div>
    </Link>
  );
}

function NoteCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-[24px] border border-white/70 bg-white/75 p-5 dark:border-white/10 dark:bg-white/5">
      <div className="bg-muted h-5 w-1/3 animate-pulse rounded" />
      <div className="bg-muted h-4 w-full animate-pulse rounded" />
      <div className="bg-muted h-4 w-4/5 animate-pulse rounded" />
    </div>
  );
}

function formatVisibility(visibility: string) {
  const normalized = visibility.toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
