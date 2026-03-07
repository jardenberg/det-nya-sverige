/**
 * MobileNav – Mobile-friendly navigation overlay for the 15 points
 * Warm light theme: warm overlay, ochre accents
 * Language-aware
 */

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, ArrowUp } from "lucide-react";
import { usePoints } from "@/hooks/usePoints";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

interface MobileNavProps {
  activePoint: number;
  onNavigate: (idx: number) => void;
  showNav: boolean;
}

export default function MobileNav({ activePoint, onNavigate, showNav }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const points = usePoints();
  const { lang } = useLang();

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
          className="w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md"
          style={{ backgroundColor: 'oklch(0.99 0.005 80 / 0.9)', border: '1px solid oklch(0.18 0.02 50 / 0.1)' }}
          aria-label={t("goToTop", lang)}
        >
          <ArrowUp className="w-4 h-4" style={{ color: '#6a5a4a' }} />
        </button>

        {/* Menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-11 h-11 rounded-full flex items-center justify-center shadow-lg"
          style={{ backgroundColor: '#9B6B1A', boxShadow: '0 4px 15px oklch(0.58 0.16 55 / 0.3)' }}
          aria-label={t("openToc", lang)}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <div className="flex flex-col items-center">
              <Menu className="w-4 h-4 text-white" />
              <span className="text-[8px] font-mono-display text-white leading-none mt-0.5">
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
            className="fixed inset-0 z-40 backdrop-blur-md md:hidden"
            style={{ backgroundColor: 'oklch(0.97 0.01 80 / 0.97)' }}
          >
            <div className="h-full overflow-y-auto py-16 px-6">
              <p className="font-mono-display tracking-[0.3em] text-xs mb-8" style={{ color: '#8B6914' }}>
                {t("mobileNavTitle", lang)}
              </p>
              <div className="space-y-1">
                {points.map((point, idx) => {
                  const isActive = idx === activePoint;
                  return (
                    <button
                      key={point.id}
                      onClick={() => handleNavigate(idx)}
                      className="w-full text-left py-3 px-4 rounded-sm transition-colors flex items-start gap-4"
                      style={{
                        backgroundColor: isActive ? 'oklch(0.58 0.16 55 / 0.08)' : 'transparent',
                      }}
                    >
                      <span className="font-mono-display text-lg shrink-0" style={{
                        color: isActive ? '#9B6B1A' : '#b0a090'
                      }}>
                        {point.id.toString().padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-display text-base leading-tight" style={{
                          color: isActive ? '#2c1810' : '#6a5a4a'
                        }}>
                          {point.title}
                        </p>
                        <p className="font-body text-xs mt-1" style={{ color: '#b0a090' }}>
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
