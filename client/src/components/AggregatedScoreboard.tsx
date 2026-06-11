/**
 * AggregatedScoreboard – shows accumulated party scores across all debate analyses.
 * Auto-calculates from the debates array. Placed at top of /debatter page.
 */

import { useMemo } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { debates } from "@/lib/debates";

interface PartyAggregate {
  party: string;
  abbreviation: string;
  totalScore: number;
  maxPossible: number;
  appearances: number;
  sources: string[];
}

// Party colors (Swedish political party colors, muted to fit warm theme)
const PARTY_COLORS: Record<string, string> = {
  C: "#2e8b57",   // Green (Centerpartiet)
  L: "#1a6bb5",   // Blue (Liberalerna)
  M: "#5b8fbe",   // Light blue (Moderaterna)
  S: "#c0392b",   // Red (Socialdemokraterna)
  SD: "#d4a017",  // Yellow (Sverigedemokraterna)
  KD: "#6a5acd",  // Purple-blue (Kristdemokraterna)
  V: "#8b0000",   // Dark red (Vänsterpartiet)
  MP: "#228b22",  // Forest green (Miljöpartiet)
};

export default function AggregatedScoreboard() {
  const { lang } = useLang();

  const aggregated = useMemo(() => {
    const partyMap = new Map<string, PartyAggregate>();

    debates.forEach((debate) => {
      debate.partyRankings.forEach((ranking) => {
        const existing = partyMap.get(ranking.abbreviation);
        if (existing) {
          existing.totalScore += ranking.score;
          existing.maxPossible += ranking.maxScore;
          existing.appearances += 1;
          if (!existing.sources.includes(debate.title)) {
            existing.sources.push(debate.title);
          }
        } else {
          partyMap.set(ranking.abbreviation, {
            party: ranking.party,
            abbreviation: ranking.abbreviation,
            totalScore: ranking.score,
            maxPossible: ranking.maxScore,
            appearances: 1,
            sources: [debate.title],
          });
        }
      });
    });

    return Array.from(partyMap.values()).sort((a, b) => b.totalScore - a.totalScore);
  }, []);

  const maxScore = aggregated.length > 0 ? aggregated[0].totalScore : 1;
  const totalAnalyses = debates.length;

  return (
    <motion.div
      className="mb-12 p-6 md:p-8 rounded-sm"
      style={{
        backgroundColor: "oklch(0.97 0.01 80 / 0.6)",
        border: "1px solid oklch(0.18 0.02 50 / 0.08)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-6">
        <h2
          className="font-display text-lg md:text-xl font-normal"
          style={{ color: "#2c1810" }}
        >
          {lang === "sv" ? "Ackumulerad poäng" : "Accumulated Scores"}
        </h2>
        <span className="font-body text-xs" style={{ color: "#8a7a6a" }}>
          {lang === "sv"
            ? `Baserat på ${totalAnalyses} analyser (${debates.filter(d => d.type === "debate").length} debatter, ${debates.filter(d => d.type === "interview").length} intervjuer)`
            : `Based on ${totalAnalyses} analyses (${debates.filter(d => d.type === "debate").length} debates, ${debates.filter(d => d.type === "interview").length} interviews)`}
        </span>
      </div>

      <div className="space-y-3">
        {aggregated.map((party, idx) => {
          const barWidth = maxScore > 0 ? (party.totalScore / maxScore) * 100 : 0;
          const color = PARTY_COLORS[party.abbreviation] || "#9B6B1A";

          return (
            <motion.div
              key={party.abbreviation}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + idx * 0.08 }}
            >
              {/* Party abbreviation */}
              <div
                className="w-8 text-right font-display text-sm font-semibold shrink-0"
                style={{ color }}
              >
                {party.abbreviation}
              </div>

              {/* Bar */}
              <div className="flex-1 h-7 rounded-sm overflow-hidden relative" style={{ backgroundColor: "oklch(0.94 0.005 80 / 0.8)" }}>
                <motion.div
                  className="h-full rounded-sm flex items-center"
                  style={{ backgroundColor: color, opacity: 0.75 }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(barWidth, 3)}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Score label inside or outside bar */}
                <span
                  className="absolute right-2 top-1/2 -translate-y-1/2 font-body text-xs font-medium"
                  style={{ color: barWidth > 60 ? "#fff" : "#5a4a3a" }}
                >
                  {party.totalScore.toFixed(1)}
                </span>
              </div>

              {/* Appearances count */}
              <div
                className="w-16 text-left font-body text-xs shrink-0"
                style={{ color: "#8a7a6a" }}
              >
                {party.appearances} {lang === "sv" ? (party.appearances === 1 ? "analys" : "analyser") : (party.appearances === 1 ? "analysis" : "analyses")}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Explanatory note */}
      <p className="font-body text-xs mt-5 leading-relaxed" style={{ color: "#8a7a6a" }}>
        {lang === "sv"
          ? "Poängen summerar varje partis matchning mot de 15 punkterna över alla analyserade debatter och intervjuer. Partier som förekommit i fler analyser har haft fler tillfällen att samla poäng. Syftet är att synliggöra mönster, inte att rangordna."
          : "Scores sum each party's match against the 15 points across all analysed debates and interviews. Parties appearing in more analyses have had more opportunities to accumulate points. The purpose is to reveal patterns, not to rank."}
      </p>
    </motion.div>
  );
}
