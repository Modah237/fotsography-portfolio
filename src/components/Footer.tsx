"use client";

import React from "react";
import { Camera, ArrowUp } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="border-t border-white/10 bg-[#060608] py-16 px-6 md:px-12 text-[#9c978f]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
              </div>
              <span className="font-semibold text-xs tracking-[0.25em] uppercase text-white">
                ADRIEL FOTSO
              </span>
            </div>
            <p className="text-xs text-[#9c978f]/80 max-w-sm text-center md:text-left">
              Fotsography Studio — Photographie éditoriale, mariages d&apos;exception & réalisation cinématographique au Cameroun.
            </p>
          </div>

          {/* Local Time & Studio Status */}
          <div className="flex items-center gap-6 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DOUALA & YAOUNDÉ (WAT / UTC+1)</span>
            </div>
            <div className="text-white/20">•</div>
            <a
              href="https://www.instagram.com/adrielfotsography/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white hover:text-[#C5A059] transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@adrielfotsography</span>
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="liquid-pill w-10 h-10 rounded-full flex items-center justify-center text-white hover:text-[#C5A059] hover:border-[#C5A059] transition-all cursor-pointer"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] gap-4">
          <p>© {new Date().getFullYear()} Adriel Tchamaha Fotso. Tous droits réservés.</p>
          <p className="font-mono text-[10px] text-[#9c978f]/60 uppercase tracking-widest">
            Fotsography Studio • Réalisation & Photographie
          </p>
        </div>
      </footer>

      {/* Floating Sticky Contact Button */}
      <a
        href="https://www.instagram.com/adrielfotsography/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#C5A059] text-black font-semibold text-xs shadow-[0_4px_25px_rgba(197,160,89,0.35)] hover:bg-white hover:scale-105 transition-all duration-300"
        title="Contacter sur Instagram officiel"
      >
        <InstagramIcon className="w-4 h-4 text-black" />
        <span className="hidden sm:inline">Message @adrielfotsography</span>
      </a>
    </>
  );
}
