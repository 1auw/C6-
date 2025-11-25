import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';

// POST - Reclamer une recompense
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Non autorise' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rewardId } = body;

    // Recuperer la recompense
    const reward = await prisma.voteReward.findUnique({
      where: { id: rewardId }
    });

    if (!reward) {
      return NextResponse.json(
        { success: false, error: 'Recompense non trouvee' },
        { status: 404 }
      );
    }

    if (!reward.isActive) {
      return NextResponse.json(
        { success: false, error: 'Cette recompense n\'est plus disponible' },
        { status: 400 }
      );
    }

    // Recuperer les points de l'utilisateur
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { votePoints: true, username: true }
    });

    if (!userData || userData.votePoints < reward.pointsCost) {
      return NextResponse.json(
        { success: false, error: 'Points insuffisants' },
        { status: 400 }
      );
    }

    // Deduire les points
    await prisma.user.update({
      where: { id: user.id },
      data: {
        votePoints: { decrement: reward.pointsCost }
      }
    });

    // Enregistrer dans les logs
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'vote_reward_claimed',
        details: `Recompense reclamee: ${reward.name} (${reward.pointsCost} points)`,
        ipAddress: req.headers.get('x-forwarded-for') || 'unknown'
      }
    });

    return NextResponse.json({
      success: true,
      message: `Recompense "${reward.name}" reclamee avec succes!`,
      newBalance: userData.votePoints - reward.pointsCost
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

