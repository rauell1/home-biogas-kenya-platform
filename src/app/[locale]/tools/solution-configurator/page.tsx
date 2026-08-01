import Configurator from "@/components/Configurator";
import PageHeader from "@/components/PageHeader";
import { getDict } from "@/lib/i18n";

export default async function ConfiguratorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = getDict(locale);
  return (
    <>
      <PageHeader
        eyebrow="Tool · Chapter 05"
        title="Solution configurator"
        lede="Five steps from your waste stream to a possible system range. No figure is produced without your measured quantity."
        meta={[
          { label: "Steps", value: "5" },
          { label: "Output", value: "Range, not a single figure" },
          { label: "Assumptions", value: "Always shown" },
          { label: "Status", value: "Educational, not a quotation" },
        ]}
      />
      <div className="shell section">
        <Configurator locale={locale} disclaimer={t.disclaimer} />
      </div>
    </>
  );
}
