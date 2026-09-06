import { CONDITIONS, TestRecommendation } from "@/data/conditions";
import { TESTS } from "@/data/tests";
import { LABS, Lab } from "@/data/labs";

export type MatchedCondition = {
  conditionId: string;
  label: string;
  plainExplanation: string;
  matchedSymptomCount: number;
};

export type RecommendedTest = {
  testId: string;
  testName: string;
  fullName: string;
  fastingRequired: boolean;
  priority: "core" | "conditional";
  reasons: string[];
  govtBenchmarkPriceINR: number;
};

export function matchConditions(selectedSymptomIds: string[]): MatchedCondition[] {
  const matched: MatchedCondition[] = [];

  for (const condition of CONDITIONS) {
    const matchCount = condition.triggerSymptoms.filter((s) =>
      selectedSymptomIds.includes(s)
    ).length;

    if (matchCount >= condition.minMatches) {
      matched.push({
        conditionId: condition.id,
        label: condition.label,
        plainExplanation: condition.plainExplanation,
        matchedSymptomCount: matchCount,
      });
    }
  }

  return matched.sort((a, b) => b.matchedSymptomCount - a.matchedSymptomCount);
}

export function getRecommendedTests(matchedConditions: MatchedCondition[]): RecommendedTest[] {
  const testMap = new Map<string, RecommendedTest>();

  for (const mc of matchedConditions) {
    const condition = CONDITIONS.find((c) => c.id === mc.conditionId);
    if (!condition) continue;

    for (const rec of condition.recommendedTests as TestRecommendation[]) {
      const testDef = TESTS.find((t) => t.id === rec.testId);
      if (!testDef) continue;

      const existing = testMap.get(rec.testId);
      if (existing) {
        if (rec.priority === "core") existing.priority = "core";
        if (!existing.reasons.includes(rec.reason)) existing.reasons.push(rec.reason);
      } else {
        testMap.set(rec.testId, {
          testId: testDef.id,
          testName: testDef.name,
          fullName: testDef.fullName,
          fastingRequired: testDef.fastingRequired,
          priority: rec.priority,
          reasons: [rec.reason],
          govtBenchmarkPriceINR: testDef.govtBenchmarkPriceINR,
        });
      }
    }
  }

  return Array.from(testMap.values()).sort((a, b) => {
    if (a.priority === b.priority) return 0;
    return a.priority === "core" ? -1 : 1;
  });
}

export type LabQuote = {
  lab: Lab;
  totalPrice: number;
  priceByTest: Record<string, number>;
};

export function getLabQuotes(testIds: string[]): LabQuote[] {
  const quotes: LabQuote[] = LABS.map((lab) => {
    const priceByTest: Record<string, number> = {};
    let totalPrice = 0;
    for (const testId of testIds) {
      const price = lab.prices[testId] ?? 0;
      priceByTest[testId] = price;
      totalPrice += price;
    }
    return { lab, totalPrice, priceByTest };
  });

  return quotes.sort((a, b) => a.totalPrice - b.totalPrice);
}

export function buildWhatsAppLink(whatsappNumber: string, testNames: string[]): string {
  const message =
    `Hi, I'd like to book the following tests: ${testNames.join(", ")}. ` +
    `Could you share pricing and available home-collection slots?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}