import { StatueScene } from "@/components/atelier/StatueScene";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-dvh items-center pt-24">
      <div className="container-ed grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow text-accent">Error 404</p>
          <h1 className="display mt-6 text-5xl md:text-6xl xl:text-7xl">
            This page
            <br />
            <span className="hl">has moved on.</span>
          </h1>
          <p className="dek mt-8 max-w-md text-xl text-ink/75 md:text-2xl">The page you were looking for has moved, or never existed.</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" size="lg">
              Return home
            </Button>
            <Button href="/contact" size="lg" variant="outline">
              Start a conversation
            </Button>
          </div>
        </div>
        <div className="flex lg:col-span-5 lg:justify-end">
          <div className="w-full max-w-xl"><StatueScene /></div>
        </div>
      </div>
    </section>
  );
}
