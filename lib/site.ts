export const site = {
  name: "RURO",
  category: "Digital Identity Studio",
  tagline: "Your story, in one place.",
  positioning: "RURO writes, builds and looks after personal websites for founders and executives.",
  expansion: "Reputation. Uniquely. Represented. Online.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://ruro.in").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "studio@ruro.in",
  description:
    "RURO builds personal websites for founders and executives. We interview you, write your story, and keep it up to date, so people who search your name find the real you.",
};

/* ───────── Business facts only RURO can supply ─────────
   Anything left as null is simply not shown on the site, so nothing is ever implied
   that the studio has not committed to. Fill these in before launch. */
export const studio = {
  /** e.g. "From ₹4,00,000" — shown in the facts line, the pricing block and the FAQ. */
  priceFrom: null as string | null,
  /** e.g. "Stewardship from ₹40,000 a month". */
  stewardshipFrom: null as string | null,
  /** e.g. "two working days" — shown under the enquiry form only once you can keep it. */
  replyWithin: null as string | null,
  /** e.g. "five working days" — how long a Presence Audit takes to deliver. */
  auditWithin: null as string | null,
  /** A booking page (Cal.com, Calendly…). Set NEXT_PUBLIC_BOOKING_URL to show "Book a call". */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
  /** City the studio works from, e.g. "Bengaluru". */
  city: null as string | null,
  /** Registered company name, shown in the footer. */
  legalName: null as string | null,
  /** Typical project length, from the process timeline. */
  duration: "Up to 2 weeks",
};

/* One primary and one secondary action, used everywhere. */
export const cta = {
  primary: { label: "Review my online presence", href: "/contact?type=audit" },
  secondary: { label: "Start a conversation", href: "/contact" },
} as const;

export const nav = [
  { href: "/sample", label: "Showcase" },
  { href: "/process", label: "Process" },
  { href: "/work", label: "Studies" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
] as const;

export const footerNav = [
  { href: "/sample", label: "Showcase" },
  { href: "/process", label: "Process" },
  { href: "/work", label: "Studies" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
] as const;
