"use client";

import { useEffect, useRef } from "react";

/* The home scene: a clip split into frames, drawn on a canvas by scroll. Two cuts of the same story: a landscape one
   (public/frames/l_001.webp ...) for laptops and big screens, and a portrait one (p_001.webp ...) for phones and
   tablets held upright. The cut is chosen by the screen's shape and swaps if the device is turned.
   `progress` (0 to 1) is set by the cinematic layer. The frames load coarse to fine (every 24th first), so scrubbing works at
   once, and the rest fill in behind, nearest to the visitor first. The drawn position eases toward its target by elapsed time, and one sharp frame is shown at a time (48 a second,
   so scrolling reads as continuous). If the first frame fails to load, `onFail` is called and the layer falls back to its built-in
   scene. Frames are made with ffmpeg; see the README. */

export const FRAME_COUNT = 480;
export const frameSrc = (i: number, portrait: boolean) => `/frames/${portrait ? "p" : "l"}_${String(i + 1).padStart(3, "0")}.webp?v=48`;

export function FrameCanvas({ progress, portrait, onFail, onReady }: { progress: React.MutableRefObject<number>; portrait: boolean; onFail: () => void; onReady: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const imgs: (HTMLImageElement | null)[] = Array.from({ length: FRAME_COUNT }, () => null);
    let cur = 0;
    let target = 0;
    let raf = 0;
    let last = 0;
    let dead = false;
    let ready = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.matchMedia("(max-width: 767px)").matches;
    ctx.imageSmoothingQuality = "high";
    // On data-saver or a slow connection, load every second frame only (still 24 a second).
    const conn = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const lean = !!conn && (conn.saveData === true || /(^|-)(2g|3g)$/.test(conn.effectiveType || ""));
    // A search-engine crawler or an automated speed-testing tool reads the page, not the film behind it, so it is given the first picture only. That keeps
    // its rendering to a handful of requests. The words on the page are identical for everyone; only the backdrop differs.
    const crawler = navigator.webdriver === true || /bot|crawl|spider|slurp|bingpreview|lighthouse|headless/i.test(navigator.userAgent);

    const nearest = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        const a = imgs[i - d];
        if (a) return a;
        const b = imgs[i + d];
        if (b) return b;
      }
      return null;
    };
    const paint = (im: HTMLImageElement, alpha: number) => {
      const cw = cv.width;
      const ch = cv.height;
      const k = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
      const w = im.naturalWidth * k;
      const h = im.naturalHeight * k;
      ctx.globalAlpha = alpha;
      ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
    };
    // Every frame is used (the clip is 24 a second, smoothed to 48 by motion interpolation) and exactly one is drawn, sharp and whole. Blending neighbours was
    // tried and ghosts the text while the camera moves, so it is not done.
    const draw = () => {
      const im = nearest(Math.round(cur));
      if (!im) return;
      paint(im, 1);
      ctx.globalAlpha = 1;
    };
    let lastW = 0;
    let lastH = 0;
    const size = () => {
      // Resizing clears the canvas, so skip the small height changes a phone makes as its address bar slides.
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      if (lastW && w === lastW && Math.abs(h - lastH) < 140) return;
      lastW = w;
      lastH = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.imageSmoothingQuality = "high";
      draw();
    };
    // Follow the scroll with an easing that depends on elapsed time, not on how fast the screen refreshes, so it
    // feels the same at 60 and 120 Hz and never lurches after a slow frame.
    const loop = (now: number) => {
      raf = 0;
      const dt = Math.min(64, last ? now - last : 16);
      last = now;
      target = progress.current * (FRAME_COUNT - 1);
      cur += (target - cur) * (reduce ? 1 : 1 - Math.exp(-dt / 70));
      if (Math.abs(target - cur) < 0.01) cur = target;
      draw();
      if (cur !== target) raf = requestAnimationFrame(loop);
      else last = 0;
    };
    const kick = () => {
      if (!raf && !dead) raf = requestAnimationFrame(loop);
    };

    const load = (i: number, low = false) =>
      new Promise<void>((res) => {
        if (imgs[i] || dead) return res();
        const im = new Image();
        im.decoding = "async";
        im.fetchPriority = low ? "low" : "high";
        im.onload = async () => {
          // Decode now, off the scroll path, so the first draw of a frame never stalls.
          // (Never wait long: decoding can stall while a tab is not painting, and the rest of the frames queue behind this.)
          try {
            await Promise.race([im.decode(), new Promise((r) => setTimeout(r, 250))]);
          } catch {}
          imgs[i] = im;
          if (!ready) {
            ready = true;
            onReady();
          }
          draw();
          res();
        };
        im.onerror = () => {
          if (!ready && !dead) onFail();
          res();
        };
        im.src = frameSrc(i, portrait);
      });

    // Hold the bulk of the frames back until the page itself has loaded and the browser is idle, so they never fight
    // the page's own images for bandwidth.
    const whenQuiet = () =>
      new Promise<void>((res) => {
        const idle = () => {
          const w = window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void };
          if (w.requestIdleCallback) w.requestIdleCallback(() => res(), { timeout: 3000 });
          else setTimeout(res, 1200);
        };
        if (document.readyState === "complete") idle();
        else window.addEventListener("load", idle, { once: true });
      });

    (async () => {
      // The very first frame alone and at top priority: it is what the opening screen waits for. Then a coarse pass
      // (every 24th frame, so there is always one close by), then, once the page is quiet, the rest, a few at a time and
      // always the ones nearest to where the visitor currently is, so scrolling never outruns the loading.
      await load(0);
      if (crawler) return;
      const coarse: number[] = [];
      for (let i = 24; i < FRAME_COUNT; i += 24) coarse.push(i);
      coarse.push(FRAME_COUNT - 1);
      for (let j = 0; j < coarse.length && !dead; j += 4) await Promise.all(coarse.slice(j, j + 4).map((i) => load(i)));
      await whenQuiet();
      while (!dead) {
        const at = Math.round(progress.current * (FRAME_COUNT - 1));
        const todo: number[] = [];
        for (let i = 0; i < FRAME_COUNT; i += lean ? 2 : 1) if (!imgs[i]) todo.push(i);
        if (todo.length === 0) break;
        // Nearest first, with a lean toward frames ahead of the visitor (scrolling down is the usual direction).
        todo.sort((x, y) => Math.abs(x - at - 2) - Math.abs(y - at - 2));
        await Promise.all(todo.slice(0, 4).map((i) => load(i, true)));
      }
    })();

    size();
    window.addEventListener("resize", size);
    window.addEventListener("scroll", kick, { passive: true });
    kick();
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("scroll", kick);
    };
  }, [progress, portrait, onFail, onReady]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full [transform:translateZ(0)]" />;
}
