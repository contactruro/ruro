import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { footerNav, legalNav, site, studio } from "@/lib/site";
import { AnalyticsSettingsButton } from "./Analytics";
import { Wordmark } from "./ui/Wordmark";
import { FooterFigure } from "./FooterFigure";

/* One sculpture per letter of RURO. Swap a file here to change one; keep them out of the sections above. */
const FIGURES = ["/art/myth/laurel.webp", "/art/myth/angel-sketch.webp", "/art/myth/reader.webp", "/art/myth/robot-god.webp"];

/* Crosshair tick at a corner of the plate, like the hero's specimen plate. */
function Tick({ className }: { className: string }) {
  return (
    <span aria-hidden className={`absolute size-3 ${className}`}>
      <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-[#e6c27a]/60" />
      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-[#e6c27a]/60" />
    </span>
  );
}

/* Royal-blue footer, laid out as a specimen plate: the wordmark sits on the plate, each letter labelled by the word
   it stands for and standing under a sculpture of its own. */
export function Footer() {
  const words = site.expansion.split(" ");
  const letters = "RURO".split("");

  return (
    <footer className="sparkle relative isolate overflow-hidden bg-[#121c33] text-[#f5efe3]">
      <div className="container-ed pb-8 pt-20 md:pt-24">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="eyebrow text-[#e6c27a]">Say hello</p>
            <a
              href={`mailto:${site.email}`}
              className="group display mt-5 inline-flex items-center gap-3 text-3xl transition-colors duration-500 hover:text-[#e6c27a] md:text-[2.75rem]"
            >
              {site.email}
              <ArrowUpRight aria-hidden className="size-6 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-7" />
            </a>
            <p className="mt-5 max-w-sm text-[#f5efe3]/75">{site.positioning}</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:col-span-5 md:col-start-8 md:justify-items-end">
            <ul className="flex flex-col gap-3">
              <li className="eyebrow mb-2 text-[#e6c27a]/80">Studio</li>
              {footerNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-[#f5efe3]/85 hover:text-[#f5efe3]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              <li className="eyebrow mb-2 text-[#e6c27a]/80">Legal</li>
              {legalNav.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-[#f5efe3]/85 hover:text-[#f5efe3]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* The plate: RURO, each letter over the word it stands for */}
        <div className="relative mt-20 border-y border-[#e6c27a]/35 md:mt-28">
          <Tick className="-left-1.5 -top-1.5" />
          <Tick className="-right-1.5 -top-1.5" />
          <Tick className="-bottom-1.5 -left-1.5" />
          <Tick className="-bottom-1.5 -right-1.5" />
          <div className="flex items-center justify-between border-b border-[#e6c27a]/35 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-[#f5efe3]/65">
            <span>The name</span>
            <span className="hidden sm:inline">{site.category}</span>
            <span>{site.url.replace(/^https?:\/\//, "")}</span>
          </div>
          <ol className="grid grid-cols-2 sm:grid-cols-4" aria-label={site.expansion}>
            {letters.map((l, i) => (
              <li key={i} className="flex flex-col items-center gap-2 border-[#e6c27a]/35 px-1 pb-6 pt-6 max-sm:odd:border-r max-sm:[&:nth-child(-n+2)]:border-b sm:border-r sm:last:border-r-0 md:gap-4 md:pb-10 md:pt-10">
                <FooterFigure src={FIGURES[i]} index={i} />
                <Wordmark className="text-[clamp(2.75rem,8vw,7rem)] leading-none text-[#f5efe3]">{l}</Wordmark>
                <span className="eyebrow text-[0.625rem] text-[#e6c27a] md:text-xs">{words[i]?.replace(/\.$/, "")}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-6 text-sm text-[#f5efe3]/65 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <p>
              © {new Date().getFullYear()} {studio.legalName ?? "RURO"} · {site.category}
              {studio.city && ` · ${studio.city}`}
            </p>
          </div>
          <p className="flex flex-wrap gap-x-4">
            <span>{site.tagline}</span>
            <AnalyticsSettingsButton className="link-underline text-left" />
          </p>
        </div>
      </div>
    </footer>
  );
}
