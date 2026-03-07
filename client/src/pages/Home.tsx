/**
 * Det Nya Sverige – 15 Punkter
 * Design: Nordic Monumentalism
 * Dark background (#0A0A0A), white text, ochre (#D4A843) accent
 * Playfair Display for headings, Source Sans 3 for body, Bebas Neue for numbers
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { policyPoints } from "@/lib/points";
import HeroSection from "@/components/HeroSection";
import ManifestoIntro from "@/components/ManifestoIntro";
import PolicyCard from "@/components/PolicyCard";
import ProgressNav from "@/components/ProgressNav";
import MobileNav from "@/components/MobileNav";
import ClosingSection from "@/components/ClosingSection";
import Footer from "@/components/Footer";

export default function Home() {
  const [activePoint, setActivePoint] = useState<number>(0);
  const [showNav, setShowNav] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Track scroll to determine active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (idx >= 0) {
              setActivePoint(idx);
            }
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Show nav after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        const next = Math.min(activePoint + 1, policyPoints.length - 1);
        sectionRefs.current[next]?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        const prev = Math.max(activePoint - 1, 0);
        sectionRefs.current[prev]?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activePoint]);

  const scrollToPoint = useCallback((idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <HeroSection />
      <ManifestoIntro />

      {/* Desktop Progress Navigation */}
      <AnimatePresence>
        {showNav && (
          <ProgressNav
            points={policyPoints}
            activePoint={activePoint}
            onNavigate={scrollToPoint}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation */}
      <MobileNav
        activePoint={activePoint}
        onNavigate={scrollToPoint}
        showNav={showNav}
      />

      {/* The 15 Points */}
      <div className="relative">
        {policyPoints.map((point, idx) => (
          <section
            key={point.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            id={`punkt-${point.id}`}
          >
            <PolicyCard point={point} index={idx} isActive={activePoint === idx} />
          </section>
        ))}
      </div>

      <ClosingSection />
      <Footer />
    </div>
  );
}
