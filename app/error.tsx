'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, RefreshCw, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log l'erreur dans la console en développement
    console.error('Erreur application:', error);
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-dark-bg to-primary-neon/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-neon/10 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-2xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Icône erreur */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="w-32 h-32 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500/50">
              <AlertTriangle size={64} className="text-red-500" />
            </div>
          </motion.div>

          {/* Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Une erreur est survenue
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl text-gray-400 max-w-md mx-auto"
          >
            Désolé, quelque chose s&apos;est mal passé. Veuillez réessayer.
          </motion.p>

          {/* Boutons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="flex items-center gap-3 bg-primary hover:bg-primary-light text-white px-8 py-4 font-bold text-lg transition-all"
              style={{ borderRadius: '4px' }}
            >
              <RefreshCw size={24} />
              Réessayer
            </motion.button>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 glass hover:bg-white/10 text-white px-8 py-4 font-bold text-lg transition-all border border-white/20"
                style={{ borderRadius: '4px' }}
              >
                <Home size={24} />
                Retour à l&apos;accueil
              </motion.button>
            </Link>
          </motion.div>

          {/* Digest pour debug */}
          {error.digest && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-sm text-gray-600"
            >
              Code erreur: {error.digest}
            </motion.p>
          )}
        </motion.div>
      </div>
    </main>
  );
}

