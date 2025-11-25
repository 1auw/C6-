'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Wifi, Users, ChevronDown } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

export default function Hero() {
  const ref = useRef(null);
  const [playersOnline, setPlayersOnline] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        const data = await res.json();
        if (data.success) {
          setPlayersOnline(data.stats.players_online || 0);
        }
      } catch (e) {}
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Video Background avec effet parallax */}
      <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='1920' height='1080' fill='%230a0a0f'/%3E%3C/svg%3E"
        >
          <source src={siteConfig.video.src} type="video/mp4" />
        </video>
        
        {/* Overlays multiples pour effet premium */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-dark-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary-neon/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Grille animée en arrière-plan */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(42, 124, 255, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(42, 124, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>
      </motion.div>

      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8 max-w-5xl"
        >
          {/* Badge avec joueurs en ligne */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary-neon/20 backdrop-blur-md px-6 py-3 border border-primary/30 rounded-full">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <Users size={18} className="text-primary-neon" />
              <span className="text-white font-semibold">{playersOnline} joueurs en ligne</span>
            </div>
          </motion.div>

          {/* Titre principal avec effet de gradient animé */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter">
              <span className="block bg-gradient-to-r from-white via-primary-light to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                CENTRAL
              </span>
              <span className="block text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-primary via-primary-neon to-primary bg-clip-text text-transparent">
                6RP
              </span>
            </h1>
          </motion.div>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto"
          >
            L'expérience <span className="text-primary font-semibold">RolePlay</span> ultime sur FiveM.
            <br />
            <span className="text-gray-400">Serveur français • Communauté active • Staff disponible 24/7</span>
          </motion.p>

          {/* Boutons avec effets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
          >
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(42, 124, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.links.fivem}
              className="group relative flex items-center gap-3 bg-gradient-to-r from-primary to-primary-light text-white px-10 py-5 font-bold text-lg transition-all overflow-hidden rounded-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              <Wifi size={24} className="relative z-10" />
              <span className="relative z-10">REJOINDRE LE SERVEUR</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, borderColor: "rgba(42, 124, 255, 0.8)" }}
              whileTap={{ scale: 0.95 }}
              href={siteConfig.links.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-white/5 backdrop-blur-sm hover:bg-white/10 text-white px-10 py-5 font-bold text-lg transition-all border border-white/20 rounded-lg"
            >
              <MessageCircle size={24} className="text-primary-neon" />
              DISCORD
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator amélioré */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          >
            <span className="text-gray-400 text-sm font-medium tracking-widest uppercase">Découvrir</span>
            <ChevronDown size={24} className="text-primary animate-bounce" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Style pour l'animation du gradient */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
