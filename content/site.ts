/**
 * Standing copy for the site: the masthead, the positioning sections, and
 * the footer. Reviewed in the Claude Design handoff and kept as written.
 *
 * Posts, their dates, and the topic list are not here — they live in the
 * database and are written through /admin.
 */

export const site = {
  /** Absolute origin, used for the RSS feed's links. */
  url: "https://legal-stack-blog-site.vercel.app",
  author: "Josh Benzadon",
  title: "The Legal Stack",
  tagline: "Notes on artificial intelligence inside transactional practice",
  updated: "Updated August 2026",
  nav: [
    { label: "Writing", href: "/writing" },
    { label: "Practice notes", href: "/notes" },
    { label: "About", href: "/#about" },
    { label: "Subscribe", href: "/#subscribe", accent: true },
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
  /**
   * Links with an empty href are left out of the footer rather than shipped
   * as dead ones. Fill in the email and LinkedIn destinations and they
   * reappear on their own.
   */
  links: [
    { label: "Email", href: "" },
    { label: "LinkedIn", href: "" },
    { label: "RSS", href: "/feed.xml" },
    { label: "Archive", href: "/writing" },
  ],
  disclaimer:
    "Written by Josh Benzadon in a personal capacity. Nothing here is legal advice.",
};
