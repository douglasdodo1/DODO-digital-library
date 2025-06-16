import { z } from "zod";
import { materialCommonSchema } from "./material-common-schema";

export const createArticleSchema = materialCommonSchema.extend({
  doi: z.string().min(1, "doi é obrigatório").min(13, "DOI deve conter 13 digitos"),
  language: z.string().min(1, "Idioma é obrigatório"),
});

export type ArticleSchemaType = z.infer<typeof createArticleSchema>;
