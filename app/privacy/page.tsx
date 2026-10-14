import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How RURO handles personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" updated="10 October 2026">
      <p>
        This draft policy describes how RURO handles information on this website. It should be reviewed by legal counsel
        before launch.
      </p>
      <h2>What we collect</h2>
      <p>
        When you submit an enquiry we receive the details you provide: your name, email address, role, company, an
        optional web address and your message. We do not use advertising trackers.
      </p>
      <h2>Measuring the website</h2>
      <p>
        We may count visits and actions on this site (for example which pages are read and which buttons are clicked)
        using cookieless analytics that does not identify you. With your permission only, we may also record anonymised
        visits to see where the site is hard to use; everything typed into forms is hidden from those recordings. You can
        change that choice at any time from the footer.
      </p>
      <h2>How we use it</h2>
      <p>
        We use enquiry details only to reply to you and to prepare for a conversation. We do not sell or share them
        with third parties, except service providers who help us operate the website and receive enquiries.
      </p>
      <h2>Retention and your rights</h2>
      <p>
        You may ask us to access, correct or delete your information at any time by writing to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
