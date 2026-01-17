"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ArrowRight, Instagram, Play, Pause, Volume2, VolumeX, ChevronDown } from "lucide-react";

// Custom TikTok Icon
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="currentColor"
    className={className}
  >
    <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a90.92 90.92 0 1 0 90.93 90.93V32h82.46a210.37 210.37 0 0 0 89.61 177.91z" />
  </svg>
);

const CinematicVideoHero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [particles, setParticles] = useState<{x: number; y: number; dx: number; duration: number; delay: number}[]>([]);

  useEffect(() => {
    setParticles([...Array(20)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
      dx: Math.random() * 100 - 50,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10,
    })));
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Animation Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050505] text-white">
      
      {/* --- Video Background Layer --- */}
      <div className="absolute inset-0 z-0">
        {/* Loading Placeholder */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050505] z-20 flex items-center justify-center"
            >
              <div className="w-12 h-12 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          controls
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          poster="/Project/Project5.jpg"
          className="w-full h-full object-cover"
        >
          {/* 
            Replace with your client's video. Options:
            - Fashion/Lifestyle B-roll
            - Abstract gold/dark fluid motion
            - Studio behind-the-scenes
          */}
          <source 
            src="/video/live4.MP4" 
            type="video/mp4" 
          />
        </video>

        {/* Multi-layer Overlays for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-[#050505]/60" />
        <div className="absolute inset-0 bg-[#050505]/30" />
        
        {/* Cinematic Bars (Letterbox Effect) */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#050505] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />

        {/* Animated Grain Texture */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay">
          <svg className="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        {/* Vignette Effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]" />
      </div>

      {/* --- Floating Particles --- */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4AF37]/40 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: -10,
              x: `+=${particle.dx}`,
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

      {/* --- Video Controls (Bottom Left) --- */}
      <div className="absolute bottom-8 left-8 z-30 flex items-center gap-3">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          onClick={togglePlay}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-[#D4AF37]/50"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white/80" />
          ) : (
            <Play className="w-4 h-4 text-white/80 ml-0.5" />
          )}
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.6 }}
          onClick={toggleMute}
          className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-[#D4AF37]/50"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-white/80" />
          ) : (
            <Volume2 className="w-4 h-4 text-white/80" />
          )}
        </motion.button>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="hidden md:block ml-4 text-[10px] font-mono uppercase tracking-widest text-white/40"
        >
          {isPlaying ? "Playing" : "Paused"} • {isMuted ? "Sound Off" : "Sound On"}
        </motion.span>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-20 container mx-auto px-6 md:px-12 h-full flex items-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          
          {/* Top Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-[#D4AF37]/20 bg-white/5 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]" />
              </span>
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-[#D4AF37]">
                Now Accepting Projects for 2025
              </span>
            </div>
          </motion.div>

          {/* Main Headline with Letter Animation */}
          <div className="overflow-hidden mb-6">
            <motion.h1 className="text-5xl md:text-7xl lg:text-[6rem] font-light tracking-tight leading-[0.95]">
              {"Elevate".split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="text-white/40">{" "}your</span>
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-5xl md:text-7xl lg:text-[6rem] font-serif italic tracking-tight leading-[0.95]"
            >
              <span className="bg-gradient-to-r from-[#B88746] via-[#FDF5A6] to-[#B88746] bg-clip-text text-transparent">
                Brand Magic.
              </span>
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed font-light mb-12"
          >
            Welcome to <span className="text-white font-medium">Jannah Vizora</span>—where 
            architectural precision meets creative alchemy. We don't just build brands; 
            we engineer <span className="text-[#D4AF37]">legacies</span>.
          </motion.p>

          {/* CTA Section */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-start gap-5"
          >
            {/* Primary CTA */}
            <a
              href="#"
              className="group relative px-10 py-5 bg-white text-[#050505] rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3 font-semibold tracking-wide text-sm uppercase">
                Start Your Project
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <SocialButton
                href="https://www.instagram.com/jannahvizora"
                icon={<Instagram className="w-5 h-5" />}
                label="Instagram"
              />
              <SocialButton
                href="https://www.tiktok.com/@jannahvizora"
                icon={<TikTokIcon className="w-5 h-5" />}
                label="TikTok"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* --- Scroll Indicator --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-8 z-30 hidden md:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 writing-vertical rotate-180">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4 text-[#D4AF37]/60" />
        </motion.div>
      </motion.div>

      {/* --- Decorative Lines --- */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent z-30" />
      
      {/* Side Decorative Element */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/4 right-12 h-1/3 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent origin-top hidden lg:block"
      />
    </section>
  );
};

// Social Button Component
const SocialButton = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="group relative flex items-center justify-center w-14 h-14 rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
    aria-label={label}
  >
    <span className="text-white/80 group-hover:text-[#050505] transition-colors">
      {icon}
    </span>
  </motion.a>
);

export default CinematicVideoHero;