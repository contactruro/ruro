"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "../ui/Reveal";

/* One restrained, distinctive drawing per layer. Each animates once on display. */
export function LayerGlyph({ index }: { index: number }) {
  const reduce = useReducedMotion();
  const t = (delay = 0) => ({ duration: 1.1, delay, ease: EASE });
  const init = <T,>(v: T) => (reduce ? false : v);

  switch (index) {
    case 0: // Identity: a nameplate set in type
      return (
        <svg viewBox="0 0 300 200" className="h-full w-full" aria-hidden>
          <motion.rect x="30" y="50" width="240" height="100" rx="2" fill="none" stroke="currentColor" strokeWidth="1"
            initial={init({ pathLength: 0 })} animate={{ pathLength: 1 }} transition={t()} />
          <motion.text x="150" y="108" textAnchor="middle" fontSize="40" fill="currentColor" style={{ fontFamily: "var(--font-display)" }}
            initial={init({ opacity: 0, y: 12 })} animate={{ opacity: 1, y: 0 }} transition={t(0.3)}>
            Your Name
          </motion.text>
          <motion.text x="150" y="134" textAnchor="middle" fontSize="9" letterSpacing="3" fill="currentColor" opacity="0.7" className="font-mono"
            initial={init({ opacity: 0 })} animate={{ opacity: 0.7 }} transition={t(0.6)}>
            FOUNDER · AUTHOR · INVESTOR
          </motion.text>
        </svg>
      );
    case 1: // Story: an arc with chapters
      return (
        <svg viewBox="0 0 300 200" className="h-full w-full" aria-hidden>
          <motion.path d="M20 160 C 80 160, 90 60, 150 90 S 230 40, 280 40" fill="none" stroke="currentColor" strokeWidth="1.5"
            initial={init({ pathLength: 0 })} animate={{ pathLength: 1 }} transition={{ ...t(), duration: 1.6 }} />
          {[[20, 160], [96, 112], [150, 90], [214, 62], [280, 40]].map(([cx, cy], i) => (
            <motion.circle key={i} cx={cx} cy={cy} r={i === 4 ? 7 : 4} fill="currentColor"
              initial={init({ scale: 0 })} animate={{ scale: 1 }} transition={t(0.3 + i * 0.18)} />
          ))}
        </svg>
      );
    case 2: // Work: a curated grid, some pieces selected
      return (
        <svg viewBox="0 0 300 200" className="h-full w-full" aria-hidden>
          {Array.from({ length: 12 }).map((_, i) => {
            const col = i % 4, row = Math.floor(i / 4);
            const on = [0, 5, 6, 11].includes(i);
            return (
              <motion.rect key={i} x={40 + col * 58} y={30 + row * 50} width="50" height="42" rx="2"
                fill={on ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1" opacity={on ? 1 : 0.4}
                initial={init({ opacity: 0, y: 10 })} animate={{ opacity: on ? 1 : 0.4, y: 0 }} transition={t(i * 0.05)} />
            );
          })}
        </svg>
      );
    case 3: // Proof: a quotation and its sources
      return (
        <svg viewBox="0 0 300 200" className="h-full w-full" aria-hidden>
          <motion.text x="34" y="110" fontSize="120" fill="currentColor" style={{ fontFamily: "var(--font-display)" }}
            initial={init({ opacity: 0 })} animate={{ opacity: 1 }} transition={t()}>
            “
          </motion.text>
          {[70, 96, 122, 148].map((y, i) => (
            <motion.line key={y} x1="110" x2={i === 3 ? 200 : 270} y1={y} y2={y} stroke="currentColor" strokeWidth={i === 3 ? 3 : 1}
              initial={init({ pathLength: 0 })} animate={{ pathLength: 1 }} transition={t(0.2 + i * 0.12)} />
          ))}
        </svg>
      );
    case 4: // Media: waveform and play
      return (
        <svg viewBox="0 0 300 200" className="h-full w-full" aria-hidden>
          <motion.path d="M40 76 L72 100 L40 124 Z" fill="currentColor"
            initial={init({ scale: 0.6, opacity: 0 })} animate={{ scale: 1, opacity: 1 }} transition={t()} />
          {Array.from({ length: 22 }).map((_, i) => {
            const h = 12 + Math.abs(Math.sin(i * 1.7)) * 70;
            return (
              <motion.rect key={i} x={100 + i * 8.5} y={100 - h / 2} width="3" height={h} rx="1.5" fill="currentColor"
                initial={init({ scaleY: 0 })} animate={{ scaleY: 1 }} style={{ originY: "50%" }} transition={t(0.1 + i * 0.03)} />
            );
          })}
        </svg>
      );
    default: // Journal: a column of text
      return (
        <svg viewBox="0 0 300 200" className="h-full w-full" aria-hidden>
          <motion.text x="60" y="52" fontSize="22" fill="currentColor" style={{ fontFamily: "var(--font-display)" }}
            initial={init({ opacity: 0 })} animate={{ opacity: 1 }} transition={t()}>
            On reputation
          </motion.text>
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.line key={i} x1="60" x2={i === 6 ? 160 : 240} y1={76 + i * 16} y2={76 + i * 16} stroke="currentColor" strokeWidth="1" opacity="0.8"
              initial={init({ pathLength: 0 })} animate={{ pathLength: 1 }} transition={t(0.15 + i * 0.08)} />
          ))}
        </svg>
      );
  }
}
