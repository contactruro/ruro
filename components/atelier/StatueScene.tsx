"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/* The sculpture, standing in its own weather. A marble bust (a high-resolution cut-out of the studio's own
   reference) stands in front of slowly turning gold rays and sits between two banks of painted cloud: a far one behind it and a near one across
   its base, drifting at different speeds. The statue leans a few degrees toward the cursor and rises very slightly
   as the section scrolls past; both stop under reduced motion. Its edges are feathered into the clouds, so it is
   part of the scene rather than a picture in a box. Decorative, so hidden from assistive technology. */

/* The bust is cut flat at the chest, so its base dissolves into the cloud instead of ending in an edge. */
const BASE_FADE = "linear-gradient(to bottom, #000 0, #000 62%, transparent 94%)";

export function StatueScene({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const statueY = useTransform(scrollYProgress, [0, 1], [26, -18]);
  const nearY = useTransform(scrollYProgress, [0, 1], [46, -30]);
  const farY = useTransform(scrollYProgress, [0, 1], [14, -8]);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
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
      className={`relative isolate aspect-[1.2/1] w-full ${className}`}
      style={{ "--rx": 0, "--ry": 0 } as React.CSSProperties}
    >
      {/* the far bank: a painted cloud behind the bust, its edges feathered away */}
      <motion.div style={reduce ? undefined : { y: farY }} className="pointer-events-none absolute inset-x-[-6%] bottom-[-2%] h-[78%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src="/art/myth/cloud-soft.webp" alt="" draggable={false} className="cloud-feather size-full object-cover object-bottom opacity-90" />
      </motion.div>

      <motion.div style={reduce ? undefined : { y: statueY }} className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async"
          src="/art/myth/blindfold-bust.webp"
          alt=""
          className="absolute bottom-[6%] right-[4%] h-[92%] w-auto max-w-none select-none"
          style={{
            WebkitMaskImage: BASE_FADE,
            maskImage: BASE_FADE,
            transform: "perspective(1400px) rotateY(calc(var(--rx) * 3deg)) rotateX(calc(var(--ry) * -2deg)) translate3d(calc(var(--rx) * -7px), calc(var(--ry) * -5px), 0)",
            transition: "transform 600ms cubic-bezier(0.23,1,0.32,1)",
            willChange: "transform",
          }}
        />
      </motion.div>

      {/* the near bank across its base, also feathered, so no edge of any picture shows */}
      <motion.div style={reduce ? undefined : { y: nearY }} className="pointer-events-none absolute inset-x-[-8%] bottom-[-10%] h-[40%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src="/art/myth/cloud-soft.webp" alt="" draggable={false} className="cloud-feather size-full -scale-x-100 object-cover object-top" />
      </motion.div>
    </div>
  );
}
