"use server";

import { redirect } from "next/navigation";
import { count, eq, and, isNull, gt } from "drizzle-orm";
import { db } from "@/db";
import { staffProfiles, invitations } from "@/db/schema";
import {
  audit,
  createSession,
  destroySession,
  getCurrentUser,
  hashPassword,
  hashToken,
  recordLogin,
  verifyPassword,
} from "@/lib/legacy-auth";
import { rateLimit } from "@/lib/rate-limit";
import { getBootstrapState, bootstrapEmailAllowed } from "@/lib/bootstrap";

export type ActionState = { error?: string; ok?: string };

export async function signInAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Email and password are required." };

  const limited = rateLimit(`signin:${email}`, 8, 10 * 60 * 1000);
  if (!limited.ok) return { error: "Too many attempts. Try again shortly." };

  const rows = await db.select().from(staffProfiles).where(eq(staffProfiles.email, email)).limit(1);
  const user = rows[0];
  if (!user || user.status !== "active" || !verifyPassword(password, user.passwordHash)) {
    await recordLogin(email, false, user?.id);
    return { error: "Invalid credentials or disabled account." };
  }
  await recordLogin(email, true, user.id);
  await createSession(user.id);
  await audit({ id: user.id, email: user.email, fullName: user.fullName, role: user.role }, "auth.sign_in");
  redirect("/admin/dashboard");
}

export async function signOutAction() {
  const user = await getCurrentUser();
  await audit(user, "auth.sign_out");
  await destroySession();
  redirect("/auth/sign-in");
}

export async function bootstrapAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const state = await getBootstrapState();
  if (!state.available) return { error: "Setup has already been completed or is disabled." };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();

  if (!bootstrapEmailAllowed(email, state.expectedEmail)) {
    return { error: "This email is not the configured bootstrap address." };
  }
  if (password.length < 12) return { error: "Password must be at least 12 characters." };

  // Re-check inside the action to close any race between render and submit.
  const [{ value }] = await db.select({ value: count() }).from(staffProfiles);
  if (value > 0) return { error: "Setup has already been completed." };

  const [user] = await db
    .insert(staffProfiles)
    .values({
      email,
      fullName: fullName || "Super Admin",
      passwordHash: hashPassword(password),
      role: "super_admin",
      emailVerifiedAt: new Date(),
    })
    .returning();
  await audit({ id: user.id, email, fullName: user.fullName, role: user.role }, "auth.bootstrap_completed");
  await createSession(user.id);
  redirect("/admin/dashboard");
}

export async function acceptInvitationAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("fullName") ?? "").trim();
  if (password.length < 12) return { error: "Password must be at least 12 characters." };

  const rows = await db
    .select()
    .from(invitations)
    .where(
      and(
        eq(invitations.tokenHash, hashToken(token)),
        isNull(invitations.acceptedAt),
        isNull(invitations.revokedAt),
        gt(invitations.expiresAt, new Date()),
      ),
    )
    .limit(1);
  const invite = rows[0];
  if (!invite) return { error: "This invitation is invalid, revoked or expired." };

  const existing = await db.select().from(staffProfiles).where(eq(staffProfiles.email, invite.email)).limit(1);
  if (existing[0]) return { error: "An account already exists for this email." };

  const [user] = await db
    .insert(staffProfiles)
    .values({
      email: invite.email,
      fullName: fullName || invite.email,
      passwordHash: hashPassword(password),
      role: invite.role,
      emailVerifiedAt: new Date(),
    })
    .returning();
  await db.update(invitations).set({ acceptedAt: new Date() }).where(eq(invitations.id, invite.id));
  await audit({ id: user.id, email: user.email, fullName: user.fullName, role: user.role }, "auth.invitation_accepted", "invitation", invite.id);
  await createSession(user.id);
  redirect("/admin/dashboard");
}

export async function requestPasswordResetAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const limited = rateLimit(`reset:${email}`, 3, 15 * 60 * 1000);
  if (!limited.ok) return { error: "Too many requests. Try again later." };
  await audit(null, "auth.password_reset_requested", "staff_profile", undefined, { email });
  return { ok: "If that account exists, a reset link has been sent to the registered address." };
}
