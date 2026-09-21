"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // Private mode can block storage. The choice still holds for this visit.
  }
  listeners.forEach((listener) => listener());
}

export function ThemeToggle() {
  // The server cannot know the saved theme, so it renders the light label and the client corrects it.
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "light");
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => applyTheme(next)}
      className="flex h-11 items-center rounded-md border border-rule px-3 text-[0.9rem] hover:border-ink hover:bg-accent hover:text-accent-ink"
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>{next === "dark" ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}
