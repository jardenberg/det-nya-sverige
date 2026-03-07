import type { Lang } from "@/contexts/LanguageContext";

const strings = {
  heroTagline: {
    sv: "Ett manifest för framtiden",
    en: "A manifesto for the future",
  },
  heroTitle1: { sv: "Det Nya", en: "The New" },
  heroTitle2: { sv: "Sverige", en: "Sweden" },
  heroSubtitle: {
    sv: "15 punkter som underlättar människors resa\ni stället för det motsatta",
    en: "15 points that ease people's journey\ninstead of the opposite",
  },
  introQuestion: {
    sv: "\"Tycker du att Sverige har släppt in för många invandrare?\"",
    en: "\"Do you think Sweden has let in too many immigrants?\"",
  },
  introP1: {
    sv: "Frågan utgår ifrån att Sverige har ett tak för hur många som kan flytta hit, integreras och bidra till samhället. Men det där taket är inte en fysisk eller rationell nivå – det är en social och legal konstruktion.",
    en: "The question assumes that Sweden has a ceiling for how many people can move here, integrate and contribute to society. But that ceiling is not a physical or rational level – it's a social and legal construction.",
  },
  introP2Prefix: {
    sv: "Politikerna borde svara på frågan ",
    en: "Politicians should answer the question ",
  },
  introP2Highlight: {
    sv: "\"Hur kan vi integrera många fler?\"",
    en: "\"How can we integrate many more?\"",
  },
  introP2Suffix: {
    sv: " i stället för att lura i oss att vi måste dansa limbo under en given ribba.",
    en: " instead of tricking us into believing we must limbo under a fixed bar.",
  },
  introP3: {
    sv: "Vi håller faktiskt, på riktigt, på att bli för få. Så här är 15 punkter som underlättar människors resa. Inte det motsatta.",
    en: "We are actually, truly, becoming too few. Here are 15 points that ease people's journey. Not the opposite.",
  },
  introImageCaption: { sv: "FRAMÅT, TILLSAMMANS", en: "FORWARD, TOGETHER" },
  introSeparator: { sv: "15 PUNKTER", en: "15 POINTS" },
  readMore: { sv: "Läs mer", en: "Read more" },
  close: { sv: "Stäng", en: "Close" },
  closingTitle: {
    sv: "Gjort är gjort och vi får spela bollen där den ligger",
    en: "What's done is done and we play the ball where it lies",
  },
  closingP1: {
    sv: "Mitt svar på frågan? Nej, jag tycker inte vi har \"släppt in för många\" och för övrigt är det ju en helt meningslös fråga. Gjort är gjort och vi får spela bollen där den ligger, som golfarna säger.",
    en: "My answer to the question? No, I don't think we've \"let in too many\" and besides, it's a completely meaningless question. What's done is done and we play the ball where it lies, as the golfers say.",
  },
  closingP2Prefix: {
    sv: "Men det intressanta är inte svaret – det är att vi ställer fel fråga. Frågan borde vara: ",
    en: "But the interesting thing isn't the answer – it's that we're asking the wrong question. The question should be: ",
  },
  closingP2Highlight: {
    sv: "Hur bygger vi ett land som är så bra på att ta emot människor att hela världen vill lära sig av oss?",
    en: "How do we build a country so good at welcoming people that the whole world wants to learn from us?",
  },
  closingP3: {
    sv: "Sverige rankas redan bland världens mest innovativa, mest digitaliserade och mest hållbara länder. Vi har universiteten, infrastrukturen och – framför allt – människorna. Det enda som saknas är modet att formulera problemet rätt och viljan att lösa det.",
    en: "Sweden already ranks among the world's most innovative, most digitalised and most sustainable countries. We have the universities, the infrastructure and – above all – the people. The only thing missing is the courage to frame the problem correctly and the will to solve it.",
  },
  closingP4: {
    sv: "Dessa 15 punkter är inte utopier. De är investeringar. Varje krona vi lägger på att hjälpa människor hitta sin plats i samhället kommer tillbaka mångfalt – i skatteintäkter, i innovation, i kultur, i livskraft. Vi håller på att bli för få. Lösningen går inte på gatan – den bor redan här.",
    en: "These 15 points are not utopias. They are investments. Every krona we spend helping people find their place in society comes back many times over – in tax revenue, in innovation, in culture, in vitality. We are becoming too few. The solution isn't walking the streets – it already lives here.",
  },
  totalInvestmentLabel: { sv: "Total investering", en: "Total investment" },
  totalInvestmentValue: { sv: "~250 miljarder kr/år", en: "~250 billion SEK/year" },
  totalInvestmentDesc: {
    sv: "Motsvarar cirka 4% av BNP – jämförbart med vad vi redan investerar i försvaret och rättsväsendet tillsammans. Förväntad avkastning: ett land som tar täten i alla internationella rankingar.",
    en: "Equivalent to about 4% of GDP – comparable to what we already invest in defence and the justice system combined. Expected return: a country that leads all international rankings.",
  },
  closingQuote: {
    sv: "\"Riksdagspartier! Håll varsin presskonferens med 15 punkter som underlättar människors resa i stället för det motsatta.\"",
    en: "\"Parliamentary parties! Hold a press conference each with 15 points that ease people's journey instead of the opposite.\"",
  },
  closingQuoteNote: {
    sv: "Men håll en workshop först så det inte blir så där taffligt som det gärna blir annars.",
    en: "But hold a workshop first so it doesn't turn out as clumsy as it usually does.",
  },
  goodMorning: { sv: "GOD MORGON!", en: "GOOD MORNING!" },
  footerTitle: { sv: "Det Nya Sverige", en: "The New Sweden" },
  footerSubtitle: {
    sv: "Ett tankeexperiment om vad som händer när vi ställer rätt fråga",
    en: "A thought experiment about what happens when we ask the right question",
  },
  footerNav: {
    sv: "Navigera med piltangenter ↑↓ eller J/K",
    en: "Navigate with arrow keys ↑↓ or J/K",
  },
  mobileNavTitle: { sv: "INNEHÅLL", en: "CONTENTS" },
  goToTop: { sv: "Tillbaka till toppen", en: "Back to top" },
  openToc: { sv: "Öppna innehållsförteckning", en: "Open table of contents" },
  shareTitle: { sv: "Dela denna punkt", en: "Share this point" },
  copyLink: { sv: "Kopiera länk", en: "Copy link" },
  linkCopied: { sv: "Länk kopierad!", en: "Link copied!" },
  // Total counter
  counterTitle: { sv: "PROGRAMMET I SIFFROR", en: "THE PROGRAMME IN NUMBERS" },
  counterInvestment: { sv: "Total årlig investering", en: "Total annual investment" },
  counterInvestmentValue: { sv: "~250 mdr kr", en: "~250B SEK" },
  counterPeople: { sv: "Människor som berörs direkt", en: "People directly affected" },
  counterPeopleValue: { sv: "2+ miljoner", en: "2+ million" },
  counterJobs: { sv: "Nya jobb inom 5 år", en: "New jobs within 5 years" },
  counterJobsValue: { sv: "850 000+", en: "850,000+" },
  counterGdp: { sv: "Förväntad BNP-effekt", en: "Expected GDP effect" },
  counterGdpValue: { sv: "+3-5% årligen", en: "+3-5% annually" },
  counterMunicipalities: { sv: "Kommuner som deltar", en: "Municipalities participating" },
  counterMunicipalitiesValue: { sv: "Alla 290", en: "All 290" },
  counterLanguages: { sv: "Språk i samhällsservice", en: "Languages in public services" },
  counterLanguagesValue: { sv: "40+", en: "40+" },
} as const;

export type StringKey = keyof typeof strings;

export function t(key: StringKey, lang: Lang): string {
  return strings[key][lang];
}
