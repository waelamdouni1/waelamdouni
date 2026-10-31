import type { MetadataRoute } from "next";
import { getProjects, getSiteSettings } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const { siteUrl } = getSiteSettings();
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...getProjects().map((p) => ({ url: `${siteUrl}/work/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.8 })),
  ];
}
