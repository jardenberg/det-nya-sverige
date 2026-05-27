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
  },
];
