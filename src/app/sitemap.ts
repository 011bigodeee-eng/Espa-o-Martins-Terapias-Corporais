import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return siteUrl
    ? [{ url: siteUrl, changeFrequency: "monthly", priority: 1 }]
    : [];
}
