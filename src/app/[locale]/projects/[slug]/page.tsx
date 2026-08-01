import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedProject, getPublishedProjects, type ProjectRow } from "@/lib/queries";

export const dynamic = "force-dynamic";

const SECTIONS: { key: keyof ProjectRow; label: string }[] = [
  { key: "challenge", label: "Client challenge" },
  { key: "siteConditions", label: "Site conditions" },
  { key: "feedstockAssessment", label: "Feedstock assessment" },
  { key: "energyDemand", label: "Energy demand" },
  { key: "engineeringResponse", label: "Engineering response" },
  { key: "constructionSequence", label: "Construction sequence" },
  { key: "gasHandling", label: "Gas handling" },
  { key: "applianceConnections", label: "Appliance connections" },
  { key: "slurryManagement", label: "Slurry or effluent management" },
  { key: "commissioning", label: "Commissioning" },
];

const pretty = (v: string) => v.replaceAll("_", " ");

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();
  const others = (await getPublishedProjects()).filter((p) => p.slug !== slug).slice(0, 3);

  // Project-specific art direction
  const accent =
    project.plantType === "study"
      ? "#a8432f"
      : project.clientCategory === "institutional"
        ? "#e5b83b"
        : project.clientCategory === "commercial"
          ? "#a85532"
          : "#5db7c4";

  const sections = SECTIONS.filter((s) => typeof project[s.key] === "string" && project[s.key]);

  return (
    <article>
      <header className="relative isolate grain overflow-hidden bg-ink text-bone">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 90% at 85% 0%, ${accent}26 0%, transparent 55%), #121412` }}
        />
        <div aria-hidden className="absolute inset-0 grid-lines opacity-40" />
        <div className="shell relative pt-20 pb-16 md:pt-28 md:pb-20">
          <Link href={`/${locale}/projects`} className="mono-label text-bone/50 hover:text-methane">
            ← All projects
          </Link>
          <p className="chapter-marker mt-8" style={{ color: accent }}>
            {project.theme ?? "Project"}
          </p>
          <h1 className="display-hero mt-5 max-w-[16ch]">{project.title}</h1>
          <p className="lede mt-7 max-w-3xl text-bone/78">{project.summary}</p>

          <dl className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 hairline-invert pt-8">
            <div>
              <dt className="mono-label text-bone/45">Capacity</dt>
              <dd className="display-figure mt-2" style={{ color: accent }}>
                {project.capacityM3 ? `${Number(project.capacityM3)} m³` : "Study"}
              </dd>
            </div>
            <div>
              <dt className="mono-label text-bone/45">Technology</dt>
              <dd className="mono-data mt-2">{pretty(project.plantType ?? "—")}</dd>
            </div>
            <div>
              <dt className="mono-label text-bone/45">Location</dt>
              <dd className="mono-data mt-2">{[project.locality, project.county].filter(Boolean).join(", ")}</dd>
            </div>
            <div>
              <dt className="mono-label text-bone/45">Completed</dt>
              <dd className="mono-data mt-2">{project.completionDate ?? "—"}</dd>
            </div>
            <div>
              <dt className="mono-label text-bone/45">Sector</dt>
              <dd className="mono-data mt-2">{pretty(project.clientCategory ?? "—")}</dd>
            </div>
            <div>
              <dt className="mono-label text-bone/45">Feedstock</dt>
              <dd className="mono-data mt-2">{project.feedstocks.join(", ")}</dd>
            </div>
            <div>
              <dt className="mono-label text-bone/45">Applications</dt>
              <dd className="mono-data mt-2">{project.applications.join(", ")}</dd>
            </div>
            <div>
              <dt className="mono-label text-bone/45">Technical review</dt>
              <dd className="mono-data mt-2">{pretty(project.technicalReviewStatus)}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="shell section grid gap-16 lg:grid-cols-[minmax(180px,240px)_1fr] lg:items-start">
        <nav aria-label="Case study sections" className="hidden lg:block lg:sticky lg:top-28">
          <p className="mono-label text-ink/45 border-b border-ink/12 pb-2">Contents</p>
          <ol className="mt-3 space-y-1.5">
            {sections.map((s, i) => (
              <li key={String(s.key)}>
                <a href={`#s-${String(s.key)}`} className="mono-label text-ink/55 hover:text-clay">
                  {String(i + 1).padStart(2, "0")} {s.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-3xl">
          {sections.map((s, i) => (
            <section key={String(s.key)} id={`s-${String(s.key)}`} className={i > 0 ? "mt-12" : ""}>
              <div className="flex items-baseline gap-4 border-b border-ink/12 pb-2">
                <span className="mono-label" style={{ color: accent }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="mono-label text-ink/50">{s.label}</h2>
              </div>
              <p className="editorial mt-4 text-ink/85">{project[s.key] as string}</p>
            </section>
          ))}

          {project.outcomes.length > 0 && (
            <section className="mt-16">
              <h2 className="display-lg">Documented outcomes</h2>
              <ul className="mt-6 space-y-5">
                {project.outcomes.map((o) => (
                  <li key={o.claim} className="border-l-4 border-olive pl-5">
                    <p className="editorial text-xl">{o.claim}</p>
                    <p className="mono-label text-ink/45 mt-1.5">Evidence: {o.evidence}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="note mt-12">
            Outcomes are labelled by evidence type: measured, company estimate, client-reported or unverified historical
            claim. Unverified claims are never published as fact.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link href={`/${locale}/request-assessment`} className="btn btn-primary">
              Request a similar system
            </Link>
            <Link href={`/${locale}/projects`} className="btn btn-outline">
              All projects
            </Link>
          </div>
        </div>
      </div>

      {others.length > 0 && (
        <section className="bg-bone">
          <div className="shell py-16">
            <h2 className="mono-label text-clay border-b border-ink/12 pb-3">Related projects</h2>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/${locale}/projects/${o.slug}`} className="row-link md:grid-cols-[1fr_auto] md:items-baseline group">
                    <span className="display-md group-hover:text-clay transition-colors">{o.title}</span>
                    <span className="mono-label text-ink/45">
                      {o.county}
                      {o.capacityM3 ? ` · ${Number(o.capacityM3)} m³` : ""}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
