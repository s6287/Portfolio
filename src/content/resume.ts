export const resume = {
  summary:
    "Frontend-focused full-stack developer with 2+ years building production React and TypeScript applications on Supabase and PostgreSQL, end to end: responsive, data-dense interfaces, Row Level Security, stored functions and scheduled pipelines. Shipped three live products with real-time analytics, drag-and-drop workflows, bulk Excel imports and PDF automation.",
  experience: [
    {
      title: "Front End Developer",
      company: "Rath Infotech",
      place: "Mumbai, India",
      period: "Jul 2024 to present",
      points: [
        "Built and shipped three production React and Supabase applications end to end, from interface to PostgreSQL backend: a role-based project management platform, a client reporting portal and a bulk-import CRM.",
        "Lead developer of Spectra, a four-role project management platform with drag-and-drop task boards, Google sign-in restricted by domain, and Zustand plus TanStack Query state. It replaced three paid tools and saves about $15K a year.",
        "Designed the PostgreSQL backend on Supabase: stored functions with multi-step task logic, Row Level Security on every table, and scheduled jobs refreshing a shared daily task pool.",
        "Built RankSense, the rank-tracking module inside Spectra: 50K+ keywords per run in under ten minutes, with a deduplication step that cut API credit use by about 40%.",
        "Built Google Analytics and Search Console dashboards with week-over-week comparison and client-ready PDF reports, cutting manual reporting from hours to minutes.",
        "Delivered a bulk-import CRM handling 50K+ records, with Excel imports of 10K+ rows, smart-merge deduplication and field-level audit trails.",
      ],
    },
  ],
  education: [
    { title: "M.Sc, Computer Science", place: "University of Mumbai", period: "2024 to 2026" },
    { title: "B.Sc, Computer Science", place: "University of Mumbai", period: "2021 to 2024", note: "SGPA 8.58 / 10" },
  ],
  certifications: [
    { title: "Claude Code in Action", issuer: "Anthropic", date: "Jun 2026", url: "https://verify.skilljar.com/c/mhyg4o5fggt8" },
    { title: "JavaScript", issuer: "HackerRank" },
  ],
  pdf: "/Shivam-Singh-Resume.pdf",
} as const;
