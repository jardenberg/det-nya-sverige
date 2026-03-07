/**
 * MobileNav – Mobile-friendly navigation overlay for the 15 points
 * Nordic Monumentalism: dark overlay, ochre accents
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, ArrowUp } from "lucide-react";
import { policyPoints } from "@/lib/points";

interface MobileNavProps {
  activePoint: number;
  onNavigate: (idx: number) => void;
  showNav: boolean;
}

export default function MobileNav({ activePoint, onNavigate, showNav }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (idx: number) => {
    onNavigate(idx);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showNav) return null;

  return (
    <>
      {/* Mobile menu button - bottom right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col gap-3"
      >
        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className="w-11 h-11 rounded-full bg-[#1a1a1a]/90 border border-white/10 flex items-center justify-center backdrop-blur-sm"
          aria-label="Tillbaka till toppen"
        >
          <ArrowUp className="w-4 h-4 text-white/50" />
        </button>

        {/* Menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 rounded-full bg-[#D4A843]/90 flex items-center justify-center shadow-lg shadow-[#D4A843]/20"
          aria-label="Öppna innehållsförteckning"
        >
          {isOpen ? (
            <X className="w-5 h-5 text-[#0a0a0a]" />
          ) : (
            <div className="flex flex-col items-center">
              <Menu className="w-4 h-4 text-[#0a0a0a]" />
              <span className="text-[8px] font-mono-display text-[#0a0a0a] leading-none mt-0.5">
                {(activePoint + 1).toString().padStart(2, "0")}
              </span>
            </div>
          )}
        </button>
      </motion.div>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md md:hidden"
          >
            <div className="h-full overflow-y-auto py-16 px-6">
              <p className="font-mono-display text-[#D4A843] tracking-[0.3em] text-xs mb-8">
                INNEHÅLL
              </p>
              <div className="space-y-1">
                {policyPoints.map((point, idx) => {
                  const isActive = idx === activePoint;
                  return (
                    <button
                      key={point.id}
                      onClick={() => handleNavigate(idx)}
                      className={`w-full text-left py-3 px-4 rounded transition-colors flex items-start gap-4 ${
                        isActive
                          ? "bg-[#D4A843]/10"
                          : "hover:bg-white/5"
                      }`}
                    >
                      <span className={`font-mono-display text-lg shrink-0 ${
                        isActive ? "text-[#D4A843]" : "text-white/25"
                      }`}>
                        {point.id.toString().padStart(2, "0")}
                      </span>
                      <div>
                        <p className={`font-display text-base leading-tight ${
                          isActive ? "text-white" : "text-white/60"
                        }`}>
                          {point.title}
                        </p>
                        <p className="font-body text-xs text-white/25 mt-1">
                          {point.category}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
