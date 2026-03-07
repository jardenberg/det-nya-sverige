/**
 * TotalCounter – Animated summary section showing aggregate programme numbers
 * Warm light theme: ochre accents, warm cream cards
 */

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { Banknote, Users2, Briefcase, TrendingUp, Building, Globe } from "lucide-react";

function useCountUp(end: number, duration: number, start: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return count;
}

interface CounterCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  numericEnd: number;
  suffix: string;
  delay: number;
  inView: boolean;
}

function CounterCard({ icon: Icon, label, value, numericEnd, suffix, delay, inView }: CounterCardProps) {
  const [shouldCount, setShouldCount] = useState(false);
  const count = useCountUp(numericEnd, 2, shouldCount);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setShouldCount(true), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative p-5 md:p-7 rounded-sm overflow-hidden"
      style={{ backgroundColor: 'oklch(0.95 0.02 75 / 0.5)', borderBottom: '2px solid oklch(0.68 0.14 65 / 0.3)' }}
    >
      <Icon className="w-5 h-5 mb-3" style={{ color: '#9B6B1A' }} strokeWidth={1.5} />
      <p className="font-body text-[0.65rem] tracking-[0.15em] uppercase mb-2" style={{ color: '#8a7a6a' }}>
        {label}
      </p>
      <p className="font-display text-2xl md:text-3xl font-black" style={{ color: '#2c1810' }}>
        {shouldCount ? `${count.toLocaleString('sv-SE')}${suffix}` : value}
      </p>
    </motion.div>
  );
}

export default function TotalCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();

  const counters = [
    {
      icon: Banknote,
      label: t("counterInvestment", lang),
      value: t("counterInvestmentValue", lang),
      numericEnd: 200,
      suffix: lang === "sv" ? " mdr" : "B",
    },
    {
      icon: Users2,
      label: t("counterPeople", lang),
      value: t("counterPeopleValue", lang),
      numericEnd: 2,
      suffix: lang === "sv" ? " milj+" : "M+",
    },
    {
      icon: Briefcase,
      label: t("counterJobs", lang),
      value: t("counterJobsValue", lang),
      numericEnd: 850,
      suffix: lang === "sv" ? " 000+" : ",000+",
    },
    {
      icon: TrendingUp,
      label: t("counterGdp", lang),
      value: t("counterGdpValue", lang),
      numericEnd: 5,
      suffix: "%",
    },
    {
      icon: Building,
      label: t("counterMunicipalities", lang),
      value: t("counterMunicipalitiesValue", lang),
      numericEnd: 290,
      suffix: "",
    },
    {
      icon: Globe,
      label: t("counterLanguages", lang),
      value: t("counterLanguagesValue", lang),
      numericEnd: 40,
      suffix: "+",
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex-1 max-w-24 h-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.1)' }} />
            <p className="font-mono-display tracking-[0.3em] text-xs" style={{ color: '#8B6914' }}>
              {t("counterTitle", lang)}
            </p>
            <div className="flex-1 max-w-24 h-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.1)' }} />
          </div>
        </motion.div>

        {/* Counter grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {counters.map((counter, i) => (
            <CounterCard
              key={i}
              {...counter}
              delay={0.1 + i * 0.1}
              inView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
