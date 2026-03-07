/**
 * HeroSection – Full-viewport dramatic opening
 * Nordic Monumentalism: dark bg, massive typography, ochre accent
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/hero-main-NuQjcyFRLohKo72gZL75QT.webp";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden">
      {/* Background image with parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/20 to-[#0a0a0a]/90" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-16 lg:px-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-mono-display text-[#D4A843] tracking-[0.3em] text-sm md:text-base mb-4 md:mb-6 uppercase">
            Ett manifest för framtiden
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] font-black leading-[0.9] tracking-tight text-white max-w-5xl">
            Det Nya
            <br />
            <span className="text-[#D4A843]">Sverige</span>
          </h1>
          <div className="mt-6 md:mt-10 flex items-center gap-4">
            <div className="w-16 md:w-24 h-[2px] bg-[#D4A843]" />
            <p className="font-body text-white/70 text-lg md:text-xl font-light max-w-lg">
              15 punkter som underlättar människors resa
              <br className="hidden md:block" />
              i stället för det motsatta
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6 text-[#D4A843]/60" />
        </motion.div>
      </motion.div>
    </div>
  );
}
