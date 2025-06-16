import { z } from "zod";

export const materialCommonSchema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  category: z.string().min(1, "Categoria é obrigatória"),
  description: z.string().optional(),
  status: z.enum(["published", "enviado", "rascunho"]),
  authorName: z.string().min(1, "Autor é obrigatório"),
  authorType: z.enum(["person", "institution"]),
  personDateOfBirth: z.string().min(1, "Data de nascimento é obrigatória"),
  publicationDate: z.string().min(1, "Data de publicação é obrigatória"),
});
