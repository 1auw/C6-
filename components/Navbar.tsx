'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, User, LogOut, Menu, X, Shield, Crown, ShoppingCart, MessagesSquare, Vote } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userRole, setUserRole] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && data.user) {
          setIsLoggedIn(true);
          setUsername(data.user.username);
          setUserRole(data.user.role);
        }
      } catch (error) {}
    };
    checkAuth();
  }, [pathname]);

  const getRoleBadge = (role: string) => {
    switch (role.toUpperCase()) {
      case 'OWNER':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-full text-xs font-bold text-yellow-400">
            <Crown size={12} />
            OWNER
          </span>
        );
      case 'ADMIN':
        return (
          <span className="flex items-center gap-1 px-2 py-0.5 bg-red-500/20 border border-red-500/50 rounded-full text-xs font-bold text-red-400">
            <Shield size={12} />
            ADMIN
          </span>
        );
      case 'MODERATOR':
        return (
          <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/50 rounded-full text-xs font-bold text-purple-400">
            MOD
          </span>
        );
      default:
        return null;
    }
  };

  const navLinks = [
    { href: '/', label: 'Accueil' },
    { href: '/boutique', label: 'Boutique', icon: ShoppingCart, highlight: true },
    { href: '/forum', label: 'Forum', icon: MessagesSquare },
    { href: '/vote', label: 'Vote', icon: Vote },
    { href: '/reglement', label: 'Reglement' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-white/10 py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <img 
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                style={{ height: `${siteConfig.logo.height}px` }}
                className="w-auto"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="text-2xl font-black">
                <span className="text-white">CENTRAL</span>
                <span className="text-primary">6</span>
                <span className="text-primary-neon">RP</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {/* Nav Links */}
            <div className="flex items-center gap-5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.span
                      whileHover={{ y: -2 }}
                      className={`relative font-medium transition-colors flex items-center gap-1.5 ${
                        link.highlight
                          ? pathname === link.href
                            ? 'text-[#ff6b35]'
                            : 'text-[#ff6b35]/80 hover:text-[#ff6b35]'
                          : pathname === link.href
                          ? 'text-primary'
                          : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      {Icon && <Icon size={16} />}
                      {link.label}
                      {pathname === link.href && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                            link.highlight ? 'bg-[#ff6b35]' : 'bg-primary'
                          }`}
                        />
                      )}
                    </motion.span>
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <Link href="/profile">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 bg-white/5 hover:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-neon rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold text-sm">{username}</span>
                      {getRoleBadge(userRole)}
                    </div>
                  </motion.div>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-gray-300 hover:text-white font-medium transition-colors"
                    >
                      Connexion
                    </motion.button>
                  </Link>
                  <Link href="/register">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(42, 124, 255, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-white px-5 py-2.5 font-semibold rounded-lg transition-all"
                    >
                      S'inscrire
                    </motion.button>
                  </Link>
                </>
              )}

              {/* Discord Button */}
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(88, 101, 242, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                href={siteConfig.links.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white px-5 py-2.5 font-semibold rounded-lg transition-all"
              >
                <MessageCircle size={18} />
                Discord
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-dark-bg/95 backdrop-blur-xl pt-24 px-6">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className={`text-2xl font-bold flex items-center gap-3 ${
                        link.highlight
                          ? pathname === link.href ? 'text-[#ff6b35]' : 'text-[#ff6b35]/80'
                          : pathname === link.href ? 'text-primary' : 'text-white'
                      }`}>
                        {Icon && <Icon size={24} />}
                        {link.label}
                      </span>
                    </Link>
                  );
                })}
                
                <div className="border-t border-white/10 pt-6 mt-4">
                  {isLoggedIn ? (
                    <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-neon rounded-full flex items-center justify-center">
                          <User size={24} className="text-white" />
                        </div>
                        <div>
                          <span className="text-white font-bold text-lg">{username}</span>
                          <div className="mt-1">{getRoleBadge(userRole)}</div>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <button className="w-full py-3 text-white font-semibold border border-white/20 rounded-lg">
                          Connexion
                        </button>
                      </Link>
                      <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                        <button className="w-full py-3 bg-primary text-white font-semibold rounded-lg">
                          S'inscrire
                        </button>
                      </Link>
                    </div>
                  )}
                </div>

                <motion.a
                  href={siteConfig.links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#5865F2] text-white py-4 font-semibold rounded-lg mt-4"
                >
                  <MessageCircle size={20} />
                  Rejoindre Discord
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
