import "server-only";
import { cookies, headers } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual, createHash } from "crypto";
import { eq, and, gt } from "drizzle-orm";
import { db } from "@/db";
import { staffProfiles, sessions, loginEvents, auditLogs } from "@/db/schema";

const SESSION_COOKIE = "hbk_session";
const SESSION_TTL_HOURS = 12;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${derived}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [, salt, hash] = stored.split(":");
    const derived = scryptSync(password, salt, 64);
    const expected = Buffer.from(hash, "hex");
    return derived.length === expected.length && timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function newToken(): string {
  return randomBytes(32).toString("base64url");
}

export type SessionUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
};

export async function createSession(userId: string) {
  const id = newToken();
  const expiresAt = new Date(Date.now() + SESSION_TTL_HOURS * 3600 * 1000);
  await db.insert(sessions).values({ id: hashToken(id), userId, expiresAt });
  const store = await cookies();
  store.set(SESSION_COOKIE, id, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (raw) await db.delete(sessions).where(eq(sessions.id, hashToken(raw)));
  store.delete(SESSION_COOKIE);
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const rows = await db
    .select({
      id: staffProfiles.id,
      email: staffProfiles.email,
      fullName: staffProfiles.fullName,
      role: staffProfiles.role,
      status: staffProfiles.status,
    })
    .from(sessions)
    .innerJoin(staffProfiles, eq(sessions.userId, staffProfiles.id))
    .where(and(eq(sessions.id, hashToken(raw)), gt(sessions.expiresAt, new Date())))
    .limit(1);
  const user = rows[0];
  if (!user || user.status !== "active") return null;
  return { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
}

export async function recordLogin(email: string, success: boolean, userId?: string) {
  const h = await headers();
  await db.insert(loginEvents).values({
    email,
    userId: userId ?? null,
    success,
    ip: h.get("x-forwarded-for") ?? null,
    userAgent: h.get("user-agent") ?? null,
  });
}

export async function audit(
  actor: SessionUser | null,
  action: string,
  entityType?: string,
  entityId?: string,
  metadata?: unknown,
) {
  await db.insert(auditLogs).values({
    actorId: actor?.id ?? null,
    actorEmail: actor?.email ?? "system",
    action,
    entityType: entityType ?? null,
    entityId: entityId ?? null,
    metadata: (metadata ?? null) as never,
  });
}
