import { faqs } from "@/lib/content";
import { studio } from "@/lib/site";
import { Reveal } from "../ui/Reveal";
import { PhoneScene, SkyScene } from "../atelier/Scenes";

/* Shared FAQ for the homepage and /process. The cost answer is built from `studio` so it
   only states a figure once the studio has set one. */
export function Faq({ kicker = "Questions" }: { kicker?: string }) {
  const cost = {
    q: "What does an estate cost?",
    a: [
      studio.priceFrom ? `Sites start ${studio.priceFrom.replace(/^From /i, "from ")}.` : "We quote every site in writing after the first conversation.",
      "The price covers research, writing, design and building. Looking after the site after launch is an optional monthly fee",
      studio.stewardshipFrom ? `(${studio.stewardshipFrom.replace(/^Stewardship /i, "")}).` : "after launch.",
    ].join(" "),
  };
  const items = [faqs[0], faqs[1], cost, ...faqs.slice(2)];

  return (
    <section aria-labelledby="faq-title" className="relative overflow-hidden tone-rose bg-tone py-24 md:py-36">
      <SkyScene variant="c" />
      <PhoneScene />
      <div className="relative z-10 container-ed grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow text-accent">{kicker}</p>
          <h2 id="faq-title" className="display mt-6 text-4xl md:text-5xl">
            Questions people ask.
          </h2>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 5) * 0.04}>
              <details className="group border-t border-ink/25 py-6 last:border-b [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 rounded-md">
                  <h3 className="display text-2xl md:text-3xl">{f.q}</h3>
                  <span aria-hidden className="text-2xl text-accent transition-transform duration-500 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-lg text-ink/75">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
