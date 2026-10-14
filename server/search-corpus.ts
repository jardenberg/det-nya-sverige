import { policyPoints } from "../client/src/lib/points";
import { policyPointsEn } from "../client/src/lib/points-en";
import { debates } from "../client/src/lib/debates";
import { themesForPoint, getTheme } from "../shared/themes";
import type { BilingualText, ExploreLang, SearchHit, SearchInput, SearchResponse } from "../shared/explore";

export interface SearchDocument {
  id: string;
  sourceId: string;
  kind: SearchHit["kind"];
  title: BilingualText;
  sourceTitle: BilingualText;
  text: BilingualText;
  originalOnly?: boolean;
  pointId?: number;
  pointIds: number[];
  sectionIndex?: number;
  anchor?: string;
  date?: string;
}
const bi = (sv: string, en: string): BilingualText => ({ sv, en });
function pointIdsFromText(text: string): number[] {
  const found = new Set<number>();
  // Only explicit manifesto references, never arbitrary dates, amounts or numbered lists.
  for (const match of Array.from(text.matchAll(/(?:punkt(?:erna|er)?|points?)\s+((?:\d{1,2}(?:\s*[,/&]\s*|\s+(?:och|and)\s+)?)+)/gi))) {
    for (const number of match[1].match(/\d+/g) ?? []) {
      const id = Number(number);
      if (id >= 1 && id <= 15) found.add(id);
    }
  }
  return Array.from(found);
}

export const searchDocuments: SearchDocument[] = [
  ...policyPoints.map(point => {
    const en = policyPointsEn.find(p => p.id === point.id)!;
    const body = (p: typeof point) => [p.title, p.subtitle, p.body, p.quote, ...p.metrics.map(m => `${m.label}: ${m.value}`)].join("\n\n");
    return { id: `point:${point.id}`, sourceId: `point:${point.id}`, kind: "manifesto" as const, title: bi(point.title, en.title), sourceTitle: bi("Det Nya Sverige · Manifestet", "The New Sweden · Manifesto"), text: bi(body(point), body(en)), pointId: point.id, pointIds: [point.id] };
  }),
  ...debates.flatMap(debate => {
    const sourceTitle = bi(debate.title, debate.titleEn);
    const base = { sourceId: debate.id, sourceTitle, date: debate.date, kind: "analysis" as const };
    const docs: SearchDocument[] = [
      { ...base, id: `${debate.id}:summary`, title: bi("Sammanfattning", "Summary"), text: bi([debate.subtitle, debate.summary, ...debate.participants].join("\n\n"), [debate.subtitleEn, debate.summaryEn, ...debate.participants].join("\n\n")), pointIds: [], anchor: "summary" },
      { ...base, id: `${debate.id}:conclusion`, title: bi("Slutsats · analys", "Conclusion · analysis"), text: bi(debate.conclusion, debate.conclusionEn), pointIds: pointIdsFromText(debate.conclusion), anchor: "conclusion" },
      { ...base, id: `${debate.id}:jj`, kind: "commentary", title: bi("JJ:s slutkommentar", "JJ's final commentary"), text: bi(debate.jjFinalComment, debate.jjFinalCommentEn), pointIds: pointIdsFromText(debate.jjFinalComment), anchor: "jj" },
    ];
    debate.sections.forEach((section, index) => {
      const sectionBase = { ...base, sectionIndex: index, pointIds: pointIdsFromText(section.connection) };
      docs.push(
        { ...sectionBase, id: `${debate.id}:section:${index}:facts`, title: bi(`${section.title} · vad som sades`, `${section.titleEn} · what was said`), text: bi(section.facts.join("\n"), section.factsEn.join("\n")) },
        { ...sectionBase, id: `${debate.id}:section:${index}:connection`, title: bi(`${section.title} · tolkad koppling`, `${section.titleEn} · interpreted connection`), text: bi(section.connection, section.connectionEn) },
        { ...sectionBase, id: `${debate.id}:section:${index}:jj`, kind: "commentary", title: bi(`${section.title} · JJ kommenterar`, `${section.titleEn} · JJ's commentary`), text: bi(section.jjComment, section.jjCommentEn) },
      );
      section.quotes.forEach((quote, qi) => {
        docs.push({ ...sectionBase, id: `${debate.id}:section:${index}:quote:${qi}`, title: bi(`${section.title} · citat: ${quote.speaker}`, `${section.titleEn} · quotation: ${quote.speaker}`), text: bi(quote.text, quote.text), originalOnly: true });
      });
    });
    debate.pointMatches.forEach(match => {
      const content = `${match.pointTitle}\n${match.relevance === "direct" ? "Direkt" : match.relevance === "indirect" ? "Indirekt" : "Ej berört"} · ${match.closestParties.join(", ")}\n${match.comment}`;
      docs.push({ ...base, id: `${debate.id}:match:${match.pointId}`, title: bi(`Punkt ${match.pointId} · redaktionell matchning`, `Point ${match.pointId} · editorial matching (Swedish original)`), text: bi(content, content), originalOnly: true, pointIds: [match.pointId], anchor: `match-${match.pointId}` });
    });
    debate.missingThemes.forEach((missing, i) => {
      docs.push({ ...base, id: `${debate.id}:missing:${i}`, title: bi(`Saknades: ${missing.theme}`, `Missing: ${missing.themeEn}`), text: bi(missing.comment, missing.commentEn), pointIds: (missing.points.match(/\d+/g) ?? []).map(Number).filter(id => id >= 1 && id <= 15), anchor: "missing" });
    });
    debate.partyRankings.forEach(party => {
      docs.push({ ...base, id: `${debate.id}:party:${party.abbreviation}`, title: bi(`Redaktionell bedömning: ${party.party}`, `Editorial assessment: ${party.party} (Swedish original)`), text: bi(party.reasoning, party.reasoning), originalOnly: true, pointIds: pointIdsFromText(party.reasoning), anchor: "parties" });
    });
    return docs.filter(doc => doc.text.sv.trim() || doc.text.en.trim());
  }),
];

export function documentThemes(doc: SearchDocument): string[] {
  return Array.from(new Set(doc.pointIds.flatMap(id => themesForPoint(id).map(t => t.id))));
}
export function filteredDocuments(input: SearchInput): SearchDocument[] {
  return searchDocuments.filter(doc => (input.kind === "all" || doc.kind === input.kind) && (!input.theme || documentThemes(doc).includes(input.theme)));
}
export function documentHit(doc: SearchDocument, lang: ExploreLang, snippet: string, snippetLang: ExploreLang, reason?: string): SearchHit {
  const base = doc.kind === "manifesto" ? `${lang === "en" ? "/en" : ""}/punkt/${doc.pointId}` : `${lang === "en" ? "/en/debates" : "/debatter"}/${doc.sourceId}`;
  const href = doc.sectionIndex !== undefined ? `${base}?section=${doc.sectionIndex}#${doc.sourceId}-section-${doc.sectionIndex}` : doc.anchor ? `${base}#${doc.sourceId}-${doc.anchor}` : base;
  return { id: doc.id, sourceId: doc.sourceId, kind: doc.kind, title: doc.title[lang], sourceTitle: doc.sourceTitle[lang], href, date: doc.date, snippet, snippetLang, reason, themes: documentThemes(doc), pointId: doc.pointId, sectionIndex: doc.sectionIndex };
}
export function normalizeSearch(text: string): string {
  return text.normalize("NFD").replace(new RegExp("\\p{M}", "gu"), "").toLowerCase();
}
export function queryTerms(query: string): string[] {
  return Array.from(query.matchAll(new RegExp('"([^"]+)"|([\\p{L}\\p{N}]+)', "gu"))).map(m => normalizeSearch((m[1] || m[2]).trim())).filter(Boolean);
}
function escaped(text: string) { return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function termIndex(text: string, term: string) {
  const match = new RegExp(`(?<![\\p{L}\\p{N}])${escaped(term)}(?![\\p{L}\\p{N}])`, "u").exec(text);
  return match?.index ?? -1;
}
export function excerptAt(text: string, index: number, length = 330): string {
  const start = Math.max(0, index - 80);
  const end = Math.min(text.length, start + length);
  return `${start ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`;
}
export function lexicalSearch(input: SearchInput): SearchResponse {
  const terms = queryTerms(input.query);
  if (!terms.length) return { hits: [], total: 0, mode: "lexical", cached: false };
  const candidates = filteredDocuments(input).flatMap(doc => {
    const variants: ExploreLang[] = doc.originalOnly ? ["sv"] : input.lang === "sv" ? ["sv", "en"] : ["en", "sv"];
    for (const variant of variants) {
      const text = doc.text[variant];
      const normalized = normalizeSearch([doc.title[variant], doc.sourceTitle[variant], text].join("\n"));
      if (!terms.every(term => termIndex(normalized, term) >= 0)) continue;
      const body = normalizeSearch(text);
      const indices = terms.map(term => termIndex(body, term)).filter(i => i >= 0);
      const titleScore = terms.filter(term => termIndex(normalizeSearch(doc.title[variant]), term) >= 0).length * 4;
      const score = titleScore + terms.filter(term => termIndex(body, term) >= 0).length + (variant === input.lang ? 0.2 : 0) + (doc.kind === "manifesto" ? 0.1 : 0);
      return [{ hit: documentHit(doc, input.lang, excerptAt(text, indices[0] ?? 0), variant), score }];
    }
    return [];
  }).sort((a, b) => b.score - a.score || (b.hit.date ?? "").localeCompare(a.hit.date ?? "") || a.hit.id.localeCompare(b.hit.id));
  return { hits: candidates.slice(0, 80).map(c => c.hit), total: candidates.length, mode: "lexical", cached: false };
}

export function assertTheme(theme: string | undefined) {
  return !theme || Boolean(getTheme(theme));
}
