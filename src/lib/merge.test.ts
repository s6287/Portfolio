import { describe, expect, it } from "vitest";
import { chunk, mergeRows, normalise } from "./merge";

describe("normalise", () => {
  it("lowercases, trims, collapses spaces and drops punctuation", () => {
    expect(normalise("  Rahul  S. ")).toBe("rahul s");
    expect(normalise("RAHUL-SHAH")).toBe("rahul shah");
  });
});

describe("chunk", () => {
  it("splits into fixed-size groups with a short tail", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([], 3)).toEqual([]);
  });
});

describe("mergeRows", () => {
  const existing = [
    { name: "Rahul Shah", email: "rahul@example.com", company: "Acme Gifts" },
    { name: "Priya Nair", company: "Bloom Co" },
  ];

  it("merges on a matching email even when the name differs", () => {
    const result = mergeRows(existing, [{ name: "Rahul S.", email: "RAHUL@example.com" }]);
    expect(result.merged).toHaveLength(1);
    expect(result.merged[0]?.into.name).toBe("Rahul Shah");
    expect(result.created).toHaveLength(0);
  });

  it("sends a same-name row with no email to review instead of guessing", () => {
    const result = mergeRows(existing, [{ name: "priya  nair" }]);
    expect(result.review).toHaveLength(1);
    expect(result.merged).toHaveLength(0);
  });

  it("creates everything else", () => {
    const result = mergeRows(existing, [{ name: "Arjun Rao", email: "arjun@example.com" }]);
    expect(result.created.map((r) => r.name)).toEqual(["Arjun Rao"]);
  });

  it("deduplicates inside the incoming batch too", () => {
    const result = mergeRows([], [
      { name: "Arjun Rao", email: "arjun@example.com" },
      { name: "Arjun R", email: "arjun@example.com" },
    ]);
    expect(result.created).toHaveLength(1);
    expect(result.merged).toHaveLength(1);
  });
});
