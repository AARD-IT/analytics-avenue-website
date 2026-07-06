"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CAREERS_APPLICATION_SECTION_IDS,
  CAREERS_APPLICATION_TOC,
  isCareersDataAnalyticsRole,
} from "../data";
import CareersApplicationForm from "./careers-application-form";

const SCROLL_ACTIVE_OFFSET_PX = 112;

function useApplicationTocActiveId(enabled: boolean, sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    if (!enabled) return;

    let raf = 0;
    const onScrollOrResize = () => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        let current = sectionIds[0] ?? "";
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= SCROLL_ACTIVE_OFFSET_PX) {
            current = id;
          }
        }
        setActiveId((prevId) => (prevId === current ? prevId : current));
      });
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      if (raf !== 0) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [enabled, sectionIds]);

  if (sectionIds.includes(activeId)) return activeId;
  return sectionIds[0] ?? "";
}

export default function CareersApplicationSection() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const showDataAnalytics = isCareersDataAnalyticsRole(selectedRole);

  const tocEntries = useMemo(
    () =>
      CAREERS_APPLICATION_TOC.filter(
        (t) => t.id !== CAREERS_APPLICATION_SECTION_IDS.dataAnalytics || showDataAnalytics,
      ),
    [showDataAnalytics],
  );

  const tocSectionIds = useMemo(() => tocEntries.map((t) => t.id), [tocEntries]);

  const activeId = useApplicationTocActiveId(!submitted, tocSectionIds);

  return (
    <section
      className="aa-section bg-white py-12 sm:py-16"
      aria-labelledby="careers-application-title"
      id="careers-apply"
    >
      <div className="aa-container px-4 sm:px-6">
        <div className="mb-2 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--aa-primary)]/30 bg-[var(--aa-primary)]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[var(--aa-primary)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--aa-primary)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--aa-primary)]" />
            </span>
            Open Positions — Apply Below
          </span>
        </div>
        <h2
          id="careers-application-title"
          className="mb-2 text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl"
        >
          Fill the{" "}
          <span className="rounded-sm bg-[var(--aa-primary)] px-2 py-0.5 text-white">Application</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-base font-bold text-slate-700 sm:text-lg">
          Complete the form below — takes less than 5 minutes. Our team reviews every submission personally.
        </p>

        <div
          className={
            submitted
              ? "mx-auto mt-10 max-w-3xl"
              : "mx-auto mt-10 grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,15.5rem)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)]"
          }
        >
          {!submitted && (
            <nav
              className="rounded-2xl border-2 border-[var(--aa-primary)]/20 bg-white p-5 shadow-[var(--aa-shadow-md)] ring-1 ring-[var(--aa-primary)]/10 lg:sticky lg:top-28 lg:max-h-[min(100vh-8rem,32rem)] lg:self-start lg:overflow-y-auto lg:p-6"
              aria-label="Application form sections"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">On this page</p>
              <ul className="mt-4 space-y-0.5 border-t border-slate-100 pt-4">
                {tocEntries.map(({ id, label }) => {
                  const active = activeId === id;
                  return (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        aria-current={active ? "location" : undefined}
                        className={[
                          "block rounded-r-lg border-l-[3px] py-2.5 pl-3.5 pr-2 text-sm font-medium transition-colors",
                          active
                            ? "border-[var(--aa-primary)] bg-[color-mix(in_srgb,var(--aa-primary)_9%,white)] text-[var(--aa-primary)]"
                            : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 hover:text-slate-900",
                        ].join(" ")}
                      >
                        {label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          <div className="min-w-0">
            <CareersApplicationForm
              onSubmitted={() => setSubmitted(true)}
              onRoleChange={setSelectedRole}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
