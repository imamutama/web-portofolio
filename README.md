# web-portofolio

Personal portfolio for **Imam Setya Utama** — Senior QA Automation Engineer.

Stack: Astro 7 · Tailwind v4 · MDX content collections · TypeScript · Biome. Static output, deployed on Vercel, with a Supabase-backed contact form.

## Commands

```bash
bun install
bun run dev       # local dev server
bun run build     # production build to dist/
bun run check     # astro type check
bun run lint      # biome
bun run format    # biome format --write
```

## Data pipeline

`src/data/cv.json` is the source of truth (extracted from the CV). The typed modules derive from it:

- `src/data/profile.ts` — name, headline, summary, links, education
- `src/data/experience.ts` — work history with computed date ranges
- `src/data/skills.ts` — grouped skill chips
- `src/data/site.ts` — site metadata (domain, SEO, contact, repo)

Regenerate by running the `cv-to-portfolio` skill.

## Supabase (contact form)

The contact form writes messages to a Supabase `contacts` table — no backend server; the static site POSTs to Supabase's REST API, protected by row-level security.

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/schema.sql` in the SQL Editor (creates `contacts` + RLS).
3. Copy **Project URL** → `PUBLIC_SUPABASE_URL` and the **anon** key → `PUBLIC_SUPABASE_ANON_KEY`.
4. Set both in Vercel (Project → Settings → Environment Variables), then redeploy.

Without these env vars the form renders a "not configured" notice; the build still succeeds.

## Skills

Three OpenCode skills live in `.opencode/skills/`:

- `cv-to-portfolio` — extract a CV PDF into `cv.json` + typed modules + draft case studies
- `case-study-writer` — write a new Problem/Approach/Result case study
- `portfolio-release-check` — pre-deploy gate (drafts, PII, sitemap, a11y)

## TODO before release

- [ ] Project names/artifacts — fill in the `TODO:` markers inside `src/content/projects/*.mdx`
- [ ] Flip `draft: true` → `false` on confirmed case studies
- [ ] Set final domain in `astro.config.mjs` (`site`) and `src/data/site.ts`
- [ ] Contact form: set `PUBLIC_SUPABASE_URL` + `PUBLIC_SUPABASE_ANON_KEY` (see "Supabase" above)

## Privacy

Phone number is intentionally omitted from the repo. If you ever regenerate `cv.json` from a CV that contains a phone, keep it under `_private` and never in generated output — especially before making the repo public. Note: `public/cv.pdf` is the downloadable CV and may contain contact details — review before making it public.
