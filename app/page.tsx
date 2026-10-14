import { Hero } from "@/components/sections/Hero";
import { StoryScrub } from "@/components/sections/StoryScrub";
import { HomeIntro } from "@/components/sections/HomeIntro";
import { Statement } from "@/components/sections/Statement";
import { Services } from "@/components/sections/Services";
import { SampleSection } from "@/components/sections/SampleSection";
import { Engagement } from "@/components/sections/Engagement";
import { Studio } from "@/components/sections/Studio";
import { FieldNotes } from "@/components/sections/FieldNotes";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

/* Ordered the way a buyer decides: what it is, why it matters, what we do, what I would get, how it works
   and what it costs, who does it, proof of taste, questions, the ask. */
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
