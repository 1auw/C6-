"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Activity, Shield, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Stats {
  total_users: number;
  active_users: number;
  admins: number;
  total_logs: number;
  logins_today: number;
  registrations_today: number;
}

export default function AdminStatsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    checkAdminAndFetchStats();
  }, []);

  const checkAdminAndFetchStats = async () => {
    try {
      const meRes = await fetch("/api/auth/me", {
        credentials: "include",
      });

      // 401 est normal si pas connecté
      if (meRes.status === 401) {
        router.push("/");
        return;
      }

      if (!meRes.ok) {
        router.push("/");
        return;
      }

      const meData = await meRes.json();

      const role = meData.user.role.toUpperCase();
      if (!meData.success || !['ADMIN', 'OWNER'].includes(role)) {
        router.push("/");
        return;
      }

      const statsRes = await fetch("/api/admin/stats", {
        credentials: "include",
      });
      const statsData = await statsRes.json();

      if (statsData.success) {
        setStats(statsData.stats);
      } else {
        setError(statsData.error || "Erreur lors du chargement");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

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
          className="max-w-6xl mx-auto"
        >
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour au profil
          </button>

          <h1 className="text-4xl font-bold text-white mb-2">
            Statistiques du serveur
          </h1>
          <p className="text-gray-400 mb-8">
            Vue d'ensemble des données de Central 6RP
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm mb-6">
              {error}
            </div>
          )}

          {stats && (
            <>
              {/* Stats principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-[#2a7cff]/20 to-[#2a7cff]/5 backdrop-blur-sm border border-[#2a7cff]/30 p-6 rounded-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Users size={32} className="text-[#2a7cff]" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stats.total_users}</div>
                  <div className="text-gray-300">Utilisateurs totaux</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-green-500/20 to-green-500/5 backdrop-blur-sm border border-green-500/30 p-6 rounded-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Activity size={32} className="text-green-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stats.active_users}</div>
                  <div className="text-gray-300">Utilisateurs actifs</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 backdrop-blur-sm border border-yellow-500/30 p-6 rounded-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Shield size={32} className="text-yellow-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stats.admins}</div>
                  <div className="text-gray-300">Administrateurs</div>
                </motion.div>
              </div>

              {/* Stats secondaires */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock size={24} className="text-[#2a7cff]" />
                    <div className="text-lg font-semibold text-white">Aujourd'hui</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Connexions</span>
                      <span className="text-white font-bold">{stats.logins_today}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Inscriptions</span>
                      <span className="text-white font-bold">{stats.registrations_today}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Activity size={24} className="text-[#2a7cff]" />
                    <div className="text-lg font-semibold text-white">Activité</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total logs</span>
                      <span className="text-white font-bold">{stats.total_logs}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Shield size={24} className="text-[#2a7cff]" />
                    <div className="text-lg font-semibold text-white">Système</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Statut</span>
                      <span className="text-green-400 font-bold">En ligne</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

