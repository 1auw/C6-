"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Lock, Sparkles, Zap, Crown, Home, Package, Wrench, Car } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  { id: 1, name: "Pack VIP Argent", desc: "Priorite connexion + reductions", price: 9.50, old: 10, cat: "VIP", hot: false },
  { id: 2, name: "Pack VIP Or", desc: "File renforcee + salon Discord", price: 17.99, old: 19.99, cat: "VIP", hot: true },
  { id: 3, name: "Pack VIP Platine", desc: "Avantages premium + events", price: 29.74, old: 34.99, cat: "VIP", hot: false },
  { id: 4, name: "Pack VIP Diamant", desc: "Acces complet VIP", price: 39.99, old: 49.99, cat: "VIP", hot: true },
  { id: 5, name: "Pack VIP Titan", desc: "Ultra premium 60 jours", price: 52.49, old: 69.99, cat: "VIP", hot: false },
  { id: 6, name: "Pack VIP Omega", desc: "Offre ultime 90j", price: 64.99, old: 99.99, cat: "VIP", hot: true },
  { id: 9, name: "Appart Vue Mer", desc: "Quartier premium", price: 35.99, old: 39.99, cat: "IMMO", hot: false },
  { id: 10, name: "Maison + Garage", desc: "Garage double", price: 42.49, old: 49.99, cat: "IMMO", hot: false },
  { id: 11, name: "Villa Luxe", desc: "Piscine + vue", price: 63.99, old: 79.99, cat: "IMMO", hot: true },
  { id: 12, name: "Studio Centre", desc: "Centre-ville", price: 24.99, cat: "IMMO", hot: false },
  { id: 15, name: "Starter Civil", desc: "Vehicule + tenue", price: 9.99, cat: "PACK", hot: false },
  { id: 16, name: "Starter Entreprise", desc: "Business pack", price: 13.49, old: 14.99, cat: "PACK", hot: false },
  { id: 17, name: "Starter Gang", desc: "Role criminel", price: 15.29, old: 16.99, cat: "PACK", hot: true },
  { id: 18, name: "Pack Luxe", desc: "Haut de gamme", price: 21.24, old: 24.99, cat: "PACK", hot: false },
  { id: 20, name: "Changement Nom", desc: "Nouvelle identite", price: 6.99, cat: "SERV", hot: false },
  { id: 21, name: "Changement Plaque", desc: "Plaque custom", price: 4.99, cat: "SERV", hot: false },
  { id: 23, name: "Reset Apparence", desc: "Nouveau look", price: 7.19, old: 7.99, cat: "SERV", hot: false },
  { id: 24, name: "Clean Casier", desc: "Effacer casier RP", price: 8.49, old: 9.99, cat: "SERV", hot: true },
  { id: 25, name: "Audi RS6", desc: "Break sportif", price: 16.19, old: 17.99, cat: "AUTO", hot: false },
  { id: 26, name: "BMW M5 F90", desc: "Berline sport", price: 16.14, old: 18.99, cat: "AUTO", hot: false },
  { id: 27, name: "Mercedes GT63", desc: "Coupe luxe", price: 16.99, old: 19.99, cat: "AUTO", hot: false },
  { id: 28, name: "Audi R8 V10", desc: "Supercar", price: 17.59, old: 21.99, cat: "AUTO", hot: true },
  { id: 29, name: "Lambo Huracan", desc: "Italienne", price: 19.99, old: 24.99, cat: "AUTO", hot: true },
  { id: 31, name: "Porsche 911", desc: "Icone", price: 20.39, old: 23.99, cat: "AUTO", hot: true },
  { id: 32, name: "Nissan GTR", desc: "Japonaise", price: 17.54, old: 19.49, cat: "AUTO", hot: false },
  { id: 38, name: "Supra MK5", desc: "Drift king", price: 13.94, old: 15.49, cat: "AUTO", hot: false },
  { id: 41, name: "Mustang GT", desc: "Muscle car", price: 13.49, old: 14.99, cat: "AUTO", hot: false },
  { id: 44, name: "Ninja ZX-10R", desc: "Moto sport", price: 9.49, old: 9.99, cat: "AUTO", hot: false },
];

const CATS = [
  { id: "TOUT", name: "TOUT", icon: Sparkles, color: "#fff" },
  { id: "VIP", name: "VIP", icon: Crown, color: "#fbbf24" },
  { id: "IMMO", name: "IMMO", icon: Home, color: "#34d399" },
  { id: "PACK", name: "PACKS", icon: Package, color: "#a78bfa" },
  { id: "SERV", name: "SERVICES", icon: Wrench, color: "#f472b6" },
  { id: "AUTO", name: "VEHICULES", icon: Car, color: "#60a5fa" },
];

export default function BoutiquePage() {
  const [cat, setCat] = useState("TOUT");
  const [user, setUser] = useState<any>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.success && setUser(d.user))
      .catch(() => {});
  }, []);

  const isVisible = (p: typeof PRODUCTS[0]) => cat === "TOUT" || p.cat === cat;
  const currentCat = CATS.find(c => c.id === cat);

  return (
    <>
      <style>{`*, *::before, *::after { animation: none !important; transition: none !important; }`}</style>
      
      <div style={{ minHeight: "100vh", background: "#050508" }}>
        {/* Hero Banner */}
        <div style={{
          position: "relative",
          padding: "120px 24px 60px",
          background: "linear-gradient(180deg, #0a0a12 0%, #050508 100%)",
          borderBottom: "1px solid #1a1a2e",
          overflow: "hidden"
        }}>
          {/* Grid pattern */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(26,92,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,92,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }} />
          
          <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Zap size={28} color="#1a5cff" />
              <span style={{ color: "#1a5cff", fontSize: 14, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase" }}>
                Boutique Officielle
              </span>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: -1 }}>
              CENTRAL<span style={{ color: "#1a5cff" }}>6</span>RP STORE
            </h1>
            <p style={{ color: "#666", fontSize: 16 }}>VIP, vehicules, packs et services premium</p>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 80px" }}>
          {/* Categories - Style Pills */}
          <div style={{ 
            display: "flex", 
            gap: 8, 
            marginBottom: 48,
            padding: 8,
            background: "#0a0a12",
            borderRadius: 16,
            border: "1px solid #1a1a2e",
            width: "fit-content"
          }}>
            {CATS.map(c => {
              const Icon = c.icon;
              const active = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCat(c.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "12px 20px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 1,
                    background: active ? c.color : "transparent",
                    color: active ? (c.id === "TOUT" ? "#000" : "#000") : "#666"
                  }}
                >
                  <Icon size={16} />
                  {c.name}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20
          }}>
            {PRODUCTS.map(p => {
              const visible = isVisible(p);
              const catData = CATS.find(c => c.id === p.cat);
              const discount = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
              
              return (
                <div
                  key={p.id}
                  style={{
                    display: visible ? "flex" : "none",
                    flexDirection: "column",
                    background: "#0a0a12",
                    border: p.hot ? `2px solid ${catData?.color}50` : "1px solid #1a1a2e",
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative"
                  }}
                >
                  {/* Hot badge */}
                  {p.hot && (
                    <div style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      padding: "4px 10px",
                      background: catData?.color,
                      borderRadius: 20,
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      gap: 4
                    }}>
                      <Sparkles size={10} />
                      HOT
                    </div>
                  )}

                  {/* Top bar with category */}
                  <div style={{
                    padding: "12px 16px",
                    background: `${catData?.color}10`,
                    borderBottom: `1px solid ${catData?.color}20`,
                    display: "flex",
                    alignItems: "center",
                    gap: 8
                  }}>
                    {catData?.icon && <catData.icon size={14} color={catData.color} />}
                    <span style={{ fontSize: 11, fontWeight: 700, color: catData?.color, letterSpacing: 1 }}>
                      {catData?.name}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{p.name}</h3>
                    <p style={{ color: "#555", fontSize: 13, marginBottom: 20 }}>{p.desc}</p>
                    
                    {/* Price */}
                    <div style={{ marginTop: "auto", marginBottom: 16 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                        <span style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{p.price.toFixed(2)}</span>
                        <span style={{ fontSize: 14, color: "#444" }}>EUR</span>
                      </div>
                      {p.old && (
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                          <span style={{ fontSize: 13, color: "#444", textDecoration: "line-through" }}>{p.old.toFixed(2)} EUR</span>
                          <span style={{ 
                            padding: "2px 8px", 
                            background: "#22c55e20", 
                            color: "#22c55e", 
                            fontSize: 11, 
                            fontWeight: 700,
                            borderRadius: 4
                          }}>
                            -{discount}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => user ? alert("Achat: " + p.name) : setModal(true)}
                      style={{
                        width: "100%",
                        padding: 14,
                        borderRadius: 10,
                        border: "none",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: user ? catData?.color : "#1a1a2e",
                        color: user ? "#000" : "#555"
                      }}
                    >
                      {user ? <><ShoppingCart size={16} /> ACHETER</> : <><Lock size={16} /> CONNEXION REQUISE</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal */}
        {modal && (
          <div 
            onClick={() => setModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100
            }}
          >
            <div 
              onClick={e => e.stopPropagation()}
              style={{
                background: "#0a0a12",
                border: "1px solid #1a1a2e",
                borderRadius: 20,
                padding: 32,
                width: 380
              }}
            >
              <Lock size={40} color="#1a5cff" style={{ marginBottom: 16 }} />
              <h3 style={{ color: "#fff", fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Connexion requise</h3>
              <p style={{ color: "#666", fontSize: 14, marginBottom: 24 }}>Connectez-vous pour effectuer un achat</p>
              <div style={{ display: "flex", gap: 12 }}>
                <Link href="/login" style={{ flex: 1 }}>
                  <button style={{ width: "100%", padding: 14, background: "#1a5cff", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Connexion
                  </button>
                </Link>
                <Link href="/register" style={{ flex: 1 }}>
                  <button style={{ width: "100%", padding: 14, background: "#1a1a2e", color: "#fff", border: "1px solid #2a2a3e", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                    Inscription
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
