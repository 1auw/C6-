'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Twitter, Youtube, Twitch, Copy, Check, Heart, ExternalLink } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useState } from 'react';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyIP = () => {
    const ip = siteConfig.links.fivem.replace('fivem://connect/', '');
    navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { icon: MessageCircle, href: siteConfig.links.discord, label: 'Discord' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Twitch, href: '#', label: 'Twitch' },
  ];

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/reglement', label: 'Règlement' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="relative bg-dark-card border-t border-white/10">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
      
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/">
              <h3 className="text-3xl font-black mb-4">
                <span className="text-white">CENTRAL</span>
                <span className="text-primary">6</span>
                <span className="text-primary-neon">RP</span>
              </h3>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Le meilleur serveur FiveM RolePlay français. Une communauté active et bienveillante vous attend !
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-xl flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={18} className="text-gray-400 hover:text-primary transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Liens utiles</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  Discord
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a 
                  href={siteConfig.links.fivem}
                  className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                >
                  Rejoindre FiveM
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Rejoindre</h4>
            <p className="text-gray-400 mb-4 text-sm">
              Connectez-vous directement sur notre serveur FiveM !
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={copyIP}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                copied 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                  : 'bg-primary hover:bg-primary-light text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} />
                  IP Copiée !
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copier l'IP
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm flex items-center gap-1">
              © 2025 Central6RP. Fait avec <Heart size={14} className="text-red-500" /> en France
            </p>
            <p className="text-gray-600 text-xs">
              Non affilié à Rockstar Games ou Take-Two Interactive
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
