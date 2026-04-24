"use client";

import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import type { MotionValue } from "framer-motion";
import type { ReactNode, RefObject } from "react";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";

const fontHeading = "font-[family-name:var(--font-heading)]";

const COLS = 3;

/** Fade length along section scroll (shared with FlowNode). */
const REVEAL_FADE = 0.038;
/** Minimum extra scroll after node i before node i+1 can start (prevents overlap). */
const SEQUENTIAL_REVEAL_GAP = REVEAL_FADE + 0.018;
/**
 * Map section scroll 0→1 onto reveal progress so the timeline finishes before
 * the section end — avoids late nodes still blurring when the next section is visible.
 */
const REVEAL_SCROLL_COMPRESSION = 0.82;
/** Upper bound for path-based reveal thresholds so last node reaches full opacity before progress hits 1. */
const REVEAL_AT_MAX = 1 - REVEAL_FADE - 0.02;

/**
 * Scroll progress 0→1 as the section crosses the viewport (standard “scroll-through”
 * mapping). Works reliably on mobile; includes `visualViewport` for iOS URL bar /
 * pinch-zoom. Replaces ad‑hoc start/end ratios that often kept progress ≈ 0 on phones.
 */
function useSectionViewportProgress(
  sectionRef: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const progress = useMotionValue(0);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const h = Math.max(rect.height, 1);
      const p = (vh - rect.top) / (h + vh);
      progress.set(Math.min(1, Math.max(0, p)));
    };

    measure();
    const opts: AddEventListenerOptions = { passive: true };
    window.addEventListener("scroll", measure, opts);
    document.addEventListener("scroll", measure, opts);
    window.addEventListener("resize", measure);
    const vv = window.visualViewport;
    vv?.addEventListener("scroll", measure);
    vv?.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      window.removeEventListener("scroll", measure);
      document.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      vv?.removeEventListener("scroll", measure);
      vv?.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [progress, sectionRef]);

  return progress;
}

/** Ensures each step’s reveal only after the previous step’s fade can finish. */
function enforceSequentialRevealThresholds(
  raw: number[],
  minGap: number,
): number[] {
  if (raw.length === 0) return raw;
  const out: number[] = [raw[0]];
  for (let i = 1; i < raw.length; i++) {
    out.push(Math.min(1, Math.max(raw[i], out[i - 1] + minGap)));
  }
  return out;
}

const primary = "var(--aa-primary)";

const REASONS_SECTION_TITLE_LINE1 = "From Manual to Autonomous";
const REASONS_SECTION_TITLE_AFTER_HIGHLIGHT =
  " That Think, Act & Scale Your Business";
const REASONS_SECTION_DESCRIPTION =
  "Scalable Growth Engine – From data to revenue in under 90 days";

/** Bold metrics in body copy (paired with extrabold titles). */
function metricBold(children: ReactNode) {
  return <strong className="font-bold text-slate-900">{children}</strong>;
}

const REASONS = [
  {
    title: "Unified Website Development",
    description: (
      <>
        Launch production-ready platforms in {metricBold("7–14 days")}
      </>
    ),
  },
  {
    title: "AI Digital Marketing Campaigns",
    description: (
      <>Improve lead conversion by {metricBold("3X–5X")}</>
    ),
  },
  {
    title: "Improved ROI",
    description: (
      <>
        Achieve {metricBold("30–70%")} increase in marketing
      </>
    ),
  },
  {
    title: "Zero Manual Effort Operations",
    description: (
      <>
        Automate workflows and save {metricBold("100+ hours/month")}
      </>
    ),
  },
  {
    title: "Reduced Churn Rate",
    description: (
      <>
        Improve retention by {metricBold("20–40%")} by AI Agents
      </>
    ),
  },
  {
    title: "End-to-End Business Automation",
    description: (
      <>Reduce manual workload by {metricBold("80–90%")}</>
    ),
  },
  {
    title: "Reliable Data Pipelines",
    description: (
      <>Ensure {metricBold("99%")} data accuracy & real-time flow</>
    ),
  },
  {
    title: "Optimized ML Models",
    description: (
      <>
        Achieve high-performance predictions ({metricBold("85–95%")}{" "}
        accuracy)
      </>
    ),
  },
  {
    title: "AI-Generated Performance Dashboards",
    description: (
      <>
        Real-time insights with {metricBold("100%")} instant decision
        visibility
      </>
    ),
  },
  {
    title: "Continuous Brand Health Monitoring",
    description: (
      <>Track sentiment & engagement {metricBold("24/7")}</>
    ),
  },
  {
    title: "Faster Decision-Making",
    description: (
      <>
        Cut analysis time by {metricBold("80%")} with AI automation
      </>
    ),
  },
] as const satisfies ReadonlyArray<{
  title: string;
  description: ReactNode;
}>;

const ICONS = [
  function IconGlobeCode({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  },
  function IconMegaphone({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M4 12v-2a1 1 0 0 1 1-1h4l8-4v14l-8-4H5a1 1 0 0 1-1-1v-2Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 15v3a2 2 0 0 0 2 2h1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  },
  function IconRoiTrend({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M4 19h16M6 16l4-4 3 3 5-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 9h3v3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  },
  function IconWorkflow({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M6 4h4v4H6V4Zm8 0h4v4h-4V4ZM6 16h4v4H6v-4Zm8 0h4v4h-4v-4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M10 6h4M8 8v8M16 8v8M10 18h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  function IconRetention({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M12 21s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 11c0 5.65-7 10-7 10Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 12.5 11.2 14 14.5 10.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  function IconAutomationGear({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="m19 12 1.7 1-1.7 3-2-.3a7.4 7.4 0 0 1-1.3 1.3l.3 2h-3l-1-1.7-1 1.7H8l.3-2A7.4 7.4 0 0 1 7 15.7l-2 .3-1.7-3L5 12l-1.7-1 1.7-3 2 .3a7.4 7.4 0 0 1 1.3-1.3L8 5h3l1 1.7L13 5h3l-.3 2a7.4 7.4 0 0 1 1.3 1.3l2-.3L20.7 11 19 12Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  function IconPipeline({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M3 7h6v4H3V7Zm12 0h6v4h-6V7ZM9 13h6v4H9v-4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 9h2.5M12 9v4M15 9h0"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  },
  function IconBrain({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M9 5a3 3 0 0 0-3 3v.5A2.5 2.5 0 0 0 4 11v1a2.5 2.5 0 0 0 2 2.45V16a3 3 0 0 0 3 3h1V5H9Zm6 0h-1v14h1a3 3 0 0 0 3-3v-1.55A2.5 2.5 0 0 0 20 12v-1a2.5 2.5 0 0 0-2-2.5V8a3 3 0 0 0-3-3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  },
  function IconDashboard({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M4 4h16v16H4V4Zm0 6h16M10 10v10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M13 15h5M13 18h3M6 14h2M6 17h2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  },
  function IconPulse({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M3 12h4l2-4 4 8 2-4h6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  },
  function IconDecision({ className }: { className?: string }) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
        <path
          d="M4 6h16M12 6v12M12 18l-3-3m3 3 3-3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 10h3M14 10h3"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  },
] as const;

/** Row-major snake: even rows L→R, odd rows R→L (grid placement). */
function snakeCell(index: number, cols: number): { row: number; col: number } {
  const row = Math.floor(index / cols);
  const mod = index % cols;
  const col = row % 2 === 0 ? mod : cols - 1 - mod;
  return { row, col };
}

type Point = { x: number; y: number };

/**
 * Catmull-Rom–style smooth curve through all points (cubic segments).
 * Produces flowing S-curves instead of sharp polyline corners.
 */
function buildSmoothPathD(points: Point[]): string {
  const n = points.length;
  if (n === 0) return "";
  if (n === 1) return `M ${points[0].x} ${points[0].y}`;
  if (n === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < n - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/** Distance along `path` (0…pathLen) closest to node center (px, py) in SVG coords. */
function distanceAlongPathToPoint(
  path: SVGPathElement,
  pathLen: number,
  px: number,
  py: number,
): number {
  if (pathLen <= 0) return 0;
  const steps = 96;
  let bestD = 0;
  let bestDist = Infinity;
  for (let k = 0; k <= steps; k++) {
    const d = (k / steps) * pathLen;
    const pt = path.getPointAtLength(d);
    const dist = Math.hypot(pt.x - px, pt.y - py);
    if (dist < bestDist) {
      bestDist = dist;
      bestD = d;
    }
  }
  let lo = Math.max(0, bestD - pathLen / steps);
  let hi = Math.min(pathLen, bestD + pathLen / steps);
  for (let i = 0; i < 14; i++) {
    const m1 = lo + (hi - lo) / 3;
    const m2 = hi - (hi - lo) / 3;
    const p1 = path.getPointAtLength(m1);
    const p2 = path.getPointAtLength(m2);
    const d1 = Math.hypot(p1.x - px, p1.y - py);
    const d2 = Math.hypot(p2.x - px, p2.y - py);
    if (d1 < d2) hi = m2;
    else lo = m1;
  }
  return (lo + hi) / 2;
}

function useConnectorPath(count: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [svg, setSvg] = useState<{
    d: string;
    w: number;
    h: number;
    points: Point[];
  }>({ d: "", w: 0, h: 0, points: [] });

  const setDotRef = useCallback((i: number) => (el: HTMLDivElement | null) => {
    dotRefs.current[i] = el;
  }, []);

  useLayoutEffect(() => {
    let alive = true;
    const measure = () => {
      if (!alive) return;
      const wrap = containerRef.current;
      if (!wrap) return;

      const cr = wrap.getBoundingClientRect();
      if (cr.width < 8 || cr.height < 8) return;

      const pts: Point[] = [];
      for (let i = 0; i < count; i++) {
        const el = dotRefs.current[i];
        if (!el) return;
        const r = el.getBoundingClientRect();
        pts.push({
          x: r.left + r.width / 2 - cr.left,
          y: r.top + r.height / 2 - cr.top,
        });
      }
      if (pts.length !== count) return;

      setSvg({
        d: buildSmoothPathD(pts),
        w: cr.width,
        h: cr.height,
        points: pts,
      });
    };

    measure();
    let rafOuter = 0;
    let rafInner = 0;
    rafOuter = requestAnimationFrame(() => {
      rafInner = requestAnimationFrame(measure);
    });
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", measure);
    void document.fonts?.ready?.then(() => {
      if (alive) measure();
    });
    return () => {
      alive = false;
      cancelAnimationFrame(rafOuter);
      cancelAnimationFrame(rafInner);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [count]);

  return { containerRef, setDotRef, svg };
}

function CurvedTimelinePath({
  svg,
  scrollYProgress,
  reduceMotion,
  onRevealThresholds,
}: {
  svg: { d: string; w: number; h: number; points: Point[] };
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean;
  onRevealThresholds: (normalized: number[]) => void;
}) {
  const pathRef = useRef<SVGPathElement>(null);
  const revealCbRef = useRef(onRevealThresholds);
  const [pathLen, setPathLen] = useState(0);
  const gradId = `reasons-path-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    revealCbRef.current = onRevealThresholds;
  }, [onRevealThresholds]);

  useLayoutEffect(() => {
    const el = pathRef.current;
    if (!el || !svg.d) return;
    const len = el.getTotalLength();
    setPathLen(len);
  }, [svg.d, svg.w, svg.h]);

  /** Map each node to scroll progress (0–1) when the drawn stroke reaches that point on the path. */
  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path || pathLen <= 0 || svg.points.length === 0) return;
    if (reduceMotion) {
      revealCbRef.current(svg.points.map(() => 0));
      return;
    }
    const raw = svg.points.map((p) =>
      Math.min(1, distanceAlongPathToPoint(path, pathLen, p.x, p.y) / pathLen),
    );
    const normalized = enforceSequentialRevealThresholds(
      raw,
      SEQUENTIAL_REVEAL_GAP,
    );
    const maxN = Math.max(...normalized, 1e-9);
    const scaled = normalized.map((t) => (t / maxN) * REVEAL_AT_MAX);
    revealCbRef.current(scaled);
  }, [svg.d, pathLen, reduceMotion, svg.points]);

  /** Plain `<path>` + attributes — `motion.path` often fails to apply animated `strokeDashoffset` in SVG. */
  const applyProgressDash = useCallback(
    (scroll01: number) => {
      const el = pathRef.current;
      if (!el || reduceMotion) return;
      const len = el.getTotalLength();
      if (len <= 0) return;
      el.setAttribute("stroke-dasharray", `${len}`);
      el.setAttribute("stroke-dashoffset", String((1 - scroll01) * len));
    },
    [reduceMotion],
  );

  useLayoutEffect(() => {
    applyProgressDash(scrollYProgress.get());
  }, [applyProgressDash, scrollYProgress, svg.d, pathLen]);

  useMotionValueEvent(scrollYProgress, "change", applyProgressDash);

  if (svg.w <= 0 || !svg.d) return null;

  const trackStroke = 7;
  const progressStroke = 5;

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      viewBox={`0 0 ${svg.w} ${svg.h}`}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a73e8" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.85" />
        </linearGradient>
      </defs>

      {/* Full faint track — timeline “rail” */}
      <path
        d={svg.d}
        fill="none"
        stroke="rgb(226 232 240)"
        strokeWidth={trackStroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="opacity-90"
        vectorEffect="non-scaling-stroke"
      />

      {/* Scroll-revealed curve — solid #1a73e8 so iOS/WebKit always paints; dash animates via ref */}
      {reduceMotion ? (
        <path
          ref={pathRef}
          d={svg.d}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={progressStroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_12px_rgba(26,115,232,0.35)]"
          vectorEffect="non-scaling-stroke"
        />
      ) : (
        <path
          ref={pathRef}
          d={svg.d}
          fill="none"
          stroke="#1a73e8"
          strokeWidth={Math.max(progressStroke + 1, 6)}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_12px_rgba(26,115,232,0.45)]"
        />
      )}
    </svg>
  );
}

function FlowNode({
  index,
  title,
  description,
  active,
  onHover,
  setDotRef,
  reduceMotion,
  scrollYProgress,
  revealAt,
  thresholdsReady,
  layout = "snake",
}: {
  index: number;
  title: string;
  description: ReactNode;
  active: boolean;
  onHover: (i: number | null) => void;
  setDotRef: (i: number) => (el: HTMLDivElement | null) => void;
  reduceMotion: boolean;
  scrollYProgress: MotionValue<number>;
  revealAt: number;
  thresholdsReady: boolean;
  /** `snake`: centered column (grid cells). `stack`: dot rail left, text right (mobile). */
  layout?: "snake" | "stack";
}) {
  const Icon = ICONS[index] ?? ICONS[0];
  const highlight = active;
  const isStack = layout === "stack";

  const opacity = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return 1;
    if (!thresholdsReady) return 0;
    return Math.min(1, Math.max(0, (v - revealAt) / REVEAL_FADE));
  });

  const y = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return 0;
    if (!thresholdsReady) return 18;
    const t = Math.min(1, Math.max(0, (v - revealAt) / REVEAL_FADE));
    return 18 * (1 - t);
  });

  const blurPx = useTransform(scrollYProgress, (v) => {
    if (reduceMotion) return 0;
    if (!thresholdsReady) return 7;
    const t = Math.min(1, Math.max(0, (v - revealAt) / REVEAL_FADE));
    return 7 * (1 - t);
  });

  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  /** Dot ref must sit on a non-transformed box so path geometry matches layout (scroll-driven `y` would skew `getBoundingClientRect`). */
  const motionStyle = { opacity, y, filter };

  return (
    <div
      className={
        isStack
          ? "group relative z-[2] flex w-full flex-row items-start gap-3 sm:gap-4"
          : "group relative z-[2] flex flex-col items-center text-center"
      }
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        ref={setDotRef(index)}
        className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center sm:h-14 sm:w-14"
        aria-hidden
      >
        <motion.div
          style={motionStyle}
          className={`flex h-full w-full items-center justify-center rounded-full border bg-white transition duration-300 ${
            highlight
              ? "border-[var(--aa-primary)] shadow-[0_10px_36px_-8px_color-mix(in_srgb,var(--aa-primary)_55%,transparent)]"
              : "border-slate-200 shadow-sm group-hover:border-[var(--aa-primary)]/50 group-hover:shadow-[0_8px_28px_-10px_color-mix(in_srgb,var(--aa-primary)_40%,transparent)]"
          }`}
        >
          <Icon className="h-[22px] w-[22px] text-slate-900 transition group-hover:text-[var(--aa-primary)] sm:h-6 sm:w-6" />
        </motion.div>
      </div>
      <motion.div
        style={motionStyle}
        className={
          isStack
            ? "min-w-0 flex-1 pt-2.5 sm:pt-3"
            : "mt-4 max-w-[min(100%,22rem)] text-center sm:max-w-[26rem]"
        }
      >
        <h3
          className={`${fontHeading} m-0 text-[0.9375rem] font-black leading-snug text-slate-900 transition group-hover:text-[var(--aa-primary)] sm:text-base ${
            isStack ? "text-left" : ""
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1.5 text-[0.8125rem] leading-relaxed text-slate-600 sm:text-sm ${
            isStack ? "text-left" : ""
          }`}
        >
          {description}
        </p>
      </motion.div>
    </div>
  );
}

function ReasonsSnakeDesktop({
  reduceMotion,
  scrollYProgress,
}: {
  reduceMotion: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [revealThresholds, setRevealThresholds] = useState<number[]>([]);
  const { containerRef, setDotRef, svg } = useConnectorPath(REASONS.length);

  const handleRevealThresholds = useCallback((t: number[]) => {
    setRevealThresholds((prev) => {
      if (
        prev.length === t.length &&
        prev.every((v, i) => Math.abs(v - t[i]) < 1e-4)
      ) {
        return prev;
      }
      return t;
    });
  }, []);

  const thresholdsReady = revealThresholds.length === REASONS.length;

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-5xl">
      <CurvedTimelinePath
        svg={svg}
        scrollYProgress={scrollYProgress}
        reduceMotion={reduceMotion}
        onRevealThresholds={handleRevealThresholds}
      />

      <div
        className="relative z-[1] grid w-full gap-x-6 gap-y-16 sm:gap-x-8 sm:gap-y-20 lg:gap-x-10 lg:gap-y-24"
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
        }}
      >
        {REASONS.map((reason, index) => {
          const { row, col } = snakeCell(index, COLS);
          return (
            <div
              key={`${index}-${reason.title}`}
              style={{
                gridRow: row + 1,
                gridColumn: col + 1,
              }}
              className="min-w-0"
            >
              <FlowNode
                index={index}
                title={reason.title}
                description={reason.description}
                active={hovered === index}
                onHover={setHovered}
                setDotRef={setDotRef}
                reduceMotion={reduceMotion}
                scrollYProgress={scrollYProgress}
                revealAt={revealThresholds[index] ?? 0}
                thresholdsReady={thresholdsReady}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReasonsStackMobile({
  reduceMotion,
  scrollYProgress,
}: {
  reduceMotion: boolean;
  scrollYProgress: MotionValue<number>;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [revealThresholds, setRevealThresholds] = useState<number[]>([]);
  const { containerRef, setDotRef, svg } = useConnectorPath(REASONS.length);

  const handleRevealThresholds = useCallback((t: number[]) => {
    setRevealThresholds((prev) => {
      if (
        prev.length === t.length &&
        prev.every((v, i) => Math.abs(v - t[i]) < 1e-4)
      ) {
        return prev;
      }
      return t;
    });
  }, []);

  const thresholdsReady = revealThresholds.length === REASONS.length;

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-lg">
      <CurvedTimelinePath
        svg={svg}
        scrollYProgress={scrollYProgress}
        reduceMotion={reduceMotion}
        onRevealThresholds={handleRevealThresholds}
      />

      <div className="relative z-[1] flex flex-col gap-10 sm:gap-12">
        {REASONS.map((reason, index) => (
          <FlowNode
            key={`${index}-${reason.title}`}
            layout="stack"
            index={index}
            title={reason.title}
            description={reason.description}
            active={hovered === index}
            onHover={setHovered}
            setDotRef={setDotRef}
            reduceMotion={reduceMotion}
            scrollYProgress={scrollYProgress}
            revealAt={revealThresholds[index] ?? 0}
            thresholdsReady={thresholdsReady}
          />
        ))}
      </div>
    </div>
  );
}

const Reasons = () => {
  const reduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const sectionScroll = useSectionViewportProgress(sectionRef);

  const revealProgress = useTransform(sectionScroll, (v) =>
    Math.min(1, v / REVEAL_SCROLL_COMPRESSION),
  );

  return (
    <section
      ref={sectionRef}
      id="reasons"
      aria-labelledby="reasons-title"
      aria-describedby="reasons-description"
      className="aa-section relative overflow-x-hidden bg-white"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,color-mix(in_srgb,var(--aa-primary)_10%,transparent),transparent_50%)]"
        aria-hidden
      />

      <div className="aa-container relative">
        <motion.header
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-7xl text-center sm:mb-14 lg:mb-16"
        >
          <h2
            id="reasons-title"
            className={`${fontHeading} flex flex-col items-center gap-1 text-3xl font-black leading-[1.15] tracking-tight text-slate-900 sm:gap-1.5 sm:text-4xl`}
          >
            <span className="block">{REASONS_SECTION_TITLE_LINE1}</span>
            <span className="block max-w-full">
              We{" "}
              <span
                className="rounded-sm px-2 py-0.5 text-white"
                style={{ backgroundColor: primary }}
              >
                Build AI Systems
              </span>
              {REASONS_SECTION_TITLE_AFTER_HIGHLIGHT}
            </span>
          </h2>
          <p
            id="reasons-description"
            className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            {REASONS_SECTION_DESCRIPTION}
          </p>
        </motion.header>

        <div className="relative">
          <div className="hidden lg:block">
            <ReasonsSnakeDesktop
              reduceMotion={reduceMotion}
              scrollYProgress={revealProgress}
            />
          </div>
          <div className="lg:hidden">
            <ReasonsStackMobile
              reduceMotion={reduceMotion}
              scrollYProgress={revealProgress}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reasons;
