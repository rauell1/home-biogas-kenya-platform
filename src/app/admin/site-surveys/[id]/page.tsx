import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { siteSurveys } from "@/db/schema";
import { requirePermission } from "@/lib/guard";

export const dynamic = "force-dynamic";

const CHECKLIST = {
  Feedstock: ["Type", "Source", "Quantity", "Seasonal variation", "Contamination", "Existing handling", "Water-mixing requirements"],
  Site: ["Proposed location", "Available dimensions", "Ground slope", "Soil", "Water table", "Flood risk", "Trees", "Buildings", "Accessibility", "Distance to waste", "Distance to point of use"],
  Energy: ["Cooking", "Baking", "Heating", "Brooding", "Lighting", "Electricity", "Machinery", "Current fuel use", "Monthly fuel expenditure"],
  "Slurry and effluent": ["Storage", "Crop use", "Drainage", "Transportation", "Environmental risks"],
  Recommendation: ["Proposed technology", "Preliminary capacity range", "Additional tests", "Client responsibilities", "Required permits", "Next action"],
};

export default async function SurveyDetail({ params }: { params: Promise<{ id: string }> }) {
  await requirePermission("leads.read");
  const { id } = await params;
  const rows = await db.select().from(siteSurveys).where(eq(siteSurveys.id, id)).limit(1);
  const survey = rows[0];
  if (!survey) notFound();

  return (
    <div className="max-w-4xl">
      <p className="mono-label text-clay-text">Site survey</p>
      <h1 className="display-lg mt-1">{survey.clientName}</h1>
      <p className="mono-label text-ink/50 mt-2">Engineer: {survey.engineer ?? "unassigned"} · status {survey.status}</p>
      {Object.entries(CHECKLIST).map(([section, fields]) => (
        <section key={section} className="mt-8">
          <h2 className="mono-label text-ink/50 border-b border-ink/15 pb-2">{section}</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">
            {fields.map((f) => (
              <li key={f} className="flex justify-between border-b border-ink/5 py-1">
                <span>{f}</span>
                <span className="mono-data text-ink/40">pending capture</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
