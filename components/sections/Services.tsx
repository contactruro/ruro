"use client";

import { motion, useReducedMotion } from "motion/react";
import { GlobeSimple, LinkedinLogo, Newspaper, ProhibitInset } from "@phosphor-icons/react";
import { MaskLines, Reveal } from "../ui/Reveal";

/* What we do, in four plain services and one plain refusal, set like four pillars: each has a sculpture on top, a
   name, one sentence, and what is in it. We do not do social media; the section says so. Dark royal blue with gold,
   like the engagement section, so the page alternates between light and dark as it goes. The figures are the
   studio's own cut-outs and never sit over any text. Reduced motion leaves everything still. */

const services = [
  {
    n: "I",
    title: "Your website",
    line: "A personal website, written, designed and built around you, at your own address.",
    items: ["Your story, written with you", "A design made only for you", "Built so you can edit it"],
    art: "statue-suit",
  },
  {
    n: "II",
    title: "A blog, on your own site",
    line: "A place for your essays, talks and news, so your ideas live where you own them.",
    items: ["Essays and notes, under your name", "Talks and interviews in one place", "Easy to publish to"],
    art: "reader",
  },
  {
    n: "III",
    title: "Personal branding",
    line: "Setting up how you appear online: a clear name, story and photograph, kept consistent where people look you up.",
    items: ["Your profile, set up properly", "One story across every place", "Everything pointing to your site"],
    art: "statue-dj",
    marks: true,
  },
  {
    n: "IV",
    title: "Stewardship and upkeep",
    line: "After launch we keep it safe, current and working, so it never goes stale.",
    items: ["Kept secure and running", "Your news, talks and articles added", "Regular checks on how you show up"],
    art: "athena",
  },
] as const;

export function Services() {
  const reduce = useReducedMotion();
  return (
    <section id="services" aria-labelledby="services-title" className="sparkle relative isolate overflow-hidden bg-[#121c33] py-20 text-[#f5efe3] md:py-32">
      <div className="container-ed relative z-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-[#e6c27a]">What we do</p>
            <h2 id="services-title" className="display mt-5 text-[clamp(2.6rem,6vw,5.5rem)] leading-[1]">
              <MaskLines lines={["One home for your name.", <span key="b" className="hl-on-dark">Looked after.</span>]} />
            </h2>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-snug text-[#f5efe3]/80">
              We build your personal website, set up how you appear online, and look after it for as long as you want. One person, one studio, no packages.
            </p>
          </Reveal>
        </div>

        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {services.map((s, i) => (
            <motion.li
              key={s.title}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="group flex flex-col overflow-hidden border-2 border-[#e6c27a]/55 bg-white/[0.04] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[#e6c27a]"
            >
              <div aria-hidden className="relative h-56 overflow-hidden bg-[radial-gradient(ellipse_at_50%_20%,#2e4163,#17233b_75%)] md:h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/art/myth/cloud-soft.webp" alt="" loading="lazy" draggable={false} className="cloud-feather absolute inset-x-[-12%] bottom-[-10%] w-[124%] opacity-45" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/art/myth/${s.art}.webp`}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="jr-float absolute inset-x-0 bottom-0 mx-auto h-[94%] w-auto max-w-[86%] object-contain object-bottom drop-shadow-[0_18px_18px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ "--fd": `${i * -1.5}s`, "--fa": "6px" } as React.CSSProperties}
                />
                <span className="absolute left-3 top-3 bg-[#e6c27a] px-2.5 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-[#17233b]">{s.n}</span>
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="display text-3xl leading-tight text-[#f3e6c4]">{s.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-snug text-[#f5efe3]/80">{s.line}</p>
                <ul className="mt-4 flex flex-col gap-2 border-t border-[#e6c27a]/25 pt-4 text-sm text-[#f5efe3]/90">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rotate-45 bg-[#e6c27a]" />
                      {it}
                    </li>
                  ))}
                </ul>
                {"marks" in s && (
                  <p aria-hidden className="mt-4 flex items-center gap-3 text-[#e6c27a]">
                    <LinkedinLogo weight="fill" className="size-6" />
                    <GlobeSimple weight="fill" className="size-6" />
                    <Newspaper weight="fill" className="size-6" />
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[#f5efe3]/65">Where people look you up</span>
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>

        <Reveal className="mt-8 md:mt-10">
          <p className="flex items-start gap-4 border-2 border-dashed border-[#e6c27a]/50 p-5 md:items-center md:p-6">
            <ProhibitInset aria-hidden weight="bold" className="mt-0.5 size-7 shrink-0 text-[#e6c27a] md:mt-0" />
            <span className="text-base leading-snug text-[#f5efe3]/90 md:text-lg">
              <strong className="font-semibold text-[#f3e6c4]">What we do not do: social media.</strong> We do not run your accounts, post for you or chase followers. We set up your profile
              and your site, and make everything else point home.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
