import AuthForm from "@/components/AuthForm";
import { requestPasswordResetAction } from "@/app/actions/auth";

export default function ForgotPassword() {
  return (
    <div>
      <p className="chapter-marker text-methane">Account recovery</p>
      <h1 className="display-lg mt-3 mb-8">Reset your password</h1>
      <AuthForm
        action={requestPasswordResetAction}
        submitLabel="Send reset link"
        fields={[
          {
            name: "email",
            label: "Email address",
            type: "email",
            required: true,
            placeholder: "you@example.com",
            autoComplete: "email",
          },
        ]}
      />
    </div>
  );
}
