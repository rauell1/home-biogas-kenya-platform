import { desc } from "drizzle-orm";
import { db } from "@/db";
import { sourceRecords } from "@/db/schema";
import { requirePermission } from "@/lib/guard";
import { can } from "@/lib/rbac";
import { reviewSourceAction } from "@/app/actions/admin";
import SourceImportForm from "@/components/admin/SourceImportForm";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function SourceRecordsPage() {
  const user = await requirePermission("projects.read");
  const rows = await db.select().from(sourceRecords).orderBy(desc(sourceRecords.importedAt));
  const reviewer = can(user.role, "sources.review");

  return (
    <div>
      <AdminHeader eyebrow={`${rows.length} imported`} title="Source records" description="Manual, rules-compliant import from the approved LinkedIn and Facebook pages only. Nothing publishes automatically." />
      {reviewer && <div className="mt-8 max-w-2xl"><SourceImportForm /></div>}
      <ul className="mt-10 divide-y divide-ink/10 border-t border-ink/20">
        {rows.map((s) => (
          <li key={s.id} className="py-5">
            <div className="flex flex-wrap gap-3 justify-between">
              <a href={s.sourceUrl} target="_blank" rel="noopener noreferrer" className="display-md hover:text-clay">
                {s.title ?? s.sourceUrl}
              </a>
              <span className="mono-label text-ink/50">{s.platform} · confidence {Number(s.confidenceScore).toFixed(2)}</span>
            </div>
            <p className="mt-2 text-sm text-ink/75 line-clamp-3">{s.rawText.slice(0, 320)}</p>
            <p className="mono-label mt-2 text-ink/50">
              capacity {s.possibleCapacityM3 ?? "—"} · feedstocks {s.possibleFeedstocks.join(", ") || "—"} · identity {s.companyIdentityStatus} · review {s.reviewStatus}
            </p>
            {reviewer && (
              <form action={reviewSourceAction} className="mt-3 flex flex-wrap gap-2 items-center">
                <input type="hidden" name="id" value={s.id} />
                <select name="companyIdentityStatus" defaultValue={s.companyIdentityStatus} className="border border-ink/25 bg-white px-2 py-1 text-sm">
                  {["pending", "confirmed", "wrong_company", "uncertain"].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <select name="reviewStatus" defaultValue={s.reviewStatus} className="border border-ink/25 bg-white px-2 py-1 text-sm">
                  {["unreviewed", "in_review", "verified", "rejected"].map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <button className="btn btn-primary btn-sm">Record decision</button>
              </form>
            )}
          </li>
        ))}
        {rows.length === 0 && <li className="py-6 text-ink/50">No source records imported yet.</li>}
      </ul>
    </div>
  );
}
