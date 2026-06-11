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

// Swedish titles for OG tags
const POINT_TITLES_SV: Record<number, string> = {
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

// English titles for OG tags
const POINT_TITLES_EN: Record<number, string> = {
  1: "One Sweden In, Not Fifteen Queues",
  2: "100-Day Competence Guarantee",
  3: "Swedish Through Work, Not Before Work",
  4: "National Fast Track to Shortage Occupations",
  5: "First Real Job Within 180 Days",
  6: "Settle by Opportunity, Not by Passivity",
  7: "Children First, Always",
  8: "Hard on Exploitation, Soft on People",
  9: "Zero Tolerance for Discrimination",
  10: "Digital Membership From Day One",
  11: "Europe's Easiest Country to Start a Business In",
  12: "From Student to Builder of Sweden",
  13: "Circular Mobility as Strength",
  14: "Fast and Predictable Rule of Law",
  15: "Integration as a National Elite Discipline",
};

/**
 * Extract point ID and language from URL. Supports:
 * - /punkt/3 (Swedish)
 * - /en/punkt/3 (English)
 * - /?punkt=3 (legacy, Swedish)
 * - /en?punkt=3 (legacy, English)
 */
function extractPointInfo(url: string): { id: number; lang: "sv" | "en" } | null {
  try {
    const isEnglish = url.startsWith("/en/") || url === "/en";

    // Check clean path format: /punkt/N or /en/punkt/N
    const pathMatch = url.match(/^(?:\/en)?\/punkt\/(\d+)/);
    if (pathMatch) {
      const id = parseInt(pathMatch[1], 10);
      if (id >= 1 && id <= 15) return { id, lang: isEnglish ? "en" : "sv" };
    }

    // Fallback: check query param ?punkt=N
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

/**
 * Inject per-point OG meta tags when the URL refers to a specific point.
 * Supports /punkt/N, /en/punkt/N (clean) and ?punkt=N (legacy).
 * Social crawlers don't read hash fragments, so sharing uses server-side paths.
 */
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

/**
 * Debate/interview OG metadata.
 * Maps debate IDs to their OG descriptions for social sharing.
 */
const DEBATE_OG: Record<string, { title: string; titleEn: string; desc: string; descEn: string }> = {
  "svt-partiledardebatt-2026-05": {
    title: "SVT Partiledardebatt vs. de 15 punkterna",
    titleEn: "SVT Party Leader Debate vs. the 15 Points",
    desc: "0 av 15 punkter ber\u00f6rdes direkt. 9 indirekt. Ingen partiledare n\u00e4mnde AI, digitalisering eller kompetensvalidering som integrationsverktyg.",
    descEn: "0 of 15 points addressed directly. 9 indirectly. No party leader mentioned AI, digitalisation or competence validation as integration tools.",
  },
  "ai-sweden-etr-2026-05": {
    title: "AI Sweden: Elisabeth Thand Ringqvist (C) vs. de 15 punkterna",
    titleEn: "AI Sweden: Elisabeth Thand Ringqvist (C) vs. the 15 Points",
    desc: "ETR n\u00e5r 4 direkta och 8 indirekta matchningar. Hennes AI-infrastrukturt\u00e4nk \u00e4r f\u00f6ruts\u00e4ttningen f\u00f6r programmet, men kopplingen till integration saknas.",
    descEn: "ETR scores 4 direct and 8 indirect matches. Her AI infrastructure thinking is the prerequisite, but the connection to integration is missing.",
  },
  "ai-sweden-jr-2026-05": {
    title: "AI Sweden: Jessica Rosencrantz (M) vs. de 15 punkterna",
    titleEn: "AI Sweden: Jessica Rosencrantz (M) vs. the 15 Points",
    desc: "Rosencrantz (M) n\u00e5r 1 direkt och 8 indirekta matchningar. 'Silicon Valhalla' handlar om techbolag, inte integration. Ordet integration n\u00e4mns inte en enda g\u00e5ng.",
    descEn: "Rosencrantz (M) scores 1 direct and 8 indirect matches. 'Silicon Valhalla' is about tech companies, not integration. The word integration isn't mentioned once.",
  },
  "riksdagsdebatt-2026-06": {
    title: "Riksdagsdebatt 10 juni vs. de 15 punkterna",
    titleEn: "Parliament Debate June 10 vs. the 15 Points",
    desc: "0 direkta matchningar, 7 indirekta. Ordet 'integration' i substantiell mening: noll g\u00e5nger p\u00e5 2h51m. Debattformatet d\u00f6dar innovation.",
    descEn: "0 direct matches, 7 indirect. The word 'integration' in substantive sense: zero times in 2h51m. The debate format kills innovation.",
  },
  "ai-sweden-damberg-2026-05": {
    title: "AI Sweden: Mikael Damberg (S) vs. de 15 punkterna",
    titleEn: "AI Sweden: Mikael Damberg (S) vs. the 15 Points",
    desc: "Damberg (S) når 2 direkta och 7 indirekta matchningar. Starkast på arbetsmarknad och offentlig sektor, men integrationen förblir en parentes.",
    descEn: "Damberg (S) scores 2 direct and 7 indirect matches. Strongest on labour market and public sector, but integration remains a footnote.",
  },
  "ai-sweden-gellerman-2026-05": {
    title: "AI Sweden: Helena Gellerman (L) vs. de 15 punkterna",
    titleEn: "AI Sweden: Helena Gellerman (L) vs. the 15 Points",
    desc: "Gellerman (L) når 2 direkta och 8 indirekta matchningar. Utbildningsfokus och forskningspolitik, men integrationen nämns bara i förbifarten.",
    descEn: "Gellerman (L) scores 2 direct and 8 indirect matches. Education focus and research policy, but integration mentioned only in passing.",
  },
  "ai-sweden-hellden-2026-05": {
    title: "AI Sweden: Daniel Helldén (MP) vs. de 15 punkterna",
    titleEn: "AI Sweden: Daniel Helldén (MP) vs. the 15 Points",
    desc: "Helldén (MP) når 0 direkta och 6 indirekta matchningar. Den enda som nämner arbetskraftsinvandring, men aldrig dem som redan är här.",
    descEn: "Helldén (MP) scores 0 direct and 6 indirect matches. The only one mentioning labour immigration, but never those already here.",
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
      // Dynamic OG tags for debate/interview pages
      template = injectDebateOgTags(template, url);

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
    html = injectDebateOgTags(html, req.originalUrl);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
}
