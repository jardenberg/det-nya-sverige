import { describe, it, expect } from "vitest";

/**
 * Test the OG tag injection logic for per-point sharing.
 * Tests both clean /punkt/N paths and legacy ?punkt=N query params.
 */

// Replicate the data and logic from vite.ts for testing
const OG_IMAGES: Record<number, string> = {
  1: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-1_4530788a.png",
  2: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-2_6871597a.png",
  3: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-3_4a486f4d.png",
};

const POINT_TITLES: Record<number, string> = {
  1: "Ett Sverige in, inte femton köer",
  2: "100-dagarsgaranti för kompetens",
  3: "Svenska genom arbete, inte före arbete",
};

function extractPointId(url: string): number | null {
  try {
    // Check clean path format: /punkt/N
    const pathMatch = url.match(/^\/punkt\/(\d+)/);
    if (pathMatch) {
      const id = parseInt(pathMatch[1], 10);
      if (id >= 1 && id <= 15) return id;
    }

    // Fallback: check query param ?punkt=N
    const urlObj = new URL(url, "http://localhost");
    const punktParam = urlObj.searchParams.get("punkt");
    if (punktParam) {
      const id = parseInt(punktParam, 10);
      if (id >= 1 && id <= 15) return id;
    }
  } catch {
    // ignore
  }
  return null;
}

function injectPointOgTags(html: string, url: string): string {
  const pointId = extractPointId(url);
  if (!pointId) return html;

  const ogImage = OG_IMAGES[pointId];
  const title = POINT_TITLES[pointId];
  if (!ogImage || !title) return html;

  const ogTitle = `Punkt ${pointId}: ${title} – Det Nya Sverige`;
  const ogDesc = `Punkt ${pointId} av 15 i Det Nya Sverige-manifestet. Läs mer om: ${title}`;

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

describe("extractPointId", () => {
  it("should extract from clean /punkt/N path", () => {
    expect(extractPointId("/punkt/3")).toBe(3);
    expect(extractPointId("/punkt/1")).toBe(1);
    expect(extractPointId("/punkt/15")).toBe(15);
  });

  it("should extract from legacy ?punkt=N query param", () => {
    expect(extractPointId("/?punkt=3")).toBe(3);
    expect(extractPointId("/?punkt=1")).toBe(1);
    expect(extractPointId("/?punkt=15")).toBe(15);
  });

  it("should return null for invalid inputs", () => {
    expect(extractPointId("/")).toBeNull();
    expect(extractPointId("/?punkt=abc")).toBeNull();
    expect(extractPointId("/?punkt=0")).toBeNull();
    expect(extractPointId("/?punkt=16")).toBeNull();
    expect(extractPointId("/punkt/0")).toBeNull();
    expect(extractPointId("/punkt/16")).toBeNull();
    expect(extractPointId("/other/path")).toBeNull();
  });

  it("should prefer /punkt/N path over ?punkt=N query param", () => {
    // If both are present, path should win
    expect(extractPointId("/punkt/3?punkt=5")).toBe(3);
  });
});

describe("OG tag injection for per-point sharing", () => {
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
