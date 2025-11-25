/**
 * Connexion à la base de données Prisma
 * Utilise PlanetScale (MySQL gratuit) ou Supabase (PostgreSQL)
 */

import { PrismaClient } from '@prisma/client';

// Singleton Prisma Client pour éviter les connexions multiples
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


