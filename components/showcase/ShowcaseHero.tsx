"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MaskLines } from "../ui/Reveal";
import { Button } from "../ui/Button";
import { concepts } from "@/lib/showcase";
import { annotations } from "@/lib/annotations";
import { cta } from "@/lib/site";
import { SkyScene } from "../atelier/Scenes";
import { TallPillar } from "../atelier/TallPillar";

/* The showcase's opening. A loose collage of the four people floats on the right and leans toward the
   cursor; choosing one jumps to its concept. Numbers count up once. The headline, intro and buttons are
   server-visible and use CSS entrances, so the page paints before JavaScript. */

const POSE = [
  { left: "3%", top: "2%", r: -5, d: 14, z: 3 },
  { left: "57%", top: "0%", r: 4, d: 22, z: 2 },
  { left: "8%", top: "56%", r: 3, d: 18, z: 4 },
  { left: "54%", top: "54%", r: -4, d: 26, z: 1 },
];

function Count({ to, delay = 0 }: { to: number; delay?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + delay;
    const step = (t: number) => {
      const p = Math.min(Math.max((t - t0) / 1400, 0), 1);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, delay]);
  return <>{v}</>;
}

export function ShowcaseHero() {
  const stage = useRef<HTMLDivElement>(null);
  const notes = Object.values(annotations).reduce((n, a) => n + a.length, 0);

  const onMove = (e: React.MouseEvent) => {
    const el = stage.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    el.style.setProperty("--my", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };

  const pick = (slug: string) => {
    window.dispatchEvent(new CustomEvent("showcase:pick", { detail: slug }));
    document.getElementById("concepts")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="mesh relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-40">
      {/* two pillars, one down each side of the whole hero, built to its full height and kept behind the words */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <TallPillar className="absolute inset-y-0 left-[-1.6rem] w-[6rem] opacity-60 md:left-[-1.5rem] md:w-[clamp(5rem,7vw,8.5rem)] md:opacity-80" />
        <TallPillar flip className="absolute inset-y-0 right-[-1.6rem] w-[6rem] opacity-60 md:right-[-1.5rem] md:w-[clamp(5rem,7vw,8.5rem)] md:opacity-80" />
      </div>
      <SkyScene variant="a" behind />
      <div className="container-ed grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="inline-block size-2 rounded-full bg-accent" aria-hidden />
            Showcase
          </p>
          <h1 className="display mt-8 text-[clamp(3rem,7vw,7rem)]">
            <MaskLines animateOnMount delay={0.1} lines={["Four sites.", <span key="b" className="text-accent">None from a template.</span>]} />
          </h1>
          <div className="rise-in mt-10 max-w-xl" style={{ "--d": "0.35s" } as CSSProperties}>
            <p className="text-xl leading-relaxed text-ink/75">
              Four well-known people. For each, how their web presence looks today, and a live, annotated site built the way we would tell their story. Drag, tap,
              scroll and switch to phone. These are unofficial ideas; the facts are public; the design and words are ours.
            </p>
          </div>

          <dl className="rise-in mt-10 grid max-w-xl grid-cols-3 border-y border-ink/25" style={{ "--d": "0.5s" } as CSSProperties}>
            {[
              [concepts.length, "Live concepts"],
              [notes, "Design notes"],
              [concepts.length, "Directions, no repeats"],
            ].map(([n, l], i) => (
              <div key={l as string} className={`py-5 ${i ? "border-l border-ink/15 pl-5" : ""}`}>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink/60">{l}</dt>
                <dd className="display mt-1 text-5xl text-accent">
                  <Count to={n as number} delay={600 + i * 150} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="rise-in mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ "--d": "0.65s" } as CSSProperties}>
            <Button href="#concepts">Explore the concepts</Button>
            <a href={cta.primary.href} className="link-underline font-mono text-xs uppercase tracking-[0.14em] text-accent">
              {cta.primary.label} →
            </a>
          </div>
        </div>

        {/* The collage */}
        <div
          ref={stage}
          onMouseMove={onMove}
          onMouseLeave={() => {
            stage.current?.style.setProperty("--mx", "0");
            stage.current?.style.setProperty("--my", "0");
          }}
          className="rise-in relative aspect-[1/1] w-full lg:col-span-6 xl:aspect-[11/10]"
          style={{ "--d": "0.3s", "--mx": 0, "--my": 0 } as CSSProperties}
        >
          {concepts.map((c, i) => {
            const p = POSE[i % POSE.length];
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => pick(c.slug)}
                aria-label={`Open the ${c.person} concept`}
                className="group absolute w-[40%] text-left transition-[z-index] focus-visible:z-20"
                style={{
                  left: p.left,
                  top: p.top,
                  zIndex: p.z,
                  transform: `translate(calc(var(--mx) * ${p.d}px), calc(var(--my) * ${p.d}px)) rotate(${p.r}deg)`,
                  transition: "transform 500ms cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                <span className="jr-float block" style={{ "--fd": `${i * -1.7}s`, "--fa": "9px" } as CSSProperties}>
                  <span className="relative block aspect-[4/5] overflow-hidden border border-ink/30 bg-ink shadow-[0_30px_60px_-30px_rgba(20,22,43,0.6)] transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:[transform:rotate(0deg)_scale(1.06)] group-focus-visible:scale-[1.06]">
                    {c.photo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.photo.src} alt="" className="absolute inset-0 size-full object-cover object-[50%_18%] transition-transform duration-700 group-hover:scale-105" />
                    )}
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <span className="absolute left-3 top-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-white/80">0{i + 1}</span>
                    <span className="absolute inset-x-3 bottom-3 text-white">
                      <span className="display block text-xl leading-tight md:text-2xl">{c.person}</span>
                      <span className="mt-0.5 block font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-white/75">{c.design?.name}</span>
                      <span className="mt-2 flex gap-1" aria-hidden>
                        {c.dna?.palette.map((q) => (
                          <i key={q.hex} className="size-2.5 rounded-full ring-1 ring-white/40" style={{ background: q.hex }} />
                        ))}
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="container-ed mt-14">
        <p className="rise-in max-w-4xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-ink/70" style={{ "--d": "0.8s" } as CSSProperties}>
          RURO was not commissioned by, and has no connection with, anyone shown here. Each real site belongs to its owner, and every concept links to it. Photographs
          are credited beside each preview.
        </p>
      </div>
    </header>
  );
}
