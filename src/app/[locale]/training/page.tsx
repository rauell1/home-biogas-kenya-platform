import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";

export const COURSES = [
  { slug: "operator-basics", name: "Biogas operator basics", days: 2, summary: "Feeding routines, safety, leak checks and daily operation." },
  { slug: "masonry-fixed-dome", name: "Fixed-dome construction", days: 5, summary: "Excavation, formwork, plastering and gas-tightness testing." },
  { slug: "appliance-installation", name: "Appliance installation", days: 3, summary: "Pipe sizing, filtration, pressure control and commissioning." },
  { slug: "farm-slurry-management", name: "Farm slurry management", days: 1, summary: "Storage, dilution and safe agricultural application of digestate." },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/training",
    title: "Training and capacity building",
    description: "A plant is only as good as the person feeding it. We train operators, masons and technicians on real systems.",
  });
}

export default async function TrainingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <PageHeader
        eyebrow="Training"
        title="Training and capacity building"
        lede="A plant is only as good as the person feeding it. We train operators, masons and technicians on real systems."
        meta={[
          { label: "Courses", value: String(COURSES.length) },
          { label: "Duration", value: "1-5 days" },
          { label: "Format", value: "Practical, on plant" },
          { label: "Language", value: "English · Kiswahili" },
        ]}
      />
      <div className="shell section">
        <ul className="border-t border-ink/15">
          {COURSES.map((c, i) => (
            <li key={c.slug}>
              <Link href={`/${locale}/training/${c.slug}`} className="row-link md:grid-cols-[auto_1fr_1.6fr_auto] md:items-baseline md:gap-6 group">
                <span className="mono-label text-clay-text">{String(i + 1).padStart(2, "0")}</span>
                <span className="display-md group-hover:text-clay-text transition-colors">{c.name}</span>
                <span className="text-ink/72">{c.summary}</span>
                <span className="mono-label text-ink/45">{c.days} days</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
