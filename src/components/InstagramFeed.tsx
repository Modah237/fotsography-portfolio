"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

export default function InstagramFeed() {
  const verifiedWorks = [
    {
      id: "ig-bandja",
      image: "/instagram-library/DX16SSrje74_main.jpg",
      title: "Bandja — Les Racines & La Grâce",
      category: "Haute Couture Africaine",
      url: "https://www.instagram.com/p/DX16SSrje74/",
    },
    {
      id: "ig-wedding",
      image: "/instagram-library/DepZh8-jUo0_child_6.jpg",
      title: "Indira & Tamsir on the beat",
      category: "Mariage d'Exception",
      url: "https://www.instagram.com/p/DepZh8-jUo0/",
    },
    {
      id: "ig-fashion",
      image: "/instagram-library/DYB3rI0DTma_child_2.jpg",
      title: "Shoes & More Editorial",
      category: "Campagne Mode & Marque",
      url: "https://www.instagram.com/p/DYB3rI0DTma/",
    },
    {
      id: "ig-travel",
      image: "/instagram-library/DctRZO8DXsf_child_1.jpg",
      title: "Archipel des Seychelles",
      category: "Voyages & Lumière Océanique",
      url: "https://www.instagram.com/p/DctRZO8DXsf/",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="liquid-glass-card rounded-[32px] p-8 sm:p-12 relative overflow-hidden border border-white/10 shadow-2xl">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-[#C5A059] via-rose-500 to-purple-600">
              <div className="w-full h-full rounded-full bg-[#08080a] flex items-center justify-center">
                <InstagramIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-light text-white flex items-center gap-2">
                <span>@adrielfotsography</span>
              </h3>
              <p className="text-xs text-[#9c978f] font-mono">
                Actualités, coulisses & nouvelles séries en direct sur Instagram
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/adrielfotsography/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium text-xs tracking-wider uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all shrink-0"
          >
            <span>Suivre @adrielfotsography</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Real Visual Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {verifiedWorks.map((work) => (
            <a
              key={work.id}
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ position: "relative" }}
              className="group relative w-full aspect-[4/5] rounded-2xl overflow-hidden block border border-white/10 bg-black"
            >
              <Image
                src={work.image}
                alt={work.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              {/* Overlay with Real Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059] block">
                  {work.category}
                </span>
                <p className="text-sm font-light text-white line-clamp-1">{work.title}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Editorial Tag */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#9c978f] font-mono gap-2">
          <span>Toutes les images sont la propriété exclusive d&apos;Adriel Fotso & Fotsography Studio.</span>
          <span className="text-[#C5A059]">Douala • Yaoundé • International</span>
        </div>
      </div>
    </section>
  );
}
