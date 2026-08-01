"use client";

import { useActionState } from "react";
import { inviteStaffAction, type FormState } from "@/app/actions/admin";
import { ROLES, ROLE_LABELS } from "@/lib/rbac";

export default function InviteForm() {
  const [state, action, pending] = useActionState(inviteStaffAction, {} as FormState);
  return (
    <form action={action} className="border border-ink/20 p-5 bg-bone space-y-4">
      {state?.error && <p role="alert" className="border-l-4 border-oxide bg-oxide/10 p-3 text-sm">{state.error}</p>}
      {state?.ok && <p role="status" className="border-l-4 border-olive bg-olive/10 p-3 text-sm break-all">{state.ok}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mono-label text-ink/60">Email</span>
          <input name="email" type="email" required className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" />
        </label>
        <label className="block">
          <span className="mono-label text-ink/60">Role</span>
          <select name="role" className="mt-1 w-full border border-ink/25 bg-white px-3 py-2">
            {ROLES.map((r) => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
          </select>
        </label>
      </div>
      <button disabled={pending} className="bg-ink text-bone px-5 py-2 text-sm disabled:opacity-50">
        {pending ? "Creating…" : "Create invitation"}
      </button>
    </form>
  );
}
