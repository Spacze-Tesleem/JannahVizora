"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Hexagon, Aperture, CircleDashed, Plus } from "lucide-react";

// --- The Content ---
const SECTIONS = [
  {
    id: "01",
    label: "The Architect",
    sub: "Identity",
    // Vertical Portrait: Founder looking slightly to the left or center
    image: "/Project/Project1.JPG", 
    title: "Curating the Void",
    tags: ["Strategy", "Brutalism"],
    desc: (
      <>
        I operate at the intersection of <span className="text-amber-200">brutalism and elegance</span>. Brands are physical structures requiring a foundation of strategy and a facade of visual silence.
      </>
    )
  },
  {
    id: "02",
    label: "The Vision",
    sub: "Philosophy",
    // Vertical Portrait: Architectural or Founder in a space
    image: "/Project/Project4.jpg", 
    title: "Retention Economy",
    tags: ["Psychology", "Silence"],
    desc: (
      <>
        We live in an economy of attention, but I am interested in the <span className="text-amber-200">economy of retention</span>. Luxury is the absence of noise.
      </>
    )
  },
  {
    id: "03",
    label: "The Magic",
    sub: "Process",
    // Vertical Portrait: Creative/Action shot
    image: "/Project/Project5.jpg", 
    title: "Strategic Sorcery",
    tags: ["Translation", "Authority"],
    desc: (
      <>
        They buy the magician, not the magic. I take your chaos and translate it into a visual language that commands instinctive authority.
      </>
    )
  },
];

export default function JannahPremiumPortrait() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeContent = SECTIONS[activeIdx];

  // Optional: Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SECTIONS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[900px] lg:h-screen w-full bg-[#030303] text-white overflow-hidden flex items-center justify-center font-sans selection:bg-amber-200 selection:text-black">
      
      {/* --- Ambient Background (Blurred Reflection) --- */}
      <div className="absolute inset-0 z-0">
         <AnimatePresence mode="popLayout">
            <motion.div
                key={activeContent.image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
            >
                <Image
                    src={activeContent.image}
                    alt="Ambience"
                    fill
                    className="object-cover blur-[120px] saturate-150"
                />
            </motion.div>
         </AnimatePresence>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
         <div className="absolute inset-0 bg-[#030303]/90" />
      </div>

      {/* --- Main Interface Container --- */}
      <div className="relative z-10 w-full h-full max-w-[1800px] p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        
        {/* --- LEFT PANEL: Navigation (Narrower: 3 Cols) --- */}
        <div className="lg:col-span-3 flex flex-col h-full justify-between py-4 lg:py-8">
            
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="h-8 w-8 flex items-center justify-center border border-white/20 rounded bg-white/5">
                    <Hexagon className="h-4 w-4 text-amber-200" />
                </div>
                <span className="font-serif text-xl tracking-tight">Jannah Vizora</span>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-1">
                {SECTIONS.map((section, idx) => {
                    const isActive = activeIdx === idx;
                    return (
                        <button 
                            key={section.id}
                            onClick={() => setActiveIdx(idx)}
                            className={`group relative flex items-center justify-between p-4 border-l-2 transition-all duration-300 ${isActive ? "border-amber-200 bg-white/5" : "border-white/10 hover:border-white/30 hover:bg-white/[0.02]"}`}
                        >
                            <div className="flex flex-col items-start">
                                <span className={`font-mono text-[9px] uppercase tracking-widest ${isActive ? "text-amber-200" : "text-white/30"}`}>
                                    {section.id}
                                </span>
                                <span className={`font-serif text-lg ${isActive ? "text-white" : "text-white/50"}`}>
                                    {section.label}
                                </span>
                            </div>
                            {isActive && <CircleDashed className="h-4 w-4 text-amber-200 animate-spin-slow" />}
                        </button>
                    )
                })}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-2 opacity-40">
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]">System: Online</span>
                <span className="h-px w-full bg-white/50" />
                <span className="font-mono text-[9px] uppercase">Los Angeles &bull; London</span>
            </div>
        </div>


        {/* --- RIGHT PANEL: The Viewport (Wider: 9 Cols) --- */}
        <div className="lg:col-span-9 relative h-full w-full rounded-sm overflow-hidden bg-[#080808] border border-white/10 shadow-2xl">
            
            {/* 1. THE IMAGE (Full Coverage) */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="popLayout" custom={activeIdx}>
                    <motion.div
                        key={activeContent.image}
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.05, opacity: 0 }}
                        transition={{ duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
                        className="h-full w-full relative"
                    >
                         <Image
                            src={activeContent.image}
                            alt={activeContent.title}
                            fill
                            className="object-cover object-center lg:object-[center_20%]" // Anchors image to ensure face is visible
                            priority
                        />
                        {/* 2. Gradient Overlay (Left-to-Right) */}
                        {/* This fades the left side to black so text is readable, but leaves right side clear for image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 3. THE GLASS CONTENT (Sidebar on the Left) */}
            {/* Creates a distinct column for text, leaving right side open for the founder */}
            <div className="absolute top-0 left-0 bottom-0 w-full md:w-[480px] z-20 flex flex-col justify-center p-8 md:p-12 border-r border-white/5 bg-black/10 backdrop-blur-[2px]">
                
                {/* Decorative Grid Lines */}
                <div className="absolute top-0 left-8 h-full w-px bg-white/5 pointer-events-none" />
                <div className="absolute top-8 left-0 w-full h-px bg-white/5 pointer-events-none" />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeContent.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative z-10"
                    >
                        {/* Tags */}
                        <div className="flex gap-2 mb-6 ml-6">
                            {activeContent.tags.map((tag, i) => (
                                <span key={tag} className="px-2 py-1 text-[9px] uppercase tracking-widest border border-white/20 text-white/60">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title */}
                        <h1 className="font-serif text-5xl md:text-6xl text-white mb-6 leading-[0.9] ml-6">
                            {activeContent.title}
                        </h1>

                        {/* Description with border accent */}
                        <div className="border-l border-amber-200/50 pl-6 ml-6">
                            <p className="font-light text-white/80 text-sm md:text-base leading-relaxed max-w-sm">
                                {activeContent.desc}
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="mt-10 ml-6">
                            <button className="group flex items-center gap-3 px-5 py-3 bg-white text-black hover:bg-amber-200 transition-colors duration-300">
                                <span className="font-mono text-[10px] uppercase tracking-widest">Read Dossier</span>
                                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </button>
                        </div>

                    </motion.div>
                </AnimatePresence>

                {/* Bottom decorative numbers */}
                <div className="absolute bottom-8 left-12 flex gap-4 text-[10px] text-white/30 font-mono">
                    <span>COORD: 34.052</span>
                    <span>ISO: 400</span>
                    <span>EXP: +0.2</span>
                </div>
            </div>

            {/* 4. HUD DECORATIONS (Floating on the image side) */}
            <div className="absolute top-8 right-8 z-20 mix-blend-difference">
                 <Aperture className="h-6 w-6 text-white/50 animate-spin-slow" />
            </div>
            
            <div className="absolute bottom-8 right-8 z-20 flex flex-col items-end gap-1 pointer-events-none">
                 <Plus className="h-4 w-4 text-amber-200" />
                 <span className="font-mono text-[10px] text-amber-200 uppercase tracking-widest">Target Acquired</span>
            </div>

        </div>

      </div>
    </section>
  );
}