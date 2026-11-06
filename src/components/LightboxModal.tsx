"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, MapPin, Camera, MessageCircle, ExternalLink, Frame, Maximize2, Sliders, Bookmark } from "lucide-react";
import { ProjectItem } from "@/data/portfolioData";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

interface LightboxModalProps {
  project: ProjectItem | null;
  projects: ProjectItem[];
  onClose: () => void;
  onSelectProject: (p: ProjectItem) => void;
  onToggleMoodboard?: (p: ProjectItem) => void;
  isMoodboardSaved?: boolean;
}

export default function LightboxModal({
  project,
  projects,
  onClose,
  onSelectProject,
  onToggleMoodboard,
  isMoodboardSaved = false,
}: LightboxModalProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [prevProjectId, setPrevProjectId] = useState<string | null>(null);
  const [isInSitu, setIsInSitu] = useState(false);
  const [showExif, setShowExif] = useState(false);

  // Synchronize photo index when project changes during render (recommandation officielle React)
  if (project && project.id !== prevProjectId) {
    setPrevProjectId(project.id);
    setPhotoIndex(0);
  }

  const currentGallery = project?.galleryImages && project.galleryImages.length > 0
    ? project.galleryImages
    : project ? [project.image] : [];

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;

  const handlePhotoPrev = useCallback(() => {
    if (!project) return;
    if (photoIndex > 0) {
      setPhotoIndex(photoIndex - 1);
    } else {
      const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
      onSelectProject(projects[prevIndex]);
    }
  }, [currentIndex, photoIndex, onSelectProject, project, projects]);

  const handlePhotoNext = useCallback(() => {
    if (!project) return;
    if (photoIndex < currentGallery.length - 1) {
      setPhotoIndex(photoIndex + 1);
    } else {
      const nextIndex = (currentIndex + 1) % projects.length;
      onSelectProject(projects[nextIndex]);
    }
  }, [currentIndex, currentGallery.length, photoIndex, onSelectProject, project, projects]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePhotoPrev();
      if (e.key === "ArrowRight") handlePhotoNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose, handlePhotoPrev, handlePhotoNext]);

  if (!project) return null;

  const currentDisplayImage = currentGallery[photoIndex] || project.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-300">
      {/* Top Floating Controls */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30 pointer-events-auto">
        <div className="liquid-pill px-4 py-1.5 rounded-full text-xs text-[#9c978f] font-mono flex items-center gap-2">
          <span>Série {String(currentIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
          <span className="text-white/20">•</span>
          <span className="text-[#C5A059]">
            Photo {photoIndex + 1} / {currentGallery.length}
          </span>
          <span className="text-white/20 hidden sm:inline">•</span>
          <span className="text-white hidden sm:inline">{project.categoryLabel}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Moodboard Collector Toggle */}
          {onToggleMoodboard && (
            <button
              onClick={() => onToggleMoodboard(project)}
              className={`liquid-pill px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                isMoodboardSaved ? "bg-[#C5A059] text-black font-semibold" : "text-white/80 hover:text-white"
              }`}
              title="Ajouter à mon moodboard d'inspiration"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isMoodboardSaved ? "fill-black" : "text-[#C5A059]"}`} />
              <span className="hidden sm:inline">{isMoodboardSaved ? "Dans le Moodboard" : "+ Moodboard"}</span>
            </button>
          )}

          {/* EXIF Optical Recipe Toggle */}
          {project.exif && (
            <button
              onClick={() => setShowExif(!showExif)}
              className={`liquid-pill px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                showExif ? "bg-[#C5A059] text-black font-semibold" : "text-white/80 hover:text-white"
              }`}
              title="Afficher les métadonnées de prise de vue & optiques"
            >
              <Sliders className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">EXIF</span>
            </button>
          )}

          {/* In-Situ Fine Art Mockup Mode Toggle */}
          <button
            onClick={() => setIsInSitu(!isInSitu)}
            className={`liquid-pill px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              isInSitu ? "bg-[#C5A059] text-black font-semibold" : "text-white/80 hover:text-white"
            }`}
            title="Prévisualiser l'œuvre encadrée sur un mur de galerie"
          >
            {isInSitu ? <Maximize2 className="w-3.5 h-3.5" /> : <Frame className="w-3.5 h-3.5 text-[#C5A059]" />}
            <span className="hidden sm:inline">{isInSitu ? "Plein Écran" : "Cadre In-Situ"}</span>
          </button>

          <button
            onClick={onClose}
            className="liquid-pill w-11 h-11 rounded-full flex items-center justify-center text-white hover:text-[#C5A059] hover:border-[#C5A059] transition-all cursor-pointer"
            aria-label="Fermer la vue"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePhotoPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 liquid-pill w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-[#C5A059] hover:scale-110 transition-all cursor-pointer"
        aria-label="Cliché précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handlePhotoNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 liquid-pill w-12 h-12 rounded-full flex items-center justify-center text-white hover:text-[#C5A059] hover:scale-110 transition-all cursor-pointer"
        aria-label="Cliché suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Main Image View (Toggle between Fullscreen and Museum In-Situ Framing) */}
      <div className="relative w-full h-[65vh] sm:h-[72vh] max-w-5xl mx-auto flex items-center justify-center my-auto">
        {/* EXIF Optical Recipe HUD */}
        {showExif && project.exif && (
          <div className="absolute top-4 right-4 z-40 liquid-glass p-4 rounded-2xl border border-white/20 shadow-2xl max-w-xs space-y-2 text-left animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A059]">
                Fiche Optique & Cadrage
              </span>
              <span className="text-[9px] font-mono text-white/40">35mm RAW</span>
            </div>
            <div className="space-y-1 text-xs font-mono">
              <div className="flex justify-between text-[#9c978f] gap-2">
                <span>Boîtier :</span>
                <span className="text-white text-right">{project.exif.camera}</span>
              </div>
              <div className="flex justify-between text-[#9c978f] gap-2">
                <span>Optique :</span>
                <span className="text-white text-right">{project.exif.lens}</span>
              </div>
              <div className="flex justify-between text-[#9c978f] gap-2">
                <span>Exposition :</span>
                <span className="text-[#C5A059] text-right">{project.exif.settings}</span>
              </div>
              <div className="flex justify-between text-[#9c978f] gap-2">
                <span>Émulsion :</span>
                <span className="text-white/90 text-right">{project.exif.filmCurve}</span>
              </div>
              <div className="flex justify-between text-[#9c978f] gap-2">
                <span>Kelvin :</span>
                <span className="text-white/90 text-right">{project.exif.kelvin}</span>
              </div>
              <div className="flex justify-between text-[#9c978f] pt-1 border-t border-white/10 text-[10px] gap-2">
                <span>Territoire :</span>
                <span className="text-white/70 truncate max-w-[140px] text-right">{project.exif.coordinates}</span>
              </div>
            </div>
          </div>
        )}

        {isInSitu ? (
          /* Museum In-Situ Framed Wall Mockup */
          <div className="relative p-6 sm:p-10 rounded-2xl bg-[#0c0c10] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.95)] flex flex-col items-center">
            {/* Museum Passe-partout & Black Oak Frame */}
            <div className="relative p-4 sm:p-7 bg-[#FAF8F5] rounded shadow-2xl border-4 sm:border-8 border-[#121216]">
              <div className="relative w-[280px] sm:w-[440px] md:w-[520px] aspect-[4/5] bg-black overflow-hidden shadow-inner">
                <Image
                  src={currentDisplayImage}
                  alt={`${project.title} - Tirage Fine Art`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 550px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Museum Plaque Label */}
            <div className="mt-4 px-4 py-1.5 rounded bg-black/60 border border-white/10 text-center font-mono">
              <p className="text-[10px] text-white/90 tracking-wider">
                {project.title} — {project.year}
              </p>
              <p className="text-[8px] text-[#C5A059] uppercase tracking-widest">
                Tirage d&apos;Art Certifié Archival • Fotsography Studio
              </p>
            </div>
          </div>
        ) : (
          /* Fullscreen Edge View */
          <div className="relative w-full h-full">
            <Image
              src={currentDisplayImage}
              alt={`${project.title} - Cliché ${photoIndex + 1}`}
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-contain"
              priority
            />
          </div>
        )}
      </div>

      {/* Filmstrip Carousel Bar (if multi-images) */}
      {currentGallery.length > 1 && (
        <div className="absolute bottom-28 left-6 right-6 flex justify-center gap-2 z-30 pointer-events-auto overflow-x-auto py-2">
          {currentGallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setPhotoIndex(i)}
              className={`relative w-12 h-12 rounded-lg overflow-hidden border transition-all cursor-pointer shrink-0 ${
                photoIndex === i
                  ? "border-[#C5A059] scale-110 shadow-[0_0_15px_rgba(197,160,89,0.4)]"
                  : "border-white/20 opacity-50 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Bottom Floating Glass Card (Metadata & Attribution) */}
      <div className="absolute bottom-6 left-6 right-6 max-w-3xl mx-auto z-30 pointer-events-auto">
        <div className="liquid-glass-card p-5 sm:p-6 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-light text-white flex items-center gap-2">
              <span>{project.title}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#9c978f] line-clamp-2">{project.description}</p>
            
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-[#9c978f] font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C5A059]" />
                {project.location}
              </span>
              <span>•</span>
              <span>{project.year}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#f7f5f0]/80">
                <Camera className="w-3 h-3 text-[#C5A059]" />
                {project.focus}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={project.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-3 rounded-full bg-white/5 border border-white/10 text-white text-xs font-mono uppercase tracking-wider hover:border-[#C5A059] transition-all"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Voir Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href="https://www.instagram.com/adrielfotsography/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#C5A059] text-black text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Échanger</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
