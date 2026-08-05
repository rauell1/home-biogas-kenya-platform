import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { db } from "@/db";
import { cookieTrackers } from "@/db/schema";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/cookie-policy",
    title: locale === "sw" ? "Sera ya Vidakuzi" : "Cookie Policy",
    description:
      locale === "sw"
        ? "Orodha kamili ya vidakuzi na vitambulisho vinavyotumika kwenye jukwaa la Home Biogas Kenya."
        : "Complete inventory of cookies and tags used on the Home Biogas Kenya platform.",
  });
}

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const trackers = await db.select().from(cookieTrackers).catch(() => []);

  const defaultTrackers = [
    { name: "hbk_session", category: "Necessary", provider: "Home Biogas Kenya", expiry: "Session", desc: "Core authentication and session security" },
    { name: "hbk_cookie_consent_v2", category: "Necessary", provider: "Home Biogas Kenya", expiry: "1 year", desc: "Stores your GDPR/CCPA cookie consent preferences" },
    { name: "hbk_config", category: "Functional", provider: "Home Biogas Kenya", expiry: "Session", desc: "Stores preliminary configurator choices for assessment form" },
    { name: "_ga", category: "Analytics", provider: "Google Analytics (Consent Mode v2)", expiry: "2 years", desc: "Anonymised performance and site usage metrics" },
    { name: "_vercel_analytics", category: "Analytics", provider: "Vercel", expiry: "Session", desc: "Real-time web application performance monitoring" },
  ];

  const allTrackers = trackers.length > 0
    ? trackers.map((t) => ({ name: t.name, category: t.category, provider: t.provider, expiry: t.expiry ?? "Session", desc: locale === "sw" ? (t.descriptionSw || t.descriptionEn) : t.descriptionEn }))
    : defaultTrackers;

  return (
    <article>
      <PageHeader
        eyebrow="Compliance & Cookies"
        title={locale === "sw" ? "Sera ya Vidakuzi" : "Cookie Policy"}
        lede={
          locale === "sw"
            ? "Orodha kamili ya vidakuzi na vitambulisho vinavyotumika kwenye jukwaa la Home Biogas Kenya."
            : "Complete inventory of cookies and tags used on the Home Biogas Kenya platform."
        }
        meta={[
          { label: "Consent Mode", value: "Google Consent Mode v2" },
          { label: "Compliance", value: "GDPR, CCPA, DPA 2019" },
        ]}
      />

      <div className="shell section max-w-4xl space-y-8">
        <section>
          <h2 className="display-md text-ink mb-4">Cookie Inventory & Classifications</h2>
          <div className="overflow-x-auto border border-ink/15 bg-bone">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink/15 bg-ink/5 mono-label text-xs">
                <tr>
                  <th className="p-3">Cookie Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Expiry</th>
                  <th className="p-3">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10 font-mono text-xs">
                {allTrackers.map((t) => (
                  <tr key={t.name} className="hover:bg-cream/50">
                    <td className="p-3 font-semibold text-clay">{t.name}</td>
                    <td className="p-3">{t.category}</td>
                    <td className="p-3">{t.provider}</td>
                    <td className="p-3">{t.expiry}</td>
                    <td className="p-3 font-sans text-ink/75">{t.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </article>
  );
}
