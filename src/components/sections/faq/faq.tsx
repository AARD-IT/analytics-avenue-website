"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const accent = "var(--aa-primary)";

const FAQ_ITEMS = [
  {
    id: "q1",
    question: "What is included in the Generative AI & LLM Systems program?",
    intro:
      "Learn how to build and deploy enterprise-grade GenAI solutions using LLMs, embeddings, and real-world workflows.",
    bullets: [
      "LLM architecture, prompt engineering & inference workflows",
      "GenAI use cases for analytics, automation & BI",
      "Vector databases, embeddings & orchestration",
      "Build AI copilots & intelligent systems",
      "Focus on real-world enterprise applications",
    ],
  },
  {
    id: "q2",
    question: "Who is the Python for Advanced Analytics program for?",
    intro:
      "Designed for professionals looking to apply Python for data analysis, modeling, and business problem-solving.",
    bullets: [
      "Advanced data manipulation & analytics workflows",
      "Statistical analysis, forecasting & modeling",
      "Performance optimization & reusable code",
      "Translate business problems into data solutions",
    ],
  },
  {
    id: "q3",
    question: "What will I learn in Power BI & Business Intelligence?",
    intro:
      "Master business intelligence and data visualization to deliver actionable insights for decision-makers.",
    bullets: [
      "Enterprise BI design & semantic modeling",
      "Build executive dashboards with Power BI",
      "Advanced DAX for performance & calculations",
      "Data storytelling for leadership & stakeholders",
    ],
  },
  {
    id: "q4",
    question: "What does SQL & Data Engineering cover?",
    intro:
      "Develop strong data engineering and SQL skills for building scalable analytics platforms.",
    bullets: [
      "Advanced SQL for analytics & reporting",
      "Data modeling & warehouse design",
      "ETL/ELT pipelines & data workflows",
      "Hands-on experience with cloud data platforms",
    ],
  },
] as const;

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

/** Desktop (lg+): one item open by default; mobile/tablet: all closed */
function useFaqOpenIndexForViewport() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setIsDesktop(mq.matches);
      setOpenIndex(mq.matches ? 2 : null);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return { openIndex, setOpenIndex, isDesktop } as const;
}

const Faq = () => {
  const { ref, visible, reduceMotion } = useSectionReveal();
  const { openIndex, setOpenIndex, isDesktop } = useFaqOpenIndexForViewport();

  const reveal = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(1rem)",
    transition: reduceMotion
      ? "none"
      : `opacity 0.55s ease, transform 0.55s ease ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      id="faq"
      aria-labelledby="faq-title"
      className="aa-section relative overflow-hidden bg-[var(--aa-surface-soft)] pb-10 pt-12 sm:pb-12 sm:pt-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 18% 35%, rgba(26, 115, 232, 0.09), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 70%, rgba(37, 99, 235, 0.06), transparent 50%)",
        }}
      />

      <div className="aa-container relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,35%)_minmax(0,65%)] lg:gap-14 lg:items-start">
          <div style={reveal(0)}>
            <div className="mb-4 hidden items-center justify-center gap-2.5 lg:flex lg:justify-start">
              <span
                className="hidden h-2 w-2 shrink-0 rounded-full lg:block"
                style={{ backgroundColor: accent }}
                aria-hidden
              />
              <span className="text-sm font-semibold tracking-wide text-slate-600">
                <span className="text-[var(--aa-primary)]">FAQs</span>
              </span>
            </div>

            <h2
              id="faq-title"
              className="text-center text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-left lg:text-5xl"
            >
              Program Details <br /> &amp;{" "}
              <span className="text-[var(--aa-primary)] lg:rounded-sm lg:bg-[var(--aa-primary)] lg:px-2 lg:py-0.5 lg:text-white">
                FAQs
              </span>
            </h2>

            <div className="mt-8 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-7">
              <div className="mx-auto mb-5 flex justify-start">
                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full ring-2 ring-[#1A73E8]/15">
                  <Image
                    src="/assets/images/Subramani.jpg"
                    alt=""
                    width={72}
                    height={72}
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <h3 className="text-start text-lg font-bold text-slate-900">
                Book a Free Consultation
              </h3>
              <p className="mt-2 text-start text-sm leading-relaxed text-slate-600">
                Have questions? Speak with our experts and get clarity before
                enrolling.
              </p>
              <div className="mt-6 flex justify-start">
                <a href="#cta" className="aa-btn-primary w-full">
                  Book a Free Call
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4" style={reveal(80)}>
            {FAQ_ITEMS.map((item, index) => {
              const open = openIndex === index;
              const panelId = `${item.id}-panel`;
              const headerId = `${item.id}-header`;

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-shadow hover:shadow-[0_8px_28px_rgba(15,23,42,0.08)]"
                >
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={headerId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      className="flex w-full items-start gap-3 rounded-2xl px-5 py-4 text-left sm:px-6 sm:py-5"
                      onClick={() =>
                        setOpenIndex((prev) => {
                          if (isDesktop) return index;
                          return prev === index ? null : index;
                        })
                      }
                    >
                      <span className="min-w-0 flex-1 text-[15px] font-bold leading-snug text-slate-900 sm:text-base">
                        {item.question}
                      </span>
                      <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500"
                        aria-hidden
                      >
                        {open ? (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18 6L6 18M6 6l12 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 5v14M5 12h14"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    hidden={!open}
                    className={open ? "block" : "hidden"}
                  >
                    <div className="border-t border-slate-100 px-5 pb-5 pt-0 sm:px-6 sm:pb-6">
                      <p className="text-sm leading-relaxed text-slate-600">
                        {item.intro}
                      </p>
                      <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-600">
                        {item.bullets.map((line) => (
                          <li key={line} className="flex gap-2.5">
                            <span
                              className="mt-0.5 shrink-0 text-[var(--aa-primary)]"
                              aria-hidden
                            >
                              ✓
                            </span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
