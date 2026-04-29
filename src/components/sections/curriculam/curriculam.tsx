"use client";

import { BlueCirclePattern } from "@/components/patterns/blue-circle-pattern";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

/** Highlight pill in curriculum hero headline */
const HEADING_PRIMARY = "var(--aa-primary)";

const TAB_ICON_CLASS =
  "h-5 w-auto max-h-5 max-w-[5.25rem] shrink-0 object-contain object-center sm:h-7 sm:max-h-7 sm:max-w-[6.5rem]";

/** Slightly larger MySQL mark so it matches visual weight of other tab icons */
const TAB_ICON_CLASS_MYSQL =
  "h-7 w-auto max-h-7 max-w-[7rem] shrink-0 object-contain object-center sm:h-9 sm:max-h-9 sm:max-w-[8rem]";

const TAB_FOCUS =
  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--aa-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Active tab — same primary blue + glow for every track */
const ACTIVE_TAB_BUTTON_STYLE: CSSProperties = {
  backgroundColor: "var(--aa-primary)",
  boxShadow:
    "0 0 0 1px rgba(26, 115, 232, 0.14), 0 12px 40px -12px rgba(26, 115, 232, 0.42)",
};

/** Learn list bullets — match primary */
const PRIMARY_LIST_DOT_RING = "rgba(26, 115, 232, 0.28)";

type TabId = "genai" | "python" | "powerbi" | "sql";

type HeroStatTone = "blue" | "fuchsia" | "emerald";

type CurriculumTab = {
  id: TabId;
  /** Accessible name when the tab is icon-only */
  label: string;
  /** Optional text shown beside the icon (Gen AI only) */
  pillLabel?: string;
  iconSrc: string;
  title: string;
  meta: string;
  description: string;
  /** Three highlight stats shown beside the hero copy (reference-style cards) */
  heroStats: readonly {
    value: string;
    label: string;
    tone: HeroStatTone;
  }[];
  learn: readonly string[];
  outcomes: readonly string[];
  /** Optional second list (e.g. trends) shown under “What you’ll learn” */
  trendsHeading?: string;
  trendsItems?: readonly string[];
  /** Replace with your course preview URLs */
  videoEmbedUrl: string;
  accent: {
    /** Theme color (chips, section tint) */
    solid: string;
    /** Soft background tint */
    soft: string;
    /** Glow shadow */
    glow: string;
    /** Bullet / chip border tint */
    ring: string;
  };
};

const CURRICULUM_TABS: readonly CurriculumTab[] = [
  {
    id: "genai",
    label: "Gen AI",
    pillLabel: "Gen AI",
    iconSrc: "/assets/technology/ai.svg",
    title: "Data & Generative AI",
    meta: "6 Weeks • Live + Recorded • Intermediate → Advanced",
    description:
      "From LLM foundations to production GenAI—then the 2026 market signals hiring teams actually watch for.",
    heroStats: [
      { value: "35%", label: "CAGR Growth", tone: "blue" },
      { value: "₹50L", label: "Max Package", tone: "fuchsia" },
      { value: "7L+", label: "Openings", tone: "emerald" },
    ],
    learn: [
      "AI & ML foundations — supervised, unsupervised & reinforcement",
      "LLMs — GPT, Gemini, Claude — architecture & applications",
      "Prompt engineering & RAG (Retrieval-Augmented Generation)",
      "LangChain, LlamaIndex & vector database integration",
      "Building custom GenAI products & AI-powered workflows",
      "MLOps — model deployment, monitoring & CI/CD pipelines",
      "Hugging Face, fine-tuning & open-source LLM deployment",
      "Capstone: production-ready GenAI application",
    ],
    trendsHeading: "2026 market intelligence",
    trendsItems: [
      "GenAI growing 3× faster than classical ML libraries — PyTorch now #1 AI framework",
      "Agentic AI — autonomous agents that plan, execute & verify entire workflows",
      "RAG evolving beyond vector search → graph-aware, hybrid & multimodal retrieval",
      "AI factories: Procter & Gamble, Intuit building internal GenAI operating systems",
      "Prompt engineering is the fastest ROI skill for any data professional in 2026",
      "35% CAGR in data + AI sector — 5–7 lakh openings in Bengaluru & Hyderabad",
      "GenAI Developer salary: ₹18–50 LPA • MLOps: ₹20–35 LPA at top MNCs",
    ],
    outcomes: ["AI Engineer", "GenAI Developer", "ML Engineer"],
    videoEmbedUrl: "https://www.youtube.com/embed/8vNgtV-nquI?rel=0",
    accent: {
      solid: "#7c3aed",
      soft: "rgba(124, 58, 237, 0.08)",
      glow: "0 0 0 1px rgba(124, 58, 237, 0.12), 0 12px 40px -12px rgba(124, 58, 237, 0.45)",
      ring: "rgba(124, 58, 237, 0.25)",
    },
  },
  {
    id: "python",
    label: "Python",
    iconSrc: "/assets/technology/python.svg",
    title: "Python for Data Analytics",
    meta: "8 Weeks • Live + Recorded • Beginner → Advanced",
    description:
      "Build a strong analytics core in Python—then layer in how teams actually work in 2026: GenAI helpers, cloud warehouses, AutoML, and the stack employers screen for.",
    heroStats: [
      { value: "32%", label: "CAGR Growth", tone: "blue" },
      { value: "₹42L", label: "Max Package", tone: "fuchsia" },
      { value: "6L+", label: "Openings", tone: "emerald" },
    ],
    learn: [
      "Python fundamentals, data structures & OOP",
      "Pandas & NumPy — data manipulation & analysis",
      "Data cleaning, wrangling & preprocessing pipelines",
      "Matplotlib, Seaborn & Plotly — visual storytelling",
      "EDA, statistical analysis & hypothesis testing",
      "Scikit-learn ML intro — regression, classification, clustering",
      "Git & GitHub — portfolio & version control",
      "2 sector-based capstone projects",
    ],
    trendsHeading: "2026 trends & AI integration",
    trendsItems: [
      "Copilot AI inside Jupyter — auto-generates Python code from prompts",
      "PyTorch now more popular than TensorFlow (2025 Google Trends)",
      "GenAI integration growing 3x faster than classical ML libraries",
      "Python + Snowflake/BigQuery = most in-demand stack in 2026",
      "AutoML (H2O.ai, DataRobot) — analysts now build models without PhD",
      "LangChain & LlamaIndex — Python is the #1 GenAI language",
      "Data Engineer + AI skills = ₹12–25 LPA packages at MNCs",
    ],
    outcomes: ["Data Analyst", "Python Developer", "ML Analyst"],
    videoEmbedUrl:
      "https://www.youtube.com/embed/72-lgIWfC8U?list=PLIwLItohWYle7UbbWD91lJZctip5bBiYH&index=14&rel=0",
    accent: {
      solid: "#2563eb",
      soft: "rgba(37, 99, 235, 0.08)",
      glow: "0 0 0 1px rgba(37, 99, 235, 0.12), 0 12px 40px -12px rgba(37, 99, 235, 0.4)",
      ring: "rgba(37, 99, 235, 0.25)",
    },
  },
  {
    id: "powerbi",
    label: "Power BI",
    iconSrc: "/assets/technology/powerbi.svg",
    title: "Power BI for Data Visualization",
    meta: "5 Weeks • Live + Recorded • Beginner → Advanced",
    description:
      "Executive-grade dashboards and semantic models—plus how Copilot and embedded AI are reshaping BI delivery in 2026.",
    heroStats: [
      { value: "26%", label: "CAGR Growth", tone: "blue" },
      { value: "₹28L", label: "Max Package", tone: "fuchsia" },
      { value: "4L+", label: "Openings", tone: "emerald" },
    ],
    learn: [
      "Data visualisation fundamentals & chart selection principles",
      "Power BI Desktop — data modelling, DAX & relationships",
      "Executive dashboard design & business storytelling",
      "Advanced DAX — time intelligence, calculated tables, KPIs",
      "Data connectors — SQL, Excel, SharePoint, APIs, cloud sources",
      "Enterprise BI design & semantic data modelling",
      "3 sector projects — Retail, Healthcare, Finance dashboards",
      "Power BI Service — publish, schedule & manage reports",
    ],
    trendsHeading: "2026 trends & AI integration",
    trendsItems: [
      "Microsoft Copilot in Power BI — builds dashboards from natural language prompts",
      "AI Insights: anomaly detection, key influencers & smart narratives built-in",
      "Tableau Pulse & Looker AI auto-generate data narratives for executives",
      "Power BI + Azure Synapse — real-time streaming analytics at enterprise scale",
      "Self-service BI: marketing managers now build own dashboards — no IT needed",
      "AutoML inside Power BI — predict outcomes without writing a single line of code",
      "BI Analysts with AI skills: ₹12–20 LPA — fastest-growing analytics role 2026",
    ],
    outcomes: ["BI Developer", "Data Analyst", "Power BI Developer"],
    videoEmbedUrl:
      "https://www.youtube.com/embed/Q1RWLRaPf_w?list=PLIwLItohWYle7UbbWD91lJZctip5bBiYH&index=18&rel=0",
    accent: {
      solid: "#059669",
      soft: "rgba(5, 150, 105, 0.08)",
      glow: "0 0 0 1px rgba(5, 150, 105, 0.12), 0 12px 40px -12px rgba(5, 150, 105, 0.38)",
      ring: "rgba(5, 150, 105, 0.25)",
    },
  },
  {
    id: "sql",
    label: "SQL",
    iconSrc: "/assets/technology/mysql.svg",
    title: "SQL for Data Analytics",
    meta: "4 Weeks • Live + Recorded • Beginner → Advanced",
    description:
      "Interview-ready SQL through warehouses and pipelines—plus NL-to-SQL, cloud engines, and where demand is headed in 2026.",
    heroStats: [
      { value: "45%", label: "CAGR Growth", tone: "blue" },
      { value: "₹38L", label: "Max Package", tone: "fuchsia" },
      { value: "8L+", label: "Openings", tone: "emerald" },
    ],
    learn: [
      "SQL basics — SELECT, WHERE, GROUP BY, ORDER BY",
      "Advanced queries — JOINs, CTEs, subqueries, window functions",
      "Query optimisation & performance tuning",
      "Analytical data modelling & warehouse schema design",
      "ETL/ELT pipeline concepts & data transformation",
      "Cloud SQL — BigQuery, Snowflake, Redshift, Azure SQL",
      "100+ SQL interview questions + case study walkthroughs",
      "Capstone: full data engineering pipeline project",
    ],
    trendsHeading: "2026 trends & AI integration",
    trendsItems: [
      "Natural Language SQL — Microsoft Copilot writes SQL from plain English questions",
      "Google BigQuery ML: build ML models with just SQL commands, no Python needed",
      "Snowflake Intelligence — query & act on data by asking questions in natural language",
      "60%+ enterprise workloads now on cloud — SQL + AWS/GCP = critical skill combo",
      "50%+ global developers still use SQL-based systems — demand never declining",
      "Real-time SQL streaming with Apache Kafka + Spark SQL — next frontier",
      "Cloud-focused SQL roles: ₹18–30 LPA at Wipro, TCS, Fractal, Sigmoid",
    ],
    outcomes: ["SQL Developer", "Data Engineer", "Database Admin"],
    videoEmbedUrl:
      "https://www.youtube.com/embed/N3evdBbz2HY?list=PLIwLItohWYle7UbbWD91lJZctip5bBiYH&index=7&rel=0",
    accent: {
      solid: "#ca8a04",
      soft: "rgba(202, 138, 4, 0.1)",
      glow: "0 0 0 1px rgba(202, 138, 4, 0.15), 0 12px 40px -12px rgba(202, 138, 4, 0.35)",
      ring: "rgba(202, 138, 4, 0.3)",
    },
  },
] as const;

/** Stats strip below hero — same saturated blue + circle pattern as CTA */
const CURRICULUM_MATRIX_STATS: readonly { figure: string; caption: string }[] =
  [
    { figure: "2,000+", caption: "Nationwide Consultations" },
    { figure: "10+", caption: "AI Career Opportunities" },
    { figure: "15+", caption: "Data Experts across Nation" },
    { figure: "50+", caption: "Industrial POCs" },
  ];

function splitCurriculumMeta(meta: string): readonly [string, string, string] {
  const parts = meta.split(/\s*•\s*/).map((s) => s.trim());
  return [
    parts[0] ?? "",
    parts[1] ?? "",
    parts[2] ?? "",
  ] as const;
}

const HERO_STAT_TONE_CLASS: Record<
  HeroStatTone,
  { card: string; value: string }
> = {
  blue: {
    card: "border border-blue-100/90 bg-blue-50/95",
    value: "text-blue-600",
  },
  fuchsia: {
    card: "border border-fuchsia-100/90 bg-fuchsia-50/95",
    value: "text-purple-600",
  },
  emerald: {
    card: "border border-emerald-100/90 bg-emerald-50/95",
    value: "text-emerald-600",
  },
};

function IconMetaClock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 7v5l3 2" />
    </svg>
  );
}

function IconMetaVideo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <rect x="3" y="7" width="12" height="10" rx="2" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15 10 4-2v8l-4-2"
      />
    </svg>
  );
}

function IconMetaRibbon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 3h12v18l-6-3-6 3V3z"
      />
    </svg>
  );
}

/** Open book — core curriculum */
function IconCoreCurriculum({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8M8 11h6" />
    </svg>
  );
}

function IconMarketTrend({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 19h16" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 15l4-4 3 2 5-6"
      />
    </svg>
  );
}

/** Reference-style FAQ row + light panel */
const FAQ_BOX_CLASS =
  "overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(15,23,42,0.08)]";

function LearnAccordionChevron({ open }: { open: boolean }) {
  return (
    <span
      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-400 sm:h-10 sm:w-10"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-[18px] w-[18px] shrink-0 transition-transform duration-200 sm:h-5 sm:w-5 ${open ? "" : "rotate-180"}`}
      >
        <path d="M6 15l6-6 6 6" />
      </svg>
    </span>
  );
}

function CurriculumLearnAccordion({
  activeTabId,
  panelKey,
  title,
  variant,
  open,
  onToggle,
  children,
}: {
  activeTabId: TabId;
  panelKey: "core" | "market";
  title: string;
  variant: "core" | "market";
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const headerId = `curriculum-learn-${panelKey}-header-${activeTabId}`;
  const panelId = `curriculum-learn-${panelKey}-panel-${activeTabId}`;

  return (
    <div className={`${FAQ_BOX_CLASS} min-w-0`}>
      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center gap-2 rounded-none px-3 py-3.5 text-left sm:gap-3 sm:px-4 sm:py-4 md:px-5"
          onClick={onToggle}
        >
          {variant === "core" ? (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--aa-primary)_14%,white)] text-[var(--aa-primary)] ring-1 ring-[color-mix(in_srgb,var(--aa-primary)_28%,transparent)] sm:h-11 sm:w-11">
              <IconCoreCurriculum className="h-5 w-5 sm:h-[1.375rem] sm:w-[1.375rem]" />
            </span>
          ) : (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-purple-700 ring-1 ring-purple-200/80 sm:h-11 sm:w-11">
              <IconMarketTrend className="h-5 w-5 sm:h-[1.375rem] sm:w-[1.375rem]" />
            </span>
          )}
          <span
            className={`min-w-0 flex-1 text-[15px] font-bold leading-snug text-slate-900 sm:text-[16px] md:text-[1.125rem] ${fontHeading}`}
          >
            {title}
          </span>
          <LearnAccordionChevron open={open} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        hidden={!open}
        className={open ? "block" : "hidden"}
      >
        <div className="border-t border-slate-100 bg-slate-50/95 px-3 py-4 sm:px-5 sm:py-5">
          {children}
        </div>
      </div>
    </div>
  );
}

const Curriculam = () => {
  const [activeId, setActiveId] = useState<TabId>("genai");
  /** At most one panel open; `null` = both closed */
  const [learnOpenPanel, setLearnOpenPanel] = useState<
    "core" | "market" | null
  >(null);
  const reduceMotion = useReducedMotion();
  const active = CURRICULUM_TABS.find((t) => t.id === activeId)!;
  const [metaWeeks, metaFormat, metaLevel] = splitCurriculumMeta(active.meta);

  useEffect(() => {
    setLearnOpenPanel(null);
  }, [activeId]);

  const toggleLearnPanel = useCallback((panel: "core" | "market") => {
    setLearnOpenPanel((prev) => (prev === panel ? null : panel));
  }, []);

  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  const focusTabAtIndex = useCallback((index: number) => {
    const next = CURRICULUM_TABS[index];
    if (!next) return;
    setActiveId(next.id);
    queueMicrotask(() => {
      document.getElementById(`curriculum-tab-${next.id}`)?.focus();
    });
  }, []);

  const onTabListKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const i = CURRICULUM_TABS.findIndex((t) => t.id === activeId);
      if (i < 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        focusTabAtIndex((i + 1) % CURRICULUM_TABS.length);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        focusTabAtIndex(
          (i - 1 + CURRICULUM_TABS.length) % CURRICULUM_TABS.length,
        );
      } else if (e.key === "Home") {
        e.preventDefault();
        focusTabAtIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        focusTabAtIndex(CURRICULUM_TABS.length - 1);
      }
    },
    [activeId, focusTabAtIndex],
  );

  return (
    <section
      id="curriculum-section"
      aria-labelledby="curriculum-heading"
      className={`aa-section relative overflow-hidden bg-gradient-to-b from-[#e8eefc] via-[color-mix(in_srgb,var(--aa-primary)_9%,#f4f7fd)] to-[var(--aa-surface-soft)] py-14 sm:py-16 ${fontBody}`}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.97]"
          style={{
            background:
              "radial-gradient(ellipse 85% 55% at 50% -15%, rgba(26, 115, 232, 0.16), transparent 58%), radial-gradient(ellipse 55% 45% at 100% 85%, rgba(37, 99, 235, 0.1), transparent 52%), radial-gradient(ellipse 45% 40% at 0% 60%, rgba(26, 115, 232, 0.06), transparent 50%)",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.5)_0%,transparent_35%,transparent_65%,rgba(248,250,252,0.85)_100%)]" />
      </div>

      <div className="aa-container relative">
        <div className="mx-auto max-w-6xl  sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[1.75rem] bg-white/82 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.1)] backdrop-blur-md sm:rounded-[2rem] sm:p-8 lg:p-10">
            <header className="mx-auto  text-center">
              <h2
                id="curriculum-heading"
                className={`text-[1.9rem] w-full font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl ${fontHeading}`}
              >
                Empowered{" "}
                <span
                  className="rounded-sm px-2 py-0.5 text-white"
                  style={{ backgroundColor: HEADING_PRIMARY }}
                >
                  2,000+ professionals
                </span>{" "}
                globally from the team of Data Scientists
              </h2>
              <p className="mt-4 text-base font-medium text-slate-600 sm:text-lg">
                Nationwide Data Analytics &amp; GenAI Industrial Program
              </p>
              
            </header>

            <div className="relative isolate mt-10 overflow-hidden">
              <div
                className="relative overflow-hidden px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-10"
                style={{
                  clipPath:
                    "polygon(2rem 0%, 100% 0%, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0% 100%, 0% 2rem)",
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1A73E8] via-[#1d63e8] to-[#1557c7]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(255,255,255,0.18),transparent_55%)]"
                  aria-hidden
                />
                <BlueCirclePattern minHeightClass="min-h-[220px]" />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.12] via-transparent to-transparent"
                  aria-hidden
                />
                <div
                  className="relative z-10 grid grid-cols-1 gap-0 divide-y divide-white/20 text-center text-white sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/20"
                  role="group"
                  aria-label="Program impact at a glance"
                >
                  {CURRICULUM_MATRIX_STATS.map((row) => (
                    <div
                      key={row.caption}
                      className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-0 sm:even:border-l sm:even:border-white/20 lg:border-l-0 lg:px-8 lg:py-2"
                    >
                      <p
                        className={`m-0 text-3xl font-bold tabular-nums tracking-tight sm:text-5xl lg:text-[2.75rem] ${fontHeading}`}
                      >
                        {row.figure}
                      </p>
                      <p
                        className={`m-0 mt-2 max-w-[16rem] text-sm font-medium leading-snug text-white/92 sm:mt-3 sm:text-[0.9375rem] ${fontHeading}`}
                      >
                        {row.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-10 lg:mt-12">
              <div
                className="border-b border-slate-100 pb-4 pt-4  sm:pb-5 sm:pt-5 "
                role="tablist"
                aria-label="Course tracks"
                onKeyDown={onTabListKeyDown}
              >
                <p
                  className={`mb-3 text-[1rem] font-semibold  text-[#080808] ${fontHeading}`}
                >
                  Select program
                </p>
                <div className="grid w-full grid-cols-2 items-stretch gap-1 rounded-lg bg-white p-1 ring-1 ring-slate-900/[0.04] sm:flex sm:flex-row sm:gap-1.5 sm:p-1.5">
                  {CURRICULUM_TABS.map((tab) => {
                    const isActive = tab.id === activeId;
                    const showPillText = tab.pillLabel != null;
                    return (
                      <motion.button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={`curriculum-tab-${tab.id}`}
                        aria-label={showPillText ? undefined : tab.label}
                        aria-selected={isActive}
                        aria-controls={`curriculum-panel-${tab.id}`}
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => setActiveId(tab.id)}
                        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 450, damping: 28 }}
                        className={`flex min-h-10 min-w-0 w-full items-center justify-center rounded-lg py-2 transition-[color,background-color,box-shadow,filter] duration-200 sm:w-auto sm:flex-1 sm:min-h-12 sm:py-2.5 ${TAB_FOCUS} ${
                          showPillText
                            ? "gap-1.5 px-2 sm:gap-2 sm:px-3"
                            : "gap-0 px-1.5 sm:px-2"
                        } ${
                          isActive
                            ? "shadow-sm"
                            : "bg-transparent hover:bg-[#e8eefc] active:bg-white/85"
                        }`}
                        style={isActive ? ACTIVE_TAB_BUTTON_STYLE : undefined}
                      >
                        <Image
                          src={tab.iconSrc}
                          alt=""
                          width={200}
                          height={44}
                          unoptimized
                          className={`${
                            tab.id === "sql"
                              ? TAB_ICON_CLASS_MYSQL
                              : TAB_ICON_CLASS
                          } ${isActive ? "brightness-0 invert" : ""}`}
                          draggable={false}
                        />
                        {showPillText ? (
                          <span
                            className={`text-xs font-semibold tracking-tight whitespace-nowrap sm:text-sm ${fontHeading} ${
                              isActive ? "text-white" : "text-slate-600"
                            }`}
                          >
                            {tab.pillLabel}
                          </span>
                        ) : null}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className=" py-8  sm:py-10  lg:py-10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeId}
                    id={`curriculum-panel-${activeId}`}
                    role="tabpanel"
                    aria-labelledby={`curriculum-tab-${activeId}`}
                    initial={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: -12, y: 4 }
                    }
                    animate={
                      reduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, x: 0, y: 0 }
                    }
                    exit={
                      reduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, x: 8, y: -4 }
                    }
                    transition={transition}
                    className="will-change-transform"
                  >
                  {/* Hero: program copy + stats + CTA + career | video */}
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10 xl:gap-12">
                    <div className="min-w-0 flex-1 lg:max-w-[min(100%,42rem)]">
                      <section
                        className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)] ring-1 ring-slate-900/[0.03] sm:p-6 lg:p-7"
                        aria-labelledby={`curriculum-hero-title-${activeId}`}
                      >
                        <div className="space-y-5">
                          <h3
                            id={`curriculum-hero-title-${activeId}`}
                            className={`text-[1.75rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl ${fontHeading}`}
                          >
                            {active.title}
                          </h3>
                          <ul
                            className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 sm:text-[0.9375rem]"
                            aria-label="Program details"
                          >
                            <li className="flex items-center gap-2">
                              <IconMetaClock className="h-4 w-4 shrink-0 text-slate-400" />
                              <span>{metaWeeks}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <IconMetaVideo className="h-4 w-4 shrink-0 text-slate-400" />
                              <span>{metaFormat}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <IconMetaRibbon className="h-4 w-4 shrink-0 text-slate-400" />
                              <span>{metaLevel}</span>
                            </li>
                          </ul>
                          <p className="text-[0.9375rem] font-semibold text-[#475569] sm:text-base">
                            {active.description}
                          </p>
                          <div>
                            <p
                              className={`text-[0.6875rem] font-semibold uppercase  text-slate-400 ${fontHeading}`}
                            >
                              Career outcomes
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {active.outcomes.map((tag) => (
                                <span
                                  key={tag}
                                  className={`rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 sm:px-3.5 sm:py-1.5 sm:text-[0.8125rem] ${fontHeading}`}
                                  style={{
                                    backgroundColor: active.accent.soft,
                                    boxShadow: `inset 0 0 0 1px ${active.accent.ring}`,
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 sm:gap-3">
                            {active.heroStats.map((stat) => {
                              const tone = HERO_STAT_TONE_CLASS[stat.tone];
                              return (
                                <div
                                  key={`${stat.value}-${stat.label}`}
                                  className={`rounded-xl px-2 py-3 text-center sm:px-3 sm:py-4 ${tone.card}`}
                                >
                                  <p
                                    className={`text-base font-extrabold tabular-nums sm:text-xl ${tone.value} ${fontHeading}`}
                                  >
                                    {stat.value}
                                  </p>
                                  <p className="mt-1 text-[0.65rem] font-medium leading-tight text-slate-500 sm:text-sm">
                                    {stat.label}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                          <a
                            href="https://pages.razorpay.com/discussion"
                            className="aa-btn-primary flex w-full items-center justify-center py-3.5 text-center text-sm font-semibold sm:py-4 sm:text-base"
                          >
                            Enroll Now — Under Shortlisted Aspirants
                          </a>
                        </div>
                      </section>
                    </div>

                    <aside
                      className="w-full shrink-0 lg:max-w-[min(100%,24rem)] xl:max-w-[28rem]"
                      aria-label="Course preview"
                    >
                      <div className="lg:sticky lg:top-28">
                        <div className="relative overflow-hidden rounded-2xl bg-slate-950/[0.04] shadow-[0_12px_40px_-16px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/90">
                          <div className="relative aspect-video w-full bg-slate-900/[0.06]">
                            <iframe
                              title={`${active.title} preview`}
                              src={active.videoEmbedUrl}
                              className="absolute inset-0 h-full w-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              loading="lazy"
                            />
                            <div
                              className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-3"
                              aria-hidden
                            >
                              <span
                                className={`rounded-md bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/95 ${fontHeading}`}
                              >
                                Course preview
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </aside>
                  </div>

                  {/* Curriculum accordions */}
                  <div className="mt-10 sm:mt-12">
                    <p
                      className={`text-[1rem] font-semibold  text-[#080808] ${fontHeading}`}
                    >
                      What you&apos;ll learn
                    </p>

                    {active.trendsItems != null &&
                    active.trendsItems.length > 0 ? (
                      <div className="mt-6 flex flex-col gap-3 sm:gap-4">
                        <CurriculumLearnAccordion
                          activeTabId={activeId}
                          panelKey="core"
                          variant="core"
                          title="Core curriculum"
                          open={learnOpenPanel === "core"}
                          onToggle={() => toggleLearnPanel("core")}
                        >
                          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                            {active.learn.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-[0.9375rem] font-semibold  text-slate-700"
                              >
                                <span
                                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--aa-primary)] ring-2 ring-white"
                                  style={{
                                    boxShadow: `0 0 0 1px ${PRIMARY_LIST_DOT_RING}`,
                                  }}
                                  aria-hidden
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CurriculumLearnAccordion>
                        <CurriculumLearnAccordion
                          activeTabId={activeId}
                          panelKey="market"
                          variant="market"
                          title="2026 market intelligence"
                          open={learnOpenPanel === "market"}
                          onToggle={() => toggleLearnPanel("market")}
                        >
                          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                            {active.trendsItems.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-[0.9375rem] font-semibold leading-snug text-slate-700"
                              >
                                <span
                                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--aa-primary)] ring-2 ring-white"
                                  style={{
                                    boxShadow: `0 0 0 1px ${PRIMARY_LIST_DOT_RING}`,
                                  }}
                                  aria-hidden
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CurriculumLearnAccordion>
                      </div>
                    ) : (
                      <div className="mt-6">
                        <CurriculumLearnAccordion
                          activeTabId={activeId}
                          panelKey="core"
                          variant="core"
                          title="Core curriculum"
                          open={learnOpenPanel === "core"}
                          onToggle={() => toggleLearnPanel("core")}
                        >
                          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                            {active.learn.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-[0.9375rem] leading-snug text-slate-700"
                              >
                                <span
                                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--aa-primary)] ring-2 ring-white"
                                  style={{
                                    boxShadow: `0 0 0 1px ${PRIMARY_LIST_DOT_RING}`,
                                  }}
                                  aria-hidden
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CurriculumLearnAccordion>
                      </div>
                    )}
                  </div>

                  
                </motion.div>
                </AnimatePresence>
              </div>
              <div className="flex flex-col items-center gap-4 text-center">
                    <p className="max-w-md text-sm leading-relaxed text-slate-600">
                      Join{" "}
                      <span className="font-bold text-slate-900">
                        2,400+ professionals
                      </span>{" "}
                      already enrolled.
                    </p>
                    <a
                      href="/contact#send-message-heading"
                      className="aa-btn-primary inline-flex min-w-[12rem] items-center justify-center px-8 py-3 text-sm font-semibold"
                    >
                      Start Learning Today
                    </a>
                  </div>
            </div>
            
          </div>
          
        </div>
        
      </div>
      
    </section>
  );
};

export default Curriculam;