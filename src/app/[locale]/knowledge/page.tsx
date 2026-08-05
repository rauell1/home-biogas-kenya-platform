import type { Metadata } from "next";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { articles } from "@/db/schema";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/knowledge",
    title: "Biogas knowledge centre",
    description: "Plain explanations of how digestion works, how plants are sized honestly, and how to keep a system running.",
  });
}

const GUIDES = [
  { slug: "daily-feeding", title: "Daily feeding guide", note: "Loading discipline and pressure checks" },
  { slug: "site-selection", title: "Site selection guide", note: "Ground, drainage, trees and groundwater" },
  { slug: "pineapple-livestock-co-digestion", title: "Pineapple and livestock-waste co-digestion", note: "Kenyan research summary · Heliyon, 2023" },
];

export default async function KnowledgePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const published = await db.select().from(articles).where(eq(articles.workflowState, "published"));

  return (
    <>
      <PageHeader
        eyebrow="Knowledge"
        title="Biogas knowledge centre"
        lede="Plain explanations of how digestion works, how plants are sized honestly, and how to keep a system running."
        meta={[
          { label: "Articles", value: String(published.length) },
          { label: "Guides", value: String(GUIDES.length) },
          { label: "Audience", value: "Owners · Operators · Engineers" },
          { label: "Review", value: "Technically reviewed before publication" },
        ]}
      />

      <div className="shell section grid gap-16 lg:grid-cols-[2fr_1fr] lg:items-start">
        <section>
          <h2 className="mono-label text-clay border-b border-ink/12 pb-3">Articles</h2>
          <ul>
            {published.map((a) => (
              <li key={a.slug}>
                <Link href={`/${locale}/knowledge/articles/${a.slug}`} className="row-link group">
                  <span className="display-md group-hover:text-clay transition-colors">{a.title}</span>
                  <span className="text-ink/72">{a.excerpt}</span>
                </Link>
              </li>
            ))}
            {published.length === 0 && <li className="py-6 mono-data text-ink/55">No published articles yet.</li>}
          </ul>
        </section>

        <aside className="panel p-6">
          <h2 className="mono-label text-clay">Practical guides</h2>
          <ul className="mt-4 space-y-4">
            {GUIDES.map((g) => (
              <li key={g.slug}>
                <Link href={`/${locale}/knowledge/guides/${g.slug}`} className="link-quiet display-md hover:text-clay">
                  {g.title}
                </Link>
                <p className="mono-label text-ink/45 mt-1.5">{g.note}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
