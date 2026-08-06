import type { Metadata } from "next";
import Link from "next/link";
import { COMPANY, SOCIALS } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import PageHeader from "@/components/PageHeader";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/contact",
    title: "Talk to the engineering team",
    description: "Tell us about your waste stream and your energy demand. We will tell you honestly whether biogas is the right answer.",
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? COMPANY.phone;
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? COMPANY.email;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? phone;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the engineering team"
        lede="Tell us about your waste stream and your energy demand. We will tell you honestly whether biogas is the right answer."
        meta={[
          { label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
          { label: "WhatsApp", value: whatsapp, href: `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}` },
          { label: "Email", value: email, href: `mailto:${email}` },
          { label: "Office", value: "Koinange Street, Nairobi" },
        ]}
        actions={[
          { label: "Request an assessment", href: `/${locale}/request-assessment`, accent: true },
          { label: "Try the configurator", href: `/${locale}/tools/solution-configurator` },
        ]}
      />

      <div className="shell section grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: "New projects", body: "Site surveys, feasibility studies, design and construction for any sector.", href: `/${locale}/request-assessment`, cta: "Start a project" },
          { title: "Existing plants", body: "Maintenance, rehabilitation and appliance connection for plants already built.", href: `/${locale}/solutions/maintenance`, cta: "Maintenance" },
          { title: "Training", body: "Operator, construction and appliance-installation training for teams.", href: `/${locale}/training`, cta: "Training courses" },
        ].map((c) => (
          <div key={c.title} className="panel p-6 flex flex-col">
            <h2 className="display-md">{c.title}</h2>
            <p className="mt-3 text-sm text-ink/72 flex-1">{c.body}</p>
            <Link href={c.href} className="btn btn-outline btn-sm mt-6 self-start">
              {c.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="shell pb-24 flex flex-wrap gap-3">
        <div className="w-full mb-7 border-l-2 border-clay pl-5">
          <p className="mono-label text-clay-text">Visit or write to us</p>
          <p className="mt-2 text-sm text-ink/75">{COMPANY.address}</p>
          <p className="text-sm text-ink/60">{COMPANY.postalAddress}</p>
        </div>
        <a className="btn btn-outline btn-sm" href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn ↗
        </a>
        <a className="btn btn-outline btn-sm" href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer">
          Facebook ↗
        </a>
      </div>
    </>
  );
}
