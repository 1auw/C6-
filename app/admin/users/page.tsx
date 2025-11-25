"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Search, UserX, Shield, User as UserIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string | null;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    checkAdminAndFetchUsers();
  }, []);

  const checkAdminAndFetchUsers = async () => {
    try {
      // Vérifier si l'utilisateur est admin
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

      // Récupérer la liste des utilisateurs
      const usersRes = await fetch("/api/admin/users", {
        credentials: "include",
      });
      const usersData = await usersRes.json();

      if (usersData.success) {
        setUsers(usersData.users);
      } else {
        setError(usersData.error || "Erreur lors du chargement");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId: number, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin/users/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, is_active: !currentStatus }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        // Recharger la liste
        checkAdminAndFetchUsers();
      } else {
        alert(data.error || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      alert("Erreur de connexion au serveur");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          className="max-w-6xl mx-auto"
        >
          {/* Bouton retour */}
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour au profil
          </button>

          <h1 className="text-4xl font-bold text-white mb-2">
            Gestion des utilisateurs
          </h1>
          <p className="text-gray-400 mb-8">
            Gérez les comptes utilisateurs de Central 6RP
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm mb-6">
              {error}
            </div>
          )}

          {/* Barre de recherche */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-4 rounded-sm mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Rechercher un utilisateur..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/[0.05] border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff] transition-colors"
              />
            </div>
          </div>

          {/* Liste des utilisateurs */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/[0.05]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Utilisateur</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rôle</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Statut</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Inscription</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#2a7cff]/20 rounded-full flex items-center justify-center">
                            <UserIcon size={20} className="text-[#2a7cff]" />
                          </div>
                          <span className="text-white font-medium">{user.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{user.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-sm text-sm font-medium ${
                            user.role === "admin"
                              ? "bg-[#2a7cff]/20 border border-[#2a7cff]/50 text-[#2a7cff]"
                              : "bg-white/10 border border-white/20 text-gray-300"
                          }`}
                        >
                          {user.role === "admin" && <Shield size={14} />}
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 rounded-sm text-sm font-medium ${
                            user.is_active
                              ? "bg-green-500/20 border border-green-500/50 text-green-400"
                              : "bg-red-500/20 border border-red-500/50 text-red-400"
                          }`}
                        >
                          {user.is_active ? "Actif" : "Inactif"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(user.created_at).toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleUserStatus(user.id, user.is_active)}
                          className={`px-3 py-2 rounded-sm text-sm font-medium transition-colors ${
                            user.is_active
                              ? "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-600/50"
                              : "bg-green-600/20 hover:bg-green-600/30 text-green-400 border border-green-600/50"
                          }`}
                        >
                          {user.is_active ? "Désactiver" : "Activer"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                Aucun utilisateur trouvé
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm">
              <div className="text-gray-400 text-sm mb-1">Total utilisateurs</div>
              <div className="text-3xl font-bold text-white">{users.length}</div>
            </div>
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm">
              <div className="text-gray-400 text-sm mb-1">Utilisateurs actifs</div>
              <div className="text-3xl font-bold text-green-400">
                {users.filter((u) => u.is_active).length}
              </div>
            </div>
            <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm">
              <div className="text-gray-400 text-sm mb-1">Administrateurs</div>
              <div className="text-3xl font-bold text-[#2a7cff]">
                {users.filter((u) => u.role === "admin").length}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

