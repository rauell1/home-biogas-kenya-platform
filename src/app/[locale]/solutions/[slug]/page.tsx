import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_SERVICES } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";

export function generateStaticParams() {
  return ALL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = ALL_SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({ locale, path: `/solutions/${slug}`, title: service.name, description: service.summary });
}

export default async function SolutionDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const service = ALL_SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();
  const related = ALL_SERVICES.filter((s) => s.category === service.category && s.slug !== slug).slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow={service.category}
        title={service.name}
        lede={service.summary}
        meta={[
          { label: "Delivery", value: "Survey → design → build → commission → train" },
          { label: "Sectors", value: "Domestic · Farm · Institutional · Commercial" },
          { label: "Sizing", value: "Confirmed only after a site survey" },
          { label: "Handover", value: "Includes operator training" },
        ]}
        actions={[
          { label: "Request an assessment", href: `/${locale}/request-assessment`, accent: true },
          { label: "All solutions", href: `/${locale}/solutions` },
        ]}
      />

      {related.length > 0 && (
        <div className="shell section">
          <h2 className="mono-label text-clay border-b border-ink/12 pb-3">More in {service.category}</h2>
          <ul>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/${locale}/solutions/${r.slug}`} className="row-link md:grid-cols-[1fr_2fr] group">
                  <span className="display-md group-hover:text-clay transition-colors">{r.name}</span>
                  <span className="text-ink/72">{r.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
