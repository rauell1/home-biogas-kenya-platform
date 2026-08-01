"use client";

import Link from "next/link";
import { useState } from "react";
import { APPLICATIONS } from "@/lib/content";

export default function ApplicationScene({ locale }: { locale: string }) {
  const [active, setActive] = useState(APPLICATIONS[0].slug);
  const current = APPLICATIONS.find((a) => a.slug === active)!;

  return (
    <div className="grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-start">
      <div className="panel bg-cream p-4 sm:p-6 overflow-x-auto">
        <svg
          viewBox="0 0 960 210"
          className="min-w-[880px] w-full h-auto"
          role="img"
          aria-label="Gas pipeline connecting the digester to nine biogas applications."
        >
          <defs>
            <linearGradient id="pipe" x1="0" x2="1">
              <stop offset="0%" stopColor="#5db7c4" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#5db7c4" />
            </linearGradient>
          </defs>

          <path d="M24 118 H936" stroke="url(#pipe)" strokeWidth="6" fill="none" />
          <path d="M24 118 H936" stroke="#121412" strokeWidth="6" strokeDasharray="4 26" opacity="0.25" fill="none">
            <animate attributeName="stroke-dashoffset" from="30" to="0" dur="1.5s" repeatCount="indefinite" />
          </path>

          <g>
            <rect x="14" y="86" width="64" height="64" fill="#372b22" />
            <rect x="22" y="94" width="48" height="48" fill="none" stroke="#5db7c4" strokeWidth="1.5" />
            <text x="46" y="170" textAnchor="middle" fill="#372b22" fontSize="10" fontFamily="monospace" letterSpacing="1.5">
              DIGESTER
            </text>
          </g>

          {APPLICATIONS.map((a, i) => {
            const x = 140 + i * 90;
            const on = a.slug === active;
            return (
              <g
                key={a.slug}
                tabIndex={0}
                role="button"
                aria-label={a.name}
                aria-pressed={on}
                onMouseEnter={() => setActive(a.slug)}
                onFocus={() => setActive(a.slug)}
                onClick={() => setActive(a.slug)}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActive(a.slug)}
                style={{ cursor: "pointer" }}
              >
                <line x1={x} y1="118" x2={x} y2="74" stroke={on ? "#e5b83b" : "#b9b7ae"} strokeWidth="2.5" />
                <rect
                  x={x - 27}
                  y="34"
                  width="54"
                  height="40"
                  fill={on ? "#121412" : "#e6e1d4"}
                  stroke={on ? "#e5b83b" : "#b9b7ae"}
                  strokeWidth="1.5"
                />
                {on && (
                  <path d={`M${x - 7} 34 Q${x} 14 ${x + 7} 34 Z`} fill="#5db7c4">
                    <animate attributeName="opacity" values="1;0.45;1" dur="0.8s" repeatCount="indefinite" />
                  </path>
                )}
                <circle cx={x} cy="118" r={on ? 7 : 4} fill={on ? "#e5b83b" : "#5db7c4"} />
                <text
                  x={x}
                  y="146"
                  textAnchor="middle"
                  fill={on ? "#121412" : "#6b6a62"}
                  fontSize="9"
                  fontFamily="monospace"
                  letterSpacing="0.8"
                >
                  {a.name.toUpperCase().split(" ")[0]}
                </text>
              </g>
            );
          })}
        </svg>

        <ul className="mt-4 flex flex-wrap gap-2 min-w-max lg:min-w-0">
          {APPLICATIONS.map((a) => (
            <li key={a.slug}>
              <button
                type="button"
                onClick={() => setActive(a.slug)}
                className={`mono-label border px-2.5 py-1.5 transition-colors ${
                  a.slug === active ? "border-ink bg-ink text-bone" : "border-ink/20 hover:border-ink/50"
                }`}
              >
                {a.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:sticky lg:top-28">
        <p className="mono-label text-clay">
          Application {String(APPLICATIONS.findIndex((a) => a.slug === active) + 1).padStart(2, "0")} /{" "}
          {APPLICATIONS.length}
        </p>
        <h3 className="display-lg mt-3">{current.name}</h3>
        <p className="lede mt-4 text-ink/78">{current.use}</p>

        <div className="mt-8 border-t border-ink/12 pt-5">
          <p className="mono-label text-ink/45">System requirement</p>
          <p className="mono-data mt-2">{current.requirement}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/${locale}/applications/${current.slug}`} className="btn btn-primary btn-sm">
            Application detail
          </Link>
          <Link href={`/${locale}/projects/${current.projectSlug}`} className="btn btn-outline btn-sm">
            Related project
          </Link>
        </div>
      </div>
    </div>
  );
}
