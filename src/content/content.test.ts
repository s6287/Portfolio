import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getCaseStudy, work } from "./work";

// Client names and URLs covered by an NDA are deliberately NOT written in this public repo.
// The list lives in an untracked `.nda-terms.local` file (one term per line) or the NDA_TERMS
// environment variable (comma separated). Without either, the check is skipped.
const clean = (values: string[]) => values.map((value) => value.trim()).filter(Boolean);

const NDA_TERMS: string[] = (() => {
  if (process.env.NDA_TERMS) return clean(process.env.NDA_TERMS.split(","));
  if (existsSync(".nda-terms.local")) return clean(readFileSync(".nda-terms.local", "utf8").split("\n"));
  return [];
})();

// Figures from the old site that cannot be defended in an interview. Checked in the copy only,
// because percentages are ordinary values in CSS.
const DROPPED_CLAIMS = ["92%", "25%", "80%", "70%"];

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const isText = (file: string) => /\.(ts|tsx|css|md|svg|txt|json)$/.test(file);

describe("content", () => {
  it("has four complete case studies in display order", () => {
    expect(work.map((w) => w.slug)).toEqual(["spectra", "ranksense", "attenview", "catalogue-saas"]);
    for (const study of work) {
      expect(study.summary.length).toBeGreaterThan(40);
      expect(study.problem.length).toBeGreaterThan(0);
      expect(study.built.length).toBeGreaterThan(0);
      expect(study.decisions.length).toBeGreaterThan(0);
      expect(study.outcome.length).toBeGreaterThan(0);
      expect(study.stack.length).toBeGreaterThan(2);
      expect(getCaseStudy(study.slug)).toBe(study);
    }
    expect(getCaseStudy("nope")).toBeUndefined();
  });

  it.skipIf(NDA_TERMS.length === 0)("never leaks NDA terms anywhere in src, public, docs or the README", () => {
    const files = [...walk("src"), ...walk("public"), ...walk("docs"), "README.md"].filter(isText);
    for (const file of files) {
      const text = readFileSync(file, "utf8");
      for (const term of NDA_TERMS) expect(text.includes(term), `an NDA term was found in ${file}`).toBe(false);
    }
  });

  it("does not bring back claims that were dropped", () => {
    for (const file of walk("src/content").filter((f) => isText(f) && !f.endsWith(".test.ts"))) {
      const text = readFileSync(file, "utf8");
      for (const claim of DROPPED_CLAIMS) expect(text.includes(claim), `"${claim}" found in ${file}`).toBe(false);
    }
  });
});
