"use client";

import { useState } from "react";

export default function FuelSavings({ disclaimer }: { disclaimer: string }) {
  const [monthly, setMonthly] = useState("");
  const [share, setShare] = useState(60);
  const value = Number(monthly);
  const valid = Number.isFinite(value) && value > 0;
  const low = valid ? Math.round(value * (share / 100) * 0.7) : 0;
  const high = valid ? Math.round(value * (share / 100)) : 0;

  return (
    <div className="panel p-6 md:p-10">
      <label className="block">
        <span className="field-label">Current monthly cooking-fuel spend (KES)</span>
        <input
          type="number"
          min={0}
          value={monthly}
          onChange={(e) => setMonthly(e.target.value)}
          placeholder="e.g. 4500"
          className="field-input font-mono text-lg"
        />
      </label>

      <label className="block mt-8">
        <span className="field-label">Share of that fuel biogas could replace — {share}%</span>
        <input
          type="range"
          min={10}
          max={100}
          value={share}
          onChange={(e) => setShare(Number(e.target.value))}
          className="w-full mt-3 accent-[#5db7c4]"
        />
      </label>

      <div className="mt-10 border-t border-ink/12 pt-7">
        {valid ? (
          <>
            <p className="mono-label text-ink/45">Indicative monthly saving</p>
            <p className="display-figure mt-2 text-clay">
              KES {low.toLocaleString()} – {high.toLocaleString()}
            </p>
          </>
        ) : (
          <p className="mono-data text-oxide">Enter your current monthly spend to see an indicative range.</p>
        )}
        <ul className="mt-6 space-y-2 text-sm text-ink/72">
          <li className="flex gap-2"><span className="text-olive">—</span>Assumes the digester is fed consistently every day.</li>
          <li className="flex gap-2"><span className="text-olive">—</span>Assumes appliances are correctly sized and gas is filtered.</li>
          <li className="flex gap-2"><span className="text-olive">—</span>A 30% allowance is applied for seasonal and operational variation.</li>
        </ul>
      </div>

      <p className="note mt-8">{disclaimer}</p>
    </div>
  );
}
