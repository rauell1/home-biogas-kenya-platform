import Link from "next/link";
import { sql, eq, and, isNull, lte, count } from "drizzle-orm";
import { db } from "@/db";
import { leads, leadActivities, projects, projectMedia, sourceRecords, siteSurveys, articles } from "@/db/schema";
import { requireUser } from "@/lib/guard";
import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

async function scalar(query: Promise<{ value: number }[]>) {
  const rows = await query;
  return Number(rows[0]?.value ?? 0);
}

function Bars({ rows }: { rows: { label: string; value: number }[] }) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <ul className="mt-4 space-y-3">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="flex justify-between gap-4 text-sm">
            <span className="truncate">{r.label}</span>
            <span className="mono-data text-ink/60">{r.value}</span>
          </div>
          <div className="mt-1.5 h-1.5 bg-ink/10">
            <div className="h-full bg-methane" style={{ width: `${(r.value / max) * 100}%` }} />
          </div>
        </li>
      ))}
      {rows.length === 0 && <li className="text-sm text-ink/50">No data yet.</li>}
    </ul>
  );
}

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const user = await requireUser();
  const { denied } = await searchParams;

  const [newLeads, unassigned, followUps, surveysDue, techReview, mediaReview, contentReview, sources, wonLeads] =
    await Promise.all([
      scalar(db.select({ value: count() }).from(leads).where(eq(leads.stage, "NEW"))),
      scalar(db.select({ value: count() }).from(leads).where(isNull(leads.assignedTo))),
      scalar(
        db
          .select({ value: count() })
          .from(leadActivities)
          .where(and(isNull(leadActivities.doneAt), lte(leadActivities.dueAt, new Date()))),
      ),
      scalar(db.select({ value: count() }).from(siteSurveys).where(eq(siteSurveys.status, "scheduled"))),
      scalar(db.select({ value: count() }).from(projects).where(eq(projects.technicalReviewStatus, "unreviewed"))),
      scalar(db.select({ value: count() }).from(projectMedia).where(eq(projectMedia.rightsStatus, "pending"))),
      scalar(db.select({ value: count() }).from(articles).where(eq(articles.workflowState, "draft"))),
      scalar(db.select({ value: count() }).from(sourceRecords).where(eq(sourceRecords.reviewStatus, "unreviewed"))),
      scalar(db.select({ value: count() }).from(leads).where(eq(leads.stage, "WON"))),
    ]);

  const byCounty = await db.select({ k: leads.county, value: count() }).from(leads).groupBy(leads.county);
  const byTech = await db.select({ k: projects.plantType, value: count() }).from(projects).groupBy(projects.plantType);
  const stages = await db
    .select({ k: leads.stage, value: count() })
    .from(leads)
    .groupBy(leads.stage)
    .orderBy(sql`count(*) desc`);

  const primary = [
    { label: "New leads", value: newLeads, href: "/admin/leads", accent: true },
    { label: "Unassigned leads", value: unassigned, href: "/admin/leads" },
    { label: "Follow-ups due", value: followUps, href: "/admin/leads" },
    { label: "Surveys scheduled", value: surveysDue, href: "/admin/site-surveys" },
  ];
  const secondary = [
    { label: "Awaiting technical review", value: techReview, href: "/admin/approvals" },
    { label: "Media rights pending", value: mediaReview, href: "/admin/media" },
    { label: "Content awaiting publication", value: contentReview, href: "/admin/articles" },
    { label: "Source records unreviewed", value: sources, href: "/admin/source-records" },
    { label: "Leads won", value: wonLeads, href: "/admin/leads" },
  ];

  return (
    <div>
      <AdminHeader
        eyebrow={`Signed in as ${user.fullName}`}
        title="Operations dashboard"
        description="Every figure below is queried live from the database."
      />

      {denied && (
        <p role="alert" className="mb-8 border-l-4 border-oxide bg-oxide/10 p-4 text-sm">
          Your role does not include the permission “{denied}”.
        </p>
      )}

      <div className="grid gap-px bg-ink/12 border border-ink/12 sm:grid-cols-2 lg:grid-cols-4">
        {primary.map((c) => (
          <Link key={c.label} href={c.href} className="bg-cream p-6 hover:bg-bone transition-colors">
            <p className="mono-label text-ink/45">{c.label}</p>
            <p className={`display-figure mt-3 ${c.accent && c.value > 0 ? "text-clay" : ""}`}>{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-px grid gap-px bg-ink/12 border border-ink/12 border-t-0 sm:grid-cols-2 lg:grid-cols-5">
        {secondary.map((c) => (
          <Link key={c.label} href={c.href} className="bg-cream p-5 hover:bg-bone transition-colors">
            <p className="mono-label text-ink/45 leading-snug">{c.label}</p>
            <p className="display-md mt-2">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <section className="panel p-6">
          <h2 className="mono-label text-clay">Leads by county</h2>
          <Bars rows={byCounty.map((r) => ({ label: r.k ?? "Unspecified", value: r.value }))} />
        </section>
        <section className="panel p-6">
          <h2 className="mono-label text-clay">Projects by technology</h2>
          <Bars rows={byTech.map((r) => ({ label: (r.k ?? "Unspecified").replaceAll("_", " "), value: r.value }))} />
        </section>
        <section className="panel p-6">
          <h2 className="mono-label text-clay">Conversion funnel</h2>
          <Bars rows={stages.map((r) => ({ label: r.k, value: r.value }))} />
        </section>
      </div>
    </div>
  );
}
