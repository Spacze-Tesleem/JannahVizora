"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, Minus, Hash, MoveRight, Layers, Wind } from "lucide-react";

const SERVICES = [
  {
    id: "01",
    title: "Signature Branding",
    label: "Identity",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2000&auto=format&fit=crop",
    desc: "We construct brand identities that function as architectural monuments. Timeless, structurally sound, and visually silent.",
    specs: ["Core Identity", "Visual DNA", "Voice Protocol", "Motion Guidelines"],
    client: "Tier-1 Executives"
  },
  {
    id: "02",
    title: "Social Architecture",
    label: "Growth",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1afc3d400?q=80&w=2000&auto=format&fit=crop",
    desc: "Strategic signal calibration. We move your brand beyond the noise into a space of pure authority and retention.",
    specs: ["Content Narratives", "Signal Engineering", "Growth Logic", "Audience Blueprint"],
    client: "High-Growth Founders"
  },
  {
    id: "03",
    title: "Immersive Events",
    label: "Experience",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2000&auto=format&fit=crop",
    desc: "The physical manifestation of the digital brand. Designing moments that command instinctive awe and lasting memory.",
    specs: ["Event Direction", "VIP Activations", "Spatial Design", "Atmosphere Control"],
    client: "Luxury Households"
  },
];

export default function OrbitalAtelier() {
  const [active, setActive] = useState(0);

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SERVICES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative min-h-screen w-full bg-[#080808] text-zinc-100 flex flex-col items-center justify-center p-6 md:p-12 lg:p-20 overflow-hidden">
      
      {/* Background Decal */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none">
        <h1 className="text-[30vw] font-serif leading-none -translate-x-10 -translate-y-20 italic">
          ATELIER
        </h1>
      </div>

      {/* Main Layout Grid */}
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
        
        {/* --- LEFT: The Orbital Nav (2 Cols) --- */}
        <div className="lg:col-span-1 flex flex-row lg:flex-col items-center justify-center gap-8 order-2 lg:order-1">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative flex items-center justify-center"
            >
              <div className={`transition-all duration-700 ${active === i ? "h-16 w-[2px] bg-amber-500" : "h-8 w-[1px] bg-white/10 group-hover:bg-white/30"}`} />
              <span className={`absolute left-6 font-mono text-[10px] tracking-widest transition-all ${active === i ? "opacity-100 translate-x-0 text-amber-500" : "opacity-0 -translate-x-2"}`}>
                0{i + 1}
              </span>
            </button>
          ))}
        </div>

        {/* --- CENTER: The Visual Stack (6 Cols) --- */}
        <div className="lg:col-span-6 relative aspect-[4/5] perspective-1000 order-1 lg:order-2">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.8, z: -100, rotateY: -20 }}
              animate={{ opacity: 1, scale: 1, z: 0, rotateY: 0 }}
              exit={{ opacity: 0, scale: 1.1, z: 100, rotateY: 20 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5"
            >
              <Image
                src={SERVICES[active].image}
                alt={SERVICES[active].title}
                fill
                className="object-cover saturate-50 contrast-125"
                priority
              />
              {/* Glass Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
              <div className="absolute top-8 left-8 flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Layers size={14} className="text-amber-500" />
                <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Module_0{active + 1}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Depth Cards (Visual Decoration) */}
          <div className="absolute -bottom-6 -right-6 w-full h-full border border-white/5 rounded-2xl -z-10" />
          <div className="absolute -bottom-12 -right-12 w-full h-full border border-white/5 rounded-2xl -z-20 opacity-50" />
        </div>

        {/* --- RIGHT: The Dossier (5 Cols) --- */}
        <div className="lg:col-span-5 flex flex-col order-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <Hash className="text-amber-500" size={16} />
                <span className="font-mono text-xs uppercase tracking-[0.5em] text-zinc-500">
                  {SERVICES[active].label}
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-serif italic mb-8 tracking-tighter leading-none">
                {SERVICES[active].title}
              </h2>

              <p className="text-zinc-400 text-lg font-light leading-relaxed mb-12 max-w-md">
                {SERVICES[active].desc}
              </p>

              {/* Specification List */}
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4 border-b border-white/5 pb-2">
                   <Plus size={14} className="text-amber-500" />
                   <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Technical Specs</span>
                </div>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {SERVICES[active].specs.map((spec, i) => (
                    <motion.div 
                      key={spec}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="h-1 w-1 rounded-full bg-zinc-700" />
                      <span className="text-[11px] uppercase tracking-widest font-medium text-zinc-300">{spec}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-10">
                <button className="group flex items-center gap-4 px-8 py-4 bg-white text-black rounded-full font-mono text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-amber-500 transition-colors">
                  Inquire
                  <ArrowUpRight size={16} />
                </button>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">Target Client</span>
                  <span className="font-serif italic text-sm">{SERVICES[active].client}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Meta */}
      <footer className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
        <div className="flex items-center gap-6">
           <div className="flex flex-col">
              <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">System Status</span>
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                 <span className="text-[10px] font-mono">Synchronized</span>
              </div>
           </div>
        </div>

        <div className="hidden lg:flex items-center gap-4">
           <Wind size={20} className="text-zinc-800" />
           <div className="h-px w-32 bg-zinc-900" />
           <span className="font-mono text-[10px] text-zinc-800 uppercase tracking-[0.5em]">Jannah_Vizora_Studio</span>
        </div>

        <div className="flex items-center gap-8">
           <button 
             onClick={() => setActive((prev) => (prev === 0 ? SERVICES.length - 1 : prev - 1))}
             className="text-zinc-600 hover:text-white transition-colors"
           >
             <MoveRight className="rotate-180" size={24} />
           </button>
           <button 
             onClick={() => setActive((prev) => (prev + 1) % SERVICES.length)}
             className="text-zinc-600 hover:text-white transition-colors"
           >
             <MoveRight size={24} />
           </button>
        </div>
      </footer>

      {/* Global Style for Depth */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </main>
  );
}