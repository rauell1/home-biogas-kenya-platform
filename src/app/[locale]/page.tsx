import Link from "next/link";
import { getDict } from "@/lib/i18n";
import { PROCESS_CHAIN, SERVICE_GROUPS } from "@/lib/content";
import DigesterCutaway from "@/components/DigesterCutaway";
import ApplicationScene from "@/components/ApplicationScene";
import ProjectExplorer from "@/components/ProjectExplorer";
import Configurator from "@/components/Configurator";
import { getPublishedProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

function Chapter({
  n,
  title,
  kicker,
  children,
  dark,
  flush,
}: {
  n: string;
  title: string;
  kicker?: string;
  children: React.ReactNode;
  dark?: boolean;
  flush?: boolean;
}) {
  return (
    <section id={`chapter-${n}`} className={`relative ${dark ? "bg-ink text-bone" : ""}`}>
      {dark && <div aria-hidden className="absolute inset-0 grid-lines opacity-30" />}
      <div className={`shell relative ${flush ? "py-16 md:py-24" : "section"}`}>
        <div
          className="flex flex-wrap items-end justify-between gap-6 border-b pb-6 mb-12"
          style={{ borderColor: dark ? "var(--hairline-invert)" : "var(--hairline)" }}
        >
          <div>
            <p className={`chapter-marker ${dark ? "text-methane" : "text-clay"}`}>Chapter {n}</p>
            <h2 className="display-xl mt-4 max-w-3xl">{title}</h2>
          </div>
          {kicker && <p className={`mono-label max-w-xs ${dark ? "text-bone/45" : "text-ink/45"}`}>{kicker}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  const projects = await getPublishedProjects();

  const capacities = projects.map((p) => Number(p.capacityM3 ?? 0)).filter((n) => n > 0);
  const stats = [
    { value: String(projects.length), label: "Published projects" },
    { value: capacities.length ? `${Math.max(...capacities)} m³` : "—", label: "Largest published system" },
    { value: String(new Set(projects.map((p) => p.county).filter(Boolean)).size), label: "Counties served" },
    { value: String(SERVICE_GROUPS.flatMap((g) => g.items).length), label: "Engineering services" },
  ];

  return (
    <>
      {/* ---------- Chapter 01 — Hero ---------- */}
      <section className="relative isolate grain overflow-hidden bg-soil text-bone">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(140% 100% at 12% 0%, #4a3a2c 0%, #241d17 45%, #121412 100%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 grid-lines opacity-50" />
        <div
          aria-hidden
          className="absolute -right-24 top-1/4 h-[36rem] w-[36rem] rounded-full blur-[120px] opacity-25"
          style={{ background: "radial-gradient(circle, #5db7c4 0%, transparent 65%)" }}
        />

        <div className="shell relative pt-20 pb-16 md:pt-28 md:pb-24 min-h-[86vh] flex flex-col justify-end">
          <p className="chapter-marker text-methane">Chapter 01 — {t.chapters[0]}</p>

          <h1 className="display-hero mt-8 max-w-[19ch]">
            {t.heroTitleA}
            <span className="mt-2 block text-methane">{t.heroTitleB}</span>
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <p className="lede max-w-2xl text-bone/78">{t.heroLead}</p>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a href="#chapter-02" className="btn btn-accent">
                {t.ctaPrimary}
              </a>
              <Link href={`/${locale}/request-assessment`} className="btn btn-outline-invert">
                {t.ctaSecondary}
              </Link>
            </div>
          </div>

          <div className="mt-16 hairline-invert pt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="display-figure text-methane">{s.value}</p>
                <p className="mono-label mt-2 text-bone/45">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* continuous process line */}
        <div className="relative border-t border-bone/12 bg-ink/60">
          <div className="shell overflow-x-auto">
            <ol className="flex items-center gap-0 py-4 min-w-max">
              {PROCESS_CHAIN.map((step, i) => (
                <li key={step} className="flex items-center gap-3 pr-3">
                  <span className={`mono-label whitespace-nowrap ${i === 3 ? "text-methane" : "text-bone/40"}`}>
                    {String(i + 1).padStart(2, "0")} {step}
                  </span>
                  {i < PROCESS_CHAIN.length - 1 && <span aria-hidden className="h-px w-8 bg-methane/40" />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ---------- Chapter 02 — Digester ---------- */}
      <Chapter n="02" title={t.chapters[1]} kicker="Hover, tap or use the keyboard to inspect every component" dark>
        <DigesterCutaway />
      </Chapter>

      {/* ---------- Chapter 03 — Applications ---------- */}
      <Chapter n="03" title={t.chapters[2]} kicker="One gas line. Nine productive end uses.">
        <ApplicationScene locale={locale} />
      </Chapter>

      {/* ---------- Chapter 04 — Projects ---------- */}
      <Chapter n="04" title={t.chapters[3]} kicker="Only technically reviewed projects with cleared media rights appear here">
        <ProjectExplorer
          locale={locale}
          items={projects.map((p) => ({
            slug: p.slug,
            title: p.title,
            county: p.county,
            locality: p.locality,
            clientCategory: p.clientCategory,
            plantType: p.plantType,
            capacityM3: p.capacityM3,
            feedstocks: p.feedstocks,
            applications: p.applications,
            projectStatus: p.projectStatus,
            summary: p.summary,
            theme: p.theme,
          }))}
        />
      </Chapter>

      {/* ---------- Services band ---------- */}
      <section className="bg-bone">
        <div className="shell section">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="chapter-marker text-clay">Capability</p>
              <h2 className="display-lg mt-4">From feasibility study to commissioning and maintenance</h2>
              <Link href={`/${locale}/solutions`} className="btn btn-outline mt-8">
                All solutions
              </Link>
            </div>
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {SERVICE_GROUPS.map((group) => (
                <div key={group.category}>
                  <p className="mono-label text-ink/45 border-b border-ink/12 pb-2">{group.category}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-ink/80">
                    {group.items.slice(0, 5).map((item) => (
                      <li key={item.slug}>
                        <Link href={`/${locale}/solutions/${item.slug}`} className="link-quiet hover:text-clay">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Chapter 05 — Configurator ---------- */}
      <Chapter n="05" title={t.chapters[4]} kicker="No estimate is produced without your measured quantity">
        <Configurator locale={locale} disclaimer={t.disclaimer} />
      </Chapter>

      {/* ---------- Chapter 06 — Start ---------- */}
      <Chapter n="06" title={t.chapters[5]} dark flush>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <p className="lede text-bone/80 max-w-2xl">
            Bring us your waste stream, your energy demand and your site. We survey, design and build the system that
            connects them — then train the people who run it.
          </p>
          <div className="lg:text-right">
            <Link href={`/${locale}/request-assessment`} className="btn btn-accent">
              {t.nav.request}
            </Link>
            <p className="mono-label mt-5 text-bone/45">Response within two working days</p>
          </div>
        </div>
      </Chapter>
    </>
  );
}
