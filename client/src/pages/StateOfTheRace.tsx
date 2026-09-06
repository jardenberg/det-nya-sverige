import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { ArrowLeft, Share2, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { debates } from "@/lib/debates";

/**
 * State of the Race – a shareable summary article that distills
 * the pattern from all debate/interview analyses.
 */
export default function StateOfTheRace() {
  const { t, langPrefix } = useLang();

  // Calculate aggregated scores
  const partyScores: Record<string, { total: number; count: number }> = {};
  debates.forEach((d) => {
    d.partyRankings.forEach((r) => {
      if (!partyScores[r.abbreviation]) partyScores[r.abbreviation] = { total: 0, count: 0 };
      partyScores[r.abbreviation].total += r.score;
      partyScores[r.abbreviation].count += 1;
    });
  });
  const sorted = Object.entries(partyScores).sort((a, b) => b[1].total - a[1].total);
  const totalAnalyses = debates.length;
  const interviews = debates.filter((d) => d.type === "interview").length;
  const debateCount = debates.filter((d) => d.type === "debate").length;

  const copyLink = () => {
    const url = window.location.origin + window.location.pathname;
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LanguageSwitcher />

      {/* Header */}
      <header className="max-w-3xl mx-auto px-6 pt-12 pb-8">
        <Link href={`${langPrefix}/debatter`} className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-ochre transition-colors mb-8">
          <ArrowLeft size={16} />
          {t("Tillbaka till analyserna", "Back to analyses")}
        </Link>

        <p className="text-sm uppercase tracking-widest text-ochre font-medium mb-3">
          {t("Sammanfattning", "Summary")} · {t(`${totalAnalyses} analyser`, `${totalAnalyses} analyses`)}
        </p>

        <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4">
          {t(
            "En första bro – men ännu inget nytt Sverige",
            "A first bridge – but not yet a new Sweden"
          )}
        </h1>

        <p className="text-xl text-foreground/70 leading-relaxed">
          {t(
            `${totalAnalyses} analyser. ${Object.keys(partyScores).length} partier. En delvis uttalad koppling mellan AI och integration – ännu ingen operativ.`,
            `${totalAnalyses} analyses. ${Object.keys(partyScores).length} parties. One partly explicit connection between AI and integration – still no operational one.`
          )}
        </p>

        <div className="flex gap-3 mt-6">
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-ochre/10 text-ochre hover:bg-ochre/20 transition-colors text-sm font-medium"
          >
            <Share2 size={14} />
            {t("Kopiera länk", "Copy link")}
          </button>
        </div>
      </header>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 pb-16">

        {/* The core finding */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            {t("Huvudfyndet", "The core finding")}
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            {t(
              `Vi har analyserat ${debateCount} debatter och ${interviews} djupintervjuer med representanter för alla riksdagspartier. Varje uttalande har matchats mot de 15 punkterna i Det Nya Sverige. Mönstret är entydigt:`,
              `We have analysed ${debateCount} debates and ${interviews} in-depth interviews with representatives of all parliamentary parties. Every statement has been matched against the 15 points of Det Nya Sverige. The pattern is unambiguous:`
            )}
          </p>

          <blockquote className="border-l-4 border-ochre pl-6 py-4 my-8 bg-ochre/5 rounded-r-lg">
            <p className="text-xl font-display font-semibold italic">
              {t(
                "Sveriges Radios AI-debatt skapar den första sprickan i väggen: C kopplar svensk AI-kapacitet till att behålla forskare med utländsk bakgrund. Men ingen gör AI till operativ integrationsinfrastruktur.",
                "Sveriges Radio's AI debate creates the first crack in the wall: C links Swedish AI capacity to retaining researchers with foreign backgrounds. But no one turns AI into operational integration infrastructure."
              )}
            </p>
          </blockquote>

          <p className="text-lg leading-relaxed">
            {t(
              "Orden integration, SFI, nyanländ och validering förekommer inte i Sveriges Radios 51 minuter långa AI-debatt. Däremot placerar Niels Paarup-Petersen människor med utländsk bakgrund inne i berättelsen om svensk AI-kapacitet när han vill behålla forskare efter utbildningen. Det förändrar bilden, men bara delvis: bron når topptalang, inte ännu språk, bred kompetensvalidering, första jobb eller myndighetskontakter.",
              "The words integration, SFI, newcomer and validation do not occur in Sveriges Radio's 51-minute AI debate. Yet Niels Paarup-Petersen places people with foreign backgrounds inside the story of Swedish AI capacity when arguing that researchers should be retained after graduation. That changes the picture, but only partly: the bridge reaches top talent, not yet language, broad skills validation, first jobs or public-service contacts."
            )}
          </p>
        </section>

        {/* The scoreboard */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            {t("Ackumulerad poäng", "Accumulated scores")}
          </h2>
          <p className="text-foreground/70 mb-6">
            {t(
              "Direkt matchning = 1 poäng. Indirekt = 0.5. Max 15 per analys.",
              "Direct match = 1 point. Indirect = 0.5. Max 15 per analysis."
            )}
          </p>

          <div className="space-y-3">
            {sorted.map(([party, data]) => {
              const maxPossible = data.count * 15;
              const pct = (data.total / maxPossible) * 100;
              return (
                <div key={party} className="flex items-center gap-3">
                  <span className="w-8 text-sm font-bold text-foreground/80">{party}</span>
                  <div className="flex-1 h-6 bg-foreground/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-ochre/70 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-20 text-right text-sm font-medium">
                    {data.total.toFixed(1)} / {maxPossible}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-foreground/50 mt-4">
            {t(
              "Partier med fler analyserade tillfällen har haft fler chanser att samla poäng.",
              "Parties with more analysed occasions have had more chances to accumulate points."
            )}
          </p>
        </section>

        {/* The pattern */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            {t("Mönstret", "The pattern")}
          </h2>

          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              {t(
                "Centerpartiet (C) ligger fortfarande närmast programmets infrastruktur. Elisabeth Thand Ringqvist talar om beräkningskraft, forskningskluster och regulatoriska sandlådor. I Sveriges Radios AI-debatt tar Niels Paarup-Petersen nästa steg: forskare med utländsk bakgrund måste få stanna och bli en del av svensk AI-kapacitet. Det är seriens första delvis uttalade bro. Men den slutar vid topptalang; språk, bred validering och matchning saknas fortfarande.",
                "The Centre Party (C) remains closest to the programme's infrastructure. Elisabeth Thand Ringqvist discusses compute power, research clusters and regulatory sandboxes. In Sveriges Radio's AI debate, Niels Paarup-Petersen takes the next step: researchers with foreign backgrounds must be allowed to stay and become part of Swedish AI capacity. It is the series' first partly explicit bridge. But it ends at top talent; language, broad validation and matching remain absent."
              )}
            </p>

            <p>
              {t(
                "Kristdemokraterna (KD) är paradoxen. Erik Slottner har byggt mer av den infrastruktur som de 15 punkterna kräver än någon annan: interoperabilitetslagstiftning, AI-verkstaden, datadelning, upphandlingsreformer. Han identifierar exakt rätt problem (290 kommuner i stuprör). Men han ser aldrig tillämpningen. Bygglov från veckor till minuter. Samma logik gäller kompetensvalidering. Men det exemplet dyker aldrig upp.",
                "The Christian Democrats (KD) are the paradox. Erik Slottner has built more of the infrastructure the 15 points require than anyone else: interoperability legislation, the AI workshop, data sharing, procurement reforms. He identifies exactly the right problem (290 municipalities in silos). But he never sees the application. Building permits from weeks to minutes. The same logic applies to competence validation. But that example never appears."
              )}
            </p>

            <p>
              {t(
                "Moderaterna (M) talar om \"Silicon Valhalla\" och internationell talangrekrytering. Jessica Rosencrantz ser AI som näringslivsfråga och geopolitisk kapplöpning, aldrig som integrationsverktyg. I Agendas ekonomidebatt säger Elisabeth Svantesson att Sverige ska \"dra till sig mer kompetens\". Attraktionen är legitim, men den kompetens som redan bor här förblir osynlig och ovaliderad.",
                "The Moderates (M) talk about \"Silicon Valhalla\" and international talent recruitment. Jessica Rosencrantz sees AI as a business issue and geopolitical race, never as an integration tool. In Agenda's economy debate Elisabeth Svantesson says Sweden should \"attract more skills\". Attraction is legitimate, but the skills already living here remain invisible and unvalidated."
              )}
            </p>

            <p>
              {t(
                "Liberalerna (L) har hemchattreformen som aldrig blev ett integrationsverktyg. Helena Gellerman talar om att sänka trösklar för startups och öppna upphandlingar. Perfekt infrastruktur för integrationsdriven innovation. Om man bara såg det.",
                "The Liberals (L) have the home-chat reform that never became an integration tool. Helena Gellerman talks about lowering thresholds for startups and opening procurement. Perfect infrastructure for integration-driven innovation. If only they saw it."
              )}
            </p>

            <p>
              {t(
                "Socialdemokraterna (S) ser AI som förvaltarens verktyg. Mikael Damberg talar om effektivisering av offentlig sektor, forskning, innovation och kompetensförsörjning. I Expressen/Di-debatten försvarar Magdalena Andersson statens löfte till människor med permanenta uppehållstillstånd. Delarna finns, men omvandlingen för dem som står utanför systemen formuleras aldrig.",
                "The Social Democrats (S) see AI as the administrator's tool. Mikael Damberg discusses public-sector efficiency, research, innovation and skills supply. In the Expressen/Di debate Magdalena Andersson defends the state's promise to people with permanent residence permits. The pieces exist, but transformation for those outside the systems is never formulated."
              )}
            </p>

            <p>
              {t(
                "Miljöpartiet (MP) nämner arbetskraftsinvandring i AI-intervjun och försvarar investeringar i integration i Expressen/Di-debatten. I klimatdebatten kopplar Amanda Lind omställningen till jobb, utveckling och innovation. Men steget till att validera och matcha kompetensen hos människor som redan finns här tas aldrig.",
                "The Green Party (MP) mentions labour immigration in its AI interview and defends investment in integration in the Expressen/Di debate. In the climate debate Amanda Lind connects the transition to jobs, development and innovation. But the step toward validating and matching the skills of people already here is never taken."
              )}
            </p>

            <p>
              {t(
                "Vänsterpartiet (V) är ärligt med att ligga efter. Jessica Wetterling förstår att AI kan bevara samiska språk. Men hon gör aldrig kopplingen till svenska som andraspråk. Om AI kan hålla liv i samiska med några tusen talare, vad kan den göra för 200 000 som behöver lära sig svenska?",
                "The Left Party (V) is honest about lagging behind. Jessica Wetterling understands that AI can preserve Sami languages. But she never makes the connection to Swedish as a second language. If AI can keep Sami alive with a few thousand speakers, what can it do for 200,000 who need to learn Swedish?"
              )}
            </p>

            <p>
              {t(
                "Sverigedemokraterna (SD) ligger längst från programmets kapacitetsbyggande logik. I Expressen/Di-debatten säger Jimmie Åkesson att han inte vill lägga pengar på integration och formulerar språk och arbete främst som krav. Problemformuleringen finns, men investeringarna i bättre verktyg, validering och leverans avvisas eller förblir osynliga.",
                "The Sweden Democrats (SD) remain furthest from the programme's capacity-building logic. In the Expressen/Di debate Jimmie Åkesson says he does not want to spend money on integration and frames language and work mainly as requirements. The problem statement exists, but investment in better tools, validation and delivery is rejected or remains invisible."
              )}
            </p>
          </div>
        </section>

        {/* The August debates */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            {t("Augustidebatterna skärper bilden", "The August debates sharpen the picture")}
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            {t(
              "Expressen/Di-debatten visar att partiledarna har nästan alla pusselbitar. AI diskuteras som nationell infrastruktur. Kompetens, språk, jobb, tillhörighet och rättslig förutsägbarhet får egna ordväxlingar. Ändå sätts delarna aldrig ihop. Samma debatt rymmer både AI och integration, men i separata stuprör.",
              "The Expressen/Di debate shows that party leaders have almost all the puzzle pieces. AI is discussed as national infrastructure. Skills, language, jobs, belonging and legal predictability each receive their own exchanges. Yet the pieces are never assembled. The same debate contains both AI and integration, but in separate silos."
            )}
          </p>
          <p className="text-lg leading-relaxed mb-4">
            {t(
              "Agendas ekonomidebatt gör glappet ännu tydligare. Åtta partier diskuterar hög arbetslöshet, kompetensförsörjning, utbildning, innovation och företag som vill växa – utan att nämna integration en enda gång. Kompetens beskrivs som något Sverige ska locka utifrån eller utbilda fram, inte som något som redan finns här och kan valideras snabbare.",
              "Agenda's economy debate makes the gap even clearer. Eight parties discuss high unemployment, skills supply, education, innovation and companies that want to grow – without mentioning integration once. Skills are described as something Sweden should attract from abroad or train into existence, not something already here that can be validated faster."
            )}
          </p>
          <p className="text-lg leading-relaxed">
            {t(
              "Klimatdebatten tillför en tredje ordningens konsekvens. Omställningen ska skapa jobb, industri och innovation, men ingen frågar vilka människor som ska göra jobbet eller hur deras kompetens ska bli synlig. Sverige riskerar därmed kompetensbrist och utanförskap samtidigt. Det är ett designfel, inte en naturlag.",
              "The climate debate adds a third-order consequence. The transition is meant to create jobs, industry and innovation, but no one asks who will do the work or how their skills will become visible. Sweden therefore risks skills shortages and exclusion at the same time. That is a design failure, not a law of nature."
            )}
          </p>
        </section>

        {/* The September AI debate */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            {t("AI-debatten flyttar gränsen", "The AI debate moves the boundary")}
          </h2>
          <p className="text-lg leading-relaxed mb-4">
            {t(
              "Sveriges Radios valspecial är seriens mest rättvisa AI-jämförelse. Alla åtta partier möts i samma studio, svarar på samma frågor och presenterar konkret politik om reglering, företag, arbetsmarknad, utbildning, offentlig sektor och energi. Två av de 15 punkterna matchas direkt och sex indirekt.",
              "Sveriges Radio's election special is the series' fairest AI comparison. All eight parties meet in the same studio, answer the same questions and present concrete policy on regulation, business, labour, education, the public sector and energy. Two of the 15 points are matched directly and six indirectly."
            )}
          </p>
          <p className="text-lg leading-relaxed mb-4">
            {t(
              "Det positiva är att AI-politiken nu är verklig och bred. M konkretiserar företagsbyggande. S beskriver arbetsmarknadsomställningen. KD visar välfärdstillämpningar. V gör icke-diskriminering till regleringsmål. MP ser de försvinnande instegsjobben. C kopplar för första gången AI-kapacitet till att behålla människor med utländsk bakgrund.",
              "The positive finding is that AI policy is now real and broad. M specifies business-building reforms. S describes labour-market transition. KD shows welfare applications. V makes non-discrimination a regulatory goal. MP sees the disappearing entry-level jobs. C links AI capacity to retaining people with foreign backgrounds for the first time."
            )}
          </p>
          <p className="text-lg leading-relaxed">
            {t(
              "Det negativa är att den breda integrationsadressen fortfarande saknas. Ingen frågar hur AI kan ge svenska i arbetet, läsa utländska examina, korta vägen till första jobbet eller göra myndighetskontakten begriplig från dag ett. Verktygslådan finns. Den används fortfarande främst för att göra det gamla Sverige effektivare.",
              "The negative finding is that the broad integration address remains absent. No one asks how AI can support Swedish at work, read foreign degrees, shorten the path to a first job or make government contact understandable from day one. The toolkit exists. It is still used mainly to make the old Sweden more efficient."
            )}
          </p>
        </section>

        {/* The gap */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            {t("Glappet", "The gap")}
          </h2>

          <p className="text-lg leading-relaxed mb-4">
            {t(
              "Det mest slående är inte att politikerna saknar AI-kompetens. Det gör de inte. ETR kan prata beräkningskraft i 37 minuter. Slottner har drivit interoperabilitetslagstiftning genom riksdagen. Gellerman förstår hemchattar och innovationsekosystem. Damberg vet hur offentlig sektor fungerar inifrån.",
              "The most striking thing is not that politicians lack AI competence. They don't. ETR can discuss compute power for 37 minutes. Slottner has driven interoperability legislation through parliament. Gellerman understands home-chats and innovation ecosystems. Damberg knows how public sector works from the inside."
            )}
          </p>

          <p className="text-lg leading-relaxed mb-4">
            {t(
              "Glappet är inte främst kunskapsmässigt. Det är ett glapp i föreställningsförmåga och målgrupp. C visar nu att bron går att se när den gäller internationella forskare. Nästa steg är att föreställa sig att AI:s stora samhällsnytta också kan vara att göra kompetens, språk och handlingskraft synlig hos människor som inte redan passar i systemen.",
              "The gap is not primarily one of knowledge. It is a gap in imagination and intended users. C now shows that the bridge can be seen when it concerns international researchers. The next step is to imagine that AI's major societal benefit can also be making skills, language and agency visible among people who do not already fit the systems."
            )}
          </p>

          <blockquote className="border-l-4 border-ochre pl-6 py-4 my-8 bg-ochre/5 rounded-r-lg">
            <p className="text-xl font-display font-semibold italic">
              {t(
                "Infrastrukturen finns. Kompetensen finns. En första bro syns. Nu måste den byggas för fler.",
                "The infrastructure exists. The competence exists. A first bridge is visible. Now it must be built for more people."
              )}
            </p>
          </blockquote>
        </section>

        {/* What the 15 points propose */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold mb-4">
            {t("Vad de 15 punkterna föreslår", "What the 15 points propose")}
          </h2>

          <p className="text-lg leading-relaxed mb-4">
            {t(
              "De 15 punkterna utgår från en enkel insikt: integration är inte ett problem att hantera. Det är en kapacitet att bygga. Och AI är det verktyg som gör det möjligt att bygga den i en skala som aldrig tidigare varit möjlig.",
              "The 15 points start from a simple insight: integration is not a problem to manage. It is a capacity to build. And AI is the tool that makes it possible to build it at a scale never before possible."
            )}
          </p>

          <p className="text-lg leading-relaxed mb-4">
            {t(
              "En AI-språkcoach kopplad till ditt jobb. Ett digitalt kompetenspass som slutar börja i misstro. Validering genom simulering istället för pappersexercis. Bosättning baserad på data om var jobben faktiskt finns. En enda digital väg in, inte 290 kommunala stuprör.",
              "An AI language coach connected to your job. A digital competence passport that stops starting with distrust. Validation through simulation instead of paperwork. Settlement based on data about where jobs actually exist. One single digital path in, not 290 municipal silos."
            )}
          </p>

          <p className="text-lg leading-relaxed">
            {t(
              "Allt detta är tekniskt möjligt idag. Mycket av infrastrukturen byggs redan, av exakt de politiker vi analyserat. De bygger motorvägen. De målar skyltarna. Men de ser aldrig att det finns 200 000 människor som väntar på att få köra på den.",
              "All of this is technically possible today. Much of the infrastructure is already being built, by exactly the politicians we have analysed. They are building the motorway. They are painting the signs. But they never see that there are 200,000 people waiting to drive on it."
            )}
          </p>
        </section>

        {/* CTA */}
        <section className="mb-12 p-8 bg-ochre/5 border border-ochre/20 rounded-2xl">
          <h2 className="font-display text-2xl font-bold mb-4">
            {t("Läs analyserna", "Read the analyses")}
          </h2>
          <p className="text-lg leading-relaxed mb-6">
            {t(
              `Alla ${totalAnalyses} analyser finns tillgängliga med fullständiga transkript, punkt-för-punkt-matchning, och nedladdningsbar PDF.`,
              `All ${totalAnalyses} analyses are available with full transcripts, point-by-point matching, and downloadable PDF.`
            )}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`${langPrefix}/debatter`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-ochre text-white rounded-lg font-medium hover:bg-ochre/90 transition-colors"
            >
              <ExternalLink size={16} />
              {t("Se alla analyser", "View all analyses")}
            </Link>
            <Link
              href={`${langPrefix}/`}
              className="inline-flex items-center gap-2 px-5 py-3 border border-ochre/30 text-ochre rounded-lg font-medium hover:bg-ochre/5 transition-colors"
            >
              {t("Läs de 15 punkterna", "Read the 15 points")}
            </Link>
          </div>
        </section>

        {/* Signature */}
        <section className="border-t border-foreground/10 pt-8">
          <p className="text-foreground/60 text-sm">
            {t(
              "Analys och kommentarer: Joakim Jardenberg (JJ). Transkriptioner: Klang.ai. Allt material är CC0 Public Domain.",
              "Analysis and commentary: Joakim Jardenberg (JJ). Transcriptions: Klang.ai. All material is CC0 Public Domain."
            )}
          </p>
          <p className="text-foreground/40 text-sm mt-2">
            {t(
              `Senast uppdaterad: september 2026. Baserat på ${totalAnalyses} analyser (${debateCount} debatter, ${interviews} intervjuer).`,
              `Last updated: September 2026. Based on ${totalAnalyses} analyses (${debateCount} debates, ${interviews} interviews).`
            )}
          </p>
        </section>
      </article>

      <Footer />
    </div>
  );
}
