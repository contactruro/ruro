import { Reveal } from "../ui/Reveal";

/* One statement, nothing else. */
export function Philosophy() {
  return (
    <section aria-labelledby="philosophy-label" className="tone-lilac bg-wash text-ink">
      <div className="container-ed pb-20 pt-12 md:pb-28 md:pt-16">
        <p id="philosophy-label" className="eyebrow text-accent">
          What we believe
        </p>
        <Reveal>
          <p className="display mt-10 max-w-6xl text-[clamp(2.5rem,6vw,6rem)] leading-[1.02]">
            Your name is an asset. <span className="text-accent">Your digital presence should treat it like one.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
