import type { Metadata } from "next";
import Link from "next/link";
import { getDict } from "@/lib/i18n";
import { PROCESS_CHAIN, SERVICE_GROUPS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import DigesterCutaway from "@/components/DigesterCutaway";
import ApplicationScene from "@/components/ApplicationScene";
import ProjectExplorer from "@/components/ProjectExplorer";
import Configurator from "@/components/Configurator";
import ShopPreview from "@/components/ShopPreview";
import { getPublishedProjects } from "@/lib/queries";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = getDict(locale);
  return pageMetadata({ locale, path: "", description: t.heroLead });
}

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
  const stats =
    projects.length > 0
      ? [
          { value: String(projects.length), label: "Published projects" },
          { value: capacities.length ? `${Math.max(...capacities)} m³` : " - ", label: "Largest published system" },
          { value: String(new Set(projects.map((p) => p.county).filter(Boolean)).size), label: "Counties served" },
          { value: String(SERVICE_GROUPS.flatMap((g) => g.items).length), label: "Engineering services" },
        ]
      : [
          { value: String(SERVICE_GROUPS.flatMap((g) => g.items).length), label: "Engineering services" },
          { value: String(SERVICE_GROUPS.length), label: "Service categories" },
          { value: "4", label: "Digester technologies" },
          { value: "2", label: "Working days to first response" },
        ];

  return (
    <>
      {/* ---------- Chapter 01  -  Hero ---------- */}
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
          className="absolute -right-24 top-1/4 h-[36rem] w-[36rem] rounded-full blur-[140px] opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #5db7c4 0%, transparent 65%)" }}
        />

        <div className="shell relative pt-16 pb-16 md:pt-24 md:pb-20 min-h-[88vh] flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="chapter-marker text-methane">Chapter 01 - {t.chapters[0]}</span>
              <span className="tech-badge">{t.heroKicker}</span>
              <span className="mono-label text-bone/40 hidden sm:inline-block">· ISO-Compliant Engineering</span>
            </div>

            <div className="mt-8 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-center">
              <div>
                <h1 className="display-hero max-w-[19ch]">
                  {t.heroTitleA}
                  <span className="mt-3 block text-methane font-normal">{t.heroTitleB}</span>
                </h1>
                <p className="lede mt-8 max-w-xl text-bone/85">{t.heroLead}</p>

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
              <div className="relative border border-bone/20 bg-ink/80 p-6 md:p-8 rounded-sm shadow-2xl backdrop-blur-md hidden sm:block">
                <div aria-hidden className="absolute -top-3 left-4 bg-soil border border-bone/20 px-2.5 py-0.5 mono-label text-methane text-[0.65rem] tracking-widest">
                  SCHEMATIC · HBK-DS-2026
                </div>

                <svg viewBox="0 0 440 290" className="w-full h-auto text-bone" role="img" aria-label="Waste to energy and bio-slurry process flow schematic diagram">
                  <defs>
                    <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#eae5d8" strokeWidth="0.5" strokeOpacity="0.08" />
                    </pattern>
                  </defs>

                  <rect width="440" height="290" fill="url(#heroGrid)" />

                  {/* Organic Feed Inlet */}
                  <g>
                    <rect x="20" y="110" width="55" height="55" fill="#372b22" stroke="#a85532" strokeWidth="1.5" />
                    <text x="47.5" y="142" textAnchor="middle" fill="#eae5d8" fontSize="9" fontFamily="monospace">FEED</text>
                    <path d="M75 137.5 H125" stroke="#a85532" strokeWidth="3" fill="none" strokeDasharray="4 3" />
                  </g>

                  {/* Digester Vessel */}
                  <g>
                    <circle cx="190" cy="137.5" r="55" fill="#121412" stroke="#5db7c4" strokeWidth="2" />
                    <path d="M137 137.5 A53 53 0 0 0 243 137.5 Z" fill="#6e7445" opacity="0.6" />
                    <path d="M137 137.5 A53 53 0 0 1 243 137.5 Z" fill="#5db7c4" opacity="0.25" className="animate-flow-pulse" />
                    <circle cx="190" cy="110" r="3" fill="#5db7c4" />
                    <circle cx="175" cy="120" r="2" fill="#5db7c4" />
                    <circle cx="205" cy="118" r="2.5" fill="#5db7c4" />
                    <text x="190" y="165" textAnchor="middle" fill="#eae5d8" fontSize="9" fontFamily="monospace">DIGESTER</text>
                  </g>

                  {/* Output 1: Biogas Pipeline (Top -> Right) */}
                  <g>
                    <path d="M190 82.5 V42.5 H280 V85" stroke="#5db7c4" strokeWidth="3" fill="none" strokeDasharray="8 4">
                      <animate attributeName="stroke-dashoffset" from="24" to="0" dur="1.8s" repeatCount="indefinite" />
                    </path>
                    <rect x="265" y="60" width="30" height="30" fill="#121412" stroke="#e5b83b" strokeWidth="1.5" />
                    <text x="280" y="78" textAnchor="middle" fill="#e5b83b" fontSize="8" fontFamily="monospace">H2S</text>
                    
                    <path d="M280 85 V110 H400" stroke="#5db7c4" strokeWidth="3" fill="none" />
                    <circle cx="400" cy="110" r="5" fill="#e5b83b" />
                    <text x="395" y="98" textAnchor="end" fill="#5db7c4" fontSize="8" fontFamily="monospace" fontWeight="bold">GAS ENERGY</text>
                  </g>

                  {/* Output 2: Bio-Slurry Pipeline & Expansion Chamber (Bottom -> Right) */}
                  <g>
                    <path d="M243 150 H300 V190 H390" stroke="#6e7445" strokeWidth="3" fill="none" strokeDasharray="6 3">
                      <animate attributeName="stroke-dashoffset" from="18" to="0" dur="2.4s" repeatCount="indefinite" />
                    </path>
                    <rect x="285" y="170" width="30" height="35" fill="#121412" stroke="#6e7445" strokeWidth="1.5" />
                    <text x="300" y="191" textAnchor="middle" fill="#6e7445" fontSize="7" fontFamily="monospace">OVERFLOW</text>
                    <circle cx="390" cy="190" r="5" fill="#6e7445" />
                    <text x="395" y="210" textAnchor="end" fill="#6e7445" fontSize="8" fontFamily="monospace" fontWeight="bold">BIO-SLURRY</text>
                  </g>

                  {/* Technical Legend Annotations */}
                  <line x1="20" y1="240" x2="420" y2="240" stroke="#eae5d8" strokeWidth="0.5" strokeOpacity="0.2" />
                  <text x="20" y="260" fill="#a85532" fontSize="8" fontFamily="monospace">FEED: Organic waste</text>
                  <text x="160" y="260" fill="#5db7c4" fontSize="8" fontFamily="monospace">GAS: Cooking / Power</text>
                  <text x="300" y="260" fill="#6e7445" fontSize="8" fontFamily="monospace">SLURRY: Crop fertilizer</text>
                </svg>

                <div className="mt-4 flex items-center justify-between border-t border-bone/10 pt-3 text-[0.7rem] mono-label text-bone/50">
                  <span>SYSTEM: DUAL OUTPUT RECOVERY</span>
                  <span className="text-methane">ENERGY + FERTILIZER</span>
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

      {/* ---------- Chapter 02  -  Digester ---------- */}
      <Chapter n="02" title={t.chapters[1]} kicker="Hover, tap or use the keyboard to inspect every component" dark>
        <DigesterCutaway />
      </Chapter>

      {/* ---------- Chapter 03  -  Applications ---------- */}
      <Chapter n="03" title={t.chapters[2]} kicker="One gas line. Nine productive end uses.">
        <ApplicationScene locale={locale} />
      </Chapter>

      <ShopPreview locale={locale} />

      {/* ---------- Chapter 04  -  Projects ---------- */}
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
            heroImage: p.heroImage,
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

      {/* ---------- Chapter 05  -  Configurator ---------- */}
      <Chapter n="05" title={t.chapters[4]} kicker="No estimate is produced without your measured quantity">
        <Configurator locale={locale} disclaimer={t.disclaimer} />
      </Chapter>

      {/* ---------- Chapter 06  -  Start ---------- */}
      <Chapter n="06" title={t.chapters[5]} dark flush>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end bg-ink/60 border border-bone/15 p-8 md:p-14">
          <div>
            <p className="mono-label text-methane mb-3">Site Survey & Project Kickoff</p>
            <p className="lede text-bone/85 max-w-2xl">
              Bring us your waste stream, your energy demand and your site. We survey, design and build the system that
              connects them - then train the people who run it.
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

