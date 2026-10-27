---
name: cv-to-portfolio
description: Extract a CV/resume (PDF, DOCX, or TXT) into structured, typed data for this portfolio site — profile, experience, skills, and draft project case studies. Use when the user drops a CV file, asks to "ambil data dari CV", or wants to refresh portfolio content from an updated resume.
license: MIT
compatibility: opencode
metadata:
  audience: owner
  stack: astro
---

## What I do

1. Extract raw text from the CV file.
2. Write the normalized source of truth to `src/data/cv.json`.
3. Regenerate the typed modules: `src/data/profile.ts`, `src/data/experience.ts`, `src/data/skills.ts`.
4. Draft one MDX case study per role in `src/content/projects/` with `draft: true`.
5. Optionally copy the PDF to `public/cv.pdf` for a download button.

## Extraction

macOS (preferred, no install needed) — replace `<PATH>` with the CV path:

```bash
swift -e 'import Foundation; import PDFKit; let d = PDFDocument(url: URL(fileURLWithPath: CommandLine.arguments[1]))!; for i in 0..<d.pageCount { print(d.page(at: i)!.string ?? "") }' -- "<PATH>"
```

Fallbacks:

```bash
pdftotext -layout "<PATH>" -            # PDF, if poppler is installed
textutil -convert txt "<PATH>" -stdout  # DOCX/DOC on macOS
```

Never guess text that extraction dropped — report it as missing instead.

## Hard rules

- NEVER invent metrics, dates, employers, titles, or URLs. Numbers must appear verbatim in the CV.
- Mark every uncertain field `TODO:` and print a consolidated TODO list at the end of the run.
- `phone` is stored only under `cv.json._private` and MUST NOT appear in any generated `.ts`, `.mdx`, or page output. If the repo will be public, omit it entirely.
- Do not create repo/live URLs the user has not confirmed.
- Keep the CV's original bullet wording in `experience`; rewrite only for the case-study layer, and keep numbers byte-identical.
- If a target file already exists, diff before overwriting and ask.

## Output schema (`src/data/cv.json`)

```json
{
  "name": "string",
  "headline": "string",
  "location": "string",
  "email": "string",
  "links": { "github": "string?", "linkedin": "string?" },
  "summary": "string",
  "experience": [
    {
      "company": "string",
      "title": "string",
      "start": "YYYY-MM",
      "end": "YYYY-MM|present",
      "bullets": ["string"]
    }
  ],
  "skills": ["string"],
  "education": [{ "degree": "string", "school": "string", "year": 0 }],
  "languages": ["string"],
  "_private": { "phone": "string?" }
}
```

## Verification before finishing

- [ ] `bunx astro sync` passes (content schema valid)
- [ ] `bunx astro check` passes
- [ ] `rg -n "08[0-9]{8,}|0[0-9]{9,}" src/ public/` returns nothing (phone-leak check)
- [ ] Every metric in `src/content/projects/*.mdx` exists in `cv.json`
- [ ] New case studies have `draft: true`
- [ ] Consolidated TODO list printed to the user
