type Props = {
  title: string;
  intro?: string;
  onReset?: () => void;
  children: React.ReactNode;
};

/** Shared chrome for every recreation: what it is, the honesty caption, and a way back to the start. */
export function DemoFrame({ title, intro, onReset, children }: Props) {
  return (
    <section aria-label={title} className="rounded-lg border-2 border-ink bg-surface shadow-[6px_6px_0_var(--ink)]">
      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-b border-rule px-4 py-4 sm:px-6">
        <div className="max-w-[60ch]">
          <h3 className="font-sans text-lg font-semibold leading-snug tracking-normal">{title}</h3>
          {intro ? <p className="mt-1 text-[0.95rem] leading-relaxed text-muted">{intro}</p> : null}
        </div>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="min-h-11 shrink-0 rounded-md border border-ink px-4 text-[0.9rem] font-medium hover:bg-accent hover:text-accent-ink"
          >
            Reset
          </button>
        ) : null}
      </header>
      <div className="px-4 py-5 sm:px-6">{children}</div>
      <p className="border-t border-rule px-4 py-3 text-[0.85rem] text-muted sm:px-6">
        Illustrative recreation with sample data. Not the production system.
      </p>
    </section>
  );
}
