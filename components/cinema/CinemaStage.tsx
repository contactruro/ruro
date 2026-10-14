"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FrameCanvas } from "./FrameCanvas";

/* The cinematic layer behind the whole site, as on the reference portfolio: one full-screen scene that is
   crisp at the top of the home page and scrubbed by scroll, then softened and blurred as the sections scroll
   over it. On other pages it stays soft and still.

   The scene is a video if one exists at /video/hero.mp4 (muted, no audio needed; see README for how to make
   one). Without it, a canvas draws a stand-in: slow pools of colour on white, specks drifting, and loose pages
   that start scattered and gather as you scroll, which is RURO's story. Reduced motion draws a single frame. */

/** Viewport-heights of scroll over which the home frames play (the hero plus the story beats). */
export const CINEMA_RANGE = 3.2;

export function CinemaStage() {
  const path = usePathname();
  const home = path === "/";
  const progress = useRef(0);
  const veil = useRef<HTMLDivElement>(null);
  const layer = useRef<HTMLDivElement>(null);
  const vigDark = useRef<HTMLDivElement>(null);
  const vigLight = useRef<HTMLDivElement>(null);
  const [frames, setFrames] = useState<"loading" | "ok" | "failed">("loading");
  const useFrames = home && frames !== "failed";

  // Scroll drives the scene (progress) and how far it is veiled to white and blurred behind the sections.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const y = window.scrollY;
      const p = home ? Math.min(1, Math.max(0, y / (vh * CINEMA_RANGE))) : 0.6;
      progress.current = p;
      const away = useFrames ? Math.min(1, Math.max(0, (y - vh * (CINEMA_RANGE - 0.3)) / (vh * 0.9))) : 1;
      if (layer.current) layer.current.style.filter = useFrames ? `blur(${away * 16}px)` : "";
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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#f7f3eb]">
      <div ref={layer} className="absolute inset-[-3%] will-change-[filter]">
        {useFrames ? <FrameCanvas progress={progress} onFail={() => setFrames("failed")} onReady={() => setFrames("ok")} /> : null}
      </div>
      <div ref={veil} className="absolute inset-0 bg-[#f7f3eb]" style={{ opacity: 0.1 }} />
      {/* Over the film: a dark vignette and a dark band under the nav. Over white: a white one. */}
      <div ref={vigDark} className="absolute inset-0" style={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/65 to-transparent" />
      </div>
      <div ref={vigLight} className="absolute inset-0" style={{ opacity: 1 }}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(247,243,235,0.7)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#f7f3eb]/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#f7f3eb]/85 to-transparent" />
      </div>
    </div>
  );
}
