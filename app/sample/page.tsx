import type { Metadata } from "next";
import { ShowcaseHero } from "@/components/showcase/ShowcaseHero";
import { ShowcaseProcess } from "@/components/showcase/ShowcaseProcess";
import { Showcase } from "@/components/Showcase";
import { EstateLayers } from "@/components/sections/EstateLayers";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Unofficial concept websites for Nikhil Kamath, Sam Altman, James Clear and Paul Graham: how their web presence looks today, a live redesign, and the design reasoning behind every choice. Built from public facts.",
  alternates: { canonical: "/sample" },
  openGraph: { title: "Showcase · RURO", url: "/sample" },
};

export default function SamplePage() {
  return (
    <>
      <ShowcaseHero />
      <div className="bg-paper pb-24 pt-2">
        <Showcase />
      </div>
      <ShowcaseProcess />
      <EstateLayers />
      <FinalCta variant="sample" />
    </>
  );
}
