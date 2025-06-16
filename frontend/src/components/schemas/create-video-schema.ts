import { z } from "zod";
import { materialCommonSchema } from "./material-common-schema";

export const createVideoSchema = materialCommonSchema.extend({
  durationMinutes: z.number().min(1, "Duração é obrigatória"),
});

export type VideoSchemaType = z.infer<typeof createVideoSchema>;
