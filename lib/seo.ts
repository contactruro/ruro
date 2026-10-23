import type { Metadata } from "next";
import { site, socials } from "./site";
import { services } from "./services";

/* One place for the metadata and structured data every page shares, so titles, canonicals, share cards and JSON-LD
   always agree. Nothing here is shown on the page: it only describes it to search engines and share previews.
   Only verified facts are stated. There is deliberately no postal address, phone number, social profile, rating
   or review: none has been supplied, and none is invented. Add them here once they are confirmed. */

export const founder = {
  /** As supplied by the founder. */
  name: "Aarupadaiyar KJ.",
  jobTitle: "Founder of RURO",
};

/* Search engines show about 155 characters of a description and ask for at least 70. This keeps every page inside that range:
   a longer one is cut back to its last whole sentence (or word), and a very short one gets a closing line. */
const DESC_MAX = 155;
const DESC_MIN = 70;
export function fitDescription(text: string): string {
  let d = text.replace(/\s+/g, " ").trim();
  if (d.length > DESC_MAX) {
    const cut = d.slice(0, DESC_MAX);
    const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "), cut.endsWith(".") ? DESC_MAX - 1 : -1);
    if (stop >= DESC_MIN - 1) d = cut.slice(0, stop + 1);
    else d = cut.slice(0, cut.lastIndexOf(" ")).replace(/[,:;\s]+$/, "") + "…";
  }
  if (d.length < DESC_MIN) d = `${d} Read more from RURO.`;
  return d;
}

/* The site's share card (app/opengraph-image.jpg): Athena before the golden sun, with what RURO does and what makes it different.
   A page that has no picture of its own (every page except the case studies and studies) shares this one. */
const SHARE_CARD = {
  url: "/opengraph-image.jpg",
  width: 1200,
  height: 630,
  alt: "RURO: Your only digital house that tells your story in your way. A marble statue of Athena stands before a golden sun.",
};

/** Page metadata with its canonical address, share card and Twitter card kept consistent. */
export function pageMeta(raw: { title: string; description: string; path: string; type?: "website" | "article"; publishedTime?: string; noindex?: boolean; image?: { url: string; width: number; height: number; alt: string } }): Metadata {
  const o = { ...raw, description: fitDescription(raw.description), image: raw.image ?? SHARE_CARD };
  return {
    // Pages that exist for readers but should not compete in search results (the legal pages) say so here.
    ...(o.noindex ? { robots: { index: false, follow: true } } : {}),
    title: o.title,
    description: o.description,
    alternates: { canonical: o.path },
    openGraph: {
      type: o.type ?? "website",
      siteName: "RURO",
      locale: "en_IN",
      url: o.path,
      title: `${o.title} · RURO`,
      description: o.description,
      ...(o.publishedTime ? { publishedTime: o.publishedTime } : {}),
      images: [o.image],
    },
    twitter: { card: "summary_large_image", title: `${o.title} · RURO`, description: o.description, images: [o.image.url] },
  };
}

const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;
const founderId = `${site.url}/about#founder`;

/** Organization, WebSite and the founder, as one linked graph, for the whole site. */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": orgId,
      name: "RURO",
      alternateName: ["RURO Digital Identity Studio", "Reputation. Uniquely. Represented. Online."],
      url: site.url,
      slogan: site.tagline,
      description: site.description,
      email: site.email,
      contactPoint: { "@type": "ContactPoint", contactType: "customer support", email: site.email, availableLanguage: "English" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "RURO services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.line, url: `${site.url}/services/${s.slug}` },
        })),
      },
      logo: { "@type": "ImageObject", url: `${site.url}/logo.png`, width: 1024, height: 1024 },
      image: `${site.url}/logo.png`,
      founder: { "@id": founderId },
      sameAs: socials.map((s) => s.href),
      serviceType: ["Digital identity", "Personal website design", "Digital estate stewardship"],
      areaServed: "Worldwide",
      knowsAbout: ["Digital identity", "Online reputation", "Personal websites for founders and executives"],
    },
    {
      "@type": "WebSite",
      "@id": siteId,
      url: site.url,
      name: "RURO",
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": orgId },
    },
    {
      "@type": "Person",
      "@id": founderId,
      name: founder.name,
      jobTitle: founder.jobTitle,
      url: `${site.url}/about`,
      sameAs: ["https://www.linkedin.com/in/aarupadaiyarkj/"],
      worksFor: { "@id": orgId },
    },
  ],
};

/** A breadcrumb trail for pages that sit under a section (Home > Section > Page). */
export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path === "/" ? "" : t.path}`,
    })),
  };
}
