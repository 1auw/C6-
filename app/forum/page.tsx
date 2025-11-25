"use client";

import { useState, useEffect } from "react";
import { Hash, Users, Bell, MessageCircle, Lightbulb, HelpCircle, Lock, Plus, TrendingUp, Pin, Clock } from "lucide-react";
import Link from "next/link";

const CHANNELS = [
  { id: "annonces", name: "annonces", desc: "News officielles", icon: Bell, color: "#fbbf24", pinned: 2, members: 156 },
  { id: "general", name: "discussions", desc: "Parlez de tout", icon: MessageCircle, color: "#60a5fa", pinned: 0, members: 342 },
  { id: "suggestions", name: "suggestions", desc: "Proposez vos idees", icon: Lightbulb, color: "#34d399", pinned: 1, members: 89 },
  { id: "support", name: "support", desc: "Besoin d'aide ?", icon: HelpCircle, color: "#a78bfa", pinned: 3, members: 127 },
  { id: "stories", name: "histoires-rp", desc: "Vos meilleurs moments", icon: TrendingUp, color: "#f472b6", pinned: 0, members: 234 },
  { id: "recrutement", name: "recrutement", desc: "Rejoindre une org", icon: Users, color: "#f87171", pinned: 5, members: 78 },
];

export default function ForumPage() {
  const [user, setUser] = useState<any>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.success && setUser(d.user))
      .catch(() => {});
  }, []);

  const totalMembers = CHANNELS.reduce((a, c) => a + c.members, 0);

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
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ 
                width: 48, 
                height: 48, 
                borderRadius: 12, 
                background: "linear-gradient(135deg, #1a5cff 0%, #3b82f6 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Hash size={24} color="#fff" />
              </div>
              <div>
                <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>Forum Communautaire</h1>
                <p style={{ color: "#555", fontSize: 14 }}>Rejoignez {totalMembers} membres actifs</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px 80px" }}>
          {/* Stats bar */}
          <div style={{
            display: "flex",
            gap: 24,
            marginBottom: 40,
            padding: "20px 24px",
            background: "#0a0a12",
            border: "1px solid #1a1a2e",
            borderRadius: 16
          }}>
            {[
              { label: "Channels", value: CHANNELS.length },
              { label: "Membres", value: totalMembers },
              { label: "Messages", value: "2.4K" },
              { label: "En ligne", value: 47 },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", flex: 1, borderRight: i < 3 ? "1px solid #1a1a2e" : "none" }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#fff" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Channels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {CHANNELS.map(ch => {
              const Icon = ch.icon;
              const isOpen = selected === ch.id;
              
              return (
                <div 
                  key={ch.id}
                  style={{
                    background: "#0a0a12",
                    border: isOpen ? `1px solid ${ch.color}40` : "1px solid #1a1a2e",
                    borderRadius: 16,
                    overflow: "hidden"
                  }}
                >
                  {/* Channel header */}
                  <div
                    onClick={() => setSelected(isOpen ? null : ch.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: 20,
                      cursor: "pointer"
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `${ch.color}15`,
                      border: `1px solid ${ch.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Icon size={22} color={ch.color} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Hash size={16} color={ch.color} />
                        <span style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{ch.name}</span>
                      </div>
                      <div style={{ color: "#555", fontSize: 13, marginTop: 2 }}>{ch.desc}</div>
                    </div>

                    {/* Stats */}
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      {ch.pinned > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#fbbf24" }}>
                          <Pin size={14} />
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{ch.pinned}</span>
                        </div>
                      )}
                      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#555" }}>
                        <Users size={14} />
                        <span style={{ fontSize: 12 }}>{ch.members}</span>
                      </div>
                      <div style={{ 
                        width: 24, 
                        height: 24, 
                        borderRadius: 6,
                        background: "#1a1a2e",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#555",
                        fontSize: 14,
                        fontWeight: 700
                      }}>
                        {isOpen ? "−" : "+"}
                      </div>
                    </div>
                  </div>

                  {/* Expanded content */}
                  {isOpen && (
                    <div style={{
                      padding: "0 20px 20px",
                      borderTop: "1px solid #1a1a2e"
                    }}>
                      {/* Empty state */}
                      <div style={{
                        marginTop: 20,
                        padding: "48px 24px",
                        background: "#08080c",
                        borderRadius: 12,
                        border: "1px dashed #2a2a3e",
                        textAlign: "center"
                      }}>
                        <div style={{ 
                          width: 64, 
                          height: 64, 
                          borderRadius: "50%", 
                          background: `${ch.color}10`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto 16px"
                        }}>
                          <Icon size={28} color={ch.color} />
                        </div>
                        <div style={{ color: "#444", fontSize: 14, marginBottom: 20 }}>
                          Aucun sujet dans #{ch.name}
                        </div>
                        {user ? (
                          <button style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "12px 24px",
                            background: ch.color,
                            color: "#000",
                            border: "none",
                            borderRadius: 10,
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: "pointer"
                          }}>
                            <Plus size={16} />
                            NOUVEAU SUJET
                          </button>
                        ) : (
                          <Link href="/login">
                            <button style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              padding: "12px 24px",
                              background: "#1a1a2e",
                              color: "#666",
                              border: "none",
                              borderRadius: 10,
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: "pointer"
                            }}>
                              <Lock size={14} />
                              Connectez-vous pour poster
                            </button>
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Rules */}
          <div style={{
            marginTop: 40,
            padding: 24,
            background: "#0a0a12",
            border: "1px solid #1a1a2e",
            borderRadius: 16
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a5cff" }} />
              <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>REGLES DU FORUM</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                "Respectez les autres membres",
                "Pas de spam ni publicite",
                "Restez dans le sujet",
                "Contenu approprie uniquement"
              ].map((r, i) => (
                <div key={i} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: 8,
                  padding: "10px 14px",
                  background: "#08080c",
                  borderRadius: 8,
                  color: "#666",
                  fontSize: 13
                }}>
                  <Clock size={14} color="#1a5cff" />
                  {r}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
