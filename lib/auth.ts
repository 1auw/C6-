/**
 * Utilitaires d'authentification
 */

import { cookies } from 'next/headers';
import { prisma } from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret_jwt_changez_moi_en_production';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'USER' | 'MODERATOR' | 'ADMIN';
  isActive: boolean;
}

/**
 * Créer un token JWT pour l'utilisateur
 */
export function createToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

/**
 * Vérifier et décoder un token JWT
 */
export function verifyToken(token: string): { userId: number } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Récupérer l'utilisateur connecté depuis les cookies
 */
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return null;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    if (!user || !user.isActive) {
      return null;
    }

    return user as User;
  } catch {
    return null;
  }
}

/**
 * Vérifier si l'utilisateur est connecté
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Vérifier si l'utilisateur est admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'ADMIN';
}

/**
 * Hasher un mot de passe
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Vérifier un mot de passe
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Logger une activité
 */
export async function logActivity(
  action: string,
  details: string | null,
  userId: number | null,
  ipAddress: string
): Promise<void> {
  try {
    await prisma.activityLog.create({
      data: {
        action,
        details,
        userId: userId || null,
        ipAddress,
      },
    });
  } catch (error) {
    console.error('Erreur lors du log:', error);
    // Ne pas faire échouer la requête si le log échoue
  }
}


