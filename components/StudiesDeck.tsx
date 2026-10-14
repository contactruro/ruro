"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { studies } from "@/lib/content";

/* The right side of the Studies header: the eight studied homepages as a stack of browser cards. The
   front card slides off and the next one rises, on its own every few seconds. It floats, tilts toward
   the cursor, pauses when hovered and stops moving under reduced motion. Screenshots are the same
   captures used on the cards below (public/studies). */

const VISIBLE = 4;

export function StudiesDeck() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const n = studies.length;

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % n), 3200);
    return () => clearInterval(id);
  }, [paused, reduced, n]);

  const cur = studies[i];

  return (
    <div
      ref={box}
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={(e) => {
        if (reduced || !box.current) return;
        const r = box.current.getBoundingClientRect();
        setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
      }}
    >
      <div className="deck-float">
        <div className="relative aspect-[16/11] w-full" style={{ transform: `perspective(1200px) rotateY(${tilt.x * 7}deg) rotateX(${-tilt.y * 5}deg)`, transition: "transform 400ms cubic-bezier(0.23,1,0.32,1)" }}>
          {Array.from({ length: n }, (_, k) => {
            const off = (k - i + n) % n; // 0 = front, 1.. = behind
            const gone = off === n - 1; // the card that just left: slide out and fade
            const shown = off < VISIBLE;
            const o = shown ? off : VISIBLE;
            const s = studies[k];
            return (
              <figure
                key={s.slug}
                aria-hidden={off !== 0}
                className="absolute inset-0 origin-bottom-left overflow-hidden border border-ink/30 bg-paper shadow-[0_24px_50px_-24px_rgba(20,22,43,0.45)]"
                style={{
                  zIndex: gone ? n + 1 : n - off,
                  opacity: gone ? 0 : shown ? 1 - o * 0.18 : 0,
                  transform: gone
                    ? "translate(60%, -18%) rotate(10deg) scale(0.96)"
                    : `translate(${o * 5}%, ${o * -7}%) rotate(${o * 2.2}deg) scale(${1 - o * 0.045})`,
                  transition: "transform 900ms cubic-bezier(0.32,0.72,0,1), opacity 700ms ease",
                  pointerEvents: off === 0 ? "auto" : "none",
                }}
              >
                <div className="flex items-center gap-2 border-b border-ink/20 bg-paper-deep px-3 py-2">
                  <span aria-hidden className="flex gap-1">
                    <i className="size-1.5 rounded-full bg-ink/20" />
                    <i className="size-1.5 rounded-full bg-ink/20" />
                    <i className="size-1.5 rounded-full bg-ink/20" />
                  </span>
                  <span className="flex-1 truncate bg-paper px-2 py-0.5 text-center font-mono text-[0.625rem] text-ink/70">{s.domain}</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.image} alt={off === 0 ? `${s.person}’s homepage, ${s.domain}` : ""} className="h-[calc(100%-2rem)] w-full object-cover object-top" loading="lazy" />
              </figure>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div key={cur.slug} className="rise-in min-w-0">
          <p className="eyebrow text-accent">
            {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </p>
          <p className="display mt-1 truncate text-2xl">{cur.person}</p>
          <p className="mt-0.5 truncate font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink/60">{cur.signature}</p>
        </div>
        <div className="flex flex-none items-center gap-4">
          <div className="flex gap-1.5" role="group" aria-label="Choose a studied site">
            {studies.map((s, k) => (
              <button
                key={s.slug}
                type="button"
                aria-label={`Show ${s.person}`}
                aria-pressed={k === i}
                onClick={() => setI(k)}
                className={`h-1.5 transition-all duration-500 ${k === i ? "w-6 bg-accent" : "w-1.5 bg-ink/25 hover:bg-ink/50"}`}
              />
            ))}
          </div>
          <Link href={`/work/${cur.slug}`} className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent underline underline-offset-4">
            Open →
          </Link>
        </div>
      </div>
    </div>
  );
}
