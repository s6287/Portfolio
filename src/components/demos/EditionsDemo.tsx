"use client";

import { useId, useState } from "react";
import { editionIds, editions, type EditionId } from "@/lib/editions";
import { DemoFrame } from "./DemoFrame";

const products = [
  { name: "Gift hamper", price: "₹1,450" },
  { name: "Desk set", price: "₹890" },
  { name: "Tea collection", price: "₹620" },
  { name: "Travel kit", price: "₹1,120" },
];

export function EditionsDemo({ title, intro }: { title: string; intro?: string }) {
  const [edition, setEdition] = useState<EditionId>("diwali");
  const [hasProducts, setHasProducts] = useState(true);
  const [member, setMember] = useState(false);
  const group = useId();
  const current = editions[edition];
  const fallback = edition !== "default" && !hasProducts;

  return (
    <DemoFrame
      title={title}
      intro={intro}
      onReset={() => {
        setEdition("diwali");
        setHasProducts(true);
        setMember(false);
      }}
    >
      <fieldset>
        <legend className="mb-2 text-[0.9rem] font-medium">Active edition</legend>
        <div className="flex flex-wrap gap-2">
          {editionIds.map((id) => (
            <label
              key={id}
              className={`flex min-h-11 cursor-pointer items-center rounded-md border px-4 text-[0.95rem] has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                edition === id ? "border-ink bg-accent font-semibold text-accent-ink" : "border-rule hover:border-ink"
              }`}
            >
              <input type="radio" name={group} className="sr-only" checked={edition === id} onChange={() => setEdition(id)} />
              {editions[id].name}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
        <label className="flex min-h-11 cursor-pointer items-center gap-2">
          <input type="checkbox" checked={hasProducts} onChange={(e) => setHasProducts(e.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
          This edition has products mapped
        </label>
        <label className="flex min-h-11 cursor-pointer items-center gap-2">
          <input type="checkbox" checked={member} onChange={(e) => setMember(e.target.checked)} className="h-5 w-5 accent-[var(--accent)]" />
          Signed in as a member
        </label>
      </div>

      <div
        style={current.tokens as React.CSSProperties}
        className="mt-4 overflow-hidden rounded-md border border-ink bg-[var(--ed-bg)] text-[var(--ed-ink)] transition-colors duration-300"
      >
        <div className="px-5 py-8 sm:px-8">
          <p className="text-[0.85rem] opacity-80">{current.window} edition</p>
          <p className="mt-1 font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-none">{current.name}</p>
          <p className="mt-3 max-w-[40ch]">{current.tagline}</p>
          <span className="mt-5 inline-flex min-h-10 items-center rounded bg-[var(--ed-accent)] px-4 text-[0.9rem] font-semibold text-[var(--ed-accent-ink)]">
            Browse the edition
          </span>
        </div>

        {fallback ? (
          <p className="border-t border-[var(--ed-soft)] bg-[var(--ed-soft)] px-5 py-3 text-[0.9rem] sm:px-8">
            No products are mapped to this edition yet, so visitors see the full catalogue instead of an empty page.
          </p>
        ) : null}

        <ul className="grid grid-cols-2 gap-px border-t border-[var(--ed-soft)] bg-[var(--ed-soft)] sm:grid-cols-4">
          {products.map((product) => (
            <li key={product.name} className="bg-[var(--ed-bg)] p-4">
              <div className="mb-3 aspect-[4/3] rounded bg-[var(--ed-soft)]" aria-hidden="true" />
              <p className="text-[0.95rem] font-medium">{product.name}</p>
              <p className="mt-1 text-[0.85rem] opacity-80">{member ? product.price : "Sign in to see the price"}</p>
            </li>
          ))}
        </ul>
      </div>

      <p role="status" aria-live="polite" className="mt-3 text-[0.9rem] text-muted">
        {fallback ? "Fallback active: full catalogue shown." : `${current.name} theme applied by swapping five CSS variables.`}{" "}
        {member ? "Prices visible to members." : "Prices hidden behind the member gate."}
      </p>
    </DemoFrame>
  );
}
