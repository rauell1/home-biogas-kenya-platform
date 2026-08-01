import { sql } from "drizzle-orm";
import { db } from "@/db";
import { requireUser } from "@/lib/guard";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

async function checkDb() {
  const started = Date.now();
  try {
    await db.execute(sql`select 1`);
    return { dbStatus: "ok", latency: Date.now() - started };
  } catch {
    return { dbStatus: "unavailable", latency: 0 };
  }
}

export default async function SystemHealth() {
  await requireUser();
  const { dbStatus, latency } = await checkDb();
  return (
    <div className="max-w-2xl">
      <AdminHeader eyebrow="Diagnostics" title="System health" description="Live checks of the database and supporting services." />
      <dl className="mt-8 divide-y divide-ink/10 border-t border-ink/20 text-sm">
        <div className="py-3 flex justify-between"><dt>Database</dt><dd className="font-mono">{dbStatus} · {latency} ms</dd></div>
        <div className="py-3 flex justify-between"><dt>Email provider</dt><dd className="font-mono">{process.env.RESEND_API_KEY ? "configured" : "fallback logging"}</dd></div>
        <div className="py-3 flex justify-between"><dt>Runtime</dt><dd className="font-mono">{process.version}</dd></div>
        <div className="py-3 flex justify-between"><dt>Environment</dt><dd className="font-mono">{process.env.NODE_ENV}</dd></div>
      </dl>
    </div>
  );
}
