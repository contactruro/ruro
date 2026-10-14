import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { FinalCta } from "@/components/sections/FinalCta";
import { Faq } from "@/components/sections/Faq";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Process",
  description: "How RURO builds your personal website in four steps, with the days, your time and what you get at each.",
  alternates: { canonical: "/process" },
  openGraph: { title: "Process · RURO", url: "/process" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function ProcessPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHeader
        tone="sky"
        scene="medusa"
        eyebrow="How it works"
        lines={["Every site starts", <span key="b" className="hl">with a conversation.</span>]}
        intro={<p>Your site is built in four steps, from the first call to launch. Each step has its own days, its own part for you, and something you can see at the end of it.</p>}
      />
      <ProcessTimeline />

      <Faq />
      <FinalCta variant="process" />
    </>
  );
}
