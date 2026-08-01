import { db } from "@/db";
import { articles } from "@/db/schema";
import { requirePermission } from "@/lib/guard";
import { can } from "@/lib/rbac";
import ArticleForm from "@/components/admin/ArticleForm";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const user = await requirePermission("projects.read");
  const rows = await db.select().from(articles);
  return (
    <div>
      <AdminHeader eyebrow={`${rows.length} records`} title="Knowledge articles" description="Editorial content for the public knowledge centre." />
      {can(user.role, "content.write") && <div className="mt-8 max-w-3xl"><ArticleForm /></div>}
      <ul className="mt-10 divide-y divide-ink/10 border-t border-ink/20">
        {rows.map((a) => (
          <li key={a.id} className="py-4 flex justify-between">
            <span className="display-md">{a.title}</span>
            <span className="mono-label text-ink/50">{a.slug} · {a.workflowState}</span>
          </li>
        ))}
        {rows.length === 0 && <li className="py-6 text-ink/50">No articles yet.</li>}
      </ul>
    </div>
  );
}
