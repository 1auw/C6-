import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, logActivity, createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des champs
    const username = (body.username || '').trim();
    const email = (body.email || '').trim().toLowerCase();
    const password = body.password || '';
    const passwordConfirm = body.password_confirm || '';

    const errors: string[] = [];

    // Validation du nom d'utilisateur
    if (!username) {
      errors.push('Le nom d\'utilisateur est requis');
    } else if (username.length < 3 || username.length > 50) {
      errors.push('Le nom d\'utilisateur doit contenir entre 3 et 50 caractères');
    } else if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      errors.push('Le nom d\'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores');
    }

    // Validation de l'email
    if (!email) {
      errors.push('L\'email est requis');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Email invalide');
    }

    // Validation du mot de passe
    if (!password) {
      errors.push('Le mot de passe est requis');
    } else if (password.length < 8) {
      errors.push('Le mot de passe doit contenir au moins 8 caractères');
    } else if (password !== passwordConfirm) {
      errors.push('Les mots de passe ne correspondent pas');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Vérifier si le nom d'utilisateur existe déjà
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return NextResponse.json(
          { success: false, error: 'Ce nom d\'utilisateur est déjà pris' },
          { status: 400 }
        );
      }
      if (existingUser.email === email) {
        return NextResponse.json(
          { success: false, error: 'Cet email est déjà utilisé' },
          { status: 400 }
        );
      }
    }

    // Hasher le mot de passe
    const passwordHash = await hashPassword(password);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: passwordHash,
        role: 'USER',
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });

    // Logger l'activité
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    await logActivity('user_registered', `Username: ${username}`, user.id, ipAddress);

    // Créer un token de session
    const token = createToken(user.id);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 jours

    // Créer la session dans la BDD
    await prisma.session.create({
      data: {
        userId: user.id,
        sessionToken: token,
        ipAddress,
        userAgent: request.headers.get('user-agent') || 'unknown',
        expiresAt,
      },
    });

    // Définir le cookie
    const cookieStore = await cookies();
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expiresAt,
      path: '/',
    });

    return NextResponse.json({
      success: true,
      message: 'Compte créé avec succès !',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erreur /api/auth/register:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création du compte' },
      { status: 500 }
    );
  }
}
