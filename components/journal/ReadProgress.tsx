"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/* A hairline at the top of the screen that fills as the page is read. */
export function ReadProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const reduce = useReducedMotion();
  if (reduce) return null;
  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-accent" style={{ scaleX: x }} />;
}
