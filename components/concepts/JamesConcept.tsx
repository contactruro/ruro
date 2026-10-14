"use client";

import { useEffect, useRef, useState } from "react";
import type { Concept } from "@/lib/showcase";
import { useSeen } from "./useSeen";
import "./concepts.css";
import "./james.css";
import { BookShowcase, FilmStrip, PortraitBand, type XTheme } from "./Extras";

const XT: XTheme = { bg: "#faf8f2", paper: "#fffdf8", ink: "#1d1b16", soft: "#5d594e", rule: "#e4dfd0", accent: "#8a6a1f", serif: true };

/* Concept: James Clear, "The Habit Studio". His real site is calm, ivory and gold, built around one book. This
   one keeps that calm and adds depth with restraint: a hero with the claim and a portrait; a habit-stack card a
   visitor can use ("After I ___, I will ___"), with twenty-one days to tick and the 1% curve drawing itself; the
   four laws set like the contents page of a book; a quiet preview of 3-2-1 Thursday; and four plain numbers. No
   gradients, no confetti, one gold. The newsletter figure is his site's claim; the laws and the stacking formula
   are from Atomic Habits. See lib/showcase.ts. */

const laws = [
  { k: "1", t: "Make it obvious", d: "Put the cue where you cannot miss it.", icon: "eye" },
  { k: "2", t: "Make it attractive", d: "Pair it with something you already enjoy.", icon: "heart" },
  { k: "3", t: "Make it easy", d: "Shrink it until it takes two minutes.", icon: "timer" },
  { k: "4", t: "Make it satisfying", d: "End on a win you can see and tick.", icon: "check" },
] as const;

const DAYS = 21;
const YEAR = Math.pow(1.01, 365);

/* A number that eases to its new value instead of jumping. */
function useTween(target: number, ms = 700) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target);
      from.current = target;
      return;
    }
    const a = from.current;
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - t0) / ms, 1);
      const cur = a + (target - a) * (1 - Math.pow(1 - p, 3));
      from.current = cur;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function LawIcon({ kind }: { kind: (typeof laws)[number]["icon"] }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 48 48" className="jh-ico" aria-hidden {...p}>
      {kind === "eye" && (
        <>
          <path d="M5 24c6-10 12-14 19-14s13 4 19 14c-6 10-12 14-19 14S11 34 5 24z" />
          <circle cx="24" cy="24" r="5" />
        </>
      )}
      {kind === "heart" && <path d="M24 41C10 31 6 23 6 17a9 9 0 0 1 18-2 9 9 0 0 1 18 2c0 6-4 14-18 24z" />}
      {kind === "timer" && (
        <>
          <circle cx="24" cy="26" r="15" />
          <path d="M24 26V16M19 6h10" />
        </>
      )}
      {kind === "check" && (
        <>
          <circle cx="24" cy="24" r="17" />
          <path d="M15 25l7 7 12-14" />
        </>
      )}
    </svg>
  );
}

/* The 1% curve over a year, drawn once, with a marker for how many days have been ticked. */
function Curve({ n }: { n: number }) {
  const pt = (t: number) => `${((t / 365) * 200).toFixed(1)} ${(96 - ((Math.pow(1.01, t) - 1) / (YEAR - 1)) * 88).toFixed(1)}`;
  const line = Array.from({ length: 74 }, (_, i) => (i === 0 ? "M" : "L") + pt(i * 5)).join(" ");
  const [mx, my] = pt(Math.min(n, 365)).split(" ");
  return (
    <svg viewBox="0 0 200 100" className="jh-curve" preserveAspectRatio="none" aria-hidden>
      <path className="area" d={`${line} L200 100 L0 100 Z`} />
      <path className="line" d={line} pathLength={1} />
      <circle cx={mx} cy={my} r="2.6" />
    </svg>
  );
}

export function JamesConcept({ c }: { c: Concept }) {
  const [before, setBefore] = useState("pour my coffee");
  const [after, setAfter] = useState("read one page");
  const [on, setOn] = useState<boolean[]>(() => Array.from({ length: DAYS }, (_, i) => i < 6));
  const [nums, seen] = useSeen<HTMLElement>(0.3);
  const n = on.filter(Boolean).length;
  const x = Math.pow(1.01, n);
  const shown = useTween(x);
  const [just, setJust] = useState<{ i: number; k: number } | null>(null);
  const streak = (() => {
    let k = 0;
    while (k < on.length && on[k]) k++;
    return k;
  })();

  const tickToday = () =>
    setOn((a) => {
      const next = [...a];
      const i = next.findIndex((v) => !v);
      if (i >= 0) {
        next[i] = true;
        setJust({ i, k: Date.now() });
      }
      return next;
    });

  return (
    <div className="cx jh">
      <div className="cx-scroll">
        <header className="jh-top">
          <span className="jh-logo" aria-hidden>
            JC
          </span>
          <nav aria-label="Concept navigation">
            <span>Book</span>
            <span>Newsletter</span>
            <span>Articles</span>
          </nav>
          <span className="jh-cta">Subscribe</span>
        </header>

        <section className="jh-hero">
          <div className="jh-copy">
            <p className="jh-pill">New every Thursday</p>
            <h1>
              Tiny changes, <span className="grad">remarkable results.</span>
            </h1>
            <p className="jh-sub">Author of Atomic Habits. Writing about habits, decision making and continuous improvement.</p>
            <span className="jh-cta solid">Read the first chapter</span>
          </div>
          {c.photo && (
            <figure className="jh-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.photo.src} alt="James Clear on stage" />
              <figcaption>James Clear, speaking</figcaption>
            </figure>
          )}
        </section>

        <section className="jh-stack" aria-label="Habit stack">
          <p className="jh-label">Habit stack · try it</p>
          <p className="jh-sentence">
            After I{" "}
            <input aria-label="A habit you already do" value={before} onChange={(e) => setBefore(e.target.value.slice(0, 28))} size={Math.max(before.length, 6)} />, I will{" "}
            <input aria-label="The new habit" value={after} onChange={(e) => setAfter(e.target.value.slice(0, 28))} size={Math.max(after.length, 6)} />.
          </p>

          <div className="jh-track">
            <div>
              <div className="jh-days" role="group" aria-label="Habit days">
                {on.map((v, i) => (
                  <button key={i} type="button" aria-pressed={v} aria-label={`Day ${i + 1}`} data-on={v} onClick={() => {
                      if (!v) setJust({ i, k: Date.now() });
                      setOn((a) => a.map((q, k) => (k === i ? !q : q)));
                    }} className={just?.i === i ? "just" : undefined} style={{ ["--i" as string]: i }}>
                    <svg viewBox="0 0 24 24" aria-hidden>
                      <path d="M5 13l4 4 10-10" />
                    </svg>
                  </button>
                ))}
              </div>
              <button type="button" className="jh-btn" onClick={tickToday}>
                <span className="jh-btn-label">Tick today</span>
                {just && <span key={just.k} className="jh-ripple" aria-hidden />}
              </button>
              <p className="jh-streak" aria-live="polite">
                <i aria-hidden />
                {streak} {streak === 1 ? "day" : "days"} in a row
              </p>
            </div>
            <div className="jh-read">
              <b>{shown.toFixed(2)}×</b>
              <span>after {n} days at 1% a day</span>
              <Curve n={n} />
              <small>
                One year at 1% a day: {YEAR.toFixed(2)}×
              </small>
            </div>
          </div>
        </section>

        <section className="jh-laws" aria-label="The four laws">
          <p className="jh-label">The four laws</p>
          <h2>
            Four ideas, <span className="grad">at a glance.</span>
          </h2>
          <div>
            {laws.map((l) => (
              <article key={l.k}>
                <span className="n">0{l.k}</span>
                <LawIcon kind={l.icon} />
                <b>{l.t}</b>
                <em>{l.d}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="jh-mail" aria-label="3-2-1 Thursday">
          <div className="jh-mail-card">
            <p className="jh-mail-head">
              <span>3-2-1 Thursday</span>
              <i>Every Thursday</i>
            </p>
            {[
              ["3", "short ideas from James"],
              ["2", "quotes from others"],
              ["1", "question for you"],
            ].map(([k, l]) => (
              <div key={k} className="row">
                <b>{k}</b>
                <span>{l}</span>
              </div>
            ))}
          </div>
          <div className="jh-mail-copy">
            <h2>
              One email. <span className="grad">Every Thursday.</span>
            </h2>
            <p>Read by more than three million people, per his site.</p>
            <span className="jh-cta solid">Join 3-2-1 Thursday</span>
          </div>
        </section>

        <BookShowcase c={c} t={XT} />
        <PortraitBand c={c} t={XT} kicker="The author" />
        <FilmStrip c={c} t={XT} label="In frame" />

        <section ref={nums} className="jh-nums" data-seen={seen} aria-label="Numbers">
          {[
            ["3M+", "newsletter readers, per his site"],
            ["#1", "New York Times bestseller"],
            ["2018", "Atomic Habits published"],
            ["37.78×", "1% a day, for a year"],
          ].map(([a, b], i) => (
            <div key={a} style={{ ["--i" as string]: i }}>
              <b>{a}</b>
              <span>{b}</span>
            </div>
          ))}
        </section>

        <footer className="jh-foot">
          <p>
            Let’s build one <span className="grad">good habit.</span>
          </p>
          <small>{c.domain} · concept by RURO</small>
        </footer>
      </div>
    </div>
  );
}
