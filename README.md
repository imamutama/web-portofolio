# web-portofolio

Personal portfolio for **Imam Setya Utama** — Senior QA Automation Engineer.

Stack: Astro 7 · Tailwind v4 · MDX content collections · TypeScript · Biome. Static output, deploy to Vercel/Cloudflare Pages.

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
- `src/data/site.ts` — site metadata (domain, SEO, contact)

Regenerate by running the `cv-to-portfolio` skill.

## Skills

Three OpenCode skills live in `.opencode/skills/`:

- `cv-to-portfolio` — extract a CV PDF into `cv.json` + typed modules + draft case studies
- `case-study-writer` — write a new Problem/Approach/Result case study
- `portfolio-release-check` — pre-deploy gate (drafts, PII, sitemap, a11y)

## TODO before release

- [ ] Project names/artifacts — fill in the `TODO:` markers inside `src/content/projects/*.mdx`
- [ ] Flip `draft: true` → `false` on confirmed case studies
- [ ] Add LinkedIn URL in `src/data/site.ts` and `cv.json`
- [ ] Set final domain in `astro.config.mjs` (`site`) and `src/data/site.ts`
- [ ] Generate `public/og-default.png` (and a favicon)
- [ ] Contact form upgrade: Resend + Astro Action (currently a mailto link)

## Privacy

Phone number is intentionally omitted from the repo. If you ever regenerate `cv.json` from a CV that contains a phone, keep it under `_private` and never in generated output — especially before making the repo public.
