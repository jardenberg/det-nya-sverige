import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock3, Download, ChevronDown } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { agendaCombinedSpeakingTime, agendaDebateStats, partyColors } from "@/lib/agenda-stats";

const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.round(seconds % 60).toString().padStart(2, "0")}`;

export default function AgendaDebateStats() {
  const { lang } = useLang();
  const [activeId, setActiveId] = useState<"economy" | "climate">("economy");
  const active = agendaDebateStats.find((debate) => debate.id === activeId)!;
  const maxCombined = agendaCombinedSpeakingTime[0].seconds;

  return (
    <motion.section
      className="mt-12 border-y py-10 md:py-12"
      style={{ borderColor: "oklch(0.18 0.02 50 / 0.12)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      <div className="flex items-start gap-4 mb-7">
        <div className="p-2.5 border" style={{ borderColor: "#9B6B1A55", color: "#9B6B1A" }}>
          <BarChart3 size={22} />
        </div>
        <div>
          <p className="font-body text-xs uppercase tracking-[0.18em] mb-1" style={{ color: "#9B6B1A" }}>
            {lang === "sv" ? "Agenda under lupp" : "Agenda under the lens"}
          </p>
          <h2 className="font-display text-2xl md:text-3xl" style={{ color: "#2c1810" }}>
            {lang === "sv" ? "Vem fick prata – och om vad?" : "Who got to speak – and about what?"}
          </h2>
          <p className="font-body text-sm mt-2 leading-relaxed max-w-2xl" style={{ color: "#6f6256" }}>
            {lang === "sv"
              ? "Talartid och ämnesfördelning i Agendas valdebatter om ekonomin och klimatet. Alla värden kommer direkt från Klang Debatts tidsstämplade transkript."
              : "Speaking time and topic distribution in Agenda's election debates on the economy and climate. All values come directly from Klang Debatt's timestamped transcripts."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-px mb-8 border" style={{ borderColor: "#d8cdbc", backgroundColor: "#d8cdbc" }}>
        <div className="p-4" style={{ backgroundColor: "#f8f3e9" }}>
          <div className="font-display text-2xl" style={{ color: "#2c1810" }}>3:51</div>
          <div className="font-body text-xs mt-1" style={{ color: "#6f6256" }}>{lang === "sv" ? "skillnad mellan M och MP totalt" : "total gap between M and MP"}</div>
        </div>
        <div className="p-4" style={{ backgroundColor: "#f8f3e9" }}>
          <div className="font-display text-2xl" style={{ color: "#2c1810" }}>2,25×</div>
          <div className="font-body text-xs mt-1" style={{ color: "#6f6256" }}>{lang === "sv" ? "M:s tid jämfört med MP i ekonomin" : "M's time versus MP in the economy debate"}</div>
        </div>
        <div className="p-4" style={{ backgroundColor: "#f8f3e9" }}>
          <div className="font-display text-2xl" style={{ color: "#2c1810" }}>71,4 %</div>
          <div className="font-body text-xs mt-1" style={{ color: "#6f6256" }}>{lang === "sv" ? "transport + klimat i klimatdebatten" : "transport + climate in the climate debate"}</div>
        </div>
      </div>

      <h3 className="font-display text-lg mb-4" style={{ color: "#2c1810" }}>
        {lang === "sv" ? "Samlad talartid i båda debatterna" : "Combined speaking time across both debates"}
      </h3>
      <div className="space-y-3 mb-9">
        {agendaCombinedSpeakingTime.map((row, index) => (
          <div key={row.party} className="grid grid-cols-[2rem_2.5rem_1fr_3.5rem] gap-2 items-center">
            <span className="font-body text-xs tabular-nums" style={{ color: "#9a8a7a" }}>{index + 1}</span>
            <span className="font-body text-sm font-semibold" style={{ color: "#2c1810" }}>{row.party}</span>
            <div className="h-5 overflow-hidden" style={{ backgroundColor: "#e9e1d5" }}>
              <motion.div
                className="h-full"
                style={{ backgroundColor: partyColors[row.party] }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(row.seconds / maxCombined) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
              />
            </div>
            <span className="font-body text-xs text-right tabular-nums" style={{ color: "#5a4a3a" }}>{formatTime(row.seconds)}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6" role="tablist" aria-label={lang === "sv" ? "Välj Agenda-debatt" : "Choose Agenda debate"}>
        {agendaDebateStats.map((debate) => (
          <button
            key={debate.id}
            type="button"
            role="tab"
            aria-selected={activeId === debate.id}
            onClick={() => setActiveId(debate.id)}
            className="font-body text-sm px-4 py-2 border transition-colors"
            style={activeId === debate.id
              ? { backgroundColor: "#2c1810", color: "#fffaf0", borderColor: "#2c1810" }
              : { backgroundColor: "transparent", color: "#5a4a3a", borderColor: "#cfc2b2" }}
          >
            {lang === "sv" ? debate.label : debate.labelEn} · {debate.date.slice(5)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock3 size={16} style={{ color: "#9B6B1A" }} />
            <h3 className="font-display text-lg" style={{ color: "#2c1810" }}>{lang === "sv" ? "Talartid" : "Speaking time"}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[430px] border-collapse font-body text-xs">
              <thead>
                <tr style={{ borderBottom: "1px solid #d8cdbc", color: "#8a7a6a" }}>
                  <th className="text-left py-2 pr-3 font-medium">{lang === "sv" ? "Parti" : "Party"}</th>
                  <th className="text-left py-2 pr-3 font-medium">{lang === "sv" ? "Representant" : "Representative"}</th>
                  <th className="text-right py-2 pr-3 font-medium">{lang === "sv" ? "Tid" : "Time"}</th>
                  <th className="text-right py-2 font-medium">{lang === "sv" ? "Av partidelen" : "Of party time"}</th>
                </tr>
              </thead>
              <tbody>
                {active.rows.map((row) => (
                  <tr key={row.party} style={{ borderBottom: "1px solid #e7ded1" }}>
                    <td className="py-2.5 pr-3 font-semibold"><span className="inline-block w-2 h-2 mr-2" style={{ backgroundColor: partyColors[row.party] }} />{row.party}</td>
                    <td className="py-2.5 pr-3" style={{ color: "#5a4a3a" }}>{row.representative}</td>
                    <td className="py-2.5 pr-3 text-right tabular-nums">{formatTime(row.seconds)}</td>
                    <td className="py-2.5 text-right tabular-nums">{row.shareAmongRepresentatives.toFixed(1).replace(".", ",")} %</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-body text-[11px] mt-3 leading-relaxed" style={{ color: "#8a7a6a" }}>
            {lang === "sv"
              ? `Programledaren talade ${formatTime(active.hostSeconds)}, ${active.hostShare.toString().replace(".", ",")} % av hela sändningen. Partiernas andel ovan exkluderar programledare och klipp.`
              : `The presenter spoke for ${formatTime(active.hostSeconds)}, ${active.hostShare}% of the full broadcast. Party shares above exclude the presenter and clips.`}
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg mb-3" style={{ color: "#2c1810" }}>{lang === "sv" ? "Debattens ämnen" : "Debate topics"}</h3>
          <div className="space-y-3">
            {active.overallTopics.map((topic) => (
              <div key={topic.topic}>
                <div className="flex justify-between font-body text-xs mb-1">
                  <span>{lang === "sv" ? topic.topic : topic.topicEn}</span>
                  <span className="tabular-nums" style={{ color: "#8a7a6a" }}>{topic.pct.toFixed(1).replace(".", ",")} %</span>
                </div>
                <div className="h-2" style={{ backgroundColor: "#e9e1d5" }}>
                  <motion.div
                    className="h-full"
                    style={{ backgroundColor: "#9B6B1A" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.pct}%` }}
                    transition={{ duration: 0.45 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <details className="mt-7 border-t pt-5" style={{ borderColor: "#d8cdbc" }}>
        <summary className="font-body text-sm font-medium cursor-pointer inline-flex items-center gap-2" style={{ color: "#5a4a3a" }}>
          <ChevronDown size={15} /> {lang === "sv" ? "Visa varje partis tre största ämnen" : "Show each party's three largest topics"}
        </summary>
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mt-5">
          {active.rows.map((row) => (
            <div key={row.party} className="border-l-2 pl-3" style={{ borderColor: partyColors[row.party] }}>
              <div className="font-body text-sm font-semibold mb-1">{row.party} · {row.representative}</div>
              <div className="font-body text-xs leading-relaxed" style={{ color: "#7a6a5a" }}>
                {row.topTopics.map((topic) => `${lang === "sv" ? topic.topic : topic.topicEn} ${topic.pct} %`).join(" · ")}
              </div>
            </div>
          ))}
        </div>
      </details>

      <div className="flex flex-wrap gap-3 mt-7">
        <a href="/manus-storage/agenda-valdebatter-talartid-amnen_94b922b9.pdf" download className="inline-flex items-center gap-2 font-body text-xs underline underline-offset-3" style={{ color: "#9B6B1A" }}>
          <Download size={14} /> {lang === "sv" ? "Hela jämförelsen som PDF" : "Full comparison as PDF"}
        </a>
        <a href="/manus-storage/agenda-valdebatter-talartid-amnen_c6704565.md" download className="inline-flex items-center gap-2 font-body text-xs underline underline-offset-3" style={{ color: "#9B6B1A" }}>
          <Download size={14} /> {lang === "sv" ? "Jämförelsen som Markdown" : "Comparison as Markdown"}
        </a>
        <a href="/manus-storage/agenda-comparison-data_7312ff04.json" download className="inline-flex items-center gap-2 font-body text-xs underline underline-offset-3" style={{ color: "#9B6B1A" }}>
          <Download size={14} /> {lang === "sv" ? "Rådata (JSON)" : "Raw data (JSON)"}
        </a>
      </div>

      <p className="font-body text-[11px] mt-5 leading-relaxed" style={{ color: "#8a7a6a" }}>
        {lang === "sv"
          ? "Ämnesandelarna speglar både debattörernas val och programledarens fasta frågor. De beskriver sändningen, inte partiernas fullständiga program. Inget parti företräddes av samma person i båda debatterna."
          : "Topic shares reflect both the debaters' choices and the presenter's fixed questions. They describe the broadcast, not the parties' full programmes. No party was represented by the same person in both debates."}
      </p>
    </motion.section>
  );
}
