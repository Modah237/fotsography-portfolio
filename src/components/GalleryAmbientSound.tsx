"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function GalleryAmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);

  const startSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain Node for smooth fade-in
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3); // Very low, comfortable ambient volume
      gainNodeRef.current = masterGain;

      // Warm Low Harmonic (108 Hz - Fundamental)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(108, ctx.currentTime);

      // Fifth Harmonic Warmth (162 Hz)
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(162, ctx.currentTime);

      // Lowpass Filter for soft gallery room acoustic
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1Ref.current = osc1;
      osc2Ref.current = osc2;

      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const stopSound = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      try {
        const ctx = audioCtxRef.current;
        gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);
        setTimeout(() => {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          ctx.close();
          setIsPlaying(false);
        }, 800);
      } catch {
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(false);
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopSound();
    } else {
      startSound();
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <button
        onClick={toggleSound}
        className={`liquid-pill px-4 py-2.5 rounded-full flex items-center gap-2.5 border transition-all cursor-pointer shadow-xl ${
          isPlaying
            ? "border-[#C5A059] bg-[#C5A059]/15 text-white"
            : "border-white/10 hover:border-white/30 text-[#9c978f] hover:text-white"
        }`}
        title={isPlaying ? "Couper l'ambiance sonore d'exposition" : "Activer l'atmosphère acoustique de galerie"}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 text-[#C5A059] shrink-0" />
            <div className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 bg-[#C5A059] h-full animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 bg-[#C5A059] h-2/3 animate-[pulse_1.2s_ease-in-out_infinite]" />
              <span className="w-0.5 bg-[#C5A059] h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#C5A059]">
              Ambiance Galerie
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-[#9c978f] shrink-0" />
            <span className="text-[10px] font-mono uppercase tracking-wider">
              Ambiance Sonore
            </span>
          </>
        )}
      </button>
    </div>
  );
}
