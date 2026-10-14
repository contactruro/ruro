import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { studies } from "@/lib/content";
import { MaskLines, Reveal } from "../ui/Reveal";
import { StudyCard } from "../StudyCard";
import { LaurelScene } from "../atelier/Scenes";

/* Three studies of other people's websites: evidence of taste and research, placed after RURO's
   own work, never presented as it. */
const PICKS = ["nithin-kamath", "naval-ravikant", "james-clear"];

export function FieldNotes() {
  const picks = PICKS.map((slug) => studies.find((s) => s.slug === slug)!).filter(Boolean);
  return (
    <section id="field-notes" aria-labelledby="notes-title" className="relative overflow-hidden tone-lilac bg-wash py-24 md:py-36">
      <LaurelScene />
      <div className="relative z-10 container-ed">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">04 · Field notes</p>
            <h2 id="notes-title" className="display mt-6 text-4xl md:text-5xl xl:text-6xl">
              <MaskLines lines={["What the best", <span key="b" className="text-accent">personal sites get right.</span>]} />
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="dek text-xl text-ink/75">
              We study the websites of well-known founders and authors, and borrow what works. We did not build them.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8">
          {picks.map((s) => (
            <Reveal key={s.slug}>
              <StudyCard s={s} index={studies.indexOf(s)} showIndex={false} />
            </Reveal>
          ))}
        </div>

        <Link href="/work" className="group mt-10 inline-flex min-h-11 items-center gap-2 font-semibold text-accent">
          <span className="link-underline">Read all {studies.length} studies</span>
          <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
