"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { projects, projectMedia, sourceRecords, leads, leadActivities, invitations, staffProfiles, siteSurveys, articles } from "@/db/schema";
import { assertPermission } from "@/lib/guard";
import { audit, hashToken, newToken } from "@/lib/auth";
import { ROLES } from "@/lib/rbac";
import { sendMail } from "@/lib/email";

export type FormState = { error?: string; ok?: string };

const listField = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const projectSchema = z.object({
  title: z.string().trim().min(3),
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens."),
  theme: z.string().trim().max(160).optional(),
  county: z.string().trim().max(80).optional(),
  locality: z.string().trim().max(120).optional(),
  clientCategory: z.enum(["domestic", "farm", "institutional", "commercial"]),
  plantType: z.enum(["fixed_dome", "flexible_pvc", "wastewater", "study"]),
  capacityM3: z.string().optional(),
  completionDate: z.string().optional(),
  projectStatus: z.string().default("completed"),
  summary: z.string().trim().max(600).optional(),
  challenge: z.string().optional(),
  siteConditions: z.string().optional(),
  feedstockAssessment: z.string().optional(),
  energyDemand: z.string().optional(),
  engineeringResponse: z.string().optional(),
  constructionSequence: z.string().optional(),
  gasHandling: z.string().optional(),
  applianceConnections: z.string().optional(),
  slurryManagement: z.string().optional(),
  commissioning: z.string().optional(),
});

export async function saveProjectAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await assertPermission("projects.write");
  const id = String(formData.get("id") ?? "");
  const parsed = projectSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" · ") };
  }
  const values = {
    ...parsed.data,
    capacityM3: parsed.data.capacityM3 ? parsed.data.capacityM3 : null,
    feedstocks: listField(formData.get("feedstocks")),
    applications: listField(formData.get("applications")),
    updatedAt: new Date(),
  };

  if (id) {
    await db.update(projects).set(values).where(eq(projects.id, id));
    await audit(user, "project.updated", "project", id);
  } else {
    const [row] = await db.insert(projects).values(values).returning();
    await audit(user, "project.created", "project", row.id);
    redirect(`/admin/projects/${row.id}`);
  }
  revalidatePath("/admin/projects");
  return { ok: "Saved." };
}

export async function setProjectWorkflowAction(formData: FormData): Promise<void> {
  const target = String(formData.get("state"));
  const id = String(formData.get("id"));
  const permission = target === "published" ? "projects.publish" : target === "technical_review" ? "projects.approve_technical" : "projects.write";
  const user = await assertPermission(permission);

  const rows = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  const project = rows[0];
  if (!project) throw new Error("Project not found");

  if (target === "published") {
    if (project.technicalReviewStatus !== "approved") throw new Error("Technical review must be approved before publication.");
    if (project.mediaRightsStatus !== "company_owned" && project.mediaRightsStatus !== "licensed") {
      throw new Error("Media rights must be cleared before publication.");
    }
  }

  await db
    .update(projects)
    .set({ workflowState: target, publishedAt: target === "published" ? new Date() : null, updatedAt: new Date() })
    .where(eq(projects.id, id));
  await audit(user, `project.workflow.${target}`, "project", id);
  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
}

export async function approveTechnicalAction(formData: FormData): Promise<void> {
  const user = await assertPermission("projects.approve_technical");
  const id = String(formData.get("id"));
  const decision = String(formData.get("decision"));
  await db.update(projects).set({ technicalReviewStatus: decision, updatedAt: new Date() }).where(eq(projects.id, id));
  await audit(user, `project.technical_review.${decision}`, "project", id);
  revalidatePath("/admin/approvals");
  revalidatePath(`/admin/projects/${id}`);
}

export async function setMediaRightsAction(formData: FormData): Promise<void> {
  const user = await assertPermission("media.review");
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const projectId = String(formData.get("projectId") ?? "");
  if (id) {
    await db.update(projectMedia).set({ rightsStatus: status }).where(eq(projectMedia.id, id));
  }
  if (projectId) {
    await db.update(projects).set({ mediaRightsStatus: status, updatedAt: new Date() }).where(eq(projects.id, projectId));
  }
  await audit(user, `media.rights.${status}`, "project_media", id || projectId);
  revalidatePath("/admin/media");
}

export async function reviewSourceAction(formData: FormData): Promise<void> {
  const user = await assertPermission("sources.review");
  const id = String(formData.get("id"));
  const reviewStatus = String(formData.get("reviewStatus"));
  const companyIdentityStatus = String(formData.get("companyIdentityStatus"));
  await db.update(sourceRecords).set({ reviewStatus, companyIdentityStatus }).where(eq(sourceRecords.id, id));
  await audit(user, `source.review.${reviewStatus}`, "source_record", id);
  revalidatePath("/admin/source-records");
}

export async function importSourceAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await assertPermission("sources.review");
  const schema = z.object({
    platform: z.enum(["linkedin", "facebook", "youtube", "website", "internal_document", "partner", "press"]),
    sourceUrl: z.string().url(),
    title: z.string().optional(),
    rawText: z.string().min(10),
  });
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: "Provide a valid source URL and the original post text." };

  const text = parsed.data.rawText;
  const capacity = /(\d+(?:\.\d+)?)\s*m(?:3|³)/i.exec(text)?.[1];
  const feedstockWords = ["cow", "pig", "poultry", "food", "human", "market", "slaughterhouse", "wastewater"];
  const applicationWords = ["cooking", "baking", "brooding", "lighting", "electricity", "heating", "pumping"];

  const [row] = await db
    .insert(sourceRecords)
    .values({
      platform: parsed.data.platform,
      sourceUrl: parsed.data.sourceUrl,
      title: parsed.data.title ?? null,
      rawText: text,
      possibleCapacityM3: capacity ?? null,
      possibleFeedstocks: feedstockWords.filter((w) => text.toLowerCase().includes(w)),
      possibleApplications: applicationWords.filter((w) => text.toLowerCase().includes(w)),
      confidenceScore: String(capacity ? 0.6 : 0.3),
    })
    .returning();
  await audit(user, "source.imported", "source_record", row.id);
  revalidatePath("/admin/source-records");
  return { ok: "Imported for review. Nothing is published automatically." };
}

export async function updateLeadAction(formData: FormData): Promise<void> {
  const user = await assertPermission("leads.write");
  const id = String(formData.get("id"));
  const stage = formData.get("stage");
  const assignedTo = formData.get("assignedTo");
  const patch: Record<string, unknown> = {};
  if (stage) patch.stage = String(stage);
  if (assignedTo !== null) patch.assignedTo = String(assignedTo) || null;
  if (Object.keys(patch).length > 0) {
    await db.update(leads).set(patch).where(eq(leads.id, id));
  }
  await audit(user, "lead.updated", "lead", id, patch);
  revalidatePath(`/admin/leads/${id}`);
}

export async function addLeadActivityAction(formData: FormData): Promise<void> {
  const user = await assertPermission("leads.write");
  const id = String(formData.get("id"));
  const type = String(formData.get("type") || "note");
  const body = String(formData.get("body") || "").slice(0, 4000);
  if (!body) return;
  await db.insert(leadActivities).values({ leadId: id, type, body, actorEmail: user.email });
  await audit(user, "lead.activity_added", "lead", id, { type });
  revalidatePath(`/admin/leads/${id}`);
}

export async function createSurveyAction(formData: FormData): Promise<void> {
  const user = await assertPermission("surveys.write");
  const leadId = String(formData.get("leadId"));
  const clientName = String(formData.get("clientName") || "Client");
  const [row] = await db.insert(siteSurveys).values({ leadId, clientName, engineer: user.fullName }).returning();
  await db.update(leads).set({ stage: "SITE SURVEY SCHEDULED" }).where(eq(leads.id, leadId));
  await audit(user, "survey.created", "site_survey", row.id);
  revalidatePath("/admin/site-surveys");
  redirect(`/admin/site-surveys/${row.id}`);
}

export async function inviteStaffAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await assertPermission("users.manage");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = String(formData.get("role") ?? "viewer");
  if (!z.string().email().safeParse(email).success) return { error: "Enter a valid email address." };
  if (!(ROLES as readonly string[]).includes(role)) return { error: "Unknown role." };

  const token = newToken();
  const [row] = await db
    .insert(invitations)
    .values({
      email,
      role,
      tokenHash: hashToken(token),
      invitedBy: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 3600 * 1000),
    })
    .returning();
  const link = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/auth/invite/${token}`;
  await sendMail({ to: email, subject: "Home Biogas Kenya  -  staff invitation", text: `You have been invited as ${role}. Accept within 7 days: ${link}` });
  await audit(user, "invitation.created", "invitation", row.id, { email, role });
  revalidatePath("/admin/users");
  return { ok: `Invitation created. Link: ${link}` };
}

export async function revokeInvitationAction(formData: FormData): Promise<void> {
  const user = await assertPermission("users.manage");
  const id = String(formData.get("id"));
  await db.update(invitations).set({ revokedAt: new Date() }).where(eq(invitations.id, id));
  await audit(user, "invitation.revoked", "invitation", id);
  revalidatePath("/admin/users");
}

export async function setUserStatusAction(formData: FormData): Promise<void> {
  const user = await assertPermission("users.manage");
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  await db.update(staffProfiles).set({ status }).where(eq(staffProfiles.id, id));
  await audit(user, `user.${status}`, "staff_profile", id);
  revalidatePath("/admin/users");
}

export async function setUserRoleAction(formData: FormData): Promise<void> {
  const user = await assertPermission("users.manage");
  const id = String(formData.get("id"));
  const role = String(formData.get("role"));
  if (!(ROLES as readonly string[]).includes(role)) throw new Error("Unknown role");
  await db.update(staffProfiles).set({ role }).where(eq(staffProfiles.id, id));
  await audit(user, "user.role_changed", "staff_profile", id, { role });
  revalidatePath("/admin/users");
}

export async function saveArticleAction(_prev: FormState, formData: FormData): Promise<FormState> {
  const user = await assertPermission("content.write");
  const schema = z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string().min(3),
    excerpt: z.string().optional(),
    body: z.string().optional(),
    workflowState: z.string().default("draft"),
  });
  const parsed = schema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) return { error: "Check the slug and title." };
  const id = formData.get("id");
  const values = {
    ...parsed.data,
    publishedAt: parsed.data.workflowState === "published" ? new Date() : null,
  };
  if (id) await db.update(articles).set(values).where(eq(articles.id, Number(id)));
  else await db.insert(articles).values(values);
  await audit(user, "article.saved", "article", String(id ?? parsed.data.slug));
  revalidatePath("/admin/articles");
  return { ok: "Saved." };
}
