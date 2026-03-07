import { describe, it, expect } from "vitest";

/**
 * Test the OG tag injection logic for per-point sharing.
 * We test the core function that replaces OG meta tags in HTML
 * based on the ?punkt=N query parameter.
 */

// Replicate the injectPointOgTags logic for testing
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

function injectPointOgTags(html: string, url: string): string {
  try {
    const urlObj = new URL(url, "http://localhost");
    const punktParam = urlObj.searchParams.get("punkt");
    if (!punktParam) return html;

    const pointId = parseInt(punktParam, 10);
    if (isNaN(pointId) || pointId < 1 || pointId > 15) return html;

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
  } catch {
    // If URL parsing fails, return original HTML
  }
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

describe("OG tag injection for per-point sharing", () => {
  it("should not modify HTML when no punkt param is present", () => {
    const result = injectPointOgTags(BASE_HTML, "/");
    expect(result).toBe(BASE_HTML);
  });

  it("should not modify HTML when punkt param is invalid", () => {
    const result = injectPointOgTags(BASE_HTML, "/?punkt=abc");
    expect(result).toBe(BASE_HTML);
  });

  it("should not modify HTML when punkt param is out of range", () => {
    const result0 = injectPointOgTags(BASE_HTML, "/?punkt=0");
    expect(result0).toBe(BASE_HTML);

    const result16 = injectPointOgTags(BASE_HTML, "/?punkt=16");
    expect(result16).toBe(BASE_HTML);
  });

  it("should inject point-specific OG tags for punkt=3", () => {
    const result = injectPointOgTags(BASE_HTML, "/?punkt=3");

    expect(result).toContain('content="Punkt 3: Svenska genom arbete, inte före arbete – Det Nya Sverige"');
    expect(result).toContain(`content="${OG_IMAGES[3]}"`);
    expect(result).toContain("<title>Punkt 3: Svenska genom arbete, inte före arbete – Det Nya Sverige</title>");
    expect(result).not.toContain('content="Det Nya Sverige – 15 Punkter"');
  });

  it("should inject point-specific OG tags for punkt=1", () => {
    const result = injectPointOgTags(BASE_HTML, "/?punkt=1");

    expect(result).toContain('content="Punkt 1: Ett Sverige in, inte femton köer – Det Nya Sverige"');
    expect(result).toContain(`content="${OG_IMAGES[1]}"`);
  });

  it("should replace both og: and twitter: meta tags", () => {
    const result = injectPointOgTags(BASE_HTML, "/?punkt=2");

    // Check og:title
    expect(result).toContain('<meta property="og:title" content="Punkt 2: 100-dagarsgaranti för kompetens – Det Nya Sverige"');
    // Check twitter:title
    expect(result).toContain('<meta name="twitter:title" content="Punkt 2: 100-dagarsgaranti för kompetens – Det Nya Sverige"');
    // Check og:image
    expect(result).toContain(`<meta property="og:image" content="${OG_IMAGES[2]}"`);
    // Check twitter:image
    expect(result).toContain(`<meta name="twitter:image" content="${OG_IMAGES[2]}"`);
  });

  it("should handle URL with both punkt param and hash", () => {
    const result = injectPointOgTags(BASE_HTML, "/?punkt=3#punkt-3");
    expect(result).toContain('content="Punkt 3: Svenska genom arbete, inte före arbete – Det Nya Sverige"');
  });

  it("should include description with point title", () => {
    const result = injectPointOgTags(BASE_HTML, "/?punkt=1");
    expect(result).toContain("Punkt 1 av 15 i Det Nya Sverige-manifestet. Läs mer om: Ett Sverige in, inte femton köer");
  });
});
