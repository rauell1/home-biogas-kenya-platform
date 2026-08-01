import { and, eq, gt, isNull } from "drizzle-orm";
import { db } from "@/db";
import { invitations } from "@/db/schema";
import { hashToken } from "@/lib/auth";
import AuthForm from "@/components/AuthForm";
import { acceptInvitationAction } from "@/app/actions/auth";
import { ROLE_LABELS, type Role } from "@/lib/rbac";

export const dynamic = "force-dynamic";

export default async function InvitePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
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

  if (!invite) {
    return (
      <div>
        <p className="chapter-marker text-oxide">Invitation</p>
        <h1 className="display-lg mt-3">This invitation is no longer valid</h1>
        <p className="mt-4 text-bone/70 text-sm">It may have expired, been revoked or already been used.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="chapter-marker text-methane">Invitation · {ROLE_LABELS[invite.role as Role] ?? invite.role}</p>
      <h1 className="display-lg mt-3 mb-2">Create your staff account</h1>
      <p className="mono-label text-bone/60 mb-8">{invite.email}</p>
      <AuthForm
        action={acceptInvitationAction}
        submitLabel="Activate account"
        fields={[
          { name: "token", label: "token", hidden: true, value: token },
          {
            name: "fullName",
            label: "Full name",
            required: true,
            placeholder: "Your full name",
            autoComplete: "name",
          },
          {
            name: "password",
            label: "Password (min 12 characters)",
            type: "password",
            required: true,
            placeholder: "Create a secure password",
            autoComplete: "new-password",
          },
        ]}
      />
    </div>
  );
}
