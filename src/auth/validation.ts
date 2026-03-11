import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .email("Masukkan alamat email yang valid.")
  .transform((value) => value.toLowerCase());

const passwordSchema = z
  .string()
  .min(8, "Password minimal 8 karakter.")
  .max(72, "Password maksimal 72 karakter.")
  .regex(/[A-Za-z]/, "Password harus mengandung huruf.")
  .regex(/\d/, "Password harus mengandung angka.");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Masukkan password."),
});

export const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nama minimal 2 karakter.")
    .max(80, "Nama terlalu panjang."),
  email: emailSchema,
  password: passwordSchema,
});

export const emailOnlySchema = z.object({
  email: emailSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
