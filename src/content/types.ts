export type DemoId = "board" | "dedup" | "import" | "editions";

export type CaseStudySlug = "spectra" | "ranksense" | "attenview" | "catalogue-saas";

export type CaseStudy = {
  slug: CaseStudySlug;
  title: string;
  /** What the thing is, in a few plain words. Shown next to the title. */
  kind: string;
  summary: string;
  role: string;
  period: string;
  team: string;
  stack: string[];
  problem: string[];
  built: string[];
  decisions: { chose: string; over: string; because: string }[];
  outcome: string[];
  metrics: { value: string; label: string }[];
  demo: DemoId;
  demoTitle: string;
  demoIntro: string;
};
