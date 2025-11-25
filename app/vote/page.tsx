"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const VOTE_SITES = [
  { id: 1, name: "Liste-FiveM", points: 2, cooldown: "12 heures" },
  { id: 2, name: "Serveur Topliste", points: 2, cooldown: "12 heures" },
  { id: 3, name: "TopServeurs", points: 3, cooldown: "24 heures" },
];

const REWARDS = [
  { id: 1, name: "Pack Argent", desc: "50 000$ en jeu", points: 5, rarity: "common" },
  { id: 2, name: "Vehicule Standard", desc: "Un vehicule au choix du staff", points: 15, rarity: "rare" },
  { id: 3, name: "VIP Bronze", desc: "7 jours d'acces VIP", points: 25, rarity: "rare" },
  { id: 4, name: "Pack Or", desc: "150 000$ en jeu", points: 35, rarity: "epic" },
  { id: 5, name: "Vehicule Premium", desc: "Un vehicule haut de gamme", points: 50, rarity: "epic" },
  { id: 6, name: "VIP Gold", desc: "30 jours d'acces VIP complet", points: 75, rarity: "legendary" },
];

export default function VotePage() {
  const [user, setUser] = useState<any>(null);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.success) {
          setUser(d.user);
          setPoints(d.user.votePoints || 0);
        }
      })
      .catch(() => {});
  }, []);

  const handleClaim = (reward: typeof REWARDS[0]) => {
    if (!user || points < reward.points) return;
    setPoints(p => p - reward.points);
    alert(`${reward.name} reclame avec succes !`);
  };

  const getRarityStyle = (rarity: string) => {
    switch(rarity) {
      case "legendary": return "border-yellow-500/30 bg-yellow-500/5";
      case "epic": return "border-purple-500/30 bg-purple-500/5";
      case "rare": return "border-blue-500/30 bg-blue-500/5";
      default: return "border-white/10 bg-dark-card";
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch(rarity) {
      case "legendary": return { text: "Legendaire", color: "text-yellow-400" };
      case "epic": return { text: "Epique", color: "text-purple-400" };
      case "rare": return { text: "Rare", color: "text-blue-400" };
      default: return { text: "Standard", color: "text-gray-500" };
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <div className="pt-32 pb-12 px-6 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Soutenir le serveur
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Votez & Gagnez
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Soutenez Central6RP en votant et recevez des recompenses exclusives.
            </p>
          </div>
        </div>

        <div className="px-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Points Display */}
            <div className="mb-12">
              {user ? (
                <div className="glass rounded-2xl p-8">
                  <div className="flex items-center justify-between flex-wrap gap-6">
                    <div>
                      <p className="text-gray-500 text-sm mb-2">Vos points accumules</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-white">{points}</span>
                        <span className="text-gray-500">points</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm">Prochaine recompense</p>
                      <p className="text-white font-semibold mt-1">
                        {REWARDS.find(r => r.points > points)?.name || "Maximum atteint"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass rounded-2xl p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-dark-lighter flex items-center justify-center mx-auto mb-6 border border-white/10">
                    <span className="text-2xl text-gray-500">?</span>
                  </div>
                  <p className="text-gray-400 mb-6">Connectez-vous pour voter et cumuler des points</p>
                  <Link href="/login">
                    <button className="px-8 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-semibold transition-colors">
                      Se connecter
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Two columns layout */}
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Vote Sites */}
              <div className="lg:col-span-2">
                <h2 className="text-white font-semibold mb-5">Sites de vote</h2>
                <div className="space-y-4">
                  {VOTE_SITES.map(site => (
                    <div key={site.id} className="glass rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-white font-semibold">{site.name}</h3>
                        <span className="text-primary text-sm font-bold">+{site.points} pts</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">Cooldown: {site.cooldown}</p>
                      <button
                        onClick={() => user && window.open("#", "_blank")}
                        disabled={!user}
                        className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
                          user
                            ? "bg-primary hover:bg-primary-light text-white"
                            : "bg-dark-lighter text-gray-500 cursor-not-allowed border border-white/10"
                        }`}
                      >
                        {user ? "Voter maintenant" : "Connexion requise"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* How it works */}
                <div className="mt-6 glass rounded-xl p-5">
                  <h3 className="text-gray-400 text-sm font-semibold mb-4">Comment ca marche ?</h3>
                  <div className="space-y-3">
                    {[
                      "Cliquez sur un site de vote",
                      "Validez votre vote sur le site externe",
                      "Les points sont credites automatiquement",
                      "Echangez vos points contre des recompenses"
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-gray-400 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rewards */}
              <div className="lg:col-span-3">
                <h2 className="text-white font-semibold mb-5">Recompenses disponibles</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {REWARDS.map(reward => {
                    const canClaim = user && points >= reward.points;
                    const rarity = getRarityLabel(reward.rarity);
                    
                    return (
                      <div
                        key={reward.id}
                        className={`rounded-xl p-5 border ${getRarityStyle(reward.rarity)} ${
                          canClaim ? "opacity-100" : "opacity-60"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-bold tracking-wider uppercase ${rarity.color}`}>
                            {rarity.text}
                          </span>
                          <span className="text-white text-sm font-bold">{reward.points} pts</span>
                        </div>
                        
                        <h3 className="text-white font-semibold mb-1">{reward.name}</h3>
                        <p className="text-gray-500 text-sm mb-5">{reward.desc}</p>
                        
                        <button
                          onClick={() => handleClaim(reward)}
                          disabled={!canClaim}
                          className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
                            canClaim
                              ? "bg-primary hover:bg-primary-light text-white"
                              : "bg-dark-lighter/50 text-gray-600 cursor-not-allowed border border-white/5"
                          }`}
                        >
                          {canClaim ? "Reclamer" : user ? "Points insuffisants" : "Connexion requise"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
