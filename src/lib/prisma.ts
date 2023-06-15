import { PrismaClient } from "@prisma/client";
export type { Administrador, Aluno } from "@prisma/client";
export { Prisma } from "@prisma/client";
export const prisma = new PrismaClient();
