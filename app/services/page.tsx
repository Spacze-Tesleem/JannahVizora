"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plus, Hash, Activity, ShieldCheck, Zap } from "lucide-react";

const PROTOCOLS = [
  {
    id: "P-001",
    category: "Foundation",
    title: "Brand Alchemy",
    desc: "The construction of visual foundations. We develop the core DNA of your brand through architectural rigor, ensuring every element is engineered for long-term retention.",
    specs: {
      "Authority Level": "Tier 1",
      "Refinement": "Recursive",
      "Output": "Full Identity System"
    },
    icon: <ShieldCheck className="w-5 h-5" />
  },
  {
    id: "P-002",
    category: "Structure",
    title: "Digital Architecture",
    desc: "Designing high-performance digital environments. We treat websites as physical structures—balancing the weight of brutalist design with the fluid speed of modern technology.",
    specs: {
      "Authority Level": "Tier 1+",
      "Engine": "Next.js / WebGL",
      "Performance": "99th Percentile"
    },
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: "P-003",
    category: "Narrative",
    title: "Authority Strategy",
    desc: "Translating chaos into command. We curate your digital presence to ensure every post, every pixel, and every word reinforces a narrative of instinctive authority.",
    specs: {
      "Authority Level": "Global",
      "Frequency": "Daily Curation",
      "Strategy": "Retention Focus"
    },
    icon: <Activity className="w-5 h-5" />
  }
];

export default function ProtocolServices() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen pt-40 pb-20 font-sans selection:bg-[#C5A059] selection:text-white">
      {/* HUD Header */}
      <div className="fixed top-32 left-6 lg:left-20 z-20 hidden lg:block">
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.4em] text-stone-400 rotate-90 origin-left translate-y-20">
          <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
          System Operational // {new Date().getFullYear()}
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-20 relative z-10">
        <div className="max-w-4xl mb-40 border-l border-stone-200 pl-10 md:pl-20">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 mb-10">
            <Hash className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-stone-400">Service Protocols</span>
          </motion.div>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            className="font-serif text-6xl md:text-9xl text-stone-900 leading-[0.85] tracking-tighter"
          >
            Engineering <br /><span className="italic">Excellence.</span>
          </motion.h1>
          <p className="mt-12 text-xl text-stone-500 font-light max-w-lg leading-relaxed">
            A boutique archive of digital interventions designed for brands that prioritize structure, silence, and absolute authority.
          </p>
        </div>

        {/* The Protocol Stack */}
        <div className="space-y-40">
          {PROTOCOLS.map((protocol, idx) => (
            <motion.section 
              key={protocol.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative grid lg:grid-cols-12 gap-12 lg:gap-24"
            >
              {/* Left Column: The Technical Data */}
              <div className="lg:col-span-4 lg:sticky lg:top-40 h-fit space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#C5A059] border border-stone-100">
                    {protocol.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#C5A059]">{protocol.id}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">{protocol.category}</p>
                  </div>
                </div>

                <div className="bg-stone-900 text-white rounded-2xl p-8 space-y-6 shadow-2xl">
                   <h4 className="font-mono text-[9px] uppercase tracking-widest text-stone-500 border-b border-white/10 pb-4">Protocol Specifications</h4>
                   {Object.entries(protocol.specs).map(([key, value]) => (
                     <div key={key} className="flex justify-between items-end border-b border-white/5 pb-2">
                        <span className="font-mono text-[8px] uppercase tracking-widest text-stone-400">{key}</span>
                        <span className="font-serif text-sm">{value}</span>
                     </div>
                   ))}
                   <div className="pt-4 flex items-center justify-between font-mono text-[8px] text-[#C5A059]">
                      <span>READY FOR EXECUTION</span>
                      <Plus className="w-2 h-2" />
                   </div>
                </div>
              </div>

              {/* Right Column: The Narrative */}
              <div className="lg:col-span-8 lg:pt-4">
                 <h2 className="font-serif text-5xl md:text-8xl text-stone-900 mb-10 leading-none">
                   {protocol.title}
                 </h2>
                 <p className="text-2xl md:text-3xl text-stone-500 font-light leading-relaxed mb-16">
                   {protocol.desc}
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button className="group px-8 py-5 bg-white border border-stone-200 rounded-full flex items-center justify-between hover:bg-stone-900 hover:text-white transition-all duration-500">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Request Dossier</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </button>
                    <div className="hidden md:flex items-center px-8 border-l border-stone-200 text-stone-300 font-mono text-[9px] uppercase tracking-[0.3em]">
                      Status: Tier 1 Access Required
                    </div>
                 </div>
              </div>
              
              {/* Technical Grid Line */}
              <div className="absolute -bottom-20 left-0 w-full h-px bg-stone-200 lg:col-span-12" />
            </motion.section>
          ))}
        </div>

        {/* Global Blueprint Footer */}
        <div className="mt-60 border-t border-stone-200 pt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
           {[
             { label: "Alchemy Rate", value: "Custom" },
             { label: "Availability", value: "Q2 2024" },
             { label: "Global Presence", value: "Remote / On-site" },
             { label: "Contact Protocol", value: "hello@vizora.com" }
           ].map((stat, i) => (
             <div key={i} className="space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-widest text-stone-400 block">{stat.label}</span>
                <span className="font-serif text-xl text-stone-900">{stat.value}</span>
             </div>
           ))}
        </div>
      </div>
    </main>
  );
}