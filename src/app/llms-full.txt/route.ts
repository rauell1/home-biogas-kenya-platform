import { getPublishedProjects } from "@/lib/queries";
import { ALL_SERVICES, APPLICATIONS } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://homebiogas.co.ke";
  const projects = await getPublishedProjects().catch(() => []);

  const markdown = `# Home Biogas Kenya - Comprehensive Platform Knowledge Base

> Engineering-led renewable energy and organic-waste management solutions in East Africa.

## 1. System Architecture & Process Chain

1. **FEED**: Organic waste collection (manure, food waste, crop residues, sanitation flow).
2. **ANAEROBIC DIGESTION**: Closed-loop fixed-dome or flexible membrane vessel. Microorganisms break down organic matter in an oxygen-free environment.
3. **GAS HANDLING**: H2S scrubbing, moisture condensation traps, pressure regulation, and manometer monitoring.
4. **ENERGY APPLICATION**: Biogas utilization in thermal cookers, water heaters, baking ovens, brooders, and modified generator engines.
5. **BIO-SLURRY RECOVERY**: Digested nutrient overflow for crop application and soil enrichment.

## 2. All Engineering Solutions

${ALL_SERVICES.map(
    (s) => `### ${s.name} (${s.category})
- Slug: ${s.slug}
- URL: ${baseUrl}/en/solutions/${s.slug}
- Summary: ${s.summary}
`
  ).join("\n")}

## 3. Productive End Uses & Applications

${APPLICATIONS.map(
    (a) => `### ${a.name}
- Slug: ${a.slug}
- Use Case: ${a.use}
- Requirement: ${a.requirement}
- Reference Project: ${a.projectSlug}
`
  ).join("\n")}

## 4. Published Case Studies & Evidence Logs

${projects.map(
    (p) => `### Case Study: ${p.title}
- Location: ${[p.locality, p.county].filter(Boolean).join(", ")}
- Capacity: ${p.capacityM3 ? `${p.capacityM3} m³` : "N/A"}
- Plant Type: ${p.plantType}
- Status: ${p.projectStatus}
- Summary: ${p.summary}
- Challenge: ${p.challenge}
- Site Conditions: ${p.siteConditions}
- Feedstock Assessment: ${p.feedstockAssessment}
- Energy Demand: ${p.energyDemand}
- Engineering Response: ${p.engineeringResponse}
- Gas Handling: ${p.gasHandling}
- Slurry Management: ${p.slurryManagement}
- URL: ${baseUrl}/en/projects/${p.slug}
`
  ).join("\n")}
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
