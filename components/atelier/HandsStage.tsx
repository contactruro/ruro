"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { CloudBank } from "./CloudBank";

/* One picture for "the problem": the two hands of the Creation, a hair's breadth apart. Nothing else competes
   with them. Clouds come up out of the gap between the fingertips and drift away, one after another, so it reads
   as something about to happen. The hands tilt a little toward the cursor and rise as the section scrolls past;
   their cut arms fade into the page, so there is no picture edge anywhere. Decorative, hidden from assistive
   technology; under reduced motion the clouds sit still and the hands do not move. */

const EDGE = "linear-gradient(to right, transparent 0, #000 16%, #000 100%), linear-gradient(to bottom, #000 0, #000 80%, transparent 100%)";
const PUFF = "radial-gradient(ellipse at 50% 55%, #000 0, #000 30%, transparent 70%)";

export function HandsStage({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduce || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--rx", String(((e.clientX - r.left) / r.width - 0.5) * 2));
    el.style.setProperty("--ry", String(((e.clientY - r.top) / r.height - 0.5) * 2));
  };

  return (
    <div
      ref={ref}
      aria-hidden
      onPointerMove={onMove}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--rx", "0");
        ref.current?.style.setProperty("--ry", "0");
      }}
      className={`pointer-events-auto relative isolate ${className}`}
      style={{ "--rx": 0, "--ry": 0 } as React.CSSProperties}
    >
      {/* the soft bank the hands rest in */}
      <div className="absolute inset-x-[-6%] bottom-[-14%] h-[62%]" style={{ WebkitMaskImage: PUFF, maskImage: PUFF }}>
        <CloudBank reach={0.7} seed={4} fps={24} className="size-full" />
      </div>

      <motion.div style={reduce ? undefined : { y }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/art/myth/hands-touch.webp"
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-x-0 bottom-[8%] w-full select-none drop-shadow-[0_18px_20px_rgba(70,48,30,0.28)]"
          style={{
            WebkitMaskImage: EDGE,
            maskImage: EDGE,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            transform: "perspective(1200px) rotateY(calc(var(--rx) * 4deg)) rotateX(calc(var(--ry) * -3deg)) translate3d(calc(var(--rx) * -8px), calc(var(--ry) * -5px), 0)",
            transition: "transform 600ms cubic-bezier(0.23,1,0.32,1)",
          }}
        />
      </motion.div>

      {/* clouds leaving the gap between the fingertips */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="cloud-rise absolute left-[40%] top-[26%] block h-[40%] w-[30%]"
          style={{ "--cr": `${i * -3.4}s`, WebkitMaskImage: PUFF, maskImage: PUFF } as React.CSSProperties}
        >
          <CloudBank reach={0.9} seed={7 + i * 5} fps={12} className="size-full" />
        </span>
      ))}
    </div>
  );
}
