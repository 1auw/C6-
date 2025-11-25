"use client";

import { useState, useEffect } from "react";
import { Hash, Lock, Plus, ChevronRight, Terminal, Folder, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const channels = [
  { id: "annonces", name: "annonces", desc: "Annonces officielles du staff", locked: true },
  { id: "general", name: "discussions-generales", desc: "Parlez de tout et de rien" },
  { id: "suggestions", name: "suggestions", desc: "Proposez vos idees" },
  { id: "support", name: "support-aide", desc: "Besoin d'aide ?" },
  { id: "stories", name: "histoires-rp", desc: "Partagez vos moments RP" },
  { id: "recrutement", name: "recrutement-orgs", desc: "Les orgs recrutent" },
];

export default function ForumPage() {
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then(res => res.ok ? res.json() : null)
      .then(data => data?.success && setUser(data.user))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Terminal Header */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden">
            {/* Terminal Top Bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#30363d] bg-[#0d1117]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-[#8b949e] text-sm font-mono">central6rp@forum ~ </span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm">
              {/* Welcome */}
              <div className="text-[#8b949e] mb-6">
                <span className="text-[#7ee787]">$</span> cat welcome.txt
              </div>
              <div className="bg-[#0d1117] border border-[#30363d] rounded p-4 mb-8">
                <pre className="text-[#c9d1d9] whitespace-pre-wrap">
{`╔═══════════════════════════════════════════════════╗
║                                                   ║
║   ██████╗███████╗███╗   ██╗████████╗██████╗  █████╗ ║
║  ██╔════╝██╔════╝████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗║
║  ██║     █████╗  ██╔██╗ ██║   ██║   ██████╔╝███████║║
║  ██║     ██╔══╝  ██║╚██╗██║   ██║   ██╔══██╗██╔══██║║
║  ╚██████╗███████╗██║ ╚████║   ██║   ██║  ██║██║  ██║║
║   ╚═════╝╚══════╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝║
║                                                   ║
║           FORUM COMMUNAUTAIRE - v1.0.0            ║
║                                                   ║
╚═══════════════════════════════════════════════════╝`}
                </pre>
              </div>

              {/* Channels List */}
              <div className="text-[#8b949e] mb-4">
                <span className="text-[#7ee787]">$</span> ls -la /channels/
              </div>
              
              <div className="space-y-1 mb-8">
                <div className="text-[#8b949e] text-xs mb-2">total {channels.length}</div>
                {channels.map((channel, i) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelected(channel.id)}
                    className={`w-full flex items-center gap-4 px-3 py-2 rounded text-left transition-colors ${
                      selected === channel.id 
                        ? 'bg-[#1f6feb]/20 text-[#58a6ff]' 
                        : 'hover:bg-[#21262d] text-[#c9d1d9]'
                    }`}
                  >
                    <span className="text-[#8b949e] w-8">drwx</span>
                    <span className="text-[#8b949e] w-20">{user?.username || 'guest'}</span>
                    <span className="text-[#8b949e] w-12">{256 * (i + 1)}</span>
                    <Folder size={14} className={channel.locked ? 'text-[#f85149]' : 'text-[#7ee787]'} />
                    <span className="flex-1">#{channel.name}</span>
                    {channel.locked && <Lock size={12} className="text-[#f85149]" />}
                  </button>
                ))}
              </div>

              {/* Selected Channel */}
              {selected && (
                <>
                  <div className="text-[#8b949e] mb-4">
                    <span className="text-[#7ee787]">$</span> cd /channels/{channels.find(c => c.id === selected)?.name}
                  </div>
                  <div className="text-[#8b949e] mb-4">
                    <span className="text-[#7ee787]">$</span> cat README.md
                  </div>
                  <div className="bg-[#0d1117] border border-[#30363d] rounded p-4 mb-6">
                    <div className="text-[#c9d1d9]">
                      <span className="text-[#7ee787]"># </span>
                      {channels.find(c => c.id === selected)?.name}
                    </div>
                    <div className="text-[#8b949e] mt-2">
                      {channels.find(c => c.id === selected)?.desc}
                    </div>
                  </div>
                  
                  <div className="text-[#8b949e] mb-4">
                    <span className="text-[#7ee787]">$</span> ls -la ./posts/
                  </div>
                  <div className="bg-[#0d1117] border border-[#30363d] rounded p-6 text-center">
                    <FileText size={32} className="mx-auto text-[#30363d] mb-3" />
                    <div className="text-[#8b949e] text-sm">
                      total 0 - Aucun fichier dans ce repertoire
                    </div>
                    <div className="text-[#484f58] text-xs mt-2">
                      Soyez le premier a creer un sujet !
                    </div>
                  </div>
                </>
              )}

              {/* Create Post */}
              <div className="mt-8 pt-6 border-t border-[#30363d]">
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="text-[#7ee787]">$</span>
                    <span className="text-[#c9d1d9]">./create-post.sh</span>
                    <button className="ml-4 px-4 py-1.5 bg-[#238636] hover:bg-[#2ea043] text-white text-sm rounded transition-colors">
                      Nouveau sujet
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-[#f85149]">$</span>
                    <span className="text-[#f85149]">Permission denied: authentification requise</span>
                    <Link href="/login">
                      <button className="ml-4 px-4 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] text-sm rounded border border-[#30363d] transition-colors">
                        Se connecter
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Blinking Cursor */}
              <div className="mt-6 flex items-center gap-2">
                <span className="text-[#7ee787]">$</span>
                <span className="w-2 h-4 bg-[#c9d1d9] animate-pulse"></span>
              </div>
            </div>
          </div>

          {/* Rules */}
          <div className="mt-6 bg-[#161b22] border border-[#30363d] rounded-lg p-4 font-mono text-sm">
            <div className="text-[#8b949e] mb-2">
              <span className="text-[#7ee787]">$</span> cat /etc/rules.conf
            </div>
            <div className="text-[#8b949e] space-y-1">
              <div><span className="text-[#f0883e]"># </span>Respectez tous les membres</div>
              <div><span className="text-[#f0883e]"># </span>Pas de spam ni de pub</div>
              <div><span className="text-[#f0883e]"># </span>Restez dans le sujet</div>
              <div><span className="text-[#f0883e]"># </span>Pas de contenu NSFW</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
