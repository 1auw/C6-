"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Lock, Sparkles, Zap, Trophy, Star, Gift, Coins, Car } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const sites = [
  { id: 1, name: "Liste-FiveM", url: "https://liste-fivem.fr", pts: 2, cd: "12h" },
  { id: 2, name: "Serveur Topliste", url: "https://serveur-topliste.fr", pts: 2, cd: "12h" },
  { id: 3, name: "TopServeurs", url: "https://top-serveurs.net", pts: 3, cd: "24h" },
];

const rewards = [
  { id: 1, name: "50K$", desc: "Argent en jeu", pts: 5, icon: "coin", rarity: "common" },
  { id: 2, name: "Vehicule", desc: "Modele exclusif", pts: 15, icon: "car", rarity: "rare" },
  { id: 3, name: "VIP 7j", desc: "Statut temporaire", pts: 25, icon: "star", rarity: "epic" },
  { id: 4, name: "150K$", desc: "Pack Or", pts: 35, icon: "coin", rarity: "rare" },
  { id: 5, name: "Vehicule Luxe", desc: "Haut de gamme", pts: 50, icon: "car", rarity: "epic" },
  { id: 6, name: "VIP 30j", desc: "1 mois complet", pts: 75, icon: "trophy", rarity: "legendary" },
];

const rarityColors: Record<string, string> = {
  common: "from-gray-500 to-gray-700 border-gray-500",
  rare: "from-blue-500 to-blue-700 border-blue-500",
  epic: "from-purple-500 to-purple-700 border-purple-500",
  legendary: "from-yellow-500 to-orange-600 border-yellow-500",
};

const rarityBg: Record<string, string> = {
  common: "bg-gray-500/10",
  rare: "bg-blue-500/10",
  epic: "bg-purple-500/10",
  legendary: "bg-yellow-500/10",
};

export default function VotePage() {
  const [user, setUser] = useState<{ id: number; username: string; role?: string } | null>(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.success) {
          setUser(data.user);
          setPoints(data.user.votePoints || 0);
        }
      })
      .catch(() => {});
  }, []);

  const claim = (r: typeof rewards[0]) => {
    if (!user || points < r.pts) return;
    alert(`${r.name} reclame !`);
    setPoints(p => p - r.pts);
  };

  const isStaff = user && ['ADMIN', 'OWNER'].includes(user.role?.toUpperCase() || '');

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      
      {/* Animated background grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      
      <div className="relative pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm mb-4">
              <Sparkles size={14} />
              Systeme de recompenses
            </div>
            <h1 className="text-4xl font-black text-white mb-2">
              VOTE & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">GAGNE</span>
            </h1>
            <p className="text-gray-500">Soutiens le serveur et debloque des recompenses exclusives</p>
          </div>

          {/* Points Display */}
          <div className="flex justify-center mb-12">
            {user ? (
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-30"></div>
                <div className="relative bg-[#12121a] border border-purple-500/30 rounded-2xl px-12 py-6 text-center">
                  <div className="text-sm text-purple-400 mb-1">Tes points</div>
                  <div className="text-5xl font-black text-white">{points}</div>
                </div>
              </div>
            ) : (
              <div className="bg-[#12121a] border border-white/10 rounded-2xl px-12 py-6 text-center">
                <Lock size={24} className="mx-auto text-gray-600 mb-2" />
                <p className="text-gray-500 text-sm mb-3">Connecte-toi pour voter</p>
                <Link href="/login">
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold rounded-lg">
                    Connexion
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Vote Sites */}
          <div className="mb-12">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-yellow-400" size={20} />
              Sites de vote
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sites.map(site => (
                <div key={site.id} className="bg-[#12121a] border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">{site.name}</span>
                    <span className="text-xs text-gray-500">{site.cd}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-400 font-bold">+{site.pts} pts</span>
                    <button
                      onClick={() => user && window.open(site.url, '_blank')}
                      disabled={!user}
                      className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                        user 
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90' 
                          : 'bg-white/5 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <ExternalLink size={14} />
                      Voter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards - Card Style */}
          <div className="mb-12">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Gift className="text-pink-400" size={20} />
              Recompenses
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {rewards.map(r => {
                const canAfford = user && points >= r.pts;
                return (
                  <div 
                    key={r.id} 
                    className={`relative rounded-xl overflow-hidden ${rarityBg[r.rarity]} border-2 border-transparent hover:border-opacity-50 transition-all ${
                      canAfford ? `hover:${rarityColors[r.rarity].split(' ')[2]}` : ''
                    }`}
                  >
                    {/* Rarity indicator */}
                    <div className={`h-1 bg-gradient-to-r ${rarityColors[r.rarity].split(' ').slice(0, 2).join(' ')}`}></div>
                    
                    <div className="p-4 text-center">
                      {/* Icon */}
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${rarityColors[r.rarity].split(' ').slice(0, 2).join(' ')} flex items-center justify-center`}>
                        {r.icon === 'coin' && <Coins size={24} className="text-white" />}
                        {r.icon === 'car' && <Car size={24} className="text-white" />}
                        {r.icon === 'star' && <Star size={24} className="text-white" />}
                        {r.icon === 'trophy' && <Trophy size={24} className="text-white" />}
                      </div>
                      
                      {/* Info */}
                      <h3 className="text-white font-bold text-sm mb-1">{r.name}</h3>
                      <p className="text-gray-500 text-xs mb-3">{r.desc}</p>
                      
                      {/* Cost */}
                      <div className={`text-sm font-bold mb-3 ${canAfford ? 'text-purple-400' : 'text-gray-600'}`}>
                        {r.pts} pts
                      </div>
                      
                      {/* Button */}
                      {user ? (
                        <button
                          onClick={() => claim(r)}
                          disabled={!canAfford}
                          className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                            canAfford 
                              ? `bg-gradient-to-r ${rarityColors[r.rarity].split(' ').slice(0, 2).join(' ')} text-white hover:opacity-90` 
                              : 'bg-white/5 text-gray-600 cursor-not-allowed'
                          }`}
                        >
                          {canAfford ? 'Reclamer' : 'Insuffisant'}
                        </button>
                      ) : (
                        <div className="text-xs text-gray-600">Connexion requise</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* How it works */}
          <div className="bg-[#12121a] border border-white/10 rounded-xl p-6 mb-12">
            <h3 className="text-white font-bold mb-4">Comment ca marche ?</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { n: "01", t: "Vote", d: "Clique sur un site" },
                { n: "02", t: "Complete", d: "Finis le vote" },
                { n: "03", t: "Gagne", d: "Recois tes points" },
                { n: "04", t: "Echange", d: "Choisis ta recompense" },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-2xl font-black text-purple-500/30">{step.n}</span>
                  <div>
                    <div className="text-white font-medium">{step.t}</div>
                    <div className="text-gray-500 text-sm">{step.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Stats */}
          {isStaff && (
            <div className="bg-[#12121a] border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-purple-400 font-bold mb-4 flex items-center gap-2">
                <Trophy size={18} />
                Stats Staff
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { v: "0", l: "Votes/mois" },
                  { v: "0", l: "Points distribues" },
                  { v: "0", l: "Recompenses" },
                  { v: "0", l: "Votants" },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white">{s.v}</div>
                    <div className="text-xs text-gray-500">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
