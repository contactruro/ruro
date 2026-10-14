/* Design notes pinned onto each concept's preview. Each note points at an element inside the preview
   (a CSS selector under that concept's root) and names the principle behind the choice: a design law,
   a copywriting framework or a storytelling principle. These are RURO's reasoning for a proposal, not
   claims about the person. Definitions are the standard ones; keep them short and accurate. */

export type Annotation = {
  target: string;
  kind: "Design law" | "Copy framework" | "Story principle";
  title: string;
  text: string;
};

export const annotations: Record<string, Annotation[]> = {
  "nikhil-kamath": [
    {
      target: ".nk-hero h1",
      kind: "Design law",
      title: "Von Restorff effect",
      text: "When items sit together, the one that differs is remembered. One line is dark and the next is a quiet grey, so the first claim is the thing a visitor keeps.",
    },
    {
      target: ".nk-copy .nk-sub",
      kind: "Copy framework",
      title: "AIDA, in two sentences",
      text: "Attention is the headline, Interest is the origin story (left school at 14), Desire is what he built, Action is the button below. Nothing is added past the first screen.",
    },
    {
      target: ".nk-frame",
      kind: "Design law",
      title: "Frame the person",
      text: "A single portrait with a plain caption, set like a page in an annual report, tells a visitor who this is and that the page is about him, not about the company.",
    },
    {
      target: ".nk-tape",
      kind: "Design law",
      title: "Mere-exposure effect",
      text: "We prefer what we have seen repeatedly. The four names pass again and again at the edge of the eye, in quiet type, so they are remembered without being pushed.",
    },
    {
      target: ".nk-list ul",
      kind: "Design law",
      title: "Hick's Law",
      text: "Decision time grows with the number of choices. Five rows, not fifteen, so a visitor picks in a second and the detail ticket opens straight away (progressive disclosure).",
    },
    {
      target: ".nk-wave",
      kind: "Story principle",
      title: "Peak–end rule",
      text: "People judge an experience mostly by its high point and its ending. The page finishes on his most human, current work, conversation, so the last feeling is not finance.",
    },
    {
      target: ".nk-foot .nk-cta",
      kind: "Design law",
      title: "Fitts's Law",
      text: "The time to hit a target depends on its size and distance. One large, solid button is the only thing at the foot of the page, so the next step is quick and unmissable.",
    },
  ],
  "sam-altman": [
    {
      target: ".sm-hero h1",
      kind: "Copy framework",
      title: "Single-minded proposition",
      text: "One idea, said once, in a sentence you could speak aloud. It also applies Hick's Law at its limit: the page offers no choices before the sentence is read.",
    },
    {
      target: ".sm-pill",
      kind: "Design law",
      title: "Progressive disclosure",
      text: "Show the essentials first and reveal detail on request. The soft pill is a signifier that the word is tappable; curious readers get one more line, others read on.",
    },
    {
      target: ".sm-face",
      kind: "Design law",
      title: "Picture superiority effect",
      text: "Images are remembered better than words. A small face set inside the sentence becomes part of the voice instead of a header photo that is scrolled past.",
    },
    {
      target: ".sm-light",
      kind: "Design law",
      title: "Calm technology",
      text: "Motion that informs without demanding attention. Slow light drifting behind the text signals unhurried, human, and never competes with the words.",
    },
    {
      target: ".sm-writing",
      kind: "Story principle",
      title: "Rule of three",
      text: "Groups of three feel complete and are easy to recall. Three essays, one per era, tell a story of where his thinking has gone without a long archive.",
    },
    {
      target: ".sm-resume",
      kind: "Copy framework",
      title: "Inverted pyramid",
      text: "Most important first, detail after. The resume runs newest to oldest and stops at four lines, so the reader meets what he does now before where it began.",
    },
    {
      target: ".sm-sig",
      kind: "Story principle",
      title: "Ethos, and the end of the story",
      text: "Aristotle's ethos is persuasion through the speaker's character. A drawn signature closes the page as a personal mark, and the ending is the part that is remembered.",
    },
  ],
  "james-clear": [
    {
      target: ".jh-pill",
      kind: "Story principle",
      title: "The habit loop, in the UI",
      text: "His own book describes cue, craving, response, reward. The small gold 'New every Thursday' label is the cue: it tells a visitor this is a weekly rhythm before they read a word.",
    },
    {
      target: ".jh-hero h1",
      kind: "Copy framework",
      title: "Benefit-led headline",
      text: "State the outcome the reader gets, not the author's credentials. The last words are set in gold italic so the eye lands on the promise, not on the name.",
    },
    {
      target: ".jh-stack",
      kind: "Design law",
      title: "IKEA effect + habit stacking",
      text: "People value what they help make. Here the visitor writes their own 'After I..., I will...' line, using the stacking formula from the book, so the idea becomes theirs before they have read a chapter.",
    },
    {
      target: ".jh-btn",
      kind: "Design law",
      title: "Immediate reward",
      text: "His fourth law is 'make it satisfying'. Ticking a day fills its square in gold at once and moves the marker on the curve, so the site itself demonstrates the principle instead of describing it.",
    },
    {
      target: ".jh-laws",
      kind: "Copy framework",
      title: "Parallel structure + numbering",
      text: "Four lines that start the same way (Make it...) are easy to read and recall, and a numeral for each law lets a reader find 'attractive' or 'easy' again at a glance, like the contents page of a book.",
    },
    {
      target: ".jh-mail",
      kind: "Story principle",
      title: "Rule of three, as a product",
      text: "3-2-1 is the format of his email, so the page shows the email itself: three ideas, two quotes, one question. Seeing the shape beats being told about it.",
    },
    {
      target: ".jh-nums",
      kind: "Design law",
      title: "Social proof and specificity",
      text: "People look to others' behaviour to judge value, and a specific figure is more believable than a vague claim. The newsletter number is his site's own claim.",
    },
  ],
  "paul-graham": [
    {
      target: ".pg-name",
      kind: "Design law",
      title: "Visual hierarchy by scale",
      text: "Size and colour set the reading order. One large name with a single indigo italic word is clearly first, and dark type keeps strong contrast on paper.",
    },
    {
      target: ".pg-doodle.d1",
      kind: "Design law",
      title: "Dual-coding theory",
      text: "Information stored as both a picture and words is remembered better. A lambda in a ring tells a reader who writes code before they read a word, and it doubles as the page's logo.",
    },
    {
      target: ".pg-line",
      kind: "Copy framework",
      title: "Say what it is",
      text: "One plain sentence of under twenty words: who he is, what he writes about. It follows plain-language rules, which suits a writer known for being plain.",
    },
    {
      target: ".pg-machine-card",
      kind: "Design law",
      title: "Curiosity gap + variable reward",
      text: "Curiosity comes from sensing a gap in what you know, and an unpredictable reward keeps people pulling. A machine that lands on a surprise essay turns 'where do I start among 220?' into play.",
    },
    {
      target: ".pg-topics",
      kind: "Story principle",
      title: "Chunking and colour",
      text: "Three shelves, four items each, sit comfortably inside working memory (Miller's Law). The same three topic names return in the chooser, so the system explains itself.",
    },
    {
      target: ".pg-time",
      kind: "Story principle",
      title: "A three-beat origin story",
      text: "Where he began, the turning point, and where he is now. The line draws as you arrive, so the reader's eye travels the story in order.",
    },
    {
      target: ".pg-books",
      kind: "Design law",
      title: "Affordance",
      text: "Spines that slide out on hover say 'pull me' without a label, the way real shelves do. The cue is physical, so no instruction is needed.",
    },
  ],
};
