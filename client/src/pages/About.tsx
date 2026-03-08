/**
 * About page – /om
 * License info, field report, project context
 * Warm light theme consistent with the rest of the site
 */

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "wouter";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const content = {
  sv: {
    backLink: "Tillbaka till manifestet",
    pageTitle: "Om det här projektet",
    pageSubtitle: "Bakgrund, process och licens",

    // Origin
    originTitle: "Bakgrund",
    originText: `Det hela började med en post på Facebook av Troed Troedson. Han utmanade: "Riksdagspartier! Håll varsin presskonferens med 15 punkter som underlättar människors resa i stället för det motsatta. Men håll en workshop först så det inte blir så där taffligt som det gärna blir annars."

Sagt och gjort. Jag workshoppade med mitt team och kom fram till 15 punkter som är, så klart, väldigt mycket mina. Lutar mig tungt på internet, digitalisering generellt och AI i synnerhet. Och som lika självklart är work in progress. Better together, som vanligt.`,
    troedLink: "Troeds originalinlägg på Facebook",

    // How it was built
    processTitle: "Så byggde vi sajten",
    processText: `Från walk-and-talk till färdig sajt — det här projektet är ett samarbete mellan människa och AI.

Det började med en röstinspelning. Jag gick en promenad och pratade in mina tankar om Troeds inlägg, om integration, om AI och friktion. Manus — min AI-agent — transkriberade inspelningen, extraherade de 15 punkterna och strukturerade dem till ett manifest med rubriker, nyckeltal, citat och brödtext.

Vi jobbade iterativt. Jag gav riktning och feedback, Manus byggde och föreslog. Först kom innehållet — de 15 punkterna med sina investeringssiffror och argument. Sedan designen: vi landade i "Nordic Monumentalism" med varm cream-bakgrund, ochre-accenter, Playfair Display-typografi och en känsla av allvar utan att bli tung.

Manus gjorde egen research för att ge punkterna trovärdighet — siffror från OECD om AI och språkträning, data om valideringstider för utländska utbildningar, Global Innovation Index-rankningar, och statistik om bristyrken i Sverige.

De 15 illustrationerna skapades med Nano Banana — ett AI-bildgenereringsverktyg — i en varm 1950-tals editorial-stil. Jag laddade upp referensbilder med en stuk jag gillade, och Manus genererade 15 unika bilder som matchar varje punkts tema.

Under resans gång skapade vi skills — återanvändbara kunskapspaket — som dokumenterar hur vi gjorde saker. Det betyder att nästa gång jag eller någon annan vill bygga något liknande går det snabbare och bättre.

På den tekniska sidan byggde Manus sajten med React, Tailwind, tRPC och Express — med server-side rendering av OG-taggar så att rätt bild och titel dyker upp när någon delar en punkt på sociala medier. Kommentarsfunktion och röstning med databas bakom. Hosting via Manus med CNAME-pekare till min egen domän.`,

    // Read more / reports
    reportsTitle: "Läs vidare",
    report15p: "Hela vår beskrivning av hur man gör sånt här 2026",
    reportJjos: "En motsvarande rapport om ett mycket större system som helt har revolutionerat hur jag jobbar — mycket högre leveranskvalitet, mycket högre tempo, mycket mer lärande och otroligt mycket roligare",

    downloadTitle: "Ladda ner manifestet",
    downloadDesc: "Hela manifestet finns att ladda ner — på svenska och engelska.",
    downloadSv: "Svenska (.md)",
    downloadEn: "English (.md)",

    // Tech
    techTitle: "Teknik",
    techStack: [
      { label: "Frontend", value: "React 19, Tailwind CSS 4, Framer Motion" },
      { label: "Backend", value: "Express, tRPC, Drizzle ORM" },
      { label: "Databas", value: "TiDB (MySQL-kompatibel)" },
      { label: "Bilder", value: "Nano Banana (AI-genererade)" },
      { label: "Research", value: "Deep Research via Manus" },
      { label: "Hosting", value: "Manus med egen domän (CNAME)" },
      { label: "AI-agent", value: "Manus" },
    ],

    // License
    licenseTitle: "Licens",
    licenseText: `Det här projektet är licensierat under CC0 — Creative Commons Zero. Det innebär att allt innehåll och all kod är fritt att plocka, återanvända, remixa och bygga vidare på. Ingen attribution krävs.

Men jag ser så klart gärna att man håller mig i loopen. Jag är genuint nyfiken på om någon har nytta av det här — om du plockar något, hör gärna av dig.`,
    licenseCC0: "Läs mer om CC0 1.0 Universal",

    // Contact
    contactTitle: "Kontakt",
    contactText: "Har du tankar, feedback eller vill diskutera något av det här? Hör av dig.",
    contactEmail: "joakim@jardenberg.com",

    // Version
    versionLabel: "Version",
  },
  en: {
    backLink: "Back to the manifesto",
    pageTitle: "About this project",
    pageSubtitle: "Background, process and license",

    originTitle: "Background",
    originText: `It all started with a Facebook post by Troed Troedson. He challenged: "Parliamentary parties! Hold a press conference each with 15 points that ease people's journey instead of the opposite. But hold a workshop first so it doesn't turn out as clumsy as it usually does."

Said and done. I workshopped with my team and came up with 15 points that are, of course, very much my own. Leaning heavily on the internet, digitalisation in general and AI in particular. And which are, equally obviously, a work in progress. Better together, as always.`,
    troedLink: "Troed's original Facebook post",

    processTitle: "How we built the site",
    processText: `From walk-and-talk to finished site — this project is a collaboration between human and AI.

It started with a voice recording. I went for a walk and talked through my thoughts about Troed's post, about integration, about AI and friction. Manus — my AI agent — transcribed the recording, extracted the 15 points and structured them into a manifesto with headings, key figures, quotes and body text.

We worked iteratively. I gave direction and feedback, Manus built and suggested. First came the content — the 15 points with their investment figures and arguments. Then the design: we landed on "Nordic Monumentalism" with a warm cream background, ochre accents, Playfair Display typography and a sense of gravity without being heavy.

Manus did its own research to give the points credibility — figures from the OECD on AI and language training, data on validation times for foreign qualifications, Global Innovation Index rankings, and statistics on shortage occupations in Sweden.

The 15 illustrations were created with Nano Banana — an AI image generation tool — in a warm 1950s editorial style. I uploaded reference images with a vibe I liked, and Manus generated 15 unique images matching each point's theme.

Along the way, we created skills — reusable knowledge packages — that document how we did things. This means that next time I or anyone else wants to build something similar, it will be faster and better.

On the technical side, Manus built the site with React, Tailwind, tRPC and Express — with server-side rendering of OG tags so the right image and title appear when someone shares a point on social media. Comments and voting with a database behind it. Hosting via Manus with a CNAME pointer to my own domain.`,

    techTitle: "Technology",
    techStack: [
      { label: "Frontend", value: "React 19, Tailwind CSS 4, Framer Motion" },
      { label: "Backend", value: "Express, tRPC, Drizzle ORM" },
      { label: "Database", value: "TiDB (MySQL-compatible)" },
      { label: "Images", value: "Nano Banana (AI-generated)" },
      { label: "Research", value: "Deep Research via Manus" },
      { label: "Hosting", value: "Manus with custom domain (CNAME)" },
      { label: "AI agent", value: "Manus" },
    ],

    reportsTitle: "Read more",
    report15p: "Our full write-up on how you build something like this in 2026",
    reportJjos: "A similar report on a much larger system that has completely revolutionised how I work — much higher delivery quality, much higher pace, much more learning, and incredibly much more fun",

    downloadTitle: "Download the manifesto",
    downloadDesc: "The full manifesto is available for download — in Swedish and English.",
    downloadSv: "Swedish (.md)",
    downloadEn: "English (.md)",

    licenseTitle: "License",
    licenseText: `This project is licensed under CC0 — Creative Commons Zero. This means all content and code is free to use, reuse, remix and build upon. No attribution required.

But I'd love to stay in the loop. I'm genuinely curious if anyone finds this useful — if you pick something up, please get in touch.`,
    licenseCC0: "Read more about CC0 1.0 Universal",

    contactTitle: "Contact",
    contactText: "Have thoughts, feedback or want to discuss any of this? Get in touch.",
    contactEmail: "joakim@jardenberg.com",

    versionLabel: "Version",
  },
};

export default function About() {
  const { lang, langPrefix } = useLang();
  const c = content[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LanguageSwitcher />

      <div className="max-w-3xl mx-auto px-6 md:px-16 py-16 md:py-24">
        {/* Back link */}
        <Link href={`${langPrefix}/` || "/"}>
          <motion.div
            className="inline-flex items-center gap-2 mb-12 cursor-pointer group"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ArrowLeft size={16} style={{ color: '#9B6B1A' }} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-body text-sm underline underline-offset-2 group-hover:no-underline transition-all" style={{ color: '#9B6B1A' }}>
              {c.backLink}
            </span>
          </motion.div>
        </Link>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-12 h-[2px] mb-8" style={{ backgroundColor: '#9B6B1A' }} />
          <h1 className="font-display text-3xl md:text-5xl font-normal leading-tight" style={{ color: '#2c1810' }}>
            {c.pageTitle}
          </h1>
          <p className="font-body text-lg mt-3 font-light" style={{ color: '#8a7a6a' }}>
            {c.pageSubtitle}
          </p>
        </motion.div>

        {/* Origin */}
        <motion.section
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-6" style={{ color: '#2c1810' }}>
            {c.originTitle}
          </h2>
          <div className="space-y-4">
            {c.originText.split("\n\n").map((p, i) => (
              <p key={i} className="font-body text-base md:text-lg leading-relaxed font-light" style={{ color: '#5a4a3a' }}>
                {p}
              </p>
            ))}
          </div>
          <a
            href="https://www.facebook.com/troed.troedson/posts/pfbid02rAf7vzXf1r5DrntwkcJrNxb3U86ASnv2x9hKeqnP1f3gvXq6Lxb6YeRzn6qcgedBl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 font-body text-sm underline underline-offset-2 hover:no-underline transition-all"
            style={{ color: '#9B6B1A' }}
          >
            {c.troedLink} →
          </a>
        </motion.section>

        {/* Divider */}
        <div className="my-14 h-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.08)' }} />

        {/* Process / Field Report */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-6" style={{ color: '#2c1810' }}>
            {c.processTitle}
          </h2>
          <div className="space-y-4">
            {c.processText.split("\n\n").map((p, i) => (
              <p key={i} className="font-body text-base md:text-lg leading-relaxed font-light" style={{ color: '#5a4a3a' }}>
                {p}
              </p>
            ))}
          </div>
        </motion.section>

        {/* Divider */}
        <div className="my-14 h-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.08)' }} />

        {/* Read more / Reports */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-6" style={{ color: '#2c1810' }}>
            {c.reportsTitle}
          </h2>
          <div className="space-y-4">
            <a
              href="https://ai.jardenberg.se/15p-build"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-sm transition-all hover:translate-x-1"
              style={{ backgroundColor: 'oklch(0.95 0.01 80 / 0.5)', borderLeft: '3px solid #9B6B1A' }}
            >
              <span className="font-body text-base leading-relaxed" style={{ color: '#5a4a3a' }}>
                {c.report15p}
              </span>
              <span className="block mt-1 font-mono-display text-xs tracking-wider" style={{ color: '#9B6B1A' }}>
                ai.jardenberg.se/15p-build →
              </span>
            </a>
            <a
              href="https://ai.jardenberg.se/jjos-build"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-5 rounded-sm transition-all hover:translate-x-1"
              style={{ backgroundColor: 'oklch(0.95 0.01 80 / 0.5)', borderLeft: '3px solid #9B6B1A' }}
            >
              <span className="font-body text-base leading-relaxed" style={{ color: '#5a4a3a' }}>
                {c.reportJjos}
              </span>
              <span className="block mt-1 font-mono-display text-xs tracking-wider" style={{ color: '#9B6B1A' }}>
                ai.jardenberg.se/jjos-build →
              </span>
            </a>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="my-14 h-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.08)' }} />

        {/* PDF Downloads */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.37 }}
        >
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4" style={{ color: '#2c1810' }}>
            {c.downloadTitle}
          </h2>
          <p className="font-body text-base md:text-lg leading-relaxed font-light mb-6" style={{ color: '#5a4a3a' }}>
            {c.downloadDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/api/download/sv"
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm font-body text-sm transition-all hover:translate-x-1"
              style={{ backgroundColor: 'oklch(0.95 0.01 80 / 0.5)', borderLeft: '3px solid #9B6B1A', color: '#5a4a3a' }}
            >
              <Download size={14} style={{ color: '#9B6B1A' }} />
              {c.downloadSv}
            </a>
            <a
              href="/api/download/en"
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm font-body text-sm transition-all hover:translate-x-1"
              style={{ backgroundColor: 'oklch(0.95 0.01 80 / 0.5)', borderLeft: '3px solid #9B6B1A', color: '#5a4a3a' }}
            >
              <Download size={14} style={{ color: '#9B6B1A' }} />
              {c.downloadEn}
            </a>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="my-14 h-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.08)' }} />

        {/* Tech stack */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-6" style={{ color: '#2c1810' }}>
            {c.techTitle}
          </h2>
          <div className="grid gap-3">
            {c.techStack.map((item, i) => (
              <div key={i} className="flex gap-4 py-2" style={{ borderBottom: '1px solid oklch(0.18 0.02 50 / 0.06)' }}>
                <span className="font-mono-display text-xs tracking-wider min-w-[100px] pt-0.5" style={{ color: '#9B6B1A' }}>
                  {item.label}
                </span>
                <span className="font-body text-sm font-light" style={{ color: '#5a4a3a' }}>
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Divider */}
        <div className="my-14 h-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.08)' }} />

        {/* License */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-6" style={{ color: '#2c1810' }}>
            {c.licenseTitle}
          </h2>
          <div className="p-6 md:p-8 rounded-sm" style={{ backgroundColor: 'oklch(0.95 0.01 80 / 0.5)', borderLeft: '3px solid #9B6B1A' }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono-display text-sm tracking-wider font-medium" style={{ color: '#9B6B1A' }}>
                CC0 1.0
              </span>
              <span className="font-body text-sm" style={{ color: '#8a7a6a' }}>
                Universal — Public Domain Dedication
              </span>
            </div>
            <div className="space-y-4">
              {c.licenseText.split("\n\n").map((p, i) => (
                <p key={i} className="font-body text-base leading-relaxed font-light" style={{ color: '#5a4a3a' }}>
                  {p}
                </p>
              ))}
            </div>
            <a
              href="https://creativecommons.org/publicdomain/zero/1.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 font-body text-sm underline underline-offset-2 hover:no-underline transition-all"
              style={{ color: '#9B6B1A' }}
            >
              {c.licenseCC0} →
            </a>
          </div>
        </motion.section>

        {/* Divider */}
        <div className="my-14 h-[1px]" style={{ backgroundColor: 'oklch(0.18 0.02 50 / 0.08)' }} />

        {/* Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="font-display text-xl md:text-2xl font-semibold mb-4" style={{ color: '#2c1810' }}>
            {c.contactTitle}
          </h2>
          <p className="font-body text-base md:text-lg leading-relaxed font-light mb-4" style={{ color: '#5a4a3a' }}>
            {c.contactText}
          </p>
          <a
            href={`mailto:${c.contactEmail}`}
            className="font-body text-base underline underline-offset-2 hover:no-underline transition-all"
            style={{ color: '#9B6B1A' }}
          >
            {c.contactEmail}
          </a>
        </motion.section>

        {/* Version */}
        <div className="mt-20 pt-8" style={{ borderTop: '1px solid oklch(0.18 0.02 50 / 0.07)' }}>
          <p className="font-mono-display text-xs tracking-wider" style={{ color: 'oklch(0.58 0.16 55 / 0.4)' }}>
            {c.versionLabel}: v093c
          </p>
        </div>
      </div>
    </div>
  );
}
