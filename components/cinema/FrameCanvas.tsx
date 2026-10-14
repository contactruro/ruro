"use client";

import { useEffect, useRef } from "react";

/* The home scene: a clip split into frames, drawn on a canvas by scroll. Two cuts of the same story: a landscape one
   (public/frames/l_001.webp ...) for laptops and big screens, and a portrait one (p_001.webp ...) for phones and
   tablets held upright. The cut is chosen by the screen's shape and swaps if the device is turned.
   `progress` (0 to 1) is set by the cinematic layer. The first frames load spread out, so scrubbing works at
   once and the rest fill in behind. The drawn frame eases toward its target, so scrolling feels smooth rather
   than stepped. If the first frame fails to load, `onFail` is called and the layer falls back to its built-in
   scene. Frames are made with ffmpeg; see the README. */

export const FRAME_COUNT = 120;
export const frameSrc = (i: number, portrait: boolean) => `/frames/${portrait ? "p" : "l"}_${String(i + 1).padStart(3, "0")}.webp`;

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
    let dead = false;
    let ready = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // On a phone, load every second frame (half the data and memory) and draw nearest-frame between them.
    const phone = window.matchMedia("(max-width: 767px)").matches;
    const stride = phone ? 2 : 1;

    const nearest = (i: number) => {
      for (let d = 0; d < FRAME_COUNT; d++) {
        const a = imgs[i - d];
        if (a) return a;
        const b = imgs[i + d];
        if (b) return b;
      }
      return null;
    };
    const draw = () => {
      const im = nearest(Math.round(cur));
      if (!im) return;
      const cw = cv.width;
      const ch = cv.height;
      const k = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
      const w = im.naturalWidth * k;
      const h = im.naturalHeight * k;
      ctx.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
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
      const dpr = Math.min(window.devicePixelRatio || 1, phone ? 1.25 : 1.5);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      draw();
    };
    const loop = () => {
      raf = 0;
      target = progress.current * (FRAME_COUNT - 1);
      cur += (target - cur) * (reduce ? 1 : 0.16);
      if (Math.abs(target - cur) < 0.02) cur = target;
      draw();
      if (cur !== target) raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && !dead) raf = requestAnimationFrame(loop);
    };

    const load = (i: number) =>
      new Promise<void>((res) => {
        const im = new Image();
        im.decoding = "async";
        im.onload = () => {
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

    (async () => {
      const first: number[] = [];
      for (let i = 0; i < FRAME_COUNT; i += 6) first.push(i);
      await Promise.all(first.map(load));
      for (let i = 0; i < FRAME_COUNT && !dead; i += stride) if (!imgs[i]) await load(i);
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

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
