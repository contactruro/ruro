"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

/* Words wake in reading order as the paragraph is scrolled through: each word's opacity is tied directly
   to scroll position, so the reader sets the pace. The text is real and fully visible under reduced
   motion. */

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const a = i / n;
  const o = useTransform(p, [a, a + 1.5 / n], [0.18, 1], { clamp: true });
  return (
    <motion.span style={{ opacity: o }} className="mr-[0.28em] inline-block">
      {w}
    </motion.span>
  );
}

export function ScrubText({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const all = paragraphs.map((t) => t.split(" "));
  const n = all.flat().length;
  let k = -1;
  return (
    <div ref={ref} className={className}>
      {all.map((ws, pi) => (
        <p key={pi} className={pi ? "mt-8" : ""}>
          {ws.map((w) => {
            k++;
            return reduce ? (
              <span key={k} className="mr-[0.28em] inline-block">
                {w}
              </span>
            ) : (
              <Word key={k} w={w} i={k} n={n} p={scrollYProgress} />
            );
          })}
        </p>
      ))}
    </div>
  );
}
