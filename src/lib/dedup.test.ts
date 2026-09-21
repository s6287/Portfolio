import { describe, expect, it } from "vitest";
import { planRun, workersNeeded } from "./dedup";

describe("workersNeeded", () => {
  it("scales one worker per 100 pending keywords, capped at 20", () => {
    expect(workersNeeded(0)).toBe(0);
    expect(workersNeeded(1)).toBe(1);
    expect(workersNeeded(100)).toBe(1);
    expect(workersNeeded(250)).toBe(3);
    expect(workersNeeded(5000)).toBe(20);
  });
});

describe("planRun", () => {
  const items = [
    { project: "A", keyword: "best running shoes" },
    { project: "B", keyword: "Best Running Shoes " },
    { project: "A", keyword: "trail shoes" },
    { project: "C", keyword: "trail shoes" },
    { project: "B", keyword: "marathon plan" },
    { project: "C", keyword: "shoe size guide" },
  ];

  it("calls the API once per unique keyword", () => {
    const plan = planRun(items);
    expect(plan.unique).toEqual(["best running shoes", "trail shoes", "marathon plan", "shoe size guide"]);
    expect(plan.apiCalls).toBe(4);
    expect(plan.duplicates).toBe(2);
    expect(plan.saved).toBe(2);
    expect(plan.savedPct).toBe(33);
    expect(plan.workers).toBe(1);
  });

  it("handles an empty run", () => {
    expect(planRun([])).toEqual({ unique: [], duplicates: 0, apiCalls: 0, saved: 0, savedPct: 0, workers: 0 });
  });
});
