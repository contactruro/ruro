import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { breadcrumbLd, pageMeta } from "@/lib/seo";
import { cta, site, studio } from "@/lib/site";
import { services, stages, WHO } from "@/lib/services";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMeta({ title: `${s.name}: a RURO service`, description: s.description, path: `/services/${s.slug}` });
}

/* One numbered chapter: label on the left, content on the right (the same as the case studies). */
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

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const index = services.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const s = services[index];
  const others = services.filter((x) => x.slug !== s.slug);

  const ld = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    serviceType: s.name,
    url: `${site.url}/services/${s.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: "Worldwide",
    audience: { "@type": "Audience", audienceType: "Founders, executives and established professionals" },
  };
  const trail = breadcrumbLd([
    { name: "Services", path: "/services" },
    { name: s.name, path: `/services/${s.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trail) }} />

      <PageHeader
        tone="peach"
        scene={s.scene}
        eyebrow={`Service ${s.n}`}
        lines={[s.name]}
        intro={<p>{s.line}</p>}
      />

      <article className="container-ed pb-8">
        <Link href="/services" className="group -mt-8 mb-6 inline-flex items-center gap-2 py-2 text-sm text-ink/65 hover:text-ink">
          <ArrowLeft aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
          All services
        </Link>

        <Chapter n="01 · What is included" title="What you get.">
          <ol className="flex flex-col">
            {s.includes.map((d, i) => (
              <li key={d} className="flex gap-5 border-t border-ink/15 py-5 text-lg leading-relaxed text-ink/80">
                <span className="font-mono text-xs tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                {d}
              </li>
            ))}
          </ol>
        </Chapter>

        <Chapter n="02 · Who it is for" title="Who it helps.">
          <p className="text-lg leading-relaxed text-ink/80">{s.forWho}</p>
          <p className="mt-5 text-lg leading-relaxed text-ink/80">RURO works with {WHO.charAt(0).toLowerCase() + WHO.slice(1)}</p>
        </Chapter>

        {s.process && (
          <Chapter n="03 · How it works" title="Four stages.">
            <ol className="flex flex-col">
              {stages.map((st) => (
                <li key={st.n} className="grid gap-2 border-t border-ink/15 py-5 sm:grid-cols-[8rem_1fr]">
                  <span className="eyebrow pt-1 text-accent">
                    {st.n} · {st.when}
                  </span>
                  <span>
                    <span className="display block text-2xl">{st.title}</span>
                    <span className="mt-2 block text-lg leading-relaxed text-ink/80">{st.body}</span>
                    <span className="mt-2 block text-base text-ink/65">You receive: {st.receive.join(", ")}.</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-ink/65">
              Typical project length: {studio.duration.toLowerCase()}. Day ranges are typical, not promised. {studio.priceFrom ? `Sites start ${studio.priceFrom.replace(/^From /i, "from ")}.` : "We quote every site in writing after the first conversation."}
            </p>
          </Chapter>
        )}

        <Chapter n={s.process ? "04 · Next step" : "03 · Next step"} title="Start here.">
          <p className="text-lg leading-relaxed text-ink/80">
            The best first step is a short conversation, or an online presence review. Write to <a className="link-underline" href={`mailto:${site.email}`}>{site.email}</a> or use the enquiry form.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={cta.primary.href} size="lg">
              {cta.primary.label}
            </Button>
            <Button href={cta.secondary.href} size="lg" variant="outline">
              {cta.secondary.label}
            </Button>
          </div>
        </Chapter>

        <Reveal>
          <nav aria-label="Other services" className="mb-16 border-t border-ink/15 pt-10 md:mb-24">
            <p className="eyebrow text-ink/65">Other services</p>
            <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="group flex items-center justify-between gap-4 border-b border-ink/15 py-4 text-lg hover:text-accent">
                    {o.name}
                    <ArrowRight aria-hidden className="size-5 shrink-0 text-accent transition-transform duration-500 group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </article>
      <FinalCta variant="process" />
    </>
  );
}
