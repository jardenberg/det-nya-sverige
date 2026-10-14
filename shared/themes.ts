import type { BilingualText } from "./explore";

export interface ThemeConnection {
  pointId: number;
  strand: BilingualText;
  reason: BilingualText;
  /** Verbatim evidence from the Swedish manifesto. English UI labels it as original. */
  evidence: string;
}
export interface ManifestoTheme {
  id: string;
  title: BilingualText;
  short: BilingualText;
  description: BilingualText;
  thesis: BilingualText;
  connections: ThemeConnection[];
}
const text = (sv: string, en: string): BilingualText => ({ sv, en });
const connection = (pointId: number, svStrand: string, enStrand: string, svReason: string, enReason: string, evidence: string): ThemeConnection => ({ pointId, strand: text(svStrand, enStrand), reason: text(svReason, enReason), evidence });

/** Editorial navigation, not claims that a party endorsed a manifesto proposal.
 * Evidence is checked against points.ts in tests. Overlap is intentional.
 */
export const manifestoThemes: ManifestoTheme[] = [
  {
    id: "language", title: text("Språk som infrastruktur", "Language as infrastructure"), short: text("Språk", "Language"),
    description: text("Inte bara att lära sig svenska. Att förstå ett beslut, använda sin kompetens, följa sitt barns skolgång och kunna hävda sin rätt.", "Not just learning Swedish. Understanding a decision, using your skills, following your child's schooling and being able to assert your rights."),
    thesis: text("Punkt 3 är språkcoachen. Men språk är också ett gränssnitt till samhället, en resurs i skolan och en fråga om makt. Därför löper samma idé genom elva punkter.", "Point 3 is the language coach. But language is also an interface to society, a resource in school and a question of power. The same idea therefore runs through eleven points."),
    connections: [
      connection(1, "Förstå och delta", "Understand and participate", "AI-lotsen översätter och förklarar vägen in i samhället.", "The AI guide translates and explains the route into society.", "AI översätter, förklarar, sammanfattar"),
      connection(10, "Förstå och delta", "Understand and participate", "Språkstöd ingår i det digitala medlemskapet från första dagen.", "Language support is part of digital membership from day one.", "bokningar, språkstöd, samhällsinformation"),
      connection(14, "Förstå och delta", "Understand and participate", "Ett begripligt ärende kräver översättning, inte bara en statuskod.", "An understandable case needs translation, not just a status code.", "översättning på eget språk"),
      connection(15, "Förstå och delta", "Understand and participate", "Även uppföljning och insyn ska vara tillgängliga på flera språk.", "Monitoring and public scrutiny should also be available in multiple languages.", "tillgänglig på 40 språk"),
      connection(3, "Lära och arbeta samtidigt", "Learn and work together", "Yrkesord, talträning och översättning kopplas till det liv som redan pågår.", "Professional vocabulary, speaking practice and translation connect to life already happening.", "Parallell kompetens och parallellt språk – inte sekventiellt."),
      connection(5, "Lära och arbeta samtidigt", "Learn and work together", "Matchningen tar hänsyn till språkprogression och faktisk förmåga.", "Matching takes language progress and actual ability into account.", "färdigheter, språkprogression, arbetsprov"),
      connection(6, "Lära och arbeta samtidigt", "Learn and work together", "Bosättningsinformationen visar språkutbildning tillsammans med jobb och bostad.", "Settlement information shows language education alongside jobs and housing.", "här finns språkutbildning"),
      connection(7, "Skola och hem", "School and home", "Språkstöd, studiehandledning och översatta vårdnadshavarflöden länkar barnet, läraren och familjen.", "Language support, study guidance and translated parent communication connect child, teacher and family.", "översatta vårdnadshavarflöden, AI-stött språkstöd"),
      connection(8, "Rättigheter och möjligheter", "Rights and opportunities", "Kontrakt på eget språk gör rättigheter möjliga att förstå och använda.", "Contracts in one's own language make rights understandable and usable.", "kontrakt på sitt språk, lönekoll, rättighetsguide"),
      connection(9, "Rättigheter och möjligheter", "Rights and opportunities", "Flerspråkighet behandlas som kompetens, inte som brist.", "Multilingualism is treated as a skill, not a deficit.", "Flerspråkighet blir en formell merit"),
      connection(11, "Rättigheter och möjligheter", "Rights and opportunities", "Företagsspåret minskar beroendet av att behärska myndighetssvenska.", "The business track reduces dependence on mastering bureaucratic Swedish.", "utan att man först måste bli expert på svensk myndighetssvenska"),
    ],
  },
  {
    id: "work", title: text("Kompetens till arbete", "Skills into work"), short: text("Arbete & kompetens", "Work & skills"),
    description: text("Från att bevisa vad man kan till att få använda det. Validering, snabbspår, matchning och verkliga val hör ihop.", "From proving what you know to putting it to use. Validation, fast tracks, matching and real choices belong together."),
    thesis: text("Ett jobb är inte slutet på en kö. Det är resultatet av att flera hinder tas bort samtidigt.", "A job is not the end of a queue. It is the result of removing several barriers at once."),
    connections: [
      connection(2, "Synliggöra förmåga", "Make ability visible", "Kompetenspasset ger ett besked och visar vad som behöver kompletteras.", "The skills passport gives a decision and shows what needs supplementing.", "ett digitalt kompetenspass"),
      connection(4, "Synliggöra förmåga", "Make ability visible", "Snabbspåret förkortar vägen från befintlig kompetens till svensk licens.", "The fast track shortens the route from existing skills to a Swedish licence.", "handledd praktik och betald komplettering"),
      connection(3, "Använda förmåga", "Use ability", "Språk och arbete utvecklas parallellt.", "Language and work develop in parallel.", "Språket lär man sig bäst när det används"),
      connection(5, "Använda förmåga", "Use ability", "Matchningen utgår från färdigheter och potential.", "Matching starts from skills and potential.", "faktisk potential"),
      connection(6, "Använda förmåga", "Use ability", "Jobb, skola, pendling och bostad visas som sammanhängande möjligheter.", "Jobs, schools, commuting and housing are shown as connected opportunities.", "verkliga val"),
      connection(9, "Rättvis tillgång", "Fair access", "Färdighetsprov och biasgranskning ska motverka diskriminering.", "Skills tests and bias audits should counter discrimination.", "färdighetsprov före magkänsla"),
      connection(12, "Rättvis tillgång", "Fair access", "Internationella studenter får övergångar till jobb och forskning.", "International students get transitions to work and research.", "från examen till jobb, forskning, startup eller offentlig tjänst"),
    ],
  },
  {
    id: "learning", title: text("Lärande genom hela livet", "Learning throughout life"), short: text("Barn & lärande", "Children & learning"),
    description: text("Barnets skola, den vuxnes språk och yrkeskunskap: teknik som stöd utan att ta över människans ansvar.", "A child's school, an adult's language and professional skills: technology that supports without taking over human responsibility."),
    thesis: text("Lärande ska knytas till livet, inte användas som ett väntrum före livet.", "Learning should connect to life, not become a waiting room before life."),
    connections: [
      connection(7, "Läraren leder", "The teacher leads", "Flerspråkiga verktyg stärker lärarens räckvidd och kontakten med hemmet.", "Multilingual tools extend teachers' reach and contact with home.", "tekniken är stöd, läraren är ledare"),
      connection(3, "Träna i vardagen", "Practise in daily life", "Personlig träning kopplas till jobb, utbildning och vardag.", "Personal practice connects to work, education and daily life.", "träna lite, ofta, relevant och på egen nivå"),
      connection(4, "Komplettera, inte börja om", "Supplement, don't restart", "Kunskapstest, simuleringar och praktik bygger på befintlig kompetens.", "Knowledge tests, simulations and placements build on existing skills.", "AI-stödda kunskapstest"),
      connection(12, "Fortsätta bidra", "Keep contributing", "Examen ska leda vidare till arbete, forskning eller företagande.", "Graduation should lead on to work, research or entrepreneurship.", "innan studenten tar examen"),
    ],
  },
  {
    id: "services", title: text("Staten som plattform", "The state as a platform"), short: text("Myndigheter & data", "Public services & data"),
    description: text("En väg in, säker identitet, begripliga ärenden och data som kan användas av fler.", "One way in, secure identity, understandable cases and data more people can use."),
    thesis: text("Samma människa ska inte behöva börja om i varje myndighetsgränssnitt.", "The same person should not have to start over at every agency interface."),
    connections: [
      connection(1, "Gemensam ingång", "Shared entry", "Onboardingen kopplar ihop myndigheternas tjänster.", "Onboarding connects agencies' services.", "ett gemensamt gränssnitt"),
      connection(10, "Gemensam ingång", "Shared entry", "Digital identitet öppnar tjänsterna från dag ett.", "Digital identity opens services from day one.", "säker digital identitet"),
      connection(14, "Begriplig process", "Understandable process", "Status, ansvar och nästa steg ska vara synliga.", "Status, responsibility and next steps should be visible.", "ansvarig funktion"),
      connection(6, "Data som möjlighet", "Data as opportunity", "Information om kommuner stödjer människors egna val.", "Information about municipalities supports people's own choices.", "bättre information och verkliga val"),
      connection(15, "Data som möjlighet", "Data as opportunity", "Öppna data och API:er gör det möjligt att bygga vidare.", "Open data and APIs make it possible to build further.", "öppnar data, API:er och testbäddar"),
    ],
  },
  {
    id: "rights", title: text("Makt, rättigheter och ansvar", "Power, rights and accountability"), short: text("Rättigheter", "Rights"),
    description: text("Tekniken ska minska utsatthet, inte bara öka kontroll. Människor måste kunna förstå, granska och säga ifrån.", "Technology should reduce vulnerability, not just increase control. People must be able to understand, scrutinise and speak up."),
    thesis: text("Snabbare system är bara bättre om de också är rättssäkra och möjliga att granska.", "Faster systems are only better if they also uphold rights and can be scrutinised."),
    connections: [
      connection(8, "Skydd och egenmakt", "Protection and agency", "Rättighetsguide och visselblåsning hjälper arbetstagaren att agera.", "Rights guidance and whistleblowing help workers act.", "anonym visselblåsning"),
      connection(9, "Granska systemen", "Audit the systems", "Automatiserade urval ska kunna förklaras och stängas av.", "Automated selection must be explainable and possible to stop.", "granskas, förklaras och stängas av"),
      connection(14, "Granska systemen", "Audit the systems", "AI-stöd får inte dölja maktutövning.", "AI support must not conceal the exercise of authority.", "maktutövning får aldrig döljas bakom en svart låda"),
      connection(15, "Synligt ansvar", "Visible accountability", "Öppen uppföljning gör även misslyckanden synliga.", "Open monitoring makes failures visible too.", "Om vi misslyckas ska det synas"),
      connection(1, "Synligt ansvar", "Visible accountability", "Lotsen stödjer medan handläggaren bedömer och tar ansvar.", "The guide supports while the caseworker judges and takes responsibility.", "handläggaren gör bedömningar och tar ansvar"),
    ],
  },
  {
    id: "enterprise", title: text("Fler som får bygga", "More people able to build"), short: text("Företagande", "Entrepreneurship"),
    description: text("Lägre trösklar till företagande, internationell talang och öppna gränssnitt.", "Lower barriers to entrepreneurship, international talent and open interfaces."),
    thesis: text("Integration handlar också om vem som kan skapa nästa företag, tjänst eller forskningsmiljö.", "Integration is also about who can create the next company, service or research environment."),
    connections: [
      connection(11, "Starta och växa", "Start and grow", "Ett flerspråkigt företagsspår med AI och mänsklig mentor.", "A multilingual business track with AI and a human mentor.", "en mänsklig affärsmentor"),
      connection(12, "Talang till byggande", "Talent into building", "Studenter kopplas till medgrundare och innovationsmiljöer.", "Students connect to co-founders and innovation environments.", "hitta medgrundare"),
      connection(13, "Nätverk utan gränser", "Networks without borders", "Diasporan kan investera och samarbeta även på distans.", "The diaspora can invest and collaborate remotely too.", "bidra på distans, investera, forska"),
      connection(15, "Gemensam byggyta", "Shared foundations", "Startups och civilsamhälle får bygga på gemensam infrastruktur.", "Startups and civil society can build on shared infrastructure.", "bygga bättre lösningar ovanpå gemensam infrastruktur"),
    ],
  },
  {
    id: "mobility", title: text("Rörlighet som resurs", "Mobility as a resource"), short: text("Rörlighet", "Mobility"),
    description: text("Stanna, återvända eller bidra på distans. Kompetens och nätverk ska inte fastna vid en gräns.", "Stay, return or contribute remotely. Skills and networks should not get stuck at a border."),
    thesis: text("Ett land kan vara ett nav i människors liv utan att kräva permanent stillastående.", "A country can be a hub in people's lives without demanding permanent immobility."),
    connections: [
      connection(13, "Bidra från flera platser", "Contribute from multiple places", "Portabla meriter och enkla återinträden bevarar kontakten.", "Portable credentials and easy re-entry preserve connections.", "portabla meriter, digitala kompetensplånböcker"),
      connection(12, "Stanna och bidra", "Stay and contribute", "Övergångsspåret gör det lättare att stanna efter examen.", "The transition track makes it easier to stay after graduation.", "Uppehållstillstånd för arbete efter examen"),
      connection(2, "Meriter över gränser", "Credentials across borders", "Utländska utbildningar och erfarenheter ska kunna användas här.", "Foreign qualifications and experience should be usable here.", "Examina, certifikat, arbetsprover, referenser och erfarenheter"),
      connection(6, "Verkliga val", "Real choices", "Information hjälper människor att välja var de kan bygga ett liv.", "Information helps people choose where they can build a life.", "Inte för att styra människor som pjäser"),
    ],
  },
  {
    id: "ai", title: text("AI som hävstång, inte huvudperson", "AI as a lever, not the protagonist"), short: text("AI & mänskligt ansvar", "AI & human responsibility"),
    description: text("Översätta, matcha, träna och granska. Konkreta användningar med en tydlig gräns för automatiserad makt.", "Translate, match, practise and audit. Concrete uses with a clear boundary on automated power."),
    thesis: text("AI kopplas till konkreta hinder och ett mänskligt ansvar, inte till ett allmänt löfte om effektivitet.", "AI connects to specific barriers and human accountability, not to a general promise of efficiency."),
    connections: [
      connection(1, "Förklara och stödja", "Explain and support", "AI-lotsen gör information begriplig, handläggaren beslutar.", "The AI guide makes information understandable; the caseworker decides.", "en AI-lots i fickan"),
      connection(2, "Synliggöra och matcha", "Reveal and match", "AI tolkar dokument och föreslår kompletteringar.", "AI interprets documents and suggests supplements.", "Människan fattar beslutet"),
      connection(5, "Synliggöra och matcha", "Reveal and match", "Matchning ska se potential och minska väntan.", "Matching should see potential and reduce waiting.", "AI ska ersätta väntan, inte människan"),
      connection(3, "Förstärka lärande", "Strengthen learning", "Språkcoachen anpassar träningen till individen.", "The language coach adapts practice to the individual.", "en personlig språkcoach"),
      connection(7, "Förstärka lärande", "Strengthen learning", "Tekniken förstärker läraren, den ersätter inte läraren.", "Technology strengthens teachers; it does not replace them.", "Vi ska inte bygga botskolor"),
      connection(8, "Skydda och granska", "Protect and audit", "Dataanalys kan upptäcka exploatering tidigare.", "Data analysis can detect exploitation earlier.", "misstänkta mönster av arbetslivskriminalitet"),
      connection(9, "Skydda och granska", "Protect and audit", "AI måste själv kunna granskas för diskriminering.", "AI itself must be auditable for discrimination.", "reproducerar gamla fördomar"),
      connection(14, "Skydda och granska", "Protect and audit", "Sammanfattning och flaggning skiljs från dold maktutövning.", "Summarising and flagging are separated from hidden authority.", "AI kan sammanfatta, strukturera, prioritera och flagga"),
    ],
  },
];

export function themesForPoint(pointId: number) {
  return manifestoThemes.filter(theme => theme.connections.some(c => c.pointId === pointId));
}
export function getTheme(id: string | undefined) {
  return manifestoThemes.find(theme => theme.id === id);
}
