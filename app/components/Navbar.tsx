"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { name: "Vision", href: "#vision" },
  { name: "Projects", href: "#projects" },
  { name: "Studio", href: "#studio" },
  { name: "Journal", href: "#journal" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(NAV_ITEMS[0].name);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to adjust glass intensity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-6 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* --- LEFT: Brand Identity --- */}
        <div className="pointer-events-auto">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#1c1917] border border-white/10 overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-500">
              <Sparkles className="w-4 h-4 text-[#C5A059] group-hover:rotate-90 transition-transform duration-700 ease-[0.22,1,0.36,1]" />
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-tight text-[#1c1917] leading-none group-hover:opacity-70 transition-opacity">
                Jannah Vizora
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#C5A059] opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                Portfolio
              </span>
            </div>
          </Link>
        </div>

        {/* --- CENTER: Floating Glass Navigation --- */}
        <div className="pointer-events-auto hidden md:block">
          <motion.div
            animate={{
              width: "auto",
              padding: isScrolled ? "0.35rem 0.35rem" : "0.5rem 0.5rem",
              backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(12px)",
              borderColor: isScrolled ? "rgba(28, 25, 23, 0.05)" : "rgba(255, 255, 255, 0.2)",
            }}
            className="flex items-center gap-1 rounded-full border shadow-sm transition-all duration-500"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.name;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveTab(item.name)}
                  className="relative px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10"
                >
                  {/* Hover/Active Text Color Logic */}
                  <span
                    className={`relative z-10 transition-colors duration-200 ${
                      isActive ? "text-[#FAFAF9]" : "text-[#1c1917]/60 hover:text-[#1c1917]"
                    }`}
                  >
                    {item.name}
                  </span>

                  {/* The Fluid "Pill" Background */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#1c1917] rounded-full shadow-lg shadow-black/10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      {/* Subtle lighting effect on the pill */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/20 rounded-t-full" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </motion.div>
        </div>

        {/* --- RIGHT: CTA Button --- */}
        <div className="pointer-events-auto">
          <motion.button
            whileHover="hover"
            className="relative overflow-hidden group flex items-center gap-2 px-6 py-3 bg-[#1c1917] text-[#FAFAF9] rounded-full shadow-xl shadow-stone-900/10"
          >
            <span className="relative z-10 font-mono text-xs uppercase tracking-widest">
              Let's Talk
            </span>
            <motion.div
              variants={{
                hover: { rotate: 45 },
              }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <ArrowUpRight className="w-4 h-4 text-[#C5A059]" />
            </motion.div>

            {/* Hover Fill Effect */}
            <motion.div
              variants={{
                hover: { y: 0 },
              }}
              initial={{ y: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 bg-[#C5A059]"
            />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}