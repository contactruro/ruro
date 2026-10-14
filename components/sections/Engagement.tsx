"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  ArrowsClockwise,
  ChartLineUp,
  Check,
  CheckCircle,
  Clock,
  FileText,
  Hammer,
  ListChecks,
  MagnifyingGlass,
  Microphone,
  Newspaper,
  PenNib,
  PencilRuler,
  Phone,
  RocketLaunch,
  ShieldCheck,
  UserCircle,
  Users,
  Wallet,
} from "@phosphor-icons/react";
import { deliverables, stewardship, timeline } from "@/lib/content";
import { cta, studio } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Button } from "../ui/Button";
import { MaskLines, Reveal } from "../ui/Reveal";

/* How the work runs, told as a story in two acts. Act one is a dark royal stage: four steps you can tap (or let
   play), a 14-day ruler whose lit stretch slides to the days of the open step, and for each step a sculpture, the
   plan in words and a small animated diagram, side by side with no overlap. Then the costs. Act two, on the light
   ground, is "after launch": your first year as twelve months, six chapters of what we keep doing, a sculpture for
   each, and the months it happens in lighting up as you choose a chapter. It plays through the steps on its own once it is on screen, and stops the
   moment you touch it. Every motion is CSS (see engagement.css) and stops under reduced motion. */

const stageIcons = [Phone, MagnifyingGlass, PencilRuler, RocketLaunch];
const stewardIcons: Record<string, typeof ShieldCheck> = {
  safe: ShieldCheck,
  news: Newspaper,
  talks: Microphone,
  articles: PenNib,
  search: MagnifyingGlass,
  reports: ChartLineUp,
};
const AUTO_MS = 6000;
const FIGURES = ["/art/myth/podcast-duo.webp", "/art/myth/scholars-laptop.webp", "/art/myth/thinker-laptop.webp", "/art/myth/laurel.webp"];
const KEEP_FIGURES = ["/art/myth/column-roses.webp", "/art/myth/angel-red.webp", "/art/myth/medusa-phones.webp", "/art/myth/angel-fly.webp", "/art/myth/sun-moon.webp", "/art/myth/lanterns.webp"];
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";

/** The fourteen days of the project, with the days of the open step lit. The lit stretch slides and resizes. */
function DayRuler({ when }: { when: string }) {
  const [a, b = a] = (when.match(/\d+/g) ?? ["1"]).map(Number);
  return (
    <div aria-hidden className="mt-4">
      <div className="relative grid gap-1" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
        <span
          className="absolute inset-y-0 rounded-sm bg-[#e6c27a] transition-[left,width] duration-500"
          style={{ left: `${((a - 1) / 14) * 100}%`, width: `${((b - a + 1) / 14) * 100}%`, transitionTimingFunction: EASE_OUT }}
        />
        {Array.from({ length: 14 }, (_, k) => {
          const lit = k + 1 >= a && k + 1 <= b;
          return (
            <span key={k} className={`relative z-10 py-2 text-center font-mono text-[0.6875rem] tabular-nums transition-colors duration-300 md:text-xs ${lit ? "font-bold text-[#17233b]" : "text-[#f5efe3]/55"}`}>
              {k + 1}
            </span>
          );
        })}
      </div>
      <p className="mt-2 flex justify-between font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#e6c27a]/80">
        <span>Day 1 · first call</span>
        <span>Day 14 · live</span>
      </p>
    </div>
  );
}

/* The six things we keep doing, as a board of jumbled letters. Every tile belongs to one of the six words (SAFE, NEWS,
   TALKS, ARTICLES, SEARCH, REPORTS). Choose a chapter, or touch any tile, and only that word's tiles light up (in
   gold on red, one after another); the rest go quiet. Under the board the word is spelled out in order. The list
   beside it is the accessible control, so the board itself is hidden from assistive technology. */
const WORDS = ["SAFE", "NEWS", "TALKS", "ARTICLES", "SEARCH", "REPORTS"];
const TILES = WORDS.flatMap((w, wi) => w.split("").map((ch, li) => ({ ch, wi, li })));
// A fixed shuffle (13 is coprime with 34), so the board looks scrambled but is the same on every load.
const JUMBLE = TILES.map((_, i) => TILES[(i * 13 + 5) % TILES.length]);

function WordBoard({ active, onPick }: { active: number; onPick: (n: number) => void }) {
  return (
    <div aria-hidden>
      <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
        {JUMBLE.map((t, k) => {
          const on = t.wi === active;
          return (
            <span
              key={k}
              onPointerEnter={(e) => e.pointerType === "mouse" && onPick(t.wi)}
              onClick={() => onPick(t.wi)}
              className={`flex size-[clamp(1.9rem,6.4vw,3.1rem)] cursor-pointer select-none items-center justify-center border-2 font-mono text-[clamp(0.75rem,2.4vw,1.15rem)] font-bold transition-[background-color,color,border-color,transform] duration-300 ${
                on ? "-translate-y-1 border-royal bg-royal text-[#e6c27a]" : "border-royal/20 bg-transparent text-royal/35 hover:border-royal/60 hover:text-royal/70"
              }`}
              style={{ transitionDelay: on ? `${t.li * 60}ms` : "0ms", transitionTimingFunction: EASE_OUT }}
            >
              {t.ch}
            </span>
          );
        })}
      </div>
      <p className="mt-4 flex items-center justify-center gap-1.5">
        <span className="mr-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-royal/70">Unscrambled</span>
        {WORDS[active].split("").map((ch, i) => (
          <span key={`${active}-${i}`} className="pop grid size-7 place-items-center bg-[#e6c27a] font-mono text-sm font-bold text-[#17233b]" style={{ "--d": `${i * 0.06}s` } as CSSProperties}>
            {ch}
          </span>
        ))}
      </p>
    </div>
  );
}

/* ───────── Step diagrams ───────── */

const ART = "/art/myth";

type FlowNode = { Icon: typeof Phone; title: string; sub: string; art: string };

/* Three stations joined by a gold line along which a small light travels. Each station has its own Greek figure,
   floating a little out of step with the others, so the row feels alive rather than drawn. */
function Flow({ nodes }: { nodes: FlowNode[] }) {
  return (
    <ol className="flex flex-col items-stretch gap-3 @md:flex-row @md:items-stretch @md:gap-0">
      {nodes.map((n, k) => (
        <li key={n.title} className="flex min-w-0 flex-col items-center gap-3 @md:flex-1 @md:flex-row @md:items-stretch @md:gap-0">
          <div className="pop relative w-full min-w-0 overflow-hidden border-2 border-royal bg-surface p-3 @md:w-auto @md:flex-1 @md:p-4" style={{ "--d": `${k * 0.45}s` } as CSSProperties}>
            <div className="relative flex h-32 items-end justify-center @md:h-36 @xl:h-44">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${ART}/${n.art}.webp`}
                alt=""
                loading="lazy"
                draggable={false}
                className="jr-float h-full w-auto max-w-full object-contain drop-shadow-[0_10px_10px_rgba(58,16,24,0.35)]"
                style={{ "--fd": `${k * -1.7}s`, "--fa": "6px" } as CSSProperties}
              />
            </div>
            <span className="mt-3 flex size-9 items-center justify-center bg-royal text-[#e6c27a]">
              <n.Icon aria-hidden weight="bold" className="size-5" />
            </span>
            <p className="mt-3 break-words text-sm font-semibold leading-snug @xl:text-base">{n.title}</p>
            <p className="mt-1 text-sm leading-snug text-ink/70">{n.sub}</p>
          </div>
          {k < nodes.length - 1 && (
            <span aria-hidden className="relative block h-8 w-0.5 shrink-0 bg-royal/25 @md:h-0.5 @md:w-5 @md:self-center @xl:w-8">
              <span className="draw-y @md:draw-x absolute inset-0 bg-royal" style={{ "--d": `${k * 0.45 + 0.3}s` } as CSSProperties} />
              <span className="travel absolute size-2.5 rounded-full bg-[#e6c27a] ring-2 ring-royal" style={{ "--d": `${k * 0.45 + 0.9}s` } as CSSProperties} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/* Three bars fill as the work is done, and a winged messenger flies along the head of each one. */
function BuildBars() {
  const rows = [
    { Icon: PenNib, label: "Your story, written", art: "cupid" },
    { Icon: PencilRuler, label: "Your design", art: "angel-fly" },
    { Icon: Hammer, label: "Your site, built", art: "flyer" },
  ];
  return (
    <div>
      <ul className="flex flex-col gap-7">
        {rows.map((r, k) => (
          <li key={r.label}>
            <p className="flex items-center gap-2 text-base font-semibold">
              <r.Icon aria-hidden weight="bold" className="size-5 text-royal" />
              {r.label}
            </p>
            <div className="relative mt-5 h-3 bg-royal/15">
              <span className="fill-x absolute inset-0 bg-royal" style={{ "--d": `${k * 0.35}s` } as CSSProperties} />
              {[25, 50, 75].map((m) => (
                <span key={m} aria-hidden className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-2 border-[#e6c27a] bg-royal" style={{ left: `${m}%` }} />
              ))}
              <span aria-hidden className="ride absolute -top-9 left-0 block h-11 w-14" style={{ "--d": `${k * 0.35}s` } as CSSProperties}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${ART}/${r.art}.webp`} alt="" loading="lazy" draggable={false} className="size-full -translate-x-1/2 object-contain drop-shadow-[0_6px_6px_rgba(58,16,24,0.35)]" />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-center gap-2 text-sm text-ink/75">
        <span aria-hidden className="size-3 rotate-45 border-2 border-[#e6c27a] bg-royal" />
        You review it at each milestone.
      </p>
    </div>
  );
}

/* The finished site, on its own address, with the sun rising over it and a laurel-crowned bust on the page. */
function LaunchView() {
  const checks = ["Checked on phones", "Ready for search and sharing", "Walkthrough done, you can edit it"];
  return (
    <div>
      <div className="border-2 border-royal">
        <div className="flex items-center gap-3 border-b-2 border-royal bg-royal px-4 py-2.5 text-paper">
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2 rounded-full bg-[#e6c27a]" />
            <span className="size-2 rounded-full bg-[#e6c27a]/60" />
            <span className="size-2 rounded-full bg-[#e6c27a]/30" />
          </span>
          <span className="flex min-w-0 flex-1 items-center bg-paper px-3 py-1 font-mono text-xs text-ink">
            <span className="text-ink/65">https://</span>
            <span className="type text-ink" style={{ "--d": "0.3s" } as CSSProperties}>
              yourname.com
            </span>
          </span>
          <span className="relative inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-[#e6c27a]">
            <span aria-hidden className="relative flex size-2">
              <span className="pulse-ring absolute inset-0 rounded-full bg-[#e6c27a]" />
              <span className="relative size-2 rounded-full bg-[#e6c27a]" />
            </span>
            Live
          </span>
        </div>
        <div className="relative grid grid-cols-[1fr_auto] items-center gap-3 p-5">
          <div>
            <p className="display pop text-4xl text-royal" style={{ "--d": "1.5s" } as CSSProperties}>
              Your Name
            </p>
            <p className="dek pop mt-2 text-lg text-ink/75" style={{ "--d": "1.7s" } as CSSProperties}>
              Your whole story, in one place.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ART}/bust-headphones.webp`} alt="" loading="lazy" draggable={false} className="pop h-28 w-auto object-contain drop-shadow-[0_10px_10px_rgba(58,16,24,0.3)] sm:h-32" style={{ "--d": "1.9s" } as CSSProperties} />
        </div>
        <div className="flex items-center justify-center gap-4 border-t-2 border-royal/20 bg-royal/5 px-4 py-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ART}/gold-sun.webp`} alt="" loading="lazy" draggable={false} className="sun-turn size-9 object-contain" />
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-royal">Day 14 · your home is open</span>
        </div>
      </div>
      <ul className="mt-5 flex flex-col gap-2">
        {checks.map((c, k) => (
          <li key={c} className="pop flex items-center gap-2 text-base" style={{ "--d": `${1.9 + k * 0.3}s` } as CSSProperties}>
            <CheckCircle aria-hidden weight="fill" className="size-5 text-royal" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StageDiagram({ i }: { i: number }) {
  if (i === 0)
    return (
      <Flow
        nodes={[
          { Icon: Phone, title: "Kick-off call", sub: "60 minutes, in private", art: "angel-head" },
          { Icon: ListChecks, title: "Short questionnaire", sub: "Your answers, in writing", art: "plaque" },
          { Icon: Users, title: "Shared workspace", sub: "Plan, files and updates", art: "lanterns" },
        ]}
      />
    );
  if (i === 1)
    return (
      <Flow
        nodes={[
          { Icon: Users, title: "Interviews", sub: "You, and people who know your work", art: "cherub" },
          { Icon: MagnifyingGlass, title: "Research", sub: "What search and press say about you", art: "sun-moon" },
          { Icon: FileText, title: "Your story", sub: "Outlined for your approval", art: "swan" },
        ]}
      />
    );
  if (i === 2) return <BuildBars />;
  return <LaunchView />;
}

/* ───────── The section ───────── */

export function Engagement() {
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduce, setReduce] = useState(true);
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // Walk through the four steps once the section is on screen; stop for good as soon as the reader acts.
  useEffect(() => {
    if (!visible || touched || reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % timeline.length), AUTO_MS);
    return () => clearInterval(id);
  }, [visible, touched, reduce]);

  const pick = (n: number) => {
    setTouched(true);
    setI(n);
    track("engagement_step", { step: n + 1 });
  };

  const stage = timeline[i];

  const [ring, setRing] = useState(0);
  const [ringTouched, setRingTouched] = useState(false);
  useEffect(() => {
    if (!visible || ringTouched || reduce) return;
    const id = setInterval(() => setRing((n) => (n + 1) % stewardship.length), 3200);
    return () => clearInterval(id);
  }, [visible, ringTouched, reduce]);
  const pickRing = (n: number) => {
    setRingTouched(true);
    setRing(n);
  };

  const facts: [typeof Clock, string, string][] = [
    [Clock, "Time", studio.duration],
    [UserCircle, "Your time", "A few hours in all: one call, two or three interviews, a couple of short reviews"],
    [Wallet, "Cost", studio.priceFrom ?? "Quoted in writing after the first conversation"],
    [ArrowsClockwise, "After launch", studio.stewardshipFrom ?? "Optional, monthly"],
  ];

  return (
    <>
      <section ref={root} id="engagement" aria-labelledby="engagement-title" className="sparkle relative isolate scroll-mt-24 overflow-hidden bg-[#121c33] py-20 text-[#f5efe3] md:py-32">
        <div className="relative z-10 container-ed">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-[#e6c27a]">02 · How it works</p>
              <h2 id="engagement-title" className="display mt-5 text-[clamp(2.75rem,6.5vw,6rem)] leading-[0.98]">
                <MaskLines lines={["Four steps.", <span key="b" className="hl-on-dark">One story.</span>]} />
              </h2>
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <p className="text-lg leading-snug text-[#f5efe3]/80">Tap a step to see what happens, what you do, and what you get. One project, built around one person, with no packages or templates.</p>
            </Reveal>
          </div>

          <ol aria-label="The four steps" className="mt-10 grid grid-cols-2 gap-3 lg:mt-14 lg:grid-cols-4 lg:gap-5">
            {timeline.map((s, n) => {
              const Icon = stageIcons[n];
              const on = n === i;
              const done = n < i;
              return (
                <li key={s.n}>
                  <button
                    type="button"
                    id={`step-${n}`}
                    aria-current={on ? "step" : undefined}
                    aria-controls="step-panel"
                    onClick={() => pick(n)}
                    className={`group relative flex h-full w-full flex-col gap-3 overflow-hidden border-2 p-4 text-left transition-[background-color,border-color,transform] duration-200 active:scale-[0.97] md:flex-row md:items-center md:gap-4 ${
                      on ? "border-[#e6c27a] bg-[#e6c27a] text-[#17233b]" : "border-[#e6c27a]/45 bg-white/[0.04] text-[#f5efe3] hover:border-[#e6c27a]"
                    }`}
                    style={{ transitionTimingFunction: EASE_OUT }}
                  >
                    <span className={`flex size-11 shrink-0 items-center justify-center transition-colors duration-200 ${on ? "bg-[#17233b] text-[#e6c27a]" : done ? "bg-[#e6c27a] text-[#17233b]" : "bg-white/10 text-[#f5efe3]"}`}>
                      {done ? <Check aria-hidden weight="bold" className="size-5" /> : <Icon aria-hidden weight="bold" className="size-5" />}
                    </span>
                    <span className="min-w-0">
                      <span className={`eyebrow block ${on ? "text-[#17233b]/75" : "text-[#e6c27a]"}`}>
                        {s.n} · {s.when}
                      </span>
                      <span className="display mt-1 block text-xl leading-tight md:text-2xl">{s.title}</span>
                    </span>
                    {on && !touched && !reduce && visible && (
                      <span key={`bar-${i}`} aria-hidden className="fill-x absolute inset-x-0 bottom-0 h-1 bg-[#17233b]/60" style={{ animationDuration: `${AUTO_MS}ms`, animationTimingFunction: "linear" }} />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <DayRuler when={stage.when} />

          <div id="step-panel" role="region" aria-live="polite" aria-label={`Step ${stage.n}: ${stage.title}`} className="mt-8 grid gap-4 md:grid-cols-5 xl:grid-cols-12 xl:gap-5">
            <div key={`fig-${i}`} aria-hidden className="relative h-80 overflow-hidden border-2 border-[#e6c27a]/60 bg-[radial-gradient(ellipse_at_50%_30%,#2e4163,#17233b_70%)] md:col-span-2 md:h-auto md:min-h-[30rem] xl:col-span-3 xl:min-h-[36rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src="/art/myth/clouds-a.webp" alt="" draggable={false} className="absolute inset-x-[-10%] bottom-[-6%] w-[120%] opacity-50 cloud-feather" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                src={FIGURES[i]}
                alt=""
                draggable={false}
                className="step-figure absolute inset-x-2 bottom-0 top-10 mx-auto h-[calc(100%-2.5rem)] w-[calc(100%-1rem)] object-contain object-bottom drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]"
              />
              <span className="absolute left-3 top-3 bg-[#e6c27a] px-2.5 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-[#17233b]">Step {stage.n}</span>
            </div>

            <div key={`txt-${i}`} className="rise-in border-2 border-[#e6c27a]/60 bg-[#f7f3eb] p-6 text-ink md:col-span-3 md:p-8 xl:col-span-4">
              <p className="eyebrow text-royal">
                Step {stage.n} · {stage.when}
              </p>
              <h3 className="display mt-3 text-3xl text-royal md:text-4xl">{stage.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink/80">{stage.body}</p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {stage.does.map((d, k) => (
                  <li key={d} className="pop flex items-start gap-3 text-base leading-snug" style={{ "--d": `${0.1 + k * 0.08}s` } as CSSProperties}>
                    <Check aria-hidden weight="bold" className="mt-0.5 size-5 shrink-0 text-royal" />
                    {d}
                  </li>
                ))}
              </ul>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1 2xl:grid-cols-2">
                <div className="bg-royal p-4 text-paper">
                  <p className="eyebrow text-[#e6c27a]">Your part</p>
                  <p className="mt-1 text-sm leading-snug">{stage.yourPart}</p>
                </div>
                <div className="bg-royal p-4 text-paper">
                  <p className="eyebrow text-[#e6c27a]">You get</p>
                  <p className="mt-1 text-sm leading-snug">{stage.receive.join(", ")}</p>
                </div>
              </div>
              {stage.gate && (
                <p className="mt-4 flex items-center gap-2 text-sm text-ink/75">
                  <span aria-hidden className="size-3 shrink-0 rotate-45 bg-royal" />
                  <span>
                    Before we move on, you approve: <strong className="font-semibold text-ink">{stage.gate}</strong>
                  </span>
                </p>
              )}
            </div>

            <div key={`dia-${i}`} className="flex min-w-0 flex-col justify-center @container border-2 border-[#e6c27a]/60 bg-[#f7f3eb] p-4 text-ink md:col-span-5 md:p-7 xl:col-span-5">
              <StageDiagram i={i} />
            </div>
          </div>

          <Reveal className="mt-10 md:mt-14">
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {facts.map(([Icon, k, v]) => (
                <div key={k} className="border-2 border-[#e6c27a]/45 bg-white/[0.04] p-5">
                  <dt className="eyebrow flex items-center gap-2 text-[#e6c27a]">
                    <Icon aria-hidden weight="bold" className="size-5" />
                    {k}
                  </dt>
                  <dd className="mt-3 text-base leading-snug text-[#f5efe3]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section id="stewardship" aria-labelledby="keep-title" className="tone-mint relative overflow-hidden bg-wash py-20 md:py-32">
        <div className="relative z-10 container-ed">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-royal">After launch</p>
              <h2 id="keep-title" className="display mt-5 text-[clamp(2.5rem,5.6vw,5.25rem)] leading-[1]">
                <MaskLines lines={["Your story keeps growing.", <span key="b" className="text-royal">So does your site.</span>]} />
              </h2>
            </div>
            <Reveal className="lg:col-span-4">
              <p className="text-lg leading-snug text-ink/75">Launch is chapter one. Here is your first year, and the six things we keep doing in it.</p>
            </Reveal>
          </div>

          <Reveal className="mt-10 md:mt-14">
            <WordBoard active={ring} onPick={pickRing} />
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-12 lg:gap-8">
            <div aria-hidden className="relative h-[26rem] overflow-hidden border-2 border-royal bg-[radial-gradient(ellipse_at_50%_30%,#2e4163,#17233b_72%)] sm:h-96 lg:col-span-5 lg:h-auto lg:min-h-[40rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" src="/art/myth/clouds-b.webp" alt="" draggable={false} className="absolute inset-x-[-10%] bottom-[-8%] w-[120%] opacity-50 cloud-feather" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async"
                key={ring}
                src={KEEP_FIGURES[ring]}
                alt=""
                draggable={false}
                className="step-figure absolute inset-x-2 bottom-0 top-10 mx-auto h-[calc(100%-2.5rem)] w-[calc(100%-1rem)] object-contain object-bottom drop-shadow-[0_22px_22px_rgba(0,0,0,0.5)]"
              />
              <span className="absolute left-3 top-3 bg-[#e6c27a] px-2.5 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-[#17233b]">
                Chapter {ring + 1} of {stewardship.length}
              </span>
              <span className="absolute right-3 top-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#f3e6c4]">{stewardship[ring].cadence}</span>
            </div>

            <div className="flex flex-col lg:col-span-7">
              <ul className="flex flex-col gap-2.5">
                {stewardship.map((st, n) => {
                  const Icon = stewardIcons[st.key];
                  const on = n === ring;
                  return (
                    <li key={st.key}>
                      <button
                        type="button"
                        onPointerEnter={(e) => e.pointerType === "mouse" && pickRing(n)}
                        onFocus={() => pickRing(n)}
                        onClick={() => pickRing(n)}
                        aria-pressed={on}
                        className={`relative flex w-full items-start gap-4 overflow-hidden border-2 border-royal p-4 text-left transition-[background-color,color,transform] duration-200 active:scale-[0.985] ${on ? "bg-royal text-paper" : "bg-surface text-ink hover:bg-royal/[0.06]"}`}
                        style={{ transitionTimingFunction: EASE_OUT }}
                      >
                        <span className={`flex size-11 shrink-0 items-center justify-center transition-colors duration-200 ${on ? "bg-[#e6c27a] text-[#17233b]" : "bg-royal text-paper"}`}>
                          <Icon aria-hidden weight="bold" className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-baseline justify-between gap-x-4">
                            <span className="display text-2xl leading-tight">{st.item}</span>
                            <span className={`eyebrow ${on ? "text-[#e6c27a]" : "text-royal/80"}`}>{st.cadence}</span>
                          </span>
                          <span className={`mt-1 block text-base leading-snug ${on ? "text-paper/85" : "text-ink/75"}`}>{st.note}</span>
                        </span>
                        {on && !ringTouched && !reduce && visible && (
                          <span key={`rb-${ring}`} aria-hidden className="fill-x absolute inset-x-0 bottom-0 h-1 bg-[#e6c27a]" style={{ animationDuration: "3200ms", animationTimingFunction: "linear" }} />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="mt-8">
                <Button href={cta.primary.href} size="lg">
                  {cta.primary.label}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-20 grid gap-8 md:mt-28 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow text-royal">What you get</p>
              <h3 className="display mt-3 text-3xl md:text-4xl">Everything, every time.</h3>
              <p className="mt-4 max-w-sm text-base text-ink/75">The full list is included. How deep we go depends on you, never on a price list.</p>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
              {deliverables.map((d, k) => (
                <Reveal as="li" key={d} delay={(k % 2) * 0.05} className="flex items-center gap-3 border-2 border-royal bg-surface px-4 py-3.5 text-base text-ink">
                  <CheckCircle aria-hidden weight="fill" className="size-6 shrink-0 text-royal" />
                  {d}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
