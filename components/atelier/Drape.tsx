import { artAlt } from "@/lib/altText";
/* A hanging velvet drape, from the art direction reference, feathered into the page. It hangs from the top edge
   of a section, on either side, and sways a fraction of a degree (a very slow CSS motion that stops under
   reduced motion). Decorative: it never sits over copy, and is hidden from assistive technology. */

const SRC = { right: "/art/curtain-right.webp", left: "/art/curtain-left.webp" } as const;

export function Drape({ side = "right", className = "" }: { side?: "left" | "right"; className?: string }) {
  const fade =
    side === "right"
      ? "linear-gradient(to left, #000 40%, transparent 100%), linear-gradient(to bottom, #000 60%, transparent 100%)"
      : "linear-gradient(to right, #000 40%, transparent 100%), linear-gradient(to bottom, #000 60%, transparent 100%)";
  return (
    <div aria-hidden className={`drape pointer-events-none absolute top-0 ${side === "right" ? "right-0" : "left-0"} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SRC[side]}
        alt={artAlt(SRC[side])}
        decoding="async"
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ WebkitMaskImage: fade, maskImage: fade, WebkitMaskComposite: "source-in", maskComposite: "intersect" }}
      />
    </div>
  );
}
