import { notFound } from "next/navigation";
import { PRODUCTS } from "../page";
import PageHeader from "@/components/PageHeader";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Product"
        title={product.name}
        lede={product.spec}
        meta={[
          { label: "Supply", value: "Delivered and installed" },
          { label: "Pipework", value: "Sized to appliance demand" },
          { label: "Safety", value: "Isolation valve + condensate management" },
          { label: "Availability", value: "Confirmed on quotation" },
        ]}
        actions={[
          { label: "Enquire about this product", href: `/${locale}/contact`, accent: true },
          { label: "All products", href: `/${locale}/products` },
        ]}
      />
      <div className="shell-narrow section prose-body">
        <p>
          Supplied, installed and commissioned with correctly sized piping, isolation valves, condensate management and
          user training. Engine-driven equipment additionally requires hydrogen-sulphide filtration and moisture removal
          to protect the machine.
        </p>
      </div>
    </>
  );
}
