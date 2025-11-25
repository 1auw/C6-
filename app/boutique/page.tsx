"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
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

const CATS = ["TOUT", "VIP", "IMMO", "PACK", "SERV", "AUTO"];
const CAT_NAMES: Record<string, string> = {
  TOUT: "Tout",
  VIP: "VIP & Rangs",
  IMMO: "Immobilier", 
  PACK: "Packs",
  SERV: "Services",
  AUTO: "Vehicules"
};

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

  const list = PRODUCTS.filter(p => {
    if (cat !== "TOUT" && p.cat !== cat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#000" }}>
      <Navbar />
      
      <div style={{ paddingTop: 100, paddingBottom: 60, maxWidth: 1200, margin: "0 auto", padding: "100px 20px 60px" }}>
        
        <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Boutique</h1>
        <p style={{ color: "#666", marginBottom: 30 }}>Packs, vehicules et services</p>

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Rechercher..."
          style={{
            width: "100%",
            maxWidth: 400,
            padding: "10px 16px",
            background: "#111",
            border: "1px solid #222",
            borderRadius: 6,
            color: "#fff",
            fontSize: 14,
            marginBottom: 20,
            outline: "none"
          }}
        />

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 30, flexWrap: "wrap" }}>
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: "8px 16px",
                background: cat === c ? "#fff" : "#111",
                color: cat === c ? "#000" : "#888",
                border: "none",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              {CAT_NAMES[c]}
            </button>
          ))}
        </div>

        {/* Count */}
        <p style={{ color: "#444", fontSize: 13, marginBottom: 20 }}>{list.length} produits</p>

        {/* Grid */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", 
          gap: 16 
        }}>
          {list.map(p => (
            <div key={p.id} style={{
              background: "#0a0a0a",
              border: "1px solid #1a1a1a",
              borderRadius: 8,
              padding: 16
            }}>
              <div style={{ fontSize: 10, color: "#555", marginBottom: 8, textTransform: "uppercase" }}>
                {CAT_NAMES[p.cat]}
              </div>
              <div style={{ color: "#fff", fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{p.name}</div>
              <div style={{ color: "#555", fontSize: 12, marginBottom: 12 }}>{p.desc}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
                <span style={{ color: "#fff", fontSize: 18, fontWeight: 700 }}>{p.price.toFixed(2)}</span>
                <span style={{ color: "#555", fontSize: 12 }}>EUR</span>
                {p.old && <span style={{ color: "#444", fontSize: 12, textDecoration: "line-through" }}>{p.old}</span>}
              </div>
              <button
                onClick={() => user ? alert("Achat: " + p.name) : setModal(true)}
                style={{
                  width: "100%",
                  padding: "10px",
                  background: user ? "#fff" : "#1a1a1a",
                  color: user ? "#000" : "#555",
                  border: "none",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer"
                }}
              >
                {user ? "Acheter" : "Connexion requise"}
              </button>
            </div>
          ))}
        </div>

        {list.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "#444" }}>Aucun produit</div>
        )}
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
              background: "#111",
              border: "1px solid #222",
              borderRadius: 8,
              padding: 24,
              width: 320
            }}
          >
            <div style={{ color: "#fff", fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Connexion requise</div>
            <div style={{ color: "#666", fontSize: 13, marginBottom: 16 }}>Connectez-vous pour acheter</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Link href="/login" style={{ flex: 1 }}>
                <button style={{ width: "100%", padding: 10, background: "#fff", color: "#000", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  Connexion
                </button>
              </Link>
              <Link href="/register" style={{ flex: 1 }}>
                <button style={{ width: "100%", padding: 10, background: "#222", color: "#fff", border: "none", borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
                  Inscription
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
