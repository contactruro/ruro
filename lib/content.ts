/* All editorial content lives here so real case studies, essays and copy
   can replace drafts without touching components. */

export type Tone = "oxblood" | "bottle" | "saffron" | "terracotta" | "ink-blue" | "rose";

/* The six old tone names now stand for pastel hues. `cls` scopes a section to the hue (so its accent follows),
   `wash` is the soft background and `bg` the stronger fill. */
export const toneClasses: Record<Tone, { bg: string; wash: string; cls: string; text: string; soft: string; accent: string }> = {
  oxblood: { bg: "bg-peach-pop", wash: "bg-peach", cls: "tone-peach", text: "text-ink", soft: "text-ink/70", accent: "text-accent" },
  bottle: { bg: "bg-mint-pop", wash: "bg-mint", cls: "tone-mint", text: "text-ink", soft: "text-ink/70", accent: "text-accent" },
  saffron: { bg: "bg-butter-pop", wash: "bg-butter", cls: "tone-butter", text: "text-ink", soft: "text-ink/70", accent: "text-accent" },
  terracotta: { bg: "bg-rose-pop", wash: "bg-rose", cls: "tone-rose", text: "text-ink", soft: "text-ink/70", accent: "text-accent" },
  "ink-blue": { bg: "bg-sky-pop", wash: "bg-sky", cls: "tone-sky", text: "text-ink", soft: "text-ink/70", accent: "text-accent" },
  rose: { bg: "bg-lilac-pop", wash: "bg-lilac", cls: "tone-lilac", text: "text-ink", soft: "text-ink/70", accent: "text-accent" },
};

export const layers = [
  {
    n: "01",
    title: "Identity",
    line: "Who you are, in one clear line.",
    body: "One sentence that says who you are and what you do. It is the first thing anyone should learn about you.",
    tone: "oxblood" as Tone,
  },
  {
    n: "02",
    title: "Story",
    line: "How you got here.",
    body: "Where you started, what you chose, and what you built. Written with you, like a good magazine profile, not a CV.",
    tone: "bottle" as Tone,
  },
  {
    n: "03",
    title: "Work",
    line: "What you have built.",
    body: "Your companies, projects and big decisions, with the important ones first.",
    tone: "saffron" as Tone,
  },
  {
    n: "04",
    title: "Proof",
    line: "Why people can trust it.",
    body: "Press, awards, board seats and books. Each one has a source, and none is oversold.",
    tone: "terracotta" as Tone,
  },
  {
    n: "05",
    title: "Media",
    line: "Every talk and interview, together.",
    body: "Your podcasts, keynotes and panels, in one place that you own.",
    tone: "ink-blue" as Tone,
  },
  {
    n: "06",
    title: "Journal",
    line: "Your ideas, under your name.",
    body: "Your essays and notes live on your own site, not inside a feed you do not control.",
    tone: "rose" as Tone,
  },
];

export const deliverables = [
  "Interviews with you",
  "Research into what is online about you",
  "Your story, written",
  "A clear plan for your site",
  "A design made for you",
  "Your website, built",
  "An easy way to edit it",
  "Search basics, so you can be found",
  "Visitor stats",
  "A launch you can trust",
];

export const stewardship = [
  { key: "safe", item: "Kept safe", note: "We keep the site running and secure.", cadence: "Always" },
  { key: "news", item: "Your news added", note: "New roles, awards and launches go on your site.", cadence: "When it happens" },
  { key: "talks", item: "Talks and interviews", note: "Every talk and interview is added to your story.", cadence: "When they happen" },
  { key: "articles", item: "Articles you write", note: "We publish your writing on your own site.", cadence: "When you publish" },
  { key: "search", item: "Search check-ups", note: "We check what people find when they search your name.", cadence: "Every month" },
  { key: "reports", item: "Visitor reports", note: "You see who visits and what they read.", cadence: "Every month" },
];

export const audience = [
  "Founders",
  "CEOs",
  "Business owners",
  "Investors",
  "Executives",
  "Advisors",
  "Authors",
  "Speakers",
  "Architects",
  "Lawyers",
  "Doctors",
  "Established creators",
  "Thought leaders",
];

export const notFor = [
  "Template websites",
  "Cheap, quick websites",
  "Basic portfolios",
  "One-off landing pages",
  "A website for everyone",
];

/* ESTATES WE STUDY — real personal websites RURO did NOT build, used as reference studies.
   Never present these as RURO client work. Each breakdown describes the site's homepage as captured
   on 8 October 2026 (preview images in /public/studies) plus publicly reported facts. Palette values
   were sampled from those captures. Re-check a site before adding anything new about it. */
export type Study = {
  slug: string;
  person: string;
  role: string;
  domain: string;
  url: string;
  image: string;
  signature: string;
  summary: string;
  lesson: string;
  palette: { hex: string; name: string }[];
  design: { label: string; text: string }[];
  functionality: string[];
  luxury: { title: string; text: string }[];
  borrow: string[];
};

export const studies: Study[] = [
  {
    slug: "arnold-schwarzenegger",
    person: "Arnold Schwarzenegger",
    role: "Actor, former Governor of California",
    domain: "schwarzenegger.com",
    url: "https://www.schwarzenegger.com",
    image: "/studies/arnold-schwarzenegger.jpg",
    signature: "Arnold’s Pump Club",
    summary: "Film, fitness and politics under one roof, with every path leading to a daily newsletter.",
    lesson: "A career with many chapters can still have one front door.",
    palette: [
      { hex: "#cb301a", name: "Signal red" },
      { hex: "#06294c", name: "Deep navy" },
      { hex: "#f1f2f4", name: "Cool white" },
    ],
    design: [
      { label: "Layout", text: "A classic centred portal: a red navigation bar, a navy masthead, then a boxed white page with a main column and a sidebar." },
      { label: "Type", text: "His name set as a wordmark in two weights, a lighter first name over a heavy, capitalised surname, beside a silhouette portrait." },
      { label: "Imagery", text: "A rotating banner leads with the Pump Club, and every post in “The Latest” carries its own thumbnail." },
      { label: "Colour", text: "Red, navy and white throughout: confident, patriotic, and unmistakably his." },
    ],
    functionality: [
      "Navigation by life chapter: Film, Fitness, Issues, Bio and Arnold TV",
      "A banner carousel promoting the daily Pump Club email and app",
      "“The Latest”, filterable by Film, Fitness, Issues or Recent, with dated posts",
      "A “My Causes” column linking to the USC Schwarzenegger Institute and After-School All-Stars",
      "Search, plus links to every social channel in the masthead",
    ],
    luxury: [
      { title: "Breadth, organised", text: "Few people have careers this varied. Grouping them into clear chapters turns sprawl into stature." },
      { title: "First person, always", text: "Posts are written in his own voice, so a famous name still reads as a person talking to you." },
      { title: "Legacy on the page", text: "Giving his causes a permanent column says what he wants to be remembered for, not just what he is selling." },
    ],
    borrow: [
      "Organise navigation around the chapters of a career rather than a résumé.",
      "Give causes and long-term commitments a permanent place, not a footnote.",
      "Point every visit towards one owned channel, like a newsletter.",
    ],
  },
  {
    slug: "mark-cuban",
    person: "Mark Cuban",
    role: "Investor, Shark Tank, Cost Plus Drugs",
    domain: "blogmaverick.com",
    url: "https://blogmaverick.com",
    image: "/studies/mark-cuban.jpg",
    signature: "Blog Maverick",
    summary: "A long-running personal weblog with its own name, where he writes at length on business, media and healthcare.",
    lesson: "Give your writing a name and it becomes a destination.",
    palette: [
      { hex: "#1e5899", name: "Maverick blue" },
      { hex: "#efefef", name: "Whitewashed board" },
      { hex: "#ffffff", name: "Paper" },
    ],
    design: [
      { label: "Layout", text: "A wide masthead, a lead post with a ribbon-style “Read more” banner, a grid of earlier posts and a sidebar." },
      { label: "Type", text: "Tall, condensed capitals for “Blog Maverick” and every headline, with a lighter subtitle: The Mark Cuban Weblog." },
      { label: "Imagery", text: "Almost none: a single book cover in the sidebar. The writing carries the page." },
      { label: "Colour", text: "Strong blue on a pale, whitewashed-wood texture, which recalls a sports arena more than a corporate site." },
    ],
    functionality: [
      "Full-length posts with a lead story and recent posts below",
      "A sidebar promoting his book, How to Win at the Sport of Business",
      "Email subscription in the sidebar and again in a fixed bar along the bottom",
      "Open comments, which he is known to answer",
    ],
    luxury: [
      { title: "A name worth owning", text: "Calling it Blog Maverick rather than “Mark Cuban’s blog” turns a habit into a property." },
      { title: "Candour as a feature", text: "Long, unpolished thinking from a billionaire is rare, and its rarity is the value." },
      { title: "Always within reach", text: "The fixed email bar means the invitation to stay in touch never scrolls away." },
    ],
    borrow: [
      "Name the journal section, so it can be referenced and remembered.",
      "Let long-form thinking lead, rather than hiding it under a portfolio.",
      "Make following you effortless from any point on the page.",
    ],
  },
  {
    slug: "tim-ferriss",
    person: "Tim Ferriss",
    role: "Author and podcaster",
    domain: "tim.blog",
    url: "https://tim.blog",
    image: "/studies/tim-ferriss.jpg",
    signature: "5-Bullet Friday",
    summary: "A cinematic portrait hero, proof before anything else, and a newsletter whose content is only sent by email.",
    lesson: "Lead with proof, then make one clear offer.",
    palette: [
      { hex: "#051824", name: "Midnight" },
      { hex: "#86d4ff", name: "Sky" },
      { hex: "#f8c43b", name: "Star gold" },
    ],
    design: [
      { label: "Layout", text: "A full-bleed hero split in two: his portrait on the left, the claim and the offer on the right." },
      { label: "Type", text: "Widely spaced capitals for the TIM FERRISS wordmark; a heavy, tight sans for the headline about the book’s reviews." },
      { label: "Imagery", text: "A warm, natural portrait under a dark overlay, plus the covers of his three “4-Hour” books." },
      { label: "Colour", text: "Midnight navy with one light-blue button and five gold stars. Very little else competes." },
    ],
    functionality: [
      "Navigation: About, Blog, Books, Podcast and TV, plus search",
      "A permanent “Free newsletter” button in the header",
      "A lead magnet offering free pages from the 4-Hour books",
      "A podcast archive with full transcripts",
    ],
    luxury: [
      { title: "Proof first", text: "The first words are a review count and a ranking. Credibility arrives before the pitch does." },
      { title: "A face, not a logo", text: "The large, relaxed portrait makes a media brand feel personal." },
      { title: "Exclusivity", text: "Keeping 5-Bullet Friday to email makes subscribing feel like being let in." },
    ],
    borrow: [
      "Open with the strongest proof you have, stated plainly.",
      "Use one high-contrast colour for the single action that matters most.",
      "Give subscribers something they cannot get anywhere else.",
    ],
  },
  {
    slug: "james-clear",
    person: "James Clear",
    role: "Author of Atomic Habits",
    domain: "jamesclear.com",
    url: "https://jamesclear.com",
    image: "/studies/james-clear.jpg",
    signature: "3-2-1, every Thursday",
    summary: "A calm, warm page built around one book and one action, with a weekly newsletter behind it.",
    lesson: "Restraint is persuasive. One promise, one object, one action.",
    palette: [
      { hex: "#f9f8f4", name: "Warm ivory" },
      { hex: "#f8cd5f", name: "Seal gold" },
      { hex: "#ffffff", name: "Paper" },
    ],
    design: [
      { label: "Layout", text: "Everything is centred: a headline, the book, then a single invitation to download the first chapter." },
      { label: "Type", text: "Spaced capitals for the wordmark and a clean, friendly sans for a two-line headline about building good habits." },
      { label: "Imagery", text: "The book itself, with sample pages fanned behind it, so the visitor sees what they would be reading." },
      { label: "Colour", text: "Warm ivory and white with one gold seal noting copies sold. Nothing shouts." },
    ],
    functionality: [
      "Navigation: Books, Articles, Newsletter, App and Speaking, with About set apart",
      "A free first chapter offered in exchange for an email address",
      "An archive of articles on habits and decision-making",
      "The 3-2-1 newsletter, which the site says reaches more than three million people",
    ],
    luxury: [
      { title: "Quiet confidence", text: "One sales figure on a small gold seal says more than a wall of logos would." },
      { title: "Warmth over flash", text: "The ivory ground feels like good paper, which suits a writer." },
      { title: "Clarity of purpose", text: "It is obvious within seconds what the site is for and what to do next." },
    ],
    borrow: [
      "Choose the one action you want a visitor to take, and design the page around it.",
      "Show the work itself, not a picture of the person describing it.",
      "Let one well-chosen number do the bragging.",
    ],
  },
  {
    slug: "naval-ravikant",
    person: "Naval Ravikant",
    role: "Co-founder of AngelList, investor",
    domain: "nav.al",
    url: "https://nav.al",
    image: "/studies/naval-ravikant.jpg",
    signature: "How to Get Rich",
    summary: "A dark, text-only stream of podcast episodes and essays on a three-letter domain. No photos, no pitch.",
    lesson: "When the ideas are the brand, get everything else out of the way.",
    palette: [
      { hex: "#1e1f21", name: "Graphite" },
      { hex: "#db0042", name: "Crimson" },
      { hex: "#ffffff", name: "White" },
    ],
    design: [
      { label: "Layout", text: "A single reading column of episodes, each with a title, a subtitle, a short description, its length and date." },
      { label: "Type", text: "A monospaced crimson wordmark, “Naval”, and bold white episode titles over muted grey summaries." },
      { label: "Imagery", text: "None. The absence of photography is the statement." },
      { label: "Colour", text: "Graphite and white, with crimson reserved for the wordmark and the links to listen." },
    ],
    functionality: [
      "Navigation: Archive, X, Instagram and Subscribe",
      "One-tap links to listen on X, Apple, Spotify, YouTube or Substack, or by email",
      "Episodes listed newest first, each with running time and date",
      "A short, memorable domain that is itself part of the identity",
    ],
    luxury: [
      { title: "The ultimate restraint", text: "No portrait, no biography, no press logos. Only someone very sure of their reputation can do this." },
      { title: "A domain as a signature", text: "nav.al is short enough to remember after hearing it once." },
      { title: "One accent colour", text: "Crimson used sparingly makes every link feel deliberate." },
    ],
    borrow: [
      "Secure the shortest, most memorable version of your name you can.",
      "Pick one accent colour and use it only for what matters.",
      "Let your ideas carry the page if they are strong enough.",
    ],
  },
  {
    slug: "paul-graham",
    person: "Paul Graham",
    role: "Co-founder of Y Combinator",
    domain: "paulgraham.com",
    url: "https://www.paulgraham.com",
    image: "/studies/paul-graham.jpg",
    signature: "The essays",
    summary: "More than 229 essays on a deliberately bare HTML site that has barely changed in decades.",
    lesson: "Permanence is its own kind of luxury.",
    palette: [
      { hex: "#ffffff", name: "White" },
      { hex: "#9999cc", name: "Lavender grey" },
    ],
    design: [
      { label: "Layout", text: "A narrow column of small grey-lavender buttons on the left, a single photograph, and a strip announcing the newest essays." },
      { label: "Type", text: "His name in faint, widely spaced capitals as a header image; everything else is plain default text." },
      { label: "Imagery", text: "One photograph on the homepage, and nothing decorative anywhere else." },
      { label: "Colour", text: "White, black and the lavender of the buttons, with a bright strip for what is new." },
    ],
    functionality: [
      "Navigation to Essays, books, Y Combinator, his programming languages, FAQs and a bio",
      "A strip linking straight to the newest essays",
      "A full essay index, newest first, plus an RSS feed",
      "Pages that load almost instantly, on any connection",
    ],
    luxury: [
      { title: "Unchanged on purpose", text: "Not chasing trends signals that the writing will outlast them." },
      { title: "Substance over surface", text: "The plainness forces attention onto the essays, which is exactly where he wants it." },
      { title: "Recognisable anywhere", text: "The look is so particular that it has become part of his identity." },
    ],
    borrow: [
      "Build for permanence: a structure you will still be happy with in ten years.",
      "Make your best thinking the easiest thing to find.",
      "Speed is a courtesy. Respect your visitor’s time.",
    ],
  },
  {
    slug: "nithin-kamath",
    person: "Nithin Kamath",
    role: "Founder of Zerodha",
    domain: "nithinkamath.me",
    url: "https://nithinkamath.me",
    image: "/studies/nithin-kamath.jpg",
    signature: "Musings",
    summary: "A plain, personal homepage where one of India’s best-known founders introduces himself in the first person.",
    lesson: "A founder’s own address is where the human side can show.",
    palette: [
      { hex: "#ffffff", name: "White" },
      { hex: "#0034ff", name: "Link blue" },
      { hex: "#333333", name: "Ink" },
    ],
    design: [
      { label: "Layout", text: "One centred reading column under a small header: portrait, name, tagline and two links." },
      { label: "Type", text: "A bold sans for his name, a grey tagline about finance, business and life, and comfortable body text." },
      { label: "Imagery", text: "A round black-and-white portrait, then a candid photo of him playing guitar." },
      { label: "Colour", text: "White and near-black, with classic blue for links. Nothing corporate about it." },
    ],
    functionality: [
      "Navigation: Home, Musings and an RSS feed",
      "A first-person introduction linking to Zerodha, Rainmatter and the Rainmatter Foundation",
      "Musings, a blog on markets, health and money",
    ],
    luxury: [
      { title: "Separation from the company", text: "Zerodha speaks for the business. This page speaks for the man, and says so." },
      { title: "Humanity as proof", text: "Family, music and sport sit beside the company. Being relaxed about it reads as confidence." },
      { title: "Nothing to sell", text: "No offers, no funnels. The absence of a pitch is itself a signal of standing." },
    ],
    borrow: [
      "Keep your personal estate distinct from your company’s website.",
      "Let people see the person, not only the title.",
      "Write the introduction yourself, in plain words.",
    ],
  },
  {
    slug: "ankur-warikoo",
    person: "Ankur Warikoo",
    role: "Founder of nearbuy, author and creator",
    domain: "ankurwarikoo.com",
    url: "https://ankurwarikoo.com",
    image: "/studies/ankur-warikoo.jpg",
    signature: "“awareness is everything”",
    summary: "A cinematic, personal hero, a signature for a logo, and a press bar that does the convincing.",
    lesson: "Make the person the brand, then let the press confirm it.",
    palette: [
      { hex: "#0d0d0d", name: "Black" },
      { hex: "#87827d", name: "Warm stone" },
      { hex: "#efefef", name: "Mist" },
    ],
    design: [
      { label: "Layout", text: "A black navigation bar, a full-width photographic hero with a short philosophy, and a grey “As featured on” band below." },
      { label: "Type", text: "A handwritten signature as the logo; a large, light, lowercase headline that reads like a personal motto." },
      { label: "Imagery", text: "A warm, relaxed portrait in a real interior rather than a studio." },
      { label: "Colour", text: "Black, warm stone and soft grey, with the photograph supplying all the warmth." },
    ],
    functionality: [
      "Navigation to his ventures (WebVeda, IGC, Monzy), Content, Books, Public Speaking, Contact and About",
      "A press bar with Fortune, BBC, Moneycontrol, The Economic Times, Mint and NDTV",
      "Books, courses and an investing and mentoring page with a direct email",
    ],
    luxury: [
      { title: "A signature, not a logo", text: "A handwritten mark is the most personal identity there is." },
      { title: "Philosophy before product", text: "The first words are a belief, not an offer." },
      { title: "Borrowed authority, used well", text: "One quiet row of publications does more than any adjective could." },
    ],
    borrow: [
      "Consider a signature or monogram as your mark.",
      "Open with what you believe, then show what you do.",
      "Gather your press into one restrained, credible row.",
    ],
  },
];

export type Essay = {
  slug: string;
  title: string;
  dek: string;
  readingTime: string;
  date: string;
  tone: Tone;
  body: string[];
};

export const journal: Essay[] = [
  {
    slug: "why-you-need-a-website",
    title: "Why you need a website, whoever you are.",
    dek: "A profile is a room in someone else’s building. A website is the building.",
    readingTime: "4 min",
    date: "2026-10-09",
    tone: "bottle",
    body: [
      "Before anyone meets you, they look you up. What they find is a handful of pages written by other people for other reasons: a listing, an old article, a profile on a platform that decides what to show.",
      "A website of your own changes who is speaking. It is the one place on the internet where you decide what is said first, what is said clearly and what is left out. Readers, journalists and search engines all treat it as the primary source, because it is.",
      "It also outlasts the platforms. Profiles change their rules, feeds bury old work and accounts get closed. An address you own keeps working, and everything else you do online can point back to it.",
      "You do not need a large site. You need a clear one: who you are, what you have done, the proof, and a way to reach you. That is the whole job, and it only has to be done once and kept up.",
    ],
  },
  {
    slug: "why-successful-people-keep-a-website-of-their-own",
    title: "Why successful people keep a website of their own.",
    dek: "The more a name is worth, the less sense it makes to leave it to chance.",
    readingTime: "4 min",
    date: "2026-10-02",
    tone: "saffron",
    body: [
      "Look at the people who are known for what they do: founders, authors, athletes, investors. A great many of them keep a website under their own name, even though they could reach millions through platforms they do not own. We study eight of them on our Studies page.",
      "The reason is simple. The more a name is worth, the more it costs to be misunderstood. A site is the cheapest, most durable way to say who you are, in your own words, in an order you chose.",
      "It is also leverage. A site gathers the press, the books, the talks and the companies in one place, so a journalist, an investor or a hiring partner gets the whole picture in minutes instead of assembling it from fragments.",
      "Nothing here needs money first. A clear site costs little next to what a muddled name costs over a career. Start before you are asked to.",
    ],
  },
  {
    slug: "what-happens-when-someone-googles-your-name",
    title: "What happens when someone Googles your name?",
    dek: "Every meeting now begins with a search. Few people have seen what it returns, and fewer have decided what it should say.",
    readingTime: "4 min",
    date: "2026-09-18",
    tone: "oxblood",
    body: [
      "Before the meeting, before the call, before the introduction is even accepted, someone types your name into a search bar. What they find in the next eight seconds frames everything that follows.",
      "For most established people, that page is an accident. A LinkedIn profile last edited three roles ago. A news story about a funding round that is now history. A conference bio written by an events coordinator. An image from a decade earlier. Each one is technically about you. None of them were written to represent you.",
      "The problem is not that the information is wrong. It is that nobody is in charge of it. Your reputation is being summarised by whatever happens to rank, and ranking rewards activity, not significance.",
      "A digital estate changes the order of things. It gives search engines, journalists, investors and future collaborators a primary source: a permanent address where your identity, story, work and proof are stated with care. Everything else becomes context around it.",
      "You do not need to be louder online. You need to be legible. That begins with deciding what the first result should say.",
    ],
  },
  {
    slug: "your-linkedin-isnt-your-digital-identity",
    title: "Your LinkedIn isn’t your digital identity.",
    dek: "A profile on someone else’s platform is a tenancy. An identity deserves a freehold.",
    readingTime: "3 min",
    date: "2026-08-27",
    tone: "bottle",
    body: [
      "LinkedIn is useful. It is also a standardised form. The same fields, the same layout, the same feed, for millions of people whose careers have nothing in common.",
      "Platforms are built to keep attention inside the platform. Your profile is designed to serve their network, not your narrative. You cannot control the layout, the adjacent content, the algorithm or the rules, and all of them can change without notice.",
      "Identity needs a structure that reflects its actual shape. A founder with three companies, a surgeon who writes, an investor with a thesis: none of these fit neatly into job title, dates and bullet points.",
      "Keep the profiles. Use them well. But anchor them to something you own, where the story is told in your order, at your standard, and stays there.",
    ],
  },
  {
    slug: "your-company-has-a-website-why-dont-you",
    title: "Your company has a website. Why don’t you?",
    dek: "Companies are represented with great care. The people who build them, almost never.",
    readingTime: "3 min",
    date: "2026-07-30",
    tone: "saffron",
    body: [
      "Every serious company invests in how it is represented: a brand, a site, a voice, a team that maintains them. The founder who built that company is usually represented by a headshot and two paragraphs on the About page.",
      "That made sense when a career was a single institution. It makes less sense now. Founders start more than one company. Executives move. Professionals publish, speak, advise and invest. The individual is the continuous thread; the institutions are chapters.",
      "A personal digital estate is not vanity. It is infrastructure for the asset that compounds across every chapter: your name.",
    ],
  },
  {
    slug: "your-reputation-shouldnt-live-inside-an-algorithm",
    title: "Your reputation shouldn’t live inside an algorithm.",
    dek: "Feeds reward frequency. Reputations are built on substance, and need somewhere to last.",
    readingTime: "4 min",
    date: "2026-06-12",
    tone: "terracotta",
    body: [
      "The modern advice is to post more. Be consistent. Feed the algorithm. For some people that is the right strategy. For most established people, it is a distraction from the work that actually built their reputation.",
      "Feeds are temporary by design. A considered essay sinks beneath newer content within days. A landmark interview becomes difficult to find within months. The record of a career dissolves into timelines.",
      "An estate is the opposite of a feed. It is organised by significance rather than recency. It keeps the important things findable, permanently, at an address you control.",
      "Publish where audiences are, by all means. But keep the original somewhere that is yours.",
    ],
  },
  {
    slug: "why-established-founders-need-a-digital-estate",
    title: "Why established founders need a digital estate.",
    dek: "The further a career has come, the more it costs to be misunderstood.",
    readingTime: "5 min",
    date: "2026-05-21",
    tone: "ink-blue",
    body: [
      "Early in a career, being unknown is the default and nobody holds it against you. Later, the stakes change. Investors, acquirers, boards, journalists and senior hires all research you before they engage, and their conclusions shape the terms of the conversation.",
      "Established founders are often the least well represented people in their own companies. They have been too busy building to curate. The result is a public picture assembled by others: press, databases, old interviews, other people’s summaries.",
      "A digital estate restores authorship. It states what you have built, what you believe, and where you are going, in a form that is credible precisely because it is considered.",
      "It is also a long-term asset. Maintained properly, it becomes the canonical record of a career: the place everything else links back to.",
    ],
  },
];

/* Answers use only commitments already made elsewhere on the site. Pricing and reply times
   come from `studio` in lib/site.ts and are added by the FAQ component when set. */
export const faqs = [
  {
    q: "What is a digital estate?",
    a: "It is our name for a personal website done properly. It holds your story, your work, your press and your ideas. We write it with you, design it for you, build it at your own address, and keep it up to date.",
  },
  {
    q: "How is this different from a web agency?",
    a: "An agency starts with design. We start with you. We interview you, check what is online about you, and write your story. The website comes after that.",
  },
  {
    q: "How much of my time does it take?",
    a: "A few hours across the two weeks. You give one 60-minute call, two or three interviews, a couple of short reviews, and a final walkthrough. We write, and you approve.",
  },
  {
    q: "How long does it take?",
    a: "Two weeks at most, from the first call to launch.",
  },
  {
    q: "Do I have to write it myself?",
    a: "No. We interview you and, if you agree, people who know your work. We write the first draft. You approve every word.",
  },
  {
    q: "Who owns the website?",
    a: "You do. The address, the words and the site are all yours.",
  },
  {
    q: "What happens to what I tell you?",
    a: "We use it only to write your site. We never publish your name, work or details without your written permission.",
  },
  {
    q: "What happens after launch?",
    a: "We can keep your site up to date. We add your news, talks and articles, keep it safe, and check how you show up in search.",
  },
];

/* What the Online Presence Review delivers. The turnaround comes from `studio.auditWithin`. */
export const audit = {
  title: "Online Presence Review",
  summary: "A short written report on what people find when they search your name, and the three things to fix first.",
  includes: [
    "What shows up on the first page when someone searches your name",
    "What is out of date, missing, or about someone else",
    "The three fixes that matter most, in order",
  ],
};

/* TEAM PLACEHOLDERS — replace with the real people behind RURO before launch.
   Entries marked placeholder render with a visible placeholder tag. */
export type Venture = { name: string; role: string; text: string; url?: string };
export type Person = { name: string; role: string; bio: string; photo?: string; ventures?: Venture[]; placeholder?: true };
export const team: Person[] = [
  {
    name: "Aarupadaiyar KJ.",
    role: "Founder of RURO · Co-founder and CTO of Trafy and Stat6",
    bio: "Founder of RURO. Also a co-founder and CTO of two other companies, which are below.",
    photo: "/people/owner.jpg",
    ventures: [
      { name: "RURO", role: "Founder", text: "A digital identity studio that writes, designs, builds and looks after personal websites for founders and executives." },
      { name: "Trafy", role: "Co-founder and CTO", text: "The first social media built for students, recruiters and working professionals.", url: "https://trafy.ai" },
      { name: "Stat6", role: "Co-founder and CTO", text: "An Indian-origin business management system (BMS) and custom software company.", url: "https://stat6.si" },
    ],
  },
];

/* The process at a glance: the same four stages as the metamorphosis on /process,
   with the approval that closes each one. Day ranges are typical, not promised. */
export const timeline = [
  {
    n: "I",
    title: "Onboarding",
    when: "Day 1",
    body: "We start with a private call. You tell us what you have built, who looks you up, and what you want people to know.",
    does: ["A private call with you", "A short questionnaire", "A shared plan and workspace"],
    yourPart: "One 60-minute call and a short questionnaire.",
    receive: ["Project plan", "Shared workspace"],
    gate: "Brief agreed",
  },
  {
    n: "II",
    title: "Research and story",
    when: "Days 2–5",
    body: "We talk to you and to people who know your work. We check what the internet says about you. Then we find your story.",
    does: ["Interviews with you and people who know your work", "A check of what search and press say about you", "Your story, outlined, and the pages your site needs"],
    yourPart: "Two or three one-hour interviews, and a few introductions.",
    receive: ["Research report", "Your story outline", "Site structure"],
    gate: "Story approved",
  },
  {
    n: "III",
    title: "Building",
    when: "Days 6–12",
    body: "We write your story, design your site and build it. You see it at each milestone, not every detail.",
    does: ["Your story, written and edited", "A design made only for you", "Your website, built, with an easy way to edit it"],
    yourPart: "A couple of short reviews along the way.",
    receive: ["Written pages", "Design", "Editing tools, search basics, visitor stats"],
    gate: "Final sign-off",
  },
  {
    n: "IV",
    title: "Launch",
    when: "Days 13–14",
    body: "Your site goes live at your own address. We check it on phones, in search and when shared.",
    does: ["Live at your own address", "Checked on phones, in search and when shared", "A walkthrough, so you can edit it yourself"],
    yourPart: "A final walkthrough. Then nothing until you have news.",
    receive: ["yourname.com, live", "Handover and training"],
    gate: null,
  },
];
