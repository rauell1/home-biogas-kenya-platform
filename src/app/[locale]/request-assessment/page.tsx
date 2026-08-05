import type { Metadata } from "next";
import AssessmentForm from "@/components/AssessmentForm";
import PageHeader from "@/components/PageHeader";
import { getDict } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/request-assessment",
    title: "Request a site assessment",
    description: "Answers from the configurator are attached automatically if you used it. You will receive a reference number immediately.",
  });
}

export default async function RequestAssessment({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHeader
        eyebrow="Chapter 06  -  Start a project"
        title="Request a site assessment"
        lede="Answers from the configurator are attached automatically if you used it. You will receive a reference number immediately."
        meta={[
          { label: "Response time", value: "Within 2 working days" },
          { label: "Next step", value: "Site survey" },
          { label: "Cost", value: "Assessment request is free" },
          { label: "Reference", value: "Issued on submission" },
        ]}
      />
      <div className="shell-narrow section">
        <AssessmentForm locale={locale} disclaimer={t.disclaimer} />
      </div>
    </>
  );
}
