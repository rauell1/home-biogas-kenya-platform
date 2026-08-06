import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { siteSurveys } from "@/db/schema";
import { requirePermission } from "@/lib/guard";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function SurveysPage() {
  await requirePermission("leads.read");
  const rows = await db.select().from(siteSurveys).orderBy(desc(siteSurveys.createdAt));
  return (
    <div>
      <AdminHeader eyebrow={`${rows.length} records`} title="Site surveys" description="Field assessments feeding technology choice and preliminary capacity." />
      <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/20">
        {rows.map((s) => (
          <li key={s.id} className="py-4 flex justify-between">
            <Link href={`/admin/site-surveys/${s.id}`} className="display-md hover:text-clay-text">{s.clientName}</Link>
            <span className="mono-label text-ink/50">{s.status} · {s.engineer ?? "unassigned"}</span>
          </li>
        ))}
        {rows.length === 0 && <li className="py-6 text-ink/50">No surveys scheduled.</li>}
      </ul>
    </div>
  );
}
