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
  X,
  Terminal,
  FileText,
  Download
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
    subtitle: "Intelligent Workflow Management System",
    description: "Most organisations buy Slack for communication, Wrike for tasks, and Basecamp for projects — then struggle to make three tools work as one. Spectra replaces all three with a single internal system built around how the organisation actually works.",
    problem: "A multi-department organisation had no single source of truth for work. Tasks were assigned manually, proof of completion lived in email threads, reviews happened in WhatsApp, and client deliverables were tracked in spreadsheets. Cross-department coordination — where the SEO team's output becomes the web team's input — had no automated handoff.",
    approach: "I architected and implemented a multi-tenant architecture with skill-based task routing. When a new project enters the system — say, a website build — Spectra automatically creates and assigns tasks across every relevant department in sequence: SEO first for content, then web development, then CRM for client communication, then design for graphics. No manual assignment.",
    details: "Each task follows a defined lifecycle: assigned → proof submitted → review → feedback → scored. Workers submit proof of completion before a task closes. If a task is not doable, it gets flagged for reassignment rather than silently dropped. Managers review proofs and give structured feedback that feeds into each team member's performance matrix. RBAC manages 50+ users across 7 departments — each user sees only what their role permits.",
    tradeoff: "Tradeoff: Prioritized a custom multi-tenant architecture over standard SaaS integrations to enforce strict cross-department data lineage and eliminate the 'fragmented truth' problem inherent in multi-tool workflows.",
    outcome: "Consolidated 3 SaaS subscriptions (Slack, Wrike, Basecamp) totalling $1,250/month. Estimated annual saving: $15K+. Auto-assignment rate reached ~70%, eliminating manual task distribution overhead entirely. 50+ daily active users across departments.",
    tags: ["React", "Node.js", "PostgreSQL", "Supabase"],
    metrics: ["VERIFIED: $15K+ SAVINGS", "EFFICIENCY: 70% AUTO-ROUTING", "50+ Daily Users"]
  },
  {
    id: "seo",
    title: "RankSense",
    subtitle: "SEO Rank Tracking Platform",
    description: "A high-frequency ranking pipeline designed to eliminate manual tracking and optimize API credit consumption through intelligent deduplication.",
    problem: "An SEO team was manually tracking keyword rankings, which was highly inefficient. When they moved to the DataForSEO API, a new problem emerged: the same keyword existed across multiple client projects, triggering redundant API calls and paying for the same data multiple times.",
    approach: "I designed the deduplication logic to separate unique keywords from duplicate keywords before any API call is made. The pipeline identifies true uniques, hits the API once, and then a sync function propagates the ranking data to all duplicate keywords across projects — same result, one API credit.",
    details: "The orchestrator calculates workers dynamically: workersNeeded = Math.min(Math.ceil(pendingCount / 100), 20). Workers fire in parallel and the orchestrator exits immediately to prevent timeout failures on large batches. The full pipeline runs on cron triggers: post-orchestrator → post-workers → sync-duplicate-rankings → get-workers → frontend update.",
    tradeoff: "Tradeoff: Chose batch processing over real-time updates. Real-time would exceed API rate limits and increase cost under concurrency spikes, while batching ensures stability and cost-efficiency.",
    outcome: "50K+ keywords processed per run in under 10 minutes. Duplicate API calls eliminated — approx. 40% reduction in credit spend, saving an estimated $2K+ annually.",
    tags: ["TypeScript", "Supabase Edge Functions", "PostgreSQL", "DataForSEO API", "Cron"],
    metrics: ["THROUGHPUT: 50K+ RECORDS", "OPTIMIZATION: 40% CREDIT LIFT", "Automated Pipeline"],
    hasDiagram: true
  },
  {
    id: "crm",
    title: "AttenView",
    subtitle: "Attendee Insights Dashboard",
    description: "A production-grade CRM focused on identity resolution for 50K+ event attendees, accelerating sales cycles through automated lead scoring.",
    problem: "A gifting industry association was managing 50K+ attendees in spreadsheets. Inconsistent identifiers (e.g., 'Rahul Shah' vs 'Rahul S.') created invisible duplicates, attendance history was lost between events, and source tracking was non-existent.",
    approach: "The data model separates concerns: one table for deduplicated person records, another for event-specific attendance timelines. I optimized the database-level deduplication and bulk upload to handle identifier inconsistency through dynamic reference key selection. Rows missing the primary key go into an unprocessed pool where the system suggests the next best identifier.",
    details: "Duplicate detection runs at the PostgreSQL level using indexed lookups across 50K rows. Batch processing runs in 500-row chunks inside database functions to prevent statement timeouts. Implemented a field-level audit trail where every field has its own _tag, _updated_at, and _updated_by columns for complete data lineage.",
    tradeoff: "Tradeoff: Used database-level deduplication instead of application-layer matching to ensure performance at 50K+ scale.",
    outcome: "Complete lifecycle visibility for every attendee. Lead qualification time reduced by approx. 80%. Duplicate records across events eliminated entirely. Win rates boosted by an estimated 25%.",
    tags: ["React", "Node.js", "PostgreSQL", "Supabase", "TypeScript"],
    metrics: ["ACCURACY: 92% RESOLUTION", "EFFICIENCY: 80% LIFT", "IMPACT: 25% CONVERSION LIFT"]
  }
];

const SKILLS = [
  {
    category: "Backend & Systems",
    items: ["Node.js", "PostgreSQL", "Supabase", "RESTful APIs", "Batch Processing", "ETL Pipelines", "Edge Functions", "Cron Automation", "Row-Level Security", "Query Optimisation"],
    icon: <Database className="w-5 h-5 text-blue-400" />,
    color: "blue"
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "TanStack Query", "Tailwind CSS"],
    icon: <Code2 className="w-5 h-5 text-purple-400" />,
    color: "purple"
  },
  {
    category: "Core_Infrastructure",
    items: ["Node.js", "React", "TypeScript", "PostgreSQL", "Supabase", "Next.js", "System design for data-heavy workflows"],
    icon: <Server className="w-5 h-5 text-emerald-400" />,
    color: "emerald"
  }
];

const RESUME_LATEX_TEMPLATE = `
% Resume in LaTeX - Shivam Singh (Full Stack Developer)
\\documentclass[letterpaper,11pt]{article}

\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}
\\usepackage{fontawesome5}
\\usepackage{multicol}
\\usepackage{xcolor}
\\setlength{\\multicolsep}{-3.0pt}
\\setlength{\\columnsep}{-1pt}
\\input{glyphtounicode}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.6in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1.19in}
\\addtolength{\\topmargin}{-.7in}
\\addtolength{\\textheight}{1.4in}

\\urlstyle{same}

\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Define professional color palette
\\definecolor{primaryblue}{RGB}{0,82,155}
\\definecolor{accentblue}{RGB}{0,102,204}
\\definecolor{darkgray}{RGB}{64,64,64}
\\definecolor{lightgray}{RGB}{128,128,128}

% Sections formatting with color
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large\\bfseries\\color{primaryblue}
}{}{0em}{}[\\color{primaryblue}\\titlerule \\vspace{-5pt}]

\\pdfgentounicode=1

% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{1.0\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{\\color{primaryblue}#1} & \\textbf{\\small\\color{darkgray}#2} \\
      \\textit{\\small\\color{primaryblue}#3} & \\textit{\\small\\color{darkgray}#4} \\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{1.001\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small\\color{primaryblue}#1 & \\textbf{\\small\\color{darkgray}#2}\\
    \\end{tabular*}\\vspace{-7pt}
}

\\renewcommand\\labelitemi{\\$\\vcenter{\\hbox{\\tiny\\$\\bullet\\$}}\\$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.0in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

%-------------------------------------------
%%%%%%  RESUME STARTS HERE  %%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{document}

%----------HEADING-----------
\\begin{center}
    {\\Huge \\scshape\\color{primaryblue} Shivam Singh} \\\\ \\vspace{2pt}
    \\small\\color{darkgray}
    Mumbai, India $|$ +91-6287183433 $|$ \\href{mailto:shivamsinghsrs@gmail.com}{shivamsinghsrs@gmail.com} \\\\
    \\href{https://linkedin.com/in/shiivmrajput}{LinkedIn: shiivmrajput} $|$ \\href{https://github.com/s6287}{GitHub: s6287} $|$ \\href{https://shivam-singh-omega.vercel.app}{Portfolio: shivam-singh-omega}
\\end{center}
\\vspace{-10pt}

%-----------PROFESSIONAL SUMMARY-----------
\\section{Professional Summary}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
    Full Stack Developer with 1.9+ years of experience engineering data-intensive systems and automated workflows. Proven track record of delivering high-impact production applications, including a custom Workflow OS saving \\textbf{\\\$15K+ annually} and an SEO pipeline processing \\textbf{50K+ records per run}. Expert in TypeScript, React, and PostgreSQL, with a focus on system reliability, credit optimization, and technical excellence.
    }}
\\end{itemize}
\\vspace{-18pt}

%-----------TECHNICAL SKILLS-----------
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
     \\textbf{\\color{darkgray}Languages:} JavaScript (ES6+), TypeScript, SQL, Python, HTML5, CSS3 \\\\
     \\textbf{\\color{darkgray}Frontend:} React.js, Next.js, TanStack Query, Tailwind CSS, Framer Motion, Redux \\\\
     \\textbf{\\color{darkgray}Backend:} Node.js, Express.js, Supabase (Edge Functions), RESTful APIs, Webhooks \\\\
     \\textbf{\\color{darkgray}Databases:} PostgreSQL, Query Optimization, Database Indexing, Row-Level Security (RLS) \\\\
     \\textbf{\\color{darkgray}Systems:} ETL Pipelines, Cron Automation, Batch Processing, System Design, RBAC \\\\
     \\textbf{\\color{darkgray}Tools:} Git, GitHub Actions, Vercel, Postman, Docker (Basic), CI/CD
    }}
 \\end{itemize}
 \\vspace{-18pt}

%-----------PROFESSIONAL EXPERIENCE-----------
\\section{Experience}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Associate Web Developer}{July 2024 -- Present}
      {Rath Infotech}{Mumbai, India}
      \\resumeItemListStart
        \\resumeItem{Owned full-stack development across 3 production systems supporting 50+ daily users, managing end-to-end engineering from React UIs to Node.js APIs and PostgreSQL schema modelling.}
        \\resumeItem{Architected a skill-based task routing engine that automated \\textbf{70\\% of manual assignments}, replacing a fragmented multi-tool workflow and saving the organisation \\textbf{\\\$15K+ annually}.}
        \\resumeItem{Developed a high-frequency keyword ranking pipeline processing \\textbf{50K+ records per run} with intelligent deduplication logic, cutting redundant API calls by 40\\% and saving \\textbf{\\\$2K+ in annual API costs}.}
        \\resumeItem{Engineered a React dashboard with real-time data visualisation and bulk Excel import (10K+ rows), reducing lead qualification time from \\textbf{12 hours to 2.5 hours} for the sales team.}
      \\resumeItemListEnd
  \\resumeSubHeadingListEnd
\\vspace{-14pt}

%-----------PROJECTS-----------
\\section{Projects}
    \\vspace{-5pt}
    \\resumeSubHeadingListStart
    
      \\resumeProjectHeading
          {\\textbf{Spectra — Intelligent Workflow Management System}}{}
          \\resumeItemListStart
            \\resumeItem{Architected a multi-tenant SaaS platform from scratch, consolidating 3 subscriptions (Slack, Wrike, Basecamp) into a single internal system, delivering \\textbf{\\\$15K+ annual savings}.}
            \\resumeItem{Implemented a skill-based task routing engine that automatically assigns tasks across departments in sequence (e.g. SEO $\\rightarrow$ Dev $\\rightarrow$ CRM), achieving a \\textbf{70\\% auto-assignment rate}.}
            \\resumeItem{Designed granular RBAC for 50+ users across 7 departments, ensuring strict data lineage and automated handoffs between technical and creative teams.}
          \\resumeItemListEnd
          \\vspace{-15pt}
    
      \\resumeProjectHeading
          {\\textbf{RankSense — SEO Rank Tracking Platform}}{}
          \\resumeItemListStart
            \\resumeItem{Designed a distributed keyword ranking pipeline using a dynamic worker pool (1--20 concurrent workers) calibrated against API rate limits and Supabase Edge Function constraints.}
            \\resumeItem{Built a deduplication layer that separates unique from duplicate keywords before API calls, reducing credit spend by \\textbf{40\\% (\\\$2K+ saved annually)}.}
            \\resumeItem{Orchestrated a webhook-driven ETL pipeline with cron triggers for real-time data synchronization, processing \\textbf{50K+ keywords per run} in under 10 minutes.}
          \\resumeItemListEnd
          \\vspace{-15pt}
          
      \\resumeProjectHeading
          {\\textbf{AttenView — Attendee Insights Dashboard}}{}
          \\resumeItemListStart
            \\resumeItem{Built a production-grade CRM managing \\textbf{50K+ attendee records} with \\textbf{92\\% accuracy} in identity resolution using fuzzy matching and indexed lookups in PostgreSQL.}
            \\resumeItem{Optimized database-level deduplication and batch processing (500-row chunks) to prevent statement timeouts during massive event data imports.}
            \\resumeItem{Developed a predictive lead scoring model that reduced lead qualification time by 80\\% and \\textbf{boosted sales win rates by 25\\%}.}
          \\resumeItemListEnd
          \\vspace{-13pt}
    \\resumeSubHeadingListEnd
\\vspace{-2pt}

%-----------EDUCATION-----------
\\section{Education}
  \\resumeSubHeadingListStart
    \\resumeSubheading
      {Bachelor of Science in Computer Science, SGPA: 8.58/10.0}{2021 -- 2024}
      {University of Mumbai}{Mumbai, India}
  \\resumeSubHeadingListEnd

\\end{document}
`;

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

  const [activeTab, setActiveTab] = useState<"prep" | "tailor">("prep");
  const [jobDescription, setJobDescription] = useState("");
  const [tailoredLatex, setTailoredLatex] = useState(RESUME_LATEX_TEMPLATE);
  const [isTailoring, setIsTailoring] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleGeneratePdf = () => {
    if (!tailoredLatex) return;
    setIsGeneratingPdf(true);
    
    // Attempting texlive.net again with a more standard form construction
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://texlive.net/cgi-bin/latexcgi';
    form.target = '_blank';
    form.enctype = 'multipart/form-data';

    const inputContent = document.createElement('input');
    inputContent.type = 'hidden';
    inputContent.name = 'filecontents[]';
    inputContent.value = tailoredLatex;
    form.appendChild(inputContent);

    const inputName = document.createElement('input');
    inputName.type = 'hidden';
    inputName.name = 'filename[]';
    inputName.value = 'main.tex';
    form.appendChild(inputName);

    const inputEngine = document.createElement('input');
    inputEngine.type = 'hidden';
    inputEngine.name = 'engine';
    inputEngine.value = 'pdflatex';
    form.appendChild(inputEngine);

    const inputReturn = document.createElement('input');
    inputReturn.type = 'hidden';
    inputReturn.name = 'return';
    inputReturn.value = 'pdf';
    form.appendChild(inputReturn);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    // Reset loading state after a short delay
    setTimeout(() => setIsGeneratingPdf(false), 3000);
  };
  const handleTailorResume = async () => {
    if (!jobDescription.trim()) return;

    // Check for API key if not in environment
    if (!process.env.GEMINI_API_KEY) {
      const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio?.openSelectKey();
        // After opening dialog, we assume user will select a key.
        // The next attempt will use the selected key.
        return;
      }
    }

    setIsTailoring(true);
    try {
      const { GoogleGenAI } = await import("@google/genai");
      // Create a fresh instance to ensure it picks up the latest key
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || (process.env as any).API_KEY });
      
      const prompt = `
        You are an expert ATS Resume Optimizer. 
        I am giving you a LaTeX resume and a Job Description (JD).
        Your task is to rewrite the LaTeX resume to perfectly match the JD while keeping the facts true.
        
        RULES:
        1. Keep the LaTeX structure EXACTLY as provided.
        2. Highlight keywords from the JD in the Professional Summary and Experience bullet points.
        3. Ensure the quantifiable metrics ($15K savings, 50K keywords, etc.) are preserved but framed to match the JD's goals.
        4. Return ONLY the LaTeX code. No conversational text.
        
        RESUME LATEX:
        ${RESUME_LATEX_TEMPLATE}
        
        JOB DESCRIPTION:
        ${jobDescription}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setTailoredLatex(response.text || "");
    } catch (error) {
      console.error("Tailoring failed:", error);
      alert("System error during optimization. Check API key.");
    } finally {
      setIsTailoring(false);
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-emerald-500/30">
      {/* Immersive Scanline */}
      <div className="scanline" />
      
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
      <div className="fixed top-0 left-0 w-full h-16 border-b border-white/5 bg-ink/80 backdrop-blur-xl z-40 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-6">
          <div className="auth-badge group cursor-default">
            <Terminal className="w-3 h-3 text-emerald-500 group-hover:shadow-[0_0_10px_rgba(16,185,129,1)] transition-all" />
            <span className="group-hover:text-emerald-400 transition-colors">SHIVAM_SINGH</span>
          </div>
          <div className="hidden lg:block h-4 w-px bg-white/10" />
          <div className="hidden lg:flex items-center gap-3">
            <span className="micro-label text-white/20">Role:</span>
            <div className="system-log text-emerald-500/80">
              Full_Stack_Dev_v1.0
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/10">
          <a href="#projects" className="nav-link group">
            <Layers className="w-3 h-3 group-hover:text-emerald-400 transition-colors" />
            <span className="hidden sm:inline">Projects</span>
          </a>
          <a href="#approach" className="nav-link group">
            <Workflow className="w-3 h-3 group-hover:text-emerald-400 transition-colors" />
            <span className="hidden sm:inline">Approach</span>
          </a>
          <a href="#contact" className="nav-link-primary group">
            <Mail className="w-3 h-3 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Contact</span>
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
                      <h2 className="text-xl font-mono uppercase tracking-widest">System_Access_Restricted</h2>
                      <div className="flex gap-4 mt-2">
                        <button 
                          onClick={() => setActiveTab("prep")}
                          className={`micro-label px-3 py-1 rounded transition-colors ${activeTab === 'prep' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
                        >
                          Interview_Prep
                        </button>
                        <button 
                          onClick={() => setActiveTab("tailor")}
                          className={`micro-label px-3 py-1 rounded transition-colors ${activeTab === 'tailor' ? 'bg-emerald-500 text-black' : 'text-white/40 hover:text-white'}`}
                        >
                          Resume_Tailor_v1.0
                        </button>
                      </div>
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

                {activeTab === "prep" ? (
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
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-emerald-500">
                        <Code2 className="w-4 h-4" />
                        <span className="micro-label">Input_Job_Description</span>
                      </div>
                      <textarea 
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the Job Description here..."
                        className="w-full h-[40vh] bg-white/5 border border-white/10 rounded p-4 text-[11px] font-mono text-white/80 focus:border-emerald-500/50 outline-none resize-none"
                      />
                      <button 
                        onClick={handleTailorResume}
                        disabled={isTailoring || !jobDescription}
                        className="w-full py-3 bg-emerald-500 text-black font-mono text-xs uppercase tracking-widest hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isTailoring ? "Optimizing_System..." : "Tailor_LaTeX_Resume"}
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-emerald-500">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="micro-label">Optimized_LaTeX_Output</span>
                        </div>
                        <div className="flex gap-4">
                          {tailoredLatex && (
                            <button 
                              onClick={handleGeneratePdf}
                              disabled={isGeneratingPdf}
                              className="text-[9px] uppercase tracking-widest text-emerald-500 hover:text-white transition-colors flex items-center gap-1"
                              title="Generate PDF using Online Compiler"
                            >
                              <FileText className="w-3 h-3" />
                              [{isGeneratingPdf ? "Compiling_PDF..." : "Generate_PDF"}]
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-[40vh] bg-black/50 border border-white/10 rounded p-4 overflow-auto custom-scrollbar">
                        {tailoredLatex ? (
                          <pre className="text-[9px] font-mono text-emerald-500/80 leading-relaxed whitespace-pre-wrap">
                            {tailoredLatex}
                          </pre>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-white/20 text-center p-8">
                            <Workflow className="w-8 h-8 mb-4 opacity-20" />
                            <p className="text-[10px] uppercase tracking-[0.2em]">Waiting_for_Input</p>
                            <p className="text-[9px] mt-2 opacity-50">Paste a JD and click Tailor to generate optimized LaTeX code.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

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
              <div className="flex flex-col">
                <span className="micro-label leading-none">Personnel_File</span>
                <span className="text-[8px] text-white/20 uppercase tracking-widest mt-1">(About Me)</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-end">
              <div className="px-2 py-0.5 border border-emerald-500/30 rounded-sm">
                <span className="micro-label text-emerald-500 text-[8px]">Available_for_Hire</span>
              </div>
              <span className="text-[8px] text-emerald-500/40 uppercase tracking-widest mt-1">(Open to Roles)</span>
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
                Building <span className="glow-text">scalable systems</span> and automated workflows for real-world use cases.
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
                <a href="#projects" className="px-8 py-4 bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition-colors flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-2">
                    Access_Project_Logs
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <span className="text-[8px] uppercase tracking-widest opacity-60">(View Projects)</span>
                </a>
                <a href="#contact" className="px-8 py-4 border border-white/10 hover:bg-white/5 transition-colors flex flex-col items-center gap-1 group">
                  <div className="flex items-center gap-2">
                    Initiate_Contact
                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[8px] uppercase tracking-widest opacity-40">(Send Email)</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="hardware-card border-l-4 border-l-emerald-500 tactile-card dot-grid">
                <div className="hardware-card-content p-6">
                  <div className="flex flex-col mb-4">
                    <span className="micro-label">Personnel_Profile</span>
                    <span className="text-[8px] text-white/20 uppercase tracking-widest mt-1">(About Me)</span>
                  </div>
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
                      <span className="text-white/80">1.9 years</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-white/40">SPECIALIZATION</span>
                      <span className="text-white/80">FULL_STACK</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hardware-card border-l-4 border-l-emerald-500/30 tactile-card dot-grid">
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
              { label: "Data Throughput", value: "50K+", sub: "THROUGHPUT: 50K+ RECORDS" },
              { label: "Annual Savings", value: "$15K+", sub: "VERIFIED: $15K+ SAVINGS" },
              { label: "System Efficiency", value: "80%", sub: "EFFICIENCY: 80% LIFT" }
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
                  <div className="hardware-card tactile-card dot-grid">
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

                        <div className="pt-8 border-t border-white/5 flex items-center gap-4">
                          <div className="p-2 bg-emerald-500/10 rounded border border-emerald-500/20">
                            <Shield className="w-4 h-4 text-emerald-500" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">
                              [SYSTEM_NOTICE]: Codebase_Encrypted_NDA
                            </span>
                            <span className="text-[9px] text-white/30 uppercase tracking-[0.15em] mt-1">
                              Open for architecture walkthrough on a call
                            </span>
                          </div>
                        </div>
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
          <div className="hardware-card border-t-4 border-t-emerald-500 tactile-card dot-grid">
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
                  <div className={`micro-label ${
                    group.color === 'blue' ? 'text-blue-500/60' : 
                    group.color === 'purple' ? 'text-purple-500/60' : 
                    'text-emerald-500/60'
                  }`}>{group.category}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(skill => (
                    <span key={skill} className={`px-3 py-1 bg-white/5 text-[11px] font-mono border transition-colors ${
                      group.color === 'blue' ? 'text-blue-400 border-blue-500/10 hover:border-blue-500/30' : 
                      group.color === 'purple' ? 'text-purple-400 border-purple-500/10 hover:border-purple-500/30' : 
                      'text-emerald-400 border-emerald-500/10 hover:border-emerald-500/30'
                    }`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture Walkthrough CTA */}
        <section className="mb-32">
          <div className="hardware-card border-emerald-500/30 bg-emerald-500/[0.02] tactile-card dot-grid">
            <div className="hardware-card-content p-8 md:p-16 text-center">
              <div className="flex justify-center mb-8">
                <div className="p-5 bg-emerald-500/10 rounded-full border border-emerald-500/20 animate-pulse">
                  <Workflow className="w-10 h-10 text-emerald-500" />
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-medium mb-6 uppercase tracking-tight">
                Request_Architecture_Walkthrough
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Interested in the technical implementation details? I'm available for deep-dive calls to walk through system design, 
                database schemas, and scaling strategies for any of the projects listed above.
              </p>
              <div className="flex flex-col items-center gap-4">
                <a 
                  href="mailto:shivamsinghsrs@gmail.com?subject=Architecture Walkthrough Request"
                  className="px-12 py-5 bg-emerald-500 text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.2)] group flex items-center gap-3"
                >
                  Initiate_System_Deep_Dive
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
                <span className="text-[10px] text-emerald-500/40 uppercase tracking-[0.3em] mt-2">
                  (Loom / Video Call / Technical Review)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <div className="hardware-card p-12 text-center relative overflow-visible tactile-card dot-grid">
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
