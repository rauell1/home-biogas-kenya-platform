import Link from "next/link";
import { notFound } from "next/navigation";

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
};

export function generateStaticParams() {
  return Object.keys(GUIDES).map((slug) => ({ slug }));
}

export default async function GuidePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const guide = GUIDES[slug];
  if (!guide) notFound();

  return (
    <article className="shell-narrow py-16 md:py-24">
      <Link href={`/${locale}/knowledge`} className="mono-label text-ink/50 hover:text-clay">
        ← Knowledge centre
      </Link>
      <p className="chapter-marker text-clay mt-8">Guide</p>
      <h1 className="display-xl mt-5">{guide.title}</h1>
      <p className="lede mt-6 text-ink/75">{guide.lede}</p>
      <ol className="mt-10 border-t border-ink/12">
        {guide.body.map((p, i) => (
          <li key={p} className="flex gap-6 border-b border-ink/10 py-6">
            <span className="mono-label text-clay pt-1">{String(i + 1).padStart(2, "0")}</span>
            <p className="editorial text-ink/85">{p}</p>
          </li>
        ))}
      </ol>
    </article>
  );
}
