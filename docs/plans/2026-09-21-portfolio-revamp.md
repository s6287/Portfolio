# Portfolio Revamp Implementation Plan

> **For agentic workers:** execute task by task, in order. Steps use checkbox (`- [ ]`) syntax for tracking. Logic tasks are test-first.

**Goal:** Replace the single-file Vite portfolio with a statically generated Next.js site that positions Shivam as a Frontend Developer (React.js, Next.js, TypeScript), with four case-study pages, interactive recreations, full SEO, and none of the old tracking or hidden panels.

**Architecture:** Next.js App Router, server components by default. All copy lives in typed content files under `src/content`. Every interactive demo is a thin client component over a pure, unit-tested function in `src/lib`. Styling is Tailwind v4 driven by CSS custom properties for the light and dark themes.

**Tech Stack:** Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, `@dnd-kit/core`, `next/font` (Gloock, Hanken Grotesk, JetBrains Mono), Vitest, ESLint, `@vercel/analytics`.

**Spec:** `docs/specs/2026-09-21-portfolio-revamp-design.md`

## Global Constraints

- Client names and client or internal URLs covered by the NDA must never appear in `src/`, `public/`, `docs/` or the README. The list itself is kept out of this public repo, in an untracked `.nda-terms.local` file that the content guard test reads.
- Dropped claims must not reappear: `92%`, `25%`, `80%`, `70%`.
- Title is "Front End Developer"; positioning line is "Frontend Developer (React.js, Next.js, TypeScript)"; experience is "2+ years"; joined Jul 2024.
- No secrets, no `.env.example` values, no server endpoints, no third-party calls from the browser except Vercel Analytics.
- Every demo shows the caption "Illustrative recreation · sample data", works by keyboard, and honours `prefers-reduced-motion`.
- Text contrast meets WCAG AA in both themes. One `h1` per page.

---

### Task 1: Scaffold Next.js and remove the old app

**Files:** Delete `src/App.tsx`, `src/main.tsx`, `src/index.css`, `index.html`, `server.ts`, `api/sys-init.ts`, `metadata.json`, `vite.config.ts`, `vercel.json`, `.env.example`. Create `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `.gitignore`, `.github/workflows/ci.yml`.

- [ ] Install `next react react-dom @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities @vercel/analytics` and dev deps `typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss eslint eslint-config-next vitest`.
- [ ] Scripts: `dev`, `build`, `start`, `lint` (`next lint`), `typecheck` (`tsc --noEmit`), `test` (`vitest run`).
- [ ] `globals.css` defines the theme tokens from the spec as CSS variables on `:root` and `[data-theme="dark"]`, mapped into Tailwind with `@theme inline`.
- [ ] CI runs `npm ci`, `lint`, `typecheck`, `test`, `build` on push and pull request.
- [ ] Verify: `npm run build` succeeds. Commit.

### Task 2: Content model with a guard test

**Files:** Create `src/content/site.ts`, `src/content/work.ts`, `src/content/resume.ts`, `src/content/types.ts`. Test: `src/content/content.test.ts`.

**Interfaces – Produces:**

```ts
export type CaseStudy = {
  slug: "spectra" | "ranksense" | "attenview" | "catalogue-saas";
  title: string; kicker: string; summary: string;
  role: string; period: string; team: string; stack: string[];
  problem: string[]; built: string[]; decisions: { title: string; body: string }[];
  outcome: string[]; metrics: { value: string; label: string }[];
  demo: "board" | "dedup" | "import" | "editions";
};
export const work: CaseStudy[];          // ordered as shown on the home page
export function getCaseStudy(slug: string): CaseStudy | undefined;
```

- [ ] Write the failing test `src/content/content.test.ts`: four complete case studies in display order, `getCaseStudy` round-trips, no NDA term in any text file (terms read from the untracked local list), and no dropped claim in `src/content`.
- [ ] Run `npm test` and see it fail, write the content, run again and see it pass. Commit.

### Task 3: Pure demo logic, test-first

**Files:** Create `src/lib/board.ts`, `src/lib/dedup.ts`, `src/lib/merge.ts`, `src/lib/editions.ts` with matching `*.test.ts`.

**Interfaces – Produces:**

```ts
// board.ts
export type Role = "admin" | "manager" | "executive" | "specialist";
export type Column = "todo" | "doing" | "review" | "done";
export type Task = { id: string; title: string; column: Column; assignee: string; team: string };
export function visibleTasks(tasks: Task[], role: Role, me: { name: string; team: string }): Task[];
export function moveTask(tasks: Task[], id: string, to: Column): Task[];
export function canMove(role: Role, from: Column, to: Column): boolean;
// dedup.ts
export type TrackedKeyword = { project: string; keyword: string };
export function planRun(items: TrackedKeyword[]): { unique: string[]; duplicates: number; apiCalls: number; saved: number; savedPct: number; workers: number };
export function workersNeeded(pending: number): number;        // min(ceil(pending / 100), 20), at least 1 when pending > 0
// merge.ts
export type Row = { name: string; email?: string; company?: string };
export type MergeResult = { created: Row[]; merged: { into: Row; from: Row }[]; review: Row[] };
export function normalise(s: string): string;
export function mergeRows(existing: Row[], incoming: Row[]): MergeResult;
export function chunk<T>(items: T[], size: number): T[][];
// editions.ts
export type EditionId = "default" | "diwali" | "holi" | "christmas";
export const editions: Record<EditionId, { name: string; tagline: string; tokens: Record<string, string> }>;
```

- [ ] Tests to write first (each must fail before the code exists):
  - `visibleTasks`: specialist sees only own tasks; executive sees own team; manager and admin see all.
  - `canMove`: only manager or admin may move into `done`; anyone may move `todo → doing → review`.
  - `moveTask` returns a new array and leaves the input untouched.
  - `workersNeeded(0) === 0`, `(1) === 1`, `(250) === 3`, `(5000) === 20`.
  - `planRun` on 6 items with 2 repeated keywords gives `apiCalls 4`, `saved 2`, `savedPct 33`; matching is case and whitespace insensitive.
  - `normalise("  Rahul  S. ") === "rahul s"`.
  - `mergeRows`: same email merges; same normalised name with no email goes to `review`; everything else is `created`.
  - `chunk([1,2,3,4,5], 2)` gives `[[1,2],[3,4],[5]]`.
  - every edition defines the same token keys.
- [ ] Implement until green. Commit.

### Task 4: Shell – layout, header, footer, theme

**Files:** `src/app/layout.tsx`, `src/components/site/{Header,MobileNav,Footer,ThemeToggle,SkipLink,Container}.tsx`, `src/components/ui/{Rule,Eyebrow,ButtonLink,Tag}.tsx`.

- [ ] Fonts through `next/font/google`; theme set before paint by a small inline script reading `localStorage.theme` then `prefers-color-scheme`.
- [ ] Header: name, links (Work, Approach, Resume, Contact), theme toggle; below `md` a button that opens a real menu, closes on Escape and on navigation, and traps no focus.
- [ ] Verify by keyboard only: skip link, menu, toggle. Commit.

### Task 5: Home page

**Files:** `src/app/page.tsx`, `src/components/home/{Hero,WorkIndex,Approach,Skills,Experience,Contact}.tsx`.

- [ ] Hero states the positioning line, 2+ years, Mumbai, and two actions (see work, resume).
- [ ] Work index lists the four case studies as numbered editorial rows with stack and one metric each, linking to `/work/[slug]`.
- [ ] Approach = three principles; Skills grouped Frontend first; Experience = Rath Infotech, Front End Developer, Jul 2024 – present; Contact = email, LinkedIn, GitHub.
- [ ] Verify at 360px, 768px, 1280px in both themes. Commit.

### Task 6: Case studies and demos

**Files:** `src/app/work/[slug]/page.tsx` (`generateStaticParams`, `generateMetadata`), `src/components/work/{CaseHeader,FactStrip,Section,Decision,Outcome,NextPrev,DemoFrame}.tsx`, `src/components/demos/{BoardDemo,DedupDemo,ImportDemo,EditionsDemo}.tsx`.

- [ ] `DemoFrame` renders the title, the caption "Illustrative recreation · sample data" and a reset button.
- [ ] BoardDemo uses dnd-kit with pointer and keyboard sensors, a role switcher, and refuses illegal moves with an inline message.
- [ ] DedupDemo, ImportDemo, EditionsDemo consume only the `src/lib` functions. Progress uses timers that are skipped under reduced motion.
- [ ] Unknown slug returns `notFound()`. Commit.

### Task 7: Resume page

**Files:** `src/app/resume/page.tsx`, `src/components/resume/*`, `public/Shivam-Singh-Resume.pdf` (NDA-safe, phone removed), print styles in `globals.css`.

- [ ] Renders from `src/content/resume.ts`; prints cleanly on one A4 page; download button points at the PDF. Commit.

### Task 8: SEO and sharing

**Files:** `src/app/{sitemap.ts,robots.ts,opengraph-image.tsx,icon.svg,not-found.tsx}`, `src/app/work/[slug]/opengraph-image.tsx`, `src/components/seo/JsonLd.tsx`, `src/lib/seo.ts`.

- [ ] Title template `%s · Shivam Singh`, canonical URLs from `site.url`, Person JSON-LD on home, CreativeWork on case studies.
- [ ] Verify the built HTML of `/work/spectra` contains its own title, description and `og:image`. Commit.

### Task 9: README, final verification, push

- [ ] README: what it is, architecture, content editing, scripts, the NDA rule for contributors.
- [ ] Run `npm run lint && npm run typecheck && npm test && npm run build` – all must pass.
- [ ] Search the working tree and the build output for the NDA terms (from the local list) and for `telegram`, `ipapi`, `GEMINI`.
- [ ] Push `revamp`; report the Vercel preview URL to the owner. Do not merge to `main`.

## Self-review against the spec

Hard rules 1–5 → Global Constraints, Task 1 deletions, Task 2 guard test, Task 9 grep. Routes table → Tasks 5–8. Content model → Task 2. Four demos with tested logic → Tasks 3 and 6. Visual design and themes → Tasks 1 and 4. SEO → Task 8. Accessibility and performance → Tasks 4, 6, 9. Rollout → Task 9. No gaps found.
