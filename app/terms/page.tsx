import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Terms",
  description:
    "The terms that apply when you use the RURO website at ruro.in, send an enquiry, or follow links from our pages to other sites.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="7 October 2026">
      <p>
        These draft terms govern use of this website. They should be reviewed by legal counsel before launch. Engagements
        with RURO are governed by a separate written agreement.
      </p>
      <h2>Content</h2>
      <p>
        The text, design and code of this website belong to RURO. The websites shown under “Estates we study” belong to
        their owners; RURO did not build them and is not affiliated with the people named.
      </p>
      <h2>No advice</h2>
      <p>Essays in the Journal are opinion and general information, not professional advice.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
