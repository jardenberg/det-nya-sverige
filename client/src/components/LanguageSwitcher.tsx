/**
 * LanguageSwitcher – Elegant sv/en toggle
 * Warm light theme: subtle, fixed position
 */

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLang();

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      onClick={toggleLang}
      className="fixed top-5 right-5 md:top-8 md:right-8 z-50 flex items-center gap-0 font-mono-display text-xs tracking-wider rounded-sm overflow-hidden shadow-sm"
      style={{ border: '1px solid oklch(0.18 0.02 50 / 0.1)' }}
      aria-label={lang === "sv" ? "Switch to English" : "Byt till svenska"}
    >
      <span
        className="px-3 py-2 transition-all duration-300"
        style={{
          backgroundColor: lang === "sv" ? '#9B6B1A' : 'oklch(0.99 0.005 80 / 0.9)',
          color: lang === "sv" ? '#fff' : '#8a7a6a',
        }}
      >
        SV
      </span>
      <span
        className="px-3 py-2 transition-all duration-300"
        style={{
          backgroundColor: lang === "en" ? '#9B6B1A' : 'oklch(0.99 0.005 80 / 0.9)',
          color: lang === "en" ? '#fff' : '#8a7a6a',
        }}
      >
        EN
      </span>
    </motion.button>
  );
}
