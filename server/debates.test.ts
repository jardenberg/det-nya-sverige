import { describe, it, expect } from "vitest";
import { debates } from "../client/src/lib/debates";

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
        expect(section.jjComment).toBeTruthy();
        expect(section.jjCommentEn).toBeTruthy();
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
});
