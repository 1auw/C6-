"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const SITES = [
  { id: 1, name: "Liste-FiveM", pts: 2, cd: "12h" },
  { id: 2, name: "Serveur Topliste", pts: 2, cd: "12h" },
  { id: 3, name: "TopServeurs", pts: 3, cd: "24h" },
];

const REWARDS = [
  { id: 1, name: "50K$", desc: "Argent in-game", pts: 5 },
  { id: 2, name: "Vehicule", desc: "Modele exclusif", pts: 15 },
  { id: 3, name: "VIP 7 jours", desc: "Acces temporaire", pts: 25 },
  { id: 4, name: "150K$", desc: "Pack Or", pts: 35 },
  { id: 5, name: "Vehicule Luxe", desc: "Haut de gamme", pts: 50 },
  { id: 6, name: "VIP 30 jours", desc: "1 mois complet", pts: 75 },
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
    <div style={{ minHeight: "100vh", background: "#000" }}>
      <Navbar />
      
      <div style={{ paddingTop: 100, paddingBottom: 60, maxWidth: 900, margin: "0 auto", padding: "100px 20px 60px" }}>
        
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Vote</h1>
        <p style={{ color: "#666", marginBottom: 40 }}>Soutenez le serveur et gagnez des recompenses</p>

        {/* Points */}
        <div style={{ 
          background: "#0a0a0a", 
          border: "1px solid #1a1a1a", 
          borderRadius: 8, 
          padding: 30,
          textAlign: "center",
          marginBottom: 40
        }}>
          {user ? (
            <>
              <div style={{ color: "#666", fontSize: 13, marginBottom: 4 }}>Vos points</div>
              <div style={{ color: "#fff", fontSize: 48, fontWeight: 700 }}>{points}</div>
            </>
          ) : (
            <>
              <div style={{ color: "#444", fontSize: 13, marginBottom: 12 }}>Connectez-vous pour voter</div>
              <Link href="/login">
                <button style={{
                  padding: "10px 24px",
                  background: "#fff",
                  color: "#000",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer"
                }}>
                  Connexion
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Two columns */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          
          {/* Sites */}
          <div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Sites de vote</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SITES.map(s => (
                <div key={s.id} style={{
                  background: "#0a0a0a",
                  border: "1px solid #1a1a1a",
                  borderRadius: 8,
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div>
                    <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{s.name}</div>
                    <div style={{ color: "#555", fontSize: 11, marginTop: 2 }}>+{s.pts} pts • {s.cd}</div>
                  </div>
                  <button
                    onClick={() => user && window.open("https://google.com", "_blank")}
                    disabled={!user}
                    style={{
                      padding: "8px 16px",
                      background: user ? "#fff" : "#1a1a1a",
                      color: user ? "#000" : "#444",
                      border: "none",
                      borderRadius: 6,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: user ? "pointer" : "not-allowed"
                    }}
                  >
                    Voter
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Rewards */}
          <div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 500, marginBottom: 16 }}>Recompenses</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {REWARDS.map(r => {
                const ok = user && points >= r.pts;
                return (
                  <div key={r.id} style={{
                    background: "#0a0a0a",
                    border: ok ? "1px solid #333" : "1px solid #1a1a1a",
                    borderRadius: 8,
                    padding: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                    <div>
                      <div style={{ color: "#fff", fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                      <div style={{ color: "#555", fontSize: 11, marginTop: 2 }}>{r.desc}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: ok ? "#fff" : "#444", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                        {r.pts} pts
                      </div>
                      {user ? (
                        <button
                          onClick={() => claim(r)}
                          disabled={!ok}
                          style={{
                            padding: "6px 12px",
                            background: ok ? "#fff" : "#1a1a1a",
                            color: ok ? "#000" : "#333",
                            border: "none",
                            borderRadius: 4,
                            fontSize: 11,
                            fontWeight: 500,
                            cursor: ok ? "pointer" : "not-allowed"
                          }}
                        >
                          {ok ? "Reclamer" : "Insuffisant"}
                        </button>
                      ) : (
                        <span style={{ color: "#333", fontSize: 10 }}>Connexion</span>
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
            marginTop: 40, 
            background: "#0a0a0a", 
            border: "1px solid #1a1a1a", 
            borderRadius: 8, 
            padding: 20 
          }}>
            <div style={{ color: "#888", fontSize: 12, marginBottom: 16 }}>Stats Staff</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[
                { v: "0", l: "Votes/mois" },
                { v: "0", l: "Points" },
                { v: "0", l: "Recompenses" },
                { v: "0", l: "Votants" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>{s.v}</div>
                  <div style={{ color: "#444", fontSize: 10 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How */}
        <div style={{ 
          marginTop: 40, 
          background: "#0a0a0a", 
          border: "1px solid #1a1a1a", 
          borderRadius: 8, 
          padding: 20 
        }}>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 500, marginBottom: 12 }}>Comment ca marche ?</div>
          <div style={{ color: "#555", fontSize: 12, lineHeight: 1.8 }}>
            1. Cliquez sur "Voter" pour ouvrir le site<br/>
            2. Completez le vote<br/>
            3. Les points sont credites automatiquement<br/>
            4. Echangez contre des recompenses
          </div>
        </div>
      </div>
    </div>
  );
}
