import { requirePermission } from "@/lib/guard";
import AdminHeader from "@/components/admin/AdminHeader";
import { db } from "@/db";
import { cookieConsentLogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminConsentLogsPage() {
  await requirePermission("audit.read");

  const logs = await db
    .select()
    .from(cookieConsentLogs)
    .orderBy(desc(cookieConsentLogs.createdAt))
    .limit(100)
    .catch(() => []);

  const total = logs.length;
  const acceptedAll = logs.filter((l) => l.categories.analytics && l.categories.marketing).length;
  const rejectedOpt = logs.filter((l) => !l.categories.analytics && !l.categories.marketing).length;
  const euLogs = logs.filter((l) => l.region === "EU").length;
  const usCaLogs = logs.filter((l) => l.region === "US_CA").length;

  return (
    <div className="max-w-5xl space-y-8">
      <AdminHeader
        eyebrow="Audit & Transparency"
        title="Consent Logs & Analytics"
        description="Inspect real-time anonymous GDPR/CCPA consent decisions, region breakdowns, and export proof of compliance."
        action={{ label: "Export CSV Data", href: "/api/admin/consent-logs?export=csv" }}
      />

      {/* Metrics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="stat-card">
          <p className="display-figure text-[#5db7c4]">{total}</p>
          <p className="mono-label mt-2 text-ink/60">Total Consent Decisions</p>
        </div>
        <div className="stat-card">
          <p className="display-figure text-[#6e7445]">{total > 0 ? Math.round((acceptedAll / total) * 100) : 0}%</p>
          <p className="mono-label mt-2 text-ink/60">Full Accept Rate</p>
        </div>
        <div className="stat-card">
          <p className="display-figure text-[#a85532]">{total > 0 ? Math.round((rejectedOpt / total) * 100) : 0}%</p>
          <p className="mono-label mt-2 text-ink/60">Strict Essential Rate</p>
        </div>
        <div className="stat-card">
          <p className="display-figure text-[#e5b83b]">{euLogs + usCaLogs}</p>
          <p className="mono-label mt-2 text-ink/60">EU / CCPA Geotargeted</p>
        </div>
      </div>

      {/* Log Audit Table */}
      <section className="panel bg-cream p-6">
        <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-4">
          <h2 className="display-md">Consent Audit Records</h2>
          <span className="mono-label text-ink/50">Showing latest {logs.length} logs</span>
        </div>

        {logs.length === 0 ? (
          <p className="note">No consent logs recorded yet. Consent decisions will automatically log here as visitors browse.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs mono-data">
              <thead className="border-b border-ink/15 bg-ink/5">
                <tr>
                  <th className="p-3">Consent ID</th>
                  <th className="p-3">Region</th>
                  <th className="p-3">Necessary</th>
                  <th className="p-3">Functional</th>
                  <th className="p-3">Analytics</th>
                  <th className="p-3">Marketing</th>
                  <th className="p-3">Consent Mode v2</th>
                  <th className="p-3">Logged At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {logs.map((l) => (
                  <tr key={l.id} className="hover:bg-bone/50">
                    <td className="p-3 font-semibold text-clay-text">{l.consentId.substring(0, 16)}…</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 border ${l.region === "EU" ? "border-methane text-methane" : l.region === "US_CA" ? "border-safety text-safety" : "border-ink/20"}`}>
                        {l.region}
                      </span>
                    </td>
                    <td className="p-3 text-olive font-bold">✓</td>
                    <td className="p-3">{l.categories.functional ? "✓" : "✕"}</td>
                    <td className="p-3">{l.categories.analytics ? "✓" : "✕"}</td>
                    <td className="p-3">{l.categories.marketing ? "✓" : "✕"}</td>
                    <td className="p-3 text-[0.65rem]">
                      {l.consentModeV2?.analytics_storage === "granted" ? "Analytics: Granted" : "Analytics: Denied"}
                    </td>
                    <td className="p-3 text-ink/55">{new Date(l.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
