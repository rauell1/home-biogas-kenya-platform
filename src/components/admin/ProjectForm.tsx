"use client";

import { useActionState } from "react";
import { saveProjectAction, type FormState } from "@/app/actions/admin";

export type ProjectFormValues = Record<string, string>;

const TEXT_FIELDS = [
  ["title", "Title"],
  ["slug", "Slug"],
  ["theme", "Art-direction theme"],
  ["county", "County"],
  ["locality", "Locality"],
  ["capacityM3", "Capacity (m³)"],
  ["completionDate", "Completion date"],
  ["projectStatus", "Project status"],
  ["feedstocks", "Feedstocks (comma separated)"],
  ["applications", "Applications (comma separated)"],
] as const;

const LONG_FIELDS = [
  ["summary", "Summary"],
  ["challenge", "Client challenge"],
  ["siteConditions", "Site conditions"],
  ["feedstockAssessment", "Feedstock assessment"],
  ["energyDemand", "Energy demand"],
  ["engineeringResponse", "Engineering response"],
  ["constructionSequence", "Construction sequence"],
  ["gasHandling", "Gas handling"],
  ["applianceConnections", "Appliance connections"],
  ["slurryManagement", "Slurry or effluent management"],
  ["commissioning", "Commissioning"],
] as const;

export default function ProjectForm({ values, id }: { values?: ProjectFormValues; id?: string }) {
  const [state, action, pending] = useActionState(saveProjectAction, {} as FormState);
  const v = values ?? {};

  return (
    <form action={action} className="space-y-6 max-w-4xl">
      {state?.error && <p role="alert" className="border-l-4 border-oxide bg-oxide/10 p-3 text-sm">{state.error}</p>}
      {state?.ok && <p role="status" className="border-l-4 border-olive bg-olive/10 p-3 text-sm">{state.ok}</p>}
      {id && <input type="hidden" name="id" value={id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        {TEXT_FIELDS.map(([name, label]) => (
          <label key={name} className="block">
            <span className="mono-label text-ink/60">{label}</span>
            <input name={name} defaultValue={v[name] ?? ""} className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" />
          </label>
        ))}
        <label className="block">
          <span className="mono-label text-ink/60">Sector</span>
          <select name="clientCategory" defaultValue={v.clientCategory ?? "farm"} className="mt-1 w-full border border-ink/25 bg-white px-3 py-2">
            {["domestic", "farm", "institutional", "commercial"].map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="mono-label text-ink/60">Technology</span>
          <select name="plantType" defaultValue={v.plantType ?? "fixed_dome"} className="mt-1 w-full border border-ink/25 bg-white px-3 py-2">
            {["fixed_dome", "flexible_pvc", "wastewater", "study"].map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </label>
      </div>
      {LONG_FIELDS.map(([name, label]) => (
        <label key={name} className="block">
          <span className="mono-label text-ink/60">{label}</span>
          <textarea name={name} rows={3} defaultValue={v[name] ?? ""} className="mt-1 w-full border border-ink/25 bg-white px-3 py-2" />
        </label>
      ))}
      <button type="submit" disabled={pending} className="bg-ink text-bone px-6 py-3 text-sm disabled:opacity-50">
        {pending ? "Saving…" : "Save project"}
      </button>
    </form>
  );
}
