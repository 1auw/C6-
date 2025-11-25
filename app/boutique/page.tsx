"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const PRODUCTS = [
  { id: 1, name: "VIP Argent", sub: "30 jours", desc: "Priorite de connexion et reductions exclusives", price: 9.50, old: 10, cat: "VIP" },
  { id: 2, name: "VIP Or", sub: "30 jours", desc: "File prioritaire et acces salon Discord prive", price: 17.99, old: 19.99, cat: "VIP" },
  { id: 3, name: "VIP Platine", sub: "30 jours", desc: "Avantages premium et acces aux events prives", price: 29.74, old: 34.99, cat: "VIP" },
  { id: 4, name: "VIP Diamant", sub: "30 jours", desc: "Experience complete avec tous les avantages", price: 39.99, old: 49.99, cat: "VIP" },
  { id: 5, name: "Appartement Vue Mer", sub: "Permanent", desc: "Residence de standing dans le quartier premium", price: 35.99, old: 39.99, cat: "IMMO" },
  { id: 6, name: "Villa de Luxe", sub: "Permanent", desc: "Propriete d'exception avec piscine et vue", price: 63.99, old: 79.99, cat: "IMMO" },
  { id: 7, name: "Penthouse Centre", sub: "Permanent", desc: "Dernier etage en plein coeur de ville", price: 54.99, cat: "IMMO" },
  { id: 8, name: "Pack Starter", sub: "Unique", desc: "Vehicule et tenue pour bien demarrer", price: 9.99, cat: "PACK" },
  { id: 9, name: "Pack Business", sub: "Unique", desc: "Tout pour lancer votre entreprise RP", price: 13.49, old: 14.99, cat: "PACK" },
  { id: 10, name: "Pack Elite", sub: "Unique", desc: "Le pack ultime pour les vrais joueurs", price: 21.24, old: 24.99, cat: "PACK" },
  { id: 11, name: "Lamborghini Huracan", sub: "Permanent", desc: "Supercar italienne pour les connaisseurs", price: 19.99, old: 24.99, cat: "AUTO" },
  { id: 12, name: "Porsche 911 Turbo S", sub: "Permanent", desc: "L'icone intemporelle de la performance", price: 20.39, old: 23.99, cat: "AUTO" },
  { id: 13, name: "Mercedes AMG GT63", sub: "Permanent", desc: "Le coupe 4 portes le plus desirable", price: 16.99, old: 19.99, cat: "AUTO" },
  { id: 14, name: "BMW M5 Competition", sub: "Permanent", desc: "La berline sportive par excellence", price: 16.14, old: 18.99, cat: "AUTO" },
  { id: 15, name: "Audi R8 V10 Plus", sub: "Permanent", desc: "Technologie et emotion a l'etat pur", price: 17.59, old: 21.99, cat: "AUTO" },
  { id: 16, name: "Changement d'identite", sub: "Service", desc: "Nouveau nom, nouvelle vie", price: 6.99, cat: "SERV" },
];

const CATEGORIES = ["TOUT", "VIP", "IMMO", "PACK", "AUTO", "SERV"];

export default function BoutiquePage() {
  const [cat, setCat] = useState("TOUT");
  const [user, setUser] = useState<any>(null);
  const [modal, setModal] = useState<typeof PRODUCTS[0] | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.success && setUser(d.user))
      .catch(() => {});
  }, []);

  const filtered = PRODUCTS.filter(p => cat === "TOUT" || p.cat === cat);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary-neon/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <div className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Central6RP Store
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              La Boutique
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Decouvrez notre selection de vehicules, proprietes et avantages premium.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 mb-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    cat === c 
                      ? "bg-primary text-white glow-primary" 
                      : "bg-dark-card text-gray-400 hover:text-white hover:bg-dark-lighter border border-white/10"
                  }`}
                >
                  {c === "TOUT" ? "Tout" : c === "IMMO" ? "Immobilier" : c === "AUTO" ? "Vehicules" : c === "SERV" ? "Services" : c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="px-6 pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="group glass rounded-xl overflow-hidden hover:border-primary/30 transition-all"
                >
                  {/* Discount badge */}
                  {p.old && (
                    <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
                      <span className="text-green-400 text-xs font-bold">
                        -{Math.round((1 - p.price / p.old) * 100)}%
                      </span>
                    </div>
                  )}

                  <div className="p-6 relative">
                    {/* Category */}
                    <p className="text-primary/70 text-xs font-semibold tracking-widest uppercase mb-3">
                      {p.cat === "IMMO" ? "Immobilier" : p.cat === "AUTO" ? "Vehicule" : p.cat === "SERV" ? "Service" : p.cat}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl text-white font-bold mb-1">
                      {p.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">{p.sub}</p>

                    {/* Description */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                      {p.desc}
                    </p>

                    {/* Price */}
                    <div className="flex items-end gap-2 mb-5">
                      <span className="text-2xl font-bold text-white">{p.price.toFixed(2)}</span>
                      <span className="text-gray-500 text-sm mb-0.5">EUR</span>
                      {p.old && (
                        <span className="text-gray-600 text-sm line-through mb-0.5 ml-2">{p.old.toFixed(2)}</span>
                      )}
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => setModal(p)}
                      className="w-full py-3.5 rounded-lg text-sm font-semibold transition-all bg-primary hover:bg-primary-light text-white"
                    >
                      {user ? "Acheter maintenant" : "Voir le produit"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setModal(null)}
        >
          <div 
            className="glass rounded-2xl p-8 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-primary text-xs font-semibold tracking-widest uppercase mb-2">
              {modal.cat === "IMMO" ? "Immobilier" : modal.cat === "AUTO" ? "Vehicule" : modal.cat === "SERV" ? "Service" : modal.cat}
            </p>
            <h3 className="text-2xl text-white font-bold mb-2">{modal.name}</h3>
            <p className="text-gray-400 text-sm mb-6">{modal.desc}</p>
            
            <div className="flex items-end gap-2 mb-8">
              <span className="text-3xl font-bold text-white">{modal.price.toFixed(2)}</span>
              <span className="text-gray-500 mb-1">EUR</span>
            </div>

            {user ? (
              <button 
                onClick={() => { alert("Redirection vers PayPal..."); setModal(null); }}
                className="w-full py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold transition-colors"
              >
                Payer avec PayPal
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-400 text-sm text-center mb-4">Connectez-vous pour finaliser votre achat</p>
                <Link href="/login" className="block">
                  <button className="w-full py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold transition-colors">
                    Se connecter
                  </button>
                </Link>
                <Link href="/register" className="block">
                  <button className="w-full py-4 rounded-xl bg-dark-lighter hover:bg-dark-card text-white font-semibold transition-colors border border-white/10">
                    Creer un compte
                  </button>
                </Link>
              </div>
            )}

            <button 
              onClick={() => setModal(null)}
              className="w-full mt-4 py-3 text-gray-500 text-sm hover:text-white transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
