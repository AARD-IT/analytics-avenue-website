"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

const PROGRAMS = [
  {
    id: "p1",
    title: "Generative AI & LLM Systems",
    description:
      "Built for professionals looking to integrate GenAI and LLMs into enterprise analytics, products, and decision systems.",
    bullets: [
      "LLM architecture, inference workflows, and prompt engineering at scale",
      "Designing GenAI use cases for analytics, automation, and business intelligence",
      "Hands-on exposure to LLM orchestration, embeddings, and vector databases",
      "Building production-ready AI copilots and intelligent decision systems",
      "Focus on real enterprise scenarios, not demos",
    ],
  },
  {
    id: "p2",
    title: "Python for Advanced Analytics & Data Science",
    description:
      "A practitioner-focused program for experienced professionals using Python in analytics, modeling, and automation.",
    bullets: [
      "Advanced data manipulation, performance optimization, and analytics workflows",
      "Using Python for statistical analysis, forecasting, and business modeling",
      "Structuring reusable analytics codebases for enterprise projects",
      "Translating business problems into analytical solutions",
    ],
  },
  {
    id: "p3",
    title: "Business Intelligence & Analytics Visualization (Power BI)",
    description:
      "Designed for professionals responsible for delivering insights to leadership and stakeholders.",
    bullets: [
      "Enterprise BI design principles and semantic data modeling",
      "Power BI for executive dashboards and decision intelligence",
      "DAX for performance optimization and advanced calculations",
      "Data storytelling for CXOs, business heads, and product teams",
    ],
  },
  {
    id: "p4",
    title: "SQL & Data Engineering for Analytics Platforms",
    description:
      "Focused on professionals building or consuming data platforms at scale.",
    bullets: [
      "Advanced SQL for analytics, reporting, and optimization",
      "Designing analytical data models and warehouse structures",
      "Understanding ETL/ELT pipelines from an analytics perspective",
      "Working with cloud-based data platforms in real-world environments",
    ],
  },
] as const;

function IconSparkles({ className }: { className?: string }) {
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
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z"
      />
    </svg>
  );
}

function IconCode({ className }: { className?: string }) {
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
        d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"
      />
    </svg>
  );
}

function IconChart({ className }: { className?: string }) {
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
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
      />
    </svg>
  );
}

function IconDatabase({ className }: { className?: string }) {
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
        d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
      />
    </svg>
  );
}

const PROGRAM_ICONS = [IconSparkles, IconCode, IconChart, IconDatabase] as const;

function useSectionReveal() {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible: reduceMotion || visible, reduceMotion };
}

const Faq = () => {
  const { ref, visible, reduceMotion } = useSectionReveal();
  const prefersReducedMotion = useReducedMotion();
  const baseId = useId();
  const [selected, setSelected] = useState(0);

  const reveal = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(1rem)",
    transition: reduceMotion
      ? "none"
      : `opacity 0.55s ease, transform 0.55s ease ${delay}ms`,
  });

  const active = PROGRAMS[selected];
  const panelId = `${baseId}-panel`;
  const tabIds = PROGRAMS.map((_, i) => `${baseId}-tab-${i}`);

  const onKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setSelected((i) => Math.min(PROGRAMS.length - 1, i + 1));
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setSelected((i) => Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSelected(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setSelected(PROGRAMS.length - 1);
    }
  };

  const motionTransition = prefersReducedMotion || reduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section
      ref={ref}
      id="newfaq"
      aria-labelledby="newfaq-title"
      className="aa-section relative overflow-hidden bg-gradient-to-b from-[#e8eefc] via-[color-mix(in_srgb,var(--aa-primary)_9%,#f4f7fd)] to-[var(--aa-surface-soft)] py-14 sm:py-16"
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
        <div className="relative overflow-hidden rounded-[1.75rem] bg-white/82 p-6 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.1)] backdrop-blur-md sm:rounded-[2rem] sm:p-8 lg:p-10">
          <header className="mx-auto max-w-3xl text-center lg:max-w-none lg:text-left">
          <div style={reveal(0)}>
            <h2
              id="newfaq-title"
              className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl text-center"
            >
              Empowered 2,000+ professionals globally
              <br />
              from the team of Data Scientists
            </h2>

            <p className="mt-4 text-base font-medium text-slate-600 sm:text-lg text-center">
              Nationwide Data Analytics &amp; GenAI Industrial Program
            </p>

            <div className="mt-8 flex justify-center lg:justify-center">
              <a href="#cta" className="aa-btn-primary">
                EdTech Solutions
              </a>
            </div>
          </div>
        </header>

        <div
          className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10 lg:items-start"
          style={reveal(80)}
        >
          {/* Mobile: horizontal tab strip */}
          <div
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Training programs"
          >
            {PROGRAMS.map((item, index) => {
              const isActive = selected === index;
              const Icon = PROGRAM_ICONS[index];
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={tabIds[index]}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  aria-label={`Question: ${item.title}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setSelected(index)}
                  onKeyDown={onKeyNav}
                  className={`group flex min-w-[10.5rem] shrink-0 snap-start flex-col items-start gap-2 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "border-[color-mix(in_srgb,var(--aa-primary)_28%,transparent)] bg-white/90 shadow-[0_8px_30px_-12px_rgba(26,115,232,0.35)] ring-1 ring-[color-mix(in_srgb,var(--aa-primary)_18%,transparent)]"
                      : "border-slate-200/80 bg-white/50 backdrop-blur-sm hover:border-slate-300 hover:bg-white/80"
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${
                      isActive
                        ? "bg-[color-mix(in_srgb,var(--aa-primary)_12%,white)] text-[var(--aa-primary)]"
                        : "bg-slate-100/90 text-slate-500"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={`text-[11px] font-bold tabular-nums tracking-wide ${
                      isActive ? "text-[var(--aa-primary)]" : "text-slate-400"
                    }`}
                  >
                    Q{String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[13px] font-semibold leading-snug text-slate-900 ${
                      isActive ? "font-bold" : ""
                    }`}
                  >
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Desktop: vertical selector + progress */}
          <div className="hidden lg:col-span-5 lg:block xl:col-span-4">
            <div
              className="relative rounded-3xl border border-white/60 bg-white/70 p-2 shadow-[0_4px_40px_-12px_rgba(15,23,42,0.12)] backdrop-blur-md"
              role="tablist"
              aria-label="Training programs"
              aria-orientation="vertical"
            >
              <div
                className="pointer-events-none absolute bottom-10 left-[1.6rem] top-10 w-px overflow-hidden rounded-full"
                aria-hidden
              >
                <div className="absolute inset-0 bg-slate-200/90" />
                <motion.div
                  className="absolute left-0 top-0 h-full w-full origin-top bg-gradient-to-b from-[var(--aa-primary)] via-[var(--aa-primary)]/70 to-blue-400/25"
                  initial={false}
                  animate={{
                    scaleY: (selected + 1) / PROGRAMS.length,
                  }}
                  transition={
                    prefersReducedMotion || reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
                  }
                />
              </div>

              <div className="relative flex flex-col gap-1">
                {PROGRAMS.map((item, index) => {
                  const isActive = selected === index;
                  const Icon = PROGRAM_ICONS[index];
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      id={tabIds[index]}
                      aria-selected={isActive}
                      aria-controls={panelId}
                      aria-label={`Question: ${item.title}`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setSelected(index)}
                      onKeyDown={onKeyNav}
                      className={`group relative flex w-full items-start gap-4 rounded-2xl px-4 py-4 pl-3 text-left transition-all duration-200 ${
                        isActive
                          ? "bg-[color-mix(in_srgb,var(--aa-primary)_8%,white)] shadow-[inset_3px_0_0_0_var(--aa-primary)]"
                          : "hover:bg-slate-50/90"
                      }`}
                    >
                      <span
                        className={`relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-[1.03] ${
                          isActive
                            ? "bg-[color-mix(in_srgb,var(--aa-primary)_14%,white)] text-[var(--aa-primary)] shadow-sm"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span
                        className={`grid min-w-0 flex-1 gap-1.5 ${
                          isActive ? "text-slate-900" : "text-slate-600"
                        }`}
                      >
                        <span
                          className={`text-xs font-bold tabular-nums tracking-wider ${
                            isActive ? "text-[var(--aa-primary)]" : "text-slate-400"
                          }`}
                        >
                          Q{String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`text-[15px] leading-snug ${
                            isActive ? "font-bold text-slate-900" : "font-semibold"
                          }`}
                        >
                          {item.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div
              className="relative overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_8px_50px_-20px_rgba(15,23,42,0.15)] backdrop-blur-md"
              role="tabpanel"
              id={panelId}
              aria-labelledby={tabIds[selected]}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={
                    prefersReducedMotion || reduceMotion
                      ? false
                      : { opacity: 0, x: 12 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    prefersReducedMotion || reduceMotion
                      ? undefined
                      : { opacity: 0, x: -8 }
                  }
                  transition={motionTransition}
                >
                  <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                    <dl className="m-0 space-y-0">
                      <dt className="m-0">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                          Question
                        </span>
                        <h3 className="mt-2 text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                          {active.title}
                        </h3>
                      </dt>
                      <dd className="m-0 mt-6 border-t border-slate-100/90 pt-6">
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--aa-primary)]">
                          Answer
                        </span>
                        <p className="mt-2 text-[15px] leading-relaxed text-slate-600 sm:text-base">
                          {active.description}
                        </p>
                        <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-slate-600 sm:text-base">
                          {active.bullets.map((line) => (
                            <li key={line} className="flex gap-3">
                              <span
                                className="mt-1.5 shrink-0 text-[var(--aa-primary)]"
                                aria-hidden
                              >
                                ✓
                              </span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </dl>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
