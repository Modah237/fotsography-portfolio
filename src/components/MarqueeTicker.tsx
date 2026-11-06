"use client";

import React from "react";
import { Sparkles, Camera, Film, Music, Award, MapPin } from "lucide-react";

export default function MarqueeTicker() {
  const items = [
    { label: "RÉALISATION DE CLIPS VIDÉOS", icon: Film },
    { label: "CYSOUL — MOANE NNAM RECORDS", icon: Music },
    { label: "DIRECTION DE LA PHOTOGRAPHIE", icon: Camera },
    { label: "MARIAGES DE PRESTIGE & CÉRÉMONIES", icon: Sparkles },
    { label: "PORTRAIT D'ARTISTE — YOCA MÉDIA", icon: Award },
    { label: "DOUALA • YAOUNDÉ • KRIBI", icon: MapPin },
    { label: "L'HISTOIRE AVANT LE MATÉRIEL", icon: Sparkles },
  ];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/10 bg-[#060608]/90 backdrop-blur-xl">
      <div className="flex w-max animate-marquee space-x-12 select-none">
        {[...items, ...items, ...items].map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-3 text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-[#9c978f] hover:text-[#d4af37] transition-colors"
            >
              <Icon className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>{item.label}</span>
              <span className="text-white/20 text-xs">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
