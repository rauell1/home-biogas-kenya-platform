import "server-only";
import { count } from "drizzle-orm";
import { db } from "@/db";
import { staffProfiles } from "@/db/schema";

/**
 * First-run setup.
 *
 * The window is open only while zero staff accounts exist, and it closes
 * permanently the moment the first account is created. If ADMIN_BOOTSTRAP_EMAIL
 * is configured, only that address may claim the super-admin account.
 * ADMIN_BOOTSTRAP_ENABLED=false hard-disables the window even on an empty
 * database, for environments that provision accounts another way.
 */
export async function getBootstrapState() {
  const [{ value }] = await db.select({ value: count() }).from(staffProfiles);
  const hasAccounts = value > 0;
  const hardDisabled = process.env.ADMIN_BOOTSTRAP_ENABLED === "false";
  const expectedEmail = (process.env.ADMIN_BOOTSTRAP_EMAIL ?? "").trim().toLowerCase();

  return {
    accountCount: value,
    available: !hasAccounts && !hardDisabled,
    expectedEmail: expectedEmail || null,
  };
}

export function bootstrapEmailAllowed(email: string, expectedEmail: string | null): boolean {
  if (!expectedEmail) return true;
  return email.trim().toLowerCase() === expectedEmail;
}
