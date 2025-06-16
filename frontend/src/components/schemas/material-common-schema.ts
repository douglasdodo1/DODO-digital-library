import { z } from "zod";

export const materialCommonSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(3, "Título não pode ter menos de três digitos")
    .max(100, "Título deve conter no máximo 100 digitos"),
  category: z.string().min(1, "Categoria é obrigatória"),
  description: z.string().optional(),
  status: z.enum(["publicado", "enviado", "rascunho"]),
  authorName: z
    .string()
    .min(1, "Nome do autor é obrigatório")
    .min(3, "Nome do autor deve conter pelo menos 3 digitos")
    .max(120, "Nome do autor deve conter no máximo 120 digitos"),
  authorType: z.enum(["person", "institution"]),
  personDateOfBirth: z.string().optional(),
  institutionCity: z.string().optional(),
  publicationDate: z
    .string()
    .min(1, "Data de publicação é obrigatória")
    .refine(
      (dateStr) => {
        const date = new Date(dateStr);
        return !isNaN(date.getTime()) && date <= new Date();
      },
      {
        message: "Data inválida ou no futuro",
      }
    ),
});
