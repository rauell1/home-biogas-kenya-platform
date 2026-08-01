import { notFound } from "next/navigation";
import { APPLICATIONS } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export function generateStaticParams() {
  return APPLICATIONS.map((a) => ({ slug: a.slug }));
}

export default async function ApplicationDetail({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const app = APPLICATIONS.find((a) => a.slug === slug);
  if (!app) notFound();

  return (
    <PageHeader
      eyebrow="Application"
      title={app.name}
      lede={app.use}
      meta={[
        { label: "System requirement", value: app.requirement },
        { label: "Gas treatment", value: "Condensate trap · H₂S filtration · Pressure regulation" },
        { label: "Isolation", value: "Dedicated valve at each branch" },
        { label: "Training", value: "Provided at commissioning" },
      ]}
      actions={[
        { label: "Related project", href: `/${locale}/projects/${app.projectSlug}`, accent: true },
        { label: "Request a similar system", href: `/${locale}/request-assessment` },
      ]}
    />
  );
}
