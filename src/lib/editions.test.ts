import { describe, expect, it } from "vitest";
import { editionIds, editions } from "./editions";

describe("editions", () => {
  it("offers the default storefront plus three event editions", () => {
    expect(editionIds).toEqual(["default", "diwali", "holi", "christmas"]);
  });

  it("gives every edition the same theme token keys, so a switch can never leave a gap", () => {
    const keys = Object.keys(editions.default.tokens).sort();
    for (const id of editionIds) {
      expect(Object.keys(editions[id].tokens).sort()).toEqual(keys);
      expect(editions[id].name.length).toBeGreaterThan(0);
      expect(editions[id].tagline.length).toBeGreaterThan(0);
    }
  });
});
