"use client";

import React from "react";
// 1. Import Variants type
import { motion, Variants } from "framer-motion"; 
import { ArrowRight, Instagram, Sparkles } from "lucide-react";

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

const Hero = () => {
  // --- Animation Variants ---
  
  // 2. Add ': Variants' type annotation
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // 3. Add ': Variants' type annotation
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" }, 
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050505] text-[#FDFBF7] flex items-center justify-center selection:bg-[#D4AF37]/30 selection:text-white">

      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[80vh] h-[80vh] rounded-full bg-[#B88746] blur-[140px] opacity-20"
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[40%] -right-[10%] w-[60vh] h-[60vh] rounded-full bg-[#D4AF37] blur-[150px] opacity-10"
        />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] brightness-100 contrast-150"></div>
      </div>

      {/* --- Main Content --- */}
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
        >

          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37]/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                Officially Launched
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 leading-[1.1]"
          >
            <span className="text-[#FDFBF7]">Elevate your Brand.</span> <br />
            <span className="font-serif italic pr-2 text-transparent bg-clip-text bg-gradient-to-r from-[#B88746] via-[#FDF5A6] to-[#B88746] drop-shadow-sm">
              Create Magic.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#FDFBF7]/60 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
          >
            Welcome to <span className="font-medium text-[#FDFBF7]">Jannah Vizora</span>.
            A creative studio for personal branding, social media strategy, and unforgettable experiences.
          </motion.p>

          {/* CTA & Socials */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full"
          >
            <a
              href="#"
              className="group relative w-full sm:w-auto px-10 py-4 bg-[#FDFBF7] text-[#050505] rounded-full overflow-hidden transition-transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#F3E5AB] to-[#FFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center gap-3 font-semibold tracking-wide text-sm">
                Start Your Project <ArrowRight className="w-4 h-4" />
              </span>
            </a>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/jannahvizora?igsh=cGN6Nm1mcXFqNnhn&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-full border border-[#D4AF37]/20 bg-white/5 backdrop-blur-sm text-[#FDFBF7] hover:bg-[#D4AF37] hover:text-[#050505] hover:border-[#D4AF37] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>

              <a
                href="https://www.tiktok.com/@jannahvizora?_r=1&_t=ZS-92zL4sWVq1w"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-full border border-[#D4AF37]/20 bg-white/5 backdrop-blur-sm text-[#FDFBF7] hover:bg-[#D4AF37] hover:text-[#050505] hover:border-[#D4AF37] transition-all duration-300"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent"></div>
    </section>
  );
};

export default Hero;