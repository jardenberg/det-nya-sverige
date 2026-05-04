/**
 * Debates page – /debatter
 * Shows debate analyses matching partiledardebatter against the 15 points.
 * Designed as expandable info-boxes per debate, with download links.
 * Warm light theme consistent with the rest of the site.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { ArrowLeft, Download, ChevronDown, ChevronUp, MessageSquareQuote, AlertTriangle } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { debates, type DebateAnalysis } from "@/lib/debates";

function RelevanceBadge({ relevance }: { relevance: "direct" | "indirect" | "none" }) {
  const colors = {
    direct: { bg: "#2d6a4f", text: "#fff" },
    indirect: { bg: "#9B6B1A", text: "#fff" },
    none: { bg: "#e0d5c8", text: "#8a7a6a" },
  };
  const labels = { direct: "Direkt", indirect: "Indirekt", none: "Ej berört" };
  const c = colors[relevance];
  return (
    <span
      className="inline-block px-2 py-0.5 rounded-sm text-xs font-mono-display tracking-wider"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {labels[relevance]}
    </span>
  );
}

function ScoreBar({ score, maxScore }: { score: number; maxScore: number }) {
  const pct = (score / maxScore) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#e8dfd4" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, backgroundColor: pct > 0 ? "#9B6B1A" : "#e8dfd4" }}
        />
      </div>
      <span className="font-mono-display text-xs tracking-wider" style={{ color: "#9B6B1A" }}>
        {score}/{maxScore}
      </span>
    </div>
  );
}

function DebateCard({ debate }: { debate: DebateAnalysis }) {
  const { lang } = useLang();
  const [expanded, setExpanded] = useState(false);
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const directCount = debate.pointMatches.filter((p) => p.relevance === "direct").length;
  const indirectCount = debate.pointMatches.filter((p) => p.relevance === "indirect").length;
  const noneCount = debate.pointMatches.filter((p) => p.relevance === "none").length;

  return (
    <motion.div
      className="rounded-sm overflow-hidden"
      style={{ backgroundColor: "oklch(0.97 0.01 80 / 0.6)", border: "1px solid oklch(0.18 0.02 50 / 0.08)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header – always visible */}
      <div
        className="p-6 md:p-8 cursor-pointer group"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono-display text-xs tracking-wider" style={{ color: "#9B6B1A" }}>
                {debate.date}
              </span>
              <span className="font-mono-display text-xs tracking-wider" style={{ color: "#b0a090" }}>
                {debate.source}
              </span>
              <span className="font-mono-display text-xs tracking-wider" style={{ color: "#b0a090" }}>
                {debate.duration}
              </span>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-semibold mb-2" style={{ color: "#2c1810" }}>
              {lang === "sv" ? debate.title : debate.titleEn}
            </h3>
            <p className="font-body text-sm md:text-base font-light" style={{ color: "#5a4a3a" }}>
              {lang === "sv" ? debate.subtitle : debate.subtitleEn}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#2d6a4f" }} />
                <span className="font-body text-xs" style={{ color: "#5a4a3a" }}>
                  {lang === "sv" ? "Direkt" : "Direct"}: {directCount}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#9B6B1A" }} />
                <span className="font-body text-xs" style={{ color: "#5a4a3a" }}>
                  {lang === "sv" ? "Indirekt" : "Indirect"}: {indirectCount}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: "#e0d5c8" }} />
                <span className="font-body text-xs" style={{ color: "#5a4a3a" }}>
                  {lang === "sv" ? "Ej berört" : "Not covered"}: {noneCount}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 pt-1 group-hover:translate-y-0.5 transition-transform">
            {expanded ? (
              <ChevronUp size={20} style={{ color: "#9B6B1A" }} />
            ) : (
              <ChevronDown size={20} style={{ color: "#9B6B1A" }} />
            )}
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 md:px-8 pb-8 space-y-8" style={{ borderTop: "1px solid oklch(0.18 0.02 50 / 0.06)" }}>
              {/* Summary */}
              <div className="pt-6">
                <h4 className="font-display text-lg font-semibold mb-3" style={{ color: "#2c1810" }}>
                  {lang === "sv" ? "Sammanfattning" : "Summary"}
                </h4>
                <p className="font-body text-sm md:text-base leading-relaxed font-light" style={{ color: "#5a4a3a" }}>
                  {lang === "sv" ? debate.summary : debate.summaryEn}
                </p>
              </div>

              {/* Debate sections */}
              <div>
                <h4 className="font-display text-lg font-semibold mb-4" style={{ color: "#2c1810" }}>
                  {lang === "sv" ? "Debattens ämnen" : "Debate topics"}
                </h4>
                <div className="space-y-3">
                  {debate.sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="rounded-sm overflow-hidden"
                      style={{ backgroundColor: "oklch(0.99 0.005 80 / 0.8)", border: "1px solid oklch(0.18 0.02 50 / 0.05)" }}
                    >
                      <div
                        className="p-4 cursor-pointer flex items-center justify-between"
                        onClick={() => setActiveSection(activeSection === idx ? null : idx)}
                      >
                        <span className="font-body text-sm font-medium" style={{ color: "#2c1810" }}>
                          {lang === "sv" ? section.title : section.titleEn}
                        </span>
                        {activeSection === idx ? (
                          <ChevronUp size={16} style={{ color: "#9B6B1A" }} />
                        ) : (
                          <ChevronDown size={16} style={{ color: "#9B6B1A" }} />
                        )}
                      </div>

                      <AnimatePresence>
                        {activeSection === idx && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 space-y-4" style={{ borderTop: "1px solid oklch(0.18 0.02 50 / 0.04)" }}>
                              {/* Facts */}
                              <div className="pt-3">
                                <p className="font-mono-display text-xs tracking-wider mb-2" style={{ color: "#9B6B1A" }}>
                                  {lang === "sv" ? "FAKTA FRÅN DEBATTEN" : "FACTS FROM THE DEBATE"}
                                </p>
                                <ul className="space-y-1">
                                  {(lang === "sv" ? section.facts : section.factsEn).map((fact, i) => (
                                    <li key={i} className="font-body text-xs leading-relaxed pl-3" style={{ color: "#5a4a3a", borderLeft: "2px solid #e8dfd4" }}>
                                      {fact}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* Quotes */}
                              {section.quotes.length > 0 && (
                                <div>
                                  <p className="font-mono-display text-xs tracking-wider mb-2" style={{ color: "#9B6B1A" }}>
                                    {lang === "sv" ? "CITAT" : "QUOTES"}
                                  </p>
                                  <div className="space-y-2">
                                    {section.quotes.map((q, i) => (
                                      <div key={i} className="flex gap-2 items-start">
                                        <MessageSquareQuote size={12} className="flex-shrink-0 mt-1" style={{ color: "#9B6B1A" }} />
                                        <div>
                                          <p className="font-body text-xs italic leading-relaxed" style={{ color: "#5a4a3a" }}>
                                            "{q.text}"
                                          </p>
                                          <p className="font-mono-display text-[10px] tracking-wider mt-0.5" style={{ color: "#b0a090" }}>
                                            {q.speaker}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Connection to 15 points */}
                              <div>
                                <p className="font-mono-display text-xs tracking-wider mb-2" style={{ color: "#9B6B1A" }}>
                                  {lang === "sv" ? "KOPPLING TILL DE 15 PUNKTERNA" : "CONNECTION TO THE 15 POINTS"}
                                </p>
                                <p className="font-body text-xs leading-relaxed" style={{ color: "#5a4a3a" }}>
                                  {lang === "sv" ? section.connection : section.connectionEn}
                                </p>
                              </div>

                              {/* JJ comment */}
                              <div className="p-3 rounded-sm" style={{ backgroundColor: "oklch(0.95 0.02 80 / 0.5)", borderLeft: "3px solid #9B6B1A" }}>
                                <p className="font-mono-display text-[10px] tracking-wider mb-1" style={{ color: "#9B6B1A" }}>
                                  // JJ KOMMENTERAR:
                                </p>
                                <p className="font-body text-xs leading-relaxed italic" style={{ color: "#5a4a3a" }}>
                                  {lang === "sv" ? section.jjComment : section.jjCommentEn}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Point-by-point matching table */}
              <div>
                <h4 className="font-display text-lg font-semibold mb-4" style={{ color: "#2c1810" }}>
                  {lang === "sv" ? "Punkt för punkt" : "Point by point"}
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr style={{ borderBottom: "2px solid oklch(0.18 0.02 50 / 0.08)" }}>
                        <th className="font-mono-display text-[10px] tracking-wider py-2 pr-3" style={{ color: "#9B6B1A" }}>#</th>
                        <th className="font-mono-display text-[10px] tracking-wider py-2 pr-3" style={{ color: "#9B6B1A" }}>
                          {lang === "sv" ? "PUNKT" : "POINT"}
                        </th>
                        <th className="font-mono-display text-[10px] tracking-wider py-2 pr-3" style={{ color: "#9B6B1A" }}>
                          {lang === "sv" ? "STATUS" : "STATUS"}
                        </th>
                        <th className="font-mono-display text-[10px] tracking-wider py-2 pr-3" style={{ color: "#9B6B1A" }}>
                          {lang === "sv" ? "NÄRMAST" : "CLOSEST"}
                        </th>
                        <th className="font-mono-display text-[10px] tracking-wider py-2" style={{ color: "#9B6B1A" }}>
                          {lang === "sv" ? "KOMMENTAR" : "COMMENT"}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {debate.pointMatches.map((pm) => (
                        <tr key={pm.pointId} style={{ borderBottom: "1px solid oklch(0.18 0.02 50 / 0.04)" }}>
                          <td className="font-mono-display text-xs py-2 pr-3" style={{ color: "#8a7a6a" }}>
                            {pm.pointId}
                          </td>
                          <td className="font-body text-xs py-2 pr-3" style={{ color: "#2c1810" }}>
                            {pm.pointTitle}
                          </td>
                          <td className="py-2 pr-3">
                            <RelevanceBadge relevance={pm.relevance} />
                          </td>
                          <td className="font-mono-display text-xs py-2 pr-3" style={{ color: "#5a4a3a" }}>
                            {pm.closestParties.length > 0 ? pm.closestParties.join(", ") : "\u2014"}
                          </td>
                          <td className="font-body text-xs py-2 leading-relaxed" style={{ color: "#8a7a6a" }}>
                            {pm.comment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Party rankings */}
              <div>
                <h4 className="font-display text-lg font-semibold mb-4" style={{ color: "#2c1810" }}>
                  {lang === "sv" ? "Partiernas närhet till de 15 punkterna" : "Party proximity to the 15 points"}
                </h4>
                <p className="font-body text-xs mb-4 italic" style={{ color: "#8a7a6a" }}>
                  {lang === "sv"
                    ? "Baserat på vad som sades i just denna debatt, inte partiernas fullständiga program. Ta med en stor nypa salt."
                    : "Based on what was said in this specific debate, not the parties' full programmes. Take with a large grain of salt."}
                </p>
                <div className="space-y-3">
                  {debate.partyRankings.map((pr) => (
                    <div key={pr.abbreviation}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-mono-display text-xs tracking-wider w-8" style={{ color: "#9B6B1A" }}>
                          {pr.abbreviation}
                        </span>
                        <span className="font-body text-xs" style={{ color: "#2c1810" }}>
                          {pr.party}
                        </span>
                      </div>
                      <div className="ml-11">
                        <ScoreBar score={pr.score} maxScore={pr.maxScore} />
                        <p className="font-body text-[11px] mt-1 leading-relaxed" style={{ color: "#8a7a6a" }}>
                          {pr.reasoning}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing themes */}
              <div>
                <h4 className="font-display text-lg font-semibold mb-4" style={{ color: "#2c1810" }}>
                  {lang === "sv" ? "Vad som saknades helt" : "What was completely missing"}
                </h4>
                <div className="grid gap-2">
                  {debate.missingThemes.map((mt, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 p-2 rounded-sm"
                      style={{ backgroundColor: "oklch(0.99 0.005 80 / 0.5)" }}
                    >
                      <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" style={{ color: "#b0a090" }} />
                      <div className="flex-1">
                        <span className="font-body text-xs font-medium" style={{ color: "#2c1810" }}>
                          {lang === "sv" ? mt.theme : mt.themeEn}
                        </span>
                        <span className="font-mono-display text-[10px] tracking-wider ml-2" style={{ color: "#9B6B1A" }}>
                          ({lang === "sv" ? "punkt" : "point"} {mt.points})
                        </span>
                        <p className="font-body text-[11px] mt-0.5" style={{ color: "#8a7a6a" }}>
                          {lang === "sv" ? mt.comment : mt.commentEn}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conclusion */}
              <div>
                <h4 className="font-display text-lg font-semibold mb-3" style={{ color: "#2c1810" }}>
                  {lang === "sv" ? "Slutsats" : "Conclusion"}
                </h4>
                <div className="space-y-3">
                  {(lang === "sv" ? debate.conclusion : debate.conclusionEn).split("\n\n").map((p, i) => (
                    <p key={i} className="font-body text-sm leading-relaxed font-light" style={{ color: "#5a4a3a" }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              {/* JJ final comment */}
              <div className="p-4 md:p-6 rounded-sm" style={{ backgroundColor: "oklch(0.95 0.02 80 / 0.5)", borderLeft: "3px solid #9B6B1A" }}>
                <p className="font-mono-display text-xs tracking-wider mb-2" style={{ color: "#9B6B1A" }}>
                  // JJ KOMMENTERAR:
                </p>
                <p className="font-body text-sm leading-relaxed italic" style={{ color: "#5a4a3a" }}>
                  {lang === "sv" ? debate.jjFinalComment : debate.jjFinalCommentEn}
                </p>
              </div>

              {/* Download links */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4" style={{ borderTop: "1px solid oklch(0.18 0.02 50 / 0.06)" }}>
                <a
                  href={debate.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-body text-xs transition-all hover:translate-x-1"
                  style={{ backgroundColor: "oklch(0.92 0.01 80 / 0.5)", borderLeft: "3px solid #9B6B1A", color: "#5a4a3a" }}
                >
                  <Download size={12} style={{ color: "#9B6B1A" }} />
                  {lang === "sv" ? "Ladda ner analys (PDF)" : "Download analysis (PDF)"}
                </a>
                <a
                  href={debate.mdUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm font-body text-xs transition-all hover:translate-x-1"
                  style={{ backgroundColor: "oklch(0.92 0.01 80 / 0.5)", borderLeft: "3px solid #9B6B1A", color: "#5a4a3a" }}
                >
                  <Download size={12} style={{ color: "#9B6B1A" }} />
                  {lang === "sv" ? "Ladda ner analys (Markdown)" : "Download analysis (Markdown)"}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Debates() {
  const { lang, langPrefix } = useLang();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LanguageSwitcher />

      <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Back link */}
        <Link href={`${langPrefix}/` || "/"}>
          <motion.div
            className="inline-flex items-center gap-2 mb-12 cursor-pointer group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft size={16} style={{ color: "#9B6B1A" }} className="group-hover:-translate-x-1 transition-transform" />
            <span
              className="font-body text-sm underline underline-offset-2 group-hover:no-underline transition-all"
              style={{ color: "#9B6B1A" }}
            >
              {lang === "sv" ? "Tillbaka till manifestet" : "Back to the manifesto"}
            </span>
          </motion.div>
        </Link>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-12 h-[2px] mb-8" style={{ backgroundColor: "#9B6B1A" }} />
          <h1 className="font-display text-3xl md:text-5xl font-normal leading-tight" style={{ color: "#2c1810" }}>
            {lang === "sv" ? "Debattanalys" : "Debate Analysis"}
          </h1>
          <p className="font-body text-lg mt-3 font-light" style={{ color: "#8a7a6a" }}>
            {lang === "sv"
              ? "Hur matchar partiernas uttalanden de 15 punkterna?"
              : "How do the parties' statements match the 15 points?"}
          </p>
          <p className="font-body text-sm mt-4 leading-relaxed" style={{ color: "#5a4a3a" }}>
            {lang === "sv"
              ? "Inför valet 2026 analyserar vi varje partiledardebatt mot de 15 punkterna i Det Nya Sverige. Syftet är inte att rangordna partier, utan att synliggöra vad som diskuteras, vad som saknas, och var de 15 punkterna erbjuder ett annat perspektiv. Fakta skiljs tydligt från spekulation."
              : "Ahead of the 2026 election, we analyse each party leader debate against the 15 points of The New Sweden. The purpose is not to rank parties, but to make visible what is discussed, what is missing, and where the 15 points offer a different perspective. Facts are clearly separated from speculation."}
          </p>
        </motion.div>

        {/* Debate cards */}
        <div className="mt-12 space-y-6">
          {debates.map((debate) => (
            <DebateCard key={debate.id} debate={debate} />
          ))}
        </div>

        {/* Methodology note */}
        <motion.div
          className="mt-16 p-6 rounded-sm"
          style={{ backgroundColor: "oklch(0.97 0.01 80 / 0.6)", border: "1px solid oklch(0.18 0.02 50 / 0.06)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="font-display text-base font-semibold mb-2" style={{ color: "#2c1810" }}>
            {lang === "sv" ? "Om metoden" : "About the method"}
          </h3>
          <p className="font-body text-xs leading-relaxed" style={{ color: "#8a7a6a" }}>
            {lang === "sv"
              ? "Analyserna baseras på fullständiga transkript av debatterna (transkriberade via klang.ai). Varje uttalande matchas mot de 15 punkternas innehåll. 'Direkt' betyder att en partiledare föreslog något som i substans överensstämmer med en punkt. 'Indirekt' betyder att ämnet berördes men utan den specifika lösning som punkten föreslår. 'Ej berört' betyder att varken problemet eller lösningen nämndes. Partiernas poäng mäter bara vad som sades i den specifika debatten, inte deras fullständiga partiprogram. JJ:s kommentarer är personliga reflektioner och markeras tydligt som sådana."
              : "The analyses are based on complete debate transcripts (transcribed via klang.ai). Each statement is matched against the content of the 15 points. 'Direct' means a party leader proposed something that substantively aligns with a point. 'Indirect' means the topic was touched but without the specific solution the point proposes. 'Not covered' means neither the problem nor the solution was mentioned. Party scores only measure what was said in the specific debate, not their full party programmes. JJ's comments are personal reflections and are clearly marked as such."}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
