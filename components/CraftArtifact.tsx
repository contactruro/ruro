/* The writing, shown. A fictional interview excerpt, marked up the way an editor would, beside the
   sentence that was published. This is RURO's real difference from a web agency, and it needs no
   photography: only the work itself. */
export function InterviewToSentence({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <div className="grid border border-ink/30 md:grid-cols-2">
        <div className="p-6 md:p-8">
          <p className="eyebrow text-ink/70">Interview · 14 March · transcript</p>
          <p className="mt-5 text-lg leading-relaxed text-ink">
            So, <del className="text-ink/60 decoration-danger decoration-2">uh,</del> I started Gridline in 2021 because{" "}
            <mark className="bg-accent-soft/70 px-0.5 text-ink">
              factories couldn’t buy clean power without <del className="text-ink/60 decoration-danger decoration-2">like,</del> a decade of paperwork
            </mark>
            , and I’d seen that from the inside at the utility, where I spent six years,{" "}
            <del className="text-ink/60 decoration-danger decoration-2">I think it was six,</del> designing substations.
          </p>
        </div>
        <div className="border-t border-ink/30 bg-paper-deep p-6 md:border-l md:border-t-0 md:p-8">
          <p className="eyebrow text-accent">Published · iramalhotra.com/story</p>
          <p className="display mt-5 text-2xl leading-snug md:text-3xl md:leading-snug">
            Ira started Gridline in 2021 after six years designing substations for a state utility, because factories could not buy clean power without a decade of paperwork.
          </p>
        </div>
      </div>
      <figcaption className="mt-4 max-w-3xl text-base text-ink/75">
        <span className="eyebrow mr-2 text-ink/70">What we did</span>
        We kept her words and cut the filler. We put her experience first, then her reason. We added nothing she did not say. A made-up example.
      </figcaption>
    </figure>
  );
}
