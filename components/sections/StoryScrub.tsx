"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { CINEMA_RANGE } from "../cinema/CinemaStage";
import { cinemaRange, stableVh } from "../cinema/viewport";

/* The story that plays as the page is scrolled. A tall, empty section keeps the scene (the frames behind the
   page) on screen while these captions change, one for each beat of the clip: building the company, earning the
   reputation, giving it an address, and the finished site coming into view. The captions are tied to the same
   scroll position that drives the frames. Under reduced motion all four are listed as plain text. */

const beats = [
  { at: 0.34, k: "01", t: "You build the company." },
  { at: 0.5, k: "02", t: "You earn the reputation." },
  { at: 0.66, k: "03", t: "Now give it an address." },
  { at: 0.82, k: "04", t: "" },
];

export function StoryScrub() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [beat, setBeat] = useState(-1);
  const [range, setRange] = useState(CINEMA_RANGE);
  useEffect(() => {
    const f = () => setRange(cinemaRange());
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const p = y / (stableVh() * cinemaRange());
    let b = -1;
    beats.forEach((x, i) => {
      if (p >= x.at) b = i;
    });
    if (p > 1.02) b = -1;
    setBeat(b);
  });

  if (reduce) {
    return (
      <section aria-label="The story" className="container-ed py-24">
        <ol className="space-y-4 font-light text-3xl">
          <li>You build the company.</li>
          <li>You earn the reputation.</li>
          <li>Now give it an address.</li>
          <li className="display italic">Your only digital house that tells your story in your way.</li>
        </ol>
      </section>
    );
  }

  return (
    <section aria-label="The story" data-beat={beat} className="relative" style={{ height: `${range * 100}vh` }}>
      <div className="sticky top-0 flex h-svh items-end">
        <div className="container-ed w-full pb-16 md:pb-24">
          <AnimatePresence mode="wait">
            {beat >= 0 && beat < 3 && (
              <motion.div
                key={beat}
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="max-w-3xl"
              >
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-white/70">
                  {beats[beat].k} <span className="mx-2 opacity-60">/</span> 04
                </p>
                <p className="mt-4 text-[clamp(2.6rem,7vw,6.5rem)] font-light leading-[0.98] tracking-[-0.03em] text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">{beats[beat].t}</p>
              </motion.div>
            )}
            {beat === 3 && (
              <motion.div
                key="final"
                initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                // The film's last frame already shows this sentence on the left, so the caption goes to the right
                // (and to the top on phones) and stays small, to keep the two apart.
                className="max-md:absolute max-md:inset-x-6 max-md:top-24 md:ml-auto md:max-w-md md:text-right"
              >
                <p className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-white/70">
                  04 <span className="mx-2 opacity-60">/</span> 04
                </p>
                <p className="mt-4 text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.02] tracking-[-0.025em] text-white [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
                  <span className="font-light">Your only digital house</span>
                  <br />
                  <span className="display italic text-white/70">that tells your story</span>
                  <br />
                  <span className="hl hl-on-dark">in your way.</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
