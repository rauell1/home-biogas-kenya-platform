import FuelSavings from "@/components/FuelSavings";
import PageHeader from "@/components/PageHeader";
import { getDict } from "@/lib/i18n";

export default async function FuelSavingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHeader
        eyebrow="Tool"
        title="Fuel savings estimator"
        lede="Enter what you currently spend. Nothing is estimated without your input, and the result is always a range."
        meta={[
          { label: "Input", value: "Your monthly fuel spend" },
          { label: "Output", value: "Indicative monthly range" },
          { label: "Allowance", value: "30% for seasonal variation" },
          { label: "Status", value: "Educational, not a quotation" },
        ]}
      />
      <div className="shell-narrow section">
        <FuelSavings disclaimer={t.disclaimer} />
      </div>
    </>
  );
}
