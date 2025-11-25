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

const RARITY_STYLES: Record<string, string> = {
  common: "border-zinc-700",
  rare: "border-blue-500/30",
  epic: "border-purple-500/30",
  legendary: "border-amber-500/30",
};

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

  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Ambient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <div className="pt-32 pb-16 px-6 border-b border-zinc-800/50">
          <div className="max-w-5xl mx-auto">
            <p className="text-amber-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Soutenir le serveur
            </p>
            <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-tight mb-6">
              Votez & Gagnez
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
              Soutenez Central6RP en votant et recevez des recompenses exclusives.
            </p>
          </div>
        </div>

        <div className="px-6 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Points Display */}
            <div className="mb-16">
              {user ? (
                <div className="p-10 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800/50 rounded-3xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-zinc-500 text-sm mb-2">Vos points accumules</p>
                      <div className="flex items-baseline gap-3">
                        <span className="text-6xl font-extralight text-white">{points}</span>
                        <span className="text-zinc-600">points</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-zinc-600 text-sm">Prochaine recompense</p>
                      <p className="text-white text-lg mt-1">
                        {REWARDS.find(r => r.points > points)?.name || "Maximum atteint"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-10 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl text-center">
                  <div className="w-20 h-20 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl text-zinc-600">?</span>
                  </div>
                  <p className="text-zinc-500 mb-6">Connectez-vous pour voter et cumuler des points</p>
                  <Link href="/login">
                    <button className="px-8 py-4 bg-white text-zinc-900 rounded-full font-medium hover:bg-zinc-100 transition-colors">
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
                <h2 className="text-white text-lg font-light mb-6">Sites de vote</h2>
                <div className="space-y-4">
                  {VOTE_SITES.map(site => (
                    <div
                      key={site.id}
                      className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-light">{site.name}</h3>
                        <span className="text-amber-400 text-sm font-medium">+{site.points} pts</span>
                      </div>
                      <p className="text-zinc-600 text-sm mb-4">Cooldown: {site.cooldown}</p>
                      <button
                        onClick={() => user && window.open("#", "_blank")}
                        disabled={!user}
                        className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
                          user
                            ? "bg-white text-zinc-900 hover:bg-zinc-100"
                            : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                        }`}
                      >
                        {user ? "Voter maintenant" : "Connexion requise"}
                      </button>
                    </div>
                  ))}
                </div>

                {/* How it works */}
                <div className="mt-8 p-6 bg-zinc-900/20 border border-zinc-800/30 rounded-2xl">
                  <h3 className="text-zinc-400 text-sm font-medium mb-4">Comment ca marche ?</h3>
                  <div className="space-y-3">
                    {[
                      "Cliquez sur un site de vote",
                      "Validez votre vote sur le site externe",
                      "Les points sont credites automatiquement",
                      "Echangez vos points contre des recompenses"
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-xs">
                          {i + 1}
                        </span>
                        <span className="text-zinc-500 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Rewards */}
              <div className="lg:col-span-3">
                <h2 className="text-white text-lg font-light mb-6">Recompenses disponibles</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {REWARDS.map(reward => {
                    const canClaim = user && points >= reward.points;
                    const rarityLabel = reward.rarity === "legendary" ? "Legendaire" : 
                                        reward.rarity === "epic" ? "Epique" :
                                        reward.rarity === "rare" ? "Rare" : "Standard";
                    
                    return (
                      <div
                        key={reward.id}
                        className={`p-6 bg-zinc-900/30 border rounded-2xl ${RARITY_STYLES[reward.rarity]} ${
                          canClaim ? "opacity-100" : "opacity-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs font-medium tracking-wider uppercase ${
                            reward.rarity === "legendary" ? "text-amber-400" :
                            reward.rarity === "epic" ? "text-purple-400" :
                            reward.rarity === "rare" ? "text-blue-400" : "text-zinc-500"
                          }`}>
                            {rarityLabel}
                          </span>
                          <span className="text-white text-sm font-medium">{reward.points} pts</span>
                        </div>
                        
                        <h3 className="text-white font-light text-lg mb-1">{reward.name}</h3>
                        <p className="text-zinc-600 text-sm mb-6">{reward.desc}</p>
                        
                        <button
                          onClick={() => handleClaim(reward)}
                          disabled={!canClaim}
                          className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
                            canClaim
                              ? "bg-white text-zinc-900 hover:bg-zinc-100"
                              : "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"
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
