"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, Clock, Pin, Lock, ChevronRight, Plus, Search, TrendingUp, Award, HelpCircle, Lightbulb, Gamepad2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

interface ForumCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  topicsCount: number;
  postsCount: number;
  lastPost?: {
    title: string;
    author: string;
    date: string;
  };
}

interface RecentTopic {
  id: number;
  title: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  lastReply: string;
  isPinned?: boolean;
  isLocked?: boolean;
}

const forumCategories: ForumCategory[] = [
  {
    id: "annonces",
    name: "Annonces Officielles",
    description: "Toutes les annonces importantes du staff et les mises a jour du serveur.",
    icon: Award,
    color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    topicsCount: 24,
    postsCount: 156,
    lastPost: { title: "Mise a jour v2.5", author: "Admin", date: "Il y a 2h" }
  },
  {
    id: "general",
    name: "Discussions Generales",
    description: "Discutez de tout et de rien avec la communaute Central6RP.",
    icon: MessageSquare,
    color: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    topicsCount: 342,
    postsCount: 2847,
    lastPost: { title: "Presentation nouveau joueur", author: "NoobRP", date: "Il y a 15min" }
  },
  {
    id: "suggestions",
    name: "Suggestions",
    description: "Proposez vos idees pour ameliorer le serveur et l'experience RP.",
    icon: Lightbulb,
    color: "text-green-400 bg-green-400/10 border-green-400/30",
    topicsCount: 89,
    postsCount: 567,
    lastPost: { title: "Ajouter plus de jobs legaux", author: "PlayerOne", date: "Il y a 1h" }
  },
  {
    id: "support",
    name: "Support & Aide",
    description: "Besoin d'aide ? Posez vos questions ici, la communaute vous repondra.",
    icon: HelpCircle,
    color: "text-purple-400 bg-purple-400/10 border-purple-400/30",
    topicsCount: 156,
    postsCount: 892,
    lastPost: { title: "Comment rejoindre une org ?", author: "NewPlayer", date: "Il y a 30min" }
  },
  {
    id: "rp-stories",
    name: "Histoires RP",
    description: "Partagez vos meilleures histoires et moments RP avec la communaute.",
    icon: Gamepad2,
    color: "text-orange-400 bg-orange-400/10 border-orange-400/30",
    topicsCount: 78,
    postsCount: 445,
    lastPost: { title: "La legende de Marco le taxi", author: "MarcoRP", date: "Il y a 3h" }
  },
  {
    id: "recrutement",
    name: "Recrutement Organisations",
    description: "Les organisations recrutent ! Trouvez votre place dans le monde RP.",
    icon: Users,
    color: "text-red-400 bg-red-400/10 border-red-400/30",
    topicsCount: 45,
    postsCount: 234,
    lastPost: { title: "[LSPD] Recrutement ouvert", author: "ChefLSPD", date: "Il y a 5h" }
  },
];

const recentTopics: RecentTopic[] = [
  { id: 1, title: "Mise a jour v2.5 - Nouveau systeme economique", author: "Admin", category: "Annonces", replies: 45, views: 1250, lastReply: "Il y a 15min", isPinned: true },
  { id: 2, title: "Guide complet du debutant sur Central6RP", author: "Moderateur", category: "Support", replies: 89, views: 3420, lastReply: "Il y a 30min", isPinned: true },
  { id: 3, title: "Presentation de mon personnage : Tony Marcetti", author: "TonyM", category: "General", replies: 12, views: 156, lastReply: "Il y a 1h" },
  { id: 4, title: "Suggestion : Ajouter un systeme de meteo dynamique", author: "WeatherFan", category: "Suggestions", replies: 34, views: 567, lastReply: "Il y a 2h" },
  { id: 5, title: "[Grove Street] Recrutement gang RP serieux", author: "GroveLeader", category: "Recrutement", replies: 23, views: 445, lastReply: "Il y a 3h" },
  { id: 6, title: "Bug avec les vehicules apres la MAJ", author: "BugHunter", category: "Support", replies: 8, views: 234, lastReply: "Il y a 4h", isLocked: true },
];

const stats = {
  totalTopics: 734,
  totalPosts: 5141,
  totalMembers: 2847,
  onlineNow: 45
};

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
    } catch (err) {
      // Non connecte
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2a7cff]/5 via-transparent to-green-500/5" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2a7cff]/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black text-white mb-4">
            FORUM
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Rejoignez la communaute Central6RP. Discutez, partagez et creez des liens avec les autres joueurs.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.totalTopics}</div>
            <div className="text-sm text-gray-500">Sujets</div>
          </div>
          <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.totalPosts}</div>
            <div className="text-sm text-gray-500">Messages</div>
          </div>
          <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-white">{stats.totalMembers}</div>
            <div className="text-sm text-gray-500">Membres</div>
          </div>
          <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.onlineNow}</div>
            <div className="text-sm text-gray-500">En ligne</div>
          </div>
        </motion.div>

        {/* Search & New Topic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Rechercher dans le forum..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff]/50 transition-colors"
            />
          </div>
          {user ? (
            <button className="flex items-center justify-center gap-2 bg-[#2a7cff] hover:bg-[#1e5fd4] text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              <Plus size={20} />
              Nouveau sujet
            </button>
          ) : (
            <Link href="/login">
              <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-gray-400 font-semibold px-6 py-3 rounded-xl transition-colors border border-white/10">
                <Lock size={20} />
                Connectez-vous pour poster
              </button>
            </Link>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Categories */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="text-[#2a7cff]" size={24} />
                Categories
              </h2>

              <div className="space-y-4">
                {forumCategories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-[#2a7cff]/30 transition-all cursor-pointer group"
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`p-3 rounded-xl border ${category.color}`}>
                          <Icon size={24} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white group-hover:text-[#2a7cff] transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                            {category.description}
                          </p>
                          
                          {/* Last Post */}
                          {category.lastPost && (
                            <div className="mt-3 flex items-center gap-2 text-sm">
                              <Clock size={14} className="text-gray-600" />
                              <span className="text-gray-400 truncate">
                                {category.lastPost.title}
                              </span>
                              <span className="text-gray-600">par</span>
                              <span className="text-[#2a7cff]">{category.lastPost.author}</span>
                              <span className="text-gray-600">- {category.lastPost.date}</span>
                            </div>
                          )}
                        </div>

                        {/* Stats */}
                        <div className="hidden md:flex items-center gap-6 text-center">
                          <div>
                            <div className="text-white font-bold">{category.topicsCount}</div>
                            <div className="text-gray-600 text-xs">Sujets</div>
                          </div>
                          <div>
                            <div className="text-white font-bold">{category.postsCount}</div>
                            <div className="text-gray-600 text-xs">Messages</div>
                          </div>
                          <ChevronRight size={20} className="text-gray-600 group-hover:text-[#2a7cff] transition-colors" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Topics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-[#2a7cff]" size={24} />
                Discussions recentes
              </h2>

              <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                {recentTopics.map((topic, index) => (
                  <div
                    key={topic.id}
                    className={`p-4 hover:bg-white/5 transition-colors cursor-pointer ${
                      index !== recentTopics.length - 1 ? "border-b border-white/5" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {topic.isPinned && <Pin size={12} className="text-yellow-400" />}
                          {topic.isLocked && <Lock size={12} className="text-red-400" />}
                          <h4 className="text-white text-sm font-medium truncate">
                            {topic.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span className="text-[#2a7cff]">{topic.author}</span>
                          <span>dans</span>
                          <span className="text-gray-400">{topic.category}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{topic.replies} rep.</div>
                        <div className="text-xs text-gray-600">{topic.lastReply}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Online Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="text-green-400" size={24} />
                Membres en ligne
              </h2>

              <div className="bg-[#111]/80 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                <div className="flex flex-wrap gap-2">
                  {["Admin", "Moderateur", "TonyM", "PlayerOne", "GroveLeader", "MarcoRP", "NewPlayer", "+38 autres"].map((name, index) => (
                    <span
                      key={index}
                      className={`text-xs px-2 py-1 rounded ${
                        name === "Admin" ? "bg-red-500/20 text-red-400" :
                        name === "Moderateur" ? "bg-purple-500/20 text-purple-400" :
                        name.startsWith("+") ? "bg-white/5 text-gray-500" :
                        "bg-white/5 text-gray-400"
                      }`}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Rules Reminder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#2a7cff]/10 to-[#2a7cff]/5 border border-[#2a7cff]/30 rounded-xl p-4"
            >
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
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

