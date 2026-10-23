"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { CSSProperties } from "react";
import { GlobeSimple, InstagramLogo, LinkedinLogo, Newspaper, XLogo, YoutubeLogo } from "@phosphor-icons/react";
import { artAlt } from "@/lib/altText";

/* The masthead. The title is huge and still. On either side a sculpture stands on the floor of the page, and
   around each float the places a name is scattered across the web: LinkedIn, Instagram, a website, X, YouTube,
   a news site. Each sits in a gold-rimmed medallion, like a coin, with the thing it holds about you in a line
   beneath. They drift at different speeds as the page scrolls. That is the Journal's subject, drawn once.
   The logos are those companies' own marks, shown only to name where people look. */

type Medal = { Icon: typeof LinkedinLogo; color: string; name: string; note: string; x: string; y: string; d: number };

const left: Medal[] = [
  { Icon: LinkedinLogo, color: "#0a66c2", name: "LinkedIn", note: "Three roles ago", x: "2%", y: "4%", d: 1 },
  { Icon: InstagramLogo, color: "#d6249f", name: "Instagram", note: "A decade-old photograph", x: "9%", y: "36%", d: 2 },
  { Icon: GlobeSimple, color: "#9b111e", name: "Website", note: "Directory listing", x: "2%", y: "68%", d: 3 },
];
const right: Medal[] = [
  { Icon: XLogo, color: "#111111", name: "X", note: "Press release", x: "70%", y: "4%", d: 2 },
  { Icon: YoutubeLogo, color: "#e62117", name: "YouTube", note: "Conference bio", x: "63%", y: "36%", d: 1 },
  { Icon: Newspaper, color: "#3a3a3a", name: "News", note: "Funding round, now history", x: "70%", y: "68%", d: 3 },
];

function Medallion({ m, i }: { m: Medal; i: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, [0, -40, -90, -150][m.d]]);
  return (
    <motion.div className="absolute z-[2] flex w-28 flex-col items-center text-center sm:w-36" style={{ left: m.x, top: m.y, y: reduce ? 0 : y }}>
      <span
        className="jr-float grid size-14 place-items-center rounded-full bg-[#fffcf6] shadow-[0_16px_26px_-12px_rgba(60,30,20,0.55)] ring-2 ring-[#e6c27a] ring-offset-2 ring-offset-[#fffcf6] sm:size-[4.5rem]"
        style={{ "--fd": `${i * -1.3}s`, "--fa": `${5 + m.d * 2}px`, color: m.color } as CSSProperties}
      >
        <m.Icon weight="fill" aria-hidden className="size-7 sm:size-9" />
      </span>
      <span className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink/80 sm:text-[0.6875rem]">{m.name}</span>
      <span className="text-[0.6875rem] leading-tight text-ink/60">{m.note}</span>
    </motion.div>
  );
}

function Side({ src, medals, side }: { src: string; medals: Medal[]; side: "l" | "r" }) {
  return (
    <div aria-hidden className={`relative hidden h-[clamp(18rem,34vw,34rem)] md:block ${side === "l" ? "justify-self-start" : "justify-self-end"} w-full`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={artAlt(src)} aria-hidden
        loading="lazy"
        draggable={false}
        className={`absolute bottom-0 h-[92%] w-auto max-w-[56%] object-contain object-bottom drop-shadow-[0_24px_24px_rgba(60,30,20,0.35)] ${side === "l" ? "left-[38%]" : "right-[38%]"}`}
      />
      {medals.map((m, i) => (
        <Medallion key={m.name} m={m} i={i + (side === "l" ? 0 : 3)} />
      ))}
    </div>
  );
}

export function JournalHero({ count }: { count: number }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 700], [0, 90]);
  const titleScale = useTransform(scrollY, [0, 700], [1, 0.94]);
  const fade = useTransform(scrollY, [0, 520], [1, 0.1]);

  return (
    <header className="mesh relative overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
      <div className="container-ed relative z-10">
        <div className="rise-in flex flex-wrap items-center justify-between gap-3 border-y border-ink/80 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink/70">
          <span>Volume I</span>
          <span className="hidden sm:inline">Autumn 2026</span>
          <span>{count} essays</span>
        </div>

        <div className="grid items-end md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,1fr)] md:gap-2">
          <Side src="/art/myth/laurel.webp" medals={left} side="l" />
          <motion.div style={reduce ? undefined : { y: titleY, scale: titleScale, opacity: fade }} className="origin-top self-center">
            <h1 className="display py-10 text-center text-[clamp(3.6rem,11vw,11rem)] font-light leading-[0.88] tracking-[-0.04em] md:py-16">
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="mask-rise block">The</span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="mask-rise block text-accent" style={{ "--d": "0.12s" } as CSSProperties}>
                  Journal
                </span>
              </span>
            </h1>
          </motion.div>
          <Side src="/art/myth/reader.webp" medals={right} side="r" />
        </div>

        {/* Phones: the same cast in one row, under the title */}
        <div aria-hidden className="mb-6 grid grid-cols-3 gap-3 md:hidden">
          {[...left, ...right].slice(0, 6).map((m) => (
            <div key={m.name} className="flex flex-col items-center text-center">
              <span className="grid size-14 place-items-center rounded-full bg-[#fffcf6] shadow-md ring-2 ring-[#e6c27a] ring-offset-2 ring-offset-[#fffcf6]" style={{ color: m.color }}>
                <m.Icon weight="fill" className="size-7" />
              </span>
              <span className="mt-2 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink/80">{m.name}</span>
              <span className="text-[0.6875rem] leading-tight text-ink/60">{m.note}</span>
            </div>
          ))}
        </div>

        <div className="rise-in flex flex-col items-center justify-between gap-3 border-y border-ink/20 py-3 text-center sm:flex-row sm:text-left" style={{ "--d": "0.4s" } as CSSProperties}>
          <p className="font-[family-name:var(--font-reading)] text-base text-ink/75 md:text-lg">Essays on reputation and how people find you.</p>
          <p className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink/65">
            Scroll to watch it happen
            <span aria-hidden className="jr-cue inline-block h-5 w-px bg-accent" />
          </p>
        </div>
      </div>
    </header>
  );
}
