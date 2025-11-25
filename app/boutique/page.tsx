"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Search, Lock, Crown, Home, Package, Wrench, Car } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  { id: 1, name: "Pack VIP Argent (30j)", desc: "Priorite connexion + reductions", price: 9.50, old: 10, cat: "VIP" },
  { id: 2, name: "Pack VIP Or (30j)", desc: "File renforcee + salon Discord", price: 17.99, old: 19.99, cat: "VIP" },
  { id: 3, name: "Pack VIP Platine (30j)", desc: "Avantages premium + events", price: 29.74, old: 34.99, cat: "VIP" },
  { id: 4, name: "Pack VIP Diamant (30j)", desc: "Acces complet VIP", price: 39.99, old: 49.99, cat: "VIP" },
  { id: 5, name: "Pack VIP Titan (60j)", desc: "Ultra premium 60 jours", price: 52.49, old: 69.99, cat: "VIP" },
  { id: 6, name: "Pack VIP Galaxie (90j)", desc: "Legendaire 90 jours", price: 59.49, old: 84.99, cat: "VIP" },
  { id: 7, name: "Pack VIP Omega (90j)", desc: "Offre ultime", price: 64.99, old: 99.99, cat: "VIP" },
  { id: 8, name: "Pack VIP Bronze (30j)", desc: "Debutant VIP", price: 4.99, cat: "VIP" },
  { id: 9, name: "Appart Vue Mer", desc: "Quartier premium", price: 35.99, old: 39.99, cat: "IMMO" },
  { id: 10, name: "Maison + Garage", desc: "Garage double", price: 42.49, old: 49.99, cat: "IMMO" },
  { id: 11, name: "Villa Luxe", desc: "Piscine + vue", price: 63.99, old: 79.99, cat: "IMMO" },
  { id: 12, name: "Studio Centre", desc: "Centre-ville", price: 24.99, cat: "IMMO" },
  { id: 13, name: "Maison Banlieue", desc: "Familiale", price: 34.99, cat: "IMMO" },
  { id: 14, name: "Loft Industriel", desc: "Style underground", price: 40.49, old: 44.99, cat: "IMMO" },
  { id: 15, name: "Starter Civil", desc: "Vehicule + tenue", price: 9.99, cat: "PACK" },
  { id: 16, name: "Starter Entreprise", desc: "Business pack", price: 13.49, old: 14.99, cat: "PACK" },
  { id: 17, name: "Starter Gang", desc: "Role criminel", price: 15.29, old: 16.99, cat: "PACK" },
  { id: 18, name: "Pack Luxe", desc: "Haut de gamme", price: 21.24, old: 24.99, cat: "PACK" },
  { id: 19, name: "Pack Famille", desc: "Maison + tenues", price: 17.99, old: 19.99, cat: "PACK" },
  { id: 20, name: "Changement Nom", desc: "Nouvelle identite", price: 6.99, cat: "SERV" },
  { id: 21, name: "Changement Plaque", desc: "Plaque custom", price: 4.99, cat: "SERV" },
  { id: 22, name: "Transfert Vehicule", desc: "Vers autre joueur", price: 5.99, cat: "SERV" },
  { id: 23, name: "Changement Apparence", desc: "Reset complet", price: 7.19, old: 7.99, cat: "SERV" },
  { id: 24, name: "Nettoyage Casier", desc: "Effacer casier RP", price: 8.49, old: 9.99, cat: "SERV" },
  { id: 25, name: "Audi RS6", desc: "Break sportif", price: 16.19, old: 17.99, cat: "AUTO" },
  { id: 26, name: "BMW M5 F90", desc: "Berline sport", price: 16.14, old: 18.99, cat: "AUTO" },
  { id: 27, name: "Mercedes GT63 S", desc: "Coupe luxe", price: 16.99, old: 19.99, cat: "AUTO" },
  { id: 28, name: "Audi R8 V10", desc: "Supercar", price: 17.59, old: 21.99, cat: "AUTO" },
  { id: 29, name: "Lambo Huracan", desc: "Italienne", price: 19.99, old: 24.99, cat: "AUTO" },
  { id: 30, name: "Lambo Urus", desc: "SUV luxe", price: 19.54, old: 22.99, cat: "AUTO" },
  { id: 31, name: "Porsche 911", desc: "Icone", price: 20.39, old: 23.99, cat: "AUTO" },
  { id: 32, name: "Nissan GTR", desc: "Japonaise", price: 17.54, old: 19.49, cat: "AUTO" },
  { id: 33, name: "Mercedes G63", desc: "4x4 VIP", price: 16.64, old: 18.49, cat: "AUTO" },
  { id: 34, name: "Mercedes Classe S", desc: "Prestige", price: 16.19, old: 17.99, cat: "AUTO" },
  { id: 35, name: "Tesla Model S", desc: "Electrique", price: 15.29, old: 16.99, cat: "AUTO" },
  { id: 36, name: "BMW M3 G80", desc: "Compacte sport", price: 15.19, old: 15.99, cat: "AUTO" },
  { id: 37, name: "Golf 8 R", desc: "Compacte", price: 13.99, cat: "AUTO" },
  { id: 38, name: "Supra MK5", desc: "Drift", price: 13.94, old: 15.49, cat: "AUTO" },
  { id: 39, name: "Supra MK4", desc: "JDM legend", price: 14.84, old: 16.49, cat: "AUTO" },
  { id: 40, name: "Civic Type R", desc: "Urbain", price: 11.99, cat: "AUTO" },
  { id: 41, name: "Mustang GT", desc: "Muscle car", price: 13.49, old: 14.99, cat: "AUTO" },
  { id: 42, name: "Camaro ZL1", desc: "Americaine", price: 13.94, old: 15.49, cat: "AUTO" },
  { id: 43, name: "Charger Hellcat", desc: "Berline US", price: 14.02, old: 16.49, cat: "AUTO" },
  { id: 44, name: "Ninja ZX-10R", desc: "Moto sport", price: 9.49, old: 9.99, cat: "AUTO" },
  { id: 45, name: "Ducati V4", desc: "Moto italienne", price: 10.79, old: 11.99, cat: "AUTO" },
  { id: 46, name: "Scooter 125cc", desc: "Urbain", price: 4.99, cat: "AUTO" },
  { id: 47, name: "Camionnette", desc: "Utilitaire", price: 6.99, cat: "AUTO" },
  { id: 48, name: "Taxi Pro", desc: "Job legal", price: 7.99, cat: "AUTO" },
];

const CATS = [
  { id: "TOUT", name: "Tout", icon: null },
  { id: "VIP", name: "VIP", icon: Crown },
  { id: "IMMO", name: "Immobilier", icon: Home },
  { id: "PACK", name: "Packs", icon: Package },
  { id: "SERV", name: "Services", icon: Wrench },
  { id: "AUTO", name: "Vehicules", icon: Car },
];

export default function BoutiquePage() {
  const [cat, setCat] = useState("TOUT");
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.success && setUser(d.user))
      .catch(() => {});
  }, []);

  const isVisible = (p: typeof PRODUCTS[0]) => {
    if (cat !== "TOUT" && p.cat !== cat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  };

  const visibleCount = PRODUCTS.filter(isVisible).length;

  return (
    <>
      {/* Desactive toutes les animations globalement */}
      <style>{`
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
        }
      `}</style>
      
      <div className="min-h-screen bg-dark-bg">
        
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-neon/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-28 pb-20">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-white mb-2">Boutique</h1>
            <p className="text-gray-400">Packs VIP, vehicules, immobilier et services</p>
          </div>

          <div className="relative max-w-md mb-8">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full pl-11 pr-4 py-3 bg-dark-card border border-white/10 rounded-xl text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-primary/50"
            />
          </div>

          {/* Categories - boutons simples */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATS.map(c => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 500,
                  border: "1px solid",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: cat === c.id ? "#1a5cff" : "#12121a",
                  color: cat === c.id ? "#fff" : "#888",
                  borderColor: cat === c.id ? "#1a5cff" : "rgba(255,255,255,0.1)",
                }}
              >
                {c.icon && <c.icon size={16} />}
                {c.name}
              </button>
            ))}
          </div>

          <p className="text-gray-500 text-sm mb-6">{visibleCount} produits</p>

          {/* Grid avec style inline pour eviter tout recalcul */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "16px"
          }}>
            {PRODUCTS.map(p => {
              const visible = isVisible(p);
              return (
                <div 
                  key={p.id}
                  style={{
                    display: visible ? "block" : "none",
                    backgroundColor: "#12121a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    overflow: "hidden"
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    backgroundColor: "#1a1a25"
                  }}>
                    <span style={{ fontSize: "10px", color: "#666", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                      {CATS.find(c => c.id === p.cat)?.name}
                    </span>
                    {p.old && (
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "#ef4444" }}>
                        -{Math.round((1 - p.price / p.old) * 100)}%
                      </span>
                    )}
                  </div>
                  
                  <div style={{ padding: "16px" }}>
                    <h3 style={{ color: "#fff", fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>{p.name}</h3>
                    <p style={{ color: "#666", fontSize: "12px", marginBottom: "16px" }}>{p.desc}</p>
                    
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "16px" }}>
                      <span style={{ fontSize: "20px", fontWeight: 700, color: "#fff" }}>{p.price.toFixed(2)}</span>
                      <span style={{ fontSize: "12px", color: "#666" }}>EUR</span>
                      {p.old && (
                        <span style={{ fontSize: "12px", color: "#444", textDecoration: "line-through" }}>{p.old.toFixed(2)}</span>
                      )}
                    </div>
                    
                    <button
                      onClick={() => user ? alert("Achat: " + p.name) : setModal(true)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: 500,
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        backgroundColor: user ? "#1a5cff" : "rgba(255,255,255,0.05)",
                        color: user ? "#fff" : "#666"
                      }}
                    >
                      {user ? <><ShoppingCart size={16} /> Acheter</> : <><Lock size={16} /> Connexion requise</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {visibleCount === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0", color: "#666" }}>Aucun produit trouve</div>
          )}
        </div>

        {modal && (
          <div 
            onClick={() => setModal(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 100,
              padding: "16px"
            }}
          >
            <div 
              onClick={e => e.stopPropagation()}
              style={{
                backgroundColor: "#12121a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
                padding: "24px",
                width: "100%",
                maxWidth: "360px"
              }}
            >
              <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, marginBottom: "8px" }}>Connexion requise</h3>
              <p style={{ color: "#888", fontSize: "14px", marginBottom: "16px" }}>Connectez-vous pour acheter</p>
              <div style={{ display: "flex", gap: "12px" }}>
                <Link href="/login" style={{ flex: 1 }}>
                  <button style={{ width: "100%", padding: "12px", backgroundColor: "#1a5cff", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
                    Connexion
                  </button>
                </Link>
                <Link href="/register" style={{ flex: 1 }}>
                  <button style={{ width: "100%", padding: "12px", backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
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
