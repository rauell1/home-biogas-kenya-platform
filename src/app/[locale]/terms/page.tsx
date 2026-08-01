import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <article>
      <PageHeader
        eyebrow="Terms of Service"
        title={locale === "sw" ? "Masharti ya Huduma" : "Terms & Engineering Disclaimer"}
        lede={
          locale === "sw"
            ? "Kanuni za matumizi ya jukwaa la Home Biogas Kenya, ombi la tathmini, na nukuu za uhandisi."
            : "Terms governing use of the Home Biogas Kenya platform, site survey requests, and engineering assessments."
        }
        meta={[
          { label: "Jurisdiction", value: "Laws of Kenya" },
          { label: "Organization", value: "Home Biogas Kenya" },
        ]}
      />

      <div className="shell section max-w-3xl prose-body space-y-8">
        <section>
          <h2 className="display-md text-ink mb-3">1. Engineering Disclaimer</h2>
          <p>
            All preliminary calculations provided by the Solution Configurator, Feedstock Checker, or Fuel Savings Estimator are educational estimates based on user-supplied waste quantities. Final plant sizing, design drawings, and binding quotations require an official Home Biogas Kenya site survey.
          </p>
        </section>

        <section>
          <h2 className="display-md text-inkmb-3">2. Site Surveys & Assessments</h2>
          <p>
            Submitting a site assessment request initiates a consultation with our engineering team. We guarantee an initial response within two working days.
          </p>
        </section>
      </div>
    </article>
  );
}
