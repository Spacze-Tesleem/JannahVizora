"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Minus, Plus } from "lucide-react";

// --- Data ---
const PHILOSOPHY = [
  {
    id: "01",
    title: "Visual Alchemy",
    description: "Transmuting abstract values into tangible assets. We take raw chaotic energy and refine it into a visual language that feels inevitable.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "Strategic Narrative",
    description: "Storytelling is not about words; it is about sequence. We structure the brand journey so every touchpoint is a chapter your client cannot put down.",
    image: "https://images.unsplash.com/photo-1507842217121-9e190df0ecbd?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "Human Resonance",
    description: "Data informs, but emotion moves. We bridge the gap between cold strategy and warm connection, designing strictly for the gut feeling.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function PremiumJannahAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Smooth scroll physics
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  // Parallax Transforms
  const yHero = useTransform(smoothProgress, [0, 0.2], [0, -100]);
  const opacityHero = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  
  return (
    <section ref={containerRef} className="relative w-full bg-[#030303] text-[#e0e0e0] selection:bg-white selection:text-black">
      
      {/* --- Global Grain Texture (The "Film" Look) --- */}
      {/* <div className="pointer-events-none absolute inset-0 z-50 opacity-[0.04] mix-blend-overlay">
        <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'>
          <filter id='noise'>
            <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch' />
          </filter>
          <rect width='100%' height='100%' filter='url(#noise)' />
        </svg>
      </div> */}

      {/* --- HERO SECTION --- */}
      <div className="relative flex min-h-[110vh] flex-col justify-center px-6 pt-32 pb-20 md:px-12 lg:pt-40">
        
        {/* Background Name (Parallax Depth) */}
        <motion.div 
            style={{ y: yHero, opacity: opacityHero }}
            className="absolute left-0 top-20 z-0 w-full overflow-hidden select-none pointer-events-none"
        >
            <h1 className="text-[18vw] leading-[0.8] font-serif text-[#111] whitespace-nowrap opacity-60">
                JANNAH VIZORA
            </h1>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            
            {/* Left: Introduction */}
            <div className="lg:col-span-7 flex flex-col gap-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4"
                >
                    <div className="h-px w-12 bg-amber-200/60" />
                    <span className="font-mono text-xs uppercase tracking-[0.3em] text-amber-100/80">The Architect</span>
                </motion.div>

                <motion.h2 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight"
                >
                    I don't just <br /> 
                    <span className="text-white/20">design brands.</span> <br />
                    I engineer <br />
                    <span className="italic text-amber-200/90">feelings.</span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="max-w-xl text-lg md:text-xl font-light text-white/60 leading-relaxed mt-4"
                >
                    <p>
                        In a world noisy with content, silence is a luxury. 
                        I bridge the gap between architectural precision and human psychology 
                        to build brands that command authority.
                    </p>
                </motion.div>
            </div>

            {/* Right: The Portrait (The "Monolith") */}
            <div className="lg:col-span-5 relative h-[60vh] lg:h-[80vh] w-full">
                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    viewport={{ once: true }}
                    className="relative h-full w-full overflow-hidden rounded-sm"
                >
                    {/* Decorative border lines */}
                    <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/10 z-20 pointer-events-none" />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-12 bg-white/20 z-20" />
                    
                    {/* Image */}
                    <Image
                        src="/Janaah.JPG"
                        alt="Jannah Vizora"
                        fill
                        className="object-cover"
                        priority
                    />
                    
                    {/* Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-black/20" />

                    {/* Floating Label */}
                    <div className="absolute bottom-10 left-0 w-full text-center z-30">
                        <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/5 px-4 py-2 rounded-full border border-white/10">
                            <Star className="w-3 h-3 text-amber-200" fill="currentColor" />
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/80">Est. 2024</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </div>


      {/* --- THE PHILOSOPHY (Interactive List) --- */}
      <div className="relative py-32 px-6 md:px-12 border-t border-white/5">
        
        <div className="grid lg:grid-cols-2 gap-20">
            {/* Left: Sticky Context */}
            <div className="relative hidden lg:block h-full">
                <div className="sticky top-32 space-y-8">
                     <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">
                         / The Methodology
                     </h3>
                     <h2 className="font-serif text-5xl leading-tight">
                         Where vision meets <br />
                         <span className="italic text-white/30">absolute precision.</span>
                     </h2>
                     <p className="max-w-md text-white/50 leading-relaxed">
                         My process is not linear; it is dimensional. We explore the 
                         past, present, and future of your industry to create a timeless construct.
                     </p>

                     {/* Signature */}
                     <div className="pt-12 opacity-50">
                        <svg width="200" height="60" viewBox="0 0 200 60" fill="none" className="text-white">
                            <path d="M10 40C30 40 40 10 70 30C100 50 120 10 150 30C180 50 190 20 190 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <text x="20" y="55" className="font-serif text-xs fill-current uppercase tracking-widest">J. Vizora</text>
                        </svg>
                     </div>
                </div>
            </div>

            {/* Right: The Accordion */}
            <div className="w-full">
                {PHILOSOPHY.map((item, index) => (
                    <PhilosophyItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}

// --- Sub-Component: Philosophy Accordion Item ---
function PhilosophyItem({ item, index }: { item: (typeof PHILOSOPHY)[0], index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="border-b border-white/10"
        >
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className="group py-10 cursor-pointer flex items-center justify-between"
            >
                <div className="flex items-baseline gap-6 md:gap-12">
                    <span className="font-mono text-sm text-white/30">0{index + 1}</span>
                    <h3 className={`font-serif text-3xl md:text-4xl transition-colors duration-300 ${isOpen ? "text-amber-100" : "text-white group-hover:text-white/80"}`}>
                        {item.title}
                    </h3>
                </div>
                <div className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-100" : "text-white/30"}`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-10 pl-0 md:pl-[4.5rem] grid md:grid-cols-2 gap-8">
                            <p className="text-lg text-white/60 font-light leading-relaxed">
                                {item.description}
                            </p>
                            <div className="relative h-40 w-full overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700">
                                <Image 
                                    src={item.image} 
                                    alt={item.title} 
                                    fill 
                                    className="object-cover" 
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}