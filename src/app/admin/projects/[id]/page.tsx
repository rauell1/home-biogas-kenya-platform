import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import ProjectForm from "@/components/admin/ProjectForm";
import { requirePermission } from "@/lib/guard";
import { can } from "@/lib/rbac";
import { setProjectWorkflowAction, approveTechnicalAction, setMediaRightsAction } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

const STATES = ["draft", "source_review", "technical_review", "media_rights_review", "content_review", "translation_review", "approved", "published", "needs_clarification", "rejected", "archived"];

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const user = await requirePermission("projects.read");
  const { id } = await params;
  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  const project = rows[0];
  if (!project) notFound();

  const values: Record<string, string> = {
    title: project.title,
    slug: project.slug,
    theme: project.theme ?? "",
    county: project.county ?? "",
    locality: project.locality ?? "",
    capacityM3: project.capacityM3 ?? "",
    completionDate: project.completionDate ?? "",
    projectStatus: project.projectStatus,
    feedstocks: project.feedstocks.join(", "),
    applications: project.applications.join(", "),
    clientCategory: project.clientCategory ?? "farm",
    plantType: project.plantType ?? "fixed_dome",
    summary: project.summary ?? "",
    challenge: project.challenge ?? "",
    siteConditions: project.siteConditions ?? "",
    feedstockAssessment: project.feedstockAssessment ?? "",
    energyDemand: project.energyDemand ?? "",
    engineeringResponse: project.engineeringResponse ?? "",
    constructionSequence: project.constructionSequence ?? "",
    gasHandling: project.gasHandling ?? "",
    applianceConnections: project.applianceConnections ?? "",
    slurryManagement: project.slurryManagement ?? "",
    commissioning: project.commissioning ?? "",
  };

  return (
    <div>
      <h1 className="display-lg">{project.title}</h1>
      <div className="mt-4 flex flex-wrap gap-3 mono-label">
        <span className="border border-ink/25 px-3 py-1">STATE: {project.workflowState}</span>
        <span className="border border-ink/25 px-3 py-1">TECHNICAL: {project.technicalReviewStatus}</span>
        <span className="border border-ink/25 px-3 py-1">MEDIA: {project.mediaRightsStatus}</span>
      </div>

      <div className="mt-6 flex flex-wrap gap-6">
        {can(user.role, "projects.write") && (
          <form action={setProjectWorkflowAction} className="flex items-end gap-2">
            <input type="hidden" name="id" value={project.id} />
            <label className="block"><span className="mono-label text-ink/50">Workflow state</span>
              <select name="state" defaultValue={project.workflowState} className="mt-1 border border-ink/25 bg-white px-3 py-2 text-sm">
                {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <button className="btn btn-primary btn-sm">Apply</button>
          </form>
        )}
        {can(user.role, "projects.approve_technical") && (
          <form action={approveTechnicalAction} className="flex items-end gap-2">
            <input type="hidden" name="id" value={project.id} />
            <label className="block"><span className="mono-label text-ink/50">Technical review</span>
              <select name="decision" defaultValue={project.technicalReviewStatus} className="mt-1 border border-ink/25 bg-white px-3 py-2 text-sm">
                {["unreviewed", "in_review", "approved", "rejected"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <button className="btn btn-primary btn-sm">Record</button>
          </form>
        )}
        {can(user.role, "media.review") && (
          <form action={setMediaRightsAction} className="flex items-end gap-2">
            <input type="hidden" name="projectId" value={project.id} />
            <input type="hidden" name="id" value="" />
            <label className="block"><span className="mono-label text-ink/50">Media rights</span>
              <select name="status" defaultValue={project.mediaRightsStatus} className="mt-1 border border-ink/25 bg-white px-3 py-2 text-sm">
                {["unknown", "company_owned", "licensed", "restricted"].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <button className="btn btn-primary btn-sm">Set</button>
          </form>
        )}
      </div>

      {can(user.role, "projects.write") ? (
        <div className="mt-10"><ProjectForm id={project.id} values={values} /></div>
      ) : (
        <p className="mt-10 mono-label text-ink/50">Read-only access.</p>
      )}
    </div>
  );
}
