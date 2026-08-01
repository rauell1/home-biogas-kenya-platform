import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { requirePermission } from "@/lib/guard";
import { can } from "@/lib/rbac";
import AdminHeader from "@/components/admin/AdminHeader";
import StatusPill from "@/components/admin/StatusPill";

export const dynamic = "force-dynamic";

export default async function AdminProjects() {
  const user = await requirePermission("projects.read");
  const rows = await db.select().from(projects).orderBy(desc(projects.updatedAt));

  return (
    <div>
      <AdminHeader
        eyebrow={`${rows.length} records`}
        title="Projects"
        description="Publication requires an approved technical review and cleared media rights."
        action={can(user.role, "projects.write") ? { label: "New project", href: "/admin/projects/new" } : undefined}
      />

      <div className="overflow-x-auto border border-ink/12">
        <table className="w-full text-sm min-w-[54rem]">
          <thead className="bg-bone">
            <tr className="mono-label text-ink/45 text-left">
              <th className="px-5 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">County</th>
              <th className="px-4 py-3 font-medium">Capacity</th>
              <th className="px-4 py-3 font-medium">Technical</th>
              <th className="px-4 py-3 font-medium">Media</th>
              <th className="px-4 py-3 font-medium">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10">
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-bone/60 transition-colors">
                <td className="px-5 py-4">
                  <Link href={`/admin/projects/${p.id}`} className="display-md hover:text-clay transition-colors">
                    {p.title}
                  </Link>
                  <span className="mono-label block text-ink/40 mt-1">{p.slug}</span>
                </td>
                <td className="px-4 mono-data text-ink/70">{p.county ?? " - "}</td>
                <td className="px-4 mono-data">{p.capacityM3 ? `${Number(p.capacityM3)} m³` : " - "}</td>
                <td className="px-4"><StatusPill value={p.technicalReviewStatus} /></td>
                <td className="px-4"><StatusPill value={p.mediaRightsStatus} /></td>
                <td className="px-4"><StatusPill value={p.workflowState} /></td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td className="px-5 py-8 text-ink/50" colSpan={6}>
                  No projects yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
