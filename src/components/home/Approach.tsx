import { Container } from "@/components/site/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approach } from "@/content/site";

export function Approach() {
  return (
    <Container className="py-14">
      <SectionHeading id="approach" title="How I work" />
      <dl className="grid gap-x-12 gap-y-10 md:grid-cols-3">
        {approach.map((item) => (
          <div key={item.title}>
            <dt className="font-display text-2xl leading-tight">{item.title}</dt>
            <dd className="mt-3 text-muted">{item.body}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
