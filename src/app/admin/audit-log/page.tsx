import { desc } from "drizzle-orm";
import { db } from "@/db";
import { auditLogs, loginEvents } from "@/db/schema";
import { requirePermission } from "@/lib/guard";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function AuditLogPage() {
  await requirePermission("audit.read");
  const logs = await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(200);
  const logins = await db.select().from(loginEvents).orderBy(desc(loginEvents.createdAt)).limit(50);
  return (
    <div>
      <AdminHeader eyebrow={`${logs.length} entries`} title="Audit log" description="Append-only record of privileged actions. Administrators cannot delete audit entries." />
      <table className="mt-8 w-full text-sm border-t border-ink/20">
        <thead><tr className="mono-label text-ink/50 text-left"><th className="py-3">When</th><th>Actor</th><th>Action</th><th>Entity</th></tr></thead>
        <tbody className="divide-y divide-ink/10">
          {logs.map((l) => (
            <tr key={l.id}>
              <td className="py-2 mono-data">{l.createdAt.toISOString().slice(0, 16).replace("T", " ")}</td>
              <td className="mono-data">{l.actorEmail}</td>
              <td className="mono-data">{l.action}</td>
              <td className="mono-data">{l.entityType ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="display-md mt-12">Login events</h2>
      <ul className="mt-4 divide-y divide-ink/10 text-sm">
        {logins.map((l) => (
          <li key={l.id} className="py-2 mono-data">
            {l.createdAt.toISOString().slice(0, 16).replace("T", " ")} · {l.email} · {l.success ? "success" : "failed"}
          </li>
        ))}
      </ul>
    </div>
  );
}
