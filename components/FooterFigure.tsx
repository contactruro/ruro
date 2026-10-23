"use client";

import { motion, useReducedMotion } from "motion/react";
import { artAlt } from "@/lib/altText";

/* One sculpture standing above a letter of the footer plate. It rises into place when the footer scrolls into
   view, each a beat after the one before, then rests with a very slow float. Decorative, so hidden from assistive
   technology; under reduced motion it simply stands there. */
export function FooterFigure({ src, index }: { src: string; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      className="block h-40 w-full md:h-64"
      initial={reduce ? false : { opacity: 0, y: 36, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={artAlt(src)} aria-hidden loading="lazy" decoding="async" draggable={false} className="jr-float size-full object-contain object-bottom drop-shadow-[0_14px_14px_rgba(0,0,0,0.45)]" style={{ "--fd": `${index * -1.6}s`, "--fa": "5px" } as React.CSSProperties} />
    </motion.span>
  );
}
