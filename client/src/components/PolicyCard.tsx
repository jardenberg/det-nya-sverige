/**
 * PolicyCard – Each of the 15 points as a manifest chapter
 * Warm light theme with data metrics dashboard, share button, vote button, comment section, and language support
 * Body text always visible (no "read more" toggle)
 * Action buttons aligned on a single row
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { type PolicyPoint } from "@/lib/points";
import { useLang } from "@/contexts/LanguageContext";
import ShareButton from "./ShareButton";
import VoteButton from "./VoteButton";
import CommentSection from "./CommentSection";
import { Banknote, Users2, BarChart3 as BarIcon, Clock, Building, Globe } from "lucide-react";
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

const METRIC_ICONS = {
  money: Banknote,
  people: Users2,
  chart: BarIcon,
  clock: Clock,
  building: Building,
  globe: Globe,
};

interface PolicyCardProps {
  point: PolicyPoint;
  index: number;
  isActive: boolean;
}

const getLayoutStyle = (idx: number) => {
  const patterns = ["left", "right", "center"] as const;
  return patterns[idx % 3];
};

export default function PolicyCard({ point, index, isActive }: PolicyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const layout = getLayoutStyle(index);
  const { lang } = useLang();

  const numberStr = point.id.toString().padStart(2, "0");
  const Icon = ICONS[index] || BookOpen;

  return (
    <div
      ref={ref}
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden"
    >
      {/* Massive background number */}
      <div
        className={`absolute font-mono-display text-[10rem] sm:text-[14rem] md:text-[22rem] lg:text-[30rem] leading-none select-none pointer-events-none ${
          layout === "right" ? "left-4 md:left-12" : "right-4 md:right-12"
        } top-1/2 -translate-y-1/2`}
        style={{ color: 'oklch(0.18 0.02 50 / 0.04)' }}
      >
        {numberStr}
      </div>

      {/* Horizontal rule at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.07)' }} />

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
              <Icon className="w-5 h-5" style={{ color: '#9B6B1A' }} strokeWidth={1.5} />
            </motion.div>
            <span className="font-mono-display text-3xl md:text-4xl" style={{ color: '#9B6B1A' }}>
              {numberStr}
            </span>
            <div className="w-6 h-[2px]" style={{ backgroundColor: 'oklch(0.58 0.16 55 / 0.4)' }} />
            <span className="font-body text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: '#8a7a6a' }}>
              {point.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.05] mb-3" style={{ color: '#2c1810' }}>
            {point.title}
          </h2>

          {/* Subtitle */}
          <p className="font-body text-base md:text-lg font-light mb-6 leading-relaxed" style={{ color: '#9B6B1A' }}>
            {point.subtitle}
          </p>

          {/* Illustrated image for the point */}
          {point.ogImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="mb-8 overflow-hidden rounded-sm"
            >
              <img
                src={point.ogImage}
                alt={point.title}
                className="w-full h-auto"
                style={{ filter: 'saturate(1.05)' }}
                loading="lazy"
              />
            </motion.div>
          )}

          {/* Data Metrics Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className={`grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 ${layout === "center" ? "max-w-xl mx-auto" : ""}`}
          >
            {point.metrics.map((metric, i) => {
              const MetricIcon = METRIC_ICONS[metric.icon];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                  className="rounded-sm p-3 md:p-4 text-left"
                  style={{ backgroundColor: 'oklch(0.95 0.02 75 / 0.6)', borderLeft: '2px solid oklch(0.68 0.14 65 / 0.3)' }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <MetricIcon className="w-3 h-3" style={{ color: '#9B6B1A' }} strokeWidth={1.5} />
                    <span className="font-body text-[0.6rem] md:text-[0.65rem] tracking-wider uppercase" style={{ color: '#8a7a6a' }}>
                      {metric.label}
                    </span>
                  </div>
                  <p className="font-display text-lg md:text-xl font-bold" style={{ color: '#2c1810' }}>
                    {metric.value}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className={`mb-6 ${
              layout === "right"
                ? "border-r-2 pr-5"
                : layout === "center"
                ? "border-t border-b py-4"
                : "border-l-2 pl-5"
            }`}
            style={{ borderColor: 'oklch(0.58 0.16 55 / 0.2)' }}
          >
            <p className="font-display text-base md:text-lg italic leading-relaxed" style={{ color: '#6a5a4a' }}>
              "{point.quote}"
            </p>
            {point.quoteAuthor && (
              <cite className="font-body text-xs mt-2 block not-italic" style={{ color: '#9a8a7a' }}>
                — {point.quoteAuthor}
              </cite>
            )}
          </motion.blockquote>

          {/* Body text – always visible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <p className="font-body text-sm md:text-base leading-relaxed font-light mb-6" style={{ color: '#5a4a3a' }}>
              {point.body}
            </p>
          </motion.div>

          {/* Action row: Share + Vote + Discussion – all on one line, comment panel expands below */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className={`flex flex-wrap items-center gap-3 ${
              layout === "right" ? "justify-end" : layout === "center" ? "justify-center" : ""
            }`}
          >
            <ShareButton point={point} layout={layout} />
            <VoteButton pointId={point.id} layout={layout} />
            <CommentSection pointId={point.id} layout={layout} inline />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
