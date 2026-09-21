# Shivam Singh – portfolio

The source of [shivam-singh-omega.vercel.app](https://shivam-singh-omega.vercel.app): a statically generated Next.js site with four case studies, each with a small working recreation of the hard part of the project.

## Stack

Next.js (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · dnd-kit · Vitest · ESLint · deployed on Vercel.

## How it is put together

```text
src/
  app/                 routes: home, /work/[slug], /resume, sitemap, robots, Open Graph images
  content/             every word on the site, as typed data (site.ts, work.ts, resume.ts)
  lib/                 pure functions behind the demos, each with unit tests
  components/
    site/              header, mobile menu, footer, theme toggle, skip link
    home/  work/       page sections
    demos/             thin client components over the functions in lib/
    seo/               JSON-LD
docs/                  the design spec and the implementation plan for this rebuild
```

Three rules keep it simple:

1. **Copy lives in `src/content`.** Pages only render it, so a text change never touches a component.
2. **Logic lives in `src/lib` and is tested first.** Who may see or move a task, how a rank-tracking run is planned, how messy rows are merged: each is a plain function with its own test file. The demo components only hold UI state.
3. **Server components by default.** Only the demos, the mobile menu and the theme toggle ship JavaScript.

## The demos

| Case study | Demo | Logic |
|---|---|---|
| Spectra | Role-aware task board, drag and drop or buttons | `lib/board.ts` |
| RankSense | Plan a rank-tracking run and see the requests avoided | `lib/dedup.ts` |
| AttenView | Import a messy sheet: new, merged or sent to review | `lib/merge.ts` |
| Catalogue SaaS | One storefront re-themed per event with CSS variables | `lib/editions.ts` |

Every demo is an illustrative recreation with sample data. None of it is production code or client data.

## Design

Light-first editorial layout with a dark mode. Deep navy ink on cool paper, and a single accent with one job: marigold marks what you can touch. Gloock for display, Hanken Grotesk for text, JetBrains Mono only where the content is data. No entrance animations; motion only answers an action, and `prefers-reduced-motion` is respected.

## Scripts

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run typecheck
npm test
npm run build
```

CI runs lint, type-check, tests and a production build on every push.

## Privacy and confidentiality

- No tracking scripts, no cookies, no third-party requests. Visit counts come from Vercel Analytics, which is cookieless.
- Client work is described without client names, client URLs or real screenshots. A guard test fails if a confidential term appears in the source, the docs or this file. The term list is kept in an untracked `.nda-terms.local` file, not in this repository.
