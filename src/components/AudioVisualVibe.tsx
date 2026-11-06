"use client";

import React, { useState } from "react";
import { Music } from "lucide-react";

export default function AudioVisualVibe() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden md:block">
      <div className="liquid-pill px-4 py-2.5 rounded-full flex items-center gap-3 border border-white/10 shadow-2xl hover:border-[#d4af37]/40 transition-all group">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-all cursor-pointer"
          title={isPlaying ? "Mettre en pause l'animation" : "Activer l'animation"}
        >
          <Music className="w-3.5 h-3.5" />
        </button>

        <div className="flex flex-col pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono tracking-widest uppercase text-white font-medium">
              Sensibilité Musicale
            </span>
            <span className="text-[9px] text-[#d4af37] font-mono">Guitare • Piano</span>
          </div>
          <span className="text-[10px] text-[#9c978f] font-light">
            Chaque plan pensé comme une mélodie
          </span>
        </div>

        {/* Dynamic Equalizer Visualizer Bars */}
        <div className="flex items-end gap-[3px] h-4 pl-1">
          <span
            className={`w-[2.5px] bg-[#d4af37] rounded-full transition-all duration-300 ${
              isPlaying ? "h-4 animate-pulse" : "h-1"
            }`}
          />
          <span
            className={`w-[2.5px] bg-[#d4af37] rounded-full transition-all duration-500 delay-75 ${
              isPlaying ? "h-2.5 animate-pulse" : "h-1"
            }`}
          />
          <span
            className={`w-[2.5px] bg-[#d4af37] rounded-full transition-all duration-400 delay-150 ${
              isPlaying ? "h-3.5 animate-pulse" : "h-1"
            }`}
          />
          <span
            className={`w-[2.5px] bg-[#d4af37] rounded-full transition-all duration-300 delay-200 ${
              isPlaying ? "h-2 animate-pulse" : "h-1"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
