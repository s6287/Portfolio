import Link from "next/link";
import { Container } from "@/components/site/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { work } from "@/content/work";

export function WorkIndex() {
  return (
    <Container className="py-14">
      <SectionHeading id="work" title="Work" lead="Four things I built and shipped. Each page explains the problem, the decisions, and lets you try a recreation of the hard part." />
      <ul className="border-b border-rule">
        {work.map((study) => (
          <li key={study.slug} className="border-t border-rule">
            <Link
              href={`/work/${study.slug}`}
              className="group grid gap-x-8 gap-y-2 py-7 transition-colors hover:bg-accent hover:text-accent-ink md:grid-cols-[17rem_minmax(0,1fr)_11rem] md:items-baseline md:px-4"
            >
              <span className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] leading-none">{study.title}</span>
              <span>
                <span className="block text-lg font-medium">{study.kind}</span>
                <span className="mt-1 block text-muted group-hover:text-accent-ink">{study.summary}</span>
                <span className="mt-3 block text-[0.9rem] text-muted group-hover:text-accent-ink">{study.stack.slice(0, 5).join(", ")}</span>
              </span>
              <span className="text-[0.95rem] text-muted group-hover:text-accent-ink md:text-right">{study.period}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
