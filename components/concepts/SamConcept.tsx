"use client";

import { useState } from "react";
import type { Concept } from "@/lib/showcase";
import { useSeen } from "./useSeen";
import "./concepts.css";
import { EssayShelf, FilmStrip, PortraitBand, type XTheme } from "./Extras";

const XT: XTheme = { bg: "#f5f3ee", paper: "#fbfaf6", ink: "#1a1a18", soft: "#6a675f", rule: "#dedad0", accent: "#3b6b4a" };

/* Concept: Sam Altman, built after the mood of parosayshi.com. Warm paper, drifting leaf shadows,
   one calm sentence with pill words and a thumbnail portrait, a short resume, quiet essay cards and
   a hand-signed note. Facts are public; see lib/showcase.ts. */

const essays = [
  { tag: "Essay · 2024", t: "The Intelligence Age", d: "On what becomes possible as intelligence gets cheap.", href: "https://ia.samaltman.com" },
  { tag: "Essay · 2021", t: "Moore’s Law for Everything", d: "A proposal for sharing the gains of technology widely.", href: "https://moores.samaltman.com" },
  { tag: "Essay · 2019", t: "How To Be Successful", d: "A list of habits for building a career.", href: "https://blog.samaltman.com/how-to-be-successful" },
];

const resume = [
  { a: "OpenAI", b: "CEO · AI research and products", y: "2019—Present" },
  { a: "Y Combinator", b: "President · Startup accelerator", y: "2014—19" },
  { a: "Loopt", b: "Co-founder · Location-sharing app", y: "2005—12" },
  { a: "Stanford University", b: "Computer science, left to start Loopt", y: "2003—05" },
];

/* A fixed scatter of soft discs: the dappled light of a tree, blurred and slowly swaying. */
const leaves = Array.from({ length: 46 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { x: 6 + r(1) * 88, y: 4 + r(2) * 60, s: 14 + r(3) * 34, o: 0.25 + r(4) * 0.55 };
});

function Pill({ children, note }: { children: React.ReactNode; note: string }) {
  const [open, setOpen] = useState(false);
  return (
    <button type="button" className="sm-pill" aria-expanded={open} onClick={() => setOpen((v) => !v)} onBlur={() => setOpen(false)}>
      {children}
      <span role="note" className="sm-tip" data-open={open}>
        {note}
      </span>
    </button>
  );
}

function Card({ e }: { e: (typeof essays)[number] }) {
  const [ref, seen] = useSeen<HTMLAnchorElement>(0.2);
  return (
    <a ref={ref} href={e.href} target="_blank" rel="noopener noreferrer nofollow" className="sm-card" data-seen={seen}>
      <span className="tag">{e.tag}</span>
      <span className="t">{e.t}</span>
      <span className="d">{e.d}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

export function SamConcept({ c }: { c: Concept }) {
  const [sig, seen] = useSeen<HTMLDivElement>(0.4);
  return (
    <div className="cx sm">
      <div className="cx-scroll">
        <svg className="sm-light" aria-hidden viewBox="0 0 100 70" preserveAspectRatio="xMidYMin slice">
          <defs>
            <filter id="sm-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.1" />
            </filter>
          </defs>
          <g filter="url(#sm-blur)">
            {leaves.map((l, i) => (
              <ellipse key={i} cx={l.x} cy={l.y} rx={l.s / 14} ry={l.s / 17} opacity={l.o} transform={`rotate(${(i * 37) % 180} ${l.x} ${l.y})`} />
            ))}
          </g>
        </svg>

        <header className="sm-top">
          <span>Sam</span>
          <span className="r">Resume</span>
        </header>

        <section className="sm-hero">
          <h1>
            Hi, I am Sam
            {c.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={c.photo.src} alt="Sam Altman" className="sm-face" />
            )}
            <br />A <Pill note="CEO of OpenAI. Before that, president of Y Combinator.">builder</Pill> who writes about{" "}
            <Pill note="The idea behind ‘The Intelligence Age’: intelligence as an abundant resource.">abundance</Pill> and what comes next.
          </h1>
          <p>
            I run OpenAI. Before that I ran Y Combinator, and before that I started a company at nineteen.
          </p>
          <p>I write essays about technology and what it makes possible. This page is the short version.</p>
          <div ref={sig} className="sm-sig" data-seen={seen} aria-hidden>
            Sam
            <i />
          </div>
        </section>

        <section className="sm-writing" aria-label="Writing">
          <p className="sm-label">Writing</p>
          <div>
            {essays.map((e) => (
              <Card key={e.t} e={e} />
            ))}
          </div>
        </section>

        <section className="sm-resume" aria-label="Resume">
          <p className="sm-label">Resume</p>
          <ul>
            {resume.map((r) => (
              <li key={r.a}>
                <span>
                  <b>{r.a}</b>
                  <em>{r.b}</em>
                </span>
                <span className="y">{r.y}</span>
              </li>
            ))}
          </ul>
        </section>

        <EssayShelf c={c} t={XT} />
        <PortraitBand c={c} t={XT} kicker="The person" />
        <FilmStrip c={c} t={XT} label="In frame" />

        <footer className="sm-foot">
          <b aria-hidden>ALTMAN</b>
          <p>a note about me…</p>
          <span>
            <i>Read the blog</i>
            <i>Follow on X</i>
          </span>
          <small>{c.domain} · concept by RURO</small>
        </footer>
      </div>
    </div>
  );
}
