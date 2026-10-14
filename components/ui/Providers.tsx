"use client";

import { MotionConfig } from "motion/react";

/* Respects the OS "reduce motion" setting for every motion component. */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}>
      {children}
    </MotionConfig>
  );
}
