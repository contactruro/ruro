"use client";

import { useEffect, useRef, useState } from "react";
import type { Concept } from "@/lib/showcase";
import { useSeen } from "./useSeen";
import "./concepts.css";
import "./paul.css";
import { CodeBlock, FilmStrip, PortraitBand, type XTheme } from "./Extras";

const XT: XTheme = { bg: "#fbfaf7", paper: "#fffefb", ink: "#17181c", soft: "#5c5e66", rule: "#e3e1da", accent: "#4a4f9c", serif: true };

/* Concept: Paul Graham, "The Essay Machine". Where his real site is a bare list, this one is a reading room: a
   quiet paper page in a book serif, with one indigo. It opens on his name and a plain line about him, offers a
   random essay to start from, shelves the essays by topic, draws a four-stop timeline as it scrolls into view and
   stands his three books on a shelf. Essay titles and years are public; the rest is RURO's. See lib/showcase.ts. */

type Topic = "Startups" | "Programming" | "Writing & ideas";
type Essay = { t: string; y: number; topic: Topic };

const essays: Essay[] = [
  { t: "How to Do Great Work", y: 2023, topic: "Writing & ideas" },
  { t: "Do Things That Don’t Scale", y: 2013, topic: "Startups" },
  { t: "Maker’s Schedule, Manager’s Schedule", y: 2009, topic: "Programming" },
  { t: "Beating the Averages", y: 2001, topic: "Programming" },
  { t: "The Age of the Essay", y: 2004, topic: "Writing & ideas" },
  { t: "Startup = Growth", y: 2012, topic: "Startups" },
  { t: "How to Get New Ideas", y: 2005, topic: "Writing & ideas" },
  { t: "Cities and Ambition", y: 2008, topic: "Writing & ideas" },
  { t: "Default Alive or Default Dead?", y: 2015, topic: "Startups" },
  { t: "Taste for Makers", y: 2002, topic: "Programming" },
  { t: "Putting Ideas into Words", y: 2022, topic: "Writing & ideas" },
  { t: "How to Start a Startup", y: 2005, topic: "Startups" },
  { t: "Keep Your Identity Small", y: 2009, topic: "Writing & ideas" },
  { t: "Write Simply", y: 2015, topic: "Writing & ideas" },
];

const TOPICS: Topic[] = ["Startups", "Programming", "Writing & ideas"];

const books = [
  { t: "Hackers & Painters", c: "#3f4486", h: 190 },
  { t: "On Lisp", c: "#8a6a1f", h: 170 },
  { t: "ANSI Common Lisp", c: "#3f6b57", h: 182 },
];

const timeline = [
  { y: "1995", t: "Viaweb", d: "Co-founded one of the first companies to build web applications." },
  { y: "1998", t: "Yahoo", d: "Viaweb was acquired and became Yahoo Store." },
  { y: "2005", t: "Y Combinator", d: "Co-founded with Jessica Livingston, Robert Morris and Trevor Blackwell." },
  { y: "Now", t: "The essays", d: "More than two hundred and twenty, and still going." },
];

export function PaulConcept({ c }: { c: Concept }) {
  const [i, setI] = useState(0);
  const [spin, setSpin] = useState(false);
  const [shown, setShown] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [tl, tlSeen] = useSeen<HTMLElement>(0.3);
  const cur = essays[shown];

  useEffect(
    () => () => {
      if (timer.current) clearInterval(timer.current);
    },
    [],
  );

  const pull = () => {
    if (spin) return;
    setSpin(true);
    let n = 0;
    const land = Math.floor(Math.random() * essays.length);
    timer.current = setInterval(() => {
      n++;
      setShown(n >= 12 ? land : Math.floor(Math.random() * essays.length));
      if (n >= 12 && timer.current) {
        clearInterval(timer.current);
        setSpin(false);
        setI((v) => v + 1);
      }
    }, 70);
  };

  return (
    <div className="cx pg">
      <div className="cx-scroll">
        <header className="pg-top">
          <svg viewBox="0 0 48 48" className="pg-doodle d1" aria-label="Lambda mark" role="img">
            <circle cx="24" cy="24" r="21" />
            <path d="M15 12l8 0 11 24M26 26L14 38" />
          </svg>
          <nav aria-label="Concept navigation">
            <span>Essays</span>
            <span>Books</span>
            <span>About</span>
          </nav>
          <span className="pg-rss">RSS</span>
        </header>

        <section className="pg-hero">
          <div className="pg-copy">
            <p className="pg-kicker">Essayist · Programmer · Investor</p>
            <h1 className="pg-name">
              Paul <span className="pg-mark">Graham</span>
            </h1>
            <p className="pg-line">Co-founder of Y Combinator. Programmer and essayist, writing about startups, programming and how to do great work.</p>
            <div className="pg-chips" aria-hidden>
              {TOPICS.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          {c.photo && (
            <figure className="pg-sticker">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src={c.photo.src} alt="Paul Graham" />
              <figcaption>Paul Graham</figcaption>
            </figure>
          )}
        </section>

        <section className="pg-machine" aria-label="A random essay">
          <div className="pg-machine-card">
            <div className="pg-machine-top">
              <span>START ANYWHERE</span>
              <span>{essays.length} of 220+</span>
            </div>
            <div className="pg-reel" aria-live="polite" data-spin={spin} key={spin ? "s" : `l${i}`}>
              <span className="chip">
                {cur.topic} · {cur.y}
              </span>
              <p className="title">{cur.t}</p>
            </div>
            <button type="button" className="pg-pull" onClick={pull} disabled={spin}>
              {spin ? "Choosing…" : i === 0 ? "Choose an essay" : "Choose another"}
              <i aria-hidden>→</i>
            </button>
          </div>
          <p className="pg-machine-note">Titles and years are from his own essay index. Open any one on paulgraham.com.</p>
        </section>

        <section className="pg-topics" aria-label="Essays by topic">
          <h2 className="pg-h">On the shelf</h2>
          <div>
            {TOPICS.map((t) => (
              <article key={t} className="pg-shelf">
                <h3>{t}</h3>
                <ul>
                  {essays
                    .filter((e) => e.topic === t)
                    .slice(0, 4)
                    .map((e) => (
                      <li key={e.t}>
                        <span>{e.y}</span>
                        {e.t}
                      </li>
                    ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section ref={tl} className="pg-time" data-seen={tlSeen} aria-label="Timeline">
          <h2 className="pg-h">How it began</h2>
          <ol>
            {timeline.map((s, k) => (
              <li key={s.y} style={{ ["--k" as string]: k }}>
                <span className="yr">{s.y}</span>
                <i aria-hidden />
                <b>{s.t}</b>
                <em>{s.d}</em>
              </li>
            ))}
          </ol>
        </section>

        <section className="pg-books" aria-label="Books">
          <h2 className="pg-h">Three books</h2>
          <div>
            {books.map((b) => (
              <span key={b.t} className="spine" style={{ background: b.c, height: b.h }}>
                <b>{b.t}</b>
              </span>
            ))}
          </div>
          <p>Hover a spine to pull it out.</p>
        </section>

        <CodeBlock t={XT} />
        <PortraitBand c={c} t={XT} kicker="The essayist" />
        <FilmStrip c={c} t={XT} label="In frame" />

        <footer className="pg-foot">
          <p>Follow new essays.</p>
          <span className="pg-btn">Subscribe by RSS</span>
          <small>{c.domain} · concept by RURO</small>
        </footer>
      </div>
    </div>
  );
}
