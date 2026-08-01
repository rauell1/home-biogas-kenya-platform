"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const FIELDS = [
  { name: "fullName", label: "Full name", required: true },
  { name: "organisation", label: "Company or institution" },
  { name: "phone", label: "Phone", required: true },
  { name: "whatsapp", label: "WhatsApp" },
  { name: "email", label: "Email", type: "email" },
  { name: "county", label: "County" },
  { name: "locality", label: "Locality" },
  { name: "timeline", label: "Project timeline" },
  { name: "budgetRange", label: "Budget range" },
] as const;

export default function AssessmentForm({ locale, disclaimer }: { locale: string; disclaimer: string }) {
  const [config, setConfig] = useState<unknown>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  useEffect(() => {
    const raw = window.sessionStorage.getItem("hbk_config");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        queueMicrotask(() => setConfig(parsed));
      } catch {
        /* ignore malformed session data */
      }
    }
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries()) as Record<string, unknown>;
    payload.configurator = config;
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      setReference(json.reference);
      setStatus("done");
      window.sessionStorage.removeItem("hbk_config");
    } else {
      setStatus("error");
      setMessage(json.error ?? "Submission failed. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <div className="border border-olive bg-olive/10 p-8 md:p-12">
        <p className="mono-label text-olive">Request received</p>
        <h2 className="display-lg mt-3">Your reference is {reference}</h2>
        <p className="editorial mt-4 max-w-xl text-ink/78">
          Keep this reference. Our engineering team will contact you within two working days to arrange a site survey.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${locale}/projects`} className="btn btn-primary">
            See built projects
          </Link>
          <Link href={`/${locale}/knowledge`} className="btn btn-outline">
            Read the knowledge centre
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="panel bg-cream p-6 md:p-10 space-y-7">
      {status === "error" && (
        <div role="alert" className="border-l-4 border-oxide bg-oxide/10 p-4 text-sm">
          {message}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <label key={f.name} className="block">
            <span className="field-label">
              {f.label}
              {"required" in f && f.required ? " *" : ""}
            </span>
            <input
              name={f.name}
              type={"type" in f ? f.type : "text"}
              required={"required" in f ? f.required : false}
              className="field-input"
            />
          </label>
        ))}
        <label className="block">
          <span className="field-label">Preferred contact method</span>
          <select name="preferredContact" className="field-input">
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="email">Email</option>
          </select>
        </label>
      </div>

      <label className="block">
        <span className="field-label">Notes — waste stream, energy need, site</span>
        <textarea name="notes" rows={5} className="field-input" />
      </label>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {config != null && (
        <p className="tag border-olive text-olive">
          <span aria-hidden>✓</span> Configurator answers attached
        </p>
      )}

      <p className="note">{disclaimer}</p>

      <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-50">
        {status === "sending" ? "Sending…" : "Submit request →"}
      </button>
    </form>
  );
}
