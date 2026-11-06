"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Eye, Home, Check, ShieldCheck, ArrowUpRight } from "lucide-react";

interface FineArtPrintsProps {
  onOrderPrint: (printTitle: string) => void;
}

interface FineArtItem {
  id: string;
  title: string;
  series: string;
  location: string;
  year: string;
  edition: string;
  image: string;
  description: string;
  paperType: string;
  availableSizes: { label: string; dimensions: string }[];
}

const PRINTS: FineArtItem[] = [
  {
    id: "print-bandja",
    title: "La Souveraine de Bandja — N°03",
    series: "Série Haute Couture Bamiléké",
    location: "Hauts Plateaux de l'Ouest, Cameroun",
    year: "2026",
    edition: "Édition limitée à 15 exemplaires numérotés",
    image: "/instagram-library/DX16SSrje74_main.jpg",
    description:
      "Tirage d'art capturant la solennité des étoffes perlées traditionnelles africaines mariées à l'épure d'un design contemporain. Une présence visuelle magnétique pour les intérieurs d'architecte.",
    paperType: "Hahnemühle Photo Rag® 308g (100% Coton)",
    availableSizes: [
      { label: "Moyen", dimensions: "50 × 75 cm" },
      { label: "Grand", dimensions: "70 × 105 cm" },
      { label: "Monumental", dimensions: "100 × 150 cm" },
    ],
  },
  {
    id: "print-seychelles",
    title: "Le Silence de l'Océan Indien",
    series: "Série Échappée Insulaire",
    location: "Archipel des Seychelles",
    year: "2025",
    edition: "Édition limitée à 15 exemplaires numérotés",
    image: "/instagram-library/DctRZO8DXsf_child_1.jpg",
    description:
      "L'aube sur les blocs de granit séculaires. Teintes émeraudes et brume d'embruns traitées avec une douceur argentique sans artifice.",
    paperType: "Canson® Infinity Platine Fibre Rag 310g",
    availableSizes: [
      { label: "Moyen", dimensions: "50 × 70 cm" },
      { label: "Grand", dimensions: "80 × 120 cm" },
    ],
  },
  {
    id: "print-fotsographer",
    title: "The Fotsographer — Autoportrait au Boîtier",
    series: "Série Monochrome & Ombre Portée",
    location: "Studio Adriel Fotso, Yaoundé",
    year: "2025",
    edition: "Édition d'Auteur — 10 exemplaires réservés",
    image: "/instagram-library/Dbd_7VztXQx_main.jpg",
    description:
      "L'œil du photographe au repos. Un clair-obscur sculptural rendant hommage à la lumière naturelle et au geste artisanal de la prise de vue.",
    paperType: "Hahnemühle FineArt Baryta 325g",
    availableSizes: [
      { label: "Moyen", dimensions: "40 × 50 cm" },
      { label: "Grand", dimensions: "60 × 80 cm" },
    ],
  },
];

export default function FineArtPrints({ onOrderPrint }: FineArtPrintsProps) {
  const [selectedPrint, setSelectedPrint] = useState<FineArtItem>(PRINTS[0]);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [inSituMode, setInSituMode] = useState<boolean>(false);

  return (
    <section id="prints" className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.35em] text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Galerie des Collectionneurs</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-[#F7F5F0] tracking-tight">
            Tirages d&apos;Art & <span className="font-serif italic text-gold-gradient">Éditions Limitées</span>
          </h2>
        </div>

        <div className="space-y-3 max-w-md">
          <p className="text-sm text-[#9c978f] font-light leading-relaxed">
            Chaque tirage est certifié, signé et numéroté de la main d&apos;Adriel Fotso. Réalisé sur papier musée 100% coton avec encres pigmentaires pour une conservation centenaire.
          </p>

          {/* In-Situ Interactive Toggle */}
          <div className="liquid-pill p-1 rounded-full flex items-center border border-white/15 w-max">
            <button
              onClick={() => setInSituMode(false)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
                !inSituMode
                  ? "bg-[#C5A059] text-black font-semibold shadow-md"
                  : "text-[#9c978f] hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Tirage Isolé</span>
            </button>

            <button
              onClick={() => setInSituMode(true)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
                inSituMode
                  ? "bg-[#C5A059] text-black font-semibold shadow-md"
                  : "text-[#9c978f] hover:text-white"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Simulation In-Situ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Exhibition Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: The Frame / In-Situ Room */}
        <div className="lg:col-span-7">
          <div
            className={`relative rounded-3xl transition-all duration-700 overflow-hidden ${
              inSituMode
                ? "bg-[#111116] p-8 sm:p-14 border border-white/10 shadow-2xl flex items-center justify-center min-h-[480px] sm:min-h-[580px]"
                : "bg-black border border-white/10 shadow-2xl aspect-[4/5] sm:aspect-[16/11]"
            }`}
          >
            {/* Ambient Wall Light when in-situ */}
            {inSituMode && (
              <>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18),transparent_70%)] pointer-events-none" />
                <div className="absolute bottom-4 left-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
                  Simulation d&apos;accrochage contemporain • Baguette Chêne Sombre & Verre Musée
                </div>
              </>
            )}

            {/* The Framed Artwork */}
            <div
              className={`relative transition-all duration-500 ${
                inSituMode
                  ? "w-[75%] sm:w-[65%] aspect-[3/4] p-3 sm:p-4 bg-[#0a0a0c] rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-4 border-[#222126]"
                  : "w-full h-full"
              }`}
            >
              {/* Passe-partout effect if in-situ */}
              <div
                className={`relative w-full h-full overflow-hidden ${
                  inSituMode ? "border border-white/10 p-2 sm:p-3 bg-[#0d0d10]" : ""
                }`}
              >
                <div style={{ position: "relative" }} className="relative w-full h-full">
                  <Image
                    src={selectedPrint.image}
                    alt={selectedPrint.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* Artwork Metadata Pill */}
            <div className="absolute top-6 left-6 z-10 liquid-pill px-3.5 py-1.5 rounded-full border border-white/15 text-[11px] font-mono text-[#C5A059] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              <span>{selectedPrint.edition}</span>
            </div>
          </div>

          {/* Quick Print Switcher Thumbnails */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {PRINTS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedPrint(item);
                  setSelectedSizeIndex(0);
                }}
                className={`relative rounded-xl overflow-hidden p-2 text-left transition-all border cursor-pointer ${
                  selectedPrint.id === item.id
                    ? "border-[#C5A059] bg-white/[0.06] ring-1 ring-[#C5A059]/40"
                    : "border-white/10 hover:border-white/30 bg-white/[0.02]"
                }`}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2 bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
                <h4 className="text-xs text-white font-medium truncate">{item.title}</h4>
                <p className="text-[10px] text-[#C5A059] font-mono truncate">{item.location}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Technical Sheet & Collector Reservation */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059] block">
              {selectedPrint.series}
            </span>
            <h3 className="text-3xl sm:text-4xl font-light text-white leading-tight">
              {selectedPrint.title}
            </h3>
            <p className="text-xs text-[#9c978f] font-mono">
              {selectedPrint.location} • Réalisé en {selectedPrint.year}
            </p>
          </div>

          <p className="text-sm text-[#9c978f] font-light leading-relaxed">
            {selectedPrint.description}
          </p>

          {/* Technical Specifications */}
          <div className="liquid-glass p-5 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white">
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>Garanties & Spécifications Musée</span>
            </div>

            <div className="space-y-2 text-xs text-[#9c978f] font-light pt-1">
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#C5A059] mt-0.5 shrink-0" />
                <span><strong className="text-white font-normal">Support :</strong> {selectedPrint.paperType}</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#C5A059] mt-0.5 shrink-0" />
                <span><strong className="text-white font-normal">Authenticité :</strong> Certificat d&apos;authenticité scellé, numéroté et signé de la main d&apos;Adriel Fotso</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#C5A059] mt-0.5 shrink-0" />
                <span><strong className="text-white font-normal">Livraison :</strong> Expédition sécurisée sous tube rigide blindé ou encadrement bois sur mesure (Cameroun & Diaspora)</span>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-[#9c978f] block">
              Format d&apos;Exposition
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {selectedPrint.availableSizes.map((size, idx) => (
                <button
                  key={size.label}
                  onClick={() => setSelectedSizeIndex(idx)}
                  className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                    selectedSizeIndex === idx
                      ? "bg-[#C5A059]/20 border-[#C5A059] text-white"
                      : "liquid-pill border-white/10 text-[#9c978f] hover:text-white"
                  }`}
                >
                  <span className="block text-xs font-medium">{size.label}</span>
                  <span className="block text-[11px] font-mono text-[#C5A059] mt-0.5">
                    {size.dimensions}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={() =>
                onOrderPrint(
                  `Tirage d'Art — ${selectedPrint.title} (${selectedPrint.availableSizes[selectedSizeIndex].dimensions})`
                )
              }
              className="w-full py-4 rounded-full bg-[#C5A059] text-black font-semibold text-xs tracking-[0.2em] uppercase hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl hover:shadow-[#C5A059]/20"
            >
              <span>Réserver ce tirage numéroté</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-[#9c978f] font-mono mt-2">
              Échange direct sans intermédiaire avec le studio d&apos;Adriel Fotso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
