"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const PROJECTS = [
  { title: "Maison Alara", cat: "Identity", img: "/Project/Project1.JPG" },
  { title: "Noir Atelier", cat: "Design", img: "/Project/Project8.JPG" },
  { title: "Elena V.", cat: "Strategy", img: "/Project/Project3.jpg" },
  { title: "Vogue Summit", cat: "Identity", img: "/Project/Project2.JPG" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  return (
    <main className="bg-[#080808] text-white min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <h1 className="font-serif text-6xl md:text-8xl">Selected <br /><span className="italic text-[#C5A059]">Works.</span></h1>
          <div className="flex gap-6 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
            {["All", "Identity", "Design", "Strategy"].map(f => (
              <button key={f} onClick={() => setFilter(f)} className={filter === f ? "text-white" : ""}>{f}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {PROJECTS.map((proj, idx) => (
              <motion.div 
                key={proj.title}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-[4/5] md:aspect-video overflow-hidden group rounded-xl"
              >
                <Image src={proj.img} alt={proj.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-10 flex flex-col justify-end">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C5A059] mb-2">{proj.cat}</p>
                  <h3 className="font-serif text-4xl">{proj.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}