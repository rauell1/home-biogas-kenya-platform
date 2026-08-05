import { cache } from "react";
import { and, desc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

export type ProjectRow = typeof projects.$inferSelect;

export const getPublishedProjects = cache(async (): Promise<ProjectRow[]> => {
  return db
    .select()
    .from(projects)
    .where(and(eq(projects.workflowState, "published"), isNotNull(projects.publishedAt)))
    .orderBy(desc(projects.publishedAt));
});

export const getPublishedProject = cache(async (slug: string): Promise<ProjectRow | null> => {
  const rows = await db
    .select()
    .from(projects)
    .where(and(eq(projects.slug, slug), eq(projects.workflowState, "published")))
    .limit(1);
  return rows[0] ?? null;
});
