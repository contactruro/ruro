import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { audit, journal, toneClasses } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { FinalCta } from "@/components/sections/FinalCta";
import { cta, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return journal.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const e = journal.find((x) => x.slug === slug);
  if (!e) return {};
  return {
    title: e.title,
    description: e.dek,
    alternates: { canonical: `/journal/${e.slug}` },
    openGraph: { type: "article", title: e.title, description: e.dek, url: `/journal/${e.slug}`, publishedTime: e.date },
  };
}

export default async function EssayPage({ params }: Params) {
  const { slug } = await params;
  const index = journal.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const e = journal[index];
  const next = journal[(index + 1) % journal.length];
  const tone = toneClasses[e.tone];

  const ld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: e.title,
    description: e.dek,
    datePublished: e.date,
    author: { "@type": "Organization", name: "RURO" },
    publisher: { "@type": "Organization", name: "RURO", url: site.url },
    mainEntityOfPage: `${site.url}/journal/${e.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article>
        <header className={`${tone.cls} ${tone.wash} ${tone.text} pb-20 pt-36 md:pb-28 md:pt-48`}>
          <div className="container-ed">
            <Link href="/journal" className="eyebrow inline-flex items-center gap-2 opacity-80 hover:opacity-100">
              <ArrowLeft aria-hidden className="size-4" /> Journal
            </Link>
            <h1 className="display mt-10 max-w-5xl text-[clamp(2.75rem,6.4vw,6.5rem)]">
              <MaskLines animateOnMount lines={[e.title]} />
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed opacity-85 md:text-2xl md:leading-snug">{e.dek}</p>
            <p className="eyebrow mt-10 flex flex-wrap gap-x-6 gap-y-2 opacity-75">
              <time dateTime={e.date}>{formatDate(e.date)}</time>
              <span>{e.readingTime} read</span>
              <span>RURO Journal</span>
            </p>
          </div>
        </header>
        <div className="container-ed py-20 md:py-28">
          <div className="mx-auto max-w-2xl">
            {e.body.map((p, i) => (
              <Reveal key={i} y={16}>
                <p
                  className={`mb-8 text-lg leading-relaxed text-ink md:text-xl md:leading-relaxed ${
                    i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-[family-name:var(--font-display)] first-letter:text-7xl first-letter:leading-[0.85] first-letter:text-accent" : ""
                  }`}
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
      {/* The essay's argument, turned into a next step */}
      <aside aria-label="Presence audit" className="container-ed pb-20 md:pb-28">
        <div className="mx-auto flex max-w-2xl flex-col gap-5 rounded-3xl bg-accent-tint p-8 md:p-10">
          <p className="eyebrow text-accent">{audit.title}</p>
          <p className="display text-3xl leading-tight">Curious what the first page says about you?</p>
          <p className="text-lg text-ink/75">{audit.summary}</p>
          <div>
            <Button href={cta.primary.href}>{cta.primary.label}</Button>
          </div>
        </div>
      </aside>
      <aside aria-label="Next essay" className="border-t border-ink/10">
        <Link href={`/journal/${next.slug}`} className="group container-ed flex flex-col gap-4 py-16 md:py-24">
          <span className="eyebrow text-accent">Next essay</span>
          <span className="display text-4xl transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-3 md:text-6xl">
            {next.title}
          </span>
        </Link>
      </aside>
      <FinalCta variant="journal" />
    </>
  );
}
