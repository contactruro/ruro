"use client";

import { useEffect, useState } from "react";
import type { Concept } from "@/lib/showcase";
import { useSeen } from "./useSeen";
import "./concepts.css";
import "./nikhil.css";
import { BuiltCards, FilmStrip, PortraitBand, type XTheme } from "./Extras";

const XT: XTheme = { bg: "#f6f4ef", paper: "#fbfaf7", ink: "#15171c", soft: "#6b6e76", rule: "#e1ded6", accent: "#2b4c8c" };

/* Concept: Nikhil Kamath, "The Ledger". A washed off-white page set like a well-made annual report: a quiet header
   with a live Bengaluru clock; a hero with the claim, three plain facts and a portrait; a slow line of what he has
   built; a four-stop journey that draws itself as it scrolls into view; a table of companies with a detail panel;
   a recognition band; the podcast as a waveform; and one clear way to reach him. No prices or performance figures
   appear anywhere. Every fact comes from lib/showcase.ts. */

const list = [
  { sym: "ZERODHA", role: "Co-founder", since: "2010", note: "A stockbroker, co-founded with his brother Nithin." },
  { sym: "TRUE BEACON", role: "Co-founder", since: "–", note: "An investment firm, built with his brother." },
  { sym: "RAINMATTER", role: "Set up by Zerodha", since: "–", note: "An initiative and foundation that Zerodha set up alongside the broker." },
  { sym: "PEOPLE BY WTF", role: "Host", since: "Now", note: "Long conversations with founders and thinkers." },
  { sym: "EARLY START", role: "Trader", since: "Teens", note: "Left school at 14, worked in a call centre and began trading as a teenager." },
];

const tape = ["ZERODHA", "TRUE BEACON", "RAINMATTER", "PEOPLE BY WTF"];

const facts = [
  ["14", "Left school and began trading"],
  ["2010", "Co-founded Zerodha"],
  ["Host", "People by WTF, today"],
] as const;

function Clock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = () =>
      setT(new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Kolkata" }).format(new Date()));
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="nk-clock" aria-label="Local time in Bengaluru">
      <i /> {t || " "} IST
    </span>
  );
}

export function NikhilConcept({ c }: { c: Concept }) {
  const [sel, setSel] = useState(0);
  const [bars, seen] = useSeen<HTMLElement>(0.3);
  const [journey, journeySeen] = useSeen<HTMLElement>(0.25);
  const pick = list[sel];
  return (
    <div className="cx nk">
      <div className="cx-scroll">
        <header className="nk-top">
          <b>
            <i>NK</i> Nikhil Kamath
          </b>
          <nav aria-label="Concept navigation">
            <span>Journey</span>
            <span>Companies</span>
            <span>Podcast</span>
            <span>Contact</span>
          </nav>
          <Clock />
        </header>

        <section className="nk-hero">
          <div className="nk-copy">
            <p className="nk-tag">TRADER · CO-FOUNDER · HOST</p>
            <h1>
              Started as a trader. <span>Built the rest.</span>
            </h1>
            <p className="nk-sub">Left school at 14 and began trading as a teenager. Co-founded Zerodha in 2010, then True Beacon, and now hosts People by WTF.</p>
            <dl className="nk-facts">
              {facts.map(([n, l]) => (
                <div key={l}>
                  <dt>{n}</dt>
                  <dd>{l}</dd>
                </div>
              ))}
            </dl>
            <span className="nk-cta">See what he has built ↓</span>
          </div>
          <figure className="nk-frame">
            {c.photo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={c.photo.src} alt="Nikhil Kamath" />
            )}
            <figcaption>
              <b>NIKHIL KAMATH</b>
              <span>Co-founder, Zerodha</span>
            </figcaption>
          </figure>
        </section>

        <div className="nk-tape" aria-hidden>
          <div>
            {[...tape, ...tape, ...tape, ...tape].map((t, i) => (
              <span key={i}>
                {t} <em>▲</em>
              </span>
            ))}
          </div>
        </div>

        <section ref={journey} className="nk-journey" data-seen={journeySeen} aria-label="Journey">
          <p className="nk-label">JOURNEY · HOW IT BEGAN</p>
          <h2>From a call centre to a founder’s desk.</h2>
          <ol>
            {c.story.map((s, i) => (
              <li key={s.title} style={{ ["--i" as string]: i }}>
                <span className="yr">{s.year}</span>
                <i aria-hidden />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="nk-list" aria-label="Companies">
          <p className="nk-label">COMPANIES · WHAT HE HAS BUILT</p>
          <div className="nk-grid">
            <ul role="listbox" aria-label="Companies and shows">
              <li className="head" aria-hidden>
                <span>NAME</span>
                <span>ROLE</span>
                <span>SINCE</span>
              </li>
              {list.map((r, i) => (
                <li key={r.sym} role="option" aria-selected={sel === i}>
                  <button type="button" onClick={() => setSel(i)} onMouseEnter={() => setSel(i)}>
                    <b>{r.sym}</b>
                    <span>{r.role}</span>
                    <span>{r.since}</span>
                  </button>
                </li>
              ))}
            </ul>
            <article className="nk-ticket" key={sel}>
              <p className="nk-label">DETAIL</p>
              <h2>{pick.sym}</h2>
              <p className="r">{pick.role}</p>
              <p>{pick.note}</p>
            </article>
          </div>
        </section>

        <section className="nk-proof" aria-label="Recognition and media">
          <p className="nk-label">RECOGNITION · COMPANIES · MEDIA</p>
          <div>
            {c.proof.map((p) => (
              <article key={p.kind}>
                <span>{p.kind}</span>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        <PortraitBand c={c} t={XT} kicker="The person" />
        <BuiltCards c={c} t={XT} />
        <FilmStrip c={c} t={XT} label="In frame" />

        <section ref={bars} className="nk-wave" data-seen={seen} aria-label="People by WTF">
          <p className="nk-label">ON AIR</p>
          <h2>People by WTF</h2>
          <div aria-hidden>
            {Array.from({ length: 48 }, (_, i) => (
              <i key={i} style={{ ["--d" as string]: `${(i * 53) % 9}`, ["--h" as string]: `${28 + ((i * 37) % 62)}%` }} />
            ))}
          </div>
          <p>Long conversations with founders and thinkers. The wave is decoration.</p>
        </section>

        <footer className="nk-foot">
          <p className="nk-label">CONTACT</p>
          <h2>One clear way to reach him.</h2>
          <span className="nk-cta solid">Get in touch</span>
          <small>press · speaking · collaborations</small>
          <small>{c.domain} · concept by RURO</small>
        </footer>
      </div>
    </div>
  );
}
