/* The owner's portrait, chosen on the server. Put the photograph in public/people/ as owner.jpg (owner.jpeg,
   owner.png or owner.webp also work); the first one that exists is used. Until there is one, the frame shows a
   sculpture instead of a broken image. No script is needed, so it cannot fail to hydrate. */

import fs from "node:fs";
import path from "node:path";
import { artAlt } from "@/lib/altText";

const NAMES = ["owner.jpg", "owner.jpeg", "owner.png", "owner.webp"];

export function OwnerPhoto({ alt }: { alt: string }) {
  const found = NAMES.find((n) => fs.existsSync(path.join(process.cwd(), "public", "people", n)));
  return (
    <div className="relative aspect-square w-full overflow-hidden bg-[#17233b]">
      {found ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img loading="lazy" decoding="async" src={`/people/${found}`} alt={alt} className="size-full object-cover object-[50%_30%]" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img loading="lazy" decoding="async" src="/art/myth/blindfold-bust.webp" alt={artAlt("/art/myth/blindfold-bust.webp")} aria-hidden className="absolute inset-x-0 bottom-0 mx-auto h-[92%] w-auto object-contain drop-shadow-[0_18px_18px_rgba(0,0,0,0.5)]" />
      )}
      <span className="absolute left-3 top-3 bg-[#e6c27a] px-2.5 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-[#17233b]">Founder</span>
    </div>
  );
}
