import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod/v4";

import type { NoteUiVisibility } from "@repo/validators";
import { Button } from "@repo/ui/components/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { toast } from "@repo/ui/components/toast";
import { NoteUiVisibilitySchema } from "@repo/validators";

import {
  DashboardPill,
  DashboardSurface,
} from "@/components/dashboard-surface";
import { useTRPC } from "@/lib/trpc";

const CreateNoteFormSchema = z.object({
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

const uiVisibilityOptions: {
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

export function CreateNoteForm() {
  const trpc = useTRPC();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      visibility: "PRIVATE" as NoteUiVisibility,
    },
    validators: {
      onSubmit: CreateNoteFormSchema,
    },
    onSubmit: ({ value }) => createNote.mutate(value),
  });

  const createNote = useMutation(
    trpc.note.create.mutationOptions({
      onSuccess: async (note) => {
        if (!note) {
          toast.error("Failed to create note");
          return;
        }

        form.reset();
        await queryClient.invalidateQueries(trpc.note.pathFilter());
        toast.success("Note created");
        await navigate({
          to: "/notes/$noteId",
          params: { noteId: note.id },
          search: {
            page: 1,
            status: "active",
          },
        });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create note");
      },
    }),
  );

  return (
    <DashboardSurface accent="emerald" className="p-6">
      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <div className="space-y-3">
          <DashboardPill>Create structure</DashboardPill>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Create note
            </h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              Start with a personal draft, then expand visibility when the note
              is ready for classmates or wider sharing.
            </p>
          </div>
        </div>

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
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Biology exam study guide"
                    aria-invalid={isInvalid}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                    onChange={(event) => field.handleChange(event.target.value)}
                    placeholder="Capture your key ideas, tasks, or study notes here..."
                    aria-invalid={isInvalid}
                    className="min-h-40"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  </FieldContent>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) =>
                      field.handleChange(event.target.value as NoteUiVisibility)
                    }
                    aria-invalid={isInvalid}
                    className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-10 rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-3"
                  >
                    {uiVisibilityOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} - {option.description}
                      </option>
                    ))}
                  </select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={createNote.isPending}
          className="w-full"
        >
          {createNote.isPending ? "Creating note..." : "Create note"}
        </Button>
      </form>
    </DashboardSurface>
  );
}
