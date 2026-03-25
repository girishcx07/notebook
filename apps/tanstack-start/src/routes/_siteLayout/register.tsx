import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SparklesIcon } from "lucide-react";
import { z } from "zod";

import { Button } from "@acme/ui/components/button";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@acme/ui/components/field";
import { Input } from "@acme/ui/components/input";
import { toast } from "@acme/ui/components/toast";

import { authClient } from "@/auth/client";

export const Route = createFileRoute("/_siteLayout/register")({
  component: RegisterPage,
});

const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: RegisterSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true);
      try {
        const res = await authClient.signUp.email({
          name: value.name,
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
    <div className="bg-background flex flex-1 flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="w-full max-w-[400px]"
      >
        {/* Form heading */}
        <div className="mb-7 flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight">
            Create an account
          </h1>
          <p className="text-muted-foreground text-sm">
            Start managing your visa workflows today
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
          className="flex flex-col"
        >
          <FieldGroup className="gap-0">
            {/* Name */}
            <form.Field
              name="name"
              children={(field) => (
                <Field
                  className="mb-4"
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                  </FieldContent>
                  <Input
                    id={field.name}
                    type="text"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="John Doe"
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </Field>
              )}
            />

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
                  <FieldContent>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
          </FieldGroup>

          {/* Submit */}
          <Button type="submit" className="mb-5 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>

          {/* Sign in link */}
          <p className="text-muted-foreground text-center text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate({ to: "/login" })}
              className="text-foreground hover:text-primary font-medium underline underline-offset-4 transition-colors"
            >
              Sign in
            </button>
          </p>
        </form>

        {/* Terms */}
        <p className="text-muted-foreground/60 mt-6 text-center text-xs">
          By creating an account you agree to our{" "}
          <a
            href="/terms"
            className="hover:text-muted-foreground underline underline-offset-4 transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="hover:text-muted-foreground underline underline-offset-4 transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
}
