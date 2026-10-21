import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/lib/projects";
import { ProjectFrame, ProjectVisitLink } from "@/components/ProjectCard";
import { MaskLines, Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { SkyScene } from "@/components/atelier/Scenes";
import { breadcrumbLd, pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.name}: a ${p.domain} case study`,
    description: `${p.summary} ${p.role}.`,
    path: `/projects/${p.slug}`,
  });
}

/* One numbered chapter: label on the left, content on the right (the same as the studies). */
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

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];

  const trail = breadcrumbLd([
    { name: "Projects", path: "/projects" },
    { name: p.name, path: `/projects/${p.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(trail) }} />
      <article className="relative isolate">
        <SkyScene variant="d" behind />
        <header className="container-ed pb-14 pt-32 md:pt-44">
          <Link href="/projects" className="group inline-flex items-center gap-2 text-sm text-ink/65 hover:text-ink">
            <ArrowLeft aria-hidden className="size-4 transition-transform duration-500 group-hover:-translate-x-1" />
            All projects
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="eyebrow text-accent">
                Project {String(index + 1).padStart(2, "0")} · {p.kind}
              </p>
              <h1 className="display mt-5 text-[clamp(2.75rem,6.5vw,6.5rem)]">
                <MaskLines animateOnMount lines={[p.name, <span key="d" className="text-accent">{p.domain}</span>]} />
              </h1>
            </div>
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <p className="text-xl leading-relaxed text-ink/75">{p.summary}</p>
              <ProjectVisitLink p={p} className="mt-6" />
            </Reveal>
          </div>
        </header>

        <div className="container-ed">
          <Reveal>
            <ProjectFrame p={p} priority />
          </Reveal>
          <p className="mt-4 text-sm text-ink/65">Homepage as captured in October 2026. {p.permission}</p>

          <div className="mt-16 md:mt-24">
            <Chapter n="01 · The brief" title="What was needed.">
              <div className="flex flex-col gap-5 text-lg leading-relaxed text-ink/80">
                {p.brief.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                <div className="border-t border-ink/15 pt-4">
                  <dt className="eyebrow text-ink/65">Client</dt>
                  <dd className="mt-2 text-lg">{p.owner}</dd>
                </div>
                <div className="border-t border-ink/15 pt-4">
                  <dt className="eyebrow text-ink/65">Our role</dt>
                  <dd className="mt-2 text-lg">{p.role}</dd>
                </div>
                <div className="border-t border-ink/15 pt-4 sm:col-span-2">
                  <dt className="eyebrow text-ink/65">Timeline</dt>
                  <dd className="mt-2 text-lg">{p.timeline}</dd>
                </div>
              </dl>
            </Chapter>

            <Chapter n="02 · How we worked" title="From the first call.">
              <dl className="flex flex-col">
                {p.approach.map((a) => (
                  <div key={a.label} className="grid gap-2 border-t border-ink/15 py-5 sm:grid-cols-[8rem_1fr]">
                    <dt className="eyebrow pt-1 text-accent">{a.label}</dt>
                    <dd className="text-lg leading-relaxed text-ink/80">{a.text}</dd>
                  </div>
                ))}
              </dl>
              {p.quotes && (
                <ul className="mt-8 flex flex-wrap gap-3" aria-label="Lines from the site’s own copy">
                  {p.quotes.map((q) => (
                    <li key={q} className="border border-ink/15 px-4 py-2 text-base">
                      {q}
                    </li>
                  ))}
                </ul>
              )}
            </Chapter>

            <Chapter n="03 · What we delivered" title="The work.">
              <ol className="flex flex-col">
                {p.delivered.map((d, i) => (
                  <li key={d} className="flex gap-5 border-t border-ink/15 py-5 text-lg leading-relaxed text-ink/80">
                    <span className="font-mono text-xs tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {d}
                  </li>
                ))}
              </ol>
            </Chapter>
          </div>
        </div>

        {/* The measured result gets its own ground, the same as the studies' "luxury" section. */}
        <section className="tone-mint mt-8 bg-wash text-ink">
          <div className="container-ed grid gap-12 py-20 md:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow text-accent-soft">04 · The result</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">How it measures up.</h2>
              <p className="mt-5 text-base leading-relaxed text-ink/70">{p.resultNote}</p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-2xl bg-ink/15 lg:col-span-8">
              {p.results.map((r) => (
                <li key={r.label} className="bg-white/70 p-6 md:p-8">
                  <p className="display text-4xl md:text-5xl">{r.value}</p>
                  <h3 className="mt-3 text-lg font-semibold">{r.label}</h3>
                  {r.note && <p className="mt-1 text-sm text-ink/65">{r.note}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="container-ed">
          <Link
            href={`/projects/${next.slug}`}
            className="group my-16 flex items-center justify-between gap-6 border-y border-ink/15 py-10 md:my-24"
          >
            <span>
              <span className="eyebrow text-ink/65">{projects.length > 1 ? "Next project" : "All projects"}</span>
              <span className="display mt-2 block text-3xl md:text-5xl">{next.name}</span>
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
