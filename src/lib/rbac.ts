export const ROLES = [
  "super_admin",
  "administrator",
  "project_manager",
  "technical_reviewer",
  "content_editor",
  "translator",
  "sales_officer",
  "viewer",
] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  administrator: "Administrator",
  project_manager: "Project Manager",
  technical_reviewer: "Technical Reviewer",
  content_editor: "Content Editor",
  translator: "Translator",
  sales_officer: "Sales Officer",
  viewer: "Viewer",
};

export const PERMISSIONS = [
  "projects.read",
  "projects.write",
  "projects.approve_technical",
  "projects.publish",
  "media.review",
  "sources.review",
  "leads.read",
  "leads.write",
  "surveys.write",
  "content.write",
  "translations.write",
  "users.manage",
  "audit.read",
  "settings.manage",
] as const;

export type Permission = (typeof PERMISSIONS)[number];

const base: Permission[] = ["projects.read", "leads.read"];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: [...PERMISSIONS],
  administrator: [
    ...base,
    "projects.write",
    "projects.publish",
    "media.review",
    "sources.review",
    "leads.write",
    "surveys.write",
    "content.write",
    "translations.write",
    "audit.read",
    "settings.manage",
  ],
  project_manager: [...base, "projects.write", "media.review", "surveys.write"],
  technical_reviewer: [...base, "projects.approve_technical", "sources.review"],
  content_editor: [...base, "content.write", "projects.write"],
  translator: [...base, "translations.write"],
  sales_officer: [...base, "leads.write", "surveys.write"],
  viewer: [...base],
};

export function can(role: string | undefined, permission: Permission): boolean {
  if (!role) return false;
  const perms = ROLE_PERMISSIONS[role as Role];
  return !!perms && perms.includes(permission);
}
