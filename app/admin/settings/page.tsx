"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Server, Link as LinkIcon, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";

interface Settings {
  server_name: string;
  server_ip: string;
  max_players: number;
  discord_link: string;
  discord_webhook: string;
  fivem_connect: string;
  maintenance_mode: boolean;
}

export default function AdminSettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [settings, setSettings] = useState<Settings>({
    server_name: "Central 6RP",
    server_ip: "127.0.0.1:30120",
    max_players: 32,
    discord_link: "https://discord.gg/central6rp",
    discord_webhook: "",
    fivem_connect: "fivem://connect/127.0.0.1:30120",
    maintenance_mode: false,
  });

  useEffect(() => {
    checkAdminAndFetchSettings();
  }, []);

  const checkAdminAndFetchSettings = async () => {
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

      if (!meData.success || (meData.user.role !== "ADMIN" && meData.user.role !== "admin")) {
        router.push("/");
        return;
      }

      // Récupérer les paramètres depuis le fichier config
      const settingsRes = await fetch("/api/admin/settings", {
        credentials: "include",
      });
      const settingsData = await settingsRes.json();

      if (settingsData.success && settingsData.settings) {
        setSettings(settingsData.settings);
      }

      setLoading(false);
    } catch (err) {
      setError("Erreur de chargement");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setMessage("");
    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Paramètres enregistrés avec succès !");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError(data.error || "Erreur lors de l'enregistrement");
      }
    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setSaving(false);
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
          className="max-w-4xl mx-auto"
        >
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Retour au profil
          </button>

          <h1 className="text-4xl font-bold text-white mb-2">
            ⚙️ Paramètres du serveur
          </h1>
          <p className="text-gray-400 mb-8">
            Configuration et paramètres de Central 6RP
          </p>

          {message && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-sm mb-6">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm mb-6">
              {error}
            </div>
          )}

          {/* Paramètres du serveur */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Server size={24} className="text-[#2a7cff]" />
              <h2 className="text-xl font-bold text-white">Paramètres du serveur FiveM</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nom du serveur
                </label>
                <input
                  type="text"
                  value={settings.server_name}
                  onChange={(e) => setSettings({ ...settings, server_name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff] transition-colors"
                  placeholder="Central 6RP"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    IP du serveur
                  </label>
                  <input
                    type="text"
                    value={settings.server_ip}
                    onChange={(e) => setSettings({ ...settings, server_ip: e.target.value })}
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff] transition-colors"
                    placeholder="127.0.0.1:30120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Joueurs max
                  </label>
                  <input
                    type="number"
                    value={settings.max_players}
                    onChange={(e) => setSettings({ ...settings, max_players: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff] transition-colors"
                    min="1"
                    max="1024"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lien de connexion FiveM
                </label>
                <input
                  type="text"
                  value={settings.fivem_connect}
                  onChange={(e) => setSettings({ ...settings, fivem_connect: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff] transition-colors"
                  placeholder="fivem://connect/127.0.0.1:30120"
                />
              </div>
            </div>
          </div>

          {/* Liens et intégrations */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm mb-6">
            <div className="flex items-center gap-3 mb-6">
              <LinkIcon size={24} className="text-[#2a7cff]" />
              <h2 className="text-xl font-bold text-white">Liens et intégrations</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lien Discord
                </label>
                <input
                  type="text"
                  value={settings.discord_link}
                  onChange={(e) => setSettings({ ...settings, discord_link: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff] transition-colors"
                  placeholder="https://discord.gg/central6rp"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Discord Webhook (pour les notifications)
                </label>
                <input
                  type="text"
                  value={settings.discord_webhook}
                  onChange={(e) => setSettings({ ...settings, discord_webhook: e.target.value })}
                  className="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#2a7cff] transition-colors"
                  placeholder="https://discord.com/api/webhooks/..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optionnel : Pour recevoir les notifications d'inscription, connexion, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Sécurité */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield size={24} className="text-[#2a7cff]" />
              <h2 className="text-xl font-bold text-white">Sécurité et maintenance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/[0.05] border border-white/10 rounded-sm">
                <div>
                  <div className="text-white font-medium mb-1">Mode maintenance</div>
                  <div className="text-sm text-gray-400">
                    Désactive temporairement l'accès au site pour les utilisateurs
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.maintenance_mode}
                    onChange={(e) => setSettings({ ...settings, maintenance_mode: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#2a7cff] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2a7cff]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Bouton Enregistrer */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#2a7cff] hover:bg-[#1e5fd4] text-white font-semibold py-4 px-6 rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {saving ? "Enregistrement..." : "Enregistrer les paramètres"}
          </button>

          {/* Informations système */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-6 rounded-sm">
            <h2 className="text-xl font-bold text-white mb-4">📋 Informations système</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Version du site</span>
                <span className="text-white font-medium">1.0.0</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Framework</span>
                <span className="text-white font-medium">Next.js 14</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-400">Backend</span>
                <span className="text-white font-medium">Prisma + PostgreSQL</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Statut</span>
                <span className="text-green-400 font-medium">✅ Opérationnel</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

