'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, AlertTriangle, Skull, Car, Users, Shield, Crosshair, Ban, MessageSquare } from 'lucide-react';

interface RuleCategory {
  id: string;
  title: string;
  icon: any;
  color: string;
  rules: {
    title: string;
    content: string;
    sanctions?: string;
  }[];
}

const rulesData: RuleCategory[] = [
  {
    id: 'general',
    title: 'Règles Générales',
    icon: Shield,
    color: '#3b82f6',
    rules: [
      {
        title: 'Respect & Comportement',
        content: 'Tout comportement toxique, insulte, discrimination (racisme, homophobie, sexisme) est strictement interdit. Le respect entre joueurs est obligatoire, que ce soit en jeu ou sur Discord.',
        sanctions: 'Warn → Kick → Ban temporaire → Ban définitif'
      },
      {
        title: 'Microphone obligatoire',
        content: 'Un microphone fonctionnel est requis pour jouer sur le serveur. Vous devez être capable de communiquer vocalement en français.',
        sanctions: 'Kick jusqu\'à résolution'
      },
      {
        title: 'Bug exploit',
        content: 'L\'exploitation de bugs, glitchs ou failles du serveur est interdite. Tout bug découvert doit être signalé au staff via ticket Discord.',
        sanctions: 'Ban définitif sans avertissement'
      },
      {
        title: 'Compte & Identité',
        content: 'Chaque joueur ne peut posséder qu\'un seul compte. Le partage de compte est interdit. Votre pseudonyme doit être réaliste (Prénom Nom).',
        sanctions: 'Ban définitif des comptes concernés'
      },
      {
        title: 'Publicité interdite',
        content: 'Toute forme de publicité pour d\'autres serveurs, Discord ou communautés est interdite.',
        sanctions: 'Ban définitif'
      }
    ]
  },
  {
    id: 'rp',
    title: 'Règles RolePlay',
    icon: Users,
    color: '#8b5cf6',
    rules: [
      {
        title: 'RDM (Random Death Match)',
        content: 'Tuer un joueur sans aucune raison RP valable est interdit. Vous devez avoir une interaction RP préalable avant toute action hostile (minimum 30 secondes d\'échange).',
        sanctions: '1er: Warn | 2ème: Ban 1 jour | 3ème: Ban 3 jours | 4ème: Ban déf'
      },
      {
        title: 'VDM (Vehicle Death Match)',
        content: 'Écraser volontairement un joueur avec un véhicule sans raison RP est interdit. Les véhicules ne sont pas des armes.',
        sanctions: '1er: Warn | 2ème: Ban 1 jour | 3ème: Ban 3 jours | 4ème: Ban déf'
      },
      {
        title: 'Métagaming',
        content: 'Utiliser des informations obtenues hors-jeu (Discord, stream, vocal externe) dans le RP est interdit. Ce que votre personnage ne sait pas, vous ne le savez pas.',
        sanctions: 'Warn → Ban temporaire → Ban définitif'
      },
      {
        title: 'Powergaming',
        content: 'Forcer des actions RP sur un joueur sans son consentement est interdit (ex: "/me le tue d\'un coup"). Les actions doivent être réalistes et laisser une chance à l\'autre joueur.',
        sanctions: 'Warn → Ban temporaire'
      },
      {
        title: 'Fear RP (Valeur de la vie)',
        content: 'Votre personnage doit valoriser sa vie. Sous la menace d\'une arme, vous devez coopérer. Pas de comportement héroïque irréaliste quand vous êtes en désavantage numérique ou sous la menace.',
        sanctions: 'Warn → Ban temporaire'
      },
      {
        title: 'New Life Rule (NLR)',
        content: 'Après votre mort, vous oubliez les 15 dernières minutes de votre vie. Vous ne pouvez pas revenir sur les lieux de votre mort pendant 15 minutes ni vous venger.',
        sanctions: 'Warn → Ban temporaire'
      },
      {
        title: 'Safe Zone',
        content: 'Les zones vertes (hôpital, commissariat, spawn) sont des safe zones. Aucune action hostile n\'y est autorisée. Vous ne pouvez pas fuir vers une safe zone lors d\'une action.',
        sanctions: 'Warn → Ban temporaire'
      }
    ]
  },
  {
    id: 'cvc',
    title: 'Règles CVC (Combat)',
    icon: Crosshair,
    color: '#ef4444',
    rules: [
      {
        title: 'Engagement CVC',
        content: 'Le CVC (Combat vs Combat) peut être engagé après annonce vocale claire ("C\'est le bail", "On engage", etc.) ou après une menace explicite avec arme visible. L\'annonce doit être audible par la cible.',
        sanctions: 'Warn si non-respect du protocole'
      },
      {
        title: 'Zone Rouge',
        content: 'Dans les zones rouges (quartiers chauds, zones de deal), le CVC peut être engagé plus rapidement. Une simple présence hostile suffit à justifier l\'engagement après avertissement.',
        sanctions: 'Application normale des sanctions RDM hors zone'
      },
      {
        title: 'Limite de participants',
        content: 'Maximum 6 joueurs par camp lors d\'une fusillade. Les renforts ne peuvent arriver qu\'après 5 minutes du début de l\'action. Pas de "zerg" autorisé.',
        sanctions: 'Warn → Ban temporaire pour le groupe'
      },
      {
        title: 'Cooldown entre actions',
        content: 'Après une action CVC majeure (fusillade, braquage), un cooldown de 30 minutes s\'applique avant de pouvoir relancer une action contre le même groupe.',
        sanctions: 'Warn → Annulation de l\'action'
      },
      {
        title: 'Armes lourdes',
        content: 'Les armes lourdes (AK, M4, etc.) ne peuvent être utilisées que lors d\'actions préparées (braquages, guerre de gang). Pas d\'arme lourde pour les embrouilles de rue.',
        sanctions: 'Confiscation + Warn'
      },
      {
        title: 'Drive-by',
        content: 'Les drive-by (tirer depuis un véhicule en mouvement) sont autorisés uniquement si le CVC est déjà engagé. Pas de drive-by pour initier un combat.',
        sanctions: 'Traité comme RDM/VDM'
      }
    ]
  },
  {
    id: 'vehicules',
    title: 'Règles Véhicules',
    icon: Car,
    color: '#f59e0b',
    rules: [
      {
        title: 'Conduite réaliste',
        content: 'La conduite doit rester cohérente. Pas de conduite GTA style (sauts, conduite sur les toits, etc.). Les accidents doivent être RP (appel dépanneuse, ambulance si blessé).',
        sanctions: 'Warn → Ban temporaire'
      },
      {
        title: 'Car Jack',
        content: 'Voler un véhicule occupé nécessite une interaction RP. Vous devez menacer le conducteur et lui laisser le temps de sortir. Pas de car jack en zone safe.',
        sanctions: 'Warn → Ban temporaire'
      },
      {
        title: 'PIT & Bélier',
        content: 'Les PIT (faire tourner un véhicule) et béliers sont réservés aux forces de l\'ordre en poursuite active et aux situations de braquage/enlèvement. Interdit pour les civils sans raison RP valable.',
        sanctions: 'Warn + réparation du véhicule adverse'
      },
      {
        title: 'Véhicules premium',
        content: 'Les véhicules de luxe et sportifs attirent l\'attention. Les utiliser pour des activités illégales augmente le risque d\'être repéré par la police.',
        sanctions: 'Conséquences RP'
      }
    ]
  },
  {
    id: 'illegal',
    title: 'Activités Illégales',
    icon: Skull,
    color: '#dc2626',
    rules: [
      {
        title: 'Braquages',
        content: 'Les braquages nécessitent minimum 2 joueurs. Négociations obligatoires avec la police avant toute action. Maximum 1 braquage de banque par jour par groupe. Pas de braquage dans les 30 min avant restart.',
        sanctions: 'Annulation du braquage + Warn'
      },
      {
        title: 'Prises d\'otage',
        content: 'Maximum 2 otages par action. L\'otage doit avoir du temps de RP (pas de kill immédiat). La demande de rançon doit être réaliste (max 50 000$). Pas d\'otage de moins de 15 minutes de connexion.',
        sanctions: 'Warn → Ban temporaire'
      },
      {
        title: 'Trafic de drogue',
        content: 'Le deal doit se faire de manière RP et discrète. Pas de vente en zone safe ou devant la police. Les points de deal chauds sont en zone rouge.',
        sanctions: 'Conséquences RP (prison)'
      },
      {
        title: 'Gangs & Organisations',
        content: 'Les gangs doivent être validés par le staff. Maximum 15 membres par gang. Les guerres de territoire doivent être déclarées et validées. Pas d\'alliance dépassant 20 personnes.',
        sanctions: 'Dissolution du gang si abus'
      },
      {
        title: 'Loot après kill',
        content: 'Vous pouvez récupérer : armes, munitions, drogue, argent sale. Maximum 5 000$ d\'argent propre. Interdit de prendre : téléphone, papiers, clés de propriété.',
        sanctions: 'Remboursement + Warn'
      },
      {
        title: 'Torture & Exécution',
        content: 'Les scènes de torture doivent avoir l\'accord OOC de la victime. Les exécutions nécessitent une raison RP majeure et l\'approbation du staff.',
        sanctions: 'Ban temporaire → Ban définitif'
      }
    ]
  },
  {
    id: 'staff',
    title: 'Règles Staff',
    icon: MessageSquare,
    color: '#06b6d4',
    rules: [
      {
        title: 'Respect du staff',
        content: 'Les décisions du staff sont finales. Tout irrespect, menace ou harcèlement envers un membre du staff est sanctionné immédiatement.',
        sanctions: 'Ban définitif'
      },
      {
        title: 'Tickets & Réclamations',
        content: 'Pour toute réclamation, ouvrez un ticket sur Discord avec preuves (clip vidéo obligatoire). Les tickets sans preuve seront fermés.',
        sanctions: '-'
      },
      {
        title: 'Intervention staff',
        content: 'Quand un staff intervient, le RP est en pause. Ne fuyez pas, ne continuez pas l\'action. Attendez la fin de l\'intervention.',
        sanctions: 'Warn → Ban temporaire'
      },
      {
        title: 'Faux reports',
        content: 'Les faux reports ou reports abusifs pour nuire à un joueur sont interdits.',
        sanctions: 'Warn → Ban temporaire du système de report'
      }
    ]
  },
  {
    id: 'cheat',
    title: 'Anti-Cheat',
    icon: Ban,
    color: '#7c3aed',
    rules: [
      {
        title: 'Logiciels interdits',
        content: 'Tout logiciel de triche, mod menu, aimbot, wallhack, speedhack ou exploit est strictement interdit. L\'anti-cheat détecte la majorité des cheats.',
        sanctions: 'Ban définitif sans appel'
      },
      {
        title: 'Macros & Scripts',
        content: 'Les macros de tir, bunny hop scripts ou tout automatisme donnant un avantage sont interdits.',
        sanctions: 'Ban définitif'
      },
      {
        title: 'Mods graphiques',
        content: 'Seuls les mods graphiques purement esthétiques sont autorisés (ENB, ReShade). Tout mod donnant un avantage visuel (supprimer les buissons, etc.) est interdit.',
        sanctions: 'Ban temporaire → Ban définitif'
      },
      {
        title: 'Money glitch',
        content: 'Toute exploitation de faille pour générer de l\'argent illégitimement est interdite et sera détectée.',
        sanctions: 'Wipe du personnage + Ban'
      }
    ]
  }
];

export default function RulesSection() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [openRules, setOpenRules] = useState<Set<string>>(new Set());

  const toggleRule = (ruleId: string) => {
    const newOpen = new Set(openRules);
    if (newOpen.has(ruleId)) {
      newOpen.delete(ruleId);
    } else {
      newOpen.add(ruleId);
    }
    setOpenRules(newOpen);
  };

  const currentCategory = rulesData.find(c => c.id === activeCategory);

  return (
    <section className="min-h-screen bg-[#09090b]">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#0c0c0f]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Règlement du Serveur</h1>
              <p className="text-gray-500 text-sm mt-1">Central 6RP • Serveur RP + CVC</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <AlertTriangle size={14} className="text-yellow-500" />
              Dernière mise à jour : Novembre 2025
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar - Catégories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-1">
              {rulesData.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      isActive
                        ? 'bg-white/5 text-white'
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon 
                      size={18} 
                      style={{ color: isActive ? category.color : undefined }}
                    />
                    <span className="text-sm font-medium">{category.title}</span>
                    {isActive && (
                      <div 
                        className="ml-auto w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            {currentCategory && (
              <motion.div
                key={currentCategory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Titre de la catégorie */}
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${currentCategory.color}20` }}
                  >
                    <currentCategory.icon 
                      size={24} 
                      style={{ color: currentCategory.color }}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{currentCategory.title}</h2>
                    <p className="text-gray-500 text-sm">{currentCategory.rules.length} règles</p>
                  </div>
                </div>

                {/* Liste des règles */}
                <div className="space-y-3">
                  {currentCategory.rules.map((rule, index) => {
                    const ruleId = `${currentCategory.id}-${index}`;
                    const isOpen = openRules.has(ruleId);
                    
                    return (
                      <div
                        key={ruleId}
                        className="border border-white/5 rounded-lg overflow-hidden bg-[#0c0c0f]"
                      >
                        <button
                          onClick={() => toggleRule(ruleId)}
                          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span 
                              className="text-xs font-mono px-2 py-1 rounded"
                              style={{ 
                                backgroundColor: `${currentCategory.color}15`,
                                color: currentCategory.color 
                              }}
                            >
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span className="font-medium text-white">{rule.title}</span>
                          </div>
                          <ChevronDown 
                            size={18} 
                            className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          />
                        </button>
                        
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/5"
                          >
                            <div className="px-5 py-4 space-y-4">
                              <p className="text-gray-400 leading-relaxed">
                                {rule.content}
                              </p>
                              {rule.sanctions && (
                                <div className="flex items-start gap-2 p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                  <AlertTriangle size={16} className="text-red-400 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">
                                      Sanctions
                                    </span>
                                    <p className="text-gray-400 text-sm mt-1">{rule.sanctions}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer d'avertissement */}
        <div className="mt-12 p-6 border border-yellow-500/20 bg-yellow-500/5 rounded-lg">
          <div className="flex items-start gap-4">
            <AlertTriangle size={24} className="text-yellow-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-500">Avertissement Important</h3>
              <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                Ce règlement peut être modifié à tout moment par l'équipe de modération. 
                L'ignorance du règlement n'est pas une excuse valable. En jouant sur Central 6RP, 
                vous acceptez de respecter l'ensemble de ces règles. Le staff se réserve le droit 
                de sanctionner tout comportement nuisible même s'il n'est pas explicitement mentionné ici.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
