"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/icons/InstagramIcon";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Séries", href: "#works" },
    { label: "Tirages d'Art", href: "#prints" },
    { label: "Cinéma & Motion", href: "#motion" },
    { label: "Colorimétrie", href: "#color-science" },
    { label: "L'Auteur", href: "#about" },
    { label: "Instagram", href: "https://www.instagram.com/adrielfotsography/", external: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 flex justify-center items-center px-4 sm:px-8 ${
          scrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between liquid-pill rounded-full px-6 py-3 border border-white/10 shadow-2xl backdrop-blur-2xl">
          {/* Photographer Monogram */}
          <Link href="/" className="flex items-center gap-3 group">
            <span className="font-light text-sm tracking-[0.25em] uppercase text-white group-hover:text-[#C5A059] transition-colors">
              ADRIEL FOTSO
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-widest text-[#9c978f] uppercase font-mono border-l border-white/15 pl-3">
              Fotsography Studio
            </span>
          </Link>

          {/* Minimal Editorial Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-xs uppercase tracking-[0.2em] text-[#9c978f] hover:text-[#F7F5F0] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Direct Commission & Inquiries */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/adrielfotsography/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-[#F7F5F0] hover:border-[#C5A059] hover:text-[#C5A059] transition-all"
              title="Compte Officiel Instagram"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#C5A059]" size={14} />
              <span className="text-[11px] uppercase tracking-wider hidden sm:inline">@adrielfotsography</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="px-5 py-2 rounded-full bg-[#C5A059] text-black font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all cursor-pointer shadow-lg"
            >
              Commission
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 flex items-center justify-center text-white cursor-pointer"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#070709]/98 backdrop-blur-3xl md:hidden flex flex-col justify-center items-center px-8">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 w-10 h-10 rounded-full liquid-pill flex items-center justify-center text-white"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center gap-8 text-center max-w-sm w-full">
            <div className="text-center space-y-1 mb-2">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C5A059] block">
                Portfolio Officiel
              </span>
              <h3 className="text-xl font-light text-white tracking-widest uppercase">
                Adriel Fotso
              </h3>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-xl font-light uppercase tracking-[0.2em] text-[#F7F5F0] hover:text-[#C5A059] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="w-16 h-px bg-white/10 my-2" />

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 px-8 rounded-full bg-[#C5A059] text-black font-semibold text-xs uppercase tracking-[0.2em] shadow-xl"
            >
              Initier une Commission
            </button>

            <a
              href="https://www.instagram.com/adrielfotsography/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-[#9c978f] hover:text-[#C5A059] pt-2"
            >
              <MessageCircle className="w-4 h-4 text-[#C5A059]" />
              <span>Messagerie Directe Instagram</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
