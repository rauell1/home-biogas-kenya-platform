"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { estimate, FEEDSTOCK_OPTIONS, type FeedstockId } from "@/lib/estimator";

const APPS = [
  ["cooking", "Cooking"],
  ["baking", "Baking"],
  ["water_heating", "Water heating"],
  ["brooding", "Brooding"],
  ["lighting", "Lighting"],
  ["electricity", "Electricity"],
  ["chaff_cutting", "Chaff cutting"],
  ["water_pumping", "Water pumping"],
  ["wastewater_treatment", "Wastewater treatment"],
  ["slurry_recovery", "Bio-slurry recovery"],
] as const;

const SITE_FIELDS = [
  ["county", "County"],
  ["town", "Town"],
  ["water", "Water availability"],
  ["land", "Land area available (m²)"],
  ["slope", "Ground slope"],
  ["flooding", "Flooding history"],
  ["distanceWaste", "Distance to waste (m)"],
  ["distanceUse", "Distance to point of use (m)"],
  ["soil", "Soil conditions"],
  ["current", "Current waste-management method"],
] as const;

const STEPS = ["Waste source", "Quantity", "Application", "Site", "Result"];

export default function Configurator({ locale, disclaimer }: { locale: string; disclaimer: string }) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [apps, setApps] = useState<string[]>([]);
  const [site, setSite] = useState<Record<string, string>>({});

  const feedstocks = useMemo(
    () => Object.entries(selected).map(([id, quantity]) => ({ id: id as FeedstockId, quantity })),
    [selected],
  );
  const result = useMemo(() => estimate({ feedstocks, applications: apps }), [feedstocks, apps]);
  const missing = SITE_FIELDS.filter(([k]) => !site[k]?.trim()).map(([, l]) => l);

  function toggleFeedstock(id: string) {
    setSelected((prev) => {
      const next = { ...prev };
      if (id in next) delete next[id];
      else next[id] = 0;
      return next;
    });
  }

  function saveAndContinue() {
    window.sessionStorage.setItem("hbk_config", JSON.stringify({ feedstocks, applications: apps, site, result }));
  }

  return (
    <div className="panel bg-cream">
      {/* progress line */}
      <ol className="grid grid-cols-2 sm:grid-cols-5 border-b border-ink/12" aria-label="Configurator progress">
        {STEPS.map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const on = step === n;
          return (
            <li key={label} className="border-r border-ink/10 last:border-r-0">
              <button
                type="button"
                onClick={() => setStep(n)}
                aria-current={on ? "step" : undefined}
                className={`w-full h-full text-left px-4 py-4 transition-colors ${
                  on ? "bg-ink text-bone" : done ? "bg-bone/70 hover:bg-bone" : "hover:bg-bone/50"
                }`}
              >
                <span className={`mono-label ${on ? "text-methane" : done ? "text-olive" : "text-ink/40"}`}>
                  {String(n).padStart(2, "0")} {done ? "✓" : ""}
                </span>
                <span className="block text-sm font-semibold mt-1">{label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="p-6 md:p-10 lg:p-12 min-h-[22rem]">
        {step === 1 && (
          <fieldset>
            <legend className="display-lg mb-2">Which waste do you have?</legend>
            <p className="text-sm text-ink/60 mb-6">Select every stream available on the site.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {FEEDSTOCK_OPTIONS.map((f) => {
                const on = f.id in selected;
                return (
                  <label
                    key={f.id}
                    className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer text-sm transition-colors ${
                      on ? "border-clay bg-clay/10" : "border-ink/18 hover:border-ink/45"
                    }`}
                  >
                    <input type="checkbox" checked={on} onChange={() => toggleFeedstock(f.id)} className="accent-[#a85532]" />
                    <span>
                      {f.label}
                      <span className="mono-label block text-ink/40 mt-0.5">{f.unit}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="display-lg mb-2">How much, every day?</legend>
            <p className="text-sm text-ink/60 mb-6">Nothing is estimated without a measured quantity.</p>
            {Object.keys(selected).length === 0 ? (
              <p className="note border-oxide text-oxide">Select at least one waste source in step 01.</p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                {Object.keys(selected).map((id) => {
                  const opt = FEEDSTOCK_OPTIONS.find((f) => f.id === id)!;
                  return (
                    <label key={id} className="block">
                      <span className="field-label">
                        {opt.label} — {opt.unit}
                      </span>
                      <input
                        type="number"
                        min={0}
                        value={selected[id] || ""}
                        onChange={(e) => setSelected((p) => ({ ...p, [id]: Number(e.target.value) }))}
                        className="field-input font-mono"
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="display-lg mb-2">What should the gas do?</legend>
            <p className="text-sm text-ink/60 mb-6">The end use determines filtration, pressure and storage.</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {APPS.map(([id, label]) => {
                const on = apps.includes(id);
                return (
                  <label
                    key={id}
                    className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer text-sm transition-colors ${
                      on ? "border-methane bg-methane/15" : "border-ink/18 hover:border-ink/45"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => setApps((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]))}
                      className="accent-[#5db7c4]"
                    />
                    {label}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="display-lg mb-2">Tell us about the site</legend>
            <p className="text-sm text-ink/60 mb-6">Anything you leave blank is listed as missing information.</p>
            <div className="grid gap-5 sm:grid-cols-2">
              {SITE_FIELDS.map(([k, label]) => (
                <label key={k} className="block">
                  <span className="field-label">{label}</span>
                  <input
                    value={site[k] ?? ""}
                    onChange={(e) => setSite((p) => ({ ...p, [k]: e.target.value }))}
                    className="field-input"
                  />
                </label>
              ))}
            </div>
          </fieldset>
        )}

        {step === 5 && (
          <div>
            <h3 className="display-lg mb-6">Preliminary result</h3>
            {!result.valid ? (
              <p className="note border-oxide text-oxide">{result.message}</p>
            ) : (
              <div className="grid gap-10 lg:grid-cols-2">
                <div>
                  <div className="border border-ink/15 bg-bone p-6">
                    <p className="mono-label text-ink/45">Possible system range</p>
                    <p className="display-figure mt-2 text-clay">
                      {result.digesterM3Min}–{result.digesterM3Max} m³
                    </p>
                    <dl className="mt-6 grid grid-cols-2 gap-5 border-t border-ink/12 pt-5">
                      <div>
                        <dt className="mono-label text-ink/45">Fresh material</dt>
                        <dd className="mono-data mt-1">
                          {result.freshKgPerDayMin}–{result.freshKgPerDayMax} kg/day
                        </dd>
                      </div>
                      <div>
                        <dt className="mono-label text-ink/45">Indicative biogas</dt>
                        <dd className="mono-data mt-1">
                          {result.gasM3PerDayMin}–{result.gasM3PerDayMax} m³/day
                        </dd>
                      </div>
                    </dl>
                  </div>
                  <p className="mono-label mt-6 text-ink/45">Possible technologies</p>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {result.technologies.map((t) => (
                      <li key={t} className="flex gap-2">
                        <span className="text-methane">—</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="mono-label text-ink/45">Assumptions</p>
                  <ul className="mt-3 space-y-2 text-sm text-ink/75">
                    {result.assumptions.map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="text-olive">—</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                  {missing.length > 0 && (
                    <>
                      <p className="mono-label mt-8 text-oxide">Missing site information</p>
                      <p className="text-sm mt-2 text-ink/70">{missing.join(", ")}</p>
                    </>
                  )}
                </div>
              </div>
            )}
            <p className="note mt-10">{disclaimer}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-ink/12 px-6 py-5">
        <button
          type="button"
          disabled={step === 1}
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="btn btn-outline btn-sm disabled:opacity-35"
        >
          ← Back
        </button>
        {step < 5 ? (
          <button type="button" onClick={() => setStep((s) => Math.min(5, s + 1))} className="btn btn-primary">
            Continue →
          </button>
        ) : (
          <Link href={`/${locale}/request-assessment`} onClick={saveAndContinue} className="btn btn-accent">
            Request a site assessment →
          </Link>
        )}
      </div>
    </div>
  );
}
