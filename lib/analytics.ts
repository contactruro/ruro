/* One function for every analytics event. It does nothing unless an analytics tool is
   configured (see components/Analytics.tsx), and it never receives personal data:
   only event names and short, non-identifying properties. */

export type EventProps = Record<string, string | number | boolean>;

type Plausible = ((event: string, options?: { props?: EventProps }) => void) & { q?: unknown[] };

declare global {
  interface Window {
    plausible?: Plausible;
    clarity?: (...args: unknown[]) => void;
  }
}

export function track(event: string, props?: EventProps) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {}
  try {
    window.clarity?.("event", event);
  } catch {}
}

/* Clarity runs only after the visitor agrees. The choice is kept in this browser only. */
export const CONSENT_KEY = "ruro-analytics-consent";
export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(v: Consent | null) {
  try {
    if (v) window.localStorage.setItem(CONSENT_KEY, v);
    else window.localStorage.removeItem(CONSENT_KEY);
  } catch {}
}
