import { ArrowUpRight, Languages, Search, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";

export default function ExploreEntry() {
  const { lang, langPrefix } = useLang();
  const exploreHref = `${langPrefix}/utforska` || "/utforska";

  return (
    <section className="relative border-y border-foreground/10 bg-[#fffaf0]/55 overflow-hidden" aria-labelledby="explore-entry-title">
      <div className="absolute inset-y-0 left-[8%] w-px bg-[#2d6a4f]/20" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-16 py-10 md:py-14">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-center">
          <div className="md:pl-8">
            <p className="font-mono-display text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "#2d6a4f" }}>
              {lang === "sv" ? "Ny läsväg" : "A new way to read"}
            </p>
            <h2 id="explore-entry-title" className="font-display text-3xl md:text-4xl leading-[1.02] mb-3" style={{ color: "#2c1810" }}>
              {lang === "sv" ? "Se hur idéerna hänger ihop." : "See how the ideas connect."}
            </h2>
            <p className="font-body text-base leading-relaxed max-w-2xl" style={{ color: "#6a5a4a" }}>
              {lang === "sv"
                ? "Sök i manifestet och analyserna, eller följ redaktionella trådar mellan punkterna."
                : "Search the manifesto and analyses, or follow editorial threads between the points."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              href={`${exploreHref}?theme=language`}
              className="group p-5 border border-[#2d6a4f]/35 bg-[#e9f0e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
            >
              <Languages size={19} className="mb-5" style={{ color: "#2d6a4f" }} />
              <span className="block font-mono-display text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: "#2d6a4f" }}>
                {lang === "sv" ? "Börja här" : "Start here"}
              </span>
              <span className="block font-display text-xl leading-tight" style={{ color: "#2c1810" }}>
                {lang === "sv" ? "Språk som infrastruktur" : "Language as infrastructure"}
              </span>
              <ArrowUpRight size={16} className="mt-4 ml-auto text-[#2d6a4f] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href={exploreHref}
              className="group p-5 border border-foreground/15 bg-[#fffaf0]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2d6a4f]"
            >
              <Search size={19} className="mb-5" style={{ color: "#B64A3A" }} />
              <span className="block font-mono-display text-[10px] uppercase tracking-[0.15em] mb-1" style={{ color: "#B64A3A" }}>
                {lang === "sv" ? "Utforska" : "Explore"}
              </span>
              <span className="block font-display text-xl leading-tight" style={{ color: "#2c1810" }}>
                {lang === "sv" ? "Sök ord eller betydelse" : "Search words or meaning"}
              </span>
              <span className="flex items-center gap-1.5 mt-4 font-body text-xs" style={{ color: "#6a5a4a" }}>
                <Sparkles size={13} /> {lang === "sv" ? "Källor, inte AI-svar" : "Sources, not AI answers"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
