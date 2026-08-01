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
    { value: capacities.length ? `${Math.max(...capacities)} m³` : "0 m³", label: "Largest published system" },
    { value: String(new Set(projects.map((p) => p.county).filter(Boolean)).size), label: "Counties served" },
    { value: String(SERVICE_GROUPS.flatMap((g) => g.items).length), label: "Engineering services" },
  ];

  return (
    <>
      {/* ---------- Chapter 01 — Hero ---------- */}
      <section className="relative isolate grain overflow-hidden bg-soil text-bone border-b border-bone/10">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(140% 100% at 12% 0%, #4a3a2c 0%, #241d17 45%, #121412 100%)",
          }}
        />
        <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />
        <div
          aria-hidden
          className="absolute -right-24 top-1/4 h-[36rem] w-[36rem] rounded-full blur-[140px] opacity-20"
          style={{ background: "radial-gradient(circle, #5db7c4 0%, transparent 65%)" }}
        />

        <div className="shell relative pt-16 pb-16 md:pt-24 md:pb-20 min-h-[88vh] flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="chapter-marker text-methane">Chapter 01 — {t.chapters[0]}</span>
              <span className="tech-badge">{t.heroKicker}</span>
            </div>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <h1 className="display-hero max-w-[19ch]">
                  {t.heroTitleA}
                  <span className="mt-3 block text-methane">{t.heroTitleB}</span>
                </h1>
                <p className="lede mt-8 max-w-xl text-bone/80">{t.heroLead}</p>

                <div className="mt-10 flex flex-wrap gap-4 items-center">
                  <a href="#chapter-02" className="btn btn-accent shadow-lg shadow-methane/10">
                    {t.ctaPrimary} ↓
                  </a>
                  <Link href={`/${locale}/request-assessment`} className="btn btn-outline-invert">
                    {t.ctaSecondary} →
                  </Link>
                </div>
              </div>

              {/* Technical Blueprint SVG Motif */}
              <div className="relative border border-bone/15 bg-ink/70 p-6 md:p-8 rounded-sm shadow-2xl backdrop-blur-sm hidden sm:block">
                <div aria-hidden className="absolute -top-3 left-4 bg-soil border border-bone/20 px-2 py-0.5 mono-label text-methane text-[0.65rem]">
                  SCHEMATIC · HBK-DS-2026
                </div>

                <svg viewBox="0 0 420 280" className="w-full h-auto text-bone" role="img" aria-label="Waste to energy process flow schematic diagram">
                  <defs>
                    <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#eae5d8" strokeWidth="0.5" strokeOpacity="0.08" />
                    </pattern>
                  </defs>

                  <rect width="420" height="280" fill="url(#heroGrid)" />

                  {/* Organic Feed Inlet */}
                  <g>
                    <rect x="25" y="110" width="60" height="60" fill="#372b22" stroke="#a85532" strokeWidth="1.5" />
                    <text x="55" y="145" textAnchor="middle" fill="#eae5d8" fontSize="9" fontFamily="monospace">FEED</text>
                    <path d="M85 140 H135" stroke="#a85532" strokeWidth="3" fill="none" strokeDasharray="4 3" />
                  </g>

                  {/* Digester Vessel */}
                  <g>
                    <circle cx="205" cy="140" r="55" fill="#121412" stroke="#5db7c4" strokeWidth="2" />
                    <path d="M152 140 A53 53 0 0 0 258 140 Z" fill="#6e7445" opacity="0.6" />
                    <path d="M152 140 A53 53 0 0 1 258 140 Z" fill="#5db7c4" opacity="0.25" className="animate-flow-pulse" />
                    <circle cx="205" cy="115" r="3" fill="#5db7c4" />
                    <circle cx="190" cy="125" r="2" fill="#5db7c4" />
                    <circle cx="220" cy="122" r="2.5" fill="#5db7c4" />
                    <text x="205" y="175" textAnchor="middle" fill="#eae5d8" fontSize="9" fontFamily="monospace">DIGESTER</text>
                  </g>

                  {/* H2S Filter & Manometer */}
                  <g>
                    <path d="M205 85 V45 H300 V110" stroke="#5db7c4" strokeWidth="3" fill="none" strokeDasharray="8 4">
                      <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.8s" repeatCount="indefinite" />
                    </path>
                    <rect x="285" y="65" width="30" height="35" fill="#121412" stroke="#e5b83b" strokeWidth="1.5" />
                    <text x="300" y="86" textAnchor="middle" fill="#e5b83b" fontSize="8" fontFamily="monospace">H2S</text>
                  </g>

                  {/* Gas Output Manifold */}
                  <g>
                    <path d="M300 110 V140 H380" stroke="#5db7c4" strokeWidth="3" fill="none" />
                    <circle cx="380" cy="140" r="6" fill="#e5b83b" />
                    <text x="380" y="162" textAnchor="middle" fill="#5db7c4" fontSize="9" fontFamily="monospace">ENERGY</text>
                  </g>

                  {/* Technical Legend Annotations */}
                  <line x1="30" y1="230" x2="390" y2="230" stroke="#eae5d8" strokeWidth="0.5" strokeOpacity="0.2" />
                  <text x="30" y="250" fill="#5db7c4" fontSize="8" fontFamily="monospace">INPUT: Manure / Kitchen waste</text>
                  <text x="220" y="250" fill="#e5b83b" fontSize="8" fontFamily="monospace">OUTPUT: Biogas + Bio-slurry</text>
                </svg>

                <div className="mt-4 flex items-center justify-between border-t border-bone/10 pt-3 text-[0.7rem] mono-label text-bone/50">
                  <span>SYSTEM: CLOSED-LOOP ANAEROBIC</span>
                  <span className="text-methane">EFFICIENT DIGESTION</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 pt-8 border-t border-bone/15 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <p className="display-figure text-methane">{s.value}</p>
                <p className="mono-label mt-2 text-bone/60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Continuous Process Chain */}
        <div className="relative border-t border-bone/15 bg-ink/80 backdrop-blur-sm">
          <div className="shell overflow-x-auto">
            <ol className="flex items-center gap-0 py-4 min-w-max">
              {PROCESS_CHAIN.map((step, i) => (
                <li key={step} className="flex items-center gap-3 pr-4">
                  <span className={`mono-label whitespace-nowrap ${i === 3 ? "text-methane font-semibold" : "text-bone/50"}`}>
                    {String(i + 1).padStart(2, "0")} {step}
                  </span>
                  {i < PROCESS_CHAIN.length - 1 && (
                    <span aria-hidden className="h-px w-6 bg-gradient-to-r from-methane/60 to-methane/20" />
                  )}
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
        {projects.length === 0 && (
          <div className="mb-8 border border-clay/30 bg-clay/10 p-5 rounded-sm">
            <p className="mono-label text-clay font-semibold">Verification Standard</p>
            <p className="mt-2 text-sm text-ink/80">{t.zeroProjectsNotice}</p>
          </div>
        )}
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

      {/* ---------- Services Capability Band ---------- */}
      <section className="bg-bone border-y border-ink/10">
        <div className="shell section">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="chapter-marker text-clay">Capability Matrix</p>
              <h2 className="display-lg mt-4">{t.capabilityTitle}</h2>
              <p className="editorial mt-4 text-ink/75 max-w-md">{t.capabilityLead}</p>
              <Link href={`/${locale}/solutions`} className="btn btn-primary mt-8">
                All engineering solutions →
              </Link>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {SERVICE_GROUPS.map((group, gIdx) => (
                <div key={group.category} className="tech-card p-6">
                  <div className="flex items-center justify-between border-b border-ink/12 pb-3 mb-4">
                    <p className="mono-label text-clay font-semibold">{group.category}</p>
                    <span className="mono-label text-ink/40">0{gIdx + 1}</span>
                  </div>
                  <ul className="space-y-2.5 text-sm text-ink/85">
                    {group.items.slice(0, 4).map((item) => (
                      <li key={item.slug}>
                        <Link href={`/${locale}/solutions/${item.slug}`} className="link-quiet font-medium hover:text-clay">
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
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end bg-ink/60 border border-bone/15 p-8 md:p-14">
          <div>
            <p className="mono-label text-methane mb-3">Site Survey & Project Kickoff</p>
            <p className="lede text-bone/85 max-w-2xl">
              Bring us your waste stream, your energy demand and your site. We survey, design and build the system that
              connects them — then train the people who run it.
            </p>
          </div>
          <div className="lg:text-right">
            <Link href={`/${locale}/request-assessment`} className="btn btn-accent text-base px-8 py-4 shadow-lg shadow-methane/10">
              {t.nav.request} →
            </Link>
            <p className="mono-label mt-4 text-bone/50">Response guaranteed within two working days</p>
          </div>
        </div>
      </Chapter>
    </>
  );
}
