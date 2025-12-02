"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/src/lib/auth-client";

import { EyeIcon, EyeOffIcon, InfoIcon } from "lucide-react";

import { Button } from "@notebook/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@notebook/ui/components/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@notebook/ui/components/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@notebook/ui/components/input-group";
import { Input } from "@notebook/ui/components/input";
import { useState } from "react";

// import UploadProfile from "./upload-profile"; // TODO: Add upload profile

import { registerSchema } from "@notebook/schemas";

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    await authClient.signUp
      .email(
        {
          email: values.email,
          password: values.password,
          name: `${values.firstName} ${values.lastName}`,
        },
        {
          onSuccess: () => {
            toast.success("User registered successfully");
            onSuccess?.();
          },
        }
      )
      .then(({ data, error }) => {
        if (error) {
          toast.error(error?.message || "Something went wrong");
        }
        if (data?.user) {
          toast.success("User registered successfully");
          onSuccess?.();
        }
      })
      .catch((error) => {
        toast.error(error?.message || "Something went wrong");
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field, formState: { isSubmitting } }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field, formState: { isSubmitting } }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input disabled={isSubmitting} placeholder="Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, formState: { isSubmitting } }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="john.doe@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, formState: { isSubmitting } }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <FormControl>
                  <InputGroupInput
                    disabled={isSubmitting}
                    {...field}
                    placeholder="Enter password"
                    type="password"
                  />
                </FormControl>
                <InputGroupAddon align="inline-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Info"
                        size="icon-xs"
                      >
                        <InfoIcon />
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Password must be at least 8 characters</p>
                    </TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, formState: { isSubmitting } }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <FormControl>
                  <InputGroupInput
                    {...field}
                    disabled={isSubmitting}
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                  />
                </FormControl>
                <InputGroupAddon align="inline-end">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InputGroupButton
                        variant="ghost"
                        aria-label="Info"
                        size="icon-xs"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      </InputGroupButton>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Password must be at least 8 characters</p>
                    </TooltipContent>
                  </Tooltip>
                </InputGroupAddon>
              </InputGroup>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
