# The Legal Stack

A blog landing page for Josh Benzadon, innovation attorney: notes on
artificial intelligence inside transactional practice.

Built with Next.js (App Router) from a Claude Design handoff. The design
bundle it came from is kept in `project/` and `chats/` for reference.

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static prerender
```

### Where things live

- `app/page.tsx` — section order for the page
- `app/globals.css` — design tokens and every layout rule, values tracking
  the prototype one to one
- `content/site.ts` — all copy, the post list, and the two section toggles
  (`showPracticeNotes`, `showNewsletter`)
- `components/` — one component per section

### Still placeholders

The illustration and portrait plates (`components/PlaceholderPlate.tsx`),
the subscribe form (inert, no provider wired up), and the `#` links in the
nav, post list, and footer.

---

# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 1 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/the-legal-stack.dc.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `Innovation Attorney Blog Landing` project files (HTML prototypes, assets, components)
