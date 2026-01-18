"use client";

import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Instagram,
  ArrowUpRight,
  CheckCircle2,
  Loader2,
  Clock,
  MapPin,
  Globe,
  Mail,
  ArrowRight,
  Plus,
} from "lucide-react";
import Link from "next/link";

// --- Types ---
const SERVICES = [
  { value: "", label: "Subject of interest" },
  { value: "brand-identity", label: "Brand Identity Design" },
  { value: "social-strategy", label: "Social Media Strategy" },
  { value: "content-creation", label: "Content Creation" },
  { value: "other", label: "General Inquiry" },
] as const;

// --- 1. Studio Status Component (Premium Detail) ---
const StudioStatus = () => {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => setTime(new Date().toLocaleTimeString());
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
        <span>Studio Live</span>
      </div>
      <div className="h-4 w-px bg-stone-200" />
      <span>{time || '00:00:00'} GMT+4</span>
    </div>
  );
};

// --- 2. Enhanced Background (Aurora + Grain) ---
const ModernBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#F9F8F6]">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#1c1917 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
      
      {/* Aurora Layers */}
      <motion.div 
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }} 
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute -top-1/4 -left-1/4 w-full h-full bg-[#E8DCC0] rounded-full blur-[120px] opacity-40 mix-blend-multiply" 
      />
      <motion.div 
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }} 
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-[#C5A059]/10 rounded-full blur-[120px] opacity-30 mix-blend-multiply" 
      />

      {/* Interactive Light Follow */}
      <motion.div 
        style={{ left: smoothX, top: smoothY, translateX: "-50%", translateY: "-50%" }}
        className="absolute w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-40 mix-blend-overlay"
      />
      
      {/* Film Grain */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
    </div>
  );
};

// --- 3. Animated Input (Blueprint Style) ---
const AnimatedInput = ({ label, name, type = "text", value, onChange, error, placeholder, as = "input", options, rows = 3 }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="relative group">
      <div className="flex justify-between items-end mb-2">
        <label className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${isFocused || value ? "text-[#C5A059]" : "text-stone-400"}`}>
          {label}
        </label>
        {isFocused && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[8px] text-[#C5A059]">Active Input</motion.span>}
      </div>
      <div className="relative">
        {as === "textarea" ? (
          <textarea name={name} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={placeholder} rows={rows} className="w-full bg-transparent border-b border-stone-200 py-4 text-lg md:text-xl text-stone-800 placeholder:text-stone-300 outline-none resize-none" />
        ) : as === "select" ? (
          <select name={name} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="w-full bg-transparent border-b border-stone-200 py-4 text-lg md:text-xl text-stone-800 outline-none appearance-none cursor-pointer">
            {options?.map((option: any) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        ) : (
          <input type={type} name={name} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={placeholder} className="w-full bg-transparent border-b border-stone-200 py-4 text-lg md:text-xl text-stone-800 placeholder:text-stone-300 outline-none" />
        )}
        <motion.div animate={{ scaleX: isFocused ? 1 : 0 }} className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059] origin-left" />
      </div>
    </div>
  );
};

// --- Main Section ---
export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="relative w-full py-24 lg:py-40 overflow-hidden font-sans">
      <ModernBackground />

      <div className="relative z-10 container mx-auto px-6 md:px-12 lg:px-20">
        
        {/* --- HEADER --- */}
        <header className="mb-20 lg:mb-32 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="max-w-4xl">
            <StudioStatus />
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-8 font-serif text-6xl md:text-8xl lg:text-[10rem] text-stone-900 leading-[0.85] tracking-tighter"
            >
              Let's craft <br />
              <span className="italic text-[#C5A059]">authority.</span>
            </motion.h2>
          </div>
          <div className="lg:max-w-xs text-stone-500 font-light text-lg border-l border-stone-200 pl-8">
            <p>From visual identity to strategic digital narratives. Your next chapter starts here.</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* --- FORM COLUMN --- */}
          <div className="lg:col-span-7 relative">
            {/* Blueprint Crosshairs */}
            <Plus className="absolute -top-4 -left-4 w-4 h-4 text-stone-300" />
            <Plus className="absolute -top-4 -right-4 w-4 h-4 text-stone-300" />
            <Plus className="absolute -bottom-4 -left-4 w-4 h-4 text-stone-300" />

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[500px] flex flex-col items-center justify-center text-center bg-white border border-stone-100 rounded-3xl shadow-2xl p-12">
                  <div className="h-20 w-20 rounded-full bg-[#C5A059] flex items-center justify-center mb-6 shadow-xl shadow-amber-200">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="font-serif text-3xl mb-4 text-stone-900">Vision Received.</h3>
                  <p className="text-stone-500 max-w-xs mx-auto">I'll review your inquiry and respond within 24 hours to begin our dialogue.</p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 md:p-12 shadow-2xl shadow-stone-200/50 space-y-12"
                >
                  <div className="grid md:grid-cols-2 gap-12">
                    <AnimatedInput label="Your Name" value={formData.name} onChange={(e: any) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Alexander Noir" />
                    <AnimatedInput label="Email Address" value={formData.email} onChange={(e: any) => setFormData({...formData, email: e.target.value})} placeholder="alex@noir.com" />
                  </div>
                  <AnimatedInput label="Project Subject" as="select" options={SERVICES} value={formData.service} onChange={(e: any) => setFormData({...formData, service: e.target.value})} />
                  <AnimatedInput label="Project Brief" as="textarea" value={formData.message} onChange={(e: any) => setFormData({...formData, message: e.target.value})} placeholder="Describe your vision..." />
                  
                  <div className="pt-4">
                    <button 
                      disabled={isSubmitting}
                      className="group relative w-full md:w-auto overflow-hidden rounded-full bg-stone-900 text-white px-12 py-6 transition-all"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest font-bold">
                        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Initiate Brief"}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* --- INFO COLUMN --- */}
          <div className="lg:col-span-5 flex flex-col justify-between py-4">
            <div className="space-y-16">
              
              {/* Contact Cards */}
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#C5A059]">Connect Directly</span>
                  <div className="h-px flex-1 bg-stone-100" />
                </div>
                
                <a href="mailto:hello@jannahvizora.com" className="group flex items-center gap-8 border-b border-stone-100 pb-8 hover:border-[#C5A059] transition-colors">
                  <div className="h-14 w-14 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400 group-hover:bg-[#C5A059] group-hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-1">Email Inquiry</p>
                    <p className="font-serif text-2xl text-stone-900">hello@jannahvizora.com</p>
                  </div>
                </a>

                <div className="group flex items-center gap-8">
                  <div className="h-14 w-14 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400 mb-1">Base Location</p>
                    <p className="font-serif text-2xl text-stone-900">Dubai / Worldwide</p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="grid grid-cols-2 gap-4">
                <Link href="#" className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-stone-100 hover:shadow-xl transition-shadow">
                  <Instagram className="w-6 h-6 text-[#C5A059]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Instagram</span>
                  <p className="font-serif text-lg">@JannahVizora</p>
                </Link>
                <Link href="#" className="flex flex-col gap-4 p-6 rounded-3xl bg-white border border-stone-100 hover:shadow-xl transition-shadow">
                  <Globe className="w-6 h-6 text-[#C5A059]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-stone-400">Newsletter</span>
                  <p className="font-serif text-lg">Alchemy Weekly</p>
                </Link>
              </div>

            </div>

            {/* Subtle Footer Coordinate */}
            <div className="hidden lg:flex justify-between font-mono text-[9px] text-stone-300 uppercase tracking-[0.3em] mt-20">
              <span>COORD: 25.2048° N, 55.2708° E</span>
              <span>EST. 2024</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}