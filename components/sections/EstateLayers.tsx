"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import { layers } from "@/lib/content";
import { SectionLabel } from "../ui/SectionLabel";
import { EASE, MaskLines, Reveal } from "../ui/Reveal";
import { LayerFigure } from "./LayerFigure";
import { SkyScene } from "../atelier/Scenes";

const AUTO_MS = 5200;

/* The selling point of the site, told as a gallery: six layers of a digital estate, each one a sculpture in front of
   turning gold rays on a royal-blue card, with its three key words floating around it. Until the visitor takes over,
   the layers turn by themselves (a thin line fills along the open row to show the time left); hovering, focusing or
   tapping a row hands control over. On a phone each row opens its card inline under it. Reduced motion stops the turning, the drift and the rays. */

export function EstateLayers() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();
  const box = useRef<HTMLElement>(null);

  const choose = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    // On a phone the open card sits inline, so turning it would shove the page around: leave it to the visitor.
    if (!auto || !inView || reduce || !window.matchMedia("(min-width: 1024px)").matches) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % layers.length), AUTO_MS);
    return () => clearTimeout(id);
  }, [auto, inView, reduce, active]);

  return (
    <section ref={box} id="digital-estate" aria-labelledby="estate-title" className="tone-butter bg-wash relative isolate overflow-hidden py-20 md:py-40">

      <SkyScene variant="e" behind />
      <div className="container-ed relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <SectionLabel n="02" className="text-accent lg:col-span-3 lg:pt-4">
            The category
          </SectionLabel>
          <div className="lg:col-span-9">
            <h2 id="estate-title" className="display text-[clamp(2.5rem,5.6vw,5.5rem)]">
              <MaskLines lines={["What is a", <span key="b" className="text-accent">digital estate?</span>]} />
            </h2>
            <Reveal className="mt-10 grid gap-8 md:grid-cols-2">
              <p className="display text-2xl leading-snug md:text-3xl md:leading-snug">A digital estate is a personal website done properly.</p>
              <p className="text-lg text-ink/70">
                It is not a profile on someone else’s platform, and it is not a portfolio. It is your own home on the internet. It holds your story, and you own it.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
          <ol className="lg:col-span-7" aria-label="The six layers of a digital estate">
            {layers.map((l, i) => {
              const on = active === i;
              return (
                <li key={l.n} className="border-t border-ink/15 last:border-b">
                  <button
                    type="button"
                    onClick={() => choose(i)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && choose(i)}
                    onFocus={() => choose(i)}
                    aria-expanded={on}
                    aria-controls={`layer-panel-${i}`}
                    className="group relative grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-5 text-left md:grid-cols-[4rem_1fr_auto] md:py-7"
                  >
                    <span className={`font-mono text-sm tabular-nums transition-colors duration-500 ${on ? "text-accent" : "text-ink/65"}`}>{l.n}</span>
                    <span>
                      <span
                        className={`display block text-4xl transition-[color,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] md:text-6xl ${
                          on ? "translate-x-2 text-ink" : "text-ink/65 group-hover:text-ink/70"
                        }`}
                      >
                        {l.title}
                      </span>
                      <span className="mt-2 block text-base text-ink/70 lg:hidden">{l.line}</span>
                    </span>
                    <span
                      aria-hidden
                      className={`inline-flex size-9 items-center justify-center rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        on ? "rotate-45 bg-royal text-paper" : "border border-ink/20 text-ink/65"
                      }`}
                    >
                      <Plus weight="bold" className="size-4" />
                    </span>
                    {on && auto && !reduce && (
                      <motion.span
                        aria-hidden
                        key={`bar-${active}`}
                        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </button>

                  {/* Mobile and tablet: the card opens inline under its row. */}
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        id={`layer-panel-${i}`}
                        key="panel"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="overflow-hidden lg:hidden"
                      >
                        <div className="relative mb-6 mt-4 rounded-2xl bg-[#17233b] p-5 pt-6 text-[#f5efe3]">
                          <div className="relative h-[22rem] w-full sm:h-[26rem]">
                            <LayerFigure index={i} />
                          </div>
                          <p className="display mt-4 text-2xl leading-tight">{l.line}</p>
                          <p className="mt-2 text-base opacity-85">{l.body}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          {/* Desktop: one sticky card. */}
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 pt-16">
              <div className="relative rounded-3xl bg-[#17233b] p-8 text-[#f5efe3] shadow-[0_40px_80px_-40px_rgba(20,30,60,0.6)]">
                <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(120,150,210,0.28),transparent_65%)]" />
                  <div className="absolute inset-x-6 bottom-4 text-[#e6c27a]/45">
                  </div>
                </div>
                <div className="relative flex items-center justify-between">
                  <span className="eyebrow text-[#e6c27a]">Layer {layers[active].n} / 06</span>
                  <span className="eyebrow opacity-80">{layers[active].title}</span>
                </div>
                <div className="relative mt-6 h-[30rem]">
                  <LayerFigure index={active} />
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={reduce ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative pb-6"
                  >
                    <p className="display mt-6 text-3xl leading-tight">{layers[active].line}</p>
                    <p className="mt-3 text-base opacity-85">{layers[active].body}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
