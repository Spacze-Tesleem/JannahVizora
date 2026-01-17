"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Play, Pause, Volume2, VolumeX, Globe } from "lucide-react";

// --- Premium Components ---

const AudioVisualizer = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="flex items-end gap-1 h-5">
      {[0.1, 0.3, 0.5, 0.2, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="w-0.5 bg-current rounded-full"
          animate={{
            height: isActive ? [6, 16, 8, 14, 6] : 4,
            opacity: isActive ? [0.6, 1, 0.7, 1, 0.6] : 0.4,
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Grain = ({ style }: { style?: React.CSSProperties }) => (
  <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-multiply" style={style}>
    <svg className="w-full h-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const MagneticButton = ({ children, className = "", ...props }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 20 });
  const springY = useSpring(y, { stiffness: 400, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.1;
    const distanceY = (e.clientY - centerY) * 0.1;
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// --- Main Component ---

const SensoryVideoHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Scroll Effects
  const { scrollY, scrollYProgress } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const yVideo = useTransform(scrollY, [0, 500], [0, -80]);
  const opacityGrain = useTransform(scrollYProgress, [0, 0.5], [0.02, 0.05]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setIsPlaying(false));
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    isPlaying ? videoRef.current.pause() : videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
    setHasInteracted(true);
  };

  return (
    <>
      <motion.div style={{ opacity: opacityGrain }}>
        <Grain />
      </motion.div>

      <section
        ref={containerRef}
        className="relative w-full min-h-screen bg-[#F8F6F2] text-neutral-900 overflow-hidden flex flex-col justify-between font-sans"
      >
        {/* Main Content */}
        <div className="relative z-20 flex-1 container mx-auto px-6 md:px-12 lg:px-20 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 py-20">
          {/* Left: Typography */}
          <motion.div
            style={{ y: yText }}
            className="w-full lg:w-[45%] z-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Digital Atelier • Est 2024
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[0.85] font-serif font-light mb-10 tracking-tight">
              {["Sculpting", "modern", "Serenity."].map((word, i) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.1,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className={`block ${i === 1 ? "italic text-neutral-500" : ""}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl text-neutral-600 max-w-md leading-relaxed mb-12 font-light"
            >
              We craft digital experiences with architectural precision.
              <br />
              <span className="text-sm text-neutral-400 italic">Sound on for full immersion.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <MagneticButton>
                <a
                  href="#"
                  className="group px-8 py-4 bg-neutral-900 text-white rounded-full flex items-center gap-3 transition-all duration-300 hover:shadow-2xl hover:bg-black"
                >
                  <span className="text-sm font-medium tracking-wide">View Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <button
                  onClick={toggleMute}
                  className={`px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-300 border ${
                    !isMuted
                      ? "bg-white border-white shadow-lg"
                      : "border-neutral-200 hover:border-neutral-900"
                  }`}
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-neutral-500" />
                      <span className="text-sm font-medium text-neutral-500">Sound Off</span>
                    </>
                  ) : (
                    <>
                      <AudioVisualizer isActive={true} />
                      <span className="text-sm font-medium text-neutral-900">Sound On</span>
                    </>
                  )}
                </button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right: Video */}
          <motion.div
            style={{ y: yVideo }}
            className="w-full lg:w-[55%] relative z-10"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="relative aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-neutral-400/20 group"
              whileHover={{ scale: 1.01 }}
            >
              {/* Video */}
              <video
                ref={videoRef}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out group-hover:scale-100"
              >
                <source src="/video/hero.mp4" type="video/mp4" />
              </video>

              {/* Premium Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Play Button - Glass Morphism */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.button
                  onClick={togglePlay}
                  className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </motion.button>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-6 right-6 w-24 h-24 border-t-2 border-r-2 border-white/30 rounded-tr-3xl opacity-50" />
              <div className="absolute bottom-6 left-6 w-24 h-24 border-b-2 border-l-2 border-white/30 rounded-bl-3xl opacity-50" />

              {/* Subtle Glow Effect */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
                <div className="absolute -inset-10 bg-white/5 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </div>
            </motion.div>

            {/* Floating Caption - Premium Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-12 right-0 lg:-right-8 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 max-w-sm"
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono uppercase text-neutral-400 tracking-widest">01 — Cinematic Experience</span>
                <p className="text-sm font-serif leading-relaxed text-neutral-800">
                  Capturing the essence of modern luxury through motion.
                </p>
                <span className="text-xs text-neutral-500 mt-2">Full Showreel 2025</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative z-20 px-6 md:px-12 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="hidden md:flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <Globe className="w-4 h-4" />
            <span>Ilorin / Nigeria / Worldwide</span>
          </div>

          {/* Premium Scroll Indicator */}
          <div className="flex items-center gap-4">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="origin-left w-24 h-px bg-neutral-900/20"
            />
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">Scroll</span>
              <div className="w-px h-12 bg-neutral-200 rounded-full relative overflow-hidden">
                <motion.div
                  animate={{ y: ["100%", "-100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-1/2 bg-neutral-900"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SensoryVideoHero;