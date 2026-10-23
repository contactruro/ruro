import Link from "next/link";
import { Button } from "../ui/Button";
import { CloudBank } from "../atelier/CloudBank";
import { MaskLines, Reveal } from "../ui/Reveal";
import { cta } from "@/lib/site";
import { HomeJourney, type JourneyVariant } from "./HomeJourney";
import { artAlt } from "@/lib/altText";

/* The close, told as one picture: a figure carrying their story walks to a temple that becomes their home. The
   text sits first on a phone and the picture below it; on a desktop they sit side by side. Clouds along the foot keep it in the same world as the rest of the site. */

/* A building stands behind the closing scene, the whole height of the section, so it reads as a place and not a poster.
   Each page gets its own: a ruin of columns or a misty tower, on the right so the words stay clear. */
const BUILDING: Record<JourneyVariant, { src: string; flip?: boolean }> = {
  walk: { src: "ruins-tower" },
  sample: { src: "ruins-columns" },
  process: { src: "ruins-tower", flip: true },
  work: { src: "ruins-columns", flip: true },
  about: { src: "ruins-columns" },
  journal: { src: "ruins-tower" },
  study: { src: "ruins-columns", flip: true },
};

export function FinalCta({ variant = "walk" }: { variant?: JourneyVariant }) {
  const b = BUILDING[variant];
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-wash text-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/art/myth/${b.src}.webp`}
        alt={artAlt(`/art/myth/${b.src}.webp`)}
        aria-hidden
        loading="lazy"
        draggable={false}
        className={`pillar-sway pointer-events-none absolute inset-y-0 right-[-4rem] -z-10 h-full w-auto max-w-none opacity-40 md:right-0 md:opacity-60 ${b.flip ? "-scale-x-100" : ""}`}
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 35%), linear-gradient(to bottom, #000 80%, transparent 100%)", maskImage: "linear-gradient(to right, transparent 0, #000 35%), linear-gradient(to bottom, #000 80%, transparent 100%)", WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
      />
      <CloudBank reach={0.4} seed={5} fps={24} className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[18rem] w-full md:h-[24rem]" />

      <div className="container-ed relative z-10 grid items-center gap-10 py-24 md:py-36 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6">
          <p className="eyebrow text-accent">Let’s build yours</p>
          <h2 id="cta-title" className="display mt-5 max-w-3xl text-[clamp(2.6rem,6vw,6rem)] leading-[1]">
            <MaskLines lines={["Your story deserves", <span key="b" className="hl">a better home.</span>]} />
          </h2>
          <Reveal className="mt-6 max-w-md">
            <p className="text-lg leading-relaxed text-ink/75">A digital presence that reflects who you are and where you are going.</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Button href={cta.primary.href} size="lg">
              {cta.primary.label}
            </Button>
            <Link
              href={cta.secondary.href}
              data-track="cta_click"
              data-track-label={cta.secondary.label}
              className="inline-flex min-h-13 items-center justify-center rounded-lg px-7 text-[0.9375rem] font-medium text-ink ring-1 ring-ink/35 transition-colors duration-300 hover:bg-ink hover:text-paper"
            >
              {cta.secondary.label}
            </Link>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <HomeJourney variant={variant} />
        </div>
      </div>
    </section>
  );
}
