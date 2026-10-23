import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { journal } from "@/lib/content";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { SkyScene } from "@/components/atelier/Scenes";
import { JournalHero } from "@/components/journal/JournalHero";
import { ProcessScroll } from "@/components/journal/ProcessScroll";
import { Marquee } from "@/components/journal/Marquee";
import { EssayIndex } from "@/components/journal/EssayIndex";
import { ScrubText } from "@/components/journal/ScrubText";
import { ReadProgress } from "@/components/journal/ReadProgress";
import { artAlt } from "@/lib/altText";

export const metadata: Metadata = pageMeta({
  title: "The Journal",
  description:
    "The RURO Journal: essays on reputation, digital identity and what people find when they search your name, from a personal website studio.",
  path: "/journal",
});

const note = [
  "Most of what the internet says about a person was written by someone else, for some other purpose. A profile built for recruiters. A press release written for a funding round. A biography supplied to a conference by an assistant, years ago.",
  "This journal is where we think about that problem: how reputations are formed, how they drift, and what it takes to state one clearly. We publish rarely, and only when we have something worth your time.",
];

/* The Journal is a scrolled argument before it is an archive. A masthead with the web drifting behind it,
   a pinned scene that plays out what a search for your name does, a band of large type, the contents as a
   working index, the editors' note read at the reader's pace, and a closing line of correspondence. All
   motion is driven by scroll and stops under reduced motion. */
export default function JournalPage() {
  const essays = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <article className="bg-paper text-ink">
      <ReadProgress />
      <JournalHero count={journal.length} />
      <ProcessScroll />
      <Marquee />
      <EssayIndex essays={essays} />

      {/* Editors' note: dark, read at the reader's pace */}
      <section aria-labelledby="note-title" className="tone-lilac bg-wash relative isolate overflow-hidden text-ink">
        <SkyScene variant="j" behind />
        <div className="container-ed grid gap-10 py-28 md:grid-cols-12 md:py-44">
          <h2 id="note-title" className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-accent-soft md:col-span-3">
            A note from the editors
          </h2>
          <div className="md:col-span-8 md:col-start-5">
            <ScrubText paragraphs={note} className="display text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.25]" />
            <p className="mt-12 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink/70">The editors, RURO</p>
          </div>
        </div>
      </section>

      {/* Our discretion policy: a plain statement, placed after the editors' note */}
      <section aria-labelledby="policy-title" className="relative overflow-hidden bg-royal text-paper">
        {/* the scales: nothing is published until it is weighed and agreed */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src="/art/myth/scales.webp" alt={artAlt("/art/myth/scales.webp")} aria-hidden draggable={false} className="jr-float pointer-events-none absolute bottom-0 right-[3%] hidden h-[88%] w-auto opacity-90 mix-blend-screen md:block" style={{ "--fa": "6px" } as React.CSSProperties} />
        <div className="container-ed relative z-10 grid grid-cols-1 gap-8 py-16 md:grid-cols-12 md:py-24">
          <h2 id="policy-title" className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[#e6c27a] md:col-span-3">
            Our discretion policy
          </h2>
          <div className="min-w-0 md:col-span-6 md:col-start-5">
            <p className="display text-[clamp(1.6rem,3vw,2.6rem)] font-light leading-[1.2]">
              We never publish a client’s name, work or details without their written permission. What you tell us is used only to write your site.
            </p>
            <p className="mt-6 text-base text-paper/80">
              Questions before you enquire?{" "}
              <a href={`mailto:${site.email}`} className="link-underline inline-block py-2 text-paper">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Correspondence */}
      <section aria-labelledby="letters-title" className="relative isolate overflow-hidden">
        <SkyScene variant="k" behind />
        <div className="container-ed py-24 text-center md:py-36">
        <Reveal>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink/65">Correspondence</p>
          <h2 id="letters-title" className="display mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,4.5vw,3.75rem)] font-light leading-[1.08]">
            Write to the editors, or begin a conversation about your own estate.
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
            <a href={`mailto:${site.email}`} className="link-underline inline-block py-2 text-lg text-ink transition-colors duration-500 hover:text-accent">
              {site.email}
            </a>
            <span aria-hidden className="hidden h-4 w-px bg-ink/20 sm:block" />
            <Link href="/contact" className="link-underline text-lg text-ink transition-colors duration-500 hover:text-accent">
              Start a conversation
            </Link>
          </div>
        </Reveal>
        </div>
      </section>
    </article>
  );
}
