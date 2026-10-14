import type { ReactNode } from "react";
import { HeaderScene } from "./atelier/Scenes";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <article className="relative overflow-hidden tone-butter min-h-dvh bg-wash pb-32 pt-36 md:pt-48">
      <HeaderScene variant="clouds" />
      <div className="relative z-10 container-ed">
        <p className="eyebrow text-accent">Legal</p>
        <h1 className="display mt-6 text-6xl md:text-7xl">{title}</h1>
        <p className="mt-6 text-sm text-ink/65">Last updated {updated}</p>
        <div className="mt-14 max-w-2xl space-y-6 text-lg leading-relaxed text-ink/70 [&_h2]:display [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-ink [&_a]:underline">
          {children}
        </div>
      </div>
    </article>
  );
}
