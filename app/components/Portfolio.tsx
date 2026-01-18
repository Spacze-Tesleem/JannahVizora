"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Instagram, Eye, Heart, Filter, Grid3X3, LayoutGrid, ArrowRight } from "lucide-react";

const PROJECTS = [
  { id: "01", client: "Maison Alara", category: "Brand Identity", year: "2024", image: "/Project/Project1.JPG", color: "#C5A059", featured: true },
  { id: "02", client: "Vogue Summit", category: "Event Experience", year: "2024", image: "/Project/Project2.JPG", color: "#8B7355", featured: false },
  { id: "03", client: "Elena V.", category: "Personal Branding", year: "2023", image: "/Project/Project3.jpg", color: "#D4AF37", featured: true },
  { id: "04", client: "Onyx Digital", category: "Social Strategy", year: "2024", image: "/Project/Project4.jpg", color: "#A67C52", featured: false },
  { id: "05", client: "Lumière Studios", category: "Visual Direction", year: "2024", image: "/Project/Project5.jpg", color: "#BFA980", featured: false },
  { id: "06", client: "Aura Residences", category: "Architectural Strategy", year: "2024", image: "/Project/Project6.jpg", color: "#967E5C", featured: false },
  { id: "08", client: "Noir Atelier", category: "Visual Direction", year: "2024", image: "/Project/Project8.JPG", color: "#2C2C2C", featured: true },
  { id: "09", client: "Ether Jewelry", category: "Editorial Design", year: "2024", image: "/Project/Project9.JPG", color: "#D1B280", featured: false },
  { id: "10", client: "Chroma Collective", category: "Visual Direction", year: "2024", image: "/Project/Project10.jpg", color: "#7D6B5D", featured: false },
  { id: "11", client: "Solace Wellness", category: "Brand Identity", year: "2024", image: "/Project/Project11.jpg", color: "#B4A694", featured: false },
  { id: "12", client: "Kinetix Motion", category: "Visual Direction", year: "2024", image: "/Project/Project12.jpg", color: "#8C8C8C", featured: true },
  { id: "13", client: "Zenith Strategy", category: "Social Strategy", year: "2024", image: "/Project/Project13.jpg", color: "#BFA980", featured: false },
  { id: "24", client: "Velvet Fashion", category: "Visual Direction", year: "2024", image: "/Project/Project24.jpg", color: "#5C4A33", featured: false },
  { id: "25", client: "Abstract Exhibition", category: "Event Experience", year: "2024", image: "/Project/Project25.jpg", color: "#A39171", featured: false },
  { id: "27", client: "The Archive", category: "Editorial Design", year: "2024", image: "/Project/Project27.jpg", color: "#6B5E4C", featured: false },
  { id: "28", client: "Flow Concept", category: "Personal Branding", year: "2024", image: "/Project/Project28.jpg", color: "#D4AF37", featured: true },
  { id: "29", client: "Serenity Project", category: "Visual Direction", year: "2025", image: "/Project/Project29.jpg", color: "#C5A059", featured: true },
];

const CATEGORIES = ["All", "Brand Identity", "Event Experience", "Personal Branding", "Visual Direction", "Social Strategy", "Editorial Design"] as const;

const ProjectCard = React.memo(({ project, index, onHover }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth rotation only for desktop
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || window.innerWidth < 1024) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPos = (e.clientX - rect.left) / rect.width - 0.5;
    const yPos = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onHover(true)}
      style={{ 
        rotateX: rotateX, 
        rotateY: rotateY, 
        transformStyle: "preserve-3d" 
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      className="group relative h-[450px] md:h-[500px] w-full cursor-pointer lg:cursor-none overflow-hidden rounded-2xl bg-[#151515]"
    >
      <div className="relative h-full w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.client}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 md:opacity-40 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8" style={{ transform: "translateZ(30px)" }}>
        <div className="flex justify-between items-start">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">{project.id} // {project.year}</span>
            <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md bg-white/10 lg:group-hover:bg-white lg:group-hover:text-black transition-all">
                <ArrowUpRight className="h-4 w-4" />
            </div>
        </div>

        <div>
            <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.3em] text-[#C5A059]">
              {project.category}
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-white">
              {project.client}
            </h3>
        </div>
      </div>
    </motion.div>
  );
});
ProjectCard.displayName = "ProjectCard";

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 400, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 28 });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const moveCursor = (e: MouseEvent) => {
      if (!isMobile) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };
    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [isMobile, cursorX, cursorY]);

  const filteredProjects = useMemo(() => 
    activeFilter === "All" ? PROJECTS : PROJECTS.filter(p => p.category === activeFilter),
  [activeFilter]);

  return (
    <section className="relative w-full bg-[#FAF9F6] py-16 md:py-32 overflow-hidden selection:bg-[#151515] selection:text-white">
      
      {/* Custom Cursor - Desktop Only */}
      {!isMobile && (
        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full bg-[#C5A059] mix-blend-difference"
          style={{ x: springX, y: springY, width: isHovering ? 80 : 12, height: isHovering ? 80 : 12, marginLeft: isHovering ? -40 : -6, marginTop: isHovering ? -40 : -6 }}
        >
          <AnimatePresence>
              {isHovering && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] font-bold uppercase tracking-widest text-black">View</motion.span>}
          </AnimatePresence>
        </motion.div>
      )}

      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-12 md:mb-24 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:items-end">
            <div className="lg:col-span-8">
                <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} className="mb-4 md:mb-6 flex items-center gap-3">
                    <span className="h-[1px] w-12 bg-[#C5A059]" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#C5A059]">Portfolio</span>
                </motion.div>
                <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="font-serif text-5xl md:text-8xl lg:text-9xl tracking-tighter text-[#151515] leading-none">
                    Curated <br /> <span className="italic text-[#C5A059]">Alchemy.</span>
                </motion.h2>
            </div>
            
            <div className="lg:col-span-4 lg:text-right">
                <p className="mb-6 md:mb-8 font-light leading-relaxed text-[#151515]/60 text-base md:text-lg max-w-md lg:ml-auto">
                    Architectural precision meets visual storytelling. We craft brands that demand silence and command authority.
                </p>
                {/* Horizontal Scrolling Filters on Mobile */}
                <div className="flex overflow-x-auto lg:flex-wrap gap-2 pb-4 lg:pb-0 lg:justify-end no-scrollbar scroll-smooth">
                    {CATEGORIES.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveFilter(cat)}
                            className={`whitespace-nowrap px-5 py-2.5 font-mono text-[9px] uppercase tracking-widest transition-all rounded-full border ${activeFilter === cat ? 'bg-[#151515] text-white border-[#151515]' : 'border-black/10 hover:border-black/40 text-black/60'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Project Grid - Adaptive Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24 md:mb-40">
            {filteredProjects.map((project, idx) => (
                <ProjectCard key={project.id} project={project} index={idx} onHover={setIsHovering} />
            ))}
        </div>

        {/* Social Section - Column on Mobile, Row on Desktop */}
        <div className="relative rounded-[2rem] bg-[#151515] p-8 md:p-16 overflow-hidden">
            <div className="absolute top-0 right-0 h-[300px] md:h-[500px] w-[300px] md:w-[500px] rounded-full bg-[#C5A059]/10 blur-[80px] md:blur-[100px]" />
            
            <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 md:gap-16">
                <div className="max-w-md w-full">
                    <div className="flex items-center gap-6 mb-8 md:mb-10">
                        <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border-2 border-[#C5A059] p-1">
                            <Image src="/Janaah.JPG" alt="Jannah" fill className="rounded-full object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-serif text-xl md:text-2xl text-white">@JannahVizora</h4>
                                <div className="h-2 w-2 animate-pulse rounded-full bg-[#C5A059]" />
                            </div>
                            <p className="text-xs font-mono text-white/40 uppercase tracking-widest mt-1">Live from the Atelier</p>
                        </div>
                    </div>
                    
                    <h3 className="mb-8 font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] text-white">
                        Visual stories <br /> <span className="italic text-[#C5A059]">on the pulse.</span>
                    </h3>

                    <Link href="https://instagram.com" className="group flex lg:inline-flex items-center justify-center gap-4 rounded-full bg-white px-8 py-4 transition-all hover:bg-[#C5A059] w-full lg:w-auto">
                        <Instagram className="h-5 w-5 text-black" />
                        <span className="font-mono text-xs font-bold uppercase tracking-widest text-black">Enter the Gallery</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </Link>
                </div>

                {/* Social Grid - Modified Bento for Small Screens */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 w-full lg:max-w-2xl">
                    {[
                        { src: "/Project/brand.PNG", size: "col-span-2 row-span-2 aspect-square" },
                        { src: "/Project/services.PNG", size: "col-span-1 aspect-square" },
                        { src: "/Project/Project10.jpg", size: "col-span-1 aspect-square" },
                        { src: "/Project/Project24.jpg", size: "col-span-1 aspect-square" },
                    ].map((item, i) => (
                        <motion.div key={i} whileHover={!isMobile ? { scale: 0.98, rotate: i % 2 === 0 ? 1 : -1 } : {}} className={`relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 ${item.size}`}>
                            <Image src={item.src} alt="Feed" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Hidden on Mobile Marquee for performance/clarity */}
            <div className="hidden lg:flex absolute -bottom-10 left-0 w-[200%] gap-12 whitespace-nowrap opacity-[0.02] pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className="font-serif text-[120px] font-bold text-white uppercase italic">
                        Digital Atelier — Identity — Experience —
                    </span>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}