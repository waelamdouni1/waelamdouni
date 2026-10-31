import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const { siteUrl } = getSiteSettings();
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl}/sitemap.xml` };
}
