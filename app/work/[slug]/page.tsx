import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { studies } from "@/lib/content";
import { BrowserFrame, VisitLink } from "@/components/StudyCard";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { SkyScene } from "@/components/atelier/Scenes";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = studies.find((x) => x.slug === slug);
  if (!s) return {};
  const title = `${s.domain}: a study of ${s.person}’s website`;
  return pageMeta({
    title,
    description: `${s.summary} A breakdown of the design, functionality and luxury concept of ${s.domain}.`,
    path: `/work/${s.slug}`,
    image: { url: s.image, width: s.slug === "bill-gates" ? 1600 : 1200, height: s.slug === "bill-gates" ? 900 : 675, alt: `The homepage of ${s.domain}` },
  });
}

/* One numbered chapter of the breakdown: label on the left, content on the right. */
function Chapter({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-ink/15 py-14 md:py-20 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow text-accent">{n}</p>
        <h2 className="display mt-4 text-4xl md:text-5xl">{title}</h2>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">{children}</div>
    </section>
  );
}

export default async function StudyPage({ params }: Params) {
  const { slug } = await params;
  const index = studies.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const s = studies[index];
  const next = studies[(index + 1) % studies.length];

  const trail = breadcrumbLd([
    { name: "Studies", path: "/work" },
    { name: s.domain, path: `/work/${s.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trail) }} />
      <article className="relative isolate">
        <SkyScene variant="d" behind />
        <header className="container-ed pb-14 pt-32 md:pt-44">
          <Link href="/work" className="group inline-flex items-center gap-2 py-2 text-sm text-ink/65 hover:text-ink">
            <ArrowLeft aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
            All studies
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-accent">
                Study {String(index + 1).padStart(2, "0")} · {s.role}
              </p>
              <h1 className="display mt-5 text-[clamp(2.75rem,6.5vw,6.5rem)]">
                <MaskLines animateOnMount lines={[s.person, <span key="d" className="text-accent">{s.domain}</span>]} />
              </h1>
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <p className="text-xl leading-relaxed text-ink/75">{s.summary}</p>
              <VisitLink s={s} className="mt-6" />
            </Reveal>
          </div>
        </header>

        <div className="container-ed">
          <Reveal>
            <BrowserFrame s={s} priority />
          </Reveal>
          <p className="mt-4 text-sm text-ink/65">
            Homepage as captured in October 2026. RURO did not build this site and has no connection with{" "}
            {s.person}. The site and image belong to their owner.
          </p>

          <div className="mt-16 md:mt-24">
            <Chapter n="01 · The concept" title="The idea in one line.">
              <p className="display text-3xl leading-snug md:text-4xl">{s.lesson}</p>
              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="border-t border-ink/15 pt-4">
                  <dt className="eyebrow text-ink/65">Signature</dt>
                  <dd className="mt-2 text-lg">{s.signature}</dd>
                </div>
                <div className="border-t border-ink/15 pt-4">
                  <dt className="eyebrow text-ink/65">Address</dt>
                  <dd className="mt-2 font-mono text-lg">{s.domain}</dd>
                </div>
              </dl>
            </Chapter>

            <Chapter n="02 · Design" title="How it looks.">
              <ul className="flex flex-wrap gap-3" aria-label="Colour palette, sampled from the homepage">
                {s.palette.map((c) => (
                  <li key={c.hex} className="flex items-center gap-3 rounded-none border border-ink/10 py-1.5 pl-1.5 pr-4">
                    <span aria-hidden className="size-8 rounded-full border border-ink/10" style={{ backgroundColor: c.hex }} />
                    <span className="text-sm">
                      {c.name} <span className="font-mono text-xs uppercase text-ink/65">{c.hex}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <dl className="mt-10 flex flex-col">
                {s.design.map((d) => (
                  <div key={d.label} className="grid gap-2 border-t border-ink/15 py-5 sm:grid-cols-[8rem_1fr]">
                    <dt className="eyebrow pt-1 text-accent">{d.label}</dt>
                    <dd className="text-lg leading-relaxed text-ink/80">{d.text}</dd>
                  </div>
                ))}
              </dl>
            </Chapter>

            <Chapter n="03 · Functionality" title="What it does.">
              <ol className="flex flex-col">
                {s.functionality.map((f, i) => (
                  <li key={f} className="flex gap-5 border-t border-ink/15 py-5 text-lg leading-relaxed text-ink/80">
                    <span className="font-mono text-xs tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ol>
            </Chapter>
          </div>
        </div>

        {/* The luxury reading gets its own ground: it is RURO's point of view, not a description */}
        <section className="tone-mint mt-8 bg-wash text-ink">
          <div className="container-ed grid gap-12 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-accent-soft">04 · The luxury, decoded</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">Why it feels premium.</h2>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-2xl bg-ink/15 lg:col-span-8">
              {s.luxury.map((l, i) => (
                <li key={l.title} className="bg-white/70 p-6 md:p-8">
                  <p className="font-mono text-xs text-accent-soft">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="display mt-3 text-2xl md:text-3xl">{l.title}</h3>
                  <p className="mt-3 text-lg leading-relaxed text-ink/75">{l.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="container-ed">
          <Chapter n="05 · For your estate" title="What we would borrow.">
            <ul className="flex flex-col">
              {s.borrow.map((b) => (
                <li key={b} className="flex items-baseline gap-4 border-t border-ink/15 py-5 text-lg leading-relaxed">
                  <span aria-hidden className="size-1.5 shrink-0 -translate-y-1 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </Chapter>

          <Link
            href={`/work/${next.slug}`}
            className="group mb-24 flex items-center justify-between gap-6 border-y border-ink/15 py-10 md:mb-32"
          >
            <span>
              <span className="eyebrow text-ink/65">Next study</span>
              <span className="display mt-2 block text-3xl md:text-5xl">{next.person}</span>
              <span className="mt-1 block font-mono text-sm text-accent">{next.domain}</span>
            </span>
            <ArrowRight aria-hidden className="size-8 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </div>
      </article>
      <FinalCta variant="study" />
    </>
  );
}
