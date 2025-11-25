"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Users, Lock, Plus, Search, Award, HelpCircle, Lightbulb, Gamepad2, ChevronRight, Inbox } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
}

const forumCategories: ForumCategory[] = [
  {
    id: "annonces",
    name: "Annonces Officielles",
    description: "Toutes les annonces importantes du staff et les mises a jour du serveur.",
    icon: Award,
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  },
  {
    id: "general",
    name: "Discussions Generales",
    description: "Discutez de tout et de rien avec la communaute Central6RP.",
    icon: MessageSquare,
    color: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  },
  {
    id: "suggestions",
    name: "Suggestions",
    description: "Proposez vos idees pour ameliorer le serveur et l'experience RP.",
    icon: Lightbulb,
    color: "text-green-400 bg-green-400/10 border-green-400/30",
  },
  {
    id: "support",
    name: "Support & Aide",
    description: "Besoin d'aide ? Posez vos questions ici, la communaute vous repondra.",
    icon: HelpCircle,
    color: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  },
  {
    id: "rp-stories",
    name: "Histoires RP",
    description: "Partagez vos meilleures histoires et moments RP avec la communaute.",
    icon: Gamepad2,
    color: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  },
  {
    id: "recrutement",
    name: "Recrutement Organisations",
    description: "Les organisations recrutent ! Trouvez votre place dans le monde RP.",
    icon: Users,
    color: "text-red-400 bg-red-400/10 border-red-400/30",
  },
];

export default function ForumPage() {
  const [user, setUser] = useState<{ id: number; username: string; role: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a7cff]/5 via-transparent to-green-500/5" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-white mb-3">FORUM</h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Rejoignez la communaute Central6RP. Discutez, partagez et creez des liens avec les autres joueurs.
          </p>
        </div>

        {/* Search & New Topic */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher dans le forum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#111] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff]/50"
            />
          </div>
          {user ? (
            <button className="flex items-center justify-center gap-2 bg-[#2a7cff] hover:bg-[#1e5fd4] text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              <Plus size={20} />
              Nouveau sujet
            </button>
          ) : (
            <Link href="/login">
              <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-400 font-semibold px-6 py-3 rounded-lg border border-white/10 transition-colors">
                <Lock size={20} />
                Connectez-vous pour poster
              </button>
            </Link>
          )}
        </div>

        {/* Categories */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="text-[#2a7cff]" size={20} />
            Categories
          </h2>

          <div className="space-y-3">
            {forumCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-[#111] border border-white/10 rounded-lg p-4 hover:border-[#2a7cff]/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg border ${category.color}`}>
                      <Icon size={22} />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-white font-semibold group-hover:text-[#2a7cff] transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-500 text-sm mt-0.5">
                        {category.description}
                      </p>
                    </div>

                    <ChevronRight size={20} className="text-gray-600 group-hover:text-[#2a7cff] transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          <div className="mt-12 text-center py-16 bg-[#111] border border-white/10 rounded-lg">
            <Inbox size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-white font-semibold mb-2">Aucune discussion pour le moment</h3>
            <p className="text-gray-500 text-sm mb-4">
              Soyez le premier a lancer une discussion dans la communaute !
            </p>
            {user ? (
              <button className="bg-[#2a7cff] hover:bg-[#1e5fd4] text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
                Creer un sujet
              </button>
            ) : (
              <Link href="/login">
                <button className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
                  Se connecter pour poster
                </button>
              </Link>
            )}
          </div>

          {/* Rules */}
          <div className="mt-8 bg-[#2a7cff]/10 border border-[#2a7cff]/30 rounded-lg p-4">
            <h3 className="text-white font-semibold mb-2">Regles du Forum</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>- Respectez tous les membres</li>
              <li>- Pas de spam ni de pub</li>
              <li>- Restez dans le sujet</li>
              <li>- Pas de contenu NSFW</li>
            </ul>
            <Link href="/reglement">
              <button className="mt-3 text-sm text-[#2a7cff] hover:underline">
                Voir le reglement complet
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
