import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Lang = "sv" | "en";

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (sv: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "sv",
  toggleLang: () => {},
  t: (sv) => sv,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("sv");

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "sv" ? "en" : "sv"));
  }, []);

  const t = useCallback(
    (sv: string, en: string) => (lang === "sv" ? sv : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
