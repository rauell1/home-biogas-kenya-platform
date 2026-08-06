import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";

const GUIDES: Record<string, { title: string; lede: string; body: string[] }> = {
  "daily-feeding": {
    title: "Daily feeding guide",
    lede: "Consistent loading is the single biggest factor in whether a plant performs.",
    body: [
      "Feed the digester at the same time each day. Consistent loading keeps bacterial activity stable and gas pressure predictable.",
      "Mix fresh manure with water at roughly 1:1 by volume. Remove stones, sand, plastic, soap and disinfectants before feeding.",
      "Record the quantity fed and the pressure reading. A falling pressure with unchanged feeding usually indicates a leak or a blocked condensate trap.",
    ],
  },
  "site-selection": {
    title: "Site selection guide",
    lede: "Where the plant sits determines how hard it will be to run for the next twenty years.",
    body: [
      "Place the plant close to the waste source and close to the point of gas use to reduce carrying distance and pipe losses.",
      "Avoid tree roots, flood paths and high water tables. Check soil bearing conditions before excavation.",
      "Protect groundwater: keep the digester and slurry store a safe distance from wells and boreholes, and design drainage away from the plant.",
    ],
  },
  "pineapple-livestock-co-digestion": {
    title: "Pineapple and livestock-waste co-digestion",
    lede: "A 2023 Kenyan study examined how feedstock ratio, temperature and pH influence biogas production from pineapple and livestock wastes.",
    body: [
      "Researchers from the Pan African University Institute for Basic Sciences, Technology and Innovation and Jomo Kenyatta University of Agriculture and Technology tested pineapple waste co-digested with cow dung and abattoir waste in 6 m³ systems.",
      "The study evaluated mixing ratios alongside temperature and pH. Its reported numerical optimum was a 62.5% pineapple-waste ratio at pH 6.0 and 30 °C, with a maximum biogas yield of 1.98 m³ under the experimental conditions.",
      "The result is research evidence, not a universal sizing rule. Actual plant output depends on feedstock composition, loading rate, retention time, operating discipline and site conditions; a project still requires measurement and engineering assessment.",
      "Source: Otieno, Kiplimo and Mutwiwa, ‘Optimization of anaerobic digestion parameters for biogas production from pineapple wastes co-digested with livestock wastes,’ Heliyon 9 (2023), e14041. DOI: 10.1016/j.heliyon.2023.e14041.",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) return {};
  return pageMetadata({ locale, path: `/knowledge/guides/${slug}`, title: guide.title, description: guide.lede });
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();

  return (
    <article className="shell-narrow py-16 md:py-24">
      <Link href={`/${locale}/knowledge`} className="mono-label text-ink/50 hover:text-clay-text">
        ← Knowledge centre
      </Link>
      <p className="chapter-marker text-clay-text mt-8">Guide</p>
      <h1 className="display-xl mt-5">{guide.title}</h1>
      <p className="lede mt-6 text-ink/75">{guide.lede}</p>
      <ol className="mt-10 border-t border-ink/12">
        {guide.body.map((p, i) => (
          <li key={p} className="flex gap-6 border-b border-ink/10 py-6">
            <span className="mono-label text-clay-text pt-1">{String(i + 1).padStart(2, "0")}</span>
            <p className="editorial text-ink/85">{p}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}
