import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { leads, leadActivities, staffProfiles } from "@/db/schema";
import { requirePermission } from "@/lib/guard";
import { can } from "@/lib/rbac";
import { updateLeadAction, addLeadActivityAction, createSurveyAction } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

const STAGES = [
  "NEW", "CONTACT ATTEMPTED", "CONTACTED", "QUALIFIED", "SITE SURVEY REQUIRED", "SITE SURVEY SCHEDULED",
  "SITE SURVEY COMPLETED", "DESIGN IN PROGRESS", "QUOTATION IN PROGRESS", "QUOTATION SENT", "NEGOTIATION",
  "WON", "LOST", "DEFERRED", "MAINTENANCE OPPORTUNITY",
];

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  const user = await requirePermission("leads.read");
  const { id } = await params;
  const rows = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  const lead = rows[0];
  if (!lead) notFound();
  const activities = await db.select().from(leadActivities).where(eq(leadActivities.leadId, id)).orderBy(desc(leadActivities.createdAt));
  const staff = await db.select({ id: staffProfiles.id, fullName: staffProfiles.fullName }).from(staffProfiles);
  const writable = can(user.role, "leads.write");

  return (
    <div className="max-w-4xl">
      <p className="mono-label text-clay">{lead.reference}</p>
      <h1 className="display-lg mt-1">{lead.fullName}</h1>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3 mono-data">
        <div><dt className="text-ink/50">PHONE</dt><dd className="mt-1">{lead.phone}</dd></div>
        <div><dt className="text-ink/50">WHATSAPP</dt><dd className="mt-1">{lead.whatsapp ?? " - "}</dd></div>
        <div><dt className="text-ink/50">EMAIL</dt><dd className="mt-1">{lead.email ?? " - "}</dd></div>
        <div><dt className="text-ink/50">COUNTY</dt><dd className="mt-1">{lead.county ?? " - "}</dd></div>
        <div><dt className="text-ink/50">TIMELINE</dt><dd className="mt-1">{lead.timeline ?? " - "}</dd></div>
        <div><dt className="text-ink/50">BUDGET</dt><dd className="mt-1">{lead.budgetRange ?? " - "}</dd></div>
      </dl>
      {lead.notes && <p className="mt-6 border-l-4 border-ink/20 pl-4 text-sm">{lead.notes}</p>}
      {lead.configurator != null && (
        <details className="mt-6 border border-ink/20 p-4">
          <summary className="mono-label cursor-pointer">Configurator answers</summary>
          <pre className="mt-3 overflow-x-auto text-xs">{JSON.stringify(lead.configurator, null, 2)}</pre>
        </details>
      )}

      {writable && (
        <div className="mt-8 flex flex-wrap gap-6">
          <form action={updateLeadAction} className="flex items-end gap-2">
            <input type="hidden" name="id" value={lead.id} />
            <label><span className="mono-label text-ink/50">Stage</span>
              <select name="stage" defaultValue={lead.stage} className="mt-1 block border border-ink/25 bg-white px-3 py-2 text-sm">
                {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label><span className="mono-label text-ink/50">Assigned to</span>
              <select name="assignedTo" defaultValue={lead.assignedTo ?? ""} className="mt-1 block border border-ink/25 bg-white px-3 py-2 text-sm">
                <option value="">Unassigned</option>
                {staff.map((s) => <option key={s.id} value={s.id}>{s.fullName}</option>)}
              </select>
            </label>
            <button className="btn btn-primary btn-sm">Update</button>
          </form>
          <form action={createSurveyAction} className="flex items-end gap-2">
            <input type="hidden" name="leadId" value={lead.id} />
            <input type="hidden" name="clientName" value={lead.fullName} />
            <button className="btn btn-outline btn-sm">Create site survey</button>
          </form>
        </div>
      )}

      {writable && (
        <form action={addLeadActivityAction} className="mt-10 space-y-3 border border-ink/20 p-5">
          <input type="hidden" name="id" value={lead.id} />
          <label className="block"><span className="mono-label text-ink/50">Activity type</span>
            <select name="type" className="mt-1 border border-ink/25 bg-white px-3 py-2 text-sm">
              {["note", "call", "email", "whatsapp", "follow_up"].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
          <textarea name="body" rows={3} required className="w-full border border-ink/25 bg-white px-3 py-2" placeholder="What happened?" />
          <button className="btn btn-primary btn-sm">Log activity</button>
        </form>
      )}

      <h2 className="mono-label text-ink/50 mt-10 border-b border-ink/15 pb-2">Activity history</h2>
      <ul className="divide-y divide-ink/10">
        {activities.map((a) => (
          <li key={a.id} className="py-3 text-sm">
            <p className="mono-label text-ink/50">{a.type} · {a.createdAt.toISOString().slice(0, 16).replace("T", " ")} · {a.actorEmail}</p>
            <p className="mt-1">{a.body}</p>
          </li>
        ))}
        {activities.length === 0 && <li className="py-4 text-ink/50 text-sm">No activity recorded.</li>}
      </ul>
    </div>
  );
}
