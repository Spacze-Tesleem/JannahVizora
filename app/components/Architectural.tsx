"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, MoveUpRight } from "lucide-react";

// --- Data ---
const PROJECTS = [
  {
    id: "01",
    title: "Wedding Settings",
    location: "Ilorin, Kwara State",
    service: "Architecture",
    year: "2023",
    image: "/Project/Project0.JPG",
  },
  {
    id: "02",
    title: "The Silent Void",
    location: "Reykjavík, Iceland",
    service: "Interior",
    year: "2024",
    image: "/Project/Project1.JPG",
  },
  {
    id: "03",
    title: "Aeon Museum",
    location: "Berlin, Germany",
    service: "Cultural",
    year: "2022",
    image: "/Project/Project2.JPG",
  },
  {
    id: "04",
    title: "Vertex Residence",
    location: "Los Angeles, USA",
    service: "Residential",
    year: "2023",
    image: "/Project/Project3.jpg",
  },
  {
    id: "05",
    title: "Carbon Shelter",
    location: "Swiss Alps",
    service: "Concept",
    year: "2025",
    image: "/Project/Project5.jpg",
  },
];

export default function ArchitecturalProjectIndex() {
  const [activeProject, setActiveProject] = useState<{
    isActive: boolean;
    index: number;
  }>({ isActive: false, index: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // --- Cursor Physics ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Get cursor position relative to the container
    const { clientX, clientY } = e;
    const { left, top } = containerRef.current!.getBoundingClientRect();
    
    // Center the image on the cursor (assuming image width ~400px/height ~300px)
    mouseX.set(clientX - left - 200); 
    mouseY.set(clientY - top - 150);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full bg-[#080808] text-white selection:bg-amber-200 selection:text-black overflow-hidden"
    >
      {/* Background Noise & Grid */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
      <div className="pointer-events-none absolute inset-0 z-0 flex justify-between px-6 md:px-20 opacity-[0.02]">
        <div className="h-full w-px bg-white" />
        <div className="h-full w-px bg-white" />
        <div className="h-full w-px bg-white" />
      </div>

      {/* --- Floating Lens (The Image) --- */}
      <motion.div
        style={{ left: smoothX, top: smoothY }}
        animate={{
          opacity: activeProject.isActive ? 1 : 0,
          scale: activeProject.isActive ? 1 : 0.8,
        }}
        transition={{ duration: 0.4, ease: "circOut" }}
        className="pointer-events-none absolute z-20 hidden h-[300px] w-[400px] overflow-hidden rounded-sm md:block"
      >
        <div className="relative h-full w-full bg-[#1a1a1a]">
            {PROJECTS.map((project, index) => (
                <Image
                key={project.id}
                src={project.image}
                alt={project.title}
                fill
                className={`object-cover transition-opacity duration-500 ${
                    activeProject.index === index ? "opacity-100" : "opacity-0"
                }`}
                />
            ))}
            {/* Lens UI Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between border-t border-white/20 pt-2">
                 <span className="font-mono text-[10px] uppercase text-white/80">View Case Study</span>
                 <ArrowRight className="h-3 w-3 text-white" />
            </div>
        </div>
      </motion.div>

      {/* --- Main Content --- */}
      <div className="relative z-30 flex min-h-screen flex-col px-6 py-20 md:px-20 md:py-32">
        
        {/* Header */}
        <div className="mb-20 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-4 block font-mono text-xs text-amber-200/80">
              / ARCHIVE 2023-2025
            </span>
            <h1 className="font-serif text-5xl text-white md:text-7xl">
              Selected Works
            </h1>
          </div>
          <div className="h-px w-full max-w-[200px] bg-white/20 md:w-auto" />
        </div>

        {/* The List */}
        <div className="flex flex-col">
            {/* Header Row */}
            <div className="mb-6 grid grid-cols-12 border-b border-white/10 pb-4 text-xs font-mono uppercase tracking-widest text-white/30">
                <div className="col-span-1 hidden md:block">No.</div>
                <div className="col-span-8 md:col-span-5">Project Name</div>
                <div className="col-span-2 hidden md:block">Location</div>
                <div className="col-span-2 hidden md:block">Service</div>
                <div className="col-span-4 text-right md:col-span-2">Year</div>
            </div>

            {/* Project Rows */}
            <div 
                className="group/list" 
                onMouseLeave={() => setActiveProject({ isActive: false, index: 0 })}
            >
                {PROJECTS.map((project, index) => (
                    <ProjectRow
                        key={project.id}
                        project={project}
                        index={index}
                        onHover={() => setActiveProject({ isActive: true, index })}
                    />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}

// --- Individual Row Component ---
function ProjectRow({
  project,
  index,
  onHover,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
  onHover: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onHover}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group/row relative grid cursor-pointer grid-cols-12 items-center border-b border-white/10 py-8 transition-colors duration-500 hover:border-white/30 md:py-12"
    >
      {/* 
         Mix-blend-difference allows text to invert colors when the 
         floating image (which is z-20) passes underneath this row (z-30).
         Wait... actually, for mix-blend to work, the text needs to be on TOP 
         of the image, and the blend mode applied to the TEXT container.
      */}
      
      <div className="col-span-1 hidden font-mono text-sm text-white/30 transition-colors group-hover/row:text-amber-200 md:block mix-blend-difference">
        /{project.id}
      </div>
      
      <div className="col-span-8 md:col-span-5 mix-blend-difference">
        <h2 className="font-serif text-3xl transition-all duration-500 group-hover/row:translate-x-4 group-hover/row:text-white md:text-5xl lg:text-6xl text-white/70">
          {project.title}
        </h2>
      </div>

      <div className="col-span-2 hidden font-sans text-sm tracking-wide text-white/50 md:block mix-blend-difference">
        {project.location}
      </div>

      <div className="col-span-2 hidden md:block mix-blend-difference">
        <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs uppercase text-white/50 backdrop-blur-sm">
            {project.service}
        </span>
      </div>

      <div className="col-span-4 flex justify-end gap-4 text-right md:col-span-2 mix-blend-difference">
         <span className="font-mono text-sm text-white/30">{project.year}</span>
         <MoveUpRight className="h-5 w-5 text-white/0 transition-all duration-300 group-hover/row:text-amber-200 group-hover/row:-translate-y-1 group-hover/row:translate-x-1" />
      </div>

      {/* Hover Background for Row (optional highlight) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover/row:opacity-100" />
    </motion.div>
  );
}