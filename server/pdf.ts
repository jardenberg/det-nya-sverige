/**
 * Markdown download generation for Det Nya Sverige manifesto
 * Generates clean, accessible Markdown files in Swedish and English
 * Uses the full text from the points data files
 */

import type { Express, Request, Response } from "express";

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

// Import the full content directly from the client-side data files
// We re-export the data here to avoid import path issues in the server build

function generateMarkdown(lang: "sv" | "en", points: PolicyPoint[]): string {
  const isSv = lang === "sv";

  const title = isSv ? "Det Nya Sverige – 15 Punkter för Framtiden" : "The New Sweden – 15 Points for the Future";
  const thesis = isSv
    ? "Grundtes: Problemet är inte människor, det är friktion."
    : "Core thesis: The problem isn't people, it's friction.";
  const rule = isSv
    ? "Huvudregel: AI där den minskar friktion, människor där de utövar makt."
    : "Core rule: AI where it reduces friction, humans where they exercise power.";
  const author = "Joakim Jardenberg";
  const url = "https://15p.jardenberg.se";
  const license = isSv
    ? "Licensierat under CC0 (Public Domain). Fritt att använda, dela och bygga vidare på."
    : "Licensed under CC0 (Public Domain). Free to use, share, and build upon.";

  let md = "";

  // Title page
  md += `# ${title}\n\n`;
  md += `**${thesis}**\n\n`;
  md += `**${rule}**\n\n`;
  md += `*${author}* | [${url}](${url})\n\n`;
  md += `---\n\n`;

  // Table of contents
  md += isSv ? `## Innehåll\n\n` : `## Contents\n\n`;
  for (const point of points) {
    md += `${point.id}. [${point.title}](#punkt-${point.id})\n`;
  }
  md += `\n---\n\n`;

  // Each point
  for (const point of points) {
    md += `<a id="punkt-${point.id}"></a>\n\n`;
    md += `## ${isSv ? "Punkt" : "Point"} ${point.id}: ${point.title}\n\n`;
    md += `**${point.subtitle}**\n\n`;
    md += `*${point.category}*\n\n`;
    md += `${point.body}\n\n`;

    if (point.quote) {
      md += `> "${point.quote}"\n\n`;
    }

    // Metrics
    if (point.metrics.length > 0) {
      md += isSv ? `### Nyckeltal\n\n` : `### Key Metrics\n\n`;
      md += `| ${isSv ? "Mått" : "Metric"} | ${isSv ? "Värde" : "Value"} |\n`;
      md += `| --- | --- |\n`;
      for (const metric of point.metrics) {
        md += `| ${metric.label} | ${metric.value} |\n`;
      }
      md += `\n`;
    }

    md += `---\n\n`;
  }

  // Closing
  md += isSv ? `## Framåt. Tillsammans.\n\n` : `## Forward. Together.\n\n`;
  md += isSv
    ? `Det här är ett levande dokument. Punkterna är work in progress – bättre tillsammans, som vanligt.\n\n`
    : `This is a living document. The points are work in progress – better together, as always.\n\n`;
  md += isSv ? `### Kontakt\n\n` : `### Contact\n\n`;
  md += `[joakim@jardenberg.com](mailto:joakim@jardenberg.com)\n\n`;
  md += `[${url}](${url})\n\n`;
  md += `*${license}*\n`;

  return md;
}

export function registerPdfRoutes(app: Express) {
  // We need to dynamically load the points data
  // Since the data is in TypeScript client files, we inline the full content here

  app.get("/api/download/sv", async (_req: Request, res: Response) => {
    try {
      const points = getSvPoints();
      const md = generateMarkdown("sv", points);
      const filename = "det-nya-sverige-15-punkter.md";
      res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(md);
    } catch (err) {
      console.error("Markdown generation error:", err);
      res.status(500).json({ error: "Failed to generate Markdown" });
    }
  });

  app.get("/api/download/en", async (_req: Request, res: Response) => {
    try {
      const points = getEnPoints();
      const md = generateMarkdown("en", points);
      const filename = "the-new-sweden-15-points.md";
      res.setHeader("Content-Type", "text/markdown; charset=utf-8");
      res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
      res.send(md);
    } catch (err) {
      console.error("Markdown generation error:", err);
      res.status(500).json({ error: "Failed to generate Markdown" });
    }
  });

  // Keep old PDF routes as redirects to new markdown routes
  app.get("/api/pdf/sv", (_req: Request, res: Response) => {
    res.redirect(301, "/api/download/sv");
  });
  app.get("/api/pdf/en", (_req: Request, res: Response) => {
    res.redirect(301, "/api/download/en");
  });
}

// ── Full Swedish content (from client/src/lib/points.ts) ──────────
function getSvPoints(): PolicyPoint[] {
  return [
    {
      id: 1, title: "Ett Sverige in, inte femton köer",
      subtitle: "En enda digital väg in – med en mänsklig lots och en AI-lots i fickan",
      body: "Vi bygger en enda väg in till Sverige: en digital onboarding, inte en administrativ hinderbana. Varje människa ska möta ett gemensamt gränssnitt där identitet, dokument, språkstöd, hälsokontakt, skolspår, arbetsspår och samhällsinformation hänger ihop. Där finns både en mänsklig lots och en AI-lots i fickan: AI översätter, förklarar, sammanfattar och varnar när något saknas, medan handläggaren gör bedömningar och tar ansvar. Staten ska fungera mer som en smart plattform och mindre som femton myndighetsöar som spelar pingis med människors liv. I dag skickas människor mellan Migrationsverket, Arbetsförmedlingen, Skatteverket, kommunen och Försäkringskassan som om det vore ett rimligt system. Det är det inte. Det är ett designproblem. Digg har redan godkänt e-legitimation för personer utan svenskt personnummer och byggt ut identitetsmatchning – verktygen finns, det som saknas är vilja, tempo och design.",
      quote: "Det som i dag ser ut som ett integrationsproblem är ofta bara ett designproblem som staten ännu inte tagit på allvar.",
      quoteAuthor: "", category: "Plattform & Onboarding",
      metrics: [
        { label: "Årlig investering", value: "18 mdr kr", icon: "money" },
        { label: "Berörda per år", value: "200 000+", icon: "people" },
        { label: "Myndigheter som kopplas ihop", value: "15+", icon: "building" },
        { label: "Handläggningstid (mål)", value: "-70%", icon: "chart" },
        { label: "Språk i AI-lotsen", value: "40+", icon: "globe" },
        { label: "Full utrullning", value: "24 månader", icon: "clock" },
      ],
    },
    {
      id: 2, title: "100-dagarsgaranti för kompetens",
      subtitle: "Ett digitalt kompetenspass som slutar börja i misstro",
      body: "Vi inför ett digitalt kompetenspass. Examina, certifikat, arbetsprover, referenser och erfarenheter ska laddas upp en gång, läsas av maskinellt, jämföras mot svenska krav och landa i ett tydligt besked: godkänt, komplettera detta, eller här finns ett alternativt spår. AI används för att tolka dokument, matcha mot kvalifikationskrav och föreslå kompletteringar. Människan fattar beslutet, men systemet ska sluta börja i misstro. Ett papper som inte passar i en svensk mapp ska inte få radera ett helt arbetsliv. I dag tar validering av utländska utbildningar i genomsnitt 18 månader. Under den tiden kör kirurger taxi och ingenjörer städar trapphus – inte för att det är fel att köra taxi eller städa, utan för att vi slösar bort kompetens vi desperat behöver. Det är inte bara orättvist, det är ekonomiskt vansinne. Sverige rankas tvåa i Global Innovation Index – tänk vad vi kan göra om vi faktiskt använder all den kompetens som redan finns här.",
      quote: "Ett papper som inte passar i en svensk mapp ska inte få radera ett helt arbetsliv.",
      quoteAuthor: "", category: "Kompetens & Arbete",
      metrics: [
        { label: "Årlig investering", value: "15 mdr kr", icon: "money" },
        { label: "Valideringar per år", value: "90 000", icon: "people" },
        { label: "Max tid till besked", value: "100 dagar", icon: "clock" },
        { label: "Samhällsbesparing", value: "40 mdr kr/år", icon: "chart" },
        { label: "Regionala valideringscentra", value: "50", icon: "building" },
        { label: "Branscher i systemet", value: "120+", icon: "globe" },
      ],
    },
    {
      id: 3, title: "Svenska genom arbete, inte före arbete",
      subtitle: "En personlig AI-språkcoach i fickan – kopplad till ditt jobb, din utbildning, din vardag",
      body: "Alla som behöver det får svenska i fickan: en personlig språkcoach med talträning, yrkesordlistor, dialogsimulationer, realtidsöversättning och återkoppling kopplad till just det jobb, den utbildning eller den vardag man befinner sig i. Vi ska inte ha en modell där människor först väntar i åratal på att bli tillräckligt svenska för att börja bidra. Språket lär man sig bäst när det används, och AI gör det möjligt att träna lite, ofta, relevant och på egen nivå. Det här är kanske den mest underskattade hävstången av alla. OECD lyfter AI som särskilt lovande för språkträning i integration. En somalisktalande läkare kan rädda liv på somaliska medan hen lär sig svenska. En arabisktalande ingenjör kan lösa tekniska problem på arabiska redan första veckan. Parallell kompetens och parallellt språk – inte sekventiellt. SFI i sin nuvarande form är en vänthall, inte en startbana. Vi bygger om det från grunden.",
      quote: "Språket lär man sig bäst när det används. Inte i ett klassrum man väntat ett år på att komma in i.",
      quoteAuthor: "", category: "Språk & Lärande",
      metrics: [
        { label: "Årlig investering", value: "22 mdr kr", icon: "money" },
        { label: "Berörda per år", value: "180 000", icon: "people" },
        { label: "Språk i AI-coachen", value: "40+", icon: "globe" },
        { label: "Förväntad BNP-effekt", value: "+0,8% årligen", icon: "chart" },
        { label: "Yrkesbanor med parallellt språk", value: "80+", icon: "building" },
        { label: "Full utrullning", value: "18 månader", icon: "clock" },
      ],
    },
    {
      id: 4, title: "Nationell snabbfil till bristyrken",
      subtitle: "Digitala snabbspår med validering, simuleringar och AI-stödda kunskapstest",
      body: "Vi bygger digitala snabbspår till bristyrken med validering, simuleringar, AI-stödda kunskapstest, handledd praktik och betald komplettering. En sjuksköterska ska inte börja om från noll därför att staten saknar fantasi, och en elektriker ska inte fastna mellan pdf:er och pärmar. Tekniken ska användas för att komprimera vägen till svensk licens, inte för att skapa fler väntrum. När någon kan jobbet ska systemet hjälpa till att bevisa det snabbare. Sverige har i dag brist på personal i över 100 yrkeskategorier – från undersköterskor till civilingenjörer, från svetsare till specialistläkare. Samtidigt har vi tiotusentals människor med exakt den kompetensen som sitter fast i ett system designat för att bromsa. Det är som att ha en motorväg med hastighetsbegränsning 30. Vi tar bort de onödiga hastighetsbegränsningarna.",
      quote: "Tekniken ska komprimera vägen till svensk licens, inte skapa fler väntrum.",
      quoteAuthor: "", category: "Kompetens & Arbete",
      metrics: [
        { label: "Årlig investering", value: "12 mdr kr", icon: "money" },
        { label: "Snabbspår i bristyrken", value: "100+", icon: "building" },
        { label: "Deltagare per år", value: "45 000", icon: "people" },
        { label: "Tid till licens (mål)", value: "-60%", icon: "clock" },
        { label: "Samhällsbesparing", value: "25 mdr kr/år", icon: "chart" },
        { label: "Praktikplatser", value: "30 000/år", icon: "people" },
      ],
    },
    {
      id: 5, title: "Första riktiga jobbet inom 180 dagar",
      subtitle: "Från CV-teater till kompetensbevis – AI-matchning som ser potential, inte mallar",
      body: "Vi går från CV-teater till kompetensbevis. AI-stödd matchning kan koppla ihop människor med arbetsgivare utifrån färdigheter, språkprogression, arbetsprov, referenser och faktisk potential – inte bara svenska mallar för personliga brev. Varje person får en kombination av digital coach och mänsklig jobbmatchare. AI ska ersätta väntan, inte människan. Vi ska sluta låtsas att CV-skrivning är integration. I dag tar det i genomsnitt över två år för en nyanländ att få sitt första riktiga jobb. Två år av väntan, osäkerhet och kompetensförlust. Det är inte bara ett individuellt problem – det är ett systemfel. Arbetsgivare skriker efter kompetens medan kompetensen sitter i väntrum. Vi bygger bron mellan dem med teknik som ser vad människor kan, inte bara vad de har skrivit på ett papper.",
      quote: "Vi ska sluta låtsas att CV-skrivning är integration.",
      quoteAuthor: "", category: "Kompetens & Arbete",
      metrics: [
        { label: "Årlig investering", value: "10 mdr kr", icon: "money" },
        { label: "Matchningar per år", value: "120 000", icon: "people" },
        { label: "Mål: tid till första jobb", value: "180 dagar", icon: "clock" },
        { label: "Arbetsgivare i nätverket", value: "50 000+", icon: "building" },
        { label: "Samhällsekonomisk vinst", value: "35 mdr kr/år", icon: "chart" },
        { label: "Språk i matchningssystemet", value: "40+", icon: "globe" },
      ],
    },
    {
      id: 6, title: "Bosätt efter möjlighet, inte efter passivitet",
      subtitle: "Data som visar var jobben, skolorna och bostäderna finns – inte styrning, utan verkliga val",
      body: "Vi använder data för att se var jobben finns, var skolorna fungerar, var bostäderna finns och var vägen till egen försörjning är kortast. Inte för att styra människor som pjäser, utan för att ge dem bättre information och verkliga val. Ett nationellt verktyg ska kunna visa: här finns jobb inom ditt område, här finns språkutbildning, här finns rimlig pendling, här finns bostadsöppningar. Det är märkligt att vi accepterar mer intelligens i en reseapp än i statens beslut om människors framtid. I dag placeras människor i kommuner med hög arbetslöshet, dålig kollektivtrafik och få möjligheter – inte för att det är bäst för dem, utan för att det är enklast för systemet. Det är som att ge någon en karta utan vägar. Vi bygger kartan med vägar, realtidsdata och personliga rekommendationer. Varje kommun som tar emot nyanlända ska kunna visa exakt vilka möjligheter som finns – och mätas på hur väl de levererar.",
      quote: "Det är märkligt att vi accepterar mer intelligens i en reseapp än i statens beslut om människors framtid.",
      quoteAuthor: "", category: "Plattform & Onboarding",
      metrics: [
        { label: "Årlig investering", value: "8 mdr kr", icon: "money" },
        { label: "Kommuner med realtidsdata", value: "Alla 290", icon: "building" },
        { label: "Datapunkter per kommun", value: "200+", icon: "chart" },
        { label: "Berörda per år", value: "80 000", icon: "people" },
        { label: "Tid till egen försörjning (mål)", value: "-40%", icon: "clock" },
        { label: "Öppna datakällor", value: "50+", icon: "globe" },
      ],
    },
    {
      id: 7, title: "Barnen först, alltid",
      subtitle: "Digitalt rustade skolor för flerspråkighet – tekniken är stöd, läraren är ledare",
      body: "Varje nyanlänt barn ska möta en skola som är digitalt rustad för flerspråkighet. Inspelade genomgångar, översatta vårdnadshavarflöden, AI-stött språkstöd, digital studiehandledning, adaptiva övningar och enkla sätt för hem och skola att förstå varandra ska vara standard, inte projektpengar. Men principen är glasklar: tekniken är stöd, läraren är ledare. Vi ska inte bygga botskolor. Vi ska ge bra lärare mycket större räckvidd. Skolverket betonar tydliga ramar och läraransvar för AI i skolan – och det är precis rätt. Men ramarna ska möjliggöra, inte begränsa. Ett barn som talar dari hemma och svenska i skolan har inte ett språk för mycket – det har ett språk mer än de flesta. Varje skola med mer än 20% flerspråkiga elever får dubbla resurser, inte färre. Vi rekryterar 15 000 flerspråkiga pedagoger och betalar dem som specialister. OECD visar att tidiga utbildningsinsatser ger den högsta avkastningen av alla samhällsinvesteringar.",
      quote: "Vi ska inte bygga botskolor. Vi ska ge bra lärare mycket större räckvidd.",
      quoteAuthor: "", category: "Barn & Utbildning",
      metrics: [
        { label: "Årlig investering", value: "35 mdr kr", icon: "money" },
        { label: "Barn som nås", value: "350 000", icon: "people" },
        { label: "Nya flerspråkiga pedagoger", value: "15 000", icon: "people" },
        { label: "Avkastning per krona", value: "7:1 (OECD)", icon: "chart" },
        { label: "Språk i skolplattformen", value: "60+", icon: "globe" },
        { label: "Full utrullning", value: "3 år", icon: "clock" },
      ],
    },
    {
      id: 8, title: "Hård mot exploatering, mjuk mot människor",
      subtitle: "Dataanalys som avslöjar utnyttjande – och ett digitalt skyddsrum i fickan för arbetstagaren",
      body: "Vi använder dataanalys och AI för att upptäcka skenanställningar, orimliga lönenivåer, blufföretag, utnyttjande i underleverantörsled och misstänkta mönster av arbetslivskriminalitet långt tidigare än i dag. Samtidigt får arbetstagaren ett digitalt skyddsrum i fickan: kontrakt på sitt språk, lönekoll, rättighetsguide, enkel rapportering, anonym visselblåsning och direktkontakt till stöd. Tekniken ska inte bara hjälpa staten att kontrollera. Den ska hjälpa människan att förstå sin rätt och våga använda den. Arbetslivskriminalitet kostar samhället uppskattningsvis 100 miljarder kronor årligen i förlorade skatteintäkter, snedvriden konkurrens och mänskligt lidande. De som drabbas hårdast är de som har minst makt att försvara sig. Det är en pervers ironi att samma system som gör det svårt att få arbetstillstånd gör det lätt att bli utnyttjad. Vi vänder på det: enkelt att arbeta lagligt, omöjligt att utnyttja någon.",
      quote: "Tekniken ska inte bara hjälpa staten att kontrollera. Den ska hjälpa människan att förstå sin rätt och våga använda den.",
      quoteAuthor: "", category: "Rättsstat & Skydd",
      metrics: [
        { label: "Årlig investering", value: "8 mdr kr", icon: "money" },
        { label: "Arbetstagare med digitalt skydd", value: "500 000+", icon: "people" },
        { label: "Förväntad besparing", value: "30 mdr kr/år", icon: "chart" },
        { label: "Språk i skyddsrummet", value: "40+", icon: "globe" },
        { label: "Inspektioner med AI-stöd", value: "×5 fler", icon: "building" },
        { label: "Genomförandetid", value: "18 månader", icon: "clock" },
      ],
    },
    {
      id: 9, title: "Nolltolerans mot diskriminering",
      subtitle: "Anonymiserad gallring, färdighetsprov före magkänsla och AI-system som granskas för bias",
      body: "Vi gör upp med både analog och digital diskriminering. Offentlig rekrytering ska använda anonymiserad första gallring, färdighetsprov före magkänsla och löpande insyn i utfall. AI-system som används för matchning, urval eller stöd – särskilt i jobb och utbildning – måste kunna granskas, förklaras och stängas av om de reproducerar gamla fördomar. Det räcker inte att digitalisera orättvisor. Sverige ska bli landet som mäter bias lika seriöst som vi mäter budget. EU:s AI-förordning gäller redan stegvis och ger oss ett ramverk – men vi ska gå längre. Diskrimineringsombudsmannen får fyrdubblade resurser och rätt att utdöma kännbara böter. Flerspråkighet blir en formell merit i alla offentliga tjänster. Att tala tigrinja och svenska är inte bara lika bra som att bara tala svenska – det är bättre. Målet: inom fem år ska sysselsättningsgapet mellan inrikes och utrikes födda vara borta.",
      quote: "Det räcker inte att digitalisera orättvisor. Sverige ska bli landet som mäter bias lika seriöst som vi mäter budget.",
      quoteAuthor: "", category: "Rättsstat & Skydd",
      metrics: [
        { label: "Årlig investering", value: "6 mdr kr", icon: "money" },
        { label: "Berörda arbetsgivare", value: "85 000", icon: "building" },
        { label: "DO:s nya budget", value: "×4", icon: "money" },
        { label: "Mål: sysselsättningsgap", value: "0% (5 år)", icon: "chart" },
        { label: "AI-system under granskning", value: "Alla offentliga", icon: "globe" },
        { label: "Genomförandetid", value: "2 år", icon: "clock" },
      ],
    },
    {
      id: 10, title: "Digitalt medlemskap från dag ett",
      subtitle: "Säker digital identitet, myndighetspost och en tydlig nästa steg-funktion i mobilen",
      body: "Man ska inte behöva bli analog i ett digitalt land bara för att man just kommit hit. Från dag ett ska människor kunna få säker digital identitet, myndighetspost, samlad ärendeöversikt, bokningar, språkstöd, samhällsinformation och en tydlig nästa steg-funktion i mobilen. Det här är inte pynt. Det är infrastruktur. Det som i dag ser ut som ett personnummerproblem är ofta bara ett designproblem som staten ännu inte tagit på allvar. Digg har redan byggt ut e-legitimation för personer utan svenskt personnummer och fler inloggningsalternativ i offentliga e-tjänster. Grundarbetet är gjort. Nu behöver vi koppla ihop det till en sammanhängande upplevelse. Sverige rankas bland världens mest digitaliserade länder – men bara om du redan har ett personnummer, ett BankID och vet hur Skatteverket fungerar. För alla andra är Sverige fortfarande analogt, byråkratiskt och obegripligt. Det fixar vi.",
      quote: "Det som i dag ser ut som ett personnummerproblem är ofta bara ett designproblem som staten ännu inte tagit på allvar.",
      quoteAuthor: "", category: "Digital Infrastruktur",
      metrics: [
        { label: "Årlig investering", value: "12 mdr kr", icon: "money" },
        { label: "Berörda från dag ett", value: "200 000+/år", icon: "people" },
        { label: "Digitala tjänster i plattformen", value: "50+", icon: "building" },
        { label: "Språk i gränssnittet", value: "40+", icon: "globe" },
        { label: "Tid till digital identitet", value: "24 timmar", icon: "clock" },
        { label: "Digital exportpotential", value: "20 mdr kr/år", icon: "chart" },
      ],
    },
    {
      id: 11, title: "Europas enklaste land att starta företag i",
      subtitle: "Från tanke till registrerat bolag, moms, bank och första offert – i mobilen, på ditt språk",
      body: "Vi bygger ett flerspråkigt, AI-stött företagsspår där en idé kan gå från tanke till registrerat bolag, moms, bank, bokföringsstöd, första offert och första offentliga upphandling utan att man först måste bli expert på svensk myndighetssvenska. Sverige har allt att vinna på att se entreprenören i den som kommer hit, inte bara den framtida anställde. Internetlogik gäller här också: sänk trösklarna, öppna gränssnitten, låt fler bygga. Bolagsbyggandet ska få plats i mobilen, inte först i en pärm. Invandrare startar redan företag i högre grad än infödda svenskar – och de tar med sig globala nätverk, nya marknader och affärsidéer vi aldrig hade kommit på själva. I USA har invandrare grundat över hälften av alla unicorn-företag. Vi vill ha samma kraft här. Varje ny företagare får en AI-assistent för bokföring och regelefterlevnad, en mänsklig affärsmentor och tillgång till en Nystartsfond med mikrolån och rådgivning.",
      quote: "Internetlogik gäller här också: sänk trösklarna, öppna gränssnitten, låt fler bygga.",
      quoteAuthor: "", category: "Näringsliv & Entreprenörskap",
      metrics: [
        { label: "Fondkapital", value: "30 mdr kr", icon: "money" },
        { label: "Nya företag per år", value: "25 000", icon: "building" },
        { label: "Nya jobb (5 år)", value: "150 000", icon: "people" },
        { label: "Skatteintäkter (5 år)", value: "+45 mdr kr", icon: "chart" },
        { label: "Tid från idé till bolag", value: "1 dag", icon: "clock" },
        { label: "Språk i företagsspåret", value: "40+", icon: "globe" },
      ],
    },
    {
      id: 12, title: "Student till byggare av Sverige",
      subtitle: "Automatiskt digitalt övergångsspår från examen till jobb, forskning, startup eller offentlig tjänst",
      body: "Den som har lagt år av sitt liv på att studera här ska inte mötas av ett administrativt tack och hej. Vi ska ha ett automatiskt digitalt övergångsspår från examen till jobb, forskning, startup eller offentlig tjänst. AI kan hjälpa till att kartlägga kompetens, matcha mot bristyrken, hitta medgrundare och koppla människor till regionala innovationsmiljöer. Det dummaste ett kunskapsland kan göra är att utbilda global talang och sedan aktivt försvåra för den att stanna och bidra. Sverige investerar hundratals miljoner i varje internationell students utbildning – och sedan gör vi allt vi kan för att köra ut dem. Det är som att plantera ett träd, vattna det i fem år och sedan gräva upp det. Vi bygger istället en sömlös övergång: innan studenten tar examen har systemet redan kartlagt möjligheter, kopplat kontakter och föreslagit nästa steg. Uppehållstillstånd för arbete efter examen ska vara automatiskt, inte ett nytt byråkratiskt hinder.",
      quote: "Det dummaste ett kunskapsland kan göra är att utbilda global talang och sedan aktivt försvåra för den att stanna.",
      quoteAuthor: "", category: "Kompetens & Arbete",
      metrics: [
        { label: "Årlig investering", value: "5 mdr kr", icon: "money" },
        { label: "Internationella studenter/år", value: "40 000", icon: "people" },
        { label: "Mål: stannar efter examen", value: "70% (från 30%)", icon: "chart" },
        { label: "Automatiska övergångsspår", value: "4 (jobb/forskning/startup/offentligt)", icon: "building" },
        { label: "Innovationsmiljöer kopplade", value: "50+", icon: "globe" },
        { label: "Tid till uppehållstillstånd", value: "Automatiskt", icon: "clock" },
      ],
    },
    {
      id: 13, title: "Cirkulär rörlighet som styrka",
      subtitle: "Portabla meriter, digitala kompetensplånböcker och diasporan som nätverk – inte bortfall",
      body: "Vi ska sluta tänka att mobilitet bara har värde om den slutar i permanent stillastående. I en uppkopplad värld kan människor bidra till Sverige från Malmö, Mumbai och Madrid i olika faser av livet. Därför bygger vi portabla meriter, digitala kompetensplånböcker, enkla återinträden och starka diasporanätverk. Diasporan är inte ett bortfall. Den är ett nätverk. Sverige ska vara ett nav i människors liv, inte ett administrativt nålsöga. Den gamla modellen – kom hit, stanna för alltid, eller försvinn – passar inte en uppkopplad värld. Irland byggde sin techboom delvis genom sin diaspora. Israel har gjort samma sak. Indien likaså. Sverige har en global diaspora på hundratusentals människor med svenska utbildningar, svenska nätverk och svenska värderingar. Vi ska göra det löjligt enkelt att komma tillbaka, bidra på distans, investera, forska, undervisa och samarbeta – oavsett var i världen man befinner sig.",
      quote: "Diasporan är inte ett bortfall. Den är ett nätverk. Sverige ska vara ett nav i människors liv.",
      quoteAuthor: "", category: "Rörlighet & Nätverk",
      metrics: [
        { label: "Årlig investering", value: "4 mdr kr", icon: "money" },
        { label: "Svensk diaspora globalt", value: "500 000+", icon: "people" },
        { label: "Digitala kompetensplånböcker", value: "1 miljon", icon: "globe" },
        { label: "Återinträden per år (mål)", value: "25 000", icon: "people" },
        { label: "Diasporanätverk", value: "50 länder", icon: "globe" },
        { label: "Genomförandetid", value: "2 år", icon: "clock" },
      ],
    },
    {
      id: 14, title: "Snabb och förutsägbar rättsstat",
      subtitle: "Följ ditt ärende som ett paket – med bättre juridik och större värdighet",
      body: "Varje människa ska kunna följa sitt ärende som man i dag följer ett paket, fast med bättre juridik och större värdighet. Tydlig status, väntad handläggningstid, saknade handlingar, nästa steg, ansvarig funktion, översättning på eget språk. AI kan sammanfatta, strukturera, prioritera och flagga – men maktutövning får aldrig döljas bakom en svart låda. Långsam otydlighet är inte neutral. Det är ett politiskt val. I dag väntar människor i månader, ibland år, utan att veta var i processen de befinner sig. De ringer myndigheter som inte svarar. De skickar handlingar som försvinner. De lever i limbo medan deras liv tickar iväg. Det är inte rättssäkerhet – det är rättsosäkerhet. Vi bygger ett system där varje ärende har en tydlig tidslinje, där AI flaggar flaskhalsar innan de uppstår, och där ingen människa behöver ringa en myndighet för att få veta vad som händer med deras liv. IMY:s riktlinjer för AI i offentlig förvaltning ger oss ramverket – nu bygger vi verkligheten.",
      quote: "Långsam otydlighet är inte neutral. Det är ett politiskt val.",
      quoteAuthor: "", category: "Rättsstat & Skydd",
      metrics: [
        { label: "Årlig investering", value: "10 mdr kr", icon: "money" },
        { label: "Ärenden med realtidsstatus", value: "Alla", icon: "building" },
        { label: "Handläggningstid (mål)", value: "-50%", icon: "clock" },
        { label: "Språk i ärendesystemet", value: "40+", icon: "globe" },
        { label: "Berörda per år", value: "300 000+", icon: "people" },
        { label: "Överklaganden (mål)", value: "-60%", icon: "chart" },
      ],
    },
    {
      id: 15, title: "Integration som nationell elitgren",
      subtitle: "Öppen dashboard, öppna API:er och öppna testbäddar – det är så internet fungerar, och så ett modernt land borde fungera",
      body: "Vi bygger en öppen integrationsdashboard för hela landet. Kommun för kommun, myndighet för myndighet, i realtid där det går: tid till första jobb, tid till kompetensbesked, skolprogression, företagande, bostadsstabilitet, deltagande och tillit. Och vi öppnar data, API:er och testbäddar så att civilsamhälle, forskare, startups och kommuner kan bygga bättre lösningar ovanpå gemensam infrastruktur. Det är så internet fungerar. Det är också så ett modernt land borde fungera. Mät det som fungerar, sluta vinna debatter med anekdoter. Varje punkt i detta program får mätbara mål och en ansvarig minister. Resultaten presenteras i riksdagen och på den öppna plattformen – tillgänglig på 40 språk – där varje medborgare kan följa utvecklingen i sin kommun. Om vi misslyckas ska det synas. Om vi lyckas ska det firas. Vi skapar en oberoende integrationsmyndighet med mandat att granska, utvärdera och föreslå förändringar. Transparens är inte en svaghet – det är det starkaste verktyget vi har.",
      quote: "Mät det som fungerar. Sluta vinna debatter med anekdoter.",
      quoteAuthor: "", category: "Styrning & Transparens",
      metrics: [
        { label: "Årlig investering", value: "5 mdr kr", icon: "money" },
        { label: "Öppen dataplattform", value: "40+ språk", icon: "globe" },
        { label: "Ansvariga ministrar", value: "15 (en per punkt)", icon: "people" },
        { label: "Öppna API:er", value: "100+", icon: "building" },
        { label: "Uppföljningsfrekvens", value: "Realtid", icon: "clock" },
        { label: "Total programkostnad/år", value: "~200 mdr kr", icon: "money" },
      ],
    },
  ];
}

// ── Full English content (from client/src/lib/points-en.ts) ──────
function getEnPoints(): PolicyPoint[] {
  return [
    {
      id: 1, title: "One Sweden In, Not Fifteen Queues",
      subtitle: "A single digital path in – with a human guide and an AI guide in your pocket",
      body: "We're building a single path into Sweden: a digital onboarding experience, not an administrative obstacle course. Every person should encounter a unified interface where identity, documents, language support, health contact, school track, work track, and civic information are connected. There will be both a human guide and an AI guide in your pocket: AI translates, explains, summarizes, and warns when something is missing, while the caseworker makes assessments and takes responsibility. The state should function more like a smart platform and less like fifteen government islands playing ping-pong with people's lives. Today, people are sent between the Migration Agency, the Employment Service, the Tax Agency, the municipality, and the Social Insurance Agency as if that were a reasonable system. It isn't. It's a design problem. Digg has already approved e-identification for people without Swedish personal numbers and expanded identity matching – the tools exist, what's missing is will, pace, and design.",
      quote: "What today looks like an integration problem is often just a design problem the state hasn't taken seriously yet.",
      quoteAuthor: "", category: "Platform & Onboarding",
      metrics: [
        { label: "Annual investment", value: "SEK 18 bn", icon: "money" },
        { label: "People reached per year", value: "200,000+", icon: "people" },
        { label: "Agencies connected", value: "15+", icon: "building" },
        { label: "Processing time (target)", value: "-70%", icon: "chart" },
        { label: "Languages in AI guide", value: "40+", icon: "globe" },
        { label: "Full rollout", value: "24 months", icon: "clock" },
      ],
    },
    {
      id: 2, title: "100-Day Competence Guarantee",
      subtitle: "A digital competence passport that stops starting with suspicion",
      body: "We're introducing a digital competence passport. Degrees, certificates, work samples, references, and experience are uploaded once, read by machine, compared against Swedish requirements, and result in a clear answer: approved, supplement this, or here's an alternative track. AI is used to interpret documents, match against qualification requirements, and suggest supplements. The human makes the decision, but the system must stop starting with suspicion. A piece of paper that doesn't fit a Swedish folder shouldn't erase an entire working life. Today, validation of foreign qualifications takes an average of 18 months. During that time, surgeons drive taxis and engineers clean stairwells – not because driving a taxi or cleaning is wrong, but because we're wasting competence we desperately need. It's not just unfair, it's economic insanity. Sweden ranks second in the Global Innovation Index – imagine what we could do if we actually used all the competence that's already here.",
      quote: "A piece of paper that doesn't fit a Swedish folder shouldn't erase an entire working life.",
      quoteAuthor: "", category: "Competence & Work",
      metrics: [
        { label: "Annual investment", value: "SEK 15 bn", icon: "money" },
        { label: "Validations per year", value: "90,000", icon: "people" },
        { label: "Max time to decision", value: "100 days", icon: "clock" },
        { label: "Societal savings", value: "SEK 40 bn/year", icon: "chart" },
        { label: "Regional validation centres", value: "50", icon: "building" },
        { label: "Industries in system", value: "120+", icon: "globe" },
      ],
    },
    {
      id: 3, title: "Swedish Through Work, Not Before Work",
      subtitle: "A personal AI language coach in your pocket – connected to your job, your education, your everyday life",
      body: "Everyone who needs it gets Swedish in their pocket: a personal language coach with speech training, occupational vocabulary, dialogue simulations, real-time translation, and feedback connected to the specific job, education, or everyday life they're in. We shouldn't have a model where people first wait for years to become sufficiently Swedish before they start contributing. Language is best learned when it's used, and AI makes it possible to practice a little, often, relevantly, and at your own level. This is perhaps the most underestimated lever of all. The OECD highlights AI as particularly promising for language training in integration. A Somali-speaking doctor can save lives in Somali while learning Swedish. An Arabic-speaking engineer can solve technical problems in Arabic from the first week. Parallel competence and parallel language – not sequential. SFI in its current form is a waiting hall, not a runway. We're rebuilding it from the ground up.",
      quote: "Language is best learned when it's used. Not in a classroom you waited a year to enter.",
      quoteAuthor: "", category: "Language & Learning",
      metrics: [
        { label: "Annual investment", value: "SEK 22 bn", icon: "money" },
        { label: "People reached per year", value: "180,000", icon: "people" },
        { label: "Languages in AI coach", value: "40+", icon: "globe" },
        { label: "Expected GDP effect", value: "+0.8% annually", icon: "chart" },
        { label: "Career tracks with parallel language", value: "80+", icon: "building" },
        { label: "Full rollout", value: "18 months", icon: "clock" },
      ],
    },
    {
      id: 4, title: "National Fast Track to Shortage Professions",
      subtitle: "Digital fast tracks with validation, simulations, and AI-supported knowledge tests",
      body: "We're building digital fast tracks to shortage professions with validation, simulations, AI-supported knowledge tests, supervised practice, and paid supplementation. A nurse shouldn't have to start from zero because the state lacks imagination, and an electrician shouldn't get stuck between PDFs and binders. Technology should be used to compress the path to Swedish licensure, not to create more waiting rooms. When someone knows the job, the system should help prove it faster. Sweden currently has staff shortages in over 100 occupational categories – from assistant nurses to civil engineers, from welders to specialist doctors. Meanwhile, we have tens of thousands of people with exactly that competence stuck in a system designed to slow down. It's like having a highway with a speed limit of 30. We're removing the unnecessary speed limits.",
      quote: "Technology should compress the path to Swedish licensure, not create more waiting rooms.",
      quoteAuthor: "", category: "Competence & Work",
      metrics: [
        { label: "Annual investment", value: "SEK 12 bn", icon: "money" },
        { label: "Fast tracks in shortage professions", value: "100+", icon: "building" },
        { label: "Participants per year", value: "45,000", icon: "people" },
        { label: "Time to licensure (target)", value: "-60%", icon: "clock" },
        { label: "Societal savings", value: "SEK 25 bn/year", icon: "chart" },
        { label: "Internship placements", value: "30,000/year", icon: "people" },
      ],
    },
    {
      id: 5, title: "First Real Job Within 180 Days",
      subtitle: "From CV theater to competence proof – AI matching that sees potential, not templates",
      body: "We're moving from CV theater to competence proof. AI-supported matching can connect people with employers based on skills, language progression, work samples, references, and actual potential – not just Swedish templates for cover letters. Every person gets a combination of a digital coach and a human job matcher. AI should replace waiting, not people. We must stop pretending that CV writing is integration. Today, it takes an average of over two years for a newly arrived person to get their first real job. Two years of waiting, uncertainty, and competence loss. It's not just an individual problem – it's a system failure. Employers are screaming for competence while competence sits in waiting rooms. We're building the bridge between them with technology that sees what people can do, not just what they've written on a piece of paper.",
      quote: "We must stop pretending that CV writing is integration.",
      quoteAuthor: "", category: "Competence & Work",
      metrics: [
        { label: "Annual investment", value: "SEK 10 bn", icon: "money" },
        { label: "Matches per year", value: "120,000", icon: "people" },
        { label: "Target: time to first job", value: "180 days", icon: "clock" },
        { label: "Employers in network", value: "50,000+", icon: "building" },
        { label: "Socioeconomic gain", value: "SEK 35 bn/year", icon: "chart" },
        { label: "Languages in matching system", value: "40+", icon: "globe" },
      ],
    },
    {
      id: 6, title: "Settle by Opportunity, Not by Passivity",
      subtitle: "Data showing where the jobs, schools, and housing are – not control, but real choices",
      body: "We use data to see where the jobs are, where schools work, where housing exists, and where the path to self-sufficiency is shortest. Not to control people like chess pieces, but to give them better information and real choices. A national tool should be able to show: here are jobs in your field, here's language training, here's reasonable commuting, here are housing openings. It's strange that we accept more intelligence in a travel app than in the state's decisions about people's futures. Today, people are placed in municipalities with high unemployment, poor public transport, and few opportunities – not because it's best for them, but because it's easiest for the system. It's like giving someone a map without roads. We're building the map with roads, real-time data, and personal recommendations. Every municipality that receives newcomers should be able to show exactly what opportunities exist – and be measured on how well they deliver.",
      quote: "It's strange that we accept more intelligence in a travel app than in the state's decisions about people's futures.",
      quoteAuthor: "", category: "Platform & Onboarding",
      metrics: [
        { label: "Annual investment", value: "SEK 8 bn", icon: "money" },
        { label: "Municipalities with real-time data", value: "All 290", icon: "building" },
        { label: "Data points per municipality", value: "200+", icon: "chart" },
        { label: "People reached per year", value: "80,000", icon: "people" },
        { label: "Time to self-sufficiency (target)", value: "-40%", icon: "clock" },
        { label: "Open data sources", value: "50+", icon: "globe" },
      ],
    },
    {
      id: 7, title: "Children First, Always",
      subtitle: "Digitally equipped schools for multilingualism – technology supports, the teacher leads",
      body: "Every newly arrived child should meet a school that is digitally equipped for multilingualism. Recorded lessons, translated guardian flows, AI-supported language support, digital study guidance, adaptive exercises, and simple ways for home and school to understand each other should be standard, not project funding. But the principle is crystal clear: technology supports, the teacher leads. We shouldn't build bot schools. We should give good teachers much greater reach. The National Agency for Education emphasizes clear frameworks and teacher responsibility for AI in schools – and that's exactly right. But the frameworks should enable, not restrict. A child who speaks Dari at home and Swedish at school doesn't have one language too many – they have one more language than most. Every school with more than 20% multilingual students gets double resources, not fewer. We recruit 15,000 multilingual educators and pay them as specialists. The OECD shows that early educational interventions yield the highest return of all societal investments.",
      quote: "We shouldn't build bot schools. We should give good teachers much greater reach.",
      quoteAuthor: "", category: "Children & Education",
      metrics: [
        { label: "Annual investment", value: "SEK 35 bn", icon: "money" },
        { label: "Children reached", value: "350,000", icon: "people" },
        { label: "New multilingual educators", value: "15,000", icon: "people" },
        { label: "Return per krona", value: "7:1 (OECD)", icon: "chart" },
        { label: "Languages in school platform", value: "60+", icon: "globe" },
        { label: "Full rollout", value: "3 years", icon: "clock" },
      ],
    },
    {
      id: 8, title: "Hard on Exploitation, Soft on People",
      subtitle: "Data analysis that exposes exploitation – and a digital safe room in the worker's pocket",
      body: "We use data analysis and AI to detect sham employment, unreasonable wage levels, fraudulent companies, exploitation in subcontractor chains, and suspected patterns of labor crime far earlier than today. At the same time, the worker gets a digital safe room in their pocket: contracts in their language, wage checks, rights guide, simple reporting, anonymous whistleblowing, and direct contact to support. Technology shouldn't just help the state control. It should help people understand their rights and dare to use them. Labor crime costs society an estimated 100 billion kronor annually in lost tax revenue, distorted competition, and human suffering. Those hit hardest are those with the least power to defend themselves. It's a perverse irony that the same system that makes it hard to get a work permit makes it easy to be exploited. We're reversing that: easy to work legally, impossible to exploit someone.",
      quote: "Technology shouldn't just help the state control. It should help people understand their rights and dare to use them.",
      quoteAuthor: "", category: "Rule of Law & Protection",
      metrics: [
        { label: "Annual investment", value: "SEK 8 bn", icon: "money" },
        { label: "Workers with digital protection", value: "500,000+", icon: "people" },
        { label: "Expected savings", value: "SEK 30 bn/year", icon: "chart" },
        { label: "Languages in safe room", value: "40+", icon: "globe" },
        { label: "Inspections with AI support", value: "×5 more", icon: "building" },
        { label: "Implementation time", value: "18 months", icon: "clock" },
      ],
    },
    {
      id: 9, title: "Zero Tolerance for Discrimination",
      subtitle: "Anonymized screening, skills tests before gut feeling, and AI systems audited for bias",
      body: "We're confronting both analog and digital discrimination. Public recruitment must use anonymized first screening, skills tests before gut feeling, and ongoing transparency in outcomes. AI systems used for matching, selection, or support – especially in jobs and education – must be auditable, explainable, and possible to shut down if they reproduce old prejudices. It's not enough to digitize injustice. Sweden should become the country that measures bias as seriously as we measure budgets. The EU AI Act already applies in stages and gives us a framework – but we'll go further. The Equality Ombudsman gets quadrupled resources and the right to impose significant fines. Multilingualism becomes a formal merit in all public services. Speaking Tigrinya and Swedish isn't just as good as speaking only Swedish – it's better. The goal: within five years, the employment gap between native and foreign-born should be gone.",
      quote: "It's not enough to digitize injustice. Sweden should become the country that measures bias as seriously as we measure budgets.",
      quoteAuthor: "", category: "Rule of Law & Protection",
      metrics: [
        { label: "Annual investment", value: "SEK 6 bn", icon: "money" },
        { label: "Employers affected", value: "85,000", icon: "building" },
        { label: "Equality Ombudsman new budget", value: "×4", icon: "money" },
        { label: "Target: employment gap", value: "0% (5 years)", icon: "chart" },
        { label: "AI systems under audit", value: "All public", icon: "globe" },
        { label: "Implementation time", value: "2 years", icon: "clock" },
      ],
    },
    {
      id: 10, title: "Digital Membership from Day One",
      subtitle: "Secure digital identity, government mail, and a clear next-step function on your phone",
      body: "You shouldn't have to become analog in a digital country just because you just arrived. From day one, people should be able to get secure digital identity, government mail, a consolidated case overview, bookings, language support, civic information, and a clear next-step function on their phone. This isn't decoration. It's infrastructure. What today looks like a personal number problem is often just a design problem the state hasn't taken seriously yet. Digg has already expanded e-identification for people without Swedish personal numbers and more login options in public e-services. The groundwork is done. Now we need to connect it into a coherent experience. Sweden ranks among the world's most digitalized countries – but only if you already have a personal number, a BankID, and know how the Tax Agency works. For everyone else, Sweden is still analog, bureaucratic, and incomprehensible. We're fixing that.",
      quote: "What today looks like a personal number problem is often just a design problem the state hasn't taken seriously yet.",
      quoteAuthor: "", category: "Digital Infrastructure",
      metrics: [
        { label: "Annual investment", value: "SEK 12 bn", icon: "money" },
        { label: "People reached from day one", value: "200,000+/year", icon: "people" },
        { label: "Digital services in platform", value: "50+", icon: "building" },
        { label: "Languages in interface", value: "40+", icon: "globe" },
        { label: "Time to digital identity", value: "24 hours", icon: "clock" },
        { label: "Digital export potential", value: "SEK 20 bn/year", icon: "chart" },
      ],
    },
    {
      id: 11, title: "Europe's Easiest Country to Start a Business In",
      subtitle: "From idea to registered company, VAT, bank, and first quote – on your phone, in your language",
      body: "We're building a multilingual, AI-supported business track where an idea can go from thought to registered company, VAT, bank, accounting support, first quote, and first public procurement without first having to become an expert in Swedish government language. Sweden has everything to gain from seeing the entrepreneur in those who come here, not just the future employee. Internet logic applies here too: lower the thresholds, open the interfaces, let more people build. Company building should fit in your phone, not first in a binder. Immigrants already start businesses at a higher rate than native Swedes – and they bring global networks, new markets, and business ideas we never would have thought of ourselves. In the US, immigrants have founded over half of all unicorn companies. We want the same force here. Every new entrepreneur gets an AI assistant for accounting and compliance, a human business mentor, and access to a New Start Fund with microloans and advisory services.",
      quote: "Internet logic applies here too: lower the thresholds, open the interfaces, let more people build.",
      quoteAuthor: "", category: "Business & Entrepreneurship",
      metrics: [
        { label: "Fund capital", value: "SEK 30 bn", icon: "money" },
        { label: "New companies per year", value: "25,000", icon: "building" },
        { label: "New jobs (5 years)", value: "150,000", icon: "people" },
        { label: "Tax revenue (5 years)", value: "+SEK 45 bn", icon: "chart" },
        { label: "Time from idea to company", value: "1 day", icon: "clock" },
        { label: "Languages in business track", value: "40+", icon: "globe" },
      ],
    },
    {
      id: 12, title: "Student to Builder of Sweden",
      subtitle: "Automatic digital transition track from graduation to employment, research, startup, or public service",
      body: "Those who have spent years of their life studying here shouldn't be met with an administrative 'thanks and goodbye.' We need an automatic digital transition track from graduation to employment, research, startup, or public service. AI can help map competence, match against shortage professions, find co-founders, and connect people to regional innovation environments. The dumbest thing a knowledge country can do is educate global talent and then actively make it harder for them to stay and contribute. Sweden invests hundreds of millions in every international student's education – and then we do everything we can to push them out. It's like planting a tree, watering it for five years, and then digging it up. Instead, we're building a seamless transition: before the student graduates, the system has already mapped opportunities, connected contacts, and suggested next steps. Residence permits for work after graduation should be automatic, not a new bureaucratic hurdle.",
      quote: "The dumbest thing a knowledge country can do is educate global talent and then actively make it harder for them to stay.",
      quoteAuthor: "", category: "Competence & Work",
      metrics: [
        { label: "Annual investment", value: "SEK 5 bn", icon: "money" },
        { label: "International students/year", value: "40,000", icon: "people" },
        { label: "Target: stay after graduation", value: "70% (from 30%)", icon: "chart" },
        { label: "Automatic transition tracks", value: "4 (employment/research/startup/public)", icon: "building" },
        { label: "Innovation environments connected", value: "50+", icon: "globe" },
        { label: "Time to residence permit", value: "Automatic", icon: "clock" },
      ],
    },
    {
      id: 13, title: "Circular Mobility as Strength",
      subtitle: "Portable credentials, digital competence wallets, and the diaspora as network – not loss",
      body: "We must stop thinking that mobility only has value if it ends in permanent standstill. In a connected world, people can contribute to Sweden from Malmö, Mumbai, and Madrid at different stages of life. That's why we're building portable credentials, digital competence wallets, easy re-entries, and strong diaspora networks. The diaspora is not a loss. It's a network. Sweden should be a hub in people's lives, not an administrative needle's eye. The old model – come here, stay forever, or disappear – doesn't fit a connected world. Ireland built its tech boom partly through its diaspora. Israel has done the same. India likewise. Sweden has a global diaspora of hundreds of thousands of people with Swedish educations, Swedish networks, and Swedish values. We'll make it ridiculously easy to come back, contribute remotely, invest, research, teach, and collaborate – regardless of where in the world you are.",
      quote: "The diaspora is not a loss. It's a network. Sweden should be a hub in people's lives.",
      quoteAuthor: "", category: "Mobility & Networks",
      metrics: [
        { label: "Annual investment", value: "SEK 4 bn", icon: "money" },
        { label: "Swedish diaspora globally", value: "500,000+", icon: "people" },
        { label: "Digital competence wallets", value: "1 million", icon: "globe" },
        { label: "Re-entries per year (target)", value: "25,000", icon: "people" },
        { label: "Diaspora networks", value: "50 countries", icon: "globe" },
        { label: "Implementation time", value: "2 years", icon: "clock" },
      ],
    },
    {
      id: 14, title: "Fast and Predictable Rule of Law",
      subtitle: "Track your case like a package – with better law and greater dignity",
      body: "Every person should be able to track their case like you track a package today, but with better law and greater dignity. Clear status, expected processing time, missing documents, next steps, responsible function, translation in your own language. AI can summarize, structure, prioritize, and flag – but the exercise of power must never be hidden behind a black box. Slow ambiguity is not neutral. It's a political choice. Today, people wait months, sometimes years, without knowing where in the process they are. They call authorities that don't answer. They send documents that disappear. They live in limbo while their lives tick away. That's not legal certainty – it's legal uncertainty. We're building a system where every case has a clear timeline, where AI flags bottlenecks before they arise, and where no person needs to call an authority to find out what's happening with their life. IMY's guidelines for AI in public administration give us the framework – now we're building the reality.",
      quote: "Slow ambiguity is not neutral. It's a political choice.",
      quoteAuthor: "", category: "Rule of Law & Protection",
      metrics: [
        { label: "Annual investment", value: "SEK 10 bn", icon: "money" },
        { label: "Cases with real-time status", value: "All", icon: "building" },
        { label: "Processing time (target)", value: "-50%", icon: "clock" },
        { label: "Languages in case system", value: "40+", icon: "globe" },
        { label: "People reached per year", value: "300,000+", icon: "people" },
        { label: "Appeals (target)", value: "-60%", icon: "chart" },
      ],
    },
    {
      id: 15, title: "Integration as a National Elite Discipline",
      subtitle: "Open dashboard, open APIs, and open test beds – that's how the internet works, and how a modern country should work",
      body: "We're building an open integration dashboard for the entire country. Municipality by municipality, agency by agency, in real-time where possible: time to first job, time to competence assessment, school progression, entrepreneurship, housing stability, participation, and trust. And we open data, APIs, and test beds so that civil society, researchers, startups, and municipalities can build better solutions on shared infrastructure. That's how the internet works. That's also how a modern country should work. Measure what works, stop winning debates with anecdotes. Every point in this program gets measurable goals and a responsible minister. Results are presented in parliament and on the open platform – accessible in 40 languages – where every citizen can follow developments in their municipality. If we fail, it should be visible. If we succeed, it should be celebrated. We're creating an independent integration authority with a mandate to review, evaluate, and propose changes. Transparency is not a weakness – it's the strongest tool we have.",
      quote: "Measure what works. Stop winning debates with anecdotes.",
      quoteAuthor: "", category: "Governance & Transparency",
      metrics: [
        { label: "Annual investment", value: "SEK 5 bn", icon: "money" },
        { label: "Open data platform", value: "40+ languages", icon: "globe" },
        { label: "Responsible ministers", value: "15 (one per point)", icon: "people" },
        { label: "Open APIs", value: "100+", icon: "building" },
        { label: "Monitoring frequency", value: "Real-time", icon: "clock" },
        { label: "Total program cost/year", value: "~SEK 200 bn", icon: "money" },
      ],
    },
  ];
}
