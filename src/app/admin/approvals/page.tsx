import Link from "next/link";
import { ne } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { requirePermission } from "@/lib/guard";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function Approvals() {
  await requirePermission("projects.read");
  const pending = await db.select().from(projects).where(ne(projects.workflowState, "published"));
  return (
    <div>
      <AdminHeader eyebrow={`${pending.length} awaiting`} title="Approvals queue" description="Nothing publishes without an approved technical review and cleared media rights." />
      <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/20">
        {pending.map((p) => (
          <li key={p.id} className="py-4 flex flex-wrap gap-4 justify-between">
            <Link href={`/admin/projects/${p.id}`} className="display-md hover:text-clay">{p.title}</Link>
            <span className="mono-label text-ink/60">{p.workflowState} · technical: {p.technicalReviewStatus} · media: {p.mediaRightsStatus}</span>
          </li>
        ))}
        {pending.length === 0 && <li className="py-6 text-ink/50">Queue is clear.</li>}
      </ul>
    </div>
  );
}
