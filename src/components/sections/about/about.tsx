"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const primary = "var(--aa-primary)";

// https://www.youtube.com/watch?v=TouJOS07xNU&t=2s
const ABOUT_VIDEO_EMBED =
  "https://www.youtube.com/embed/TouJOS07xNU?autoplay=1&start=2&rel=0";

/** Intrinsic size of `public/assets/images/about/image.png` — keeps layout box matched to image aspect */
const ABOUT_IMAGE_WIDTH = 1073;
const ABOUT_IMAGE_HEIGHT = 1284;

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
      { threshold: 0.14, rootMargin: "0px 0px -5% 0px" },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible: reduceMotion || visible, reduceMotion };
}

const About = () => {
  const { ref, visible, reduceMotion } = useSectionReveal();
  const [aboutVideoOpen, setAboutVideoOpen] = useState(false);

  const reveal = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(1rem)",
    transition: reduceMotion
      ? "none"
      : `opacity 0.6s ease, transform 0.6s ease ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      id="about"
      aria-labelledby="about-title"
      className="aa-section bg-white pb-20 pt-12 sm:pb-28 sm:pt-16"
    >
      <div className="aa-container">
        <h2
          id="about-title"
          className="mb-8 text-center text-3xl font-extrabold leading-tight text-slate-900 sm:mb-10 sm:text-4xl"
          style={reveal(0)}
        >
          Transforming Data Into{" "}
          <span
            className="rounded-sm px-2 py-0.5 text-white"
            style={{ backgroundColor: primary }}
          >
            Real Business Impact
          </span>
        </h2>

        <div
          className="flex flex-col gap-6 rounded-3xl border border-slate-100 bg-[#f7fbff] p-4 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.35)] sm:gap-7 sm:p-6 lg:p-8"
          style={reveal(90)}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-stretch lg:gap-6">
          <div className="relative min-w-0 lg:w-5/12">
            <div
              className={`relative w-full overflow-hidden rounded-[1.4rem] ${
                aboutVideoOpen ? "aspect-video" : ""
              }`}
            >
              {!aboutVideoOpen ? (
                <>
                  <Image
                    src="/assets/images/about/image.png"
                    alt="Video cover: LinkedIn profile of Subramani — Data Scientist, AI guest speaker, and Analytics Avenue"
                    width={ABOUT_IMAGE_WIDTH}
                    height={ABOUT_IMAGE_HEIGHT}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="h-auto w-full rounded-[1.4rem]"
                    priority={false}
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] bg-gradient-to-t from-slate-950/25 via-slate-950/5 to-transparent" />
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
                        onClick={() => setAboutVideoOpen(true)}
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
                    onClick={() => setAboutVideoOpen(false)}
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
          <div className="min-w-0 rounded-[1.4rem] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:p-7 lg:w-7/12">
            <div
              className="mb-3 flex items-center gap-3"
              style={reveal(140)}
            >
              <h3
                className="shrink-0 text-xl font-extrabold sm:text-xl"
                style={{ color: primary }}
              >
                About Analytics Avenue
              </h3>
              <span className="h-px w-full bg-blue-200" aria-hidden />
            </div>

            <div
              className="space-y-4 text-lg leading-relaxed text-[#080808] sm:text-[1.1rem] sm:leading-[1.3]"
              style={reveal(180)}
            >
              <p>
                At <strong className="font-bold">Analytics Avenue</strong>, our
                team of{" "}
                <strong className="font-bold">
                  data scientists and AI engineers
                </strong>{" "}
                is driven by a single vision:{" "}
                <strong className="font-bold">
                  to take data analytics from every home to every industry
                </strong>
                . We are transforming our EdTech offerings into{" "}
                <strong className="font-bold">
                  scalable, product-driven platforms
                </strong>{" "}
                that empower every family to upskill, stay relevant, and thrive
                in today&apos;s rapidly evolving, AI-led economy.
              </p>
              <p>
                In parallel, our{" "}
                <strong className="font-bold">
                  consulting, predictive analytics, and intelligent automation
                  solutions
                </strong>{" "}
                are becoming mission-critical across sectors positioning
                analytics and AI as the{" "}
                <strong className="font-bold">
                  true backbone of modern business decision-making.
                </strong>
              </p>
              <p>
                Backed by hands-on experience working with{" "}
                <strong className="font-bold">
                  leading international brands across retail, manufacturing,
                  healthcare, supply chain, finance, and beyond
                </strong>
                , our data science team brings proven industry intelligence into
                everything we build. This real-world expertise enables us to
                partner with organizations as their{" "}
                <strong className="font-bold">
                  official skill development and AI transformation partners
                </strong>
                , solving complex business challenges while creating future-ready
                talent ecosystems.
              </p>
            </div>

            <div className="mt-6" style={reveal(230)}>
              <a
                href="https://www.linkedin.com/in/subramani-arumugam-14100b169/"
                target="_blank"
                rel="noopener noreferrer"
                className="aa-btn-primary"
              >
                Visit Linkedin
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  aria-hidden
                >
                  <path
                    d="M8.5 3.5L12 7.5L8.5 11.5M3 7.5H12"
                    stroke="white"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            
            
          </div>

          </div>
          <div
            id="approach"
            className="w-full min-w-0 rounded-[1.4rem] bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:p-7"
            style={reveal(280)}
          >
            <div className="mb-3 flex items-center gap-3">
              <h3
                className="shrink-0 text-xl font-extrabold sm:text-xl"
                style={{ color: primary }}
              >
                Leadership Excellence
              </h3>
              <span className="h-px w-full bg-blue-200" aria-hidden />
            </div>
            <ul className="space-y-2.5 text-lg font-medium leading-relaxed text-[#080808] sm:text-[1.1rem] sm:leading-[1.3]">
              <li className="flex items-start gap-2.5">
                <span
                  className="mt-[0.35em] shrink-0 font-bold leading-none text-[var(--aa-primary)]"
                  aria-hidden
                >
                  ✓
                </span>
                <span>
                  <strong className="font-bold">
                    Collaborated with 15+ Global Brands
                  </strong>
                  , delivering high-impact data strategies and intelligent AI-driven
                  solutions
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  className="mt-[0.35em] shrink-0 font-bold leading-none text-[var(--aa-primary)]"
                  aria-hidden
                >
                  ✓
                </span>
                <span>
                  <strong className="font-bold">Recognized AI Thought Leader</strong>,
                  driving innovation in AI education and accelerating industry adoption
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  className="mt-[0.35em] shrink-0 font-bold leading-none text-[var(--aa-primary)]"
                  aria-hidden
                >
                  ✓
                </span>
                <span>
                  <strong className="font-bold">Empowered 1,000+ Professionals</strong>,
                  transforming careers through focused data analytics initiatives
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span
                  className="mt-[0.35em] shrink-0 font-bold leading-none text-[var(--aa-primary)]"
                  aria-hidden
                >
                  ✓
                </span>
                <span>
                  <strong className="font-bold">Founder of #UpSkillIndia Movement</strong>,
                  empowering talent across the nation to build future-ready data and AI
                  careers
                </span>
              </li>
            </ul>
          </div>
          

          
        </div>
      </div>
    </section>
  );
};

export default About;
