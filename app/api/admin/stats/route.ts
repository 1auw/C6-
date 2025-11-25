import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
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

    // Calculer les statistiques
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalUsers,
      activeUsers,
      admins,
      totalLogs,
      loginsToday,
      registrationsToday,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.activityLog.count(),
      prisma.activityLog.count({
        where: {
          action: 'user_login',
          createdAt: { gte: today },
        },
      }),
      prisma.activityLog.count({
        where: {
          action: 'user_registered',
          createdAt: { gte: today },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        total_users: totalUsers,
        active_users: activeUsers,
        admins: admins,
        total_logs: totalLogs,
        logins_today: loginsToday,
        registrations_today: registrationsToday,
      },
    });
  } catch (error) {
    console.error("Erreur /api/admin/stats:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
