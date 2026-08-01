import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/lib/queries";
import { locales } from "@/lib/i18n";
import { ALL_SERVICES } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://homebiogas.co.ke";
  const now = new Date();

  const staticPages = [
    "",
    "/about",
    "/solutions",
    "/applications",
    "/projects",
    "/products",
    "/training",
    "/knowledge",
    "/contact",
    "/request-assessment",
    "/privacy-policy",
    "/cookie-policy",
    "/terms",
    "/tools/solution-configurator",
    "/tools/feedstock-checker",
    "/tools/fuel-savings-estimator",
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static localized routes
  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: now,
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }

    // Solutions routes
    for (const s of ALL_SERVICES) {
      entries.push({
        url: `${baseUrl}/${locale}/solutions/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Published project detail routes
  const projects = await getPublishedProjects().catch(() => []);
  for (const p of projects) {
    for (const locale of locales) {
      entries.push({
        url: `${baseUrl}/${locale}/projects/${p.slug}`,
        lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
