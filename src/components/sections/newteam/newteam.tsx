"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";

import type { ShowcaseMember } from "./newteam-data";
import { SHOWCASE_TEAM } from "./newteam-data";

/** Same accent as `team.tsx` */
const PRIMARY = "#1A73E8";

/** Fixed card box (before scale) — must match motion wrapper + track math */
const CARD_PX = 288;
const CARD_HEIGHT_PX = 448;
const GAP_PX = 24;
const STRIDE = CARD_PX + GAP_PX;
const HALF_CARD = CARD_PX / 2;

const AUTO_ADVANCE_MS = 4800;

/** Center card is full size; every off-center card uses the same scale/opacity/offset. */
const SIDE_CARD_SCALE = 0.86;
const SIDE_CARD_OPACITY = 0.78;
const SIDE_CARD_Y = 6;

const fontHeading = "font-[family-name:var(--font-heading)]";

const SCROLL_EPS = 2;

/**
 * overflow-y-auto on the skills list otherwise captures wheel on the card even when
 * there is nothing to scroll; forward to the page in that case (and at scroll ends).
 */
function forwardSkillsListWheel(e: ReactWheelEvent<HTMLUListElement>) {
  const el = e.currentTarget;
  const { scrollTop, scrollHeight, clientHeight } = el;
  const d = e.deltaY;
  const canScrollY = scrollHeight > clientHeight + SCROLL_EPS;

  if (!canScrollY) {
    window.scrollBy({ top: d, left: 0, behavior: "auto" });
    e.preventDefault();
    return;
  }

  const atTop = scrollTop <= SCROLL_EPS;
  const atBottom = scrollTop + clientHeight >= scrollHeight - SCROLL_EPS;
  if ((d < 0 && atTop) || (d > 0 && atBottom)) {
    window.scrollBy({ top: d, left: 0, behavior: "auto" });
    e.preventDefault();
  }
}

function ShowcaseCard({
  member,
  distance,
  onActivate,
  loopKey,
}: {
  member: ShowcaseMember;
  distance: number;
  onActivate: () => void;
  loopKey: string;
}) {
  const isCenter = distance === 0;

  const onKeyDown = (e: ReactKeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onActivate();
    }
  };

  return (
    <motion.div
      layout={false}
      initial={false}
      role="button"
      tabIndex={0}
      aria-label={`${member.name}, ${member.role}. Select to focus this profile.`}
      onKeyDown={onKeyDown}
      className="relative shrink-0 cursor-pointer touch-pan-y select-none rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-[var(--aa-primary)] focus-visible:ring-offset-2"
      style={{
        width: CARD_PX,
        height: CARD_HEIGHT_PX,
        zIndex: isCenter ? 20 : 12,
      }}
      animate={{
        scale: isCenter ? 1 : SIDE_CARD_SCALE,
        opacity: isCenter ? 1 : SIDE_CARD_OPACITY,
        y: isCenter ? 0 : SIDE_CARD_Y,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 32,
        mass: 0.85,
      }}
      onClick={onActivate}
    >
      <article
        aria-labelledby={`showcase-${loopKey}-title`}
        className={`box-border flex h-full w-full flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white p-4 shadow-[var(--aa-shadow-sm)] ${
          isCenter ? "shadow-[var(--aa-shadow-md)]" : ""
        }`}
        aria-current={isCenter ? "true" : undefined}
      >
        <div className="relative mx-auto size-20 shrink-0 overflow-hidden rounded-full border-2 border-slate-100 bg-slate-100">
          <Image
            src={member.imageSrc}
            alt={`${member.name}, ${member.role}`}
            fill
            className="object-cover object-top"
            sizes="80px"
            loading={isCenter ? "eager" : "lazy"}
            decoding="async"
          />
        </div>

        <h3
          id={`showcase-${loopKey}-title`}
          className={`${fontHeading} mt-3 line-clamp-2 h-12 w-full shrink-0 text-center text-lg font-bold leading-snug text-slate-900`}
        >
          {member.name}
        </h3>

        <div className="mt-2 flex h-[56px] shrink-0 items-center justify-center px-1">
          <span className="line-clamp-2 max-h-full max-w-full rounded-full bg-[var(--aa-primary)] px-3.5 py-1.5 text-center text-sm font-bold leading-snug tracking-wide text-white">
            {member.role}
          </span>
        </div>

        <p className="mt-2 line-clamp-4 h-16 w-full shrink-0 overflow-hidden text-center text-[11px] leading-4 text-slate-600">
          {member.bio}
        </p>

        <div className="mt-3 flex min-h-0 flex-1 flex-col border-t border-slate-100 pt-2">
          <p className="mb-1.5 shrink-0 text-center text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400">
            Key skills
          </p>
          <ul
            className="flex min-h-0 flex-1 list-none flex-wrap justify-center gap-1.5 overflow-y-auto overflow-x-hidden pb-1 [padding-inline-start:0] [scrollbar-width:thin]"
            onWheel={forwardSkillsListWheel}
          >
            {member.skills.map((skill) => (
              <li key={`${loopKey}-${skill}`} className="m-0 list-none p-0">
                <span className="inline-block rounded-full border border-slate-200 bg-slate-50/80 px-2 py-0.5 text-[10px] text-slate-600">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </motion.div>
  );
}

function normalizeSlideIndex(trackIndex: number, n: number): number {
  return ((trackIndex % n) + n) % n;
}

const NewTeam = () => {
  const reduceMotion = useReducedMotion();
  const n = SHOWCASE_TEAM.length;
  const looped = useMemo(
    () => [...SHOWCASE_TEAM, ...SHOWCASE_TEAM, ...SHOWCASE_TEAM],
    [],
  );

  const [trackIndex, setTrackIndex] = useState(n);
  /** Auto-advance runs only while pointer is inside the section (not the default on load). */
  const [sectionPointerInside, setSectionPointerInside] = useState(false);
  const [instantJump, setInstantJump] = useState(false);
  const trackIndexRef = useRef(n);

  useLayoutEffect(() => {
    trackIndexRef.current = trackIndex;
  }, [trackIndex]);

  const advance = useCallback(() => {
    setTrackIndex((i) => i + 1);
  }, []);

  useEffect(() => {
    if (reduceMotion || !sectionPointerInside) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      advance();
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [advance, reduceMotion, sectionPointerInside]);

  const springTransition = {
    type: "spring" as const,
    stiffness: 220,
    damping: 34,
    mass: 0.9,
  };

  const trackTransition = instantJump
    ? { duration: 0 }
    : reduceMotion === true
      ? { duration: 0.2, ease: "easeOut" as const }
      : springTransition;

  useLayoutEffect(() => {
    if (!instantJump) return;
    const id = requestAnimationFrame(() => setInstantJump(false));
    return () => cancelAnimationFrame(id);
  }, [instantJump]);

  /**
   * Keep the logical index in the middle copy [n, 2n-1] when we slide into the
   * first or third duplicate, using an instant jump (same on-screen person).
   */
  const handleTrackAnimationComplete = () => {
    const t = trackIndexRef.current;
    if (t >= 2 * n) {
      setInstantJump(true);
      setTrackIndex(t - n);
    } else if (t < n) {
      setInstantJump(true);
      setTrackIndex(t + n);
    }
  };

  const displayIndex = normalizeSlideIndex(trackIndex, n);

  return (
    <section
      className="aa-section overflow-x-hidden bg-white"
      aria-labelledby="newteam-heading"
      aria-roledescription="carousel"
      onPointerEnter={() => setSectionPointerInside(true)}
      onPointerLeave={() => setSectionPointerInside(false)}
      onFocusCapture={() => setSectionPointerInside(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
          setSectionPointerInside(false);
        }
      }}
    >
      <div className="aa-container mb-6 sm:mb-10 lg:mb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <h2
              id="newteam-heading"
              className="mb-2 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl"
            >
              Meet the{" "}
              <span
                className="rounded-sm px-2 py-0.5 text-white"
                style={{ backgroundColor: PRIMARY }}
              >
                Experts
              </span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              A team building real-world AI and data solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="aa-container">
        <div className="relative min-h-[min(28rem,calc(100vw-2rem))] py-6 sm:min-h-[30rem] sm:py-10">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-30 w-12 bg-gradient-to-r from-white to-transparent sm:w-20"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-30 w-12 bg-gradient-to-l from-white to-transparent sm:w-20"
            aria-hidden
          />

          <motion.div
            className="flex gap-6"
            style={{
              paddingLeft: `calc(50% - ${HALF_CARD}px)`,
              paddingRight: `calc(50% - ${HALF_CARD}px)`,
            }}
            initial={{ x: -n * STRIDE }}
            animate={{ x: -trackIndex * STRIDE }}
            transition={trackTransition}
            onAnimationComplete={handleTrackAnimationComplete}
          >
            {looped.map((member, i) => (
              <ShowcaseCard
                key={`${member.id}-loop-${i}`}
                loopKey={`${member.id}-loop-${i}`}
                member={member}
                distance={i - trackIndex}
                onActivate={() => setTrackIndex(i)}
              />
            ))}
          </motion.div>
        </div>

        <p className="mt-4 text-center text-xs text-slate-500 sm:mt-6" aria-live="polite">
          Showing {displayIndex + 1} of {n} — order is fixed. Auto-advance runs only
          while your pointer is inside this section (or it has focus). Click a card
          to jump.
        </p>
      </div>
    </section>
  );
};

export default NewTeam;
