import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/privacy-policy",
    title: locale === "sw" ? "Sera ya Ulinzi wa Data" : "Privacy & Data Protection Policy",
    description:
      locale === "sw"
        ? "Home Biogas Kenya inalinda data yako binafsi kulingana na Sheria ya Ulinzi wa Data ya Kenya (2019), GDPR, na CCPA."
        : "Home Biogas Kenya protects your personal data under the Kenyan Data Protection Act (2019), GDPR, and CCPA standards.",
  });
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <article>
      <PageHeader
        eyebrow="Legal & Compliance"
        title={locale === "sw" ? "Sera ya Ulinzi wa Data" : "Privacy & Data Protection Policy"}
        lede={
          locale === "sw"
            ? "Home Biogas Kenya inalinda data yako binafsi kulingana na Sheria ya Ulinzi wa Data ya Kenya (2019), GDPR, na CCPA."
            : "Home Biogas Kenya protects your personal data under the Kenyan Data Protection Act (2019), GDPR, and CCPA standards."
        }
        meta={[
          { label: "Effective date", value: "January 2026" },
          { label: "Data Controller", value: "Home Biogas Kenya Ltd" },
          { label: "Jurisdiction", value: "Nairobi, Kenya" },
        ]}
      />

      <div className="shell section max-w-3xl prose-body space-y-8">
        <section>
          <h2 className="display-md text-ink mb-3">1. Information We Collect</h2>
          <p>
            When you request a site assessment, submit a preliminary configuration, or contact us, we collect:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-ink/80">
            <li><strong>Contact Data:</strong> Full name, organisation, email, phone number, WhatsApp contact.</li>
            <li><strong>Site & Engineering Data:</strong> County, locality, waste stream types, daily quantities, energy demand requirements.</li>
            <li><strong>Technical & Consent Data:</strong> Anonymised IP hash, user agent, cookie category consent logs, and region.</li>
          </ul>
        </section>

        <section>
          <h2 className="display-md text-ink mb-3">2. How We Use Your Information</h2>
          <p>
            We use collected information strictly to perform engineering assessments, arrange site surveys, supply quotations, and deliver biogas installations and user training.
          </p>
        </section>

        <section>
          <h2 className="display-md text-ink mb-3">3. Your Data Rights (GDPR & CCPA)</h2>
          <p>
            Under the Data Protection Act 2019, GDPR, and CCPA, you have the right to request access to, rectification of, or erasure of your personal data held by Home Biogas Kenya.
          </p>
        </section>

        <section>
          <h2 className="display-md text-ink mb-3">4. Data Protection Officer Contact</h2>
          <p className="mono-data text-ink/75">
            Data Protection Officer · Home Biogas Kenya · Email: dpo@homebiogas.co.ke · Nairobi, Kenya
          </p>
        </section>
      </div>
    </article>
  );
}
