import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Philosophy } from "@/components/sections/Philosophy";
import { Studio } from "@/components/sections/Studio";
import { Audience } from "@/components/sections/Audience";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/ui/Reveal";
import { site, studio } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "RURO is a small studio that researches, writes, designs, builds and maintains personal websites for founders and executives. Meet the founder.",
  path: "/about",
});

const principles = [
  { t: "Authorship", art: "vinyl-hands", b: "Your site says who you are, in your own words. We write the first draft and you approve it." },
  { t: "Restraint", art: "lily", b: "We leave things out. A few true things, well told, say more than a long list." },
  { t: "Permanence", art: "pocket-clock", b: "Your site runs on accounts you own. It is made to last, and we keep it from going stale." },
  { t: "Discretion", art: "shells-hibiscus", b: "We never publish a client’s name, work or details without their written permission." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        tone="lilac"
        scene="athena"
        eyebrow="About RURO"
        lines={["Not an agency.", <span key="b" className="text-accent">A studio for people.</span>]}
        intro={
          <p>
            RURO is a small studio. We write, design, build and look after personal websites for founders and executives.{studio.city && ` We work from ${studio.city}.`} Agencies work for companies. We work for the people behind them.
          </p>
        }
        aside={
          <div className="rounded-3xl bg-white/75 p-6 ring-1 ring-white shadow-[0_24px_50px_-26px_rgba(20,22,43,0.38)]">
            <p className="eyebrow text-accent">The name</p>
            <p className="mt-3 text-lg leading-snug">{site.expansion}</p>
          </div>
        }
      />

      <Studio kicker="01 · The studio" />

      <section aria-labelledby="principles-title" className="tone-peach bg-wash pb-16 pt-24 md:pb-20 md:pt-32">
        <div className="container-ed grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-accent">How we work</p>
            <h2 id="principles-title" className="display mt-6 text-5xl">
              Four principles.
            </h2>
          </div>
          <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.t} delay={i * 0.06} className="flex items-start gap-5 border-t border-ink/15 py-6">
                {/* one sculpture or object for each principle: a record for the voice, a lily for restraint, a clock for permanence, a pearl in its shell for discretion */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/art/myth/${p.art}.webp`}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  draggable={false}
                  className="jr-float size-24 shrink-0 object-contain drop-shadow-[0_10px_10px_rgba(60,20,25,0.25)] md:size-28"
                  style={{ "--fd": `${i * -1.6}s`, "--fa": "6px" } as React.CSSProperties}
                />
                <div className="min-w-0">
                  <h3 className="display text-3xl">{p.t}</h3>
                  <p className="mt-3 text-base text-ink/75">{p.b}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <Philosophy />
      <Audience n="02" />
      <FinalCta variant="about" />
    </>
  );
}
