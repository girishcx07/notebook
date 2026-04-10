import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, FileEdit, ShieldCheck } from "lucide-react";

import { DashboardHeader } from "@/components/dashboard-header";
import {
  DashboardMetricCard,
  DashboardSurface,
} from "@/components/dashboard-surface";
import { NoteEditor } from "@/components/note-editor";
import { useTRPC } from "@/lib/trpc";

export const Route = createFileRoute("/_protected/notes/$noteId")({
  component: NoteDetailPage,
});

function NoteDetailPage() {
  const { user } = Route.useRouteContext();
  const params = Route.useParams();
  const trpc = useTRPC();
  const { data: note, isLoading } = useQuery(
    trpc.note.byId.queryOptions({
      id: params.noteId,
    }),
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <DashboardHeader
          eyebrow="Notebook Detail"
          title="Loading note"
          description="Preparing the note editor and current metadata."
        />
        <DashboardSurface className="p-6">
          <p className="text-muted-foreground text-sm">Loading note...</p>
        </DashboardSurface>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="flex flex-col gap-6">
        <DashboardHeader
          eyebrow="Notebook Detail"
          title="Note unavailable"
          description="The requested note could not be found or is no longer visible to this account."
        />
        <DashboardSurface className="p-6">
          <p className="text-muted-foreground text-sm">
            This note is unavailable or you no longer have access to it.
          </p>
        </DashboardSurface>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader
        eyebrow="Notebook Detail"
        title={note.title}
        description="Review the current note state, adjust visibility, and edit content if you own this note."
      >
        <DashboardMetricCard
          accent="blue"
          description="Ownership controls whether this screen is editable or read-only."
          icon={FileEdit}
          label="Mode"
          value={note.ownerId === user.id ? "Editable" : "Read only"}
        />
        <DashboardMetricCard
          accent="emerald"
          description="Visibility stays visible at a glance so sharing rules are easier to trust."
          icon={Eye}
          label="Visibility"
          value={note.visibility}
        />
        <DashboardMetricCard
          accent="amber"
          description="Archive and delete states stay explicit to reduce accidental loss."
          icon={ShieldCheck}
          label="State"
          value={
            note.deletedAt ? "Deleted" : note.isArchived ? "Archived" : "Active"
          }
        />
      </DashboardHeader>
      <NoteEditor note={note} isOwner={note.ownerId === user.id} />
    </div>
  );
}
