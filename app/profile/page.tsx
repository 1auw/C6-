"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, User, Mail, Shield, Crown, Calendar, LogOut, Settings, Users, Activity, BarChart3 } from "lucide-react";
import Link from "next/link";

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.status === 401 || !res.ok) {
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
      const res = await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
      const data = await res.json();
      if (data.success) {
        router.push("/");
      }
    } catch (err) {
      setError("Erreur de déconnexion");
    }
  };

  const getRoleBadge = (role: string) => {
    const r = role.toUpperCase();
    switch (r) {
      case 'OWNER':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl">
            <Crown size={20} className="text-yellow-400" />
            <span className="font-bold text-yellow-400">OWNER</span>
          </div>
        );
      case 'ADMIN':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-xl">
            <Shield size={20} className="text-red-400" />
            <span className="font-bold text-red-400">ADMINISTRATEUR</span>
          </div>
        );
      case 'MODERATOR':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-xl">
            <Shield size={20} className="text-purple-400" />
            <span className="font-bold text-purple-400">MODÉRATEUR</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/50 rounded-xl">
            <User size={20} className="text-primary" />
            <span className="font-bold text-primary">MEMBRE</span>
          </div>
        );
    }
  };

  const isStaff = user && ['ADMIN', 'OWNER', 'MODERATOR'].includes(user.role.toUpperCase());

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary-neon/5" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-neon/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Back button */}
          <Link href="/">
            <motion.button 
              whileHover={{ x: -5 }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              Retour à l'accueil
            </motion.button>
          </Link>

          {/* Profile Header */}
          <div className="bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-black ${
                  user.role.toUpperCase() === 'OWNER' 
                    ? 'bg-gradient-to-br from-yellow-500 to-orange-500' 
                    : user.role.toUpperCase() === 'ADMIN'
                    ? 'bg-gradient-to-br from-red-500 to-pink-500'
                    : 'bg-gradient-to-br from-primary to-primary-neon'
                }`}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {user.role.toUpperCase() === 'OWNER' && (
                  <div className="absolute -top-2 -right-2 bg-yellow-500 p-1.5 rounded-lg">
                    <Crown size={16} className="text-black" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-black text-white mb-2">{user.username}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  {getRoleBadge(user.role)}
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-5 py-3 rounded-xl border border-red-500/30 transition-all"
              >
                <LogOut size={18} />
                Déconnexion
              </motion.button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          {/* Staff Panel */}
          {isStaff && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-primary/10 to-primary-neon/5 backdrop-blur-xl border border-primary/30 rounded-2xl p-8 mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                {user.role.toUpperCase() === 'OWNER' ? (
                  <Crown size={28} className="text-yellow-400" />
                ) : (
                  <Shield size={28} className="text-primary" />
                )}
                <h2 className="text-2xl font-bold text-white">
                  {user.role.toUpperCase() === 'OWNER' ? 'Panel Owner' : 'Panel Administration'}
                </h2>
              </div>

              <p className="text-gray-300 mb-6">
                {user.role.toUpperCase() === 'OWNER' 
                  ? 'Vous avez un accès complet à toutes les fonctionnalités du site.'
                  : 'Vous avez accès aux fonctionnalités d\'administration.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/admin/users">
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(42, 124, 255, 0.5)' }}
                    className="bg-dark-bg/50 border border-white/10 rounded-xl p-5 cursor-pointer transition-all"
                  >
                    <Users size={24} className="text-primary mb-3" />
                    <h3 className="text-white font-semibold mb-1">Utilisateurs</h3>
                    <p className="text-gray-400 text-sm">Gérer les comptes</p>
                  </motion.div>
                </Link>

                <Link href="/admin/logs">
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(42, 124, 255, 0.5)' }}
                    className="bg-dark-bg/50 border border-white/10 rounded-xl p-5 cursor-pointer transition-all"
                  >
                    <Activity size={24} className="text-green-400 mb-3" />
                    <h3 className="text-white font-semibold mb-1">Logs</h3>
                    <p className="text-gray-400 text-sm">Activité du serveur</p>
                  </motion.div>
                </Link>

                <Link href="/admin/stats">
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(42, 124, 255, 0.5)' }}
                    className="bg-dark-bg/50 border border-white/10 rounded-xl p-5 cursor-pointer transition-all"
                  >
                    <BarChart3 size={24} className="text-yellow-400 mb-3" />
                    <h3 className="text-white font-semibold mb-1">Statistiques</h3>
                    <p className="text-gray-400 text-sm">Données du serveur</p>
                  </motion.div>
                </Link>

                <Link href="/admin/settings">
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: 'rgba(42, 124, 255, 0.5)' }}
                    className="bg-dark-bg/50 border border-white/10 rounded-xl p-5 cursor-pointer transition-all"
                  >
                    <Settings size={24} className="text-purple-400 mb-3" />
                    <h3 className="text-white font-semibold mb-1">Paramètres</h3>
                    <p className="text-gray-400 text-sm">Configuration</p>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/reglement">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-all"
              >
                <h3 className="text-white font-semibold">Règlement</h3>
              </motion.div>
            </Link>

            <Link href="/contact">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 transition-all"
              >
                <h3 className="text-white font-semibold">Contact</h3>
              </motion.div>
            </Link>

            <a href="https://discord.gg/central6rp" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-dark-card/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center cursor-pointer hover:border-[#5865F2]/50 transition-all"
              >
                <h3 className="text-white font-semibold">Discord</h3>
              </motion.div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
