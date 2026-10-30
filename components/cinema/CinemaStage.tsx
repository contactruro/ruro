"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FrameCanvas } from "./FrameCanvas";
import { cinemaRange, stableVh } from "./viewport";

/* The cinematic layer behind the whole site, as on the reference portfolio: one full-screen scene that is
   crisp at the top of the home page and scrubbed by scroll, then softened and blurred as the sections scroll
   over it. On other pages it stays soft and still.

   The scene is a video if one exists at /video/hero.mp4 (muted, no audio needed; see README for how to make
   one). Without it, a canvas draws a stand-in: slow pools of colour on white, specks drifting, and loose pages
   that start scattered and gather as you scroll, which is RURO's story. Reduced motion draws a single frame. */

/** The home page opens with the Greek hero (an ivory page), so the scrubbed film behind it is off. Set to true to bring the
    film opening back; the film frames, the story captions and the film hero are all still in the project. */
export const FILM_ON_HOME = false;

/** Viewport-heights of scroll over which the home frames play (the hero plus the story beats). */
export const CINEMA_RANGE = 3.2;

/** Lets the opening screen know the first film frame is drawn, so it can lift. */
function announce() {
  (window as unknown as { __ruroFilm?: boolean }).__ruroFilm = true;
  window.dispatchEvent(new Event("ruro:film-ready"));
}

export function CinemaStage() {
  const path = usePathname();
  const home = FILM_ON_HOME && path === "/";
  const progress = useRef(0);
  const veil = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const vigDark = useRef<HTMLDivElement>(null);
  const vigLight = useRef<HTMLDivElement>(null);
  // Which cut of the film to play: the portrait one when the screen is taller than it is wide.
  const [portrait, setPortrait] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-aspect-ratio: 1/1)");
    const f = () => setPortrait(mq.matches);
    f();
    // Older browsers (some smart TVs) only have the legacy addListener on a media query.
    if (mq.addEventListener) mq.addEventListener("change", f);
    else mq.addListener(f);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", f);
      else mq.removeListener(f);
    };
  }, []);
  const [frames, setFrames] = useState<"loading" | "ok" | "failed">("loading");
  const useFrames = home && frames !== "failed";

  // Scroll drives the scene (progress) and how far it is veiled to white and blurred behind the sections.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = stableVh();
      const range = cinemaRange();
      const y = window.scrollY;
      const p = home ? Math.min(1, Math.max(0, y / (vh * range))) : 0.6;
      progress.current = p;
      const away = useFrames ? Math.min(1, Math.max(0, (y - vh * (range - 0.3)) / (vh * 0.9))) : 1;
      // A blurred full-screen layer is the costliest thing on a phone: soften less there, and not at all until it matters.
      const blur = window.innerWidth < 768 ? 8 : 16;
      if (layer.current) layer.current.style.filter = useFrames && away > 0.02 ? `blur(${(away * blur).toFixed(1)}px)` : "";
      if (veil.current) veil.current.style.opacity = useFrames ? String(away) : "0.1";
      if (vigDark.current) vigDark.current.style.opacity = useFrames ? String(1 - away) : "0";
      if (vigLight.current) vigLight.current.style.opacity = useFrames ? String(away) : "1";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [home, useFrames]);

  return (
    <div aria-hidden data-cinema className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f7f3eb]">
      <div ref={layer} className="absolute inset-[-3%]">
        {useFrames ? <FrameCanvas key={portrait ? "p" : "l"} progress={progress} portrait={portrait} onFail={() => { setFrames("failed"); announce(); }} onReady={() => { setFrames("ok"); announce(); }} /> : null}
      </div>
      <div ref={veil} className="absolute inset-0 bg-[#f7f3eb]" style={{ opacity: 0.1 }} />
      {/* Over the film: a dark vignette and a dark band under the nav. Over white: a white one. */}
      <div ref={vigDark} className="absolute inset-0" style={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.36)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div ref={vigLight} className="absolute inset-0" style={{ opacity: 1 }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(247,243,235,0.7)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f7f3eb]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f7f3eb]/85 to-transparent" />
      </div>
    </div>
  );
}
