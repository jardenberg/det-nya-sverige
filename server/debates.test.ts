import { describe, it, expect } from "vitest";
import { debates } from "../client/src/lib/debates";
import { agendaCombinedSpeakingTime, agendaDebateStats } from "../client/src/lib/agenda-stats";

describe("Debates data structure", () => {
  it("should have at least one debate entry", () => {
    expect(debates.length).toBeGreaterThanOrEqual(1);
  });

  it("should have required fields on each debate", () => {
    for (const debate of debates) {
      expect(debate.id).toBeTruthy();
      expect(debate.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(debate.title).toBeTruthy();
      expect(debate.titleEn).toBeTruthy();
      expect(debate.summary).toBeTruthy();
      expect(debate.summaryEn).toBeTruthy();
      expect(debate.participants.length).toBeGreaterThan(0);
      expect(debate.pdfUrl).toBeTruthy();
      expect(debate.mdUrl).toBeTruthy();
    }
  });

  it("should have exactly 15 point matches per debate", () => {
    for (const debate of debates) {
      expect(debate.pointMatches.length).toBe(15);
      // Verify all 15 point IDs are present
      const ids = debate.pointMatches.map((pm) => pm.pointId);
      for (let i = 1; i <= 15; i++) {
        expect(ids).toContain(i);
      }
    }
  });

  it("should have valid relevance values", () => {
    const validRelevance = ["direct", "indirect", "none"];
    for (const debate of debates) {
      for (const pm of debate.pointMatches) {
        expect(validRelevance).toContain(pm.relevance);
      }
    }
  });

  it("should have 8 party rankings for the first debate (8 party leaders)", () => {
    const first = debates[0];
    expect(first.partyRankings.length).toBe(8);
    // Each party should have a score between 0 and maxScore
    for (const pr of first.partyRankings) {
      expect(pr.score).toBeGreaterThanOrEqual(0);
      expect(pr.score).toBeLessThanOrEqual(pr.maxScore);
      expect(pr.abbreviation).toBeTruthy();
      expect(pr.party).toBeTruthy();
      expect(pr.reasoning).toBeTruthy();
    }
  });

  it("should have the ETR/AI Sweden interview as second entry", () => {
    expect(debates.length).toBeGreaterThanOrEqual(2);
    const etr = debates[1];
    expect(etr.id).toBe("ai-sweden-etr-2026-05");
    expect(etr.source).toBe("AI Sweden Podcast");
    expect(etr.participants).toContain("Elisabeth Thand Ringqvist (C)");
    expect(etr.partyRankings.length).toBe(1); // Single party interview
    expect(etr.partyRankings[0].abbreviation).toBe("C");
    expect(etr.partyRankings[0].score).toBe(8);
    expect(etr.sections.length).toBe(6);
  });

  it("should have valid party rankings for all entries", () => {
    for (const debate of debates) {
      for (const pr of debate.partyRankings) {
        expect(pr.score).toBeGreaterThanOrEqual(0);
        expect(pr.score).toBeLessThanOrEqual(pr.maxScore);
        expect(pr.abbreviation).toBeTruthy();
        expect(pr.party).toBeTruthy();
        expect(pr.reasoning).toBeTruthy();
      }
    }
  });

  it("should have debate sections with facts and quotes", () => {
    for (const debate of debates) {
      expect(debate.sections.length).toBeGreaterThan(0);
      for (const section of debate.sections) {
        expect(section.title).toBeTruthy();
        expect(section.titleEn).toBeTruthy();
        expect(section.facts.length).toBeGreaterThan(0);
        expect(section.factsEn.length).toBe(section.facts.length);
        expect(section.connection).toBeTruthy();
        expect(section.connectionEn).toBeTruthy();
        // jjComment is optional per section (some sections don't warrant commentary)
        expect(typeof section.jjComment).toBe("string");
        expect(typeof section.jjCommentEn).toBe("string");
      }
    }
  });

  it("should have missing themes with point references", () => {
    for (const debate of debates) {
      expect(debate.missingThemes.length).toBeGreaterThan(0);
      for (const mt of debate.missingThemes) {
        expect(mt.theme).toBeTruthy();
        expect(mt.themeEn).toBeTruthy();
        expect(mt.points).toBeTruthy();
      }
    }
  });

  it("should have both Swedish and English conclusions and JJ comments", () => {
    for (const debate of debates) {
      expect(debate.conclusion).toBeTruthy();
      expect(debate.conclusionEn).toBeTruthy();
      expect(debate.jjFinalComment).toBeTruthy();
      expect(debate.jjFinalCommentEn).toBeTruthy();
    }
  });

  it("party rankings should be sorted by score descending", () => {
    for (const debate of debates) {
      for (let i = 1; i < debate.partyRankings.length; i++) {
        expect(debate.partyRankings[i - 1].score).toBeGreaterThanOrEqual(
          debate.partyRankings[i].score
        );
      }
    }
  });

  it("should include all three August election debates", () => {
    const expectedIds = [
      "expressen-di-partiledardebatt-2026-08-17",
      "agenda-ekonomi-2026-08-23",
      "agenda-klimat-2026-08-30",
    ];

    expect(debates.length).toBe(12);
    for (const id of expectedIds) {
      const debate = debates.find((entry) => entry.id === id);
      expect(debate).toBeDefined();
      expect(debate?.type).toBe("debate");
      expect(debate?.partyRankings.length).toBe(8);
      expect(debate?.pdfUrl).toMatch(/\.pdf$/);
      expect(debate?.mdUrl).toMatch(/\.md$/);
      expect(debate?.transcriptUrl).toMatch(/\.md$/);
    }
  });

  it("should expose consistent Agenda speaking-time and topic data", () => {
    expect(agendaDebateStats).toHaveLength(2);
    expect(agendaCombinedSpeakingTime).toHaveLength(8);

    for (const debate of agendaDebateStats) {
      expect(debate.rows).toHaveLength(8);
      expect(debate.overallTopics.reduce((sum, item) => sum + item.pct, 0)).toBeCloseTo(100, 1);
      expect(debate.rows.reduce((sum, row) => sum + row.seconds, 0)).toBeCloseTo(debate.representativeTotal, 1);
      const representativeShare = debate.rows.reduce((sum, row) => sum + row.shareAmongRepresentatives, 0);
      expect(Math.abs(representativeShare - 100)).toBeLessThanOrEqual(0.2);
    }

    for (let index = 1; index < agendaCombinedSpeakingTime.length; index += 1) {
      expect(agendaCombinedSpeakingTime[index - 1].seconds).toBeGreaterThanOrEqual(
        agendaCombinedSpeakingTime[index].seconds,
      );
    }
  });
});
