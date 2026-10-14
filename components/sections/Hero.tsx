import { Button } from "../ui/Button";
import { cta, studio } from "@/lib/site";
import type { CSSProperties } from "react";

/* The opening, after the reference portfolio: a full-screen cinematic scene (the fixed layer behind the
   page, scrubbed by scroll), a status pill, a headline that mixes a light sans with italic serif and one
   orange phrase, a short paragraph, two actions, and a slow band of who it is for along the foot.
   Entrances are CSS, so the text paints with the page. */

const WHO: [string, string][] = [["Founders", "#ebd9b5"], ["Executives", "#ebd9b5"], ["Investors", "#ebd9b5"], ["Authors", "#ebd9b5"], ["Doctors", "#ebd9b5"], ["Creators", "#ebd9b5"], ["Partners", "#ebd9b5"], ["Advisors", "#ebd9b5"]];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" data-nav-dark className="hero-on-dark relative flex min-h-svh flex-col justify-end">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
      <div className="container-ed pb-10 pt-32 md:pb-14">
        <div className="rise-in flex flex-wrap items-center gap-x-4 gap-y-2" style={{ "--d": "0.05s" } as CSSProperties}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/30 px-4 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink backdrop-blur">
            <span aria-hidden className="size-1.5 rounded-full bg-[#ebd9b5]" />
            Accepting new clients
          </span>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/70">Digital identity studio · for founders and executives</span>
        </div>

        <h1 id="hero-title" className="mt-6 md:mt-8 text-[clamp(2.7rem,9.4vw,9.5rem)] leading-[0.94] tracking-[-0.035em]">
          <span className="mask-rise block overflow-hidden pb-[0.06em]">
            <span className="block font-light" style={{ "--d": "0.1s" } as CSSProperties}>
              Your story
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="mask-rise block display italic text-white/60" style={{ "--d": "0.2s" } as CSSProperties}>
              is scattered.
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.1em]">
            <span className="mask-rise block" style={{ "--d": "0.3s" } as CSSProperties}>
              <span className="font-light">We tell it </span>
              <span className="hl hl-on-dark">in one place.</span>
            </span>
          </span>
        </h1>

        <p className="rise-in mt-6 max-w-xl text-base leading-relaxed text-ink/80 md:mt-8 md:text-xl" style={{ "--d": "0.5s" } as CSSProperties}>
          RURO builds your personal website. We interview you, write your story, and keep it up to date. So when people search your name, they find the real you.
        </p>

        <div className="rise-in mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={{ "--d": "0.65s" } as CSSProperties}>
          <Button href={cta.primary.href} size="lg" className="!bg-[#f7f3eb] !text-[#252521] hover:!bg-white">
            {cta.primary.label}
          </Button>
          <a href="/sample" data-track="cta_click" data-track-label="See examples" className="link-underline py-2 font-mono text-xs uppercase tracking-[0.14em] text-white">
            See examples
          </a>
          <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-white/65 md:inline">
            {studio.duration} · {studio.priceFrom ?? "Quoted after we talk"}
          </span>
        </div>
      </div>

      {/* Who it is for: a slow band along the foot, like the client strip on the reference */}
      <div aria-label="Who RURO builds for" className="overflow-hidden border-y border-white/15 bg-black/40 py-4 backdrop-blur">
        <div className="chip-marquee">
          {[...WHO, ...WHO, ...WHO, ...WHO].map(([w, col], i) => (
            <span key={i} className="flex items-center font-mono text-xs uppercase tracking-[0.2em] text-white/80">
              <span className="px-8">{w}</span>
              <span aria-hidden className="size-2 rounded-full" style={{ background: col }} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
