"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";

export type ExplorerProject = {
  slug: string;
  title: string;
  county: string | null;
  locality: string | null;
  clientCategory: string | null;
  plantType: string | null;
  capacityM3: string | null;
  feedstocks: string[];
  applications: string[];
  projectStatus: string;
  summary: string | null;
  theme: string | null;
  heroImage?: string | null;
};

const FILTERS = [
  { key: "county", label: "County" },
  { key: "plantType", label: "Technology" },
  { key: "clientCategory", label: "Sector" },
  { key: "projectStatus", label: "Status" },
] as const;

const pretty = (v: string) => v.replaceAll("_", " ");

export default function ProjectExplorer({ locale, items }: { locale: string; items: ExplorerProject[] }) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [activeSlug, setActiveSlug] = useState(items[0]?.slug ?? "");

  const options = useMemo(() => {
    const out: Record<string, string[]> = {};
    for (const f of FILTERS) {
      out[f.key] = Array.from(new Set(items.map((i) => (i[f.key] ?? "") as string).filter(Boolean))).sort();
    }
    return out;
  }, [items]);

  const filtered = useMemo(
    () => items.filter((p) => FILTERS.every((f) => !filters[f.key] || ((p[f.key] ?? "") as string) === filters[f.key])),
    [items, filters],
  );

  const active = filtered.find((p) => p.slug === activeSlug) ?? filtered[0];
  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  if (items.length === 0) {
    return (
      <div className="tech-card p-8 md:p-12 text-center max-w-xl mx-auto">
        <p className="mono-label text-clay-text">Verification & Review Standard</p>
        <h3 className="display-md mt-2">No published project records currently match public clearance</h3>
        <p className="editorial mt-3 text-ink/75">
          All verified engineering installations undergo multi-step technical and media-rights review before public display.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href={`/${locale}/request-assessment`} className="btn btn-primary btn-sm">
            Request a site assessment for your facility →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4 mb-8">
        {FILTERS.map((f) => (
          <label key={f.key} className="block">
            <span className="field-label">{f.label}</span>
            <select
              className="mt-1.5 block min-w-[10rem] border border-ink/22 bg-cream px-3 py-2.5 text-sm hover:border-ink/45 transition-colors"
              value={filters[f.key] ?? ""}
              onChange={(e) => setFilters((p) => ({ ...p, [f.key]: e.target.value }))}
            >
              <option value="">All</option>
              {options[f.key]?.map((o) => (
                <option key={o} value={o}>
                  {pretty(o)}
                </option>
              ))}
            </select>
          </label>
        ))}
        <button
          type="button"
          onClick={() => setFilters({})}
          disabled={activeFilterCount === 0}
          className="mono-label border border-ink/22 px-3 py-2.5 disabled:opacity-40 hover:bg-ink hover:text-bone disabled:hover:bg-transparent disabled:hover:text-ink transition-colors"
        >
          Reset{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
        </button>
        <p className="mono-label text-ink/70 ml-auto self-end pb-3">
          {filtered.length} / {items.length} projects
        </p>
      </div>

      <div className="grid lg:grid-cols-[minmax(220px,300px)_1fr] border border-ink/15">
        <ol className="border-b lg:border-b-0 lg:border-r border-ink/12 divide-y divide-ink/10 max-h-[30rem] lg:max-h-none overflow-y-auto">
          {filtered.map((p, i) => {
            const on = active?.slug === p.slug;
            return (
              <li key={p.slug}>
                <button
                  type="button"
                  onClick={() => setActiveSlug(p.slug)}
                  aria-current={on}
                  className={`w-full text-left px-5 py-5 transition-colors ${on ? "bg-ink text-bone" : "hover:bg-bone/70"}`}
                >
                  <span className="mono-label opacity-55">{String(i + 1).padStart(2, "0")}</span>
                  <span className="display-md mt-1.5 block leading-tight">{p.title}</span>
                  <span className={`mono-label mt-2 block ${on ? "text-methane" : "text-ink/70"}`}>
                    {p.county ?? "Kenya"}
                    {p.capacityM3 ? ` · ${Number(p.capacityM3)} m³` : ""}
                  </span>
                </button>
              </li>
            );
          })}
          {filtered.length === 0 && <li className="px-5 py-8 text-sm text-ink/75">No projects match these filters.</li>}
        </ol>

        {active && (
          <article className="relative bg-bone p-6 md:p-10 lg:p-12">
            <div
              aria-hidden
              className="absolute right-0 top-0 h-32 w-32 opacity-[0.07]"
              style={{ background: "radial-gradient(circle at top right, #121412, transparent 70%)" }}
            />
            {active.heroImage && (
              <div className="relative mb-8 h-56 md:h-72 w-full overflow-hidden border border-ink/15 bg-ink/10 shadow-inner">
                <Image
                  src={active.heroImage}
                  alt={active.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-cover"
                />
              </div>
            )}
            <p className="chapter-marker text-clay-text">{active.theme ?? "Project"}</p>
            <h3 className="display-xl mt-5">{active.title}</h3>
            <p className="lede mt-5 max-w-2xl text-ink/78">{active.summary}</p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 border-t border-ink/12 pt-6">
              <div className="sm:col-span-2 lg:col-span-1">
                <dt className="mono-label text-ink/70">Capacity</dt>
                <dd className="display-figure mt-1 text-clay-text">{active.capacityM3 ? `${Number(active.capacityM3)} m³` : " - "}</dd>
              </div>
              <div>
                <dt className="mono-label text-ink/70">Technology</dt>
                <dd className="mono-data mt-1.5">{pretty(active.plantType ?? " - ")}</dd>
              </div>
              <div>
                <dt className="mono-label text-ink/70">Status</dt>
                <dd className="mono-data mt-1.5">{pretty(active.projectStatus)}</dd>
              </div>
              <div>
                <dt className="mono-label text-ink/70">Location</dt>
                <dd className="mono-data mt-1.5">{[active.locality, active.county].filter(Boolean).join(", ") || " - "}</dd>
              </div>
              <div>
                <dt className="mono-label text-ink/70">Feedstock</dt>
                <dd className="mono-data mt-1.5">{active.feedstocks.join(", ") || " - "}</dd>
              </div>
              <div>
                <dt className="mono-label text-ink/70">Applications</dt>
                <dd className="mono-data mt-1.5">{active.applications.join(", ") || " - "}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/${locale}/projects/${active.slug}`} className="btn btn-primary">
                Open case study
              </Link>
              <Link href={`/${locale}/request-assessment`} className="btn btn-outline">
                Request a similar system
              </Link>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
