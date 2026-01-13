"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Maximize2, Menu, Sparkles } from "lucide-react";

const NAV_ITEMS = [
    { name: 'Vision', href: '#' },
    { name: 'Projects', href: '#' },
    { name: 'Studio', href: '#' },
    { name: 'Contact', href: '#' },
];

const Navbar = () => {
    const [activeHover, setActiveHover] = useState<number | null>(null);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center pointer-events-none"
        >
            {/* --- Left: Brand --- */}
            <div className="pointer-events-auto group cursor-pointer">
                <Link href="/" className="flex items-center gap-2">
                    {/* Optional: Small Gold Icon */}
                    <Sparkles className="w-4 h-4 text-[#D4AF37] opacity-80 group-hover:rotate-12 transition-transform" />
                    <span className="text-[#FDFBF7] font-semibold tracking-[0.2em] uppercase text-sm drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                        Jannah Vizora
                    </span>
                </Link>
            </div>

            {/* --- Center: Dynamic Island Navigation --- */}
            <div className="pointer-events-auto hidden md:flex items-center gap-1 bg-[#1a1a1a]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-full p-1.5 shadow-2xl shadow-black/50">
                {NAV_ITEMS.map((item, i) => {
                    // Logic: "Vision" is active by default (simulated), otherwise hover state
                    const isActive = i === 0 && activeHover === null;
                    const isHovered = activeHover === i;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onMouseEnter={() => setActiveHover(i)}
                            onMouseLeave={() => setActiveHover(null)}
                            className={`
                relative px-6 py-2 rounded-full text-xs font-medium transition-colors duration-300 tracking-wide uppercase
                ${isActive || isHovered ? 'text-[#050505]' : 'text-[#FDFBF7]/60 hover:text-[#FDFBF7]'}
                z-10
              `}
                        >
                            {/* Active/Hover Background Pill (Cream) */}
                            {(isActive || isHovered) && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-[#FDFBF7] rounded-full -z-10 shadow-[0_0_15px_rgba(253,251,247,0.3)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* --- Right: Actions --- */}
            <div className="pointer-events-auto flex items-center gap-4">
                {/* Mobile Menu Trigger */}
                <button className="md:hidden w-10 h-10 rounded-full bg-[#1a1a1a]/60 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center text-[#FDFBF7]">
                    <Menu size={18} />
                </button>

                {/* Desktop Action (Expand/Menu) */}
                <button className="group hidden md:flex w-10 h-10 rounded-full bg-[#1a1a1a]/60 backdrop-blur-md border border-[#D4AF37]/20 items-center justify-center text-[#FDFBF7] hover:bg-[#D4AF37] hover:text-[#050505] hover:border-[#D4AF37] transition-all duration-300 shadow-lg shadow-black/20">
                    <Maximize2 size={16} className="group-hover:scale-110 transition-transform" />
                </button>
            </div>
        </motion.nav>
    );
};

export default Navbar;