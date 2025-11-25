"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SECTIONS = [
  { 
    id: "annonces", 
    name: "Annonces Officielles", 
    desc: "Les dernieres nouvelles et mises a jour du serveur",
    topics: 12,
    messages: 89
  },
  { 
    id: "general", 
    name: "Discussions Generales", 
    desc: "Un espace libre pour echanger sur tous les sujets",
    topics: 45,
    messages: 234
  },
  { 
    id: "suggestions", 
    name: "Suggestions", 
    desc: "Partagez vos idees pour ameliorer le serveur",
    topics: 28,
    messages: 156
  },
  { 
    id: "support", 
    name: "Support & Aide", 
    desc: "Besoin d'assistance ? Notre communaute est la pour vous",
    topics: 67,
    messages: 312
  },
  { 
    id: "rp", 
    name: "Histoires & Recits RP", 
    desc: "Partagez vos plus beaux moments et aventures",
    topics: 34,
    messages: 178
  },
  { 
    id: "orga", 
    name: "Organisations", 
    desc: "Recrutement et actualites des factions",
    topics: 19,
    messages: 87
  },
];

export default function ForumPage() {
  const [user, setUser] = useState<any>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.success && setUser(d.user))
      .catch(() => {});
  }, []);

  const totalTopics = SECTIONS.reduce((a, s) => a + s.topics, 0);
  const totalMessages = SECTIONS.reduce((a, s) => a + s.messages, 0);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <div className="pt-32 pb-12 px-6 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Communaute
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Forum
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mb-10">
              Rejoignez notre communaute et participez aux discussions.
            </p>

            {/* Stats */}
            <div className="flex gap-10">
              <div>
                <p className="text-2xl font-bold text-white">{totalTopics}</p>
                <p className="text-gray-500 text-sm mt-1">Sujets</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{totalMessages}</p>
                <p className="text-gray-500 text-sm mt-1">Messages</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">247</p>
                <p className="text-gray-500 text-sm mt-1">Membres</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="px-6 py-12">
          <div className="max-w-4xl mx-auto space-y-3">
            {SECTIONS.map((section, i) => (
              <div key={section.id} className="group">
                <button
                  onClick={() => setExpanded(expanded === section.id ? null : section.id)}
                  className="w-full text-left p-5 glass rounded-xl hover:border-primary/20 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-primary/50 text-xs font-mono">0{i + 1}</span>
                        <h3 className="text-lg text-white font-semibold">
                          {section.name}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm pl-7">
                        {section.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                      <div>
                        <p className="text-white text-sm font-semibold">{section.topics}</p>
                        <p className="text-gray-600 text-xs">sujets</p>
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{section.messages}</p>
                        <p className="text-gray-600 text-xs">messages</p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-dark-lighter flex items-center justify-center text-gray-500 border border-white/10">
                        <span className={`text-lg transition-transform ${expanded === section.id ? 'rotate-45' : ''}`}>+</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                {expanded === section.id && (
                  <div className="mt-3 p-8 bg-dark-card/50 border border-white/5 rounded-xl">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-dark-lighter flex items-center justify-center mx-auto mb-6 border border-white/10">
                        <span className="text-gray-600 text-xl">0</span>
                      </div>
                      <p className="text-gray-500 mb-6">Aucun sujet pour le moment</p>
                      
                      {user ? (
                        <button className="px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg text-sm font-semibold transition-colors">
                          Creer le premier sujet
                        </button>
                      ) : (
                        <Link href="/login">
                          <button className="px-6 py-3 bg-dark-lighter hover:bg-dark-card text-gray-400 hover:text-white rounded-lg text-sm font-semibold transition-colors border border-white/10">
                            Connectez-vous pour participer
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guidelines */}
        <div className="px-6 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="glass rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">Regles de la communaute</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Respectez tous les membres sans exception",
                  "Pas de spam ni de contenu inapproprie",
                  "Restez dans le sujet de chaque section",
                  "Utilisez un langage correct et courtois"
                ].map((rule, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-dark-bg/50 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-gray-400 text-sm">{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
