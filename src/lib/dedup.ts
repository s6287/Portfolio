/** Pure planning step of the rank-tracking run: fetch each keyword once, however many projects track it. */

export type TrackedKeyword = { project: string; keyword: string };

export type RunPlan = {
  /** Normalised keywords that will actually be sent to the API, in first-seen order. */
  unique: string[];
  duplicates: number;
  apiCalls: number;
  saved: number;
  /** Share of calls avoided, rounded to a whole percent. */
  savedPct: number;
  workers: number;
};

const KEYWORDS_PER_WORKER = 100;
const MAX_WORKERS = 20;

export function normaliseKeyword(keyword: string): string {
  return keyword.trim().toLowerCase().replace(/\s+/g, " ");
}

/** One worker per 100 pending keywords, never more than 20, none when there is nothing to do. */
export function workersNeeded(pending: number): number {
  if (pending <= 0) return 0;
  return Math.min(Math.ceil(pending / KEYWORDS_PER_WORKER), MAX_WORKERS);
}

export function planRun(items: TrackedKeyword[]): RunPlan {
  const unique = [...new Set(items.map((item) => normaliseKeyword(item.keyword)))];
  const saved = items.length - unique.length;
  return {
    unique,
    duplicates: saved,
    apiCalls: unique.length,
    saved,
    savedPct: items.length === 0 ? 0 : Math.round((saved / items.length) * 100),
    workers: workersNeeded(unique.length),
  };
}
