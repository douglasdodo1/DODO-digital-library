import { z } from "zod";
import { materialCommonSchema } from "./material-common-schema";

export const createBookSchema = materialCommonSchema.extend({
  isbn: z.string().min(1, "ISBN é obrigatório"),
  pageNumbers: z.number().min(1, "Número de páginas é obrigatório"),
});

export type BookSchemaType = z.infer<typeof createBookSchema>;
