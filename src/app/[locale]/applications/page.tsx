import type { Metadata } from "next";
import Link from "next/link";
import { APPLICATIONS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import ApplicationScene from "@/components/ApplicationScene";
import PageHeader from "@/components/PageHeader";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/applications",
    title: "What the gas powers",
    description: "Biogas is only useful where it does work. Every application below changes what the plant must deliver in volume, pressure and gas quality.",
  });
}

export default async function ApplicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <PageHeader
        eyebrow="Applications"
        title="What the gas powers"
        lede="Biogas is only useful where it does work. Every application below changes what the plant must deliver in volume, pressure and gas quality."
        meta={[
          { label: "Applications", value: String(APPLICATIONS.length) },
          { label: "Treatment", value: "Condensate + H₂S filtration" },
          { label: "Engine uses", value: "Generator · Chaff cutter · Pump" },
          { label: "Thermal uses", value: "Cooking · Baking · Heating · Brooding" },
        ]}
      />

      <div className="shell section">
        <ApplicationScene locale={locale} />

        <ul className="mt-20 border-t border-ink/15">
          {APPLICATIONS.map((a, i) => (
            <li key={a.slug}>
              <Link href={`/${locale}/applications/${a.slug}`} className="row-link md:grid-cols-[auto_1fr_1.4fr_1fr] md:items-baseline md:gap-6 group">
                <span className="mono-label text-clay">{String(i + 1).padStart(2, "0")}</span>
                <span className="display-md group-hover:text-clay transition-colors">{a.name}</span>
                <span className="text-ink/72">{a.use}</span>
                <span className="mono-label text-ink/45">{a.requirement}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
