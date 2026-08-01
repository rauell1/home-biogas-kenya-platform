import { db } from "@/db";
import { projectMedia } from "@/db/schema";
import { requirePermission } from "@/lib/guard";
import { setMediaRightsAction } from "@/app/actions/admin";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  const user = await requirePermission("projects.read");
  const rows = await db.select().from(projectMedia);
  const editable = user.role !== "viewer";
  return (
    <div>
      <AdminHeader eyebrow={`${rows.length} assets`} title="Media rights review" description="Binary files live in external object storage; only rights metadata is stored in the database." />
      <ul className="mt-8 divide-y divide-ink/10 border-t border-ink/20">
        {rows.map((m) => (
          <li key={m.id} className="py-4 grid gap-3 md:grid-cols-[2fr_1fr_auto]">
            <div>
              <p className="mono-data text-ink/50">{m.url}</p>
              <p className="mt-1">{m.altText ?? "No alt text recorded"}</p>
            </div>
            <p className="mono-label text-ink/60">Owner: {m.rightsOwner ?? "unknown"} · {m.rightsStatus}</p>
            {editable && (
              <form action={setMediaRightsAction} className="flex gap-2 items-center">
                <input type="hidden" name="id" value={m.id} />
                <select name="status" defaultValue={m.rightsStatus} className="border border-ink/25 bg-white px-2 py-1 text-sm">
                  {["pending", "approved_public", "approved_internal", "restricted", "rejected"].map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button className="btn btn-primary btn-sm">Set</button>
              </form>
            )}
          </li>
        ))}
        {rows.length === 0 && <li className="py-6 text-ink/50">No media registered yet.</li>}
      </ul>
    </div>
  );
}
