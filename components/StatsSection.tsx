'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function StatsSection() {
  const [stats, setStats] = useState({
    players_online: 0,
    total_users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats', { credentials: 'include' });
        const data = await response.json();
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      } catch (error) {}
      finally { setLoading(false); }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background simple */}
      <div className="absolute inset-0 bg-[#0c0c10]" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Layout horizontal minimaliste */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
          
          {/* Texte à gauche */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="text-primary text-sm font-mono tracking-widest uppercase">
              Serveur FiveM
            </span>
            <h2 className="text-4xl lg:text-5xl font-black text-white mt-3 leading-tight">
              Rejoins la<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
                communauté
              </span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg leading-relaxed">
              Un serveur RP + CVC français avec une équipe active 
              et des mises à jour régulières.
            </p>
          </motion.div>

          {/* Stats à droite - Style terminal/code */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="bg-[#111118] border border-[#1e1e2e] rounded-lg overflow-hidden font-mono text-sm">
              {/* Header du terminal */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#0a0a0f] border-b border-[#1e1e2e]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-gray-500 text-xs ml-2">server_stats.log</span>
              </div>
              
              {/* Contenu */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">status</span>
                  <span className="text-green-400 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    ONLINE
                  </span>
                </div>
                
                <div className="h-px bg-[#1e1e2e]" />
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">players_online</span>
                  <span className="text-white">{loading ? '...' : stats.players_online}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">max_slots</span>
                  <span className="text-white">128</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">registered_users</span>
                  <span className="text-primary">{loading ? '...' : stats.total_users}</span>
                </div>
                
                <div className="h-px bg-[#1e1e2e]" />
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">server_type</span>
                  <span className="text-cyan-400">RP + CVC</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">location</span>
                  <span className="text-white">Paris, FR</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">uptime</span>
                  <span className="text-green-400">99.9%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
