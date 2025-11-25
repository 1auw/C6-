'use client';

import { motion } from 'framer-motion';
import { Users, Shield, Zap, ShoppingBag, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StatsSection() {
  const [stats, setStats] = useState({
    players_online: 0,
    total_users: 0,
    server_status: 'En ligne',
    shop_items: 5,
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
      } catch (error) {
        console.error('Erreur stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const statsDisplay = [
    {
      icon: Users,
      value: loading ? '...' : stats.players_online,
      label: 'JOUEURS EN LIGNE',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/30',
    },
    {
      icon: Shield,
      value: loading ? '...' : `${stats.total_users}+`,
      label: 'MEMBRES INSCRITS',
      color: 'from-primary to-primary-light',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
    },
    {
      icon: Zap,
      value: '24/7',
      label: 'SERVEUR DISPONIBLE',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
    },
    {
      icon: TrendingUp,
      value: '99.9%',
      label: 'UPTIME',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/30',
    },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card/50 to-dark-bg" />
      
      <div className="container mx-auto relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Statistiques en <span className="text-primary">temps réel</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Rejoignez une communauté active et grandissante
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {statsDisplay.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative ${stat.bgColor} backdrop-blur-sm border ${stat.borderColor} rounded-2xl p-6 text-center group overflow-hidden`}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                  <Icon size={28} className="text-white" />
                </div>
                
                {/* Value */}
                <div className="text-4xl md:text-5xl font-black text-white mb-2">
                  {stat.value}
                </div>
                
                {/* Label */}
                <p className="text-gray-400 text-xs md:text-sm font-semibold tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
