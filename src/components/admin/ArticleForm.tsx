"use client";

import { useActionState } from "react";
import { saveArticleAction, type FormState } from "@/app/actions/admin";

export default function ArticleForm() {
  const [state, action, pending] = useActionState(saveArticleAction, {} as FormState);
  return (
    <form action={action} className="space-y-4 border border-ink/20 p-5 bg-bone">
      {state?.error && <p role="alert" className="border-l-4 border-oxide bg-oxide/10 p-3 text-sm">{state.error}</p>}
      {state?.ok && <p role="status" className="border-l-4 border-olive bg-olive/10 p-3 text-sm">{state.ok}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block"><span className="mono-label text-ink/60">Title</span>
          <input name="title" required className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" /></label>
        <label className="block"><span className="mono-label text-ink/60">Slug</span>
          <input name="slug" required className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" /></label>
      </div>
      <label className="block"><span className="mono-label text-ink/60">Excerpt</span>
        <input name="excerpt" className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" /></label>
      <label className="block"><span className="mono-label text-ink/60">Body</span>
        <textarea name="body" rows={6} className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" /></label>
      <label className="block"><span className="mono-label text-ink/60">Workflow state</span>
        <select name="workflowState" className="mt-1 border border-ink/25 bg-white px-3 py-2 text-sm">
          {["draft", "content_review", "translation_review", "approved", "published", "archived"].map((s) => <option key={s} value={s}>{s}</option>)}
        </select></label>
      <button disabled={pending} className="bg-ink text-bone px-5 py-2 text-sm disabled:opacity-50">{pending ? "Saving…" : "Save article"}</button>
    </form>
  );
}
