import Link from "next/link";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  download?: boolean;
};

const base = "inline-flex min-h-12 items-center justify-center rounded-md px-6 text-base font-semibold transition-transform active:translate-y-px";
const styles = {
  primary: "bg-accent text-accent-ink shadow-[4px_4px_0_var(--ink)] hover:shadow-[2px_2px_0_var(--ink)] hover:translate-x-[2px] hover:translate-y-[2px]",
  secondary: "border-2 border-ink hover:bg-accent hover:text-accent-ink",
};

export function ButtonLink({ href, children, variant = "primary", external = false, download = false }: Props) {
  const className = `${base} ${styles[variant]}`;
  if (external || download) {
    return (
      <a href={href} className={className} download={download || undefined} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
