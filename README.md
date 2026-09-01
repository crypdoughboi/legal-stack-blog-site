# The Legal Stack

A blog for Josh Benzadon, innovation attorney: notes on artificial
intelligence inside transactional practice.

Next.js (App Router) + Supabase Postgres, with a GitHub-authenticated
editor at `/admin`. The design came from a Claude Design handoff, kept in
`project/` and `chats/` for reference.

```bash
npm install
cp .env.example .env.local   # fill in, see Setup below
npm run dev                  # http://localhost:3000
npm run build
```

## Setup

1. **Database.** Create a Supabase project, open the SQL editor, and run
   `db/schema.sql`. Then hit **Connect** in the dashboard's top bar and copy
   the **Transaction pooler** string into `DATABASE_URL`: its host contains
   `pooler.supabase.com` and its port is `6543`, which is what serverless
   needs. Substitute your real database password for the `[YOUR-PASSWORD]`
   placeholder, brackets included, and percent-encode any of
   `@ : / ? # & %` it contains.
2. **Sign-in.** Create a GitHub OAuth app with callback
   `https://YOUR-DOMAIN/api/auth/callback`. Set `GITHUB_CLIENT_ID`,
   `GITHUB_CLIENT_SECRET`, `AUTHOR_GITHUB_LOGIN` (the only account allowed
   in), and `AUTH_SECRET` (`openssl rand -hex 32`).
3. **Images.** Create a **public** Supabase storage bucket named
   `post-images`, then set `SUPABASE_URL` plus a server key from Project
   Settings → API Keys: either a new secret key (`sb_secret_…`) as
   `SUPABASE_SECRET_KEY`, or the legacy `service_role` JWT as
   `SUPABASE_SERVICE_ROLE_KEY`.
4. Set the same variables in Vercel → Settings → Environment Variables.

Missing variables degrade gracefully: the public site builds and renders
with no posts, and sign-in reports that it is not configured.

## Writing

`/admin` lists every post, draft and published. The editor takes Markdown,
auto-derives the URL from the title, uploads images inline, and has a
preview toggle. "Lead essay" promotes a post to the front page; only one
post holds it at a time. Publishing revalidates the front page, archive,
topic pages, feed, and sitemap immediately.

## Layout

- `app/page.tsx` — the landing page
- `app/writing/[slug]`, `app/archive`, `app/topics/[tag]` — reading
- `app/admin`, `app/login`, `app/api/auth/*` — the author's side
- `app/globals.css` — design tokens and every layout rule, tracking the
  original prototype one to one
- `content/site.ts` — standing copy (masthead, premise, practice notes,
  about, footer). Posts live in the database, not here.
- `lib/` — database, posts, auth, formatting
- `db/schema.sql` — the schema, run once in Supabase

## Still open

- The portrait slot in the about section is a placeholder plate.
- The subscribe form is inert until `buttondownUsername` is set in
  `content/site.ts`.
- The footer's email and LinkedIn links still point at `#`.

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
