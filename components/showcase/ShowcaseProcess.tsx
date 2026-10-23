"use client";

import { motion, useReducedMotion } from "motion/react";
import { MaskLines } from "../ui/Reveal";
import { artAlt } from "@/lib/altText";

/* How a concept like the ones above is made, told in five pictures you can take in at a glance: a numeral, one
   verb, and a small living scene per step (a listening bust with sound rippling out, Athena guarding the research, a
   painted messenger for the mood, a statue in a VR headset for the live build, a finished crowned figure). On a desktop the five sit in a row;
   on a phone they are cards you swipe, each snapping into place. Cards rise in as they arrive. Reduced motion
   leaves everything still. */

const A = "/art/myth";

function Listen() {
  return (
    <div className="relative h-full">
      {[0, 1.2, 2.4].map((d) => (
        <span key={d} aria-hidden className="ripple absolute left-1/2 top-[46%] size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#e6c27a]/70" style={{ "--rd": `${d}s` } as React.CSSProperties} />
      ))}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${A}/bust-headphones.webp`} alt={artAlt(`${A}/bust-headphones.webp`)} aria-hidden loading="lazy" draggable={false} className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

function Record() {
  /* Research: Athena, goddess of wisdom, shield and spear, standing guard over the facts. */
  return (
    <div className="relative h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${A}/scholars-laptop.webp`} alt={artAlt(`${A}/scholars-laptop.webp`)} aria-hidden loading="lazy" draggable={false} className="absolute inset-x-0 bottom-0 mx-auto h-[98%] w-auto object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

function Mood() {
  /* Set the mood: a painted messenger in the site's own red and gold, wings spread, drifting on its cloud. */
  return (
    <div className="relative h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${A}/cloud-soft.webp`} alt={artAlt(`${A}/cloud-soft.webp`)} aria-hidden loading="lazy" draggable={false} className="absolute inset-x-[-8%] bottom-[-14%] w-[116%] opacity-70" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${A}/angel-red.webp`} alt={artAlt(`${A}/angel-red.webp`)} aria-hidden loading="lazy" draggable={false} className="jr-float absolute inset-x-0 bottom-[4%] mx-auto h-[96%] w-auto object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.5)]" style={{ "--fa": "8px" } as React.CSSProperties} />
    </div>
  );
}

function Build() {
  /* Build: a statue in a virtual-reality headset, stepping into the live prototype that is being made. */
  return (
    <div className="relative h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${A}/vr-statue.webp`} alt={artAlt(`${A}/vr-statue.webp`)} aria-hidden loading="lazy" draggable={false} className="jr-float absolute inset-x-0 bottom-0 mx-auto h-[98%] w-auto object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.5)]" style={{ "--fa": "5px" } as React.CSSProperties} />
    </div>
  );
}

function Refine() {
  return (
    <div className="relative h-full">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${A}/sun-statue.webp`} alt={artAlt(`${A}/sun-statue.webp`)} aria-hidden loading="lazy" draggable={false} className="absolute inset-x-0 bottom-0 mx-auto h-[96%] w-auto object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.5)]" />
    </div>
  );
}

const steps = [
  { n: "I", verb: "Listen", d: "A real conversation: who you are and who needs to find you.", Scene: Listen },
  { n: "II", verb: "Research", d: "We read what is public and keep what is true, current and yours.", Scene: Record },
  { n: "III", verb: "Set the mood", d: "We borrow a feeling from sites you admire, never the pixels.", Scene: Mood },
  { n: "IV", verb: "Build", d: "A live prototype with motion and a phone view, every choice explained.", Scene: Build },
  { n: "V", verb: "Refine", d: "You react to something real. We adjust until it is you.", Scene: Refine },
] as const;

export function ShowcaseProcess() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="how-title" className="sparkle relative isolate overflow-hidden bg-[#121c33] py-20 text-[#f5efe3] md:py-32">
      <div className="container-ed relative z-10">
        <p className="eyebrow text-[#e6c27a]">How it is made</p>
        <h2 id="how-title" className="display mt-5 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] leading-[1]">
          <MaskLines lines={["Five moves from a", <span key="b" className="hl-on-dark">conversation to your site.</span>]} />
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f5efe3]/75 md:text-lg">
          For these concepts, public facts stood in for the conversation. For a client, the first step is real, and everything after it is built around what you say.
        </p>
      </div>

      <ol className="relative z-10 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 [scrollbar-width:none] md:px-10 lg:mx-auto lg:mt-16 lg:grid lg:max-w-[88rem] lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-16 [&::-webkit-scrollbar]:hidden">
        {steps.map((s, i) => (
          <motion.li
            key={s.verb}
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.9, delay: i * 0.12, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-[82vw] max-w-sm shrink-0 snap-center rounded-2xl border border-[#e6c27a]/25 bg-white/[0.04] p-5 backdrop-blur-sm sm:w-72 lg:w-auto lg:max-w-none"
          >
            <span aria-hidden className="display absolute right-4 top-3 text-5xl leading-none text-[#e6c27a]/30">
              {s.n}
            </span>
            <div className="relative h-60 lg:h-72">
              <s.Scene />
            </div>
            <p className="display mt-5 text-3xl leading-none text-[#f3e6c4]">{s.verb}</p>
            <p className="mt-3 text-sm leading-snug text-[#f5efe3]/75">{s.d}</p>
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 place-items-center rounded-full bg-[#e6c27a] text-xs font-bold text-[#17233b] lg:grid">
                →
              </span>
            )}
          </motion.li>
        ))}
      </ol>
      <p className="relative z-10 mt-2 text-center font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-[#e6c27a]/70 lg:hidden">Swipe →</p>
    </section>
  );
}
