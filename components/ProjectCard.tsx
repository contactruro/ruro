import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/lib/projects";

/* The same browser-window frame as the studies, for the sites RURO built for clients. It carries the label
   "RURO project" where the studies say "Not RURO work", so the two can never be confused. */
export function ProjectFrame({ p, priority = false, className = "" }: { p: Project; priority?: boolean; className?: string }) {
  return (
    <figure className={`overflow-hidden border border-ink/30 bg-paper ${className}`}>
      <div className="flex items-center gap-3 border-b border-ink/30 bg-paper-deep px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
        </span>
        <span className="flex-1 truncate bg-paper px-3 py-1 text-center font-mono text-[0.6875rem] text-ink/70">{p.domain}</span>
        <span className="hidden whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent sm:inline">RURO project</span>
      </div>
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.03]"
        />
      </div>
      <figcaption className="sr-only">Homepage of {p.domain}, a site built by RURO, as captured in October 2026.</figcaption>
    </figure>
  );
}

/* Link to the live site: a new tab, and not followed for ranking. */
export function ProjectVisitLink({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={`group inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-[0.14em] text-accent ${className}`}
    >
      <span className="link-underline">Visit {p.domain}</span>
      <ArrowUpRight aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

/* One project on the Projects page: the preview on one side, and on the other a line about the problem we faced,
   a line about how we solved it, and two buttons (the case study, and the live site). The side alternates. */
export function ProjectRow({ p, index, priority = false }: { p: Project; index: number; priority?: boolean }) {
  const flip = index % 2 === 1;
  return (
    <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <Link
        href={`/projects/${p.slug}`}
        data-track="project_open"
        data-track-slug={p.slug}
        aria-label={`Read the ${p.name} case study`}
        className={`group block focus-visible:outline-offset-4 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
      >
        <ProjectFrame p={p} priority={priority} />
      </Link>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="font-mono text-xs tabular-nums text-ink/65">
          {String(index + 1).padStart(2, "0")} · {p.kind}
        </p>
        <h2 className="display mt-3 text-4xl md:text-5xl">{p.name}</h2>

        <dl className="mt-8 flex flex-col">
          <div className="border-t border-ink/15 py-5">
            <dt className="eyebrow text-accent">The problem</dt>
            <dd className="mt-2 text-lg leading-snug text-ink">{p.problem}</dd>
          </div>
          <div className="border-t border-b border-ink/15 py-5">
            <dt className="eyebrow text-accent">How we solved it</dt>
            <dd className="mt-2 text-lg leading-snug text-ink/80">{p.solved}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={`/projects/${p.slug}`} size="lg">
            Read the case study
          </Button>
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            data-track="project_visit"
            data-track-slug={p.slug}
            className="group inline-flex min-h-13 items-center justify-center gap-3 rounded-lg px-7 text-[0.9375rem] font-medium tracking-[0.005em] text-ink ring-1 ring-ink/35 transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-ink hover:text-paper active:scale-[0.97]"
          >
            <span>Visit the website</span>
            <ArrowUpRight aria-hidden weight="bold" className="size-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span className="sr-only">({p.domain}, opens in a new tab)</span>
          </a>
        </div>
      </div>
    </article>
  );
}
