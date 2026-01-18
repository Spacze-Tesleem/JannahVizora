"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Plus, Minus, Hash, Globe, Fingerprint, Command } from "lucide-react";

export default function SplitArchiveAbout() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main ref={containerRef} className="bg-[#0D0D0D] text-[#FAF9F6] selection:bg-[#C5A059] selection:text-black overflow-x-hidden">
      
      {/* --- Section 1: Hero Identity --- */}
      <section className="relative min-h-screen flex flex-col justify-end p-6 md:p-12 lg:p-20 border-b border-white/10">
        {/* Floating Decal (Desktop only) */}
        <div className="absolute top-12 left-12 hidden md:flex items-center gap-4 text-white/20">
          <Fingerprint size={20} />
          <span className="font-mono text-[9px] uppercase tracking-[0.5em]">Identity_Dossier_2024</span>
        </div>

        <div className="relative z-10 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#C5A059] mb-6">
              Director // Jannah Vizora
            </p>
            <h1 className="font-serif text-[18vw] md:text-[14vw] leading-[0.8] tracking-tighter uppercase italic">
              The <br /> Atelier.
            </h1>
          </motion.div>
        </div>

        {/* Hero Background Image - Low Opacity */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/Janaah.JPG" 
            alt="Atelier Atmosphere" 
            fill 
            className="object-cover opacity-30 grayscale" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
        </div>
      </section>

      {/* --- Section 2: Split Manifesto --- */}
      <section className="relative flex flex-col md:flex-row min-h-screen">
        {/* Left Side: Visual */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0">
          <Image 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070" 
            alt="Brutalist Interior" 
            fill 
            className="object-cover saturate-0 brightness-50" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              style={{ rotate: 360 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 md:w-48 md:h-48 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Command className="text-white/20" size={40} />
            </motion.div>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 bg-[#FAF9F6] text-[#0D0D0D] p-8 md:p-20 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <Hash className="text-[#C5A059]" />
            <h2 className="font-serif text-5xl md:text-7xl leading-none tracking-tighter">
              A philosophy of <span className="italic">Visual Silence.</span>
            </h2>
            <p className="text-lg md:text-xl font-light text-stone-500 leading-relaxed max-w-md">
              Luxury is the byproduct of removal. I architect digital environments that command instinctive authority by eliminating the noise of the modern landscape.
            </p>
            <div className="pt-10">
              <button className="group flex items-center gap-6 text-xs font-mono uppercase tracking-[0.4em] font-bold">
                Our Scenography
                <div className="h-10 w-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                  <Plus size={16} />
                </div>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Section 3: The Lead (Mobile Responsive Table) --- */}
      <section className="bg-[#0D0D0D] py-20 md:py-40 px-6 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Metadata Table */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-between">
            <div className="space-y-12">
               <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-[#C5A059]">Personnel_Archive</span>
               <h3 className="font-serif text-5xl md:text-6xl italic leading-none">Jannah <br /> Vizora</h3>
               
               <div className="space-y-4">
                  {[
                    { key: "Role", val: "Creative Director" },
                    { key: "Base", val: "Dubai / Global" },
                    { key: "Intel", val: "Digital Scenography" },
                  ].map((item) => (
                    <div key={item.key} className="flex justify-between border-b border-white/10 pb-4">
                      <span className="font-mono text-[9px] uppercase text-white/30">{item.key}</span>
                      <span className="text-sm font-medium tracking-tight">{item.val}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="mt-20 p-8 border border-white/5 rounded-2xl bg-white/[0.02]">
              <p className="font-mono text-[9px] uppercase tracking-widest text-white/20 mb-4">Current Status</p>
              <p className="text-sm font-light leading-relaxed text-white/60">
                Currently lead-directing 12 global accounts across EMEA and the US. Focusing on the intersection of consumer psychology and brutalist aesthetics.
              </p>
            </div>
          </div>

          {/* Portrait Image */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 1 }}
              className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-3xl"
            >
              <Image 
                src="/Janaah.JPG" 
                alt="Director Portrait" 
                fill 
                className="object-cover saturate-0 contrast-125 hover:saturate-100 transition-all duration-1000" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Section 4: The Pillars (Mobile Card Deck) --- */}
      <section className="bg-[#FAF9F6] text-[#0D0D0D] py-20 md:py-40 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-20 md:mb-32">
            <h2 className="font-serif text-6xl md:text-8xl leading-[0.8] tracking-tighter">
              Architectural <br /> <span className="italic text-stone-400 text-5xl md:text-8xl">Pillars.</span>
            </h2>
            <p className="max-w-xs text-sm font-mono uppercase tracking-widest text-stone-400">
              The fundamental laws of our atelier.
            </p>
          </div>

          {/* Scrolling Deck on Mobile, Grid on Desktop */}
          <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto no-scrollbar pb-10 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { title: "Rigor", id: "01", desc: "Every decision is calculated. We do not guess; we engineer visual structures based on logic." },
              { title: "Alchemy", id: "02", desc: "The transformation of data into emotion. We refine raw values into high-end aesthetics." },
              { title: "Retain", id: "03", desc: "Capturing attention is easy. Maintaining it requires a structural understanding of human desire." }
            ].map((pillar) => (
              <div key={pillar.id} className="min-w-[85vw] md:min-w-0 p-8 md:p-12 border border-black/10 rounded-[2rem] bg-white flex flex-col justify-between aspect-square md:aspect-auto md:h-[450px]">
                <span className="font-mono text-xs text-[#C5A059]">{pillar.id}</span>
                <div>
                  <h4 className="font-serif text-4xl mb-6 italic">{pillar.title}</h4>
                  <p className="text-sm font-light leading-relaxed text-stone-500">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 5: Closing (Footer CTA) --- */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black opacity-80" />
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069" 
            alt="End Frame" 
            fill 
            className="object-cover grayscale"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative z-10 space-y-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full backdrop-blur-md">
            <Globe className="text-emerald-500 animate-pulse" size={14} />
            <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Studio operational worldwide</span>
          </div>

          <h2 className="font-serif text-7xl md:text-[10vw] leading-none tracking-tighter italic">
            Start the <br /> <span className="text-[#C5A059] not-italic">Dialogue.</span>
          </h2>

          <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
            <button className="px-12 py-6 bg-[#C5A059] text-black font-mono text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-white transition-all">
              Initiate Consultation
            </button>
            <button className="px-12 py-6 border border-white/20 text-white font-mono text-[10px] uppercase tracking-widest font-bold rounded-full hover:bg-white/10 transition-all">
              Our Portfolios
            </button>
          </div>
        </motion.div>
      </section>

      {/* Scroll Styles */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}