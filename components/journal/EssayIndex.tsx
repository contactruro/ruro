"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { formatDate } from "@/lib/format";
import { EssayArt, type Tone } from "./EssayArt";
import { SkyScene } from "../atelier/Scenes";

/* The contents, as a working index. On large screens a plate on the left stays in view and changes to
   whichever essay you point at (or scroll to): the colour of the plate washes in from the corner, a
   motion graphic that explains that essay plays, and its title and dek arrive word by word. The essays sit in a
   column on the right and slide in as they are reached. On small screens it is a plain list. Each essay
   has its own pastel tone, which carries to its row. */

type E = { slug: string; title: string; dek: string; readingTime: string; date: string };
const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export const TONES: Tone[] = [
  { bg: "#efe8dc", mid: "#f1dedc", deep: "#85101c", white: "#fffcf6" },
  { bg: "#efe8dc", mid: "#ead6d3", deep: "#6f2029", white: "#fffcf6" },
  { bg: "#f6e9e6", mid: "#f1dedc", deep: "#85101c", white: "#fffcf6" },
  { bg: "#f1e7e2", mid: "#ead6d3", deep: "#6f2029", white: "#fffcf6" },
  { bg: "#efe8dc", mid: "#f1dedc", deep: "#a8202d", white: "#fffcf6" },
];
const tone = (i: number) => TONES[i % TONES.length];

function Row({ e, i, active, onActive }: { e: E; i: number; active: boolean; onActive: (i: number) => void }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const t = tone(i);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.55"] });
  const x = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const op = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.li ref={ref} style={reduce ? undefined : { x, opacity: op }} className="border-b border-ink/15" onViewportEnter={() => onActive(i)} viewport={{ margin: "-45% 0px -45% 0px" }}>
      <Link href={`/journal/${e.slug}`} onMouseEnter={() => onActive(i)} onFocus={() => onActive(i)} className="group grid gap-3 py-8 md:grid-cols-[4.5rem_1fr] md:gap-6 md:py-12">
        <span
          className="display grid size-12 place-items-center rounded-full text-xl font-light transition-all duration-500 md:size-14 md:text-2xl"
          style={{ background: active ? "#9b111e" : "#efe8dc", color: active ? "#e6c27a" : "#9b111e", transform: active ? "scale(1.08) rotate(-6deg)" : undefined }}
        >
          {NUMERALS[i]}
        </span>
        <span>
          <span className={`display block text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.1] transition-all duration-500 ${active ? "translate-x-2 text-ink" : "text-ink/55"}`}>{e.title}</span>
          <span className="mt-3 flex items-center gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink/60">
            {e.readingTime}
            <span aria-hidden className="h-0.5 transition-all duration-700" style={{ width: active ? 64 : 16, background: t.deep }} />
            {formatDate(e.date)}
          </span>
        </span>
      </Link>
    </motion.li>
  );
}

function Words({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="mr-[0.26em] inline-block overflow-hidden align-bottom pb-[0.1em]">
          <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.25 + i * 0.045, ease: [0.32, 0.72, 0, 1] }}>
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function EssayIndex({ essays }: { essays: E[] }) {
  const [a, setA] = useState(0);
  const [prev, setPrev] = useState(0);
  const cur = essays[a];
  const t = tone(a);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} aria-labelledby="contents-title" className="relative isolate">
      <SkyScene variant="f" behind />
      <div className="container-ed py-24 md:py-36">
      <div className="flex items-end justify-between border-b border-ink/80 pb-4">
        <h2 id="contents-title" className="display text-4xl font-light md:text-6xl">
          In this volume
        </h2>
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink/65">{essays.length} essays</span>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28">
            {/* The plate, in the manner of a royal court: crimson damask, a double gold frame, a gilded tablet, a sculpture on a cloud */}
            <div
              className="relative aspect-[4/5] overflow-hidden shadow-[0_40px_70px_-36px_rgba(60,8,16,0.8)]"
              style={{ background: "radial-gradient(ellipse at 50% 28%, #8f1424 0%, #5b0b16 62%, #35060d 100%)" }}
            >
              <div aria-hidden className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: "radial-gradient(circle, #e6c27a 1px, transparent 1.6px)", backgroundSize: "16px 16px" }} />
              <motion.div
                key={`sheen-${a}`}
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(105deg, transparent 38%, rgba(230,194,122,0.28) 50%, transparent 62%)" }}
                initial={reduce ? false : { x: "-110%" }}
                animate={{ x: "110%" }}
                transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
              />
              <div aria-hidden className="pointer-events-none absolute inset-3 border border-[#e6c27a]/80" />
              <div aria-hidden className="pointer-events-none absolute inset-[1.15rem] border-2 border-[#e6c27a]/30" />
              {["left-1.5 top-1.5", "right-1.5 top-1.5", "left-1.5 bottom-1.5", "right-1.5 bottom-1.5"].map((c) => (
                <i key={c} aria-hidden className={`pointer-events-none absolute ${c} size-3 rotate-45 bg-[#e6c27a]`} />
              ))}

              <div className="relative flex h-full flex-col px-9 pb-9 pt-9 text-[#f5efe3]">
                <div className="flex items-center justify-between">
                  <span className="border border-[#e6c27a]/70 px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[#f3e6c4]">
                    Essay {NUMERALS[a]} · {cur.readingTime} read
                  </span>
                  <span className="flex gap-1.5" aria-hidden>
                    {essays.map((_, k) => (
                      <i key={k} className="h-1.5 rounded-full transition-all duration-500" style={{ width: k === a ? 22 : 6, background: k === a ? "#e6c27a" : "rgba(245,239,227,0.3)" }} />
                    ))}
                  </span>
                </div>

                <div className="relative mt-4 min-h-0 flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={cur.slug}
                      className="h-full w-full"
                      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <EssayArt index={a} tone={t} slug={cur.slug} />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div key={cur.slug} className="mt-4">
                  <Words text={cur.title} className="display block text-[clamp(1.5rem,2.1vw,2.1rem)] font-light leading-[1.06] text-[#fbf3df]" />
                  <p className="mt-3 max-w-sm font-[family-name:var(--font-reading)] text-[0.9375rem] leading-snug text-[#f5efe3]/80">{cur.dek}</p>
                  <Link
                    href={`/journal/${cur.slug}`}
                    className="mt-4 inline-flex items-center gap-2 border border-[#e6c27a] px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[#f3e6c4] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e6c27a] hover:text-[#4a0a13]"
                  >
                    Read the essay <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {essays.map((e, i) => (
            <Row key={e.slug} e={e} i={i} active={i === a} onActive={setA} />
          ))}
        </ol>
      </div>
      </div>
    </section>
  );
}
