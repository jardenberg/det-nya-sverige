/**
 * Debate analysis data – structured content for the debate analysis pages.
 * Each debate gets its own entry with metadata, summary, point-by-point matching,
 * party rankings, and JJ commentary.
 */

export interface PointMatch {
  pointId: number;
  pointTitle: string;
  relevance: "direct" | "indirect" | "none";
  closestParties: string[];
  comment: string;
}

export interface PartyRanking {
  party: string;
  abbreviation: string;
  score: number;
  maxScore: number;
  reasoning: string;
}

export interface DebateSection {
  title: string;
  titleEn: string;
  facts: string[];
  factsEn: string[];
  quotes: { text: string; speaker: string }[];
  connection: string;
  connectionEn: string;
  jjComment: string;
  jjCommentEn: string;
}

export interface DebateAnalysis {
  id: string;
  date: string;
  title: string;
  titleEn: string;
  subtitle: string;
  subtitleEn: string;
  source: string;
  duration: string;
  participants: string[];
  summary: string;
  summaryEn: string;
  sections: DebateSection[];
  pointMatches: PointMatch[];
  partyRankings: PartyRanking[];
  missingThemes: { theme: string; themeEn: string; points: string; comment: string; commentEn: string }[];
  conclusion: string;
  conclusionEn: string;
  jjFinalComment: string;
  jjFinalCommentEn: string;
  pdfUrl: string;
  mdUrl: string;
  transcriptUrl: string;
  transcriptLabel: string;
  transcriptLabelEn: string;
  ogDescription: string;
  ogDescriptionEn: string;
}

export const debates: DebateAnalysis[] = [
  {
    id: "svt-partiledardebatt-2026-05",
    date: "2026-05-03",
    title: "SVT Partiledardebatt (Agenda)",
    titleEn: "SVT Party Leader Debate (Agenda)",
    subtitle: "Åtta partiledare, fyra huvudämnen, noll omnämnanden av AI i integration",
    subtitleEn: "Eight party leaders, four main topics, zero mentions of AI in integration",
    source: "SVT Agenda",
    duration: "2 timmar",
    participants: [
      "Ulf Kristersson (M)",
      "Jimmie Åkesson (SD)",
      "Magdalena Andersson (S)",
      "Amanda Lind (MP)",
      "Elisabeth Thand Ringqvist (C)",
      "Ebba Busch (KD)",
      "Nooshi Dadgostar (V)",
      "Simona Mohamsson (L)",
    ],
    summary: `SVT:s partiledardebatt 2026 varade i två timmar och täckte fyra huvudämnen: energi, sjukvård, ekonomi och migration. Debatten kretsade nästan uteslutande kring traditionella politiska konfliktlinjer: kärnkraft vs vindkraft, skattesänkningar vs välfärdsinvesteringar, stram vs human migrationspolitik. Det som saknades var påfallande: ingen partiledare nämnde digitalisering som integrationshävstång, ingen talade om AI i offentlig förvaltning, ingen lyfte kompetensvalidering som systemfråga, och ingen föreslog att staten borde fungera som plattform snarare än som byråkratisk hinderbana.`,
    summaryEn: `SVT's party leader debate 2026 lasted two hours and covered four main topics: energy, healthcare, economy and migration. The debate revolved almost exclusively around traditional political conflict lines: nuclear vs wind power, tax cuts vs welfare investments, strict vs humane migration policy. What was missing was striking: no party leader mentioned digitalisation as an integration lever, no one spoke about AI in public administration, no one raised competence validation as a system issue, and no one proposed that the state should function as a platform rather than a bureaucratic obstacle course.`,
    sections: [
      {
        title: "Energi och el",
        titleEn: "Energy and electricity",
        facts: [
          "Tidöpartierna (M, SD, KD, L) försvarade sin satsning på ny kärnkraft",
          "Oppositionen (S, V, MP, C) kritiserade att vindkraftsutbyggnaden bromsats",
          "C hävdade att kärnkraftskostnaden uppgår till 850 miljarder kronor",
          "KD hävdade att installerad elkapacitet ökat med 7 000 MW under mandatperioden",
        ],
        factsEn: [
          "Tidö parties (M, SD, KD, L) defended their investment in new nuclear power",
          "Opposition (S, V, MP, C) criticised the slowdown of wind power expansion",
          "C claimed nuclear power costs amount to 850 billion SEK",
          "KD claimed installed electricity capacity increased by 7,000 MW during the term",
        ],
        quotes: [
          { text: "Jag är så trött på den här vindkraftspopulismen.", speaker: "Jimmie Åkesson (SD)" },
          { text: "Åttahundrafemtio miljarder kronor, nästan tusen miljarder om man räknar ihop alla subventioner.", speaker: "Elisabeth Thand Ringqvist (C)" },
        ],
        connection: "Energifrågan berör inte direkt någon av de 15 punkterna. Dock finns en indirekt koppling: punkt 4 (snabbfil till bristyrken) är relevant eftersom Simona Mohamsson (L) påpekade att energiomställningen kräver fler ingenjörer.",
        connectionEn: "The energy issue does not directly touch any of the 15 points. However, there is an indirect connection: point 4 (fast track to shortage occupations) is relevant since Simona Mohamsson (L) pointed out that the energy transition requires more engineers.",
        jjComment: "Energidebatten illustrerar exakt det problem som punkt 15 adresserar: vi debatterar med anekdoter och ideologi istället för att mäta vad som fungerar. Ingen partiledare refererade till data om faktisk energiproduktion per krona investerad. En öppen dashboard med realtidsdata hade gjort den här debatten mer produktiv och mindre teater.",
        jjCommentEn: "The energy debate illustrates exactly the problem that point 15 addresses: we debate with anecdotes and ideology instead of measuring what works. No party leader referenced data on actual energy production per krona invested. An open dashboard with real-time data would have made this debate more productive and less theatre.",
      },
      {
        title: "Sjukvård och vårdköer",
        titleEn: "Healthcare and waiting lists",
        facts: [
          "124 000 läkarbesök hos specialister blev inte av i tid (mars 2026)",
          "44 000 patienter väntade mer än 3 månader på operation",
          "Norrbotten: 61% väntade mer än 3 månader; Jönköping: 9%",
          "800 000 svenskar hade privat vårdförsäkring 2024",
          "BUP-köer: 100% fick vård i tid i Blekinge, bara 11% i Västernorrland",
        ],
        factsEn: [
          "124,000 specialist doctor visits did not happen on time (March 2026)",
          "44,000 patients waited more than 3 months for surgery",
          "Norrbotten: 61% waited more than 3 months; Jönköping: 9%",
          "800,000 Swedes had private health insurance in 2024",
          "Child psychiatry queues: 100% got care on time in Blekinge, only 11% in Västernorrland",
        ],
        quotes: [
          { text: "Sjukvård före skattesänkningar.", speaker: "Magdalena Andersson (S)" },
          { text: "Vi vill förstatliga vården.", speaker: "Ebba Busch (KD)" },
        ],
        connection: "Sjukvårdsdebatten berör inte direkt de 15 punkterna, men illustrerar samma systemfel. Punkt 1 (ett Sverige in) handlar om att staten ska sluta vara 'femton myndighetsöar som spelar pingis med människors liv'. Exakt samma kritik gäller sjukvården med 21 regioner.",
        connectionEn: "The healthcare debate does not directly touch the 15 points, but illustrates the same system failure. Point 1 (one Sweden in) is about the state stopping being 'fifteen agency islands playing ping-pong with people's lives'. The exact same criticism applies to healthcare with 21 regions.",
        jjComment: "Det mest slående var att ingen partiledare nämnde digitalisering som lösning. Inte AI-stödd triagering, inte digital vårdplanering, inte realtidsdata om vårdköer. Det är exakt den logik som punkt 7 tillämpar på skolan: 'Vi ska inte bygga botskolor. Vi ska ge bra lärare mycket större räckvidd.' Samma princip gäller vården.",
        jjCommentEn: "The most striking thing was that no party leader mentioned digitalisation as a solution. Not AI-supported triage, not digital care planning, not real-time data on waiting lists. This is exactly the logic that point 7 applies to schools: 'We shall not build bot-schools. We shall give good teachers much greater reach.' The same principle applies to healthcare.",
      },
      {
        title: "Ekonomi, tillväxt och arbetslöshet",
        titleEn: "Economy, growth and unemployment",
        facts: [
          "Tillväxt 2025: 1,5%",
          "Arbetslöshet: 8,7% (ca 500 000 personer)",
          "118 000 inskrivna på Arbetsförmedlingen har eftergymnasial utbildning",
          "270 000 långtidsarbetslösa, varav nära 2/3 utrikes födda",
          "Arbetslösheten sjunkit 9 månader i rad (regeringens siffra)",
        ],
        factsEn: [
          "Growth 2025: 1.5%",
          "Unemployment: 8.7% (approx. 500,000 people)",
          "118,000 registered at the Employment Agency have post-secondary education",
          "270,000 long-term unemployed, of which nearly 2/3 foreign-born",
          "Unemployment has fallen for 9 consecutive months (government figure)",
        ],
        quotes: [
          { text: "Ersätt SFI med jobbsvenska.", speaker: "Elisabeth Thand Ringqvist (C)" },
          { text: "60% av arbetslösheten är utrikes födda.", speaker: "Ulf Kristersson (M)" },
        ],
        connection: "Här finns de starkaste kopplingarna. Arbetslöshetsdebatten berör direkt punkt 2 (kompetensvalidering), punkt 3 (svenska genom arbete), punkt 4 (snabbfil till bristyrken), punkt 5 (första jobb inom 180 dagar) och punkt 6 (bosättning efter möjlighet). Elisabeth Thand Ringqvist (C) kom närmast med sitt 'jobbsvenska'-förslag.",
        connectionEn: "This is where the strongest connections are. The unemployment debate directly touches point 2 (competence validation), point 3 (Swedish through work), point 4 (fast track to shortage occupations), point 5 (first job within 180 days) and point 6 (settlement by opportunity). Elisabeth Thand Ringqvist (C) came closest with her 'job Swedish' proposal.",
        jjComment: "Det mest frustrerande var att alla partier diskuterade arbetslöshet som om det vore ett endimensionellt problem som löses med antingen skattesänkningar (höger) eller bidragshöjningar (vänster). Ingen nämnde att 270 000 långtidsarbetslösa inte är en homogen grupp. Ingen föreslog AI-stödd matchning. Ingen talade om kompetensvalidering som systemfråga. Det här är kärnan i de 15 punkterna: problemet är inte människor, det är friktion. Och friktionen diskuterades inte en enda gång.",
        jjCommentEn: "The most frustrating thing was that all parties discussed unemployment as if it were a one-dimensional problem solved by either tax cuts (right) or benefit increases (left). No one mentioned that 270,000 long-term unemployed are not a homogeneous group. No one proposed AI-supported matching. No one spoke about competence validation as a system issue. This is the core of the 15 points: the problem is not people, it's friction. And friction was not discussed a single time.",
      },
      {
        title: "Migration och integration",
        titleEn: "Migration and integration",
        facts: [
          "6 700 asylsökande 2025 (historiskt lågt)",
          "9 700 ukrainare sökte skydd via massflyktsdirektivet",
          "165 000 barn lever i utanförskapsområden (Mohamsson)",
          "Nästan 250 000 lever under hedersförtryck (Busch)",
          "76% av svenska folket vill inte se tonårsutvisningarna (Lind)",
        ],
        factsEn: [
          "6,700 asylum seekers in 2025 (historically low)",
          "9,700 Ukrainians sought protection via the mass flight directive",
          "165,000 children live in exclusion areas (Mohamsson)",
          "Nearly 250,000 live under honour-based oppression (Busch)",
          "76% of the Swedish public oppose teenage deportations (Lind)",
        ],
        quotes: [
          { text: "Den som tillför, lär sig svenska, den ska få stanna. Den som förstör, den som visar att den inte vill vara en del av det svenska samhället, ja, då är man i fel land.", speaker: "Simona Mohamsson (L)" },
          { text: "Det här handlar inte om migration. Det här är ju en deporteringspolitik.", speaker: "Nooshi Dadgostar (V)" },
        ],
        connection: "Migrationsdebatten är det område där de 15 punkterna har mest att säga, men där debatten var som mest frånkopplad från dem. Hela debatten handlade om vem som ska få stanna och vem som ska utvisas. Ingen partiledare diskuterade hur de som stannar faktiskt ska integreras.",
        connectionEn: "The migration debate is the area where the 15 points have the most to say, but where the debate was most disconnected from them. The entire debate was about who gets to stay and who gets deported. No party leader discussed how those who stay should actually be integrated.",
        jjComment: "Det här var debattens mest avslöjande moment. Alla partier har en åsikt om tonårsutvisningar. Ingen har en plan för integration. Simona Mohamsson nämnde att 165 000 barn lever i utanförskapsområden. Ebba Busch nämnde att 250 000 lever under hedersförtryck. Men ingen av dem föreslog en enda konkret åtgärd för att förändra det. Inte en. Det är som att diskutera brandkåren utan att nämna vatten. De 15 punkterna är vattnet.",
        jjCommentEn: "This was the debate's most revealing moment. All parties have an opinion on teenage deportations. None has a plan for integration. Simona Mohamsson mentioned that 165,000 children live in exclusion areas. Ebba Busch mentioned that 250,000 live under honour-based oppression. But neither of them proposed a single concrete measure to change it. Not one. It's like discussing the fire brigade without mentioning water. The 15 points are the water.",
      },
    ],
    pointMatches: [
      { pointId: 1, pointTitle: "Ett Sverige in, inte femton köer", relevance: "none", closestParties: [], comment: "Ingen nämnde digital onboarding eller samordnad myndighetsplattform" },
      { pointId: 2, pointTitle: "100-dagarsgaranti för kompetens", relevance: "indirect", closestParties: ["C"], comment: "ETR nämnde yrkesutbildningar och 'arbetssvenska' men inte kompetensvalidering som system" },
      { pointId: 3, pointTitle: "Svenska genom arbete, inte före arbete", relevance: "indirect", closestParties: ["C", "L"], comment: "ETR föreslog 'jobbsvenska' istället för SFI. Ingen nämnde AI-språkcoach" },
      { pointId: 4, pointTitle: "Nationell snabbfil till bristyrken", relevance: "indirect", closestParties: ["L", "M"], comment: "Mohamsson nämnde yrkesutbildning. Kristersson talade om bristyrken. Ingen föreslog digitala snabbspår" },
      { pointId: 5, pointTitle: "Första riktiga jobbet inom 180 dagar", relevance: "indirect", closestParties: ["C", "KD"], comment: "Diskussion om långtidsarbetslöshet och drivkrafter, men ingen föreslog AI-matchning" },
      { pointId: 6, pointTitle: "Bosätt efter möjlighet, inte passivitet", relevance: "indirect", closestParties: ["M"], comment: "Kristersson nämnde att arbetslösa borde flytta norrut. Ingen föreslog datadriven bosättning" },
      { pointId: 7, pointTitle: "Barnen först, alltid", relevance: "indirect", closestParties: ["C", "MP"], comment: "ETR och Lind diskuterade BUP-köer. Ingen nämnde flerspråkig skolplattform" },
      { pointId: 8, pointTitle: "Hård mot exploatering, mjuk mot människor", relevance: "none", closestParties: [], comment: "Arbetslivskriminalitet nämndes inte" },
      { pointId: 9, pointTitle: "Nolltolerans mot diskriminering", relevance: "none", closestParties: [], comment: "Diskriminering på arbetsmarknaden nämndes inte" },
      { pointId: 10, pointTitle: "Digitalt medlemskap från dag ett", relevance: "none", closestParties: [], comment: "Digital identitet för nyanlända nämndes inte" },
      { pointId: 11, pointTitle: "Europas enklaste land att starta företag i", relevance: "indirect", closestParties: ["C"], comment: "ETR talade om sänkta arbetsgivaravgifter och enklare regler" },
      { pointId: 12, pointTitle: "Student till byggare av Sverige", relevance: "indirect", closestParties: ["M", "L"], comment: "Kristersson diskuterade akademikerarbetslöshet. Ingen föreslog automatiskt övergångsspår" },
      { pointId: 13, pointTitle: "Cirkulär rörlighet som styrka", relevance: "none", closestParties: [], comment: "Diaspora, portabla meriter och cirkulär mobilitet nämndes inte" },
      { pointId: 14, pointTitle: "Snabb och förutsägbar rättsstat", relevance: "indirect", closestParties: [], comment: "Tonårsutvisningar diskuterades intensivt, men ingen föreslog digital ärendehantering" },
      { pointId: 15, pointTitle: "Integration som nationell elitgren", relevance: "none", closestParties: [], comment: "Ingen föreslog öppen integrationsdashboard eller mätbara mål" },
    ],
    partyRankings: [
      { party: "Centerpartiet", abbreviation: "C", score: 3, maxScore: 15, reasoning: "ETR föreslog 'jobbsvenska' (punkt 3), sänkta trösklar för företag (punkt 11), och talade om ojämlik vård som systemproblem. Närmast i ton och angreppssätt." },
      { party: "Liberalerna", abbreviation: "L", score: 2, maxScore: 15, reasoning: "Mohamsson talade om utbildning som energi- och integrationsfråga (punkt 4), och kravbaserad integration." },
      { party: "Kristdemokraterna", abbreviation: "KD", score: 2, maxScore: 15, reasoning: "Busch föreslog förstatligande av vården (systemtänkande) och talade om integration som värderingsfråga." },
      { party: "Moderaterna", abbreviation: "M", score: 2, maxScore: 15, reasoning: "Kristersson nämnde bristyrken, flytta norrut (punkt 6 indirekt), och akademikerarbetslöshet (punkt 12 indirekt)." },
      { party: "Socialdemokraterna", abbreviation: "S", score: 1, maxScore: 15, reasoning: "Andersson talade om jämlik vård och krav på svenska, men utan systemlösningar eller teknik." },
      { party: "Miljöpartiet", abbreviation: "MP", score: 1, maxScore: 15, reasoning: "Lind talade om personal i vården och humanitär ventil, men utan konkreta integrationsverktyg." },
      { party: "Vänsterpartiet", abbreviation: "V", score: 0, maxScore: 15, reasoning: "Dadgostar fokuserade på fördelningspolitik och kritik av högerblocket. Inga förslag som berör de 15 punkterna." },
      { party: "Sverigedemokraterna", abbreviation: "SD", score: 0, maxScore: 15, reasoning: "Åkesson fokuserade på stram migration och skattesänkningar. Inga förslag som berör de 15 punkterna." },
    ],
    missingThemes: [
      { theme: "AI i offentlig förvaltning", themeEn: "AI in public administration", points: "1, 2, 3, 4, 5, 6, 8, 9, 14", comment: "Inte ett ord", commentEn: "Not a word" },
      { theme: "Digital identitet för nyanlända", themeEn: "Digital identity for newcomers", points: "1, 10", comment: "Inte ett ord", commentEn: "Not a word" },
      { theme: "Kompetensvalidering som system", themeEn: "Competence validation as system", points: "2, 4", comment: "Inte ett ord", commentEn: "Not a word" },
      { theme: "AI-stödd språkträning", themeEn: "AI-supported language training", points: "3", comment: "Inte ett ord", commentEn: "Not a word" },
      { theme: "Datadriven bosättning", themeEn: "Data-driven settlement", points: "6", comment: "Kristersson nämnde 'flytta norrut' men utan data eller verktyg", commentEn: "Kristersson mentioned 'move north' but without data or tools" },
      { theme: "Flerspråkig skolplattform", themeEn: "Multilingual school platform", points: "7", comment: "Inte ett ord", commentEn: "Not a word" },
      { theme: "Företagande bland utrikes födda", themeEn: "Entrepreneurship among foreign-born", points: "11", comment: "Inte ett ord", commentEn: "Not a word" },
      { theme: "Diaspora som resurs", themeEn: "Diaspora as resource", points: "13", comment: "Inte ett ord", commentEn: "Not a word" },
      { theme: "Mätbar integration med öppen data", themeEn: "Measurable integration with open data", points: "15", comment: "Inte ett ord", commentEn: "Not a word" },
      { theme: "Designtänkande i offentlig sektor", themeEn: "Design thinking in public sector", points: "Alla", comment: "Inte ett ord", commentEn: "Not a word" },
    ],
    conclusion: `SVT:s partiledardebatt 2026 bekräftade att svensk politik fortfarande diskuterar integration som en gränsfråga (vem kommer in, vem åker ut) snarare än som en designfråga (hur bygger vi system som fungerar för alla som är här). Ingen partiledare nämnde AI, digitalisering, kompetensvalidering, öppen data eller plattformstänkande som verktyg för integration.

Tre saker som debatten visade:

1. Alla partier erkänner problemen (arbetslöshet, vårdköer, ojämlikhet, utanförskap) men ingen har en systemlösning. Recepten är antingen mer pengar (vänster) eller mer krav (höger). De 15 punkterna föreslår bättre design.

2. Digitalisering och AI är helt frånvarande i den politiska debatten om integration och välfärd.

3. Integration diskuteras inte som integration. Den diskuteras som migration (gränsfråga), som arbetslöshet (ekonomifråga) eller som kriminalitet (trygghetsfråga). Ingen diskuterar den som det den faktiskt är: en onboarding-fråga, en designfråga, en infrastrukturfråga.`,
    conclusionEn: `SVT's party leader debate 2026 confirmed that Swedish politics still discusses integration as a border issue (who gets in, who gets out) rather than as a design issue (how do we build systems that work for everyone who is here). No party leader mentioned AI, digitalisation, competence validation, open data or platform thinking as tools for integration.

Three things the debate showed:

1. All parties acknowledge the problems (unemployment, healthcare queues, inequality, exclusion) but none has a system solution. The recipes are either more money (left) or more demands (right). The 15 points propose better design.

2. Digitalisation and AI are completely absent from the political debate on integration and welfare.

3. Integration is not discussed as integration. It's discussed as migration (border issue), as unemployment (economic issue) or as crime (security issue). No one discusses it for what it actually is: an onboarding issue, a design issue, an infrastructure issue.`,
    jjFinalComment: "Jag gick in i den här analysen med förhoppningen att hitta fler beröringspunkter. Det hade varit uppmuntrande om åtminstone något parti hade pratat om kompetensvalidering, AI-stödd språkträning eller digital identitet. Men debatten var en påminnelse om varför de 15 punkterna behövs: inte för att de är perfekta, utan för att de ställer frågor som ingen annan ställer. Och det är svårt att hitta bra svar om man inte ens ställer rätt frågor.",
    jjFinalCommentEn: "I went into this analysis hoping to find more points of contact. It would have been encouraging if at least one party had talked about competence validation, AI-supported language training or digital identity. But the debate was a reminder of why the 15 points are needed: not because they're perfect, but because they ask questions no one else is asking. And it's hard to find good answers if you're not even asking the right questions.",
    pdfUrl: "/manus-storage/debatt-analys-1_7a9c0fcd.pdf",
    mdUrl: "/manus-storage/debatt-analys-1_ee1b4b1b.md",
    transcriptUrl: "/manus-storage/partiledardebatt-2026-1-transcript_6580ce76.docx",
    transcriptLabel: "Ladda ner transkript (DOCX)",
    transcriptLabelEn: "Download transcript (DOCX)",
    ogDescription: "0 av 15 punkter berördes direkt. 9 indirekt. Ingen partiledare nämnde AI, digitalisering eller kompetensvalidering som integrationsverktyg.",
    ogDescriptionEn: "0 of 15 points addressed directly. 9 indirectly. No party leader mentioned AI, digitalisation or competence validation as integration tools.",
  },
  {
    id: "ai-sweden-etr-2026-05",
    date: "2026-05-26",
    title: "Elisabeth Thand Ringqvist (C) om AI-politik",
    titleEn: "Elisabeth Thand Ringqvist (C) on AI Policy",
    subtitle: "37 minuter om AI-infrastruktur som aldrig kopplas till integration",
    subtitleEn: "37 minutes on AI infrastructure never connected to integration",
    source: "AI Sweden Podcast",
    duration: "37 minuter",
    participants: [
      "Elisabeth Thand Ringqvist (C)",
      "Anders Thoresson (AI Sweden)",
    ],
    summary: `I en djupintervju med AI Sweden beskriver Centerpartiets partiledare Elisabeth Thand Ringqvist en AI-politik som i praktiken utgör infrastrukturen för Det Nya Sveriges 15 punkter, utan att hon någonsin gör den kopplingen själv. Hon talar om AI-general, myndighetseffektivisering, regulatoriska sandlådor, en miljard till forskarstipendier, och arbetsmarknadens omställning. Det som saknas är den sista länken: att denna infrastruktur kan lösa integrationens friktion. ETR bygger motorvägen men pratar aldrig om vart den leder.`,
    summaryEn: `In a deep interview with AI Sweden, the Centre Party leader Elisabeth Thand Ringqvist describes an AI policy that in practice constitutes the infrastructure for Det Nya Sverige's 15 points, without ever making that connection herself. She talks about an AI general, government efficiency, regulatory sandboxes, a billion SEK for research scholarships, and labour market transformation. What's missing is the final link: that this infrastructure can solve integration's friction. ETR builds the motorway but never talks about where it leads.`,
    sections: [
      {
        title: "AI i offentlig förvaltning",
        titleEn: "AI in public administration",
        facts: [
          "En mindre myndighet har redan byggt en AI-lösning för inkommande ärenden och sparat personal",
          "Myndigheterna saknar incitament att använda AI",
          "C vill ha en 'AI-general' med ett råd nära regeringskansliet",
          "Varje viktig myndighet bör ha en AI-ansvarig",
          "Administrativa pengar borde flyttas till kärnverksamhet (vård, skola)",
        ],
        factsEn: [
          "A smaller agency has already built an AI solution for incoming cases, saving staff",
          "Government agencies lack incentives to use AI",
          "C wants an 'AI general' with a council close to the government offices",
          "Every important agency should have an AI officer",
          "Administrative funds should move to core services (healthcare, education)",
        ],
        quotes: [
          { text: "Myndigheterna måste ju få incitament att verkligen använda AI för den typen av bedömningar som är ganska transaktionella, enkla.", speaker: "Elisabeth Thand Ringqvist (C)" },
          { text: "Det vore ju toppen om vi kan flytta administrativa pengar till pengar där det händer och människor är absolut viktiga.", speaker: "Elisabeth Thand Ringqvist (C)" },
        ],
        connection: "Direkt koppling till punkt 1 (AI i offentlig förvaltning som plattform), punkt 14 (snabb rättsstat med AI-stöd) och indirekt punkt 15 (mätbarhet). ETR:s vision om att flytta resurser från administration till kärnverksamhet är exakt den logik punkt 1 bygger på: staten som plattform, inte hinderbana.",
        connectionEn: "Direct connection to point 1 (AI in public administration as platform), point 14 (fast rule of law with AI support) and indirectly point 15 (measurability). ETR's vision of moving resources from administration to core services is exactly the logic point 1 builds on: the state as platform, not obstacle course.",
        jjComment: "ETR beskriver exakt den infrastruktur som de 15 punkterna förutsätter, utan att nämna integration. Det är som att bygga motorvägen utan att prata om vart den leder. Frågan är om det är medveten avgränsning eller om kopplingen AI-infrastruktur → integrationslösningar inte finns i hennes mentala modell. Jag tror det senare. Och det är synd, för hennes resonemang om incitament och AI-ansvariga på myndigheter är precis vad Migrationsverket och AF behöver.",
        jjCommentEn: "ETR describes exactly the infrastructure the 15 points presuppose, without mentioning integration. It's like building the motorway without talking about where it leads. The question is whether it's a deliberate delimitation or whether the connection AI infrastructure → integration solutions doesn't exist in her mental model. I believe the latter. And that's a shame, because her reasoning about incentives and AI officers at agencies is precisely what the Migration Agency and Employment Service need.",
      },
      {
        title: "Internationell talang och forskning",
        titleEn: "International talent and research",
        facts: [
          "C vill satsa 1 miljard kronor på att locka internationella AI-forskare och doktorander",
          "Modellen inspirerad av Life Science Lab i Stockholm (samarbete mellan universitet)",
          "Sverige ska vara bäst på applicerad AI-forskning, inte nödvändigtvis grundmodeller",
          "Stipendier och utlysningar ska locka de bästa att tillbringa fyra år i Sverige",
        ],
        factsEn: [
          "C wants to invest 1 billion SEK to attract international AI researchers and PhD students",
          "Model inspired by Life Science Lab in Stockholm (university collaboration)",
          "Sweden should excel at applied AI research, not necessarily foundation models",
          "Scholarships and calls should attract the best to spend four years in Sweden",
        ],
        quotes: [
          { text: "Vi kanske inte kommer vara bäst på att sätta upp nya grundmodeller eller språkmodeller. Men däremot den applicerade forskningen ska vi vara bra på.", speaker: "Elisabeth Thand Ringqvist (C)" },
          { text: "Vi har sagt att vi borde lägga en miljard på att locka hit studenter från hela världen som kan doktorera eller gå vidare och få sina professurer i Sverige.", speaker: "Elisabeth Thand Ringqvist (C)" },
        ],
        connection: "Direkt matchning med punkt 12 (Student till byggare av Sverige). ETR vill locka internationell talang och ge dem förutsättningar. Det är punkt 12:s logik: investera i utbildning, bygg övergångsspår. Det som saknas: det automatiska övergångsspåret efter examen och löftet om automatiskt uppehållstillstånd.",
        connectionEn: "Direct match with point 12 (Student to builder of Sweden). ETR wants to attract international talent and give them conditions. It's point 12's logic: invest in education, build transition tracks. What's missing: the automatic transition track after graduation and the promise of automatic residence permits.",
        jjComment: "En miljard till AI-forskarstipendier är bra. Men det intressanta är vad som händer efter de fyra åren. Om vi lockar hit världens bästa AI-forskare och sedan kör dem genom samma byråkratiska kvarn som alla andra, har vi bara byggt en dyrare version av samma problem. Punkt 12 löser det. ETR:s förslag är halva lösningen.",
        jjCommentEn: "A billion for AI research scholarships is good. But the interesting part is what happens after those four years. If we attract the world's best AI researchers and then run them through the same bureaucratic mill as everyone else, we've just built a more expensive version of the same problem. Point 12 solves that. ETR's proposal is half the solution.",
      },
      {
        title: "Arbetsmarknad och omställning",
        titleEn: "Labour market and transition",
        facts: [
          "ETR jämför AI-omställningen med globaliseringens tidiga fas (tillverkning till Kina)",
          "Civilingenjörer, samhällsvetare, ekonomer och jurister tappar instegsjobb",
          "Kontorsarbete försvinner som manuell bokföring försvann",
          "Människonära yrken (läkare, sjuksköterskor, poliser) kommer inte ersättas",
          "Samhället behöver en 'upplysande debatt' om framtidsjobb",
        ],
        factsEn: [
          "ETR compares AI transition to early globalisation (manufacturing to China)",
          "Engineers, social scientists, economists and lawyers losing entry-level jobs",
          "Office work disappearing like manual bookkeeping disappeared",
          "People-facing professions (doctors, nurses, police) won't be replaced",
          "Society needs an 'enlightening debate' about future jobs",
        ],
        quotes: [
          { text: "Det finns ju, och det hörde vi på radion senast idag, om civilingenjörer och samhällsvetare och ekonomer och jurister där en hel del av instegsjobben har försvunnit.", speaker: "Elisabeth Thand Ringqvist (C)" },
          { text: "Samma sak händer ju nu när det gäller mer avancerade arbetsuppgifter, eller beskrivningar av PM och annat.", speaker: "Elisabeth Thand Ringqvist (C)" },
        ],
        connection: "Indirekt koppling till punkt 4 (snabbfil till bristyrken) och punkt 5 (första jobb inom 180 dagar). ETR identifierar problemet men föreslår ingen konkret mekanism. Manifestet föreslår AI-matchning, digitala snabbspår och kompetensbevis. ETR stannar vid 'upplysande debatt'.",
        connectionEn: "Indirect connection to point 4 (fast track to shortage occupations) and point 5 (first job within 180 days). ETR identifies the problem but proposes no concrete mechanism. The manifesto proposes AI matching, digital fast tracks and competence proof. ETR stops at 'enlightening debate'.",
        jjComment: "ETR beskriver problemet korrekt men hennes lösning är 'upplysande debatt'. Det är ungefär som att säga att lösningen på bostadskrisen är 'en bra diskussion om arkitektur'. De 15 punkterna ger konkreta verktyg: AI-matchning, kompetenspass, 180-dagarsgaranti. Det är skillnaden mellan att diagnostisera och att behandla.",
        jjCommentEn: "ETR describes the problem correctly but her solution is 'enlightening debate'. That's roughly like saying the solution to the housing crisis is 'a good discussion about architecture'. The 15 points provide concrete tools: AI matching, competence passport, 180-day guarantee. It's the difference between diagnosing and treating.",
      },
      {
        title: "Reglering och innovation",
        titleEn: "Regulation and innovation",
        facts: [
          "EU:s AI-reglering (AI Act) är för strikt enligt ETR, riskerar att hämma innovation",
          "Om Europa reglerar för hårt utvecklas AI i Kina och USA istället",
          "Storbritannien har regulatoriska sandlådor med myndighetstillsyn",
          "C vill ha 'innovationsanpassad reglering' i EU",
          "Balans: tuffare på konsumentsidan, lösare på innovationssidan",
        ],
        factsEn: [
          "EU's AI regulation (AI Act) is too strict according to ETR, risks hampering innovation",
          "If Europe over-regulates, AI develops in China and USA instead",
          "UK has regulatory sandboxes with agency oversight",
          "C wants 'innovation-adapted regulation' in EU",
          "Balance: tougher on consumer side, looser on innovation side",
        ],
        quotes: [
          { text: "Om vi har för strikt lagstiftning här, då kommer den att utvecklas i Kina och USA. Då kommer vi att vara mottagare av en smartare AI än vi själva har förmåga att utveckla. Det är ju en katastrof för Europa.", speaker: "Elisabeth Thand Ringqvist (C)" },
        ],
        connection: "Indirekt koppling till punkt 9 (AI-system som granskas för bias) och punkt 15 (öppna testbäddar). ETR:s sandlådor tangerar punkt 15:s vision. Men hennes fokus är på att minska reglering, medan manifestet vill ha smart reglering: granska för bias men öppna för innovation.",
        connectionEn: "Indirect connection to point 9 (AI systems audited for bias) and point 15 (open testbeds). ETR's sandboxes touch point 15's vision. But her focus is on reducing regulation, while the manifesto wants smart regulation: audit for bias but open for innovation.",
        jjComment: "Här finns en intressant spänning. ETR vill ha mindre reglering för att inte hämma innovation. Manifestet vill ha smart reglering som granskar AI för bias men öppnar för experiment. Det är inte samma sak, men det är inte heller motsatser. En AI-general med mandat att både öppna sandlådor OCH granska bias vore den syntes som varken ETR eller manifestet riktigt formulerar.",
        jjCommentEn: "There's an interesting tension here. ETR wants less regulation to not hamper innovation. The manifesto wants smart regulation that audits AI for bias but opens for experimentation. It's not the same thing, but they're not opposites either. An AI general with mandate to both open sandboxes AND audit for bias would be the synthesis that neither ETR nor the manifesto quite articulates.",
      },
      {
        title: "Utbildning och AI i skolan",
        titleEn: "Education and AI in schools",
        facts: [
          "'Pärm och skärm': barn ska lära sig grundläggande hantverk OCH AI-verktyg",
          "AI kan ge interaktiva dialoger med historiska figurer (Gustav Vasa, Karl XII)",
          "Elever med svårare för inläsning kan ha lättare för interaktiv dialog",
          "Kritiskt tänkande och förmåga att identifiera fejk är centralt",
          "Man måste lära sig grunderna innan man använder verktyg",
        ],
        factsEn: [
          "'Book and screen': children should learn basic craft AND AI tools",
          "AI can provide interactive dialogues with historical figures (Gustav Vasa, Karl XII)",
          "Students struggling with reading may find interactive dialogue easier",
          "Critical thinking and ability to identify fakes is central",
          "Must learn fundamentals before using tools",
        ],
        quotes: [
          { text: "Du kan sitta där och så kan du ha Gustav Vasa och så kan du prata med Gustav Vasa. Varför gjorde du så där?", speaker: "Elisabeth Thand Ringqvist (C)" },
          { text: "Jag tror att blandningen av de här kommer också göra att elever som har svårare för det, den inläsningen kommer också kunna ha lättare för många ämnen.", speaker: "Elisabeth Thand Ringqvist (C)" },
        ],
        connection: "Indirekt koppling till punkt 7 (barnen först, alltid). ETR talar om AI i skolan generellt men nämner aldrig flerspråkiga elever, studiehandledning på modersmål, eller nyanlända barns specifika utmaningar. Manifestet handlar om att ge flerspråkiga barn verktyg; ETR talar om alla barn.",
        connectionEn: "Indirect connection to point 7 (children first, always). ETR talks about AI in schools generally but never mentions multilingual students, study guidance in mother tongue, or the specific challenges of newly arrived children. The manifesto is about giving multilingual children tools; ETR talks about all children.",
        jjComment: "ETR:s Gustav Vasa-exempel är charmigt men avslöjande. Hon tänker på AI i skolan som ett verktyg för alla barn, inte som en hävstång för de barn som har störst behov. Ett barn som talar dari hemma och svenska i skolan skulle ha enormt mycket mer nytta av en AI-tutor som kan förklara på dari och träna svenska simultant. Det är punkt 7. Men den kopplingen gör hon aldrig.",
        jjCommentEn: "ETR's Gustav Vasa example is charming but revealing. She thinks of AI in schools as a tool for all children, not as a lever for those with the greatest needs. A child speaking Dari at home and Swedish at school would benefit enormously more from an AI tutor that can explain in Dari and train Swedish simultaneously. That's point 7. But she never makes that connection.",
      },
      {
        title: "Digital suveränitet och europeisk infrastruktur",
        titleEn: "Digital sovereignty and European infrastructure",
        facts: [
          "Europa behöver egen digital infrastruktur och egna språkmodeller",
          "Risk att bolag köps av aktörer som innebär tappad datakontroll",
          "Balansen mellan suveränitet och öppenhet är svår men nödvändig",
          "Kvantdatorer kan bli nästa stora språng: 'kombinationen av AI och kvant'",
          "AI-generalen bör styra diskussionen om digital suveränitet",
        ],
        factsEn: [
          "Europe needs its own digital infrastructure and language models",
          "Risk of companies being acquired by actors causing loss of data control",
          "Balance between sovereignty and openness is difficult but necessary",
          "Quantum computers may be the next big leap: 'the combination of AI and quantum'",
          "The AI general should steer the discussion on digital sovereignty",
        ],
        quotes: [
          { text: "Vi tyckte att det var väl toppen att USA byggde upp allt och vi inte har någonting. Tills att vi nu inser att för vår framtid och för vår europeiska robusthet så behöver vi bygga en hel del även i Europa.", speaker: "Elisabeth Thand Ringqvist (C)" },
        ],
        connection: "Tredje ordningens koppling till punkt 1, 3 och 10. Om Europa bygger egen AI-infrastruktur kan den användas för de 15 punkternas lösningar utan beroendeställning till USA/Kina. Europeisk AI-suveränitet → svensk offentlig AI-infrastruktur → integrationslösningar som fungerar.",
        connectionEn: "Third-order connection to points 1, 3 and 10. If Europe builds its own AI infrastructure, it can be used for the 15 points' solutions without dependency on USA/China. European AI sovereignty → Swedish public AI infrastructure → integration solutions that work.",
        jjComment: "Det här är den mest intressanta underströmmen i hela intervjun. ETR förstår att digital suveränitet inte bara handlar om säkerhet utan om handlingsfrihet. Om Sverige ska bygga en AI-lots i fickan (punkt 1), en AI-språkcoach (punkt 3), eller ett AI-stött kompetenspass (punkt 2), behöver vi infrastruktur vi kontrollerar. ETR bygger argumentet utan att dra slutsatsen. Men slutsatsen finns där.",
        jjCommentEn: "This is the most interesting undercurrent in the entire interview. ETR understands that digital sovereignty isn't just about security but about freedom of action. If Sweden is to build an AI guide in the pocket (point 1), an AI language coach (point 3), or an AI-supported competence passport (point 2), we need infrastructure we control. ETR builds the argument without drawing the conclusion. But the conclusion is there.",
      },
    ],
    pointMatches: [
      { pointId: 1, pointTitle: "Ett Sverige in, inte femton köer", relevance: "indirect", closestParties: ["C"], comment: "Talar om AI i myndigheter och incitament att effektivisera, men nämner aldrig den samlade digitala onboardingen" },
      { pointId: 2, pointTitle: "100-dagarsgaranti för kompetens", relevance: "none", closestParties: [], comment: "Nämner aldrig kompetensvalidering, utländska examina eller tidsgarantier" },
      { pointId: 3, pointTitle: "Svenska genom arbete, inte före arbete", relevance: "none", closestParties: [], comment: "Nämner aldrig språkträning, SFI eller AI-språkcoach" },
      { pointId: 4, pointTitle: "Nationell snabbfil till bristyrken", relevance: "indirect", closestParties: ["C"], comment: "Talar om att bristyrken behöver folk och att omställning krävs, men föreslår ingen snabbfil" },
      { pointId: 5, pointTitle: "Första riktiga jobbet inom 180 dagar", relevance: "indirect", closestParties: ["C"], comment: "Identifierar att instegsjobb försvinner, men ingen konkret matchningslösning" },
      { pointId: 6, pointTitle: "Bosätt efter möjlighet, inte passivitet", relevance: "none", closestParties: [], comment: "Nämner aldrig bosättning eller datadriven placering" },
      { pointId: 7, pointTitle: "Barnen först, alltid", relevance: "indirect", closestParties: ["C"], comment: "Talar om AI i skolan men aldrig om flerspråkiga barn specifikt" },
      { pointId: 8, pointTitle: "Hård mot exploatering, mjuk mot människor", relevance: "indirect", closestParties: ["C"], comment: "Talar om konsumentskydd och reglering men aldrig om arbetslivskriminalitet" },
      { pointId: 9, pointTitle: "Nolltolerans mot diskriminering", relevance: "indirect", closestParties: ["C"], comment: "Tangerar bias-granskning via regulatoriska sandlådor" },
      { pointId: 10, pointTitle: "Digitalt medlemskap från dag ett", relevance: "indirect", closestParties: ["C"], comment: "Talar om myndighetsdigitalisering men aldrig om digital identitet för nyanlända" },
      { pointId: 11, pointTitle: "Europas enklaste land att starta företag i", relevance: "direct", closestParties: ["C"], comment: "Talar explicit om innovationskluster, entreprenörskap och sänkta trösklar" },
      { pointId: 12, pointTitle: "Student till byggare av Sverige", relevance: "direct", closestParties: ["C"], comment: "Explicit: 1 miljard för att locka internationella forskare, inspirerat av Life Science Lab" },
      { pointId: 13, pointTitle: "Cirkulär rörlighet som styrka", relevance: "direct", closestParties: ["C"], comment: "Tangerar diaspora-logiken: 'de bästa forskarna kanske inte alltid finns i Sverige'" },
      { pointId: 14, pointTitle: "Snabb och förutsägbar rättsstat", relevance: "direct", closestParties: ["C"], comment: "AI-general som effektiviserar myndigheter, AI för transaktionella bedömningar" },
      { pointId: 15, pointTitle: "Integration som nationell elitgren", relevance: "indirect", closestParties: ["C"], comment: "Öppna testbäddar och sandlådor tangeras, men aldrig kopplat till integration som mätbar disciplin" },
    ],
    partyRankings: [
      { party: "Centerpartiet", abbreviation: "C", score: 8, maxScore: 15, reasoning: "ETR når 4 direkta och 8 indirekta matchningar. Hennes AI-infrastrukturtänk är i princip förutsättningen för de 15 punkterna. Det som saknas är den explicita kopplingen till integration." },
    ],
    missingThemes: [
      { theme: "Integration som designproblem", themeEn: "Integration as design problem", points: "Alla", comment: "ETR talar om AI som infrastruktur för samhället i stort men gör aldrig kopplingen till integration specifikt", commentEn: "ETR talks about AI as infrastructure for society broadly but never connects it to integration specifically" },
      { theme: "Den enskilda människans upplevelse", themeEn: "The individual's experience", points: "1, 2, 3, 5, 10, 14", comment: "Talar om myndigheter, företag och system men aldrig om den somalisktalande läkaren som kör taxi", commentEn: "Talks about agencies, companies and systems but never about the Somali-speaking doctor driving a taxi" },
      { theme: "Konkreta tidsgarantier", themeEn: "Concrete time guarantees", points: "2, 5, 10, 14", comment: "Manifestet har 100-dagarsgaranti, 180-dagarsgaranti, 24 timmars digital identitet. ETR har 'vi borde' och 'det behövs'", commentEn: "The manifesto has 100-day guarantee, 180-day guarantee, 24-hour digital identity. ETR has 'we should' and 'it's needed'" },
      { theme: "Kompetensvalidering", themeEn: "Competence validation", points: "2, 4", comment: "Aldrig nämnt trots att det är en av de mest konkreta AI-tillämpningarna", commentEn: "Never mentioned despite being one of the most concrete AI applications" },
      { theme: "AI-stödd språkträning", themeEn: "AI-supported language training", points: "3", comment: "Aldrig nämnt trots att intervjun handlar om AI:s möjligheter", commentEn: "Never mentioned despite the interview being about AI's possibilities" },
    ],
    conclusion: `Elisabeth Thand Ringqvist är den svenska partiledare som ligger närmast Det Nya Sveriges grundpremiss: att AI är infrastruktur, inte gadget. Hennes resonemang om AI-general, myndighetseffektivisering, internationell talang och innovationsanpassad reglering är i princip förutsättningarna för att de 15 punkterna ska kunna byggas.

Men hon gör aldrig det sista steget: att koppla AI-infrastrukturen till integrationens konkreta utmaningar. Det är som att bygga bredband till varje hushåll utan att fundera på vad folk ska använda det till.

Tre saker intervjun visade:

1. ETR förstår AI på en nivå som ingen annan partiledare visat offentligt.
2. Hon har konkreta förslag (1 miljard till forskarstipendier, AI-general, regulatoriska sandlådor).
3. Men kopplingen AI → integration → samhällsbygge saknas helt. Det är ett blindfält, inte en oenighet.`,
    conclusionEn: `Elisabeth Thand Ringqvist is the Swedish party leader closest to Det Nya Sverige's core premise: that AI is infrastructure, not gadget. Her reasoning about an AI general, government efficiency, international talent and innovation-adapted regulation are essentially the prerequisites for the 15 points to be built.

But she never takes the final step: connecting AI infrastructure to integration's concrete challenges. It's like building broadband to every household without thinking about what people will use it for.

Three things the interview showed:

1. ETR understands AI at a level no other party leader has shown publicly.
2. She has concrete proposals (1 billion for research scholarships, AI general, regulatory sandboxes).
3. But the connection AI → integration → nation-building is completely absent. It's a blind spot, not a disagreement.`,
    jjFinalComment: "Det här är den mest hoppfulla analysen jag gjort hittills. Inte för att ETR har alla svaren, utan för att hon har rätt infrastruktur-tänk. Om någon sätter sig ner med henne och säger 'allt det du just sa om AI i myndigheter, forskarstipendier och sandlådor, tänk nu att mottagaren inte är en svensk civilingenjör utan en syrisk kirurg som väntat 18 månader på att få sin legitimation', tror jag att polletten trillar ner direkt. Centerpartiet är det parti som ligger närmast att kunna adoptera hela programmet. De behöver bara göra den sista kopplingen.",
    jjFinalCommentEn: "This is the most hopeful analysis I've done so far. Not because ETR has all the answers, but because she has the right infrastructure thinking. If someone sits down with her and says 'everything you just said about AI in agencies, research scholarships and sandboxes, now imagine the recipient isn't a Swedish engineer but a Syrian surgeon who's waited 18 months for their license', I think the penny would drop immediately. The Centre Party is the party closest to being able to adopt the entire programme. They just need to make that final connection.",
    pdfUrl: "/manus-storage/etr-ai-sweden-analys_e642f0cf.pdf",
    mdUrl: "/manus-storage/etr-ai-sweden-analys_e150b613.md",
    transcriptUrl: "/manus-storage/AUDIO-2026-05-26-22-44-29.mp3_2caab3bd.txt",
    transcriptLabel: "Ladda ner transkript (TXT)",
    transcriptLabelEn: "Download transcript (TXT)",
    ogDescription: "ETR når 4 direkta och 8 indirekta matchningar mot de 15 punkterna. Hennes AI-infrastrukturtänk är förutsättningen för programmet, men kopplingen till integration saknas.",
    ogDescriptionEn: "ETR scores 4 direct and 8 indirect matches against the 15 points. Her AI infrastructure thinking is the prerequisite for the programme, but the connection to integration is missing.",
  },
  {
    id: "ai-sweden-jr-2026-05",
    date: "2026-05-26",
    title: "AI Sweden: Jessica Rosencrantz (M)",
    titleEn: "AI Sweden: Jessica Rosencrantz (M)",
    subtitle: "EU-ministern om Silicon Valhalla, talangvisum och AI-verkstaden. Noll om integration.",
    subtitleEn: "The EU minister on Silicon Valhalla, talent visas and the AI workshop. Zero on integration.",
    source: "AI Sweden Podcast",
    duration: "44 min",
    participants: ["Jessica Rosencrantz (M), EU-minister", "Anders Thoresson (AI Sweden)"],
    summary: "Jessica Rosencrantz levererar en bred men grund intervju om AI som näringspolitik. Hon täcker hela tech-stacken (el, datacenter, molntjänster, applikationer), nämner personaloptionsprogram, talangvisum, AI-verkstaden, regelförenkling och EU:s AI-akt. Men till skillnad från ETR (C) som hade konkreta siffror, stannar Rosencrantz oftare vid visioner och allmänna villkor. Hennes refräng är 'starta, skala, stanna' och 'Silicon Valhalla'. Det som saknas helt: integration, nyanlända, kompetensvalidering, språkträning, diskriminering. Inte ett ord. Anmärkningsvärt: M valde att inte skicka partiledaren utan EU-ministern.",
    summaryEn: "Jessica Rosencrantz delivers a broad but shallow interview about AI as industrial policy. She covers the full tech stack (energy, data centers, cloud, applications), mentions stock option programs, talent visas, the AI Workshop, deregulation and the EU AI Act. But unlike ETR (C) who had concrete figures, Rosencrantz more often stays at the level of visions and general conditions. Her refrain is 'start, scale, stay' and 'Silicon Valhalla'. What's completely missing: integration, newcomers, competence validation, language training, discrimination. Not a single word. Notable: M chose not to send their party leader but the EU minister.",
    sections: [
      {
        title: "AI som paradigmskifte och näringslivsfråga",
        titleEn: "AI as paradigm shift and business policy",
        facts: [
          "M har tagit fram 'Sveriges första AI-strategi' med mål att vara topp-10 i världen",
          "Stockholm har flest unicorns per capita efter Silicon Valley",
          "Regeringen har sänkt skattetrycket till lägsta på 50 år",
          "Techsektorn bidrar med 'hundratals miljarder' till BNP"
        ],
        factsEn: [
          "M has produced 'Sweden's first AI strategy' aiming for global top-10",
          "Stockholm has the most unicorns per capita after Silicon Valley",
          "The government has reduced the tax burden to its lowest in 50 years",
          "The tech sector contributes 'hundreds of billions' to GDP"
        ],
        quotes: [
          { text: "Vi vill att Sverige ska vara Europas Silicon Valley. Eller Silicon Valhalla.", speaker: "Jessica Rosencrantz (M)" },
          { text: "Det spännande med AI som skiljer AI från många andra frågor, det är ju att det påverkar i princip allting.", speaker: "Jessica Rosencrantz (M)" }
        ],
        connection: "Indirekt koppling till punkt 11 (Europas enklaste land att starta företag) och punkt 15 (Integration som nationell elitgren) via det generella ekosystemtänket. Men kopplingen görs aldrig till integration.",
        connectionEn: "Indirect connection to point 11 (Europe's easiest country to start a business) and point 15 (Integration as national elite discipline) via the general ecosystem thinking. But the connection to integration is never made.",
        jjComment: "'Silicon Valhalla' låter bra som slogan, men det är symptomatiskt att hela intervjun handlar om att locka hit internationell talang till techbolag, utan att någonsin nämna att Sverige redan har tiotusentals högutbildade människor som sitter fast i ett system som inte validerar deras kompetens.",
        jjCommentEn: "'Silicon Valhalla' sounds great as a slogan, but it's symptomatic that the entire interview is about attracting international talent to tech companies, without ever mentioning that Sweden already has tens of thousands of highly educated people stuck in a system that doesn't validate their competence."
      },
      {
        title: "Talangvisum och personaloptioner",
        titleEn: "Talent visas and stock options",
        facts: [
          "M föreslår ett 'talangvisum' inspirerat av Frankrike och Finland",
          "Handläggningstid för högkvalificerad arbetskraftsinvandring: från 100 till 18 dagar",
          "M vill utöka personaloptionsprogrammet (nuvarande tak för anställda/balansomslutning för lågt)",
          "Bolag som växer snabbt 'slår i taket' på 2 år"
        ],
        factsEn: [
          "M proposes a 'talent visa' inspired by France and Finland",
          "Processing time for highly qualified labor immigration: from 100 to 18 days",
          "M wants to expand the stock option program (current caps on employees/balance sheet too low)",
          "Fast-growing companies 'hit the ceiling' within 2 years"
        ],
        quotes: [
          { text: "De kanske vill ha den 16-åriga programmeraren. Inte nödvändigtvis när man ska bli chef eller har en lång masterutbildning. Här tror jag att vi behöver ett helt annat snabbspår in.", speaker: "Jessica Rosencrantz (M)" }
        ],
        connection: "Direkt koppling till punkt 4 (Nationell snabbfil till bristyrken) via 'snabbspår in' för techtalang. Men notera: Rosencrantz snabbspår gäller uteslutande internationell rekrytering till techbolag, inte validering av befintlig kompetens hos redan bosatta.",
        connectionEn: "Direct connection to point 4 (National fast track to shortage occupations) via 'fast track in' for tech talent. But note: Rosencrantz's fast track applies exclusively to international recruitment to tech companies, not validation of existing competence among those already living here.",
        jjComment: "Här finns en fascinerande blind fläck. Rosencrantz beskriver exakt det problem som punkt 4 löser: 'vi behöver ett helt annat snabbspår in'. Men hennes snabbspår gäller bara nyrekryterade utländska techtalanger. De 90 000 personer per år som redan bor i Sverige och väntar på validering av sina utbildningar nämns inte. Det är som att bygga en ny flygplats för internationella gäster medan den befintliga terminalen har 18 månaders kö.",
        jjCommentEn: "Here's a fascinating blind spot. Rosencrantz describes exactly the problem that point 4 solves: 'we need a completely different fast track in'. But her fast track only applies to newly recruited foreign tech talents. The 90,000 people per year already living in Sweden waiting for validation of their degrees are never mentioned. It's like building a new airport for international guests while the existing terminal has an 18-month queue."
      },
      {
        title: "Offentlig sektor och AI-verkstaden",
        titleEn: "Public sector and the AI Workshop",
        facts: [
          "Regeringen har gett uppdrag till 100 myndigheter att arbeta mer med AI",
          "'AI-verkstaden' ska ge offentlig sektor stöd (Skatteverket och Försäkringskassan leder)",
          "Rosencrantz ser potential i beslutsstöd, avlastning av personal, diagnostisering",
          "Vill se samarbete mellan privat och offentlig sektor",
          "Lantmäteriet delar öppen data som skapar möjligheter för bolag"
        ],
        factsEn: [
          "The government has tasked 100 agencies to work more with AI",
          "The 'AI Workshop' will support the public sector (Tax Agency and Social Insurance lead)",
          "Rosencrantz sees potential in decision support, staff relief, diagnostics",
          "Wants collaboration between private and public sector",
          "The Land Survey shares open data creating opportunities for companies"
        ],
        quotes: [
          { text: "Det handlar inte så mycket om att ersätta personal utan om att hjälpa den som arbetar inom välfärden.", speaker: "Jessica Rosencrantz (M)" },
          { text: "Om övriga delar av samhället kommer att använda sig av AI, då behöver också offentlig sektor för att vara en attraktiv arbetsgivare ha samma verktyg.", speaker: "Jessica Rosencrantz (M)" }
        ],
        connection: "Indirekt koppling till punkt 1 (Ett Sverige in, inte femton köer) via myndighetsdigitalisering och AI-verkstaden. Men Rosencrantz talar om AI i myndigheter generellt (vård, skola, omsorg), aldrig om den specifika onboarding-upplevelsen för nyanlända.",
        connectionEn: "Indirect connection to point 1 (One Sweden in, not fifteen queues) via agency digitalization and the AI Workshop. But Rosencrantz talks about AI in agencies generally (healthcare, schools, care), never about the specific onboarding experience for newcomers.",
        jjComment: "AI-verkstaden är ett konkret initiativ. Men det är talande att när Rosencrantz exemplifierar AI i offentlig sektor nämner hon läkare, lärare och Lantmäteriet, aldrig Migrationsverket, Arbetsförmedlingen eller kommunernas integrationsenheter. De myndigheter som hanterar integration verkar inte finnas i hennes mentala karta.",
        jjCommentEn: "The AI Workshop is a concrete initiative. But it's telling that when Rosencrantz exemplifies AI in the public sector she mentions doctors, teachers and the Land Survey, never the Migration Agency, Employment Service or municipal integration units. The agencies handling integration don't seem to exist in her mental map."
      },
      {
        title: "Reglering och EU:s AI-akt",
        titleEn: "Regulation and the EU AI Act",
        facts: [
          "Regeringen har drivit på för att bromsa delar av EU:s AI-akt",
          "Kräver standarder innan högrisk-AI-regler träder i kraft",
          "EU:s 'omnibus' (regelförenklingspaket) har gett undantag för mindre bolag",
          "Statsministern har personligen skrivit till von der Leyen om regelförenkling",
          "GDPR är 'föremål för omförhandlingar'"
        ],
        factsEn: [
          "The government has pushed to slow parts of the EU AI Act",
          "Demands standards before high-risk AI rules take effect",
          "EU's 'omnibus' (deregulation package) has given exemptions for smaller companies",
          "The PM has personally written to von der Leyen about deregulation",
          "GDPR is 'subject to renegotiations'"
        ],
        quotes: [
          { text: "Rätt reglering skapar marknader för innovationer. Medan dålig reglering eller överreglering kommer döda innovation.", speaker: "Jessica Rosencrantz (M)" }
        ],
        connection: "Indirekt koppling till punkt 11 (Europas enklaste land att starta företag) via regelförenkling. Tangerar punkt 9 (Nolltolerans mot diskriminering) via ansvarsfull AI och datahantering, men kopplingen görs aldrig explicit.",
        connectionEn: "Indirect connection to point 11 (Europe's easiest country to start a business) via deregulation. Touches on point 9 (Zero tolerance for discrimination) via responsible AI and data handling, but the connection is never made explicit.",
        jjComment: "",
        jjCommentEn: ""
      },
      {
        title: "Arbetsmarknad och omställning",
        titleEn: "Labor market and transition",
        facts: [
          "Rosencrantz jämför med Spinning Jenny och väverskorna",
          "Ser behov av omskolning och omställningsstöd",
          "Vill att människor ska kunna 'ha flera olika yrken under en livstid'",
          "Nämner utbildningsväsendets roll men inga konkreta förslag"
        ],
        factsEn: [
          "Rosencrantz compares to the Spinning Jenny and the weavers",
          "Sees need for retraining and transition support",
          "Wants people to be able to 'have several different careers in a lifetime'",
          "Mentions the education system's role but no concrete proposals"
        ],
        quotes: [
          { text: "Självklart kommer en del jobb att försvinna. Väldigt många jobb kommer dock att förändras.", speaker: "Jessica Rosencrantz (M)" }
        ],
        connection: "Indirekt koppling till punkt 4 (Nationell snabbfil till bristyrken) och punkt 5 (Första riktiga jobbet inom 180 dagar) via omställningsresonemanget. Men inga konkreta mekanismer föreslås.",
        connectionEn: "Indirect connection to point 4 (National fast track to shortage occupations) and point 5 (First real job within 180 days) via the transition reasoning. But no concrete mechanisms are proposed.",
        jjComment: "Spinning Jenny-jämförelsen är den mest utslitna analogin i AI-debatten. Den signalerar 'jag vet att frågan finns' utan att erbjuda ett svar. ETR (C) var här mer konkret med specifika omställningsmekanismer. Rosencrantz stannar vid 'vi behöver omskolning och omställning' utan att säga hur, för vem, eller inom vilken tidsram.",
        jjCommentEn: "The Spinning Jenny comparison is the most worn-out analogy in the AI debate. It signals 'I know the issue exists' without offering an answer. ETR (C) was more concrete here with specific transition mechanisms. Rosencrantz stays at 'we need retraining and transition' without saying how, for whom, or within what timeframe."
      },
      {
        title: "Digitalt utanförskap och samordning",
        titleEn: "Digital exclusion and coordination",
        facts: [
          "Regeringen gör 'särskilda satsningar' mot digitalt utanförskap",
          "Nämner äldre och utrikes födda som riskgrupper",
          "AI-samordnare placerad på statsrådsberedningen nära statsministern",
          "AI-sekretariat inrättat",
          "Vill att flickor söker sig till STEM-utbildningar"
        ],
        factsEn: [
          "The government makes 'special investments' against digital exclusion",
          "Mentions elderly and foreign-born as risk groups",
          "AI coordinator placed at the PM's office",
          "AI secretariat established",
          "Wants girls to pursue STEM education"
        ],
        quotes: [
          { text: "Snart är det tant Jessica som kan hamna i digitalt utanförskap eller någon annan i min ålder.", speaker: "Jessica Rosencrantz (M)" }
        ],
        connection: "Indirekt koppling till punkt 10 (Digitalt medlemskap från dag ett) via resonemang om att utrikes födda har svårare med digital teknik i myndighetskontakter. Men hon nämner aldrig digital identitet för nyanlända specifikt.",
        connectionEn: "Indirect connection to point 10 (Digital membership from day one) via reasoning that foreign-born have difficulty with digital technology in agency contacts. But she never mentions digital identity for newcomers specifically.",
        jjComment: "",
        jjCommentEn: ""
      }
    ],
    pointMatches: [
      { pointId: 1, pointTitle: "Ett Sverige in, inte femton köer", relevance: "indirect", closestParties: ["M"], comment: "AI-verkstaden och 100 myndigheters AI-uppdrag, men aldrig samlad digital onboarding" },
      { pointId: 2, pointTitle: "100-dagarsgaranti för kompetens", relevance: "none", closestParties: [], comment: "Nämner aldrig kompetensvalidering eller utländska examina" },
      { pointId: 3, pointTitle: "Svenska genom arbete, inte före arbete", relevance: "none", closestParties: [], comment: "Nämner aldrig språkträning, SFI eller AI-språkcoach" },
      { pointId: 4, pointTitle: "Nationell snabbfil till bristyrken", relevance: "indirect", closestParties: ["M"], comment: "Talar om 'snabbspår in' och talangvisum, men enbart för internationell rekrytering till tech" },
      { pointId: 5, pointTitle: "Första riktiga jobbet inom 180 dagar", relevance: "none", closestParties: [], comment: "Nämner aldrig jobbmatchning eller tidsgarantier för arbete" },
      { pointId: 6, pointTitle: "Bosätt efter möjlighet, inte passivitet", relevance: "none", closestParties: [], comment: "Nämner aldrig bosättning eller datadriven placering" },
      { pointId: 7, pointTitle: "Barnen först, alltid", relevance: "indirect", closestParties: ["M"], comment: "Nämner att skolan måste hänga med och att flickor behöver stöd, men aldrig flerspråkiga barn" },
      { pointId: 8, pointTitle: "Hård mot exploatering, mjuk mot människor", relevance: "none", closestParties: [], comment: "Nämner aldrig arbetslivskriminalitet eller exploatering" },
      { pointId: 9, pointTitle: "Nolltolerans mot diskriminering", relevance: "indirect", closestParties: ["M"], comment: "Tangerar ansvarsfull AI och datahantering, men aldrig diskriminering" },
      { pointId: 10, pointTitle: "Digitalt medlemskap från dag ett", relevance: "indirect", closestParties: ["M"], comment: "Nämner digitalt utanförskap bland utrikes födda, men aldrig digital identitet från dag ett" },
      { pointId: 11, pointTitle: "Europas enklaste land att starta företag i", relevance: "direct", closestParties: ["M"], comment: "Explicit: regelförenkling, personaloptioner, lägsta skattetrycket, 'starta, skala, stanna'" },
      { pointId: 12, pointTitle: "Student till byggare av Sverige", relevance: "indirect", closestParties: ["M"], comment: "Talar om talangvisum och att locka kompetens, men aldrig övergångsspår från examen" },
      { pointId: 13, pointTitle: "Cirkulär rörlighet som styrka", relevance: "indirect", closestParties: ["M"], comment: "Tangerar internationellt utbyte och talangrörlighet, men aldrig diaspora-logiken" },
      { pointId: 14, pointTitle: "Snabb och förutsägbar rättsstat", relevance: "indirect", closestParties: ["M"], comment: "Myndighetseffektivisering tangerar snabbare handläggning, men aldrig rättssäkerhet i asyl" },
      { pointId: 15, pointTitle: "Integration som nationell elitgren", relevance: "none", closestParties: [], comment: "Nämner aldrig integration som mätbar disciplin eller öppna dashboards" }
    ],
    partyRankings: [
      { party: "Moderaterna", abbreviation: "M", score: 4, maxScore: 15, reasoning: "1 direkt matchning (punkt 11), 8 indirekta. Bred men grund AI-politik som aldrig kopplar till integration." }
    ],
    missingThemes: [
      { theme: "Integration som begrepp", themeEn: "Integration as a concept", points: "Alla 15", comment: "Ordet 'integration' förekommer inte en enda gång i hela intervjun. Nyanlända existerar inte i M:s AI-politik.", commentEn: "The word 'integration' doesn't appear once in the entire interview. Newcomers don't exist in M's AI policy." },
      { theme: "Den enskilda människans upplevelse", themeEn: "The individual person's experience", points: "1, 2, 3, 5, 10, 14", comment: "Rosencrantz talar om system, bolag, myndigheter och 'Sverige'. Aldrig om den enskilda människan som navigerar systemet.", commentEn: "Rosencrantz talks about systems, companies, agencies and 'Sweden'. Never about the individual navigating the system." },
      { theme: "Kompetensvalidering", themeEn: "Competence validation", points: "2, 4", comment: "Aldrig nämnt. Rosencrantz 'snabbspår' handlar om att rekrytera nya talanger utifrån, inte validera kompetens som redan finns.", commentEn: "Never mentioned. Rosencrantz's 'fast track' is about recruiting new talents from abroad, not validating competence already here." },
      { theme: "AI-stödd språkträning", themeEn: "AI-supported language training", points: "3", comment: "Aldrig nämnt, trots att intervjun handlar om AI:s möjligheter i samhället.", commentEn: "Never mentioned, despite the interview being about AI's potential in society." },
      { theme: "Diskriminering och exploatering", themeEn: "Discrimination and exploitation", points: "8, 9", comment: "Aldrig nämnt. 'Risker' med AI handlar om datahantering och integritet, aldrig om diskriminering.", commentEn: "Never mentioned. 'Risks' with AI concern data handling and privacy, never discrimination." }
    ],
    conclusion: "Rosencrantz levererar en kompetent men förutsägbar intervju om AI som näringspolitik. Hennes 'Silicon Valhalla'-vision handlar om att göra Sverige attraktivt för internationella techbolag. Det är en legitim ambition, men den existerar i ett parallellt universum från de 15 punkternas verklighet. Där ETR (C) byggde infrastrukturen som de 15 punkterna förutsätter, bygger Rosencrantz (M) en motorväg som inte ens passerar de 15 punkternas stadsdel.",
    conclusionEn: "Rosencrantz delivers a competent but predictable interview about AI as industrial policy. Her 'Silicon Valhalla' vision is about making Sweden attractive to international tech companies. That's a legitimate ambition, but it exists in a parallel universe from the 15 points' reality. Where ETR (C) built the infrastructure the 15 points presuppose, Rosencrantz (M) builds a highway that doesn't even pass through the 15 points' neighborhood.",
    jjFinalComment: "Det mest slående med den här intervjun är inte vad Rosencrantz säger, utan vad hon inte säger. Hon pratar i 44 minuter om AI:s potential för Sverige utan att en enda gång nämna integration, nyanlända, kompetensvalidering eller språkträning. Det är inte en oenighet med de 15 punkterna. Det är en blind fläck.\n\nJämförelsen med ETR (C) är instruktiv. ETR hade konkreta siffror, specifika mekanismer och ett infrastrukturtänk som i princip möjliggör de 15 punkterna. Rosencrantz har visioner och allmänna villkor. ETR bygger motorvägen. Rosencrantz målar skylten 'Silicon Valhalla' vid infarten.\n\nOm jag fick 15 minuter med Rosencrantz skulle jag ställa en enda fråga: 'Du vill ha snabbspår för den 16-åriga programmeraren från utlandet. Varför inte för den 35-åriga civilingenjören som redan bor i Tensta och väntat 18 månader på att få sin examen validerad?' Svaret på den frågan skulle avslöja om det här är en blind fläck eller en medveten prioritering.\n\nOch en sista sak: att M inte skickade Kristersson utan EU-ministern är i sig en signal. C skickade sin partiledare. Det säger något om var AI-frågan faktiskt ligger i den interna hierarkin, trots all retorik.",
    jjFinalCommentEn: "The most striking thing about this interview is not what Rosencrantz says, but what she doesn't say. She talks for 44 minutes about AI's potential for Sweden without once mentioning integration, newcomers, competence validation or language training. It's not a disagreement with the 15 points. It's a blind spot.\n\nThe comparison with ETR (C) is instructive. ETR had concrete figures, specific mechanisms and an infrastructure thinking that essentially enables the 15 points. Rosencrantz has visions and general conditions. ETR builds the highway. Rosencrantz paints the 'Silicon Valhalla' sign at the entrance.\n\nIf I had 15 minutes with Rosencrantz I'd ask one question: 'You want a fast track for the 16-year-old programmer from abroad. Why not for the 35-year-old civil engineer already living in Tensta who's waited 18 months to get their degree validated?' The answer to that question would reveal whether this is a blind spot or a conscious priority.\n\nAnd one last thing: that M didn't send Kristersson but the EU minister is itself a signal. C sent their party leader. That says something about where the AI question actually sits in the internal hierarchy, despite all the rhetoric.",
    pdfUrl: "/manus-storage/jr-moderaterna-analys_8ea20d83.pdf",
    mdUrl: "/manus-storage/jr-moderaterna-analys_08899200.md",
    transcriptUrl: "/manus-storage/ai-sweden-2.mp3_77e81abc.txt",
    transcriptLabel: "Ladda ner transkript (TXT)",
    transcriptLabelEn: "Download transcript (TXT)",
    ogDescription: "Rosencrantz (M) når 1 direkt och 8 indirekta matchningar. 'Silicon Valhalla' handlar om techbolag, inte integration. Ordet integration nämns inte en enda gång.",
    ogDescriptionEn: "Rosencrantz (M) scores 1 direct and 8 indirect matches. 'Silicon Valhalla' is about tech companies, not integration. The word integration isn't mentioned once.",
  },
  {
    id: "riksdagsdebatt-2026-06",
    date: "2026-06-10",
    title: "Partiledardebatt i riksdagen",
    titleEn: "Party Leader Debate in Parliament",
    subtitle: "Åtta partiledare, 2h51m, noll omnämnanden av integration som möjlighet",
    subtitleEn: "Eight party leaders, 2h51m, zero mentions of integration as opportunity",
    source: "Sveriges riksdag",
    duration: "2 timmar 51 minuter",
    participants: [
      "Ulf Kristersson (M)",
      "Magdalena Andersson (S)",
      "Jimmie Åkesson (SD)",
      "Nooshi Dadgostar (V)",
      "Elisabeth Thand Ringqvist (C)",
      "Ebba Busch (KD)",
      "Daniel Helldén (MP)",
      "Simona Mohamsson (L)",
    ],
    summary: `Partiledardebatten i riksdagen den 10 juni 2026, 95 dagar före valet, dominerades av fem teman: attacker mot Vänsterpartiets antisemitiska kandidater, vårdköer, ekonomi/tillväxt, energi/klimat, och AI/digitalisering. Av dessa berör bara det sista de 15 punkternas kärnfrågor, och det drevs uteslutande av ETR (C). Ordet "integration" i substantiell mening förekom noll gånger under hela debatten. Riksdagsformatet med 5-minutersanföranden belönar snabba poänger, inte systemtänkande. Resultatet: sämst matchning av alla fyra analyserade tillfällen.`,
    summaryEn: `The party leader debate in parliament on June 10, 2026, 95 days before the election, was dominated by five themes: attacks on the Left Party's antisemitic candidates, healthcare queues, economy/growth, energy/climate, and AI/digitalisation. Only the last of these touches the 15 points' core issues, and it was driven exclusively by ETR (C). The word "integration" in a substantive sense occurred zero times during the entire debate. The parliamentary format with 5-minute speeches rewards quick points, not systems thinking. The result: worst match of all four analysed occasions.`,
    sections: [
      {
        title: "Antisemitism och Vänsterpartiets kandidater",
        titleEn: "Antisemitism and the Left Party's candidates",
        facts: [
          "Expressens granskning avslöjade minst 25 V-kandidater som hyllat Hamas eller spridit antisemitiska konspirationsteorier",
          "V uteslöt de namngivna personerna före publiceringen",
          "SD, C, L och KD attackerade samtliga V under debatten",
          "Dadgostar (V) upprepade att personerna uteslutits och att antisemitism inte tolereras",
          "Andersson (S) undvek frågan om V:s eventuella regeringsmedverkan",
        ],
        factsEn: [
          "Expressen's investigation revealed at least 25 Left Party candidates who praised Hamas or spread antisemitic conspiracy theories",
          "V expelled the named individuals before publication",
          "SD, C, L and KD all attacked V during the debate",
          "Dadgostar (V) repeated that the individuals were expelled and antisemitism is not tolerated",
          "Andersson (S) avoided the question about V's potential government participation",
        ],
        quotes: [
          { text: "Hundratals medlemmar och företrädare som hyllar terrororganisationer. Det är en livsfarlig värdegemenskap.", speaker: "Ebba Busch (KD)" },
          { text: "Vi har uteslutit dem. Det finns ingen plats för antisemitism i Vänsterpartiet.", speaker: "Nooshi Dadgostar (V)" },
        ],
        connection: "Ingen direkt koppling till de 15 punkterna. Indirekt berör temat demokratiska värderingar och integration, men ingen partiledare kopplade det till integrationspolitik eller förebyggande insatser.",
        connectionEn: "No direct connection to the 15 points. Indirectly touches democratic values and integration, but no party leader connected it to integration policy or preventive measures.",
        jjComment: "",
        jjCommentEn: "",
      },
      {
        title: "Vårdköer och sjukvårdspolitik",
        titleEn: "Healthcare queues and health policy",
        facts: [
          "Busch (KD) presenterade siffror: 36% minskning av vårdköer totalt, 70% för framfallsoperationer, 47% för höftleder",
          "V och S ifrågasatte siffrorna och pekade på att köerna var de längsta någonsin under mandatperioden",
          "C förespråkade lokal styrning och förenkling",
          "KD ville förstatliga vården",
        ],
        factsEn: [
          "Busch (KD) presented figures: 36% reduction in healthcare queues overall, 70% for prolapse operations, 47% for hip replacements",
          "V and S questioned the figures and pointed out that queues were the longest ever during the term",
          "C advocated local governance and simplification",
          "KD wanted to nationalise healthcare",
        ],
        quotes: [
          { text: "Vi har kapat vårdköerna med 36 procent. Det är inte ord, det är handling.", speaker: "Ebba Busch (KD)" },
          { text: "Köerna var de längsta någonsin under er mandatperiod.", speaker: "Nooshi Dadgostar (V)" },
        ],
        connection: "Punkt 1 (AI i offentlig förvaltning) berör indirekt sjukvården, men ingen partiledare nämnde AI som verktyg för att korta vårdköer.",
        connectionEn: "Point 1 (AI in public administration) indirectly touches healthcare, but no party leader mentioned AI as a tool to shorten queues.",
        jjComment: "",
        jjCommentEn: "",
      },
      {
        title: "Ekonomi, jobb och tillväxt",
        titleEn: "Economy, jobs and growth",
        facts: [
          "ETR (C): Sveriges tillväxt 0,8% snitt 2023-2025, plats 25 av 27 i EU (Eurostat 5 juni 2026)",
          "ETR (C): EU:s tredje högsta arbetslöshet",
          "ETR (C): Om Sverige presterat som EU-snitt: 45 miljarder mer till välfärd",
          "Kristersson (M): Lovade ytterligare 5 000 kr/månad till barnfamiljer",
          "Andersson (S): 100 000 fler arbetslösa, rekordkonkurser, Sverige lånar 200 000 kr/minut",
        ],
        factsEn: [
          "ETR (C): Sweden's growth 0.8% average 2023-2025, rank 25 of 27 in EU (Eurostat June 5, 2026)",
          "ETR (C): EU's third highest unemployment",
          "ETR (C): If Sweden performed at EU average: 45 billion more for welfare",
          "Kristersson (M): Promised additional 5,000 SEK/month for families with children",
          "Andersson (S): 100,000 more unemployed, record bankruptcies, Sweden borrows 200,000 SEK/minute",
        ],
        quotes: [
          { text: "Tillväxt 0,8 procent i snitt. Plats 25 av 27 i EU. Det är inte ledarskap, det är en symbolhandling.", speaker: "Elisabeth Thand Ringqvist (C)" },
          { text: "Ansträngning ska löna sig, brott ska straffa sig.", speaker: "Ulf Kristersson (M)" },
        ],
        connection: "Punkt 5, 11 och 4 berör alla sysselsättning, men ingen partiledare föreslog de specifika mekanismer som punkterna beskriver.",
        connectionEn: "Points 5, 11 and 4 all touch employment, but no party leader proposed the specific mechanisms the points describe.",
        jjComment: "ETR:s Eurostat-siffror är den hårdaste faktabaserade kritiken i hela debatten. Kristersson försökte hävda att Sverige ligger 'topp i tillväxtligan' och blev direkt motbevisad med källa och datum.",
        jjCommentEn: "ETR's Eurostat figures are the hardest fact-based criticism in the entire debate. Kristersson tried to claim Sweden is 'top of the growth league' and was directly disproven with source and date.",
      },
      {
        title: "Energi och klimat",
        titleEn: "Energy and climate",
        facts: [
          "MP förespråkade förnybar energi och fossiloberoende",
          "KD och SD stödde kärnkraft",
          "C ville ha en bred energiöverenskommelse",
          "Debatt om kommunalt veto mot uranbrytning",
        ],
        factsEn: [
          "MP advocated renewable energy and fossil independence",
          "KD and SD supported nuclear power",
          "C wanted a broad energy agreement",
          "Debate about municipal veto on uranium mining",
        ],
        quotes: [
          { text: "Ett land som är beroende av fossil energi är sårbart. Energi används som vapen.", speaker: "Daniel Helldén (MP)" },
          { text: "Vi behöver en energiöverenskommelse, inte en energikonflikt.", speaker: "Elisabeth Thand Ringqvist (C)" },
        ],
        connection: "Ingen direkt koppling till de 15 punkterna. Energipolitik nämns inte i manifestet.",
        connectionEn: "No direct connection to the 15 points. Energy policy is not mentioned in the manifesto.",
        jjComment: "",
        jjCommentEn: "",
      },
      {
        title: "AI och digitalisering",
        titleEn: "AI and digitalisation",
        facts: [
          "ETR (C) ägnade hela sitt öppningsanförande (5 min) åt AI och digitalisering",
          "Sverige har 1 000+ AI-startups",
          "Nationella AI-strategins budget: knappt 0,5 miljarder vs USA:s tusentals miljarder",
          "AI-kommissionens 75 förslag: bara en handfull genomförda på 1,5 år",
          "ETR vill ha regulatoriska sandlådor, AI-verktyg för elever, kommitté för AI:s arbetsmarknadspåverkan",
          "Busch (KD): Sverige är 'ett hopp i mörkret' för innovation, AI-strategin är 'ett första viktigt steg'",
        ],
        factsEn: [
          "ETR (C) devoted her entire opening speech (5 min) to AI and digitalisation",
          "Sweden has 1,000+ AI startups",
          "National AI strategy budget: barely 0.5 billion vs USA's thousands of billions",
          "AI Commission's 75 proposals: only a handful implemented in 1.5 years",
          "ETR wants regulatory sandboxes, AI tools for students, committee for AI's labour market impact",
          "Busch (KD): Sweden is 'a leap in the dark' for innovation, AI strategy is 'a first important step'",
        ],
        quotes: [
          { text: "AI-kommissionen presenterade 75 förslag för ett och ett halvt år sedan. Hur många har genomförts? En handfull.", speaker: "Elisabeth Thand Ringqvist (C)" },
          { text: "Vi förenklar miljöprövningen från 328 instanser till en. Det släpper loss kraften i svenskt företagande.", speaker: "Ebba Busch (KD)" },
        ],
        connection: "Det enda temat med substantiell koppling till manifestet. ETR:s resonemang berör punkterna 1, 4, 5, 11 och 12 indirekt. Men inte heller ETR kopplade AI till integration.",
        connectionEn: "The only theme with substantial connection to the manifesto. ETR's reasoning indirectly touches points 1, 4, 5, 11 and 12. But even ETR didn't connect AI to integration.",
        jjComment: "Samma ETR som hos AI Sweden talade om regulatoriska sandlådor och AI-generaler reducerades i riksdagen till '5 minuter om AI.' Formatet dödar djupet. Och Busch svar om att 'förenkla miljöprövning' som AI-politik visar att KD fortfarande inte förstår skillnaden mellan att ta bort hinder och att bygga kapacitet.",
        jjCommentEn: "The same ETR who at AI Sweden talked about regulatory sandboxes and AI generals was reduced in parliament to '5 minutes about AI.' The format kills depth. And Busch's response about 'simplifying environmental permitting' as AI policy shows KD still doesn't understand the difference between removing obstacles and building capacity.",
      },
    ],
    pointMatches: [
      { pointId: 1, pointTitle: "AI i offentlig förvaltning", relevance: "indirect", closestParties: ["C"], comment: "ETR nämnde AI i vård, utbildning, service. Men inte kopplat till integration." },
      { pointId: 2, pointTitle: "Språk som nyckel", relevance: "none", closestParties: [], comment: "Helt frånvarande." },
      { pointId: 3, pointTitle: "Validering på dagar, inte år", relevance: "none", closestParties: [], comment: "Helt frånvarande." },
      { pointId: 4, pointTitle: "Snabbfil till bristyrken", relevance: "indirect", closestParties: ["C"], comment: "ETR nämnde yrkesutbildning och att locka forskare/ingenjörer. Men inte kopplat till befintliga invånare." },
      { pointId: 5, pointTitle: "Jobb inom 180 dagar", relevance: "indirect", closestParties: ["C", "S"], comment: "ETR: billigare att anställa. Andersson: jobb och tillväxt. Men ingen 180-dagarsgaranti." },
      { pointId: 6, pointTitle: "Mentorskap som medborgarplikt", relevance: "none", closestParties: [], comment: "Helt frånvarande." },
      { pointId: 7, pointTitle: "Bostäder genom innovation", relevance: "none", closestParties: [], comment: "Bostadspolitik nämndes knappt." },
      { pointId: 8, pointTitle: "Kommunal tävlan", relevance: "none", closestParties: [], comment: "Helt frånvarande." },
      { pointId: 9, pointTitle: "Barns framtid först", relevance: "none", closestParties: [], comment: "Barn nämndes i kontexten vård, inte integration." },
      { pointId: 10, pointTitle: "Nolltolerans mot parallellsamhällen", relevance: "indirect", closestParties: ["KD", "SD"], comment: "Busch: 'burkakrati.' Åkesson: extremism. Men utan de specifika verktygen." },
      { pointId: 11, pointTitle: "Enklaste land att starta företag", relevance: "indirect", closestParties: ["C", "KD"], comment: "ETR: enklare regler. Busch: förenkling. Men inte kopplat till nyanlända." },
      { pointId: 12, pointTitle: "Student till byggare", relevance: "indirect", closestParties: ["C"], comment: "ETR: AI-utbildning, locka forskare. Men inte i integrationskontexten." },
      { pointId: 13, pointTitle: "Data som kompass", relevance: "none", closestParties: [], comment: "Helt frånvarande." },
      { pointId: 14, pointTitle: "Rättigheter och skyldigheter", relevance: "indirect", closestParties: ["M", "SD"], comment: "Kristersson: 'ansträngning ska löna sig.' Men inte i punkt 14:s balanserade ram." },
      { pointId: 15, pointTitle: "Integration som elitgren", relevance: "none", closestParties: [], comment: "Helt frånvarande." },
    ],
    partyRankings: [
      { party: "Centerpartiet", abbreviation: "C", score: 2.5, maxScore: 15, reasoning: "ETR:s AI-anförande berör 5 punkter indirekt. Enda partiet som talade om teknik som samhällsomvandlare." },
      { party: "Kristdemokraterna", abbreviation: "KD", score: 1.5, maxScore: 15, reasoning: "Busch berörde parallellsamhällen, företagande och AI (som svar till ETR). Men inget systemtänkande." },
      { party: "Moderaterna", abbreviation: "M", score: 1.0, maxScore: 15, reasoning: "Kristersson talade om jobb och skyldigheter men utan specifika mekanismer." },
      { party: "Socialdemokraterna", abbreviation: "S", score: 1.0, maxScore: 15, reasoning: "Andersson nämnde AI i förbigående. Fokus på ekonomi utan de 15 punkternas lösningar." },
      { party: "Sverigedemokraterna", abbreviation: "SD", score: 1.0, maxScore: 15, reasoning: "Åkesson berörde parallellsamhällen men uteslutande i kontexten av restriktion." },
      { party: "Liberalerna", abbreviation: "L", score: 0, maxScore: 15, reasoning: "Mohamsson ägnade all tid åt V-attacker och Stockholm-kritik. Inte ett ord om integration eller digitalisering." },
      { party: "Vänsterpartiet", abbreviation: "V", score: 0, maxScore: 15, reasoning: "Dadgostar fokuserade på sjukförsäkring och ekonomisk ojämlikhet." },
      { party: "Miljöpartiet", abbreviation: "MP", score: 0, maxScore: 15, reasoning: "Helldén talade uteslutande om klimat och energi." },
    ],
    missingThemes: [
      { theme: "AI-stödd språkinlärning", themeEn: "AI-supported language learning", points: "Punkt 2", comment: "Inte nämnt en enda gång under 2h51m", commentEn: "Not mentioned once during 2h51m" },
      { theme: "Kompetensvalidering", themeEn: "Competence validation", points: "Punkt 3", comment: "Helt frånvarande trots att det berör hundratusentals människor", commentEn: "Completely absent despite affecting hundreds of thousands" },
      { theme: "Mentorskap", themeEn: "Mentorship", points: "Punkt 6", comment: "Ingen partiledare nämnde civilsamhällets roll", commentEn: "No party leader mentioned civil society's role" },
      { theme: "Kommunal tävlan", themeEn: "Municipal competition", points: "Punkt 8", comment: "Integration diskuterades aldrig som kommunal kapacitet", commentEn: "Integration was never discussed as municipal capacity" },
      { theme: "Datadriven uppföljning", themeEn: "Data-driven follow-up", points: "Punkt 13", comment: "Ingen föreslog mätbarhet i integrationsresultat", commentEn: "No one proposed measurability in integration outcomes" },
      { theme: "Integration som elitgren", themeEn: "Integration as elite discipline", points: "Punkt 15", comment: "Ordet 'integration' i substantiell mening: noll gånger", commentEn: "The word 'integration' in substantive sense: zero times" },
    ],
    conclusion: "Riksdagsdebatten den 10 juni 2026 bekräftar ett mönster: den svenska politiska debatten har inget språk för integration som möjlighet. Integration diskuteras uteslutande som problem eller vapen. Ingen partiledare kopplar ihop teknikskiftet med integrationens infrastruktur. 95 dagar före valet saknar Sverige fortfarande en partiledare som säger: 'Integration är inte ett problem att hantera. Det är en kapacitet att bygga.'",
    conclusionEn: "The parliamentary debate on June 10, 2026 confirms a pattern: Swedish political debate has no language for integration as opportunity. Integration is discussed exclusively as a problem or weapon. No party leader connects the technology shift with integration's infrastructure. 95 days before the election, Sweden still lacks a party leader who says: 'Integration is not a problem to manage. It is a capacity to build.'",
    jjFinalComment: "Tre observationer:\n\n1. Debattformatet dödar innovation. Riksdagsdebatten med sina 5-minutersanföranden och 1-minutsrepliker belönar snabba poänger, inte systemtänkande. ETR hade 5 minuter att presentera hela AI-agendan. I AI Sweden-intervjun hade hon 37 minuter och kunde gå på djupet. Samma person, samma politik, helt olika format. Det säger något om hur vi borde konsumera politik.\n\n2. Antisemitism-temat åt upp allt syre. Förståeligt och viktigt, men konsekvensen var att tre av åtta partier (L, SD, KD) ägnade majoriteten av sin tid åt att attackera V istället för att presentera egen politik. Liberalerna sa inte ett ord om integration, digitalisering eller utbildning. Det är ett val.\n\n3. Glappet mellan AI Sweden-intervjuerna och riksdagen är enormt. Samma ETR som hos AI Sweden talade om regulatoriska sandlådor och AI-generaler reducerades till '5 minuter om AI.' Samma Rosencrantz (M) som talade om 'Silicon Valhalla' var inte ens närvarande. Politikernas AI-kompetens finns, men den får inte plats i det demokratiska samtalet. Det är ett demokratiproblem.",
    jjFinalCommentEn: "Three observations:\n\n1. The debate format kills innovation. The parliamentary debate with its 5-minute speeches and 1-minute replies rewards quick points, not systems thinking. ETR had 5 minutes to present the entire AI agenda. In the AI Sweden interview she had 37 minutes. Same person, same policy, completely different format. That says something about how we should consume politics.\n\n2. The antisemitism theme consumed all oxygen. Understandable and important, but the consequence was that three of eight parties (L, SD, KD) spent most of their time attacking V instead of presenting own policy. The Liberals didn't say a word about integration, digitalisation or education. That's a choice.\n\n3. The gap between the AI Sweden interviews and parliament is enormous. The same ETR who at AI Sweden talked about regulatory sandboxes and AI generals was reduced to '5 minutes about AI.' The same Rosencrantz (M) who talked about 'Silicon Valhalla' wasn't even present. Politicians' AI competence exists, but it doesn't fit in the democratic conversation. That's a democracy problem.",
    pdfUrl: "/manus-storage/riksdagsdebatt-2026-06-analys_0a82f309.pdf",
    mdUrl: "/manus-storage/riksdagsdebatt-2026-06-analys_becf3686.md",
    transcriptUrl: "/manus-storage/partiledardebattiriksdagen20260610_e16b9e1f.pdf",
    transcriptLabel: "Ladda ner transkript (PDF)",
    transcriptLabelEn: "Download transcript (PDF)",
    ogDescription: "Riksdagsdebatten 10 juni: 0 direkta matchningar, 7 indirekta. Ordet 'integration' i substantiell mening: noll gånger på 2h51m. Debattformatet dödar innovation.",
    ogDescriptionEn: "Parliament debate June 10: 0 direct matches, 7 indirect. The word 'integration' in substantive sense: zero times in 2h51m. The debate format kills innovation.",
  },
];
