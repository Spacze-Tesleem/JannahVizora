"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
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
} from "lucide-react";

// ... [Keep existing CONSTANTS (SERVICES, SOCIAL_LINKS) here] ...
const SERVICES = [
  { value: "", label: "Select a subject..." },
  { value: "brand-identity", label: "Brand Identity Design" },
  { value: "social-strategy", label: "Social Media Strategy" },
  { value: "content-creation", label: "Content Creation" },
  { value: "personal-branding", label: "Personal Branding" },
  { value: "consulting", label: "1:1 Consulting" },
  { value: "other", label: "General Inquiry" },
] as const;

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@JannahVizora",
    url: "https://instagram.com/jannahvizora",
    icon: Instagram,
    gradient: "from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
    followers: "24.5K",
    label: "Visual Portfolio",
  },
  {
    name: "TikTok",
    handle: "@JannahVizora",
    url: "https://tiktok.com/@jannahvizora",
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    ),
    gradient: "from-[#00f2ea] via-[#ff0050] to-[#00f2ea]",
    followers: "18.2K",
    label: "Behind the Scenes",
  },
];

// --- 1. Enhanced Background Component ---
const ModernBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth mouse movement
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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base Color */}
      <div className="absolute inset-0 bg-[#FAFAF9]" />

      {/* Architectural Grid (Subtle) */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#1c1917 1px, transparent 1px), linear-gradient(90deg, #1c1917 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 100%)",
        }}
      />

      {/* Floating Aurora Blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#E8DCC0] rounded-full mix-blend-multiply filter blur-[80px] opacity-60"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] bg-[#F5E6D3] rounded-full mix-blend-multiply filter blur-[80px] opacity-60"
      />
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 50, 50, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] bg-[#C5A059] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"
      />

      {/* Interactive Mouse Spotlight */}
      <motion.div
        style={{
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[600px] h-[600px] bg-white rounded-full mix-blend-overlay filter blur-[80px] opacity-80"
      />

      {/* Cinematic Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

// ... [Keep existing Helper Components: MagneticButton, AnimatedInput, TiltCard, SocialLinkCard] ...
// (If you need me to paste those again, let me know, but they remain unchanged from the previous version)

const MagneticButton = React.memo(({ children, className, onClick, type = "button", disabled }: any) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current || disabled) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
    }, [x, y, disabled]);

    const handleMouseLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);

    return (
        <motion.button
            ref={ref} type={type} style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={onClick} disabled={disabled}
            whileTap={{ scale: 0.95 }} className={className}
        >
            {children}
        </motion.button>
    );
});
MagneticButton.displayName = "MagneticButton";

const AnimatedInput = React.memo(({ label, name, type = "text", value, onChange, error, placeholder, as = "input", options, rows = 4 }: any) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <div className="relative group">
            <label className={`block font-mono text-xs uppercase tracking-widest mb-2 transition-colors duration-300 ${isFocused || value ? "text-[#C5A059]" : "text-stone-400"}`}>{label}</label>
            <div className="relative">
                {as === "textarea" ? (
                    <textarea name={name} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={placeholder} rows={rows} className="w-full bg-transparent border-b border-stone-200 py-4 text-xl md:text-2xl text-stone-800 placeholder:text-stone-300 outline-none resize-none transition-all duration-300 focus:border-transparent" />
                ) : as === "select" ? (
                    <div className="relative">
                        <select name={name} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="w-full bg-transparent border-b border-stone-200 py-4 text-xl md:text-2xl text-stone-800 outline-none appearance-none cursor-pointer focus:border-transparent">
                            {options?.map((option: any) => <option key={option.value} value={option.value} disabled={option.value === ""}>{option.label}</option>)}
                        </select>
                        <ArrowRight className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rotate-90 text-stone-400 pointer-events-none" />
                    </div>
                ) : (
                    <input type={type} name={name} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder={placeholder} className="w-full bg-transparent border-b border-stone-200 py-4 text-xl md:text-2xl text-stone-800 placeholder:text-stone-300 outline-none transition-all duration-300 focus:border-transparent" />
                )}
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: isFocused ? 1 : 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C5A059] origin-left" />
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: error ? 1 : 0 }} className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500 origin-left" />
            </div>
            <AnimatePresence>{error && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="absolute -bottom-6 left-0 text-red-500 text-xs font-mono tracking-wide">{error}</motion.p>}</AnimatePresence>
        </div>
    );
});
AnimatedInput.displayName = "AnimatedInput";

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });
    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
        y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
    };
    return (
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }} className={className}>
            {children}
        </motion.div>
    );
};

const SocialLinkCard = React.memo(({ social, index }: { social: typeof SOCIAL_LINKS[0]; index: number }) => {
    const Icon = social.icon;
    return (
        <TiltCard className="relative group perspective-1000">
            <motion.a href={social.url} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="block">
                <div className="relative overflow-hidden rounded-[2rem] bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-sm border border-stone-100 transition-all duration-500 hover:shadow-2xl">
                    <motion.div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${social.gradient}`} />
                    <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: "translateZ(20px)" }}>
                        <div className="flex justify-between items-start mb-8">
                            <div className={`p-3 rounded-2xl bg-gradient-to-br ${social.gradient} text-white shadow-lg`}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex items-center gap-1 text-stone-300 group-hover:text-[#C5A059] transition-colors">
                                <span className="text-xs font-mono uppercase tracking-wider hidden group-hover:block">Visit</span>
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-1">{social.label}</p>
                            <h3 className="font-serif text-2xl text-stone-800">{social.handle}</h3>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="h-px w-8 bg-stone-200 group-hover:bg-[#C5A059] transition-colors" />
                                <span className="text-sm font-medium text-stone-500">{social.followers} Followers</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.a>
        </TiltCard>
    );
});


export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]); // Subtle parallax for content

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.service) newErrors.service = "Please select a topic";
    if (!formData.message.trim()) newErrors.message = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
        setFormData({ name: "", email: "", service: "", message: "" });
        setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section ref={sectionRef} className="relative w-full text-stone-900 py-32 lg:py-40 overflow-hidden">
      
      {/* 2. Insert Enhanced Background */}
      <ModernBackground />

      <motion.div style={{ y: contentY }} className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Header */}
        <header ref={headerRef} className="mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-stone-200/50 pb-12"
          >
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-2 w-2 relative">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">Accepting New Projects</span>
              </div>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-stone-900 leading-[0.95] tracking-tight">
                Let's build your <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] to-[#8B7355]">legacy</span> together.
              </h2>
            </div>
            <div className="max-w-xs pb-2">
              <p className="text-stone-500 font-light leading-relaxed">
                Specializing in brand identity and digital strategy for visionaries who want to leave a mark.
              </p>
            </div>
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="relative">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-[600px] flex flex-col items-center justify-center text-center bg-white/60 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-2xl shadow-stone-200/50 p-12"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                      className="h-24 w-24 rounded-full bg-[#C5A059] flex items-center justify-center mb-8 shadow-xl shadow-[#C5A059]/20"
                    >
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="font-serif text-4xl text-stone-900 mb-4">Received</h3>
                    <p className="text-stone-500 text-lg max-w-md">Your vision has been captured. I will review your details and be in touch within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    ref={formRef} onSubmit={handleSubmit}
                    className="space-y-12 bg-white/60 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-white/50 shadow-2xl shadow-stone-200/50"
                  >
                    <div className="grid md:grid-cols-2 gap-12">
                      <AnimatedInput label="What should I call you?" name="name" placeholder="John Doe" value={formData.name} onChange={(e: any) => setFormData({ ...formData, name: e.target.value })} error={errors.name} />
                      <AnimatedInput label="Where can I reach you?" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={(e: any) => setFormData({ ...formData, email: e.target.value })} error={errors.email} />
                    </div>
                    <AnimatedInput label="What's on your mind?" name="service" as="select" value={formData.service} onChange={(e: any) => setFormData({ ...formData, service: e.target.value })} error={errors.service} options={SERVICES} />
                    <AnimatedInput label="Tell me about the project" name="message" as="textarea" placeholder="I'm looking to rebrand my company..." value={formData.message} onChange={(e: any) => setFormData({ ...formData, message: e.target.value })} error={errors.message} rows={3} />
                    <div className="pt-4">
                      <MagneticButton type="submit" disabled={isSubmitting} className="group relative w-full md:w-auto overflow-hidden rounded-full bg-[#1c1917] text-[#FAFAF9] px-12 py-6 transition-all hover:shadow-2xl hover:shadow-stone-900/20 disabled:opacity-70">
                         <div className="relative z-10 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.2em]">
                           {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" />Processing</> : <>Send Inquiry<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>}
                         </div>
                         <div className="absolute inset-0 bg-[#C5A059] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-[#1c1917] text-[#FAFAF9] rounded-[2rem] p-10 relative overflow-hidden shadow-2xl shadow-stone-900/20">
               <div className="absolute top-0 right-0 p-10 opacity-10"><Globe className="w-32 h-32 rotate-12" /></div>
               <div className="relative z-10 space-y-8">
                  <div><h3 className="font-serif text-3xl mb-1">Direct Contact</h3><p className="text-white/40 font-light text-sm">For urgent inquiries</p></div>
                  <div className="space-y-6">
                     <a href="mailto:hello@jannahvizora.com" className="group flex items-center gap-4 hover:text-[#C5A059] transition-colors">
                        <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-[#1c1917] group-hover:border-[#C5A059] transition-all"><Mail className="w-5 h-5" /></div>
                        <div><p className="font-mono text-[10px] uppercase tracking-wider opacity-50 mb-1">Email</p><p className="text-lg">hello@jannahvizora.com</p></div>
                     </a>
                     <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center"><Clock className="w-5 h-5" /></div>
                        <div><p className="font-mono text-[10px] uppercase tracking-wider opacity-50 mb-1">Response Time</p><p className="text-lg">Within 24-48 Hours</p></div>
                     </div>
                  </div>
               </div>
            </motion.div>
            <div className="space-y-6">
              <div className="flex items-center gap-4"><div className="h-px flex-1 bg-stone-200" /><span className="font-mono text-xs uppercase tracking-widest text-stone-400">Social Presence</span><div className="h-px flex-1 bg-stone-200" /></div>
              <div className="grid gap-6">
                {SOCIAL_LINKS.map((social, index) => <SocialLinkCard key={social.name} social={social} index={index} />)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}