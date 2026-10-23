import { artAlt } from "@/lib/altText";
/* A rose-wound pillar of any height, built from three cut pieces of the studio's own picture: the capital with its
   flowers on top, a slice of fluted shaft that repeats down the middle, and the base at the foot. Unlike the single
   picture it never has to be cropped or stretched, so it stands complete from the top of a section to the bottom.
   Decorative, hidden from assistive technology. */
export function TallPillar({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div aria-hidden className={`pillar-sway flex flex-col ${flip ? "-scale-x-100" : ""} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src="/art/myth/pillar-top.webp" alt={artAlt("/art/myth/pillar-top.webp")} aria-hidden draggable={false} className="block w-full" />
      <div className="min-h-0 flex-1" style={{ backgroundImage: "url(/art/myth/pillar-shaft.webp)", backgroundRepeat: "repeat-y", backgroundSize: "100% auto" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img loading="lazy" decoding="async" src="/art/myth/pillar-base.webp" alt={artAlt("/art/myth/pillar-base.webp")} aria-hidden draggable={false} className="block w-full" />
    </div>
  );
}
