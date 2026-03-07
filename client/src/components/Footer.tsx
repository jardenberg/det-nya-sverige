/**
 * Footer – Minimal, monumental footer
 * Nordic Monumentalism: dark, sparse, version number
 */

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-display text-lg text-white/30">
            Det Nya Sverige
          </p>
          <p className="font-body text-xs text-white/15">
            Ett tankeexperiment om vad som händer när vi ställer rätt fråga
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="font-body text-xs text-white/20">
            Navigera med piltangenter ↑↓ eller J/K
          </p>
          <p className="font-mono-display text-[#D4A843]/30 text-xs tracking-wider">
            v2.1
          </p>
        </div>
      </div>
    </footer>
  );
}
