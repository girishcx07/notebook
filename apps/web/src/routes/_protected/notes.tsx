import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookOpenText, Eye, ShieldCheck } from "lucide-react";
import { z } from "zod/v4";

import type { NoteListStatus } from "@acme/validators";
import { NoteListStatusSchema } from "@acme/validators";

import { CreateNoteForm } from "@/components/create-note-form";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardMetricCard } from "@/components/dashboard-surface";
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
    <div className="flex flex-col gap-6">
      <DashboardHeader
        eyebrow="Notebook"
        title="Create structure without making the workspace feel heavy."
        description="This notes area keeps the workflow simple: write quickly, control visibility, and move between active, archived, and deleted states inside a clearer widget-based layout."
      >
        <DashboardMetricCard
          accent="blue"
          description="Every note starts in a calm, focused authoring flow."
          icon={BookOpenText}
          label="Writing flow"
          value="Fast capture"
        />
        <DashboardMetricCard
          accent="emerald"
          description="Use private, authenticated, or public visibility depending on how widely a note should be shared."
          icon={Eye}
          label="Visibility"
          value="Three levels"
        />
        <DashboardMetricCard
          accent="primary"
          description="Archive and soft delete behaviors stay obvious so learners never lose work by accident."
          icon={ShieldCheck}
          label="Safety"
          value="Protected states"
        />
      </DashboardHeader>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <CreateNoteForm />

        <NoteList
          page={search.page}
          status={search.status}
          onStatusChange={(status) => updateSearch({ page: 1, status })}
          onPageChange={(page) => updateSearch({ page })}
        />
      </div>
    </div>
  );
}
