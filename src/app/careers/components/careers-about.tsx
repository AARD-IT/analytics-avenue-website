"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CAREERS_TEAM } from "../data";

/** Same intro embed as `about.tsx` */
const ABOUT_VIDEO_EMBED =
  "https://www.youtube.com/embed/TouJOS07xNU?autoplay=1&start=2&rel=0";

const ABOUT_IMAGE_WIDTH = 1073;
const ABOUT_IMAGE_HEIGHT = 1284;

const COMMUNITY_AVATARS = CAREERS_TEAM.slice(0, 3);

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

export default function CareersAbout() {
  const { ref, visible, reduceMotion } = useSectionReveal();
  const [videoOpen, setVideoOpen] = useState(false);

  const reveal = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(0.75rem)",
    transition: reduceMotion ? "none" : `opacity 0.55s ease, transform 0.55s ease ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className="aa-section bg-[var(--aa-surface-soft)] pb-12 pt-10 sm:pb-20 sm:pt-14"
      aria-labelledby="careers-about-title"
    >
      <div className="aa-container px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8 xl:gap-10">
          {/* Left: same visual pattern as home About (cover + play → embed) */}
          <div className="relative min-w-0 w-full shrink-0 lg:max-w-xl lg:flex-1">
            <div
              className={`relative w-full overflow-hidden rounded-[1.75rem] border border-slate-100 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.28)] ${
                videoOpen ? "aspect-video" : ""
              }`}
            >
              {!videoOpen ? (
                <>
                  <Image
                    src="/assets/images/about/image.png"
                    alt="Video cover: LinkedIn profile of Subramani — Data Scientist, AI guest speaker, and Analytics Avenue"
                    width={ABOUT_IMAGE_WIDTH}
                    height={ABOUT_IMAGE_HEIGHT}
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="h-auto w-full rounded-[1.75rem]"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-gradient-to-t from-slate-950/30 via-slate-950/5 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="relative flex h-16 w-16 items-center justify-center sm:h-[72px] sm:w-[72px]">
                      {!reduceMotion && (
                        <span
                          className="absolute inset-0 z-0 animate-ping rounded-full bg-[var(--aa-primary)] opacity-35"
                          aria-hidden
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => setVideoOpen(true)}
                        className="group relative z-10 flex h-full w-full items-center justify-center rounded-full bg-[var(--aa-primary)] text-white shadow-lg shadow-blue-500/40 ring-4 ring-white/95 transition-all duration-300 hover:scale-[1.06] hover:bg-[var(--aa-primary-hover)] hover:shadow-xl hover:shadow-blue-500/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--aa-primary)] motion-reduce:transition-colors motion-reduce:hover:scale-100"
                        aria-label="Play introduction video"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="ml-1 h-8 w-8 transition-transform duration-300 group-hover:translate-x-0.5 sm:h-9 sm:w-9 motion-reduce:group-hover:translate-x-0"
                          aria-hidden
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Floating community card */}
                  <div className="pointer-events-none absolute bottom-4 left-4 right-4 sm:pointer-events-auto sm:right-auto sm:max-w-[280px]">
                    <div
                      className="rounded-2xl border border-white/80 bg-white/95 p-3.5 shadow-lg shadow-slate-900/10 backdrop-blur-sm sm:p-4"
                      style={reveal(120)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2.5">
                          {COMMUNITY_AVATARS.map((member, i) => (
                            <div
                              key={member.name}
                              className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white ring-1 ring-slate-200/80"
                              style={{ zIndex: 3 - i }}
                            >
                              <Image
                                src={member.image}
                                alt=""
                                width={36}
                                height={36}
                                className="h-full w-full object-cover object-top"
                              />
                            </div>
                          ))}
                        </div>
                        <span className="flex h-9 min-w-[2.75rem] items-center justify-center rounded-full bg-[var(--aa-primary)] px-2 text-xs font-bold text-white">
                          1000+
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm font-semibold leading-snug text-slate-900">
                        Join our active data &amp; AI learning community
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <iframe
                    title="Analytics Avenue introduction video"
                    src={ABOUT_VIDEO_EMBED}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={() => setVideoOpen(false)}
                    className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-3 sm:top-3"
                    aria-label="Close video and show cover image"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right: headline, copy, CTA, feature cards */}
          <div
            className="flex min-w-0 flex-1 flex-col justify-center rounded-[1.75rem] bg-white p-6 sm:p-8 lg:p-10"
            style={reveal(80)}
          >
            <h2
              id="careers-about-title"
              className="mb-2 text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl"
            >
              Where Data Meets{" "}
              <br />
              <span className="rounded-sm bg-[var(--aa-primary)] px-2 py-0.5 text-white">Real-World Impact</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-base font-semibold leading-relaxed text-[#080808] sm:text-lg">
              Analytics Avenue is where data meets intelligence—a team of scientists, engineers, and AI innovators
              shaping talent and enterprise BI, GenAI, and analytics platforms that deliver measurable outcomes.
            </p>

          

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100/80 bg-[var(--aa-surface-soft)] p-5 shadow-[var(--aa-shadow-sm)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--aa-primary)]/12">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--aa-primary)]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-heading)] text-base font-bold text-slate-900">
                  Confidentiality
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                  Your profile, resume, and application details are handled with discretion—secure processes built for
                  trust at every step.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100/80 bg-[var(--aa-surface-soft)] p-5 shadow-[var(--aa-shadow-sm)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--aa-primary)]/12">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--aa-primary)]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="mt-3 font-[family-name:var(--font-heading)] text-base font-bold text-slate-900">
                  Accessibility
                </h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">
                  Hiring paths for interns, experienced hires, and returners—clear steps and support so more people can
                  grow with us.
                </p>
              </div>
            </div>

            <p className="mt-8 text-center font-[family-name:var(--font-heading)] text-sm font-semibold text-slate-600 sm:text-base">
              *Smarter Teams *Stronger Systems *Scalable AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
