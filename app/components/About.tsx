"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, Globe, Maximize2, Layers, Command } from "lucide-react";

const SECTIONS = [
  {
    id: "01",
    label: "ARCHITECT",
    title: "Curating The Void",
    image: "/Project/Project1.JPG",
    desc: "A structural approach to brand identity. We build foundations that withstand the weight of time and the noise of trends.",
    coord: "LAT 34.05 / LON -118.24"
  },
  {
    id: "02",
    label: "VISION",
    title: "Retention Economy",
    image: "/Project/Project4.jpg",
    desc: "In an age of distraction, luxury is defined by the ability to hold space. We create visual silence that commands attention.",
    coord: "LAT 25.20 / LON 55.27"
  },
  {
    id: "03",
    label: "MAGIC",
    title: "Visual Alchemy",
    image: "/Project/Project5.jpg",
    desc: "Translating complex narratives into singular, iconic moments. We don't just design; we perform strategic sorcery.",
    coord: "LAT 51.50 / LON -0.12"
  },
];

export default function KineticGallery() {
  const [active, setActive] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({ 
      x: (clientX / window.innerWidth - 0.5) * 20, 
      y: (clientY / window.innerHeight - 0.5) * 20 
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % SECTIONS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full bg-[#030303] text-white overflow-hidden flex items-center justify-center font-sans"
    >
      {/* --- Ambient Background Layer --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(20,20,20,1)_0%,rgba(0,0,0,1)_100%)]" />
        
        {/* Ghost Numbering */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={active}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.05, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 flex items-center justify-center text-[60vw] font-bold leading-none select-none"
          >
            {SECTIONS[active].id}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* --- Main Interactive Stage --- */}
      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col lg:flex-row items-center justify-between p-6 lg:p-12">
        
        {/* Left Info Panel */}
        <div className="w-full lg:w-1/3 z-20 order-2 lg:order-1 mt-8 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-amber-500" />
                <span className="font-mono text-[10px] tracking-[0.5em] text-amber-500 uppercase">
                  Current Session // {SECTIONS[active].id}
                </span>
              </div>

              <h2 className="text-5xl lg:text-7xl font-light tracking-tighter mb-6 leading-tight">
                {SECTIONS[active].title.split(" ").map((word, i) => (
                  <span key={i} className={i === 1 ? "block italic font-serif" : "block"}>
                    {word}
                  </span>
                ))}
              </h2>

              <p className="text-zinc-400 text-sm lg:text-base leading-relaxed max-w-sm mb-10">
                {SECTIONS[active].desc}
              </p>

              <div className="flex items-center gap-8">
                <button className="flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase py-3 px-6 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-500">
                  Execute Detail <MoveRight size={14} />
                </button>
                <div className="text-zinc-600 font-mono text-[9px] uppercase tracking-tighter">
                  {SECTIONS[active].coord}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center Kinetic Hero */}
        <div className="relative w-full lg:w-[45%] aspect-[4/5] lg:h-[70vh] order-1 lg:order-2">
          {/* Glass Frame HUD */}
          <motion.div 
            style={{ x: mousePos.x, y: mousePos.y }}
            className="absolute inset-[-20px] border border-white/5 rounded-3xl z-30 pointer-events-none flex items-start justify-end p-8"
          >
             <div className="flex flex-col gap-4 opacity-20">
                <Globe size={16} />
                <Maximize2 size={16} />
                <Layers size={16} />
             </div>
          </motion.div>

          {/* Image Container */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={SECTIONS[active].image}
                  alt={SECTIONS[active].title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </motion.div>
            </AnimatePresence>
            
            {/* Viewport Corner Elements */}
            <div className="absolute top-4 left-4 z-40 bg-black/40 backdrop-blur-md px-3 py-1 rounded border border-white/10">
              <span className="font-mono text-[9px] tracking-widest uppercase">Live View</span>
            </div>
            <div className="absolute bottom-4 right-4 z-40 flex gap-1">
               {[0, 1, 2].map((i) => (
                 <div key={i} className={`h-1 w-4 rounded-full ${active === i ? "bg-amber-500" : "bg-white/20"}`} />
               ))}
            </div>
          </div>
        </div>

        {/* Right Nav Rail */}
        <div className="hidden lg:flex flex-col justify-center gap-12 order-3 ml-12">
           {SECTIONS.map((item, i) => (
             <button
               key={item.id}
               onClick={() => setActive(i)}
               className="group relative flex items-center justify-center"
             >
                <span className={`absolute right-full mr-6 font-mono text-[10px] tracking-widest transition-all ${active === i ? "text-white opacity-100" : "text-white/20 opacity-0 group-hover:opacity-100"}`}>
                  {item.label}
                </span>
                <div className={`relative h-12 w-[2px] transition-all duration-500 ${active === i ? "bg-amber-500 h-16" : "bg-white/10 group-hover:bg-white/30"}`}>
                  {active === i && (
                    <motion.div 
                      layoutId="rail-active"
                      className="absolute inset-0 bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                    />
                  )}
                </div>
             </button>
           ))}
        </div>
      </div>

      {/* --- Bottom Navigation / Metadata --- */}
      <footer className="absolute bottom-0 left-0 w-full p-6 lg:p-12 flex justify-between items-end z-40">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            <Command size={12} className="text-amber-500" />
            <span>Navigation: Click to Focus</span>
          </div>
        </div>

        <div className="flex gap-4">
           {/* Mobile Next Button */}
           <button 
             onClick={() => setActive((prev) => (prev + 1) % SECTIONS.length)}
             className="lg:hidden h-14 w-14 rounded-full border border-white/20 flex items-center justify-center"
           >
              <MoveRight />
           </button>
        </div>

        <div className="hidden lg:block text-right">
           <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em] mb-1">Status</div>
           <div className="text-xs uppercase font-medium">System Online — 24.0 FPS</div>
        </div>
      </footer>
    </main>
  );
}