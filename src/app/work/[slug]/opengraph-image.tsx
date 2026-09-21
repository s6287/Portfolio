import { site } from "@/content/site";
import { getCaseStudy, work } from "@/content/work";
import { ogImage, ogSize } from "@/lib/og";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return work.map((study) => ({ slug: study.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  return ogImage({
    eyebrow: study ? study.kind : "Case study",
    title: study ? study.title : site.name,
    footer: `Case study by ${site.name}`,
  });
}
