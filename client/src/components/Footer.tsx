/**
 * Footer – Minimal, warm footer
 * Warm light theme, language-aware
 */

import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="relative py-12 md:py-16" style={{ borderTop: '1px solid oklch(0.18 0.02 50 / 0.07)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-display text-lg" style={{ color: '#8a7a6a' }}>
            {t("footerTitle", lang)}
          </p>
          <p className="font-body text-xs" style={{ color: '#b0a090' }}>
            {t("footerSubtitle", lang)}
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="font-body text-xs" style={{ color: '#b0a090' }}>
            {t("footerNav", lang)}
          </p>
          <p className="font-mono-display text-xs tracking-wider" style={{ color: 'oklch(0.58 0.16 55 / 0.4)' }}>
            v2.1
          </p>
        </div>
      </div>
    </footer>
  );
}
