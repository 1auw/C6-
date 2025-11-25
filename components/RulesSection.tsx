'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Shield, Users, Ban, Car, MessageSquare, Shirt, Coins, UserPlus, Skull } from 'lucide-react';

interface RuleCategory {
  id: string;
  title: string;
  icon: any;
}

interface RuleSection {
  title: string;
  icon: any;
  rules: string[];
  alerts?: { type: 'warning' | 'danger' | 'info'; text: string }[];
}

const categories: RuleCategory[] = [
  { id: 'general', title: 'Général', icon: Shield },
  { id: 'event', title: 'Event', icon: Users },
  { id: 'staff', title: 'Staff', icon: MessageSquare },
  { id: 'legal', title: 'Légal', icon: Car },
  { id: 'illegal', title: 'Illégal', icon: Skull },
  { id: 'cheat', title: 'Cheat & Modding', icon: Ban },
];

const rulesContent: Record<string, RuleSection[]> = {
  general: [
    {
      title: 'Règles générales',
      icon: Shield,
      rules: [
        'Le respect est la base de notre communauté. Tout comportement toxique, insulte ou discrimination sera sanctionné immédiatement.',
        'Le métagaming est formellement interdit. Les informations obtenues en dehors du jeu ne doivent pas influencer vos actions en RP.',
        'Le RolePlay doit toujours être privilégié. Chaque action doit avoir une logique et une cohérence.',
        'Les noms de personnages doivent être réalistes et cohérents avec l\'univers RP.',
      ],
    },
    {
      title: 'Vêtements & Équipement',
      icon: Shirt,
      rules: [
        'Tous les vêtements et casques considérés comme des "tank" sont interdits.',
        'Si vous jouez en équipe, vous devez porter les mêmes vêtements.',
      ],
      alerts: [
        { type: 'warning', text: 'L\'usage abusif de vêtements tank entraînera des sanctions.' },
      ],
    },
  ],
  event: [
    {
      title: 'Événements',
      icon: Users,
      rules: [
        'Les événements sont organisés régulièrement par le staff.',
        'Tous les joueurs peuvent y participer sauf mention contraire.',
        'Les règles spécifiques de chaque événement seront annoncées avant le début.',
        'Le fair-play est de rigueur pendant les événements.',
      ],
    },
  ],
  staff: [
    {
      title: 'Comportement envers les staffs',
      icon: MessageSquare,
      rules: [
        'Le respect envers les membres du staff est obligatoire en toutes circonstances.',
        'Les décisions du staff sont définitives. En cas de désaccord, ouvrez un ticket Discord.',
        'Ne sollicitez pas les staffs en jeu pour des questions administratives, utilisez Discord.',
        'Les insultes ou menaces envers un membre du staff entraînent un bannissement immédiat.',
      ],
      alerts: [
        { type: 'danger', text: 'Tout manque de respect envers le staff sera sanctionné sévèrement.' },
      ],
    },
  ],
  legal: [
    {
      title: 'Activités légales',
      icon: Car,
      rules: [
        'Les métiers légaux doivent être exercés avec sérieux et cohérence RP.',
        'Le respect du code de la route est obligatoire pour les activités légales.',
        'Les interactions avec la police doivent être roleplayées correctement.',
        'Les commerces et entreprises doivent respecter les prix du marché.',
      ],
    },
  ],
  illegal: [
    {
      title: 'Activités illégales',
      icon: Skull,
      rules: [
        'Les activités illégales doivent être jouées avec prudence et réalisme.',
        'Les braquages nécessitent un RP de qualité et respectent un cooldown.',
        'Les fusillades doivent avoir une raison RP valable et être précédées d\'interactions.',
        'Un criminel ne s\'affiche pas en public et prend des précautions.',
      ],
      alerts: [
        { type: 'warning', text: 'Les actions illégales sans RP seront sanctionnées.' },
        { type: 'danger', text: 'Le RDM (Random Death Match) est strictement interdit.' },
      ],
    },
    {
      title: 'Loot',
      icon: Coins,
      rules: [
        'Vous pouvez looter les armes, munitions et argent sale d\'un joueur mort.',
        'Maximum 5.000$ d\'argent propre peuvent être volés.',
        'Il est interdit de looter les gilets, bandages et soins.',
      ],
    },
  ],
  cheat: [
    {
      title: 'Cheat & Modding',
      icon: Ban,
      rules: [
        'Tout usage de logiciel tiers, cheat ou mod menu est strictement interdit.',
        'Les mods graphiques qui donnent un avantage sont interdits.',
        'L\'exploitation de bugs est sanctionnable.',
        'Toute tentative de triche entraîne un bannissement permanent.',
      ],
      alerts: [
        { type: 'danger', text: 'Le bannissement pour triche est permanent et sans appel.' },
      ],
    },
  ],
};

export default function RulesSection() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleSearch = (e: any) => {
      setSearchQuery(e.detail.toLowerCase());
    };

    const handleCategoryChange = (e: any) => {
      const data = e.detail;
      
      // Si c'est un simple string (ancien format), on le traite
      if (typeof data === 'string') {
        setActiveCategory(data);
        setSearchQuery('');
      } else {
        // Nouveau format avec catégorie et section à ouvrir
        setActiveCategory(data.category);
        setSearchQuery('');
        
        // Ouvrir automatiquement la section spécifiée
        if (data.openSection !== undefined) {
          setTimeout(() => {
            const newOpenSections = new Set<number>();
            newOpenSections.add(data.openSection);
            setOpenSections(newOpenSections);
          }, 100); // Petit délai pour laisser le temps à la catégorie de changer
        }
      }
    };

    window.addEventListener('searchRules', handleSearch);
    window.addEventListener('changeCategory', handleCategoryChange);
    return () => {
      window.removeEventListener('searchRules', handleSearch);
      window.removeEventListener('changeCategory', handleCategoryChange);
    };
  }, []);

  // Filtrer le contenu en fonction de la recherche
  const getFilteredContent = () => {
    if (!searchQuery) {
      return rulesContent[activeCategory] || [];
    }

    // Rechercher dans toutes les catégories
    const allSections: RuleSection[] = [];
    Object.values(rulesContent).forEach(sections => {
      sections.forEach(section => {
        const matchTitle = section.title.toLowerCase().includes(searchQuery);
        const matchRules = section.rules.some(rule => 
          rule.toLowerCase().includes(searchQuery)
        );
        const matchAlerts = section.alerts?.some(alert => 
          alert.text.toLowerCase().includes(searchQuery)
        );

        if (matchTitle || matchRules || matchAlerts) {
          allSections.push(section);
        }
      });
    });

    return allSections;
  };

  const filteredContent = getFilteredContent();

  const toggleSection = (index: number) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(index)) {
      newOpenSections.delete(index);
    } else {
      newOpenSections.add(index);
    }
    setOpenSections(newOpenSections);
  };

  return (
    <section id="rules" className="relative bg-gradient-to-b from-dark-bg via-dark-lighter to-dark-bg">
      {/* Sélecteur ORIGINAL - Style navigation verticale */}
      <div className="relative w-full border-b border-white/10 bg-dark-card/95 backdrop-blur-md z-50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-center gap-2 overflow-x-auto">
            {categories.map((category, idx) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <div key={category.id} className="flex items-center relative z-50">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('CLIC DÉTECTÉ sur:', category.id);
                      setActiveCategory(category.id);
                      setOpenSections(new Set());
                    }}
                    className={`
                      px-6 py-3 flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer
                      ${isActive 
                        ? 'bg-primary text-white' 
                        : 'bg-transparent text-gray-500 hover:text-white hover:bg-white/5'
                      }
                    `}
                    style={{ position: 'relative', zIndex: 100 }}
                  >
                    <Icon size={18} />
                    {category.title}
                  </button>
                  {idx < categories.length - 1 && (
                    <div className="w-px h-6 bg-white/10 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background minimaliste et élégant */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Dégradé doux du haut vers le bas */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d15] via-dark-bg to-[#0d0d15]" />
        
        {/* Halos lumineux très subtils */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-primary-neon/5 rounded-full blur-[140px]" />
        
        {/* Grain/Noise subtil pour texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="w-full relative z-10 py-16 px-6 max-w-[1400px] mx-auto">

        {/* Accordéons simples */}
        <motion.div 
          key={`category-${activeCategory}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {filteredContent.length > 0 ? filteredContent.map((section, index) => {
            const Icon = section.icon;
            const isOpen = openSections.has(index);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-dark-lighter/80 backdrop-blur-sm border border-white/20 overflow-hidden"
              >
                {/* Header cliquable */}
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full p-5 flex items-center justify-between hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className="text-primary" />
                    <span className="text-lg font-bold text-white">{section.title}</span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Contenu */}
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10"
                  >
                    <div className="p-5 space-y-4 bg-dark-bg/40">
                      {section.rules.map((rule, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="text-primary font-bold">{i + 1}.</span>
                          <p className="text-gray-300 leading-relaxed flex-1">{rule}</p>
                        </div>
                      ))}

                      {section.alerts && section.alerts.length > 0 && (
                        <div className="pt-4 space-y-2">
                          {section.alerts.map((alert, i) => (
                            <div
                              key={i}
                              className={`
                                p-3 border-l-4 flex items-start gap-2
                                ${alert.type === 'danger' ? 'bg-red-500/10 border-red-500 text-red-300' : ''}
                                ${alert.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500 text-yellow-300' : ''}
                                ${alert.type === 'info' ? 'bg-blue-500/10 border-blue-500 text-blue-300' : ''}
                              `}
                            >
                              <span>⚠️</span>
                              <p className="text-sm">{alert.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          }) : (
            <div className="text-center py-12 bg-dark-lighter/80 border border-white/20 p-8">
              <p className="text-gray-400">Aucune règle trouvée</p>
            </div>
          )}
        </motion.div>

        {/* Note sanctions */}
        <div className="mt-8">
          <div className="bg-dark-lighter/80 backdrop-blur-sm border border-primary/40 p-5">
            <div className="flex items-start gap-3">
              <span className="text-primary text-xl">⚠️</span>
              <div>
                <p className="text-gray-300">
                  Le non-respect de ces règles peut entraîner des sanctions allant de l'avertissement au <span className="text-red-400 font-bold">bannissement permanent</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
