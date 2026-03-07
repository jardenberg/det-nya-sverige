/**
 * PolicyCard – Each of the 15 points as a manifest chapter
 * Nordic Monumentalism: massive background numbers, dramatic entrance, ochre accent
 * Alternating layouts for visual variety
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { type PolicyPoint } from "@/lib/points";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  BookOpen, Home, Briefcase, Rocket, GraduationCap,
  Heart, Building2, Stethoscope, Palette, Wifi,
  Handshake, Users, Leaf, Megaphone, BarChart3
} from "lucide-react";

const ICONS = [
  BookOpen, Home, Briefcase, Rocket, GraduationCap,
  Heart, Building2, Stethoscope, Palette, Wifi,
  Handshake, Users, Leaf, Megaphone, BarChart3
];

interface PolicyCardProps {
  point: PolicyPoint;
  index: number;
  isActive: boolean;
}

// Alternate layout patterns for visual variety
const getLayoutStyle = (idx: number) => {
  const patterns = ["left", "right", "center"] as const;
  return patterns[idx % 3];
};

export default function PolicyCard({ point, index, isActive }: PolicyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [expanded, setExpanded] = useState(false);
  const layout = getLayoutStyle(index);

  const numberStr = point.id.toString().padStart(2, "0");
  const Icon = ICONS[index] || BookOpen;

  return (
    <div
      ref={ref}
      className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
    >
      {/* Massive background number */}
      <div
        className={`absolute font-mono-display text-[10rem] sm:text-[14rem] md:text-[22rem] lg:text-[30rem] leading-none select-none pointer-events-none text-white/[0.025] ${
          layout === "right" ? "left-4 md:left-12" : "right-4 md:right-12"
        } top-1/2 -translate-y-1/2`}
      >
        {numberStr}
      </div>

      {/* Horizontal rule at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.06]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`${
            layout === "center"
              ? "max-w-3xl mx-auto text-center"
              : layout === "right"
              ? "ml-auto max-w-2xl text-right"
              : "max-w-2xl"
          }`}
        >
          {/* Icon + Category & Number */}
          <div className={`flex items-center gap-4 mb-5 ${layout === "right" ? "justify-end" : layout === "center" ? "justify-center" : ""}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <Icon className="w-5 h-5 text-[#D4A843]/60" strokeWidth={1.5} />
            </motion.div>
            <span className="font-mono-display text-[#D4A843] text-3xl md:text-4xl">
              {numberStr}
            </span>
            <div className="w-6 h-[2px] bg-[#D4A843]/40" />
            <span className="font-body text-white/35 text-[0.65rem] tracking-[0.2em] uppercase">
              {point.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.05] text-white mb-3">
            {point.title}
          </h2>

          {/* Subtitle */}
          <p className="font-body text-base md:text-lg text-[#D4A843]/90 font-light mb-6 leading-relaxed">
            {point.subtitle}
          </p>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`mb-6 ${
              layout === "right"
                ? "border-r-2 border-[#D4A843]/25 pr-5"
                : layout === "center"
                ? "border-t border-b border-[#D4A843]/15 py-4"
                : "border-l-2 border-[#D4A843]/25 pl-5"
            }`}
          >
            <p className="font-display text-base md:text-lg italic text-white/45 leading-relaxed">
              "{point.quote}"
            </p>
            {point.quoteAuthor && (
              <cite className="font-body text-xs text-white/25 mt-2 block not-italic">
                — {point.quoteAuthor}
              </cite>
            )}
          </motion.blockquote>

          {/* Expandable body text */}
          <div className="relative">
            <motion.div
              initial={false}
              animate={{ height: expanded ? "auto" : "0px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="font-body text-sm md:text-base text-white/45 leading-relaxed font-light pb-4">
                {point.body}
              </p>
            </motion.div>

            <button
              onClick={() => setExpanded(!expanded)}
              className={`group flex items-center gap-2 mt-3 font-body text-xs text-[#D4A843]/60 hover:text-[#D4A843] transition-colors ${
                layout === "right" ? "ml-auto" : layout === "center" ? "mx-auto" : ""
              }`}
            >
              <span className="tracking-[0.15em] uppercase">
                {expanded ? "Stäng" : "Läs mer"}
              </span>
              {expanded ? (
                <ChevronUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
