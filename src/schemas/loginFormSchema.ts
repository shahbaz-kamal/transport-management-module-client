import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid Email Format")
    .max(50, "Email should be maximum of 50 characters"),
  password: z.string().min(1, "Password is required"),
});
