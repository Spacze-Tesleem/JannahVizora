"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Play, Volume2, VolumeX, ArrowDownRight, Fingerprint, Command, ArrowRight } from "lucide-react";

// --- Sub-Components ---

const GhostText = ({ text }: { text: string }) => (
  <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
    <motion.h2 
      initial={{ opacity: 0, scale: 1.2 }}
      animate={{ opacity: 0.03, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
      className="text-[60vw] md:text-[40vw] font-serif font-bold italic text-white whitespace-nowrap"
    >
      {text}
    </motion.h2>
  </div>
);

const AudioWaves = ({ isActive }: { isActive: boolean }) => (
  <div className="flex items-center gap-[3px]">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[1.5px] bg-amber-400 rounded-full"
        animate={{ height: isActive ? [4, 16, 8, 12, 4] : 4 }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
      />
    ))}
  </div>
);

export default function LiquidMonographMobile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth spring for mobile performance
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const imageScale = useTransform(smoothProgress, [0, 1], [1, 1.3]);
  const imageY = useTransform(smoothProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "-40%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[150vh] bg-[#080808] text-[#FAF9F6] overflow-x-hidden font-sans"
    >
      {/* --- Cinematic Grain --- */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <GhostText text="VIZORA" />

      {/* --- Main Sticky Stage --- */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-0">
        <motion.div 
          style={{ scale: imageScale, y: imageY }}
          className="relative w-full max-w-[95vw] md:max-w-[90vw] aspect-[3/4] md:aspect-[2.39/1] rounded-2xl md:rounded-sm overflow-hidden z-10 shadow-2xl"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover saturate-0 hover:saturate-100 transition-all duration-[2s] brightness-[0.6] md:brightness-[0.7]"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
        </motion.div>

        {/* --- Content Overlay Layer --- */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 lg:p-20 pointer-events-none">
          
          {/* Top Bar */}
          <div className="flex justify-between mt-3 items-start w-full">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
              <span className="block font-mono text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-amber-400">Archive_025</span>
              <span className="block font-serif italic text-base md:text-lg">The 2024 Collection</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pointer-events-auto">
               <button 
                 onClick={toggleMute}
                 className="flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full"
               >
                 <span className="font-mono text-[8px] md:text-[9px] uppercase tracking-widest">Sound</span>
                 {isMuted ? <VolumeX size={12} className="opacity-40" /> : <AudioWaves isActive={true} />}
               </button>
            </motion.div>
          </div>

          {/* Center Title - Scaled for Mobile */}
          <motion.div style={{ y: textY, opacity }} className="text-center space-y-6 md:space-y-8">
            <h1 className="text-5xl md:text-9xl lg:text-[13rem] font-serif leading-[0.85] tracking-tighter uppercase italic">
              Sculpting <br />
              <span className="not-italic text-white">Silence.</span>
            </h1>
            
            <div className="flex flex-col items-center gap-4 md:gap-6">
               <p className="max-w-[280px] md:max-w-md mx-auto text-zinc-400 font-light text-sm md:text-xl leading-relaxed">
                  Specialized intelligence for high-growth brands and discerning figures.
               </p>
               <div className="h-12 md:h-20 w-[1px] bg-gradient-to-b from-amber-400 to-transparent" />
            </div>
          </motion.div>

          {/* Bottom Dock - Mobile Optimized */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-6 pointer-events-auto">
            <div className="flex items-center gap-6 md:gap-8">
               <button className="flex items-center gap-2 text-[9px] md:text-xs font-mono uppercase tracking-[0.3em] font-bold text-white/60 hover:text-white transition-colors">
                  <Fingerprint size={16} strokeWidth={1} className="text-amber-400" />
                  Manifesto
               </button>
               <button className="flex items-center gap-2 text-[9px] md:text-xs font-mono uppercase tracking-[0.3em] font-bold text-white/60 hover:text-white transition-colors">
                  <Command size={16} strokeWidth={1} className="text-amber-400" />
                  Protocols
               </button>
            </div>

            <div className="flex items-center gap-4">
                <span className="hidden md:block font-mono text-[9px] uppercase tracking-widest text-zinc-600">Available Worldwide</span>
                <button className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-amber-400 transition-all duration-500 shadow-xl">
                   <ArrowDownRight size={isDesktop ? 24 : 20} />
                </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Second Section --- */}
      <div className="relative z-30 bg-[#080808] px-6 md:px-20 py-24 md:py-40 border-t border-white/5">
         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-end">
            <div className="space-y-6 md:space-y-10">
               <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.5em] text-amber-400">Philosophy_01</span>
               <h2 className="text-4xl md:text-8xl font-serif tracking-tighter leading-[0.9] italic">
                 Architecture <br /> 
                 <span className="not-italic text-zinc-800">over noise.</span>
               </h2>
            </div>
            <div className="space-y-6 md:space-y-8">
               <p className="text-zinc-500 text-base md:text-xl font-light leading-relaxed max-w-lg">
                 We define luxury not by what we add, but by the chaos we remove. 
                 Every structural decision is engineered for instinctive authority.
               </p>
               <button className="flex items-center gap-4 group font-mono text-[10px] uppercase tracking-[0.4em] text-white">
                  View Dossier <ArrowRight size={14} className="group-hover:translate-x-2 transition-all" />
               </button>
            </div>
         </div>
      </div>
    </section>
  );
}