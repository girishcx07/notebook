import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod/v4";

import type { NoteListStatus } from "@acme/validators";
import { NoteListStatusSchema } from "@acme/validators";

import { CreateNoteForm } from "@/components/create-note-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { NoteList } from "@/components/note-list";

const notesSearchSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  status: NoteListStatusSchema.default("active"),
});

export const Route = createFileRoute("/_protected/notes")({
  validateSearch: (search) => notesSearchSchema.parse(search),
  component: NotesPage,
});

function NotesPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();

  const updateSearch = (next: { page?: number; status?: NoteListStatus }) => {
    void navigate({
      to: "/notes",
      search: {
        page: next.page ?? search.page,
        status: next.status ?? search.status,
      },
    });
  };

  return (
    <main className="bg-muted/40 min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <DashboardHeader
          title="Notes"
          description="This is the first production-style scoped resource in the app. It already supports visibility, archive, and soft delete behavior."
        />

        <div className="grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
          <CreateNoteForm />

          <div className="bg-card rounded-2xl border p-6 shadow-sm">
            <NoteList
              page={search.page}
              status={search.status}
              onStatusChange={(status) => updateSearch({ page: 1, status })}
              onPageChange={(page) => updateSearch({ page })}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
