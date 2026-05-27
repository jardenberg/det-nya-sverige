import { describe, it, expect } from "vitest";

/**
 * Test the OG tag injection logic for per-point sharing.
 * Tests clean /punkt/N paths, /en/punkt/N English paths, and legacy ?punkt=N query params.
 */

// Replicate the data and logic from vite.ts for testing
const OG_IMAGES: Record<number, string> = {
  1: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-1_4530788a.png",
  2: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-2_6871597a.png",
  3: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-3_4a486f4d.png",
};

const POINT_TITLES_SV: Record<number, string> = {
  1: "Ett Sverige in, inte femton köer",
  2: "100-dagarsgaranti för kompetens",
  3: "Svenska genom arbete, inte före arbete",
};

const POINT_TITLES_EN: Record<number, string> = {
  1: "One Sweden In, Not Fifteen Queues",
  2: "100-Day Competence Guarantee",
  3: "Swedish Through Work, Not Before Work",
};

function extractPointInfo(url: string): { id: number; lang: "sv" | "en" } | null {
  try {
    const isEnglish = url.startsWith("/en/") || url === "/en";

    const pathMatch = url.match(/^(?:\/en)?\/punkt\/(\d+)/);
    if (pathMatch) {
      const id = parseInt(pathMatch[1], 10);
      if (id >= 1 && id <= 15) return { id, lang: isEnglish ? "en" : "sv" };
    }

    const urlObj = new URL(url, "http://localhost");
    const punktParam = urlObj.searchParams.get("punkt");
    if (punktParam) {
      const id = parseInt(punktParam, 10);
      if (id >= 1 && id <= 15) return { id, lang: isEnglish ? "en" : "sv" };
    }
  } catch {
    // ignore
  }
  return null;
}

function injectPointOgTags(html: string, url: string): string {
  const info = extractPointInfo(url);
  if (!info) return html;

  const ogImage = OG_IMAGES[info.id];
  const titles = info.lang === "en" ? POINT_TITLES_EN : POINT_TITLES_SV;
  const title = titles[info.id];
  if (!ogImage || !title) return html;

  const siteName = info.lang === "en" ? "The New Sweden" : "Det Nya Sverige";
  const pointLabel = info.lang === "en" ? "Point" : "Punkt";
  const ofLabel = info.lang === "en" ? "of 15 in The New Sweden manifesto. Read more about" : "av 15 i Det Nya Sverige-manifestet. Läs mer om";

  const ogTitle = `${pointLabel} ${info.id}: ${title} – ${siteName}`;
  const ogDesc = `${pointLabel} ${info.id} ${ofLabel}: ${title}`;

  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${ogTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${ogDesc}" />`
  );
  html = html.replace(
    /<meta property="og:image" content="[^"]*" \/>/,
    `<meta property="og:image" content="${ogImage}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${ogTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${ogDesc}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*" \/>/,
    `<meta name="twitter:image" content="${ogImage}" />`
  );
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${ogTitle}</title>`
  );

  return html;
}

const BASE_HTML = `<!doctype html>
<html lang="sv">
  <head>
    <title>Det Nya Sverige – 15 Punkter</title>
    <meta property="og:title" content="Det Nya Sverige – 15 Punkter" />
    <meta property="og:description" content="15 punkter som underlättar människors resa." />
    <meta property="og:image" content="https://example.com/default.webp" />
    <meta name="twitter:title" content="Det Nya Sverige – 15 Punkter" />
    <meta name="twitter:description" content="15 punkter som underlättar människors resa." />
    <meta name="twitter:image" content="https://example.com/default.webp" />
  </head>
  <body><div id="root"></div></body>
</html>`;

describe("extractPointInfo", () => {
  it("should extract from clean /punkt/N path (Swedish)", () => {
    expect(extractPointInfo("/punkt/3")).toEqual({ id: 3, lang: "sv" });
    expect(extractPointInfo("/punkt/1")).toEqual({ id: 1, lang: "sv" });
    expect(extractPointInfo("/punkt/15")).toEqual({ id: 15, lang: "sv" });
  });

  it("should extract from /en/punkt/N path (English)", () => {
    expect(extractPointInfo("/en/punkt/3")).toEqual({ id: 3, lang: "en" });
    expect(extractPointInfo("/en/punkt/1")).toEqual({ id: 1, lang: "en" });
    expect(extractPointInfo("/en/punkt/15")).toEqual({ id: 15, lang: "en" });
  });

  it("should extract from legacy ?punkt=N query param", () => {
    expect(extractPointInfo("/?punkt=3")).toEqual({ id: 3, lang: "sv" });
    expect(extractPointInfo("/?punkt=1")).toEqual({ id: 1, lang: "sv" });
  });

  it("should return null for invalid inputs", () => {
    expect(extractPointInfo("/")).toBeNull();
    expect(extractPointInfo("/en")).toBeNull();
    expect(extractPointInfo("/?punkt=abc")).toBeNull();
    expect(extractPointInfo("/?punkt=0")).toBeNull();
    expect(extractPointInfo("/?punkt=16")).toBeNull();
    expect(extractPointInfo("/punkt/0")).toBeNull();
    expect(extractPointInfo("/punkt/16")).toBeNull();
    expect(extractPointInfo("/other/path")).toBeNull();
  });

  it("should prefer /punkt/N path over ?punkt=N query param", () => {
    expect(extractPointInfo("/punkt/3?punkt=5")).toEqual({ id: 3, lang: "sv" });
  });
});

describe("OG tag injection – Swedish paths", () => {
  it("should not modify HTML when no punkt is present", () => {
    const result = injectPointOgTags(BASE_HTML, "/");
    expect(result).toBe(BASE_HTML);
  });

  it("should inject point-specific OG tags for /punkt/3", () => {
    const result = injectPointOgTags(BASE_HTML, "/punkt/3");

    expect(result).toContain('content="Punkt 3: Svenska genom arbete, inte före arbete – Det Nya Sverige"');
    expect(result).toContain(`content="${OG_IMAGES[3]}"`);
    expect(result).toContain("<title>Punkt 3: Svenska genom arbete, inte före arbete – Det Nya Sverige</title>");
    expect(result).not.toContain('content="Det Nya Sverige – 15 Punkter"');
  });

  it("should inject point-specific OG tags for legacy ?punkt=1", () => {
    const result = injectPointOgTags(BASE_HTML, "/?punkt=1");

    expect(result).toContain('content="Punkt 1: Ett Sverige in, inte femton köer – Det Nya Sverige"');
    expect(result).toContain(`content="${OG_IMAGES[1]}"`);
  });

  it("should replace both og: and twitter: meta tags", () => {
    const result = injectPointOgTags(BASE_HTML, "/punkt/2");

    expect(result).toContain('<meta property="og:title" content="Punkt 2: 100-dagarsgaranti för kompetens – Det Nya Sverige"');
    expect(result).toContain('<meta name="twitter:title" content="Punkt 2: 100-dagarsgaranti för kompetens – Det Nya Sverige"');
    expect(result).toContain(`<meta property="og:image" content="${OG_IMAGES[2]}"`);
    expect(result).toContain(`<meta name="twitter:image" content="${OG_IMAGES[2]}"`);
  });

  it("should include description with point title", () => {
    const result = injectPointOgTags(BASE_HTML, "/punkt/1");
    expect(result).toContain("Punkt 1 av 15 i Det Nya Sverige-manifestet. Läs mer om: Ett Sverige in, inte femton köer");
  });

  it("should not modify HTML for out-of-range punkt", () => {
    const result0 = injectPointOgTags(BASE_HTML, "/punkt/0");
    expect(result0).toBe(BASE_HTML);

    const result16 = injectPointOgTags(BASE_HTML, "/punkt/16");
    expect(result16).toBe(BASE_HTML);
  });
});

describe("OG tag injection – English paths", () => {
  it("should inject English OG tags for /en/punkt/3", () => {
    const result = injectPointOgTags(BASE_HTML, "/en/punkt/3");

    expect(result).toContain('content="Point 3: Swedish Through Work, Not Before Work – The New Sweden"');
    expect(result).toContain(`content="${OG_IMAGES[3]}"`);
    expect(result).toContain("<title>Point 3: Swedish Through Work, Not Before Work – The New Sweden</title>");
  });

  it("should inject English OG tags for /en/punkt/1", () => {
    const result = injectPointOgTags(BASE_HTML, "/en/punkt/1");

    expect(result).toContain('content="Point 1: One Sweden In, Not Fifteen Queues – The New Sweden"');
    expect(result).toContain("Point 1 of 15 in The New Sweden manifesto. Read more about: One Sweden In, Not Fifteen Queues");
  });

  it("should use English labels for /en/punkt/2", () => {
    const result = injectPointOgTags(BASE_HTML, "/en/punkt/2");

    expect(result).toContain("Point 2:");
    expect(result).toContain("The New Sweden");
    expect(result).toContain("100-Day Competence Guarantee");
    expect(result).not.toContain("Punkt");
    expect(result).not.toContain("Det Nya Sverige");
  });

  it("should not modify HTML for /en without punkt", () => {
    const result = injectPointOgTags(BASE_HTML, "/en");
    expect(result).toBe(BASE_HTML);
  });
});

// --- Debate/Interview OG tag injection tests ---

const DEBATE_OG: Record<string, { title: string; titleEn: string; desc: string; descEn: string }> = {
  "svt-partiledardebatt-2026-05": {
    title: "SVT Partiledardebatt vs. de 15 punkterna",
    titleEn: "SVT Party Leader Debate vs. the 15 Points",
    desc: "0 av 15 punkter berördes direkt. 9 indirekt. Ingen partiledare nämnde AI, digitalisering eller kompetensvalidering som integrationsverktyg.",
    descEn: "0 of 15 points addressed directly. 9 indirectly. No party leader mentioned AI, digitalisation or competence validation as integration tools.",
  },
  "ai-sweden-etr-2026-05": {
    title: "ETR (C) om AI-politik vs. de 15 punkterna",
    titleEn: "ETR (C) on AI Policy vs. the 15 Points",
    desc: "ETR når 4 direkta och 8 indirekta matchningar. Hennes AI-infrastrukturtänk är förutsättningen för programmet, men kopplingen till integration saknas.",
    descEn: "ETR scores 4 direct and 8 indirect matches. Her AI infrastructure thinking is the prerequisite, but the connection to integration is missing.",
  },
};

function extractDebateInfo(url: string): { id: string; lang: "sv" | "en" } | null {
  const match = url.match(/^(?:\/en)?\/(?:debatter|debates)\/([\w-]+)/);
  if (!match) return null;
  const id = match[1];
  if (!DEBATE_OG[id]) return null;
  const isEnglish = url.startsWith("/en/");
  return { id, lang: isEnglish ? "en" : "sv" };
}

function injectDebateOgTags(html: string, url: string): string {
  const info = extractDebateInfo(url);
  if (!info) return html;

  const debate = DEBATE_OG[info.id];
  const siteName = info.lang === "en" ? "The New Sweden" : "Det Nya Sverige";
  const ogTitle = `${info.lang === "en" ? debate.titleEn : debate.title} \u2013 ${siteName}`;
  const ogDesc = info.lang === "en" ? debate.descEn : debate.desc;

  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${ogTitle}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${ogDesc}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${ogTitle}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${ogDesc}" />`
  );
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${ogTitle}</title>`
  );

  return html;
}

describe("OG tag injection – Debate/Interview pages", () => {
  it("should inject Swedish OG tags for /debatter/svt-partiledardebatt-2026-05", () => {
    const result = injectDebateOgTags(BASE_HTML, "/debatter/svt-partiledardebatt-2026-05");

    expect(result).toContain('<meta property="og:title" content="SVT Partiledardebatt vs. de 15 punkterna \u2013 Det Nya Sverige"');
    expect(result).toContain('<meta property="og:description" content="0 av 15 punkter berördes direkt.');
    expect(result).toContain("<title>SVT Partiledardebatt vs. de 15 punkterna \u2013 Det Nya Sverige</title>");
  });

  it("should inject Swedish OG tags for /debatter/ai-sweden-etr-2026-05", () => {
    const result = injectDebateOgTags(BASE_HTML, "/debatter/ai-sweden-etr-2026-05");

    expect(result).toContain('<meta property="og:title" content="ETR (C) om AI-politik vs. de 15 punkterna \u2013 Det Nya Sverige"');
    expect(result).toContain("ETR når 4 direkta och 8 indirekta matchningar");
  });

  it("should inject English OG tags for /en/debates/ai-sweden-etr-2026-05", () => {
    const result = injectDebateOgTags(BASE_HTML, "/en/debates/ai-sweden-etr-2026-05");

    expect(result).toContain('<meta property="og:title" content="ETR (C) on AI Policy vs. the 15 Points \u2013 The New Sweden"');
    expect(result).toContain("ETR scores 4 direct and 8 indirect matches");
    expect(result).toContain("<title>ETR (C) on AI Policy vs. the 15 Points \u2013 The New Sweden</title>");
  });

  it("should inject English OG tags for /en/debates/svt-partiledardebatt-2026-05", () => {
    const result = injectDebateOgTags(BASE_HTML, "/en/debates/svt-partiledardebatt-2026-05");

    expect(result).toContain("SVT Party Leader Debate vs. the 15 Points");
    expect(result).toContain("The New Sweden");
    expect(result).not.toContain("Det Nya Sverige");
  });

  it("should not modify HTML for unknown debate ID", () => {
    const result = injectDebateOgTags(BASE_HTML, "/debatter/unknown-debate-id");
    expect(result).toBe(BASE_HTML);
  });

  it("should not modify HTML for /debatter without ID", () => {
    const result = injectDebateOgTags(BASE_HTML, "/debatter");
    expect(result).toBe(BASE_HTML);
  });

  it("should handle /en/debatter/ path (Swedish path with English prefix)", () => {
    const result = injectDebateOgTags(BASE_HTML, "/en/debatter/ai-sweden-etr-2026-05");

    expect(result).toContain("The New Sweden");
    expect(result).toContain("ETR (C) on AI Policy vs. the 15 Points");
  });
});
