"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@notebook/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@notebook/ui/components/form";
import { Input } from "@notebook/ui/components/input";
import { authClient } from "@/src/lib/auth-client";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@notebook/ui/components/tooltip";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@notebook/ui/components/input-group";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email().min(6, {
    message: "Invalid email",
  }),
  password: z
    .string()
    .min(6)
    .regex(
      // password should follow one capital letter, one small letter, one number, one special character
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message: "Invalid password",
      }
    ),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    authClient.signIn
      .email({
        email: values.email,
        password: values.password,

        rememberMe: false,
      })
      .then(({ data, error }) => {
        if (error) {
          toast.error(error?.message || "Something went wrong");
        }
        console.log(data);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <InputGroup>
                <FormControl>
                  <InputGroupInput
                    {...field}
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
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
