"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpenText, PencilLine, Ruler } from "@phosphor-icons/react";
import type { Annotation } from "@/lib/annotations";

/* Design notes beside a concept preview. Nothing is drawn on top of the design: each note is an icon in
   the margin just outside the frame, joined by a faint arrow to the right edge of the element it
   explains. Hovering (or focusing, or tapping) an icon outlines that element and opens the note, which
   can overflow the frame. Purely an overlay: the concept components know nothing about it. */

type Geo = { show: boolean; ix: number; iy: number; ex: number; ey: number; rx: number; ry: number; rw: number; rh: number };
const ICON = { "Design law": Ruler, "Copy framework": PencilLine, "Story principle": BookOpenText } as const;
const TAG: Record<Annotation["kind"], string> = {
  "Design law": "bg-accent text-[#f3e6c4]",
  "Copy framework": "bg-[#17233b] text-[#e6c27a]",
  "Story principle": "border border-[#c9a24f] bg-[#fbf3df] text-accent",
};
const EMPTY: Geo = { show: false, ix: 0, iy: 0, ex: 0, ey: 0, rx: 0, ry: 0, rw: 0, rh: 0 };

export function Annotator({ notes, children }: { notes: Annotation[]; children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const leave = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [on, setOn] = useState(true);
  const [hover, setHover] = useState<number | null>(null);
  const [lock, setLock] = useState<number | null>(null);
  const [geo, setGeo] = useState<Geo[]>([]);
  const [wide, setWide] = useState(false);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const open = lock ?? hover;

  const measure = useCallback(() => {
    const w = wrap.current;
    const scroller = w?.querySelector<HTMLElement>(".cx-scroll");
    if (!w || !scroller) return;
    const wr = w.getBoundingClientRect();
    const fr = scroller.getBoundingClientRect();
    const isWide = window.innerWidth >= 1024 && wr.right + 40 < window.innerWidth;
    const fx0 = fr.left - wr.left;
    const fx1 = fr.right - wr.left;
    const fy0 = fr.top - wr.top;
    const fy1 = fr.bottom - wr.top;
    const next: Geo[] = notes.map((n) => {
      const el = w.querySelector<HTMLElement>(`.cx ${n.target}`);
      if (!el) return EMPTY;
      const r = el.getBoundingClientRect();
      const visible = r.width > 0 && r.bottom > fr.top + 24 && r.top < fr.bottom - 24;
      const rx = Math.max(r.left - wr.left, fx0 + 2);
      const ry = Math.max(r.top - wr.top, fy0 + 2);
      const rr = Math.min(r.right - wr.left, fx1 - 2);
      const rb = Math.min(r.bottom - wr.top, fy1 - 2);
      const ey = Math.min(Math.max(r.top - wr.top + Math.min(r.height / 2, 30), fy0 + 24), fy1 - 24);
      return { show: visible, ix: isWide ? fx1 + 26 : fx1 - 18, iy: ey, ex: Math.min(rr + 3, fx1 - 6), ey, rx, ry, rw: Math.max(rr - rx, 0), rh: Math.max(rb - ry, 0) };
    });
    // Keep neighbouring icons apart, top to bottom.
    const order = next.map((g, i) => ({ g, i })).filter((o) => o.g.show).sort((a, b) => a.g.iy - b.g.iy);
    let last = -99;
    for (const o of order) {
      if (o.g.iy < last + 40) o.g.iy = last + 40;
      last = o.g.iy;
    }
    setGeo((prev) => (JSON.stringify(prev) === JSON.stringify(next) ? prev : next));
    setBox({ w: Math.round(wr.width), h: Math.round(wr.height) });
    setWide(isWide);
  }, [notes]);

  useEffect(() => {
    if (!on) return;
    const w = wrap.current;
    if (!w) return;
    measure();
    const scroller = w.querySelector<HTMLElement>(".cx-scroll");
    scroller?.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, { passive: true });
    const id = setInterval(measure, 400);
    return () => {
      scroller?.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure);
      clearInterval(id);
    };
  }, [on, measure]);

  useEffect(() => {
    if (open === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLock(null);
        setHover(null);
      }
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const enter = (i: number) => {
    if (leave.current) clearTimeout(leave.current);
    setHover(i);
  };
  const out = () => {
    if (leave.current) clearTimeout(leave.current);
    leave.current = setTimeout(() => setHover(null), 180);
  };

  const go = (i: number) => {
    const w = wrap.current;
    const scroller = w?.querySelector<HTMLElement>(".cx-scroll");
    const el = w?.querySelector<HTMLElement>(`.cx ${notes[i].target}`);
    if (scroller && el) {
      const delta = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top;
      scroller.scrollTo({ top: scroller.scrollTop + delta - 90, behavior: "smooth" });
    }
    setLock(i);
    setTimeout(measure, 450);
  };

  const g = open !== null ? geo[open] : null;
  const cardW = 288;
  // The note opens beside its icon: beyond the frame on wide screens, under the icon inside it on narrow ones.
  const cx = wide ? (g ? g.ix + 22 : 0) : 8;
  const cy = g ? (wide ? Math.min(Math.max(g.iy - 30, 0), Math.max(box.h - 280, 0)) : Math.min(g.iy + 24, Math.max(box.h - 290, 0))) : 0;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          aria-pressed={on}
          onClick={() => {
            setOn((v) => !v);
            setLock(null);
            setHover(null);
          }}
          className={`inline-flex min-h-10 items-center gap-2 border px-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors ${
            on ? "border-accent bg-accent text-paper" : "border-ink/40 text-ink hover:bg-ink hover:text-paper"
          }`}
        >
          <Ruler aria-hidden className="size-4" />
          Design notes {on ? "on" : "off"}
        </button>
        {on && (
          <button
            type="button"
            onClick={() => go(open === null ? 0 : (open + 1) % notes.length)}
            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent underline underline-offset-4"
          >
            {open === null ? "Start the walkthrough →" : "Next note →"}
          </button>
        )}
      </div>

      <div ref={wrap} className="relative">
        {children}

        {on && (
          <div className="pointer-events-none absolute inset-0 z-30">
            <svg className="absolute inset-0 overflow-visible" width={box.w} height={box.h} aria-hidden>
              <defs>
                <marker id="an-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
                  <path d="M0 1L10 5L0 9z" className="fill-accent" />
                </marker>
              </defs>
              {notes.map((n, i) => {
                const p = geo[i];
                if (!p?.show) return null;
                const active = open === i;
                const x0 = p.ix - 15;
                const d = p.ex + 34 < x0 ? `M ${x0} ${p.iy} C ${x0 - 40} ${p.iy}, ${p.ex + 60} ${p.ey}, ${p.ex + 4} ${p.ey}` : `M ${x0} ${p.iy} L ${p.ex + 4} ${p.ey}`;
                return (
                  <g key={n.target}>
                    {active && (
                      <rect x={p.rx} y={p.ry} width={p.rw} height={p.rh} rx="3" className="an-glow fill-accent/10 stroke-accent" strokeWidth="2" strokeDasharray="6 4" />
                    )}
                    <path d={d} className={`fill-none stroke-accent ${active ? "an-flow" : ""}`} strokeWidth={active ? 2.2 : 1.4} strokeDasharray={active ? "7 5" : "4 4"} opacity={active ? 1 : 0.55} markerEnd="url(#an-head)" />
                  </g>
                );
              })}
            </svg>

            {notes.map((n, i) => {
              const p = geo[i];
              if (!p?.show) return null;
              const Icon = ICON[n.kind];
              return (
                <button
                  key={n.target}
                  type="button"
                  aria-label={`Design note: ${n.title}`}
                  aria-expanded={open === i}
                  onMouseEnter={() => enter(i)}
                  onMouseLeave={out}
                  onFocus={() => enter(i)}
                  onBlur={out}
                  onClick={() => setLock(lock === i ? null : i)}
                  style={{ left: p.ix, top: p.iy }}
                  className={`pointer-events-auto absolute grid size-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-[#e6c27a] shadow-[0_2px_10px_rgba(20,22,43,0.25)] transition-transform hover:scale-110 ${
                    open === i ? "scale-110 bg-[#e6c27a] text-[#3a1018]" : "an-pulse bg-accent text-[#f3e6c4] hover:scale-110 hover:bg-[#e6c27a] hover:text-[#3a1018]"
                  }`}
                >
                  <span aria-hidden className="font-mono text-[0.8125rem] font-bold leading-none">
                    {i + 1}
                  </span>
                  <Icon aria-hidden weight="bold" className="sr-only" />
                </button>
              );
            })}

            {open !== null && g?.show && (
              <div
                role="note"
                onMouseEnter={() => enter(open)}
                onMouseLeave={out}
                style={{ left: cx, top: cy, width: wide ? cardW : box.w - 16 }}
                className="an-card pointer-events-auto absolute overflow-hidden border-2 border-accent bg-paper p-4 pt-5 shadow-[0_18px_40px_-12px_rgba(60,8,16,0.5)]"
              >
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-[#e6c27a] to-accent" />
                <div className="flex items-start justify-between gap-3">
                  <span className={`px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] ${TAG[notes[open].kind]}`}>{notes[open].kind}</span>
                  <button
                    type="button"
                    aria-label="Close note"
                    onClick={() => {
                      setLock(null);
                      setHover(null);
                    }}
                    className="-mr-1 -mt-1 size-7 text-lg leading-none text-ink/60 hover:text-ink"
                  >
                    ×
                  </button>
                </div>
                <p className="display mt-3 text-2xl leading-tight">{notes[open].title}</p>
                <p className="mt-2 text-[0.9375rem] leading-snug text-ink/85">{notes[open].text}</p>
                <div className="mt-4 flex items-center justify-between border-t border-ink/15 pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em]">
                  <span className="flex items-center gap-1.5 text-ink/60" aria-label={`Note ${open + 1} of ${notes.length}`}>
                    {notes.map((_, k) => (
                      <i key={k} aria-hidden className="h-1.5 rounded-full transition-all duration-300" style={{ width: k === open ? 16 : 6, background: k === open ? "var(--color-accent)" : "rgba(37,37,33,0.2)" }} />
                    ))}
                  </span>
                  <span className="flex gap-4 text-accent">
                    <button type="button" onClick={() => go((open + notes.length - 1) % notes.length)}>
                      ← Prev
                    </button>
                    <button type="button" onClick={() => go((open + 1) % notes.length)}>
                      Next →
                    </button>
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
