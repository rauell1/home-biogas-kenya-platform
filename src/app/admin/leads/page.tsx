import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { requirePermission } from "@/lib/guard";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusPill from "@/components/admin/StatusPill";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  await requirePermission("leads.read");
  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <div>
      <AdminHeader
        eyebrow={`${rows.length} records`}
        title="Leads"
        description="Assessment requests captured from the public website, with configurator answers attached where used."
      />

      <div className="overflow-x-auto border border-ink/12">
        <table className="w-full text-sm min-w-[48rem]">
          <thead className="bg-bone">
            <tr className="mono-label text-ink/45 text-left">
              <th className="px-5 py-3 font-medium">Reference</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">County</th>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="px-4 py-3 font-medium">Received</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {rows.map((l) => (
              <tr key={l.id} className="hover:bg-bone/60 transition-colors">
                <td className="px-5 py-4">
                  <Link href={`/admin/leads/${l.id}`} className="mono-data hover:text-clay-text transition-colors">
                    {l.reference}
                  </Link>
                </td>
                <td className="px-4 font-medium">{l.fullName}</td>
                <td className="px-4 mono-data text-ink/70">{l.county ?? " - "}</td>
                <td className="px-4"><StatusPill value={l.stage} /></td>
                <td className="px-4 mono-data text-ink/60">{l.createdAt.toISOString().slice(0, 10)}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-5 py-8 text-ink/50" colSpan={5}>
                  No leads yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
