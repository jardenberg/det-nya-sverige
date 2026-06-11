/**
 * DebateBanner – A visually striking "news flash" banner
 * linking to the debate analysis page.
 * Placed high on the homepage, after the hero section.
 * Shows the latest analysis and a count of total analyses.
 */

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { ArrowRight, Zap } from "lucide-react";
import { debates } from "@/lib/debates";

export default function DebateBanner() {
  const { lang, langPrefix } = useLang();

  // Show the most recent analysis by date (prioritize debates over interviews if same date)
  const sorted = [...debates].sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    // Same date: prioritize debates
    if (a.type === "debate" && b.type !== "debate") return -1;
    if (b.type === "debate" && a.type !== "debate") return 1;
    return 0;
  });
  const latest = sorted[0];
  const totalCount = debates.length;

  const title = lang === "sv" ? latest.title : latest.titleEn;
  const subtitle = lang === "sv" ? latest.subtitle : latest.subtitleEn;

  const cta = lang === "sv" ? "Läs analysen" : "Read the analysis";
  const countLabel = lang === "sv"
    ? `${totalCount} analyser`
    : `${totalCount} analyses`;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
    >
      <Link href={`${langPrefix}/debatter`}>
        <div
          className="group relative mx-auto max-w-5xl px-6 md:px-16 py-5 cursor-pointer"
        >
          {/* Subtle background accent */}
          <div
            className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ backgroundColor: "oklch(0.95 0.02 55 / 0.3)" }}
          />

          <div className="relative flex items-start gap-4">
            {/* Pulse indicator */}
            <div className="flex-shrink-0 mt-1">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <Zap size={18} style={{ color: "#9B6B1A" }} fill="#9B6B1A" />
                <div
                  className="absolute inset-0 rounded-full animate-ping opacity-30"
                  style={{ backgroundColor: "#9B6B1A" }}
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <span
                  className="inline-block px-2 py-0.5 rounded-sm font-mono-display text-[10px] tracking-widest uppercase"
                  style={{ backgroundColor: "#9B6B1A", color: "#fff" }}
                >
                  {lang === "sv" ? "Nytt" : "New"}
                </span>
                <span className="font-mono-display text-[11px] tracking-wider" style={{ color: "#b0a090" }}>
                  {latest.date} · {latest.source}
                </span>
                {totalCount > 1 && (
                  <span
                    className="inline-block px-2 py-0.5 rounded-sm font-mono-display text-[10px] tracking-wider"
                    style={{ backgroundColor: "oklch(0.92 0.01 55)", color: "#5a4a3a" }}
                  >
                    {countLabel}
                  </span>
                )}
              </div>

              <h3
                className="font-display text-base md:text-lg font-semibold leading-snug mb-1 group-hover:translate-x-1 transition-transform duration-300"
                style={{ color: "#2c1810" }}
              >
                {title}
              </h3>

              <p
                className="font-body text-xs md:text-sm font-light leading-relaxed line-clamp-2"
                style={{ color: "#5a4a3a" }}
              >
                {subtitle}
              </p>
            </div>

            {/* Arrow CTA */}
            <div className="flex-shrink-0 self-center">
              <div className="flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-300">
                <span
                  className="hidden sm:inline font-mono-display text-xs tracking-wider"
                  style={{ color: "#9B6B1A" }}
                >
                  {cta}
                </span>
                <ArrowRight size={16} style={{ color: "#9B6B1A" }} />
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-6 right-6 md:left-16 md:right-16 h-[1px]"
            style={{ backgroundColor: "oklch(0.18 0.02 50 / 0.08)" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
