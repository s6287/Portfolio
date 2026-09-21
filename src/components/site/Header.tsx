import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="no-print border-b border-rule">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-display text-xl leading-none">
          {site.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="link text-[0.95rem]">
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <MobileNav items={site.nav} />
        </div>
      </Container>
    </header>
  );
}
