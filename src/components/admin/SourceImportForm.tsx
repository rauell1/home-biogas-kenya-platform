"use client";

import { useActionState } from "react";
import { importSourceAction, type FormState } from "@/app/actions/admin";

export default function SourceImportForm() {
  const [state, action, pending] = useActionState(importSourceAction, {} as FormState);
  return (
    <form action={action} className="space-y-4 border border-ink/20 p-5 bg-bone">
      {state?.error && <p role="alert" className="border-l-4 border-oxide bg-oxide/10 p-3 text-sm">{state.error}</p>}
      {state?.ok && <p role="status" className="border-l-4 border-olive bg-olive/10 p-3 text-sm">{state.ok}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mono-label text-ink/60">Platform</span>
          <select name="platform" className="mt-1 w-full border border-ink/25 bg-white px-3 py-2">
            {["linkedin", "facebook", "youtube", "website", "internal_document", "partner", "press"].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="mono-label text-ink/60">Source URL</span>
          <input name="sourceUrl" type="url" required className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" />
        </label>
      </div>
      <label className="block">
        <span className="mono-label text-ink/60">Title</span>
        <input name="title" className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" />
      </label>
      <label className="block">
        <span className="mono-label text-ink/60">Original post text (retained internally)</span>
        <textarea name="rawText" rows={5} required className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" />
      </label>
      <button disabled={pending} className="bg-ink text-bone px-5 py-2 text-sm disabled:opacity-50">
        {pending ? "Importing…" : "Import for review"}
      </button>
    </form>
  );
}
