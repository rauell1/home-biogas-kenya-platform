import Link from "next/link";
import { SOCIALS } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const phone = process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "+254 700 000 000";
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@homebiogaskenya.co.ke";
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? phone;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the engineering team"
        lede="Tell us about your waste stream and your energy demand. We will tell you honestly whether biogas is the right answer."
        meta={[
          { label: "Phone", value: phone },
          { label: "WhatsApp", value: whatsapp },
          { label: "Email", value: email },
          { label: "Base", value: "Nairobi, Kenya" },
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
