/**
 * HeroSection – Full-viewport dramatic opening
 * Split layout: solid warm cream left panel with text, image on right
 * Warm light theme with language support
 */

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/hero-main-NuQjcyFRLohKo72gZL75QT.webp";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLang();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const subtitleLines = t("heroSubtitle", lang).split("\n");

  return (
    <div ref={ref} className="relative h-screen overflow-hidden" style={{ backgroundColor: '#f3ece3' }}>
      {/* Right side: Image with parallax zoom */}
      <motion.div
        style={{ scale: imageScale }}
        className="absolute top-0 right-0 w-full md:w-[65%] h-full"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        {/* Soft left edge blend into the warm background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #f3ece3 0%, #f3ece3 20%, rgba(243,236,227,0.95) 30%, rgba(243,236,227,0.6) 45%, transparent 65%)' }} />
        {/* Bottom fade */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, #f3ece3 100%)' }} />
      </motion.div>

      {/* Left side: Text content on solid warm background */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 h-full flex flex-col justify-center md:justify-end pb-16 md:pb-28 px-6 md:px-16 lg:px-24 max-w-2xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="font-mono-display tracking-[0.3em] text-sm md:text-base mb-5 md:mb-7 uppercase"
            style={{ color: '#5a3d00' }}
          >
            {t("heroTagline", lang)}
          </p>
          <h1
            className="font-display text-[3.2rem] md:text-7xl lg:text-[6.5rem] font-black leading-[0.88] tracking-tight"
            style={{ color: '#000000' }}
          >
            {t("heroTitle1", lang)}
            <br />
            <span style={{ color: '#7a4d00' }}>{t("heroTitle2", lang)}</span>
          </h1>
          <div className="mt-7 md:mt-10 flex items-start gap-4">
            <div className="w-12 md:w-20 h-[2px] mt-3 shrink-0" style={{ backgroundColor: '#7a4d00' }} />
            <p className="font-body text-base md:text-xl font-light max-w-md" style={{ color: '#1a0e08' }}>
              {subtitleLines[0]}
              <br className="hidden md:block" />
              {subtitleLines[1]}
            </p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 md:left-24 -translate-x-1/2 md:translate-x-0"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-6 h-6" style={{ color: '#7a4d00' }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
