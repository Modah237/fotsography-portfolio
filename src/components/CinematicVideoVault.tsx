"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Sparkles, Film, X } from "lucide-react";

interface VideoWork {
  id: string;
  title: string;
  artist: string;
  role: string;
  year: string;
  duration: string;
  category: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
}

const CINEMATIC_WORKS: VideoWork[] = [
  {
    id: "cysoul-albertine",
    title: "Albertine — MN Session Acoustique",
    artist: "Cysoul",
    role: "Réalisation & Direction Artistique — Adriel Fotso",
    year: "2026",
    duration: "4:15",
    category: "Session Acoustique & Clip",
    description: "Session intimiste réalisée pour Moane Nnam Records. Éclairage feutré, cadrage soigné et alliance parfaite entre voix et guitare.",
    thumbnail: "/cysoul_albertine_thumbnail.webp",
    youtubeId: "w-A0l7MNKYo",
  },
  {
    id: "mariage-laurene-noel",
    title: "Célébration Coutumière Laurene & Noel",
    artist: "Laurene & Noel",
    role: "Captation Cinématographique & Réalisation",
    year: "2025",
    duration: "5:30",
    category: "Film de Mariage d'Exception",
    description: "Récit d'une union coutumière traditionnelle au Cameroun. Les danses, la ferveur des aînés et l'émotion des mariés immortalisées sur le vif.",
    thumbnail: "/mariage_laurene_noel.webp",
    youtubeId: "BnUJtbHutM8",
  },
  {
    id: "team-malewa",
    title: "Clip Officiel — Team Malewa",
    artist: "Team Malewa",
    role: "Direction Visuelle & Cadrage Urbain",
    year: "2025",
    duration: "3:45",
    category: "Clip Musical Urbain",
    description: "Énergie brute, chorégraphies explosives et lumière rythmée dans les rues camerounaises.",
    thumbnail: "/clip_malewa.webp",
    youtubeId: "FCWJ0LuSSkk",
  },
];

export default function CinematicVideoVault() {
  const [activeVideo, setActiveVideo] = useState<VideoWork | null>(null);

  return (
    <section id="motion" className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.35em] text-[#C5A059]">
            <Film className="w-3.5 h-3.5" />
            <span>Cinéma & Réalisation Vidéo</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-light text-[#F7F5F0] tracking-tight">
            Le Pavillon <span className="font-serif italic text-gold-gradient">Motion</span>
          </h2>
        </div>

        <p className="text-sm text-[#9c978f] max-w-md font-light leading-relaxed">
          Au-delà de la photo fixe, Adriel Fotso compose pour le mouvement. Clips d&apos;artistes, sessions acoustiques intimistes et films de mariage 4K.
        </p>
      </div>

      {/* Featured Video: Cysoul (Albertine) */}
      <div className="mb-12">
        <div
          onClick={() => setActiveVideo(CINEMATIC_WORKS[0])}
          style={{ position: "relative" }}
          className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 aspect-[16/9] sm:aspect-[21/9] bg-black shadow-2xl"
        >
          <Image
            src={CINEMATIC_WORKS[0].thumbnail}
            alt={CINEMATIC_WORKS[0].title}
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

          {/* Top Pill Badge */}
          <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
            <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono text-[#C5A059] uppercase tracking-widest border border-white/10">
              Œuvre Vedette • 4K UHD
            </span>
          </div>

          {/* Central Play Trigger Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-20 h-20 rounded-full bg-[#C5A059]/90 text-black flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 group-hover:bg-white transition-all duration-300">
              <Play className="w-8 h-8 fill-black" />
            </div>
          </div>

          {/* Bottom Info Pill */}
          <div className="absolute bottom-6 left-6 right-6 z-10">
            <div className="liquid-glass p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10">
              <div>
                <span className="text-xs font-mono text-[#C5A059] tracking-wider uppercase block">
                  {CINEMATIC_WORKS[0].artist} • {CINEMATIC_WORKS[0].category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-white">
                  {CINEMATIC_WORKS[0].title}
                </h3>
                <p className="text-xs text-[#9c978f] font-mono pt-1">
                  {CINEMATIC_WORKS[0].role}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#C5A059] liquid-pill px-4 py-2 rounded-full border border-white/10">
                  Visionner le film 4K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {CINEMATIC_WORKS.slice(1).map((work) => (
          <div
            key={work.id}
            onClick={() => setActiveVideo(work)}
            style={{ position: "relative" }}
            className="group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 aspect-[16/10] bg-black shadow-xl"
          >
            <Image
              src={work.thumbnail}
              alt={work.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

            {/* Play Trigger */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white flex items-center justify-center pl-0.5 group-hover:scale-110 group-hover:bg-[#C5A059] group-hover:text-black group-hover:border-transparent transition-all duration-300">
                <Play className="w-6 h-6 fill-current" />
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <div className="liquid-glass p-4 rounded-xl border border-white/10">
                <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block">
                  {work.category}
                </span>
                <h4 className="text-lg font-light text-white truncate">
                  {work.title}
                </h4>
                <p className="text-[11px] text-[#9c978f] font-mono truncate pt-0.5">
                  {work.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Video Screening Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-[#09090c] rounded-3xl border border-white/15 overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono text-[#C5A059] uppercase tracking-wider">
                  Projection Cinéma • {activeVideo.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-light text-white">
                  {activeVideo.title}
                </h3>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="w-10 h-10 rounded-full liquid-pill flex items-center justify-center text-white hover:text-[#C5A059] border border-white/10 transition-colors cursor-pointer"
                aria-label="Fermer la projection"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Embed */}
            <div className="relative aspect-[16/9] w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-6 bg-black/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#9c978f]">
              <p className="max-w-xl font-sans text-sm text-white/80 font-light">
                {activeVideo.description}
              </p>
              <div className="flex items-center gap-2 text-[#C5A059] shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeVideo.role}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
