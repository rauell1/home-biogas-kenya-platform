import { notFound } from "next/navigation";
import Image from "next/image";
import { PRODUCTS } from "@/lib/catalogue";
import { COMPANY } from "@/lib/content";
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
        {product.image && (
          <div className="relative mb-10 aspect-[4/3] overflow-hidden border border-ink/15 bg-white">
            <Image src={product.image} alt={product.name} fill sizes="800px" className="object-cover" priority />
          </div>
        )}
        <p>
          Supplied, installed and commissioned with correctly sized piping, isolation valves, condensate management and
          user training. Engine-driven equipment additionally requires hydrogen-sulphide filtration and moisture removal
          to protect the machine.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={`https://wa.me/${COMPANY.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello Home Biogas Kenya, I would like to enquire about ${product.name}.`)}`} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
          <a className="btn btn-outline" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>Call us</a>
          <a className="btn btn-outline" href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Enquiry: ${product.name}`)}`}>Email us</a>
        </div>
      </div>
    </>
  );
}
