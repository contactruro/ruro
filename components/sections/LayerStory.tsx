"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/* One short, looping story per layer of the estate. Each tells what that layer does,
   drawn in currentColor so it works on every panel tone. Purely illustrative. */

const E = [0.32, 0.72, 0, 1] as const;

function useLoop(ms: number, enabled: boolean) {
  const [k, setK] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    const id = setInterval(() => setK((n) => n + 1), ms);
    return () => clearInterval(id);
  }, [ms, enabled]);
  return k;
}

/* ---------- 01 Identity: search → scattered results → one clear nameplate ---------- */
function Identity({ still }: { still: boolean }) {
  const q = "your name";
  const results = ["LinkedIn · three roles ago", "News · name misspelt", "Conference bio · 2019", "A namesake ranks first"];
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 px-4">
      <motion.div
        initial={still ? false : { opacity: 0, y: 10 }}
        animate={still ? { opacity: 0 } : { opacity: [0, 1, 1, 0], y: [10, 0, 0, -10] }}
        transition={{ duration: 3.4, times: [0, 0.1, 0.85, 1], ease: E }}
        className="absolute inset-x-6 top-6 flex flex-col gap-2"
      >
        <div className="flex items-center gap-2 rounded-none border border-current/30 px-4 py-2 font-mono text-xs">
          <span className="size-2.5 rounded-full border border-current" />
          {q.split("").map((ch, i) => (
            <motion.span key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.07 }}>
              {ch}
            </motion.span>
          ))}
        </div>
        {results.map((r, i) => (
          <motion.div
            key={r}
            initial={{ opacity: 0, x: i % 2 ? 24 : -24, rotate: i % 2 ? 2 : -2 }}
            animate={{ opacity: 0.75, x: 0, rotate: i % 2 ? 1.5 : -1.5 }}
            transition={{ delay: 1.1 + i * 0.18, duration: 0.5, ease: E }}
            className="rounded-lg border border-dashed border-current/40 px-3 py-1.5 text-xs"
            style={{ marginLeft: `${(i * 13) % 30}%`, width: "70%" }}
          >
            {r}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={still ? false : { opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: still ? 0 : 3.3, duration: 0.8, ease: E }}
        className="rounded-md border border-current px-6 py-5 text-center"
      >
        <p className="display text-3xl leading-none md:text-4xl">Your Name</p>
        <p className="mt-3 font-mono text-[0.6875rem] tracking-[0.3em]">FOUNDER · AUTHOR · INVESTOR</p>
        <motion.p
          initial={still ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: still ? 0 : 4, duration: 0.5 }}
          className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-none bg-current/15 px-3 py-1 font-mono text-[0.6875rem]"
        >
          <span>✓</span> yourname.com
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ---------- 02 Story: a career drawn as a line, chapter by chapter ---------- */
function Story({ still }: { still: boolean }) {
  const beats = [
    { x: 4, label: "First role", up: true },
    { x: 34, label: "Founded", up: false },
    { x: 64, label: "The exit", up: true },
    { x: 96, label: "Today", up: false },
  ];
  return (
    <div className="relative h-full w-full px-8">
      <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-current/25" />
      <motion.div
        className="absolute left-8 top-1/2 h-0.5 -translate-y-1/2 bg-current"
        initial={still ? false : { width: "0%" }}
        animate={{ width: "calc(100% - 4rem)" }}
        transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
      />
      {beats.map((b, i) => (
        <motion.div
          key={b.label}
          className="absolute top-1/2 flex -translate-x-1/2 flex-col items-center"
          style={{ left: `calc(2rem + (100% - 4rem) * ${b.x / 100})` }}
          initial={still ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: still ? 0 : 0.3 + i * 0.85, duration: 0.5, ease: E }}
        >
          <span className="absolute size-3.5 -translate-y-1/2 rounded-full border-2 border-current bg-current" />
          <span
            className={`absolute whitespace-nowrap rounded-none border border-current/40 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] ${
              b.up ? "-translate-y-[calc(100%+1.1rem)]" : "translate-y-[1.1rem]"
            }`}
          >
            {b.label}
          </span>
        </motion.div>
      ))}
      <motion.span
        className="absolute left-8 top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current shadow-[0_0_0_6px_rgba(255,255,255,0.18)]"
        initial={still ? false : { left: "2rem" }}
        animate={{ left: "calc(100% - 2rem)" }}
        transition={{ duration: 3, ease: "easeInOut", delay: 0.2 }}
      />
      <motion.span
        className="absolute bottom-6 left-8 font-mono text-[0.6875rem] tracking-[0.2em]"
        initial={still ? false : { opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: still ? 0 : 3.6 }}
      >
        ONE ARC, TOLD IN YOUR ORDER
      </motion.span>
    </div>
  );
}

/* ---------- 03 Work: clutter → the significant things, curated ---------- */
function Work({ still }: { still: boolean }) {
  const picks: Record<number, string> = { 0: "Company", 4: "Board seat", 6: "Investment", 8: "Landmark project" };
  return (
    <div className="grid h-full grid-cols-3 grid-rows-3 gap-2 p-6">
      {Array.from({ length: 9 }).map((_, i) => {
        const pick = picks[i];
        return (
          <motion.div
            key={i}
            className={`relative flex items-end overflow-hidden rounded-lg p-2 ${pick ? "" : "border border-current/30"}`}
            initial={still ? false : { opacity: 0, scale: 0.8 }}
            animate={
              still
                ? { opacity: pick ? 1 : 0.15, scale: 1 }
                : { opacity: pick ? [0, 0.45, 1] : [0, 0.45, 0.12], scale: pick ? [0.8, 1, 1.04] : [0.8, 1, 0.94] }
            }
            transition={{ duration: 3.4, times: [0, 0.3, 0.75], delay: i * 0.06, ease: E }}
          >
            {pick && (
              <>
                <motion.span
                  className="absolute inset-0 bg-current"
                  initial={still ? false : { opacity: 0 }}
                  animate={{ opacity: 0.22 }}
                  transition={{ delay: still ? 0 : 2.4 + i * 0.05, duration: 0.6 }}
                />
                <motion.span
                  className="relative font-mono text-[0.6875rem] uppercase tracking-[0.12em]"
                  initial={still ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: still ? 0 : 2.8 + i * 0.05, duration: 0.5 }}
                >
                  {pick}
                </motion.span>
              </>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ---------- 04 Proof: recognition lands, a quote writes itself, verified ---------- */
function Proof({ still }: { still: boolean }) {
  const badges = ["Award", "Press", "Board", "Publication"];
  const quote = "The most considered operator in the sector.";
  return (
    <div className="flex h-full flex-col justify-center gap-5 px-6">
      <div className="flex items-end gap-2 border-b border-current/40 pb-2">
        {badges.map((b, i) => (
          <motion.span
            key={b}
            className="rounded-md border border-current px-2.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em]"
            initial={still ? false : { y: -60, opacity: 0, rotate: i % 2 ? 8 : -8 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 13, delay: still ? 0 : 0.2 + i * 0.25 }}
          >
            {b}
          </motion.span>
        ))}
      </div>
      <div className="relative">
        <span className="display absolute -left-1 -top-6 text-6xl leading-none opacity-50">“</span>
        <p className="display pl-6 text-xl leading-snug md:text-2xl">
          {quote.split(" ").map((w, i) => (
            <motion.span
              key={i}
              className="mr-[0.25em] inline-block"
              initial={still ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: still ? 0 : 1.5 + i * 0.12 }}
            >
              {w}
            </motion.span>
          ))}
        </p>
        <p className="mt-2 pl-6 font-mono text-[0.6875rem] uppercase tracking-[0.14em] opacity-70">— Illustrative source</p>
      </div>
      <motion.span
        className="w-fit rounded-none border-2 border-current px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em]"
        initial={still ? false : { scale: 1.8, opacity: 0, rotate: -12 }}
        animate={{ scale: 1, opacity: 1, rotate: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 14, delay: still ? 0 : 3 }}
      >
        ✓ Sourced &amp; verified
      </motion.span>
    </div>
  );
}

/* ---------- 05 Media: every talk and interview, gathered into one library ---------- */
function Media({ still }: { still: boolean }) {
  const items = [
    ["Keynote", "Annual summit", "24:10"],
    ["Podcast", "Long-form interview", "48:32"],
    ["Panel", "Industry roundtable", "36:05"],
  ];
  return (
    <div className="flex h-full flex-col justify-center gap-4 px-6">
      <div className="flex items-center gap-4">
        <motion.span
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-current/20"
          animate={still ? undefined : { scale: [1, 1.08, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        >
          <svg viewBox="0 0 10 10" className="ml-0.5 size-3.5" aria-hidden>
            <path d="M2 1 L9 5 L2 9 Z" fill="currentColor" />
          </svg>
        </motion.span>
        <div className="flex h-10 flex-1 items-center gap-[3px]">
          {Array.from({ length: 34 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[3px] flex-1 rounded-full bg-current"
              style={{ height: `${20 + Math.abs(Math.sin(i * 1.3)) * 80}%`, originY: 0.5 }}
              animate={still ? undefined : { scaleY: [0.3, 1, 0.5, 0.9, 0.3] }}
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.04 }}
            />
          ))}
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {items.map(([kind, title, dur], i) => (
          <motion.li
            key={kind}
            className="relative flex items-center justify-between overflow-hidden rounded-lg border border-current/30 px-3 py-2 text-xs"
            initial={still ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: still ? 0 : 0.8 + i * 0.35, duration: 0.6, ease: E }}
          >
            {i === 0 && (
              <motion.span
                className="absolute inset-y-0 left-0 bg-current/15"
                initial={{ width: "0%" }}
                animate={{ width: still ? "40%" : "72%" }}
                transition={{ delay: still ? 0 : 2.2, duration: 3, ease: "linear" }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] opacity-70">{kind}</span>
              <span className="font-semibold">{title}</span>
            </span>
            <span className="relative font-mono text-[0.6875rem] opacity-70">{dur}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- 06 Journal: an essay writes itself, then is published at your address ---------- */
function Journal({ still }: { still: boolean }) {
  const widths = [92, 86, 95, 70, 88, 52];
  const title = "On reputation";
  return (
    <div className="relative flex h-full items-center justify-center p-6">
      <div className="relative w-[78%] rounded-md border border-current/40 p-5">
        <p className="display text-2xl leading-none">
          {title.split("").map((ch, i) => (
            <motion.span key={i} initial={still ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: still ? 0 : 0.2 + i * 0.06 }}>
              {ch}
            </motion.span>
          ))}
        </p>
        <div className="mt-4 flex flex-col gap-2">
          {widths.map((w, i) => (
            <motion.span
              key={i}
              className="h-1.5 rounded-full bg-current/45"
              initial={still ? false : { width: "0%" }}
              animate={{ width: `${w}%` }}
              transition={{ delay: still ? 0 : 1.1 + i * 0.3, duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </div>
        <motion.span
          className="absolute -right-3 -top-3 rounded-none border-2 border-current bg-current/10 px-3 py-1 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.16em] backdrop-blur-sm"
          initial={still ? false : { scale: 1.8, opacity: 0, rotate: 14 }}
          animate={{ scale: 1, opacity: 1, rotate: 6 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: still ? 0 : 3.3 }}
        >
          Published
        </motion.span>
      </div>
      <motion.p
        className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6875rem]"
        initial={still ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ delay: still ? 0 : 3.7, duration: 0.5 }}
      >
        yourname.com/journal/on-reputation
      </motion.p>
    </div>
  );
}

const STORIES = [Identity, Story, Work, Proof, Media, Journal];

export function LayerStory({ index }: { index: number }) {
  const reduce = !!useReducedMotion();
  const loop = useLoop(7000, !reduce);
  const Comp = STORIES[index];
  return (
    <div className="relative h-full w-full" aria-hidden>
      <Comp key={`${index}-${loop}`} still={reduce} />
    </div>
  );
}
