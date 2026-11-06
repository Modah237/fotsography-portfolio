"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, LayoutGrid, Film, ListFilter, Sparkles, Layers, Bookmark } from "lucide-react";
import { PORTFOLIO_PROJECTS, ProjectItem } from "@/data/portfolioData";

interface PortfolioGridProps {
  onSelectProject: (project: ProjectItem) => void;
  onToggleMoodboard?: (project: ProjectItem) => void;
  moodboardIds?: string[];
}

const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function PortfolioGrid({
  onSelectProject,
  onToggleMoodboard,
  moodboardIds = [],
}: PortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [viewMode, setViewMode] = useState<"editorial" | "contact-sheet" | "index">("editorial");

  const categories = [
    { id: "all", label: "Toutes les Séries" },
    { id: "fashion", label: "Mode & Patrimoine" },
    { id: "weddings", label: "Mariages & Célébrations" },
    { id: "lifestyle", label: "Voyages & Échappées" },
    { id: "cinema", label: "Clips & Motion" },
  ];

  const filteredProjects =
    activeCategory === "all"
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="works" className="py-32 px-6 md:px-16 max-w-7xl mx-auto">
      {/* Editorial Room Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-[0.35em] text-[#C5A059]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Séries & Œuvres Authentifiées</span>
          </div>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light text-[#F7F5F0] tracking-tight">
            Galerie des <span className="font-serif italic text-gold-gradient">Tirages</span>
          </h2>
        </div>

        {/* View Mode Switcher + Filter Tabs */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Triple View Mode Toggle */}
          <div className="liquid-pill p-1 rounded-full flex items-center border border-white/10 shadow-lg">
            <button
              onClick={() => setViewMode("editorial")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "editorial"
                  ? "bg-[#C5A059] text-black font-semibold shadow-md"
                  : "text-[#9c978f] hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Éditorial</span>
            </button>

            <button
              onClick={() => setViewMode("contact-sheet")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "contact-sheet"
                  ? "bg-[#C5A059] text-black font-semibold shadow-md"
                  : "text-[#9c978f] hover:text-white"
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Planche 35mm</span>
            </button>

            <button
              onClick={() => setViewMode("index")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === "index"
                  ? "bg-[#C5A059] text-black font-semibold shadow-md"
                  : "text-[#9c978f] hover:text-white"
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Index</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-[#F7F5F0] text-black font-semibold shadow-lg"
                    : "liquid-pill text-[#9c978f] hover:text-white border border-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: EDITORIAL BENTO EXHIBITION */}
      {viewMode === "editorial" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {filteredProjects.map((project, idx) => {
            let spanClass = "lg:col-span-6";
            let heightClass = "h-[500px] sm:h-[620px]";

            if (project.aspect === "tall") {
              spanClass = "lg:col-span-5";
              heightClass = "h-[580px] sm:h-[700px]";
            } else if (project.aspect === "wide") {
              spanClass = "lg:col-span-7";
              heightClass = "h-[500px] sm:h-[620px]";
            } else if (project.aspect === "square") {
              spanClass = "lg:col-span-6";
              heightClass = "h-[480px] sm:h-[560px]";
            }

            const isHovered = hoveredProject?.id === project.id;
            const isDimmed = hoveredProject !== null && !isHovered;

            return (
              <div
                key={project.id}
                data-cursor="EXAMINER"
                style={{ position: "relative" }}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ${spanClass} ${heightClass} ${
                  isDimmed ? "opacity-35 grayscale-[40%]" : "opacity-100"
                }`}
                onMouseEnter={() => setHoveredProject(project)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => onSelectProject(project)}
              >
                {/* Master Artwork Image */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                />

                {/* Obsidian Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/95 via-transparent to-black/30" />

                {/* Top Corner Meta */}
                <div className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono text-[#C5A059] font-bold border border-white/10">
                      {ROMAN_NUMERALS[idx] || `${idx + 1}`}
                    </span>
                    <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-white/90 border border-white/10">
                      {project.categoryLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {onToggleMoodboard && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleMoodboard(project);
                        }}
                        className={`liquid-pill p-2 rounded-full border transition-all cursor-pointer ${
                          moodboardIds.includes(project.id)
                            ? "bg-[#C5A059] border-[#C5A059] text-black"
                            : "border-white/10 text-white/80 hover:text-white hover:border-[#C5A059]/40"
                        }`}
                        title={
                          moodboardIds.includes(project.id)
                            ? "Retirer de mon Moodboard"
                            : "Ajouter à mon Moodboard"
                        }
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            moodboardIds.includes(project.id) ? "fill-black" : "text-[#C5A059]"
                          }`}
                        />
                      </button>
                    )}

                    {project.galleryImages.length > 1 && (
                      <span className="liquid-pill px-3 py-1 rounded-full text-[10px] font-mono text-white/80 border border-white/10 flex items-center gap-1.5">
                        <Layers className="w-3 h-3 text-[#C5A059]" />
                        <span>{project.galleryImages.length} clichés</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Signature Capsule */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="liquid-glass p-5 rounded-2xl flex items-center justify-between gap-4 group-hover:border-[#C5A059]/50 transition-all duration-500">
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-light text-white tracking-wide">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#9c978f] font-mono tracking-wider">
                        {project.location} • {project.year}
                      </p>
                    </div>

                    <div className="w-11 h-11 rounded-full liquid-pill flex items-center justify-center text-white group-hover:text-[#C5A059] group-hover:scale-110 transition-all shrink-0 border border-white/10">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW MODE 2: 35MM FILM CONTACT SHEET */}
      {viewMode === "contact-sheet" && (
        <div id="contact-sheet" className="bg-[#0b0b0e] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6 font-mono">
          {/* Film Edge Sprocket Perforations Top */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-[10px] text-[#9c978f]/60 tracking-[0.3em] uppercase">
            <span>KODAK SAFETY FILM 400TX</span>
            <div className="hidden sm:flex gap-4">
              <span>ISO 400</span>
              <span>FORMAT 35MM ARCHIVAL</span>
              <span>BANDJA • YAOUNDÉ • DOUALA</span>
            </div>
            <span>FOTSOGRAPHY STUDIO</span>
          </div>

          {/* Contact Sheet Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                data-cursor="EXAMINER"
                onClick={() => onSelectProject(project)}
                className="group relative cursor-pointer border border-white/15 p-2 rounded-xl bg-black/70 hover:border-[#C5A059] transition-all"
              >
                {/* Exposure frame info */}
                <div className="flex items-center justify-between text-[9px] text-[#9c978f] mb-1.5 px-1">
                  <span>EXP {String(idx + 1).padStart(2, "0")}A</span>
                  <span className="text-[#C5A059]">{project.year}</span>
                </div>

                {/* Miniature frame */}
                <div style={{ position: "relative" }} className="relative aspect-[3/4] w-full rounded-lg overflow-hidden bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Caption below frame */}
                <div className="mt-2 px-1">
                  <p className="text-xs text-white font-sans font-light truncate group-hover:text-[#C5A059]">
                    {project.title}
                  </p>
                  <p className="text-[10px] text-[#9c978f] truncate font-mono">
                    {project.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Film Edge Sprocket Perforations Bottom */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[10px] text-[#9c978f]/60 tracking-[0.3em] uppercase">
            <span>TOUTES LES ŒUVRES SONT CERTIFIÉES AUTHENTIQUES</span>
            <span>INDEX ARCHIVE {filteredProjects.length} SÉRIES</span>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: TYPOGRAPHICAL CATALOGUE INDEX */}
      {viewMode === "index" && (
        <div className="relative rounded-3xl bg-[#09090c] border border-white/10 p-6 sm:p-10 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/10 text-[#9c978f] uppercase tracking-[0.25em] pb-4">
                  <th className="py-4 font-normal">N°</th>
                  <th className="py-4 font-normal">Titre de la Série</th>
                  <th className="py-4 font-normal hidden md:table-cell">Discipline</th>
                  <th className="py-4 font-normal hidden sm:table-cell">Lieu & Année</th>
                  <th className="py-4 font-normal text-right">Tirages</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredProjects.map((project, idx) => (
                  <tr
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    onMouseEnter={() => setHoveredProject(project)}
                    onMouseLeave={() => setHoveredProject(null)}
                    className="group hover:bg-white/[0.03] transition-colors cursor-pointer"
                  >
                    <td className="py-5 text-[#C5A059] font-bold">
                      {ROMAN_NUMERALS[idx] || `${idx + 1}`}
                    </td>
                    <td className="py-5 font-sans text-base sm:text-lg text-white font-light group-hover:text-[#C5A059] transition-colors">
                      {project.title}
                    </td>
                    <td className="py-5 text-[#9c978f] hidden md:table-cell">
                      {project.categoryLabel}
                    </td>
                    <td className="py-5 text-[#9c978f] hidden sm:table-cell">
                      {project.location} • {project.year}
                    </td>
                    <td className="py-5 text-right text-white/90">
                      <span className="liquid-pill px-3 py-1 rounded-full text-[10px]">
                        {project.galleryImages.length} clichés
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Floating Hover Preview Card (Swiss Minimalist Style) */}
          {hoveredProject && (
            <div className="hidden lg:block fixed pointer-events-none z-30 bottom-12 right-12 w-72 aspect-[3/4] rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <Image
                src={hoveredProject.image}
                alt={hoveredProject.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-sans font-medium">{hoveredProject.title}</p>
                <p className="text-[10px] text-[#C5A059] font-mono">{hoveredProject.location}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
