"use client";

import { motion, useReducedMotion } from "motion/react";

/* The picture on each essay's plate, in the manner of a royal court: a gold sun turns slowly behind a sculpture that
   stands on a bank of cloud, a gilded tablet carries the essay's Roman numeral, a pair of lanterns sways from the
   corner, and a cherub and a spray of flowers sit at the foot. Each of the seven essays has its own figure, chosen
   for what the essay is about. Everything is one of the studio's own cut-outs; nothing is drawn. Under reduced
   motion the plate simply stands. */

export type Tone = { bg: string; mid: string; deep: string; white: string };

const A = "/art/myth";

/* The figure for each essay, by slug. */
const FIGURE: Record<string, string> = {
  "what-happens-when-someone-googles-your-name": "angel-red", // a herald: someone is looking
  "your-linkedin-isnt-your-digital-identity": "greek-water", // a thinker, away from the rented room
  "your-company-has-a-website-why-dont-you": "sun-statue", // the crowned one: a company with a home
  "your-reputation-shouldnt-live-inside-an-algorithm": "debate-robot", // an algorithm in charge
  "why-established-founders-need-a-digital-estate": "athena", // the guardian of what is built
  "why-you-need-a-website": "thinker-laptop", // building a home
  "why-successful-people-keep-a-website-of-their-own": "statue-suit", // someone who has arrived
};
const FALLBACK = ["angel-red", "greek-water", "sun-statue", "blindfold-bust", "athena", "thinker-laptop", "laurel"];
const NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function EssayArt({ index, slug }: { index: number; tone?: Tone; slug?: string }) {
  const reduce = useReducedMotion();
  const fig = (slug && FIGURE[slug]) || FALLBACK[index % FALLBACK.length];
  return (
    <div aria-hidden className="relative h-full w-full">
      {/* the sun behind the figure */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src={`${A}/gold-sun.webp`} alt="" draggable={false} className={`absolute left-1/2 top-[54%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-80 ${reduce ? "" : "sun-turn"}`} />

      {/* the cloud it stands on */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src={`${A}/cloud-soft.webp`} alt="" draggable={false} className="cloud-feather absolute inset-x-[-8%] bottom-[-6%] w-[116%] opacity-85" />

      {/* the figure */}
      <motion.div
        key={fig}
        className="absolute inset-x-0 bottom-[2%] top-[27%] flex items-end justify-center"
        initial={reduce ? false : { y: 36, opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src={`${A}/${fig}.webp`} alt="" draggable={false} className="jr-float h-full w-auto max-w-[78%] object-contain object-bottom drop-shadow-[0_22px_22px_rgba(0,0,0,0.6)]" style={{ "--fa": "6px" } as React.CSSProperties} />
      </motion.div>

      {/* the gilded tablet with the numeral */}
      <div className="absolute left-1/2 top-0 w-[40%] -translate-x-1/2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src={`${A}/plaque.webp`} alt="" draggable={false} className="block w-full drop-shadow-[0_8px_10px_rgba(0,0,0,0.5)]" />
        <span className="display absolute inset-x-0 top-[58%] -translate-y-1/2 text-center text-[clamp(1.1rem,2.2vw,1.8rem)] leading-none text-[#5a0d16]">{NUMERALS[index % NUMERALS.length]}</span>
      </div>

      {/* lanterns on the right, swaying */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src={`${A}/lanterns.webp`} alt="" draggable={false} className={`absolute right-[1%] top-[-3%] w-[17%] origin-top ${reduce ? "" : "lantern-sway"}`} />

      {/* a cherub and flowers at the foot */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src={`${A}/cherub.webp`} alt="" draggable={false} className="jr-float absolute bottom-[1%] left-[1%] w-[18%] drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)]" style={{ "--fd": "-1.4s", "--fa": "4px" } as React.CSSProperties} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src={`${A}/flowers.webp`} alt="" draggable={false} className="jr-float absolute bottom-[1%] right-[2%] w-[13%] drop-shadow-[0_8px_8px_rgba(0,0,0,0.5)]" style={{ "--fd": "-3s", "--fa": "4px" } as React.CSSProperties} />
    </div>
  );
}
