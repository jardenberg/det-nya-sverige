/*
 * Det Nya Sverige – 15 Punkter
 * Design: Nordic Monumentalism
 * Each point: number, title, subtitle, body, quote, category
 */

export interface PolicyPoint {
  id: number;
  title: string;
  subtitle: string;
  body: string;
  quote: string;
  quoteAuthor: string;
  category: string;
}

export const policyPoints: PolicyPoint[] = [
  {
    id: 1,
    title: "Språket som gåva, inte som mur",
    subtitle: "Gratis, intensiv svenskundervisning från dag ett – med barnomsorg, lön och mentorskap",
    body: "Vi inför en helt ny modell för språkinlärning: varje nyanländ person erbjuds omedelbart en intensiv, heltidsfinansierad språkutbildning med full ersättning. Barnomsorg ingår. Varje deltagare kopplas till en svensktalande mentor – inte en byråkrat, utan en medmänniska. Målet är inte att klara ett test, utan att kunna skämta med grannen, förstå sitt barns läxor och argumentera på arbetsplatsträffen. Vi investerar 15 miljarder kronor årligen och gör SFI till världens bästa språkprogram. Kanada och Nya Zeeland har visat att tidiga, generösa språkinvesteringar betalar sig mångfalt.",
    quote: "Ett nytt språk är ett nytt liv.",
    quoteAuthor: "Persiskt ordspråk",
    category: "Språk & Utbildning",
  },
  {
    id: 2,
    title: "Nyckeln till dörren",
    subtitle: "Statlig bostadsgaranti och 200 000 nya bostäder med blandad upplåtelseform",
    body: "Bostadskrisen är inte ett invandringsproblem – det är ett politiskt misslyckande. Vi lanserar det största bostadsprogrammet sedan miljonprogrammet: 200 000 nya bostäder på fem år, med krav på blandade upplåtelseformer i varje kvarter. Ingen kommun slipper undan. Vi inför en statlig bostadsgaranti som ger varje nyanländ familj ett kontrakt inom 30 dagar. Segregation bekämpas genom att bygga bort den – inte genom att peka finger åt dem som bor i den. Wien har visat att offentligt bostadsbyggande skapar stabila, blandade stadsdelar.",
    quote: "Att ha ett hem är att ha en framtid.",
    quoteAuthor: "Desmond Tutu",
    category: "Bostad & Samhälle",
  },
  {
    id: 3,
    title: "Ditt yrke räknas",
    subtitle: "Snabbspår för validering av utländska utbildningar och yrkeserfarenheter inom 90 dagar",
    body: "Det är en skandal att läkare kör taxi och ingenjörer städar trapphus – inte för att det är fel att köra taxi eller städa, utan för att vi slösar bort kompetens vi desperat behöver. Vi inför en 90-dagarsgaranti för validering av utländska utbildningar. Varje yrkesbedömning ska vara klar inom tre månader, med kompletterande utbildning som startar omedelbart. Vi skapar regionala valideringscentra med branschexperter, inte bara pappersgranskare. Sverige rankas redan tvåa i Global Innovation Index – tänk vad vi kan göra om vi faktiskt använder all den kompetens som redan finns här.",
    quote: "Slösa inte med människors talang. Det är den enda resursen vi aldrig får tillbaka.",
    quoteAuthor: "",
    category: "Arbete & Kompetens",
  },
  {
    id: 4,
    title: "Starta Sverige",
    subtitle: "Nystartsfond på 10 miljarder och världens enklaste företagsregistrering för alla invånare",
    body: "Invandrare startar företag i högre grad än infödda svenskar. Ändå möter de fler hinder: inga bankkontakter, ingen kredithistorik, ingen som förstår deras affärsidé. Vi skapar en Nystartsfond på 10 miljarder kronor med mikrolån, rådgivning och coworking-hubbar i varje kommun. Företagsregistrering ska ta en dag, inte en månad. Vi inför ett startup-visum som gör Sverige till Europas mest attraktiva land för internationella entreprenörer. I USA har invandrare grundat över hälften av alla unicorn-företag. Vi vill ha samma kraft här.",
    quote: "Entreprenörskap är den ultimata integrationsmotorn.",
    quoteAuthor: "",
    category: "Näringsliv & Innovation",
  },
  {
    id: 5,
    title: "Barnen först, alltid",
    subtitle: "Universell förskola från 1 år, tvåspråkig pedagogik och läxhjälp som rättighet",
    body: "Inget barn ska börja skolan med ett handikapp för att föräldrarna kom från ett annat land. Vi inför universell förskola från ett års ålder med tvåspråkig pedagogik – barnets modersmål är en tillgång, inte ett problem. Varje skola med mer än 20% nyanlända elever får dubbla resurser, inte färre. Läxhjälp blir en lagstadgad rättighet. Vi rekryterar 10 000 flerspråkiga pedagoger och betalar dem som specialister. Forskning från OECD visar att tidiga utbildningsinsatser ger den högsta avkastningen av alla samhällsinvesteringar.",
    quote: "Utbildning är det mest kraftfulla vapnet du kan använda för att förändra världen.",
    quoteAuthor: "Nelson Mandela",
    category: "Utbildning & Barn",
  },
  {
    id: 6,
    title: "Medborgarskap som välkomstkram",
    subtitle: "Snabbare väg till medborgarskap med ceremoni, rättigheter och skyldigheter från dag ett",
    body: "Vi kortar vägen till medborgarskap till tre år för den som arbetar, studerar eller driver företag. Men vi gör också medborgarskapsceremonin till något stort och vackert – en nationell högtid, inte en stämpel på ett papper. Varje ny medborgare får en personlig inbjudan, en mentor och en röst i samhället. Vi inför kommunal rösträtt efter ett år. Tillhörighet skapas inte genom att hålla människor på avstånd – den skapas genom att bjuda in dem. Nya Zeeland och Kanada har visat att generösa medborgarskapsregler stärker, inte försvagar, den nationella sammanhållningen.",
    quote: "Tillhörighet är inte en belöning. Det är en förutsättning.",
    quoteAuthor: "",
    category: "Demokrati & Tillhörighet",
  },
  {
    id: 7,
    title: "Grannskap utan gränser",
    subtitle: "Grannskapskontrakt: lokala investeringspakter mellan kommun, näringsliv och invånare",
    body: "Vi inför Grannskapskontrakt – bindande avtal mellan kommun, näringsliv och invånare i varje stadsdel. Kontrakten garanterar investeringar i skolor, parker, kollektivtrafik och arbetsplatser i utbyte mot lokalt engagemang. Varje kontrakt förvaltas av ett grannskapsråd där hälften av platserna reserveras för nyanlända. Vi avsätter 5 miljarder årligen till en Grannskapsfond. Frankrike har testat liknande modeller i sina banlieues med mätbara resultat – vi tar konceptet vidare och gör det till standard.",
    quote: "Det krävs en hel by för att uppfostra ett barn – och en hel stadsdel för att bygga ett samhälle.",
    quoteAuthor: "",
    category: "Bostad & Samhälle",
  },
  {
    id: 8,
    title: "Vården som brygga",
    subtitle: "Flerspråkig primärvård, psykisk hälsa som prioritet och 5 000 vårdambassadörer",
    body: "Hälsa är grunden för allt annat. Vi bygger ut primärvården med flerspråkiga vårdcentraler i varje kommun och anställer 5 000 vårdambassadörer – personer med egen migrationserfarenhet som guidar nyanlända genom vårdsystemet. Psykisk hälsa prioriteras: traumabehandling ska erbjudas inom 30 dagar, inte 18 månader. Vi investerar 8 miljarder i en vårdreform som erkänner att kropp och själ inte kan integreras var för sig. Sverige har redan världens bästa sjukvård i många avseenden – nu gör vi den tillgänglig för alla.",
    quote: "En frisk människa har tusen drömmar. En sjuk människa har bara en.",
    quoteAuthor: "Indiskt ordspråk",
    category: "Hälsa & Omsorg",
  },
  {
    id: 9,
    title: "Kulturkraft",
    subtitle: "Nationellt kulturutbyte: 1 miljard till konst, musik och berättande som bygger broar",
    body: "Kultur är inte grädde på moset – det är moset. Vi investerar 1 miljard kronor årligen i ett nationellt kulturutbytesprogram: konsthus, musikscener, filmfonder och litteraturstipendier som specifikt stödjer tvärkulturellt skapande. Varje kommun får ett Kulturhus Nya Sverige – en mötesplats för berättelser, mat, musik och konst från hela världen. Vi inrättar ett nytt nationellt pris: Nya Sverige-priset, för den som bäst bidrar till kulturell förnyelse. Berlins kulturella renässans efter murens fall visar vad som händer när kulturer möts fritt.",
    quote: "Kultur äter strategi till frukost.",
    quoteAuthor: "Peter Drucker (fritt)",
    category: "Kultur & Identitet",
  },
  {
    id: 10,
    title: "Digital allemansrätt",
    subtitle: "Gratis digital infrastruktur, AI-driven samhällsservice och tech-utbildning för alla",
    body: "Vi gör digital tillgång till en grundläggande rättighet. Varje invånare får gratis bredband, en digital identitet och tillgång till AI-driven samhällsservice på sitt eget språk. Vi lanserar ett nationellt tech-utbildningsprogram – 50 000 platser årligen i programmering, AI och digital kompetens, med särskild prioritet för nyanlända. Sverige rankas redan bland världens mest digitaliserade länder. Nu tar vi steget till att bli det första landet där ingen lämnas utanför den digitala revolutionen.",
    quote: "Framtiden tillhör dem som lär sig nya färdigheter och hittar nya sätt att använda dem.",
    quoteAuthor: "",
    category: "Digitalisering & Framtid",
  },
  {
    id: 11,
    title: "Arbetsmarknadens nya spelregler",
    subtitle: "Anonym rekrytering som lag, mångfaldsbonus till företag och nolltolerans mot diskriminering",
    body: "Vi inför anonym rekrytering som lag för alla arbetsgivare med fler än 25 anställda. Företag som aktivt rekryterar från underrepresenterade grupper får en mångfaldsbonus – en skattereduktion på 15% av lönekostnaden under första året. Diskrimineringsombudsmannen får tredubblade resurser och rätt att utdöma kännbara böter. Vi skapar branschspecifika integrationsprogram i samarbete med fackföreningar och arbetsgivare. Målet: inom fem år ska sysselsättningsgapet mellan inrikes och utrikes födda halveras.",
    quote: "Mångfald är att bli inbjuden till festen. Inkludering är att bli uppbjuden till dans.",
    quoteAuthor: "Vernā Myers",
    category: "Arbete & Kompetens",
  },
  {
    id: 12,
    title: "Folkets röst",
    subtitle: "Medborgarråd, ungdomsparlament och direktdemokrati i integrationsfrågorna",
    body: "Integration är för viktigt för att överlåtas åt politiker ensamma. Vi inrättar permanenta medborgarråd i varje kommun – slumpmässigt utvalda invånare som ger bindande rekommendationer om lokala integrationsfrågor. Vi skapar ett nationellt ungdomsparlament för integration med verklig makt och budget. Varje stor reform föregås av deliberativa processer där nyanlända och etablerade svenskar möts öga mot öga. Irlands medborgarråd visade att vanliga människor kan lösa frågor som politiker inte vågar röra.",
    quote: "Demokrati är inte bara att rösta vart fjärde år. Det är att lyssna varje dag.",
    quoteAuthor: "",
    category: "Demokrati & Tillhörighet",
  },
  {
    id: 13,
    title: "Grönt nytt land",
    subtitle: "Klimatomställningen som integrationsprojekt: 100 000 gröna jobb till nyanlända",
    body: "Klimatomställningen och integrationen är inte konkurrerande projekt – de är samma projekt. Vi skapar 100 000 gröna jobb specifikt riktade till nyanlända: solcellsinstallatörer, vindkraftstekniker, cirkulär ekonomi-specialister, stadsodlare. Varje jobb kommer med utbildning och certifiering. Vi gör Sverige till världens första land som kopplar ihop sin klimatplan med sin integrationsplan. Lunds universitet rankas redan som världens mest hållbara – nu bygger vi ett helt land i den andan.",
    quote: "Vi ärver inte jorden av våra föräldrar. Vi lånar den av våra barn – alla våra barn.",
    quoteAuthor: "",
    category: "Klimat & Hållbarhet",
  },
  {
    id: 14,
    title: "Berättelsen om oss",
    subtitle: "En ny nationell berättelse: Sverige som världens mest framgångsrika mångkulturprojekt",
    body: "Vi behöver en ny berättelse om Sverige. Inte den om ett hotat homogent paradis, utan den om ett land som alltid har förändrats och alltid blivit starkare av det. Vi investerar i forskning, journalistik och folkbildning som synliggör invandringens bidrag genom historien – från vallonerna till tech-grundarna. Vi skapar ett nationellt museum för migration och rörelse. Vi ändrar läroplanen så att varje barn lär sig att Sverige alltid har varit ett land i rörelse. Berättelser formar verkligheten – och vi väljer en berättelse som öppnar dörrar.",
    quote: "Den som kontrollerar berättelsen kontrollerar framtiden. Låt oss berätta en bättre historia.",
    quoteAuthor: "",
    category: "Kultur & Identitet",
  },
  {
    id: 15,
    title: "Mätbart, transparent, ärligt",
    subtitle: "Årlig integrationsrapport med öppna data, tydliga mål och politiskt ansvar",
    body: "Allt vi gör ska mätas, publiceras och debatteras. Vi inför en årlig nationell integrationsrapport med öppna data – inte för att kontrollera människor, utan för att kontrollera politiken. Varje punkt i detta program får mätbara mål och en ansvarig minister. Resultaten presenteras i riksdagen och på en öppen digital plattform där varje medborgare kan följa utvecklingen i sin kommun. Om vi misslyckas ska det synas. Om vi lyckas ska det firas. Transparens är inte en svaghet – det är det starkaste verktyget vi har.",
    quote: "Det som mäts blir gjort. Det som syns blir bättre.",
    quoteAuthor: "",
    category: "Styrning & Transparens",
  },
];

export const categories = [
  "Alla",
  "Språk & Utbildning",
  "Bostad & Samhälle",
  "Arbete & Kompetens",
  "Näringsliv & Innovation",
  "Utbildning & Barn",
  "Demokrati & Tillhörighet",
  "Hälsa & Omsorg",
  "Kultur & Identitet",
  "Digitalisering & Framtid",
  "Klimat & Hållbarhet",
  "Styrning & Transparens",
];
