export type AgendaTopicShare = {
  topic: string;
  topicEn: string;
  pct: number;
};

export type AgendaSpeakerRow = {
  party: string;
  representative: string;
  seconds: number;
  shareOfBroadcast: number;
  shareAmongRepresentatives: number;
  topTopics: AgendaTopicShare[];
};

export type AgendaDebateStats = {
  id: "economy" | "climate";
  label: string;
  labelEn: string;
  date: string;
  hostSeconds: number;
  hostShare: number;
  representativeTotal: number;
  rows: AgendaSpeakerRow[];
  overallTopics: AgendaTopicShare[];
};

export const partyColors: Record<string, string> = {
  M: "#52BDEC",
  S: "#E8112D",
  SD: "#DDDD00",
  V: "#DA291C",
  C: "#009933",
  KD: "#000077",
  MP: "#83CF39",
  L: "#006AB3",
};

export const agendaDebateStats: AgendaDebateStats[] = [
  {
    id: "economy",
    label: "Ekonomi",
    labelEn: "Economy",
    date: "2026-08-23",
    hostSeconds: 475.12,
    hostShare: 18.9,
    representativeTotal: 1954.62,
    overallTopics: [
      { topic: "Jobb och tillväxt", topicEn: "Jobs and growth", pct: 22.7 },
      { topic: "Skatter", topicEn: "Taxes", pct: 21.9 },
      { topic: "Välfärd och trygghet", topicEn: "Welfare and security", pct: 16.4 },
      { topic: "Statsfinanser", topicEn: "Public finances", pct: 15.5 },
      { topic: "Hushållens ekonomi", topicEn: "Household economy", pct: 11.1 },
      { topic: "Klimat och energi", topicEn: "Climate and energy", pct: 6.5 },
      { topic: "Annat", topicEn: "Other", pct: 5.9 },
    ],
    rows: [
      { party: "M", representative: "Elisabeth Svantesson", seconds: 346.91, shareOfBroadcast: 13.8, shareAmongRepresentatives: 17.7, topTopics: [{ topic: "Jobb/tillväxt", topicEn: "Jobs/growth", pct: 28 }, { topic: "Statsfinanser", topicEn: "Public finances", pct: 22 }, { topic: "Annat", topicEn: "Other", pct: 16 }] },
      { party: "S", representative: "Mikael Damberg", seconds: 344.71, shareOfBroadcast: 13.7, shareAmongRepresentatives: 17.6, topTopics: [{ topic: "Välfärd/trygghet", topicEn: "Welfare/security", pct: 27 }, { topic: "Jobb/tillväxt", topicEn: "Jobs/growth", pct: 14 }, { topic: "Statsfinanser", topicEn: "Public finances", pct: 14 }] },
      { party: "SD", representative: "Oscar Sjöstedt", seconds: 259, shareOfBroadcast: 10.3, shareAmongRepresentatives: 13.3, topTopics: [{ topic: "Skatter", topicEn: "Taxes", pct: 30 }, { topic: "Hushållsekonomi", topicEn: "Household economy", pct: 28 }, { topic: "Jobb/tillväxt", topicEn: "Jobs/growth", pct: 16 }] },
      { party: "L", representative: "Lars Leijonborg", seconds: 238.55, shareOfBroadcast: 9.5, shareAmongRepresentatives: 12.2, topTopics: [{ topic: "Statsfinanser", topicEn: "Public finances", pct: 39 }, { topic: "Skatter", topicEn: "Taxes", pct: 33 }, { topic: "Jobb/tillväxt", topicEn: "Jobs/growth", pct: 24 }] },
      { party: "C", representative: "Martin Ådahl", seconds: 216.18, shareOfBroadcast: 8.6, shareAmongRepresentatives: 11.1, topTopics: [{ topic: "Jobb/tillväxt", topicEn: "Jobs/growth", pct: 41 }, { topic: "Skatter", topicEn: "Taxes", pct: 27 }, { topic: "Hushållsekonomi", topicEn: "Household economy", pct: 14 }] },
      { party: "V", representative: "Ida Gabrielsson", seconds: 211.46, shareOfBroadcast: 8.4, shareAmongRepresentatives: 10.8, topTopics: [{ topic: "Välfärd/trygghet", topicEn: "Welfare/security", pct: 40 }, { topic: "Skatter", topicEn: "Taxes", pct: 26 }, { topic: "Statsfinanser", topicEn: "Public finances", pct: 16 }] },
      { party: "KD", representative: "Hans Eklind", seconds: 183.36, shareOfBroadcast: 7.3, shareAmongRepresentatives: 9.4, topTopics: [{ topic: "Välfärd/trygghet", topicEn: "Welfare/security", pct: 33 }, { topic: "Jobb/tillväxt", topicEn: "Jobs/growth", pct: 29 }, { topic: "Hushållsekonomi", topicEn: "Household economy", pct: 22 }] },
      { party: "MP", representative: "Janine Alm Ericson", seconds: 154.45, shareOfBroadcast: 6.1, shareAmongRepresentatives: 7.9, topTopics: [{ topic: "Klimat/energi", topicEn: "Climate/energy", pct: 39 }, { topic: "Jobb/tillväxt", topicEn: "Jobs/growth", pct: 26 }, { topic: "Skatter", topicEn: "Taxes", pct: 26 }] },
    ],
  },
  {
    id: "climate",
    label: "Klimat",
    labelEn: "Climate",
    date: "2026-08-30",
    hostSeconds: 569.67,
    hostShare: 22.7,
    representativeTotal: 1941.06,
    overallTopics: [
      { topic: "Transporter", topicEn: "Transport", pct: 37.9 },
      { topic: "Klimat", topicEn: "Climate", pct: 33.5 },
      { topic: "Energi", topicEn: "Energy", pct: 14.6 },
      { topic: "Konsumtion", topicEn: "Consumption", pct: 5.7 },
      { topic: "Ekonomi", topicEn: "Economy", pct: 5.3 },
      { topic: "Mat och jordbruk", topicEn: "Food and agriculture", pct: 2.6 },
      { topic: "Annat", topicEn: "Other", pct: 0.4 },
    ],
    rows: [
      { party: "L", representative: "Romina Pourmokhtari", seconds: 296.37, shareOfBroadcast: 11.8, shareAmongRepresentatives: 15.3, topTopics: [{ topic: "Transporter", topicEn: "Transport", pct: 38 }, { topic: "Energi", topicEn: "Energy", pct: 23 }, { topic: "Klimat", topicEn: "Climate", pct: 19 }] },
      { party: "M", representative: "Jessica Rosencrantz", seconds: 290.14, shareOfBroadcast: 11.6, shareAmongRepresentatives: 14.9, topTopics: [{ topic: "Transporter", topicEn: "Transport", pct: 43 }, { topic: "Klimat", topicEn: "Climate", pct: 21 }, { topic: "Energi", topicEn: "Energy", pct: 16 }] },
      { party: "MP", representative: "Amanda Lind", seconds: 252, shareOfBroadcast: 10, shareAmongRepresentatives: 13, topTopics: [{ topic: "Transporter", topicEn: "Transport", pct: 37 }, { topic: "Energi", topicEn: "Energy", pct: 27 }, { topic: "Klimat", topicEn: "Climate", pct: 21 }] },
      { party: "V", representative: "Jonas Sjöstedt", seconds: 244.5, shareOfBroadcast: 9.7, shareAmongRepresentatives: 12.6, topTopics: [{ topic: "Transporter", topicEn: "Transport", pct: 49 }, { topic: "Klimat", topicEn: "Climate", pct: 41 }, { topic: "Energi", topicEn: "Energy", pct: 6 }] },
      { party: "KD", representative: "Peter Kullgren", seconds: 234.91, shareOfBroadcast: 9.4, shareAmongRepresentatives: 12.1, topTopics: [{ topic: "Transporter", topicEn: "Transport", pct: 47 }, { topic: "Klimat", topicEn: "Climate", pct: 41 }, { topic: "Mat/jordbruk", topicEn: "Food/agriculture", pct: 8 }] },
      { party: "S", representative: "Åsa Westlund", seconds: 233.81, shareOfBroadcast: 9.3, shareAmongRepresentatives: 12, topTopics: [{ topic: "Klimat", topicEn: "Climate", pct: 57 }, { topic: "Energi", topicEn: "Energy", pct: 19 }, { topic: "Transporter", topicEn: "Transport", pct: 17 }] },
      { party: "C", representative: "Rickard Nordin", seconds: 216.14, shareOfBroadcast: 8.6, shareAmongRepresentatives: 11.1, topTopics: [{ topic: "Transporter", topicEn: "Transport", pct: 36 }, { topic: "Klimat", topicEn: "Climate", pct: 35 }, { topic: "Energi", topicEn: "Energy", pct: 18 }] },
      { party: "SD", representative: "Martin Kinnunen", seconds: 173.19, shareOfBroadcast: 6.9, shareAmongRepresentatives: 8.9, topTopics: [{ topic: "Klimat", topicEn: "Climate", pct: 43 }, { topic: "Transporter", topicEn: "Transport", pct: 33 }, { topic: "Ekonomi", topicEn: "Economy", pct: 17 }] },
    ],
  },
];

export const agendaCombinedSpeakingTime = [
  { party: "M", seconds: 637.05, economy: 346.91, climate: 290.14, share: 16.4 },
  { party: "S", seconds: 578.52, economy: 344.71, climate: 233.81, share: 14.9 },
  { party: "L", seconds: 534.92, economy: 238.55, climate: 296.37, share: 13.7 },
  { party: "V", seconds: 455.96, economy: 211.46, climate: 244.5, share: 11.7 },
  { party: "C", seconds: 432.32, economy: 216.18, climate: 216.14, share: 11.1 },
  { party: "SD", seconds: 432.19, economy: 259, climate: 173.19, share: 11.1 },
  { party: "KD", seconds: 418.27, economy: 183.36, climate: 234.91, share: 10.7 },
  { party: "MP", seconds: 406.45, economy: 154.45, climate: 252, share: 10.4 },
];
