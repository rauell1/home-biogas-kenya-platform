import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { COMPANY, DIGESTER_TECHNOLOGIES } from "@/lib/content";
import { PLANT_SIZES, PRODUCTS } from "@/lib/catalogue";

function inquiryLinks(name: string) {
  const message = encodeURIComponent(`Hello Home Biogas Kenya, I would like to enquire about ${name}.`);
  return {
    whatsapp: `https://wa.me/${COMPANY.phone.replace(/\D/g, "")}?text=${message}`,
    email: `mailto:${COMPANY.email}?subject=${encodeURIComponent(`Enquiry: ${name}`)}&body=${message}`,
  };
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <PageHeader
        eyebrow="Shop & catalogue"
        title="Biogas appliances, equipment and plant systems"
        lede="Browse the equipment we supply and the plant sizes we build. Prices are confirmed only after availability, demand and site requirements have been checked."
        meta={[
          { label: "Catalogue", value: `${PRODUCTS.length} items` },
          { label: "Plant sizes", value: "4–32 m³ shown" },
          { label: "Pricing", value: "Available on enquiry" },
          { label: "Support", value: "Supply · Installation · Training" },
        ]}
      />

      <section className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-ink/15 pb-6">
          <div>
            <p className="chapter-marker text-clay">Appliance shop</p>
            <h2 className="display-lg mt-4">Ask, confirm, then order</h2>
          </div>
          <p className="max-w-md text-sm text-ink/65">
            No checkout or public prices: speak directly with the engineering team to confirm compatibility, availability and installation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((product) => {
            const links = inquiryLinks(product.name);
            return (
              <article key={product.slug} className="panel group flex flex-col overflow-hidden">
                <Link href={`/${locale}/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-white">
                  {product.image ? (
                    <Image src={product.image} alt={product.name} fill sizes="(min-width: 1280px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.025]" />
                  ) : (
                    <div className="grid h-full place-items-center grid-lines bg-ink p-8 text-center text-bone">
                      <span className="display-md">{product.name}</span>
                    </div>
                  )}
                  <span className="absolute left-4 top-4 bg-ink px-2.5 py-1 mono-label text-bone">{product.category}</span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="display-md">{product.name}</h3>
                  <p className="mt-3 flex-1 text-sm text-ink/68">{product.spec}</p>
                  <p className="mono-label mt-5 text-clay">Price on enquiry</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">WhatsApp</a>
                    <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="btn btn-outline btn-sm">Call</a>
                    <a href={links.email} className="btn btn-outline btn-sm">Email</a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-ink text-bone">
        <div className="shell section">
          <p className="chapter-marker text-methane">Plant sizes</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-end">
            <div>
              <h2 className="display-xl">From household systems to institutional plants</h2>
              <p className="lede mt-6 text-bone/70">Capacity is not selected from a price list. Daily feedstock, retention time, site conditions and actual energy demand determine the design.</p>
            </div>
            <div className="grid grid-cols-3 gap-px bg-bone/15 border border-bone/15 sm:grid-cols-5">
              {PLANT_SIZES.map((size) => (
                <div key={size} className="bg-ink p-4 text-center">
                  <span className="display-md text-methane">{size}</span>
                  <span className="mono-label ml-1 text-bone/50">m³</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-px bg-bone/15 border border-bone/15 sm:grid-cols-2 xl:grid-cols-4">
            {DIGESTER_TECHNOLOGIES.map((technology, index) => (
              <article key={technology.name} className="bg-ink p-6">
                <p className="mono-label text-methane">Type {String(index + 1).padStart(2, "0")}</p>
                <h3 className="display-md mt-5">{technology.name}</h3>
                <p className="mt-3 text-sm text-bone/65">{technology.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href={`/${locale}/request-assessment`} className="btn btn-accent">Request plant assessment</Link>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="btn btn-outline-invert">Call {COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
