import { z } from "zod";
import { materialCommonSchema } from "./material-common-schema";

export const videoSchema = materialCommonSchema.extend({
  durationMinutes: z.string().min(1, "Duração é obrigatória"),
  language: z.string().min(1, "Idioma é obrigatório"),
});

export type VideoSchemaType = z.infer<typeof videoSchema>;
