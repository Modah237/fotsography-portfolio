"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Compass, Eye } from "lucide-react";

interface HeroProps {
  onOpenBooking: () => void;
}

const HERO_SLIDES = [
  {
    src: "/instagram-library/DX16SSrje74_main.jpg",
    title: "Bandja — Les Racines & La Grâce",
    location: "Bandja, Cameroun",
    year: "2026",
    focus: "Haute Couture Africaine par @djec_fashionn",
    id: "bandja-heritage-racines",
  },
  {
    src: "/instagram-library/DepZh8-jUo0_child_6.jpg",
    title: "Indira & Tamsir on the Beat",
    location: "Yaoundé, Cameroun",
    year: "2025",
    focus: "Célébration d'Exception & Amour Vrai",
    id: "mariage-indira-tamsir",
  },
  {
    src: "/instagram-library/DYB3rI0DTma_child_2.jpg",
    title: "Shoes & More — L'Épure & La Matière",
    location: "Douala, Cameroun",
    year: "2026",
    focus: "Campagne de Mode & Souliers de Prestige",
    id: "shoes-n-more-editorial",
  },
  {
    src: "/instagram-library/DctRZO8DXsf_child_1.jpg",
    title: "L'Échappée des Seychelles",
    location: "Archipel des Seychelles",
    year: "2025",
    focus: "Lumière Naturelle & Océan Indien",
    id: "seychelles-editorial",
  },
];

export default function Hero({ onOpenBooking }: HeroProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  // Auto transition every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[slideIndex];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-16 overflow-hidden">
      {/* Background Visual Loop with Smooth Fade */}
      <div className="absolute inset-0 z-0 bg-[#070709]">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.src}
            style={{ position: "absolute" }}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              slideIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              priority={idx === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Cinematic Obsidian Atmosphere Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/55 to-[#070709]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#070709_90%)]" />
      </div>

      {/* Top Architectural Meta Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="liquid-pill px-4 py-2 rounded-full flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A059] w-max border border-white/10">
          <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
          <span>FOTSOGRAPHY STUDIO • DIRECTION VISUELLE</span>
        </div>

        {/* Slide Counter & Switcher */}
        <div className="flex items-center gap-3 liquid-pill px-4 py-2 rounded-full w-max border border-white/10 font-mono">
          <span className="text-[11px] text-white/90">
            [ 0{slideIndex + 1} / 0{HERO_SLIDES.length} ]
          </span>
          <span className="text-white/30">•</span>
          <span className="text-[11px] text-[#C5A059] truncate max-w-[200px] sm:max-w-xs">
            {activeSlide.title}
          </span>
          <div className="flex items-center gap-1.5 pl-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  slideIndex === i ? "bg-[#C5A059] w-6" : "bg-white/20 hover:bg-white/50 w-2"
                }`}
                aria-label={`Aller au tirage ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Centerpiece Headline */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-10 md:py-16">
        <div className="max-w-5xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.35em] text-[#C5A059]">
            <Compass className="w-3.5 h-3.5" />
            <span>Adriel Tchamaha Fotso • The Fotsographer</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-light text-[#F7F5F0] tracking-tight leading-[0.92] select-none">
            L&apos;émotion brute, <br />
            <span className="font-serif italic font-normal text-gold-gradient">
              la lumière intemporelle.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-[#9c978f] max-w-2xl font-light leading-relaxed pt-2">
            Direction photographique et réalisation cinématographique au Cameroun. Quand la sensibilité d&apos;un musicien sculpte chaque ombre, chaque regard et chaque cadence.
          </p>

          {/* Minimalist Expandable Note Trigger (Inspired by Matt Cherubino) */}
          <div className="pt-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-[#C5A059] hover:text-white transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full border border-[#C5A059]/40 flex items-center justify-center text-[10px]">
                {showNotes ? "−" : "+"}
              </span>
              <span>
                {showNotes ? "Masquer la démarche & l'équipement" : "Démarche d'auteur & Équipement de tournage"}
              </span>
            </button>

            {/* Collapsible Drawer */}
            {showNotes && (
              <div className="mt-4 p-6 rounded-2xl liquid-glass border border-white/10 max-w-2xl animate-in fade-in slide-in-from-top-2 duration-300 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059] block">
                    Approche Cinématographique
                  </span>
                  <p className="text-xs text-white/90 leading-relaxed font-light">
                    « Poser un appareil photo ne suffit pas : le cadrage doit respirer avec les sujets. Musicien de formation, j&apos;aborde chaque séance et chaque tournage comme une partition, où la lumière naturelle guide la mélodie. »
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10 text-[11px] font-mono text-[#9c978f]">
                  <div>
                    <span className="text-white block font-medium">Optiques & Capteurs :</span>
                    <span>Plein format 4K/6K • Primes f/1.2 & f/1.4</span>
                  </div>
                  <div>
                    <span className="text-white block font-medium">Colorimétrie & Son :</span>
                    <span>Étalonnage DaVinci 35mm • Prise de son 32-bit float</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Architectural Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-8 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-xs font-mono text-[#9c978f]">
          <div className="space-y-0.5">
            <span className="text-[#C5A059] block uppercase tracking-wider text-[10px]">Tirage en cours</span>
            <span className="text-white font-sans text-sm">{activeSlide.title}</span>
          </div>
          <div className="hidden sm:block w-px h-8 bg-white/10" />
          <div className="space-y-0.5">
            <span className="text-[#C5A059] block uppercase tracking-wider text-[10px]">Territoire</span>
            <span className="text-white font-sans text-sm">{activeSlide.location} • {activeSlide.year}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onOpenBooking}
            className="px-7 py-3.5 rounded-full bg-[#C5A059] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-white transition-all cursor-pointer flex items-center gap-2 shadow-xl hover:shadow-[#C5A059]/20"
          >
            <span>Réserver un tournage</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href="#works"
            className="flex items-center gap-3 px-6 py-3.5 rounded-full liquid-pill text-xs uppercase tracking-[0.2em] text-[#F7F5F0] hover:text-[#C5A059] hover:border-[#C5A059]/50 transition-all group border border-white/10"
          >
            <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Explorer la collection</span>
            <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Verified Collaborations & Cultural Recognition Strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-[#9c978f]/60">
        <span>Collaborations & Réalisations Vérifiées :</span>
        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 text-white/60">
          <span className="hover:text-[#C5A059] transition-colors">Cysoul • Moane Nnam</span>
          <span>•</span>
          <span className="hover:text-[#C5A059] transition-colors">Indira & Tamsir</span>
          <span>•</span>
          <span className="hover:text-[#C5A059] transition-colors">Yoca Média</span>
          <span>•</span>
          <span className="hover:text-[#C5A059] transition-colors">Djec Fashionn</span>
          <span>•</span>
          <span className="hover:text-[#C5A059] transition-colors">Prestige Capillaire (Bangui)</span>
        </div>
      </div>
    </section>
  );
}
