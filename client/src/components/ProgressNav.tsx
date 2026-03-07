/**
 * ProgressNav – Fixed side navigation showing progress through the 15 points
 * Nordic Monumentalism: minimal, ochre dots, vertical line
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
      <div className="absolute top-0 bottom-0 w-[1px] bg-white/10" />

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
                  ? "w-3 h-3 bg-[#D4A843] shadow-[0_0_12px_rgba(212,168,67,0.4)]"
                  : isPast
                  ? "w-2 h-2 bg-[#D4A843]/40"
                  : "w-2 h-2 bg-white/15 group-hover:bg-white/30"
              }`}
            />

            {/* Tooltip on hover */}
            <div className="absolute right-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
              <div className="bg-[#1a1a1a] border border-white/10 px-3 py-1.5 rounded">
                <span className="font-mono-display text-[#D4A843] text-xs mr-2">
                  {point.id.toString().padStart(2, "0")}
                </span>
                <span className="font-body text-white/70 text-xs">
                  {point.title}
                </span>
              </div>
            </div>
          </button>
        );
      })}

      {/* Current point number */}
      <div className="mt-4 font-mono-display text-[#D4A843]/60 text-xs">
        {(activePoint + 1).toString().padStart(2, "0")}/15
      </div>
    </motion.nav>
  );
}
