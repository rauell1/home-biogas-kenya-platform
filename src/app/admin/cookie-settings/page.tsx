import { requirePermission } from "@/lib/guard";
import AdminHeader from "@/components/admin/AdminHeader";
import { db } from "@/db";
import { cookieConsentSettings, cookieTrackers } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

export default async function AdminCookieSettingsPage() {
  await requirePermission("settings.manage");

  const [settings] = await db.select().from(cookieConsentSettings).limit(1).catch(() => []);
  const trackers = await db.select().from(cookieTrackers).catch(() => []);

  async function updateSettingsAction(formData: FormData) {
    "use server";
    await requirePermission("settings.manage");
    const bannerTheme = String(formData.get("bannerTheme") || "dark");
    const bannerPosition = String(formData.get("bannerPosition") || "bottom_bar");
    const geotargetingMode = String(formData.get("geotargetingMode") || "auto");
    const consentModeV2Enabled = formData.get("consentModeV2Enabled") === "on";
    const autoBlockTrackers = formData.get("autoBlockTrackers") === "on";

    const existing = await db.select().from(cookieConsentSettings).limit(1);
    if (existing.length > 0) {
      await db
        .update(cookieConsentSettings)
        .set({ bannerTheme, bannerPosition, geotargetingMode, consentModeV2Enabled, autoBlockTrackers, updatedAt: new Date() })
        .where(eq(cookieConsentSettings.id, existing[0].id));
    } else {
      await db.insert(cookieConsentSettings).values({
        bannerTheme,
        bannerPosition,
        geotargetingMode,
        consentModeV2Enabled,
        autoBlockTrackers,
      });
    }
    revalidatePath("/admin/cookie-settings");
  }

  return (
    <div className="max-w-4xl space-y-10">
      <AdminHeader
        eyebrow="GDPR & CCPA Compliance"
        title="Cookie & Consent Settings"
        description="Configure banner layout, Google Consent Mode v2, geotargeting compliance rules, and automated script blocking."
      />

      <form action={updateSettingsAction} className="panel bg-cream p-6 md:p-8 space-y-6">
        <h2 className="display-md">Compliance & Geotargeting Configuration</h2>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="field-label">Geotargeting Compliance Mode</span>
            <select name="geotargetingMode" defaultValue={settings?.geotargetingMode ?? "auto"} className="field-input">
              <option value="auto">Automatic (EU Opt-In / US CCPA Opt-Out / Rest Global)</option>
              <option value="eu_opt_in">Strict EU Opt-In (GDPR Standard)</option>
              <option value="us_ca_opt_out">US California Opt-Out (CCPA Standard)</option>
              <option value="global_opt_in">Global Strict Opt-In</option>
            </select>
          </label>

          <label className="block">
            <span className="field-label">Banner Position & Style</span>
            <select name="bannerPosition" defaultValue={settings?.bannerPosition ?? "bottom_bar"} className="field-input">
              <option value="bottom_bar">Bottom Overlay Bar</option>
              <option value="modal">Centered Modal Dialog</option>
            </select>
          </label>
        </div>

        <div className="space-y-4 border-t border-ink/12 pt-5">
          <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold">
            <input
              type="checkbox"
              name="consentModeV2Enabled"
              defaultChecked={settings?.consentModeV2Enabled ?? true}
              className="h-4 w-4 accent-[#5db7c4]"
            />
            <span>Enable Google Consent Mode v2 (ad_storage, analytics_storage, ad_user_data, ad_personalization)</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer text-sm font-semibold">
            <input
              type="checkbox"
              name="autoBlockTrackers"
              defaultChecked={settings?.autoBlockTrackers ?? true}
              className="h-4 w-4 accent-[#a85532]"
            />
            <span>Auto-block non-essential scripts and cookies until explicit user consent is granted</span>
          </label>
        </div>

        <div className="pt-4">
          <button type="submit" className="btn btn-primary">
            Save Compliance Settings →
          </button>
        </div>
      </form>

      {/* Inventory & Scanner */}
      <section className="panel bg-cream p-6 md:p-8">
        <div className="flex items-center justify-between border-b border-ink/12 pb-4 mb-6">
          <div>
            <p className="mono-label text-clay">Tracker Inventory</p>
            <h2 className="display-md mt-1">Detected Cookies & Scripts ({trackers.length})</h2>
          </div>
        </div>

        {trackers.length === 0 ? (
          <p className="note">No dynamic trackers scanned yet. Default essential and analytics cookies are actively managed.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs mono-data">
              <thead className="border-b border-ink/15 bg-ink/5">
                <tr>
                  <th className="p-3">Tracker</th>
                  <th className="p-3">Domain</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Expiry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {trackers.map((t) => (
                  <tr key={t.id}>
                    <td className="p-3 font-bold">{t.name}</td>
                    <td className="p-3">{t.domain}</td>
                    <td className="p-3">{t.category}</td>
                    <td className="p-3">{t.provider}</td>
                    <td className="p-3">{t.expiry}</td>
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
