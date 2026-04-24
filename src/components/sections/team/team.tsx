"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageSrc: string;
};

const TEAM: TeamMember[] = [
  {
    id: "subramani",
    name: "Subramani",
    role: "Chief Data Scientist",
    bio: "Driving data, AI, and automation solutions across global enterprises.",
    imageSrc: "/assets/images/Subramani.jpg",
  },
  {
    id: "aswath",
    name: "Aswath",
    role: "Talent Acquisition Head",
    bio: "Connecting talent with real-world opportunities across industries.",
    imageSrc: "/assets/images/team/aswath_professional.png",
  },
  {
    id: "nishanth",
    name: "Nishanth",
    role: "Senior Data Engineer",
    bio: "Building scalable data pipelines and cloud architectures.",
    imageSrc: "/assets/images/team/Nishanth%20Professional%20pic.png",
  },
  {
    id: "prasanna",
    name: "Prasanna",
    role: "Senior BI Developer",
    bio: "Transforming data into actionable insights and dashboards.",
    imageSrc: "/assets/images/team/Prasana.jpg",
  },
  {
    id: "bala",
    name: "Bala",
    role: "Senior Data Scientist",
    bio: "Developing predictive models for business and healthcare insights.",
    imageSrc: "/assets/images/team/Bala.png",
  },
  {
    id: "kishore",
    name: "Kishore",
    role: "Senior AI Engineer",
    bio: "Creating AI-driven automation for enterprise operations.",
    imageSrc: "/assets/images/team/Kishore.jpg",
  },
  {
    id: "mahesh",
    name: "Mahesh",
    role: "Senior AI Engineer",
    bio: "Building scalable AI systems for real-world applications.",
    imageSrc: "/assets/images/team/mahesh_professional.png",
  },
  {
    id: "deepak",
    name: "Deepak Raj",
    role: "Agentic AI Engineer",
    bio: "Designing intelligent automation systems to improve efficiency.",
    imageSrc: "/assets/images/team/Deepak.png",
  },
  {
    id: "rizwan",
    name: "Rizwan Ahmed",
    role: "Bio Research Analytics Engineer",
    bio: "Bridging AI and biotechnology through data-driven innovation.",
    imageSrc: "/assets/images/team/Rizwan.png",
  },
];

/** Auto-scroll speed (px/s). */
const AUTO_SCROLL_PX_PER_SEC = 72;
const PRIMARY = "#1A73E8";

type ColumnSizes = {
  width: number;
  height: number;
  gap: number;
};

/**
 * Responsive card column: narrower/shorter on small viewports so the strip fits
 * without dominating the screen (width + height scale with breakpoint).
 */
function useColumnSizes(): ColumnSizes {
  const [sizes, setSizes] = useState<ColumnSizes>({
    width: 232,
    height: 332,
    gap: 14,
  });

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setSizes({ width: 216, height: 326, gap: 13 });
      } else if (vw < 640) {
        setSizes({ width: 232, height: 332, gap: 14 });
      } else if (vw < 1024) {
        setSizes({ width: 252, height: 385, gap: 17 });
      } else {
        setSizes({ width: 280, height: 428, gap: 22 });
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return sizes;
}

function formatRoleTag(role: string): string {
  return role.toUpperCase();
}

function InfoCard({ member }: { member: TeamMember }) {
  return (
    <article
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-slate-100 bg-[var(--aa-surface)] p-3 shadow-sm sm:rounded-2xl sm:p-4"
      aria-label={`${member.name}, ${member.role}`}
    >
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-1.5 sm:gap-2">
        <p className="font-[family-name:var(--font-heading)] text-[11px] !font-extrabold uppercase text-slate-900 sm:text-sm sm:tracking-[0.06em]">
          [ {formatRoleTag(member.role)} ]
        </p>
        <h3
          className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase leading-snug tracking-tight sm:text-base sm:text-[1.05rem]"
          style={{ color: PRIMARY }}
        >
          {member.name}
        </h3>
        <p className="line-clamp-none text-xs font-semibold leading-relaxed text-slate-600 sm:text-sm">
          {member.bio}
        </p>
      </div>
    </article>
  );
}

function PhotoCard({
  member,
  columnWidth,
}: {
  member: TeamMember;
  columnWidth: number;
}) {
  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden rounded-xl border border-slate-100 bg-[var(--aa-surface)] sm:rounded-2xl">
      <Image
        src={member.imageSrc}
        alt={`${member.name}, ${member.role}`}
        fill
        className="object-cover object-top"
        sizes={`(max-width: 480px) 216px, (max-width: 1024px) 252px, ${columnWidth}px`}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </div>
  );
}

function MemberColumn({
  member,
  index,
  sizes,
}: {
  member: TeamMember;
  index: number;
  sizes: ColumnSizes;
}) {
  const imageFirst = index % 2 === 0;
  const isMobileColumn = sizes.width <= 232;
  const imageFirstRows = isMobileColumn ? "60fr 40fr" : "65fr 35fr";
  const infoFirstRows = isMobileColumn ? "40fr 60fr" : "35fr 65fr";

  return (
    <div
      className="grid shrink-0"
      style={
        {
          width: sizes.width,
          height: sizes.height,
          gridTemplateRows: imageFirst ? imageFirstRows : infoFirstRows,
          gap: sizes.gap,
        } as CSSProperties
      }
    >
      {imageFirst ? (
        <>
          <PhotoCard member={member} columnWidth={sizes.width} />
          <InfoCard member={member} />
        </>
      ) : (
        <>
          <InfoCard member={member} />
          <PhotoCard member={member} columnWidth={sizes.width} />
        </>
      )}
    </div>
  );
}

function TeamMarquee() {
  const sizes = useColumnSizes();
  const loop = [...TEAM, ...TEAM];
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const loopWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);
  const hoverPauseRef = useRef(false);
  const draggingRef = useRef(false);
  const wheelPauseRef = useRef(false);
  const touchPauseRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const wheelClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchClearRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const oneSetWidth =
    TEAM.length * sizes.width + (TEAM.length - 1) * sizes.gap;

  useLayoutEffect(() => {
    const inner = scrollRef.current?.firstElementChild as HTMLElement | null;
    if (inner?.scrollWidth) {
      loopWidthRef.current = inner.scrollWidth / 2;
    } else {
      loopWidthRef.current = oneSetWidth;
    }
  }, [oneSetWidth]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotionRef.current = mq.matches;
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = () => {
      wheelPauseRef.current = true;
      if (wheelClearRef.current) clearTimeout(wheelClearRef.current);
      wheelClearRef.current = setTimeout(() => {
        wheelPauseRef.current = false;
      }, 2000);
    };

    const onTouchStart = () => {
      touchPauseRef.current = true;
      if (touchClearRef.current) clearTimeout(touchClearRef.current);
    };

    const onTouchEnd = () => {
      if (touchClearRef.current) clearTimeout(touchClearRef.current);
      touchClearRef.current = setTimeout(() => {
        touchPauseRef.current = false;
      }, 2000);
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      if (wheelClearRef.current) clearTimeout(wheelClearRef.current);
      if (touchClearRef.current) clearTimeout(touchClearRef.current);
    };
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const tick = (now: number) => {
      const last = lastTimeRef.current || now;
      const dt = Math.min((now - last) / 1000, 0.064);
      lastTimeRef.current = now;

      const shouldAuto =
        !reduceMotionRef.current &&
        !hoverPauseRef.current &&
        !draggingRef.current &&
        !wheelPauseRef.current &&
        !touchPauseRef.current;

      if (shouldAuto) {
        el.scrollLeft += AUTO_SCROLL_PX_PER_SEC * dt;
        const lw = loopWidthRef.current || oneSetWidth;
        while (lw > 0 && el.scrollLeft >= lw) {
          el.scrollLeft -= lw;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [oneSetWidth]);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    setIsGrabbing(true);
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartXRef.current;
    el.scrollLeft = dragStartScrollRef.current - dx;
  }, []);

  const endDrag = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = scrollRef.current;
    if (el?.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
    draggingRef.current = false;
    setIsGrabbing(false);

    // While pointer capture is active, mouse/pointer leave on the outer wrapper
    // may not fire; sync hover pause from the pointer position after release.
    const container = marqueeContainerRef.current;
    if (container) {
      const r = container.getBoundingClientRect();
      const { clientX: x, clientY: y } = e;
      hoverPauseRef.current =
        x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
    }
  }, []);

  return (
    <div
      ref={marqueeContainerRef}
      className="team-marquee group relative w-full max-w-[100vw] overflow-hidden"
      aria-label="Team members"
      onPointerEnter={() => {
        hoverPauseRef.current = true;
      }}
      onPointerLeave={() => {
        hoverPauseRef.current = false;
      }}
    >
      <div
        ref={scrollRef}
        className={`team-marquee-scroll overflow-x-auto overflow-y-hidden ${
          isGrabbing ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
        style={{ touchAction: "pan-x" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(e) => {
          if (draggingRef.current && e.pointerType === "mouse") {
            endDrag(e);
          }
        }}
      >
        <div
          className="flex w-max items-stretch"
          style={{ gap: sizes.gap }}
        >
          {loop.map((member, index) => (
            <MemberColumn
              key={`${member.id}-${index}`}
              member={member}
              index={index % TEAM.length}
              sizes={sizes}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--aa-surface-soft)] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--aa-surface-soft)] to-transparent sm:w-24" />
    </div>
  );
}

const Team = () => {
  return (
    <section className="aa-section overflow-x-hidden bg-[var(--aa-surface-soft)]" aria-labelledby="team-heading">
      <div className="aa-container mb-6 sm:mb-10 lg:mb-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex w-full flex-col items-center justify-center gap-2">
            <h2
              id="team-heading"
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

      <div className="aa-container w-full">
        <TeamMarquee />
      </div>
    </section>
  );
};

export default Team;
