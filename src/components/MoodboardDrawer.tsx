"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Bookmark, X, Trash2, ArrowUpRight, Copy, Check } from "lucide-react";

export interface MoodboardItem {
  id: string;
  title: string;
  image: string;
  categoryLabel: string;
  location: string;
}

interface MoodboardDrawerProps {
  items: MoodboardItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onRequestCommission: (notes: string) => void;
}

export default function MoodboardDrawer({
  items,
  onRemoveItem,
  onClearAll,
  onRequestCommission,
}: MoodboardDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShareMoodboard = () => {
    const text = `Mon Moodboard d'inspiration Fotsography (${items.length} œuvres sélectionnées) :\n` +
      items.map((it, idx) => `${idx + 1}. ${it.title} (${it.categoryLabel} — ${it.location})`).join("\n") +
      `\n\nDécouvert sur le portfolio officiel Adriel Fotso (fotsography.com)`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToBooking = () => {
    const summary = `Œuvres sélectionnées dans mon Moodboard d'inspiration (${items.length}) :\n` +
      items.map((it) => `• ${it.title} [${it.categoryLabel}]`).join("\n");
    onRequestCommission(summary);
    setIsOpen(false);
  };

  if (items.length === 0 && !isOpen) {
    return null;
  }

  return (
    <>
      {/* Floating Trigger Pill at Bottom Right */}
      <aside aria-label="Sélection Moodboard" className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button
          onClick={() => setIsOpen(true)}
          className="liquid-pill px-5 py-3 rounded-full flex items-center gap-3 border border-[#C5A059]/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:border-[#C5A059] transition-all cursor-pointer group hover:scale-[1.03]"
          aria-label={`Ouvrir mon Moodboard (${items.length} photos)`}
        >
          <div className="relative">
            <Bookmark className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" />
            <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#C5A059] text-black font-mono font-bold text-[9px] flex items-center justify-center">
              {items.length}
            </span>
          </div>

          <span className="text-xs uppercase tracking-wider text-white font-medium">
            Mon Moodboard
          </span>

          <span className="text-[10px] font-mono text-[#C5A059] border-l border-white/10 pl-2">
            [ Voir ]
          </span>
        </button>
      </aside>

      {/* Slide-over Luxury Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-[#0a0a0d] border-l border-white/15 h-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl overflow-y-auto">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Votre Direction Artistique</span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full liquid-pill flex items-center justify-center text-white hover:text-[#C5A059] border border-white/10 transition-colors cursor-pointer"
                  aria-label="Fermer le moodboard"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="py-4 space-y-1">
                <h3 className="text-xl sm:text-2xl font-light text-white">
                  Mon Moodboard Privé
                </h3>
                <p className="text-xs text-[#9c978f] font-light">
                  {items.length} {items.length > 1 ? "œuvres retenues" : "œuvre retenue"} pour inspirer votre projet photographique ou vidéo.
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-3 my-4 max-h-[50vh] overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <div className="text-center py-12 liquid-glass rounded-2xl border border-white/5 space-y-3">
                    <Bookmark className="w-8 h-8 text-[#9c978f] mx-auto opacity-40" />
                    <p className="text-xs text-[#9c978f] font-mono">
                      Votre moodboard est vide pour le moment.
                    </p>
                    <p className="text-[11px] text-white/60 font-light px-4">
                      Cliquez sur le signet des photos dans la galerie pour constituer votre sélection esthétique.
                    </p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl liquid-glass border border-white/10 flex items-center gap-3 group hover:border-[#C5A059]/40 transition-all"
                    >
                      <div style={{ position: "relative" }} className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-black">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-0.5">
                        <span className="text-[10px] font-mono uppercase text-[#C5A059] block truncate">
                          {item.categoryLabel}
                        </span>
                        <h4 className="text-xs text-white font-medium truncate">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-[#9c978f] font-mono block truncate">
                          {item.location}
                        </span>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                        title="Retirer du moodboard"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer Actions */}
            {items.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-3">
                <button
                  onClick={handleProceedToBooking}
                  className="w-full py-3.5 rounded-full bg-[#C5A059] text-black font-semibold text-xs tracking-[0.18em] uppercase hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl"
                >
                  <span>Transmettre pour mon brief</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShareMoodboard}
                    className="flex-1 py-2.5 rounded-full liquid-pill border border-white/10 text-[11px] font-mono uppercase text-white/90 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-[#C5A059]" />}
                    <span>{copied ? "Copié !" : "Copier la sélection"}</span>
                  </button>

                  <button
                    onClick={onClearAll}
                    className="px-4 py-2.5 rounded-full liquid-pill border border-white/10 text-[11px] font-mono uppercase text-white/50 hover:text-red-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    title="Vider le moodboard"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Vider</span>
                  </button>
                </div>

                <p className="text-[10px] text-center text-[#9c978f] font-mono">
                  Les photos sélectionnées seront incluses directement dans votre échange avec Adriel Fotso
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
