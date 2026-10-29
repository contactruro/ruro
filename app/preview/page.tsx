import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroGreek } from "@/components/sections/HeroGreek";
import { HomeIntro } from "@/components/sections/HomeIntro";
const Statement = dynamic(() => import("@/components/sections/Statement").then((m) => m.Statement));
const Services = dynamic(() => import("@/components/sections/Services").then((m) => m.Services));
const SampleSection = dynamic(() => import("@/components/sections/SampleSection").then((m) => m.SampleSection));
const Engagement = dynamic(() => import("@/components/sections/Engagement").then((m) => m.Engagement));
const Studio = dynamic(() => import("@/components/sections/Studio").then((m) => m.Studio));
const FieldNotes = dynamic(() => import("@/components/sections/FieldNotes").then((m) => m.FieldNotes));
const Faq = dynamic(() => import("@/components/sections/Faq").then((m) => m.Faq));
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then((m) => m.FinalCta));

/* A local preview of the whole home page with the new video hero as its opening: same sections, same order as the
   real home page, only the first screen differs. Not indexed, and nothing else imports it. */
export const metadata: Metadata = { title: "Home preview", robots: { index: false, follow: false } };

export default function Preview() {
  return (
    <>
      <HeroGreek />
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
