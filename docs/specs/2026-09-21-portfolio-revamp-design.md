# Portfolio revamp – design spec

Date: 21 Sep 2026 · Branch: `revamp` · Approved by the owner in chat, point by point.

## Goal

Replace the single-file Vite page with a portfolio that (1) positions Shivam as a **Frontend Developer (React.js, Next.js, TypeScript) who ships whole products**, matching Naukri, LinkedIn and the resume word for word, (2) proves frontend skill by being good frontend work itself, and (3) is safe: no tracking, no hidden panels, no secrets, no client-confidential material.

Success means: a recruiter understands who he is and what he built within 20 seconds on a phone; each case study has its own shareable URL with a proper preview card; Lighthouse scores of 95 or more in every category; the public repo reads as professional work.

## Hard rules

1. **NDA.** No client names, no client or internal app URLs, no real screenshots. Use "a gifting industry association", "an e-commerce catalogue client", "a third-party SERP API". Spectra and RankSense are internal product names and are fine. Every visual of a product is a recreation built in code with sample data and is labelled as such.
2. **Honest numbers only.** Keep figures he can explain in an interview (50+ daily users, 3 tools replaced, about $15K a year, 50K+ keywords per run in under 10 minutes, about 40% fewer API credits, 10K+ row imports, 50K+ records, sole developer in three weeks, 900+ of about 1,750 commits). Drop "92% resolution", "25% win-rate lift", "80% efficiency lift", "70% auto-routing".
3. **No visitor surveillance.** Remove the IP/geo/device tracker and the Telegram endpoint. Cookieless Vercel Analytics only.
4. **Nothing hidden.** Remove the `prep` key-listener panel, the Gemini resume tailoring and the LaTeX template. They now live in a private local file outside this repo.
5. **No secrets in the repo.** The Telegram token that was committed must be revoked by the owner in BotFather. No `.env.example` values.

## Stack

Next.js 16 (App Router) + React 19 + TypeScript (strict) + Tailwind CSS v4. All routes are statically generated at build time. Deployed on the existing Vercel project. `@dnd-kit` for the board demo (the same library used in Spectra). `motion` is dropped; CSS transitions only. Vitest for unit tests. ESLint + `tsc --noEmit` + tests in a GitHub Action.

## Information architecture

| Route | Purpose |
|---|---|
| `/` | Hero, selected work (4), how I work, skills, experience, contact |
| `/work/spectra` | Case study + interactive role-aware task board |
| `/work/ranksense` | Case study (module inside Spectra) + deduplication pipeline simulator |
| `/work/attenview` | Case study + bulk-import and smart-merge simulator |
| `/work/catalogue-saas` | Case study + event-edition theme switcher |
| `/resume` | Web resume, print-friendly, PDF download without phone number |
| `not-found` | Friendly 404 |
| `sitemap.xml`, `robots.txt`, `opengraph-image` (site + per case study), `icon` | SEO and sharing |

Case-study template: one-line summary → facts strip (role, period, team, stack) → the problem → what I built → decisions and trade-offs → outcome → interactive recreation → next/previous.

## Content model

`src/content/site.ts` (identity, links, positioning), `src/content/work.ts` (typed `CaseStudy[]`), `src/content/resume.ts`. Pages render from these files only, so text is edited in one place and a schema test guards required fields and the NDA word list.

## Interactive recreations

Pure logic lives in `src/lib/*` with unit tests; components in `src/components/demos/*` are thin.

| Demo | Logic (tested) | Shows |
|---|---|---|
| Task board | `board.ts`: move task, filter by role | dnd-kit drag and drop with keyboard support; switching role (Admin, Manager, Executive, Specialist) changes what is visible |
| Dedup pipeline | `dedup.ts`: group keywords, count unique vs duplicate, workers = min(ceil(pending/100), 20) | Run button animates workers, shows API calls saved |
| Bulk import | `merge.ts`: normalise names, match, classify new / merged / needs review, chunk by 500 | Progress by chunk, result table with field-level audit tags |
| Edition switcher | `editions.ts`: theme tokens per edition | Default, Diwali, Holi, Christmas storefront hero driven by CSS variables |

All demos respect `prefers-reduced-motion`, work with keyboard only, and carry the caption "Illustrative recreation · sample data".

## Visual design – editorial

Light-first with a dark mode (system preference plus a toggle stored in `localStorage`, set before paint to avoid a flash).

Revised before build: the first draft (warm cream, a terracotta accent, Fraunces and Geist) is the most common generated look, so the free choices were remade for this brief.

- Principle: **marigold marks what you can touch.** Static content is ink on paper; every interactive thing carries the accent. Nothing else uses it.
- Type: **Gloock** (display serif), **Hanken Grotesk** (text), **JetBrains Mono** only where the content is data, inside the demos. Loaded with `next/font`, no layout shift.
- Colour: paper `#F4F5FA`, surface `#FFFFFF`, ink `#141A3C`, muted `#535A82`, rule `#D5D9EA`, accent `#F2A900`. Dark: paper `#0E1230`, surface `#171D45`, ink `#ECEDF7`, accent `#FFB81C`. All text pairs meet WCAG AA.
- Layout: left-aligned, thin rules, large headlines, 17px body on a 68 character measure. Facts are set as tables and definition lists because tables are what the subject builds. No numbered markers, because the content is not a sequence.
- The one bold moment: the hero opens with a working task board instead of a picture or a statistic.
- Motion: only in response to an action. No entrance animations. `prefers-reduced-motion` respected.

## SEO and sharing

Per-page `metadata` (title template, description, canonical), generated Open Graph images, `sitemap.ts`, `robots.ts`, JSON-LD `Person` on home and `CreativeWork` on case studies, semantic landmarks and one `h1` per page.

## Accessibility and performance

Skip link, visible focus rings, working mobile navigation, 44px touch targets, labelled controls, AA contrast, reduced-motion support. Server components by default; only the demos and the theme toggle are client components. Target Lighthouse ≥ 95 in all four categories on mobile.

## Out of scope

Blog, CMS, contact form backend, i18n, animations library, analytics beyond Vercel's.

## Rollout

Build on `revamp` → push → Vercel preview URL → owner reviews → merge to `main`. The live site does not change before that.
