"use client";

import { useState, useEffect } from "react";
import { Trophy, Gift, ExternalLink, Lock, Check, Star, Crown, Car, Zap, Target } from "lucide-react";
import Link from "next/link";

const SITES = [
  { id: 1, name: "Liste-FiveM", pts: 2, cd: "12h", color: "#60a5fa" },
  { id: 2, name: "Serveur Topliste", pts: 2, cd: "12h", color: "#34d399" },
  { id: 3, name: "TopServeurs", pts: 3, cd: "24h", color: "#fbbf24" },
];

const REWARDS = [
  { id: 1, name: "50K$", desc: "Cash boost", pts: 5, tier: "common", icon: Star },
  { id: 2, name: "Vehicule", desc: "Modele exclusif", pts: 15, tier: "rare", icon: Car },
  { id: 3, name: "VIP 7j", desc: "Acces temporaire", pts: 25, tier: "epic", icon: Crown },
  { id: 4, name: "150K$", desc: "Mega cash", pts: 35, tier: "rare", icon: Star },
  { id: 5, name: "Vehicule Luxe", desc: "Haut de gamme", pts: 50, tier: "epic", icon: Car },
  { id: 6, name: "VIP 30j", desc: "1 mois complet", pts: 75, tier: "legendary", icon: Crown },
];

const TIER_COLORS: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  common: { bg: "#1a1a2e", border: "#3a3a4e", text: "#888", glow: "none" },
  rare: { bg: "#1a2a4e", border: "#3b82f6", text: "#60a5fa", glow: "0 0 20px #3b82f620" },
  epic: { bg: "#2a1a4e", border: "#a855f7", text: "#c084fc", glow: "0 0 20px #a855f720" },
  legendary: { bg: "#3a2a1a", border: "#fbbf24", text: "#fcd34d", glow: "0 0 30px #fbbf2430" },
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

  const claim = (r: typeof REWARDS[0]) => {
    if (!user || points < r.pts) return;
    setPoints(p => p - r.pts);
    alert(r.name + " reclame !");
  };

  const nextReward = REWARDS.find(r => r.pts > points) || REWARDS[REWARDS.length - 1];
  const progress = Math.min((points / nextReward.pts) * 100, 100);

  return (
    <>
      <style>{`*, *::before, *::after { animation: none !important; transition: none !important; }`}</style>
      
      <div style={{ minHeight: "100vh", background: "#050508" }}>
        {/* Header */}
        <div style={{
          padding: "120px 24px 40px",
          background: "linear-gradient(180deg, #0a0a12 0%, #050508 100%)",
          borderBottom: "1px solid #1a1a2e"
        }}>
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Trophy size={28} color="#fbbf24" />
              <span style={{ color: "#fbbf24", fontSize: 14, fontWeight: 700, letterSpacing: 2 }}>SYSTEME DE VOTE</span>
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 900, color: "#fff", letterSpacing: -1 }}>
              GAGNEZ DES <span style={{ color: "#fbbf24" }}>RECOMPENSES</span>
            </h1>
          </div>
        </div>

        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px 80px" }}>
          {/* Points Display */}
          <div style={{
            background: "linear-gradient(135deg, #0a0a12 0%, #12121a 100%)",
            border: "1px solid #1a1a2e",
            borderRadius: 24,
            padding: 40,
            marginBottom: 40,
            position: "relative",
            overflow: "hidden"
          }}>
            {/* Background pattern */}
            <div style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "radial-gradient(circle at 1px 1px, #1a1a2e 1px, transparent 0)",
              backgroundSize: "24px 24px",
              opacity: 0.3
            }} />

            <div style={{ position: "relative" }}>
              {user ? (
                <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
                  {/* Points circle */}
                  <div style={{
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 60px #fbbf2440"
                  }}>
                    <div style={{ fontSize: 40, fontWeight: 900, color: "#000" }}>{points}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#000", opacity: 0.7 }}>POINTS</div>
                  </div>

                  {/* Progress */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ color: "#666", fontSize: 13 }}>Prochaine recompense</span>
                      <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{nextReward.name} ({nextReward.pts} pts)</span>
                    </div>
                    <div style={{
                      height: 12,
                      background: "#1a1a2e",
                      borderRadius: 6,
                      overflow: "hidden"
                    }}>
                      <div style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #fbbf24, #f59e0b)",
                        borderRadius: 6
                      }} />
                    </div>
                    <div style={{ color: "#555", fontSize: 12, marginTop: 8 }}>
                      {points} / {nextReward.pts} points
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: 20 }}>
                  <Lock size={48} color="#444" style={{ marginBottom: 16 }} />
                  <div style={{ color: "#666", fontSize: 16, marginBottom: 20 }}>Connectez-vous pour voter et gagner des points</div>
                  <Link href="/login">
                    <button style={{
                      padding: "14px 32px",
                      background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
                      color: "#000",
                      border: "none",
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer"
                    }}>
                      SE CONNECTER
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Two columns */}
          <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: 24 }}>
            {/* Vote Sites */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <Target size={18} color="#60a5fa" />
                <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>SITES DE VOTE</span>
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {SITES.map(s => (
                  <div key={s.id} style={{
                    background: "#0a0a12",
                    border: "1px solid #1a1a2e",
                    borderRadius: 16,
                    padding: 20
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                      <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `${s.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Zap size={20} color={s.color} />
                      </div>
                      <div>
                        <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>{s.name}</div>
                        <div style={{ color: "#555", fontSize: 12 }}>+{s.pts} pts • Cooldown {s.cd}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => user && window.open("#", "_blank")}
                      disabled={!user}
                      style={{
                        width: "100%",
                        padding: 12,
                        background: user ? s.color : "#1a1a2e",
                        color: user ? "#000" : "#444",
                        border: "none",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: user ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8
                      }}
                    >
                      <ExternalLink size={14} />
                      VOTER
                    </button>
                  </div>
                ))}
              </div>

              {/* How it works */}
              <div style={{
                marginTop: 24,
                padding: 20,
                background: "#0a0a12",
                border: "1px solid #1a1a2e",
                borderRadius: 16
              }}>
                <div style={{ color: "#555", fontSize: 12, marginBottom: 12 }}>COMMENT CA MARCHE</div>
                {["Cliquez sur VOTER", "Validez sur le site", "Points credites auto", "Echangez les rewards"].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "#1a1a2e",
                      color: "#666",
                      fontSize: 11,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ color: "#888", fontSize: 13 }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <Gift size={18} color: "#c084fc" />
                <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>RECOMPENSES</span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {REWARDS.map(r => {
                  const Icon = r.icon;
                  const tier = TIER_COLORS[r.tier];
                  const canClaim = user && points >= r.pts;

                  return (
                    <div
                      key={r.id}
                      style={{
                        background: tier.bg,
                        border: `2px solid ${canClaim ? tier.border : "#1a1a2e"}`,
                        borderRadius: 16,
                        padding: 20,
                        boxShadow: canClaim ? tier.glow : "none",
                        opacity: canClaim ? 1 : 0.6
                      }}
                    >
                      {/* Tier badge */}
                      <div style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        background: `${tier.border}20`,
                        borderRadius: 6,
                        fontSize: 10,
                        fontWeight: 800,
                        color: tier.text,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        marginBottom: 12
                      }}>
                        {r.tier}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                        <div style={{
                          width: 44,
                          height: 44,
                          borderRadius: 12,
                          background: `${tier.border}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <Icon size={22} color={tier.text} />
                        </div>
                        <div>
                          <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{r.name}</div>
                          <div style={{ color: "#555", fontSize: 12 }}>{r.desc}</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 12px",
                          background: "#1a1a2e",
                          borderRadius: 8
                        }}>
                          <Star size={14} color="#fbbf24" />
                          <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{r.pts}</span>
                        </div>

                        {user ? (
                          <button
                            onClick={() => claim(r)}
                            disabled={!canClaim}
                            style={{
                              padding: "8px 16px",
                              background: canClaim ? tier.border : "#1a1a2e",
                              color: canClaim ? "#000" : "#444",
                              border: "none",
                              borderRadius: 8,
                              fontSize: 12,
                              fontWeight: 700,
                              cursor: canClaim ? "pointer" : "not-allowed",
                              display: "flex",
                              alignItems: "center",
                              gap: 6
                            }}
                          >
                            {canClaim ? <><Check size={14} /> CLAIM</> : "LOCKED"}
                          </button>
                        ) : (
                          <span style={{ color: "#444", fontSize: 11 }}>Connexion requise</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
