"use client";

import { useEffect, useState } from "react";

/* The opening screen. A full-screen image (public/loader/ruro.jpg, which carries the RURO.IN wordmark), a serif
   percentage counting up in the bottom-right corner and a thin progress bar along the foot.
   When it reaches 100% and the page has loaded, the whole screen slides up like a curtain. Shown once per
   visit (sessionStorage), so moving between pages never repeats it. It is in the server HTML, so it covers
   the page from the first paint; a tiny inline script in the layout skips it for returning visits. Under
   reduced motion it is shorter. The hero's entrances wait for `html.pre-done`, so they play as the curtain lifts.
   It waits only for what the first screen needs (the first film frame on the home page), never for the whole page's
   images, and gives up waiting after a few seconds so a slow connection is never held behind it. */

const KEY = "ruro-pre";

export function Preloader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(KEY);
    } catch {
      /* storage can be blocked; the screen then simply shows each time */
    }
    if (seen) {
      html.classList.add("pre-done");
      setGone(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("is-preloading");
    const dur = reduce ? 500 : 1300;
    // The first screen is ready when the film's first frame has drawn (home only), or at once on other pages.
    const filmWanted = window.location.pathname === "/";
    let filmReady = !filmWanted || !!(window as unknown as { __ruroFilm?: boolean }).__ruroFilm;
    const onFilm = () => {
      filmReady = true;
    };
    window.addEventListener("ruro:film-ready", onFilm);
    const cap = performance.now() + 3500;
    const t0 = performance.now();
    let raf = 0;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;

    const finish = () => {
      setPct(100);
      t1 = setTimeout(() => {
        setDone(true);
        html.classList.add("pre-done");
        document.body.classList.remove("is-preloading");
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          /* ignore */
        }
        t2 = setTimeout(() => setGone(true), reduce ? 350 : 1100);
      }, 350);
    };

    const tick = (t: number) => {
      const p = Math.min(Math.max((t - t0) / dur, 0), 1);
      setPct(Math.min(99, Math.round((1 - Math.pow(1 - p, 2.4)) * 100)));
      if (p < 1 || (!filmReady && t < cap)) {
        raf = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("ruro:film-ready", onFilm);
      document.body.classList.remove("is-preloading");
    };
  }, []);

  if (gone) return null;

  return (
    <div className={`preloader ${done ? "is-done" : ""}`} role="status" aria-live="polite" aria-label={`Loading, ${pct} percent`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="preloader__img" src="/loader/ruro-1920.webp" srcSet="/loader/ruro-960.webp 960w, /loader/ruro-1920.webp 1920w" sizes="100vw" alt="RURO.IN, reputation uniquely represented online. A reclining figure holds out a phone toward a reaching hand, in the manner of Michelangelo’s Creation of Adam, in black and white." fetchPriority="high" decoding="async" />
      <div aria-hidden className="preloader__scrim" />
      <div className="preloader__count" aria-hidden>
        <span>{pct}</span>
        <span className="preloader__pct">%</span>
      </div>
      <div className="preloader__bar" aria-hidden>
        <span style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
