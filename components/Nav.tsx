"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cta, nav, site } from "@/lib/site";
import { Wordmark } from "./ui/Wordmark";
import { Button } from "./ui/Button";
import { EASE } from "./ui/Reveal";

/* A masthead, not a floating pill: the wordmark left, letter-spaced
   text links, one action right. It sits on the page at the top and gains a paper ground and a
   hairline once you scroll. */
export function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const [darkHeader, setDarkHeader] = useState(false);
  const [over, setOver] = useState(true);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // While the film plays (about three screens of scroll) the nav sits over a dark scene.
  useMotionValueEvent(scrollY, "change", (v) => {
    setCondensed(v > 8);
    setOver(v < window.innerHeight * 3.1);
  });
  // Pages whose header is dark mark it with data-nav-dark; the nav then uses light text
  // until it takes its paper ground on scroll.
  useEffect(() => {
    const check = () => setDarkHeader(!!document.querySelector("[data-nav-dark]"));
    check();
    window.addEventListener("ruro:hero", check);
    return () => window.removeEventListener("ruro:hero", check);
  }, [pathname]);
  const onDark = darkHeader && over;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    // The menu is a modal dialog: focus moves into it, Tab stays inside it (including the
    // close button), Escape closes it, and focus returns to the menu button afterwards.
    const focusables = () =>
      [menuButton.current, ...Array.from(dialog.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter(Boolean) as HTMLElement[];
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") return setOpen(false);
      if (e.key !== "Tab") return;
      const items = focusables();
      const i = items.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i === items.length - 1 ? 0 : i + 1;
      e.preventDefault();
      items[next]?.focus();
    };
    window.addEventListener("keydown", onKey);
    let t: ReturnType<typeof setTimeout> | undefined;
    if (open) {
      wasOpen.current = true;
      t = setTimeout(() => dialog.current?.querySelector<HTMLElement>("a[href]")?.focus(), 60);
    } else if (wasOpen.current) {
      wasOpen.current = false;
      menuButton.current?.focus();
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      if (t) clearTimeout(t);
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const mobileLinks = [{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-[background-color,border-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          condensed && !onDark ? "border-b border-ink/10 bg-paper/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav aria-label="Primary" className="container-ed flex h-16 items-center justify-between md:h-20">
          <Link href="/" aria-label={`${site.name}, home`} className={`transition-colors duration-300 ${onDark ? "text-white" : "text-ink"}`}>
            <Wordmark className="text-[1.65rem] leading-none" />
          </Link>

          <ul className="hidden items-center gap-4 xl:gap-6 2xl:gap-8 lg:flex">
            {nav.map((item, idx) => {
              const active = isActive(item.href);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    data-track="nav_click"
                    data-track-target={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`eyebrow border-b py-1 transition-colors duration-300 ${
                      active
                        ? onDark
                          ? "border-white text-white"
                          : "border-accent text-accent"
                        : onDark
                          ? "border-transparent text-paper/80 hover:text-paper"
                          : "border-transparent text-ink/75 hover:text-ink"
                    }`}
                  >
                    <span className="mr-1.5 hidden opacity-50 2xl:inline">0{idx + 1}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline-flex">
              <Button href={cta.primary.href} variant="outline" className={`whitespace-nowrap ${onDark ? "!text-white !ring-white/45 hover:!bg-white hover:!text-black" : ""}`}>
                {cta.primary.label}
              </Button>
            </span>
            <button
              ref={menuButton}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`relative z-[70] inline-flex size-11 items-center justify-center border transition-[color,border-color,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] lg:hidden ${
                open ? "border-paper/40 text-paper" : onDark ? "border-paper/50 text-paper" : "border-ink/25 text-ink"
              }`}
            >
              <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-[1.5px] w-5 bg-current transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={dialog}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[65] flex flex-col overflow-y-auto tone-lilac bg-tone text-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <div className="container-ed flex flex-1 flex-col justify-between gap-12 pb-10 pt-28">
              <ul className="flex flex-col">
                {mobileLinks.map((item, i) => (
                  <li key={item.label} className="overflow-hidden border-b border-ink/15 last:border-b-0">
                    <motion.div
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.6, delay: 0.06 + i * 0.04, ease: EASE }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={(item.href === "/" ? pathname === "/" : isActive(item.href)) ? "page" : undefined}
                        className="display flex items-baseline gap-4 py-3 text-4xl aria-[current=page]:text-accent-soft"
                      >
                        <span aria-hidden className="eyebrow tabular-nums text-accent-soft">
                          0{i + 1}
                        </span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <Button href={cta.primary.href} variant="paper" size="lg" className="w-full">
                  {cta.primary.label}
                </Button>
                <p className="eyebrow text-accent-soft">{site.expansion}</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
