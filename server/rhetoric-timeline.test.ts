import { describe, expect, it } from "vitest";
import {
  parties,
  rhetoricCodes,
  rhetoricObservations,
  rhetoricScale,
} from "../client/src/lib/rhetoric-timeline";

describe("Rhetoric timeline data", () => {
  it("codes every party appearance in all 13 analyses", () => {
    expect(rhetoricObservations).toHaveLength(55);
    expect(rhetoricObservations.every((observation) => observation.coded)).toBe(true);
    expect(Object.keys(rhetoricCodes)).toHaveLength(13);
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

  it("captures the first partly explicit AI-integration bridge", () => {
    const explicit = rhetoricObservations.filter((observation) => observation.bridge >= 2);

    expect(explicit).toHaveLength(1);
    expect(explicit[0]).toMatchObject({
      debateId: "sveriges-radio-ai-debatt-2026-09-05",
      party: "C",
      integration: 2,
      ai: 3,
      bridge: 2,
    });
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
    const srAiDebate = centre.find((observation) => observation.debateId === "sveriges-radio-ai-debatt-2026-09-05");

    expect(aiInterview).toMatchObject({ integration: 0, ai: 3, bridge: 1 });
    expect(economyDebate).toMatchObject({ integration: 0, ai: 0, bridge: 0 });
    expect(srAiDebate).toMatchObject({ integration: 2, ai: 3, bridge: 2 });
  });
});
