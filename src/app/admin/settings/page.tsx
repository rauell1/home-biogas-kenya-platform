import { requirePermission } from "@/lib/guard";
import { SOCIALS } from "@/lib/content";
import { getBootstrapState } from "@/lib/bootstrap";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  await requirePermission("settings.manage");
  const bootstrap = await getBootstrapState();
  const rows = [
    ["Site URL", process.env.NEXT_PUBLIC_SITE_URL ?? "not set"],
    ["Application name", process.env.NEXT_PUBLIC_APP_NAME ?? "Home Biogas Kenya"],
    ["Email delivery", process.env.RESEND_API_KEY ? "Resend configured" : "Logging only (no API key)"],
    ["Object storage", process.env.BLOB_READ_WRITE_TOKEN || process.env.CLOUDINARY_CLOUD_NAME ? "configured" : "not configured"],
    ["Rate limiting", process.env.UPSTASH_REDIS_REST_URL ? "Upstash Redis" : "in-process fallback"],
    ["Bot protection", process.env.TURNSTILE_SECRET_KEY ? "Turnstile" : "honeypot + rate limit"],
    ["Bootstrap window", bootstrap.available ? "OPEN  -  no staff accounts exist" : "closed"],
    ["Bootstrap email", bootstrap.expectedEmail ?? "not restricted"],
    ["Approved LinkedIn page", SOCIALS.linkedin],
    ["Approved Facebook page", SOCIALS.facebook],
  ];
  return (
    <div className="max-w-3xl">
      <AdminHeader eyebrow="Configuration" title="Settings" description="Secrets are read from the environment and are never rendered to the browser." />
      <dl className="mt-8 divide-y divide-ink/10 border-t border-ink/20 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="py-3 flex justify-between gap-6">
            <dt className="text-ink/60">{k}</dt>
            <dd className="mono-data text-right break-all">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
