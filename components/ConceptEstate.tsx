import type { Concept } from "@/lib/showcase";

/* A concept site, rendered in its own colours so it reads as the person's site, not RURO's.
   Every part is plain markup driven by `lib/showcase.ts`. */
export function ConceptEstate({ c }: { c: Concept }) {
  const t = c.theme;
  const head = t.serif ? "display" : "font-sans font-semibold tracking-tight";
  const mono = "font-mono text-[0.6875rem] uppercase tracking-[0.14em]";
  return (
    <div style={{ background: t.bg, color: t.ink }}>
      <div className="flex items-center justify-between gap-4 px-6 py-5 md:px-10" style={{ borderBottom: `1px solid ${t.line}` }}>
        <span className={`${mono} font-medium`} style={{ letterSpacing: "0.2em" }}>
          {c.person}
        </span>
        <span className="hidden gap-6 text-sm sm:flex" style={{ color: t.soft }}>
          {["Start here", "Story", "Work", "Proof"].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </span>
      </div>

      <div className="px-6 py-12 md:px-10 md:py-16">
        <p className={mono} style={{ color: t.accent }}>
          {c.roles.join(" · ")}
        </p>
        <p className={`${head} mt-4 text-5xl leading-none md:text-7xl`}>{c.person}</p>
        <p className="mt-5 max-w-2xl text-lg leading-snug md:text-xl" style={{ color: t.soft }}>
          {c.line}
        </p>
      </div>

      <div className="px-6 py-10 md:px-10" style={{ borderTop: `1px solid ${t.line}` }}>
        <p className={mono} style={{ color: t.accent }}>
          Start here
        </p>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {c.startHere.map((s, i) => (
            <li key={s.title} className="p-5" style={{ background: t.wash }}>
              <p className="font-mono text-xs" style={{ color: t.soft }}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className={`${head} mt-3 text-xl leading-tight md:text-2xl`}>{s.title}</p>
              <p className="mt-2 text-sm leading-snug" style={{ color: t.soft }}>
                {s.note}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 px-6 py-10 md:grid-cols-[9rem_1fr] md:px-10" style={{ borderTop: `1px solid ${t.line}` }}>
        <p className={mono} style={{ color: t.accent }}>
          Story
        </p>
        <ol className="grid gap-8 sm:grid-cols-2">
          {c.story.map((s) => (
            <li key={s.title}>
              <p className="font-mono text-xs" style={{ color: t.soft }}>
                {s.year}
              </p>
              <p className={`${head} mt-1 text-xl md:text-2xl`}>{s.title}</p>
              <p className="mt-2 text-sm leading-relaxed md:text-base" style={{ color: t.soft }}>
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid gap-6 px-6 py-10 md:grid-cols-[9rem_1fr] md:px-10" style={{ borderTop: `1px solid ${t.line}` }}>
        <p className={mono} style={{ color: t.accent }}>
          Work
        </p>
        <ul className="flex flex-col">
          {c.work.map((w) => (
            <li key={w.name} className="grid gap-1 py-3 sm:grid-cols-[1fr_auto]" style={{ borderBottom: `1px solid ${t.line}` }}>
              <span>
                <span className="font-semibold">{w.name}</span>
                <span className="block text-sm" style={{ color: t.soft }}>
                  {w.text}
                </span>
              </span>
              <span className="font-mono text-xs sm:pt-1" style={{ color: t.soft }}>
                {w.role}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-6 px-6 py-10 md:grid-cols-[9rem_1fr] md:px-10" style={{ borderTop: `1px solid ${t.line}` }}>
        <p className={mono} style={{ color: t.accent }}>
          Proof
        </p>
        <ul className="grid gap-4 sm:grid-cols-3">
          {c.proof.map((p) => (
            <li key={p.text} className="p-4" style={{ background: t.wash }}>
              <p className={mono} style={{ color: t.accent }}>
                {p.kind}
              </p>
              <p className="mt-2 text-sm leading-snug">{p.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 py-5 font-mono text-xs md:px-10" style={{ borderTop: `1px solid ${t.line}`, color: t.soft }}>
        {c.domain} · concept by RURO
      </div>
    </div>
  );
}
