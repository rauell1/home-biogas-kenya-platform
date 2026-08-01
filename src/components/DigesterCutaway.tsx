"use client";

import { useState, type KeyboardEvent } from "react";
import { PLANT_COMPONENTS } from "@/lib/content";

const FEEDSTOCKS = [
  { id: "cow", label: "Cow manure", note: "Steady, reliable gas; mix roughly 1:1 with water." },
  { id: "pig", label: "Pig manure", note: "Higher gas yield per kilogram, with more odour control needed." },
  { id: "poultry", label: "Poultry waste", note: "Energy-rich but high in nitrogen; careful loading is essential." },
  { id: "food", label: "Food waste", note: "Fast digestion; shred it and remove all packaging before feeding." },
];

const HOTSPOTS: Record<string, { x: number; y: number }> = {
  "mixing-tank": { x: 91, y: 137 },
  inlet: { x: 173, y: 202 },
  digester: { x: 357, y: 318 },
  "gas-storage": { x: 357, y: 214 },
  "gas-outlet": { x: 357, y: 119 },
  valve: { x: 430, y: 119 },
  "condensate-trap": { x: 535, y: 154 },
  "gas-filter": { x: 615, y: 119 },
  "pressure-control": { x: 700, y: 119 },
  "expansion-chamber": { x: 566, y: 274 },
  "slurry-outlet": { x: 505, y: 314 },
  "slurry-storage": { x: 690, y: 316 },
};

export default function DigesterCutaway() {
  const [active, setActive] = useState("digester");
  const [technical, setTechnical] = useState(true);
  const [feedstock, setFeedstock] = useState(FEEDSTOCKS[0]);
  const [paused, setPaused] = useState(false);
  const [gasLevel, setGasLevel] = useState(60);

  const component = PLANT_COMPONENTS.find((item) => item.id === active)!;
  const index = PLANT_COMPONENTS.findIndex((item) => item.id === active);

  function selectAdjacent(direction: number) {
    const next = (index + direction + PLANT_COMPONENTS.length) % PLANT_COMPONENTS.length;
    setActive(PLANT_COMPONENTS[next].id);
  }

  function handleMarkerKey(event: KeyboardEvent<SVGGElement>, id: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActive(id);
    }
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectAdjacent(1);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectAdjacent(-1);
    }
  }

  const digesterLiquidY = 263 + (gasLevel / 100) * 54;
  const chamberLiquidY = 317 - (gasLevel / 100) * 54;

  return (
    <div className="grid items-start gap-10 lg:grid-cols-[1.55fr_1fr]">
      <div className="overflow-hidden border border-bone/15 bg-[#0d0f0d]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-bone/12 px-4 py-3">
          <div className="flex flex-wrap gap-x-5 gap-y-2 mono-label text-bone/60" aria-label="Flow legend">
            <span className="flex items-center gap-2"><span className="h-1.5 w-5 bg-olive" />Feed slurry</span>
            <span className="flex items-center gap-2"><span className="h-0 w-5 border-t-2 border-dashed border-methane" />Biogas</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-5 bg-safety/70" />Digested slurry</span>
          </div>
          <span className="mono-label text-safety">Select markers 01-12</span>
        </div>

        <svg
          viewBox="0 0 760 400"
          className="h-auto w-full"
          role="img"
          aria-label="Interactive cutaway of a fixed-dome biogas plant, showing feed slurry entering the digester, biogas leaving through the gas train, and digested slurry flowing to storage."
        >
          <defs>
            <pattern id="soil" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#2b221b" />
              <circle cx="2" cy="3" r="0.8" fill="#49372a" />
              <circle cx="6" cy="6" r="0.6" fill="#49372a" />
            </pattern>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18201e" />
              <stop offset="100%" stopColor="#101310" />
            </linearGradient>
            <linearGradient id="gasFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5db7c4" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#5db7c4" stopOpacity="0.08" />
            </linearGradient>
            <marker id="gasArrow" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#5db7c4" />
            </marker>
            <marker id="feedArrow" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#8d965c" />
            </marker>
            <marker id="slurryArrow" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#e5b83b" />
            </marker>
          </defs>

          <rect width="760" height="150" fill="url(#sky)" />
          <rect y="150" width="760" height="250" fill="url(#soil)" />
          <line x1="0" y1="150" x2="760" y2="150" stroke="#b9b7ae" strokeWidth="1" opacity="0.65" />
          <text x="18" y="30" fill="#b9b7ae" opacity="0.55" fontSize="10" letterSpacing="2">ABOVE GROUND</text>
          <text x="18" y="176" fill="#b9b7ae" opacity="0.55" fontSize="10" letterSpacing="2">BELOW GROUND</text>

          <path d="M54 109 H128 V171 H54 Z" fill="#171a17" stroke="#b9b7ae" strokeWidth="2" />
          <path d="M57 133 H125 V168 H57 Z" fill="#6e7445" opacity="0.95" />
          <path d="M69 109 V96 M113 109 V96 M65 96 H117" stroke="#b9b7ae" strokeWidth="3" />

          <path d="M128 161 L246 286" stroke="#b9b7ae" strokeWidth="14" fill="none" opacity="0.85" />
          <path d="M132 162 L240 276" stroke="#8d965c" strokeWidth="6" fill="none" markerEnd="url(#feedArrow)" />

          <path d="M237 260 A120 112 0 0 1 477 260 Z" fill="#171a17" stroke="#d4d1c7" strokeWidth="2" />
          <path d="M237 260 H477 V354 H237 Z" fill="#171a17" stroke="#d4d1c7" strokeWidth="2" />
          <rect x="240" y={digesterLiquidY} width="234" height={351 - digesterLiquidY} fill="#6e7445" opacity="0.95" />
          <path d="M240 260 A117 109 0 0 1 474 260 Z" fill="url(#gasFill)" opacity={0.45 + gasLevel / 180} />
          <line x1="240" y1={digesterLiquidY} x2="474" y2={digesterLiquidY} stroke="#aeb77c" strokeWidth="1.5" />
          <g opacity="0.55" fill="#eae5d8">
            <circle cx="300" cy="331" r="2" /><circle cx="338" cy="345" r="1.5" /><circle cx="404" cy="326" r="2" /><circle cx="438" cy="342" r="1.5" />
          </g>

          <path
            d="M357 151 V118 H514 V147 L535 164 L557 147 H574 V118 H735"
            stroke="#5db7c4"
            strokeWidth="4"
            fill="none"
            strokeDasharray="10 7"
            markerEnd="url(#gasArrow)"
          >
            {!paused && <animate attributeName="stroke-dashoffset" from="34" to="0" dur="1.25s" repeatCount="indefinite" />}
          </path>
          <path d="M426 112 L434 118 L426 124 Z" fill="#5db7c4" />
          <rect x="594" y="103" width="42" height="30" fill="#171a17" stroke="#5db7c4" strokeWidth="2" />
          <path d="M604 110 V126 M614 110 V126 M624 110 V126" stroke="#5db7c4" strokeWidth="2" opacity="0.75" />
          <circle cx="700" cy="119" r="17" fill="#171a17" stroke="#5db7c4" strokeWidth="2" />
          <path d="M700 119 L708 111" stroke="#e5b83b" strokeWidth="2" />

          <path d="M477 305 H520" stroke="#d4d1c7" strokeWidth="12" opacity="0.8" />
          <path d="M482 305 H516" stroke="#e5b83b" strokeWidth="5" markerEnd="url(#slurryArrow)" />
          <path d="M519 242 H613 V324 H519 Z" fill="#171a17" stroke="#d4d1c7" strokeWidth="2" />
          <rect x="522" y={chamberLiquidY} width="88" height={321 - chamberLiquidY} fill="#7d7946" opacity="0.95" />
          <line x1="522" y1={chamberLiquidY} x2="610" y2={chamberLiquidY} stroke="#e5b83b" strokeWidth="1.5" />
          <path d="M613 306 H650" stroke="#d4d1c7" strokeWidth="10" opacity="0.8" />
          <path d="M616 306 H646" stroke="#e5b83b" strokeWidth="4" markerEnd="url(#slurryArrow)" />
          <path d="M648 279 H733 V341 H648 Z" fill="#171a17" stroke="#b9b7ae" strokeWidth="2" />
          <rect x="651" y="307" width="79" height="31" fill="#6e7445" opacity="0.95" />

          {PLANT_COMPONENTS.map((item, itemIndex) => {
            const point = HOTSPOTS[item.id];
            const isActive = item.id === active;
            return (
              <g
                key={item.id}
                tabIndex={0}
                role="button"
                aria-label={`${String(itemIndex + 1).padStart(2, "0")}, ${item.name}`}
                aria-pressed={isActive}
                onMouseEnter={() => setActive(item.id)}
                onFocus={() => setActive(item.id)}
                onClick={() => setActive(item.id)}
                onKeyDown={(event) => handleMarkerKey(event, item.id)}
                className="cursor-pointer outline-none"
              >
                {isActive && <circle cx={point.x} cy={point.y} r="19" fill="#e5b83b" opacity="0.2" />}
                <circle cx={point.x} cy={point.y} r="12" fill={isActive ? "#e5b83b" : "#111311"} stroke={isActive ? "#e5b83b" : "#5db7c4"} strokeWidth="2" />
                <text x={point.x} y={point.y + 3.5} textAnchor="middle" fill={isActive ? "#121412" : "#eae5d8"} fontSize="8.5" fontWeight="700">
                  {String(itemIndex + 1).padStart(2, "0")}
                </text>
                <circle cx={point.x} cy={point.y} r="20" fill="transparent" />
              </g>
            );
          })}
        </svg>

        <div className="border-t border-bone/12 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              aria-pressed={!technical}
              onClick={() => setTechnical((value) => !value)}
              className="mono-label border border-bone/25 px-3 py-2 text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              {technical ? "Use simple explanation" : "Use technical explanation"}
            </button>
            <button
              type="button"
              aria-pressed={paused}
              onClick={() => setPaused((value) => !value)}
              className="mono-label border border-bone/25 px-3 py-2 text-bone transition-colors hover:bg-bone hover:text-ink"
            >
              {paused ? "Resume gas flow" : "Pause gas flow"}
            </button>
          </div>
          <label className="mt-4 grid gap-2 mono-label text-bone/60 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <span>Gas accumulation</span>
            <input
              type="range"
              min={0}
              max={100}
              value={gasLevel}
              aria-label="Gas accumulation level"
              onChange={(event) => setGasLevel(Number(event.target.value))}
              className="w-full accent-[#5db7c4]"
            />
            <span className="text-methane">{gasLevel}%</span>
          </label>
        </div>
      </div>

      <div className="text-bone lg:sticky lg:top-28" aria-live="polite">
        <div className="flex items-center justify-between gap-4">
          <p className="mono-label text-methane">Component {String(index + 1).padStart(2, "0")} / {PLANT_COMPONENTS.length}</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => selectAdjacent(-1)} aria-label="Previous component" className="grid h-9 w-9 place-items-center border border-bone/25 text-bone hover:border-methane hover:text-methane">←</button>
            <button type="button" onClick={() => selectAdjacent(1)} aria-label="Next component" className="grid h-9 w-9 place-items-center border border-bone/25 text-bone hover:border-methane hover:text-methane">→</button>
          </div>
        </div>
        <h3 className="display-lg mt-3">{component.name}</h3>
        <p className="editorial mt-4 min-h-[5.5rem] text-bone/78">{technical ? component.technical : component.simple}</p>

        <div className="mt-7 border-t border-bone/15 pt-5">
          <p className="mono-label text-bone/50">Feedstock scenario</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {FEEDSTOCKS.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={feedstock.id === item.id}
                onClick={() => setFeedstock(item)}
                className={`mono-label border px-3 py-2 transition-colors ${feedstock.id === item.id ? "border-methane bg-methane text-ink" : "border-bone/25 text-bone hover:border-bone/60"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-bone/65">{feedstock.note}</p>
        </div>

        <ol className="mt-7 grid gap-1 border-t border-bone/15 pt-5 sm:grid-cols-2">
          {PLANT_COMPONENTS.map((item, itemIndex) => (
            <li key={item.id}>
              <button
                type="button"
                aria-current={item.id === active ? "true" : undefined}
                onClick={() => setActive(item.id)}
                className={`flex w-full items-center gap-3 border-l-2 px-3 py-2 text-left transition-colors ${item.id === active ? "border-safety bg-bone/[0.07] text-bone" : "border-transparent text-bone/50 hover:border-methane hover:text-bone"}`}
              >
                <span className={`mono-label ${item.id === active ? "text-safety" : "text-methane"}`}>{String(itemIndex + 1).padStart(2, "0")}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.08em]">{item.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
