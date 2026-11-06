"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Video, HeartHandshake, Shirt, Globe2, ChevronDown } from "lucide-react";

interface ServicesSectionProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

const SERVICES = [
  {
    id: "motion",
    number: "01",
    title: "Clips Musicaux & Sessions Live",
    subtitle: "Direction Visuelle & Cadence",
    icon: Video,
    image: "/cysoul_albertine_thumbnail.webp",
    description:
      "Captation intimiste et clips à forte valeur cinématographique. En tant que musicien, chaque coupe est calée sur les respirations et le tempo du morceau.",
    deliverables: [
      "Direction artistique & scénarisation",
      "Tournage multi-caméras 4K UHD",
      "Étalonnage colorimétrique cinéma",
      "Formats master & déclinaisons verticales",
    ],
    target: "Artistes, labels musicaux & producteurs (Afro-Soul, Afrobeats, Gospel)",
  },
  {
    id: "weddings",
    number: "02",
    title: "Mariages & Célébrations de Prestige",
    subtitle: "Récit Intemporel & Émotion Vraie",
    icon: HeartHandshake,
    image: "/instagram-library/DepZh8-jUo0_child_6.jpg",
    description:
      "Couverture discrète et authentique des vœux, mariages coutumiers et cérémonies religieuses. Saisir la vérité du regard sans figer les sourires.",
    deliverables: [
      "Présence complète des préparatifs à la réception",
      "Série photographique traitée style 35mm",
      "Film cinématique teaser & documentaire",
      "Galerie privée en haute résolution",
    ],
    target: "Couples exigeants au Cameroun (Douala, Yaoundé, Kribi) et diaspora",
  },
  {
    id: "fashion",
    number: "03",
    title: "Haute Couture & Portraits d'Auteur",
    subtitle: "Matières, Silhouettes & Lumière",
    icon: Shirt,
    image: "/instagram-library/DX16SSrje74_main.jpg",
    description:
      "Lookbooks éditoriaux et portraits d'art sublimant la créativité africaine contemporaine. Un travail rigoureux sur les étoffes, les volumes et la peau.",
    deliverables: [
      "Séances en studio ou en extérieur naturel",
      "Direction de modèle & composition d'atmosphère",
      "Retouche chromatique haut de gamme",
      "Tirages d'art limités sur demande",
    ],
    target: "Créateurs de mode, stylistes, personnalités & maisons de couture",
  },
  {
    id: "commercial",
    number: "04",
    title: "Campagnes de Marque & International",
    subtitle: "Rayonnement Régional & Présence",
    icon: Globe2,
    image: "/instagram-library/DYB3rI0DTma_child_2.jpg",
    description:
      "Missions professionnelles au Cameroun et à l'international (Centrafrique, Océan Indien). Élever la perception de valeur de vos produits et services.",
    deliverables: [
      "Déplacements avec équipement de tournage autonome",
      "Packshots produits & visuels d'ambiance",
      "Production de capsules pour réseaux et affichage",
      "Cession des droits d'exploitation commerciale",
    ],
    target: "Entreprises, marques de luxe, cosmétique & hôtellerie de prestige",
  },
];

const FAQS = [
  {
    q: "Quels sont vos délais de livraison pour un film de mariage ou un clip ?",
    a: "Un teaser cinématographique de 60 secondes est livré sous 72h pour vos partages immédiats. L'ensemble de la série photographique étalonnée et le film documentaire complet sont remis sous 3 à 5 semaines dans un coffret numérique privé sécurisé.",
  },
  {
    q: "Effectuez-vous des déplacements hors de Yaoundé et Douala ?",
    a: "Régulièrement. Fotsography Studio intervient partout au Cameroun (Kribi, Bafoussam, Ouest ancestral) ainsi qu'à l'international (Centrafrique, Océan Indien, diaspora). Les modalités de déplacement sont définies en amont dans votre proposition sur-mesure.",
  },
  {
    q: "Comment s'exprime la sensibilité musicale d'Adriel dans la réalisation ?",
    a: "Étant guitariste et pianiste, Adriel ne pose pas des images sur de la musique : il orchestre la cadence du film avec les fréquences et les émotions du son. Les coupes respirent avec le tempo des artistes.",
  },
  {
    q: "Les tirages d'art sont-ils certifiés et numérotés ?",
    a: "Oui. Toutes les acquisitions de tirages Fine Art de la galerie sont accompagnées d'un certificat d'authenticité signé par Adriel Fotso, imprimées sur papier musée baryté assurant une conservation centenaire.",
  },
];

export default function ServicesSection({ onOpenBooking }: ServicesSectionProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="services" className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.35em] text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Domaines d&apos;Intervention</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-light text-[#F7F5F0] tracking-tight">
            Commissions & <span className="font-serif italic text-gold-gradient">Savoir-Faire</span>
          </h2>
        </div>

        <p className="text-sm text-[#9c978f] max-w-md font-light leading-relaxed">
          Quatre expertises clés conçues pour les créateurs, familles et marques en quête d&apos;un regard cinématographique d&apos;exception.
        </p>
      </div>

      {/* 4 Architectural Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#09090c] p-8 sm:p-10 flex flex-col justify-between min-h-[520px] transition-all duration-500 hover:border-[#C5A059]/40 shadow-2xl"
            >
              {/* Background Artwork with Subtle Opacity and Zoom */}
              <div style={{ position: "absolute" }} className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090c] via-[#09090c]/80 to-[#09090c]/60" />
              </div>

              {/* Top Meta */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full liquid-pill flex items-center justify-center text-[#C5A059] border border-white/10">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A059]">
                    {service.subtitle}
                  </span>
                </div>

                <span className="text-sm font-mono text-[#9c978f]/60 font-light">
                  {service.number}
                </span>
              </div>

              {/* Center Content */}
              <div className="relative z-10 space-y-4 my-8">
                <h3 className="text-2xl sm:text-3xl font-light text-white group-hover:text-[#C5A059] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-[#9c978f] font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="pt-2 space-y-1.5 border-t border-white/10">
                  <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-wider block">
                    Prestations incluses :
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-white/80 font-mono">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#C5A059]" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA & Target Audience */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-[11px] font-mono text-[#9c978f] truncate max-w-xs">
                  {service.target}
                </span>

                <button
                  onClick={() => onOpenBooking(service.title)}
                  className="px-5 py-2.5 rounded-full liquid-pill text-xs font-mono uppercase tracking-wider text-white hover:text-black hover:bg-[#C5A059] hover:border-[#C5A059] transition-all cursor-pointer flex items-center gap-2 border border-white/10 shrink-0"
                >
                  <span>Demander une commission</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editorial FAQ / Questions Fréquentes (Inspiration The Hearnes / Dorik) */}
      <div className="rounded-3xl bg-[#09090c] border border-white/10 p-8 sm:p-12 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Transparence & Processus</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-light text-white">
              Questions Fréquentes sur les Collaborations
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#9c978f] max-w-sm font-light">
            Tout ce qu&apos;il faut savoir avant de confier votre histoire ou votre projet artistique à Adriel Fotso.
          </p>
        </div>

        <div className="divide-y divide-white/5 space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="pt-4 pb-2">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 py-2 text-base sm:text-lg text-white font-light hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full liquid-pill flex items-center justify-center text-[#C5A059] shrink-0 transition-transform duration-300 border border-white/10 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-[#9c978f] font-light leading-relaxed pr-12 animate-in fade-in duration-200">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
