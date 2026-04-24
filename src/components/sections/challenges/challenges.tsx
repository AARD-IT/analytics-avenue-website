"use client";

import ChallengeCard, { PRIMARY } from "@/components/card/challenge-card/chalenge-card";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

type ChallengeItem = {
  id: string;
  badgeLabel: string;
  headline: string;
  description: string;
  bullets: [string, string, string];
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
};

const challenges: ChallengeItem[] = [
  {
    id: "ai-automation",
    badgeLabel: "AI & Automation",
    headline: "Automate. Optimize. Scale.",
    description:
      "Transform your business with intelligent automation and AI-driven workflows.",
    bullets: [
      "Automate repetitive processes",
      "Build intelligent decision systems",
      "Improve efficiency at scale",
    ],
    imageSrc: "/assets/images/challenges/genai.png",
    imageAlt: "AI and automation illustration",
  },
  {
    id: "supply-chain",
    badgeLabel: "Supply Chain",
    headline: "Streamline Operations Efficiently.",
    description:
      "Optimize logistics, inventory, and demand planning with real-time data insights.",
    bullets: [
      "Track inventory  and logistics",
      "Improve demand forecasting",
      "Reduce operational inefficiencies",
    ],
    imageSrc: "/assets/images/challenges/supplychain.png",
    imageAlt: "Supply chain analytics illustration",
  },
  {
    id: "telemetry",
    badgeLabel: "Telemetry",
    headline: "Understand Every Customer.",
    description:
      "Gain deep insights into customer behavior, retention, and engagement patterns.",
    bullets: [
      "Segment customers with precision",
      "Track engagement and retention",
      "Personalize experiences using data",
    ],
    imageSrc: "/assets/images/challenges/marketing.png",
    imageAlt: "Customer analytics and engagement illustration",
  },
  {
    id: "automobile",
    badgeLabel: "Automobile",
    headline: "Smarter Mobility And Aftermarket.",
    description:
      "From connected vehicles to dealer and service networks—turn product, usage, and quality data into better experiences.",
    bullets: [
      "Usage patterns, quality, and recall-risk signals",
      "Optimize parts, service, and channel performance",
      "Personalize offers with privacy-aware analytics",
    ],
    imageSrc: "/assets/images/challenges/ev.png",
    imageAlt: "Automotive and electric mobility illustration",
  },
  {
    id: "real-estate",
    badgeLabel: "Real Estate",
    headline: "Markets, Assets, And Portfolios In View.",
    description:
      "Blend listings, comps, footfall, and operations data to price confidently, allocate capital, and run properties efficiently.",
    bullets: [
      "Market and submarket trend monitoring",
      "Portfolio and asset performance reporting",
      "Occupancy, revenue, and opex visibility",
    ],
    imageSrc: "/assets/images/challenges/realestate.png",
    imageAlt: "Real estate and property analytics illustration",
  },
  {
    id: "ecommerce",
    badgeLabel: "Ecommerce",
    headline: "Conversion, Catalog, And Fulfillment Aligned.",
    description:
      "Connect merchandising, marketing, and operations so you grow revenue while protecting margin and delivery promises.",
    bullets: [
      "Funnel, cohort, and merchandising analytics",
      "Inventory and fulfillment aligned to demand",
      "Attribution and promo effectiveness you can trust",
    ],
    imageSrc: "/assets/images/challenges/marketing.png",
    imageAlt: "Ecommerce and digital retail illustration",
  },
  {
    id: "bfsi",
    badgeLabel: "BFSI",
    headline: "Risk, Compliance, And Customer Trust.",
    description:
      "Strengthen fraud detection, credit and portfolio monitoring, and regulatory reporting with auditable, scalable analytics.",
    bullets: [
      "Fraud patterns and anomaly detection at scale",
      "Credit, exposure, and portfolio health views",
      "Reporting pipelines with lineage and controls",
    ],
    imageSrc: "/assets/images/challenges/manufacturing.png",
    imageAlt: "Financial services and enterprise analytics illustration",
  },
  {
    id: "greentech",
    badgeLabel: "Greentech",
    headline: "Measure Impact, Scale Clean Operations.",
    description:
      "Track generation, consumption, and emissions across assets so you can optimize efficiency and prove sustainability outcomes.",
    bullets: [
      "Asset and grid performance monitoring",
      "Carbon and energy intensity reporting",
      "Scenario planning for capacity and investment",
    ],
    imageSrc: "/assets/images/challenges/solar.png",
    imageAlt: "Clean energy and sustainability illustration",
  },
];

const tabScrollHide =
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

const Challenges = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const isProgrammaticScrollRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollByViewport = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const c0 = cardRefs.current[0];
    const c1 = cardRefs.current[1];
    /** Distance to next card (width + gap), not full viewport — avoids skipping slides */
    const step =
      c0 && c1
        ? c1.offsetLeft - c0.offsetLeft
        : (c0?.getBoundingClientRect().width ?? el.clientWidth * 0.85) + 10;
    el.scrollBy({
      left: dir === "left" ? -step : step,
      behavior: "smooth",
    });
  }, []);

  /** Center the target card inside the carousel (scrollIntoView hits the wrong scrollport). */
  const scrollToIndex = useCallback((index: number) => {
    const root = scrollRef.current;
    const card = cardRefs.current[index];
    if (!root || !card) return;

    const rootRect = root.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const delta = cardRect.left - rootRect.left;
    const targetScroll =
      root.scrollLeft +
      delta -
      (root.clientWidth - card.offsetWidth) / 2;
    const maxLeft = Math.max(0, root.scrollWidth - root.clientWidth);
    const left = Math.min(Math.max(0, targetScroll), maxLeft);

    isProgrammaticScrollRef.current = true;
    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }
    setActiveIndex(index);
    root.scrollTo({ left, behavior: "smooth" });

    /**
     * Keep the clicked tab active while smooth scrolling animates to the target.
     * Without this, the scroll listener may briefly reselect the previous card.
     */
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
      programmaticScrollTimeoutRef.current = null;
    }, 450);
  }, []);

  /** Which card is nearest the horizontal center of the carousel (matches snap / user scroll). */
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    let frame = 0;
    const syncActiveFromScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const cards = cardRefs.current.filter(
          (el): el is HTMLElement => el != null,
        );
        if (cards.length === 0) return;
        if (isProgrammaticScrollRef.current) return;

        const rootRect = root.getBoundingClientRect();
        const centerX = rootRect.left + rootRect.width / 2;
        let bestIdx = 0;
        let bestDist = Infinity;

        cards.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const mid = r.left + r.width / 2;
          const d = Math.abs(mid - centerX);
          if (d < bestDist) {
            bestDist = d;
            bestIdx = i;
          }
        });

        setActiveIndex(bestIdx);
      });
    };

    syncActiveFromScroll();
    root.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    const ro = new ResizeObserver(syncActiveFromScroll);
    ro.observe(root);

    return () => {
      cancelAnimationFrame(frame);
      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
      root.removeEventListener("scroll", syncActiveFromScroll);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      id="challenges"
      aria-labelledby="challenges-title"
      className="aa-section bg-[var(--aa-surface-soft)]"
    >
      <div className="aa-container">
        <header className="mb-10 text-center sm:mb-12">
          <h2
            id="challenges-title"
            className={`${fontHeading} text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl`}
          >
            Built for{" "}
            <span
              className="rounded-sm px-2 py-0.5 text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              Real-World Business
            </span>{" "}
            Challenges
          </h2>
          <p
            className={`${fontBody} mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg`}
          >
            Our solutions combine data, AI, and automation to solve complex
            problems across industries.
          </p>
        </header>

        <div
          className={`mb-4 overflow-x-auto border-b border-slate-200 sm:mb-6 lg:mb-8 ${tabScrollHide}`}
        >
          <div
            className="flex min-w-max justify-start gap-6 px-1 sm:justify-center sm:gap-8"
            role="tablist"
            aria-label="Challenge categories"
          >
            {challenges.map((c, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => scrollToIndex(i)}
                  className={`${fontBody} relative shrink-0 whitespace-nowrap pb-3 text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[var(--aa-primary)]"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {c.badgeLabel}
                  {isActive ? (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                      style={{ backgroundColor: PRIMARY }}
                      aria-hidden
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative rounded-2xl border border-slate-100 bg-[#f1f5f9] p-1.5 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.35)] sm:p-2.5">
          <div
            ref={scrollRef}
            className="team-marquee-scroll flex snap-x snap-mandatory gap-2 overflow-x-auto overflow-y-hidden pb-1.5 pt-0.5 sm:gap-5"
            style={{ scrollPaddingInline: "0.5rem" }}
            aria-label="Challenge solutions — scroll horizontally"
          >
            {challenges.map((c, index) => (
              <ChallengeCard
                key={c.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`snap-center shrink-0 rounded-xl shadow-md shadow-slate-200/50 ${
                  c.featured ? "ring-2 ring-[#1A73E8] ring-offset-1" : ""
                } w-[min(520px,calc(100vw-2.25rem))] max-w-[min(520px,calc(100vw-2.25rem))] md:w-[min(560px,calc(100vw-2.5rem))] md:max-w-[min(560px,calc(100vw-2.5rem))]`}
                badgeLabel={c.badgeLabel}
                headline={c.headline}
                description={c.description}
                bullets={c.bullets}
                imageSrc={c.imageSrc}
                imageAlt={c.imageAlt}
                featured={c.featured}
              />
            ))}
          </div>

          <div className="mt-4 flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-slate-100 pt-4 sm:gap-6">
            <button
              type="button"
              onClick={() => scrollByViewport("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
              aria-label="Previous challenge"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <p className={`${fontBody} text-center text-sm text-slate-500`}>
              Scroll to explore all agents
            </p>
            <button
              type="button"
              onClick={() => scrollByViewport("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50"
              aria-label="Next challenge"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenges;
