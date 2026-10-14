import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronRight,
  Compass,
  Copy,
  FileSearch,
  Languages,
  Loader2,
  MessageSquareQuote,
  RefreshCw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { usePoints } from "@/hooks/usePoints";
import { debates } from "@/lib/debates";
import { trpc } from "@/lib/trpc";
import type { SearchHit, SearchKind, SearchMode } from "@shared/explore";
import { getTheme, manifestoThemes, themesForPoint, type ManifestoTheme } from "@shared/themes";

const MAX_QUERY_LENGTH = 240;

type ExploreState = {
  query: string;
  mode: SearchMode;
  kind: SearchKind;
  theme?: string;
};

const validMode = (value: string | null): value is SearchMode => value === "lexical" || value === "semantic";
const validKind = (value: string | null): value is SearchKind =>
  value === "all" || value === "manifesto" || value === "analysis" || value === "commentary";

function readStateFromUrl(): ExploreState {
  const params = new URLSearchParams(window.location.search);
  const modeParam = params.get("mode");
  const kindParam = params.get("kind");
  const theme = getTheme(params.get("theme") ?? undefined)?.id;
  return {
    query: (params.get("q") ?? "").slice(0, MAX_QUERY_LENGTH),
    mode: validMode(modeParam) ? modeParam : "lexical",
    kind: validKind(kindParam) ? kindParam : "all",
    theme,
  };
}

function isSearchable(query: string) {
  return query.trim().length >= 2;
}

function sourceLabel(kind: SearchHit["kind"], lang: "sv" | "en") {
  if (kind === "manifesto") return lang === "sv" ? "Manifestet" : "Manifesto";
  if (kind === "analysis") return lang === "sv" ? "Analys" : "Analysis";
  return lang === "sv" ? "JJ kommenterar" : "JJ commentary";
}

function writeExploreUrl(state: ExploreState, replace = false) {
  const params = new URLSearchParams();
  if (state.query.trim()) params.set("q", state.query.trim());
  params.set("mode", state.mode);
  params.set("kind", state.kind);
  if (state.theme) params.set("theme", state.theme);
  const suffix = params.toString();
  const url = `${window.location.pathname}${suffix ? `?${suffix}` : ""}`;
  window.history[replace ? "replaceState" : "pushState"]({}, "", url);
}

function ThemeCard({
  theme,
  selected,
  onSelect,
  lang,
}: {
  theme: ManifestoTheme;
  selected: boolean;
  onSelect: (id: string) => void;
  lang: "sv" | "en";
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={() => onSelect(theme.id)}
      className="group relative min-h-44 p-5 text-left border transition-[transform,background-color,border-color] duration-150 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
      style={{
        backgroundColor: selected ? "#e9f0e9" : "rgba(255,250,240,0.62)",
        borderColor: selected ? "#2d6a4f" : "rgba(44,24,16,0.12)",
        borderLeftWidth: selected ? 4 : 1,
      }}
    >
      <span className="block font-mono-display text-[10px] uppercase tracking-[0.18em] mb-4" style={{ color: selected ? "#2d6a4f" : "#B64A3A" }}>
        {theme.connections.length} {lang === "sv" ? "ingångar" : "entry points"}
      </span>
      <span className="block font-display text-xl leading-tight mb-2" style={{ color: "#2c1810" }}>
        {theme.title[lang]}
      </span>
      <span className="block font-body text-sm leading-relaxed pr-4" style={{ color: "#6a5a4a" }}>
        {theme.description[lang]}
      </span>
      <ChevronRight
        size={17}
        className="absolute right-4 bottom-5 transition-transform duration-150 group-hover:translate-x-1"
        style={{ color: selected ? "#2d6a4f" : "#B64A3A" }}
      />
    </button>
  );
}

function ThemeConstellation({
  theme,
  onSelectTheme,
}: {
  theme: ManifestoTheme;
  onSelectTheme: (id: string) => void;
}) {
  const { lang, langPrefix } = useLang();
  const points = usePoints();
  const strands = useMemo(() => {
    const grouped = new Map<string, typeof theme.connections>();
    theme.connections.forEach((connection) => {
      const key = connection.strand[lang];
      grouped.set(key, [...(grouped.get(key) ?? []), connection]);
    });
    return Array.from(grouped.entries());
  }, [lang, theme.connections]);

  const overlaps = useMemo(() => {
    const counts = new Map<string, number>();
    theme.connections.forEach(({ pointId }) => {
      themesForPoint(pointId).forEach((other) => {
        if (other.id !== theme.id) counts.set(other.id, (counts.get(other.id) ?? 0) + 1);
      });
    });
    return Array.from(counts.entries())
      .map(([id, count]) => ({ theme: getTheme(id), count }))
      .filter((item): item is { theme: ManifestoTheme; count: number } => Boolean(item.theme))
      .sort((a, b) => b.count - a.count);
  }, [theme]);

  return (
    <section className="mb-14 border-y border-foreground/10 py-10 md:py-14" aria-labelledby="theme-detail-title">
      <div className="grid xl:grid-cols-[0.75fr_1.25fr] gap-9 xl:gap-14">
        <div>
          <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "#2d6a4f" }}>
            {lang === "sv" ? "Tematisk läsning" : "Thematic reading"}
          </p>
          <h2 id="theme-detail-title" className="font-display text-3xl md:text-4xl leading-[1.03] mb-4" style={{ color: "#2c1810" }}>
            {theme.title[lang]}
          </h2>
          <p className="font-display text-xl italic leading-snug mb-5" style={{ color: "#2d6a4f" }}>
            {theme.thesis[lang]}
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: "#6a5a4a" }}>
            {theme.description[lang]}
          </p>
          <div className="mt-7 pl-4 border-l-2" style={{ borderColor: "#B64A3A" }}>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: "#B64A3A" }}>
              {lang === "sv" ? "Så läser du kartan" : "How to read this map"}
            </p>
            <p className="font-body text-xs leading-relaxed" style={{ color: "#6a5a4a" }}>
              {lang === "sv"
                ? "Stråken är redaktionella samband mellan punkterna, inte en tidslinje eller ett påstående om orsak och verkan. En punkt kan höra hemma i flera teman."
                : "The strands are editorial connections between points, not a timeline or a claim of causality. A point may belong to several themes."}
            </p>
          </div>

          {overlaps.length > 0 && (
            <div className="mt-7">
              <p className="font-mono-display text-[10px] uppercase tracking-[0.15em] mb-3" style={{ color: "#8a7a6a" }}>
                {lang === "sv" ? "Överlappande teman" : "Overlapping themes"}
              </p>
              <div className="flex flex-wrap gap-2">
                {overlaps.map(({ theme: overlap, count }) => (
                  <button
                    key={overlap.id}
                    type="button"
                    onClick={() => onSelectTheme(overlap.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 border font-body text-xs transition-colors hover:bg-[#e9f0e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
                    style={{ color: "#2d6a4f", borderColor: "rgba(45,106,79,0.3)" }}
                  >
                    {overlap.short[lang]}
                    <span className="font-mono-display text-[10px]">{count}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative pl-5 md:pl-8 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-[#2d6a4f]/30">
          <div className="space-y-8">
            {strands.map(([strand, connections]) => (
              <section key={strand} aria-label={strand}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2d6a4f" }} />
                  <h3 className="font-display text-xl" style={{ color: "#2c1810" }}>{strand}</h3>
                </div>
                <div className="space-y-3">
                  {connections.map((connection) => {
                    const point = points.find((entry) => entry.id === connection.pointId);
                    return (
                      <article
                        key={`${strand}-${connection.pointId}`}
                        className="relative bg-[#fffaf0]/70 p-4 border border-foreground/10"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                          <Link
                            href={`${langPrefix}/punkt/${connection.pointId}`}
                            className="group inline-flex items-baseline gap-2 font-display text-base hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
                            style={{ color: "#2c1810" }}
                          >
                            <span className="font-mono-display text-sm" style={{ color: "#B64A3A" }}>#{connection.pointId}</span>
                            {point?.title ?? (lang === "sv" ? `Punkt ${connection.pointId}` : `Point ${connection.pointId}`)}
                            <ArrowUpRight size={13} className="opacity-60 group-hover:opacity-100" />
                          </Link>
                        </div>
                        <p className="font-body text-sm leading-relaxed mb-3" style={{ color: "#5a4a3a" }}>
                          {connection.reason[lang]}
                        </p>
                        <blockquote lang="sv" className="pl-3 border-l-2 font-body text-xs italic leading-relaxed" style={{ borderColor: "#B64A3A", color: "#6a5a4a" }}>
                          <span className="not-italic font-mono-display text-[9px] tracking-[0.14em] mr-2" style={{ color: "#B64A3A" }}>
                            {lang === "sv" ? "EXAKT I MANIFESTET" : "ORIGINAL SWEDISH"}
                          </span>
                          “{connection.evidence}”
                        </blockquote>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SearchResult({ hit }: { hit: SearchHit }) {
  const { lang } = useLang();
  const originalSwedish = lang === "en" && hit.snippetLang === "sv";
  return (
    <article className="relative border-b border-foreground/10 py-6 first:pt-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
        <span className="px-2 py-1 font-mono-display text-[10px] tracking-[0.12em] uppercase text-[#fffaf0]" style={{ backgroundColor: hit.kind === "commentary" ? "#B64A3A" : hit.kind === "analysis" ? "#356C82" : "#2d6a4f" }}>
          {sourceLabel(hit.kind, lang)}
        </span>
        <span className="font-mono-display text-[10px] uppercase tracking-[0.12em]" style={{ color: "#8a7a6a" }}>
          {hit.sourceTitle}
        </span>
        {hit.date && <time className="font-mono-display text-[10px] tracking-[0.12em]" style={{ color: "#8a7a6a" }}>{hit.date}</time>}
      </div>
      <a
        href={hit.href}
        className="group inline-flex items-start gap-2 font-display text-xl md:text-2xl leading-tight hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
        style={{ color: "#2c1810" }}
      >
        <span>{hit.title}</span>
        <ArrowUpRight size={17} className="mt-1 flex-none text-[#2d6a4f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
      <blockquote lang={hit.snippetLang} className="mt-4 pl-4 border-l-2 font-body text-base italic leading-relaxed" style={{ borderColor: "rgba(182,74,58,0.65)", color: "#5a4a3a" }}>
        <span className="block mb-1 font-mono-display not-italic text-[10px] tracking-[0.14em] uppercase" style={{ color: "#B64A3A" }}>
          {originalSwedish ? "Original Swedish excerpt" : lang === "sv" ? (hit.snippetLang === "en" ? "Engelskt källutdrag" : "Källutdrag") : "Source excerpt"}
        </span>
        “{hit.snippet}”
      </blockquote>
      {hit.reason && (
        <div className="mt-4 flex gap-2.5 p-3 border-l-2" style={{ backgroundColor: "rgba(45,106,79,0.07)", borderColor: "#2d6a4f" }}>
          <Sparkles size={15} className="mt-0.5 flex-none" style={{ color: "#2d6a4f" }} />
          <div>
            <p className="font-mono-display text-[10px] uppercase tracking-[0.13em] mb-1" style={{ color: "#2d6a4f" }}>
              {lang === "sv" ? "AI-relevansförklaring. inte ett faktapåstående" : "AI relevance explanation. not a factual claim"}
            </p>
            <p className="font-body text-xs leading-relaxed" style={{ color: "#5a4a3a" }}>{hit.reason}</p>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Explore() {
  const { lang, langPrefix } = useLang();
  const initial = useMemo(readStateFromUrl, []);
  const [query, setQuery] = useState(initial.query);
  const [mode, setMode] = useState<SearchMode>(initial.mode);
  const [kind, setKind] = useState<SearchKind>(initial.kind);
  const [themeId, setThemeId] = useState<string | undefined>(initial.theme);
  const [submitted, setSubmitted] = useState(() => isSearchable(initial.query));
  const [executedSearch, setExecutedSearch] = useState<ExploreState>(() => ({
    ...initial,
    query: initial.query.trim(),
  }));
  const [validation, setValidation] = useState("");
  const [copied, setCopied] = useState(false);
  const [visibleHits, setVisibleHits] = useState(20);
  const analysisCount = useMemo(() => new Set(debates.map((debate) => debate.id)).size, []);

  const input = useMemo(
    () => ({
      query: executedSearch.query,
      lang,
      mode: executedSearch.mode,
      kind: executedSearch.kind,
      ...(executedSearch.theme ? { theme: executedSearch.theme } : {}),
    }),
    [executedSearch, lang],
  );
  const enabled = submitted && isSearchable(executedSearch.query);
  const searchQuery = trpc.explore.search.useQuery(input, { enabled, retry: false, refetchOnWindowFocus: false, refetchOnReconnect: false, staleTime: 300000 });
  useEffect(() => setVisibleHits(20), [executedSearch, lang]);
  const selectedTheme = getTheme(themeId);

  useEffect(() => {
    document.title = lang === "sv" ? "Utforska – Det Nya Sverige" : "Explore – The New Sweden";
  }, [lang]);

  useEffect(() => {
    const onPopState = () => {
      const next = readStateFromUrl();
      setQuery(next.query);
      setMode(next.mode);
      setKind(next.kind);
      setThemeId(next.theme);
      setSubmitted(isSearchable(next.query));
      setExecutedSearch({ ...next, query: next.query.trim() });
      setValidation("");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const updateStateUrl = useCallback((next: ExploreState, replace = false) => {
    writeExploreUrl(next, replace);
  }, []);

  const runSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!isSearchable(trimmed)) {
      setSubmitted(false);
      setValidation(lang === "sv" ? "Skriv minst två tecken för att söka." : "Enter at least two characters to search.");
      return;
    }
    setValidation("");
    setSubmitted(true);
    const next = { query: trimmed, mode, kind, theme: themeId };
    setExecutedSearch(next);
    updateStateUrl(next);
  };

  const changeMode = (nextMode: SearchMode) => {
    setMode(nextMode);
    if (submitted && isSearchable(query)) {
      const next = { ...executedSearch, query: query.trim(), mode: nextMode };
      setExecutedSearch(next);
      updateStateUrl(next);
    }
  };

  const changeKind = (nextKind: SearchKind) => {
    setKind(nextKind);
    if (submitted && isSearchable(query)) {
      const next = { ...executedSearch, query: query.trim(), kind: nextKind };
      setExecutedSearch(next);
      updateStateUrl(next);
    }
  };

  const changeTheme = (nextTheme?: string) => {
    setThemeId(nextTheme);
    if (submitted && isSearchable(query)) {
      const next = { ...executedSearch, query: query.trim(), theme: nextTheme };
      setExecutedSearch(next);
      updateStateUrl(next);
    } else {
      updateStateUrl({ query: "", mode, kind, theme: nextTheme });
    }
  };

  const copyLink = async () => {
    writeExploreUrl({ query: submitted ? executedSearch.query : "", mode, kind, theme: themeId }, true);
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const resetTheme = () => changeTheme(undefined);
  const resultTotal = searchQuery.data?.total ?? 0;

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LanguageSwitcher />
      <header className="relative pt-24 md:pt-32 pb-10 md:pb-14 border-b border-foreground/10">
        <div className="absolute inset-x-0 bottom-0 h-1" style={{ background: "linear-gradient(90deg, #2d6a4f 0 42%, #B64A3A 42% 56%, transparent 56%)" }} />
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <Link href={`${langPrefix}/` || "/"} className="inline-flex items-center gap-2 font-body text-sm text-ochre hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]">
              <ArrowLeft size={15} />
              {lang === "sv" ? "Tillbaka till manifestet" : "Back to the manifesto"}
            </Link>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-2 font-body text-sm text-[#2d6a4f] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] active:scale-[0.97]"
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? (lang === "sv" ? "Länk kopierad" : "Link copied") : (lang === "sv" ? "Kopiera länk" : "Copy link")}
            </button>
          </div>
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-end">
            <div>
              <p className="font-mono-display text-[11px] uppercase tracking-[0.22em] mb-4" style={{ color: "#2d6a4f" }}>
                {lang === "sv" ? "Sök och följ trådarna" : "Search and follow the threads"}
              </p>
              <h1 className="font-display text-4xl md:text-6xl leading-[0.96] max-w-3xl" style={{ color: "#2c1810" }}>
                {lang === "sv" ? "Utforska vad som hänger ihop." : "Explore what connects."}
              </h1>
            </div>
            <p className="font-body text-base md:text-lg leading-relaxed max-w-xl" style={{ color: "#6a5a4a" }}>
              {lang === "sv"
                ? "Sök i manifestet och redaktionens analyser, eller gå via teman. Språket är en av trådarna som förbinder skola, arbete, rättigheter och hur staten möter människor."
                : "Search the manifesto and the editorial analyses, or enter through themes. Language is one thread linking school, work, rights, and the way the state meets people."}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <section className="relative p-5 md:p-8 border bg-[#fffaf0]/75" style={{ borderColor: "rgba(45,106,79,0.32)" }} aria-labelledby="search-title">
          <div className="absolute top-0 left-0 w-20 h-1" style={{ backgroundColor: "#2d6a4f" }} />
          <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-3 mb-6">
            <div>
              <h2 id="search-title" className="font-display text-2xl md:text-3xl" style={{ color: "#2c1810" }}>
                {lang === "sv" ? "Hitta källorna" : "Find the sources"}
              </h2>
              <p className="font-body text-sm mt-1" style={{ color: "#6a5a4a" }}>
                {lang === "sv" ? "Resultaten är utdrag ur källor. inte AI-svar." : "Results are source excerpts. not AI answers."}
              </p>
            </div>
            <p className="font-body text-xs leading-relaxed lg:max-w-xs" style={{ color: "#8a7a6a" }}>
              {lang === "sv"
                ? "Sök på svenska eller engelska. Exakta ord söker i båda språkversionerna; semantisk sökning förstår frågan på båda språken."
                : "Search in Swedish or English. Exact words search both language versions; meaning search understands either language."}
            </p>
          </div>

          <form onSubmit={runSearch} noValidate>
            <label htmlFor="explore-query" className="sr-only">{lang === "sv" ? "Sökfråga" : "Search query"}</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={18} className="absolute top-1/2 left-4 -translate-y-1/2" style={{ color: "#2d6a4f" }} aria-hidden="true" />
                <input
                  id="explore-query"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value.slice(0, MAX_QUERY_LENGTH));
                    setValidation("");
                  }}
                  maxLength={MAX_QUERY_LENGTH}
                  aria-describedby="query-help query-validation"
                  className="w-full h-12 pl-11 pr-4 bg-white/70 border font-body text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
                  style={{ borderColor: "rgba(44,24,16,0.18)", color: "#2c1810" }}
                  placeholder={lang === "sv" ? "Exempel: språkstöd i arbetslivet" : "Example: language support at work"}
                />
              </div>
              <button
                type="submit"
                className="inline-flex justify-center items-center gap-2 min-h-12 px-6 font-body text-sm font-semibold text-[#fffaf0] transition-transform active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] focus-visible:ring-offset-2"
                style={{ backgroundColor: "#2d6a4f" }}
              >
                <Search size={16} />
                {lang === "sv" ? "Sök" : "Search"}
              </button>
            </div>
            <div className="flex flex-col md:flex-row md:items-end gap-5 mt-5">
              <fieldset>
                <legend className="font-mono-display text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "#8a7a6a" }}>
                  {lang === "sv" ? "Sökmetod" : "Search method"}
                </legend>
                <div className="flex flex-wrap gap-2" role="group" aria-label={lang === "sv" ? "Sökmetod" : "Search method"}>
                  <button
                    type="button"
                    aria-pressed={mode === "lexical"}
                    onClick={() => changeMode("lexical")}
                    className="inline-flex items-center gap-2 px-3 py-2 border font-body text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] active:scale-[0.97]"
                    style={{ color: mode === "lexical" ? "#fffaf0" : "#5a4a3a", backgroundColor: mode === "lexical" ? "#2d6a4f" : "transparent", borderColor: mode === "lexical" ? "#2d6a4f" : "rgba(44,24,16,0.2)" }}
                  >
                    <FileSearch size={14} />
                    {lang === "sv" ? "Exakta ord" : "Exact words"}
                  </button>
                  <button
                    type="button"
                    aria-pressed={mode === "semantic"}
                    onClick={() => changeMode("semantic")}
                    className="inline-flex items-center gap-2 px-3 py-2 border font-body text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f] active:scale-[0.97]"
                    style={{ color: mode === "semantic" ? "#fffaf0" : "#5a4a3a", backgroundColor: mode === "semantic" ? "#2d6a4f" : "transparent", borderColor: mode === "semantic" ? "#2d6a4f" : "rgba(44,24,16,0.2)" }}
                  >
                    <Sparkles size={14} />
                    {lang === "sv" ? "Betydelse" : "Meaning"}
                  </button>
                </div>
              </fieldset>

              <label className="block min-w-44">
                <span className="block font-mono-display text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "#8a7a6a" }}>
                  {lang === "sv" ? "Källtyp" : "Source type"}
                </span>
                <select
                  value={kind}
                  onChange={(event) => changeKind(event.target.value as SearchKind)}
                  className="w-full h-9 px-3 bg-transparent border font-body text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
                  style={{ borderColor: "rgba(44,24,16,0.2)", color: "#5a4a3a" }}
                >
                  <option value="all">{lang === "sv" ? "Alla källor" : "All sources"}</option>
                  <option value="manifesto">{lang === "sv" ? "Manifestet" : "Manifesto"}</option>
                  <option value="analysis">{lang === "sv" ? "Analyser" : "Analyses"}</option>
                  <option value="commentary">{lang === "sv" ? "JJ kommenterar" : "JJ commentary"}</option>
                </select>
              </label>

              <label className="block min-w-52">
                <span className="block font-mono-display text-[10px] uppercase tracking-[0.16em] mb-2" style={{ color: "#8a7a6a" }}>
                  {lang === "sv" ? "Tema" : "Theme"}
                </span>
                <select
                  value={themeId ?? ""}
                  onChange={(event) => changeTheme(event.target.value || undefined)}
                  className="w-full h-9 px-3 bg-transparent border font-body text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
                  style={{ borderColor: "rgba(44,24,16,0.2)", color: "#5a4a3a" }}
                >
                  <option value="">{lang === "sv" ? "Alla teman" : "All themes"}</option>
                  {manifestoThemes.map((theme) => <option value={theme.id} key={theme.id}>{theme.title[lang]}</option>)}
                </select>
              </label>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-4">
              <p id="query-help" className="font-body text-xs" style={{ color: "#8a7a6a" }}>
                {lang === "sv"
                  ? (mode === "semantic" ? "2–240 tecken. Beskriv vad du vill hitta. Modellens urval är inte uttömmande." : "2–240 tecken. Citattecken söker frasen exakt; utan citattecken matchas alla ord, oavsett accenter.")
                  : (mode === "semantic" ? "2–240 characters. Describe what you want to find. Model selection is not exhaustive." : "2–240 characters. Quotation marks search an exact phrase; without them, all terms match, accent-insensitively.")}
              </p>
              <p className="font-body text-xs" style={{ color: "#8a7a6a" }}>
                {mode === "semantic"
                  ? (lang === "sv" ? "Sökning körs vid Sök eller när du ändrar ett filter, inte medan du skriver." : "Runs on Search or a filter change, never while you type.")
                  : (lang === "sv" ? "Exakta ord söker i både svensk och engelsk version." : "Exact words searches both Swedish and English versions.")}
              </p>
            </div>
            {mode === "semantic" && (
              <p className="mt-3 pl-3 border-l-2 font-body text-xs leading-relaxed" style={{ borderColor: "#B64A3A", color: "#6a5a4a" }}>
                {lang === "sv"
                  ? "Betydelsesökning skickar din fråga och offentliga sidpassager till en AI-modell. Skriv inte personlig eller konfidentiell information. Den skapar inte svar: den visar ordagranna utdrag och AI-märkta relevansförklaringar, som kan ha fel."
                  : "Meaning search sends your query and public site passages to an AI model. Do not enter personal or confidential information. It does not create answers: it shows verbatim excerpts and AI-labelled relevance explanations, which may be wrong."}
              </p>
            )}
            {themeId && (
              <p className="mt-3 font-body text-xs leading-relaxed" style={{ color: "#8a7a6a" }}>
                {lang === "sv"
                  ? "Temafiltret bygger på redaktionella punktreferenser, inte på att en politiker eller ett parti har ställt sig bakom ett förslag."
                  : "The theme filter uses editorial point-reference links, not an endorsement of a proposal by a politician or party."}
              </p>
            )}
            <p id="query-validation" aria-live="polite" className="font-body text-xs mt-2" style={{ color: "#B64A3A" }}>{validation}</p>
          </form>
        </section>

        <section id="results" className="mt-10 mb-12" aria-labelledby={enabled ? "results-title" : undefined} aria-live="polite">
          {enabled && (
            <div className="flex flex-wrap items-end justify-between gap-4 pb-5 border-b border-foreground/10">
              <div>
                <p className="font-mono-display text-[10px] uppercase tracking-[0.18em] mb-2" style={{ color: "#2d6a4f" }}>
                  {mode === "semantic" ? (lang === "sv" ? "Betydelsesökning" : "Meaning search") : (lang === "sv" ? "Exakta ord" : "Exact words")}
                </p>
                <h2 id="results-title" className="font-display text-2xl" style={{ color: "#2c1810" }}>
                  {searchQuery.isLoading
                    ? (lang === "sv" ? "Letar i källorna …" : "Searching the sources …")
                    : (lang === "sv" ? `${resultTotal} träff${resultTotal === 1 ? "" : "ar"}` : `${resultTotal} result${resultTotal === 1 ? "" : "s"}`)}
                </h2>
              </div>
              {searchQuery.data?.cached && <span className="font-body text-xs" style={{ color: "#8a7a6a" }}>{lang === "sv" ? "Visas från cache" : "Shown from cache"}</span>}
            </div>
          )}

          {enabled && searchQuery.isLoading && (
            <div className="flex items-center gap-3 py-10 font-body text-sm" style={{ color: "#6a5a4a" }}>
              <Loader2 className="animate-spin motion-reduce:animate-none text-[#2d6a4f]" size={19} />
              {lang === "sv" ? "Söker i de utvalda källorna …" : "Searching the selected sources …"}
            </div>
          )}

          {enabled && searchQuery.isError && (
            <div className="mt-6 p-5 border-l-4" role="alert" style={{ backgroundColor: "rgba(182,74,58,0.07)", borderColor: "#B64A3A" }}>
              <div className="flex gap-3">
                <MessageSquareQuote size={18} className="mt-0.5 flex-none" style={{ color: "#B64A3A" }} />
                <div>
                  <h3 className="font-display text-lg" style={{ color: "#2c1810" }}>{lang === "sv" ? "Sökningen gick inte att genomföra" : "The search could not be completed"}</h3>
                  <p className="font-body text-sm leading-relaxed mt-1" style={{ color: "#5a4a3a" }}>
                    {(lang === "sv" ? "Sökningen är tillfälligt otillgänglig. Försök igen om en stund eller välj exakta ord." : "Search is temporarily unavailable. Try again in a moment or choose exact words.")}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button type="button" onClick={() => searchQuery.refetch()} className="inline-flex items-center gap-2 px-3 py-2 border font-body text-xs text-[#5a4a3a] hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]" style={{ borderColor: "rgba(44,24,16,0.2)" }}>
                      <RefreshCw size={13} /> {lang === "sv" ? "Försök igen" : "Try again"}
                    </button>
                    {mode === "semantic" && (
                      <button type="button" onClick={() => changeMode("lexical")} className="inline-flex items-center gap-2 px-3 py-2 font-body text-xs text-[#fffaf0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]" style={{ backgroundColor: "#2d6a4f" }}>
                        <FileSearch size={13} /> {lang === "sv" ? "Byt till exakta ord" : "Switch to exact words"}
                      </button>
                    )}
                  </div>
                  {mode === "semantic" && <p className="font-body text-[11px] mt-3" style={{ color: "#8a7a6a" }}>{lang === "sv" ? "Ingen tyst reservsökning används; välj exakta ord om du vill försöka lexikalt." : "No silent fallback is used; choose exact words to try lexical search."}</p>}
                </div>
              </div>
            </div>
          )}

          {!searchQuery.isLoading && !searchQuery.isError && enabled && searchQuery.data?.hits.length === 0 && (
            <div className="py-10 md:py-14 text-center border-b border-foreground/10">
              <Compass size={25} className="mx-auto mb-3" style={{ color: "#B64A3A" }} />
              <h3 className="font-display text-2xl" style={{ color: "#2c1810" }}>{lang === "sv" ? "Inga träffar i de här källorna" : "No results in these sources"}</h3>
              <p className="font-body text-sm mt-2 max-w-lg mx-auto" style={{ color: "#6a5a4a" }}>
                {lang === "sv" ? "Prova ett annat ord, ta bort ett filter eller välj betydelse för att söka efter närliggande resonemang." : "Try another word, remove a filter, or choose meaning to find related reasoning."}
              </p>
            </div>
          )}

          {!searchQuery.isLoading && !searchQuery.isError && enabled && searchQuery.data?.hits.slice(0, visibleHits).map((hit) => <SearchResult hit={hit} key={hit.id} />)}
          {enabled && searchQuery.data && searchQuery.data.hits.length > 0 && !searchQuery.isError && (
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 font-body text-sm text-[#6a5a4a]">
              <p>{lang === "sv" ? `Visar ${Math.min(visibleHits, searchQuery.data.hits.length)} av ${resultTotal} träffar.` : `Showing ${Math.min(visibleHits, searchQuery.data.hits.length)} of ${resultTotal} results.`}
                {resultTotal > searchQuery.data.hits.length && (lang === "sv" ? " De första 80 returneras. Begränsa sökningen för fler relevanta träffar." : " The first 80 are returned. Narrow your search for more relevant matches.")}
              </p>
              {visibleHits < searchQuery.data.hits.length && <button type="button" onClick={() => setVisibleHits(n => n + 20)} className="px-4 py-2 border border-[#2d6a4f]/40 text-[#2d6a4f] focus-visible:ring-2 focus-visible:ring-[#2d6a4f]">{lang === "sv" ? "Visa fler träffar" : "Show more results"}</button>}
              <button type="button" onClick={() => { setQuery(""); setSubmitted(false); setExecutedSearch({query: "", mode, kind, theme: themeId}); updateStateUrl({query: "", mode, kind, theme: themeId}); }} className="underline underline-offset-4 text-[#B64A3A]">{lang === "sv" ? "Rensa sökningen" : "Clear search"}</button>
            </div>
          )}
        </section>


        {selectedTheme ? (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mt-12 mb-1">
              <p className="font-mono-display text-[10px] uppercase tracking-[0.16em]" style={{ color: "#2d6a4f" }}>
                {lang === "sv" ? "Valt tema" : "Selected theme"}
              </p>
              <button type="button" onClick={resetTheme} className="inline-flex items-center gap-1.5 font-body text-xs text-[#B64A3A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]">
                <X size={14} /> {lang === "sv" ? "Visa alla teman" : "Show all themes"}
              </button>
            </div>
            <ThemeConstellation theme={selectedTheme} onSelectTheme={changeTheme} />
          </>
        ) : (
          <section className="mt-14 mb-14" aria-labelledby="themes-title">
            <div className="grid md:grid-cols-[0.68fr_1.32fr] gap-8 mb-7 items-end">
              <div>
                <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "#B64A3A" }}>
                  {lang === "sv" ? "En annan väg in" : "Another way in"}
                </p>
                <h2 id="themes-title" className="font-display text-3xl md:text-4xl leading-[1.02]" style={{ color: "#2c1810" }}>
                  {lang === "sv" ? "Följ sambanden, inte bara rubrikerna." : "Follow the connections, not only the headlines."}
                </h2>
              </div>
              <p className="font-body text-base leading-relaxed max-w-2xl" style={{ color: "#6a5a4a" }}>
                {lang === "sv"
                  ? "Åtta redaktionella teman visar hur punkterna överlappar. Börja med språk: det är en tydlig ingång till arbete, skola, rättigheter och en begriplig offentlig service."
                  : "Eight editorial themes show where the points overlap. Start with language: it is a clear way into work, school, rights, and understandable public services."}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {manifestoThemes.map((theme) => <ThemeCard key={theme.id} theme={theme} selected={false} onSelect={changeTheme} lang={lang} />)}
            </div>
          </section>
        )}

        <section className="mt-16 p-5 md:p-7 border border-foreground/10 bg-[#fffaf0]/55" aria-labelledby="coverage-title">
          <div className="grid md:grid-cols-[auto_1fr] gap-4 md:gap-6">
            <Languages size={25} className="mt-1" style={{ color: "#2d6a4f" }} />
            <div>
              <h2 id="coverage-title" className="font-display text-xl mb-2" style={{ color: "#2c1810" }}>{lang === "sv" ? "Vad ingår i sökningen?" : "What does the search cover?"}</h2>
              <p className="font-body text-sm leading-relaxed" style={{ color: "#5a4a3a" }}>
                {lang === "sv"
                  ? `Alla 15 punkter i manifestet och ${analysisCount} analyser på sajten: fakta, citat, tolkande kopplingar, JJ:s kommentarer, partibedömningar, matchningsmatris och vad som saknades. Den söker inte i fullständiga externa transkript, besökskommentarer eller hela artikeln Läget.`
                  : `All 15 manifesto points and ${analysisCount} on-site analyses: facts, quotes, interpretive connections, JJ commentary, party assessments, the matching matrix, and omissions. It does not search full external transcripts, visitor comments, or the complete State of the Race article.`}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
