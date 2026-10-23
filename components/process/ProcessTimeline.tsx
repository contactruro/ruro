"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowsClockwise, CheckCircle } from "@phosphor-icons/react";
import { timeline } from "@/lib/content";
import { cta } from "@/lib/site";
import { Button } from "../ui/Button";
import { SkyScene } from "../atelier/Scenes";
import { EASE, Reveal } from "../ui/Reveal";
import { artAlt } from "@/lib/altText";

/* The process as a plain flow chart, for readers who want the steps rather than the story.
   Horizontal on large screens, a vertical track on small ones. Diamonds mark your approvals. */
/* One figure per step: a welcoming cherub for the first call, Athena for the research, the floating craftsman for the
   build, and a rising sun for launch. Each sits above its step's title on a soft cloud, never over any text. */
const STEP_ART = [
  { src: "/art/myth/cherub.webp", tag: "Welcome" },
  { src: "/art/myth/scholars-laptop.webp", tag: "Wisdom" },
  { src: "/art/myth/thinker-laptop.webp", tag: "Craft" },
  { src: "/art/myth/gold-sun.webp", tag: "Dawn" },
] as const;

export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const inView = { once: true, margin: "0px 0px -15% 0px" } as const;

  return (
    <section aria-labelledby="timeline-title" className="relative isolate border-t border-ink/10 bg-paper py-24 text-ink md:py-32">
      <SkyScene variant="g" behind />
      <div className="container-ed">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-accent">At a glance</p>
            <h2 id="timeline-title" className="display mt-5 text-[clamp(2.3rem,4.4vw,4.25rem)]">
              The process, <span className="text-accent">step by step.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-relaxed text-ink/70">
              Two weeks at most, from first call to launch. Four steps and three approvals. We ask for as little of your time as we can.
            </p>
          </Reveal>
        </div>

        <ol className="relative mt-16 grid lg:mt-24 lg:grid-cols-4">
          {/* The track: a hairline that draws itself in. Horizontal on large screens, vertical on small. */}
          <div aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px bg-ink/10 lg:block">
            <motion.div
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inView}
              transition={{ duration: 1.8, ease: EASE }}
              className="h-full origin-left bg-accent"
            />
          </div>
          <div aria-hidden className="absolute bottom-12 left-[21px] top-0 w-px bg-ink/10 lg:hidden" />

          {timeline.map((s, i) => {
            const last = i === timeline.length - 1;
            return (
              <li key={s.n} className="relative pb-12 pl-16 lg:pb-0 lg:pl-0 lg:pr-10">
                <motion.div
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={inView}
                  transition={{ duration: 0.7, delay: reduce ? 0 : 0.25 + i * 0.4, ease: EASE }}
                  className={`absolute left-0 top-0 z-[1] flex size-11 items-center justify-center rounded-full border font-mono text-xs tracking-[0.08em] lg:relative ${
                    last ? "border-accent bg-accent text-paper" : "border-accent/40 bg-paper text-accent"
                  }`}
                >
                  {s.n}
                </motion.div>

                {/* Approval gate on the horizontal track, at the hand-over to the next stage */}
                {s.gate && (
                  <div aria-hidden className="absolute right-0 top-[22px] z-[1] hidden -translate-y-1/2 translate-x-1/2 lg:block">
                    <span className="block size-2.5 rotate-45 border border-accent bg-paper" />
                    <span className="absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
                      {s.gate}
                    </span>
                  </div>
                )}

                <Reveal delay={0.15 + i * 0.12} className="lg:mt-8">
                  <div aria-hidden className="relative mb-5 flex h-44 items-end justify-center overflow-hidden border border-accent/25 bg-[radial-gradient(ellipse_at_50%_80%,#f1dedc,transparent_70%)] lg:h-52">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/art/myth/cloud-soft.webp" alt={artAlt("/art/myth/cloud-soft.webp")} aria-hidden loading="lazy" draggable={false} className="cloud-feather absolute inset-x-[-12%] bottom-[-10%] w-[124%] opacity-70" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={STEP_ART[i].src} alt={artAlt(STEP_ART[i].src)} aria-hidden loading="lazy" draggable={false} className="jr-float relative h-[92%] w-auto max-w-[80%] object-contain object-bottom drop-shadow-[0_14px_14px_rgba(60,20,25,0.3)]" style={{ "--fd": `${i * -1.4}s`, "--fa": "6px" } as React.CSSProperties} />
                    <span className="absolute left-2 top-2 bg-accent px-2 py-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-paper">{STEP_ART[i].tag}</span>
                  </div>
                  <p className="pt-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink/65 lg:pt-0">{s.when}</p>
                  <h3 className="display mt-2 text-3xl">{s.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink/70">{s.body}</p>

                  <div className="mt-6 border-t border-ink/10 pt-4">
                    <p className="eyebrow text-[0.6875rem] text-ink/65">Your part</p>
                    <p className="mt-1.5 text-sm leading-snug text-ink/85">{s.yourPart}</p>
                  </div>
                  <div className="mt-4 border-t border-ink/10 pt-4">
                    <p className="eyebrow text-[0.6875rem] text-ink/65">You receive</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {s.receive.map((r) => (
                        <li key={r} className="rounded-none border border-accent/20 bg-accent-tint px-2.5 py-1 text-xs text-accent-deep">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {s.gate && (
                    <p className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent lg:hidden">
                      <CheckCircle aria-hidden className="size-4" />
                      {s.gate}
                    </p>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* After launch, the relationship continues */}
        <Reveal className="mt-4 lg:mt-20">
          <div className="flex flex-col gap-6 rounded-2xl border border-dashed border-accent/35 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex items-start gap-4">
              <ArrowsClockwise aria-hidden className="mt-1 size-6 shrink-0 text-accent" />
              <div>
                <p className="font-semibold">After launch: we keep it up to date.</p>
                <p className="mt-1 max-w-2xl text-ink/65">
                  We add your news, talks and articles, keep the site safe, and check how you show up in search.
                </p>
              </div>
            </div>
            <Button href={cta.primary.href} size="lg" className="shrink-0">
              {cta.primary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
