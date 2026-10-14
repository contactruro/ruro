import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { ReactNode } from "react";

type Variant = "solid" | "glass" | "paper" | "outline" | "ghost";

/* Pills in DM Mono capitals, as on the reference.
   solid: the section's vivid colour with ink text (the main action).
   glass: frosted glass, a translucent fill with blur and a hairline edge, for use over anything.
   paper: glass tuned for dark blue grounds. Pressed scales to 0.97. */
const R = "rounded-lg";
const styles: Record<Variant, string> = {
  solid: "bg-[var(--color-royal)] text-[#fffcf6] shadow-[0_12px_26px_-14px_rgba(155,17,30,0.8)] hover:bg-[#b01a28] active:scale-[0.98]",
  glass: "bg-[#fffcf6]/80 text-ink ring-1 ring-black/10 backdrop-blur-xl hover:bg-white active:scale-[0.97]",
  paper: "bg-[#fffcf6]/80 text-ink ring-1 ring-black/10 backdrop-blur hover:bg-white active:scale-[0.97]",
  outline: "text-ink ring-1 ring-ink/35 hover:bg-ink hover:text-paper active:scale-[0.97]",
  ghost: "text-ink hover:bg-black/5 active:scale-[0.97]",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
};

export function Button({ href, children, variant = "solid", size = "md", icon = true, className = "" }: Props) {
  const sizing = size === "lg" ? "min-h-13 px-7 text-[0.9375rem]" : "min-h-11 px-5 text-sm";
  return (
    <Link
      href={href}
      data-track="cta_click"
      data-track-label={typeof children === "string" ? children : undefined}
      data-track-href={href}
      className={`group inline-flex items-center justify-center gap-3 font-medium tracking-[0.005em] transition-[background-color,color,border-color,filter,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${R} ${sizing} ${styles[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon && (
        <ArrowRight
          aria-hidden
          weight="bold"
          className="size-5 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1"
        />
      )}
    </Link>
  );
}
