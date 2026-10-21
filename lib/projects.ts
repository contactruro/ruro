/* Client projects RURO has built, shown with each client's permission. Everything stated here comes from the
   founder's own account of the work, from the live sites themselves, or from a measurement that is dated below.
   Nothing is estimated: if a result cannot be shown, it is left out.

   The speed figures are single Lighthouse runs (Chrome, lab conditions) taken on 21 October 2026. "Mobile" is
   Lighthouse's standard simulation: a mid-range phone on a slow 4G connection. They describe that run, not every visitor. */

export type Project = {
  slug: string;
  name: string;
  /** The person at the client, and who they are. */
  owner: string;
  kind: string;
  domain: string;
  url: string;
  image: string;
  imageAlt: string;
  /** One line: the problem we faced, and how we solved it. Shown beside the preview on the Projects page. */
  problem: string;
  solved: string;
  /** What RURO did, in a line. */
  role: string;
  /** How long it took. */
  timeline: string;
  summary: string;
  lesson: string;
  brief: string[];
  approach: { label: string; text: string }[];
  delivered: string[];
  results: { value: string; label: string; note?: string }[];
  /** Said once under the results, so nobody mistakes what they are. */
  resultNote: string;
  /** Short lines quoted, with permission, from the client's own site. */
  quotes?: string[];
  permission: string;
};

const MEASURED = "Lighthouse, one run, 21 October 2026";

export const projects: Project[] = [
  {
    slug: "keshav-home-interiors",
    name: "Keshav Home Interiors",
    owner: "Manimozhi Pandian, founder",
    kind: "Interior design studio, Chennai",
    domain: "keshavhome.in",
    url: "https://www.keshavhome.in/",
    image: "/projects/keshav-home-interiors.jpg",
    imageAlt: "The homepage of keshavhome.in, showing a featured kitchen project with caged pendant lights",
    problem: "A photo-heavy site had to feel rich, and still open fast.",
    solved: "We optimised every image, built the pages with an AI agent, and shaped the look around her taste, learned in one call.",
    role: "End to end: design, build and launch",
    timeline: "One week, from onboarding to launch",
    summary: "A website for a Chennai interior design studio, built to sell through its photography and still open quickly.",
    lesson: "A site full of photography that still opens fast, designed around the founder’s own taste, learned in a single call.",
    brief: [
      "Keshav Home Interiors designs and builds complete home interiors in Chennai, from the first consultation to the final handover. Its work is visual: kitchens, wardrobes, living rooms and boutique fit-outs, each judged by how it looks.",
      "The studio needed a website that showed that work richly, with many project images and video, and that still opened quickly. Photography is heavy, and a slow page loses the people it is meant to impress.",
    ],
    approach: [
      { label: "One call", text: "We had a single conversation to understand the founder’s taste. We asked for her references, asked what she likes in design, and learned how she approaches her own clients." },
      { label: "Her taste", text: "What we heard became the direction: a calm, image-led site with quiet type, so the photographs do the talking." },
      { label: "Speed", text: "Every image was optimised for size, and an AI agent was used in the build to render the pages, so the photography does not slow the site down." },
    ],
    delivered: [
      "A complete studio website: story, featured projects, services, process, materials and craft, reviews, and a booking route for consultations.",
      "Project photography arranged so each home is the focus, with the detail close by.",
      "A light first load, with the heavier imagery kept out of the way until it is needed.",
      "Design, build and launch handled end to end, in one week from onboarding to the site going live.",
    ],
    results: [
      { value: "99", label: "Performance score, desktop", note: MEASURED },
      { value: "0.8 s", label: "Main content visible, desktop", note: `Largest Contentful Paint. ${MEASURED}` },
      { value: "94", label: "Performance score, mobile", note: `Simulated slow 4G. ${MEASURED}` },
      { value: "0", label: "Layout shift", note: "Nothing jumps as the page loads" },
      { value: "1 week", label: "Onboarding to launch" },
    ],
    resultNote:
      "These are measurements of the live site, not promises. The studio’s own figures on its site (more than 400 projects and 100 clients) are its own and are not verified by RURO.",
    permission: "Shown with the permission of Manimozhi Pandian. The site and its photographs belong to Keshav Home Interiors.",
  },
  {
    slug: "steven-bennett",
    name: "Steven Bennett",
    owner: "Steven Bennett, deep tech investor",
    kind: "Personal website and private blog",
    domain: "stevenbennett.in",
    url: "https://www.stevenbennett.in/",
    image: "/projects/steven-bennett.jpg",
    imageAlt: "The homepage of stevenbennett.in: the line “Building future with brightest of minds.” set in large type on a plain background",
    problem: "No filler allowed: every word had to carry his value, with no pictures to lean on, plus a blog only he controls.",
    solved: "We wrote every line with him over several revisions, let type replace imagery, and built a Medium-style blog with a private admin area.",
    role: "End to end: copywriting, design, build and launch",
    timeline: "About a week and a half of writing, then three days to build",
    summary: "A minimal, type-only personal website where every word has to carry the value of his presence, with a blog only he can manage.",
    lesson: "No pictures, no filler. The words are the design.",
    brief: [
      "Steven Bennett is a deep tech investor and startup builder. He wanted a very small, very quiet website in which every word earns its place and nothing is there to fill space.",
      "He also wanted a blog of his own, with a private way in that only he uses. And he asked for a design led by typography, with no decorative visuals, taking his inspiration from Bill Gates’s personal website.",
    ],
    approach: [
      { label: "The words first", text: "The writing came before the design. It was written personally, then approved by him, and went through several rounds of revision in writing until each line did a job." },
      { label: "No filler", text: "Every section answers one question about his presence: who he is, how he got here, what he backs, and what he believes. Anything that did not, was cut." },
      { label: "Type as the design", text: "Large, confident type and generous space replace imagery. The page is carried by Space Grotesk for display and Inter for text." },
    ],
    delivered: [
      "A single-page website: About, Journey, Focus, Philosophy and Contact, in a few well-chosen sections.",
      "Every line of copy, written, revised and approved with him.",
      "A blog in the style of Medium, built to be more capable, with a private admin area that only he uses.",
      "Writing, design and build handled end to end: about a week and a half of copywriting, then three days to build.",
    ],
    results: [
      { value: "97", label: "Performance score, desktop", note: MEASURED },
      { value: "92", label: "Performance score, mobile", note: `Simulated slow 4G. ${MEASURED}` },
      { value: "100", label: "Accessibility, best practices and SEO", note: `All three, on desktop and mobile. ${MEASURED}` },
      { value: "466 KB", label: "Total page weight", note: "A small, quick page" },
      { value: "3 days", label: "To build, after the copy was approved" },
    ],
    resultNote: "These are measurements of the live site, not promises. His career figures on the site are his own and are not verified by RURO.",
    quotes: ["Own the hard layer.", "Operate, don’t spectate.", "Compound relentlessly."],
    permission: "Shown with the permission of Steven Bennett. The site and its words belong to him.",
  },
];
