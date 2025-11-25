"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const SECTIONS = [
  { id: "annonces", name: "Annonces", desc: "Mises a jour officielles", color: "#f59e0b" },
  { id: "general", name: "Discussions", desc: "Parlez de tout", color: "#3b82f6" },
  { id: "suggestions", name: "Suggestions", desc: "Vos idees", color: "#22c55e" },
  { id: "support", name: "Support", desc: "Besoin d'aide ?", color: "#a855f7" },
  { id: "stories", name: "Histoires RP", desc: "Vos moments", color: "#f97316" },
  { id: "recrutement", name: "Recrutement", desc: "Rejoindre une org", color: "#ef4444" },
];

export default function ForumPage() {
  const [user, setUser] = useState<any>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.success && setUser(d.user))
      .catch(() => {});
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#000" }}>
      <Navbar />
      
      <div style={{ paddingTop: 100, paddingBottom: 60, maxWidth: 900, margin: "0 auto", padding: "100px 20px 60px" }}>
        
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Forum</h1>
        <p style={{ color: "#666", marginBottom: 40 }}>Espace communautaire Central6RP</p>

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SECTIONS.map(s => (
            <div
              key={s.id}
              onClick={() => setActive(active === s.id ? null : s.id)}
              style={{
                background: "#0a0a0a",
                border: active === s.id ? `1px solid ${s.color}40` : "1px solid #1a1a1a",
                borderRadius: 8,
                padding: 20,
                cursor: "pointer"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  background: `${s.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: s.color,
                  fontSize: 18,
                  fontWeight: 700
                }}>
                  #
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: "#fff", fontSize: 15, fontWeight: 500 }}>{s.name}</div>
                  <div style={{ color: "#555", fontSize: 12 }}>{s.desc}</div>
                </div>
                <div style={{ color: "#333", fontSize: 20 }}>{active === s.id ? "−" : "+"}</div>
              </div>

              {active === s.id && (
                <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid #1a1a1a" }}>
                  <div style={{ 
                    textAlign: "center", 
                    padding: 40, 
                    background: "#050505", 
                    borderRadius: 6,
                    border: "1px dashed #222"
                  }}>
                    <div style={{ color: "#333", fontSize: 13, marginBottom: 12 }}>Aucun sujet dans cette section</div>
                    {user ? (
                      <button style={{
                        padding: "8px 20px",
                        background: s.color,
                        color: "#000",
                        border: "none",
                        borderRadius: 6,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer"
                      }}>
                        Creer le premier sujet
                      </button>
                    ) : (
                      <Link href="/login">
                        <button style={{
                          padding: "8px 20px",
                          background: "#1a1a1a",
                          color: "#666",
                          border: "none",
                          borderRadius: 6,
                          fontSize: 13,
                          cursor: "pointer"
                        }}>
                          Connectez-vous pour poster
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Rules */}
        <div style={{ 
          marginTop: 40, 
          background: "#0a0a0a", 
          border: "1px solid #1a1a1a", 
          borderRadius: 8, 
          padding: 20 
        }}>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 500, marginBottom: 12 }}>Regles</div>
          <div style={{ color: "#555", fontSize: 12, lineHeight: 1.8 }}>
            • Respectez les autres membres<br/>
            • Pas de spam ni publicite<br/>
            • Restez dans le sujet<br/>
            • Contenu approprie uniquement
          </div>
        </div>
      </div>
    </div>
  );
}
