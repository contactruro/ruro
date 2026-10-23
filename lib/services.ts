import { audit, timeline } from "./content";

/* The services RURO offers, one page each. Everything here is taken from what the site already says (the four services on
   the home page and the Online Presence Review). No price and no turnaround is stated unless the studio has set one in
   lib/site.ts, and nothing is promised beyond the process the site already describes. */

export type HeaderScene = "reader" | "laptop" | "laurel" | "flex" | "phone" | "athena" | "walker" | "sun" | "medusa" | "angel";

export type Service = {
  slug: string;
  n: string;
  name: string;
  /** One plain sentence: what it is. */
  line: string;
  /** A fuller description for the page and its search snippet. */
  description: string;
  scene: HeaderScene;
  includes: string[];
  /** Whether the page shows the four-stage process (only the website itself has one). */
  process?: boolean;
  /** What this service is for, in a line. */
  forWho: string;
};

/** The same audience, as a short phrase that reads inside a sentence. */
export const WHO_SHORT = "founders, executives and established professionals, in India and around the world";

export const WHO = "Founders, executives and established professionals, in India and around the world, whose name is searched before every meeting, call and introduction.";

export const services: Service[] = [
  {
    slug: "personal-website",
    n: "01",
    name: "Your website",
    line: "A personal website, written, designed and built around you, at your own address.",
    description:
      "RURO designs, writes and builds a personal website for founders, executives and established professionals: your story written with you, a design made only for you, and a site you can edit, at your own address.",
    scene: "laptop",
    includes: ["Your story, written with you", "A design made only for you", "Built so you can edit it", "Live at your own address, checked on phones, in search and when shared"],
    process: true,
    forWho: "People who want one clear, accurate home online, in their own words, instead of whatever search happens to show.",
  },
  {
    slug: "blog",
    n: "02",
    name: "A blog, on your own site",
    line: "A place for your essays, talks and news, so your ideas live where you own them.",
    description:
      "A blog that lives on your own personal website: your essays, talks and interviews in one place, under your name, and easy to publish to. Built and set up by RURO.",
    scene: "reader",
    includes: ["Essays and notes, under your name", "Talks and interviews in one place", "Easy to publish to"],
    forWho: "People who write or speak publicly and want their work to live on a site they control, not only on someone else's platform.",
  },
  {
    slug: "personal-branding",
    n: "03",
    name: "Personal branding",
    line: "Setting up how you appear online: a clear name, story and photograph, kept consistent where people look you up.",
    description:
      "RURO sets up how you appear online: your profile, one story across every place people look you up, and everything pointing back to your own website. We do not manage social media accounts.",
    scene: "phone",
    includes: ["Your profile, set up properly", "One story across every place", "Everything pointing to your site"],
    forWho: "People whose profiles say different things in different places, or have not been updated in years.",
  },
  {
    slug: "stewardship",
    n: "04",
    name: "Stewardship and upkeep",
    line: "After launch we keep it safe, current and working, so it never goes stale.",
    description:
      "Ongoing care for your personal website after launch: kept secure and running, your news, talks and articles added, and regular checks on how you show up online.",
    scene: "athena",
    includes: ["Kept secure and running", "Your news, talks and articles added", "Regular checks on how you show up"],
    forWho: "People who want their site to stay accurate and up to date without having to manage it themselves.",
  },
  {
    slug: "online-presence-review",
    n: "05",
    name: audit.title,
    line: audit.summary,
    description: `${audit.summary} A good first step if you are not sure what you need.`,
    scene: "medusa",
    includes: audit.includes,
    forWho: "People who want to see where they stand before deciding anything.",
  },
];

/** The four stages of building a website, with the days and what you get, from the process page. */
export const stages = timeline;
