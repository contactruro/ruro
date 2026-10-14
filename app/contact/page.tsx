import type { Metadata } from "next";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HeaderScene, SkyScene } from "@/components/atelier/Scenes";
import { MaskLines } from "@/components/ui/Reveal";
import { audit } from "@/lib/content";
import { site, studio } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start a conversation",
  description: "Ask for an online presence review, or tell us about the website you want.",
  alternates: { canonical: "/contact" },
  openGraph: { title: "Start a conversation · RURO", url: "/contact" },
};

const steps = [
  ["01", "We read your enquiry ourselves."],
  ["02", "If it is a good fit, we set up a private call."],
  ["03", "You get a written proposal made for you."],
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const isAudit = type === "audit";
  return (
    <section className="relative overflow-hidden tone-mint bg-wash pb-32 pt-32 md:pt-44">
      <HeaderScene variant="clouds" />
      <SkyScene variant="b" />
      {/* Phones: heading, form, then the details. Desktop: details on the left, form on the right. */}
      <div className="relative z-10 container-ed grid gap-12 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3 text-accent">
            <span className="inline-block size-2 rounded-full bg-accent" aria-hidden />
            {isAudit ? audit.title : "Enquiry"}
          </p>
          <h1 className="display mt-6 text-[clamp(2.75rem,6.4vw,6rem)]">
            <MaskLines
              animateOnMount
              lines={isAudit ? ["Review my", <span key="b" className="text-accent">online presence.</span>] : ["Start a", <span key="b" className="text-accent">conversation.</span>]}
            />
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75 md:text-xl">
            {isAudit
              ? `${audit.summary}${studio.auditWithin ? ` Delivered within ${studio.auditWithin}.` : ""}`
              : "Tell us a little about you and what people should know about you. We take on a few projects at a time, so we read every enquiry carefully."}
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2">
          <div className="relative rounded-3xl bg-white/80 p-6 ring-1 ring-white shadow-[0_24px_50px_-26px_rgba(20,22,43,0.38)] md:p-10">
            <EnquiryForm audit={isAudit} />
          </div>
          {studio.bookingUrl && (
            <p className="mt-6 text-base text-ink/75">
              Prefer to talk first?{" "}
              <a
                href={studio.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="booking_start"
                className="link-underline font-semibold text-ink"
              >
                Book a call
              </a>
            </p>
          )}
        </div>

        <div className="lg:col-span-5">
          {isAudit && (
            <>
              <p className="eyebrow text-accent">The review covers</p>
              <ul className="mt-4 flex flex-col">
                {audit.includes.map((item) => (
                  <li key={item} className="border-t border-ink/15 py-4 text-base last:border-b">
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
          <p className={`eyebrow text-accent ${isAudit ? "mt-10" : ""}`}>What happens next</p>
          <ol className="mt-4 flex flex-col">
            {steps.map(([n, t]) => (
              <li key={n} className="flex gap-6 border-t border-ink/15 py-5 last:border-b">
                <span className="font-mono text-xs text-accent">{n}</span>
                <span className="text-base">{t}</span>
              </li>
            ))}
          </ol>
          <p className="mt-10 text-sm text-ink/70">
            Prefer email?{" "}
            <a href={`mailto:${site.email}`} className="link-underline inline-block py-2 text-ink">
              {site.email}
            </a>
            <span className="mx-2 text-ink/40" aria-hidden>
              ·
            </span>
            <a href={`mailto:${site.emailAlt}`} className="link-underline inline-block py-2 text-ink">
              {site.emailAlt}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
