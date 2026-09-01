import { debates, type DebateAnalysis } from "@/lib/debates";

export const parties = ["C", "M", "S", "L", "KD", "MP", "V", "SD"] as const;
export type PartyAbbreviation = (typeof parties)[number];
export type RhetoricMetric = "integration" | "ai" | "bridge";
export type RhetoricScore = -1 | 0 | 1 | 2 | 3;

export interface RhetoricCode {
  integration: RhetoricScore;
  ai: RhetoricScore;
  bridge: RhetoricScore;
}

export interface RhetoricObservation extends RhetoricCode {
  id: string;
  debateId: string;
  date: string;
  order: number;
  party: PartyAbbreviation;
  representative: string;
  type: DebateAnalysis["type"];
  title: string;
  titleEn: string;
  evidence: string;
  evidenceEn: string;
  coded: boolean;
}

type EventCodes = Partial<Record<PartyAbbreviation, RhetoricCode>>;

/**
 * Editorial coding of rhetoric, not an automated sentiment score.
 * Integration: -1 restrictive/rejecting, 0 absent, 1 problem/requirements,
 * 2 opportunity/capacity, 3 concrete system design.
 * AI: 0 absent, 1 mention/concern, 2 policy/infrastructure, 3 applied proposal.
 * Bridge: 0 absent, 1 latent compatibility, 2 partly explicit, 3 operational link.
 */
export const rhetoricCodes: Record<string, EventCodes> = {
  "svt-partiledardebatt-2026-05": {
    C: { integration: 2, ai: 0, bridge: 0 },
    L: { integration: 1, ai: 0, bridge: 0 },
    KD: { integration: 1, ai: 0, bridge: 0 },
    M: { integration: 1, ai: 0, bridge: 0 },
    S: { integration: 1, ai: 0, bridge: 0 },
    MP: { integration: 1, ai: 0, bridge: 0 },
    V: { integration: 0, ai: 0, bridge: 0 },
    SD: { integration: -1, ai: 0, bridge: 0 },
  },
  "ai-sweden-damberg-2026-05": {
    S: { integration: 0, ai: 2, bridge: 1 },
  },
  "ai-sweden-gellerman-2026-05": {
    L: { integration: 0, ai: 3, bridge: 1 },
  },
  "ai-sweden-hellden-2026-05": {
    MP: { integration: 1, ai: 2, bridge: 1 },
  },
  "ai-sweden-etr-2026-05": {
    C: { integration: 0, ai: 3, bridge: 1 },
  },
  "ai-sweden-jr-2026-05": {
    M: { integration: 0, ai: 2, bridge: 1 },
  },
  "riksdagsdebatt-2026-06": {
    C: { integration: 0, ai: 3, bridge: 1 },
    KD: { integration: 1, ai: 1, bridge: 0 },
    M: { integration: 1, ai: 0, bridge: 0 },
    S: { integration: 0, ai: 1, bridge: 0 },
    SD: { integration: -1, ai: 0, bridge: 0 },
    L: { integration: 0, ai: 0, bridge: 0 },
    V: { integration: 0, ai: 0, bridge: 0 },
    MP: { integration: 0, ai: 0, bridge: 0 },
  },
  "ai-sweden-slottner-2026-08": {
    KD: { integration: 0, ai: 3, bridge: 1 },
  },
  "ai-sweden-wetterling-2026-08": {
    V: { integration: 0, ai: 2, bridge: 1 },
  },
  "expressen-di-partiledardebatt-2026-08-17": {
    C: { integration: 0, ai: 2, bridge: 1 },
    L: { integration: 2, ai: 0, bridge: 0 },
    M: { integration: 1, ai: 0, bridge: 0 },
    MP: { integration: 2, ai: 0, bridge: 0 },
    V: { integration: 2, ai: 0, bridge: 0 },
    S: { integration: 2, ai: 0, bridge: 0 },
    KD: { integration: 2, ai: 0, bridge: 0 },
    SD: { integration: -1, ai: 0, bridge: 0 },
  },
  "agenda-ekonomi-2026-08-23": {
    C: { integration: 0, ai: 0, bridge: 0 },
    S: { integration: 0, ai: 0, bridge: 0 },
    M: { integration: 0, ai: 0, bridge: 0 },
    KD: { integration: 0, ai: 0, bridge: 0 },
    MP: { integration: 0, ai: 0, bridge: 0 },
    L: { integration: 0, ai: 0, bridge: 0 },
    V: { integration: 0, ai: 0, bridge: 0 },
    SD: { integration: 0, ai: 0, bridge: 0 },
  },
  "agenda-klimat-2026-08-30": {
    MP: { integration: 0, ai: 0, bridge: 0 },
    C: { integration: 0, ai: 0, bridge: 0 },
    V: { integration: 0, ai: 0, bridge: 0 },
    S: { integration: 0, ai: 0, bridge: 0 },
    M: { integration: 0, ai: 0, bridge: 0 },
    L: { integration: 0, ai: 0, bridge: 0 },
    KD: { integration: 0, ai: 0, bridge: 0 },
    SD: { integration: 0, ai: 0, bridge: 0 },
  },
};

const rhetoricEvidenceEn: Record<string, Partial<Record<PartyAbbreviation, string>>> = {
  "svt-partiledardebatt-2026-05": {
    C: "ETR proposed job-linked Swedish, lower barriers for business and framed unequal healthcare as a systems problem. Closest in tone and approach.",
    L: "Mohamsson discussed education as an energy and integration issue, alongside requirements-based integration.",
    KD: "Busch proposed nationalising healthcare and discussed integration primarily as a question of values.",
    M: "Kristersson mentioned shortage occupations, moving north and graduate unemployment, but offered no integration infrastructure.",
    S: "Andersson discussed equal healthcare and Swedish-language requirements, without systems solutions or technology.",
    MP: "Lind discussed healthcare staffing and a humanitarian migration route, without concrete integration tools.",
    V: "Dadgostar focused on distribution and criticism of the right-wing bloc. No proposal addressed the 15 points.",
    SD: "Åkesson focused on restrictive migration and tax cuts. No proposal addressed the 15 points.",
  },
  "ai-sweden-damberg-2026-05": {
    S: "No direct and six indirect matches. A caretaker mindset: AI to optimise what already exists, never to build something new.",
  },
  "ai-sweden-gellerman-2026-05": {
    L: "One direct and seven indirect matches. Educational optimism that never includes those outside the established system.",
  },
  "ai-sweden-hellden-2026-05": {
    MP: "No direct and six indirect matches. Mentions labour immigration, but never people who have already arrived.",
  },
  "ai-sweden-etr-2026-05": {
    C: "Four direct and eight indirect matches. Her AI-infrastructure thinking is a prerequisite for the programme; the explicit integration link is missing.",
  },
  "ai-sweden-jr-2026-05": {
    M: "One direct and eight indirect matches. Broad but shallow AI policy that never connects to integration.",
  },
  "riksdagsdebatt-2026-06": {
    C: "ETR's AI speech indirectly touched five points. The only party to discuss technology as a force for societal transformation.",
    KD: "Busch addressed parallel societies, entrepreneurship and AI in a reply to ETR, but without systems thinking.",
    M: "Kristersson discussed jobs and obligations without specifying mechanisms.",
    S: "Andersson mentioned AI in passing, while focusing on the economy without the 15 points' mechanisms.",
    SD: "Åkesson addressed parallel societies exclusively through restriction.",
    L: "Mohamsson devoted her time to attacks on V and criticism of Stockholm. Integration and digitalisation were absent.",
    V: "Dadgostar focused on sickness insurance and economic inequality.",
    MP: "Helldén spoke exclusively about climate and energy.",
  },
  "ai-sweden-slottner-2026-08": {
    KD: "One direct and seven indirect matches. The infrastructure builder who never identifies integration as the application.",
  },
  "ai-sweden-wetterling-2026-08": {
    V: "No direct and seven indirect matches. Honest about the party lagging behind; understands Sami language models, but never Swedish as a second language.",
  },
  "expressen-di-partiledardebatt-2026-08-17": {
    C: "Skills matching, education, jobs, mobility and AI infrastructure are present, but the integration connection is not made.",
    L: "Swedish, labour immigration and a clear map into society are discussed, but without operational tools.",
    M: "Swedish, work and success are framed as goals alongside business conditions. The solutions remain general.",
    MP: "Integration is framed as support and children's conditions, without operational infrastructure.",
    V: "Labour-market training and criticism of exclusion are present, but no digital or time-bound model is offered.",
    S: "Legal predictability in residence-permit policy is addressed, but few of the programme's mechanisms appear.",
    KD: "Inclusive Swedish identity and children's shared future are discussed without concrete tools.",
    SD: "Language and work are identified as requirements while investment in integration is rejected.",
  },
  "agenda-ekonomi-2026-08-23": {
    C: "Jobs, small business, education and further training are discussed. The matching problem is visible, but integration infrastructure is not.",
    S: "Skills supply, research, innovation and faster processes are discussed without connecting them to integration.",
    M: "Business conditions and attracting skills are emphasised, mainly as international recruitment.",
    KD: "Growing companies and a faster state for investment are discussed, not the individual's route into work.",
    MP: "Green jobs and industrial transition create an indirect employment connection.",
    L: "Work, responsibility and starting a business are mentioned without an operational model.",
    V: "Investment and more jobs are discussed, while skills matching remains invisible.",
    SD: "Taxes and household finances dominate without a clear connection to the programme's mechanisms.",
  },
  "agenda-klimat-2026-08-30": {
    MP: "Climate policy is connected to jobs, innovation and industrial development, but not to integration capacity.",
    C: "Business, a domestic market and industrial transition create an indirect business connection.",
    V: "The national travel card would reduce geographic friction through one nationwide ticket and app.",
    S: "Industrial employment and Volvo jobs are defended as part of the transition.",
    M: "Transport, industry and business are discussed without a link to skills or integration.",
    L: "European industry and business competitiveness are central, while integration is absent.",
    KD: "No clear mechanism close to the 15 points appears.",
    SD: "No clear mechanism close to the 15 points appears.",
  },
};

function representativeFor(debate: DebateAnalysis, party: PartyAbbreviation) {
  const labelled = debate.participants.find((participant) => participant.includes(`(${party})`));
  if (labelled) return labelled;

  const interviewerNames = ["Anders Thoresson", "AI Sweden"];
  return debate.participants.find(
    (participant) => !interviewerNames.some((name) => participant.includes(name)),
  ) ?? party;
}

export const rhetoricObservations: RhetoricObservation[] = debates
  .flatMap((debate, order) =>
    debate.partyRankings.map((ranking) => {
      const party = ranking.abbreviation as PartyAbbreviation;
      const code = rhetoricCodes[debate.id]?.[party];

      return {
        id: `${debate.id}-${party}`,
        debateId: debate.id,
        date: debate.date,
        order,
        party,
        representative: representativeFor(debate, party),
        type: debate.type,
        title: debate.title,
        titleEn: debate.titleEn,
        evidence: ranking.reasoning,
        evidenceEn: rhetoricEvidenceEn[debate.id]?.[party] ?? debate.summaryEn,
        integration: code?.integration ?? 0,
        ai: code?.ai ?? 0,
        bridge: code?.bridge ?? 0,
        coded: Boolean(code),
      } satisfies RhetoricObservation;
    }),
  )
  .sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order);

export const rhetoricScale = {
  integration: {
    min: -1,
    max: 3,
    labelsSv: { "-1": "Motverkar", "0": "Frånvarande", "1": "Problem/krav", "2": "Möjlighet", "3": "Systemdesign" },
    labelsEn: { "-1": "Opposes", "0": "Absent", "1": "Problem/demands", "2": "Opportunity", "3": "System design" },
  },
  ai: {
    min: 0,
    max: 3,
    labelsSv: { "0": "Frånvarande", "1": "Nämns", "2": "Politik/infrastruktur", "3": "Konkret tillämpning" },
    labelsEn: { "0": "Absent", "1": "Mentioned", "2": "Policy/infrastructure", "3": "Concrete application" },
  },
  bridge: {
    min: 0,
    max: 3,
    labelsSv: { "0": "Ingen koppling", "1": "Latent möjlighet", "2": "Delvis uttalad", "3": "Operativ koppling" },
    labelsEn: { "0": "No connection", "1": "Latent potential", "2": "Partly explicit", "3": "Operational connection" },
  },
} as const;

export function getRhetoricEditorialNotes() {
  const coded = rhetoricObservations.filter((observation) => observation.coded);
  const explicitBridgeCount = coded.filter((observation) => observation.bridge >= 2).length;

  return [
    {
      sv: "AI-intervjuerna gör tekniken synlig men integrationen osynlig. I de breda debatterna händer ofta det omvända.",
      en: "The AI interviews make technology visible but integration invisible. In broad debates, the reverse often happens.",
    },
    {
      sv: `${explicitBridgeCount === 0 ? "Ingen" : explicitBridgeCount} av ${coded.length} kodade partiframträdanden når nivå 2 eller 3 för kopplingen mellan AI och integration.`,
      en: `${explicitBridgeCount === 0 ? "None" : explicitBridgeCount} of ${coded.length} coded party appearances reaches level 2 or 3 for the connection between AI and integration.`,
    },
    {
      sv: "Agendas ämnesdebatter pressar retoriken mot noll: ekonomi och klimat diskuteras utan att integrationskapaciteten blir synlig.",
      en: "Agenda's topic debates push the rhetoric toward zero: the economy and climate are discussed without making integration capacity visible.",
    },
  ];
}
