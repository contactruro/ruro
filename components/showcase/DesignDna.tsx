"use client";

import { useState } from "react";
import type { Concept } from "@/lib/showcase";

/* The look of a redesign at a glance: palette (click to copy a hex), type, motion and mood. */
export function DesignDna({ dna }: { dna: NonNullable<Concept["dna"]> }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (hex: string) => {
    try {
      void navigator.clipboard?.writeText(hex);
    } catch {
      /* clipboard may be unavailable; the swatch still shows the value */
    }
    setCopied(hex);
    setTimeout(() => setCopied(null), 1400);
  };
  return (
    <section aria-label="Design DNA" className="border border-ink/25 bg-paper p-5">
      <h3 className="eyebrow text-accent">Design DNA</h3>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {dna.palette.map((q) => (
          <button key={q.hex} type="button" onClick={() => copy(q.hex)} className="group text-left" aria-label={`${q.name}, ${q.hex}. Copy colour`}>
            <span className="block aspect-[4/3] border border-ink/20 transition-transform duration-300 group-hover:-translate-y-0.5" style={{ background: q.hex }} />
            <span className="mt-1.5 block truncate font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-ink/70">{copied === q.hex ? "Copied" : q.hex}</span>
            <span className="block truncate text-[0.6875rem] text-ink/55">{q.name}</span>
          </button>
        ))}
      </div>
      <dl className="mt-5 grid gap-x-6 gap-y-3 border-t border-ink/15 pt-4 text-sm sm:grid-cols-[5rem_1fr]">
        {(
          [
            ["Type", dna.type],
            ["Motion", dna.motion],
            ["Mood", dna.mood],
          ] as const
        ).map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="eyebrow pt-0.5 text-ink/60">{k}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {v.map((x) => (
                <span key={x} className="border border-ink/20 px-2 py-0.5 text-[0.8125rem]">
                  {x}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
