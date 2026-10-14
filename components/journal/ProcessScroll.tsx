"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { InstagramLogo, LinkedinLogo, Megaphone, Microphone, Newspaper } from "@phosphor-icons/react";

/* The pinned scene at the top of the Journal. A tall section holds a full-screen stage; scrolling drives
   it, so the reader watches the argument happen rather than reading it. Four beats, taken from the lead
   essay: someone searches your name, whatever ranks speaks, nobody is in charge of it, and a primary
   source puts it in order. The result cards are illustrative. Under reduced motion it becomes a plain
   list of the same four beats.

   The stage is dark royal blue and gold, like a theatre. The results are parchment tablets that carry the mark of
   the place they come from (LinkedIn, a news site, a press release, a conference, Instagram). Each beat brings a Greek
   figure on stage: a herald for the search, a speaker for whatever ranks, a blindfolded bust for nobody in charge, and
   Athena with a rising sun for the primary source. */

const NAME = "your name";

const beats = [
  { k: "01", t: "It starts with a search.", d: "Before the meeting, before the call, before the introduction is accepted, someone types your name." },
  { k: "02", t: "Whatever ranks, speaks.", d: "Every result is technically about you. None of them was written to represent you." },
  { k: "03", t: "Nobody is in charge.", d: "Ranking rewards activity, not significance. Your reputation is summarised by accident." },
  { k: "04", t: "Give them a primary source.", d: "A permanent address where identity, story, work and proof are stated with care. Everything else becomes context." },
];

/* Illustrative results. Each has a scattered pose, a drifted pose, and a tucked-away pose. */
const cards = [
  { t: "LinkedIn", Icon: LinkedinLogo, color: "#0a66c2", d: "Last edited three roles ago", pose: { x: -27, y: -4, r: -5 }, from: { x: -80, y: 20 } },
  { t: "News story", Icon: Newspaper, color: "#3a3a3a", d: "A funding round that is now history", pose: { x: 24, y: -14, r: 4 }, from: { x: 80, y: -30 } },
  { t: "Press release", Icon: Megaphone, color: "#9b111e", d: "Written for a funding round", pose: { x: -4, y: 12, r: 2 }, from: { x: 0, y: 90 } },
  { t: "Conference bio", Icon: Microphone, color: "#5a4a2a", d: "Written by an events coordinator", pose: { x: 28, y: 14, r: -3 }, from: { x: 90, y: 40 } },
  { t: "Photograph", Icon: InstagramLogo, color: "#d6249f", d: "From a decade earlier", pose: { x: -26, y: 20, r: 5 }, from: { x: -90, y: 60 } },
];

function kf(p: MotionValue<number>, times: number[], values: number[]) {
  return useTransform(p, times, values, { clamp: true });
}

function ResultCard({ p, i, k }: { p: MotionValue<number>; i: number; k: number }) {
  const c0 = cards[i];
  // k < 1 on narrow screens: pull the scattered poses in so nothing leaves the viewport.
  const c = { ...c0, pose: { x: c0.pose.x * k, y: c0.pose.y * (k < 1 ? 0.75 : 1), r: c0.pose.r }, from: c0.from };
  const a = 0.14 + i * 0.045; // staggered entrance
  const x = kf(p, [a, a + 0.14, 0.5, 0.58, 0.66, 0.78], [c.from.x, c.pose.x, c.pose.x, c.pose.x + (i % 2 ? 1.6 : -1.6), c.pose.x, c.pose.x * 1.35]);
  const y = kf(p, [a, a + 0.14, 0.5, 0.58, 0.66, 0.78], [c.from.y, c.pose.y, c.pose.y, c.pose.y + (i % 2 ? -1.2 : 1.2), c.pose.y, c.pose.y * 0.6 + 6]);
  const rot = kf(p, [a, a + 0.14, 0.5, 0.58, 0.66, 0.78], [c.pose.r * 4, c.pose.r, c.pose.r, c.pose.r + 3, c.pose.r - 2, c.pose.r * 0.4]);
  const op = kf(p, [a, a + 0.08, 0.7, 0.8], [0, 1, 1, 0.38]);
  const scale = kf(p, [0.66, 0.8], [1, 0.74]);
  const gray = useTransform(p, [0.46, 0.6], [0, 1], { clamp: true });
  const blur = useTransform(p, [0.7, 0.8], [0, 3], { clamp: true });
  return (
    <motion.div
      aria-hidden
      className="absolute left-1/2 top-1/2 w-[min(15rem,44vw)] -translate-x-1/2 -translate-y-1/2 border-2 border-[#e6c27a] bg-[#f6efdc] p-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.7)]"
      style={{
        x: useTransform(x, (v) => `${v}vw`),
        y: useTransform(y, (v) => `${v}vh`),
        rotate: rot,
        opacity: op,
        scale,
        filter: useTransform([gray, blur], ([g, b]) => `grayscale(${g}) blur(${b}px)`),
      }}
    >
      <p className="flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink/70">
        <c.Icon weight="fill" aria-hidden className="size-4" style={{ color: c.color }} />
        {c.t}
      </p>
      <p className="mt-1 text-sm leading-snug text-ink/85">{c.d}</p>
      <div className="mt-2 flex gap-1">
        <i className="h-1 w-8 bg-ink/15" />
        <i className="h-1 w-5 bg-ink/10" />
      </div>
    </motion.div>
  );
}

function EstateCard({ p }: { p: MotionValue<number> }) {
  const scale = kf(p, [0.68, 0.82], [0.55, 1]);
  const op = kf(p, [0.68, 0.76], [0, 1]);
  const y = kf(p, [0.68, 0.82], [-14, 0]);
  const glow = kf(p, [0.82, 0.95], [0, 1]);
  const chips = ["Identity", "Story", "Work", "Proof"];
  return (
    <motion.div
      className="absolute left-1/2 top-1/2 w-[min(23rem,86vw)] -translate-x-1/2 -translate-y-1/2 border-2 border-[#e6c27a] bg-[#fbf6e8] p-5 text-ink"
      style={{ scale, opacity: op, y: useTransform(y, (v) => `${v}vh`), boxShadow: useTransform(glow, (g) => `0 0 0 ${g * 10}px rgba(168,32,45,${g * 0.12}), 0 30px 60px -28px rgba(20,22,43,0.55)`) }}
    >
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-accent">The first result · primary source</p>
      <p className="display mt-2 text-3xl">yourname.com</p>
      <p className="mt-1 text-sm text-ink/70">Stated with care, in your order.</p>
      <div className="mt-4 grid grid-cols-4 gap-1.5">
        {chips.map((c, i) => (
          <Chip key={c} p={p} i={i} label={c} />
        ))}
      </div>
    </motion.div>
  );
}

function Chip({ p, i, label }: { p: MotionValue<number>; i: number; label: string }) {
  const on = kf(p, [0.78 + i * 0.035, 0.82 + i * 0.035], [0, 1]);
  return (
    <motion.span className="px-1 py-1.5 text-center font-mono text-[0.6875rem] uppercase tracking-[0.1em]" style={{ backgroundColor: useTransform(on, (v) => `rgba(168,32,45,${0.08 + v * 0.92})`), color: useTransform(on, (v) => (v > 0.5 ? "#ffffff" : "#111111")) }}>
      {label}
    </motion.span>
  );
}

/* A Greek figure that walks on for its beat and off again. `side` is where it stands. */
function Figure({ p, src, side, from, to }: { p: MotionValue<number>; src: string; side: "l" | "r"; from: number; to: number }) {
  const end = Math.min(to, 0.95); // keep every offset inside 0 to 1
  const op = kf(p, [from, from + 0.05, end, end + 0.04], [0, 1, 1, 0]);
  const x = kf(p, [from, from + 0.07, end, end + 0.04], [side === "l" ? -8 : 8, 0, 0, side === "l" ? -4 : 4]);
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute bottom-[24%] z-[1] hidden h-[46svh] md:block ${side === "l" ? "left-[2%]" : "right-[2%]"}`}
      style={{ opacity: op, x: useTransform(x, (v) => `${v}vw`) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" draggable={false} className="jr-float h-full w-auto object-contain object-bottom drop-shadow-[0_24px_24px_rgba(0,0,0,0.55)]" style={{ "--fa": "6px" } as React.CSSProperties} />
    </motion.div>
  );
}

/* The sun that rises behind the primary source in the last beat. */
function Sun({ p }: { p: MotionValue<number> }) {
  const op = kf(p, [0.72, 0.86], [0, 0.9]);
  const scale = kf(p, [0.72, 0.9], [0.5, 1]);
  return (
    <motion.div aria-hidden className="pointer-events-none absolute left-1/2 top-[48%] z-0 -translate-x-1/2 -translate-y-1/2" style={{ opacity: op, scale }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/art/myth/gold-sun.webp" alt="" draggable={false} className="sun-turn size-[min(78vw,64svh)] object-contain" />
    </motion.div>
  );
}

function SearchBar({ p, typed }: { p: MotionValue<number>; typed: string }) {
  const y = kf(p, [0, 0.14], [8, 0]);
  const scale = kf(p, [0, 0.14, 0.2], [1.15, 1.15, 1]);
  const op = kf(p, [0.86, 0.92], [1, 0]);
  return (
    <motion.div
      className="absolute left-1/2 top-[21%] z-10 flex w-[min(92%,38rem)] md:top-[18%] -translate-x-1/2 items-center gap-3 border-2 border-[#e6c27a] bg-[#fbf6e8] px-5 py-4 text-ink shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)]"
      style={{ y: useTransform(y, (v) => `${v}vh`), scale, opacity: op }}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="size-5 flex-none text-ink/60" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.5-3.5" />
      </svg>
      <span className="text-lg text-ink md:text-xl">
        {typed}
        <i className="ml-0.5 inline-block h-5 w-px translate-y-1 animate-pulse bg-ink" />
      </span>
    </motion.div>
  );
}

export function ProcessScroll() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [typed, setTyped] = useState("");
  const [beat, setBeat] = useState(0);
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const f = () => setNarrow(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);

  useMotionValueEvent(p, "change", (v) => {
    setTyped(NAME.slice(0, Math.round(Math.min(v / 0.1, 1) * NAME.length)));
    setBeat(v < 0.2 ? 0 : v < 0.5 ? 1 : v < 0.72 ? 2 : 3);
  });

  const rail = useTransform(p, [0, 1], ["0%", "100%"]);
  const quote = kf(p, [0.9, 0.98], [0, 1]);
  const bg = useTransform(p, [0.5, 0.95], ["#121c33", "#17233b"]);

  if (reduce) {
    return (
      <section aria-labelledby="process-title" className="container-ed py-24">
        <h2 id="process-title" className="display text-4xl">What happens when someone searches your name</h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-2">
          {beats.map((b) => (
            <li key={b.k} className="border-t border-ink/30 pt-4">
              <span className="eyebrow text-accent">{b.k}</span>
              <p className="display mt-2 text-2xl">{b.t}</p>
              <p className="mt-2 text-lg text-ink/75">{b.d}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }

  return (
    <section ref={ref} aria-labelledby="process-title" className="relative h-[520vh]">
      <motion.div className="sticky top-0 h-svh overflow-hidden text-[#f5efe3]" style={{ backgroundColor: bg }}>
        {/* the site's glitter, on its own layer so this element can stay sticky */}
        <div aria-hidden className="sparkle pointer-events-none" style={{ position: "absolute", inset: 0 }} />
        <h2 id="process-title" className="sr-only">
          What happens when someone searches your name
        </h2>

        {/* Step rail */}
        <div className="absolute inset-x-0 top-[4.6rem] z-20 border-b border-[#e6c27a]/25 bg-[#121c33]/80 backdrop-blur md:top-20">
          <div className="container-ed flex items-center gap-4 py-3">
            <span className="eyebrow hidden text-[#e6c27a] sm:inline">The process</span>
            <ol className="flex flex-1 items-center gap-2">
              {beats.map((b, i) => (
                <li key={b.k} className={`flex-1 border-t-2 pt-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors duration-500 ${i <= beat ? "border-[#e6c27a] text-[#e6c27a]" : "border-white/20 text-white/40"}`}>
                  {b.k}
                </li>
              ))}
            </ol>
          </div>
          <motion.i aria-hidden className="absolute bottom-0 left-0 h-px bg-[#e6c27a]" style={{ width: rail }} />
        </div>

        <Sun p={p} />
        <Figure p={p} src="/art/myth/angel-head.webp" side="r" from={0.02} to={0.2} />
        <Figure p={p} src="/art/myth/bust-headphones.webp" side="l" from={0.2} to={0.5} />
        <Figure p={p} src="/art/myth/blindfold-bust.webp" side="r" from={0.5} to={0.72} />
        <Figure p={p} src="/art/myth/scholars-laptop.webp" side="l" from={0.72} to={1} />
        <SearchBar p={p} typed={typed} />

        <div className="absolute inset-x-0 bottom-[31%] top-[33%] md:bottom-[24%] md:top-[30%]">
          {cards.map((_, i) => (
            <ResultCard key={i} p={p} i={i} k={narrow ? 0.62 : 0.74} />
          ))}
          <EstateCard p={p} />
        </div>

        {/* Caption: swaps with the beat */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-ed pb-8 md:pb-12">
            <div key={beat} className="rise-in grid gap-3 md:grid-cols-12 md:items-end md:gap-10">
              <p className="eyebrow text-[#e6c27a] md:col-span-2">Beat {beats[beat].k}</p>
              <p className="display text-3xl md:col-span-5 md:text-5xl">{beats[beat].t}</p>
              <p className="text-base leading-snug text-[#f5efe3]/80 md:col-span-5 md:text-lg">{beats[beat].d}</p>
            </div>
          </div>
        </div>

        <motion.p
          aria-hidden
          className="display pointer-events-none absolute inset-x-0 top-[22%] z-20 md:top-[19%] px-6 text-center text-[clamp(1.6rem,4vw,3.4rem)] font-light"
          style={{ opacity: quote }}
        >
          You do not need to be louder. You need to be <span className="hl-on-dark">legible.</span>
        </motion.p>
        <p className="absolute right-4 top-32 z-20 hidden font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[#f5efe3]/50 md:block">Illustrative results</p>
      </motion.div>
    </section>
  );
}
