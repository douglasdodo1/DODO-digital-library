import { z } from "zod";

export const createUserSchema = z
  .object({
    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .regex(/^\d{11}$/, "CPF deve conter 11 dígitos"),
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(3, "deve conter pelo menos 3 caracteres")
      .max(100, "deve conter até 100 caracteres")
      .regex(/^[a-zA-Z\s]+$/, "Nome deve conter apenas letras e espaços"),
    mail: z.string().email("E-mail inválido"),
    password: z.string().min(1, "Senha é obrigatória").min(6, "Senha deve conter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "Confirmação de senha é obrigatória")
      .min(6, "Confirmação deve conter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });
