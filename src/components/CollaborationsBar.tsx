"use client";

import React from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

const COLLABORATORS = [
  {
    name: "Moane Nnam Records",
    role: "Production Musicale & Label",
    project: "Session Acoustique 4K",
    location: "Yaoundé",
  },
  {
    name: "Cysoul",
    role: "Artiste Afro-Soul & Auteur",
    project: "Clip Officiel « Albertine »",
    location: "Cameroun",
  },
  {
    name: "Djec Fashionn",
    role: "Maison de Haute Couture",
    project: "Série Bandja Patrimoine",
    location: "Ouest Cameroun",
  },
  {
    name: "Indira & Tamsir",
    role: "Personnalités & Créateurs",
    project: "Célébration d'Exception",
    location: "Yaoundé",
  },
  {
    name: "Yoca Média",
    role: "Plateforme Culturelle & Vidéo",
    project: "Grand Entretien Cinéma & Photo",
    location: "Douala",
  },
  {
    name: "Shoes & More",
    role: "Maison de Maroquinerie de Luxe",
    project: "Campagne Produits Éditoriale",
    location: "Douala",
  },
  {
    name: "Team Malewa",
    role: "Collectif Urbain",
    project: "Réalisation & Cadrage Clip",
    location: "Douala",
  },
];

export default function CollaborationsBar() {
  return (
    <section className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 -mt-8 mb-16">
      <div className="liquid-glass rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059]">
            <Sparkles className="w-4 h-4 text-[#C5A059]" />
            <span>Références & Collaborations Officielles</span>
          </div>

          <p className="text-xs text-[#9c978f] font-mono tracking-wider">
            Artistes certifiés • Maisons de création • Productions d&apos;Afrique centrale
          </p>
        </div>

        {/* Responsive Grid of Verified Collaborators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
          {COLLABORATORS.map((collab) => (
            <div
              key={collab.name}
              className="group p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#C5A059]/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-sans font-medium text-white text-sm tracking-tight group-hover:text-[#C5A059] transition-colors truncate">
                  {collab.name}
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              </div>
              <p className="text-[11px] text-[#9c978f] truncate font-light">
                {collab.role}
              </p>
              <p className="text-[10px] text-[#C5A059]/80 font-mono tracking-wider mt-1 truncate">
                {collab.project}
              </p>
            </div>
          ))}

          {/* Stat Box */}
          <div className="p-4 rounded-xl bg-[#C5A059]/10 border border-[#C5A059]/20 flex flex-col justify-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
              Direction 2026
            </span>
            <span className="text-lg font-light text-white font-serif italic mt-0.5">
              100% Vérifié
            </span>
            <span className="text-[10px] text-white/60 font-mono">
              Zéro photo de stock
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
