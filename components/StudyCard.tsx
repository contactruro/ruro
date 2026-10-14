import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Study } from "@/lib/content";

/* A homepage capture of someone else's site, framed as a browser window so it reads as
   a reference, never as RURO's own work. */
export function BrowserFrame({ s, priority = false, className = "" }: { s: Study; priority?: boolean; className?: string }) {
  return (
    <figure className={`overflow-hidden border border-ink/30 bg-paper ${className}`}>
      <div className="flex items-center gap-3 border-b border-ink/30 bg-paper-deep px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
        </span>
        <span className="flex-1 truncate bg-paper px-3 py-1 text-center font-mono text-[0.6875rem] text-ink/70">{s.domain}</span>
        <span className="hidden whitespace-nowrap font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/70 sm:inline">Not RURO work</span>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={s.image}
          alt={`The homepage of ${s.domain}, ${s.person}’s personal website`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="sr-only">Homepage of {s.domain} as captured in October 2026. The site belongs to its owner.</figcaption>
    </figure>
  );
}

/* Shared link to the real site: always a new tab, never followed for ranking. */
export function VisitLink({ s, className = "" }: { s: Study; className?: string }) {
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent ${className}`}
    >
      <span className="link-underline">Visit {s.domain}</span>
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

export function StudyCard({
  s,
  index,
  priority = false,
  level = 3,
  showIndex = true,
}: {
  s: Study;
  index: number;
  priority?: boolean;
  level?: 2 | 3;
  showIndex?: boolean;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <article>
      <Link href={`/work/${s.slug}`} data-track="study_open" data-track-slug={s.slug} className="group block focus-visible:outline-offset-4">
        <BrowserFrame s={s} priority={priority} />
        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-4">
            <Heading className="display text-2xl md:text-3xl">{s.person}</Heading>
            {showIndex && <span className="font-mono text-xs tabular-nums text-ink/65">{String(index + 1).padStart(2, "0")}</span>}
          </div>
          <p className="mt-1 text-sm text-ink/70">{s.role}</p>
          <p className="mt-4 text-base leading-snug text-ink">{s.lesson}</p>
          <span className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
            <span className="link-underline">Read the breakdown</span>
            <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </article>
  );
}
