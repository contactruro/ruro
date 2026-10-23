"use client";

import { concepts } from "@/lib/showcase";

/* The concept chooser: four large cards with the person's portrait, role, the name of the design
   direction and its palette. Keeps the tab semantics so the preview below stays labelled. */
export function ConceptPicker({ index, onPick }: { index: number; onPick: (i: number) => void }) {
  return (
    <div role="tablist" aria-label="Concept websites" className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {concepts.map((x, n) => {
        const on = n === index;
        return (
          <button
            key={x.slug}
            id={`tab-${x.slug}`}
            role="tab"
            type="button"
            aria-selected={on}
            aria-controls={`panel-${x.slug}`}
            onClick={() => onPick(n)}
            className={`group relative flex items-center gap-3 overflow-hidden border-2 p-3 text-left transition-all duration-500 md:gap-4 md:p-4 ${
              on ? "border-royal bg-royal text-paper shadow-[0_20px_40px_-20px_rgba(155,17,30,0.9)]" : "border-royal bg-surface text-royal hover:-translate-y-0.5 hover:border-royal"
            }`}
          >
            <span className="relative size-12 flex-none overflow-hidden rounded-full border border-current/30 md:size-14">
              {x.photo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={x.photo.src} alt={`${x.person}, photograph`} className={`size-full object-cover object-[50%_18%] transition-all duration-500 ${on ? "" : "grayscale group-hover:grayscale-0"}`} />
              )}
            </span>
            <span className="min-w-0">
              <span className="display block truncate text-lg leading-tight md:text-2xl">{x.person}</span>
              <span className={`mt-0.5 block truncate font-mono text-[0.6875rem] uppercase tracking-[0.12em] ${on ? "text-paper/85" : "text-royal/75"}`}>{x.design?.name ?? x.domain}</span>
              <span className="mt-2 flex gap-1" aria-hidden>
                {x.dna?.palette.map((q) => (
                  <i key={q.hex} className="size-2.5 rounded-full ring-1 ring-current/30" style={{ background: q.hex }} />
                ))}
              </span>
            </span>
            <span aria-hidden className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-paper transition-transform duration-700 ${on ? "scale-x-100" : "scale-x-0"}`} />
          </button>
        );
      })}
    </div>
  );
}
