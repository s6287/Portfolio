import type { MetadataRoute } from "next";
import { work } from "@/content/work";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/resume", ...work.map((study) => `/work/${study.slug}`)];
  return pages.map((path) => ({ url: absoluteUrl(path), changeFrequency: "monthly", priority: path === "/" ? 1 : 0.8 }));
}
