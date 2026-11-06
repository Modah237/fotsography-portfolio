"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, Music, Camera, MapPin, Award, CheckCircle2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left: Authentic Dual Portrait of Adriel Fotso */}
        <div className="lg:col-span-5 relative space-y-6">
          <div style={{ position: "relative" }} className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-black group">
            <Image
              src="/instagram-library/Dbd_7VztXQx_main.jpg"
              alt="Adriel Fotso — The Fotsographer avec son boîtier"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Floating Editorial Badge on Artwork */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="liquid-glass p-4 rounded-2xl flex items-center justify-between border border-white/10">
                <div>
                  <h4 className="text-white font-medium text-sm">Adriel Tchamaha Fotso</h4>
                  <p className="text-[11px] text-[#C5A059] font-mono">
                    The FOTSOGRAPHER • En action
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#C5A059]/20 flex items-center justify-center text-[#C5A059]">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Thumbnail: Yoca Media Interview Frame */}
          <div className="liquid-glass p-4 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-white/10">
              <Image
                src="/instagram-library/DY42gRKoNTj_main.jpg"
                alt="Entretien Yoca Média Adriel Fotso"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#C5A059] uppercase tracking-wider">
                <Award className="w-3 h-3" />
                <span>Entretien Référence • Yoca Média</span>
              </div>
              <p className="text-xs text-white/90 font-light">
                « Vivre de la photographie et du cinéma au Cameroun »
              </p>
            </div>
          </div>

          {/* Decorative Back Glow */}
          <div className="absolute -bottom-8 -left-8 w-60 h-60 bg-[#C5A059]/15 rounded-full blur-[90px] -z-10" />
        </div>

        {/* Right: Authentic Story & Philosophy */}
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#C5A059] uppercase liquid-pill px-4 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Biographie & Démarche</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#F7F5F0] tracking-tight leading-[1.1]">
            L&apos;histoire avant le matériel, <br />
            <span className="font-serif italic text-gold-gradient">
              la sensibilité au cœur de l&apos;image.
            </span>
          </h2>

          {/* Sourced Quote from Yoca Media interview */}
          <div className="liquid-glass p-6 rounded-2xl border-l-2 border-[#C5A059] space-y-3">
            <p className="text-base sm:text-lg text-white/95 font-serif italic leading-relaxed">
              « Poser une caméra ne suffit pas : derrière chaque plan, il doit y avoir une histoire, un tempo et une intention. La fin vaut toujours mieux que le commencement. »
            </p>
            <span className="text-xs font-mono text-[#C5A059] tracking-wider block">
              — Adriel Fotso, Entretien avec Yoca Média
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#9c978f] font-light leading-relaxed">
            <p>
              Fondateur de <strong className="text-white font-normal">Fotsography Studio</strong>, basé entre <strong className="text-white font-normal">Yaoundé et Douala</strong>, Adriel Tchamaha Fotso développe une écriture visuelle singulière qui refuse les artifices et la pose rigide.
            </p>
            <p>
              Également guitariste et pianiste, il infuse à chacune de ses réalisations un découpage rythmique organique. Que ce soit sur la réalisation intimiste de la session acoustique <strong className="text-white font-normal">« Albertine » de Cysoul</strong> (Moane Nnam Records), les vœux de personnalités telles qu&apos;<strong className="text-white font-normal">Indira & Tamsir on the Beat</strong>, ou des tournages internationaux à <strong className="text-white font-normal">Bangui</strong> et aux <strong className="text-white font-normal">Seychelles</strong>, son objectif reste le même : immortaliser la vérité du moment.
            </p>
          </div>

          {/* Key Hallmarks & Territories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="liquid-glass p-4 rounded-xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059]">
                <Music className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">Musicalité Visuelle</span>
              </div>
              <p className="text-xs text-white/80">
                Rythme de montage calé sur l&apos;émotion, les silences et les respirations musicales.
              </p>
            </div>

            <div className="liquid-glass p-4 rounded-xl border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059]">
                <MapPin className="w-3.5 h-3.5" />
                <span className="uppercase tracking-wider">Rayonnement</span>
              </div>
              <p className="text-xs text-white/80">
                Studios à Yaoundé & Douala. Déplacements en Afrique Centrale et à l&apos;international.
              </p>
            </div>
          </div>

          {/* Artist Handwritten Vector Signature */}
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A059]">
                Signature de l&apos;Auteur
              </span>
              <p className="text-xs text-white/70 font-serif italic">
                Adriel Tchamaha Fotso • The Fotsographer
              </p>
            </div>

            {/* Elegant Vector Cursive Signature */}
            <svg
              viewBox="0 0 240 60"
              className="w-40 sm:w-48 h-10 text-[#C5A059] opacity-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M 15 45 Q 35 10, 50 20 T 70 48 Q 82 15, 92 25 T 112 45 Q 130 8, 150 30 T 175 35 Q 195 40, 220 20" />
              <path d="M 10 32 Q 55 28, 105 30" strokeWidth="1.5" />
              <path d="M 165 48 Q 190 52, 225 38" strokeWidth="1" strokeDasharray="3 3" />
            </svg>
          </div>

          {/* Verified Collaborations Pills */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-mono text-[#9c978f] uppercase tracking-wider block">
              Collaborations & Réalisations Notables :
            </span>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-white/90">
              <span className="liquid-pill px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                <span>Cysoul (Moane Nnam Records)</span>
              </span>
              <span className="liquid-pill px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                <span>Indira & Tamsir on the Beat</span>
              </span>
              <span className="liquid-pill px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                <span>Prestige Capillaire (Bangui)</span>
              </span>
              <span className="liquid-pill px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-[#C5A059]" />
                <span>Yoca Média</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
