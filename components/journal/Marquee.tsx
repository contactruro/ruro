"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/* Two lines of very large type slide in opposite directions as the band crosses the screen: scroll
   parallax in the horizontal axis. The words are the argument in four beats: legible, findable,
   yours, permanent. */

const A = ["Legible", "Findable", "Yours", "Permanent"];

function Row({ words, dir, outline }: { words: string[]; dir: 1 | -1; outline?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], dir === 1 ? ["-30%", "0%"] : ["0%", "-30%"]);
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={reduce ? undefined : { x }} className="flex w-max gap-10 whitespace-nowrap py-1 md:gap-16">
        {[...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className={`display text-[clamp(4rem,13vw,12rem)] font-light leading-none tracking-[-0.03em] ${outline ? "text-transparent [-webkit-text-stroke:1.5px_var(--color-ink)]" : "text-ink"}`}
          >
            {w}
            <span className="mx-6 text-accent md:mx-10">✺</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function Marquee() {
  return (
    <section aria-label="What a digital estate makes your name" className="tone-peach border-y border-ink/10 bg-wash py-10 md:py-16">
      <Row words={A} dir={-1} />
      <Row words={[...A].reverse()} dir={1} outline />
    </section>
  );
}
