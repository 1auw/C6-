"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Clock, Trophy, Star, Car, Coins, Lock, Gift, ChevronRight, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface VoteSite {
  id: string;
  name: string;
  url: string;
  points: number;
  cooldown: string;
}

interface Reward {
  id: number;
  name: string;
  description: string;
  pointsCost: number;
  icon: any;
}

const voteSites: VoteSite[] = [
  { id: "liste-fivem", name: "Liste-FiveM", url: "https://liste-fivem.fr", points: 2, cooldown: "12h" },
  { id: "serveur-topliste", name: "Serveur Topliste", url: "https://serveur-topliste.fr", points: 2, cooldown: "12h" },
  { id: "topserveurs", name: "TopServeurs", url: "https://top-serveurs.net", points: 3, cooldown: "24h" },
];

const rewards: Reward[] = [
  { id: 1, name: "Pack Argent", description: "50 000$ en jeu", pointsCost: 5, icon: Coins },
  { id: 2, name: "Vehicule Premium", description: "Vehicule exclusif", pointsCost: 15, icon: Car },
  { id: 3, name: "VIP 7 jours", description: "Statut VIP temporaire", pointsCost: 25, icon: Star },
  { id: 4, name: "Pack Or", description: "150 000$ + cosmetiques", pointsCost: 35, icon: Coins },
  { id: 5, name: "Vehicule Luxe", description: "Vehicule haut de gamme", pointsCost: 50, icon: Car },
  { id: 6, name: "VIP 30 jours", description: "1 mois de VIP complet", pointsCost: 75, icon: Trophy },
];

export default function VotePage() {
  const [user, setUser] = useState<{ id: number; username: string; votePoints?: number; role?: string } | null>(null);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
          setUserPoints(data.user.votePoints || 0);
        }
      }
    } catch (err) {}
  };

  const handleVote = (site: VoteSite) => {
    if (!user) return;
    window.open(site.url, "_blank");
  };

  const handleClaim = (reward: Reward) => {
    if (!user || userPoints < reward.pointsCost) return;
    alert(`Recompense "${reward.name}" reclamee ! Un staff vous contactera.`);
    setUserPoints(prev => prev - reward.pointsCost);
  };

  const isStaff = user && ['ADMIN', 'OWNER'].includes(user.role?.toUpperCase() || '');

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-[#2a7cff]/5" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3">VOTER</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Soutenez Central6RP en votant sur les sites partenaires et gagnez des recompenses exclusives.
          </p>
        </div>

        {/* Points Display */}
        {user ? (
          <div className="max-w-sm mx-auto mb-10 bg-[#111] border border-yellow-500/30 rounded-lg p-6 text-center">
            <div className="text-sm text-yellow-400 mb-1">Vos points</div>
            <div className="text-4xl font-black text-white">{userPoints}</div>
          </div>
        ) : (
          <div className="max-w-sm mx-auto mb-10 bg-[#111] border border-white/10 rounded-lg p-6 text-center">
            <Lock size={24} className="mx-auto text-gray-500 mb-2" />
            <p className="text-gray-400 text-sm mb-3">Connectez-vous pour voter</p>
            <Link href="/login">
              <button className="bg-[#2a7cff] hover:bg-[#1e5fd4] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors">
                Se connecter
              </button>
            </Link>
          </div>
        )}

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vote Sites */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-[#2a7cff]" size={20} />
              Sites de vote
            </h2>

            <div className="space-y-3">
              {voteSites.map((site) => (
                <div
                  key={site.id}
                  className="bg-[#111] border border-white/10 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-white font-medium">{site.name}</h3>
                    <div className="flex items-center gap-3 text-sm mt-1">
                      <span className="text-yellow-400">+{site.points} pts</span>
                      <span className="text-gray-600">|</span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {site.cooldown}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleVote(site)}
                    disabled={!user}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      user
                        ? "bg-[#2a7cff] hover:bg-[#1e5fd4] text-white"
                        : "bg-white/5 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ExternalLink size={16} />
                    Voter
                  </button>
                </div>
              ))}
            </div>

            {/* How it works */}
            <div className="mt-6 bg-[#2a7cff]/10 border border-[#2a7cff]/30 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Comment ca marche ?</h4>
              <ol className="text-sm text-gray-400 space-y-1">
                <li>1. Cliquez sur "Voter" pour ouvrir le site</li>
                <li>2. Completez le vote sur le site externe</li>
                <li>3. Les points sont credites automatiquement</li>
                <li>4. Echangez vos points contre des recompenses</li>
              </ol>
            </div>
          </div>

          {/* Rewards */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Gift className="text-yellow-400" size={20} />
              Recompenses
            </h2>

            <div className="space-y-3">
              {rewards.map((reward) => {
                const Icon = reward.icon;
                const canAfford = user && userPoints >= reward.pointsCost;
                
                return (
                  <div
                    key={reward.id}
                    className={`bg-[#111] border rounded-lg p-4 flex items-center justify-between ${
                      canAfford ? "border-yellow-500/30" : "border-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <Icon size={20} className="text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium text-sm">{reward.name}</h3>
                        <p className="text-gray-500 text-xs">{reward.description}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-sm font-bold mb-1 ${canAfford ? "text-yellow-400" : "text-gray-500"}`}>
                        {reward.pointsCost} pts
                      </div>
                      {user ? (
                        <button
                          onClick={() => handleClaim(reward)}
                          disabled={!canAfford}
                          className={`text-xs px-3 py-1.5 rounded font-medium transition-colors ${
                            canAfford
                              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                              : "bg-white/5 text-gray-600 cursor-not-allowed"
                          }`}
                        >
                          {canAfford ? "Reclamer" : "Insuffisant"}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-600">Connexion requise</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Staff Section */}
        {isStaff && (
          <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="text-yellow-400" size={20} />
              Vue Staff
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-[#111] border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white">0</div>
                <div className="text-xs text-gray-500">Votes ce mois</div>
              </div>
              <div className="bg-[#111] border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">0</div>
                <div className="text-xs text-gray-500">Points distribues</div>
              </div>
              <div className="bg-[#111] border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-400">0</div>
                <div className="text-xs text-gray-500">Recompenses</div>
              </div>
              <div className="bg-[#111] border border-white/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-[#2a7cff]">0</div>
                <div className="text-xs text-gray-500">Votants uniques</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
