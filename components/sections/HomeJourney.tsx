"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";

/* The closing story in one picture, made only from the studio's own cut-outs: a walker carrying their whole story
   crosses a bank of painted clouds, as the section scrolls into view, toward a radiant sculpture. On arrival the
   sculpture is named "Your home". It keeps its shape on a phone, and everything scales with it. Decorative, so
   hidden from assistive technology; under reduced motion the walker simply stands beside it. */

const FEATHER = "linear-gradient(to right, transparent 0, #000 22%, #000 78%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 35%, #000 70%, transparent 100%)";

/* Each page that ends with this scene gets its own pair, so no two pages close on the same picture. `flip` turns a
   mover that faces left; `fly` lets one glide with a wider bob. */
export type JourneyVariant = "walk" | "sample" | "process" | "work" | "about" | "journal" | "study";
const PAIRS: Record<JourneyVariant, { mover: string; goal: string; flip?: boolean; fly?: boolean }> = {
  walk: { mover: "walker", goal: "sun-statue", flip: true },
  sample: { mover: "flyer", goal: "sun-moon", fly: true },
  process: { mover: "angel-fly", goal: "lanterns", fly: true },
  work: { mover: "athena", goal: "laurel" },
  about: { mover: "cupid", goal: "sun-face", fly: true },
  journal: { mover: "apollo", goal: "medusa-phones", fly: true },
  study: { mover: "angel-red", goal: "lanterns", fly: true },
};

export function HomeJourney({ className = "", variant = "walk" }: { className?: string; variant?: JourneyVariant }) {
  const pair = PAIRS[variant];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start 0.95", "end 0.55"] });
  const x = useTransform(p, [0, 0.85], ["-6%", "12%"]);
  const bob = useTransform(p, (v) => Math.sin(v * 38) * (PAIRS[variant].fly ? 9 : 3));
  const [arrived, setArrived] = useState(false);
  useMotionValueEvent(p, "change", (v) => setArrived(v > 0.8));
  const lit = reduce ? 1 : arrived ? 1 : 0;

  return (
    <div ref={ref} aria-hidden className={`relative isolate mx-auto aspect-[5/4] w-full max-w-[40rem] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/art/myth/clouds-b.webp" alt="" loading="lazy" draggable={false} className="absolute inset-x-[-8%] bottom-[-6%] w-[116%] opacity-90" style={{ WebkitMaskImage: FEATHER, maskImage: FEATHER, WebkitMaskComposite: "source-in", maskComposite: "intersect" }} />

      <div className="absolute bottom-[8%] right-[2%] h-[86%] w-[48%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/art/myth/${pair.goal}.webp`} alt="" loading="lazy" draggable={false} className="size-full object-contain object-bottom drop-shadow-[0_22px_20px_rgba(155,17,30,0.3)]" />
        <motion.span
          initial={false}
          animate={{ opacity: lit, y: lit ? 0 : 8 }}
          transition={{ duration: 0.6 }}
          className="absolute left-1/2 -top-[7%] -translate-x-1/2 whitespace-nowrap rounded-full bg-royal px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-paper"
        >
          Your home
        </motion.span>
      </div>

      {/* the road */}
      <div className="absolute inset-x-0 bottom-[7%] h-px bg-gradient-to-r from-transparent via-royal/40 to-royal/40" />

      <motion.div style={reduce ? { left: "12%" } : { left: x, y: bob }} className="absolute bottom-[6%] h-[78%] w-[34%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/art/myth/${pair.mover}.webp`}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className={`h-full w-full ${pair.flip ? "-scale-x-100" : ""} object-contain object-bottom drop-shadow-[0_22px_18px_rgba(155,17,30,0.3)]`}
        />
        <span className="absolute -top-[9%] left-[10%] rounded-full bg-paper px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-royal shadow-sm ring-1 ring-royal/25 md:text-[0.625rem]">
          Your story
        </span>
      </motion.div>
    </div>
  );
}
