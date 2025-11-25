'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-bg" />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Spinner animé */}
          <div className="flex justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
            />
          </div>

          {/* Texte */}
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-gray-400 text-lg font-medium"
          >
            Chargement...
          </motion.p>
        </motion.div>
      </div>
    </main>
  );
}

