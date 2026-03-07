/**
 * Footer – Minimal, warm footer
 * Warm light theme
 */

export default function Footer() {
  return (
    <footer className="relative py-12 md:py-16" style={{ borderTop: '1px solid oklch(0.18 0.02 50 / 0.07)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <p className="font-display text-lg" style={{ color: '#8a7a6a' }}>
            Det Nya Sverige
          </p>
          <p className="font-body text-xs" style={{ color: '#b0a090' }}>
            Ett tankeexperiment om vad som händer när vi ställer rätt fråga
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="font-body text-xs" style={{ color: '#b0a090' }}>
            Navigera med piltangenter ↑↓ eller J/K
          </p>
          <p className="font-mono-display text-xs tracking-wider" style={{ color: 'oklch(0.58 0.16 55 / 0.4)' }}>
            v2.1
          </p>
        </div>
      </div>
    </footer>
  );
}
