import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { useLocation } from "wouter";

export type Lang = "sv" | "en";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (sv: string, en: string) => string;
  /** Get the localized path prefix: "" for Swedish, "/en" for English */
  langPrefix: string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "sv",
  toggleLang: () => {},
  t: (sv) => sv,
  langPrefix: "",
});

/**
 * Detect language from URL path prefix.
 * /en, /en/punkt/3, /en/om → "en"
 * Everything else → "sv"
 */
function detectLangFromPath(pathname: string): Lang {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "sv";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [lang, setLang] = useState<Lang>(() => detectLangFromPath(window.location.pathname));

  // Sync language when URL changes
  useEffect(() => {
    const detected = detectLangFromPath(location);
    setLang(detected);
  }, [location]);

  const toggleLang = useCallback(() => {
    const currentPath = window.location.pathname;

    if (lang === "sv") {
      // Switch to English: add /en prefix
      const newPath = "/en" + (currentPath === "/" ? "" : currentPath);
      setLocation(newPath);
    } else {
      // Switch to Swedish: remove /en prefix
      const newPath = currentPath.replace(/^\/en/, "") || "/";
      setLocation(newPath);
    }
  }, [lang, setLocation]);

  const t = useCallback(
    (sv: string, en: string) => (lang === "sv" ? sv : en),
    [lang]
  );

  const langPrefix = lang === "en" ? "/en" : "";

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, langPrefix }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
