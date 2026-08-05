import type { Metadata } from "next";
import { cache } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { articles } from "@/db/schema";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

const getArticle = cache(async (slug: string) => {
  const rows = await db
    .select()
    .from(articles)
    .where(and(eq(articles.slug, slug), eq(articles.workflowState, "published")))
    .limit(1);
  return rows[0] ?? null;
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    locale,
    path: `/knowledge/articles/${slug}`,
    title: article.title,
    description: article.excerpt ?? article.title,
  });
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <article className="shell-narrow py-16 md:py-24">
      <Link href={`/${locale}/knowledge`} className="mono-label text-ink/50 hover:text-clay">
        ← Knowledge centre
      </Link>
      <p className="chapter-marker text-clay mt-8">Article</p>
      <h1 className="display-xl mt-5">{article.title}</h1>
      <p className="lede mt-6 text-ink/75">{article.excerpt}</p>
      <div className="mt-10 border-t border-ink/12 pt-8 prose-body space-y-6">
        {(article.body ?? "").split("\n\n").map((p, i) => (
          <p key={i} className="editorial">
            {p}
          </p>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-3">
        <Link href={`/${locale}/tools/solution-configurator`} className="btn btn-primary">
          Try the configurator
        </Link>
        <Link href={`/${locale}/request-assessment`} className="btn btn-outline">
          Request an assessment
        </Link>
      </div>
    </article>
  );
}
