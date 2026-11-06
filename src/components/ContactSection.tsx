"use client";

import React from "react";
import { MessageCircle, MapPin, Sparkles, ArrowUpRight } from "lucide-react";

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export default function ContactSection({ onOpenBooking }: ContactSectionProps) {
  return (
    <section id="contact" className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Editorial Header */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-[#C5A059] uppercase liquid-pill px-4 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Bureau des Commissions</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#F7F5F0] tracking-tight leading-[1.1]">
            Initier un projet <br />
            <span className="font-serif italic text-gold-gradient">
              ou une commande.
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#9c978f] font-light leading-relaxed">
            Chaque collaboration commence par une écoute attentive. Mariages de prestige, réalisation de clips musicaux, séries d&apos;art ou campagnes de marque : Adriel Fotso et l&apos;équipe Fotsography Studio vous accompagnent de la conception à la livraison finale.
          </p>

          <div className="pt-4 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5 border border-[#C5A059]/30">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 font-mono text-xs">
                <span className="text-white font-sans text-sm block">Yaoundé & Douala, Cameroun</span>
                <span className="text-[#9c978f] block">Déplacements en Afrique Centrale & à l&apos;international</span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#C5A059]/15 flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5 border border-[#C5A059]/30">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 font-mono text-xs">
                <span className="text-white font-sans text-sm block">Canal Direct Privilégié</span>
                <span className="text-[#C5A059] block">Instagram Direct : @adrielfotsography</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Direct Actions Card */}
        <div className="lg:col-span-7">
          <div className="liquid-glass p-8 sm:p-12 rounded-3xl border border-white/10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A059]/10 rounded-full blur-[80px] -z-10" />

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059]">
                Réservations & Disponibilités
              </span>
              <h3 className="text-2xl sm:text-3xl font-light text-white">
                Faisons naître votre prochaine œuvre
              </h3>
              <p className="text-xs sm:text-sm text-[#9c978f] font-light leading-relaxed">
                Sélectionnez votre type de projet pour préparer les détails de votre commission.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={onOpenBooking}
                className="p-5 rounded-2xl liquid-pill border border-white/10 hover:border-[#C5A059]/50 transition-all text-left space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-[#C5A059]">
                  <span className="text-xs font-mono uppercase tracking-wider">Célébration</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-base font-light text-white">Mariage & Vœux de Prestige</h4>
                <p className="text-[11px] text-[#9c978f]">Couverture photo 35mm & film cinématique 4K</p>
              </button>

              <button
                onClick={onOpenBooking}
                className="p-5 rounded-2xl liquid-pill border border-white/10 hover:border-[#C5A059]/50 transition-all text-left space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-[#C5A059]">
                  <span className="text-xs font-mono uppercase tracking-wider">Motion</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-base font-light text-white">Clip Vidéo & Session Live</h4>
                <p className="text-[11px] text-[#9c978f]">Direction artistique, tournage & montage musical</p>
              </button>

              <button
                onClick={onOpenBooking}
                className="p-5 rounded-2xl liquid-pill border border-white/10 hover:border-[#C5A059]/50 transition-all text-left space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-[#C5A059]">
                  <span className="text-xs font-mono uppercase tracking-wider">Éditorial</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-base font-light text-white">Campagne de Mode & Marque</h4>
                <p className="text-[11px] text-[#9c978f]">Lookbook de créateurs, textures & souliers</p>
              </button>

              <button
                onClick={onOpenBooking}
                className="p-5 rounded-2xl liquid-pill border border-white/10 hover:border-[#C5A059]/50 transition-all text-left space-y-2 group cursor-pointer"
              >
                <div className="flex items-center justify-between text-[#C5A059]">
                  <span className="text-xs font-mono uppercase tracking-wider">Tirages</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-base font-light text-white">Acquisition d&apos;Œuvres d&apos;Art</h4>
                <p className="text-[11px] text-[#9c978f]">Tirages limités certifiés de la collection</p>
              </button>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <a
                href="https://www.instagram.com/adrielfotsography/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C5A059] text-black font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Écrire sur Instagram DM</span>
              </a>

              <span className="text-[11px] font-mono text-[#9c978f] text-center sm:text-right">
                Réponse directe sous 24h
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
