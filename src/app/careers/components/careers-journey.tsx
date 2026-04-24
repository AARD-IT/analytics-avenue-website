"use client";

import { useEffect, useRef, useState } from "react";
import { CAREERS_JOURNEY } from "../data";

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

/** Desktop (lg+): first item open; mobile/tablet: all closed — mirrors FAQ behavior. */
function useJourneyOpenIndexForViewport() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => {
      setIsDesktop(mq.matches);
      setOpenIndex(mq.matches ? 0 : null);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return { openIndex, setOpenIndex, isDesktop } as const;
}

export default function CareersJourney() {
  const { ref, visible, reduceMotion } = useSectionReveal();
  const { openIndex, setOpenIndex, isDesktop } = useJourneyOpenIndexForViewport();

  const reveal = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(1rem)",
    transition: reduceMotion ? "none" : `opacity 0.55s ease, transform 0.55s ease ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      id="careers-journey"
      aria-labelledby="careers-journey-title"
      className="aa-section relative overflow-hidden  bg-white pb-10 pt-12 sm:pb-12 sm:pt-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 18% 35%, rgba(26, 115, 232, 0.09), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 70%, rgba(37, 99, 235, 0.06), transparent 50%)",
        }}
      />

      <div className="aa-container relative px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,35%)_minmax(0,65%)] lg:gap-14 lg:items-start">
          <div style={reveal(0)}>
            

            <h2
              id="careers-journey-title"
              className="text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-left"
            >
              Where are you in your <br className="hidden lg:block" />
              <span className="text-[var(--aa-primary)] lg:rounded-sm lg:bg-[var(--aa-primary)] lg:px-2 lg:py-0.5 lg:text-white">
                career journey?
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-3 sm:gap-4" style={reveal(80)}>
            {CAREERS_JOURNEY.map((item, index) => {
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
                      <span className="min-w-0 flex-1 text-xl font-semibold leading-snug text-slate-900">
                        {item.title}
                      </span>
                      <span
                        className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500"
                        aria-hidden
                      >
                        {open ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M18 6L6 18M6 6l12 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      <p className="text-sm font-semibold leading-relaxed text-slate-600 sm:text-base">{item.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="aa-kicker mt-10 text-center lg:hidden">Career Journey</p>
      </div>
    </section>
  );
}
