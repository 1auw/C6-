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
    <div className="min-h-screen bg-[#09090b]">
      {/* Ambient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <div className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-blue-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Central6RP Store
            </p>
            <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tight mb-6">
              La Boutique
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed">
              Decouvrez notre selection exclusive de vehicules, proprietes et avantages premium pour enrichir votre experience.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-1 p-1.5 bg-zinc-900/50 rounded-full w-fit border border-zinc-800/50">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                    cat === c 
                      ? "bg-white text-zinc-900" 
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {c === "TOUT" ? "Tout" : c === "IMMO" ? "Immobilier" : c === "AUTO" ? "Vehicules" : c === "SERV" ? "Services" : c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="px-6 pb-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <div
                  key={p.id}
                  className="group relative bg-zinc-900/30 backdrop-blur-sm rounded-2xl border border-zinc-800/50 overflow-hidden hover:border-zinc-700/50 transition-all duration-500"
                >
                  {/* Gradient top */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Discount badge */}
                  {p.old && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                      <span className="text-emerald-400 text-xs font-medium">
                        -{Math.round((1 - p.price / p.old) * 100)}%
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Category */}
                    <p className="text-zinc-600 text-xs font-medium tracking-[0.15em] uppercase mb-4">
                      {p.cat === "IMMO" ? "Immobilier" : p.cat === "AUTO" ? "Vehicule" : p.cat === "SERV" ? "Service" : p.cat}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl text-white font-light mb-1 tracking-wide">
                      {p.name}
                    </h3>
                    <p className="text-zinc-600 text-sm mb-4">{p.sub}</p>

                    {/* Description */}
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                      {p.desc}
                    </p>

                    {/* Price */}
                    <div className="flex items-end gap-3 mb-6">
                      <span className="text-3xl font-light text-white">{p.price.toFixed(2)}</span>
                      <span className="text-zinc-600 text-sm mb-1">EUR</span>
                      {p.old && (
                        <span className="text-zinc-700 text-sm line-through mb-1">{p.old.toFixed(2)}</span>
                      )}
                    </div>

                    {/* Button */}
                    <button
                      onClick={() => user ? setModal(p) : setModal(p)}
                      className="w-full py-4 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 bg-white text-zinc-900 hover:bg-zinc-100"
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
            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-zinc-600 text-xs font-medium tracking-[0.15em] uppercase mb-2">
              {modal.cat === "IMMO" ? "Immobilier" : modal.cat === "AUTO" ? "Vehicule" : modal.cat === "SERV" ? "Service" : modal.cat}
            </p>
            <h3 className="text-2xl text-white font-light mb-2">{modal.name}</h3>
            <p className="text-zinc-500 text-sm mb-6">{modal.desc}</p>
            
            <div className="flex items-end gap-3 mb-8">
              <span className="text-4xl font-light text-white">{modal.price.toFixed(2)}</span>
              <span className="text-zinc-600 mb-1">EUR</span>
            </div>

            {user ? (
              <button 
                onClick={() => { alert("Redirection vers PayPal..."); setModal(null); }}
                className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors"
              >
                Payer avec PayPal
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-zinc-500 text-sm text-center mb-4">Connectez-vous pour finaliser votre achat</p>
                <Link href="/login" className="block">
                  <button className="w-full py-4 rounded-xl bg-white text-zinc-900 font-medium hover:bg-zinc-100 transition-colors">
                    Se connecter
                  </button>
                </Link>
                <Link href="/register" className="block">
                  <button className="w-full py-4 rounded-xl bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors border border-zinc-700">
                    Creer un compte
                  </button>
                </Link>
              </div>
            )}

            <button 
              onClick={() => setModal(null)}
              className="w-full mt-4 py-3 text-zinc-500 text-sm hover:text-white transition-colors"
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
