/**
 * ProgressNav – Fixed side navigation showing progress through the 15 points
 * Warm light theme: ochre dots on warm background
 */

import { motion } from "framer-motion";
import { type PolicyPoint } from "@/lib/points";

interface ProgressNavProps {
  points: PolicyPoint[];
  activePoint: number;
  onNavigate: (idx: number) => void;
}

export default function ProgressNav({ points, activePoint, onNavigate }: ProgressNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.5 }}
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-0"
    >
      {/* Vertical line behind dots */}
      <div className="absolute top-0 bottom-0 w-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.1)' }} />

      {points.map((point, idx) => {
        const isActive = idx === activePoint;
        const isPast = idx < activePoint;

        return (
          <button
            key={point.id}
            onClick={() => onNavigate(idx)}
            className="relative group py-[6px] px-3 flex items-center"
            aria-label={`Gå till punkt ${point.id}: ${point.title}`}
          >
            {/* Dot */}
            <div
              className={`relative z-10 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-3 h-3 shadow-[0_0_12px_rgba(155,107,26,0.35)]"
                  : isPast
                  ? "w-2 h-2"
                  : "w-2 h-2"
              }`}
              style={{
                backgroundColor: isActive
                  ? '#9B6B1A'
                  : isPast
                  ? 'oklch(0.58 0.16 55 / 0.4)'
                  : 'oklch(0.18 0.02 50 / 0.15)',
              }}
            />

            {/* Tooltip on hover */}
            <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              <div className="px-3 py-1.5 rounded-sm shadow-md" style={{ backgroundColor: '#faf6f0', border: '1px solid oklch(0.18 0.02 50 / 0.08)' }}>
                <span className="font-mono-display text-xs mr-2" style={{ color: '#9B6B1A' }}>
                  {point.id.toString().padStart(2, "0")}
                </span>
                <span className="font-body text-xs" style={{ color: '#5a4a3a' }}>
                  {point.title}
                </span>
              </div>
            </div>
          </button>
        );
      })}

      {/* Current point number */}
      <div className="mt-4 font-mono-display text-xs" style={{ color: 'oklch(0.58 0.16 55 / 0.6)' }}>
        {(activePoint + 1).toString().padStart(2, "0")}/15
      </div>
    </motion.nav>
  );
}
