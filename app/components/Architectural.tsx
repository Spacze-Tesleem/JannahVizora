"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { MoveUpRight, Info, Scan, Maximize2 } from "lucide-react";

const PROJECTS = [
  {
    id: "01",
    title: "Wedding Settings",
    location: "Ilorin, Kwara State",
    service: "Architecture",
    year: "2023",
    image: "/Project/Project0.JPG",
  },
  {
    id: "02",
    title: "The Silent Void",
    location: "Reykjavík, Iceland",
    service: "Interior",
    year: "2024",
    image: "/Project/Project1.JPG",
  },
  {
    id: "03",
    title: "Aeon Museum",
    location: "Berlin, Germany",
    service: "Cultural",
    year: "2022",
    image: "/Project/Project2.JPG",
  },
  {
    id: "04",
    title: "Vertex Residence",
    location: "Los Angeles, USA",
    service: "Residential",
    year: "2023",
    image: "/Project/Project3.jpg",
  },
  {
    id: "05",
    title: "Carbon Shelter",
    location: "Swiss Alps",
    service: "Concept",
    year: "2025",
    image: "/Project/Project5.jpg",
  },
];

export default function ArchitecturalProjectIndex() {
  const [activeProject, setActiveProject] = useState<{
    isActive: boolean;
    index: number;
  }>({ isActive: false, index: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // --- Physics-based Cursor Tracking ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top } = containerRef.current.getBoundingClientRect();
    
    // Offset so image is centered on cursor
    mouseX.set(clientX - left - 225); // 225 is half of 450px width
    mouseY.set(clientY - top - 150);  // 150 is half of 300px height
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#050505] text-zinc-100 selection:bg-amber-500/30 overflow-hidden font-sans"
    >
      {/* --- Drafting Background --- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Fine Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Grain */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-amber-500/5 blur-[120px] rounded-full" />
      </div>

      {/* --- Floating Visual Lens (Desktop Only) --- */}
      <motion.div
        style={{ left: smoothX, top: smoothY }}
        animate={{
          opacity: activeProject.isActive ? 1 : 0,
          scale: activeProject.isActive ? 1 : 0.8,
          rotate: activeProject.isActive ? 0 : -2,
        }}
        className="pointer-events-none absolute z-40 hidden md:block w-[450px] h-[300px]"
      >
        <div className="relative h-full w-full p-2 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-sm shadow-2xl">
          <div className="relative h-full w-full overflow-hidden bg-black">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeProject.index}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src={PROJECTS[activeProject.index].image}
                  alt="Project Preview"
                  fill
                  className="object-cover saturate-50 contrast-125"
                />
              </motion.div>
            </AnimatePresence>

            {/* Lens HUD Elements */}
            <div className="absolute top-3 left-3 flex items-center gap-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded border border-white/10">
              <Scan className="h-3 w-3 text-amber-500" />
              <span className="font-mono text-[9px] uppercase tracking-widest">Preview Mode</span>
            </div>
            
            <div className="absolute bottom-3 right-3">
              <div className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center">
                <Maximize2 size={14} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Scanning Line Effect */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[1px] bg-amber-500/50 z-50 shadow-[0_0_15px_rgba(245,158,11,0.5)]" 
        />
      </motion.div>

      {/* --- Main Interface --- */}
      <div className="relative z-10 flex flex-col px-6 py-12 md:px-16 lg:px-24">
        
        {/* Header Section */}
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                Project Index / Portfolio v2
              </span>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.8] tracking-tighter">
              Selected <br /> <span className="italic text-zinc-400">Works</span>
            </h1>
          </div>
          
          <div className="max-w-xs text-right">
             <p className="font-mono text-[10px] text-zinc-500 uppercase leading-relaxed mb-4">
               A curation of structures built between 2022 and 2025. Focused on the intersection of brutalism and human necessity.
             </p>
             <div className="flex justify-end gap-2">
               <span className="px-3 py-1 rounded-full border border-white/10 text-[9px] uppercase font-mono tracking-widest">Global Archive</span>
               <span className="px-3 py-1 rounded-full bg-white text-black text-[9px] uppercase font-mono tracking-widest font-bold">Inquiry</span>
             </div>
          </div>
        </header>

        {/* Index Table */}
        <div className="w-full">
          {/* Table Head */}
          <div className="hidden md:grid grid-cols-12 border-b border-white/5 pb-6 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">
            <div className="col-span-1">Ref.</div>
            <div className="col-span-6">Project Nomenclature</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Typology</div>
            <div className="col-span-1 text-right">Phase</div>
          </div>

          {/* Table Body */}
          <div 
            className="group/list divide-y divide-white/5"
            onMouseLeave={() => setActiveProject({ isActive: false, index: 0 })}
          >
            {PROJECTS.map((project, index) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                onHover={() => setActiveProject({ isActive: true, index })}
              />
            ))}
          </div>
        </div>

        {/* Footer Meta */}
        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30">
          <div className="flex gap-12 font-mono text-[10px] uppercase tracking-widest">
            <div>© 2024 Vizora</div>
            <div>34.0522° N, 118.2437° W</div>
          </div>
          <div className="flex gap-4 items-center">
            <Info size={14} />
            <span className="font-mono text-[10px] uppercase tracking-widest">Scroll to explore archive</span>
          </div>
        </footer>
      </div>
    </section>
  );
}

// --- Row Component ---
function ProjectRow({
  project,
  index,
  onHover,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  onHover: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="group/row relative grid grid-cols-1 md:grid-cols-12 items-center py-8 md:py-16 cursor-pointer transition-all duration-700"
    >
      {/* Mobile Image (Inline) */}
      <div className="md:hidden w-full h-48 mb-6 overflow-hidden rounded-sm relative grayscale hover:grayscale-0 transition-all">
          <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>

      {/* Row Contents */}
      <div className="col-span-1 hidden md:block font-mono text-xs text-zinc-700 group-hover/row:text-amber-500 transition-colors">
        [{project.id}]
      </div>

      <div className="col-span-6 relative overflow-hidden">
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter transition-all duration-700 group-hover/row:translate-x-4">
          <span className="block group-hover/row:italic group-hover/row:text-amber-500 transition-all">
            {project.title}
          </span>
        </h2>
      </div>

      <div className="col-span-2 hidden md:block font-mono text-[10px] uppercase tracking-widest text-zinc-500 group-hover/row:text-zinc-300">
        {project.location}
      </div>

      <div className="col-span-2 hidden md:block">
        <span className="px-4 py-2 rounded-full border border-white/5 font-mono text-[9px] uppercase tracking-[0.2em] group-hover/row:border-amber-500/30 group-hover/row:text-amber-500 transition-colors">
          {project.service}
        </span>
      </div>

      <div className="col-span-1 flex justify-end items-center gap-4">
        <span className="font-mono text-xs text-zinc-600">'{project.year.slice(-2)}</span>
        <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-500 translate-x-4 group-hover/row:translate-x-0 bg-white text-black">
          <MoveUpRight size={18} />
        </div>
      </div>

      {/* Background Hover Stripe */}
      <div className="absolute inset-x-[-100vw] inset-y-0 -z-10 bg-white/[0.02] opacity-0 group-hover/row:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}