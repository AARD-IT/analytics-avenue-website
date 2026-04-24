"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

/**
 * Step index from section scroll (0–1). Boundaries are staggered so the next
 * step only activates after the timeline has advanced — avoids the next card
 * highlighting before the line reaches the current step.
 */
function activeStepFromScroll(v: number): number {
  if (v < 0.4) return 0;
  if (v < 0.72) return 1;
  return 2;
}

const sourcePlatforms = ["Shopify", "Salesforce", "Google Analytics", "Meta Ads", "HubSpot", "Stripe"] as const;
const sourceLabels = ["Structured", "Semi-Structured", "Unstructured", "Real-Time", "Batch"] as const;
const processingTools = ["Snowflake", "Databricks", "AWS Glue", "Airflow"] as const;
const storageLayer = ["S3", "Azure Blob", "GCP GCS"] as const;

const aiGroups = [
  {
    title: "Dynamic Dashboards",
    items: ["Marketing Performance", "Inventory Forecasting", "Vendor Risk Monitoring"],
  },
  {
    title: "Predictive Models",
    items: ["Price Optimization", "Customer Segmentation", "Demand Forecasting"],
  },
  {
    title: "Agentic AI Automations",
    items: ["AI Personalization Agents", "Business Automation Agents", "Smart Decision Systems"],
  },
] as const;

const steps = ["01", "02", "03"] as const;

const Solution = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.3"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = activeStepFromScroll(v);
    setActiveStep((prev) => (prev === next ? prev : next));
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  /** Card reveals follow the same scroll progress as the vertical line (no whileInView early pop-in). */
  const c0Opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1], { clamp: true });
  const c0Y = useTransform(scrollYProgress, [0, 0.1], [28, 0], { clamp: true });
  const c1Opacity = useTransform(scrollYProgress, [0.4, 0.52], [0, 1], { clamp: true });
  const c1Y = useTransform(scrollYProgress, [0.4, 0.52], [28, 0], { clamp: true });
  const c2Opacity = useTransform(scrollYProgress, [0.72, 0.84], [0, 1], { clamp: true });
  const c2Y = useTransform(scrollYProgress, [0.72, 0.84], [28, 0], { clamp: true });

  return (
    <section id="solution" className="aa-section relative overflow-x-hidden bg-gradient-to-b from-[#f6faff] to-white py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="mb-12 max-w-3xl">
          <p className="aa-kicker tracking-[0.3em]">Solution Journey</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0f172a] sm:text-4xl">
            Data-to-AI Storytelling Pipeline
          </h2>
        </div>

        <div ref={sectionRef} className="relative mx-auto max-w-6xl">
          <div className="pointer-events-none absolute bottom-8 left-[17px] top-8 hidden w-px bg-[#dbeafe] sm:block" />
          <motion.div
            style={{ height: progressHeight }}
            className="pointer-events-none absolute left-[17px] top-8 hidden w-px bg-gradient-to-b from-[#3b82f6] to-[#0ea5e9] sm:block"
          />

          <div className="space-y-6 sm:space-y-10">
            <motion.article
              style={
                reduceMotion
                  ? undefined
                  : { opacity: c0Opacity, y: c0Y }
              }
              className="relative rounded-[26px] border border-[#dbeafe] bg-white/75 p-6 shadow-[0_20px_50px_rgba(37,99,235,0.08)] backdrop-blur-xl sm:ml-14 sm:p-8"
            >
              <span
                className={`absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold sm:-left-[44px] ${
                  activeStep === 0 ? "bg-[#2563eb] text-white" : "bg-[#eff6ff] text-[#64748b]"
                }`}
              >
                {steps[0]}
              </span>
              <h3 className="mt-10 text-balance text-xl font-semibold leading-snug text-[#0f172a] sm:mt-0 sm:text-2xl lg:text-3xl">
                01 — Data Sources
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Capturing multi-channel data across E-commerce, Social, and CRM platforms.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {sourcePlatforms.map((platform) => (
                  <span key={platform} className="rounded-full border border-[#bfdbfe] bg-white px-4 py-2 text-sm font-medium text-[#1e3a8a]">
                    {platform}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {sourceLabels.map((label) => (
                  <span key={label} className="rounded-md bg-[#eff6ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
                    {label}
                  </span>
                ))}
              </div>
            </motion.article>

            <motion.article
              style={
                reduceMotion
                  ? undefined
                  : { opacity: c1Opacity, y: c1Y }
              }
              className="relative rounded-[26px] border border-[#dbeafe] bg-white/75 p-6 shadow-[0_20px_50px_rgba(37,99,235,0.08)] backdrop-blur-xl sm:ml-14 sm:p-8"
            >
              <span
                className={`absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold sm:-left-[44px] ${
                  activeStep === 1 ? "bg-[#2563eb] text-white" : "bg-[#eff6ff] text-[#64748b]"
                }`}
              >
                {steps[1]}
              </span>
              <h3 className="mt-10 text-balance text-xl font-semibold leading-snug text-[#0f172a] sm:mt-0 sm:text-2xl lg:text-3xl">
                02 — Single Source of Truth to Query All Your Data
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Processing and centralizing data into high-performance cloud warehouses for a Single Source of Truth.
              </p>
              <div className="mt-7 rounded-2xl border border-[#dbeafe] bg-white/90 p-6 shadow-[0_16px_40px_rgba(37,99,235,0.12)]">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748b]">Warehouse Layer</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {processingTools.map((tool) => (
                    <span key={tool} className="rounded-lg bg-[#eff6ff] px-3 py-1.5 text-sm font-medium text-[#1e40af]">
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="my-5 h-px bg-gradient-to-r from-transparent via-[#bae6fd] to-transparent" />
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#64748b]">Storage Layer</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {storageLayer.map((tool) => (
                    <span key={tool} className="rounded-lg border border-[#dbeafe] bg-white px-3 py-1.5 text-sm font-medium text-[#0c4a6e]">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>

            <motion.article
              style={
                reduceMotion
                  ? undefined
                  : { opacity: c2Opacity, y: c2Y }
              }
              className="relative rounded-[26px] border border-[#dbeafe] bg-white/75 p-6 shadow-[0_20px_50px_rgba(37,99,235,0.08)] backdrop-blur-xl sm:ml-14 sm:p-8"
            >
              <span
                className={`absolute left-6 top-6 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold sm:-left-[44px] ${
                  activeStep === 2 ? "bg-[#2563eb] text-white" : "bg-[#eff6ff] text-[#64748b]"
                }`}
              >
                {steps[2]}
              </span>
              <h3 className="mt-10 text-balance text-xl font-semibold leading-snug text-[#0f172a] sm:mt-0 sm:text-2xl lg:text-3xl">
                03 — End to End AI Solutions
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Empower Your Business with Predictive Insights, Precision Decisions, and Seamless AI Automation.
              </p>
              <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-3">
                {aiGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-[#dbeafe] bg-white/85 p-4">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#64748b]">{group.title}</h4>
                    <ul className="mt-3 space-y-2 text-sm text-[#334155]">
                      {group.items.map((item) => (
                        <li key={item} className="border-l-2 border-[#bfdbfe] pl-2.5">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
