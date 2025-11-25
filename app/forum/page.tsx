"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Users, Bell, MessageCircle, Lightbulb, HelpCircle, Lock, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

const SECTIONS = [
  { id: "annonces", name: "Annonces", desc: "Mises a jour officielles", icon: Bell, color: "#f59e0b" },
  { id: "general", name: "Discussions", desc: "Parlez de tout", icon: MessageCircle, color: "#3b82f6" },
  { id: "suggestions", name: "Suggestions", desc: "Vos idees", icon: Lightbulb, color: "#22c55e" },
  { id: "support", name: "Support", desc: "Besoin d'aide", icon: HelpCircle, color: "#a855f7" },
  { id: "stories", name: "Histoires RP", desc: "Vos moments", icon: MessageSquare, color: "#f97316" },
  { id: "recrutement", name: "Recrutement", desc: "Rejoindre une org", icon: Users, color: "#ef4444" },
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
    <>
      <style>{`*, *::before, *::after { animation: none !important; transition: none !important; }`}</style>
      
      <div className="min-h-screen bg-dark-bg">
        
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-neon/5" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 pt-28 pb-20">
          <div style={{ marginBottom: "40px" }}>
            <h1 style={{ fontSize: "32px", fontWeight: 900, color: "#fff", marginBottom: "8px" }}>Forum</h1>
            <p style={{ color: "#888" }}>Espace communautaire Central6RP</p>
          </div>

          {/* Sections */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {SECTIONS.map(s => {
              const Icon = s.icon;
              const isOpen = active === s.id;
              
              return (
                <div 
                  key={s.id} 
                  style={{
                    backgroundColor: "#12121a",
                    border: isOpen ? `1px solid ${s.color}40` : "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    overflow: "hidden"
                  }}
                >
                  {/* Header clickable */}
                  <div
                    onClick={() => setActive(isOpen ? null : s.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      padding: "20px",
                      cursor: "pointer"
                    }}
                  >
                    <div style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      backgroundColor: s.color + "20",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Icon size={22} color={s.color} />
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{ color: "#fff", fontSize: "15px", fontWeight: 500 }}>{s.name}</div>
                      <div style={{ color: "#666", fontSize: "13px" }}>{s.desc}</div>
                    </div>
                    
                    <ChevronRight 
                      size={20} 
                      color="#444" 
                      style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                    />
                  </div>
                  
                  {/* Content */}
                  {isOpen && (
                    <div style={{ 
                      padding: "0 20px 20px 20px",
                      borderTop: "1px solid rgba(255,255,255,0.05)"
                    }}>
                      <div style={{
                        marginTop: "20px",
                        padding: "40px",
                        border: "1px dashed rgba(255,255,255,0.1)",
                        borderRadius: "12px",
                        backgroundColor: "#0a0a0f",
                        textAlign: "center"
                      }}>
                        <div style={{ color: "#555", fontSize: "14px", marginBottom: "16px" }}>
                          Aucun sujet dans cette section
                        </div>
                        {user ? (
                          <button style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "10px 20px",
                            backgroundColor: s.color,
                            color: "#000",
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "13px",
                            fontWeight: 500,
                            cursor: "pointer"
                          }}>
                            <Plus size={16} />
                            Creer le premier sujet
                          </button>
                        ) : (
                          <Link href="/login">
                            <button style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "10px 20px",
                              backgroundColor: "rgba(255,255,255,0.1)",
                              color: "#888",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "13px",
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

          {/* Regles */}
          <div style={{
            marginTop: "40px",
            backgroundColor: "#12121a",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
            padding: "24px"
          }}>
            <div style={{ color: "#fff", fontSize: "15px", fontWeight: 500, marginBottom: "16px" }}>Regles du Forum</div>
            <div style={{ color: "#666", fontSize: "13px", lineHeight: 2 }}>
              • Respectez les autres membres<br/>
              • Pas de spam ni publicite<br/>
              • Restez dans le sujet<br/>
              • Contenu approprie uniquement
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
