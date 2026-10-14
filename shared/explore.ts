export type ExploreLang = "sv" | "en";
export type SearchMode = "lexical" | "semantic";
export type SearchKind = "all" | "manifesto" | "analysis" | "commentary";
export type BilingualText = { sv: string; en: string };
export interface SearchInput {
  query: string;
  lang: ExploreLang;
  mode: SearchMode;
  kind: SearchKind;
  theme?: string;
}
export interface SearchHit {
  id: string;
  sourceId: string;
  kind: Exclude<SearchKind, "all">;
  title: string;
  sourceTitle: string;
  href: string;
  date?: string;
  snippet: string;
  snippetLang: ExploreLang;
  reason?: string;
  themes: string[];
  pointId?: number;
  sectionIndex?: number;
}
export interface SearchResponse {
  hits: SearchHit[];
  total: number;
  mode: SearchMode;
  cached: boolean;
}
