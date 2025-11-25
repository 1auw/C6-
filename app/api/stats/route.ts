import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Récupérer les stats FiveM en temps réel
 */
async function fetchFiveMStats(fivemIp: string = '127.0.0.1', fivemPort: string = '30120') {
  const infoUrl = `http://${fivemIp}:${fivemPort}/info.json`;
  const playersUrl = `http://${fivemIp}:${fivemPort}/players.json`;

  try {
    // Récupérer les infos du serveur
    const infoResponse = await fetch(infoUrl, {
      signal: AbortSignal.timeout(3000),
    });
    
    let maxPlayers = 32;
    let serverOnline = false;

    if (infoResponse.ok) {
      const info = await infoResponse.json();
      maxPlayers = parseInt(info?.vars?.sv_maxclients || info?.maxClients || '32', 10);
      serverOnline = true;
    }

    // Récupérer la liste des joueurs
    let playersOnline = 0;
    try {
      const playersResponse = await fetch(playersUrl, {
        signal: AbortSignal.timeout(3000),
      });
      
      if (playersResponse.ok) {
        const players = await playersResponse.json();
        if (Array.isArray(players)) {
          playersOnline = players.length;
        }
      }
    } catch {
      // Ignorer les erreurs de récupération des joueurs
    }

    return {
      players_online: playersOnline,
      max_players: maxPlayers,
      server_status: serverOnline ? 'En ligne' : 'Hors ligne',
    };
  } catch {
    return {
      players_online: 0,
      max_players: 32,
      server_status: 'Hors ligne',
    };
  }
}

export async function GET() {
  try {
    // Récupérer les stats depuis la BDD
    const serverStat = await prisma.serverStat.findFirst({
      orderBy: { lastUpdated: 'desc' },
    });

    // Compter le total d'utilisateurs
    const totalUsers = await prisma.user.count();

    // Stats FiveM (optionnel - à configurer via variables d'environnement)
    const fivemIp = process.env.FIVEM_IP || '127.0.0.1';
    const fivemPort = process.env.FIVEM_PORT || '30120';
    
    let fivemStats = {
      players_online: serverStat?.playersOnline || 0,
      max_players: serverStat?.maxPlayers || 32,
      server_status: 'Hors ligne',
    };

    // Si FiveM est configuré, essayer de récupérer les stats en temps réel
    if (fivemIp !== '127.0.0.1' || process.env.FIVEM_ENABLED === 'true') {
      fivemStats = await fetchFiveMStats(fivemIp, fivemPort);
    }

    return NextResponse.json({
      success: true,
      stats: {
        players_online: fivemStats.players_online,
        max_players: fivemStats.max_players,
        total_users: totalUsers,
        server_status: fivemStats.server_status,
        shop_items: 5, // À implémenter si nécessaire
      },
    });
  } catch (error) {
    console.error('Erreur /api/stats:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur',
        stats: {
          players_online: 0,
          max_players: 32,
          total_users: 0,
          server_status: 'Hors ligne',
          shop_items: 5,
        },
      },
      { status: 500 }
    );
  }
}
