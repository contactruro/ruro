"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { readConsent, track, writeConsent, type Consent } from "@/lib/analytics";

/* Privacy-conscious measurement, all of it optional:
   - Plausible (cookieless page views and events) when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
   - Microsoft Clarity (heatmaps, recordings) when NEXT_PUBLIC_CLARITY_ID is set, loaded only
     after the visitor allows it. Form fields are masked with data-clarity-mask.
   Clicks on any element with data-track="event" are reported, with data-track-* as properties. */
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_SRC = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.manual.js";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export const OPEN_CONSENT_EVENT = "ruro:analytics-settings";

function loadClarity(id: string) {
  if (document.getElementById("clarity-tag")) return;
  if (!window.clarity) {
    const q: unknown[] = [];
    window.clarity = Object.assign((...a: unknown[]) => void q.push(a), { q });
  }
  const s = document.createElement("script");
  s.id = "clarity-tag";
  s.async = true;
  s.src = `https://www.clarity.ms/tag/${id}`;
  document.head.appendChild(s);
  window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
}

export function Analytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null>(null);
  const [asked, setAsked] = useState(true);

  // Page views (Plausible's manual script, so client-side navigations count too). A queue is
  // created first so events sent before the script arrives are kept and replayed by it.
  useEffect(() => {
    if (!PLAUSIBLE_DOMAIN) return;
    if (!window.plausible) {
      const q: unknown[] = [];
      window.plausible = Object.assign((...a: unknown[]) => void q.push(a), { q });
    }
    window.plausible("pageview");
  }, [pathname]);

  // Delegated click tracking for data-track elements
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const props: Record<string, string> = { page: window.location.pathname };
      for (const [k, v] of Object.entries(el.dataset)) {
        if (k.startsWith("track") && k !== "track" && v) props[k.slice(5).toLowerCase()] = v;
      }
      track(el.dataset.track!, props);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Scroll depth, once per threshold per page
  useEffect(() => {
    const hit = new Set<number>();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = (window.scrollY / max) * 100;
      for (const t of [25, 50, 75, 100]) {
        if (pct >= t - 1 && !hit.has(t)) {
          hit.add(t);
          track("scroll_depth", { depth: t, page: pathname });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // Consent for Clarity
  useEffect(() => {
    if (!CLARITY_ID) return;
    const c = readConsent();
    setConsent(c);
    setAsked(c !== null);
    if (c === "granted") loadClarity(CLARITY_ID);
    const reopen = () => setAsked(false);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  const decide = (c: Consent) => {
    writeConsent(c);
    setConsent(c);
    setAsked(true);
    if (c === "granted" && CLARITY_ID) loadClarity(CLARITY_ID);
    if (c === "denied" && consent === "granted") window.location.reload();
  };

  return (
    <>
      {PLAUSIBLE_DOMAIN && (
        <Script src={PLAUSIBLE_SRC} data-domain={PLAUSIBLE_DOMAIN} strategy="afterInteractive" />
      )}
      {CLARITY_ID && !asked && (
        <div
          role="region"
          aria-label="Analytics choice"
          className="fixed inset-x-3 bottom-3 z-[80] mx-auto max-w-xl border border-ink bg-paper p-5 md:bottom-6"
        >
          <p className="text-sm leading-relaxed text-ink">
            May we record anonymised visits to improve this site? Everything you type into forms is hidden from
            recordings. No advertising cookies.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => decide("granted")}
              className="h-10 rounded-full bg-pop ring-1 ring-white/80 shadow-sm px-4 text-sm font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Allow
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="h-10 rounded-none border border-ink/20 px-4 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink"
            >
              No thanks
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/* A footer link that reopens the choice. Rendered only when Clarity is configured. */
export function AnalyticsSettingsButton({ className = "" }: { className?: string }) {
  if (!CLARITY_ID) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} className={className}>
      Analytics settings
    </button>
  );
}
