import Link from "next/link";
import { SERVICE_GROUPS } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const total = SERVICE_GROUPS.flatMap((g) => g.items).length;

  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="What we design, build and maintain"
        lede="Engineering services across the full chain — from the first feasibility study to long-term maintenance of a running plant."
        meta={[
          { label: "Service groups", value: String(SERVICE_GROUPS.length) },
          { label: "Services", value: String(total) },
          { label: "Sectors", value: "Domestic · Farm · Institutional · Commercial" },
          { label: "Sizing", value: "Confirmed after site survey" },
        ]}
      />

      <div className="shell section">
        {SERVICE_GROUPS.map((group, gi) => (
          <section key={group.category} className={gi > 0 ? "mt-20" : ""}>
            <div className="flex items-baseline gap-4 border-b border-ink/12 pb-3">
              <span className="mono-label text-clay">{String(gi + 1).padStart(2, "0")}</span>
              <h2 className="display-lg">{group.category}</h2>
            </div>
            <ul>
              {group.items.map((item) => (
                <li key={item.slug}>
                  <Link href={`/${locale}/solutions/${item.slug}`} className="row-link md:grid-cols-[1fr_2fr] group">
                    <span className="display-md group-hover:text-clay transition-colors">{item.name}</span>
                    <span className="text-ink/72">{item.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
