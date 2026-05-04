/**
 * Det Nya Sverige – 15 Punkter
 * Design: Nordic Monumentalism (Warm Light)
 * Warm cream background, dark text, ochre (#9B6B1A) accent
 * Playfair Display for headings, Source Sans 3 for body, Bebas Neue for numbers
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { useParams } from "wouter";
import { usePoints } from "@/hooks/usePoints";
import { useLang } from "@/contexts/LanguageContext";
import HeroSection from "@/components/HeroSection";
import ManifestoIntro from "@/components/ManifestoIntro";
import PolicyCard from "@/components/PolicyCard";
import ProgressNav from "@/components/ProgressNav";
import MobileNav from "@/components/MobileNav";
import TotalCounter from "@/components/TotalCounter";
import ClosingSection from "@/components/ClosingSection";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import DebateBanner from "@/components/DebateBanner";

export default function Home() {
  const points = usePoints();
  const { lang, langPrefix } = useLang();
  const [activePoint, setActivePoint] = useState<number>(0);
  const [showNav, setShowNav] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Get route params (from /punkt/:id or /en/punkt/:id)
  const params = useParams<{ id?: string }>();

  // Set document title based on language
  useEffect(() => {
    document.title = lang === "sv"
      ? "Det Nya Sverige \u2013 15 Punkter f\u00f6r Framtiden"
      : "The New Sweden \u2013 15 Points for the Future";
  }, [lang]);

  // Handle navigation to specific point on page load
  // Supports: /punkt/3, /en/punkt/3 (clean URL), ?punkt=3 (legacy), #punkt-3 (hash)
  useEffect(() => {
    const scrollToPoint = () => {
      let targetId: number | null = null;

      // Priority 1: /punkt/:id route param (works for both /punkt/3 and /en/punkt/3)
      if (params?.id) {
        targetId = parseInt(params.id, 10);
      }

      // Priority 2: ?punkt=N query param (legacy from old shares)
      if (!targetId) {
        const searchParams = new URLSearchParams(window.location.search);
        const punktParam = searchParams.get('punkt');
        if (punktParam) {
          targetId = parseInt(punktParam, 10);
        }
      }

      // Priority 3: #punkt-N hash
      if (!targetId) {
        const hash = window.location.hash;
        if (hash && hash.startsWith('#punkt-')) {
          targetId = parseInt(hash.replace('#punkt-', ''), 10);
        }
      }

      if (targetId && targetId >= 1 && targetId <= 15) {
        // Clean up URL to show /punkt/N or /en/punkt/N
        const expectedPath = `${langPrefix}/punkt/${targetId}`;
        if (window.location.pathname !== expectedPath) {
          window.history.replaceState(null, '', expectedPath);
        }

        // Scroll to the point after a short delay for DOM rendering
        setTimeout(() => {
          const el = document.getElementById(`punkt-${targetId}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            hasEnteredPoints.current = true;
          }
        }, 300);
      }
    };

    scrollToPoint();
    window.addEventListener('hashchange', scrollToPoint);
    return () => window.removeEventListener('hashchange', scrollToPoint);
  }, [params?.id, langPrefix]);

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

  // Keyboard navigation: J = up/back, L = down/forward (user preference)
  // Also: ArrowUp = back, ArrowDown = forward
  // Track whether user has entered the points section yet
  const hasEnteredPoints = useRef(false);

  useEffect(() => {
    // Mark as entered once we scroll past the hero
    if (showNav) hasEnteredPoints.current = true;
  }, [showNav]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Don't hijack if user is typing in a textarea/input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;

      if (e.key === "ArrowDown" || e.key === "l" || e.key === "L") {
        e.preventDefault();
        if (!hasEnteredPoints.current) {
          // First time pressing down: go to point 1 (index 0)
          sectionRefs.current[0]?.scrollIntoView({ behavior: "smooth" });
          hasEnteredPoints.current = true;
        } else {
          const next = Math.min(activePoint + 1, points.length - 1);
          sectionRefs.current[next]?.scrollIntoView({ behavior: "smooth" });
        }
      } else if (e.key === "ArrowUp" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        const prev = Math.max(activePoint - 1, 0);
        sectionRefs.current[prev]?.scrollIntoView({ behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activePoint, points.length]);

  const scrollToPoint = useCallback((idx: number) => {
    sectionRefs.current[idx]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LanguageSwitcher />
      <HeroSection />
      <DebateBanner />
      <ManifestoIntro />

      {/* Desktop Progress Navigation */}
      <AnimatePresence>
        {showNav && (
          <ProgressNav
            points={points}
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
        {points.map((point, idx) => (
          <section
            key={point.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            id={`punkt-${point.id}`}
          >
            <PolicyCard point={point} index={idx} isActive={activePoint === idx} />
          </section>
        ))}
      </div>

      <TotalCounter />
      <ClosingSection />
      <Footer />
    </div>
  );
}
