"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, DeviceMobile, Desktop } from "@phosphor-icons/react";
import { concepts, type Concept } from "@/lib/showcase";
import { annotations } from "@/lib/annotations";
import { Annotator } from "./Annotator";
import { ConceptEstate } from "./ConceptEstate";
import { NikhilConcept } from "./concepts/NikhilConcept";
import { SamConcept } from "./concepts/SamConcept";
import { JamesConcept } from "./concepts/JamesConcept";
import { PaulConcept } from "./concepts/PaulConcept";
import { ConceptPicker } from "./showcase/ConceptPicker";
import { DesignDna } from "./showcase/DesignDna";
import { Button } from "./ui/Button";
import { cta } from "@/lib/site";
import { track } from "@/lib/analytics";

/* Concept sites for well-known people. Each concept has three views of one preview frame: how their web
   presence looks TODAY, a drag-to-COMPARE wipe between that and the redesign, and the RURO REDESIGN
   itself (live, with design notes pinned beside it). The frame can show a desktop or a phone. The
   reasoning, palette and type sit beside it. Every concept is labelled unofficial; see lib/showcase.ts. */

type View = "today" | "redesign";
type Device = "desktop" | "phone";

function Redesign({ c }: { c: Concept }) {
  switch (c.slug) {
    case "nikhil-kamath":
      return <NikhilConcept c={c} />;
    case "sam-altman":
      return <SamConcept c={c} />;
    case "james-clear":
      return <JamesConcept c={c} />;
    case "paul-graham":
      return <PaulConcept c={c} />;
    default:
      return <ConceptEstate c={c} />;
  }
}

function TodayShot({ c, fill }: { c: Concept; fill?: boolean }) {
  const t = c.today;
  if (!t) return null;
  if (!t.image) {
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center gap-4 bg-paper-deep px-8 py-16 text-center">
        <p className="eyebrow text-ink/70">No personal site found</p>
        <p className="display max-w-xl text-3xl md:text-4xl">{c.person} has no page of his own to show here.</p>
        <p className="max-w-lg text-lg leading-snug text-ink/75">{t.summary}</p>
      </div>
    );
  }
  const alt = `${t.source ?? `${c.person}’s current website`}: ${t.summary}`;
  return fill ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={t.image} alt={alt} className="block h-auto w-full" loading="lazy" />
  ) : (
    <div className="max-h-[46rem] overflow-y-auto bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={t.image} alt={alt} className="block w-full" loading="lazy" />
    </div>
  );
}

function Panel({ c, i, intro, onIntroDone }: { c: Concept; i: number; intro: boolean; onIntroDone: () => void }) {
  const t = c.today;
  // The first concept opens on "Before" for three seconds, once it is on screen, then moves to the RURO design and
  // stays there. Choosing another person never replays it: every concept opens straight on "After".
  const [view, setView] = useState<View>(intro && t ? "today" : "redesign");
  const root = useRef<HTMLDivElement>(null);
  const handsOn = useRef(false);
  useEffect(() => {
    if (!intro || !t) return;
    const el = root.current;
    if (!el) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !timer) {
          timer = window.setTimeout(() => {
            if (!handsOn.current) setView("redesign");
            onIntroDone();
          }, 3000);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [intro, t, onIntroDone]);
  const [device, setDevice] = useState<Device>("desktop");
  const first = c.person.split(" ")[0];
  const real = !c.url.includes("wikipedia.org");
  const isToday = view === "today" && !!t;
  const phone = device === "phone";

  const pick = (v: View) => {
    handsOn.current = true;
    onIntroDone();
    setView(v);
    track("showcase_view", { person: c.slug, view: v });
  };
  const dev = (d: Device) => {
    setDevice(d);
    track("showcase_device", { person: c.slug, device: d });
  };

  const group = (title: string, items: string[], grow: number) => (
    <section className="flex flex-col" style={{ flexGrow: grow }}>
      <h2 className="eyebrow border-t border-ink/30 pt-4 text-royal">{title}</h2>
      <ul className="flex flex-1 flex-col">
        {items.map((x) => (
          <li key={x} className="flex flex-1 items-center border-t border-ink/15 py-3 text-lg leading-snug first:border-t-0">
            {x}
          </li>
        ))}
      </ul>
    </section>
  );

  const label =
    view === "today"
      ? t?.image
        ? `${t.source ?? `${c.person}’s site today`} · screenshot, ${t.captured}`
        : `${c.person} · no personal site today`
      : `RURO concept for ${c.domain}`;
  const tag = view === "today" ? "Before" : "After · unofficial concept";
  const tone = view === "today" ? "ink" : "accent";

  const body =
    view === "today" ? (
      <TodayShot c={c} />
    ) : (
      <Redesign c={c} />
    );

  const frame = (
    <div
      className={`mx-auto overflow-hidden transition-[max-width,border-radius] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] ${
        phone ? "max-w-[23.5rem] rounded-[2.4rem] border-[10px] border-royal bg-royal shadow-[0_40px_80px_-30px_rgba(20,22,43,0.7)]" : `max-w-full border-2 ${"border-royal"}`
      }`}
      style={{ "--cx-h": phone ? "40rem" : "clamp(40rem, 78vh, 56rem)" } as React.CSSProperties}
    >
      {phone ? (
        <div className="relative bg-ink pb-1 pt-1" aria-hidden>
          <span className="mx-auto block h-5 w-24 rounded-full bg-black" />
        </div>
      ) : (
        <div className={`flex items-center gap-3 border-b px-4 py-2.5 ${tone === "ink" ? "border-ink/30 bg-paper-deep" : "border-royal/40 bg-royal-tint"}`}>
          <span aria-hidden className="flex gap-1.5">
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
            <span className="size-2 rounded-full bg-ink/15" />
          </span>
          <span className="flex-1 truncate bg-paper px-3 py-1 text-center font-mono text-[0.6875rem] text-ink/70">{label}</span>
          <span className={`whitespace-nowrap px-2 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] ${tone === "ink" ? "bg-ink text-paper" : "bg-royal text-paper"}`}>{tag}</span>
        </div>
      )}
      <div className={phone ? "overflow-hidden rounded-[1.6rem] bg-paper" : ""}>{body}</div>
    </div>
  );

  const notes = view === "redesign" ? annotations[c.slug] : undefined;

  return (
    <div
      ref={root}
      id={`panel-${c.slug}`}
      role="tabpanel"
      aria-labelledby={`tab-${c.slug}`}
      className="rise-in mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:gap-14"
    >
      <figure className={`min-w-0 ${isToday ? "lg:sticky lg:top-6" : ""}`}>
        <div className="mb-4 flex flex-wrap items-stretch gap-3">
          {t && (
            <div role="group" aria-label="Choose a view" className="grid min-w-0 flex-1 grid-cols-2 border-2 border-royal">
              {(
                [
                  ["today", "Their site today", "Before"],
                  ["redesign", "RURO redesign", "After"],
                ] as const
              ).map(([v, name, sub]) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  onClick={() => pick(v)}
                  className={`flex min-h-12 flex-col items-center justify-center px-2 py-2 transition-colors duration-300 sm:flex-row sm:gap-3 ${
                    view === v ? "bg-royal text-paper" : "bg-surface text-royal/80 hover:text-royal"
                  }`}
                >
                  <span className="eyebrow opacity-70">{sub}</span>
                  <span className="text-sm font-medium sm:text-base">{name}</span>
                </button>
              ))}
            </div>
          )}
          <div role="group" aria-label="Choose a screen size" className="grid grid-cols-2 border-2 border-royal">
            {(
              [
                ["desktop", Desktop, "Desktop"],
                ["phone", DeviceMobile, "Phone"],
              ] as const
            ).map(([d, Icon, name]) => (
              <button
                key={d}
                type="button"
                aria-pressed={device === d}
                aria-label={name}
                onClick={() => dev(d)}
                className={`flex min-h-12 items-center gap-2 px-3 transition-colors duration-300 ${device === d ? "bg-royal text-paper" : "bg-surface text-royal/80 hover:text-royal"}`}
              >
                <Icon aria-hidden className="size-5" />
                <span className="hidden text-sm font-medium xl:inline">{name}</span>
              </button>
            ))}
          </div>
        </div>

        {notes?.length ? <Annotator notes={notes}>{frame}</Annotator> : frame}

        {isToday && t?.caption && <figcaption className="mt-3 border-l-2 border-royal pl-3 text-sm leading-relaxed text-ink/80">{t.caption}</figcaption>}
        {view === "redesign" && c.design && (
          <figcaption className="mt-3 font-mono text-[0.6875rem] leading-relaxed text-ink/70">
            Scroll inside the preview. It is live. The margin icons name the design law, copy framework or story principle behind each choice.
            {c.photo && (
              <>
                {" "}
                {c.photo.href ? (
                  <>
                    Photo: {c.photo.credit},{" "}
                    <a href={c.photo.href} target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">
                      {c.photo.license}
                    </a>
                    , via Wikimedia Commons.
                  </>
                ) : (
                  <>Photo: {c.photo.credit}.</>
                )}
              </>
            )}
          </figcaption>
        )}

        {/* The palette and type sit under the preview, so the two columns run to about the same length. */}
        {!isToday && c.dna && <DesignDna dna={c.dna} />}
      </figure>

      <aside aria-label={`Notes on the ${c.person} ${isToday ? "site today" : "concept"}`} className="flex min-w-0 flex-col gap-8">
        <header>
          <p className="eyebrow text-royal">
            Concept {i + 1} of {concepts.length} · {c.role}
          </p>
          <p className="eyebrow mt-3 text-ink/70">{isToday ? "Before · their site today" : c.design ? `After · ${c.design.name}` : "After · RURO redesign"}</p>
          <p className="display mt-4 text-4xl md:text-5xl">{isToday ? "Where things stand." : c.thesis}</p>
        </header>

        {isToday && t ? (
          <div className="flex flex-col gap-8">
            <section>
              <h2 className="eyebrow border-t border-ink/30 pt-4 text-royal">What it is today</h2>
              <p className="mt-3 text-lg leading-snug">{t.summary}</p>
            </section>
            {group("What works", t.works, t.works.length)}
            {group("What is missing", t.gaps, t.gaps.length)}
          </div>
        ) : c.design ? (
          <div className="flex flex-col gap-8">
            <section>
              <h2 className="eyebrow border-t border-ink/30 pt-4 text-royal">What this design is</h2>
              <p className="mt-3 text-lg leading-snug">{c.design.what}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {c.design.reference ? (
                  <>
                    Built after the mood of{" "}
                    <a href={c.design.reference.url} target="_blank" rel="noopener noreferrer nofollow" className="text-royal underline underline-offset-2">
                      {c.design.reference.name}
                    </a>
                    . The layout idea and feeling are borrowed; the artwork, words and details are our own.
                  </>
                ) : (
                  <>An original direction, not based on any existing portfolio. The look comes from who he is; the artwork, words and details are our own.</>
                )}
              </p>
            </section>

            <section>
              <h2 className="eyebrow border-t border-ink/30 pt-4 text-royal">Why we designed it this way</h2>
              <ul>
                {c.design.why.map((w) => (
                  <li key={w.on} className="border-t border-ink/15 py-3 first:border-t-0">
                    <span className="eyebrow text-ink/70">{w.on}</span>
                    <span className="mt-1 block text-base leading-snug">{w.text}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="eyebrow border-t border-ink/30 pt-4 text-royal">How it matches {first}</h2>
              <ul>
                {c.design.fit.map((f) => (
                  <li key={f.trait} className="grid gap-1 border-t border-ink/15 py-3 first:border-t-0 sm:grid-cols-[10rem_1fr] sm:gap-4">
                    <span className="eyebrow pt-1 text-ink/70">{f.trait}</span>
                    <span className="text-base leading-snug">{f.choice}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-8">
            {group("What we kept", c.kept, c.kept.length)}
            {group("What we changed", c.changed, c.changed.length + 1)}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/30 pt-6">
          <Button href={cta.primary.href}>{cta.primary.label}</Button>
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-track="showcase_visit"
            data-track-person={c.slug}
            className="group inline-flex items-center gap-2 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-royal"
          >
            <span className="link-underline">{real ? `See the real ${c.domain}` : `Read about ${c.person}`}</span>
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </aside>
    </div>
  );
}

export function Showcase() {
  const [i, setI] = useState(0);
  const [intro, setIntro] = useState(true);
  const introDone = useCallback(() => setIntro(false), []);
  const c = concepts[i];

  // Deep links and the hero collage: #nikhil-kamath, or a "showcase:pick" event carrying a slug.
  useEffect(() => {
    const apply = (slug: string) => {
      const n = concepts.findIndex((x) => x.slug === slug);
      if (n >= 0) setI(n);
    };
    apply(window.location.hash.slice(1));
    const onPick = (e: Event) => apply((e as CustomEvent<string>).detail);
    const onHash = () => apply(window.location.hash.slice(1));
    window.addEventListener("showcase:pick", onPick);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("showcase:pick", onPick);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  return (
    <div id="concepts" className="mx-auto w-full max-w-[112rem] scroll-mt-20 px-4 md:px-8 xl:px-12 2xl:px-16">
      <ConceptPicker
        index={i}
        onPick={(n) => {
          setIntro(false);
          setI(n);
          track("showcase_tab", { person: concepts[n].slug });
        }}
      />

      <Panel key={c.slug} c={c} i={i} intro={intro && i === 0} onIntroDone={introDone} />

      <p className="mt-6 max-w-4xl text-sm leading-relaxed text-ink/70">
        An unofficial concept by RURO. We were not commissioned by, and have no connection with, {c.person}. Facts come from public sources; the
        structure, writing and design are our own proposal for how such a site could be built. “Today” views are screenshots of public pages, with the
        date shown.
      </p>
    </div>
  );
}
