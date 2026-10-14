import { beforeEach, describe, expect, it, vi } from "vitest";
import { policyPoints } from "../client/src/lib/points";
import { policyPointsEn } from "../client/src/lib/points-en";
import { debates } from "../client/src/lib/debates";
import { getTheme, manifestoThemes, themesForPoint } from "../shared/themes";
import { switchLanguagePath } from "../shared/explore-routes";
import { documentHit, filteredDocuments, lexicalSearch, normalizeSearch, queryTerms, searchDocuments } from "./search-corpus";
import { injectExploreOgTags } from "./explore-og";
import type { SearchInput } from "../shared/explore";

const mocks = vi.hoisted(() => ({ invoke: vi.fn(), models: vi.fn() }));
vi.mock("./_core/llm", () => ({ invokeLLM: mocks.invoke, listLLMModels: mocks.models }));
import { exploreSearch, validateSemanticHits } from "./explore-search";
import { exploreRouter } from "./explore-router";
const input: SearchInput = { query: "språk", lang: "sv", mode: "lexical", kind: "all" };

describe("editorial theme evidence", () => {
  it("covers all 15 points with bilingual, non-empty themes and verbatim evidence", () => {
    expect(manifestoThemes).toHaveLength(8);
    expect(new Set(manifestoThemes.map(t => t.id)).size).toBe(8);
    for (const theme of manifestoThemes) {
      expect(theme.title.sv).toBeTruthy(); expect(theme.title.en).toBeTruthy();
      expect(new Set(theme.connections.map(c => c.pointId)).size).toBe(theme.connections.length);
      for (const c of theme.connections) {
        const p = policyPoints.find(p => p.id === c.pointId)!;
        expect(p, `${theme.id}: point ${c.pointId}`).toBeTruthy();
        expect(`${p.body} ${p.quote} ${p.subtitle}`).toContain(c.evidence);
        expect(c.reason.sv).toBeTruthy(); expect(c.reason.en).toBeTruthy();
      }
    }
    for (const point of policyPoints) expect(themesForPoint(point.id).length).toBeGreaterThan(0);
  });
  it("maps language across eleven points and four different functions", () => {
    const language = getTheme("language")!;
    expect(language.connections).toHaveLength(11);
    expect(language.connections.map(c => c.pointId)).toEqual(expect.arrayContaining([1,3,5,6,7,8,9,10,11,14,15]));
    expect(new Set(language.connections.map(c => c.strand.sv)).size).toBe(4);
  });
});

describe("source corpus", () => {
  it("indexes all manifesto and analysis sources dynamically, with unique IDs", () => {
    expect(searchDocuments.filter(d => d.kind === "manifesto")).toHaveLength(15);
    expect(policyPointsEn).toHaveLength(15);
    expect(new Set(searchDocuments.map(d => d.id)).size).toBe(searchDocuments.length);
    for (const debate of debates) {
      expect(searchDocuments.some(d => d.sourceId === debate.id)).toBe(true);
      expect(searchDocuments.some(d => d.id === `${debate.id}:jj` && d.kind === "commentary")).toBe(true);
      expect(searchDocuments.filter(d => d.id.startsWith(`${debate.id}:match:`))).toHaveLength(15);
    }
  });
  it("retains Swedish original quotations in the English interface", () => {
    const doc = searchDocuments.find(d => d.id.includes(":quote:"))!;
    const hit = documentHit(doc, "en", doc.text.sv, "sv");
    expect(hit.snippetLang).toBe("sv");
    expect(hit.href).toMatch(/^\/en\/debates\/.+\?section=\d+#[\w-]+-section-\d+$/);
  });
  it("keeps commentary distinct from reported statements and interpreted connections", () => {
    const kinds = searchDocuments.filter(d => d.id.includes(":section:0:")).map(d => [d.id, d.kind]);
    expect(kinds.some(([id, kind]) => id.endsWith(":jj") && kind === "commentary")).toBe(true);
    expect(kinds.some(([id, kind]) => id.endsWith(":facts") && kind === "analysis")).toBe(true);
  });
});

describe("lexical retrieval", () => {
  it("matches quoted exact phrases, not disconnected words", () => {
    const r = lexicalSearch({ ...input, query: '"kontrakt på sitt språk"' });
    expect(r.hits.map(h => h.id)).toEqual(["point:8"]);
    expect(r.hits[0].snippet).toContain("kontrakt på sitt språk");
    expect(lexicalSearch({ ...input, query: '"kontrakt språk sitt på"' }).total).toBe(0);
  });
  it("matches AND terms within a passage and enforces word boundaries", () => {
    expect(queryTerms('"digital identitet" språk')).toEqual(["digital identitet", "sprak"]);
    expect(lexicalSearch({ ...input, query: "språk rättighetsguide" }).hits.some(h => h.id === "point:8")).toBe(true);
    expect(lexicalSearch({ ...input, query: "språ" }).total).toBe(0);
  });
  it("ignores casing and diacritics, but does not invent semantic matches", () => {
    expect(normalizeSearch("SPRÅK")).toBe("sprak");
    expect(lexicalSearch({ ...input, query: "SPRÅK" }).hits.map(h => h.id)).toEqual(lexicalSearch({ ...input, query: "sprak" }).hits.map(h => h.id));
    expect(lexicalSearch({ ...input, query: "quuxnotaword" }).total).toBe(0);
  });
  it("searches both languages and labels the excerpt's source language", () => {
    const r = lexicalSearch({ ...input, query: '"language coach"', kind: "manifesto" });
    expect(r.hits.some(h => h.id === "point:3")).toBe(true);
    expect(r.hits.every(h => h.snippetLang === "en")).toBe(true);
    expect(r.hits.every(h => h.href.startsWith("/punkt/"))).toBe(true);
  });
  it("respects content type and editorial theme filters", () => {
    expect(lexicalSearch({ ...input, kind: "commentary" }).hits.every(h => h.kind === "commentary")).toBe(true);
    const docs = filteredDocuments({ ...input, theme: "language", kind: "manifesto" });
    expect(docs).toHaveLength(11);
    expect(docs.some(d => d.pointId === 2)).toBe(false);
  });
});

describe("semantic provenance and availability", () => {
  beforeEach(() => { mocks.invoke.mockReset(); mocks.models.mockResolvedValue({ data: [{ id: "gpt-5-mini" }] }); });
  it("accepts only verbatim source excerpts and deduplicates IDs", () => {
    const docs = filteredDocuments(input);
    const excerpt = docs[0].text.sv.slice(0, 100);
    const r = validateSemanticHits({ hits: [{ id: "d0", excerpt, reason: "Relevant" }, { id: "d0", excerpt, reason: "Duplicate" }, { id: "d99999", excerpt, reason: "Bad ID" }] }, docs, input);
    expect(r.hits).toHaveLength(1);
    expect(r.hits[0].snippet).toBe(excerpt);
  });
  it("rejects hallucinated quotations rather than displaying an AI-written answer", () => {
    expect(() => validateSemanticHits({ hits: [{ id: "d0", excerpt: "This quotation does not exist in the manifesto", reason: "Relevant" }] }, filteredDocuments(input), input)).toThrow();
  });
  it("uses a verified model and caches validated results", async () => {
    mocks.invoke.mockImplementation(async params => {
      const doc = JSON.parse(params.messages[1].content).documents[0];
      return { choices: [{ message: { content: JSON.stringify({ hits: [{ id: doc.id, excerpt: doc.text.slice(0,100), reason: "Supports the query" }] }) } }] };
    });
    const semantic = { ...input, query: "semantic test cache unique", mode: "semantic" as const };
    const first = await exploreSearch(semantic, "test1");
    const second = await exploreSearch(semantic, "test1");
    expect(first.mode).toBe("semantic"); expect(second.cached).toBe(true);
    expect(mocks.invoke).toHaveBeenCalledTimes(1);
    expect(mocks.invoke.mock.calls[0][0].model).toBe("gpt-5-mini");
    expect(mocks.invoke.mock.calls[0][0].signal).toBeDefined();
  });
  it("fails explicitly with no silent lexical substitution", async () => {
    mocks.invoke.mockRejectedValue(new Error("private provider diagnostic"));
    await expect(exploreSearch({ ...input, query: "semantic unavailable unique", mode: "semantic" }, "test2")).rejects.toMatchObject({ code: "SERVICE_UNAVAILABLE" });
    expect((await exploreSearch(input)).mode).toBe("lexical");
  });
  it("accepts an empty result for an unrelated query", () => {
    expect(validateSemanticHits({ hits: [] }, filteredDocuments(input), input).total).toBe(0);
  });
  it("validates query length, search modes and unknown themes at the API boundary", async () => {
    const caller = exploreRouter.createCaller({ req: { ip: "test" } } as never);
    await expect(caller.search({ ...input, query: "x" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.search({ ...input, query: "x".repeat(241) })).rejects.toMatchObject({ code: "BAD_REQUEST" });
    await expect(caller.search({ ...input, theme: "injected" })).rejects.toMatchObject({ code: "BAD_REQUEST" });
  });
});

describe("share links and social metadata", () => {
  const html = '<title>Base</title><meta property="og:title" content="Base" /><meta property="og:description" content="Base" /><meta name="twitter:title" content="Base" /><meta name="twitter:description" content="Base" />';
  it("preserves query, mode, type, theme and hash across languages", () => {
    const state = "?q=spr%C3%A5k&mode=semantic&kind=analysis&theme=language";
    expect(switchLanguagePath("/utforska", state, "#results")).toBe(`/en/explore${state}#results`);
    expect(switchLanguagePath("/en/explore", state)).toBe(`/utforska${state}`);
    expect(switchLanguagePath("/punkt/3")).toBe("/en/punkt/3");
  });
  it("creates bilingual theme-specific metadata even with query parameters", () => {
    expect(injectExploreOgTags(html, "/utforska?theme=language&q=språk")).toContain("Språk som infrastruktur");
    expect(injectExploreOgTags(html, "/en/explore?theme=language&mode=semantic")).toContain("Language as infrastructure");
    expect(injectExploreOgTags(html, "/en/utforska")).toContain("Explore: search and themes");
  });
  it("does not reflect arbitrary search text or invalid themes into HTML", () => {
    const r = injectExploreOgTags(html, "/utforska?q=%3Cscript%3E&theme=%22%3E");
    expect(r).not.toContain("<script>"); expect(r).toContain("Utforska: sök och teman");
    expect(injectExploreOgTags(html, "/debatter")).toBe(html);
  });
});
