
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bot,
  Brain,
  CircleDollarSign,
  Heart,
  Megaphone,
  Package,
  RefreshCcw,
  Rocket,
  Settings2,
  ShieldCheck,
  Target,
  TrendingUp,
} from "lucide-react";
import { PRIMARY } from "@/components/card/challenge-card/chalenge-card";

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

/**
 * Icon modes:
 * - `false` (default): Lucide SVGs — consistent size, works with your primary color, looks the same on every OS.
 * - `true`: Original emoji — friendlier, zero icon dependency at render time.
 */
const USE_EMOJI_ICONS = false;

type ReasonItem = {
  emoji: string;
  Icon: LucideIcon;
  title: string;
};

const REASON_ITEMS: readonly ReasonItem[] = [
  {
    emoji: "⚙️",
    Icon: Settings2,
    title: "Business Automation",
  },
  {
    emoji: "📊",
    Icon: BarChart3,
    title: "Data-Driven Strategy",
  },
  {
    emoji: "🧠",
    Icon: Brain,
    title: "Error Reduction",
  },
  {
    emoji: "💰",
    Icon: CircleDollarSign,
    title: "Cost Optimization",
  },
  {
    emoji: "🚀",
    Icon: Rocket,
    title: "Digital Transformation",
  },
  {
    emoji: "📢",
    Icon: Megaphone,
    title: "Brand Awareness",
  },
  {
    emoji: "🤖",
    Icon: Bot,
    title: "Optimized Models",
  },
  {
    emoji: "📈",
    Icon: TrendingUp,
    title: "Forecasting Decisions",
  },
  {
    emoji: "📦",
    Icon: Package,
    title: "Demand Forecasting",
  },
  {
    emoji: "❤️",
    Icon: Heart,
    title: "Brand Monitoring",
  },
  {
    emoji: "🔐",
    Icon: ShieldCheck,
    title: "Data Security",
  },
  {
    emoji: "🔄",
    Icon: RefreshCcw,
    title: "Churn Reduction",
  },
  {
    emoji: "📉",
    Icon: Target,
    title: "Better ROI",
  },
];

const listContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const NewReason = () => {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section
      id="partner-reasons"
      aria-labelledby="partner-reasons-title"
      aria-describedby="partner-reasons-subtitle"
      className="aa-section relative overflow-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,color-mix(in_srgb,var(--aa-primary)_12%,transparent),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/90 to-transparent"
        aria-hidden
      />

      <div className="aa-container relative">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-11 max-w-3xl text-center sm:mb-12 lg:mb-14"
        >
         
          <h2
            id="partner-reasons-title"
            className={`${fontHeading} mt-3 text-3xl font-black leading-[1.15] tracking-tight text-slate-900 sm:text-4xl`}
          >
            <span
              className="rounded-sm px-2 py-0.5 text-[#ffffff]"
              style={{ backgroundColor: PRIMARY }}
            >
              Reasons
            </span>{" "}
            to Partner with Analytics Avenue
          </h2>
          <p
            id="partner-reasons-subtitle"
            className={`${fontBody} mx-auto mt-4 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg`}
          >
            Thirteen focused outcomes—from automation and strategy to security,
            forecasting, and ROI.
          </p>
        </motion.header>

        <motion.ul
          className="mx-auto grid max-w-7xl list-none grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4"
          variants={reduceMotion ? undefined : listContainer}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "visible"}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -8% 0px" }}
        >
          {REASON_ITEMS.map(({ emoji, Icon, title }) => (
            <motion.li
              key={title}
              variants={reduceMotion ? undefined : listItem}
              className="min-w-0"
            >
              <article
                className="group flex h-full items-center gap-2.5 rounded-[var(--aa-radius-lg)] border border-slate-200/80 bg-white p-3 shadow-[0_12px_40px_-32px_rgba(15,23,42,0.22)] transition-[box-shadow,transform,border-color] duration-300 ease-out motion-reduce:transition-colors motion-reduce:hover:translate-y-0 hover:-translate-y-0.5 hover:border-slate-300/90 hover:shadow-[0_16px_44px_-28px_rgba(15,23,42,0.26)] sm:gap-3 sm:p-3.5"
                style={{
                  borderTopWidth: 4,
                  borderTopStyle: "solid",
                  borderTopColor: "var(--aa-primary)",
                }}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] ring-1 ring-slate-100/90 transition-[background-color,box-shadow,color] duration-300 ease-out group-hover:bg-[color-mix(in_srgb,var(--aa-primary)_10%,white)] group-hover:text-[var(--aa-primary)] group-hover:shadow-[0_6px_18px_-10px_color-mix(in_srgb,var(--aa-primary)_45%,transparent)] sm:h-10 sm:w-10 ${USE_EMOJI_ICONS ? "text-[1.35rem] leading-none sm:text-[1.45rem]" : "text-slate-700"}`}
                  aria-hidden
                >
                  {USE_EMOJI_ICONS ? (
                    emoji
                  ) : (
                    <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3
                    className={`${fontHeading} text-[0.8125rem] font-semibold leading-snug text-slate-900 transition-colors duration-300 group-hover:text-[var(--aa-primary)] sm:text-sm`}
                  >
                    {title}
                  </h3>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default NewReason;