"use client";

import React, { useState } from "react";
import { X, Check, Copy, ArrowUpRight, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  initialService,
}: BookingModalProps) {
  const [projectType, setProjectType] = useState<string>(
    initialService || "Mariage & Célébration de Prestige"
  );
  const [prevInitialService, setPrevInitialService] = useState<string | undefined>(initialService);
  const [aestheticVibe, setAestheticVibe] = useState("Argentique 35mm & Émotion Sincère");
  const [clientName, setClientName] = useState("");
  const [location, setLocation] = useState("Yaoundé / Douala");
  const [dateRange, setDateRange] = useState("");
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);

  // Sync state with prop during render (official React recommended pattern)
  if (initialService !== prevInitialService) {
    setPrevInitialService(initialService);
    setProjectType(initialService || "Mariage & Célébration de Prestige");
  }

  if (!isOpen) return null;

  const projectTypes = [
    "Mariage & Célébration de Prestige",
    "Réalisation de Clip Vidéo / Session Live",
    "Campagne de Mode & Lookbook Marque",
    "Acquisition de Tirage d'Art Numéroté",
  ];

  const aestheticVibes = [
    "Argentique 35mm & Émotion Sincère",
    "Cinéma Feutré & Rythme Musical",
    "Haute Couture & Studio Épuré",
  ];

  const formattedBrief = `Bonjour Adriel (@adrielfotsography),

Je souhaite échanger au sujet d'un projet photographique / cinématographique :
• Type de projet : ${projectType}
• Esthétique recherchée : ${aestheticVibe}
• Nom / Marque : ${clientName || "[À préciser]"}
• Lieu envisagé : ${location}
• Période / Date : ${dateRange || "[À convenir]"}
• Vision & Notes : ${notes || "[À discuter lors de notre échange]"}

Découvert via votre portfolio officiel (adrielfotsography.com). Merci !`;

  const handleCopyAndRedirect = () => {
    navigator.clipboard.writeText(formattedBrief);
    setCopied(true);
    setTimeout(() => {
      window.open("https://www.instagram.com/direct/t/adrielfotsography/", "_blank");
      setCopied(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#09090c] rounded-3xl border border-white/15 shadow-2xl p-6 sm:p-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full liquid-pill flex items-center justify-center text-white hover:text-[#C5A059] border border-white/10 transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 mb-8 pr-12">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fotsography Studio • Bureau des Commissions</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-light text-white">
            Préparer votre Brief de Collaboration
          </h3>
          <p className="text-xs sm:text-sm text-[#9c978f] font-light leading-relaxed">
            Renseignez les grandes lignes de votre intention artistique. Ce récapitulatif sera formaté pour transmission directe à Adriel Fotso.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Project Type Selection */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-[#9c978f] block">
              Discipline / Nature du projet
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {projectTypes.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setProjectType(t)}
                  className={`p-3 rounded-xl text-xs text-left transition-all border cursor-pointer ${
                    projectType === t
                      ? "bg-[#C5A059]/20 border-[#C5A059] text-white font-medium"
                      : "liquid-pill border-white/10 text-[#9c978f] hover:text-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Aesthetic Sensitivity Selector (Inspiration Dorik / Storytellers) */}
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-[#9c978f] block">
              Sensibilité visuelle & univers esthétique
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {aestheticVibes.map((vibe) => (
                <button
                  key={vibe}
                  type="button"
                  onClick={() => setAestheticVibe(vibe)}
                  className={`p-2.5 rounded-xl text-[11px] text-center transition-all border cursor-pointer ${
                    aestheticVibe === vibe
                      ? "bg-[#C5A059]/20 border-[#C5A059] text-white font-medium"
                      : "liquid-pill border-white/10 text-[#9c978f] hover:text-white"
                  }`}
                >
                  {vibe}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Location Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#9c978f] block">
                Votre Nom ou Maison
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ex : Marie & Christian / Label"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#C5A059] font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#9c978f] block">
                Lieu envisagé
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Yaoundé, Douala, International..."
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#C5A059] font-sans"
              />
            </div>
          </div>

          {/* Date & Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#9c978f] block">
                Période / Date de tournage
              </label>
              <input
                type="text"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                placeholder="Ex : Décembre 2026 / Date précise"
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#C5A059] font-sans"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#9c978f] block">
                Détails de l&apos;intention
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Idées d'ambiance, tenues, timing..."
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#C5A059] font-sans"
              />
            </div>
          </div>

          {/* Formatted Brief Preview */}
          <div className="p-4 rounded-xl bg-black/70 border border-white/10 space-y-2">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block">
              Aperçu du message formaté pour Instagram DM :
            </span>
            <pre className="text-[11px] text-[#9c978f] font-mono whitespace-pre-wrap leading-relaxed max-h-32 overflow-y-auto">
              {formattedBrief}
            </pre>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={handleCopyAndRedirect}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C5A059] text-black font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Brief Copié • Ouverture Instagram...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copier & Ouvrir Instagram DM</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

            <span className="text-[11px] font-mono text-[#9c978f] text-center sm:text-right">
              Communication directe et confidentielle
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
