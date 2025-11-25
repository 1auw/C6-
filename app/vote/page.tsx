"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Vote as VoteIcon, Gift, ExternalLink, Clock, Trophy, Star, Car, Coins, CheckCircle, Lock, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface VoteSite {
  id: string;
  name: string;
  url: string;
  points: number;
  cooldown: string;
  canVote: boolean;
  lastVote?: string;
}

interface Reward {
  id: number;
  name: string;
  description: string;
  pointsCost: number;
  icon: any;
  color: string;
  claimed?: boolean;
}

const voteSites: VoteSite[] = [
  {
    id: "liste-fivem",
    name: "Liste-FiveM",
    url: "https://liste-fivem.fr/serveur/central6rp",
    points: 2,
    cooldown: "12h",
    canVote: true
  },
  {
    id: "serveur-topliste",
    name: "Serveur Topliste",
    url: "https://serveur-topliste.fr/fivem/central6rp",
    points: 2,
    cooldown: "12h",
    canVote: true
  },
  {
    id: "topserveurs",
    name: "TopServeurs",
    url: "https://top-serveurs.net/fivem/central6rp",
    points: 3,
    cooldown: "24h",
    canVote: false,
    lastVote: "Il y a 8h"
  },
];

const rewards: Reward[] = [
  {
    id: 1,
    name: "Pack Argent",
    description: "50 000$ en jeu pour booster votre demarrage.",
    pointsCost: 5,
    icon: Coins,
    color: "from-gray-400 to-gray-600"
  },
  {
    id: 2,
    name: "Vehicule Premium",
    description: "Un vehicule exclusif (modele choisi par le staff).",
    pointsCost: 15,
    icon: Car,
    color: "from-blue-400 to-blue-600"
  },
  {
    id: 3,
    name: "VIP 7 jours",
    description: "Acces temporaire au statut VIP avec bonus RP.",
    pointsCost: 25,
    icon: Star,
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: 4,
    name: "Pack Or",
    description: "150 000$ en jeu + items cosmetiques exclusifs.",
    pointsCost: 35,
    icon: Coins,
    color: "from-yellow-500 to-yellow-700"
  },
  {
    id: 5,
    name: "Vehicule Luxe",
    description: "Un vehicule haut de gamme de votre choix (liste staff).",
    pointsCost: 50,
    icon: Car,
    color: "from-purple-400 to-purple-600"
  },
  {
    id: 6,
    name: "VIP 30 jours",
    description: "Un mois complet de statut VIP avec tous les avantages.",
    pointsCost: 75,
    icon: Trophy,
    color: "from-orange-400 to-red-500"
  },
];

export default function VotePage() {
  const [user, setUser] = useState<{ id: number; username: string; votePoints?: number; role?: string } | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);
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
          setUserPoints(data.user.votePoints || 12); // Demo points
        }
      }
    } catch (err) {
      // Non connecte
    }
  };

  const handleVote = (site: VoteSite) => {
    if (!user) {
      return;
    }
    // Ouvrir le site de vote dans un nouvel onglet
    window.open(site.url, "_blank");
  };

  const handleClaimReward = (reward: Reward) => {
    if (!user) return;
    if (userPoints < reward.pointsCost) {
      alert("Vous n'avez pas assez de points !");
      return;
    }
    alert(`Recompense "${reward.name}" reclamee ! Un staff vous contactera sous peu.`);
    setUserPoints(prev => prev - reward.pointsCost);
  };

  const isStaff = user && ['ADMIN', 'OWNER'].includes(user.role?.toUpperCase() || '');

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-[#2a7cff]/5" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#2a7cff]/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black text-white mb-4">
            VOTER
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Soutenez Central6RP en votant sur les sites partenaires. Gagnez des points et echangez-les contre des recompenses exclusives !
          </p>
        </motion.div>

        {/* User Points Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/10 backdrop-blur-sm border border-yellow-500/30 rounded-2xl p-6 text-center">
            {user ? (
              <>
                <div className="text-yellow-400 mb-2">Vos points</div>
                <div className="text-5xl font-black text-white mb-2">{userPoints}</div>
                <div className="text-gray-400 text-sm">
                  Votez pour gagner plus de points !
                </div>
              </>
            ) : (
              <>
                <Lock className="mx-auto text-gray-500 mb-3" size={32} />
                <div className="text-gray-400 mb-3">Connectez-vous pour voir vos points</div>
                <Link href="/login">
                  <button className="bg-[#2a7cff] hover:bg-[#1e5fd4] text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                    Se connecter
                  </button>
                </Link>
              </>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Vote Sites */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <VoteIcon className="text-[#2a7cff]" />
              Sites de vote
            </h2>

            <div className="space-y-4">
              {voteSites.map((site, index) => (
                <motion.div
                  key={site.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-[#111]/80 backdrop-blur-sm border rounded-xl p-5 ${
                    site.canVote ? "border-green-500/30" : "border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        site.canVote 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-gray-500/20 text-gray-500"
                      }`}>
                        <VoteIcon size={24} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{site.name}</h3>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="text-yellow-400 font-medium">+{site.points} points</span>
                          <span className="text-gray-500">|</span>
                          <span className="text-gray-500 flex items-center gap-1">
                            <Clock size={12} />
                            Cooldown: {site.cooldown}
                          </span>
                        </div>
                        {!site.canVote && site.lastVote && (
                          <div className="text-xs text-gray-600 mt-1">
                            Dernier vote: {site.lastVote}
                          </div>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => handleVote(site)}
                      disabled={!user || !site.canVote}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all ${
                        !user
                          ? "bg-white/5 text-gray-500 cursor-not-allowed"
                          : site.canVote
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-white/5 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {!user ? (
                        <>
                          <Lock size={18} />
                          Connexion
                        </>
                      ) : site.canVote ? (
                        <>
                          <ExternalLink size={18} />
                          Voter
                        </>
                      ) : (
                        <>
                          <CheckCircle size={18} />
                          Vote
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-[#2a7cff]/10 border border-[#2a7cff]/30 rounded-xl p-4">
              <h4 className="text-white font-semibold mb-2">Comment ca marche ?</h4>
              <ol className="text-sm text-gray-400 space-y-2">
                <li>1. Cliquez sur "Voter" pour ouvrir le site</li>
                <li>2. Completez le vote sur le site externe</li>
                <li>3. Les points sont credites automatiquement</li>
                <li>4. Echangez vos points contre des recompenses</li>
              </ol>
            </div>
          </motion.div>

          {/* Rewards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Gift className="text-yellow-400" />
              Recompenses
            </h2>

            <div className="space-y-4">
              {rewards.map((reward, index) => {
                const Icon = reward.icon;
                const canAfford = user && userPoints >= reward.pointsCost;
                
                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`bg-[#111]/80 backdrop-blur-sm border rounded-xl p-5 transition-all ${
                      canAfford ? "border-yellow-500/30 hover:border-yellow-500/50" : "border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${reward.color} flex items-center justify-center`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{reward.name}</h3>
                          <p className="text-gray-500 text-sm">{reward.description}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-lg font-bold mb-1 ${
                          canAfford ? "text-yellow-400" : "text-gray-500"
                        }`}>
                          {reward.pointsCost} pts
                        </div>
                        {user ? (
                          <button
                            onClick={() => handleClaimReward(reward)}
                            disabled={!canAfford}
                            className={`text-sm px-4 py-2 rounded-lg font-medium transition-all ${
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
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Admin Section - Points Overview */}
        {isStaff && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Trophy className="text-yellow-400" />
              Vue Staff - Statistiques des votes
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="text-3xl font-bold text-white">1,247</div>
                <div className="text-gray-500 text-sm">Votes ce mois</div>
              </div>
              <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="text-3xl font-bold text-yellow-400">8,456</div>
                <div className="text-gray-500 text-sm">Points distribues</div>
              </div>
              <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="text-3xl font-bold text-green-400">156</div>
                <div className="text-gray-500 text-sm">Recompenses reclamees</div>
              </div>
              <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5">
                <div className="text-3xl font-bold text-[#2a7cff]">342</div>
                <div className="text-gray-500 text-sm">Votants uniques</div>
              </div>
            </div>

            {/* Top Voters */}
            <div className="mt-6 bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Top 5 Voteurs du mois</h3>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "PlayerOne", votes: 45, points: 125 },
                  { rank: 2, name: "TonyM", votes: 38, points: 102 },
                  { rank: 3, name: "MarcoRP", votes: 32, points: 89 },
                  { rank: 4, name: "NoobRP", votes: 28, points: 76 },
                  { rank: 5, name: "GroveLeader", votes: 24, points: 64 },
                ].map((voter) => (
                  <div key={voter.rank} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        voter.rank === 1 ? "bg-yellow-500 text-black" :
                        voter.rank === 2 ? "bg-gray-400 text-black" :
                        voter.rank === 3 ? "bg-orange-600 text-white" :
                        "bg-white/10 text-gray-400"
                      }`}>
                        {voter.rank}
                      </span>
                      <span className="text-white font-medium">{voter.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-400">{voter.votes} votes</span>
                      <span className="text-yellow-400 font-semibold">{voter.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

