/**
 * Footer – Minimal, warm footer
 * CC0 license, version, contact info, PDF downloads, language-aware
 */

import { useLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";
import { Download } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="relative py-12 md:py-20" style={{ borderTop: '1px solid oklch(0.18 0.02 50 / 0.07)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        {/* Top row: Title + Nav hint */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
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
            <div className="flex items-center gap-3">
              <Link href={lang === "en" ? "/en/om" : "/om"}
                className="font-body text-xs underline underline-offset-2 hover:no-underline transition-all"
                style={{ color: '#8a7a6a' }}
              >
                {lang === "sv" ? "Om" : "About"}
              </Link>
              <span style={{ color: '#d4c9b8' }}>|</span>
              <Link href={lang === "en" ? "/en/debatter" : "/debatter"}
                className="font-body text-xs underline underline-offset-2 hover:no-underline transition-all"
                style={{ color: '#8a7a6a' }}
              >
                {lang === "sv" ? "Debattanalys" : "Debate Analysis"}
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] mb-8" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.06)' }} />

        {/* PDF Downloads */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <p className="font-mono-display text-xs tracking-wider font-medium" style={{ color: '#9B6B1A' }}>
            {t("downloadPdf", lang)}
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/api/download/sv"
              download
              className="flex items-center gap-1.5 font-body text-xs underline underline-offset-2 hover:no-underline transition-all"
              style={{ color: '#8a7a6a' }}
            >
              <Download size={12} />
              {t("downloadSv", lang)}
            </a>
            <span style={{ color: '#d4c9b8' }}>|</span>
            <a
              href="/api/download/en"
              download
              className="flex items-center gap-1.5 font-body text-xs underline underline-offset-2 hover:no-underline transition-all"
              style={{ color: '#8a7a6a' }}
            >
              <Download size={12} />
              {t("downloadEn", lang)}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] mb-8" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.06)' }} />

        {/* Bottom row: License, Contact, Version */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* CC0 License */}
          <div className="flex flex-col items-center md:items-start gap-2 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="font-mono-display text-xs tracking-wider font-medium" style={{ color: '#9B6B1A' }}>
                CC0
              </span>
              <span className="font-body text-xs" style={{ color: '#b0a090' }}>
                Public Domain
              </span>
            </div>
            <p className="font-body text-xs leading-relaxed text-center md:text-left" style={{ color: '#b0a090' }}>
              {t("footerLicense", lang)}
            </p>
          </div>

          {/* Contact + Version */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="flex flex-col items-center md:items-end gap-1">
              <p className="font-mono-display text-xs tracking-wider" style={{ color: '#9B6B1A' }}>
                {t("footerContact", lang)}
              </p>
              <a
                href="mailto:joakim@jardenberg.com"
                className="font-body text-xs underline underline-offset-2 hover:no-underline transition-all"
                style={{ color: '#8a7a6a' }}
              >
                joakim@jardenberg.com
              </a>
            </div>
            <p className="font-mono-display text-xs tracking-wider" style={{ color: 'oklch(0.58 0.16 55 / 0.4)' }}>
              v101b
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
