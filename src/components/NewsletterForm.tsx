"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm({ locale }: { locale: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const isSwahili = locale === "sw";

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    try {
      const form = new FormData(formElement);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          company: form.get("company"),
          locale,
        }),
      });
      const result = (await response.json().catch(() => null)) as { message?: string } | null;

      if (!response.ok) {
        setStatus("error");
        setMessage(result?.message ?? (isSwahili ? "Imeshindikana. Tafadhali jaribu tena." : "Something went wrong. Please try again."));
        return;
      }

      formElement.reset();
      setStatus("success");
      setMessage(result?.message ?? (isSwahili ? "Umejiandikisha kwa mafanikio." : "You are subscribed."));
    } catch {
      setStatus("error");
      setMessage(isSwahili ? "Imeshindikana. Tafadhali jaribu tena." : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={subscribe} className="w-full" aria-label={isSwahili ? "Jiandikishe kwa jarida" : "Newsletter signup"}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor={`newsletter-email-${locale}`}>Email address</label>
        <input
          id={`newsletter-email-${locale}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={isSwahili ? "Barua pepe yako" : "Your email address"}
          className="min-h-12 flex-1 border border-bone/30 bg-bone px-4 text-sm text-ink outline-none placeholder:text-ink/45 focus:border-methane"
        />
        <input name="company" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" disabled={status === "submitting"} className="btn btn-accent min-h-12 disabled:cursor-wait disabled:opacity-60">
          {status === "submitting" ? (isSwahili ? "Inatuma..." : "Subscribing...") : (isSwahili ? "Jiandikishe" : "Subscribe")}
        </button>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-bone/50">
        {isSwahili ? "Pata habari za miradi, mafunzo na teknolojia. Unaweza kujiondoa wakati wowote." : "Get project, training and technology updates. Unsubscribe at any time."}
      </p>
      {message && <p role="status" className={`mt-3 text-sm ${status === "error" ? "text-clay" : "text-methane"}`}>{message}</p>}
    </form>
  );
}
