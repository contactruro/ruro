import { team } from "@/lib/content";
import { studio } from "@/lib/site";
import { MaskLines, Reveal } from "../ui/Reveal";
import { SkyScene } from "../atelier/Scenes";
import { OwnerPhoto } from "./OwnerPhoto";

/* Who the client would actually work with: one owner, one portrait. The page is balanced in two columns: the
   heading, the founder's note and the discretion policy on the left, and the owner's card on the right. The
   founder's note is still a labelled placeholder: it has to be written by the owner, in the first person. The
   portrait is public/people/owner.jpg. The discretion policy lives on the Journal page. */
export function Studio({ kicker = "03 · The studio" }: { kicker?: string }) {
  const owner = team[0];
  return (
    <section id="studio" aria-labelledby="studio-title" className="tone-butter relative overflow-hidden scroll-mt-24 bg-tone py-20 md:py-32">
      <SkyScene variant="b" />
      <div className="container-ed relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="flex flex-col gap-8 lg:col-span-6">
          <div>
            <p className="eyebrow text-royal">{kicker}</p>
            <h2 id="studio-title" className="display mt-5 text-[clamp(2.5rem,5.4vw,5rem)] leading-[1]">
              <MaskLines lines={["The person", <span key="b" className="text-royal">you work with.</span>]} />
            </h2>
            <Reveal className="mt-6">
              <p className="max-w-md text-lg leading-snug text-ink/75">
                A one-person studio, on purpose. Whoever interviews you also writes, designs and looks after your site.
                {studio.city && ` Based in ${studio.city}.`}
              </p>
            </Reveal>
          </div>

          {/* A promise from the founder, and what the studio does. Written in the first person from commitments the site
              already makes (authorship, ownership, upkeep, discretion); the founder should read and sign it off. */}
          <Reveal className="border-2 border-royal bg-surface p-6 md:p-8">
            <p className="eyebrow text-royal">A promise from the founder</p>
            <p className="display mt-4 text-[clamp(1.35rem,2.2vw,1.9rem)] leading-snug text-ink">
              I will write your story with you, never from a template. You will approve every word. Your site will run on accounts you own, and I will keep it from going stale.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/75">Nothing about you is published until you have said yes.</p>
            <p className="display mt-5 text-3xl italic text-royal">{owner.name}</p>
            <p className="eyebrow mt-1 text-ink/60">Founder, RURO</p>

            <div className="mt-6 border-t-2 border-royal pt-5">
              <p className="eyebrow text-ink/70">What we do</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {["Your personal website", "A blog on your own site", "Personal branding: your profile, set up properly", "Stewardship and upkeep"].map((w) => (
                  <li key={w} className="flex items-start gap-2 text-[0.9375rem] leading-snug text-ink/85">
                    <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-royal" />
                    {w}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink/65">We do not do social media management.</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6">
          <article className="border-2 border-royal bg-surface p-4 md:p-6">
            <OwnerPhoto alt={`Portrait of ${owner.name}, ${owner.role}`} />
            <div className="mt-5">
              <h3 className="display text-3xl text-royal md:text-4xl">{owner.name}</h3>
              <p className="eyebrow mt-2 text-ink/70">{owner.role}</p>
              <p className="mt-4 text-base leading-relaxed text-ink/80">{owner.bio}</p>
              {owner.ventures && (
                <ul className="mt-5 border-t-2 border-royal">
                  {owner.ventures.map((v) => (
                    <li key={v.name} className="grid gap-1 border-b border-ink/15 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
                      <div>
                        <p className="display text-2xl leading-none text-royal">{v.name}</p>
                        <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink/65">{v.role}</p>
                      </div>
                      <div>
                        <p className="text-[0.9375rem] leading-snug text-ink/80">{v.text}</p>
                        {v.url && (
                          <a href={v.url} target="_blank" rel="noopener noreferrer" className="link-underline mt-2 inline-flex items-center gap-1 font-mono text-[0.75rem] tracking-[0.04em] text-royal">
                            {v.url.replace(/^https?:\/\//, "")} <span aria-hidden>↗</span>
                            <span className="sr-only">(opens in a new tab)</span>
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
