"use client";

import { useState } from "react";
import { PLANT_COMPONENTS } from "@/lib/content";

const FEEDSTOCKS = [
  { id: "cow", label: "Cow manure", note: "Steady, reliable gas; mix roughly 1:1 with water." },
  { id: "pig", label: "Pig manure", note: "Higher gas yield per kilogram, more odour control needed." },
  { id: "poultry", label: "Poultry waste", note: "Energy-rich but high nitrogen; requires careful loading." },
  { id: "food", label: "Food waste", note: "Fast digestion; must be shredded and free of packaging." },
];

const HOTSPOTS: Record<string, { x: number; y: number }> = {
  "mixing-tank": { x: 90, y: 150 },
  inlet: { x: 175, y: 205 },
  digester: { x: 360, y: 300 },
  "gas-storage": { x: 360, y: 210 },
  "gas-outlet": { x: 360, y: 132 },
  valve: { x: 430, y: 110 },
  "condensate-trap": { x: 520, y: 150 },
  "gas-filter": { x: 600, y: 110 },
  "pressure-control": { x: 680, y: 110 },
  "expansion-chamber": { x: 560, y: 285 },
  "slurry-outlet": { x: 500, y: 330 },
  "slurry-storage": { x: 680, y: 320 },
};

export default function DigesterCutaway() {
  const [active, setActive] = useState<string>("digester");
  const [technical, setTechnical] = useState(true);
  const [feedstock, setFeedstock] = useState(FEEDSTOCKS[0]);
  const [paused, setPaused] = useState(false);
  const [gasLevel, setGasLevel] = useState(60);

  const component = PLANT_COMPONENTS.find((c) => c.id === active)!;
  const index = PLANT_COMPONENTS.findIndex((c) => c.id === active);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] items-start">
      <div className="border border-bone/15 bg-[#0d0f0d]">
        <svg
          viewBox="0 0 760 400"
          className="w-full h-auto"
          role="img"
          aria-label="Cutaway diagram of a fixed-dome biogas plant showing the mixing tank, inlet, digester, gas holder, gas line, expansion chamber and slurry outlet."
        >
          <defs>
            <pattern id="soil" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#2b221b" />
              <circle cx="2" cy="3" r="0.8" fill="#3b2f26" />
              <circle cx="6" cy="6" r="0.6" fill="#3b2f26" />
            </pattern>
            <linearGradient id="gasFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5db7c4" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#5db7c4" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="760" height="150" fill="#111311" />
          <rect x="0" y="150" width="760" height="250" fill="url(#soil)" />
          <line x1="0" y1="150" x2="760" y2="150" stroke="#b9b7ae" strokeWidth="1" opacity="0.6" />

          <rect x="55" y="110" width="70" height="60" fill="#b9b7ae" opacity="0.8" />
          <rect x="58" y="130" width="64" height="38" fill="#6e7445" />
          <path d="M125 160 L200 240" stroke="#b9b7ae" strokeWidth="10" fill="none" opacity="0.85" />

          <path d="M240 260 A120 110 0 0 1 480 260 Z" fill="#181b18" stroke="#b9b7ae" strokeWidth="1.5" />
          <rect x="240" y="260" width="240" height="90" fill="#181b18" stroke="#b9b7ae" strokeWidth="1.5" />
          <rect
            x="242"
            y={262 + (gasLevel / 100) * 60}
            width="236"
            height={88 - (gasLevel / 100) * 60}
            fill="#6e7445"
            opacity="0.85"
          />
          <path d="M240 260 A120 110 0 0 1 480 260 Z" fill="url(#gasFill)" opacity={0.35 + gasLevel / 200} />

          <path
            d="M360 152 L360 118 L520 118 L520 148 L540 164 L560 148 L740 148"
            stroke="#5db7c4"
            strokeWidth="3.5"
            fill="none"
            strokeDasharray="9 7"
          >
            {!paused && <animate attributeName="stroke-dashoffset" from="32" to="0" dur="1.4s" repeatCount="indefinite" />}
          </path>

          <rect x="520" y="250" width="90" height="70" fill="#181b18" stroke="#b9b7ae" strokeWidth="1.5" />
          <rect
            x="522"
            y={252 + 66 - (gasLevel / 100) * 60}
            width="86"
            height={(gasLevel / 100) * 60 + 2}
            fill="#6e7445"
            opacity="0.85"
          />
          <path d="M480 300 L520 300" stroke="#b9b7ae" strokeWidth="7" opacity="0.85" />
          <rect x="640" y="290" width="90" height="50" fill="#6e7445" opacity="0.65" />

          {PLANT_COMPONENTS.map((c) => {
            const p = HOTSPOTS[c.id];
            const isActive = c.id === active;
            return (
              <g
                key={c.id}
                tabIndex={0}
                role="button"
                aria-label={c.name}
                aria-pressed={isActive}
                onMouseEnter={() => setActive(c.id)}
                onFocus={() => setActive(c.id)}
                onClick={() => setActive(c.id)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(c.id)}
                style={{ cursor: "pointer" }}
              >
                {isActive && <circle cx={p.x} cy={p.y} r="17" fill="none" stroke="#e5b83b" strokeWidth="1" opacity="0.7" />}
                <circle cx={p.x} cy={p.y} r={isActive ? 8 : 5} fill={isActive ? "#e5b83b" : "#5db7c4"} />
                <circle cx={p.x} cy={p.y} r="18" fill="transparent" />
              </g>
            );
          })}
        </svg>

        <div className="flex flex-wrap items-center gap-3 p-4 border-t border-bone/12">
          <button
            type="button"
            onClick={() => setTechnical((v) => !v)}
            className="mono-label border border-bone/25 text-bone px-3 py-2 hover:bg-bone hover:text-ink transition-colors"
          >
            {technical ? "Simplified view" : "Technical view"}
          </button>
          <button
            type="button"
            onClick={() => setPaused((v) => !v)}
            className="mono-label border border-bone/25 text-bone px-3 py-2 hover:bg-bone hover:text-ink transition-colors"
          >
            {paused ? "Play gas flow" : "Pause gas flow"}
          </button>
          <label className="mono-label text-bone/55 flex items-center gap-3 ml-auto">
            Gas accumulation {gasLevel}%
            <input
              type="range"
              min={0}
              max={100}
              value={gasLevel}
              aria-label="Gas accumulation level"
              onChange={(e) => setGasLevel(Number(e.target.value))}
              className="accent-[#5db7c4]"
            />
          </label>
        </div>
      </div>

      <div className="text-bone lg:sticky lg:top-28">
        <p className="mono-label text-methane">
          Component {String(index + 1).padStart(2, "0")} / {PLANT_COMPONENTS.length}
        </p>
        <h3 className="display-lg mt-3">{component.name}</h3>
        <p className="editorial mt-4 text-bone/78">{technical ? component.technical : component.simple}</p>

        <div className="mt-8 border-t border-bone/15 pt-5">
          <p className="mono-label text-bone/45">Feedstock example</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {FEEDSTOCKS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFeedstock(f)}
                className={`mono-label px-3 py-2 border transition-colors ${
                  feedstock.id === f.id ? "bg-methane text-ink border-methane" : "border-bone/25 text-bone hover:border-bone/60"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-bone/65">{feedstock.note}</p>
        </div>

        <ol className="mt-8 grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-bone/15 pt-5">
          {PLANT_COMPONENTS.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setActive(c.id)}
                className={`mono-label text-left transition-colors ${
                  c.id === active ? "text-safety" : "text-bone/45 hover:text-methane"
                }`}
              >
                {String(i + 1).padStart(2, "0")} {c.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
