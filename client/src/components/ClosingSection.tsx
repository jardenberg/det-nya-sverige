/**
 * ClosingSection – The emotional closing after all 15 points
 * Warm light theme: warm imagery, personal voice, call to action
 * Language-aware
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

const CITY_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/closing-city-jSfBBxsq4hkCCKrCvT3SWL.webp";
const HANDS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/closing-together-H5LCH9M6RsgZmyNms5FSZD.webp";
const FUTURE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/closing-future-S7eLDSEQC5pHoohpTBpWwk.webp";

export default function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLang();

  return (
    <section className="relative">
      {/* Image divider */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={CITY_IMAGE}
          alt={lang === "sv" ? "Skandinavisk stad vid vatten, kvällsljus" : "Scandinavian city by water, evening light"}
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(1.1) brightness(1.05)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, oklch(0.97 0.01 80 / 0.6), transparent, oklch(0.97 0.01 80 / 0.8))' }} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-mono-display text-6xl md:text-8xl lg:text-9xl tracking-wider"
            style={{ color: '#9B6B1A' }}
          >
            15
          </motion.p>
        </div>
      </div>

      {/* Closing text */}
      <div ref={ref} className="py-24 md:py-40 max-w-4xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-12 h-[2px] mb-10" style={{ backgroundColor: '#9B6B1A' }} />

          <h2 className="font-display text-3xl md:text-5xl font-black leading-tight mb-8" style={{ color: '#2c1810' }}>
            {t("closingTitle", lang)}
          </h2>

          <div className="space-y-6">
            <p className="font-body text-lg md:text-xl leading-relaxed font-light" style={{ color: '#5a4a3a' }}>
              {t("closingP1", lang)}
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed font-light" style={{ color: '#5a4a3a' }}>
              {t("closingP2Prefix", lang)}
              <span className="font-medium" style={{ color: '#9B6B1A' }}>{t("closingP2Highlight", lang)}</span>
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed font-light" style={{ color: '#5a4a3a' }}>
              {t("closingP3", lang)}
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed font-normal" style={{ color: '#3d2a1e' }}>
              {t("closingP4", lang)}
            </p>
          </div>
        </motion.div>

        {/* Total investment summary */}
        <motion.div
          className="mt-16 md:mt-20 p-8 md:p-12 rounded-sm"
          style={{ backgroundColor: 'oklch(0.93 0.025 70 / 0.5)', borderLeft: '3px solid #9B6B1A' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono-display tracking-[0.2em] text-xs uppercase mb-4" style={{ color: '#8B6914' }}>
            {t("totalInvestmentLabel", lang)}
          </p>
          <p className="font-display text-4xl md:text-6xl font-black mb-3" style={{ color: '#2c1810' }}>
            {t("totalInvestmentValue", lang)}
          </p>
          <p className="font-body text-base md:text-lg font-light" style={{ color: '#5a4a3a' }}>
            {t("totalInvestmentDesc", lang)}
          </p>
        </motion.div>

        {/* Two images side by side */}
        <motion.div
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <img
              src={HANDS_IMAGE}
              alt={lang === "sv" ? "Händer som sträcker sig uppåt tillsammans" : "Hands reaching upward together"}
              className="w-full h-full object-cover"
              style={{ filter: 'sepia(0.1) saturate(1.1)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, oklch(0.97 0.01 80 / 0.5), transparent)' }} />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <img
              src={FUTURE_IMAGE}
              alt={lang === "sv" ? "Arkitektonisk struktur som sträcker sig uppåt mot ljuset" : "Architectural structure reaching toward the light"}
              className="w-full h-full object-cover"
              style={{ filter: 'sepia(0.1) saturate(1.1)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, oklch(0.97 0.01 80 / 0.5), transparent)' }} />
          </div>
        </motion.div>

        {/* Final call to action */}
        <motion.div
          className="mt-16 md:mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-2xl md:text-3xl italic mb-6" style={{ color: '#6a5a4a' }}>
            {t("closingQuote", lang)}
          </p>
          <p className="font-body text-sm" style={{ color: '#9a8a7a' }}>
            {t("closingQuoteNote", lang)}
          </p>
          <div className="mt-10 font-mono-display tracking-[0.3em] text-sm" style={{ color: '#9B6B1A' }}>
            {t("goodMorning", lang)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
