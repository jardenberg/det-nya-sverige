import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Link2, MoveRight } from "lucide-react";
import { Link } from "wouter";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLang } from "@/contexts/LanguageContext";
import { partyColors } from "@/lib/agenda-stats";
import {
  parties,
  getRhetoricEditorialNotes,
  rhetoricObservations,
  rhetoricScale,
  type PartyAbbreviation,
  type RhetoricMetric,
  type RhetoricObservation,
} from "@/lib/rhetoric-timeline";

const metricColors: Record<RhetoricMetric, string> = {
  integration: "#9B6B1A",
  ai: "#356C82",
  bridge: "#B64A3A",
};

const metricCopy = {
  integration: {
    sv: "Integration",
    en: "Integration",
    noteSv: "Från avvisande eller frånvaro till konkret systemdesign.",
    noteEn: "From rejection or absence to concrete system design.",
  },
  ai: {
    sv: "AI",
    en: "AI",
    noteSv: "Från frånvaro till konkret tillämpning och infrastruktur.",
    noteEn: "From absence to concrete application and infrastructure.",
  },
  bridge: {
    sv: "Kopplingen",
    en: "The bridge",
    noteSv: "I vilken grad AI faktiskt kopplas till integrationens verktyg.",
    noteEn: "The extent to which AI is actually connected to integration tools.",
  },
} as const;

type ChartObservation = RhetoricObservation & { axisLabel: string };

function formatDate(date: string, lang: "sv" | "en", short = false) {
  const parsed = new Date(`${date}T12:00:00Z`);
  return new Intl.DateTimeFormat(lang === "sv" ? "sv-SE" : "en-GB", {
    day: "numeric",
    month: short ? "numeric" : "short",
  }).format(parsed);
}

function scoreLabel(metric: RhetoricMetric, score: number, lang: "sv" | "en") {
  const labels = lang === "sv" ? rhetoricScale[metric].labelsSv : rhetoricScale[metric].labelsEn;
  return (labels as Record<string, string>)[String(score)] ?? String(score);
}

function TimelineTooltip({
  active,
  payload,
  lang,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChartObservation }>;
  lang: "sv" | "en";
}) {
  const item = payload?.[0]?.payload;
  if (!active || !item) return null;

  return (
    <div
      className="max-w-[280px] p-4 shadow-xl"
      style={{ backgroundColor: "#fffaf0", border: "1px solid rgba(44,24,16,0.14)" }}
    >
      <p className="font-mono-display text-[10px] uppercase tracking-[0.14em] text-ochre mb-1">
        {formatDate(item.date, lang)} · {item.type === "debate" ? (lang === "sv" ? "Debatt" : "Debate") : (lang === "sv" ? "Intervju" : "Interview")}
      </p>
      <p className="font-display text-sm leading-tight text-[#2c1810] mb-3">
        {lang === "sv" ? item.title : item.titleEn}
      </p>
      <div className="space-y-1.5">
        {(Object.keys(metricCopy) as RhetoricMetric[]).map((metric) => (
          <div key={metric} className="flex items-center justify-between gap-5 font-body text-xs">
            <span style={{ color: metricColors[metric] }}>{lang === "sv" ? metricCopy[metric].sv : metricCopy[metric].en}</span>
            <span className="font-medium text-[#2c1810]">{item[metric]} · {scoreLabel(metric, item[metric], lang)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RhetoricTimeline() {
  const { lang, langPrefix } = useLang();
  const analysisCount = useMemo(() => new Set(rhetoricObservations.map((observation) => observation.debateId)).size, []);
  const editorialNotes = useMemo(() => getRhetoricEditorialNotes(), []);
  const initialParty = useMemo(() => {
    const value = new URLSearchParams(window.location.search).get("parti")?.toUpperCase();
    return parties.includes(value as PartyAbbreviation) ? (value as PartyAbbreviation) : "C";
  }, []);
  const [selectedParty, setSelectedParty] = useState<PartyAbbreviation>(initialParty);
  const [visibleMetrics, setVisibleMetrics] = useState<Record<RhetoricMetric, boolean>>({
    integration: true,
    ai: true,
    bridge: true,
  });
  const [selectedObservationId, setSelectedObservationId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const observations = useMemo(
    () => rhetoricObservations.filter((observation) => observation.party === selectedParty),
    [selectedParty],
  );

  const chartData = useMemo<ChartObservation[]>(
    () => observations.map((observation) => ({ ...observation, axisLabel: formatDate(observation.date, lang, true) })),
    [observations, lang],
  );

  const selectedObservation =
    observations.find((observation) => observation.id === selectedObservationId) ?? observations.at(-1);

  const setParty = (party: PartyAbbreviation) => {
    setSelectedParty(party);
    setSelectedObservationId(null);
    const url = new URL(window.location.href);
    url.searchParams.set("parti", party);
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  };

  const copyDirectLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("parti", selectedParty);
    await navigator.clipboard.writeText(url.toString());
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const peaks = (Object.keys(metricCopy) as RhetoricMetric[]).map((metric) => ({
    metric,
    value: Math.max(...observations.map((observation) => observation[metric])),
  }));

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LanguageSwitcher />

      <header className="pt-24 md:pt-32 pb-10 border-b border-foreground/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <Link
            href={`${langPrefix}/debatter`}
            className="inline-flex items-center gap-2 font-mono-display text-xs tracking-wider text-ochre hover:underline mb-10"
          >
            <ArrowLeft size={14} />
            {lang === "sv" ? "Tillbaka till analyserna" : "Back to the analyses"}
          </Link>

          <div className="max-w-4xl">
            <p className="font-mono-display text-xs uppercase tracking-[0.22em] text-ochre mb-4">
              {lang === "sv" ? `Retoriken över tid · ${analysisCount} analyser` : `Rhetoric over time · ${analysisCount} analyses`}
            </p>
            <h1 className="font-display text-4xl md:text-6xl leading-[0.98] text-[#2c1810] mb-6">
              {lang === "sv" ? "Två samtal som aldrig möts" : "Two conversations that never meet"}
            </h1>
            <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/70 max-w-3xl">
              {lang === "sv"
                ? "Här följer vi hur partierna talar om integration, AI och länken mellan dem. Visualiseringen bygger på samma källgranskade analyser som resten av sajten. Den mäter retoriska signaler, inte partiprogram eller avsikter."
                : "This tracks how the parties speak about integration, AI and the link between them. The visualisation uses the same source-reviewed analyses as the rest of the site. It measures rhetorical signals, not party programmes or intentions."}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <section className="mb-12" aria-labelledby="party-filter-title">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p id="party-filter-title" className="font-mono-display text-[10px] uppercase tracking-[0.18em] text-foreground/45 mb-3">
                {lang === "sv" ? "Välj parti" : "Choose party"}
              </p>
              <div className="flex flex-wrap gap-2">
                {parties.map((party) => {
                  const selected = party === selectedParty;
                  return (
                    <button
                      key={party}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setParty(party)}
                      className="min-w-11 px-3 py-2 font-display text-sm border transition-[transform,background-color,color,border-color] duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre"
                      style={{
                        color: selected ? "#fffaf0" : partyColors[party],
                        backgroundColor: selected ? partyColors[party] : "transparent",
                        borderColor: selected ? partyColors[party] : `${partyColors[party]}55`,
                      }}
                    >
                      {party}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={copyDirectLink}
              className="inline-flex items-center gap-2 self-start md:self-auto font-body text-sm text-ochre hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre active:scale-[0.97]"
            >
              {copied ? <Check size={15} /> : <Link2 size={15} />}
              {copied
                ? (lang === "sv" ? "Länk kopierad" : "Link copied")
                : (lang === "sv" ? `Länka direkt till ${selectedParty}` : `Link directly to ${selectedParty}`)}
            </button>
          </div>
        </section>

        <motion.section
          key={selectedParty}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 border border-foreground/10 bg-[#fffaf0]/65"
          aria-labelledby="timeline-title"
        >
          <div className="p-5 md:p-8 border-b border-foreground/10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div>
                <p className="font-mono-display text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: partyColors[selectedParty] }}>
                  {selectedParty} · {observations.length} {lang === "sv" ? "framträdanden" : "appearances"}
                </p>
                <h2 id="timeline-title" className="font-display text-2xl md:text-3xl text-[#2c1810]">
                  {lang === "sv" ? "Tre retoriska signaler" : "Three rhetorical signals"}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2" aria-label={lang === "sv" ? "Visa eller dölj mätvärden" : "Show or hide metrics"}>
                {(Object.keys(metricCopy) as RhetoricMetric[]).map((metric) => (
                  <button
                    key={metric}
                    type="button"
                    aria-pressed={visibleMetrics[metric]}
                    onClick={() => setVisibleMetrics((current) => ({ ...current, [metric]: !current[metric] }))}
                    className="inline-flex items-center gap-2 px-3 py-2 border font-body text-xs transition-opacity duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre"
                    style={{
                      color: metricColors[metric],
                      borderColor: `${metricColors[metric]}55`,
                      opacity: visibleMetrics[metric] ? 1 : 0.42,
                    }}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: metricColors[metric] }} />
                    {lang === "sv" ? metricCopy[metric].sv : metricCopy[metric].en}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-foreground/10 border border-foreground/10 mt-7">
              {peaks.map(({ metric, value }) => (
                <div key={metric} className="bg-[#fffaf0] px-4 py-4">
                  <p className="font-mono-display text-[9px] uppercase tracking-[0.15em] mb-1" style={{ color: metricColors[metric] }}>
                    {lang === "sv" ? `${metricCopy[metric].sv} · högsta signal` : `${metricCopy[metric].en} · peak signal`}
                  </p>
                  <p className="font-display text-xl text-[#2c1810]">{value} · {scoreLabel(metric, value, lang)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="px-2 py-6 md:p-8">
            <div className="h-[310px] md:h-[390px]" role="img" aria-label={lang === "sv" ? `Linjediagram över ${selectedParty}:s retorik` : `Line chart of ${selectedParty}'s rhetoric`}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 14, right: 18, left: -14, bottom: 12 }}>
                  <CartesianGrid vertical={false} stroke="rgba(44,24,16,0.09)" strokeDasharray="3 6" />
                  <XAxis
                    dataKey="axisLabel"
                    tick={{ fill: "#8a7a6a", fontSize: 10 }}
                    axisLine={{ stroke: "rgba(44,24,16,0.18)" }}
                    tickLine={false}
                    interval={0}
                  />
                  <YAxis
                    domain={[-1, 3]}
                    ticks={[-1, 0, 1, 2, 3]}
                    tick={{ fill: "#8a7a6a", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    width={34}
                  />
                  <ReferenceLine y={0} stroke="rgba(44,24,16,0.34)" strokeWidth={1} />
                  <Tooltip content={<TimelineTooltip lang={lang} />} cursor={{ stroke: "rgba(44,24,16,0.18)", strokeDasharray: "2 4" }} />
                  {(Object.keys(metricCopy) as RhetoricMetric[]).map((metric) =>
                    visibleMetrics[metric] ? (
                      <Line
                        key={metric}
                        type="linear"
                        dataKey={metric}
                        stroke={metricColors[metric]}
                        strokeWidth={metric === "bridge" ? 3 : 2}
                        dot={{ r: metric === "bridge" ? 4 : 3, fill: metricColors[metric], strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: metricColors[metric], stroke: "#fffaf0", strokeWidth: 2 }}
                        animationDuration={500}
                      />
                    ) : null,
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        <section className="grid lg:grid-cols-[0.85fr_1.15fr] gap-8 md:gap-12 mb-16" aria-labelledby="evidence-title">
          <div>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.18em] text-ochre mb-3">
              {lang === "sv" ? "Kronologi" : "Chronology"}
            </p>
            <h2 id="evidence-title" className="font-display text-2xl md:text-3xl text-[#2c1810] mb-6">
              {lang === "sv" ? `${selectedParty}:s vändpunkter` : `${selectedParty}'s turning points`}
            </h2>
            <div className="relative border-l border-foreground/15 ml-2 space-y-2">
              {observations.map((observation) => {
                const active = selectedObservation?.id === observation.id;
                return (
                  <button
                    key={observation.id}
                    type="button"
                    onClick={() => setSelectedObservationId(observation.id)}
                    className="relative w-full text-left pl-6 pr-3 py-3 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ochre"
                    style={{ backgroundColor: active ? "rgba(155,107,26,0.07)" : "transparent" }}
                  >
                    <span
                      className="absolute -left-[5px] top-5 w-[9px] h-[9px] rounded-full border-2 border-background"
                      style={{ backgroundColor: active ? partyColors[selectedParty] : "#c8b9a5" }}
                    />
                    <span className="block font-mono-display text-[9px] uppercase tracking-[0.13em] text-ochre mb-1">
                      {formatDate(observation.date, lang)} · {observation.type === "debate" ? (lang === "sv" ? "Debatt" : "Debate") : (lang === "sv" ? "Intervju" : "Interview")}
                    </span>
                    <span className="block font-display text-sm text-[#2c1810] leading-tight">
                      {lang === "sv" ? observation.title : observation.titleEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedObservation && (
            <motion.article
              key={selectedObservation.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
              className="self-start lg:sticky lg:top-8 p-6 md:p-8 border-l-4 bg-[#fffaf0]/75"
              style={{ borderLeftColor: partyColors[selectedParty] }}
            >
              <p className="font-mono-display text-[10px] uppercase tracking-[0.16em] text-ochre mb-2">
                {formatDate(selectedObservation.date, lang)} · {selectedObservation.representative}
              </p>
              <h3 className="font-display text-2xl text-[#2c1810] mb-5">
                {lang === "sv" ? selectedObservation.title : selectedObservation.titleEn}
              </h3>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {(Object.keys(metricCopy) as RhetoricMetric[]).map((metric) => (
                  <div key={metric} className="border-t-2 pt-2" style={{ borderTopColor: metricColors[metric] }}>
                    <span className="block font-mono-display text-[8px] uppercase tracking-[0.12em] mb-1" style={{ color: metricColors[metric] }}>
                      {lang === "sv" ? metricCopy[metric].sv : metricCopy[metric].en}
                    </span>
                    <span className="font-display text-lg text-[#2c1810]">{selectedObservation[metric]}</span>
                    <span className="block font-body text-[10px] text-foreground/55 leading-tight mt-0.5">
                      {scoreLabel(metric, selectedObservation[metric], lang)}
                    </span>
                  </div>
                ))}
              </div>

              <blockquote className="font-body text-base leading-relaxed text-foreground/75 mb-6">
                “{lang === "sv" ? selectedObservation.evidence : selectedObservation.evidenceEn}”
              </blockquote>

              {!selectedObservation.coded && (
                <p className="font-body text-xs text-[#8b4b35] mb-5">
                  {lang === "sv" ? "Preliminär nollkodning: redaktionell granskning återstår." : "Preliminary zero coding: editorial review pending."}
                </p>
              )}

              <Link
                href={`${langPrefix}/${lang === "sv" ? "debatter" : "debates"}/${selectedObservation.debateId}`}
                className="inline-flex items-center gap-2 font-body text-sm text-ochre hover:underline"
              >
                {lang === "sv" ? "Öppna källanalysen" : "Open the source analysis"}
                <MoveRight size={15} />
              </Link>
            </motion.article>
          )}
        </section>

        <section className="mb-16 grid md:grid-cols-[0.72fr_1.28fr] gap-8 md:gap-12 border-y border-foreground/10 py-10">
          <div>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.18em] text-ochre mb-3">
              {lang === "sv" ? "// JJ kommenterar" : "// JJ comments"}
            </p>
            <p className="font-display text-2xl md:text-3xl italic leading-tight text-[#2c1810]">
              {lang === "sv"
                ? "Det mest stabila över tid är inte en position. Det är ett mellanrum."
                : "The most stable pattern over time is not a position. It is a gap."}
            </p>
          </div>
          <div className="space-y-5 font-body text-base leading-relaxed text-foreground/70">
            {editorialNotes.map((note) => <p key={note.sv}>{lang === "sv" ? note.sv : note.en}</p>)}
          </div>
        </section>

        <section className="mb-8" aria-labelledby="method-title">
          <h2 id="method-title" className="font-display text-2xl text-[#2c1810] mb-5">
            {lang === "sv" ? "Så läser du skalan" : "How to read the scale"}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {(Object.keys(metricCopy) as RhetoricMetric[]).map((metric) => {
              const scale = rhetoricScale[metric];
              const values = Array.from({ length: scale.max - scale.min + 1 }, (_, index) => scale.min + index);
              return (
                <div key={metric} className="p-5 border border-foreground/10 bg-[#fffaf0]/55">
                  <h3 className="font-display text-lg mb-1" style={{ color: metricColors[metric] }}>
                    {lang === "sv" ? metricCopy[metric].sv : metricCopy[metric].en}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-foreground/55 mb-4">
                    {lang === "sv" ? metricCopy[metric].noteSv : metricCopy[metric].noteEn}
                  </p>
                  <div className="space-y-2">
                    {values.map((value) => (
                      <div key={value} className="flex items-center gap-3 font-body text-xs">
                        <span className="w-5 h-5 grid place-items-center text-white text-[10px]" style={{ backgroundColor: metricColors[metric] }}>{value}</span>
                        <span className="text-foreground/70">{scoreLabel(metric, value, lang)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="font-body text-xs leading-relaxed text-foreground/50 mt-5 max-w-4xl">
            {lang === "sv"
              ? "Kodningen är en redaktionell tolkning av vad som faktiskt sades vid varje tillfälle. Noll betyder frånvaro i det analyserade materialet, inte att partiet saknar politik. Linjer mellan punkter visar utvecklingen mellan observerade framträdanden; de påstår inget om tiden däremellan."
              : "The coding is an editorial interpretation of what was actually said on each occasion. Zero means absence from the analysed material, not that the party lacks policy. Lines between points show development between observed appearances; they make no claim about the time between them."}
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
