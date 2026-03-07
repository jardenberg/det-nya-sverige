import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

// OG image URLs for each of the 15 policy points
const OG_IMAGES: Record<number, string> = {
  1: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-1_4530788a.png",
  2: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-2_6871597a.png",
  3: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-3_4a486f4d.png",
  4: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-4_6eec1d5e.png",
  5: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-5_f959578e.png",
  6: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-6_96568d86.png",
  7: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-7_c53a25e2.png",
  8: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-8_ba9f2c48.png",
  9: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-9_e69d617f.png",
  10: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-10_b716d594.png",
  11: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-11_7ad1303e.png",
  12: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-12_96504b94.png",
  13: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-13_5b676d6f.png",
  14: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-14_76ff2624.png",
  15: "https://d2xsxph8kpxj0f.cloudfront.net/109756679/fWvW9nTzQXWbjktyLERMVj/og-point-15_b924cfee.png",
};

// Swedish titles for OG tags (server-side, no i18n context)
const POINT_TITLES: Record<number, string> = {
  1: "Ett Sverige in, inte femton köer",
  2: "100-dagarsgaranti för kompetens",
  3: "Svenska genom arbete, inte före arbete",
  4: "Nationell snabbfil till bristyrken",
  5: "Första riktiga jobbet inom 180 dagar",
  6: "Bosätt efter möjlighet, inte efter passivitet",
  7: "Barnen först, alltid",
  8: "Hård mot exploatering, mjuk mot människor",
  9: "Nolltolerans mot diskriminering",
  10: "Digitalt medlemskap från dag ett",
  11: "Europas enklaste land att starta företag i",
  12: "Student till byggare av Sverige",
  13: "Cirkulär rörlighet som styrka",
  14: "Snabb och förutsägbar rättsstat",
  15: "Integration som nationell elitgren",
};

/**
 * Extract point ID from URL. Supports two formats:
 * - Clean path: /punkt/3
 * - Query param: /?punkt=3  (legacy/fallback)
 */
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

/**
 * Inject per-point OG meta tags when the URL refers to a specific point.
 * Supports /punkt/N (clean) and ?punkt=N (legacy).
 * Social crawlers don't read hash fragments, so sharing uses server-side paths.
 */
function injectPointOgTags(html: string, url: string): string {
  const pointId = extractPointId(url);
  if (!pointId) return html;

  const ogImage = OG_IMAGES[pointId];
  const title = POINT_TITLES[pointId];
  if (!ogImage || !title) return html;

  const ogTitle = `Punkt ${pointId}: ${title} – Det Nya Sverige`;
  const ogDesc = `Punkt ${pointId} av 15 i Det Nya Sverige-manifestet. Läs mer om: ${title}`;

  // Replace existing OG tags with point-specific ones
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

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      // Dynamic OG tags for per-point sharing
      template = injectPointOgTags(template, url);

      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    let html = fs.readFileSync(indexPath, "utf-8");
    html = injectPointOgTags(html, req.originalUrl);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
}
