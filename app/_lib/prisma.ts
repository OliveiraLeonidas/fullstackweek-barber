import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}
/* Garante que usamos sempre a mesma conexão com o banco de dados, evitando assim, a criação de novas instâncias e sobrecarregando a aplicação */
let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
