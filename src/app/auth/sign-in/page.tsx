import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import { signInAction, bootstrapAction } from "@/app/actions/auth";
import { getBootstrapState } from "@/lib/bootstrap";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const bootstrap = await getBootstrapState();

  if (bootstrap.available) {
    return (
      <div>
        <p className="chapter-marker text-safety">First-run setup</p>
        <h1 className="display-lg mt-4 mb-3">Create the super-admin account</h1>
        <p className="text-sm text-bone/60 mb-8">
          No staff accounts exist yet. This one-time window closes permanently once the first account is created; all
          further access is by invitation only.
        </p>
        <AuthForm
          action={bootstrapAction}
          submitLabel="Complete setup"
          fields={[
            {
              name: "fullName",
              label: "Full name",
              required: true,
              placeholder: "Your full name",
              autoComplete: "name",
            },
            {
              name: "email",
              label: bootstrap.expectedEmail ? `Bootstrap email (${bootstrap.expectedEmail})` : "Email",
              type: "email",
              required: true,
              placeholder: "you@example.com",
              autoComplete: "email",
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

  return (
    <div>
      <p className="chapter-marker text-methane">Staff access</p>
      <h1 className="display-lg mt-4 mb-8">Sign in</h1>
      <AuthForm
        action={signInAction}
        submitLabel="Sign in"
        fields={[
          {
            name: "email",
            label: "Email address",
            type: "email",
            required: true,
            placeholder: "you@example.com",
            autoComplete: "email",
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            required: true,
            placeholder: "Enter your password",
            autoComplete: "current-password",
          },
        ]}
      />
      <p className="mt-8 text-sm text-bone/55">
        <Link href="/auth/forgot-password" className="link-quiet hover:text-methane">
          Forgot password
        </Link>{" "}
        · Access to this platform is invitation-only.
      </p>
    </div>
  );
}
