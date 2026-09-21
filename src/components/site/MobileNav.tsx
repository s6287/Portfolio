"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";

type Item = { href: string; label: string };

export function MobileNav({ items }: { items: readonly Item[] }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex h-11 items-center rounded-md border border-ink px-4 text-[0.95rem] font-medium"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <nav
          id={panelId}
          aria-label="Main"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-20 w-56 rounded-md border border-ink bg-surface p-2 shadow-[6px_6px_0_var(--ink)]"
        >
          <ul>
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded px-3 text-base hover:bg-accent hover:text-accent-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
