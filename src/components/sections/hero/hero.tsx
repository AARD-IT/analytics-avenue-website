"use client";

import {
  Bot,
  Brain,
  Briefcase,
  GraduationCap,
  MessageCircle,
  Presentation,
} from "lucide-react";
import OrbitingSkills from "@/components/ui/orbiting/orbiting";
import RotatingText from "./rotating-text";

const buildYourSystemsCapabilities = [
  "Web Application",
  "Digital Marketing",
  "Data Analytics",
  "Data Engineering",
  "AI Automation",
  "Agentic AI",
  "L&D",
];

const heroMatrix = [
  {
    value: "2000+",
    title: "Personal & Professional",
    sublabel:
      "Consultations by Our Data Scientists Panel",
    Icon: MessageCircle,
  },
  {
    value: "100+",
    title: "High-Performance ML Models",
    sublabel:
      "Production-ready, highly accurate models",
    Icon: Brain,
  },
  {
    value: "15+",
    title: "Smart AI Automation",
    sublabel:
      "Streamline and automate workflows",
    Icon: Bot,
  },
  {
    value: "1000+",
    title: "Empowering Rural Talent",
    sublabel: "Empowered with Data Analytics Skills",
    Icon: GraduationCap,
  },
  {
    value: "500+",
    title: "Nationwide Professionals",
    sublabel:
      "Industry-ready projects for careers",
    Icon: Briefcase,
  },
  {
    value: "50+",
    title: "Guest Lectures and MOUs",
    sublabel: "Bridging academia with industry excellence",
    Icon: Presentation,
  },
] as const;

const Hero = () => {
  return (
    <section
      id="home"
      className="px-4 py-10 sm:px-10  relative overflow-hidden bg-[var(--aa-surface-soft)]"
    >
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -left-24 top-[-140px] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(26,115,232,0.28),rgba(26,115,232,0))] blur-3xl" />
        <div className="absolute -right-20 bottom-[-160px] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_72%_72%,rgba(56,189,248,0.24),rgba(56,189,248,0.05)_38%,rgba(56,189,248,0)_72%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(circle_at_50%_40%,white,transparent_75%)] [-webkit-mask-image:radial-gradient(circle_at_50%_40%,white,transparent_75%)]" />
      </div>

      <div className="aa-container relative z-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="max-w-xl">
          <h1 className="font-[family-name:var(--font-heading)] text-[2.1rem] font-extrabold leading-[1.1] text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl">
            AI Workforce for
            <br />
            Sales and Marketing
          </h1>

          <h2 className="font-[family-name:var(--font-heading)] mt-8 flex flex-col gap-1 text-xl font-bold leading-snug text-slate-900 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2 sm:text-2xl">
            <span className="text-balance">We Build your</span>
            <RotatingText
              text={buildYourSystemsCapabilities}
              duration={2200}
              y={12}
              containerClassName="align-middle min-w-0 max-w-full"
              textClassName="text-[var(--aa-primary)] break-words"
            />
            <span className="text-balance">Systems</span>
          </h2>

          

          <div className="mt-9 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-4">
            {heroMatrix.map(({ value, title, sublabel, Icon }) => (
              <div key={title} className="flex min-w-0 items-start gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--aa-primary)_14%,transparent)] text-[var(--aa-primary)]"
                  aria-hidden
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="font-[family-name:var(--font-heading)] text-xl font-semibold tracking-tight text-slate-900 sm:text-[1.65rem]">
                    {value}
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug sm:text-sm">
                    <span className="block font-semibold text-[#080808]">{title}</span>
                    <span className="block text-slate-500">{sublabel}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-xl justify-center pb-10 lg:max-w-2xl lg:justify-end">
          <OrbitingSkills className="min-h-[min(460px,58vh)] w-full max-w-[min(100vw-1.5rem,640px)] sm:min-h-[min(580px,70vh)] lg:min-h-[620px]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
