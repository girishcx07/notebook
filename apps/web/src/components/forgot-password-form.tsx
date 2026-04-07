import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { cn } from "@acme/ui";
import { Button } from "@acme/ui/components/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@acme/ui/components/field";
import { Input } from "@acme/ui/components/input";

import { authClient } from "@/auth/client";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await authClient.forgetPassword({
        email,
        redirectTo: "/reset-password", // where user lands after clicking email link
      });
      if (error) {
        throw new Error(error.message ?? "An error occurred");
      }
      return data;
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onChange({ value }) {
        if (!value.email) return;
        const res = ForgotPasswordSchema.safeParse(value);
        return res.success ? undefined : "Please enter a valid email address";
      },
      onSubmit({ value }) {
        const res = ForgotPasswordSchema.safeParse(value);
        return res.success ? undefined : "Please enter a valid email address";
      },
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value.email);
    },
  });

  return (
    <form
      className={cn("flex flex-col", className)}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      {...props}
    >
      <FieldGroup className="gap-0">
        <form.Field
          name="email"
          children={(field) => (
            <Field
              className="mb-4"
              data-invalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
            >
              <FieldContent>
                <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
              </FieldContent>
              <Input
                id={field.name}
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="name@example.com"
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        />

        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? "Sending..." : "Send Reset Link"}
        </Button>

        {/* ✅ success state */}
        {mutation.isSuccess && (
          <p className="text-center text-sm text-green-600">
            Reset link sent! Check your email.
          </p>
        )}

        {/* ❌ error state */}
        {mutation.isError && (
          <p className="text-center text-sm text-red-600">
            Something went wrong. Try again.
          </p>
        )}
      </FieldGroup>
    </form>
  );
}
