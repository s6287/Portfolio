export const site = {
  name: "Shivam Singh",
  role: "Frontend Developer",
  url: "https://shivam-singh-omega.vercel.app",
  location: "Mumbai, India",
  email: "shivamsinghsrs@gmail.com",
  headline: "I build the tools teams work in all day.",
  intro:
    "Frontend developer in Mumbai with 2+ years of React, Next.js and TypeScript. I ship internal platforms end to end, from the first screen to the database rules behind it.",
  description:
    "Shivam Singh is a frontend developer in Mumbai working with React, Next.js and TypeScript. Case studies of a project management platform, an SEO rank-tracking module, a bulk-import CRM and a multi-tenant catalogue storefront.",
  links: {
    linkedin: "https://www.linkedin.com/in/shiivmrajput/",
    github: "https://github.com/s6287",
  },
  nav: [
    { href: "/#work", label: "Work" },
    { href: "/#approach", label: "Approach" },
    { href: "/resume", label: "Resume" },
    { href: "/#contact", label: "Contact" },
  ],
} as const;

export const approach = [
  {
    title: "The interface is the product",
    body: "People judge an internal tool by how many clicks their day takes. I design the screens around the job, keep dense data readable, and make every state obvious: loading, empty, wrong and done.",
  },
  {
    title: "Rules belong in the database",
    body: "Who can see what is enforced with PostgreSQL Row Level Security and stored functions, not scattered through components. The frontend stays simple because it never has to decide.",
  },
  {
    title: "Boring beats clever",
    body: "Batch jobs over fragile real-time, one fetch instead of ten, a small tested function instead of a framework. The cheapest request is the one you never make.",
  },
] as const;

export const skills = [
  {
    group: "Frontend",
    items: ["React 18 and 19", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Radix UI", "Ant Design", "Zustand", "TanStack Query", "React Router", "dnd-kit", "Recharts and ApexCharts"],
  },
  {
    group: "Backend and data",
    items: ["Supabase", "PostgreSQL", "Row Level Security", "RPC functions", "Edge Functions", "Node.js", "REST APIs", "Cron jobs"],
  },
  {
    group: "Delivery",
    items: ["Git and GitHub Actions", "Vercel", "Vitest", "Excel and PDF pipelines", "Figma handoff", "Agile delivery"],
  },
] as const;
