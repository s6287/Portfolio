import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Demo } from "@/components/demos/Demo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/site/Container";
import { getCaseStudy, work } from "@/content/work";
import { caseStudyJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  const title = `${study.title}: ${study.kind}`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `/work/${study.slug}` },
    openGraph: { type: "article", title, description: study.summary, url: `/work/${study.slug}` },
    twitter: { card: "summary_large_image", title, description: study.summary },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = work.indexOf(study);
  const next = work[(index + 1) % work.length];

  return (
    <article>
      <JsonLd data={caseStudyJsonLd(study)} />

      <Container className="pb-10 pt-12 lg:pt-16">
        <p className="text-[0.95rem]">
          <Link href="/#work" className="link">
            All work
          </Link>
        </p>
        <p className="mt-8 text-lg text-muted">{study.kind}</p>
        <h1 className="mt-2 text-[clamp(3rem,8vw,6.5rem)]">{study.title}</h1>
        <p className="mt-6 max-w-[46ch] text-[clamp(1.25rem,2.2vw,1.6rem)] leading-snug">{study.summary}</p>

        <dl className="mt-10 grid gap-x-10 gap-y-5 border-y border-rule py-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.4fr]">
          <Fact term="My role" value={study.role} />
          <Fact term="When" value={study.period} />
          <Fact term="Team" value={study.team} />
          <div className="sm:col-span-2 lg:col-span-3">
            <dt className="text-[0.9rem] text-muted">Built with</dt>
            <dd className="mt-1 text-lg">{study.stack.join(", ")}</dd>
          </div>
        </dl>
      </Container>

      <Container className="pb-6">
        <Demo id={study.demo} title={study.demoTitle} intro={study.demoIntro} />
      </Container>

      <Container className="grid gap-x-16 gap-y-12 py-12 lg:grid-cols-2">
        <Prose title="The problem" paragraphs={study.problem} />
        <Prose title="What I built" paragraphs={study.built} list />
      </Container>

      <Container className="py-6">
        <h2 className="border-t-2 border-ink pt-5 text-[clamp(1.9rem,3.6vw,2.75rem)]">Decisions</h2>
        <ul className="mt-6 divide-y divide-rule border-y border-rule md:hidden">
          {study.decisions.map((decision) => (
            <li key={decision.chose} className="py-5">
              <p className="text-lg font-semibold">{decision.chose}</p>
              <p className="mt-1 text-muted">Instead of: {decision.over}</p>
              <p className="mt-3">{decision.because}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 hidden md:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b-2 border-ink text-[0.9rem]">
                <th scope="col" className="w-[24%] py-3 pr-6 font-semibold">I chose</th>
                <th scope="col" className="w-[24%] py-3 pr-6 font-semibold">Instead of</th>
                <th scope="col" className="py-3 font-semibold">Because</th>
              </tr>
            </thead>
            <tbody>
              {study.decisions.map((decision) => (
                <tr key={decision.chose} className="border-b border-rule align-top">
                  <th scope="row" className="py-4 pr-6 text-lg font-semibold">{decision.chose}</th>
                  <td className="py-4 pr-6 text-muted">{decision.over}</td>
                  <td className="py-4">{decision.because}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>

      <Container className="py-12">
        <h2 className="border-t-2 border-ink pt-5 text-[clamp(1.9rem,3.6vw,2.75rem)]">Outcome</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <dl className="grid grid-cols-3 gap-4">
            {study.metrics.map((metric) => (
              <div key={metric.label} className="border-l-4 border-accent pl-3">
                <dd className="font-display text-[clamp(1.6rem,3vw,2.5rem)] leading-none">{metric.value}</dd>
                <dt className="mt-2 text-[0.9rem] text-muted">{metric.label}</dt>
              </div>
            ))}
          </dl>
          <ul className="space-y-3 text-lg">
            {study.outcome.map((line) => (
              <li key={line} className="border-b border-rule pb-3">{line}</li>
            ))}
          </ul>
        </div>
      </Container>

      {next ? (
        <Container className="pt-6">
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-wrap items-baseline justify-between gap-4 border-y-2 border-ink px-2 py-8 transition-colors hover:bg-accent hover:text-accent-ink"
          >
            <span className="text-muted group-hover:text-accent-ink">Next case study</span>
            <span className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-none">{next.title}</span>
          </Link>
        </Container>
      ) : null}
    </article>
  );
}

function Fact({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.9rem] text-muted">{term}</dt>
      <dd className="mt-1 text-lg">{value}</dd>
    </div>
  );
}

function Prose({ title, paragraphs, list = false }: { title: string; paragraphs: string[]; list?: boolean }) {
  return (
    <section>
      <h2 className="border-t-2 border-ink pt-5 text-[clamp(1.9rem,3.6vw,2.75rem)]">{title}</h2>
      {list ? (
        <ul className="mt-6 space-y-4 text-lg">
          {paragraphs.map((text) => (
            <li key={text} className="border-l-2 border-rule pl-4">{text}</li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 space-y-4 text-lg">
          {paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      )}
    </section>
  );
}
