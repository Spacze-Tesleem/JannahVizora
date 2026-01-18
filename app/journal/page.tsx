"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

const POSTS = [
  { date: "MAR 12", title: "The Economy of Retention", read: "5 min", cat: "Strategy" },
  { date: "FEB 28", title: "Visual Silence as Luxury", read: "8 min", cat: "Identity" },
  { date: "JAN 15", title: "Architectural UX Foundations", read: "12 min", cat: "Design" }
];

export default function EnhancedJournal() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-6 lg:px-20">
        <header className="mb-32 flex justify-between items-end">
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#C5A059] block mb-6">Thoughts // Notes</span>
            <h1 className="font-serif text-7xl md:text-9xl tracking-tighter">The <span className="italic">Journal.</span></h1>
          </div>
          <div className="hidden lg:block text-right">
             <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-stone-400">
               <Clock className="w-3 h-3" /> Updated Weekly
             </div>
          </div>
        </header>

        <div className="space-y-0">
          {POSTS.map((post, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="group border-b border-stone-200 py-16 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer hover:px-8 transition-all duration-700 bg-transparent hover:bg-white"
            >
              <div className="flex gap-12 items-center mb-6 md:mb-0">
                <span className="font-mono text-xs text-stone-300">{post.date}</span>
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A059] mb-2">{post.cat}</span>
                  <h2 className="font-serif text-4xl md:text-6xl text-stone-900 group-hover:italic transition-all">{post.title}</h2>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">{post.read}</span>
                <ArrowRight className="w-6 h-6 text-stone-200 group-hover:text-stone-900 group-hover:translate-x-4 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}