import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// GET - Recuperer les points de vote de l'utilisateur
export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorise' },
        { status: 401 }
      );
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { votePoints: true }
    });

    return NextResponse.json({
      success: true,
      points: userData?.votePoints || 0
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// POST - Enregistrer un vote (appele par callback des sites de vote)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, site, points = 1 } = body;

    // Verifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Utilisateur non trouve' },
        { status: 404 }
      );
    }

    // Verifier le cooldown (12h par defaut)
    const cooldownHours = 12;
    const cooldownTime = new Date(Date.now() - cooldownHours * 60 * 60 * 1000);

    const recentVote = await prisma.vote.findFirst({
      where: {
        userId: userId,
        site: site,
        createdAt: { gte: cooldownTime }
      }
    });

    if (recentVote) {
      return NextResponse.json(
        { success: false, error: 'Vous avez deja vote recemment sur ce site' },
        { status: 429 }
      );
    }

    // Enregistrer le vote
    await prisma.vote.create({
      data: {
        userId: userId,
        site: site,
        points: points
      }
    });

    // Ajouter les points a l'utilisateur
    await prisma.user.update({
      where: { id: userId },
      data: {
        votePoints: { increment: points }
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Vote enregistre',
      pointsAdded: points
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

