import { getTheme } from "../shared/themes";

function escapeHtml(text: string) { return text.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
export function injectExploreOgTags(html: string, url: string): string {
  const parsed = new URL(url, "https://15p.jardenberg.se");
  if (!/^(?:\/en)?\/(?:utforska|explore)\/?$/.test(parsed.pathname)) return html;
  const en = parsed.pathname.startsWith("/en/");
  const lang = en ? "en" : "sv";
  const theme = getTheme(parsed.searchParams.get("theme") ?? undefined);
  const title = escapeHtml(`${theme ? theme.title[lang] : en ? "Explore: search and themes" : "Utforska: sök och teman"} – ${en ? "The New Sweden" : "Det Nya Sverige"}`);
  const description = escapeHtml(theme ? theme.description[lang] : en ? "Find exact words or related meaning in the 15-point manifesto and political analyses. Discover how language, work, rights and AI connect." : "Hitta exakta ord eller närliggande betydelser i 15-punktsmanifestet och de politiska analyserna. Se hur språk, arbete, rättigheter och AI hänger ihop.");
  // Never interpolate arbitrary queries into metadata.
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`);
}
