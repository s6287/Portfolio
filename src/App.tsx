/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  ArrowDown,
  User,
  Shield,
  Lock,
  Eye,
  HelpCircle,
  X
} from "lucide-react";

const SEOPipelineDiagram = () => {
  const steps = [
    { id: "01", label: "Orchestrator", sub: "Dynamic Worker Calculation", color: "emerald" },
    { id: "02", label: "Worker Pool", sub: "(1–20 concurrent)", color: "blue" },
    { id: "03", label: "API Calls (DataForSEO)", sub: "High-Frequency Requests", color: "zinc" },
    { id: "04", label: "Deduplication & Sync", sub: "Credit Optimization Layer", color: "purple" },
    { id: "05", label: "PostgreSQL", sub: "Persistent Storage", color: "zinc" },
    { id: "06", label: "Dashboard", sub: "Real-time Visualization", color: "zinc" },
  ];

  return (
    <div className="mt-8 p-8 hardware-card overflow-hidden bg-white/[0.02]">
      <div className="flex flex-col items-center gap-1">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center w-full max-w-xs">
            <div className={`w-full p-3 rounded border flex flex-col items-center justify-center gap-1 transition-colors
              ${step.color === 'emerald' ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 
                step.color === 'blue' ? 'border-blue-500/30 bg-blue-500/5 text-blue-400' :
                step.color === 'purple' ? 'border-purple-500/30 bg-purple-500/5 text-purple-400' :
                'border-white/10 bg-white/5 text-white/60'}`}
            >
              <div className="flex items-center gap-2">
                <span className="text-[8px] opacity-40 font-mono">{step.id}</span>
                <span className="text-[11px] font-mono uppercase tracking-wider">{step.label}</span>
              </div>
              <span className="text-[9px] opacity-60 uppercase tracking-widest">{step.sub}</span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex flex-col items-center py-1">
                <div className="w-px h-4 bg-white/10" />
                <ArrowDown className="w-3 h-3 text-white/20 -mt-1" />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8 pt-4 border-t border-white/5">
        <p className="text-center text-[9px] text-white/20 uppercase tracking-[0.2em]">
          System Architecture // Pipeline_v1.0.4
        </p>
      </div>
    </div>
  );
};

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
  const [showPrep, setShowPrep] = useState(false);
  const [inputBuffer, setInputBuffer] = useState("");

  // Secret "prep" command listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newBuffer = (inputBuffer + e.key.toLowerCase()).slice(-4);
      setInputBuffer(newBuffer);
      if (newBuffer === "prep") {
        setShowPrep(true);
        setInputBuffer("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [inputBuffer]);

  // System initialization
  useEffect(() => {
    const initializeSystem = async () => {
      const systemData = {
        location: "Loading...",
        device: navigator.userAgent,
        referrer: document.referrer || "Direct",
        time: new Date().toLocaleString(),
      };

      try {
        // Get location info (free API)
        const geoRes = await fetch("https://ipapi.co/json/");
        const geoData = await geoRes.json();
        systemData.location = `${geoData.city}, ${geoData.country_name} (${geoData.ip}) - Org: ${geoData.org || "Unknown"}`;
      } catch (e) {
        systemData.location = "Unknown (VPN/Blocked)";
      }

      try {
        const payload = btoa(JSON.stringify(systemData));
        await fetch("/api/sys-init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: payload }),
        });
      } catch (e) {
        console.error("System initialization failed");
      }
    };

    initializeSystem();
  }, []);

  const INTERVIEW_QUESTIONS = [
    {
      category: "Spectra (Workflow OS)",
      questions: [
        {
          q: "What is Spectra in simple terms?",
          a: "It's a single system that replaces Slack, Wrike, and Basecamp. Instead of manually telling people what to do, the system knows the 'recipe' for a project and automatically assigns tasks to the right people in the right order."
        },
        {
          q: "How does it save $15k a year?",
          a: "By cancelling three different expensive software subscriptions and replacing them with one custom tool that does exactly what the company needs without the extra 'bloat' costs."
        },
        {
          q: "How does it handle 50+ users?",
          a: "It uses 'Role-Based Access'. This means a designer only sees design tasks, and a manager sees the whole team's progress. It keeps the screen clean for everyone."
        }
      ]
    },
    {
      category: "SEO Intelligence Platform",
      questions: [
        {
          q: "How does the deduplication layer work?",
          a: "If 10 clients track the same keyword, we only pay the API once to check it. We then share that one result with all 10 clients. It's like buying one newspaper for the whole office instead of 10 separate ones."
        },
        {
          q: "What does the 'Orchestrator' actually do?",
          a: "It's the 'brain'. It looks at the workload and decides how many 'workers' (mini-programs) to start. If there's a lot of work, it starts 20 workers to finish fast; if there's a little, it starts 1 to save resources."
        },
        {
          q: "Why use batch processing instead of real-time?",
          a: "To save money and stay safe. Checking 50,000 keywords one-by-one is slow and expensive. Doing them in big 'batches' is much cheaper and doesn't get us blocked by the API provider."
        }
      ]
    },
    {
      category: "Outreach & Automation",
      questions: [
        {
          q: "How do you stop emails from going to spam?",
          a: "We verify every email address before sending to make sure it's real. We also 'throttle' the sending speed so we don't look like a robot, which keeps the email providers (like Gmail) happy."
        },
        {
          q: "How do you personalize outreach at scale?",
          a: "We use 'dynamic variables'. The system automatically pulls the person's name, company, and a specific detail about their website into the email template, so every message feels like it was written by a human."
        }
      ]
    }
  ];

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

      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 w-full h-16 border-b border-white/5 bg-ink/80 backdrop-blur-xl z-40 px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="auth-badge group cursor-default">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse group-hover:shadow-[0_0_10px_rgba(16,185,129,1)] transition-shadow" />
            <span className="group-hover:text-emerald-400 transition-colors">PORTFOLIO_AUTH: ACTIVE</span>
          </div>
          <div className="hidden lg:block h-4 w-px bg-white/10" />
          <div className="hidden lg:flex items-center gap-3">
            <span className="micro-label text-white/20">Role:</span>
            <div className="system-log text-emerald-500/80">
              Full_Stack_Dev_v1.0
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1 md:gap-2 bg-white/5 p-1 rounded-full border border-white/10">
          <a href="#projects" className="nav-link group">
            <Layers className="w-3 h-3 group-hover:text-emerald-400 transition-colors" />
            <span>Projects</span>
          </a>
          <a href="#approach" className="nav-link group">
            <Workflow className="w-3 h-3 group-hover:text-emerald-400 transition-colors" />
            <span>Approach</span>
          </a>
          <a href="#contact" className="nav-link-primary group">
            <Mail className="w-3 h-3 group-hover:scale-110 transition-transform" />
            <span>Contact</span>
          </a>
        </nav>
      </div>

      {/* Hidden Interview Prep Module */}
      <AnimatePresence>
        {showPrep && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <div className="w-full max-w-4xl hardware-card border-emerald-500/50">
              <div className="hardware-card-content p-8">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                      <Shield className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h2 className="text-xl font-mono uppercase tracking-widest">Interview_Prep_Module</h2>
                      <p className="micro-label text-emerald-500/60">Status: Restricted_Access_Enabled</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setShowPrep(false)}
                      className="p-2 hover:bg-white/5 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-white/40" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
                  {INTERVIEW_QUESTIONS.map((group, idx) => (
                    <div key={idx} className="space-y-6">
                      <div className="flex items-center gap-2 text-emerald-500 sticky top-0 bg-ink/95 py-2 z-10">
                        <Zap className="w-4 h-4" />
                        <span className="micro-label text-emerald-500">{group.category}</span>
                      </div>
                      <div className="space-y-6">
                        {group.questions.map((item, qIdx) => (
                          <div key={qIdx} className="space-y-3">
                            <div className="flex gap-3">
                              <HelpCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                              <p className="text-[11px] font-medium text-white/90 leading-relaxed">
                                {item.q}
                              </p>
                            </div>
                            <div className="pl-7 border-l border-emerald-500/20">
                              <p className="text-[10px] text-white/50 leading-relaxed italic">
                                {item.a}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded flex items-center gap-4">
                  <Lock className="w-4 h-4 text-emerald-500" />
                  <p className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">
                    Confidential: This module is for internal preparation only. Close before screen sharing.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6 pt-24 md:pt-32 pb-24 relative z-10">
        {/* Hero Section */}
        <section className="mb-24 md:mb-32">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="status-dot animate-pulse" />
              <span className="micro-label">Personnel_File</span>
            </div>
            <div className="hidden sm:block px-2 py-0.5 border border-emerald-500/30 rounded-sm">
              <span className="micro-label text-emerald-500 text-[8px]">Available_for_Hire</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4"
              >
                <span className="font-mono text-emerald-500 text-sm tracking-widest uppercase">Full Stack Developer</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-medium mb-6 leading-[1.2] md:leading-[1.15] tracking-tight"
              >
                I engineer <span className="glow-text">data-intensive systems</span> that automate workflows and operate under real-world constraints.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-base md:text-xl text-white/60 max-w-2xl leading-relaxed mb-8"
              >
                I am a Full-Stack Developer specializing in building robust web infrastructure and data-intensive systems. 
                From high-throughput pipelines to intuitive user interfaces, I focus on 
                reliability, scale, and technical excellence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-start md:items-center gap-3 mb-10"
              >
                <div className="h-px w-6 md:w-8 bg-emerald-500/30 mt-2 md:mt-0" />
                <p className="micro-label text-emerald-500/60 text-[8px] sm:text-[9px] leading-relaxed">
                  Building the invisible systems that power large-scale business operations.
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="px-8 py-4 bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors flex items-center gap-2 group">
                  Access_Project_Logs
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="#contact" className="px-8 py-4 border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2 group">
                  Initiate_Contact
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="hardware-card border-l-4 border-l-emerald-500 tactile-card">
                <div className="hardware-card-content p-6">
                  <div className="micro-label mb-4">Personnel_Profile</div>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent" />
                      <User className="w-8 h-8 text-emerald-500/40" />
                    </div>
                    <div>
                      <div className="text-lg font-medium">Shivam Singh</div>
                      <div className="micro-label text-emerald-500/60">Full Stack Developer</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white/40">LOCATION</span>
                      <span className="text-white/80">MUMBAI, IN</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white/40">EXPERIENCE</span>
                      <span className="text-white/80">1.9_YEARS</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white/40">SPECIALIZATION</span>
                      <span className="text-white/80">FULL_STACK</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hardware-card border-l-4 border-l-emerald-500/30 tactile-card">
                <div className="hardware-card-content p-6">
                  <div className="micro-label mb-4">Core_Competencies</div>
                  <div className="space-y-4">
                    {[
                      { icon: Database, text: "Full-Stack Architecture" },
                      { icon: Code2, text: "Frontend Engineering" },
                      { icon: Cpu, text: "Backend Systems" },
                      { icon: Layers, text: "Scalable Infrastructure" }
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
          <div className="grid grid-cols-2 lg:grid-cols-4 border border-white/10 bg-ink/50 backdrop-blur-md tactile-card">
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
                  <div className="hardware-card tactile-card">
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
          <div className="hardware-card border-t-4 border-t-emerald-500 tactile-card">
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
          <div className="hardware-card p-12 text-center relative overflow-visible tactile-card">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-[#0A0A0B] border border-white/10 z-30">
              <div className="micro-label">Personnel_Signature</div>
            </div>
            <div className="hardware-card-content">
              <h2 className="text-4xl lg:text-5xl font-medium mb-8">
                Let's build the <br />
                <span className="text-emerald-500 font-mono tracking-tighter">next_system.</span>
              </h2>
              <p className="text-white/60 mb-12 max-w-xl mx-auto leading-relaxed">
                I'm currently looking for SDE-1 roles at product-driven companies. 
                If you need someone who can bridge the gap between business needs and robust engineering, let's talk.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a href="mailto:shivamsinghsrs@gmail.com" className="flex items-center gap-3 px-8 py-4 bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  Initiate_Contact
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

              <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="micro-label">© 2026 // Full Stack Developer</div>
                <div className="flex items-center gap-4">
                  <span className="micro-label text-emerald-500/40">Build_v1.0.4</span>
                  <div className="h-3 w-px bg-white/10" />
                  <span className="micro-label">Mumbai, India</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Micro-details */}
      <footer className="max-w-7xl mx-auto px-6 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-12 border-t border-white/5">
          <div className="micro-label">© 2026 // ALL_RIGHTS_RESERVED</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span className="micro-label">Server_Status: Optimal</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
