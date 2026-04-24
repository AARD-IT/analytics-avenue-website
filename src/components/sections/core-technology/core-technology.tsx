import { PRIMARY } from "@/components/card/challenge-card/chalenge-card";

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

/** Desktop: one-line width for longest title (Sora ~text-xl). */
const HEADING_WIDTH =
  "sm:w-[38ch] sm:min-w-[38ch] sm:max-w-[38ch] sm:shrink-0";
type Capability = {
  title: string;
  description: string;
};

const capabilities: Capability[] = [
  {
    title: "Data Strategy",
    description:
      "Define a clear data roadmap to drive measurable business outcomes and long-term growth.",
  },
  {
    title: "Business Intelligence",
    description:
      "Turn raw data into actionable insights with powerful dashboards and real-time reporting.",
  },
  {
    title: "Data Engineering",
    description:
      "Build scalable pipelines and architectures to power analytics and AI systems.",
  },
  {
    title: "Machine Learning",
    description:
      "Develop predictive models that improve accuracy, efficiency, and decision-making.",
  },
  {
    title: "Generative AI",
    description:
      "Create intelligent systems for automation, content generation, and advanced workflows.",
  },
  {
    title: "Natural Language Processing (NLP)",
    description:
      "Enable machines to understand, interpret, and respond to human language at scale.",
  },
  {
    title: "AI Software Development",
    description:
      "Design and deploy production-ready AI applications with scalable infrastructure.",
  },
  {
    title: "Web Development",
    description:
      "Build fast, secure, and scalable digital platforms powered by modern technologies.",
  },
];

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M7 17L17 7M17 7H9M17 7V15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CoreTechnology = () => {
  return (
    <section
      className="bg-[var(--aa-surface-soft)] pb-8 sm:pb-15"
      aria-labelledby="core-technology-heading"
    >
      <div className="aa-container">
        <header className="mb-10 text-center sm:mb-14">
        <h2
            id="core-technology-heading"
            className={`${fontHeading} text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl`}
          >
            Our{" "}
            <span
              className="rounded-sm px-2 py-0.5 text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              Core Technology
            </span>{" "}
            Capabilities
          </h2>
          <p
            className={`${fontBody} mx-auto mt-4 max-w-3xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg`}
          >
            End-to-end expertise across data, AI, and digital technologies built
            to deliver scalable, intelligent, and production-ready solutions.
          </p>
        </header>

        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_18px_55px_-35px_rgba(15,23,42,0.25)]">
          <ul className="divide-y divide-slate-200">
            {capabilities.map((item, index) => {
              const n = String(index + 1).padStart(2, "0");
              return (
                <li key={item.title}>
                  <div
                    className={`group px-4 py-5 transition-colors duration-300 ease-out hover:bg-[#1A73E8]/[0.04] sm:px-6 sm:py-6 md:px-8 ${fontBody}`}
                  >
                    {/*
                      Mobile: number + title + action on row 1; description full width on row 2.
                      sm+: number | title (fixed width) | description | button — desc expands on hover.
                    */}
                    <div className="grid w-full min-w-0 grid-cols-[auto_1fr_auto] gap-x-3 gap-y-3 sm:grid-cols-[auto_minmax(0,38ch)_minmax(0,16rem)_auto] sm:items-center sm:gap-x-4">
                      <span
                        className={`${fontHeading} col-start-1 row-start-1 w-10 shrink-0 pt-0.5 text-sm font-bold tabular-nums text-slate-400 transition-colors duration-300 ease-out group-hover:text-[#1A73E8] group-focus-within:text-[#1A73E8] sm:w-11 sm:pt-0 sm:text-2xl`}
                      >
                        {n}
                      </span>

                      <h3
                        className={`${fontHeading} col-start-2 row-start-1 min-w-0 self-start text-base font-bold leading-snug text-slate-900 transition-colors duration-300 ease-out group-hover:text-[#1A73E8] group-focus-within:text-[#1A73E8] sm:self-center sm:text-xl ${HEADING_WIDTH}`}
                        title={item.title}
                      >
                        <span className="block sm:truncate">{item.title}</span>
                      </h3>

                      <button
                        type="button"
                        className="col-start-3 row-start-1 shrink-0 justify-self-end self-start rounded-full bg-slate-900 p-0 text-white transition-colors duration-300 ease-out hover:bg-[#1A73E8] group-hover:bg-[#1A73E8] group-focus-within:bg-[#1A73E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A73E8] focus-visible:ring-offset-2 sm:col-start-4 sm:justify-self-center sm:self-center"
                        aria-label={`${item.title} — details on hover or focus`}
                      >
                        <span className="flex h-10 w-10 items-center justify-center">
                          <ArrowUpRightIcon className="h-4 w-4" />
                        </span>
                      </button>

                      <div className="col-span-3 row-start-2 min-w-0 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:max-w-[16rem] sm:shrink-0 sm:overflow-hidden">
                        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out sm:grid-rows-[0fr] sm:group-hover:grid-rows-[1fr] sm:group-focus-within:grid-rows-[1fr]">
                          <div className="overflow-hidden">
                            <p
                              className={`${fontBody} text-sm leading-snug text-slate-500 transition-colors duration-300 ease-out group-hover:text-[#1A73E8] group-focus-within:text-[#1A73E8] sm:text-[1rem] sm:leading-snug max-sm:line-clamp-4 sm:line-clamp-none`}
                              title={item.description}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CoreTechnology;
