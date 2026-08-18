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
            "Ingen ser det nya Sverige",
            "No one sees the new Sweden"
          )}
        </h1>

        <p className="text-xl text-foreground/70 leading-relaxed">
          {t(
            `${totalAnalyses} analyser. ${Object.keys(partyScores).length} partier. Noll partiledare som kopplar ihop AI med integration.`,
            `${totalAnalyses} analyses. ${Object.keys(partyScores).length} parties. Zero party leaders connecting AI to integration.`
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
                "Ingen partiledare kopplar ihop teknikskiftet med integrationens infrastruktur. AI diskuteras som effektiviseringsverktyg för det befintliga Sverige, aldrig som omvandlare av det nya.",
                "No party leader connects the technology shift with integration infrastructure. AI is discussed as an efficiency tool for the existing Sweden, never as a transformer of the new."
              )}
            </p>
          </blockquote>

          <p className="text-lg leading-relaxed">
            {t(
              "Ordet \"integration\" i substantiell mening förekommer i princip noll gånger i samtliga AI-politiska sammanhang vi analyserat. Inte för att politikerna saknar AI-kompetens. Flera av dem, särskilt ETR (C) och Slottner (KD), har djup förståelse för tekniken. Men de ser aldrig tillämpningen på den fråga som definierar Sveriges nästa decennium.",
              "The word \"integration\" in any substantive sense occurs essentially zero times across all AI-policy contexts we have analysed. Not because politicians lack AI competence. Several of them, particularly ETR (C) and Slottner (KD), have deep understanding of the technology. But they never see the application to the question that defines Sweden's next decade."
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
                "Centerpartiet (C) leder med 13.5 poäng, nästan dubbelt så mycket som tvåan. Elisabeth Thand Ringqvist bygger exakt den AI-infrastruktur som de 15 punkterna förutsätter: beräkningskraft, forskningskluster, regulatoriska sandlådor, hemchattreform. Men hon gör aldrig kopplingen till integration. AI-kommittén hon föreslår ska analysera \"arbetsmarknaden och utbildningssystemet\" utan att nämna vad AI kan göra för de 200 000 som väntar på att komma in i dem.",
                "The Centre Party (C) leads with 13.5 points, nearly double the runner-up. Elisabeth Thand Ringqvist builds exactly the AI infrastructure the 15 points presuppose: compute power, research clusters, regulatory sandboxes, home-chat reform. But she never makes the connection to integration. The AI committee she proposes will analyse \"the labour market and education system\" without mentioning what AI can do for the 200,000 waiting to enter them."
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
                "Moderaterna (M) talar om \"Silicon Valhalla\" och internationell talangrekrytering. Men de skickade inte ens partiledaren till AI Sweden. Jessica Rosencrantz ser AI som näringslivsfråga och geopolitisk kapplöpning, aldrig som integrationsverktyg. \"Snabbspår\" gäller uteslutande importerad kompetens, aldrig validering av befintlig.",
                "The Moderates (M) talk about \"Silicon Valhalla\" and international talent recruitment. But they didn't even send the party leader to AI Sweden. Jessica Rosencrantz sees AI as a business issue and geopolitical race, never as an integration tool. \"Fast-tracks\" apply exclusively to imported competence, never validation of existing."
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
                "Socialdemokraterna (S) ser AI som förvaltarens verktyg. Mikael Damberg talar om effektivisering av offentlig sektor och trygghetssystem. Aldrig om omvandling. Aldrig om de som står utanför systemen han vill effektivisera.",
                "The Social Democrats (S) see AI as the administrator's tool. Mikael Damberg talks about making public sector and welfare systems more efficient. Never about transformation. Never about those standing outside the systems he wants to optimise."
              )}
            </p>

            <p>
              {t(
                "Miljöpartiet (MP) är det enda parti som nämner arbetskraftsinvandring i AI-kontexten. Daniel Helldén kritiserar lönegolvet. Det är modigt. Men hans perspektiv är \"importera kompetens utifrån\", aldrig \"utveckla kompetens som redan finns här\". Fyradagarsveckan förutsätter att du har ett jobb att korta ner.",
                "The Green Party (MP) is the only party mentioning labour immigration in the AI context. Daniel Helldén criticises the salary floor. That's bold. But his perspective is \"import competence from outside\", never \"develop competence already here\". The four-day work week presupposes you have a job to shorten."
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
                "Sverigedemokraterna (SD) har den lägsta poängen: 1.0 av möjliga 30 (2 analyser). I partiledardebatten var deras enda koppling till de 15 punkterna en indirekt: hårdare tag mot exploatering. AI och digitalisering existerar inte i deras politiska vokabulär.",
                "The Sweden Democrats (SD) have the lowest score: 1.0 out of a possible 30 (2 analyses). In the party leader debate their only connection to the 15 points was indirect: tougher measures against exploitation. AI and digitalisation do not exist in their political vocabulary."
              )}
            </p>
          </div>
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
              "Glappet är inte kunskapsmässigt. Det är imaginärt. Ingen av dem kan föreställa sig att AI:s primära samhällsnytta i Sverige de närmaste tio åren kanske inte handlar om att effektivisera det befintliga, utan om att möjliggöra det nya. Att 15% av befolkningen inte fullt deltar i ekonomin är inte ett problem som löses med bättre schemaläggning i äldreomsorgen.",
              "The gap is not one of knowledge. It is one of imagination. None of them can envision that AI's primary societal benefit in Sweden over the next ten years might not be about making the existing more efficient, but about enabling the new. That 15% of the population not fully participating in the economy is not a problem solved by better scheduling in elderly care."
            )}
          </p>

          <blockquote className="border-l-4 border-ochre pl-6 py-4 my-8 bg-ochre/5 rounded-r-lg">
            <p className="text-xl font-display font-semibold italic">
              {t(
                "Infrastrukturen finns. Kompetensen finns. Visionen saknas.",
                "The infrastructure exists. The competence exists. The vision is missing."
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
              `Senast uppdaterad: augusti 2026. Baserat på ${totalAnalyses} analyser (${debateCount} debatter, ${interviews} intervjuer).`,
              `Last updated: August 2026. Based on ${totalAnalyses} analyses (${debateCount} debates, ${interviews} interviews).`
            )}
          </p>
        </section>
      </article>

      <Footer />
    </div>
  );
}
