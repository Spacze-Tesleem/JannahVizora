"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Instagram, MoveRight, Play, Sparkles, Eye, Heart, MessageCircle, Share2, Filter, Grid3X3, LayoutGrid, Pause } from "lucide-react";

// --- Types ---
interface Project {
  id: string;
  client: string;
  category: string;
  year: string;
  image: string;
  size: string;
  color: string;
  stats: { views: string; likes: string };
  featured: boolean;
}

interface InstaItem {
  src: string;
  likes: string;
  type: "image" | "video";
}

// --- Project Data (Enhanced) ---
const PROJECTS: Project[] = [
  {
    id: "01",
    client: "Maison Alara",
    category: "Brand Identity",
    year: "2024",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
    size: "col-span-1 md:col-span-2 row-span-2",
    color: "#C5A059",
    stats: { views: "12.4K", likes: "2.1K" },
    featured: true,
  },
  {
    id: "02",
    client: "The Vogue Summit",
    category: "Event Experience",
    year: "2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop",
    size: "col-span-1 md:col-span-1 row-span-1",
    color: "#8B7355",
    stats: { views: "8.7K", likes: "1.5K" },
    featured: false,
  },
  {
    id: "03",
    client: "Elena V.",
    category: "Personal Branding",
    year: "2023",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
    size: "col-span-1 md:col-span-1 row-span-2",
    color: "#D4AF37",
    stats: { views: "15.2K", likes: "3.8K" },
    featured: true,
  },
  {
    id: "04",
    client: "Onyx Digital",
    category: "Social Strategy",
    year: "2024",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1600&auto=format&fit=crop",
    size: "col-span-1 md:col-span-1 row-span-1",
    color: "#A67C52",
    stats: { views: "6.3K", likes: "980" },
    featured: false,
  },
  {
    id: "05",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600&auto=format&fit=crop",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
];

// --- Instagram Feed Data (Enhanced) ---
const INSTA_FEED: InstaItem[] = [
  { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500", likes: "1,234", type: "image" },
  { src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500", likes: "2,567", type: "video" },
  { src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500", likes: "892", type: "image" },
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500", likes: "3,421", type: "image" },
  { src: "https://images.unsplash.com/photo-1519671482538-518b48d19eb8?w=500", likes: "1,876", type: "video" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500", likes: "4,123", type: "image" },
];

// --- Filter Categories ---
const CATEGORIES = ["All", "Brand Identity", "Event Experience", "Personal Branding", "Social Strategy", "Visual Direction"] as const;

// --- Floating Particles Component (Memoized for performance) ---
const FloatingParticles = React.memo(() => {
  // Generate particles once
  const particles = useMemo(() => 
    [...Array(15)].map((_, i) => ({
      id: i,
      initialX: `${Math.random() * 100}%`,
      initialY: `${Math.random() * 100}%`,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 10,
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-[#C5A059]/30 rounded-full"
          initial={{
            x: particle.initialX,
            y: particle.initialY,
            scale: particle.scale,
          }}
          animate={{
            y: [null, "-10%", "110%"],
            opacity: [0, 0.6, 0],
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
});
FloatingParticles.displayName = "FloatingParticles";

// --- Magnetic Button Component ---
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const MagneticButton = React.memo(({ children, className, onClick }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.15);
    y.set((e.clientY - centerY) * 0.15);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

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
});
MagneticButton.displayName = "MagneticButton";

// --- Custom Cursor Component ---
interface CustomCursorProps {
  isHovering: boolean;
  cursorText: string;
}

const CustomCursor = React.memo(({ isHovering, cursorText }: CustomCursorProps) => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] hidden md:flex items-center justify-center"
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <motion.div
        className="flex items-center justify-center bg-[#1A1510] text-white rounded-full"
        animate={{
          width: isHovering ? 100 : 12,
          height: isHovering ? 100 : 12,
          marginLeft: isHovering ? -50 : -6,
          marginTop: isHovering ? -50 : -6,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <AnimatePresence>
          {isHovering && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-xs font-mono uppercase tracking-wider"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});
CustomCursor.displayName = "CustomCursor";

// --- Sub-Component: Enhanced Project Card ---
interface ProjectCardProps {
  project: Project;
  index: number;
  viewMode: "grid" | "masonry";
  onHover: (hovering: boolean) => void;
}

const ProjectCard = React.memo(({ project, index, viewMode, onHover }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = useCallback((hovering: boolean) => {
    setIsHovered(hovering);
    onHover(hovering);
  }, [onHover]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className={`relative group overflow-hidden cursor-pointer ${
        viewMode === "masonry" ? project.size : "col-span-1"
      }`}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.client} project`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          // Handle click action
        }
      }}
    >
      {/* Card Container */}
      <div className="relative h-full w-full rounded-xl overflow-hidden bg-[#EAE8E4]">
        {/* Image Container */}
        <motion.div
          className="relative h-full w-full"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={project.image}
            alt={`${project.client} - ${project.category}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-all duration-1000"
            style={{
              filter: isHovered ? "grayscale(0%)" : "grayscale(30%)",
            }}
            loading={index < 3 ? "eager" : "lazy"}
          />
        </motion.div>

        {/* Gradient Overlays */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 bg-gradient-to-t from-[#1A1510]/90 via-[#1A1510]/40 to-transparent"
        />

        {/* Accent Color Overlay */}
        <motion.div
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0"
          style={{ backgroundColor: project.color }}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
          {/* Top Row */}
          <div className="flex justify-between items-start">
            {/* ID Tag */}
            <motion.div
              animate={{
                opacity: isHovered ? 0 : 1,
                scale: isHovered ? 0.9 : 1,
              }}
              className="px-3 py-1.5 bg-white/95 backdrop-blur-sm rounded-full font-mono text-[10px] text-[#1A1510] shadow-lg"
            >
              {project.id}
            </motion.div>

            {/* Featured Badge */}
            {project.featured && (
              <motion.div
                animate={{
                  opacity: isHovered ? 0 : 1,
                }}
                className="px-3 py-1.5 bg-[#C5A059] rounded-full font-mono text-[9px] text-white uppercase tracking-wider flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" aria-hidden="true" />
                Featured
              </motion.div>
            )}

            {/* Hover Action Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.5,
                rotate: isHovered ? 0 : -45,
              }}
              transition={{ duration: 0.3 }}
              className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-xl"
            >
              <ArrowUpRight className="h-5 w-5 text-[#1A1510]" aria-hidden="true" />
            </motion.div>
          </div>

          {/* Bottom Content */}
          <motion.div
            animate={{
              y: isHovered ? 0 : 20,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Category & Year */}
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/70">
                {project.category}
              </span>
              <span className="h-1 w-1 bg-white/30 rounded-full" aria-hidden="true" />
              <span className="font-mono text-[9px] text-white/50">
                {project.year}
              </span>
            </div>

            {/* Client Name */}
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white mb-4">
              {project.client}
            </h3>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-white/60">
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="font-mono text-[10px]">{project.stats.views}</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/60">
                <Heart className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="font-mono text-[10px]">{project.stats.likes}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Corner */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30"
          aria-hidden="true"
        />
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30"
          aria-hidden="true"
        />
      </div>
    </motion.article>
  );
});
ProjectCard.displayName = "ProjectCard";

// --- Sub-Component: Enhanced Infinite Marquee ---
interface MarqueeProps {
  items: InstaItem[];
  speed: number;
  isPaused: boolean;
  onHover: (hovering: boolean) => void;
}

const Marquee = React.memo(({ items, speed, isPaused, onHover }: MarqueeProps) => {
  const duplicatedItems = useMemo(() => [...items, ...items, ...items], [items]);

  return (
    <div
      className="flex gap-4"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <motion.div
        className="flex gap-4"
        animate={isPaused ? {} : { x: [0, -1920] }}
        transition={{
          x: {
            duration: 40 / speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {duplicatedItems.map((item, i) => (
          <motion.div
            key={`${item.src}-${i}`}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative h-[220px] w-[220px] flex-shrink-0 group overflow-hidden rounded-xl cursor-pointer"
          >
            <Image
              src={item.src}
              alt="Instagram post"
              fill
              sizes="220px"
              className="object-cover transition-all duration-700 group-hover:scale-110"
              style={{
                filter: "grayscale(20%)",
              }}
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1510]/80 via-[#1A1510]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Video Indicator */}
            {item.type === "video" && (
              <div className="absolute top-3 right-3 h-8 w-8 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="h-3 w-3 text-[#1A1510] fill-current ml-0.5" aria-hidden="true" />
              </div>
            )}

            {/* Hover Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1">
                  <Heart className="h-5 w-5" aria-hidden="true" />
                  <span className="font-mono text-sm">{item.likes}</span>
                </div>
              </div>
            </div>

            {/* Instagram Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute bottom-3 left-3"
            >
              <div className="h-8 w-8 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] rounded-lg flex items-center justify-center">
                <Instagram className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});
Marquee.displayName = "Marquee";

// --- Main Component ---
export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState<typeof CATEGORIES[number]>("All");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [cursorText, setCursorText] = useState("View");
  const [marqueeSpeed, setMarqueeSpeed] = useState(1);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  const filteredProjects = useMemo(() => 
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const handleProjectHover = useCallback((hovering: boolean) => {
    setIsHoveringProject(hovering);
    setCursorText("View");
  }, []);

  const handleMarqueeHover = useCallback((hovering: boolean) => {
    setIsHoveringProject(hovering);
    setCursorText("Open");
  }, []);

  return (
    <>
      <CustomCursor isHovering={isHoveringProject} cursorText={cursorText} />

      <section
        ref={sectionRef}
        className="relative w-full bg-[#F9F8F6] text-[#1A1510] py-32 overflow-hidden"
        aria-label="Portfolio Gallery"
      >
        {/* Premium Background Effects */}
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          {/* Gradient Orbs */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C5A059]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
        </motion.div>

        {/* Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply pointer-events-none"
          aria-hidden="true"
        />

        {/* Floating Particles */}
        <FloatingParticles />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(#1A1510 1px, transparent 1px),
                             linear-gradient(90deg, #1A1510 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
          aria-hidden="true"
        />

        <motion.div
          style={{ opacity }}
          className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20"
        >
          {/* --- Premium Header --- */}
          <header ref={headerRef} className="mb-20">
            {/* Top Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isHeaderInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent mb-12 origin-left"
              aria-hidden="true"
            />

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
              <div>
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="h-6 w-6 border border-[#C5A059]/30 rounded-full flex items-center justify-center"
                  >
                    <Sparkles className="h-3 w-3 text-[#C5A059]" aria-hidden="true" />
                  </motion.div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#C5A059]">
                    Curated Portfolio
                  </span>
                  <span className="h-px w-12 bg-[#C5A059]/30" aria-hidden="true" />
                  <span className="font-mono text-[10px] text-[#1A1510]/40">
                    {PROJECTS.length} Projects
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="font-serif text-6xl md:text-8xl lg:text-9xl text-[#1A1510] leading-[0.9]"
                >
                  The{" "}
                  <span className="relative inline-block">
                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#D4AF37] to-[#C5A059]">
                      Collection
                    </span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={isHeaderInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A059] to-transparent origin-left"
                      aria-hidden="true"
                    />
                  </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-6 text-[#1A1510]/60 max-w-md text-lg font-light leading-relaxed"
                >
                  A carefully curated selection of our finest work, crafted for brands that
                  demand excellence.
                </motion.p>
              </div>

              {/* View Controls & CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col items-end gap-6"
              >
                {/* View Toggle */}
                <div
                  className="flex items-center gap-2 p-1 bg-[#1A1510]/5 rounded-full"
                  role="group"
                  aria-label="View mode"
                >
                  <button
                    onClick={() => setViewMode("masonry")}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === "masonry"
                        ? "bg-[#1A1510] text-white"
                        : "text-[#1A1510]/40 hover:text-[#1A1510]"
                    }`}
                    aria-label="Masonry view"
                    aria-pressed={viewMode === "masonry"}
                  >
                    <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-full transition-all ${
                      viewMode === "grid"
                        ? "bg-[#1A1510] text-white"
                        : "text-[#1A1510]/40 hover:text-[#1A1510]"
                    }`}
                    aria-label="Grid view"
                    aria-pressed={viewMode === "grid"}
                  >
                    <Grid3X3 className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                {/* Archive Button */}
                <MagneticButton className="group relative overflow-hidden px-8 py-4 bg-[#1A1510] text-white rounded-full">
                  <motion.span
                    className="absolute inset-0 bg-[#C5A059]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  />
                  <span className="relative flex items-center gap-3 text-xs font-mono uppercase tracking-widest">
                    View Full Archive
                    <MoveRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </span>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-3 mt-12 flex-wrap"
              role="group"
              aria-label="Filter projects by category"
            >
              <Filter className="h-4 w-4 text-[#1A1510]/40 mr-2" aria-hidden="true" />
              {CATEGORIES.map((cat, i) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest rounded-full border transition-all duration-300 ${
                    activeFilter === cat
                      ? "bg-[#1A1510] text-white border-[#1A1510]"
                      : "border-[#1A1510]/10 text-[#1A1510]/60 hover:border-[#C5A059] hover:text-[#C5A059]"
                  }`}
                  aria-pressed={activeFilter === cat}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>
          </header>

          {/* --- The Premium Bento Grid Gallery --- */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-4 mb-40 ${
                viewMode === "masonry"
                  ? "grid-cols-1 md:grid-cols-3 auto-rows-[280px] md:auto-rows-[320px]"
                  : "grid-cols-2 md:grid-cols-4 auto-rows-[300px]"
              }`}
              role="list"
              aria-label="Project gallery"
            >
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  viewMode={viewMode}
                  onHover={handleProjectHover}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* --- The Premium "Live Feed" (Instagram Strip) --- */}
          <div className="relative">
            {/* Section Divider */}
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-[#C5A059]/40 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#1A1510]/40">
                Social Presence
              </span>
              <div className="h-px flex-1 bg-gradient-to-l from-[#C5A059]/40 to-transparent" />
            </div>

            {/* Instagram Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737] p-[2px]"
                >
                  <div className="h-full w-full bg-[#F9F8F6] rounded-2xl flex items-center justify-center">
                    <Instagram className="h-6 w-6 text-[#1A1510]" aria-hidden="true" />
                  </div>
                  {/* Live Indicator */}
                  <span
                    className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-[#F9F8F6] animate-pulse"
                    aria-label="Live"
                  />
                </motion.div>
                <div>
                  <p className="font-medium text-lg">@JannahVizora</p>
                  <p className="text-sm text-[#1A1510]/50">24.5K Followers • 892 Posts</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Speed Control */}
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="marquee-speed"
                    className="font-mono text-[9px] uppercase tracking-widest text-[#1A1510]/40"
                  >
                    Speed
                  </label>
                  <input
                    id="marquee-speed"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={marqueeSpeed}
                    onChange={(e) => setMarqueeSpeed(parseFloat(e.target.value))}
                    className="w-20 h-1 bg-[#1A1510]/10 rounded-full appearance-none cursor-pointer accent-[#C5A059]"
                  />
                </div>

                {/* Pause/Play */}
                <button
                  onClick={() => setIsMarqueePaused(!isMarqueePaused)}
                  className="h-10 w-10 rounded-full border border-[#1A1510]/10 flex items-center justify-center hover:border-[#C5A059] hover:text-[#C5A059] transition-colors"
                  aria-label={isMarqueePaused ? "Play marquee" : "Pause marquee"}
                >
                  {isMarqueePaused ? (
                    <Play className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Pause className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>

                <MagneticButton className="group px-6 py-3 border border-[#1A1510]/10 rounded-full hover:border-[#C5A059] hover:bg-[#C5A059]/5 transition-all">
                  <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                    Follow
                    <ArrowUpRight
                      className="h-3 w-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </span>
                </MagneticButton>
              </div>
            </div>

            {/* Premium Marquee Container */}
            <div className="relative overflow-hidden rounded-2xl bg-[#1A1510]/[0.02] p-4">
              {/* Fade Edges */}
              <div
                className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#F9F8F6] to-transparent z-10 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#F9F8F6] to-transparent z-10 pointer-events-none"
                aria-hidden="true"
              />

              <Marquee
                items={INSTA_FEED}
                speed={marqueeSpeed}
                isPaused={isMarqueePaused}
                onHover={handleMarqueeHover}
              />
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-4 gap-4 mt-10 pt-10 border-t border-[#C5A059]/10"
            >
              {[
                { label: "Posts", value: "892" },
                { label: "Followers", value: "24.5K" },
                { label: "Engagement", value: "8.2%" },
                { label: "Reach", value: "1.2M" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="text-3xl md:text-4xl font-light text-[#1A1510]">{stat.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-[#1A1510]/40 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/30 to-transparent"
          aria-hidden="true"
        />
      </section>
    </>
  );
}