import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";

import { Button } from "@acme/ui/components/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@acme/ui/components/field";
import { Input } from "@acme/ui/components/input";
import { toast } from "@acme/ui/components/toast";
import { cn } from "@acme/ui/lib/utils";

import { GitHubIcon, GoogleIcon } from "@/assets/icons";
import { authClient } from "@/auth/client";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit({ value }) {
        const res = LoginSchema.safeParse(value);
        if (!res.success) {
          return "Please check your email and password";
        }
      },
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        const res = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        });

        if (res.error) {
          toast.error(res.error.message ?? "Failed to register");
        } else {
          toast.success("Successfully registered");
          await navigate({ to: "/" });
        }
      } catch {
        toast.error("An unexpected error occurred");
      } finally {
        setIsSubmitting(false);
      }
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
        <div className="mb-7 flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Login to your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your email below to continue
          </p>
        </div>
        {/* Email */}
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

        {/* Password */}
        <form.Field
          name="password"
          children={(field) => (
            <Field
              className="mb-5"
              data-invalid={
                field.state.meta.isTouched && !field.state.meta.isValid
              }
            >
              <FieldContent className="flex-row justify-between">
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Link
                  to="/forgot-password"
                  className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 transition-colors hover:underline"
                >
                  Forgot your password?
                </Link>
              </FieldContent>
              <Input
                id={field.name}
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Min. 8 characters"
              />
              {field.state.meta.isTouched && !field.state.meta.isValid && (
                <FieldError errors={field.state.meta.errors} />
              )}
            </Field>
          )}
        />
        {/* Submit */}
        <Field className="mb-4">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Field>

        {/* Divider */}
        <div className="relative mb-4">
          <FieldSeparator>Or continue with</FieldSeparator>
        </div>

        {/* OAuth */}
        <Field className="mb-5 flex flex-col gap-2 md:flex-row">
          {/* GitHub Login */}
          <Button variant="outline" type="button" className="md:flex-1">
            <GitHubIcon />
            Login with GitHub
          </Button>
          {/* Google Login */}
          <Button variant="outline" type="button" className="md:flex-1">
            <GoogleIcon />
            Login with Google
          </Button>
        </Field>

        {/* Sign up link */}
        <FieldDescription className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-foreground hover:text-primary font-medium underline underline-offset-4 transition-colors"
          >
            Sign up
          </a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
