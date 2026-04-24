import type { CSSProperties } from "react";

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

type TestimonialItem = {
  name: string;
  role: string;
  review: string;
};

const testimonials: TestimonialItem[] = [
  {
    name: "Vigneshwar",
    role: "Functional Business Analyst",
    review:
      "It has been a very knowledgeable program for my career transition, helping me gain a clear understanding of key concepts and build the right skills. The learning experience has been valuable and has prepared me to confidently step into the role of a data analyst.",
  },
  {
    name: "Madhumita K",
    role: "M.Sc. Statistics Fresher",
    review:
      "I have gained knowledge in SQL and Power BI, strengthening my data analytics skills. My communication skills help me understand concepts better, and the supportive mentors have been very helpful in clearing my doubts.",
  },
  {
    name: "Mohanraj D",
    role: "Process Associate",
    review:
      "The lessons were well-structured and easy to understand, with each concept explained clearly and effectively. The mentors are doing a great job guiding and supporting us throughout the learning process, making the overall experience valuable and engaging.",
  },
  {
    name: "Kumaravel D",
    role: "AE Analyst",
    review:
      "Great initiative in this data domain. Very creative and interactive course. Unique environment with lots of scope to learn more. Great thought Subu! Hope you will grow more and more people like us.",
  },
  {
    name: "Princy S",
    role: "Fresher",
    review:
      "The teaching is excellent, starting from scratch and building each concept step by step in a clear and structured manner. This approach makes even complex topics easy to learn and understand, creating a smooth and effective learning experience.",
  },
  {
    name: "K Satheshkumar",
    role: "Senior Data Analyst",
    review:
      "The quality of the materials is excellent and provided on the spot, making it easy to follow along during sessions. All the trainers have strong knowledge of the topics they cover, which enhances the overall learning experience.",
  },
  {
    name: "Gayathri M",
    role: "Process Associate",
    review:
      "I appreciate the structured teaching and strong placement focus. The course gave me clarity and motivation to start building dashboards. As a non-IT graduate with data entry experience, a little more clarification and encouragement would be helpful.",
  },
  {
    name: "Abdul Afzal",
    role: "Student",
    review:
      "The teaching was really good, with a strong focus on real-time problems that companies face in projects. This practical approach made the learning more relevant and helped in understanding how concepts are applied in real-world scenarios.",
  },
  {
    name: "R Gayathri",
    role: "Process Excellence & Analytics Lead",
    review:
      "The Statistics and SQL sessions were very good and highly useful for understanding key concepts. The important links form, which includes multiple recordings, is especially helpful as a reference for revisiting and reinforcing the topics anytime.",
  },
  {
    name: "Prithiviraj",
    role: "Software Tester",
    review:
      "The program offered a well-structured curriculum that covered essential topics with practical applications, understanding the subject. The instructors and mentors were knowledgeable and supportive, offering valuable insights and give the feedback.",
  },
  {
    name: "Priyadharshan",
    role: "Intern",
    review:
      "I had the opportunity to work closely with Analytics Avenue as an intern, where I gained end-to-end exposure to building business proposals and understanding analytics-driven business expectations. This experience also significantly enhanced my communication and presentation skills. Grateful for the opportunity and learning.",
  },
  {
    name: "Vibinraj",
    role: "Business Analyst",
    review:
      "Coming from a rural background, I joined a nationwide data analytics training and placement program with determination. Through hard work, secured an interview with a reputed brand and spent 24 months gaining experience in data analytics, automation, CRM, and real business needs. I am truly grateful for the opportunity.",
  },
  {
    name: "Mahesh",
    role: "AI Engineer",
    review:
      "Through the Data Analytics Placement Program, I learned from experienced data scientists and gained practical knowledge. After losing my job, this program became a turning point, helping me gain hands-on experience in AI and transition into an AI Engineer role.",
  },
  {
    name: "Abinaya P",
    role: "MBA Graduate Fresher",
    review:
      "The sessions are interactive and informative, making the learning process engaging and effective. I was able to learn and implement the concepts in practice, which helped me gain valuable hands-on experience and better understand real-world applications.",
  },
  {
    name: "Monisha",
    role: "Data analyst",
    review:
      "Today, learning data analytics is easy, but getting a job needs clear project understanding. This program helped me build strong basics and learn from experienced mentors. The internship gave me confidence to create and explain projects, so now I’m ready for interviews.",
  },
  {
    name: "Narendran",
    role: "Final Year Student",
    review:
      "I recently attended a guest lecture by the CEO of Data Analytics Avenue, and it was very inspiring. He explained clearly how to build a career in data analytics and the importance of understanding business problems. The session motivated us and gave a clear direction for our future.",
  },
  {
    name: "Vijay Ramadas",
    role: "Data Analyst",
    review:
      "They are excellent in providing knowledge, and beyond that, the way they guide and prepare us for the next steps is truly amazing. The structured approach and continuous support make the learning experience more meaningful, helping us feel confident and ready for future career opportunities.",
  },
  {
    name: "Narayanan",
    role: "Business Analyst",
    review:
      "After struggling for six months to get a job, I joined this program and improved a lot. With proper training, resume help, and interview guidance, I got a 7 LPA job within one month. This program teaches both analytics and real business understanding, making it very helpful.",
  },
];

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      width="76"
      height="59"
      viewBox="0 0 76 59"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M44.8708 58.6797H68.8708C71.08 58.6797 72.8708 56.8888 72.8708 54.6797V31.1797C72.8708 28.9705 71.08 27.1797 68.8708 27.1797H54.4164C56.8164 16.3797 68.7498 7.34636 74.4164 4.17969C76.9204 2.67969 75.4219 -0.820312 72.3708 0.179688C45.9708 9.77969 40.3708 29.513 40.8708 38.1797V54.6797C40.8708 56.8888 42.6617 58.6797 44.8708 58.6797Z" />
      <path d="M4.0349 58.6797H28.0349C30.244 58.6797 32.0349 56.8888 32.0349 54.6797V31.1797C32.0349 28.9705 30.244 27.1797 28.0349 27.1797H13.5805C15.9805 16.3797 27.9138 7.34636 33.5805 4.17969C36.0844 2.67969 34.5859 -0.820312 31.5349 0.179688C5.1349 9.77969 -0.465099 29.513 0.0349007 38.1797V54.6797C0.0349007 56.8888 1.82576 58.6797 4.0349 58.6797Z" />
    </svg>
  );
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const a = parts[0]?.[0] ?? "";
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (a + b).toUpperCase();
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <article
      className="h-full w-[min(320px,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_18px_55px_-42px_rgba(15,23,42,0.35)] sm:w-[360px]"
      aria-label={`Review by ${item.name}`}
    >
      <div className="flex items-start">
        <QuoteIcon className="h-5 w-8 text-[var(--aa-primary)]" />
      </div>

      <p
        className={`${fontBody} mt-3 text-xs leading-relaxed text-slate-700 sm:text-sm`}
      >
        “{item.review}”
      </p>

      <div className="mt-4 flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-[var(--aa-primary)]/10 text-xs font-semibold text-[var(--aa-primary)] ring-1 ring-[var(--aa-primary)]/20">
          {initials(item.name)}
        </div>
        <div className="min-w-0">
          <p className={`${fontHeading} truncate text-xs font-bold text-[var(--aa-primary)] sm:text-sm`}>
            {item.name}
          </p>
          <p className={`${fontBody} truncate text-xs text-slate-500`}>{item.role}</p>
        </div>
      </div>
    </article>
  );
}

type TestimonialLoopProps = {
  items: TestimonialItem[];
  speed?: number;
  gap?: number;
  hoverSpeed?: number;
  direction?: "ltr" | "rtl";
  ariaLabel?: string;
};

const TestimonialLoop = ({
  items,
  speed = 80,
  gap = 20,
  hoverSpeed = 0,
  direction = "rtl",
  ariaLabel = "Testimonials",
}: TestimonialLoopProps) => {
  const isPauseOnHover = hoverSpeed === 0;
  const estimatedCardWidth = 360;
  const trackWidth = items.length * estimatedCardWidth + (items.length - 1) * gap;
  const durationSeconds = Math.max(trackWidth / Math.max(speed, 1), 12);
  const hoverDurationSeconds =
    hoverSpeed <= 0
      ? durationSeconds
      : Math.max(trackWidth / Math.max(hoverSpeed, 1), durationSeconds);

  return (
    <div
      className={`tech-logo-loop group relative w-full overflow-hidden ${
        isPauseOnHover ? "tech-logo-loop--pause-on-hover" : "tech-logo-loop--slow-on-hover"
      }`}
      aria-label={ariaLabel}
    >
      <div
        className={`tech-logo-track flex w-max items-stretch ${
          direction === "ltr" ? "tech-logo-track--reverse" : ""
        }`}
        style={
          {
            "--logo-gap": `${gap}px`,
            "--loop-duration": `${durationSeconds}s`,
            "--hover-loop-duration": `${hoverDurationSeconds}s`,
          } as CSSProperties
        }
      >
        {[...items, ...items].map((item, index) => (
          <div key={`${item.name}-${index}`} className="flex shrink-0 items-stretch">
            <TestimonialCard item={item} />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#f5f7fb] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#f5f7fb] to-transparent" />
    </div>
  );
};

const Testimonial = () => {
  const topRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const bottomRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <section
      className="aa-section bg-[var(--aa-surface-soft)] pt-8 sm:pt-10"
      aria-labelledby="testimonial-title"
    >
      <div className="aa-container">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          

          <h2
            id="testimonial-title"
            className={`${fontHeading} text-3xl font-extrabold leading-[1.08] text-slate-900 sm:text-5xl`}
          >
            Voices That Reflect <span
            className="rounded-sm bg-[var(--aa-primary)] px-2 py-0.5 text-[#ffffff]"
            
          >
            Our Work
          </span>
          </h2>
        </header>

        <div className="space-y-6">
          <TestimonialLoop
            items={topRow}
            direction="ltr"
            speed={70}
            gap={22}
            hoverSpeed={0}
            ariaLabel="Testimonials row one"
          />
          <TestimonialLoop
            items={bottomRow}
            direction="rtl"
            speed={70}
            gap={22}
            hoverSpeed={0}
            ariaLabel="Testimonials row two"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonial;