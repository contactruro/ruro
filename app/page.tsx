import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { pageMeta } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { StoryScrub } from "@/components/sections/StoryScrub";
import { HomeIntro } from "@/components/sections/HomeIntro";
const Statement = dynamic(() => import("@/components/sections/Statement").then((m) => m.Statement));
const Services = dynamic(() => import("@/components/sections/Services").then((m) => m.Services));
const SampleSection = dynamic(() => import("@/components/sections/SampleSection").then((m) => m.SampleSection));
const Engagement = dynamic(() => import("@/components/sections/Engagement").then((m) => m.Engagement));
const Studio = dynamic(() => import("@/components/sections/Studio").then((m) => m.Studio));
const FieldNotes = dynamic(() => import("@/components/sections/FieldNotes").then((m) => m.FieldNotes));
const Faq = dynamic(() => import("@/components/sections/Faq").then((m) => m.Faq));
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then((m) => m.FinalCta));

/* Everything below the first screen is split into its own chunk. The server still sends its full HTML (crawlers and
   readers see it at once), but the browser wakes it up in small pieces instead of one long block of work.
   Ordered the way a buyer decides: what it is, why it matters, what we do, what I would get, how it works
   and what it costs, who does it, proof of taste, questions, the ask. */
export const metadata: Metadata = {
  ...pageMeta({
    title: "RURO — Digital Identity Studio for Founders & Professionals",
    description:
      "RURO is a digital identity studio. We design, write, build and maintain personal websites for founders, executives and established professionals in India and worldwide.",
    path: "/",
  }),
  title: { absolute: "RURO — Digital Identity Studio for Founders & Professionals" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <StoryScrub />
      <HomeIntro />
      <Statement />
      <Services />
      <SampleSection />
      <Engagement />
      <Studio />
      <FieldNotes />
      <Faq kicker="05 · Questions" />
      <FinalCta />
    </>
  );
}
