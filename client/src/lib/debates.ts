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
  },
];
