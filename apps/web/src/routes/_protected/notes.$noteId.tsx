import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { DashboardHeader } from "@/components/dashboard-header";
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
      <main className="bg-muted/40 min-h-screen px-6 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
          <DashboardHeader title="Note" description="Loading note details..." />
          <div className="bg-card rounded-2xl border p-6 shadow-sm">
            <p className="text-muted-foreground text-sm">Loading note...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="bg-muted/40 min-h-screen px-6 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
          <DashboardHeader
            title="Note"
            description="The requested note could not be found."
          />
          <div className="bg-card rounded-2xl border p-6 shadow-sm">
            <p className="text-muted-foreground text-sm">
              This note is unavailable or you no longer have access to it.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-muted/40 min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <DashboardHeader
          title="Note"
          description="Review the current note state and update it if you are the owner."
        />
        <NoteEditor note={note} isOwner={note.ownerId === user.id} />
      </div>
    </main>
  );
}
