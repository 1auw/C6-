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
    <div className="min-h-screen bg-[#09090b]">
      {/* Ambient */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative">
        {/* Hero */}
        <div className="pt-32 pb-16 px-6 border-b border-zinc-800/50">
          <div className="max-w-4xl mx-auto">
            <p className="text-indigo-400 text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Communaute
            </p>
            <h1 className="text-5xl md:text-6xl font-extralight text-white tracking-tight mb-6">
              Forum
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl leading-relaxed mb-10">
              Rejoignez notre communaute et participez aux discussions.
            </p>

            {/* Stats */}
            <div className="flex gap-12">
              <div>
                <p className="text-3xl font-light text-white">{totalTopics}</p>
                <p className="text-zinc-600 text-sm mt-1">Sujets</p>
              </div>
              <div>
                <p className="text-3xl font-light text-white">{totalMessages}</p>
                <p className="text-zinc-600 text-sm mt-1">Messages</p>
              </div>
              <div>
                <p className="text-3xl font-light text-white">247</p>
                <p className="text-zinc-600 text-sm mt-1">Membres</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="px-6 py-16">
          <div className="max-w-4xl mx-auto space-y-3">
            {SECTIONS.map((section, i) => (
              <div
                key={section.id}
                className="group"
              >
                <button
                  onClick={() => setExpanded(expanded === section.id ? null : section.id)}
                  className="w-full text-left p-6 bg-zinc-900/30 hover:bg-zinc-900/50 border border-zinc-800/50 rounded-2xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-zinc-700 text-xs font-mono">0{i + 1}</span>
                        <h3 className="text-lg text-white font-light tracking-wide">
                          {section.name}
                        </h3>
                      </div>
                      <p className="text-zinc-600 text-sm pl-10">
                        {section.desc}
                      </p>
                    </div>
                    <div className="flex items-center gap-8 text-right">
                      <div>
                        <p className="text-white text-sm">{section.topics}</p>
                        <p className="text-zinc-700 text-xs">sujets</p>
                      </div>
                      <div>
                        <p className="text-white text-sm">{section.messages}</p>
                        <p className="text-zinc-700 text-xs">messages</p>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600">
                        <span className={`transition-transform duration-300 ${expanded === section.id ? 'rotate-45' : ''}`}>+</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded content */}
                {expanded === section.id && (
                  <div className="mt-3 p-8 bg-zinc-900/20 border border-zinc-800/30 rounded-2xl">
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-6">
                        <span className="text-zinc-600 text-2xl">∅</span>
                      </div>
                      <p className="text-zinc-600 mb-6">Aucun sujet pour le moment</p>
                      
                      {user ? (
                        <button className="px-8 py-3 bg-white text-zinc-900 rounded-full text-sm font-medium hover:bg-zinc-100 transition-colors">
                          Creer le premier sujet
                        </button>
                      ) : (
                        <Link href="/login">
                          <button className="px-8 py-3 bg-zinc-800 text-zinc-400 rounded-full text-sm font-medium hover:bg-zinc-700 hover:text-white transition-colors">
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
        <div className="px-6 pb-32">
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-zinc-900/20 border border-zinc-800/30 rounded-2xl">
              <h3 className="text-white font-light text-lg mb-6">Regles de la communaute</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Respectez tous les membres sans exception",
                  "Pas de spam ni de contenu inapproprie",
                  "Restez dans le sujet de chaque section",
                  "Utilisez un langage correct et courtois"
                ].map((rule, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-6 h-6 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-600 text-xs">
                      {i + 1}
                    </span>
                    <span className="text-zinc-500 text-sm">{rule}</span>
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
