"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { audience, notFor } from "@/lib/content";
import { SectionLabel } from "../ui/SectionLabel";
import { EASE, MaskLines, Reveal } from "../ui/Reveal";
import { artAlt } from "@/lib/altText";

const wingPath =
  "M20 20 C 12 4, 0 4, 3 14 C 5 20, 13 21, 20 20 Z M20 20 C 28 4, 40 4, 37 14 C 35 20, 27 21, 20 20 Z M20 21 C 13 24, 6 32, 11 35 C 15 37, 18 30, 20 21 Z M20 21 C 27 24, 34 32, 29 35 C 25 37, 22 30, 20 21 Z";

/* Touch a name and the person it describes steps out of the page: a sculpture or object, popped up above the word.
   Each is one of the studio's own cut-outs: a founder at his laptop, a CEO in a crown of rays, an executive in a suit,
   a lawyer with scales, Hermes with his caduceus for doctors, Zeus with his thunderbolt for business owners, and so on. Mouse hover, keyboard focus and a tap all work; the picture is
   decoration, so the word itself stays the control's name. */
const POP: Record<string, { src: string; h: string }> = {
  Founders: { src: "thinker-laptop", h: "h-56 md:h-72" },
  CEOs: { src: "sun-statue", h: "h-56 md:h-72" },
  "Business owners": { src: "zeus-statue", h: "h-60 md:h-80" },
  Investors: { src: "scales", h: "h-52 md:h-64" },
  Executives: { src: "statue-suit", h: "h-60 md:h-80" },
  Advisors: { src: "scholars-laptop", h: "h-44 md:h-56" },
  Authors: { src: "bust-book", h: "h-52 md:h-64" },
  Speakers: { src: "podcast-duo", h: "h-44 md:h-56" },
  Architects: { src: "ruins-columns", h: "h-60 md:h-80" },
  Lawyers: { src: "justice-angel", h: "h-60 md:h-80" },
  Doctors: { src: "hermes-doctor", h: "h-64 md:h-[22rem]" },
  "Established creators": { src: "statue-dj", h: "h-60 md:h-80" },
  "Thought leaders": { src: "sun-face", h: "h-48 md:h-60" },
};

export function Audience({ n = "08" }: { n?: string }) {
  const reduce = useReducedMotion();
  const [on, setOn] = useState<string | null>(null);
  return (
    <section aria-labelledby="audience-title" className="tone-rose overflow-hidden bg-wash py-24 text-ink md:py-36">
      <div className="container-ed">
        <SectionLabel n={n} className="text-accent">
          Who it is for
        </SectionLabel>
        <h2 id="audience-title" className="display mt-8 max-w-4xl text-[clamp(2.5rem,5vw,5rem)]">
          <MaskLines lines={["People with a story", <span key="b" className="text-accent">worth telling.</span>]} />
        </h2>
      </div>

      {/* A still list: every name readable at once, nothing cropped at the edges */}
      <div className="container-ed">
        <ul className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3 md:mt-20 md:gap-x-7" aria-label="Who RURO builds for">
          {audience.map((a, i) => (
            <Reveal as="li" key={a} delay={(i % 6) * 0.05} className="flex items-center gap-5 md:gap-7">
              <span className="relative">
                <button
                  type="button"
                  aria-pressed={on === a}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setOn(a)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setOn(null)}
                  onFocus={() => setOn(a)}
                  onBlur={() => setOn(null)}
                  onClick={() => setOn((v) => (v === a ? null : a))}
                  className={`display cursor-pointer text-4xl transition-colors duration-300 md:text-6xl ${on === a || i % 3 === 1 ? "text-accent" : "text-ink hover:text-accent"}`}
                >
                  {a}
                </button>
                <AnimatePresence>
                  {on === a && POP[a] && (
                    <motion.span
                      aria-hidden
                      key={a}
                      className="pointer-events-none absolute bottom-[78%] left-1/2 z-20 -translate-x-1/2"
                      initial={reduce ? false : { opacity: 0, y: 26, scale: 0.7, rotate: -6 }}
                      animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, y: 14, scale: 0.85, transition: { duration: 0.15 } }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      style={{ transformOrigin: "50% 100%" }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img loading="lazy" decoding="async" src={`/art/myth/${POP[a].src}.webp`} alt={artAlt(`/art/myth/${POP[a].src}.webp`)} aria-hidden draggable={false} className={`${POP[a].h} w-auto max-w-none drop-shadow-[0_18px_18px_rgba(60,20,25,0.35)]`} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              {i < audience.length - 1 && (
                <svg aria-hidden viewBox="0 0 40 40" className="size-4 text-accent/60 md:size-5">
                  <path d={wingPath} fill="currentColor" />
                </svg>
              )}
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="container-ed">
        <div className="mt-20 grid gap-10 border-t border-ink/15 pt-10 md:mt-28 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-accent">Who it is not for</p>
            <p className="mt-4 max-w-xs text-base text-ink/70">We take on a few projects at a time, so each one gets our full attention.</p>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 md:col-span-8">
            {notFor.map((n, i) => (
              <Reveal as="li" key={n} delay={i * 0.06} className="relative text-xl text-ink/65 md:text-2xl">
                <span className="relative">
                  {n}
                  <motion.span
                    aria-hidden
                    className="absolute left-0 right-0 top-1/2 h-0.5 origin-left bg-accent"
                    initial={reduce ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: EASE }}
                  />
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
