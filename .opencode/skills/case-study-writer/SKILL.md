---
name: case-study-writer
description: Turn a single CV bullet or project summary into a structured case study in src/content/projects/*.mdx using Problem / Approach / Result / Artifact. Use when adding a project, expanding a draft, or when asked to "write a case study". Never invents metrics, names, or links.
license: MIT
compatibility: opencode
metadata:
  audience: owner
  stack: astro
---

## What I do

Take a project idea (or a bullet from `src/data/cv.json`) and write a case study file that matches the `projects` collection schema in `src/content.config.ts`.

## Structure

Every case study uses this body outline:

1. `## Problem` — the pain before this work existed (concrete, 1–3 sentences).
2. `## Approach` — what was built and how, in plain language.
3. `## Result` — bulleted outcomes, with metrics when available.
4. `## Artifact` — link, screenshot, or diagram (only if the user provides one).

## Hard rules

- NEVER invent metrics, product names, employer names, or URLs. If you don't have a number, write `**TODO:** add a measurable outcome` instead of guessing.
- Copy any metric verbatim from `src/data/cv.json` — keep numbers byte-identical.
- Internal/NDA work gets `status: internal` and a note like "Internal project — details under NDA". Never fabricate a live link for it.
- New or unfinished case studies must have `draft: true`. Flip to `draft: false` only after the user confirms the content.
- Match the schema: `title`, `summary` (≤180 chars), `year`, `company`, `role`, `stack[]`, plus optional `outcome`, `liveUrl`, `repoUrl`, `status`, `featured`, `order`, `draft`.

## Before finishing

- [ ] `bunx astro sync` passes
- [ ] No invented metric (grep for numbers and cross-check against `cv.json`)
- [ ] `draft: true` is set when content is unconfirmed
