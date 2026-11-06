"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button, [data-cursor]");
      if (clickable) {
        setIsHovered(true);
        const customText = clickable.getAttribute("data-cursor");
        setCursorText(customText || "");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className={`rounded-full transition-all duration-300 flex items-center justify-center ${
          isHovered
            ? "w-20 h-20 bg-white/15 backdrop-blur-md border border-[#C5A059]/60 scale-100 shadow-[0_0_25px_rgba(197,160,89,0.3)]"
            : "w-4 h-4 bg-[#C5A059] scale-75"
        }`}
      >
        {isHovered && (
          <span className="text-[9px] font-mono tracking-widest text-[#f7f5f0] uppercase font-semibold select-none">
            {cursorText || "VOIR"}
          </span>
        )}
      </div>
    </div>
  );
}
