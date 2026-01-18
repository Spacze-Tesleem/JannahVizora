"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Plus, Maximize2 } from "lucide-react";

const WORKS = [
  { title: "Maison Alara", cat: "Branding", size: "lg:col-span-8", img: "/Project/Project1.JPG" },
  { title: "Noir Atelier", cat: "Web", size: "lg:col-span-4", img: "/Project/Project8.JPG" },
  { title: "Vogue Summit", cat: "Event", size: "lg:col-span-4", img: "/Project/Project2.JPG" },
  { title: "Elena V.", cat: "Strategy", size: "lg:col-span-8", img: "/Project/Project3.jpg" },
];

export default function EnhancedProjects() {
  return (
    <main className="bg-[#080808] text-white min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 lg:px-20">
        <header className="mb-32 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-3xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#C5A059] block mb-6">Archive 24/25</span>
            <h1 className="font-serif text-7xl md:text-9xl leading-none tracking-tighter italic">Selected <br /><span className="not-italic">Works.</span></h1>
          </div>
          <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest leading-loose">
            Located: Dubai / London / NYC <br />
            Status: Viewing Archive <br />
            Coord: 25.2048° N, 55.2708° E
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {WORKS.map((work, idx) => (
            <motion.div 
              key={work.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`${work.size} group relative h-[600px] overflow-hidden rounded-sm bg-zinc-900`}
            >
              <Image src={work.img} alt={work.title} fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start opacity-0 group-hover:opacity-100 transition-all">
                  <span className="font-mono text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1">EXP-00{idx}</span>
                  <Maximize2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#C5A059] mb-4 block">{work.cat}</span>
                  <h3 className="font-serif text-5xl md:text-6xl">{work.title}</h3>
                </div>
              </div>
              <Plus className="absolute bottom-4 right-4 w-4 h-4 text-white/20" />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}