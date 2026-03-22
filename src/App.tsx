/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  Database, 
  Cpu, 
  Layers, 
  Zap,
  BarChart3,
  Code2,
  Server,
  Workflow,
  Search,
  CheckCircle2,
  ArrowDown
} from "lucide-react";

const SEOPipelineDiagram = () => (
  <div className="mt-8 p-8 hardware-card overflow-hidden">
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
        <div className="w-full h-10 rounded border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center text-[11px] font-mono text-emerald-400">
          Orchestrator
        </div>
        <ArrowDown className="w-3 h-3 text-white/20" />
        <div className="w-full py-3 rounded border border-blue-500/30 bg-blue-500/5 flex flex-col items-center justify-center gap-1">
          <div className="text-[11px] font-mono text-blue-400">Worker Pool</div>
          <div className="text-[9px] text-blue-400/60 uppercase tracking-widest">(1–20 concurrent)</div>
        </div>
        <ArrowDown className="w-3 h-3 text-white/20" />
        <div className="w-full h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[11px] font-mono text-[#A1A1AA]">
          API Calls (DataForSEO)
        </div>
        <ArrowDown className="w-3 h-3 text-white/20" />
        <div className="w-full h-10 rounded border border-purple-500/30 bg-purple-500/5 flex items-center justify-center text-[11px] font-mono text-purple-400">
          Deduplication & Sync Layer
        </div>
        <ArrowDown className="w-3 h-3 text-white/20" />
        <div className="w-full h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[11px] font-mono text-[#A1A1AA]">
          PostgreSQL
        </div>
        <ArrowDown className="w-3 h-3 text-white/20" />
        <div className="w-full h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center text-[11px] font-mono text-[#A1A1AA]">
          Dashboard
        </div>
      </div>
    </div>
    <div className="dashed-line opacity-50" />
    <p className="text-center text-[10px] text-[#71717A] uppercase tracking-widest">
      Architecture Walkthrough Available on Request
    </p>
  </div>
);

const PROJECTS = [
  {
    id: "spectra",
    title: "Spectra",
    subtitle: "Multi-tenant Workflow Operating System",
    description: "Most organisations buy Slack for communication, Wrike for tasks, and Basecamp for projects — then struggle to make three tools work as one. Spectra replaces all three with a single internal system built around how the organisation actually works.",
    problem: "A multi-department organisation had no single source of truth for work. Tasks were assigned manually, proof of completion lived in email threads, reviews happened in WhatsApp, and client deliverables were tracked in spreadsheets. Cross-department coordination — where the SEO team's output becomes the web team's input — had no automated handoff.",
    approach: "The core architecture is multi-tenant with skill-based task routing. When a new project enters the system — say, a website build — Spectra automatically creates and assigns tasks across every relevant department in sequence: SEO first for content, then web development, then CRM for client communication, then design for graphics. No manual assignment.",
    details: "Each task follows a defined lifecycle: assigned → proof submitted → review → feedback → scored. Workers submit proof of completion before a task closes. If a task is not doable, it gets flagged for reassignment rather than silently dropped. Managers review proofs and give structured feedback that feeds into each team member's performance matrix. RBAC manages 50+ users across 7 departments — each user sees only what their role permits.",
    tradeoff: "Tradeoff: Prioritized a custom multi-tenant architecture over standard SaaS integrations to enforce strict cross-department data lineage and eliminate the 'fragmented truth' problem inherent in multi-tool workflows.",
    outcome: "Consolidated 3 SaaS subscriptions (Slack, Wrike, Basecamp) totalling $1,250/month. Annual saving: $15K+. Auto-assignment rate reached 70%, eliminating manual task distribution overhead entirely. 50+ daily active users across departments.",
    tags: ["React", "Node.js", "PostgreSQL", "Supabase"],
    metrics: ["$15K+ Annual Savings", "70% Auto-Assignment", "50+ Daily Users"]
  },
  {
    id: "seo",
    title: "SEO Intelligence Platform",
    subtitle: "Automated Keyword Ranking Pipeline",
    description: "A high-frequency ranking pipeline designed to eliminate manual tracking and optimize API credit consumption through intelligent deduplication.",
    problem: "An SEO team was manually tracking keyword rankings, spending 400+ staff hours annually. When they moved to the DataForSEO API, a new problem emerged: the same keyword existed across multiple client projects, triggering redundant API calls and paying for the same data multiple times.",
    approach: "The core insight was separating unique keywords from duplicate keywords before any API call is made. The pipeline identifies true uniques, hits the API once, and then a sync function propagates the ranking data to all duplicate keywords across projects — same result, one API credit.",
    details: "The orchestrator calculates workers dynamically: workersNeeded = Math.min(Math.ceil(pendingCount / 100), 20). Workers fire in parallel and the orchestrator exits immediately to prevent timeout failures on large batches. The full pipeline runs on cron triggers: post-orchestrator → post-workers → sync-duplicate-rankings → get-workers → frontend update.",
    tradeoff: "Tradeoff: Chose batch processing over real-time updates to avoid API rate limits and reduce cost under high concurrency.",
    outcome: "50K+ keywords processed per run in under 10 minutes. Duplicate API calls eliminated — 40% reduction in credit spend, saving $2K+ annually. 400+ staff hours reclaimed.",
    tags: ["TypeScript", "Supabase Edge Functions", "PostgreSQL", "DataForSEO API", "Cron"],
    metrics: ["50K+ Keywords / Run", "40% Credit Saving", "400+ Hours Reclaimed"],
    hasDiagram: true
  },
  {
    id: "crm",
    title: "CGAI CRM",
    subtitle: "Event Attendee Intelligence Platform",
    description: "A production-grade CRM focused on identity resolution for 50K+ event attendees, accelerating sales cycles through automated lead scoring.",
    problem: "A gifting industry association was managing 50K+ attendees in spreadsheets. Inconsistent identifiers (e.g., 'Rahul Shah' vs 'Rahul S.') created invisible duplicates, attendance history was lost between events, and source tracking was non-existent.",
    approach: "The data model separates concerns: one table for deduplicated person records, another for event-specific attendance timelines. The bulk upload handles identifier inconsistency through dynamic reference key selection. Rows missing the primary key go into an unprocessed pool where the system suggests the next best identifier.",
    details: "Duplicate detection runs at the PostgreSQL level using indexed lookups across 50K rows. Batch processing runs in 500-row chunks inside database functions to prevent statement timeouts. Implemented a field-level audit trail where every field has its own _tag, _updated_at, and _updated_by columns for complete data lineage.",
    tradeoff: "Tradeoff: Used database-level deduplication instead of application-layer matching to ensure performance at 50K+ scale.",
    outcome: "Complete lifecycle visibility for every attendee. Lead qualification reduced from 12 hours to 2.5 hours. Duplicate records across events eliminated entirely. Win rates boosted by 25%.",
    tags: ["React", "Node.js", "PostgreSQL", "Supabase", "TypeScript"],
    metrics: ["92% Match Accuracy", "80% Faster Qualification", "25% Conversion Lift"]
  }
];

const SKILLS = [
  {
    category: "Backend & Systems",
    items: ["Node.js", "PostgreSQL", "Supabase", "RESTful APIs", "Batch Processing", "ETL Pipelines", "Edge Functions", "Cron Automation", "Row-Level Security", "Query Optimisation"],
    icon: <Database className="w-5 h-5 text-blue-400" />
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "TanStack Query", "Tailwind CSS"],
    icon: <Code2 className="w-5 h-5 text-purple-400" />
  },
  {
    category: "Core_Infrastructure",
    items: ["Node.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Next.js", "System design for data-heavy workflows"],
    icon: <Server className="w-5 h-5 text-emerald-400" />
  }
];

export default function App() {
  return (
    <div className="min-h-screen relative selection:bg-emerald-500/30">
      {/* Global Status Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-emerald-500/20 z-50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
        />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32 relative z-10">
        {/* Hero Section */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-8">
            <div className="status-dot" />
            <span className="micro-label">System Active // Mumbai, IN</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-7xl font-medium mb-8 leading-[1.1] tracking-tight"
              >
                I engineer <span className="text-emerald-500">data-intensive systems</span> that automate workflows and operate under real-world constraints.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xl text-white/60 max-w-2xl leading-relaxed mb-6"
              >
                Software Engineer with 1 year of experience building production systems — including 
                multi-tenant platforms, data pipelines, and CRM systems handling 50K+ records.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-3 mb-12"
              >
                <div className="h-px w-8 bg-emerald-500/30" />
                <p className="micro-label text-emerald-500/60">
                  Building the invisible systems that power large-scale business operations.
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="px-8 py-4 bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors flex items-center gap-2 group">
                  View Work
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="#contact" className="px-8 py-4 border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 group">
                  Contact Me
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="hardware-card border-l-4 border-l-emerald-500">
                <div className="hardware-card-content p-8">
                  <div className="micro-label mb-4">Core_Competencies</div>
                  <div className="space-y-4">
                    {[
                      { icon: Database, text: "Systems Architecture" },
                      { icon: Cpu, text: "Data Processing" },
                      { icon: Layers, text: "Multi-tenant Scaling" }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-white/80">
                        <item.icon className="w-4 h-4 text-emerald-500" />
                        {item.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Bar */}
        <section className="mb-32">
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/10 bg-ink/50 backdrop-blur-md">
            {[
              { label: "Production Systems", value: "03", sub: "Built & Deployed" },
              { label: "Records Processed", value: "50K+", sub: "Per Upload" },
              { label: "Annual Savings", value: "$15K+", sub: "Spectra OS" },
              { label: "Staff Hours", value: "400+", sub: "Reclaimed Annually" }
            ].map((metric, i) => (
              <div key={i} className="p-8 border-r border-b lg:border-b-0 border-white/10 last:border-r-0">
                <div className="micro-label mb-2">{metric.label}</div>
                <div className="text-3xl font-mono font-bold text-emerald-500 mb-1">{metric.value}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">{metric.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies */}
        <section id="projects" className="mb-32">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="micro-label mb-2">Section_01</div>
              <h2 className="text-3xl font-medium">Case Studies</h2>
            </div>
            <div className="h-px flex-grow mx-8 bg-white/10 hidden md:block" />
            <div className="text-right hidden md:block">
              <div className="micro-label">Total_Projects</div>
              <div className="font-mono text-emerald-500">03_SELECTED</div>
            </div>
          </div>

          <div className="space-y-32">
            {PROJECTS.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12"
              >
                <div className="lg:col-span-5">
                  <div className="sticky top-32">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="font-mono text-emerald-500/50 text-sm">0{idx + 1}</span>
                      <div className="h-px w-8 bg-emerald-500/30" />
                      <span className="micro-label">{project.subtitle}</span>
                    </div>
                    <h3 className="text-4xl font-medium mb-6">{project.title}</h3>
                    <p className="text-white/60 leading-relaxed mb-8">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {project.metrics.map(metric => (
                        <div key={metric} className="flex items-center gap-3 text-sm font-mono text-emerald-400">
                          <Zap className="w-3 h-3" />
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="hardware-card">
                    <div className="hardware-card-content p-8 lg:p-12">
                      <div className="space-y-12">
                        <section>
                          <div className="micro-label mb-4 text-emerald-500/60">01_The_Problem</div>
                          <p className="text-white/80 leading-relaxed">{project.problem}</p>
                        </section>
                        
                        <section>
                          <div className="micro-label mb-4 text-emerald-500/60">02_The_Approach</div>
                          <p className="text-white/80 leading-relaxed">{project.approach}</p>
                        </section>

                        {project.hasDiagram && <SEOPipelineDiagram />}

                        <section className="p-6 bg-emerald-500/5 border border-emerald-500/20">
                          <div className="micro-label mb-4 text-emerald-400">03_Engineering_Tradeoff</div>
                          <p className="text-emerald-50/90 italic font-medium leading-relaxed">
                            {project.tradeoff}
                          </p>
                        </section>

                        <section>
                          <div className="micro-label mb-4 text-emerald-500/60">04_Outcome</div>
                          <p className="text-white/80 leading-relaxed">{project.outcome}</p>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Engineering Philosophy */}
        <section id="approach" className="mb-32">
          <div className="hardware-card border-t-4 border-t-emerald-500">
            <div className="hardware-card-content p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <div className="micro-label mb-4">Section_02</div>
                  <h2 className="text-3xl font-medium mb-6">How I think <br />about systems</h2>
                  <div className="dashed-line" />
                  <p className="text-white/40 text-sm leading-relaxed">
                    My approach is defined by three core principles that ensure systems remain 
                    maintainable and performant under load.
                  </p>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    {
                      title: "Constraints drive architecture",
                      desc: "The 20-worker cap in the SEO pipeline isn't arbitrary — it's the intersection of Supabase's Edge Function concurrency limit and DataForSEO's rate limit. I build around real constraints, not ideal conditions."
                    },
                    {
                      title: "Data integrity is non-negotiable",
                      desc: "Field-level audit trails, idempotent batch operations, duplicate detection at the database layer — these aren't nice-to-haves in systems handling 50K-row imports. They're the difference between a system the client trusts and one they stop using."
                    },
                    {
                      title: "Automation should be invisible",
                      desc: "The best outcome for the SEO platform is that the team forgets the pipeline exists — rankings just appear every week. I design for zero manual intervention as the default state."
                    },
                    {
                      title: "Data Lineage",
                      desc: "Every record should tell a story. I implement field-level audit trails so we always know who changed what and when."
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-6 border border-white/5 bg-white/[0.02]">
                      <div className="text-emerald-500 font-mono text-xs mb-2">0{i+1}_</div>
                      <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-32">
          <div className="flex items-center gap-3 mb-12">
            <div className="micro-label">Section_03</div>
            <div className="h-px flex-grow bg-white/10" />
            <h2 className="text-2xl font-medium">Technical Stack</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {SKILLS.map((group, i) => (
              <div key={i} className="bg-ink p-8">
                <div className="flex items-center gap-3 mb-6">
                  {group.icon}
                  <div className="micro-label text-emerald-500/60">{group.category}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-white/5 text-[11px] font-mono text-white/80 border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="hardware-card p-12 text-center relative overflow-visible">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#0A0A0B] border border-white/10 z-30">
              <div className="micro-label">Terminal_End</div>
            </div>
            <div className="hardware-card-content">
              <h2 className="text-4xl lg:text-5xl font-medium mb-8">
                Interested in building <br />
                <span className="text-emerald-500 font-mono tracking-tighter">scalable_systems?</span>
              </h2>
              <p className="text-white/60 mb-12 max-w-xl mx-auto leading-relaxed">
                I'm currently looking for SDE-1 roles at product-driven companies. 
                If you need someone who can bridge the gap between business needs and robust engineering, let's talk.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="mailto:shivamsinghsrs@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  shivamsinghsrs@gmail.com
                </a>
                <div className="flex items-center gap-4">
                  <a href="https://linkedin.com/in/shiivmrajput" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/10 hover:bg-white/5 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://github.com/s6287" target="_blank" rel="noopener noreferrer" className="p-4 border border-white/10 hover:bg-white/5 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Micro-details */}
      <footer className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-12 border-t border-white/5">
          <div className="micro-label">© 2026 SHIVAM_SINGH // ALL_RIGHTS_RESERVED</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="micro-label">Server_Status: Optimal</span>
            </div>
            <div className="micro-label text-white/20">Built_with: React + Tailwind + Engineering</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
