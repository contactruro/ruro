"use client";

import { useEffect, useRef } from "react";

/* The home scene: a clip split into frames (public/frames/f_001.webp ...), drawn on a canvas by scroll.
   `progress` (0 to 1) is set by the cinematic layer. The first frames load spread out, so scrubbing works at
   once and the rest fill in behind. The drawn frame eases toward its target, so scrolling feels smooth rather
   than stepped. If the first frame fails to load, `onFail` is called and the layer falls back to its built-in
   scene. Frames are made with ffmpeg; see the README. */

export const FRAME_COUNT = 120;
export const frameSrc = (i: number) => `/frames/f_${String(i + 1).padStart(3, "0")}.webp`;

export function FrameCanvas({ progress, onFail, onReady }: { progress: React.MutableRefObject<number>; onFail: () => void; onReady: () => void }) {
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
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cv.width = Math.round(cv.clientWidth * dpr);
      cv.height = Math.round(cv.clientHeight * dpr);
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
        im.src = frameSrc(i);
      });

    (async () => {
      const first: number[] = [];
      for (let i = 0; i < FRAME_COUNT; i += 6) first.push(i);
      await Promise.all(first.map(load));
      for (let i = 0; i < FRAME_COUNT && !dead; i++) if (!imgs[i]) await load(i);
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
  }, [progress, onFail, onReady]);

  return <canvas ref={ref} aria-hidden className="absolute inset-0 h-full w-full" />;
}
