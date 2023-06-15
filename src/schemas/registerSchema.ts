import { z } from "zod";

export const registerSchema = z.object({
  nome: z.string().min(2).max(25),
  username: z.string().min(4).max(15),
  password: z.string().min(7).max(20),
});
