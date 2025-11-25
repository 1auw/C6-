import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, logActivity, createToken } from "@/lib/auth";
import { cookies } from "next/headers";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const login = (body.login || body.email || '').trim();
    const password = body.password || '';

    if (!login || !password) {
      return NextResponse.json(
        { success: false, error: 'Identifiant et mot de passe requis' },
        { status: 400 }
      );
    }

    // Chercher l'utilisateur par username ou email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: login },
          { email: login.toLowerCase() },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    // Vérifier si le compte est actif
    if (!user.isActive) {
      return NextResponse.json(
        { success: false, error: 'Compte désactivé' },
        { status: 403 }
      );
    }

    // Vérifier le mot de passe
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, error: 'Identifiants incorrects' },
        { status: 401 }
      );
    }

    // Créer un token de session
    const token = createToken(user.id);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 jours

    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';

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

    // Mettre à jour la dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Logger l'activité
    await logActivity('user_login', 'User logged in', user.id, ipAddress);

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
      message: 'Connexion réussie !',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erreur /api/auth/login:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
