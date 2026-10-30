"use client";

import { useEffect, useRef, useState } from "react";
import { Drape } from "../atelier/Drape";
import { Layer, ParallaxScene } from "../atelier/Parallax";
import { cta } from "@/lib/site";

/* The opening, in the atelier's own world, with a day that turns to night.

   A clock runs from 0 to 1 over about fifty seconds and then starts again. At 0 the sun is rising behind a marble
   arch; at 0.25 it is high; at 0.5 it sets in gold; at 0.75 the moon is high over a field of stars. The sky inside the
   arch, the tint of the page, the colour of the copy, the rays, the dust and the stars all follow the clock, and a
   different figure stands in the arch at each of the four hours. The four labels jump the clock to their hour.
   Nothing is re-rendered per frame: the loop writes CSS variables on the section. It pauses when the section is off
   screen or the tab is hidden, and under reduced motion the clock never runs on its own, it only moves when asked. */

const A = "/art/myth";

/** One repeat of a Greek key (meander), drawn in gold, used as the border along the foot. */
const KEY = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='28' height='20' viewBox='0 0 28 20'><path d='M0 17H25V3H5V12H19V7H12' fill='none' stroke='#b08c4e' stroke-width='1.6'/></svg>"
)}")`;

type Scene = { label: string; figure: string; fig: string; cloud: string; cloudCls: string };
const SCENES: Scene[] = [
  { label: "Marble Dawn", figure: "apollo-sun", fig: "h-[76%] left-[12%]", cloud: "cloud-soft", cloudCls: "bottom-[-8%] left-[-18%] w-[120%]" },
  { label: "Cloud Temple", figure: "athena", fig: "h-[84%] left-[22%]", cloud: "clouds-a", cloudCls: "bottom-[-6%] left-[-10%] w-[130%]" },
  { label: "Gold Hour", figure: "zeus-statue", fig: "h-[80%] left-1/2 -translate-x-1/2", cloud: "cloud-soft", cloudCls: "bottom-[-10%] right-[-20%] w-[110%]" },
  { label: "Moonlit Night", figure: "zeus-statue", fig: "h-[80%] left-1/2 -translate-x-1/2", cloud: "clouds-a", cloudCls: "bottom-[-6%] left-[-10%] w-[130%]" },
];

/* The colour of the day, as stops along the clock. Between golden dusk and midnight it passes through rose, violet and a
   deep blue hour, so it never goes through grey. Each stop: sky top and foot, the page tint, a lighter glow behind the arch,
   the copy, the paper, the accent, and how much daylight there is. */
type Look = { at: number; top: string; mid?: string; bot: string; tint: string; glow: string; ink: string; paper: string; accent: string; day: number };
const DARK_INK = "#252521";
const LIGHT_INK = "#f7efe2";
const LOOKS: Look[] = [
  { at: 0.0, top: "#f3a98a", bot: "#fde9d4", tint: "#f8e6d2", glow: "#fffaf0", ink: DARK_INK, paper: "#f7f3eb", accent: "#9b111e", day: 0.75 },
  { at: 0.12, top: "#bcd0ea", bot: "#fbf0de", tint: "#efe9dc", glow: "#ffffff", ink: DARK_INK, paper: "#f7f3eb", accent: "#9b111e", day: 0.95 },
  { at: 0.25, top: "#8fb8e8", bot: "#f6f3ea", tint: "#e6eef5", glow: "#ffffff", ink: DARK_INK, paper: "#f7f3eb", accent: "#9b111e", day: 1 },
  { at: 0.34, top: "#b3c8e6", bot: "#fbf1da", tint: "#f1ead8", glow: "#fffef8", ink: DARK_INK, paper: "#f7f3eb", accent: "#9b111e", day: 0.95 },
  { at: 0.375, top: "#e6cfdf", bot: "#fcefd6", tint: "#f4e6d6", glow: "#fffbf0", ink: DARK_INK, paper: "#f8f2e8", accent: "#9b111e", day: 0.9 },
  { at: 0.41, top: "#d8c2e2", mid: "#f7c9a4", bot: "#fde4b4", tint: "#f6e1cc", glow: "#fff6e2", ink: DARK_INK, paper: "#f8f2e4", accent: "#9b111e", day: 0.85 },
  { at: 0.45, top: "#a894cf", mid: "#f6b58c", bot: "#ffdc8c", tint: "#f4dbc2", glow: "#fff0d2", ink: "#2a1f17", paper: "#f9f2e0", accent: "#9b111e", day: 0.8 },
  { at: 0.5, top: "#7a68b8", mid: "#f08a6a", bot: "#ffc968", tint: "#f1d0b0", glow: "#ffe6b4", ink: "#2a1a0e", paper: "#f9efd6", accent: "#9b111e", day: 0.7 },
  { at: 0.57, top: "#5b3f96", mid: "#d8507a", bot: "#ff9d55", tint: "#e2a090", glow: "#ffcf9a", ink: "#2a1f17", paper: "#f4e8dc", accent: "#8f1020", day: 0.38 },
  { at: 0.63, top: "#4a3585", mid: "#a84a86", bot: "#e4806e", tint: "#3f2f6a", glow: "#8e5f9c", ink: LIGHT_INK, paper: "#1d1a40", accent: "#f0c96a", day: 0.18 },
  { at: 0.7, top: "#1c2d72", bot: "#5d5aa0", tint: "#172863", glow: "#3a4fa6", ink: LIGHT_INK, paper: "#101a4a", accent: "#f0c96a", day: 0.06 },
  { at: 0.75, top: "#060d2c", bot: "#1b2d78", tint: "#0b1546", glow: "#2b4cb0", ink: LIGHT_INK, paper: "#0a1238", accent: "#f2cd70", day: 0 },
  { at: 0.88, top: "#050a22", bot: "#17286f", tint: "#09123d", glow: "#26429c", ink: LIGHT_INK, paper: "#080f32", accent: "#f2cd70", day: 0 },
  { at: 0.94, top: "#2b2f78", bot: "#d98a8e", tint: "#44386a", glow: "#a8789c", ink: LIGHT_INK, paper: "#1a1840", accent: "#f0c96a", day: 0.1 },
  { at: 0.98, top: "#8f7ab8", bot: "#f4b79c", tint: "#e8cdc0", glow: "#fff0e4", ink: DARK_INK, paper: "#f4ece4", accent: "#9b111e", day: 0.5 },
  { at: 1.0, top: "#f3a98a", bot: "#fde9d4", tint: "#f8e6d2", glow: "#fffaf0", ink: DARK_INK, paper: "#f7f3eb", accent: "#9b111e", day: 0.75 },
];

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, k: number) => {
  const x = hex(a);
  const y = hex(b);
  return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * k)).join(",")})`;
};
const ease = (x: number) => x * x * (3 - 2 * x);
/** The middle colour of a sky: its own, or halfway between top and foot. */
const toHex = (rgb: string) => "#" + (rgb.match(/\d+/g) ?? ["0", "0", "0"]).map((n) => Number(n).toString(16).padStart(2, "0")).join("");
const midOf = (l: { top: string; bot: string; mid?: string }) => l.mid ?? toHex(mix(l.top, l.bot, 0.5));
/** Darken an rgb(r,g,b) string by a fraction. */
const shade = (rgb: string, k: number) => rgb.replace(/\d+/g, (n) => String(Math.round(+n * (1 - k))));

/** Small chrome sparkles (a cut-out of a metallic four-point star), used around the moon and across the night sky. Each is
    a few pixels wide, twinkles and turns a little, and follows the hour: they only show once it is dark. */
const SPARKS: { x: number; y: number; s: number; d: number; r: number }[] = [
  { x: 14, y: 18, s: 20, d: 0, r: -12 },
  { x: 82, y: 12, s: 14, d: 1.2, r: 10 },
  { x: 70, y: 38, s: 24, d: 0.6, r: 18 },
  { x: 24, y: 46, s: 12, d: 2.1, r: -20 },
  { x: 90, y: 56, s: 16, d: 1.7, r: 6 },
  { x: 10, y: 70, s: 18, d: 0.3, r: 22 },
  { x: 54, y: 8, s: 10, d: 2.6, r: 0 },
  { x: 40, y: 62, s: 14, d: 1, r: -8 },
];

export function HeroGreek() {
  const root = useRef<HTMLElement>(null);
  const clock = useRef({ t: 0, target: null as number | null, from: 0, started: 0, auto: true });
  const [phase, setPhase] = useState(0);
  const [night, setNight] = useState(false);
  const phaseRef = useRef(0);
  const nightRef = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    clock.current.auto = !reduced;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);

    const paint = (raw: number) => {
      const t = ((raw % 1) + 1) % 1;
      let j = 0;
      while (j < LOOKS.length - 2 && t >= LOOKS[j + 1].at) j++;
      const a = LOOKS[j];
      const b = LOOKS[j + 1];
      const k = ease(Math.min(Math.max((t - a.at) / (b.at - a.at), 0), 1));
      const s = el.style;
      s.setProperty("--sky-top", mix(a.top, b.top, k));
      s.setProperty("--sky-bot", mix(a.bot, b.bot, k));
      s.setProperty("--sky-mid", mix(midOf(a), midOf(b), k));
      s.setProperty("--tint", mix(a.tint, b.tint, k));
      s.setProperty("--glow", mix(a.glow, b.glow, k));
      const dark = Math.min(Math.max(1 - (a.day + (b.day - a.day) * k) * 1.6, 0), 1);
      s.setProperty("--glass", `color-mix(in srgb, rgba(255,252,244,0.58) ${Math.round((1 - dark) * 100)}%, rgba(18,34,98,0.5))`);
      s.setProperty("--glass-edge", `color-mix(in srgb, rgba(176,140,78,0.38) ${Math.round((1 - dark) * 100)}%, rgba(240,201,106,0.55))`);
      s.setProperty("--edge", shade(mix(a.tint, b.tint, k), 0.2));
      s.setProperty("--color-ink", mix(a.ink, b.ink, k));
      s.setProperty("--color-paper", mix(a.paper, b.paper, k));
      s.setProperty("--color-accent", mix(a.accent, b.accent, k));
      s.setProperty("--color-accent-ink", mix(a.accent, b.accent, k));
      const day = a.day + (b.day - a.day) * k;
      s.setProperty("--day", day.toFixed(3));
      const gold = Math.max(0, 1 - Math.abs(t - 0.5) / 0.14);
      s.setProperty("--gold", gold.toFixed(3));
      s.setProperty("--lit", Math.min(1, Math.max(Math.max(0, 1 - day * 1.6), gold * 1.1)).toFixed(3));
      s.setProperty("--star", Math.max(0, 1 - day * 1.6).toFixed(3));
      // the sun keeps to the edge of the arch, from the left foot up the left side, around the top corner and down the right, across t = 0 .. 0.5; the moon across 0.5 .. 1
      // the path keeps to the edge of the arch: up the left side from below the foot, around the curve of the top corner, and down the
      // right side, so the centre stays clear for the figure. Measured in widths of the window (the window is 4.1/3 tall).
      const WH = 4.1 / 3;
      const R = 0.33; // how far in from the edge the path runs, as the radius of the curve
      const yC = 0.5; // where the round top begins, measured from the top
      const yFoot = WH + 0.1; // just below the window
      const Lv = yFoot - yC;
      const Ls = Math.PI * R;
      const Lt = 2 * Lv + Ls;
      const arc = (u: number) => {
        const d = Math.min(Math.max(u, 0), 1) * Lt;
        let x: number;
        let y: number;
        if (d < Lv) {
          x = 0.5 - R;
          y = yFoot - d;
        } else if (d < Lv + Ls) {
          const a = (d - Lv) / R;
          x = 0.5 - R * Math.cos(a);
          y = yC - R * Math.sin(a);
        } else {
          x = 0.5 + R;
          y = yC + (d - Lv - Ls);
        }
        return { x: x * 100, y: (y / WH) * 100 };
      };
      const sp = arc(Math.min(Math.max(t / 0.5, 0), 1));
      const mp = arc(Math.min(Math.max((t - 0.5) / 0.5, 0), 1));
      s.setProperty("--sun-x", `${sp.x.toFixed(2)}%`);
      s.setProperty("--sun-y", `${sp.y.toFixed(2)}%`);
      s.setProperty("--moon-x", `${mp.x.toFixed(2)}%`);
      s.setProperty("--moon-y", `${mp.y.toFixed(2)}%`);
      s.setProperty("--sun-o", t < 0.5 ? "1" : "0");
      s.setProperty("--moon-o", t >= 0.5 ? "1" : "0");

      const p = Math.round(t * 4) % 4;
      if (p !== phaseRef.current) {
        phaseRef.current = p;
        setPhase(p);
      }
      const n = t >= 0.62 && t < 0.955;
      if (n !== nightRef.current) {
        nightRef.current = n;
        setNight(n);
      }
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(Math.max((now - last) / 1000, 0), 0.1); // the frame timestamp can precede the start time on the first frame
      last = now;
      if (!visible || document.hidden) return;
      const c = clock.current;
      if (c.target !== null) {
        const u = Math.min((now - c.started) / 1600, 1);
        // move forward around the clock to the chosen hour
        const span = (((c.target - c.from) % 1) + 1) % 1 || 1;
        c.t = (c.from + span * ease(u)) % 1;
        if (u >= 1) {
          c.t = c.target;
          c.target = null;
        }
      } else if (c.auto) {
        c.t = (c.t + dt / 50) % 1;
      }
      paint(c.t);
    };
    paint(0);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  // the nav sits over this section: tell it when the scene behind it is dark
  useEffect(() => {
    const tell = () => window.dispatchEvent(new Event("ruro:hero"));
    tell();
    const t = window.setTimeout(tell, 400);
    return () => window.clearTimeout(t);
  }, [night]);

  // while this opening is on the page the nav wears its royal style (see globals.css); at night it takes the dark glass
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.nav = "royal";
    return () => {
      delete root.dataset.nav;
      delete root.dataset.navNight;
    };
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    if (night) root.dataset.navNight = "";
    else delete root.dataset.navNight;
  }, [night]);

  const go = (i: number) => {
    const c = clock.current;
    if (c.target !== null || Math.round(c.t * 4) % 4 === i) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      c.t = i / 4;
      return;
    }
    c.from = c.t;
    c.target = i / 4;
    c.started = performance.now();
  };

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      data-nav-dark={night ? "" : undefined}
      className="relative isolate h-screen h-svh w-full overflow-hidden bg-paper text-ink"
      style={{ "--sky-top": "#f4b98c", "--sky-bot": "#fbeedd", "--tint": "#f8e8d6", "--day": 0.75, "--star": 0, "--sun-x": "12%", "--sun-y": "104%", "--moon-x": "12%", "--moon-y": "104%", "--sun-o": 1, "--moon-o": 0 } as React.CSSProperties}
    >
      {/* the page tint, following the hour */}
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(70% 60% at 72% 46%, var(--glow) 0%, var(--tint) 62%, var(--edge) 100%)" }} />

      {/* depth: the sky's own top colour tints the upper page, its foot colour warms the lower */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: "linear-gradient(180deg, color-mix(in srgb, var(--sky-top) 34%, transparent) 0%, color-mix(in srgb, var(--sky-mid) 12%, transparent) 42%, color-mix(in srgb, var(--sky-bot) 48%, transparent) 100%)" }} />

      {/* golden hour: a warm bloom behind the arch and a band of molten gold low in the page */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ opacity: "var(--gold)", background: "radial-gradient(46% 52% at 74% 50%, rgba(255,206,140,0.6) 0%, rgba(255,160,110,0.28) 45%, rgba(255,150,90,0) 75%), linear-gradient(0deg, rgba(255,150,80,0.4) 0%, rgba(255,190,110,0.1) 28%, rgba(255,190,110,0) 55%)" }} />

      {/* golden-hour bokeh: soft discs of warm light that drift slowly upward */}
      {Array.from({ length: 11 }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className="bokeh pointer-events-none absolute -z-10 rounded-full"
          style={{
            left: `${(i * 29 + 6) % 94}%`,
            top: `${30 + ((i * 41) % 62)}%`,
            width: 26 + ((i * 17) % 70),
            height: 26 + ((i * 17) % 70),
            background: "radial-gradient(circle, rgba(255,236,170,0.95) 0%, rgba(255,200,110,0.5) 45%, rgba(255,180,90,0) 72%)",
            opacity: "calc(var(--gold) * 0.55)",
            filter: "blur(1.5px)",
            animationDuration: `${14 + (i % 5) * 3}s`,
            animationDelay: `${-(i * 2.3)}s`,
          }}
        />
      ))}

      {/* royal ground: thin gold rings spreading from behind the arch */}
      <div aria-hidden className="pointer-events-none absolute right-[-4%] top-1/2 -z-10 hidden aspect-square w-[min(64rem,86vw)] -translate-y-1/2 lg:block" style={{ background: "repeating-radial-gradient(circle, transparent 0 38px, rgba(196,156,84,0.38) 38px 39px)", WebkitMaskImage: "radial-gradient(circle, #000 20%, transparent 70%)", maskImage: "radial-gradient(circle, #000 20%, transparent 70%)" }} />

      {/* stars across the page after dark, gold dust by day */}
      {Array.from({ length: 46 }, (_, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute -z-10 rounded-full"
          style={{
            left: `${(i * 37 + 11) % 100}%`,
            top: `${(i * 53 + 7) % 92}%`,
            width: 2 + (i % 3),
            height: 2 + (i % 3),
            background: i % 3 ? "#d4a94c" : "#fff4d0",
            opacity: i % 2 ? "calc(0.25 + var(--star) * 0.7 + var(--gold) * 0.5)" : "calc(0.3 * var(--day) + var(--star) * 0.6 + var(--gold) * 0.45)",
            animation: `twinkle ${3 + (i % 5)}s ease-in-out ${-(i % 7)}s infinite`,
          }}
        />
      ))}

      {/* chrome sparkles across the night sky */}
      {SPARKS.map((k, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={i} aria-hidden src={`${A}/star-chrome.webp`} alt="" className="spark pointer-events-none absolute -z-10" style={{ left: `${k.x}%`, top: `${k.y}%`, width: k.s, opacity: "var(--lit)", rotate: `${k.r}deg`, animationDelay: `${-k.d}s` }} />
      ))}

      {/* a dove crossing the sky by day, left to right. An outer layer carries it across and an inner one lifts and drops it
          while the image beats its wings; it fades with the daylight. */}
      <div aria-hidden className="dove-lane pointer-events-none absolute inset-x-0 top-[12%] z-[4] h-[18%]" style={{ opacity: "clamp(0, calc((var(--day) - 0.45) * 3), 1)" }}>
        <div className="dove-across absolute left-0 top-[10%] w-[clamp(4.5rem,9vw,8rem)]" style={{ animationDuration: "26s" }}>
          <div className="dove-bob">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/dove-flying.webp`} alt="" className="dove-flap block h-auto w-full drop-shadow-[0_14px_14px_rgba(70,60,50,0.28)]" />
          </div>
        </div>
      </div>

      {/* an evening star and a drift of sparkle dust that come out with the dark, and a small gold star cluster that glints all day */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img aria-hidden src={`${A}/star-glow.webp`} alt="" className="star-pulse pointer-events-none absolute -z-10 hidden lg:block" style={{ left: "46%", top: "8%", width: 84, opacity: "var(--lit)" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img aria-hidden src={`${A}/star-glow.webp`} alt="" className="star-pulse pointer-events-none absolute -z-10" style={{ left: "6%", top: "10%", width: 46, opacity: "calc(var(--lit) * 0.95)", animationDelay: "-1.4s" }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img aria-hidden src={`${A}/star-gold.webp`} alt="" className="gold-glint pointer-events-none absolute z-[4] hidden lg:block" style={{ right: "3.5%", top: "17%", width: 58 }} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img aria-hidden src={`${A}/star-gold.webp`} alt="" className="gold-glint pointer-events-none absolute z-[4] hidden lg:block" style={{ left: "40%", bottom: "20%", width: 36, animationDelay: "-2.1s" }} />

      {/* velvet drapes hanging in from the corners, a drifting cloud, and gilded cherubs that float and can be picked up */}
      <Drape side="left" className="mt-20 hidden h-[22rem] w-[13rem] lg:block" />
      <Drape side="right" className="mt-20 hidden h-[18rem] w-[10rem] lg:block" />
      <ParallaxScene>
        <Layer src={`${A}/cloud-soft.webp`} className="bottom-[-14%] left-[-10%] w-[min(46rem,70vw)] opacity-80" depth={0.4} scroll={60} float={false} feather shadow={false} />
        <Layer src={`${A}/cherub-gold.webp`} className="right-[44%] top-[14%] hidden w-[6.5rem] lg:block" depth={1.4} tilt={8} drag z={3} />
        <Layer src={`${A}/cherub-gold.webp`} className="bottom-[9%] right-[1.5%] hidden w-[4.5rem] lg:block" depth={1.8} tilt={8} flip drag z={3} />
      </ParallaxScene>

      {/* a Greek-key border along the foot */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-5 opacity-70" style={{ backgroundImage: KEY, backgroundRepeat: "repeat-x", backgroundSize: "28px 20px", borderTop: "1px solid rgba(176,140,78,0.4)" }} />

      <div className="relative z-10 mx-auto grid h-full max-w-[88rem] grid-cols-1 items-center gap-6 px-6 pb-8 pt-24 sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* copy */}
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          <span className="glass-ivory rounded-full px-4 py-2 font-[system-ui] text-xs sm:text-sm">A digital identity studio for founders and executives</span>
          <h1 id="hero-title" className="display mt-6 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[5.2rem]">
            Your only digital house
            <br />
            <span className="hl">that tells your story</span>
          </h1>
          <p className="mt-6 max-w-xl font-[system-ui] text-sm leading-relaxed text-ink/75 sm:text-base">
            We interview you, write it, build it and keep it current, so when people search your name they find the real you, in your way.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 lg:justify-start">
            <a href={cta.primary.href} data-track="cta_click" data-track-label="Start your story" className="cta-royal group">
              <span className="cta-royal__shine" aria-hidden />
              <span className="relative">Start your story</span>
              <span aria-hidden className="cta-royal__arrow relative">
                <svg viewBox="0 0 20 20" className="size-4 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h11M11 5l5 5-5 5" />
                </svg>
              </span>
            </a>
            <a href="/sample" data-track="cta_click" data-track-label="See examples" className="link-underline py-2 font-[system-ui] text-sm text-ink/80 hover:text-ink">
              See examples
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-[system-ui] lg:justify-start">
            {SCENES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                onClick={() => go(i)}
                aria-pressed={i === phase}
                className={`border-b py-1 text-xs transition-all duration-700 sm:text-sm ${i === phase ? "border-accent text-ink" : "border-transparent text-ink opacity-50 hover:opacity-80"}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* the arch */}
        <div className="train-bob relative mx-auto hidden aspect-[3/4.1] w-[min(34rem,42vw)] lg:block" aria-hidden>
          {/* stone frame */}
          <div className="absolute inset-0 rounded-t-[999px] bg-[linear-gradient(160deg,#f4efe4,#d9cfba_45%,#efe8d8)] shadow-[0_40px_70px_-30px_rgba(70,48,30,0.45)]" />
          <div className="absolute inset-[3.2%] rounded-t-[999px] bg-[linear-gradient(200deg,#ece4d2,#cdbfa4)]" />
          {/* the window: sky, stars, sun, moon, cloud */}
          <div className="absolute inset-[5.5%] overflow-hidden rounded-t-[999px]" style={{ background: "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 52%, var(--sky-bot) 100%)" }}>
            {Array.from({ length: 26 }, (_, i) => (
              <span key={i} className="absolute rounded-full bg-[#fff6dc]" style={{ left: `${(i * 41 + 9) % 96}%`, top: `${(i * 29 + 5) % 62}%`, width: 1.5 + (i % 3), height: 1.5 + (i % 3), opacity: "var(--star)", animation: `twinkle ${2.5 + (i % 4)}s ease-in-out ${-(i % 5)}s infinite` }} />
            ))}
            {/* the light of the sun: a wide warm bloom that follows it and lights the sky around it */}
            <div aria-hidden className="absolute inset-0" style={{ opacity: "var(--sun-o)", background: "radial-gradient(circle at var(--sun-x) var(--sun-y), rgba(255,238,180,0.95) 0%, rgba(255,196,96,0.5) 18%, rgba(255,150,80,0.18) 38%, rgba(255,150,80,0) 58%)" }} />
            {/* the sun */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${A}/gold-sun.webp`} alt="" className="absolute w-[30%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_34px_rgba(255,200,90,0.95)]" style={{ left: "var(--sun-x)", top: "var(--sun-y)", opacity: "var(--sun-o)" }} />
            {/* the moon: the silver sun-and-crescent medallion, with a soft glow, and a few chrome sparkles near it */}
            <div className="absolute aspect-square w-[28%] -translate-x-1/2 -translate-y-1/2" style={{ left: "var(--moon-x)", top: "var(--moon-y)", opacity: "var(--moon-o)" }}>
              <div aria-hidden className="absolute inset-[-40%] rounded-full" style={{ background: "radial-gradient(circle, rgba(214,224,255,0.5) 0%, rgba(214,224,255,0.16) 40%, rgba(214,224,255,0) 70%)" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${A}/moon-medallion.webp`} alt="" className="moon-float relative h-full w-full drop-shadow-[0_0_18px_rgba(200,214,255,0.55)]" />
              {SPARKS.slice(0, 4).map((k, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={`${A}/star-chrome.webp`} alt="" className="spark absolute" style={{ left: `${[-22, 108, 96, -10][i]}%`, top: `${[22, 6, 88, 96][i]}%`, width: [14, 11, 16, 10][i], animationDelay: `${-i * 0.9}s` }} />
              ))}
            </div>
            {SCENES.map((s, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={s.label} src={`${A}/${s.cloud}.webp`} alt="" className={`scene-drift absolute transition-opacity duration-1000 ease-in-out ${s.cloudCls} ${i === phase ? "opacity-100" : "opacity-0"}`} style={i === 3 ? { filter: "brightness(0.55) saturate(0.8) hue-rotate(185deg)" } : undefined} />
            ))}
          </div>
          {/* the figure, standing in the window and breaking its foot */}
          {SCENES.filter((s, i) => SCENES.findIndex((o) => o.figure === s.figure) === i).map((s) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={s.figure}
              src={`${A}/${s.figure}.webp`}
              alt=""
              className={`absolute bottom-[4%] w-auto select-none transition-[opacity,filter] duration-1000 ease-in-out ${s.fig} ${SCENES[phase].figure === s.figure ? "opacity-100" : "opacity-0"}`}
              style={{ filter: phase === 2 ? "brightness(1.1) saturate(1.2) sepia(0.12) drop-shadow(0 0 26px rgba(255,176,84,0.6)) drop-shadow(0 26px 24px rgba(90,40,20,0.4))" : phase === 3 ? "brightness(1.22) contrast(1.05) drop-shadow(0 0 26px rgba(150,182,255,0.38)) drop-shadow(0 26px 24px rgba(10,14,40,0.5))" : "drop-shadow(0 26px 24px rgba(20,20,40,0.4))" }}
            />
          ))}
          {/* a low cloud across the foot so the figure sits in weather */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${A}/cloud-soft.webp`} alt="" className="scene-drift pointer-events-none absolute bottom-[-6%] right-[-14%] w-[70%] opacity-95" style={{ filter: night ? "brightness(0.6) saturate(0.8) hue-rotate(185deg)" : undefined, transition: "filter 1.2s" }} />
        </div>
      </div>
    </section>
  );
}
