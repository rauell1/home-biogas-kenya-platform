import { getPublishedProjects } from "@/lib/queries";
import { ALL_SERVICES } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://homebiogas.co.ke";
  const projects = await getPublishedProjects().catch(() => []);

  const markdown = `# Home Biogas Kenya

> Home Biogas Kenya designs, constructs, commissions and maintains closed-loop anaerobic digester systems and organic-waste management solutions for homes, farms, institutions and commercial facilities in East Africa.

## Core Capabilities & Engineering Specifications

- **Plant Sizing Range**: 4 m³ to 64+ m³ fixed-dome masonry and flexible PVC/TPU systems.
- **Primary Feedstocks**: Cattle manure, pig slurry, poultry litter, kitchen food waste, slaughterhouse effluent, and sanitation waste.
- **Energy Applications**: Household cooking, institutional bulk cooking, water heating, biogas generators (electricity), chick brooding, and converted mechanical engines.
- **By-Product Recovery**: Enriched organic bio-slurry fertilizer (nitrogen, phosphorus, potassium).
- **Service Standard**: Site survey, feasibility study, turn-key construction, commissioning, and operator training with guaranteed 2-working-day response time.

## Key Engineering Solutions

${ALL_SERVICES.slice(0, 10).map((s) => `- [${s.name}](${baseUrl}/en/solutions/${s.slug}): ${s.summary}`).join("\n")}

## Verified Published Projects

${projects.map((p) => `- [${p.title}](${baseUrl}/en/projects/${p.slug}): ${p.capacityM3 ? `${p.capacityM3} m³` : "Feasibility Study"} ${p.plantType} digester in ${p.locality || p.county}. Feedstock: ${p.feedstocks.join(", ")}`).join("\n")}

## Platform API & Inquiry Endpoints

- **Request Site Assessment**: [${baseUrl}/en/request-assessment](${baseUrl}/en/request-assessment)
- **Solution Configurator**: [${baseUrl}/en/tools/solution-configurator](${baseUrl}/en/tools/solution-configurator)
- **Feedstock Checker**: [${baseUrl}/en/tools/feedstock-checker](${baseUrl}/en/tools/feedstock-checker)
- **Privacy Policy**: [${baseUrl}/en/privacy-policy](${baseUrl}/en/privacy-policy)
- **Cookie Policy**: [${baseUrl}/en/cookie-policy](${baseUrl}/en/cookie-policy)
- **Full LLM Context**: [${baseUrl}/llms-full.txt](${baseUrl}/llms-full.txt)
`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
