import { site } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="no-print mt-24 border-t border-rule">
      <Container className="flex flex-col gap-4 py-10 text-[0.95rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name}, {site.location}. Built with Next.js and TypeScript.
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a className="link" href={`mailto:${site.email}`}>
              Email
            </a>
          </li>
          <li>
            <a className="link" href={site.links.linkedin} rel="me noopener" target="_blank">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="link" href={site.links.github} rel="me noopener" target="_blank">
              GitHub
            </a>
          </li>
          <li>
            <a className="link" href="https://github.com/s6287/Portfolio" rel="noopener" target="_blank">
              Source of this site
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
