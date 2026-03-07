/**
 * ManifestoIntro – The philosophical framing before the 15 points
 * Nordic Monumentalism: generous whitespace, dramatic typography
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PEOPLE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/hero-people-KijM7cKvAUoegdZdWHkwQU.webp";

export default function ManifestoIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 md:py-40 overflow-hidden">
      {/* Subtle background number */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 font-mono-display text-[20rem] md:text-[35rem] text-white/[0.02] leading-none select-none pointer-events-none">
        §
      </div>

      <div ref={ref} className="max-w-4xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-12 h-[2px] bg-[#D4A843] mb-8" />

          <p className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-normal leading-snug text-white/90 italic">
            "Tycker du att Sverige har släppt in för många invandrare?"
          </p>

          <div className="mt-10 md:mt-16 space-y-6">
            <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed font-light">
              Frågan utgår ifrån att Sverige har ett tak för hur många som kan flytta hit, integreras och bidra till samhället. Men det där taket är inte en fysisk eller rationell nivå – det är en social och legal konstruktion.
            </p>
            <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed font-light">
              Politikerna borde svara på frågan <span className="text-[#D4A843] font-medium">"Hur kan vi integrera många fler?"</span> i stället för att lura i oss att vi måste dansa limbo under en given ribba.
            </p>
            <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed font-light">
              Vi håller faktiskt, på riktigt, på att bli för få. Så här är 15 punkter som underlättar människors resa. Inte det motsatta.
            </p>
          </div>
        </motion.div>

        {/* Image break */}
        <motion.div
          className="mt-16 md:mt-24 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="aspect-[16/7] relative overflow-hidden">
            <img
              src={PEOPLE_IMAGE}
              alt="Människor som går framåt tillsammans"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/30" />
          </div>
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
            <p className="font-mono-display text-[#D4A843] tracking-[0.2em] text-xs md:text-sm">
              FRAMÅT, TILLSAMMANS
            </p>
          </div>
        </motion.div>

        {/* Separator */}
        <div className="mt-16 md:mt-24 flex items-center gap-6">
          <div className="flex-1 h-[1px] bg-white/10" />
          <p className="font-mono-display text-[#D4A843] tracking-[0.3em] text-xs md:text-sm">
            15 PUNKTER
          </p>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>
      </div>
    </section>
  );
}
