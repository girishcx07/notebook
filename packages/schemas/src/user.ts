import * as z from "zod";

const emailSchema = z
  .string()
  .email({
    message: "Invalid email",
  })
  .min(1, {
    message: "Email is required",
  });

const passwordSchema = z
  .string()
  .min(6)
  .regex(
    // password should follow one capital letter, one small letter, one number, one special character
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message: "Invalid password",
    }
  );

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    firstName: z.string().min(3, {
      message: "Name must be at least 3 characters long",
    }),
    lastName: z.string().min(3, {
      message: "Name must be at least 3 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
