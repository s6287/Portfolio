"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { chunk, mergeRows, type Row } from "@/lib/merge";
import { DemoFrame } from "./DemoFrame";

const existing: Row[] = [
  { name: "Rahul Shah", email: "rahul@acmegifts.example", company: "Acme Gifts" },
  { name: "Priya Nair", company: "Bloom & Co" },
  { name: "Imran Khan", email: "imran@northstar.example", company: "Northstar" },
];

const sheet: Row[] = [
  { name: "Rahul S.", email: "RAHUL@acmegifts.example", company: "Acme Gifts Pvt" },
  { name: "Arjun Rao", email: "arjun@lumen.example", company: "Lumen" },
  { name: "priya  nair", company: "Bloom and Co" },
  { name: "Sara Thomas", email: "sara@kite.example", company: "Kite Studio" },
  { name: "Arjun R", email: "arjun@lumen.example", company: "Lumen India" },
  { name: "Neha Joshi", email: "neha@paperboat.example", company: "Paperboat" },
  { name: "Imran K", email: "imran@northstar.example", company: "Northstar" },
];

const CHUNK = 3;

type Status = { kind: "new" } | { kind: "merged"; into: string } | { kind: "review" };

export function ImportDemo({ title, intro }: { title: string; intro?: string }) {
  const [processed, setProcessed] = useState(0);
  const [running, setRunning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const statuses = useMemo(() => {
    const result = mergeRows(existing, sheet);
    const map = new Map<Row, Status>();
    result.created.forEach((row) => map.set(row, { kind: "new" }));
    result.merged.forEach(({ into, from }) => map.set(from, { kind: "merged", into: into.name }));
    result.review.forEach((row) => map.set(row, { kind: "review" }));
    return map;
  }, []);

  const batches = useMemo(() => chunk(sheet, CHUNK), []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function run() {
    if (running) return;
    const instant = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (instant) {
      setProcessed(sheet.length);
      return;
    }
    setRunning(true);
    setProcessed(0);
    let done = 0;
    const step = (index: number) => {
      const batch = batches[index];
      if (!batch) {
        setRunning(false);
        return;
      }
      done += batch.length;
      setProcessed(done);
      timer.current = setTimeout(() => step(index + 1), 550);
    };
    timer.current = setTimeout(() => step(0), 250);
  }

  function reset() {
    if (timer.current) clearTimeout(timer.current);
    setRunning(false);
    setProcessed(0);
  }

  const finished = processed === sheet.length;
  const shown = sheet.slice(0, processed);
  const count = (kind: Status["kind"]) => shown.filter((row) => statuses.get(row)?.kind === kind).length;

  return (
    <DemoFrame title={title} intro={intro} onReset={reset}>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="min-h-11 rounded-md bg-accent px-5 font-semibold text-accent-ink shadow-[3px_3px_0_var(--ink)] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_var(--ink)] disabled:opacity-60"
        >
          {running ? "Importing" : finished ? "Run it again" : "Run the import"}
        </button>
        <div className="min-w-48 flex-1">
          <div className="h-3 overflow-hidden rounded-full border border-ink bg-sunken" aria-hidden="true">
            <div className="h-full bg-accent transition-[width] duration-500" style={{ width: `${(processed / sheet.length) * 100}%` }} />
          </div>
          <p role="status" aria-live="polite" className="mt-1 text-[0.85rem] text-muted">
            {processed === 0
              ? `${sheet.length} rows waiting, sent in batches of ${CHUNK}. ${existing.length} people already in the system.`
              : `${processed} of ${sheet.length} rows processed. ${count("new")} new, ${count("merged")} merged, ${count("review")} for review.`}
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full border-collapse text-left text-[0.9rem]">
          <caption className="sr-only">Rows in the uploaded sheet and what the import did with each</caption>
          <thead>
            <tr className="border-b-2 border-ink text-[0.8rem]">
              <th scope="col" className="py-2 pr-3 font-semibold">Name in the sheet</th>
              <th scope="col" className="hidden py-2 pr-3 font-semibold sm:table-cell">Email</th>
              <th scope="col" className="py-2 pr-3 font-semibold">Result</th>
            </tr>
          </thead>
          <tbody>
            {sheet.map((row, index) => {
              const status = index < processed ? statuses.get(row) : undefined;
              return (
                <tr key={`${row.name}-${index}`} className="border-b border-rule align-top">
                  <td className="py-2 pr-3 font-mono text-[0.85rem]">{row.name}</td>
                  <td className="hidden py-2 pr-3 font-mono text-[0.8rem] text-muted sm:table-cell">{row.email ?? "none"}</td>
                  <td className="py-2 pr-3">{status ? <Result status={status} /> : <span className="text-muted">Waiting</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {finished ? (
        <p className="mt-4 text-[0.9rem] text-muted">
          Every merged value keeps its own tag: which upload it came from, who ran it and when. That is how staff settle a disagreement between two sheets.
        </p>
      ) : null}
    </DemoFrame>
  );
}

function Result({ status }: { status: Status }) {
  if (status.kind === "new") return <span className="font-medium text-ok">New person created</span>;
  if (status.kind === "merged") return <span className="font-medium">Merged into {status.into}, same email</span>;
  return <span className="font-medium text-warn">Sent to review: name matches, no email to confirm</span>;
}
