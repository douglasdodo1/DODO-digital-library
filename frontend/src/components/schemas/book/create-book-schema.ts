import { z } from "zod";
import { materialCommonSchema } from "../material-common-schema";

export const createBookSchema = materialCommonSchema.extend({
  isbn: z
    .string()
    .min(1, "ISBN é obrigatório")
    .regex(/^\d{13}$/, "ISBN deve conter exatamente 13 digitos númerericos "),
  pageNumbers: z.number().min(1, "Número de páginas deve ser maior que 0"),
});

export type BookSchemaType = z.infer<typeof createBookSchema>;
