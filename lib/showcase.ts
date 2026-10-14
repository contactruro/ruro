/* UNOFFICIAL CONCEPTS: how RURO would build the personal website of someone well known.
   RURO was not commissioned by, and has no connection with, any person named here. Every factual
   statement comes from public sources (the person's own site, their publisher, or widely reported
   history); the structure, writing and design are RURO's own proposal. Keep it that way: add
   nothing here that you cannot source, and re-check a fact before editing it. */

export type Concept = {
  slug: string;
  person: string;
  role: string;
  domain: string;
  url: string;
  /** Colours for the concept site itself, chosen to echo the person's current identity. */
  theme: { bg: string; ink: string; soft: string; line: string; accent: string; wash: string; serif: boolean };
  thesis: string;
  line: string;
  roles: string[];
  startHere: { title: string; note: string }[];
  story: { year: string; title: string; text: string }[];
  work: { name: string; role: string; text: string }[];
  proof: { kind: string; text: string }[];
  kept: string[];
  changed: string[];
  why: { on: string; text: string }[];
  /** How the person's real web presence looks today, shown apart from the redesign. */
  today?: {
    /** Screenshot under /public, if they have a site we could capture. */
    image?: string;
    captured: string;
    /** Label for the browser bar of the screenshot, when it is not simply the person's own site. */
    source?: string;
    /** Short note under the screenshot, e.g. when it shows someone else's site. */
    caption?: string;
    summary: string;
    works: string[];
    gaps: string[];
  };
  /** The look of the redesign at a glance: colours, type, motion and mood. */
  dna?: {
    palette: { hex: string; name: string }[];
    type: string[];
    motion: string[];
    mood: string[];
  };
  /** Portrait for concepts that show one (Wikimedia Commons, freely licensed; credit is shown beside the preview). */
  photo?: { src: string; credit: string; license?: string; href?: string };
  /** Present on the bespoke concepts: which real portfolio inspired the build, and the reasoning. */
  design?: {
    reference?: { name: string; url: string };
    name: string;
    what: string;
    why: { on: string; text: string }[];
    fit: { trait: string; choice: string }[];
  };
};

const all: Concept[] = [
  {
    slug: "nikhil-kamath",
    person: "Nikhil Kamath",
    role: "Co-founder of Zerodha",
    domain: "nikhilkamath.com",
    url: "https://en.wikipedia.org/wiki/Nikhil_Kamath",
    theme: { bg: "#ffffff", ink: "#0b0b0b", soft: "#6b6b6b", line: "#e6e6e6", accent: "#b5491f", wash: "#f6f6f6", serif: false },
    thesis: "He started as a trader. Make it read like a well-kept ledger.",
    line: "Co-founder of Zerodha and True Beacon, host of People by WTF. Left school at 14 and started trading as a teenager.",
    roles: ["Investor", "Co-founder", "Host"],
    startHere: [
      { title: "Zerodha", note: "The stockbroker he co-founded in 2010." },
      { title: "True Beacon", note: "The investment firm he co-founded." },
      { title: "People by WTF", note: "His conversations with founders and thinkers." },
    ],
    story: [
      { year: "Teens", title: "Early start", text: "Left school at 14, worked in a call centre and began trading as a teenager." },
      { year: "2010", title: "Zerodha", text: "Co-founded the stockbroker Zerodha with his brother Nithin." },
      { year: "Then", title: "Rainmatter", text: "Zerodha set up Rainmatter and the Rainmatter Foundation." },
      { year: "Now", title: "People by WTF", text: "Hosts long conversations with founders and thinkers." },
    ],
    work: [
      { name: "Zerodha", role: "Co-founder · 2010–", text: "A stockbroker." },
      { name: "True Beacon", role: "Co-founder", text: "An investment firm." },
      { name: "People by WTF", role: "Host", text: "A conversation series." },
    ],
    proof: [
      { kind: "Recognition", text: "On Forbes’ list of India’s 100 richest, with his brother" },
      { kind: "Companies", text: "Zerodha, True Beacon" },
      { kind: "Media", text: "People by WTF" },
    ],
    kept: ["A founder who speaks plainly", "No pitch, no funnel"],
    changed: ["One clear page for the person, apart from the company"],
    why: [{ on: "Restraint", text: "Nothing on the page is louder than the name." }],
    photo: {
      src: "/people/nikhil-kamath.png",
      credit: "image supplied for this showcase; source and rights to be confirmed before publishing",
    },
    design: {
      name: "The Ledger",
      what:
        "A washed off-white page set like a well-made annual report. The claim comes first, with three plain facts under it and a portrait beside it. A slow line carries the names of what he has built, a timeline draws itself as you scroll to show how it began, and a table of companies opens a short note for each. A recognition band and a waveform for the podcast follow. There are no prices or performance figures anywhere.",
      why: [
        { on: "Why a ledger", text: "He is a trader first, and a trader's calm is a clean record: nothing shouted, everything accounted for. An annual-report look says serious and trustworthy before any text does." },
        { on: "Why off-white and hairlines", text: "Pale paper, thin rules and one deep blue make the page feel considered and expensive, and they let a portrait and a few words carry it." },
        { on: "Why a drawn timeline", text: "Left school at 14, Zerodha in 2010, Rainmatter, People by WTF. Seeing the line draw itself makes a career read as one story in a few seconds." },
        { on: "Why no numbers", text: "Money figures date fast and invite argument. The page shows roles and years only, so nothing on it can be mistaken for data." },
      ],
      fit: [
        { trait: "Trader at heart", choice: "Ledger rules and a live Bengaluru clock with a small sage dot." },
        { trait: "Self-taught early starter", choice: "EARLY START sits in the list as its own symbol: left school at 14, trading by his teens." },
        { trait: "Host, not performer", choice: "People by WTF has its own on-air band, because his job there is to listen." },
        { trait: "Builder of many things", choice: "One list holds a wide portfolio, and the selected row explains it in a sentence." },
      ],
    },
  },
  {
    slug: "sam-altman",
    person: "Sam Altman",
    role: "CEO of OpenAI",
    domain: "blog.samaltman.com",
    url: "https://blog.samaltman.com",
    theme: { bg: "#f5f3ee", ink: "#1a1a18", soft: "#6a675f", line: "#dedad0", accent: "#3b6b4a", wash: "#ebe8e0", serif: false },
    thesis: "One calm sentence. Then get out of the way.",
    line: "CEO of OpenAI. Former president of Y Combinator. Co-founded Loopt at nineteen. Writes essays about technology and what comes next.",
    roles: ["Builder", "Investor", "Writer"],
    startHere: [
      { title: "The Intelligence Age", note: "A 2024 essay." },
      { title: "Moore’s Law for Everything", note: "A 2021 essay." },
      { title: "How To Be Successful", note: "A 2019 essay." },
    ],
    story: [
      { year: "2005", title: "Loopt", text: "Left Stanford to co-found Loopt, a location-sharing app later acquired by Green Dot." },
      { year: "2014", title: "Y Combinator", text: "Became president of Y Combinator." },
      { year: "2015", title: "OpenAI", text: "Co-founded OpenAI, and became its CEO in 2019." },
      { year: "Now", title: "The essays", text: "Writes essays on his blog about technology and society." },
    ],
    work: [
      { name: "OpenAI", role: "CEO · 2019–", text: "An AI research and products company." },
      { name: "Y Combinator", role: "President · 2014–2019", text: "A startup accelerator." },
      { name: "Loopt", role: "Co-founder · 2005–2012", text: "A location-sharing app." },
    ],
    proof: [
      { kind: "Writing", text: "blog.samaltman.com" },
      { kind: "Company", text: "OpenAI" },
      { kind: "Before", text: "Y Combinator, Loopt" },
    ],
    kept: ["A plain-text blog, nothing decorative", "His essays as the centre"],
    changed: ["A one-sentence front door, with his portrait as a small inline detail"],
    why: [{ on: "Restraint", text: "The page should feel as unhurried as the writing." }],
    photo: {
      src: "/people/sam-altman.jpg",
      credit: "TechCrunch",
      license: "CC BY 2.0",
      href: "https://commons.wikimedia.org/wiki/File:Sam_Altman_CropEdit_James_Tamim.jpg",
    },
    design: {
      reference: { name: "Parth Jha’s portfolio", url: "https://parosayshi.com/" },
      name: "The Quiet Sentence",
      what:
        "A warm off-white page where leaf-shadows drift slowly behind a single sentence. Key words sit in soft pills, his portrait is a small thumbnail inside the sentence, the work is a short resume, and the page ends in a hand-signed note.",
      why: [
        { on: "Why one sentence", text: "He runs one of the most talked-about companies in the world, and every page about him is loud. The strongest move is one sentence he could say aloud." },
        { on: "Why moving shadows", text: "A static page feels like a document. Light moving through leaves is a living, analogue detail that offsets all the software and signals calm, the one thing a person at the centre of AI news cannot buy." },
        { on: "Why pills", text: "The highlighted words are the ideas he is known for. Each is clickable in the real build, so a reader chooses depth instead of being given it." },
        { on: "Why a signature", text: "A real signature is the clearest ‘a person made this’ mark there is, which matters on the site of the person most associated with machines." },
      ],
      fit: [
        { trait: "Essayist first", choice: "Writing is the main section, set as quiet cards, never a feed." },
        { trait: "Founder of several things", choice: "The resume is three lines. His career fits in a breath." },
        { trait: "Future-minded", choice: "Slow motion and warm paper: a human frame around a technological subject." },
        { trait: "Plain blog habit", choice: "No nav, no hero image: he already believes the text is enough." },
      ],
    },
  },
  {
    slug: "paul-graham",
    person: "Paul Graham",
    role: "Co-founder of Y Combinator",
    domain: "paulgraham.com",
    url: "https://www.paulgraham.com",
    theme: { bg: "#ffffff", ink: "#121212", soft: "#545454", line: "#d9d9d9", accent: "#5a5fb0", wash: "#f0f0f8", serif: true },
    thesis: "Keep it plain. Show readers where to start.",
    line: "Co-founder of Y Combinator. Programmer and essayist, writing about startups, programming and how to do great work.",
    roles: ["Essayist", "Programmer", "Investor"],
    startHere: [
      { title: "How to Do Great Work", note: "An essay on doing work that matters." },
      { title: "Do Things That Don’t Scale", note: "An essay on how startups begin." },
      { title: "Maker’s Schedule, Manager’s Schedule", note: "An essay on how different jobs use time." },
    ],
    story: [
      { year: "1995", title: "Viaweb", text: "Co-founded Viaweb, one of the first companies to build web applications." },
      { year: "1998", title: "Yahoo", text: "Viaweb was acquired by Yahoo and became Yahoo Store." },
      { year: "2005", title: "Y Combinator", text: "Co-founded Y Combinator with Jessica Livingston, Robert Morris and Trevor Blackwell." },
      { year: "Now", title: "The essays", text: "Writes essays that have grown into a body of more than two hundred and twenty." },
    ],
    work: [
      { name: "Y Combinator", role: "Co-founder · 2005", text: "A startup investor and accelerator." },
      { name: "Viaweb", role: "Co-founder · 1995–1998", text: "Early web application company, acquired by Yahoo." },
      { name: "Arc and Bel", role: "Language designer", text: "Dialects of Lisp." },
    ],
    proof: [
      { kind: "Book", text: "Hackers & Painters" },
      { kind: "Book", text: "On Lisp" },
      { kind: "Book", text: "ANSI Common Lisp" },
    ],
    kept: ["The plain, fast, text-first page", "His voice, unedited", "Essays as the centre of everything"],
    changed: [
      "A start-here page, so a new reader does not face two hundred essays cold",
      "Essays grouped by theme as well as by date",
      "A short, sourced biography with the story in order",
      "One quiet line to follow new essays",
    ],
    why: [
      { on: "The way in", text: "The archive is the asset, but an archive is a poor first impression. Three chosen essays turn a stranger into a reader." },
      { on: "Restraint", text: "Nothing decorative is added. The structure does the work, and the writing stays the loudest thing on the page." },
    ],
    photo: {
      src: "/people/paul-graham.jpg",
      credit: "TechCrunch",
      license: "CC BY 2.0",
      href: "https://commons.wikimedia.org/wiki/File:Paul_Graham_TechCrunch_Disrupt_New_York_May_2011.jpg",
    },
    design: {
      reference: { name: "Modeera Fatima’s portfolio, and the Wall of Portfolios", url: "https://modeera.framer.website/" },
      name: "The Essay Machine",
      what:
        "A reading room: paper white, a book serif and one indigo. His name sits large with one italic word. The centre offers a random essay from his real index to start from. Below are three hairline shelves of essays by topic, a four-stop timeline that draws itself as you arrive, and his three books standing on a shelf, spines that slide out when you hover.",
      why: [
        { on: "Why a chooser", text: "He has written more than two hundred essays, and a list is the worst way in. One button that lands on an essay turns 'where do I start?' into a first step, which is how curiosity actually works." },
        { on: "Why hairline shelves", text: "His real site is a bare page of grey-lavender buttons. Three plain columns, one per topic, give a new reader a map in a second without adding any decoration." },
        { on: "Why a serif and one indigo", text: "A book serif on paper white says writing first. One indigo carries the links and the italic, so the page looks considered while the words stay the point." },
        { on: "Why a timeline", text: "Readers trust a writer more when they know where he comes from. Four dated beats, drawn as you arrive, give the essays a person behind them." },
      ],
      fit: [
        { trait: "Plain-speaking", choice: "Titles are his own, descriptions are short, and nothing is renamed or dressed up." },
        { trait: "Curious by nature", choice: "The machine rewards wandering. It is the page's one toy, and it is about reading." },
        { trait: "Programmer", choice: "A lambda for a logo, a Lisp-flavoured set of books, and a tidy three-shelf structure." },
        { trait: "Starts with ideas, not branding", choice: "One indigo on one word. Everything else is quiet." },
      ],
    },
  },
  {
    slug: "james-clear",
    person: "James Clear",
    role: "Author of Atomic Habits",
    domain: "jamesclear.com",
    url: "https://jamesclear.com",
    theme: { bg: "#faf9f5", ink: "#1d1b16", soft: "#5a574d", line: "#dedad0", accent: "#8a6708", wash: "#f3efe0", serif: true },
    thesis: "Keep it calm. Add the depth.",
    line: "Author of Atomic Habits. Writes about habits, decision making and continuous improvement.",
    roles: ["Author", "Writer", "Speaker"],
    startHere: [
      { title: "Atomic Habits", note: "The book, and the first chapter free." },
      { title: "3-2-1 Thursday", note: "The weekly newsletter." },
      { title: "Articles", note: "Essays on habits and decisions." },
    ],
    story: [
      { year: "2018", title: "Atomic Habits", text: "Published Atomic Habits, which became a number one New York Times bestseller." },
      { year: "Weekly", title: "3-2-1 Thursday", text: "A short weekly email that his site says reaches more than three million people." },
      { year: "Always", title: "The articles", text: "Essays on habits, decision making and improving a little each day." },
      { year: "Now", title: "The work", text: "Books, articles, a newsletter and speaking, all in one place." },
    ],
    work: [
      { name: "Atomic Habits", role: "Author · 2018", text: "A book on building good habits and breaking bad ones." },
      { name: "3-2-1 Thursday", role: "Writer", text: "A weekly newsletter." },
      { name: "Articles", role: "Writer", text: "Essays on habits and decision making." },
    ],
    proof: [
      { kind: "Book", text: "A number one New York Times bestseller" },
      { kind: "Newsletter", text: "More than three million readers, per his site" },
      { kind: "Format", text: "One book, one newsletter, one clear action" },
    ],
    kept: ["The calm, ivory page", "One book, one invitation", "The weekly rhythm of 3-2-1 Thursday"],
    changed: [
      "A start-here page for readers who have not read the book",
      "The newsletter archive organised by topic, not only by date",
      "A short timeline of the work, with sources",
      "Speaking on its own page with a plain enquiry route",
    ],
    why: [
      { on: "One action", text: "His homepage already does the hardest thing: it asks for one thing. We protect that and build the depth behind it." },
      { on: "Warmth", text: "The ivory ground and gold are the brand. We keep them exactly and add structure underneath." },
    ],
    photo: {
      src: "/people/james-clear.jpg",
      credit: "James Clear",
      license: "CC BY-SA 4.0",
      href: "https://commons.wikimedia.org/wiki/File:James_Clear_in_2010.jpg",
    },
    design: {
      reference: { name: "Karthik M’s portfolio, and the Wall of Portfolios", url: "https://www.dizkarthik.com/" },
      name: "The Habit Studio",
      what:
        "A calm ivory page set like a well-made book: the claim first, with his portrait beside it. A habit-stack card lets the visitor write their own 'After I..., I will...' line and tick twenty-one days while the 1% curve draws itself. The four laws sit like a contents page, a quiet preview of 3-2-1 Thursday shows what arrives, and four plain numbers close it. One gold, no gradients, no confetti.",
      why: [
        { on: "Why try-it-yourself", text: "His whole subject is a small daily act. A visitor who writes a habit and ticks a day has felt the book's core idea in ten seconds, which no paragraph about it can do." },
        { on: "Why a contents page for the laws", text: "Four numbered ideas in hairline columns read like the front of a book, so a reader can find 'attractive' or 'easy' again at a glance, and the page feels like his writing: ordered and unhurried." },
        { on: "Why show the email", text: "3-2-1 Thursday is his product. Setting the email out as three ideas, two quotes and one question sells it better than describing it." },
        { on: "Why one gold", text: "His real site is calm ivory and gold. We kept exactly that and added structure underneath, so it looks more considered, not busier." },
      ],
      fit: [
        { trait: "Systems over goals", choice: "The first thing on the page is a system you build, not a slogan." },
        { trait: "Calm, steady", choice: "Hairline rules, one gold, a curve that draws once and a few gentle reveals. Nothing flashes." },
        { trait: "Weekly rhythm", choice: "A Thursday label under the headline and a set-out inbox card keep the schedule visible." },
        { trait: "Small wins", choice: "Ticking a day fills its square in gold and moves the marker on the curve, which is his 'make it satisfying' law in practice." },
      ],
    },
  },
];

/* How each person's presence looks today. Screenshots are of their own public sites (see /public/today
   and /public/studies); the notes describe what is visible on them and are RURO's own reading. */
const todays: Record<string, NonNullable<Concept["today"]>> = {
  "nikhil-kamath": {
    image: "/studies/nithin-kamath.jpg",
    captured: "8 October 2026",
    source: "nithinkamath.me · his brother’s site",
    caption:
      "About this screenshot: Nikhil has no personal site of his own that we could find. This is his brother Nithin’s personal homepage, the family’s one existing personal site, shown as the closest thing there is today.",
    summary:
      "A plain personal homepage: a round black-and-white portrait, the name Nithin Kamath, the tagline “Musings on finance, business, and life”, and a first-person introduction. Nikhil appears only as a passing mention in a line about family.",
    works: ["Speaks in a human, first-person voice", "No pitch, and a candid guitar photo that makes the founder a person"],
    gaps: [
      "The page is about Nithin, Zerodha and Rainmatter; Nikhil’s own work is not on it",
      "Nothing about True Beacon or People by WTF",
      "Nikhil has no page of his own to send a reader to",
    ],
  },
  "sam-altman": {
    image: "/today/sam-altman.jpg",
    captured: "12 October 2026",
    summary:
      "A plain blog on a hosted blogging service: his name in a serif header, a sidebar with subscribe and follow buttons, search, and a month-by-month archive. The newest post sits straight on the front page.",
    works: ["Fast and readable, with the essays as the whole point", "One clear way to subscribe, one to follow"],
    gaps: [
      "A first-time visitor sees the latest post, not who he is or where to start",
      "The best-known essays sit in a date list with no order of importance",
      "Nothing about his work beyond the writing itself",
    ],
  },
  "james-clear": {
    image: "/studies/james-clear.jpg",
    captured: "8 October 2026",
    summary: "A calm, warm, centred page: a two-line headline about habits, the book with sample pages fanned behind it, a gold seal for copies sold and one invitation to take the first chapter.",
    works: ["One promise, one object, one action", "Warm ivory and gold already feel like him"],
    gaps: ["A reader who has not read the book has no path through the ideas", "The newsletter and articles are listed, not shown"],
  },
  "paul-graham": {
    image: "/studies/paul-graham.jpg",
    captured: "8 October 2026",
    summary: "A deliberately bare page: lavender-grey buttons down the left, one photograph, and a strip pointing to the newest essays.",
    works: ["Loads almost instantly", "Nothing distracts from the writing"],
    gaps: ["With more than two hundred essays, a new reader has no starting point", "No short biography on the page itself"],
  },
};

/* The design DNA of each bespoke concept, read straight from its stylesheet (components/concepts/concepts.css). */
const dnas: Record<string, NonNullable<Concept["dna"]>> = {
  "nikhil-kamath": {
    palette: [
      { hex: "#f6f4ef", name: "Washed off-white" },
      { hex: "#15171c", name: "Ledger ink" },
      { hex: "#2b4c8c", name: "Report blue" },
      { hex: "#4a7c5f", name: "Sage" },
    ],
    type: ["Geist", "Geist Mono"],
    motion: ["Drawn timeline", "Slow company line", "On-air waveform"],
    mood: ["Precise", "Calm", "Credible"],
  },
  "sam-altman": {
    palette: [
      { hex: "#f5f3ee", name: "Warm paper" },
      { hex: "#1a1a18", name: "Ink" },
      { hex: "#3b6b4a", name: "Moss" },
      { hex: "#5d5a52", name: "Shadow grey" },
    ],
    type: ["Geist", "Caveat (signature)"],
    motion: ["Drifting light", "Pill reveal", "Signature draw"],
    mood: ["Calm", "Warm", "Quiet"],
  },
  "james-clear": {
    palette: [
      { hex: "#faf8f2", name: "Ivory" },
      { hex: "#1d1b16", name: "Ink" },
      { hex: "#8a6a1f", name: "Book gold" },
      { hex: "#f1e8cf", name: "Pale gold" },
    ],
    type: ["Fraunces", "Geist"],
    motion: ["Drawing 1% curve", "Gold tick", "Quiet reveals"],
    mood: ["Warm", "Calm", "Considered"],
  },
  "paul-graham": {
    palette: [
      { hex: "#fbfaf7", name: "Paper" },
      { hex: "#17181c", name: "Ink" },
      { hex: "#4a4f9c", name: "Indigo" },
      { hex: "#ebecf7", name: "Pale indigo" },
    ],
    type: ["Fraunces", "Geist"],
    motion: ["Essay chooser", "Drawn timeline", "Sliding book spines"],
    mood: ["Plain", "Literary", "Curious"],
  },
};

/* Display order: the four bespoke builds first, led by Nikhil Kamath. */
const order = ["nikhil-kamath", "sam-altman", "james-clear", "paul-graham"];
const rank = (c: Concept) => {
  const i = order.indexOf(c.slug);
  return i === -1 ? order.length : i;
};
export const concepts: Concept[] = [...all].map((c) => ({ ...c, today: todays[c.slug], dna: dnas[c.slug] })).sort((a, b) => rank(a) - rank(b));
