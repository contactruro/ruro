"use client";

import { useEffect, useRef } from "react";

/* The home scene: a clip split into frames, drawn on a canvas by scroll. Two cuts of the same story: a landscape one
   (public/frames/l_001.webp ...) for laptops and big screens, and a portrait one (p_001.webp ...) for phones and
   tablets held upright. The cut is chosen by the screen's shape and swaps if the device is turned.
   `progress` (0 to 1) is set by the cinematic layer. The frames load coarse to fine (every 12th first), so scrubbing works at
   once and the rest fill in behind. The drawn position eases toward its target by elapsed time, and neighbouring
   frames are blended, so scrolling feels continuous rather than stepped. If the first frame fails to load, `onFail` is called and the layer falls back to its built-in
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
    let last = 0;
    let dead = false;
    let ready = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const phone = window.matchMedia("(max-width: 767px)").matches;
    ctx.imageSmoothingQuality = "medium";

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
    // The clip has 12 frames a second, which on its own looks like stepping. So between two neighbouring frames the
    // next one is faded in by the fraction of the way scroll has got to it: motion reads as continuous.
    const draw = () => {
      const i0 = Math.floor(cur);
      const f = cur - i0;
      const a = nearest(i0);
      if (!a) return;
      const b = f > 0.03 ? nearest(Math.min(FRAME_COUNT - 1, i0 + 1)) : null;
      paint(a, 1);
      if (b && b !== a) paint(b, f);
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
      const dpr = Math.min(window.devicePixelRatio || 1, phone ? 1.25 : 1.5);
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.imageSmoothingQuality = "medium";
      draw();
    };
    // Follow the scroll with an easing that depends on elapsed time, not on how fast the screen refreshes, so it
    // feels the same at 60 and 120 Hz and never lurches after a slow frame.
    const loop = (now: number) => {
      raf = 0;
      const dt = Math.min(64, last ? now - last : 16);
      last = now;
      target = progress.current * (FRAME_COUNT - 1);
      cur += (target - cur) * (reduce ? 1 : 1 - Math.exp(-dt / 85));
      if (Math.abs(target - cur) < 0.01) cur = target;
      draw();
      if (cur !== target) raf = requestAnimationFrame(loop);
      else last = 0;
    };
    const kick = () => {
      if (!raf && !dead) raf = requestAnimationFrame(loop);
    };

    const load = (i: number) =>
      new Promise<void>((res) => {
        if (imgs[i] || dead) return res();
        const im = new Image();
        im.decoding = "async";
        im.onload = async () => {
          // Decode now, off the scroll path, so the first draw of a frame never stalls.
          try {
            await im.decode();
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

    (async () => {
      // Coarse to fine: every 12th frame first, then every 6th, 3rd and the rest, a few at a time, so there is
      // always a frame close to wherever the visitor has scrolled to.
      for (const step of [12, 6, 3, 1]) {
        const batch: number[] = [];
        for (let i = 0; i < FRAME_COUNT; i += step) if (!imgs[i]) batch.push(i);
        if (batch.length === 0) continue;
        batch.push(FRAME_COUNT - 1);
        for (let j = 0; j < batch.length && !dead; j += 6) await Promise.all(batch.slice(j, j + 6).map(load));
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
