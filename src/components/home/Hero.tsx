import { BoardDemo } from "@/components/demos/BoardDemo";
import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { site } from "@/content/site";

export function Hero() {
  return (
    <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 lg:py-20">
      <div>
        <p className="text-lg text-muted">
          {site.name}, {site.role.toLowerCase()}
        </p>
        <h1 className="mt-4 text-[clamp(2.75rem,6.4vw,5.25rem)]">{site.headline}</h1>
        <p className="measure mt-6 text-xl leading-relaxed">{site.intro}</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <ButtonLink href="/#work">See the work</ButtonLink>
          <ButtonLink href="/resume" variant="secondary">
            Read the resume
          </ButtonLink>
        </div>
      </div>

      <BoardDemo
        title="This is the kind of thing I build. Try it."
        intro="A small version of the task board from Spectra. Drag a card or use its buttons, then change role."
        layout="compact"
      />
    </Container>
  );
}
