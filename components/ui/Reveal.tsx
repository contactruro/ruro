"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";

export const EASE = [0.32, 0.72, 0, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "p" | "span" | "article" | "header";
};

/* Gentle, heavy fade up as an element enters the viewport (IntersectionObserver via whileInView). */
export function Reveal({ children, delay = 0, y = 32, className, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as ElementType;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* Editorial line-mask reveal: each line slides up from behind its own mask.
   The unclipped wrapper is what we observe, so the trigger never depends on clipped children. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  animateOnMount = false,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  animateOnMount?: boolean;
}) {
  const reduce = useReducedMotion();
  // Above the fold: a CSS animation, so the text is in the server HTML and paints with the page,
  // instead of waiting for JavaScript to reveal it.
  if (animateOnMount) {
    return (
      <span className={`block ${className ?? ""}`}>
        {lines.map((line, i) => (
          <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
            <span className={`mask-rise block ${lineClassName ?? ""}`} style={{ "--d": `${delay + i * 0.09}s` } as React.CSSProperties}>
              {line}
            </span>
          </span>
        ))}
      </span>
    );
  }
  const trigger = animateOnMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } };
  return (
    <motion.span className={`block ${className ?? ""}`} initial={reduce ? false : "hidden"} {...trigger}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.08em] block overflow-hidden pb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
            transition={{ duration: 1.1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
