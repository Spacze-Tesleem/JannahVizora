"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, MotionValue } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

const AboutArchitectural = () => {
  const containerRef = useRef(null);
  
  // Track scroll for the image parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={containerRef} className="relative bg-[#EAEAEA] text-[#111] min-h-screen">
      
      <div className="container mx-auto px-4 md:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* --- LEFT: Sticky Image Column --- */}
          <div className="lg:col-span-5 relative h-fit lg:h-[calc(100vh-8rem)] lg:sticky lg:top-16">
            <div className="relative w-full h-[60vh] lg:h-full overflow-hidden rounded-sm">
              <motion.div style={{ scale }} className="w-full h-full relative">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop"
                  alt="Jannah Vizora Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              
              {/* Overlay Gradient for text readability if needed, or purely aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

              {/* Minimal Badge */}
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-mono text-xs uppercase tracking-widest mb-1 opacity-80">Est. 2024</p>
                <p className="font-serif text-3xl">Jannah V.</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Scrollable Content --- */}
          <div className="lg:col-span-7 flex flex-col justify-center py-10 lg:py-20 space-y-24">
            
            {/* Header Section */}
            <div>
              <RevealText>
                <span className="block font-mono text-xs text-[#666] uppercase tracking-[0.3em] mb-6">
                  The Philosophy
                </span>
              </RevealText>
              
              <h2 className="text-5xl md:text-7xl font-serif leading-[0.95] tracking-tight mb-10">
                <RevealText>We don't chase</RevealText>
                <RevealText>
                  trends. We <span className="italic font-light text-[#777]">set</span>
                </RevealText>
                <RevealText>the standard.</RevealText>
              </h2>

              <div className="flex flex-col md:flex-row gap-8 md:gap-16 border-t border-[#ccc] pt-8">
                <div className="w-full md:w-1/3">
                  <p className="font-mono text-xs uppercase text-[#666]">Who I Am</p>
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-xl md:text-2xl font-light leading-relaxed text-[#333]">
                    I’m Jannah. I built this brand on a single premise: <strong className="font-medium text-black">Precision</strong>. 
                    In a noisy digital age, clarity is the ultimate luxury. My work bridges the gap between raw creative intuition and strategic execution.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive List Section (Replaces Cards) */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-4 h-4 text-[#111]" fill="currentColor" />
                <span className="font-mono text-xs uppercase tracking-widest">Core Pillars</span>
              </div>

              <div className="border-t border-black">
                <ListItem 
                  number="01" 
                  title="Identity Design" 
                  desc="Unearthing the authentic story only you can tell." 
                />
                <ListItem 
                  number="02" 
                  title="Strategic Impact" 
                  desc="Intentional moves designed for real ROI." 
                />
                <ListItem 
                  number="03" 
                  title="Curated Events" 
                  desc="Environments that feel like magic." 
                />
              </div>
            </div>

            {/* Signature / Outro */}
            <div className="relative pt-10">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: "100px" }}
                 transition={{ duration: 1, ease: "circOut" }}
                 className="h-[2px] bg-black mb-6"
               />
               <p className="font-serif italic text-2xl text-[#444]">
                 "Style is a way to say who you are without having to speak."
               </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

/* --- Helpers --- */

// 1. Text Reveal Animation (Masking effect)
const RevealText = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative overflow-hidden inline-block align-bottom">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }} // smooth cubic-bezier
      >
        {children}
      </motion.div>
    </div>
  );
};

// 2. Minimalist List Item
const ListItem = ({ number, title, desc }: { number: string, title: string, desc: string }) => {
  return (
    <motion.div 
      initial="initial"
      whileHover="hover"
      className="group border-b border-[#ccc] py-8 cursor-pointer relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 z-10 relative transition-colors duration-300 group-hover:text-white">
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-xs opacity-50">{number}</span>
          <h3 className="text-3xl md:text-4xl font-serif">{title}</h3>
        </div>
        <div className="flex items-center gap-4 md:w-1/2 justify-between">
          <p className="text-sm opacity-70 max-w-[250px] leading-relaxed hidden md:block">{desc}</p>
          <motion.div 
            variants={{
              initial: { x: 0, rotate: 0 },
              hover: { x: 10, rotate: -45 }
            }}
          >
            <ArrowRight className="w-6 h-6" />
          </motion.div>
        </div>
      </div>

      {/* Hover Background Fill */}
      <motion.div 
        variants={{
          initial: { scaleY: 0 },
          hover: { scaleY: 1 }
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#1a1a1a] origin-bottom z-0"
      />
    </motion.div>
  );
};

export default AboutArchitectural;