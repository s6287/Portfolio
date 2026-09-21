import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/content/site";

export function Contact() {
  return (
    <Container className="py-14">
      <div id="contact" className="border-t-2 border-ink pt-8">
        <h2 className="max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)]">Hiring a frontend developer? Write to me.</h2>
        <p className="measure mt-5 text-xl text-muted">
          I am based in Mumbai and open to frontend, React and full-stack roles, on site, hybrid or remote. I reply within a day.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href={`mailto:${site.email}`} external>
            Email {site.email}
          </ButtonLink>
          <ButtonLink href={site.links.linkedin} variant="secondary" external>
            LinkedIn
          </ButtonLink>
          <ButtonLink href={site.links.github} variant="secondary" external>
            GitHub
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
