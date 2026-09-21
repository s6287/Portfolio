import { Container } from "@/components/site/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/content/site";

export function Skills() {
  return (
    <Container className="py-14">
      <SectionHeading title="What I work with" />
      <dl className="divide-y divide-rule border-y border-rule">
        {skills.map((group) => (
          <div key={group.group} className="grid gap-2 py-5 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-8">
            <dt className="text-lg font-semibold">{group.group}</dt>
            <dd className="text-lg leading-relaxed text-muted">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Container>
  );
}
