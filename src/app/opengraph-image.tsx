import { site } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${site.name}, ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: `${site.name}, frontend developer`, title: site.headline, footer: "React, Next.js, TypeScript. Mumbai." });
}
