import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Note: Dans une vraie application, ces paramètres seraient stockés en base de données
// Pour l'instant, on utilise les variables d'environnement et des valeurs par défaut

const defaultSettings = {
  server_name: "Central 6RP",
  server_ip: process.env.FIVEM_IP || "127.0.0.1:30120",
  max_players: parseInt(process.env.FIVEM_MAX_PLAYERS || "32"),
  discord_link: "https://discord.gg/central6rp",
  discord_webhook: process.env.DISCORD_WEBHOOK || "",
  fivem_connect: "fivem://connect/cfx.re/join/drvao5",
  maintenance_mode: process.env.MAINTENANCE_MODE === "true",
};

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

    if (!['ADMIN', 'OWNER'].includes(currentUser.role)) {
      return NextResponse.json(
        { success: false, error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      settings: defaultSettings,
    });
  } catch (error) {
    console.error("Erreur GET /api/admin/settings:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

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

    if (!['ADMIN', 'OWNER'].includes(currentUser.role)) {
      return NextResponse.json(
        { success: false, error: "Accès non autorisé" },
        { status: 403 }
      );
    }

    const body = await request.json();
    
    // Note: Dans une vraie application, on sauvegarderait ces paramètres en base de données
    // Pour l'instant, on retourne simplement un succès
    // Les paramètres devraient être stockés dans une table de configuration
    
    console.log("Settings received:", body);

    return NextResponse.json({
      success: true,
      message: "Paramètres enregistrés avec succès",
      settings: body,
    });
  } catch (error) {
    console.error("Erreur POST /api/admin/settings:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
