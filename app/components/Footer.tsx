"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, ArrowRight, Hexagon, Plus, Globe, Instagram, Twitter, Linkedin } from "lucide-react";

// --- Types ---
interface FooterLink {
  label: string;
  href: string;
}

interface StudioLocation {
  city: string;
  label: string;
}

interface NoirFooterProps {
  brandName?: string;
  tagline?: React.ReactNode;
  estYear?: string;
  navigation?: {
    title: string;
    links: FooterLink[];
  }[];
  socials?: {
    platform: string;
    href: string;
    icon: React.ElementType;
  }[];
  locations?: StudioLocation[];
  onNewsletterSubmit?: (email: string) => void;
}

// --- Internal Magnetic Scroll Component ---
const ScrollToTop = () => {
  const [hovered, setHovered] = useState(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.button
      onClick={scrollToTop}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center gap-4"
    >
      <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full border border-zinc-800 flex items-center justify-center overflow-hidden bg-transparent transition-colors hover:border-[#C5A059]">
        <motion.div animate={{ y: hovered ? -40 : 0 }} className="flex flex-col items-center gap-10">
          <ArrowUp className="w-6 h-6 text-white" />
          <ArrowUp className="w-6 h-6 text-[#C5A059]" />
        </motion.div>
      </div>
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">Back to Top</span>
    </motion.button>
  );
};

// --- Main Noir Footer Component ---
export default function NoirFooter({
  brandName = "Jannah Vizora",
  tagline = <>Sculpting modern serenity through <span className="italic text-white">digital architecture</span>.</>,
  estYear = "2024",
  navigation = [
    {
      title: "Navigation",
      links: [
        { label: "Portfolios", href: "/projects" },
        { label: "Services", href: "/services" },
        { label: "Atelier", href: "/about" },
        { label: "Inquiry", href: "/contact" },
      ],
    },
  ],
  socials = [
    { platform: "Instagram", href: "#", icon: Instagram },
    { platform: "Twitter", href: "#", icon: Twitter },
    { platform: "LinkedIn", href: "#", icon: Linkedin },
  ],
  locations = [
    { city: "London", label: "Studio" },
    { city: "Dubai", label: "Base" },
    { city: "NYC", label: "Studio" },
  ],
  onNewsletterSubmit,
}: NoirFooterProps) {
  const [email, setEmail] = React.useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNewsletterSubmit) onNewsletterSubmit(email);
    setEmail("");
  };

  return (
    <footer className="relative w-full bg-[#080808] pt-24 pb-12 overflow-hidden border-t border-zinc-900 text-white selection:bg-[#C5A059] selection:text-black">
      
      {/* Subtle Light Leak */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C5A059]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Blueprint HUD Markers */}
      <Plus className="absolute top-12 left-12 w-4 h-4 text-[#C5A059]/40" />
      <Plus className="absolute top-12 right-12 w-4 h-4 text-[#C5A059]/40" />

      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          {/* Brand & Newsletter Column */}
          <div className="lg:col-span-5 space-y-12">
            <div className="flex items-center gap-4">
              <Hexagon className="w-7 h-7 text-[#C5A059]" strokeWidth={1.5} />
              <span className="font-serif text-3xl tracking-tight text-white">{brandName}</span>
            </div>
            
            <p className="font-light text-2xl text-zinc-400 leading-relaxed max-w-sm">
              {tagline}
            </p>
            
            <div className="pt-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 mb-6">Alchemy Weekly</p>
              <form onSubmit={handleNewsletter} className="relative max-w-md group">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..." 
                  className="w-full bg-transparent border-b border-zinc-800 py-4 font-serif text-xl outline-none focus:border-[#C5A059] transition-all placeholder:text-zinc-700"
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-3 hover:text-[#C5A059] transition-colors">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </form>
            </div>
          </div>

          {/* Navigation Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-20">
            {navigation.map((group, idx) => (
              <div key={idx} className="space-y-8">
                <h5 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">{group.title}</h5>
                <ul className="space-y-5">
                  {group.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link href={link.href} className="font-serif text-xl text-zinc-300 hover:text-white transition-colors inline-block">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            {/* Socials Column */}
            <div className="space-y-8">
              <h5 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C5A059]">Connect</h5>
              <div className="flex flex-wrap gap-4">
                {socials.map((social, sIdx) => {
                  const Icon = social.icon;
                  return (
                    <a 
                      key={sIdx} 
                      href={social.href} 
                      className="h-12 w-12 rounded-full border border-zinc-800 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
                      title={social.platform}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Back to Top (Desktop Only) */}
            <div className="hidden md:flex flex-col items-center justify-start pt-2">
               <ScrollToTop />
            </div>
          </div>
        </div>

        {/* Massive Stroke Signature */}
        <div className="relative border-b border-zinc-900 pb-12 mb-12 overflow-hidden">
           <motion.h2 
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[14vw] leading-none tracking-tighter select-none whitespace-nowrap text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
           >
             {brandName}
           </motion.h2>
           
           {/* Studio Locations */}
           <div className="flex flex-wrap gap-x-12 gap-y-6 mt-10">
             {locations.map((loc, idx) => (
               <div key={idx} className="flex items-center gap-3">
                 <span className="h-1.5 w-1.5 bg-[#C5A059] rounded-full" />
                 <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-500">
                   {loc.city} <span className="text-zinc-700 ml-1">[{loc.label}]</span>
                 </span>
               </div>
             ))}
           </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 font-mono text-[9px] uppercase tracking-[0.4em] text-zinc-600">
          <div className="flex items-center gap-4">
            <span>&copy; {new Date().getFullYear()} {brandName}</span>
            <div className="h-4 w-px bg-zinc-800 hidden md:block" />
            <span className="hidden md:block">Est. {estYear}</span>
          </div>
          
          <div className="flex gap-10">
             <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
             <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>

          <div className="flex items-center gap-2">
             <Globe className="w-3.5 h-3.5" />
             <span>Global Delivery</span>
          </div>
        </div>

      </div>

      {/* Decorative Noise Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05] invert mix-blend-screen"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />
    </footer>
  );
}