import Image from "next/image";
import Hero from "./components/Hero";
import About from "./components/About";
import ArchitecturalProjectIndex from "./components/Architectural";
import ServicesSection from "./components/Services";
import PortfolioSection from "./components/Portfolio";
import ContactSection from "./components/Contact";

export default function Home() {
  return (
      <main className="min-h-screen">
        <Hero />
        <About />
        <ArchitecturalProjectIndex />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
  );
}
