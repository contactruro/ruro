import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/PageHeader";
import { StudyCard } from "@/components/StudyCard";
import { StudiesDeck } from "@/components/StudiesDeck";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/sections/FinalCta";
import { SkyScene } from "@/components/atelier/Scenes";
import { studies } from "@/lib/content";

export const metadata: Metadata = pageMeta({
  title: "Personal website examples from founders and investors",
  description:
    "Nine personal website examples by founders, investors and authors, from gatesnotes.com to nav.al, broken down by design and what makes each premium.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        tone="sky"
        scene="sun"
        eyebrow="Estates we study"
        lines={["The best", <span key="b" className="text-accent">estates online.</span>]}
        intro={
          <p>
            The best personal websites are rarely the loudest. These nine belong to people who decided what the first
            result for their name should say. Open any one for a breakdown of its design, its functionality and what
            makes it feel premium.
          </p>
        }
        art={<StudiesDeck />}
        aside={
          <p className="rounded-2xl border border-dashed border-accent/60 p-6 text-sm text-ink/70">
            <span className="eyebrow mb-3 inline-block text-accent">Please note</span>
            <br />
            RURO did not build any of these sites and has no connection with the people named. Each site, and each
            preview image, belongs to its owner. Previews show the homepages as captured in October 2026.
          </p>
        }
      />

      <div className="relative isolate">
        <SkyScene variant="d" behind />
      <div className="container-ed grid gap-x-10 gap-y-20 pb-32 md:grid-cols-2">
        {studies.map((s, i) => (
          <Reveal key={s.slug} className={i % 2 ? "md:mt-24" : ""}>
            <StudyCard s={s} index={i} priority={i < 2} level={2} />
          </Reveal>
        ))}
      </div>
      </div>
      <FinalCta variant="work" />
    </>
  );
}
