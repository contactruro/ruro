import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { services, WHO_SHORT } from "@/lib/services";

export const metadata: Metadata = pageMeta({
  title: "Services",
  description:
    "Five services from one studio: your personal website, a blog on your own site, personal branding, ongoing upkeep and an online presence review.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        tone="sky"
        scene="sun"
        eyebrow="Services"
        lines={["What we do,", <span key="b" className="text-accent">plainly.</span>]}
        intro={
          <p>
            RURO is a web design and digital identity studio. We design, write, build and maintain personal websites for {WHO_SHORT}. Five services, one studio, no packages.
          </p>
        }
      />

      <section aria-label="All services" className="container-ed pb-24 md:pb-32">
        <ol className="flex flex-col">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={Math.min(i, 4) * 0.05} className="border-t border-ink/15 py-8 last:border-b md:py-10">
              <Link href={`/services/${s.slug}`} data-track="service_open" data-track-slug={s.slug} className="group grid gap-4 md:grid-cols-12 md:items-baseline md:gap-10">
                <span className="font-mono text-xs tabular-nums text-accent md:col-span-1">{s.n}</span>
                <h2 className="display text-3xl md:col-span-4 md:text-4xl">{s.name}</h2>
                <p className="text-lg leading-snug text-ink/80 md:col-span-5">{s.line}</p>
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-accent md:col-span-2 md:justify-end">
                  <span className="link-underline">Read more</span>
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>

        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink/75">
          <strong className="font-semibold text-ink">What we do not do: social media.</strong> We do not run your accounts, post for you or chase followers. We set up your profile and your site, and make everything else point home.
        </p>
      </section>

      <FinalCta variant="process" />
    </>
  );
}
