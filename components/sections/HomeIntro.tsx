import { StatueScene } from "../atelier/StatueScene";
import { MaskLines, Reveal } from "../ui/Reveal";
import { IntroScene } from "../atelier/Scenes";

/* The brand introduction, straight after the film: why a personal digital home matters. An editorial statement on
   the left, three short principles, and the sculpture standing in its own clouds on the right. The copy is the brief's; nothing here makes a claim about the product. */

const principles = [
  { n: "01", t: "Personal by design", d: "Built around your story, not a template." },
  { n: "02", t: "Expressive by default", d: "A space that evolves with you." },
  { n: "03", t: "Timeless by intent", d: "A digital presence built to last." },
];

export function HomeIntro() {
  return (
    <section aria-labelledby="intro-title" className="relative overflow-hidden bg-tone py-24 md:py-36">
      <IntroScene />
      <div className="relative z-10 container-ed relative grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative z-10 lg:col-span-6">
          <p className="eyebrow text-accent">Our philosophy</p>
          <h2 id="intro-title" className="display mt-6 text-[clamp(2.75rem,5.4vw,5.5rem)] leading-[1]">
            <MaskLines lines={["More than a website.", <span key="b">A home for <span className="hl">your identity.</span></span>]} />
          </h2>
          <Reveal className="mt-8 max-w-lg">
            <p className="text-lg leading-relaxed text-ink/75">
              Your work is more than a list of projects. It is a reflection of your mind, values and journey. RURO helps you bring it all together into a digital
              home that feels like you.
            </p>
          </Reveal>
          <ol className="mt-12 grid max-w-2xl gap-8 border-t border-line pt-8 sm:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.n} delay={0.1 + i * 0.08}>
                <span className="grid size-9 place-items-center rounded-full border border-line bg-surface text-xs text-ink/70">{p.n}</span>
                <p className="display mt-4 text-2xl leading-tight">{p.t}</p>
                <p className="mt-2 text-sm leading-snug text-ink/70">{p.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="relative lg:col-span-6 lg:-mr-6 xl:-mr-12">
          <StatueScene />
        </div>
      </div>
    </section>
  );
}
