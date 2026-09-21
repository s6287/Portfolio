import type { CaseStudy } from "./types";

export const work: CaseStudy[] = [
  {
    slug: "spectra",
    title: "Spectra",
    kind: "Project management platform",
    summary:
      "An internal platform that replaced three paid tools with one place to assign work, prove it was done and review it. More than 50 people use it every day.",
    role: "Lead developer, frontend and database",
    period: "May 2025 to present",
    team: "Five contributors. I wrote 900+ of about 1,750 commits.",
    stack: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Radix UI", "Zustand", "TanStack Query", "dnd-kit", "TipTap", "Supabase", "PostgreSQL"],
    problem: [
      "Work lived in three separate tools: one for chat, one for tasks and one for projects. Proof of completed work sat in email threads, reviews happened in a messaging app, and nobody could answer a simple question: what is everyone working on right now?",
      "Each tool charged per seat, and none of them matched how the teams actually hand work to each other.",
    ],
    built: [
      "A React and TypeScript single-page app with four roles: admin, manager, executive and specialist. Each role gets a different view of the same data.",
      "Drag-and-drop task boards with keyboard support, a rich-text activity log, guided onboarding tours and a review flow where managers check outcomes with AI-assisted summaries.",
      "Analytics dashboards fed by Google Analytics and Search Console, with week-over-week comparisons and client-ready PDF exports.",
      "A PostgreSQL backend on Supabase: Row Level Security on every table, stored functions for multi-step task logic, and scheduled jobs that refresh a shared daily task pool.",
    ],
    decisions: [
      {
        chose: "Access rules in the database",
        over: "Permission checks inside components",
        because: "A missed check in one component leaks data. With Row Level Security the query simply returns less, so the frontend cannot get it wrong.",
      },
      {
        chose: "Server state in TanStack Query, UI state in Zustand",
        over: "One global store for everything",
        because: "Cached server data and local interface state change for different reasons. Keeping them apart removed a whole class of stale-screen bugs.",
      },
      {
        chose: "Build one tool",
        over: "Integrate the three existing ones",
        because: "Integrations would still leave three sources of truth. An internal tool only wins if it is less work than what it replaces, so every feature had to remove a step.",
      },
    ],
    outcome: [
      "Three subscriptions cancelled, saving about $15K a year.",
      "50+ daily users across departments, on one source of truth.",
      "Manual client reporting went from hours to minutes.",
    ],
    metrics: [
      { value: "50+", label: "people use it daily" },
      { value: "3", label: "paid tools replaced" },
      { value: "900+", label: "commits by me" },
    ],
    demo: "board",
    demoTitle: "Try the board",
    demoIntro: "Drag a card, or use the Back and Forward buttons on it. Switch role to see the same board through different eyes. Only a manager or admin can approve work.",
  },
  {
    slug: "ranksense",
    title: "RankSense",
    kind: "SEO rank-tracking module inside Spectra",
    summary:
      "The keyword rank-tracking module I built into Spectra for the SEO team. It checks 50K+ keywords per run in under ten minutes, and pays for each keyword only once.",
    role: "Sole developer of the module",
    period: "Sep 2025 to present",
    team: "Built for the in-house SEO team",
    stack: ["TypeScript", "Supabase Edge Functions", "PostgreSQL", "Third-party SERP API", "Cron", "React", "Recharts"],
    problem: [
      "Rankings were checked by hand. Moving to a ranking API fixed the labour, then the bill exposed a new problem: the same keyword often exists in several projects.",
      "Every project fired its own request. Same keyword, same answer, paid for again and again.",
    ],
    built: [
      "A planning step that collects every keyword due for a check and separates true uniques from duplicates before any request is made.",
      "An orchestrator that sizes a pool of 1 to 20 workers from the workload, starts them in parallel and exits at once, so large batches never hit a timeout.",
      "A sync step that copies each result to every project sharing that keyword, plus weekly and monthly ranking tables, proof of the search result, bulk upload of keyword targets from Excel, and client-ready reports.",
    ],
    decisions: [
      {
        chose: "Batch runs on a schedule",
        over: "Real-time updates",
        because: "Rankings do not change by the minute. Real-time would hit rate limits and spike cost under load. Batching is stable and cheap.",
      },
      {
        chose: "Deduplicate before the request",
        over: "Cache responses after it",
        because: "A cache still pays for the first of each duplicate in every project. Planning first means the request is never made.",
      },
      {
        chose: "Do the matching in PostgreSQL",
        over: "Match in application code",
        because: "At this size the database is faster and more reliable, and the rule lives in one place.",
      },
    ],
    outcome: [
      "50K+ keywords processed per run in under ten minutes.",
      "About 40% fewer API credits for the same data.",
      "Manual rank checking removed entirely.",
    ],
    metrics: [
      { value: "50K+", label: "keywords per run" },
      { value: "<10 min", label: "for a full run" },
      { value: "~40%", label: "fewer API credits" },
    ],
    demo: "dedup",
    demoTitle: "Run the planner",
    demoIntro: "Three projects track overlapping keywords. Add or remove a few, then plan the run to see how many requests are actually needed.",
  },
  {
    slug: "attenview",
    title: "AttenView",
    kind: "Bulk-import CRM for an industry association",
    summary:
      "A CRM for a gifting industry association that had 50K+ contacts spread across spreadsheets. I built it alone in three weeks, around one hard problem: importing messy data without creating duplicates.",
    role: "Sole developer",
    period: "Aug to Sep 2025",
    team: "Just me, working with the association's staff",
    stack: ["React 19", "TypeScript", "Vite", "Ant Design", "Tailwind CSS", "Supabase", "PostgreSQL", "xlsx"],
    problem: [
      "Tens of thousands of contacts lived in spreadsheets. The same person appeared as a full name in one sheet and an initial in another, so duplicates were invisible and history was lost between events.",
      "Staff needed to upload new sheets themselves, safely, without a developer in the loop.",
    ],
    built: [
      "An Excel import that handles 10K+ rows: it validates in the browser, shows progress, and sends the data in batches so nothing times out.",
      "Smart-merge rules: a certain match merges, an uncertain one goes to a review queue with a suggested match, and nothing is guessed silently.",
      "A field-level audit trail, so every value records who changed it, when, and from which upload, plus an upload history with secure file storage and Excel exports.",
    ],
    decisions: [
      {
        chose: "Send uncertain matches to a person",
        over: "Fuzzy-match everything automatically",
        because: "A wrong merge destroys data quietly. A review queue costs a minute and keeps trust in the system.",
      },
      {
        chose: "Deduplicate inside the database in 500-row batches",
        over: "Compare rows in the browser",
        because: "Indexed lookups stay fast at 50K+ records, and batching avoids statement timeouts.",
      },
      {
        chose: "Audit every field",
        over: "One updated-at stamp per row",
        because: "When two uploads disagree, staff need to see which sheet a value came from before they trust it.",
      },
    ],
    outcome: [
      "50K+ records in one deduplicated system instead of scattered sheets.",
      "Staff import 10K-row files on their own.",
      "Delivered by one developer in three weeks.",
    ],
    metrics: [
      { value: "50K+", label: "records deduplicated" },
      { value: "10K+", label: "rows per import" },
      { value: "3 weeks", label: "solo, start to live" },
    ],
    demo: "import",
    demoTitle: "Import a messy sheet",
    demoIntro: "The sheet below has a repeated email, a near-duplicate name and some new people. Run the import and watch where each row ends up.",
  },
  {
    slug: "catalogue-saas",
    title: "Catalogue SaaS",
    kind: "Multi-tenant storefront for an e-commerce client",
    summary:
      "A multi-tenant product catalogue with a Laravel admin and a React storefront. I fixed the tenancy bugs and built Event Editions: one storefront that re-themes itself for Diwali, Holi and Christmas.",
    role: "Contributing developer in a two-person team",
    period: "Aug 2026",
    team: "Two developers",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Laravel", "Filament", "Sanctum API", "MySQL"],
    problem: [
      "Several members share one catalogue platform, and a handful of bugs let tenant boundaries blur: routes, pricing visibility and approvals.",
      "The client also wanted seasonal storefronts without maintaining a separate site for each festival.",
    ],
    built: [
      "Tenancy fixes: renamed routes, a price gate, bulk product approval, and upload on behalf of a member.",
      "Event Editions end to end: an admin screen to define an edition, a themed storefront hero per event driven by CSS variables rather than images, and a safe fallback to the full catalogue when an edition has no products.",
      "Reproducible seeding, a one-time data migration, loading and empty states for the storefront, and setup documentation so a fresh clone runs first time.",
    ],
    decisions: [
      {
        chose: "Themes as CSS variables",
        over: "A set of images per festival",
        because: "A new edition is a few tokens, not a design job. It loads instantly and cannot break the layout.",
      },
      {
        chose: "Fall back to the full catalogue",
        over: "Show an empty edition",
        because: "An empty storefront looks broken. A visitor should always see something to buy.",
      },
    ],
    outcome: [
      "Three seasonal storefronts from one codebase.",
      "Tenant boundaries enforced on routes, prices and approvals.",
      "A new developer can clone and run the project from the docs alone.",
    ],
    metrics: [
      { value: "3", label: "event editions shipped" },
      { value: "1", label: "codebase for all of them" },
      { value: "17", label: "commits in one week" },
    ],
    demo: "editions",
    demoTitle: "Switch the edition",
    demoIntro: "One storefront component. Pick an edition and only the theme tokens change.",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return work.find((study) => study.slug === slug);
}
