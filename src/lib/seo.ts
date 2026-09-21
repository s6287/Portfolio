import { site } from "@/content/site";
import type { CaseStudy } from "@/content/types";

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
    sameAs: [site.links.linkedin, site.links.github],
    knowsAbout: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
  };
}

export function caseStudyJsonLd(study: CaseStudy) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${study.title}: ${study.kind}`,
    description: study.summary,
    url: absoluteUrl(`/work/${study.slug}`),
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: study.stack.join(", "),
  };
}
