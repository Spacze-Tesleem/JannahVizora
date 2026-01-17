"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Disc, Target, Layers, Radio, Sparkles, Diamond, Crown } from "lucide-react";

// --- Service Data ---
const SERVICES = [
  {
    id: "01",
    title: "Personal Branding",
    tagline: "The Signature",
    icon: <Crown className="h-6 w-6" />,
    image: "/Project/Project3.jpg",
    description: "We don't just build a reputation; we construct a legacy. For those who need their digital presence to match their physical influence.",
    includes: ["Identity Systems", "Visual Direction", "Positioning Strategy", "Executive Presence"],
    for: "CEOs, Founders, & Public Figures",
    stats: { projects: "150+", satisfaction: "99%", years: "12+" },
  },
  {
    id: "02",
    title: "Social Strategy",
    tagline: "The Broadcast",
    icon: <Radio className="h-6 w-6" />,
    image: "/Project/Project10.jpg",
    description: "Moving beyond 'posting' into 'broadcasting.' We curate the signal within the noise to ensure your authority is unquestioned.",
    includes: ["Content Strategy", "Growth Roadmap", "Brand Voice Calibration", "Analytics Suite"],
    for: "High-Growth Brands & Leaders",
    stats: { reach: "50M+", engagement: "8.5%", campaigns: "200+" },
  },
  {
    id: "03",
    title: "Events & Experience",
    tagline: "The Atmosphere",
    icon: <Layers className="h-6 w-6" />,
    image: "/Project/Project28.jpg",
    description: "Translating the digital brand into a physical reality. We design moments that linger in the memory long after the guests leave.",
    includes: ["Event Concept", "Activations", "Creative Direction", "VIP Experiences"],
    for: "Luxury Launches & Exclusives",
    stats: { events: "75+", guests: "100K+", locations: "30+" },
  },
];

// --- Floating Particles Component ---
const FloatingParticles = () => {
  const [particles, setParticles] = useState<{x: string; y: string; scale: number; duration: number; delay: number}[]>([]);

  useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-amber-200/20 rounded-full"
          initial={{
            x: particle.x,
            y: particle.y,
            scale: particle.scale,
          }}
          animate={{
            y: [null, "-20%", "120%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// --- Magnetic Button Component ---
const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// --- Glowing Orb Component ---
const GlowingOrb = ({ active }: { active: boolean }) => (
  <motion.div
    animate={{
      scale: active ? [1, 1.2, 1] : 1,
      opacity: active ? 1 : 0.3,
    }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="absolute -right-32 -top-32 w-64 h-64 bg-gradient-radial from-amber-200/10 via-amber-200/5 to-transparent rounded-full blur-3xl pointer-events-none"
  />
);

// --- Progress Indicator ---
const ProgressIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2">
    {[...Array(total)].map((_, i) => (
      <motion.div
        key={i}
        className="relative h-[2px] overflow-hidden"
        initial={{ width: 20 }}
        animate={{ width: current === i ? 40 : 20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="absolute inset-0 bg-white/10" />
        <motion.div
          className="absolute inset-0 bg-amber-200"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: current === i ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          style={{ transformOrigin: "left" }}
        />
      </motion.div>
    ))}
  </div>
);

export default function ServicesDirectory() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const activeService = SERVICES[activeIdx];
  const containerRef = useRef<HTMLDivElement>(null);

  // Track cursor for premium effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Auto-rotate services
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SERVICES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#020202] text-white flex items-center justify-center py-20 px-4 md:px-12 lg:px-24 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/5 via-transparent to-transparent" />
      <FloatingParticles />
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Dynamic Cursor Glow */}
      <motion.div
        className="fixed w-[600px] h-[600px] pointer-events-none z-0 opacity-30"
        animate={{
          x: cursorPosition.x - 300,
          y: cursorPosition.y - 300,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
        style={{
          background: "radial-gradient(circle, rgba(253,230,138,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[1800px] grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/[0.08] bg-gradient-to-br from-[#0a0a0a] to-[#050505] shadow-2xl shadow-black/50">
        
        {/* Decorative Corner Elements */}
        <div className="absolute -top-px -left-px w-20 h-20 border-l-2 border-t-2 border-amber-200/30" />
        <div className="absolute -bottom-px -right-px w-20 h-20 border-r-2 border-b-2 border-amber-200/30" />
        
        {/* --- LEFT PANEL: The Directory (Menu) --- */}
        <div className="lg:col-span-5 flex flex-col border-b lg:border-b-0 lg:border-r border-white/[0.08] relative">
          <GlowingOrb active={isHovering} />
          
          {/* Premium Header */}
          <div className="p-10 md:p-14 border-b border-white/[0.08] relative overflow-hidden">
            {/* Animated Background Line */}
            <motion.div
              className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-amber-200/50 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ width: "100%" }}
            />
            
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <Diamond className="h-5 w-5 text-amber-200" />
                  <div className="absolute inset-0 bg-amber-200/20 blur-md" />
                </motion.div>
                <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
                  Premium Services
                </span>
              </div>
              <ProgressIndicator current={activeIdx} total={SERVICES.length} />
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1]">
              Areas of <br />
              <span className="italic bg-gradient-to-r from-white/60 via-amber-200/80 to-white/60 bg-clip-text text-transparent">
                Intervention.
              </span>
            </h2>
            
            <p className="mt-6 text-white/40 text-sm leading-relaxed max-w-sm">
              Curated expertise for discerning clients who demand nothing less than exceptional.
            </p>
          </div>

          {/* List Items */}
          <div className="flex-1 flex flex-col justify-center relative">
            {SERVICES.map((service, idx) => {
              const isActive = activeIdx === idx;
              return (
                <motion.button
                  key={service.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`group relative flex items-center justify-between p-8 md:p-12 transition-all duration-700 text-left outline-none overflow-hidden`}
                  whileHover={{ x: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {/* Hover Background Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-amber-200/[0.03] to-transparent"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -100 }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Active Indicator Line */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-amber-200 via-amber-300 to-amber-200"
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        exit={{ scaleY: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute inset-0 bg-amber-200 blur-sm" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Shimmer Effect */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                  )}

                  <div className="relative z-10 flex items-center gap-6">
                    {/* Service Icon */}
                    <motion.div
                      className={`h-12 w-12 flex items-center justify-center rounded-lg transition-all duration-500 ${
                        isActive 
                          ? "bg-amber-200 text-black shadow-lg shadow-amber-200/20" 
                          : "bg-white/[0.03] text-white/30 group-hover:bg-white/[0.05]"
                      }`}
                      animate={{ scale: isActive ? 1 : 0.9 }}
                    >
                      {service.icon}
                    </motion.div>
                    
                    <div>
                      <motion.span 
                        className={`block font-mono text-[10px] uppercase tracking-[0.3em] mb-2 transition-colors duration-500 ${
                          isActive ? "text-amber-200" : "text-white/20"
                        }`}
                      >
                        {service.id} — {service.tagline}
                      </motion.span>
                      <motion.span 
                        className={`block font-serif text-2xl md:text-3xl transition-all duration-500 ${
                          isActive ? "text-white" : "text-white/30 group-hover:text-white/50"
                        }`}
                      >
                        {service.title}
                      </motion.span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ 
                      x: isActive ? 0 : -20,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <ArrowRight className="h-5 w-5 text-amber-200" />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
          
          {/* Footer of Left Panel */}
          <div className="p-10 border-t border-white/[0.08] flex items-center justify-between">
            <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.3em]">
              Hover to explore
            </p>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-amber-200/50" />
              <span className="font-mono text-[9px] text-amber-200/50 uppercase tracking-widest">
                Premium
              </span>
            </div>
          </div>
        </div>


        {/* --- RIGHT PANEL: The Canvas (Preview) --- */}
        <div className="lg:col-span-7 relative h-[700px] lg:h-auto overflow-hidden bg-[#030303] flex flex-col">
          
          {/* Background Image with Premium Effects */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                className="object-cover"
                priority
              />
              {/* Multi-layer Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030303]/80 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[#030303]/30 backdrop-blur-[1px]" />
              
              {/* Vignette Effect */}
              <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
            </motion.div>
          </AnimatePresence>

          {/* Animated Gradient Border */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-200/20 to-transparent" />
          </div>

          {/* Foreground Content Card */}
          <div className="relative z-10 flex-1 flex flex-col justify-end p-10 md:p-14 lg:p-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-2xl"
              >
                {/* Floating Badge */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.03] backdrop-blur-sm border border-white/[0.08] rounded-full mb-8"
                >
                  <span className="h-2 w-2 bg-amber-200 rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                    Now Available
                  </span>
                </motion.div>

                {/* Icon Box with Glow */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative mb-8"
                >
                  <div className="h-16 w-16 flex items-center justify-center bg-gradient-to-br from-amber-200 to-amber-300 text-black rounded-xl shadow-2xl shadow-amber-200/30">
                    {activeService.icon}
                  </div>
                  <div className="absolute inset-0 bg-amber-200/20 blur-2xl rounded-full" />
                </motion.div>

                {/* Title with Gradient */}
                <motion.h3
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-[0.95]"
                >
                  {activeService.tagline}
                </motion.h3>
                
                <motion.p
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="font-serif text-xl text-amber-200/80 italic mb-8"
                >
                  {activeService.title}
                </motion.p>

                {/* Description with Premium Border */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="relative mb-12"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-200/60 via-amber-200/20 to-transparent" />
                  <p className="text-white/60 text-lg leading-relaxed font-light pl-8">
                    {activeService.description}
                  </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-8 mb-12"
                >
                  {Object.entries(activeService.stats).map(([key, value], i) => (
                    <div key={key} className="relative">
                      <span className="block text-3xl font-light text-white mb-1">{value}</span>
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-white/30">{key}</span>
                      {i < Object.entries(activeService.stats).length - 1 && (
                        <div className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-[1px] h-8 bg-white/10" />
                      )}
                    </div>
                  ))}
                </motion.div>

                {/* The Details Grid */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 p-8 bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-xl"
                >
                  <div>
                    <span className="flex items-center gap-2 font-mono text-[10px] text-amber-200 uppercase tracking-[0.3em] mb-4">
                      <span className="h-[1px] w-4 bg-amber-200/50" />
                      Includes
                    </span>
                    <ul className="space-y-3">
                      {activeService.includes.map((item, i) => (
                        <motion.li
                          key={item}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          className="text-sm text-white/70 flex items-center gap-3 group"
                        >
                          <span className="h-1.5 w-1.5 bg-amber-200/60 rounded-full group-hover:bg-amber-200 transition-colors" />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="flex items-center gap-2 font-mono text-[10px] text-amber-200 uppercase tracking-[0.3em] mb-4">
                      <span className="h-[1px] w-4 bg-amber-200/50" />
                      Ideal For
                    </span>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {activeService.for}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[...Array(3)].map((_, i) => (
                          <div
                            key={i}
                            className="h-8 w-8 rounded-full bg-gradient-to-br from-white/20 to-white/5 border border-white/10"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-white/40">+50 clients</span>
                    </div>
                  </div>
                </motion.div>

                {/* Premium CTA Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <MagneticButton className="group relative overflow-hidden px-10 py-5 bg-gradient-to-r from-amber-200 to-amber-300 rounded-lg shadow-lg shadow-amber-200/20 hover:shadow-amber-200/40 transition-all duration-500">
                    {/* Button Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      animate={{ x: ["-200%", "200%"] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                    <span className="relative flex items-center gap-4 font-medium text-sm uppercase tracking-widest text-black">
                      Begin Your Journey
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </MagneticButton>
                  
                  {/* Secondary Link */}
                  <button className="mt-4 ml-2 font-mono text-[10px] uppercase tracking-widest text-white/40 hover:text-amber-200 transition-colors">
                    View Case Studies →
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Giant Watermark with Animation */}
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 0.03, x: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute top-8 right-8 z-0 pointer-events-none select-none"
          >
            <span className="font-serif text-[12rem] md:text-[16rem] leading-none bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent">
              {activeService.id}
            </span>
          </motion.div>

          {/* Bottom Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-6 flex items-center justify-between border-t border-white/[0.05] bg-gradient-to-t from-[#030303] to-transparent backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                Service {activeIdx + 1} of {SERVICES.length}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveIdx((prev) => (prev - 1 + SERVICES.length) % SERVICES.length)}
                className="h-10 w-10 flex items-center justify-center border border-white/10 hover:border-amber-200/50 hover:bg-white/5 transition-all rounded-full"
              >
                <ArrowRight className="h-4 w-4 rotate-180 text-white/50" />
              </button>
              <button
                onClick={() => setActiveIdx((prev) => (prev + 1) % SERVICES.length)}
                className="h-10 w-10 flex items-center justify-center border border-white/10 hover:border-amber-200/50 hover:bg-white/5 transition-all rounded-full"
              >
                <ArrowRight className="h-4 w-4 text-white/50" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom styles for animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
}