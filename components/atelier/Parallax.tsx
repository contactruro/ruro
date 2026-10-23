"use client";

import { createContext, useContext, useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { artAlt } from "@/lib/altText";

/* A parallax scene: a set of cutout objects (statues, clouds, angels, hands) at different depths.

   Three things move them, each by an amount that grows with the object's depth:
   - scroll: the scene's own progress through the viewport moves each object up or down at its own speed;
   - the pointer: the whole viewport position gently shifts and tilts each object in 3D (perspective on the scene);
   - time: a slow float, out of step between objects.
   Objects can also be picked up and dragged, and settle back where they were. All of it stops under reduced
   motion; touch skips the pointer shift. The objects are decorative, so they are hidden from assistive technology,
   and the scene never takes pointer events itself, so copy beneath stays selectable. */

const FEATHER = "linear-gradient(to right, transparent 0, #000 16%, #000 84%, transparent 100%), linear-gradient(to bottom, transparent 0, #000 18%, #000 78%, transparent 100%)";

const Progress = createContext<MotionValue<number> | null>(null);

export function ParallaxScene({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // The pointer, relative to the whole window (-1 to 1), written as CSS variables on the scene.
  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      x = (e.clientX / window.innerWidth - 0.5) * 2;
      y = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <Progress.Provider value={scrollYProgress}>
      <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-x-clip overflow-y-visible [perspective:1300px] ${className}`} style={{ "--mx": 0, "--my": 0 } as React.CSSProperties}>
        {children}
      </div>
    </Progress.Provider>
  );
}

export function Layer({
  src,
  className = "",
  depth = 1,
  scroll = 90,
  tilt = 6,
  rotate = 0,
  float = true,
  drag = false,
  shadow = true,
  flip = false,
  feather = false,
  z = 0,
  sizes,
  fit = false,
  spin = false,
}: {
  src: string;
  /** Position and size, as classes (e.g. "right-0 top-10 w-[34rem]"). */
  className?: string;
  /** How far this object is from the back. Larger moves more with scroll and the pointer. */
  depth?: number;
  /** Pixels of vertical travel across the scene, per unit of depth. */
  scroll?: number;
  /** Degrees of 3D tilt toward the pointer, per unit of depth. */
  tilt?: number;
  rotate?: number;
  float?: boolean;
  /** Let the visitor pick the object up; it springs back. */
  drag?: boolean;
  shadow?: boolean;
  flip?: boolean;
  /** Fade the picture's edges into the page (for clouds, whose cut edges would otherwise show). */
  feather?: boolean;
  z?: number;
  sizes?: string;
  /** Fill the box's height instead of its width (for a figure that must stand on the section's floor). */
  fit?: boolean;
  /** Turn very slowly, for a sun or a moon. */
  spin?: boolean;
}) {
  const reduce = useReducedMotion();
  const progress = useContext(Progress);
  const y = useTransform(progress ?? ({ get: () => 0 } as unknown as MotionValue<number>), [0, 1], [scroll * depth, -scroll * depth]);
  const seed = (src.length * 37) % 7;

  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ y: reduce || !progress ? 0 : y, zIndex: z, ["--d" as string]: depth * 14, ["--t" as string]: tilt * depth }}
    >
      <motion.div
        className={`${drag ? "pointer-events-auto cursor-grab active:cursor-grabbing" : ""} ${fit ? "h-full w-full" : ""} [transform-style:preserve-3d]`}
        drag={drag && !reduce}
        dragSnapToOrigin
        dragElastic={0.25}
        dragTransition={{ bounceStiffness: 180, bounceDamping: 14 }}
        whileDrag={{ scale: 1.05 }}
        style={{
          transform: reduce
            ? undefined
            : "translate3d(calc(var(--mx) * var(--d) * 1px), calc(var(--my) * var(--d) * 0.6px), 0) rotateY(calc(var(--mx) * var(--t) * 1deg)) rotateX(calc(var(--my) * var(--t) * -0.7deg))",
          transition: "transform 700ms cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={artAlt(src)} aria-hidden
          loading="lazy"
          decoding="async"
          draggable={false}
          sizes={sizes}
          className={`select-none ${fit ? "h-full w-full object-contain object-bottom" : "block h-auto w-full"} ${float && !reduce ? "layer-float" : ""} ${spin && !reduce ? "sun-turn" : ""}`}
          style={
            {
              transform: `rotate(${rotate}deg) scaleX(${flip ? -1 : 1})`,
              WebkitMaskImage: feather ? FEATHER : undefined,
              maskImage: feather ? FEATHER : undefined,
              WebkitMaskComposite: feather ? "source-in" : undefined,
              maskComposite: feather ? "intersect" : undefined,
              filter: shadow ? "drop-shadow(0 28px 26px rgba(70, 48, 30, 0.28)) drop-shadow(0 6px 8px rgba(70, 48, 30, 0.18))" : undefined,
              "--fdur": `${8 + seed}s`,
              "--fdelay": `${-seed * 1.3}s`,
              "--fr": `${(seed % 2 ? 1 : -1) * 0.7}deg`,
            } as React.CSSProperties
          }
        />
      </motion.div>
    </motion.div>
  );
}
