import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod/v4";

import type { RouterOutputs } from "@acme/api";
import type { NoteUiVisibility } from "@acme/validators";
import { Button } from "@acme/ui/components/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@acme/ui/components/field";
import { Input } from "@acme/ui/components/input";
import { Textarea } from "@acme/ui/components/textarea";
import { toast } from "@acme/ui/components/toast";
import { NoteUiVisibilitySchema } from "@acme/validators";

import {
  DashboardPill,
  DashboardSurface,
} from "@/components/dashboard-surface";
import { useTRPC } from "@/lib/trpc";

const UpdateNoteFormSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must be 120 characters or less"),
  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters")
    .max(20_000, "Content must be 20,000 characters or less"),
  visibility: NoteUiVisibilitySchema,
});

const visibilityOptions: {
  description: string;
  label: string;
  value: NoteUiVisibility;
}[] = [
  {
    value: "PRIVATE",
    label: "Private",
    description: "Only you can read it.",
  },
  {
    value: "AUTHENTICATED",
    label: "Authenticated",
    description: "Any signed-in user can read it.",
  },
  {
    value: "PUBLIC",
    label: "Public",
    description: "Anyone with the id can read it later.",
  },
];

export function NoteEditor(props: {
  isOwner: boolean;
  note: RouterOutputs["note"]["byId"];
}) {
  const trpc = useTRPC();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      id: props.note.id,
      title: props.note.title,
      content: props.note.content,
      visibility: getEditableVisibility(props.note.visibility),
    },
    validators: {
      onSubmit: UpdateNoteFormSchema,
    },
    onSubmit: ({ value }) =>
      updateNote.mutate({
        ...value,
        orgId: props.note.orgId ?? undefined,
        schoolId: props.note.schoolId ?? undefined,
        classId: props.note.classId ?? undefined,
      }),
  });

  const invalidateNotes = async () => {
    await queryClient.invalidateQueries(trpc.note.pathFilter());
  };

  const updateNote = useMutation(
    trpc.note.update.mutationOptions({
      onSuccess: async () => {
        await invalidateNotes();
        toast.success("Note updated");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to save note");
      },
    }),
  );

  const archiveNote = useMutation(
    trpc.note.archive.mutationOptions({
      onSuccess: async () => {
        await invalidateNotes();
        toast.success("Note archived");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to archive note");
      },
    }),
  );

  const restoreNote = useMutation(
    trpc.note.restore.mutationOptions({
      onSuccess: async () => {
        await invalidateNotes();
        toast.success("Note restored");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to restore note");
      },
    }),
  );

  const deleteNote = useMutation(
    trpc.note.delete.mutationOptions({
      onSuccess: async () => {
        await invalidateNotes();
        toast.success("Note moved to deleted");
        await navigate({
          to: "/notes",
          search: {
            page: 1,
            status: "deleted",
          },
        });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete note");
      },
    }),
  );

  return (
    <div className="flex flex-col gap-6">
      <DashboardSurface accent="slate" className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <DashboardPill>Note editor</DashboardPill>
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                Note details
              </h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                Update content, archive it for later, or soft delete it safely.
              </p>
            </div>
          </div>

          <Link
            to="/notes"
            search={{ page: 1, status: "active" }}
            className="text-primary text-sm font-medium underline underline-offset-4"
          >
            Back to notes
          </Link>
        </div>
      </DashboardSurface>

      {!props.isOwner && (
        <div className="rounded-[24px] border border-amber-300/70 bg-amber-50/90 px-4 py-3 text-sm text-amber-900 shadow-sm dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-100">
          You can read this note because of its visibility, but only the owner
          can edit or manage it.
        </div>
      )}

      <DashboardSurface accent="blue" className="p-6">
        <form
          className="flex flex-col gap-6"
          onSubmit={(event) => {
            event.preventDefault();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="title"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                    </FieldContent>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      disabled={!props.isOwner || deleteNote.isPending}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="content"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Content</FieldLabel>
                    </FieldContent>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      aria-invalid={isInvalid}
                      disabled={!props.isOwner || deleteNote.isPending}
                      className="min-h-56"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="visibility"
              validators={{
                onChange: NoteUiVisibilitySchema,
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldContent>
                      <FieldLabel htmlFor={field.name}>Visibility</FieldLabel>
                      <FieldDescription>
                        Org, school, and class visibility are reserved until the
                        surrounding membership model lands.
                      </FieldDescription>
                    </FieldContent>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(
                          event.target.value as NoteUiVisibility,
                        )
                      }
                      aria-invalid={isInvalid}
                      disabled={!props.isOwner || deleteNote.isPending}
                      className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-10 rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-3"
                    >
                      {visibilityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label} - {option.description}
                        </option>
                      ))}
                    </select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
            <span>Visibility: {formatVisibility(props.note.visibility)}</span>
            <span>
              Updated {new Date(props.note.updatedAt).toLocaleString()}
            </span>
            {props.note.isArchived && <span>Archived</span>}
            {props.note.deletedAt && <span>Soft deleted</span>}
          </div>

          {props.isOwner ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button type="submit" disabled={updateNote.isPending}>
                {updateNote.isPending ? "Saving..." : "Save changes"}
              </Button>

              {props.note.isArchived || props.note.deletedAt ? (
                <Button
                  type="button"
                  variant="outline"
                  disabled={restoreNote.isPending}
                  onClick={() => restoreNote.mutate({ id: props.note.id })}
                >
                  {restoreNote.isPending ? "Restoring..." : "Restore note"}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  disabled={archiveNote.isPending}
                  onClick={() => archiveNote.mutate({ id: props.note.id })}
                >
                  {archiveNote.isPending ? "Archiving..." : "Archive note"}
                </Button>
              )}

              <Button
                type="button"
                variant="destructive"
                disabled={deleteNote.isPending || !!props.note.deletedAt}
                onClick={() => deleteNote.mutate({ id: props.note.id })}
              >
                {deleteNote.isPending ? "Deleting..." : "Delete note"}
              </Button>
            </div>
          ) : null}
        </form>
      </DashboardSurface>
    </div>
  );
}

function formatVisibility(visibility: string) {
  const normalized = visibility.toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

function getEditableVisibility(visibility: string): NoteUiVisibility {
  const result = NoteUiVisibilitySchema.safeParse(visibility);
  return result.success ? result.data : "PRIVATE";
}
