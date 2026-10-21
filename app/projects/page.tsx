import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { ProjectRow } from "@/components/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { projects } from "@/lib/projects";

export const metadata: Metadata = pageMeta({
  title: "Projects we have done",
  description:
    "Client websites RURO designed and built end to end, with the brief, the approach and measured results: Keshav Home Interiors and Steven Bennett.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        tone="sky"
        scene="sun"
        eyebrow="Projects we have done"
        lines={["Sites we built,", <span key="b" className="text-accent">end to end.</span>]}
        intro={
          <p>
            Real websites for real clients, each shown with permission. Open one to read the brief, how we worked with the
            client, what we delivered and how the finished site measures up.
          </p>
        }
        aside={
          <p className="rounded-2xl border border-dashed border-accent/60 p-6 text-sm text-ink/70">
            <span className="eyebrow mb-3 inline-block text-accent">Please note</span>
            <br />
            These are sites RURO built. The{" "}
            <Link href="/sample" className="link-underline text-accent">
              showcase concepts
            </Link>{" "}
            and the{" "}
            <Link href="/work" className="link-underline text-accent">
              studies of other people’s sites
            </Link>{" "}
            are not client work.
          </p>
        }
      />

      <div className="relative isolate">
        <div className="container-ed relative z-10 flex flex-col gap-24 pb-32 md:gap-32">
          {projects.map((p, i) => (
            <Reveal key={p.slug}>
              <ProjectRow p={p} index={i} priority={i < 2} />
            </Reveal>
          ))}
        </div>
      </div>
      <FinalCta variant="work" />
    </>
  );
}
