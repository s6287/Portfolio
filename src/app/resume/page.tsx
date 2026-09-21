import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { resume } from "@/content/resume";
import { site, skills } from "@/content/site";
import { work } from "@/content/work";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${site.name}, frontend developer in Mumbai: React, Next.js, TypeScript, Supabase and PostgreSQL.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <Container className="max-w-[58rem] py-12 lg:py-16">
      <header className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-ink pb-6">
        <div>
          <h1 className="text-[clamp(2.5rem,6vw,4rem)]">{site.name}</h1>
          <p className="mt-2 text-xl">Front End Developer. React.js, Next.js, TypeScript.</p>
          <p className="mt-2 text-muted">
            {site.location}.{" "}
            <a className="link" href={`mailto:${site.email}`}>{site.email}</a>.{" "}
            <a className="link" href={site.links.linkedin}>LinkedIn</a>.{" "}
            <a className="link" href={site.links.github}>GitHub</a>.
          </p>
        </div>
        <div className="no-print">
          <ButtonLink href={resume.pdf} download>
            Download the PDF
          </ButtonLink>
        </div>
      </header>

      <Block title="Summary">
        <p className="text-lg">{resume.summary}</p>
      </Block>

      <Block title="Experience">
        {resume.experience.map((job) => (
          <div key={job.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6">
              <h3 className="font-sans text-xl font-semibold tracking-normal">
                {job.title}, {job.company}
              </h3>
              <p className="text-muted">{job.period}. {job.place}</p>
            </div>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </Block>

      <Block title="Selected work">
        <ul className="space-y-3">
          {work.map((study) => (
            <li key={study.slug}>
              <Link className="link font-semibold" href={`/work/${study.slug}`}>{study.title}</Link>
              <span>. {study.kind}. </span>
              <span className="text-muted">{study.stack.slice(0, 5).join(", ")}.</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Skills">
        <dl className="space-y-3">
          {skills.map((group) => (
            <div key={group.group} className="grid gap-1 sm:grid-cols-[11rem_minmax(0,1fr)]">
              <dt className="font-semibold">{group.group}</dt>
              <dd className="text-muted">{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="Education and certificates">
        <ul className="space-y-2">
          {resume.education.map((item) => (
            <li key={item.title} className="flex flex-wrap justify-between gap-x-6">
              <span>
                <span className="font-semibold">{item.title}</span>, {item.place}
                {"note" in item ? `. ${item.note}` : ""}
              </span>
              <span className="text-muted">{item.period}</span>
            </li>
          ))}
          {resume.certifications.map((item) => (
            <li key={item.title} className="flex flex-wrap justify-between gap-x-6">
              <span>
                {"url" in item ? (
                  <a className="link font-semibold" href={item.url}>{item.title}</a>
                ) : (
                  <span className="font-semibold">{item.title}</span>
                )}
                , {item.issuer}
              </span>
              {"date" in item ? <span className="text-muted">{item.date}</span> : null}
            </li>
          ))}
        </ul>
      </Block>
    </Container>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 break-inside-avoid">
      <h2 className="mb-4 text-[clamp(1.6rem,3vw,2.1rem)]">{title}</h2>
      {children}
    </section>
  );
}
