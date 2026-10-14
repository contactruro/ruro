"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-dvh items-center pt-24">
      <div className="container-ed">
        <p className="eyebrow text-accent">Something went wrong</p>
        <h1 className="display mt-6 text-6xl md:text-7xl">This page could not load.</h1>
        <p className="mt-6 max-w-md text-xl text-ink/70">Please try again. If it keeps happening, return home and we will take it from there.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-14 items-center tone-peach rounded-full bg-pop px-6 text-base font-semibold text-ink shadow-[0_14px_28px_-14px_rgba(20,22,43,0.5)] ring-1 ring-white/80 transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Try again
          </button>
          <Link href="/" className="inline-flex h-14 items-center rounded-none border border-ink px-6 text-base font-semibold">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
