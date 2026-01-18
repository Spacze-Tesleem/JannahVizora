"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Command, MoveRight, Layers, Fingerprint, ChevronDown, Scan, Target, Activity } from "lucide-react";

// --- Data (Swap these images with your local project images) ---
const CAPABILITIES = [
  {
    id: "01",
    phase: "Digital Presence",
    title: "Presence Architecture",
    tag: "Intelligence_Unit",
    desc: "Engineering digital legacies through strategic positioning and content excellence. We refine the signal to ensure your authority is absolute.",
    // Replace with your image paths like "/Project/Project1.JPG"
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop", 
    services: ["Social Strategy", "Brand Audit", "Community Mgmt", "Bio Refinement", "Script Writing"],
    coords: "34.0522° N, 118.2437° W"
  },
  {
    id: "02",
    phase: "Event Scenography",
    title: "Grand Productions",
    tag: "Atmosphere_Ctrl",
    desc: "From corporate galas to intimate celebrations, we transform venues into vessels of experience through meticulous planning.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop",
    services: ["Corporate Galas", "Award Nights", "Venue Consultancy", "MC/DJ Talent", "Event Logistics"],
    coords: "51.5074° N, 0.1278° W"
  },
  {
    id: "03",
    phase: "Curated Moments",
    title: "Bespoke Alchemy",
    tag: "Custom_Curation",
    desc: "For moments too precious for templates. We craft hyper-personalized experiences that exist at the intersection of art and intimacy.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
    services: ["Surprise Setups", "Gift Packages", "Styled Picnics", "Sensory Experiences", "Private Dinners"],
    coords: "25.2048° N, 55.2708° E"
  }
];

export default function GlassPavilionServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll physics for that weighted "luxury" feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.001 });

  // Hero Title Animations
  const heroOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.12], [1, 0.9]);
  const heroBlur = useTransform(smoothProgress, [0, 0.1], ["blur(0px)", "blur(20px)"]);

  return (
    <main ref={containerRef} className="relative bg-[#030303] text-white selection:bg-amber-500 selection:text-black font-sans overflow-x-hidden">
      
      {/* --- GLOBAL CINEMATIC OVERLAYS --- */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* --- INTEGRATED HERO TITLE --- */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale, filter: heroBlur }}
        className="fixed inset-0 z-[60] flex flex-col items-center justify-center pointer-events-none px-6"
      >
        <div className="relative text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-6 mb-6"
          >
            <div className="h-px w-12 bg-amber-500/50" />
            <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-amber-500">Vizora Intelligence</span>
            <div className="h-px w-12 bg-amber-500/50" />
          </motion.div>

          <h1 className="text-6xl md:text-9xl lg:text-[13rem] font-serif leading-[0.8] tracking-tighter uppercase">
            Architecting <br />
            <span className="text-transparent stroke-text italic lowercase block mt-2">Presence.</span>
          </h1>

          <motion.div 
            animate={{ y: [0, 15, 0] }} 
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="pt-16 flex flex-col items-center gap-3 opacity-30"
          >
            <div className="w-px h-16 bg-gradient-to-b from-amber-500 to-transparent" />
            <span className="font-mono text-[8px] uppercase tracking-[0.4em]">Scroll Archive</span>
          </motion.div>
        </div>
      </motion.div>

      {/* --- FIXED BACKGROUND ENGINE --- */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-black">
        {CAPABILITIES.map((item, i) => {
          const start = i / CAPABILITIES.length;
          const end = (i + 1) / CAPABILITIES.length;
          
          // Image logic: First image is clear at 0, others fade in as you go
          const opacity = useTransform(smoothProgress, 
            [start - 0.1, start, end - 0.1, end], 
            [0, 1, 1, 0]
          );
          const scale = useTransform(smoothProgress, [start, end], [1.1, 1.3]);
          const imageBlur = useTransform(smoothProgress, [start, end], ["blur(0px)", "blur(10px)"]);

          return (
            <motion.div key={item.id} style={{ opacity, scale, filter: imageBlur }} className="absolute inset-0">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover saturate-[0.2] brightness-[0.35]" 
                priority={i === 0} 
              />
              {/* Vignette & Depth Gradients */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
            </motion.div>
          );
        })}
      </div>

      {/* --- FIXED VIEWPORT HUD --- */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <motion.div 
          style={{ 
            inset: useTransform(smoothProgress, [0, 0.08], ["0rem", "2.5rem"]),
            borderRadius: useTransform(smoothProgress, [0, 0.08], ["0rem", "3rem"]),
            opacity: useTransform(smoothProgress, [0, 0.05], [0, 1])
          }}
          className="absolute border border-white/5 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" 
        />
        
        {/* Telemetry Elements */}
        <div className="absolute top-14 left-14 hidden md:flex flex-col gap-2">
           <div className="flex items-center gap-3">
              <Scan size={12} className="text-amber-500" />
              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/40">Visual_Scan_Active</span>
           </div>
           <div className="h-px w-20 bg-white/10" />
        </div>

        <div className="absolute bottom-14 right-14 hidden md:flex items-center gap-4">
           <Activity size={12} className="text-emerald-500 animate-pulse" />
           <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500">System_Node: Stable</span>
        </div>
      </div>

      {/* --- CONTENT MODULES --- */}
      <div className="relative z-10">
        {CAPABILITIES.map((item, i) => (
          <Section key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* --- FOOTER CTA --- */}
      <section className="relative z-10 h-screen flex flex-col items-center justify-center bg-[#030303]/95 backdrop-blur-3xl">
         <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="text-center space-y-12">
            <Fingerprint size={50} strokeWidth={1} className="text-amber-500 mx-auto opacity-50" />
            <h2 className="text-7xl md:text-9xl font-serif tracking-tighter italic">Bespoke.</h2>
            <button className="group flex items-center gap-6 mx-auto px-16 py-6 bg-white text-black rounded-full hover:bg-amber-500 transition-all font-mono text-[10px] uppercase tracking-[0.4em] font-bold shadow-2xl">
               Initiate Engagement <MoveRight size={18} />
            </button>
         </motion.div>
      </section>

      <style jsx>{`
        .stroke-text { -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15); }
        @media (max-width: 768px) { .stroke-text { -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25); } }
      `}</style>
    </main>
  );
}

function Section({ item, index }: { item: any, index: number }) {
  return (
    <section className="relative h-screen flex items-center justify-center px-6 md:px-24">
      <div className="max-w-[1600px] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-6 space-y-8">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ duration: 1 }}
           >
              <div className="flex items-center gap-6 mb-6">
                 <div className="h-[2px] w-12 bg-amber-500" />
                 <span className="font-mono text-[10px] text-amber-500 tracking-[0.5em] uppercase">{item.phase}</span>
              </div>
              <h3 className="text-6xl md:text-8xl lg:text-[7.5rem] font-serif leading-[0.85] tracking-tighter uppercase mb-8">
                {item.title.split(" ")[0]} <br />
                <span className="text-transparent stroke-text italic lowercase block mt-2">{item.title.split(" ")[1]}</span>
              </h3>
              <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-md border-l border-white/5 pl-8">
                {item.desc}
              </p>
           </motion.div>
        </div>

        {/* Right Column: Glass Dossier */}
        <div className="lg:col-span-6">
           <motion.div
             initial={{ opacity: 0, y: 50, scale: 0.95 }}
             whileInView={{ opacity: 1, y: 0, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="relative p-10 md:p-14 rounded-[3.5rem] bg-white/[0.01] border border-white/10 backdrop-blur-3xl overflow-hidden group shadow-2xl"
           >
              <div className="relative z-10 space-y-10">
                <div className="flex justify-between items-center text-[10px] font-mono text-zinc-600 tracking-widest">
                   <div className="flex items-center gap-2">
                      <Target size={14} className="text-amber-500/50" />
                      <span>{item.tag}</span>
                   </div>
                   <span>MODULE_S0{index+1}</span>
                </div>

                <div className="space-y-4">
                   <div className="h-px w-full bg-white/5" />
                   <div className="grid grid-cols-1 gap-5">
                      {item.services.map((service: string, i: number) => (
                        <div key={service} className="flex items-center justify-between group/item">
                           <div className="flex items-center gap-5">
                              <div className="h-1 w-1 rounded-full bg-amber-500/40 group-hover/item:bg-amber-500 transition-colors" />
                              <span className="text-sm font-light text-zinc-300 group-hover/item:text-white transition-colors">{service}</span>
                           </div>
                           <MoveRight size={14} className="text-zinc-800 group-hover/item:text-amber-500 group-hover/item:translate-x-2 transition-all" />
                        </div>
                      ))}
                   </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => <div key={i} className="h-8 w-8 rounded-full border border-black bg-zinc-800" />)}
                  </div>
                  <button className="text-[10px] font-mono uppercase tracking-[0.4em] text-amber-500 flex items-center gap-3">
                    Inquire <MoveRight size={16} />
                  </button>
                </div>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}