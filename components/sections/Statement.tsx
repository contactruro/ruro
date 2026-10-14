"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HandsStage } from "../atelier/HandsStage";

/* One large statement, set apart from the hero. Words start quiet and wake one at a time as they
   cross the reading line, in reading order. The text is real and fully visible without
   JavaScript, and under reduced motion. */
const sentences = [
  "Before they meet you, they search for you.",
  "What they find is your first chapter. Most people have never read it.",
];

export function Statement() {
  const words = sentences.map((s) => s.split(" "));
  const total = words.flat().length;
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  const [armed, setArmed] = useState(false);
  const [on, setOn] = useState<boolean[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    setOn(Array.from({ length: total }, () => false));
    // The reading line sits 35% up from the bottom of the screen: a word is awake once its top has crossed it.
    const io = new IntersectionObserver(
      (entries) => {
        setOn((prev) => {
          const next = [...prev];
          for (const e of entries) {
            const i = Number((e.target as HTMLElement).dataset.i);
            next[i] = e.boundingClientRect.top < (e.rootBounds?.bottom ?? window.innerHeight);
          }
          return next;
        });
      },
      { rootMargin: "0px 0px -35% 0px", threshold: [0, 1] },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [total]);

  let n = -1;
  return (
    <section aria-labelledby="statement-label" className="relative overflow-hidden tone-peach bg-tone pt-24 md:pt-36 lg:pb-[22rem]">
      <div className="relative z-10 container-ed grid gap-10 lg:grid-cols-12">
        <p id="statement-label" className="eyebrow text-accent lg:col-span-3 lg:pt-3">
          The problem
        </p>
        <div className="lg:col-span-9">
          <p className="display max-w-4xl text-4xl md:text-5xl xl:text-6xl">
            {words.map((ws, si) => (
              <span key={si} className="block pb-2 last:pb-0">
                {ws.map((w) => {
                  n += 1;
                  const i = n;
                  return (
                    <span key={i}>
                      <span
                        ref={(el) => {
                          refs.current[i] = el;
                        }}
                        data-i={i}
                        data-on={armed ? on[i] : undefined}
                        className={armed ? "wr" : undefined}
                      >
                        {w}
                      </span>{" "}
                    </span>
                  );
                })}
              </span>
            ))}
          </p>
          <Link
            href="/journal/what-happens-when-someone-googles-your-name"
            data-track="nav_click"
            data-track-target="statement-essay"
            className="group mt-12 inline-flex items-center gap-2 font-semibold text-accent"
          >
            <span className="link-underline">Read: what people find when they search your name</span>
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      {/* The one picture: below the words on a phone, bottom right beside them on a desktop. */}
      <HandsStage className="mx-auto mt-10 h-64 w-full max-w-xl sm:h-80 lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:h-[26rem] lg:w-[min(52rem,62vw)] lg:max-w-none" />
    </section>
  );
}
