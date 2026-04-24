"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  CircleDollarSign,
  Clock3,
  Cpu,
  Gauge,
  Heart,
  LineChart,
  RefreshCcw,
  ShieldAlert,
  Target,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { PRIMARY } from "@/components/card/challenge-card/chalenge-card";

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

type ImpactRow = {
  /** Numeric endpoints for count-up; displayed as `${a}–${b}%` */
  range: readonly [number, number];
  title: string;
  description: string;
  Icon: LucideIcon;
};

const IMPACT_ROWS: readonly ImpactRow[] = [
  {
    range: [60, 65],
    title: "Improvement in customer retention",
    description:
      "Seen with churn prediction, cohort analysis, and behavioral segmentation in retail, BFSI, and SaaS.",
    Icon: Heart,
  },
  {
    range: [95, 100],
    title: "Faster delivery of business insights",
    description:
      "Achieved through automated pipelines, BI self-service, and reduced manual reporting cycles.",
    Icon: Gauge,
  },
  {
    range: [85, 95],
    title: "Improvement in sales forecasting accuracy",
    description:
      "Typical for time-series models, demand forecasting, and scenario-based planning.",
    Icon: LineChart,
  },
  {
    range: [90, 95],
    title: "Higher accuracy in customer targeting",
    description:
      "Driven by ML-based segmentation, propensity models, and campaign analytics.",
    Icon: Target,
  },
  {
    range: [80, 90],
    title: "Reduction in operational and financial risk exposure",
    description:
      "Observed with anomaly detection, rule-based + predictive risk analytics.",
    Icon: ShieldAlert,
  },
  {
    range: [85, 90],
    title: "Increase in revenue realization",
    description:
      "From pricing optimization, funnel analytics, and performance-driven decisioning.",
    Icon: CircleDollarSign,
  },
  {
    range: [95, 100],
    title: "Reduction in reporting turnaround time",
    description:
      "Enabled through dashboard automation, reusable semantic models, and scheduled data refresh workflows.",
    Icon: Clock3,
  },
  {
    range: [85, 95],
    title: "Improvement in process automation coverage",
    description:
      "Achieved by integrating AI agents, workflow orchestration, and trigger-based operations across teams.",
    Icon: Cpu,
  },
  {
    range: [90, 100],
    title: "Reduction in manual rework and duplicate efforts",
    description:
      "Driven by standardized pipelines, data quality checks, and centralized KPI definitions.",
    Icon: RefreshCcw,
  },
] as const;

function CountUpPercentRange({
  target,
}: {
  target: readonly [number, number];
}) {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);

  useEffect(() => {
    const controls = animate(0, 1, {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        setA(Math.round(target[0] * v));
        setB(Math.round(target[1] * v));
      },
    });
    return () => controls.stop();
  }, [target]);

  return (
    <span className="tabular-nums font-extrabold tracking-tight">
      {a}–{b}%
    </span>
  );
}

function AnimatedPercentRange({
  target,
  active,
}: {
  target: readonly [number, number];
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <span className="tabular-nums font-extrabold tracking-tight">
        {target[0]}–{target[1]}%
      </span>
    );
  }

  if (!active) {
    return (
      <span className="tabular-nums font-extrabold tracking-tight">
        {target[0]}–{target[1]}%
      </span>
    );
  }

  return <CountUpPercentRange target={target} />;
}

function Impact() {
  const sectionId = useId();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, {
    once: true,
    margin: "-12% 0px",
  });

  return (
    <section
      id="impact"
      className="aa-section relative overflow-hidden bg-[#ffffff]"
      aria-labelledby={`${sectionId}-heading`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(120 113 108 / 0.12) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[420px] w-[70%] rounded-full bg-[color-mix(in_srgb,var(--aa-primary)_6%,transparent)] blur-3xl"
        aria-hidden
      />
      <div className="aa-container relative px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2
            id={`${sectionId}-heading`}
            className={`${fontHeading} text-balance text-3xl font-extrabold leading-[1.15] tracking-[-0.02em] text-[var(--aa-text-strong)] sm:text-4xl lg:text-[2.65rem]`}
            initial={false}
            animate={
              headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
            }
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Business{" "}
            <span
              className="rounded-md px-2 py-0.5 text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              Impact
            </span>{" "}
            of Adopting Advanced Analytics
          </motion.h2>
        </div>

        <ul className="mx-auto mt-10 grid max-w-7xl list-none grid-cols-1 gap-3 p-0 sm:mt-12 sm:gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-4">
          {IMPACT_ROWS.map((row, index) => (
            <ImpactCard
              key={`${row.title}-${row.range.join("-")}`}
              row={row}
              index={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ImpactCard({
  row,
  index,
}: {
  row: ImpactRow;
  index: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.35,
    margin: "0px 0px -8% 0px",
  });
  const { Icon } = row;

  return (
    <li ref={ref}>
      <motion.article
        className="group flex h-full items-start gap-2.5 rounded-[var(--aa-radius-lg)] border border-slate-200/80 bg-white p-3 shadow-[0_12px_40px_-32px_rgba(15,23,42,0.22)] transition-[box-shadow,transform,border-color] duration-300 ease-out motion-reduce:transition-colors motion-reduce:hover:translate-y-0 hover:-translate-y-0.5 hover:border-slate-300/90 hover:shadow-[0_16px_44px_-28px_rgba(15,23,42,0.26)] sm:gap-3 sm:p-3.5"
        style={{
          borderTopWidth: 4,
          borderTopStyle: "solid",
          borderTopColor: PRIMARY,
        }}
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
        transition={{
          duration: 0.55,
          delay: Math.min(index * 0.07, 0.42),
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-slate-700 ring-1 ring-slate-100/90 transition-[background-color,box-shadow,color] duration-300 ease-out group-hover:bg-[color-mix(in_srgb,var(--aa-primary)_10%,white)] group-hover:text-[var(--aa-primary)] group-hover:shadow-[0_6px_18px_-10px_color-mix(in_srgb,var(--aa-primary)_45%,transparent)] sm:h-10 sm:w-10"
          aria-hidden
        >
          <Icon
            className="h-4.5 w-4.5 sm:h-5 sm:w-5"
            strokeWidth={2}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p
            className={`${fontHeading} text-[clamp(1.125rem,2.5vw,1.35rem)] font-extrabold leading-none tracking-[-0.03em] text-slate-900 transition-colors duration-300 group-hover:text-[var(--aa-primary)]`}
          >
            <AnimatedPercentRange target={row.range} active={inView} />
          </p>
          <h3
            className={`${fontHeading} mt-1.5 text-[0.8125rem] font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[var(--aa-primary)] sm:text-sm`}
          >
            {row.title}
          </h3>
          <p
            className={`${fontBody} mt-1.5 text-pretty font-semibold text-xs leading-relaxed text-slate-600 sm:text-sm`}
          >
            {row.description}
          </p>
        </div>
      </motion.article>
    </li>
  );
}

export default Impact;
