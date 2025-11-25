"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      // 401 est normal si pas connecté
      if (res.status === 401) {
        router.push("/login");
        return;
      }

      if (!res.ok) {
        router.push("/login");
        return;
      }

      const data = await res.json();

      if (data.success) {
        setUser(data.user);
      } else {
        router.push("/login");
      }
    } catch (err) {
      setError("Erreur de chargement du profil");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        router.push("/");
      }
    } catch (err) {
      setError("Erreur de déconnexion");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      {/* Background lines diagonales */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] w-full bg-white/[0.02]"
            style={{
              top: `${i * 5}%`,
              transform: "rotate(-45deg)",
              transformOrigin: "center",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Bouton retour */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </button>

          <h1 className="text-4xl font-bold text-white mb-8">
            Votre profil
          </h1>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm mb-6">
              {error}
            </div>
          )}

          {/* Profile Card */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 rounded-sm mb-6">
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Nom d'utilisateur
                </label>
                <div className="text-2xl font-semibold text-white">
                  {user.username}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <div className="text-lg text-white">{user.email}</div>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Rôle
                </label>
                <div className="inline-block px-3 py-1 bg-[#2a7cff]/20 border border-[#2a7cff]/50 text-[#2a7cff] rounded-sm text-sm font-medium">
                  {user.role}
                </div>
              </div>

              {/* Member since */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Membre depuis
                </label>
                <div className="text-lg text-white">
                  {new Date(user.created_at).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-sm transition-all duration-200"
            >
              Se déconnecter
            </button>
          </div>

          {/* Section Admin - visible uniquement pour les admins */}
          {(user.role === "ADMIN" || user.role === "admin") && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                🛡️ Panel Administration
              </h2>
              <div className="bg-[#2a7cff]/10 backdrop-blur-sm border border-[#2a7cff]/30 p-8 rounded-sm">
                <p className="text-gray-300 mb-6">
                  En tant qu'administrateur, vous avez accès à des fonctionnalités supplémentaires.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => router.push("/admin/users")}
                    className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold py-4 px-6 rounded-sm transition-all duration-200 text-left"
                  >
                    <div className="text-[#2a7cff] text-lg mb-1">👥 Utilisateurs</div>
                    <div className="text-sm text-gray-400">Gérer les comptes utilisateurs</div>
                  </button>
                  <button
                    onClick={() => router.push("/admin/logs")}
                    className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold py-4 px-6 rounded-sm transition-all duration-200 text-left"
                  >
                    <div className="text-[#2a7cff] text-lg mb-1">📊 Logs</div>
                    <div className="text-sm text-gray-400">Voir les logs d'activité</div>
                  </button>
                  <button
                    onClick={() => router.push("/admin/stats")}
                    className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold py-4 px-6 rounded-sm transition-all duration-200 text-left"
                  >
                    <div className="text-[#2a7cff] text-lg mb-1">📈 Statistiques</div>
                    <div className="text-sm text-gray-400">Voir les stats du serveur</div>
                  </button>
                  <button
                    onClick={() => router.push("/admin/settings")}
                    className="bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white font-semibold py-4 px-6 rounded-sm transition-all duration-200 text-left"
                  >
                    <div className="text-[#2a7cff] text-lg mb-1">⚙️ Paramètres</div>
                    <div className="text-sm text-gray-400">Configuration du serveur</div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

