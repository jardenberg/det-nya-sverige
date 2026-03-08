/**
 * PDF Generation for Det Nya Sverige manifesto
 * Generates accessible, clean PDFs in Swedish and English
 */

import PDFDocument from "pdfkit";
import type { Response } from "express";

interface DataMetric {
  label: string;
  value: string;
  icon: string;
}

interface PolicyPoint {
  id: number;
  title: string;
  subtitle: string;
  body: string;
  quote: string;
  quoteAuthor: string;
  category: string;
  metrics: DataMetric[];
}

// ── Swedish content ──────────────────────────────────────────────
const SV_POINTS: PolicyPoint[] = [
  {
    id: 1, title: "Ett Sverige in, inte femton köer",
    subtitle: "En enda digital väg in – med en mänsklig lots och en AI-lots i fickan",
    body: "Vi bygger en enda väg in till Sverige: en digital onboarding, inte en administrativ hinderbana. Varje människa ska möta ett gemensamt gränssnitt där identitet, dokument, språkstöd, hälsokontakt, skolspår, arbetsspår och samhällsinformation hänger ihop. Där finns både en mänsklig lots och en AI-lots i fickan: AI översätter, förklarar, sammanfattar och varnar när något saknas, medan handläggaren gör bedömningar och tar ansvar.",
    quote: "Det som i dag ser ut som ett integrationsproblem är ofta bara ett designproblem som staten ännu inte tagit på allvar.",
    quoteAuthor: "", category: "Plattform & Onboarding",
    metrics: [{ label: "Årlig investering", value: "18 mdr kr", icon: "money" }, { label: "Berörda per år", value: "200 000+", icon: "people" }],
  },
  {
    id: 2, title: "100-dagarsgaranti för kompetens",
    subtitle: "Ett digitalt kompetenspass som slutar börja i misstro",
    body: "Vi inför ett digitalt kompetenspass. Examina, certifikat, arbetsprover, referenser och erfarenheter ska laddas upp en gång, läsas av maskinellt, jämföras mot svenska krav och landa i ett tydligt besked: godkänt, komplettera detta, eller här finns ett alternativt spår.",
    quote: "Ett papper som inte passar i en svensk mapp ska inte få radera ett helt arbetsliv.",
    quoteAuthor: "", category: "Kompetens & Arbete",
    metrics: [{ label: "Årlig investering", value: "15 mdr kr", icon: "money" }, { label: "Max tid till besked", value: "100 dagar", icon: "clock" }],
  },
  {
    id: 3, title: "Svenska genom arbete, inte före arbete",
    subtitle: "En personlig AI-språkcoach i fickan",
    body: "Alla som behöver det får svenska i fickan: en personlig språkcoach med talträning, yrkesordlistor, dialogsimulationer, realtidsöversättning och återkoppling kopplad till just det jobb, den utbildning eller den vardag man befinner sig i.",
    quote: "Språket lär man sig bäst när det används. Inte i ett klassrum man väntat ett år på att komma in i.",
    quoteAuthor: "", category: "Språk & Lärande",
    metrics: [{ label: "Årlig investering", value: "22 mdr kr", icon: "money" }, { label: "Berörda per år", value: "180 000", icon: "people" }],
  },
  {
    id: 4, title: "Nationell snabbfil till bristyrken",
    subtitle: "Digitala snabbspår med validering, simuleringar och AI-stödda kunskapstest",
    body: "Vi bygger digitala snabbspår till bristyrken med validering, simuleringar, AI-stödda kunskapstest, handledd praktik och betald komplettering. En sjuksköterska ska inte börja om från noll därför att staten saknar fantasi.",
    quote: "Tekniken ska komprimera vägen till svensk licens, inte skapa fler väntrum.",
    quoteAuthor: "", category: "Kompetens & Arbete",
    metrics: [{ label: "Årlig investering", value: "12 mdr kr", icon: "money" }, { label: "Snabbspår i bristyrken", value: "100+", icon: "building" }],
  },
  {
    id: 5, title: "Första riktiga jobbet inom 180 dagar",
    subtitle: "Från CV-teater till kompetensbevis",
    body: "Vi går från CV-teater till kompetensbevis. AI-stödd matchning kan koppla ihop människor med arbetsgivare utifrån färdigheter, språkprogression, arbetsprov, referenser och faktisk potential – inte bara svenska mallar för personliga brev.",
    quote: "Vi ska sluta låtsas att CV-skrivning är integration.",
    quoteAuthor: "", category: "Kompetens & Arbete",
    metrics: [{ label: "Årlig investering", value: "10 mdr kr", icon: "money" }, { label: "Mål: tid till första jobb", value: "180 dagar", icon: "clock" }],
  },
  {
    id: 6, title: "Bosätt efter möjlighet, inte efter passivitet",
    subtitle: "Data som visar var jobben, skolorna och bostäderna finns",
    body: "Vi använder data för att se var jobben finns, var skolorna fungerar, var bostäderna finns och var vägen till egen försörjning är kortast. Inte för att styra människor som pjäser, utan för att ge dem bättre information och verkliga val.",
    quote: "Det är märkligt att vi accepterar mer intelligens i en reseapp än i statens beslut om människors framtid.",
    quoteAuthor: "", category: "Plattform & Onboarding",
    metrics: [{ label: "Årlig investering", value: "8 mdr kr", icon: "money" }, { label: "Kommuner med realtidsdata", value: "Alla 290", icon: "building" }],
  },
  {
    id: 7, title: "Barnen först, alltid",
    subtitle: "Digitalt rustade skolor för flerspråkighet",
    body: "Varje nyanlänt barn ska möta en skola som är digitalt rustad för flerspråkighet. Inspelade genomgångar, översatta vårdnadshavarflöden, AI-stött språkstöd, digital studiehandledning, adaptiva övningar och enkla sätt för hem och skola att förstå varandra ska vara standard.",
    quote: "Vi ska inte bygga botskolor. Vi ska ge bra lärare mycket större räckvidd.",
    quoteAuthor: "", category: "Barn & Utbildning",
    metrics: [{ label: "Årlig investering", value: "35 mdr kr", icon: "money" }, { label: "Barn som nås", value: "350 000", icon: "people" }],
  },
  {
    id: 8, title: "Hård mot exploatering, mjuk mot människor",
    subtitle: "Dataanalys som avslöjar utnyttjande – och ett digitalt skyddsrum i fickan",
    body: "Vi använder dataanalys och AI för att upptäcka skenanställningar, orimliga lönenivåer, blufföretag, utnyttjande i underleverantörsled och misstänkta mönster av arbetslivskriminalitet långt tidigare än i dag.",
    quote: "Tekniken ska inte bara hjälpa staten att kontrollera. Den ska hjälpa människan att förstå sin rätt och våga använda den.",
    quoteAuthor: "", category: "Rättsstat & Skydd",
    metrics: [{ label: "Årlig investering", value: "8 mdr kr", icon: "money" }, { label: "Arbetstagare med digitalt skydd", value: "500 000+", icon: "people" }],
  },
  {
    id: 9, title: "Nolltolerans mot diskriminering",
    subtitle: "Anonymiserad gallring, färdighetsprov före magkänsla",
    body: "Vi gör upp med både analog och digital diskriminering. Offentlig rekrytering ska använda anonymiserad första gallring, färdighetsprov före magkänsla och löpande insyn i utfall. AI-system som används för matchning, urval eller stöd måste kunna granskas, förklaras och stängas av om de reproducerar gamla fördomar.",
    quote: "Det räcker inte att digitalisera orättvisor. Sverige ska bli landet som mäter bias lika seriöst som vi mäter budget.",
    quoteAuthor: "", category: "Rättsstat & Skydd",
    metrics: [{ label: "Årlig investering", value: "6 mdr kr", icon: "money" }, { label: "Mål: sysselsättningsgap", value: "0% (5 år)", icon: "chart" }],
  },
  {
    id: 10, title: "Digitalt medlemskap från dag ett",
    subtitle: "Säker digital identitet, myndighetspost och en tydlig nästa steg-funktion i mobilen",
    body: "Man ska inte behöva bli analog i ett digitalt land bara för att man just kommit hit. Från dag ett ska människor kunna få säker digital identitet, myndighetspost, samlad ärendeöversikt, bokningar, språkstöd, samhällsinformation och en tydlig nästa steg-funktion i mobilen.",
    quote: "Det som i dag ser ut som ett personnummerproblem är ofta bara ett designproblem som staten ännu inte tagit på allvar.",
    quoteAuthor: "", category: "Digital Infrastruktur",
    metrics: [{ label: "Årlig investering", value: "12 mdr kr", icon: "money" }, { label: "Tid till digital identitet", value: "24 timmar", icon: "clock" }],
  },
  {
    id: 11, title: "Europas enklaste land att starta företag i",
    subtitle: "Från tanke till registrerat bolag – i mobilen, på ditt språk",
    body: "Vi bygger ett flerspråkigt, AI-stött företagsspår där en idé kan gå från tanke till registrerat bolag, moms, bank, bokföringsstöd, första offert och första offentliga upphandling utan att man först måste bli expert på svensk myndighetssvenska.",
    quote: "Internetlogik gäller här också: sänk trösklarna, öppna gränssnitten, låt fler bygga.",
    quoteAuthor: "", category: "Näringsliv & Entreprenörskap",
    metrics: [{ label: "Fondkapital", value: "30 mdr kr", icon: "money" }, { label: "Nya företag per år", value: "25 000", icon: "building" }],
  },
  {
    id: 12, title: "Student till byggare av Sverige",
    subtitle: "Automatiskt digitalt övergångsspår från examen till jobb",
    body: "Den som har lagt år av sitt liv på att studera här ska inte mötas av ett administrativt tack och hej. Vi ska ha ett automatiskt digitalt övergångsspår från examen till jobb, forskning, startup eller offentlig tjänst.",
    quote: "Det dummaste ett kunskapsland kan göra är att utbilda global talang och sedan aktivt försvåra för den att stanna.",
    quoteAuthor: "", category: "Kompetens & Arbete",
    metrics: [{ label: "Årlig investering", value: "5 mdr kr", icon: "money" }, { label: "Internationella studenter/år", value: "40 000", icon: "people" }],
  },
  {
    id: 13, title: "Cirkulär rörlighet som styrka",
    subtitle: "Portabla meriter, digitala kompetensplånböcker och diasporan som nätverk",
    body: "Vi ska sluta tänka att mobilitet bara har värde om den slutar i permanent stillastående. I en uppkopplad värld kan människor bidra till Sverige från Malmö, Mumbai och Madrid i olika faser av livet.",
    quote: "Diasporan är inte ett bortfall. Den är ett nätverk. Sverige ska vara ett nav i människors liv.",
    quoteAuthor: "", category: "Rörlighet & Nätverk",
    metrics: [{ label: "Årlig investering", value: "4 mdr kr", icon: "money" }, { label: "Svensk diaspora globalt", value: "500 000+", icon: "people" }],
  },
  {
    id: 14, title: "Snabb och förutsägbar rättsstat",
    subtitle: "Följ ditt ärende som ett paket – med bättre juridik och större värdighet",
    body: "Varje människa ska kunna följa sitt ärende som man i dag följer ett paket, fast med bättre juridik och större värdighet. Tydlig status, väntad handläggningstid, saknade handlingar, nästa steg, ansvarig funktion, översättning på eget språk.",
    quote: "Långsam otydlighet är inte neutral. Det är ett politiskt val.",
    quoteAuthor: "", category: "Rättsstat & Skydd",
    metrics: [{ label: "Årlig investering", value: "10 mdr kr", icon: "money" }, { label: "Handläggningstid (mål)", value: "-50%", icon: "clock" }],
  },
  {
    id: 15, title: "Integration som nationell elitgren",
    subtitle: "Öppen dashboard, öppna API:er och öppna testbäddar",
    body: "Vi bygger en öppen integrationsdashboard för hela landet. Kommun för kommun, myndighet för myndighet, i realtid där det går. Och vi öppnar data, API:er och testbäddar så att civilsamhälle, forskare, startups och kommuner kan bygga bättre lösningar ovanpå gemensam infrastruktur.",
    quote: "Mät det som fungerar. Sluta vinna debatter med anekdoter.",
    quoteAuthor: "", category: "Styrning & Transparens",
    metrics: [{ label: "Total programkostnad/år", value: "~200 mdr kr", icon: "money" }, { label: "Öppen dataplattform", value: "40+ språk", icon: "globe" }],
  },
];

// ── English content ──────────────────────────────────────────────
const EN_POINTS: PolicyPoint[] = [
  { id: 1, title: "One Sweden In, Not Fifteen Queues", subtitle: "A single digital path in – with a human guide and an AI guide in your pocket", body: "We're building a single path into Sweden: a digital onboarding experience, not an administrative obstacle course. Every person should encounter a unified interface where identity, documents, language support, health contact, school track, work track, and civic information are connected.", quote: "What today looks like an integration problem is often just a design problem the state hasn't taken seriously yet.", quoteAuthor: "", category: "Platform & Onboarding", metrics: [{ label: "Annual investment", value: "SEK 18 bn", icon: "money" }, { label: "People reached per year", value: "200,000+", icon: "people" }] },
  { id: 2, title: "100-Day Competence Guarantee", subtitle: "A digital competence passport that stops starting with suspicion", body: "We're introducing a digital competence passport. Degrees, certificates, work samples, references, and experience are uploaded once, read by machine, compared against Swedish requirements, and result in a clear answer.", quote: "A document that doesn't fit a Swedish folder shouldn't erase an entire working life.", quoteAuthor: "", category: "Competence & Work", metrics: [{ label: "Annual investment", value: "SEK 15 bn", icon: "money" }, { label: "Max time to decision", value: "100 days", icon: "clock" }] },
  { id: 3, title: "Swedish Through Work, Not Before Work", subtitle: "A personal AI language coach in your pocket", body: "Everyone who needs it gets Swedish in their pocket: a personal language coach with speech training, occupational vocabulary, dialogue simulations, real-time translation, and feedback connected to the specific job, education, or everyday life they're in.", quote: "Language is best learned when it's used. Not in a classroom you waited a year to enter.", quoteAuthor: "", category: "Language & Learning", metrics: [{ label: "Annual investment", value: "SEK 22 bn", icon: "money" }, { label: "People reached per year", value: "180,000", icon: "people" }] },
  { id: 4, title: "National Fast Track to Shortage Professions", subtitle: "Digital fast tracks with validation, simulations and AI-supported knowledge tests", body: "We're building digital fast tracks to shortage professions with validation, simulations, AI-supported knowledge tests, supervised practice, and paid supplementation.", quote: "Technology should compress the path to Swedish licensure, not create more waiting rooms.", quoteAuthor: "", category: "Competence & Work", metrics: [{ label: "Annual investment", value: "SEK 12 bn", icon: "money" }, { label: "Fast tracks in shortage professions", value: "100+", icon: "building" }] },
  { id: 5, title: "First Real Job Within 180 Days", subtitle: "From CV theater to competence proof", body: "We're moving from CV theater to competence proof. AI-supported matching can connect people with employers based on skills, language progression, work samples, references, and actual potential.", quote: "We must stop pretending that CV writing is integration.", quoteAuthor: "", category: "Competence & Work", metrics: [{ label: "Annual investment", value: "SEK 10 bn", icon: "money" }, { label: "Target: time to first job", value: "180 days", icon: "clock" }] },
  { id: 6, title: "Settle by Opportunity, Not by Passivity", subtitle: "Data showing where the jobs, schools, and housing are", body: "We use data to see where the jobs are, where schools work, where housing exists, and where the path to self-sufficiency is shortest.", quote: "It's strange that we accept more intelligence in a travel app than in the state's decisions about people's futures.", quoteAuthor: "", category: "Platform & Onboarding", metrics: [{ label: "Annual investment", value: "SEK 8 bn", icon: "money" }, { label: "Municipalities with real-time data", value: "All 290", icon: "building" }] },
  { id: 7, title: "Children First, Always", subtitle: "Digitally equipped schools for multilingualism", body: "Every newly arrived child should meet a school that is digitally equipped for multilingualism. Recorded lessons, translated guardian flows, AI-supported language support, digital study guidance, and adaptive exercises should be standard.", quote: "We shouldn't build bot schools. We should give good teachers much greater reach.", quoteAuthor: "", category: "Children & Education", metrics: [{ label: "Annual investment", value: "SEK 35 bn", icon: "money" }, { label: "Children reached", value: "350,000", icon: "people" }] },
  { id: 8, title: "Hard on Exploitation, Soft on People", subtitle: "Data analysis that exposes exploitation – and a digital safe room in your pocket", body: "We use data analysis and AI to detect sham employment, unreasonable wage levels, fraudulent companies, and exploitation in subcontractor chains far earlier than today.", quote: "Technology shouldn't just help the state control. It should help people understand their rights and dare to use them.", quoteAuthor: "", category: "Rule of Law & Protection", metrics: [{ label: "Annual investment", value: "SEK 8 bn", icon: "money" }, { label: "Workers with digital protection", value: "500,000+", icon: "people" }] },
  { id: 9, title: "Zero Tolerance for Discrimination", subtitle: "Anonymized screening, skills tests before gut feeling", body: "We're confronting both analog and digital discrimination. Public recruitment must use anonymized first screening, skills tests before gut feeling, and ongoing transparency in outcomes.", quote: "It's not enough to digitize injustice. Sweden should become the country that measures bias as seriously as we measure budgets.", quoteAuthor: "", category: "Rule of Law & Protection", metrics: [{ label: "Annual investment", value: "SEK 6 bn", icon: "money" }, { label: "Target: employment gap", value: "0% (5 years)", icon: "chart" }] },
  { id: 10, title: "Digital Membership from Day One", subtitle: "Secure digital identity, government mail, and a clear next-step function on your phone", body: "You shouldn't have to become analog in a digital country just because you just arrived. From day one, people should be able to get secure digital identity, government mail, and a clear next-step function on their phone.", quote: "What today looks like a personal number problem is often just a design problem the state hasn't taken seriously yet.", quoteAuthor: "", category: "Digital Infrastructure", metrics: [{ label: "Annual investment", value: "SEK 12 bn", icon: "money" }, { label: "Time to digital identity", value: "24 hours", icon: "clock" }] },
  { id: 11, title: "Europe's Easiest Country to Start a Business In", subtitle: "From idea to registered company – on your phone, in your language", body: "We're building a multilingual, AI-supported business track where an idea can go from thought to registered company, VAT, bank, accounting support, and first public procurement.", quote: "Internet logic applies here too: lower the thresholds, open the interfaces, let more people build.", quoteAuthor: "", category: "Business & Entrepreneurship", metrics: [{ label: "Fund capital", value: "SEK 30 bn", icon: "money" }, { label: "New companies per year", value: "25,000", icon: "building" }] },
  { id: 12, title: "Student to Builder of Sweden", subtitle: "Automatic digital transition track from graduation to employment", body: "Those who have spent years studying here shouldn't be met with an administrative 'thanks and goodbye.' We need an automatic digital transition track from graduation to employment, research, startup, or public service.", quote: "The dumbest thing a knowledge country can do is educate global talent and then actively make it harder for them to stay.", quoteAuthor: "", category: "Competence & Work", metrics: [{ label: "Annual investment", value: "SEK 5 bn", icon: "money" }, { label: "International students/year", value: "40,000", icon: "people" }] },
  { id: 13, title: "Circular Mobility as Strength", subtitle: "Portable credentials, digital competence wallets, and the diaspora as network", body: "We must stop thinking that mobility only has value if it ends in permanent standstill. In a connected world, people can contribute to Sweden from Malmö, Mumbai, and Madrid at different stages of life.", quote: "The diaspora is not a loss. It's a network. Sweden should be a hub in people's lives.", quoteAuthor: "", category: "Mobility & Networks", metrics: [{ label: "Annual investment", value: "SEK 4 bn", icon: "money" }, { label: "Swedish diaspora globally", value: "500,000+", icon: "people" }] },
  { id: 14, title: "Fast and Predictable Rule of Law", subtitle: "Track your case like a package – with better law and greater dignity", body: "Every person should be able to track their case like you track a package today, but with better law and greater dignity. Clear status, expected processing time, missing documents, next steps, responsible function, translation in your own language.", quote: "Slow ambiguity is not neutral. It's a political choice.", quoteAuthor: "", category: "Rule of Law & Protection", metrics: [{ label: "Annual investment", value: "SEK 10 bn", icon: "money" }, { label: "Processing time (target)", value: "-50%", icon: "clock" }] },
  { id: 15, title: "Integration as a National Elite Discipline", subtitle: "Open dashboard, open APIs, and open test beds", body: "We're building an open integration dashboard for the entire country. Municipality by municipality, agency by agency, in real-time where possible. And we open data, APIs, and test beds so that civil society, researchers, startups, and municipalities can build better solutions on shared infrastructure.", quote: "Measure what works. Stop winning debates with anecdotes.", quoteAuthor: "", category: "Governance & Transparency", metrics: [{ label: "Total program cost/year", value: "~SEK 200 bn", icon: "money" }, { label: "Open data platform", value: "40+ languages", icon: "globe" }] },
];

// ── PDF generation ───────────────────────────────────────────────

const COLORS = {
  background: "#FAF6F0",
  text: "#1a1a1a",
  accent: "#9B6B1A",
  muted: "#6b6155",
  light: "#d4c9b8",
};

function generateManifestoPDF(res: Response, lang: "sv" | "en") {
  const points = lang === "sv" ? SV_POINTS : EN_POINTS;
  const isSv = lang === "sv";

  const title = isSv ? "Det Nya Sverige – 15 Punkter för Framtiden" : "The New Sweden – 15 Points for the Future";
  const subtitle = isSv
    ? "Grundtes: Problemet är inte människor, det är friktion.\nHuvudregel: AI där den minskar friktion, människor där de utövar makt."
    : "Core thesis: The problem isn't people, it's friction.\nCore rule: AI where it reduces friction, humans where they exercise power.";
  const author = "Joakim Jardenberg";
  const url = "https://15p.jardenberg.se";
  const license = isSv
    ? "Licensierat under CC0 (Public Domain). Fritt att använda, dela och bygga vidare på."
    : "Licensed under CC0 (Public Domain). Free to use, share, and build upon.";

  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 60, bottom: 60, left: 60, right: 60 },
    info: {
      Title: title,
      Author: author,
      Subject: isSv ? "15 politiska punkter för integration och digitalisering" : "15 policy points for integration and digitalization",
      Keywords: "Sverige, integration, AI, digitalisering, manifest",
      Creator: "Det Nya Sverige / 15p.jardenberg.se",
    },
    lang: lang === "sv" ? "sv-SE" : "en-US",
    tagged: true,
    displayTitle: true,
  });

  const filename = isSv ? "det-nya-sverige-15-punkter.pdf" : "the-new-sweden-15-points.pdf";
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
  doc.pipe(res);

  const pageWidth = doc.page.width - 120; // margins

  // ── Title page ──
  doc.moveDown(6);
  doc.fontSize(28).fillColor(COLORS.text).font("Helvetica-Bold")
    .text(title, { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(11).fillColor(COLORS.muted).font("Helvetica")
    .text(subtitle, { align: "center" });
  doc.moveDown(2);
  doc.fontSize(10).fillColor(COLORS.accent).font("Helvetica-Bold")
    .text(author, { align: "center" });
  doc.fontSize(9).fillColor(COLORS.muted).font("Helvetica")
    .text(url, { align: "center", link: url });
  doc.moveDown(4);
  doc.fontSize(8).fillColor(COLORS.light).font("Helvetica")
    .text(license, { align: "center" });

  // ── Points ──
  for (const point of points) {
    doc.addPage();

    // Point number + category
    doc.fontSize(10).fillColor(COLORS.accent).font("Helvetica-Bold")
      .text(`${isSv ? "PUNKT" : "POINT"} ${point.id}`, { continued: false });
    doc.fontSize(8).fillColor(COLORS.muted).font("Helvetica")
      .text(point.category.toUpperCase());
    doc.moveDown(0.5);

    // Decorative line
    doc.moveTo(60, doc.y).lineTo(60 + 60, doc.y).strokeColor(COLORS.accent).lineWidth(2).stroke();
    doc.moveDown(0.8);

    // Title
    doc.fontSize(18).fillColor(COLORS.text).font("Helvetica-Bold")
      .text(point.title);
    doc.moveDown(0.3);

    // Subtitle
    doc.fontSize(10).fillColor(COLORS.muted).font("Helvetica-Oblique")
      .text(point.subtitle);
    doc.moveDown(1);

    // Body
    doc.fontSize(10).fillColor(COLORS.text).font("Helvetica")
      .text(point.body, { align: "justify", lineGap: 3 });
    doc.moveDown(1);

    // Quote
    if (point.quote) {
      doc.fontSize(9).fillColor(COLORS.accent).font("Helvetica-Oblique")
        .text(`"${point.quote}"`, { indent: 20 });
      doc.moveDown(1);
    }

    // Metrics
    if (point.metrics.length > 0) {
      doc.fontSize(8).fillColor(COLORS.muted).font("Helvetica-Bold")
        .text(isSv ? "NYCKELTAL" : "KEY METRICS");
      doc.moveDown(0.3);

      for (const metric of point.metrics) {
        doc.fontSize(9).fillColor(COLORS.text).font("Helvetica")
          .text(`${metric.label}: `, { continued: true })
          .font("Helvetica-Bold").text(metric.value);
      }
    }

    // Footer on each page
    const bottomY = doc.page.height - 40;
    doc.fontSize(7).fillColor(COLORS.light).font("Helvetica")
      .text(
        `${title} — ${url}`,
        60, bottomY,
        { align: "center", width: pageWidth }
      );
  }

  // ── Closing page ──
  doc.addPage();
  doc.moveDown(6);
  doc.fontSize(16).fillColor(COLORS.text).font("Helvetica-Bold")
    .text(isSv ? "Framåt. Tillsammans." : "Forward. Together.", { align: "center" });
  doc.moveDown(1);
  doc.fontSize(10).fillColor(COLORS.muted).font("Helvetica")
    .text(
      isSv
        ? "Det här är ett levande dokument. Punkterna är work in progress – bättre tillsammans, som vanligt."
        : "This is a living document. The points are work in progress – better together, as always.",
      { align: "center" }
    );
  doc.moveDown(2);
  doc.fontSize(10).fillColor(COLORS.accent).font("Helvetica-Bold")
    .text(isSv ? "Kontakt" : "Contact", { align: "center" });
  doc.fontSize(9).fillColor(COLORS.muted).font("Helvetica")
    .text("joakim@jardenberg.com", { align: "center", link: "mailto:joakim@jardenberg.com" });
  doc.moveDown(0.5);
  doc.fontSize(9).fillColor(COLORS.muted).font("Helvetica")
    .text(url, { align: "center", link: url });
  doc.moveDown(3);
  doc.fontSize(8).fillColor(COLORS.light).font("Helvetica")
    .text(license, { align: "center" });

  doc.end();
}

export function registerPdfRoutes(app: import("express").Express) {
  app.get("/api/pdf/sv", (_req, res) => {
    try {
      generateManifestoPDF(res, "sv");
    } catch (err) {
      console.error("PDF generation error:", err);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });

  app.get("/api/pdf/en", (_req, res) => {
    try {
      generateManifestoPDF(res, "en");
    } catch (err) {
      console.error("PDF generation error:", err);
      res.status(500).json({ error: "Failed to generate PDF" });
    }
  });
}
