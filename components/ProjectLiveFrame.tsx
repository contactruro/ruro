"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

/* The same browser-window frame as the Projects page, with one addition on the case-study page: a "Live preview"
   button. The page opens on the screenshot (fast, and what search engines see). The real site is loaded into the frame
   only when the visitor asks for it, so nothing is fetched, and nothing of the client's is run, until they choose.
   The site is drawn at a normal desktop width and scaled to fit the frame. */

const DESKTOP_W = 1280;
const DESKTOP_H = 720;

export function ProjectLiveFrame({ p, priority = false }: { p: Project; priority?: boolean }) {
  const [live, setLive] = useState(false);
  const [scale, setScale] = useState(0.5);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(el.clientWidth / DESKTOP_W);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <figure className="overflow-hidden border border-ink/30 bg-paper">
      <div className="flex items-center gap-3 border-b border-ink/30 bg-paper-deep px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
          <span className="size-2 rounded-full bg-ink/15" />
        </span>
        <span className="min-w-0 flex-1 truncate bg-paper px-3 py-1 text-center font-mono text-[0.6875rem] text-ink/70">{p.domain}</span>
        <span className="hidden whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent md:inline">RURO project</span>
        <button
          type="button"
          onClick={() => setLive((v) => !v)}
          aria-pressed={live}
          data-track="project_live_preview"
          data-track-slug={p.slug}
          className="whitespace-nowrap rounded-md px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink ring-1 ring-ink/30 transition-colors duration-300 hover:bg-ink hover:text-paper"
        >
          {live ? "Show image" : "Live preview"}
        </button>
      </div>

      <div ref={box} className="relative aspect-[16/9] overflow-hidden bg-paper">
        {live ? (
          <>
            <iframe
              src={p.url}
              title={`Live preview of ${p.domain}`}
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              style={{ width: DESKTOP_W, height: DESKTOP_H, transform: `scale(${scale})`, transformOrigin: "0 0", border: 0 }}
              className="absolute left-0 top-0 bg-white"
            />
          </>
        ) : (
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 80vw, 100vw"
            className="object-cover object-top"
          />
        )}
      </div>
      <figcaption className="sr-only">
        {live ? `A live, scrollable view of ${p.domain}.` : `Homepage of ${p.domain}, a site built by RURO, as captured in October 2026.`}
      </figcaption>
    </figure>
  );
}
