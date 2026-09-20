import { z } from "zod";

export const emailSchema = z
  .string()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email address" });

export const passwordSchema = z
  .string()
  .min(6, { message: "Password must be at least 6 characters" });

export const nameSchema = z
  .string()
  .min(2, { message: "Name must be at least 2 characters" });

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
