import { MaskLines, Reveal } from "../ui/Reveal";
import { Showcase } from "../Showcase";
import { InterviewToSentence } from "../CraftArtifact";
import { LaptopScene } from "../atelier/Scenes";

/* The product, shown rather than described: concept sites for well-known people, as RURO would
   build them (unofficial, labelled), and the writing craft underneath. */
export function SampleSection() {
  return (
    <section id="sample" aria-labelledby="sample-title" className="relative overflow-hidden tone-sky scroll-mt-24 bg-tone py-24 md:py-36">
      <LaptopScene />
      <div className="relative z-10 container-ed">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">01 · Showcase</p>
            <h2 id="sample-title" className="display mt-6 text-4xl md:text-5xl xl:text-6xl">
              <MaskLines lines={["See how we would", <span key="b" className="text-accent">tell their stories.</span>]} />
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="dek text-xl text-ink/75">
              Four well-known people, and how we would tell each story on a site of their own. These are unofficial ideas. The facts are public. The design and writing are ours.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14">
        <Showcase />
      </div>

      <div className="container-ed">
        <Reveal className="mt-20 md:mt-28">
          <p className="eyebrow text-accent">From interview to story</p>
          <h3 className="display mt-4 max-w-2xl text-3xl md:text-4xl">This is the work: turning talk into story.</h3>
          <InterviewToSentence className="mt-8" />
        </Reveal>
      </div>
    </section>
  );
}
