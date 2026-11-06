"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sliders, CheckCircle2, ArrowRight } from "lucide-react";

interface ColorScienceSectionProps {
  onInquirePresets: () => void;
}

export default function ColorScienceSection({ onInquirePresets }: ColorScienceSectionProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="color-science" className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Text & Color Philosophy */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#C5A059] uppercase liquid-pill px-4 py-1.5 rounded-full border border-white/10">
            <Sliders className="w-3.5 h-3.5" />
            <span>Science de la Couleur & Étalonnage</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-light text-[#F7F5F0] tracking-tight leading-[1.1]">
            La chaleur des peaux, <br />
            <span className="font-serif italic text-gold-gradient">
              la noblesse de la lumière d&apos;Afrique.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#9c978f] font-light leading-relaxed">
            Loin des filtres génériques occidentaux qui dénaturent les carnations foncées, la colorimétrie signature développée par Adriel Fotso respecte la texture organique de la mélanine, la douceur des ombres et le velouté de l&apos;heure dorée équatoriale.
          </p>

          {/* Color Pillars */}
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl liquid-glass border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="uppercase tracking-wider">Roll-off des Hautes Lumières</span>
              </div>
              <p className="text-xs text-[#9c978f] font-light pl-5.5">
                Transition progressive inspirée des émulsions 35mm KODAK Vision3 500T.
              </p>
            </div>

            <div className="p-4 rounded-xl liquid-glass border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-white">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="uppercase tracking-wider">Fidélité Chromatique des Carnations</span>
              </div>
              <p className="text-xs text-[#9c978f] font-light pl-5.5">
                Étalonnage précis DaVinci Resolve protégeant les reflets ambrés et cuivrés sans virage magenta.
              </p>
            </div>
          </div>

          <button
            onClick={onInquirePresets}
            className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-white/5 hover:bg-[#C5A059]/15 border border-white/10 hover:border-[#C5A059]/40 text-xs font-mono uppercase tracking-[0.2em] text-white hover:text-[#C5A059] transition-all cursor-pointer"
          >
            <span>Demander les LUTs & Presets Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Interactive Split Slider (Before / After) */}
        <div className="lg:col-span-7">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#9c978f]">
              <span className="flex items-center gap-1.5 text-white/70">
                <span className="w-2 h-2 rounded-full bg-white/40" />
                Capture Brute (Log Neutre)
              </span>
              <span className="text-[#C5A059] uppercase tracking-wider flex items-center gap-1.5">
                Grade Cinéma Signature
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              </span>
            </div>

            {/* Comparison Container */}
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 shadow-2xl select-none cursor-ew-resize bg-black"
            >
              {/* After Image (Full Background - Graded Signature) */}
              <div style={{ position: "absolute" }} className="absolute inset-0">
                <Image
                  src="/instagram-library/DX16SSrje74_main.jpg"
                  alt="Étalonnage signature Adriel Fotso"
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              {/* Before Image (Clipped Overlay - Desaturated Log Simulation) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%`, position: "absolute" }}
              >
                <div style={{ position: "relative" }} className="relative w-full h-full min-w-[700px] sm:min-w-[900px]">
                  <Image
                    src="/instagram-library/DX16SSrje74_main.jpg"
                    alt="Image brute neutre"
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover filter grayscale contrast-75 brightness-110"
                  />
                  {/* Flat Log Profile Wash */}
                  <div className="absolute inset-0 bg-white/15 backdrop-brightness-110 pointer-events-none" />
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-[#C5A059] shadow-[0_0_15px_rgba(197,160,89,0.8)] cursor-ew-resize z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#070709] border-2 border-[#C5A059] shadow-2xl flex items-center justify-center text-[#C5A059] text-[10px] font-mono font-bold">
                  ↔
                </div>
              </div>

              {/* In-view Badges */}
              <div className="absolute bottom-4 left-4 z-10 liquid-pill px-3 py-1 rounded-full text-[10px] font-mono text-white/80 border border-white/10 pointer-events-none">
                AVANT • RAW LOG
              </div>

              <div className="absolute bottom-4 right-4 z-10 liquid-pill px-3 py-1 rounded-full text-[10px] font-mono text-[#C5A059] border border-white/10 pointer-events-none">
                APRÈS • FOTSO GRADE
              </div>
            </div>

            <p className="text-[11px] text-center text-[#9c978f] font-mono">
              Glissez le curseur horizontalement pour révéler la dynamique chromatique
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
