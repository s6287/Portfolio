export function SectionHeading({ id, title, lead }: { id?: string; title: string; lead?: string }) {
  return (
    <div className="mb-10 border-t-2 border-ink pt-5">
      <h2 id={id} className="text-[clamp(2rem,4.2vw,3.25rem)]">
        {title}
      </h2>
      {lead ? <p className="measure mt-4 text-lg text-muted">{lead}</p> : null}
    </div>
  );
}
