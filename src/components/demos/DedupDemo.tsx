"use client";

import { useState } from "react";
import { normaliseKeyword, planRun, type RunPlan, type TrackedKeyword } from "@/lib/dedup";
import { DemoFrame } from "./DemoFrame";

const projects = ["Shoe retailer", "Sports blog", "Marathon club"];

const initialItems: TrackedKeyword[] = [
  { project: "Shoe retailer", keyword: "best running shoes" },
  { project: "Shoe retailer", keyword: "trail running shoes" },
  { project: "Shoe retailer", keyword: "shoe size guide" },
  { project: "Sports blog", keyword: "best running shoes" },
  { project: "Sports blog", keyword: "marathon training plan" },
  { project: "Sports blog", keyword: "trail running shoes" },
  { project: "Marathon club", keyword: "marathon training plan" },
  { project: "Marathon club", keyword: "best running shoes" },
  { project: "Marathon club", keyword: "race day checklist" },
];

const spare = ["carbon plate shoes", "half marathon pace chart", "running shoes for flat feet", "5k training plan"];

export function DedupDemo({ title, intro }: { title: string; intro?: string }) {
  const [items, setItems] = useState(initialItems);
  const [plan, setPlan] = useState<RunPlan | null>(null);

  const change = (next: TrackedKeyword[]) => {
    setItems(next);
    setPlan(null);
  };

  function addShared() {
    const source = items[0];
    const target = projects.find((p) => source && !items.some((i) => i.project === p && normaliseKeyword(i.keyword) === normaliseKeyword(source.keyword)));
    if (source && target) change([...items, { project: target, keyword: source.keyword }]);
  }

  function addNew() {
    const keyword = spare.find((k) => !items.some((i) => normaliseKeyword(i.keyword) === k));
    const project = projects[items.length % projects.length];
    if (keyword && project) change([...items, { project, keyword }]);
  }

  const sharedBy = (keyword: string) => items.filter((i) => normaliseKeyword(i.keyword) === keyword).length;

  return (
    <DemoFrame
      title={title}
      intro={intro}
      onReset={() => {
        setItems(initialItems);
        setPlan(null);
      }}
    >
      <div className="grid gap-3 md:grid-cols-3">
        {projects.map((project) => (
          <div key={project} className="rounded-md border border-rule bg-sunken p-3">
            <p className="mb-2 text-[0.9rem] font-semibold">{project}</p>
            <ul className="space-y-1.5">
              {items
                .filter((item) => item.project === project)
                .map((item) => (
                  <li key={item.keyword} className="flex items-center justify-between gap-2 rounded border border-rule bg-surface px-2 py-1">
                    <span className="font-mono text-[0.8rem]">{item.keyword}</span>
                    <button
                      type="button"
                      onClick={() => change(items.filter((i) => i !== item))}
                      aria-label={`Remove “${item.keyword}” from ${project}`}
                      className="min-h-8 min-w-8 rounded text-muted hover:bg-accent hover:text-accent-ink"
                    >
                      ×
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setPlan(planRun(items))}
          className="min-h-11 rounded-md bg-accent px-5 font-semibold text-accent-ink shadow-[3px_3px_0_var(--ink)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_var(--ink)]"
        >
          Plan the run
        </button>
        <button type="button" onClick={addShared} className="min-h-11 rounded-md border border-ink px-4 text-[0.95rem] hover:bg-accent hover:text-accent-ink">
          Track a shared keyword
        </button>
        <button type="button" onClick={addNew} className="min-h-11 rounded-md border border-ink px-4 text-[0.95rem] hover:bg-accent hover:text-accent-ink">
          Track a new keyword
        </button>
      </div>

      <div role="status" aria-live="polite" className="mt-5">
        {plan ? (
          <>
            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Stat label="Keywords tracked" value={String(items.length)} />
              <Stat label="API requests made" value={String(plan.apiCalls)} />
              <Stat label="Requests avoided" value={`${plan.saved} (${plan.savedPct}%)`} highlight />
              <Stat label="Workers started" value={String(plan.workers)} />
            </dl>
            <ul className="mt-4 divide-y divide-rule border-y border-rule text-[0.9rem]">
              {plan.unique.map((keyword) => (
                <li key={keyword} className="flex flex-wrap items-center justify-between gap-2 py-2">
                  <span className="font-mono text-[0.85rem]">{keyword}</span>
                  <span className="text-muted">
                    fetched once, synced to {sharedBy(keyword)} {sharedBy(keyword) === 1 ? "project" : "projects"}
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-[0.95rem] text-muted">{items.length} keywords are tracked across three projects. Plan the run to see how many requests they need.</p>
        )}
      </div>
    </DemoFrame>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-md border p-3 ${highlight ? "border-ink bg-accent text-accent-ink" : "border-rule"}`}>
      <dt className="text-[0.8rem]">{label}</dt>
      <dd className="mt-1 font-mono text-xl font-semibold">{value}</dd>
    </div>
  );
}
