import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const PRODUCTS = [
  { slug: "food-waste-biodigester", name: "Food-waste biodigester", spec: "Compact system for measured daily kitchen-waste input" },
  { slug: "flexible-pvc-biodigester", name: "Flexible PVC biodigester", spec: "Rapid-installation tubular system in multiple capacities" },
  { slug: "fixed-dome-biodigester", name: "Fixed-dome concrete biodigester", spec: "Site-built system sized after survey and feedstock measurement" },
  { slug: "two-burner-biogas-cooker", name: "Two-burner biogas cooker", spec: "Low-pressure burners, cast iron grate, 8–12 mbar" },
  { slug: "four-burner-cooker-and-oven", name: "Four-burner cooker and oven", spec: "Institutional range with biogas oven cavity" },
  { slug: "biogas-water-heater", name: "Biogas water heater", spec: "Instant heating for kitchens and dairies" },
  { slug: "poultry-brooder", name: "Poultry brooder", spec: "Radiant brooder with flame-failure protection" },
  { slug: "biogas-lamp", name: "Biogas lamp", spec: "Mantle lamp for off-grid lighting" },
  { slug: "h2s-gas-filter", name: "H₂S gas filter", spec: "Refillable media housing for engine protection" },
  { slug: "condensate-trap", name: "Condensate trap", spec: "Pipeline low-point water drain" },
  { slug: "pressure-gauge-manometer", name: "Pressure gauge / manometer", spec: "U-tube pressure indication for operators" },
  { slug: "biogas-generator", name: "Biogas generator", spec: "Converted stationary engine and alternator set" },
];

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Appliances and gas equipment"
        lede="Supplied, installed and commissioned with correctly sized piping, isolation valves, condensate management and user training."
        meta={[
          { label: "Catalogue", value: `${PRODUCTS.length} items` },
          { label: "System selection", value: "Confirmed after assessment" },
          { label: "Engine uses", value: "Require filtration" },
          { label: "Availability", value: "Confirmed on quotation" },
        ]}
      />
      <div className="shell section">
        <ul className="border-t border-ink/15">
          {PRODUCTS.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/${locale}/products/${p.slug}`} className="row-link md:grid-cols-[auto_1fr_1.4fr] md:items-baseline md:gap-6 group">
                <span className="mono-label text-clay">{String(i + 1).padStart(2, "0")}</span>
                <span className="display-md group-hover:text-clay transition-colors">{p.name}</span>
                <span className="mono-label text-ink/50">{p.spec}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
