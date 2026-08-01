import ProjectExplorer from "@/components/ProjectExplorer";
import PageHeader from "@/components/PageHeader";
import { getPublishedProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const projects = await getPublishedProjects();
  const capacities = projects.map((p) => Number(p.capacityM3 ?? 0)).filter((n) => n > 0);

  return (
    <>
      <PageHeader
        eyebrow="Chapter 04  -  Built in Kenya"
        title="A verified project portfolio"
        lede="Only technically reviewed projects with approved media rights are published. Every outcome carries its evidence type."
        meta={[
          { label: "Published projects", value: String(projects.length) },
          { label: "Counties", value: String(new Set(projects.map((p) => p.county).filter(Boolean)).size) },
          { label: "Largest system", value: capacities.length ? `${Math.max(...capacities)} m³` : " - " },
          { label: "Verification", value: "Technical review + media rights" },
        ]}
      />

      <div className="shell section">
        <ProjectExplorer
          locale={locale}
          items={projects.map((p) => ({
            slug: p.slug,
            title: p.title,
            county: p.county,
            locality: p.locality,
            clientCategory: p.clientCategory,
            plantType: p.plantType,
            capacityM3: p.capacityM3,
            feedstocks: p.feedstocks,
            applications: p.applications,
            projectStatus: p.projectStatus,
            summary: p.summary,
            theme: p.theme,
            heroImage: p.heroImage,
          }))}
        />
      </div>
    </>
  );
}
