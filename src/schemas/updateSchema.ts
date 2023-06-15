import { z } from "zod";

export const updateSchema = z.object({
  nome: z.string().min(2).max(25),
  idade: z.number().min(0).max(100),
});
