import type { ReactNode } from "react";
import type { CSSProperties } from "react";
import { MaskLines } from "./ui/Reveal";
import { HeaderScene, SkyScene, type HeaderVariant } from "./atelier/Scenes";

type Tone = "peach" | "butter" | "mint" | "sky" | "lilac" | "rose" | "sage";

export function PageHeader({
  eyebrow,
  lines,
  intro,
  aside,
  art,
  scene = "clouds",
  tone = "peach",
}: {
  eyebrow: string;
  lines: ReactNode[];
  intro?: ReactNode;
  aside?: ReactNode;
  /** Optional moving artwork for the empty right side of the header, shown from large screens up. */
  art?: ReactNode;
  /** The classical object beside the title (clouds only if omitted). */
  scene?: HeaderVariant;
  /** Retained from the earlier system; every tone is now the same ivory palette. */
  tone?: Tone;
}) {
  return (
    <header className={`tone-${tone} relative isolate overflow-hidden pb-16 pt-36 md:pb-24 md:pt-48`}>
      <SkyScene variant={art ? "i" : "h"} behind />
      {/* Painted clouds along the foot, and (from large screens) one classical object on the right */}
      {!art && <HeaderScene variant={scene} />}
      <div className="container-ed relative z-10">
        {art && (
          <div className="rise-in absolute right-4 top-0 hidden w-[min(30rem,32vw)] lg:block xl:right-10 2xl:right-16" style={{ "--d": "0.5s" } as CSSProperties}>
            {art}
            {aside && <div className="mt-8">{aside}</div>}
          </div>
        )}
        <p className="eyebrow flex items-center gap-3 text-accent">
          <span className="inline-block size-2 rounded-full bg-accent" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="display mt-8 text-[clamp(3rem,7.5vw,7.5rem)]">
          <MaskLines animateOnMount delay={0.1} lines={lines} />
        </h1>
        {/* CSS entrances: above the fold, so the intro paints without waiting for JavaScript */}
        {(intro || aside) && (
          <div className="mt-12 grid gap-10 md:grid-cols-12">
            {intro && (
              <div className="rise-in md:col-span-6" style={{ "--d": "0.3s" } as CSSProperties}>
                <div className="text-xl leading-relaxed text-ink/80">{intro}</div>
              </div>
            )}
            {aside && (
              <div className={`rise-in md:col-span-4 md:col-start-9 ${art ? "lg:hidden" : ""}`} style={{ "--d": "0.4s" } as CSSProperties}>
                {aside}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
