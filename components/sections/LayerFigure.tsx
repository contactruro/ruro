"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* The picture on each layer's card: one large sculpture standing on a bank of clouds, with the layer's three key
   words in a row beneath it (never over it). Choosing another layer turns the card's picture like a page in
   perspective: the old figure swings away, the next swings in. The figures are the studio's own cut-outs, picked
   for what the layer means: the unveiled bust for Identity, the walker for Story, the thinker at his laptop for Work,
   Athena (guardian of what is true) for Proof, the two podcasters for Media, and Zeus for Journal.
   Decorative, so hidden from assistive technology; the card's own text carries the meaning. */

const FIG = [
  { src: "/art/myth/blindfold-bust.webp", chips: ["Your name", "What you do", "yourname.com ✓"] },
  { src: "/art/myth/walker.webp", chips: ["First role", "Founded", "Today"] },
  { src: "/art/myth/thinker-laptop.webp", chips: ["Companies", "Projects", "Big decisions"] },
  { src: "/art/myth/athena.webp", chips: ["Press ✓", "Awards ✓", "Books ✓"] },
  { src: "/art/myth/podcast-duo.webp", chips: ["Talks", "Podcasts", "Panels"] },
  { src: "/art/myth/greek-water.webp", chips: ["Essays", "Notes", "Archive"] },
] as const;

export function LayerFigure({ index }: { index: number }) {
  const reduce = useReducedMotion();
  const f = FIG[index];
  return (
    <div className="relative flex h-full w-full flex-col [perspective:1400px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/art/myth/cloud-soft.webp" alt="" draggable={false} className="cloud-feather pointer-events-none absolute inset-x-[-12%] bottom-10 w-[124%] opacity-60" />
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="relative flex min-h-0 flex-1 flex-col [transform-style:preserve-3d]"
          initial={reduce ? false : { rotateY: 80, rotateZ: -3, opacity: 0, scale: 0.94 }}
          animate={{ rotateY: 0, rotateZ: 0, opacity: 1, scale: 1 }}
          exit={{ rotateY: -80, rotateZ: 3, opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="relative min-h-0 flex-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={f.src}
              alt=""
              draggable={false}
              decoding="async"
              className="jr-float absolute inset-x-0 -top-[8%] mx-auto h-[108%] w-auto max-w-full object-contain object-bottom drop-shadow-[0_24px_24px_rgba(0,0,0,0.45)]"
              style={{ "--fa": "7px" } as React.CSSProperties}
            />
          </div>
          <div className="relative z-10 mt-3 flex flex-wrap justify-center gap-2">
            {f.chips.map((c, i) => (
              <span
                key={c}
                className="whitespace-nowrap rounded-full border border-[#e6c27a]/70 bg-[#101a2e]/85 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[#f3e6c4] backdrop-blur-sm md:text-[0.6875rem]"
                style={{ animation: reduce ? undefined : `chip-in 0.5s cubic-bezier(0.23,1,0.32,1) ${0.25 + i * 0.1}s both` }}
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
