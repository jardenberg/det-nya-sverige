/**
 * ClosingSection – The emotional closing after all 15 points
 * Warm light theme: warm imagery, personal voice, call to action
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
            Gjort är gjort och vi får spela bollen där den ligger
          </h2>

          <div className="space-y-6">
            <p className="font-body text-lg md:text-xl leading-relaxed font-light" style={{ color: '#5a4a3a' }}>
              Mitt svar på frågan? Nej, jag tycker inte vi har "släppt in för många" och för övrigt är det ju en helt meningslös fråga. Gjort är gjort och vi får spela bollen där den ligger, som golfarna säger.
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed font-light" style={{ color: '#5a4a3a' }}>
              Men det intressanta är inte svaret – det är att vi ställer fel fråga. Frågan borde vara: <span className="font-medium" style={{ color: '#9B6B1A' }}>Hur bygger vi ett land som är så bra på att ta emot människor att hela världen vill lära sig av oss?</span>
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed font-light" style={{ color: '#5a4a3a' }}>
              Sverige rankas redan bland världens mest innovativa, mest digitaliserade och mest hållbara länder. Vi har universiteten, infrastrukturen och – framför allt – människorna. Det enda som saknas är modet att formulera problemet rätt och viljan att lösa det.
            </p>
            <p className="font-body text-lg md:text-xl leading-relaxed font-normal" style={{ color: '#3d2a1e' }}>
              Dessa 15 punkter är inte utopier. De är investeringar. Varje krona vi lägger på att hjälpa människor hitta sin plats i samhället kommer tillbaka mångfalt – i skatteintäkter, i innovation, i kultur, i livskraft. Vi håller på att bli för få. Lösningen går inte på gatan – den bor redan här.
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
            Total investering
          </p>
          <p className="font-display text-4xl md:text-6xl font-black mb-3" style={{ color: '#2c1810' }}>
            ~250 miljarder kr/år
          </p>
          <p className="font-body text-base md:text-lg font-light" style={{ color: '#5a4a3a' }}>
            Motsvarar cirka 4% av BNP – jämförbart med vad vi redan investerar i försvaret och rättsväsendet tillsammans. Förväntad avkastning: ett land som tar täten i alla internationella rankingar.
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
              alt="Händer som sträcker sig uppåt tillsammans"
              className="w-full h-full object-cover"
              style={{ filter: 'sepia(0.1) saturate(1.1)' }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, oklch(0.97 0.01 80 / 0.5), transparent)' }} />
          </div>
          <div className="relative aspect-square overflow-hidden rounded-sm">
            <img
              src={FUTURE_IMAGE}
              alt="Arkitektonisk struktur som sträcker sig uppåt mot ljuset"
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
            "Riksdagspartier! Håll varsin presskonferens med 15 punkter som underlättar människors resa i stället för det motsatta."
          </p>
          <p className="font-body text-sm" style={{ color: '#9a8a7a' }}>
            Men håll en workshop först så det inte blir så där taffligt som det gärna blir annars.
          </p>
          <div className="mt-10 font-mono-display tracking-[0.3em] text-sm" style={{ color: '#9B6B1A' }}>
            GOD MORGON!
          </div>
        </motion.div>
      </div>
    </section>
  );
}
