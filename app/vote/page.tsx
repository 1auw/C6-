"use client";

import { useState, useEffect } from "react";
import { Vote, Gift, ExternalLink, Lock, Check, Star, Crown, Car } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const SITES = [
  { id: 1, name: "Liste-FiveM", pts: 2, cd: "12h" },
  { id: 2, name: "Serveur Topliste", pts: 2, cd: "12h" },
  { id: 3, name: "TopServeurs", pts: 3, cd: "24h" },
];

const REWARDS = [
  { id: 1, name: "Pack Argent 50K$", desc: "Boost demarrage", pts: 5, icon: Star },
  { id: 2, name: "Vehicule Premium", desc: "Modele exclusif", pts: 15, icon: Car },
  { id: 3, name: "VIP 7 jours", desc: "Acces temporaire", pts: 25, icon: Crown },
  { id: 4, name: "Pack Or 150K$", desc: "Gros boost", pts: 35, icon: Star },
  { id: 5, name: "Vehicule Luxe", desc: "Haut de gamme", pts: 50, icon: Car },
  { id: 6, name: "VIP 30 jours", desc: "1 mois complet", pts: 75, icon: Crown },
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

  const claim = (r: typeof REWARDS[0]) => {
    if (!user || points < r.pts) return;
    setPoints(p => p - r.pts);
    alert(r.name + " reclame !");
  };

  const isStaff = user && ["ADMIN", "OWNER"].includes(user.role?.toUpperCase() || "");

  return (
    <>
      <style>{`*, *::before, *::after { animation: none !important; transition: none !important; }`}</style>
      
      <div className="min-h-screen bg-dark-bg">
        <Navbar />
        
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-neon/5" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-28 pb-20">
          <div style={{ marginBottom: "40px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#fff", marginBottom: "8px" }}>Vote</h1>
            <p style={{ color: "#888" }}>Soutenez le serveur et gagnez des recompenses</p>
          </div>

          {/* Points Card */}
          <div style={{
            backgroundColor: "#12121a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            padding: "40px",
            textAlign: "center",
            marginBottom: "40px"
          }}>
            {user ? (
              <>
                <div style={{ color: "#888", fontSize: "14px", marginBottom: "4px" }}>Vos points</div>
                <div style={{ fontSize: "56px", fontWeight: 900, color: "#fff" }}>{points}</div>
                <div style={{ color: "#555", fontSize: "13px" }}>points disponibles</div>
              </>
            ) : (
              <>
                <Lock size={32} color="#444" style={{ margin: "0 auto 12px" }} />
                <div style={{ color: "#888", fontSize: "14px", marginBottom: "16px" }}>Connectez-vous pour voter</div>
                <Link href="/login">
                  <button style={{
                    padding: "12px 24px",
                    backgroundColor: "#1a5cff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer"
                  }}>
                    Se connecter
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Grid 2 colonnes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {/* Sites */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Vote size={18} color="#1a5cff" />
                <span style={{ color: "#fff", fontWeight: 500 }}>Sites de vote</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {SITES.map(s => (
                  <div key={s.id} style={{
                    backgroundColor: "#12121a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "16px"
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontWeight: 500 }}>{s.name}</div>
                      <div style={{ color: "#555", fontSize: "12px", marginTop: "4px" }}>+{s.pts} pts • {s.cd}</div>
                    </div>
                    <button
                      onClick={() => user && window.open("#", "_blank")}
                      disabled={!user}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "8px 16px",
                        backgroundColor: user ? "#1a5cff" : "rgba(255,255,255,0.05)",
                        color: user ? "#fff" : "#444",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 500,
                        cursor: user ? "pointer" : "not-allowed"
                      }}
                    >
                      <ExternalLink size={14} />
                      Voter
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <Gift size={18} color="#1a5cff" />
                <span style={{ color: "#fff", fontWeight: 500 }}>Recompenses</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {REWARDS.map(r => {
                  const Icon = r.icon;
                  const ok = user && points >= r.pts;
                  return (
                    <div key={r.id} style={{
                      backgroundColor: "#12121a",
                      border: ok ? "1px solid rgba(26,92,255,0.3)" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        backgroundColor: ok ? "rgba(26,92,255,0.2)" : "rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <Icon size={18} color={ok ? "#1a5cff" : "#444"} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>{r.name}</div>
                        <div style={{ color: "#555", fontSize: "12px" }}>{r.desc}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ color: ok ? "#fff" : "#444", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                          {r.pts} pts
                        </div>
                        {user ? (
                          <button
                            onClick={() => claim(r)}
                            disabled={!ok}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              padding: "6px 12px",
                              backgroundColor: ok ? "#1a5cff" : "rgba(255,255,255,0.05)",
                              color: ok ? "#fff" : "#444",
                              border: "none",
                              borderRadius: "6px",
                              fontSize: "11px",
                              fontWeight: 500,
                              cursor: ok ? "pointer" : "not-allowed"
                            }}
                          >
                            {ok ? <><Check size={12} /> Reclamer</> : "Insuffisant"}
                          </button>
                        ) : (
                          <span style={{ color: "#444", fontSize: "11px" }}>Connexion</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Staff */}
          {isStaff && (
            <div style={{
              marginTop: "40px",
              backgroundColor: "#12121a",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              padding: "24px"
            }}>
              <div style={{ color: "#888", fontSize: "13px", marginBottom: "16px" }}>Stats Staff</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {[
                  { v: "0", l: "Votes/mois" },
                  { v: "0", l: "Points" },
                  { v: "0", l: "Recompenses" },
                  { v: "0", l: "Votants" },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "24px", fontWeight: 700, color: "#fff" }}>{s.v}</div>
                    <div style={{ fontSize: "11px", color: "#555", marginTop: "4px" }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How */}
          <div style={{
            marginTop: "40px",
            backgroundColor: "#12121a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "24px"
          }}>
            <div style={{ color: "#fff", fontWeight: 500, marginBottom: "20px" }}>Comment ca marche ?</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
              {[
                { n: "1", t: "Voter", d: "Cliquez sur un site" },
                { n: "2", t: "Valider", d: "Completez le vote" },
                { n: "3", t: "Gagner", d: "Recevez vos points" },
                { n: "4", t: "Echanger", d: "Reclamez des recompenses" },
              ].map(s => (
                <div key={s.n} style={{ textAlign: "center" }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(26,92,255,0.2)",
                    color: "#1a5cff",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 8px"
                  }}>
                    {s.n}
                  </div>
                  <div style={{ color: "#fff", fontSize: "14px", fontWeight: 500 }}>{s.t}</div>
                  <div style={{ color: "#555", fontSize: "12px", marginTop: "4px" }}>{s.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
