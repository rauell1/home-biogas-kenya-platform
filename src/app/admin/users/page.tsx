import { desc } from "drizzle-orm";
import { db } from "@/db";
import { staffProfiles, invitations } from "@/db/schema";
import { requirePermission } from "@/lib/guard";
import { ROLES, ROLE_LABELS, ROLE_PERMISSIONS, type Role } from "@/lib/rbac";
import { revokeInvitationAction, setUserRoleAction, setUserStatusAction } from "@/app/actions/admin";
import InviteForm from "@/components/admin/InviteForm";

import AdminHeader from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  await requirePermission("users.manage");
  const users = await db.select().from(staffProfiles).orderBy(desc(staffProfiles.createdAt));
  const invites = await db.select().from(invitations).orderBy(desc(invitations.createdAt));

  return (
    <div>
      <AdminHeader eyebrow={`${users.length} accounts`} title="Staff and access" description="Public administrator sign-up is disabled. Onboarding is invitation-controlled and time-limited." />

      <div className="mt-8 max-w-xl"><InviteForm /></div>

      <h2 className="display-md mt-12">Accounts</h2>
      <table className="mt-4 w-full text-sm border-t border-ink/20">
        <thead><tr className="mono-label text-ink/50 text-left"><th className="py-3">Name</th><th>Email</th><th>Role</th><th>Status</th><th /></tr></thead>
        <tbody className="divide-y divide-ink/10">
          {users.map((u) => (
            <tr key={u.id}>
              <td className="py-3">{u.fullName}</td>
              <td className="mono-data">{u.email}</td>
              <td>
                <form action={setUserRoleAction} className="flex gap-2 items-center">
                  <input type="hidden" name="id" value={u.id} />
                  <select name="role" defaultValue={u.role} className="border border-ink/25 bg-white px-2 py-1 text-xs">
                    {ROLES.map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
                  </select>
                  <button className="mono-label border border-ink/25 px-2 py-1">Set</button>
                </form>
              </td>
              <td className="mono-data">{u.status}</td>
              <td>
                <form action={setUserStatusAction}>
                  <input type="hidden" name="id" value={u.id} />
                  <input type="hidden" name="status" value={u.status === "active" ? "disabled" : "active"} />
                  <button className="mono-label border border-ink/25 px-2 py-1">{u.status === "active" ? "Disable" : "Enable"}</button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="display-md mt-12">Invitations</h2>
      <ul className="mt-4 divide-y divide-ink/10 border-t border-ink/20">
        {invites.map((i) => {
          const state = i.acceptedAt ? "accepted" : i.revokedAt ? "revoked" : i.expiresAt < new Date() ? "expired" : "pending";
          return (
            <li key={i.id} className="py-3 flex flex-wrap gap-3 justify-between text-sm">
              <span className="mono-data">{i.email} · {i.role} · {state}</span>
              {state === "pending" && (
                <form action={revokeInvitationAction}>
                  <input type="hidden" name="id" value={i.id} />
                  <button className="mono-label border border-oxide text-oxide px-2 py-1">Revoke</button>
                </form>
              )}
            </li>
          );
        })}
        {invites.length === 0 && <li className="py-4 text-ink/50 text-sm">No invitations issued.</li>}
      </ul>

      <h2 className="display-md mt-12">Role permissions</h2>
      <ul className="mt-4 space-y-3 text-sm">
        {ROLES.map((r) => (
          <li key={r} className="border-b border-ink/10 pb-2">
            <span className="display-md">{ROLE_LABELS[r as Role]}</span>
            <p className="mono-label text-ink/50 mt-1">{ROLE_PERMISSIONS[r as Role].join(" · ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
