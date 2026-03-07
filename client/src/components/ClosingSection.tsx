/**
 * ClosingSection – The emotional closing after all 15 points
 * Nordic Monumentalism: dramatic imagery, personal voice, call to action
 */

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CITY_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/hero-city-ehXfcsewrQtWDGyMgLfMFS.webp";
const HANDS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/hero-hands-cc94ysmYxizXqHVYkshocc.webp";
const FUTURE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/hero-future-XX6gpdkvxmkujz9GHPEY2u.webp";

export default function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative">
      {/* Image divider */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src={CITY_IMAGE}
          alt="Skandinavisk stad vid vatten, kvällsljus"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-mono-display text-[#D4A843] text-6xl md:text-8xl lg:text-9xl tracking-wider"
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
          <div className="w-12 h-[2px] bg-[#D4A843] mb-10" />

          <h2 className="font-display text-3xl md:text-5xl font-black text-white leading-tight mb-8">
            Gjort är gjort och vi får spela bollen där den ligger
          </h2>

          <div className="space-y-6">
            <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed font-light">
              Mitt svar på frågan? Nej, jag tycker inte vi har "släppt in för många" och för övrigt är det ju en helt meningslös fråga. Gjort är gjort och vi får spela bollen där den ligger, som golfarna säger.
            </p>
            <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed font-light">
              Men det intressanta är inte svaret – det är att vi ställer fel fråga. Frågan borde vara: <span className="text-[#D4A843] font-medium">Hur bygger vi ett land som är så bra på att ta emot människor att hela världen vill lära sig av oss?</span>
            </p>
            <p className="font-body text-lg md:text-xl text-white/60 leading-relaxed font-light">
              Sverige rankas redan bland världens mest innovativa, mest digitaliserade och mest hållbara länder. Vi har universiteten, infrastrukturen och – framför allt – människorna. Det enda som saknas är modet att formulera problemet rätt och viljan att lösa det.
            </p>
            <p className="font-body text-lg md:text-xl text-white/70 leading-relaxed font-normal">
              Dessa 15 punkter är inte utopier. De är investeringar. Varje krona vi lägger på att hjälpa människor hitta sin plats i samhället kommer tillbaka mångfalt – i skatteintäkter, i innovation, i kultur, i livskraft. Vi håller på att bli för få. Lösningen går inte på gatan – den bor redan här.
            </p>
          </div>
        </motion.div>

        {/* Two images side by side */}
        <motion.div
          className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="relative aspect-square overflow-hidden">
            <img
              src={HANDS_IMAGE}
              alt="Händer som sträcker sig uppåt tillsammans"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
          </div>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={FUTURE_IMAGE}
              alt="Arkitektonisk struktur som sträcker sig uppåt mot ljuset"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
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
          <p className="font-display text-2xl md:text-3xl italic text-white/40 mb-6">
            "Riksdagspartier! Håll varsin presskonferens med 15 punkter som underlättar människors resa i stället för det motsatta."
          </p>
          <p className="font-body text-white/30 text-sm">
            Men håll en workshop först så det inte blir så där taffligt som det gärna blir annars.
          </p>
          <div className="mt-10 font-mono-display text-[#D4A843] tracking-[0.3em] text-sm">
            GOD MORGON!
          </div>
        </motion.div>
      </div>
    </section>
  );
}
