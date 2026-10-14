"use client";

import type { CSSProperties } from "react";
import type { Concept } from "@/lib/showcase";
import { useSeen } from "./useSeen";
import "./extras.css";

/* Extra sections shared by the four concept sites. Each one is themed by the concept that uses it (colours and type
   come in as CSS variables), and everything on them is either the person's own photograph, drawn animation that
   claims nothing, or a fact already in lib/showcase.ts. Every motion starts once the section is scrolled into view
   and stops under reduced motion. */

export type XTheme = { bg: string; paper: string; ink: string; soft: string; rule: string; accent: string; serif?: boolean };

const vars = (t: XTheme): CSSProperties =>
  ({ "--xt-bg": t.bg, "--xt-paper": t.paper, "--xt-ink": t.ink, "--xt-soft": t.soft, "--xt-rule": t.rule, "--xt-accent": t.accent, "--xt-font": t.serif ? "var(--font-display)" : "var(--font-sans)" }) as CSSProperties;

/* ── A wide portrait with a slow push-in, the name large over it and the roles as chips ── */
export function PortraitBand({ c, t, kicker }: { c: Concept; t: XTheme; kicker: string }) {
  const [ref, seen] = useSeen<HTMLElement>(0.25);
  if (!c.photo) return null;
  return (
    <section ref={ref} className="xt xt-band" data-seen={seen} style={vars(t)} aria-label={`${c.person}, portrait`}>
      <div className="xt-band-frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src={c.photo.src} alt={c.person} />
        <div aria-hidden className="xt-band-shade" />
        <div className="xt-band-copy">
          <p className="xt-label">{kicker}</p>
          <h2>{c.person}</h2>
          <p className="xt-sub">{c.line}</p>
          <ul className="xt-chips">
            {c.roles.map((r, i) => (
              <li key={r} style={{ ["--i" as string]: i }}>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── A strip of frames cut from the same photograph, drifting slowly past ── */
const CROPS = [
  { pos: "50% 14%", s: 1 },
  { pos: "50% 18%", s: 2.1 },
  { pos: "28% 34%", s: 1.7 },
  { pos: "72% 46%", s: 1.7 },
  { pos: "50% 82%", s: 1.5 },
  { pos: "50% 30%", s: 1.35 },
];
export function FilmStrip({ c, t, label }: { c: Concept; t: XTheme; label: string }) {
  const [ref, seen] = useSeen<HTMLElement>(0.2);
  if (!c.photo) return null;
  const frames = [...CROPS, ...CROPS];
  return (
    <section ref={ref} className="xt xt-film" data-seen={seen} style={vars(t)} aria-label={label}>
      <p className="xt-label xt-pad">{label}</p>
      <div className="xt-film-window" aria-hidden>
        <div className="xt-film-track">
          {frames.map((f, i) => (
            <figure key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={c.photo!.src} alt="" style={{ objectPosition: f.pos, transform: `scale(${f.s})`, transformOrigin: f.pos }} />
              <span>{String((i % CROPS.length) + 1).padStart(2, "0")}</span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Nikhil: what he has built, each drawn as a small living diagram ── */
function BuiltArt({ name }: { name: string }) {
  const n = name.toLowerCase();
  if (n.includes("zerodha"))
    return (
      <svg viewBox="0 0 120 70" className="xt-art" aria-hidden>
        <path className="grid" d="M0 60H120M0 40H120M0 20H120" />
        <path className="draw" d="M2 58L22 48L38 52L58 30L76 36L96 14L118 8" />
        <circle className="dot" cx="118" cy="8" r="3" />
      </svg>
    );
  if (n.includes("beacon"))
    return (
      <svg viewBox="0 0 120 70" className="xt-art" aria-hidden>
        <circle className="ring r1" cx="60" cy="38" r="8" />
        <circle className="ring r2" cx="60" cy="38" r="8" />
        <circle className="ring r3" cx="60" cy="38" r="8" />
        <path className="solid" d="M60 66V38M54 66H66" />
        <circle className="dot" cx="60" cy="36" r="4" />
      </svg>
    );
  if (n.includes("wtf") || n.includes("people"))
    return (
      <svg viewBox="0 0 120 70" className="xt-art" aria-hidden>
        {Array.from({ length: 17 }, (_, i) => (
          <rect key={i} className="bar" x={6 + i * 6.6} y="14" width="3.2" height="42" rx="1.6" style={{ ["--d" as string]: `${(i * 37) % 9}` }} />
        ))}
      </svg>
    );
  return (
    <svg viewBox="0 0 120 70" className="xt-art" aria-hidden>
      <circle className="ring r1" cx="60" cy="35" r="10" />
      <circle className="dot" cx="60" cy="35" r="4" />
    </svg>
  );
}
export function BuiltCards({ c, t }: { c: Concept; t: XTheme }) {
  const [ref, seen] = useSeen<HTMLElement>(0.2);
  return (
    <section ref={ref} className="xt xt-built" data-seen={seen} style={vars(t)} aria-label="What he has built">
      <p className="xt-label">What he has built</p>
      <h2>Three things, each in its own line of work.</h2>
      <div>
        {c.work.map((w, i) => (
          <article key={w.name} style={{ ["--i" as string]: i }}>
            <BuiltArt name={w.name} />
            <h3>{w.name}</h3>
            <span className="role">{w.role}</span>
            <p>{w.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── Sam: his essays as a reading list, each with a progress line that fills as it arrives ── */
export function EssayShelf({ c, t }: { c: Concept; t: XTheme }) {
  const [ref, seen] = useSeen<HTMLElement>(0.2);
  return (
    <section ref={ref} className="xt xt-shelf" data-seen={seen} style={vars(t)} aria-label="Essays to start with">
      <p className="xt-label">Start with these</p>
      <ol>
        {c.startHere.map((e, i) => (
          <li key={e.title} style={{ ["--i" as string]: i }}>
            <span className="num">0{i + 1}</span>
            <div>
              <h3>{e.title}</h3>
              <p>{e.note}</p>
              <i aria-hidden className="line" style={{ ["--w" as string]: `${[88, 64, 46][i % 3]}%` }} />
            </div>
            <span className="go" aria-hidden>
              →
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ── James: the book, drawn in CSS, floating, turning toward you when you hover ── */
export function BookShowcase({ c, t }: { c: Concept; t: XTheme }) {
  const [ref, seen] = useSeen<HTMLElement>(0.25);
  return (
    <section ref={ref} className="xt xt-book" data-seen={seen} style={vars(t)} aria-label="The book">
      <div className="stage" aria-hidden>
        <div className="book">
          <div className="cover">
            <span className="rule" />
            <b>Atomic Habits</b>
            <em>An easy and proven way to build good habits and break bad ones</em>
            <span className="by">James Clear</span>
          </div>
          <div className="spine" />
          <div className="pages" />
        </div>
        <i className="shadow" />
      </div>
      <div className="copy">
        <p className="xt-label">The book</p>
        <h2>One book, one clear idea.</h2>
        <ul>
          <li>
            <b>2018</b>
            <span>Atomic Habits published</span>
          </li>
          <li>
            <b>#1</b>
            <span>New York Times bestseller</span>
          </li>
        </ul>
        <p className="xt-sub">{c.startHere[0]?.note}</p>
      </div>
    </section>
  );
}

/* ── Paul: a little Lisp, typed out line by line (decoration only) ── */
export function CodeBlock({ t }: { t: XTheme }) {
  const [ref, seen] = useSeen<HTMLElement>(0.25);
  const lines = ["(define (essay idea)", "  (write (simplify idea)))", "", "(essay \"startups\")", "(essay \"how to do great work\")"];
  return (
    <section ref={ref} className="xt xt-code" data-seen={seen} style={vars(t)} aria-label="A little Lisp">
      <div className="copy">
        <p className="xt-label">Programmer first</p>
        <h2>He also wrote the books on Lisp.</h2>
        <p className="xt-sub">On Lisp and ANSI Common Lisp are on the shelf above. The code here is decoration, set in his favourite language.</p>
      </div>
      <pre aria-hidden>
        <span className="bar">
          <i />
          <i />
          <i />
        </span>
        {lines.map((l, i) => (
          <code key={i} style={{ ["--i" as string]: i }}>
            {l || " "}
          </code>
        ))}
        <span className="caret" />
      </pre>
    </section>
  );
}
