"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Instagram, MoveRight, Play, Sparkles, Eye, Heart, MessageCircle, Share2, Filter, Grid3X3, LayoutGrid, Pause, ExternalLink } from "lucide-react";

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
    image: "/Project/Project1.JPG",
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
    image: "/Project/Project2.JPG",
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
    image: "/Project/Project3.jpg",
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
    image: "/Project/Project4.jpg",
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
    image: "/Project/Project5.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "06",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project6.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "08",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project8.JPG",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "09",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project9.JPG",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "10",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project10.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "11",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project11.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "12",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project12.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "13",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project13.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "24",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project24.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "25",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project25.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "27",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project27.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "28",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project28.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
  {
    id: "29",
    client: "Lumière Studios",
    category: "Visual Direction",
    year: "2024",
    image: "/Project/Project29.jpg",
    size: "col-span-1 md:col-span-2 row-span-1",
    color: "#BFA980",
    stats: { views: "9.1K", likes: "1.7K" },
    featured: false,
  },
];

// --- Instagram Feed Data (Enhanced) ---
const INSTA_POSTS = [
  {
    id: 1,
    image: "/Project/brand.PNG",
    likes: "2.4k",
    comments: "48",
    caption: "Brand Launched 🏛️ #Vizora",
    isLarge: true, // This determines the Bento Grid layout
  },
  {
    id: 2,
    image: "/Project/services.PNG",
    likes: "892",
    comments: "12",
    caption: "Texture study No. 5",
    isLarge: false,
  },
  {
    id: 3,
    image: "/Project/Project10.jpg",
    likes: "1.1k",
    comments: "34",
    caption: "Sunday mood.",
    isLarge: false,
  },
  {
    id: 4,
    image: "/Project/Project24.jpg",
    likes: "3.2k",
    comments: "120",
    caption: "New horizons.",
    isLarge: false,
  },
  {
    id: 5,
    image: "/Project/Project25.jpg",
    likes: "945",
    comments: "22",
    caption: "Details matter.",
    isLarge: false,
  },
];

// --- Filter Categories ---
const CATEGORIES = ["All", "Brand Identity", "Event Experience", "Personal Branding", "Social Strategy", "Visual Direction"] as const;

// --- Floating Particles Component (Memoized for performance) ---
const FloatingParticles = React.memo(() => {
  const [particles, setParticles] = useState<{id: number; initialX: string; initialY: string; scale: number; duration: number; delay: number}[]>([]);

  useEffect(() => {
    setParticles([...Array(15)].map((_, i) => ({
      id: i,
      initialX: `${Math.random() * 100}%`,
      initialY: `${Math.random() * 100}%`,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 10,
    })));
  }, []);

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
      className={`relative group overflow-hidden cursor-pointer ${viewMode === "grid" ? project.size : "col-span-1"
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
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

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
                    className={`p-2 rounded-full transition-all ${viewMode === "masonry"
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
                    className={`p-2 rounded-full transition-all ${viewMode === "grid"
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
                  className={`px-4 py-2 font-mono text-[10px] uppercase tracking-widest rounded-full border transition-all duration-300 ${activeFilter === cat
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
              className={`grid gap-4 mb-40 ${viewMode === "masonry"
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
          <div className="relative w-full bg-[#080808] py-24 text-white overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
            <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-amber-900/10 blur-[120px]" />

            <div className="container mx-auto px-6 md:px-12">

              {/* --- HEADER: Profile Architecture --- */}
              <div className="mb-16 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/10 pb-8">

                {/* Profile Identity */}
                <div className="flex items-center gap-6">
                  <div className="relative group cursor-pointer">
                    {/* Animated Story Ring */}
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 opacity-80 blur-sm transition-opacity duration-500 group-hover:opacity-100 group-hover:blur-md" />
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-[3px] border-[#080808]">
                      <Image
                        src="/Janaah.JPG"
                        alt="Profile"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    {/* Verified Badge */}
                    <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white ring-4 ring-[#080808]">
                      <svg className="h-3 w-3 fill-current" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h2 className="font-serif text-2xl text-white">@JannahVizora</h2>
                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/60">
                        Architect
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-amber-200/80">
                      Visual Alchemy & Brand Strategy
                    </p>

                    {/* Stats Row */}
                    <div className="mt-4 flex gap-6 text-sm">
                      <div className="flex flex-col">
                        <span className="font-bold text-white">892</span>
                        <span className="text-white/40 text-xs">Posts</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white">24.5k</span>
                        <span className="text-white/40 text-xs">Followers</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-white">120</span>
                        <span className="text-white/40 text-xs">Following</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Call To Action */}
                <div className="flex items-center gap-4">
                  <Link
                    href="https://instagram.com"
                    target="_blank"
                    className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/[0.03] px-6 py-3 transition-all hover:bg-white hover:text-black"
                  >
                    <Instagram className="h-4 w-4" />
                    <span className="font-mono text-xs uppercase tracking-widest">Follow Jannah</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* --- THE EDITORIAL GRID (Bento Layout) --- */}
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">

                {/* Map through posts */}
                {INSTA_POSTS.map((post, index) => (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredPost(post.id)}
                    onMouseLeave={() => setHoveredPost(null)}
                    className={`relative group cursor-pointer overflow-hidden rounded-sm ${post.isLarge ? "col-span-2 row-span-2 aspect-square" : "col-span-1 aspect-square"
                      }`}
                  >
                    {/* Image */}
                    <Image
                      src={post.image}
                      alt="Instagram Post"
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Overlay (Instagram UI Style) */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-center items-center gap-4 p-6 text-center">

                      {/* Hover Content */}
                      <div className="flex items-center gap-6 translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                        <div className="flex items-center gap-2">
                          <Heart className="h-5 w-5 fill-white text-white" />
                          <span className="font-bold text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-5 w-5 fill-white text-white" />
                          <span className="font-bold text-sm">{post.comments}</span>
                        </div>
                      </div>

                      {post.isLarge && (
                        <p className="translate-y-4 text-xs text-white/80 line-clamp-2 transition-transform duration-300 delay-75 group-hover:translate-y-0 max-w-[200px]">
                          {post.caption}
                        </p>
                      )}

                      {/* External Link Icon */}
                      <div className="absolute top-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <ExternalLink className="h-4 w-4 text-white/70" />
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Last Box: "View All" CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="col-span-1 aspect-square flex flex-col items-center justify-center rounded-sm border border-white/10 bg-white/[0.02] text-center p-4 hover:bg-white/[0.05] transition-colors cursor-pointer group"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 group-hover:scale-110 transition-transform">
                    <Sparkles className="h-5 w-5 text-amber-200" />
                  </div>
                  <span className="font-serif text-lg text-white">View Archive</span>
                  <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-2">@JannahVizora</span>
                </motion.div>

              </div>

            </div>
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