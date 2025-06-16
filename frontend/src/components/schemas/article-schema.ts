import { z } from "zod";
import { materialCommonSchema } from "./material-common-schema";

export const articleSchema = materialCommonSchema.extend({
  doi: z.string().min(1, "DOI é obrigatório"),
  language: z.string().min(1, "Idioma é obrigatório"),
});

export type ArticleSchemaType = z.infer<typeof articleSchema>;
