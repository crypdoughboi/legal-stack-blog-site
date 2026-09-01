/**
 * All copy for the landing page, lifted from the Claude Design handoff
 * (project/the-legal-stack.dc.html). Editing text here is enough to change
 * the page — no component needs to be touched.
 */

export const site = {
  /** Absolute origin, used for the RSS feed's links. */
  url: "https://legal-stack-blog-site.vercel.app",
  author: "Josh Benzadon",
  title: "The Legal Stack",
  tagline: "Notes on artificial intelligence inside transactional practice",
  updated: "Updated August 2026",
  nav: [
    { label: "Writing", href: "#writing" },
    { label: "Practice notes", href: "#notes" },
    { label: "About", href: "#about" },
    { label: "Subscribe", href: "#subscribe", accent: true },
  ],
} as const;

/** The two section toggles the prototype exposed as editor props. */
export const sections = {
  showPracticeNotes: true,
  showNewsletter: true,
};

export const premise = {
  eyebrow: "The premise",
  heading:
    "The hard part of legal AI isn't the model. It's deciding what we're willing to hand off.",
  body: "I'm an innovation attorney at a global law firm. I work with the corporate, funds, real estate, and restructuring groups to fit AI into how deals actually get done, and I write here about what I'm learning — including the parts that haven't worked yet.",
  byline: "By Josh Benzadon · previously startup & emerging companies / VC",
};

export const leadEssay = {
  eyebrow: "Lead essay · Adoption",
  title: "Why legal AI tends to stall around week six",
  href: "#",
  body: [
    "Six weeks in, the novelty has worn off and the billable pressure is back. In my experience the tools that survive that week are the ones already sitting inside work someone was going to do anyway. The rest quietly become a slide in next quarter's committee update.",
    "What has worked better for me: find the one step in the process a partner is already annoyed about, and never ask anyone to change two things at once.",
  ],
  date: "Aug 24",
  published: "2026-08-24",
  readingTime: "9 min",
};

export const recentPosts = [
  {
    numeral: "I.",
    title: "What a model-run first pass at diligence actually cost us",
    href: "#",
    dek: "One real data room, the number it came to, and the hours it didn't remove.",
    date: "Aug 12",
    published: "2026-08-12",
  },
  {
    numeral: "II.",
    title: "We buy for the loudest partner and adopt with the mid-levels",
    href: "#",
    dek: "A gap between procurement and practice that I keep running into.",
    date: "Jul 30",
    published: "2026-07-30",
  },
  {
    numeral: "III.",
    title: "The billable hour looks safe. The first draft doesn't.",
    href: "#",
    dek: "Where I think the leverage moved, and what that does to the associate year.",
    date: "Jul 18",
    published: "2026-07-18",
  },
  {
    numeral: "IV.",
    title: "Were clause libraries the wrong abstraction?",
    href: "#",
    dek: "Precedent was rarely my bottleneck. Judgment about deviation usually was.",
    date: "Jun 29",
    published: "2026-06-29",
  },
];

export const categories = [
  { label: "adoption", href: "#" },
  { label: "diligence", href: "#" },
  { label: "drafting", href: "#" },
  { label: "vendors & buying", href: "#" },
  { label: "regulation", href: "#" },
  { label: "governance", href: "#" },
  { label: "career", href: "#" },
];

export const practiceNotes = {
  eyebrow: "Where I've landed so far",
  dek: "Working views by group, held loosely and revised as the tooling changes.",
  notes: [
    {
      group: "Corporate & M&A",
      body: "Diligence summarization has earned its place and is close to routine. I'm more cautious on rep-and-warranty drafting: the exceptions carry the risk, and the exceptions are where the models still struggle.",
    },
    {
      group: "Funds",
      body: "Side letter tracking seems to be the whole game. When it still lives in a spreadsheet nobody fully trusts, the first problem is data, not AI.",
    },
    {
      group: "Real estate",
      body: "Some of the highest-volume, lowest-variance documents in the building. Lease abstraction and estoppel review look like the clearest wins available right now.",
    },
    {
      group: "Restructuring",
      body: "The use case I think is most underrated. Claims reconciliation and docket triage are pattern work under real time pressure, which is close to the shape these tools fit best.",
    },
  ],
};

export const about = {
  eyebrow: "The pivot",
  heading: "I moved from venture work to the unglamorous half of legal AI.",
  body: [
    "Working on startup and emerging-company financings taught me something I keep coming back to: lawyers adopt what makes the next closing easier, and treat most of the rest as optional. As an innovation attorney at a global law firm, I now sit with the corporate, funds, real estate, and restructuring groups and try to find the places where that's true.",
    "I write here because the useful details rarely make it onto a conference panel: which step got automated, who pushed back, and what the demo left out.",
  ],
  link: { label: "More about the work", href: "#" },
};

export const newsletter = {
  eyebrow: "Subscribe",
  heading: "One memo a month. No vendor roundups.",
  dek: "What changed in legal AI, what I think it means for transactional practice, and whether it survived contact with a live deal.",
  /**
   * Buttondown account the form posts to. Empty string keeps the form inert,
   * exactly as the prototype had it.
   */
  buttondownUsername: "",
  placeholder: "you@firm.com",
  cta: "Subscribe",
  footnote: "Unsubscribe anytime.",
};

export const footer = {
  links: [
    { label: "Email", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "RSS", href: "/feed.xml" },
    { label: "Archive", href: "#" },
  ],
  disclaimer:
    "Written by Josh Benzadon in a personal capacity. Nothing here is legal advice.",
};
