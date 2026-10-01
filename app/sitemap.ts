import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

// Naya project data file mein daalte hi sitemap mein khud aa jata hai
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...portfolio.projects.map((p) => ({
      url: `${siteUrl}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}