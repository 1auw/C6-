"use client";

import { useState, useEffect, useMemo } from "react";
import { ShoppingCart, Car, Home, Package, Wrench, Crown, X, Lock, Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  discount?: number;
}

const products: Product[] = [
  { id: 1, name: "Pack VIP Central6 Argent (30 jours)", description: "30 jours de rang ameliore, meilleure priorite de connexion et reduction legere sur certaines offres boutique.", price: 9.50, oldPrice: 10.00, category: "VIP", discount: 5 },
  { id: 2, name: "Pack VIP Central6 Or (30 jours)", description: "Rang premium avec file d'attente renforcee, salon dedie Discord et bonus RP visuel en jeu.", price: 17.99, oldPrice: 19.99, category: "VIP", discount: 10 },
  { id: 3, name: "Pack VIP Central6 Platine (30 jours)", description: "Rang tres haut de gamme, avantages accentues, priorites RP et events reserves.", price: 29.74, oldPrice: 34.99, category: "VIP", discount: 15 },
  { id: 4, name: "Pack VIP Central6 Diamant (30 jours)", description: "Rang d'elite, acces a la totalite des avantages VIP publics et bonus exclusifs serveurs.", price: 39.99, oldPrice: 49.99, category: "VIP", discount: 20 },
  { id: 5, name: "Pack VIP Central6 Titan (60 jours)", description: "60 jours de rang ultra premium, bonus consolides, priorite maximale et avantages long terme.", price: 52.49, oldPrice: 69.99, category: "VIP", discount: 25 },
  { id: 6, name: "Pack VIP Central6 Galaxie (90 jours)", description: "90 jours de rang legendaire, privileges VIP etendus et presence mise en avant sur le serveur.", price: 59.49, oldPrice: 84.99, category: "VIP", discount: 30 },
  { id: 7, name: "Pack VIP Central6 Omega (90 jours)", description: "Offre ultime de Central6RP, 90 jours avec tous les avantages VIP existants et statut Omega exclusif.", price: 64.99, oldPrice: 99.99, category: "VIP", discount: 35 },
  { id: 8, name: "Pack VIP Central6 Bronze (30 jours)", description: "Acces VIP Central6 Bronze pendant 30 jours : file d'attente prioritaire legere, tag VIP Bronze et petit bonus de confort RP.", price: 4.99, category: "VIP" },
  { id: 9, name: "Appartement Moderne Vue Mer", description: "Appartement lumineux avec vue mer, quartier residentiel premium.", price: 35.99, oldPrice: 39.99, category: "IMMOBILIER", discount: 10 },
  { id: 10, name: "Maison Moderne avec Garage", description: "Grande maison moderne avec garage double, ideale pour collectionneur.", price: 42.49, oldPrice: 49.99, category: "IMMOBILIER", discount: 15 },
  { id: 11, name: "Villa de Luxe sur les Hauteurs", description: "Villa de luxe avec piscine et vue panoramique, pour les plus riches.", price: 63.99, oldPrice: 79.99, category: "IMMOBILIER", discount: 20 },
  { id: 12, name: "Studio Centre-Ville", description: "Petit studio en plein centre-ville, ideal pour un debut de RP urbain.", price: 24.99, category: "IMMOBILIER" },
  { id: 13, name: "Maison de Banlieue", description: "Maison familiale en banlieue, parfaite pour un RP de vie quotidienne.", price: 34.99, category: "IMMOBILIER" },
  { id: 14, name: "Loft Industriel", description: "Loft style industriel, parfait pour artiste, DJ ou RP underground.", price: 40.49, oldPrice: 44.99, category: "IMMOBILIER", discount: 10 },
  { id: 15, name: "Pack Starter Civil", description: "Pack de depart civil : petit vehicule, tenue propre et base de materiel RP (sans armes).", price: 9.99, category: "PACK_DEPART" },
  { id: 16, name: "Pack Starter Entreprise", description: "Pack pour entrepreneur : vehicule adapte, tenue business et accessoires RP.", price: 13.49, oldPrice: 14.99, category: "PACK_DEPART", discount: 10 },
  { id: 17, name: "Pack Starter Gang", description: "Pack pour role criminel encadre : voiture de quartier, tenue et accessoires RP visuels (sans armes).", price: 15.29, oldPrice: 16.99, category: "PACK_DEPART", discount: 10 },
  { id: 18, name: "Pack Luxe RP", description: "Pack luxe : vehicule haut de gamme, tenue classe et elements visuels RP.", price: 21.24, oldPrice: 24.99, category: "PACK_DEPART", discount: 15 },
  { id: 19, name: "Pack Famille / Colocation", description: "Pack pour jouer en groupe : acces a une maison familiale et tenues coordonnees.", price: 17.99, oldPrice: 19.99, category: "PACK_DEPART", discount: 10 },
  { id: 20, name: "Changement de Nom RP", description: "Permet de changer entierement votre identite RP (avec validation staff).", price: 6.99, category: "SERVICE" },
  { id: 21, name: "Changement de Plaque", description: "Personnalisez la plaque d'immatriculation d'un de vos vehicules.", price: 4.99, category: "SERVICE" },
  { id: 22, name: "Transfert de Vehicule", description: "Transfert d'un vehicule de votre personnage vers un autre joueur.", price: 5.99, category: "SERVICE" },
  { id: 23, name: "Changement d'Apparence", description: "Reset complet de l'apparence de votre personnage (skin, visage, base).", price: 7.19, oldPrice: 7.99, category: "SERVICE", discount: 10 },
  { id: 24, name: "Nettoyage Casier RP", description: "Nettoyage exceptionnel de votre casier RP sous conditions staff.", price: 8.49, oldPrice: 9.99, category: "SERVICE", discount: 15 },
  { id: 25, name: "Audi RS6 Avant Performance", description: "Break sportif ultra polyvalent, parfait pour un RP de luxe et de vitesse.", price: 16.19, oldPrice: 17.99, category: "VEHICULE", discount: 10 },
  { id: 26, name: "BMW M5 F90 Competition", description: "Berline sportive haut de gamme, ideale pour les chefs d'entreprise RP.", price: 16.14, oldPrice: 18.99, category: "VEHICULE", discount: 15 },
  { id: 27, name: "Mercedes AMG GT63 S", description: "Coupe 4 portes d'exception, melange de luxe et d'agressivite.", price: 16.99, oldPrice: 19.99, category: "VEHICULE", discount: 15 },
  { id: 28, name: "Audi R8 V10 Plus", description: "Supercar emblematique, tenue de route exceptionnelle et image prestige.", price: 17.59, oldPrice: 21.99, category: "VEHICULE", discount: 20 },
  { id: 29, name: "Lamborghini Huracan EVO", description: "Supercar italienne ultra nerveuse pour les plus gros roles RP.", price: 19.99, oldPrice: 24.99, category: "VEHICULE", discount: 20 },
  { id: 30, name: "Lamborghini Urus", description: "SUV de luxe tres puissant, parfait pour un personnage influent.", price: 19.54, oldPrice: 22.99, category: "VEHICULE", discount: 15 },
  { id: 31, name: "Porsche 911 Turbo S", description: "Icone sportive, acceleration extreme et image parfaite pour les VIP.", price: 20.39, oldPrice: 23.99, category: "VEHICULE", discount: 15 },
  { id: 32, name: "Nissan GTR R35", description: "Legende japonaise, ideale pour les runs et le RP illegal encadre.", price: 17.54, oldPrice: 19.49, category: "VEHICULE", discount: 10 },
  { id: 33, name: "Mercedes G63 AMG", description: "4x4 iconique, utilise par organisations RP et VIP.", price: 16.64, oldPrice: 18.49, category: "VEHICULE", discount: 10 },
  { id: 34, name: "Mercedes Classe S 500", description: "Berline de prestige, pour roles officiels et tres haut standing.", price: 16.19, oldPrice: 17.99, category: "VEHICULE", discount: 10 },
  { id: 35, name: "Tesla Model S Plaid", description: "Berline electrique ultra rapide, discrete mais redoutable.", price: 15.29, oldPrice: 16.99, category: "VEHICULE", discount: 10 },
  { id: 36, name: "BMW M3 G80", description: "Compacte sportive moderne, ideale pour le RP de rue et d'entreprise.", price: 15.19, oldPrice: 15.99, category: "VEHICULE", discount: 5 },
  { id: 37, name: "Audi RS3 Berline", description: "Petite berline surpuissante, parfaite pour un RP jeune et dynamique.", price: 13.77, oldPrice: 14.49, category: "VEHICULE", discount: 5 },
  { id: 38, name: "Volkswagen Golf 8 R", description: "Compacte sportive au look discret mais aux performances elevees.", price: 13.99, category: "VEHICULE" },
  { id: 39, name: "Volkswagen Scirocco R", description: "Coupe compact polyvalent, parfait pour debuter dans le tuning.", price: 12.99, category: "VEHICULE" },
  { id: 40, name: "Toyota Supra MK5", description: "Coupe moderne taille pour le drift et les rassemblements tuning.", price: 13.94, oldPrice: 15.49, category: "VEHICULE", discount: 10 },
  { id: 41, name: "Toyota Supra MK4", description: "Coupe japonais iconique, parfait pour un personnage fan de JDM.", price: 14.84, oldPrice: 16.49, category: "VEHICULE", discount: 10 },
  { id: 42, name: "Honda Civic Type R", description: "Compacte sportive au look agressif, ideale pour RP urbain.", price: 11.99, category: "VEHICULE" },
  { id: 43, name: "Subaru Impreza WRX STI", description: "Icone rallye, parfaite pour scenes RP de montagne et campagne.", price: 13.49, category: "VEHICULE" },
  { id: 44, name: "Mitsubishi Lancer Evo X", description: "Berline 4RM sportive, ideale pour drift et runs organises.", price: 13.29, oldPrice: 13.99, category: "VEHICULE", discount: 5 },
  { id: 45, name: "Range Rover Vogue", description: "SUV de luxe, parfait pour businessmen et familles aisees.", price: 15.67, oldPrice: 16.49, category: "VEHICULE", discount: 5 },
  { id: 46, name: "Audi Q8", description: "SUV sportif moderne, tres adapte au RP civil haut de gamme.", price: 15.99, category: "VEHICULE" },
  { id: 47, name: "BMW X6 M", description: "SUV coupe agressif, pour personnage puissant et imposant.", price: 16.14, oldPrice: 16.99, category: "VEHICULE", discount: 5 },
  { id: 48, name: "Audi S6 Avant", description: "Break sportif discret, melange vie de famille et vitesse.", price: 13.99, category: "VEHICULE" },
  { id: 49, name: "BMW Serie 7 Limousine", description: "Berline de luxe chauffeur, ideale pour gouvernement/entreprise.", price: 15.74, oldPrice: 17.49, category: "VEHICULE", discount: 10 },
  { id: 50, name: "Fiat 500 Abarth", description: "Petite citadine sportive, parfaite pour debuter en RP urbain.", price: 7.99, category: "VEHICULE" },
  { id: 51, name: "Peugeot 208 GTi", description: "Compacte francaise nerveuse, adaptee a un personnage modeste.", price: 8.49, category: "VEHICULE" },
  { id: 52, name: "Renault Clio 4 RS", description: "Petite sportive francaise, tres populaire pour RP de quartier.", price: 8.49, category: "VEHICULE" },
  { id: 53, name: "Ford Focus RS", description: "Compacte sportive polyvalente, adaptee a tous types de scenes RP.", price: 11.49, category: "VEHICULE" },
  { id: 54, name: "Ford Mustang GT", description: "Muscle car mythique, ideale pour un personnage extravagant.", price: 13.49, oldPrice: 14.99, category: "VEHICULE", discount: 10 },
  { id: 55, name: "Chevrolet Camaro ZL1", description: "Muscle car tres puissante, look agressif et sonore marquee.", price: 13.94, oldPrice: 15.49, category: "VEHICULE", discount: 10 },
  { id: 56, name: "Dodge Charger Hellcat", description: "Berline americaine monstrueuse, pour gangs et grosses figures RP.", price: 14.02, oldPrice: 16.49, category: "VEHICULE", discount: 15 },
  { id: 57, name: "Dodge Challenger SRT", description: "Coupe americain iconique, parfait pour shows et runs RP.", price: 14.39, oldPrice: 15.99, category: "VEHICULE", discount: 10 },
  { id: 58, name: "Kawasaki Ninja ZX-10R", description: "Moto hypersport pour amateurs de deux-roues rapides.", price: 9.49, oldPrice: 9.99, category: "VEHICULE", discount: 5 },
  { id: 59, name: "Yamaha R6", description: "Moto sportive legere, pour RP jeune et dynamique.", price: 8.99, category: "VEHICULE" },
  { id: 60, name: "Ducati Panigale V4", description: "Moto italienne haut de gamme, rare et prestigieuse.", price: 10.79, oldPrice: 11.99, category: "VEHICULE", discount: 10 },
  { id: 61, name: "Scooter Urbain 125cc", description: "Deux-roues simple et pratique pour les petits jobs RP.", price: 4.99, category: "VEHICULE" },
  { id: 62, name: "Camionnette Utilitaire", description: "Vehicule utilitaire pour livreurs, artisans et entreprises RP.", price: 6.99, category: "VEHICULE" },
  { id: 63, name: "Fourgon Blinde Securite", description: "Fourgon blinde pour missions RP de transport securise encadre.", price: 11.04, oldPrice: 12.99, category: "VEHICULE", discount: 15 },
  { id: 64, name: "Taxi Professionnel", description: "Vehicule taxi officiel pour travail legal RP.", price: 7.99, category: "VEHICULE" },
];

const categories = [
  { id: "ALL", name: "Tout", count: products.length },
  { id: "VIP", name: "VIP & Rangs", count: products.filter(p => p.category === "VIP").length },
  { id: "IMMOBILIER", name: "Immobilier", count: products.filter(p => p.category === "IMMOBILIER").length },
  { id: "PACK_DEPART", name: "Packs", count: products.filter(p => p.category === "PACK_DEPART").length },
  { id: "SERVICE", name: "Services", count: products.filter(p => p.category === "SERVICE").length },
  { id: "VEHICULE", name: "Vehicules", count: products.filter(p => p.category === "VEHICULE").length },
];

export default function BoutiquePage() {
  const [category, setCategory] = useState("ALL");
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("default");
  const [promoOnly, setPromoOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => data?.success && setUser(data.user))
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "ALL") list = list.filter(p => p.category === category);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (minPrice) list = list.filter(p => p.price >= Number(minPrice));
    if (maxPrice) list = list.filter(p => p.price <= Number(maxPrice));
    if (promoOnly) list = list.filter(p => p.discount);
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    if (sort === "promo") list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    return list;
  }, [category, search, minPrice, maxPrice, sort, promoOnly]);

  const buy = (p: Product) => user ? alert(`Achat: ${p.name}`) : setShowModal(true);

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-6 mb-6">
            <h1 className="text-3xl font-bold text-white">Boutique</h1>
            <p className="text-gray-500 mt-1">Packs VIP, vehicules, immobilier et services</p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#0f0f0f] border border-white/10 rounded text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-white/20"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 border rounded text-sm font-medium flex items-center gap-2 ${showFilters ? 'bg-white text-black border-white' : 'bg-transparent text-gray-400 border-white/10 hover:border-white/20'}`}
            >
              <SlidersHorizontal size={16} />
              Filtres
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-[#0f0f0f] border border-white/10 rounded p-4 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Prix min</label>
                <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="0" className="w-full px-3 py-2 bg-[#080808] border border-white/10 rounded text-white text-sm focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Prix max</label>
                <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="100" className="w-full px-3 py-2 bg-[#080808] border border-white/10 rounded text-white text-sm focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Trier</label>
                <select value={sort} onChange={e => setSort(e.target.value)} className="w-full px-3 py-2 bg-[#080808] border border-white/10 rounded text-white text-sm focus:outline-none">
                  <option value="default">Par defaut</option>
                  <option value="asc">Prix croissant</option>
                  <option value="desc">Prix decroissant</option>
                  <option value="promo">Meilleures promos</option>
                </select>
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={promoOnly} onChange={e => setPromoOnly(e.target.checked)} className="w-4 h-4" />
                  <span className="text-sm text-gray-400">Promos uniquement</span>
                </label>
              </div>
            </div>
          )}

          {/* Categories - Simple tabs */}
          <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat.id 
                    ? 'bg-white text-black' 
                    : 'bg-[#0f0f0f] text-gray-400 hover:text-white'
                }`}
              >
                {cat.name}
                <span className={`ml-1.5 text-xs ${category === cat.id ? 'text-black/60' : 'text-gray-600'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="text-sm text-gray-500 mb-4">
            {filtered.length} resultat{filtered.length > 1 ? 's' : ''}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">Aucun produit trouve</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(product => (
                <div key={product.id} className="bg-[#0f0f0f] border border-white/10 rounded overflow-hidden hover:border-white/20 transition-colors">
                  {/* Top bar */}
                  <div className="flex justify-between items-center px-3 py-2 border-b border-white/5">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                      {categories.find(c => c.id === product.category)?.name}
                    </span>
                    {product.discount && (
                      <span className="text-[10px] font-bold text-red-400">-{product.discount}%</span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-white text-sm font-medium leading-tight mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-2">{product.description}</p>
                    
                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-lg font-bold text-white">{product.price.toFixed(2)}</span>
                      <span className="text-xs text-gray-500">EUR</span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-600 line-through">{product.oldPrice.toFixed(2)}</span>
                      )}
                    </div>
                    
                    {/* Button */}
                    <button
                      onClick={() => buy(product)}
                      className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                        user 
                          ? 'bg-white text-black hover:bg-gray-200' 
                          : 'bg-white/5 text-gray-500 hover:bg-white/10'
                      }`}
                    >
                      {user ? 'Acheter' : 'Connexion requise'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#0f0f0f] border border-white/10 rounded p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
            <h3 className="text-white font-bold mb-2">Connexion requise</h3>
            <p className="text-gray-500 text-sm mb-4">Connectez-vous pour acheter.</p>
            <div className="flex gap-2">
              <Link href="/login" className="flex-1"><button className="w-full py-2 bg-white text-black rounded text-sm font-medium">Connexion</button></Link>
              <Link href="/register" className="flex-1"><button className="w-full py-2 bg-white/10 text-white rounded text-sm font-medium">Inscription</button></Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
