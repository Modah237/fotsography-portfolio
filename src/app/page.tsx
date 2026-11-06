"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CollaborationsBar from "@/components/CollaborationsBar";
import PortfolioGrid from "@/components/PortfolioGrid";
import FineArtPrints from "@/components/FineArtPrints";
import CinematicVideoVault from "@/components/CinematicVideoVault";
import ColorScienceSection from "@/components/ColorScienceSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import InstagramFeed from "@/components/InstagramFeed";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import LightboxModal from "@/components/LightboxModal";
import BookingModal from "@/components/BookingModal";
import CustomCursor from "@/components/CustomCursor";
import MoodboardDrawer, { MoodboardItem } from "@/components/MoodboardDrawer";
import GalleryAmbientSound from "@/components/GalleryAmbientSound";
import { PORTFOLIO_PROJECTS, ProjectItem } from "@/data/portfolioData";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [moodboardItems, setMoodboardItems] = useState<MoodboardItem[]>([]);

  const handleOpenBooking = (service?: string) => {
    setPreselectedService(service);
    setIsBookingOpen(true);
  };

  const handleToggleMoodboard = (project: ProjectItem) => {
    setMoodboardItems((prev) => {
      const exists = prev.some((item) => item.id === project.id);
      if (exists) {
        return prev.filter((item) => item.id !== project.id);
      } else {
        return [
          ...prev,
          {
            id: project.id,
            title: project.title,
            image: project.image,
            categoryLabel: project.categoryLabel,
            location: project.location,
          },
        ];
      }
    });
  };

  const handleRemoveMoodboardItem = (id: string) => {
    setMoodboardItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearMoodboard = () => {
    setMoodboardItems([]);
  };

  return (
    <main className="min-h-screen bg-[#070709] text-[#F7F5F0] relative overflow-x-hidden">
      {/* Background Gradient Ambient Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.07),transparent_70%)] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none z-0" />

      {/* Floating Minimalist Navbar */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Fullscreen Master Hero Exhibition */}
      <Hero onOpenBooking={() => handleOpenBooking()} />

      {/* Verified Collaborators & Authority Strip (Tayler Smith / Will Bremridge pattern) */}
      <CollaborationsBar />

      {/* Curated Editorial Works Grid (Editorial, Contact Sheet 35mm, Index Typographique) */}
      <PortfolioGrid
        onSelectProject={(project) => setSelectedProject(project)}
        onToggleMoodboard={handleToggleMoodboard}
        moodboardIds={moodboardItems.map((it) => it.id)}
      />

      {/* Fine Art Collector Prints with In-Situ Simulation (Frame Chasers / Through Our Lens pattern) */}
      <FineArtPrints onOrderPrint={(printTitle) => handleOpenBooking(printTitle)} />

      {/* Cinematic Multi-Video Screening Room (Cysoul, Mariages, Clips Urbains) */}
      <CinematicVideoVault />

      {/* Fotso Color Science: Melanin Tone Protection & Interactive Before/After Split Slider (Carmen Hunter pattern) */}
      <ColorScienceSection onInquirePresets={() => handleOpenBooking("LUTs & Presets Cinéma Studio")} />

      {/* 4 Expertises & Commissions Architecture */}
      <ServicesSection onOpenBooking={(service) => handleOpenBooking(service)} />

      {/* The Artist: Authentic Story, Philosophy & Musical Sensibility */}
      <AboutSection />

      {/* Instagram Bridge & Real Feeds */}
      <InstagramFeed />

      {/* Direct Inquire & Commission Bureau */}
      <ContactSection onOpenBooking={() => handleOpenBooking()} />

      {/* Minimal Signature Footer */}
      <Footer />

      {/* Fullscreen High-Res Lightbox Modal with EXIF & In-Situ */}
      <LightboxModal
        project={selectedProject}
        projects={PORTFOLIO_PROJECTS}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
        onToggleMoodboard={handleToggleMoodboard}
        isMoodboardSaved={selectedProject ? moodboardItems.some((it) => it.id === selectedProject.id) : false}
      />

      {/* Bespoke Commission Brief Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={preselectedService}
      />

      {/* Interactive Client Moodboard Drawer (Innovative Feature) */}
      <MoodboardDrawer
        items={moodboardItems}
        onRemoveItem={handleRemoveMoodboardItem}
        onClearAll={handleClearMoodboard}
        onRequestCommission={(notes) => handleOpenBooking(notes)}
      />

      {/* Atmospheric Gallery Ambient Soundscape (Innovative Feature) */}
      <GalleryAmbientSound />

      {/* Magnetic Gallery Cursor */}
      <CustomCursor />
    </main>
  );
}
