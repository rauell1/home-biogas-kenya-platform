import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/catalogue";

export default function ShopPreview({ locale }: { locale: string }) {
  const featured = PRODUCTS.filter((product) => product.image).slice(0, 6);
  return (
    <section className="bg-bone border-y border-ink/10">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="chapter-marker text-clay-text">Shop & equipment</p><h2 className="display-xl mt-4 max-w-3xl">Appliances that complete the system</h2></div>
          <Link href={`/${locale}/products`} className="btn btn-primary">View the catalogue →</Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <Link key={product.slug} href={`/${locale}/products/${product.slug}`} className="group relative aspect-[4/3] overflow-hidden bg-white border border-ink/12">
              <Image src={product.image!} alt={product.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/85 to-transparent px-5 pb-5 pt-16 text-bone">
                <p className="mono-label text-methane">{product.category} · Price on enquiry</p><h3 className="display-md mt-2">{product.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
