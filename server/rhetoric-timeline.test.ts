import { describe, expect, it } from "vitest";
import {
  parties,
  rhetoricCodes,
  rhetoricObservations,
  rhetoricScale,
} from "../client/src/lib/rhetoric-timeline";

describe("Rhetoric timeline data", () => {
  it("codes every party appearance in all 12 analyses", () => {
    expect(rhetoricObservations).toHaveLength(47);
    expect(rhetoricObservations.every((observation) => observation.coded)).toBe(true);
    expect(Object.keys(rhetoricCodes)).toHaveLength(12);
    expect(rhetoricObservations.every((observation) => observation.evidenceEn.length > 20)).toBe(true);
  });

  it("includes all eight parliamentary parties", () => {
    const represented = new Set(rhetoricObservations.map((observation) => observation.party));
    expect([...represented].sort()).toEqual([...parties].sort());
  });

  it("is sorted chronologically with stable source order", () => {
    for (let index = 1; index < rhetoricObservations.length; index += 1) {
      const previous = rhetoricObservations[index - 1];
      const current = rhetoricObservations[index];
      expect(
        previous.date < current.date ||
          (previous.date === current.date && previous.order <= current.order),
      ).toBe(true);
    }
  });

  it("keeps every score inside its declared editorial scale", () => {
    for (const observation of rhetoricObservations) {
      expect(observation.integration).toBeGreaterThanOrEqual(rhetoricScale.integration.min);
      expect(observation.integration).toBeLessThanOrEqual(rhetoricScale.integration.max);
      expect(observation.ai).toBeGreaterThanOrEqual(rhetoricScale.ai.min);
      expect(observation.ai).toBeLessThanOrEqual(rhetoricScale.ai.max);
      expect(observation.bridge).toBeGreaterThanOrEqual(rhetoricScale.bridge.min);
      expect(observation.bridge).toBeLessThanOrEqual(rhetoricScale.bridge.max);
    }
  });

  it("shows that no observed party appearance makes an explicit AI-integration bridge", () => {
    expect(Math.max(...rhetoricObservations.map((observation) => observation.bridge))).toBe(1);
  });

  it("provides party-specific English evidence in multi-party debates", () => {
    const expressenEvidence = rhetoricObservations
      .filter((observation) => observation.debateId === "expressen-di-partiledardebatt-2026-08-17")
      .map((observation) => observation.evidenceEn);

    expect(new Set(expressenEvidence).size).toBe(8);
  });

  it("captures the format split in the Centre Party sequence", () => {
    const centre = rhetoricObservations.filter((observation) => observation.party === "C");
    const aiInterview = centre.find((observation) => observation.debateId === "ai-sweden-etr-2026-05");
    const economyDebate = centre.find((observation) => observation.debateId === "agenda-ekonomi-2026-08-23");

    expect(aiInterview).toMatchObject({ integration: 0, ai: 3, bridge: 1 });
    expect(economyDebate).toMatchObject({ integration: 0, ai: 0, bridge: 0 });
  });
});
