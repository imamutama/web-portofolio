---
name: portfolio-release-check
description: Pre-deploy gate for this portfolio — verify no draft content ships, no PII leaks, sitemap and OG image are present, and accessibility passes. Use before deploying, or when asked to "check the site before release".
license: MIT
compatibility: opencode
metadata:
  audience: owner
  stack: astro
---

## What I do

Run a bounded set of checks (never the full test suite) before the site ships.

## Checks

Build first:

```bash
bun run build
```

Then verify each:

1. **No draft content ships** — `rg -n "draft: true" src/content/` should only list files that are intentionally hidden; confirm the pages filter on `draft` (see `getCollection` usage).
2. **No PII leak** — `rg -n "08[0-9]{8,}|0[0-9]{9,}" dist/` returns nothing (phone); email is intentional and reviewed.
3. **sitemap present** — `dist/sitemap-index.xml` or `dist/sitemap-0.xml` exists.
4. **OG image present** — `dist/og-default.png` exists (or the meta tag points to a valid URL).
5. **Accessibility** — no empty links/buttons, every image has `alt`, heading order is correct, contrast ≥ 4.5:1.
6. **Performance targets** — Lighthouse (or manual) mobile: Performance/SEO/Best Practices ≥ 90, Accessibility ≥ 95.

## Report

List pass/fail per check with file:line references. Do not fix design issues yourself — flag them for the designer. Fix only mechanical problems (broken link, missing alt, stray PII).

## Hard rules

- Never delete or weaken a check to make it pass.
- If a check cannot run (e.g. Lighthouse not installed), say so explicitly rather than skipping silently.
