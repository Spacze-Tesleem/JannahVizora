"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import { ArrowUpRight, Sparkles, Menu, X } from "lucide-react";

// --- Constants ---
const NAV_ITEMS = [
  { name: "Services", href: "services" },
  { name: "Projects", href: "projects" },
  { name: "Studio", href: "studio" },
  { name: "About", href: "about" },
] as const;

// --- Magnetic Wrapper (desktop CTA) ---
const Magnetic: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const middleX = e.clientX - (rect.left + rect.width / 2);
    const middleY = e.clientY - (rect.top + rect.height / 2);
    x.set(middleX * 0.15);
    y.set(middleY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: "spring", stiffness: 160, damping: 18, mass: 0.2 }}
    >
      {children}
    </motion.div>
  );
};

// --- Mobile Fullscreen Menu ---
const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-40 flex flex-col justify-between bg-[#1c1917] px-6 pt-6 pb-10 md:hidden"
        >
          {/* Header row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#FAFAF9]">
              
            </div>
            <button
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAFAF9]/10 text-[#FAFAF9]"
            >Ima
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-6 pl-2">
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.08 }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block font-serif text-4xl text-[#FAFAF9] transition-colors hover:text-[#C5A059] sm:text-5xl"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 pt-5">
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FAFAF9] py-3 text-xs font-mono uppercase tracking-[0.2em] text-[#1c1917]">
              Let&apos;s Talk
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
              <span>Instagram</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Navbar ---
const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(NAV_ITEMS[0].name);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();

  // On-scroll behavior: compact + hide-on-scroll-down
  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    const scrollingDown = latest > prev;

    if (!mobileOpen) {
      if (scrollingDown && latest > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }

    setIsScrolled(latest > 20);
  });

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -80, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="pointer-events-auto">
            <Link
              href="/"
              className="group flex items-center gap-3"
              onClick={() => setMobileOpen(false)}
            >
              <Image
                src="/brand.png"
                alt="Jannah Vizora Logo"
                width={200}
                height={200}
                className="h-18 w-20 transition-transform duration-300 group-hover:rotate-12"
              />
            </Link>
          </div>

          {/* Center Nav (Desktop) */}
          <div className="pointer-events-auto hidden md:block">
            <motion.div
              animate={{
                backgroundColor: isScrolled
                  ? "rgba(255,255,255,0.9)"
                  : "rgba(255,255,255,0.6)",
                borderColor: isScrolled
                  ? "rgba(15,23,42,0.06)"
                  : "rgba(255,255,255,0.4)",
                boxShadow: isScrolled
                  ? "0 18px 40px rgba(15,23,42,0.08)"
                  : "0 0 0 rgba(0,0,0,0)",
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-1 rounded-full border px-1.5 py-1.5 backdrop-blur-xl"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.name;
                const isHovered = hoveredTab === item.name;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setActiveTab(item.name)}
                    onMouseEnter={() => setHoveredTab(item.name)}
                    onMouseLeave={() => setHoveredTab(null)}
                    className="relative z-10 px-5 py-2 text-sm font-medium"
                  >
                    <span
                      className={`relative z-10 transition-colors duration-200 ${isActive
                          ? "text-[#FAFAF9]"
                          : "text-[#1c1917]/70 hover:text-[#1c1917]"
                        }`}
                    >
                      {item.name}
                    </span>

                    {/* Active pill */}
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-[#1c1917] shadow-lg shadow-black/20"
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover pill (subtle) */}
                    {!isActive && isHovered && (
                      <motion.div
                        layoutId="nav-hover"
                        className="absolute inset-0 -z-10 rounded-full bg-[#1c1917]/6"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </motion.div>
          </div>

          {/* Right: CTA / Mobile Menu */}
          <div className="pointer-events-auto flex items-center gap-2">
            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Magnetic>
                <motion.button
                  whileHover="hover"
                  className="relative flex items-center gap-2 overflow-hidden rounded-full bg-[#1c1917] px-6 py-2.5 text-xs font-mono uppercase tracking-[0.2em] text-[#FAFAF9] shadow-lg shadow-black/20"
                >
                  <span className="relative z-10">Let&apos;s Talk</span>
                  <motion.span
                    variants={{ hover: { rotate: 45 } }}
                    transition={{ duration: 0.25 }}
                    className="relative z-10"
                  >
                    <ArrowUpRight className="h-4 w-4 text-[#C5A059]" />
                  </motion.span>
                  <motion.div
                    variants={{ hover: { y: 0 } }}
                    initial={{ y: "100%" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 bg-[#C5A059]"
                  />
                </motion.button>
              </Magnetic>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1c1917] text-white shadow-lg md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay menu */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Navbar;