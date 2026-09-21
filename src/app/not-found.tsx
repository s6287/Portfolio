import { Container } from "@/components/site/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <Container className="py-24">
      <h1 className="text-[clamp(2.5rem,6vw,4.5rem)]">That page does not exist.</h1>
      <p className="measure mt-5 text-xl text-muted">The link may be old, or the address has a typo. The work is all listed on the home page.</p>
      <div className="mt-8">
        <ButtonLink href="/">Go to the home page</ButtonLink>
      </div>
    </Container>
  );
}
