"use client";

import { useState, useEffect, useMemo } from "react";
import { ShoppingCart, Filter, Car, Home, Package, Wrench, Crown, X, Lock, Tag, Search, SlidersHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
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
  featured?: boolean;
}

const products: Product[] = [
  // VIP & RANGS
  { id: 1, name: "Pack VIP Central6 Argent (30 jours)", description: "30 jours de rang ameliore, meilleure priorite de connexion et reduction legere sur certaines offres boutique.", price: 9.50, oldPrice: 10.00, category: "VIP", discount: 5, featured: true },
  { id: 2, name: "Pack VIP Central6 Or (30 jours)", description: "Rang premium avec file d'attente renforcee, salon dedie Discord et bonus RP visuel en jeu.", price: 17.99, oldPrice: 19.99, category: "VIP", discount: 10 },
  { id: 3, name: "Pack VIP Central6 Platine (30 jours)", description: "Rang tres haut de gamme, avantages accentues, priorites RP et events reserves.", price: 29.74, oldPrice: 34.99, category: "VIP", discount: 15 },
  { id: 4, name: "Pack VIP Central6 Diamant (30 jours)", description: "Rang d'elite, acces a la totalite des avantages VIP publics et bonus exclusifs serveurs.", price: 39.99, oldPrice: 49.99, category: "VIP", discount: 20 },
  { id: 5, name: "Pack VIP Central6 Titan (60 jours)", description: "60 jours de rang ultra premium, bonus consolides, priorite maximale et avantages long terme.", price: 52.49, oldPrice: 69.99, category: "VIP", discount: 25 },
  { id: 6, name: "Pack VIP Central6 Galaxie (90 jours)", description: "90 jours de rang legendaire, privileges VIP etendus et presence mise en avant sur le serveur.", price: 59.49, oldPrice: 84.99, category: "VIP", discount: 30 },
  { id: 7, name: "Pack VIP Central6 Omega (90 jours)", description: "Offre ultime de Central6RP, 90 jours avec tous les avantages VIP existants et statut Omega exclusif.", price: 64.99, oldPrice: 99.99, category: "VIP", discount: 35 },
  { id: 8, name: "Pack VIP Central6 Bronze (30 jours)", description: "Acces VIP Central6 Bronze pendant 30 jours : file d'attente prioritaire legere, tag VIP Bronze et petit bonus de confort RP.", price: 4.99, category: "VIP" },
  
  // IMMOBILIER
  { id: 9, name: "Appartement Moderne Vue Mer", description: "Appartement lumineux avec vue mer, quartier residentiel premium.", price: 35.99, oldPrice: 39.99, category: "IMMOBILIER", discount: 10 },
  { id: 10, name: "Maison Moderne avec Garage", description: "Grande maison moderne avec garage double, ideale pour collectionneur.", price: 42.49, oldPrice: 49.99, category: "IMMOBILIER", discount: 15 },
  { id: 11, name: "Villa de Luxe sur les Hauteurs", description: "Villa de luxe avec piscine et vue panoramique, pour les plus riches.", price: 63.99, oldPrice: 79.99, category: "IMMOBILIER", discount: 20 },
  { id: 12, name: "Studio Centre-Ville", description: "Petit studio en plein centre-ville, ideal pour un debut de RP urbain.", price: 24.99, category: "IMMOBILIER" },
  { id: 13, name: "Maison de Banlieue", description: "Maison familiale en banlieue, parfaite pour un RP de vie quotidienne.", price: 34.99, category: "IMMOBILIER" },
  { id: 14, name: "Loft Industriel", description: "Loft style industriel, parfait pour artiste, DJ ou RP underground.", price: 40.49, oldPrice: 44.99, category: "IMMOBILIER", discount: 10 },

  // PACKS DE DEPART
  { id: 15, name: "Pack Starter Civil", description: "Pack de depart civil : petit vehicule, tenue propre et base de materiel RP (sans armes).", price: 9.99, category: "PACK_DEPART" },
  { id: 16, name: "Pack Starter Entreprise", description: "Pack pour entrepreneur : vehicule adapte, tenue business et accessoires RP.", price: 13.49, oldPrice: 14.99, category: "PACK_DEPART", discount: 10 },
  { id: 17, name: "Pack Starter Gang", description: "Pack pour role criminel encadre : voiture de quartier, tenue et accessoires RP visuels (sans armes).", price: 15.29, oldPrice: 16.99, category: "PACK_DEPART", discount: 10 },
  { id: 18, name: "Pack Luxe RP", description: "Pack luxe : vehicule haut de gamme, tenue classe et elements visuels RP.", price: 21.24, oldPrice: 24.99, category: "PACK_DEPART", discount: 15 },
  { id: 19, name: "Pack Famille / Colocation", description: "Pack pour jouer en groupe : acces a une maison familiale et tenues coordonnees.", price: 17.99, oldPrice: 19.99, category: "PACK_DEPART", discount: 10 },

  // SERVICES RP
  { id: 20, name: "Changement de Nom RP", description: "Permet de changer entierement votre identite RP (avec validation staff).", price: 6.99, category: "SERVICE" },
  { id: 21, name: "Changement de Plaque", description: "Personnalisez la plaque d'immatriculation d'un de vos vehicules.", price: 4.99, category: "SERVICE" },
  { id: 22, name: "Transfert de Vehicule", description: "Transfert d'un vehicule de votre personnage vers un autre joueur.", price: 5.99, category: "SERVICE" },
  { id: 23, name: "Changement d'Apparence", description: "Reset complet de l'apparence de votre personnage (skin, visage, base).", price: 7.19, oldPrice: 7.99, category: "SERVICE", discount: 10 },
  { id: 24, name: "Nettoyage Casier RP", description: "Nettoyage exceptionnel de votre casier RP sous conditions staff.", price: 8.49, oldPrice: 9.99, category: "SERVICE", discount: 15 },

  // VEHICULES
  { id: 25, name: "Audi RS6 Avant Performance", description: "Break sportif ultra polyvalent, parfait pour un RP de luxe et de vitesse.", price: 16.19, oldPrice: 17.99, category: "VEHICULE", discount: 10, featured: true },
  { id: 26, name: "BMW M5 F90 Competition", description: "Berline sportive haut de gamme, ideale pour les chefs d'entreprise RP.", price: 16.14, oldPrice: 18.99, category: "VEHICULE", discount: 15, featured: true },
  { id: 27, name: "Mercedes AMG GT63 S", description: "Coupe 4 portes d'exception, melange de luxe et d'agressivite.", price: 16.99, oldPrice: 19.99, category: "VEHICULE", discount: 15, featured: true },
  { id: 28, name: "Audi R8 V10 Plus", description: "Supercar emblematique, tenue de route exceptionnelle et image prestige.", price: 17.59, oldPrice: 21.99, category: "VEHICULE", discount: 20, featured: true },
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
  { id: "ALL", name: "Tout", icon: Filter },
  { id: "VIP", name: "VIP & Rangs", icon: Crown },
  { id: "IMMOBILIER", name: "Immobilier", icon: Home },
  { id: "PACK_DEPART", name: "Packs de depart", icon: Package },
  { id: "SERVICE", name: "Services RP", icon: Wrench },
  { id: "VEHICULE", name: "Vehicules", icon: Car },
];

type SortOption = "default" | "price_asc" | "price_desc" | "discount";

export default function BoutiquePage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [onlyPromo, setOnlyPromo] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setUser(data.user);
        }
      }
    } catch (err) {}
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filtre par categorie
    if (selectedCategory !== "ALL") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filtre par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Filtre par prix min
    if (priceMin) {
      result = result.filter(p => p.price >= parseFloat(priceMin));
    }

    // Filtre par prix max
    if (priceMax) {
      result = result.filter(p => p.price <= parseFloat(priceMax));
    }

    // Filtre promo uniquement
    if (onlyPromo) {
      result = result.filter(p => p.discount && p.discount > 0);
    }

    // Tri
    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, priceMin, priceMax, sortBy, onlyPromo]);

  const handleBuy = (product: Product) => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    alert(`Achat de ${product.name} - PayPal sera bientot disponible`);
  };

  const getCategoryLabel = (cat: string) => {
    const found = categories.find(c => c.id === cat);
    return found ? found.name : cat;
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "VIP": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "IMMOBILIER": return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "PACK_DEPART": return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      case "SERVICE": return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "VEHICULE": return "text-green-400 bg-green-400/10 border-green-400/30";
      default: return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceMin("");
    setPriceMax("");
    setSortBy("default");
    setOnlyPromo(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a7cff]/5 via-transparent to-purple-500/5" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white mb-3">BOUTIQUE</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Ameliorez votre experience RP avec nos packs VIP, vehicules, proprietes et services exclusifs.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#111] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff]/50"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-colors ${
                showFilters ? "bg-[#2a7cff] border-[#2a7cff] text-white" : "bg-[#111] border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              <SlidersHorizontal size={20} />
              Filtres
            </button>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-[#111] border border-white/10 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Prix Min */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Prix minimum</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#2a7cff]/50"
                  />
                </div>

                {/* Prix Max */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Prix maximum</label>
                  <input
                    type="number"
                    placeholder="100"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-[#2a7cff]/50"
                  />
                </div>

                {/* Tri */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Trier par</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#2a7cff]/50"
                  >
                    <option value="default">Par defaut</option>
                    <option value="price_asc">Prix croissant</option>
                    <option value="price_desc">Prix decroissant</option>
                    <option value="discount">Meilleures promos</option>
                  </select>
                </div>

                {/* Options */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Options</label>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={onlyPromo}
                        onChange={(e) => setOnlyPromo(e.target.checked)}
                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#2a7cff] focus:ring-[#2a7cff]"
                      />
                      <span className="text-white text-sm">Promos uniquement</span>
                    </label>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-gray-500 hover:text-white"
                    >
                      Reinitialiser
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isActive
                    ? "bg-[#2a7cff] border-[#2a7cff] text-white"
                    : "bg-[#111] border-white/10 text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            {selectedCategory === "ALL" ? "Tous les produits" : getCategoryLabel(selectedCategory)}
          </h2>
          <span className="text-gray-500">{filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""}</span>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-500 mb-4">Aucun produit trouve</div>
            <button onClick={resetFilters} className="text-[#2a7cff] hover:underline">
              Reinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onBuy={handleBuy}
                user={user}
                getCategoryLabel={getCategoryLabel}
                getCategoryColor={getCategoryColor}
              />
            ))}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowLoginModal(false)}
        >
          <div
            className="bg-[#111] border border-white/10 rounded-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Connexion requise</h3>
              <button onClick={() => setShowLoginModal(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-400 mb-4">Connectez-vous pour effectuer des achats.</p>
            <div className="flex gap-3">
              <Link href="/login" className="flex-1">
                <button className="w-full bg-[#2a7cff] hover:bg-[#1e5fd4] text-white font-semibold py-2.5 rounded-lg transition-colors">
                  Se connecter
                </button>
              </Link>
              <Link href="/register" className="flex-1">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-lg border border-white/20 transition-colors">
                  S'inscrire
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  onBuy,
  user,
  getCategoryLabel,
  getCategoryColor,
}: {
  product: Product;
  onBuy: (product: Product) => void;
  user: { id: number; username: string } | null;
  getCategoryLabel: (cat: string) => string;
  getCategoryColor: (cat: string) => string;
}) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-lg overflow-hidden hover:border-[#2a7cff]/30 transition-colors">
      {/* Header */}
      <div className="relative h-32 bg-gradient-to-br from-[#1a1a1a] to-[#0d0d0d] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent" />
        
        <div className="absolute top-2 left-2">
          <span className={`text-xs font-medium px-2 py-1 rounded border ${getCategoryColor(product.category)}`}>
            {getCategoryLabel(product.category)}
          </span>
        </div>

        {product.discount && (
          <div className="absolute top-2 right-2">
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">
              -{product.discount}%
            </span>
          </div>
        )}

        <div className="text-white/10">
          {product.category === "VIP" && <Crown size={48} />}
          {product.category === "IMMOBILIER" && <Home size={48} />}
          {product.category === "PACK_DEPART" && <Package size={48} />}
          {product.category === "SERVICE" && <Wrench size={48} />}
          {product.category === "VEHICULE" && <Car size={48} />}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-medium text-sm mb-1 line-clamp-2 min-h-[40px]">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 min-h-[32px]">
          {product.description}
        </p>

        <div className="flex items-end gap-2 mb-3">
          <span className="text-xl font-bold text-[#ff6b35]">{product.price.toFixed(2)} EUR</span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through text-xs">{product.oldPrice.toFixed(2)} EUR</span>
          )}
        </div>

        <button
          onClick={() => onBuy(product)}
          className={`w-full py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
            user
              ? "bg-[#ff6b35] hover:bg-[#ff5722] text-white"
              : "bg-white/5 text-gray-500 hover:bg-white/10"
          }`}
        >
          {user ? (
            <>
              <ShoppingCart size={16} />
              Acheter
            </>
          ) : (
            <>
              <Lock size={16} />
              Connexion requise
            </>
          )}
        </button>
      </div>
    </div>
  );
}
