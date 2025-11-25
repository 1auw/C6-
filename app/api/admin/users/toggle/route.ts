import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser, logActivity } from "@/lib/auth";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    // Vérifier que l'utilisateur est admin
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: "Non authentifié" },
        { status: 401 }
      );
    }

    if (currentUser.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { user_id, is_active } = body;

    if (typeof user_id !== "number" || typeof is_active !== "boolean") {
      return NextResponse.json(
        { success: false, error: "Paramètres invalides" },
        { status: 400 }
      );
    }

    // Empêcher l'admin de se désactiver lui-même
    if (user_id === currentUser.id) {
      return NextResponse.json(
        { success: false, error: "Vous ne pouvez pas modifier votre propre statut" },
        { status: 400 }
      );
    }

    // Mettre à jour le statut de l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: user_id },
      data: { isActive: is_active },
      select: {
        id: true,
        username: true,
        isActive: true,
      },
    });

    // Logger l'activité
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    
    await logActivity(
      is_active ? 'user_activated' : 'user_deactivated',
      `User ${updatedUser.username} ${is_active ? 'activated' : 'deactivated'} by admin`,
      currentUser.id,
      ipAddress
    );

    return NextResponse.json({
      success: true,
      message: `Utilisateur ${is_active ? 'activé' : 'désactivé'} avec succès`,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Erreur /api/admin/users/toggle:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
