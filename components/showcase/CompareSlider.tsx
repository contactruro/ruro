"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Before and after, in one frame. The redesign is live underneath; the screenshot of their site today
   sits on top and is clipped at the handle. On arrival the handle sweeps across once so the change
   reveals itself, then it is the visitor's to drag (pointer, touch or arrow keys). Only the clipped
   area catches pointer events, so the redesign stays usable on its side of the line. */

export function CompareSlider({ before, after, startLabel, endLabel }: { before: React.ReactNode; after: React.ReactNode; startLabel: string; endLabel: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(100);
  const touched = useRef(false);
  const dragging = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPos(50);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + 500;
    const step = (t: number) => {
      if (touched.current) return;
      const p = Math.min(Math.max((t - t0) / 2200, 0), 1);
      const e = 1 - Math.pow(1 - p, 3);
      setPos(100 - e * 58);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const move = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    touched.current = true;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div ref={box} className="relative select-none overflow-hidden">
      <div>{after}</div>

      {/* Today, clipped to the left of the handle */}
      <div className="pointer-events-auto absolute inset-0 overflow-hidden bg-white" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} aria-hidden>
        {before}
      </div>

      <span className="pointer-events-none absolute left-3 top-3 z-20 bg-ink px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper" style={{ opacity: pos > 14 ? 1 : 0 }}>
        {startLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-20 bg-royal px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper" style={{ opacity: pos < 86 ? 1 : 0 }}>
        {endLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0 z-20 w-0.5 bg-royal shadow-[0_0_0_1px_rgba(255,255,255,0.7)]" style={{ left: `${pos}%` }}>
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare their site today with the RURO redesign"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onPointerDown={(e) => {
            dragging.current = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            move(e.clientX);
          }}
          onPointerMove={(e) => dragging.current && move(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
              e.preventDefault();
              touched.current = true;
              setPos((v) => Math.min(100, Math.max(0, v + (e.key === "ArrowLeft" ? -4 : 4))));
            }
          }}
          className="pointer-events-auto absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none place-items-center rounded-full border-2 border-paper bg-royal text-paper shadow-[0_6px_20px_rgba(20,22,43,0.45)] transition-transform hover:scale-110 focus-visible:scale-110"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
