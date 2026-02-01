import { z } from "zod";

export const roleEnum = ["SUPER_ADMIN", "ADMIN", "STUDENT"] as const;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name should be at least 2 characters").max(50, "Name should be max 50 characters"),
    email: z
      .email("Invalid Email Format")
      .min(2, "Email should be at least minimum of two characters")
      .max(50, "Email should be maximum of 50 characters"),

    role: z.enum(roleEnum),

    password: z
      .string("Password must be string")
      .min(6, "Password must include at least 6 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter"),

    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"], // ✅ error will show under confirmPassword field
  });
