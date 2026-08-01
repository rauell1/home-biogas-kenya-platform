"use client";

import { useActionState } from "react";
import type { ActionState } from "@/app/actions/auth";

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  hidden?: boolean;
  value?: string;
  placeholder?: string;
  autoComplete?: string;
};

export default function AuthForm({
  action,
  fields,
  submitLabel,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  fields: Field[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {} as ActionState);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <p role="alert" className="border-l-4 border-oxide bg-oxide/15 p-3 text-sm">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p role="status" className="border-l-4 border-olive bg-olive/15 p-3 text-sm">
          {state.ok}
        </p>
      )}
      {fields.map((f) =>
        f.hidden ? (
          <input key={f.name} type="hidden" name={f.name} value={f.value} />
        ) : (
          <label key={f.name} className="block">
            <span className="block font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-bone/70">
              {f.label}
            </span>
            <input
              name={f.name}
              type={f.type ?? "text"}
              required={f.required}
              placeholder={f.placeholder}
              autoComplete={f.autoComplete ?? "on"}
              className="mt-2 w-full border border-bone/30 bg-bone/5 px-3.5 py-3 text-bone caret-methane placeholder:text-bone/35 transition-colors hover:border-bone/50 focus:border-methane focus:outline-none focus:ring-2 focus:ring-methane/25"
            />
          </label>
        ),
      )}
      <button type="submit" disabled={pending} className="btn btn-accent w-full disabled:opacity-50">
        {pending ? "Working..." : submitLabel}
      </button>
    </form>
  );
}
