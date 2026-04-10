import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreatePostSchema } from "@acme/db/schema";
import { Button } from "@acme/ui/components/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@acme/ui/components/field";
import { Input } from "@acme/ui/components/input";
import { Textarea } from "@acme/ui/components/textarea";
import { toast } from "@acme/ui/components/toast";

import {
  DashboardPill,
  DashboardSurface,
} from "@/components/dashboard-surface";
import { useTRPC } from "@/lib/trpc";

export function CreatePostForm() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createPost = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: async () => {
        form.reset();
        await queryClient.invalidateQueries(trpc.post.pathFilter());
      },
      onError: (err) => {
        toast.error(
          err.data?.code === "UNAUTHORIZED"
            ? "You must be logged in to post"
            : "Failed to create post",
        );
      },
    }),
  );

  const form = useForm({
    defaultValues: {
      content: "",
      title: "",
    },

    validators: {
      onSubmit: CreatePostSchema,
    },
    onSubmit: ({ value }) => createPost.mutate(value),
  });

  return (
    <DashboardSurface accent="amber" className="p-6">
      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <div className="space-y-3">
          <DashboardPill>Community widget</DashboardPill>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Create a post
            </h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              Share a short update, announcement, or learning insight without
              leaving the dashboard.
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
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Weekly classroom update"
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
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    placeholder="Summarize what changed, what students should do next, or what is ready to review."
                    className="min-h-32"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>

        <Button type="submit" className="w-full">
          Create post
        </Button>
      </form>
    </DashboardSurface>
  );
}
