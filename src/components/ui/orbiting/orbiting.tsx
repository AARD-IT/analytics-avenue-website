"use client";

import React, { useEffect, useState, memo } from "react";
import Image from "next/image";

import OrbitingCenterLottie from "./orbiting-center-lottie-dynamic";

type IconType = "html" | "css" | "javascript" | "react" | "node" | "tailwind";

type GlowColor = "cyan" | "purple";

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  /** Inline tech icon (HTML/CSS/React, etc.) */
  iconType?: IconType;
  /** Public path under `/` for an SVG or image asset */
  imageSrc?: string;
  /** Glow / hover accent (always set; used for assets and can override inline defaults) */
  accentColor: string;
  /** Optional scale for icon artwork inside the circle (1 = default) */
  contentScale?: number;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

export interface OrbitingSkillsProps {
  className?: string;
}

const iconComponents: Record<
  IconType,
  { component: () => React.JSX.Element; color: string }
> = {
  html: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"
          fill="#E34F26"
        />
      </svg>
    ),
    color: "#E34F26",
  },
  css: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.751L12 19.351l5.379-1.443.744-8.157z"
          fill="#1572B6"
        />
      </svg>
    ),
    color: "#1572B6",
  },
  javascript: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <rect width="24" height="24" fill="#F7DF1E" />
        <path
          d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"
          fill="#323330"
        />
      </svg>
    ),
    color: "#F7DF1E",
  },
  react: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <circle cx="12" cy="12" r="2.05" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(120 12 12)" />
        </g>
      </svg>
    ),
    color: "#61DAFB",
  },
  node: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.602.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.135-.141.135-.241V6.921c0-.103-.055-.198-.137-.246l-8.791-5.072c-.081-.047-.189-.047-.273 0L2.075 6.675c-.084.048-.139.144-.139.246v10.146c0 .1.055.194.139.241l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.909 0-2.026-.551L1.352 18.675C.533 18.215 0 17.352 0 16.43V6.284c0-.922.533-1.786 1.352-2.245L10.147-.963c.8-.452 1.866-.452 2.657 0l8.796 5.002c.819.459 1.352 1.323 1.352 2.245v10.146c0 .922-.533 1.783-1.352 2.245l-8.796 5.078c-.28.163-.601.247-.926.247zm2.717-6.993c-3.849 0-4.654-1.766-4.654-3.246 0-.14.114-.253.256-.253h1.136c.127 0 .232.091.252.215.173 1.164.686 1.752 3.01 1.752 1.852 0 2.639-.419 2.639-1.401 0-.566-.224-1.03-3.099-1.249-2.404-.184-3.89-.768-3.89-2.689 0-1.771 1.491-2.825 3.991-2.825 2.808 0 4.199.975 4.377 3.068.007.072-.019.141-.065.193-.047.049-.111.077-.178.077h-1.14c-.119 0-.225-.083-.248-.196-.276-1.224-.944-1.616-2.746-1.616-2.023 0-2.259.705-2.259 1.234 0 .641.278.827 3.006 1.19 2.7.359 3.982.866 3.982 2.771 0 1.922-1.603 3.024-4.399 3.024z"
          fill="#339933"
        />
      </svg>
    ),
    color: "#339933",
  },
  tailwind: {
    component: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-full w-full">
        <path
          d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
          fill="#06B6D4"
        />
      </svg>
    ),
    color: "#06B6D4",
  },
};

const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = "SkillIcon";

const INNER_LAYER_ASSETS = {
  digitalMarketing: "/assets/hero/inner-layer/digital-marketing.svg",
  crm: "/assets/hero/inner-layer/crm.svg",
  salesAutomation: "/assets/hero/inner-layer/sales-automation.svg",
} as const;

const OUTER_LAYER_ASSETS = {
  agenticAi: "/assets/hero/outer-layer/agentic-ai.svg",
  biSolution: "/assets/hero/outer-layer/bi.svg",
  predictiveModel: "/assets/hero/outer-layer/predictive-model.svg",
  dataEngineer: "/assets/hero/outer-layer/data-engineer.svg",
  placementPrograms: "/assets/hero/outer-layer/placement-programs.svg",
} as const;

const OrbitIcon = memo(
  ({
    iconType,
    imageSrc,
    contentScale = 1,
  }: {
    iconType?: IconType;
    imageSrc?: string;
    contentScale?: number;
  }) => {
    const scaleStyle =
      contentScale !== 1 ? { transform: `scale(${contentScale})` } : undefined;

    if (imageSrc) {
      return (
        <span className="relative block h-full w-full">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="64px"
            className="origin-center object-contain"
            style={scaleStyle}
            draggable={false}
          />
        </span>
      );
    }
    if (iconType) {
      return (
        <span
          className="flex h-full w-full origin-center items-center justify-center"
          style={scaleStyle}
        >
          <SkillIcon type={iconType} />
        </span>
      );
    }
    return null;
  },
);
OrbitIcon.displayName = "OrbitIcon";

const INNER_RADIUS = 142;
const OUTER_RADIUS = 258;
const INNER_PHASE_STEP = (2 * Math.PI) / 4;
const OUTER_ORBIT_COUNT = 5;
const OUTER_PHASE_STEP = (2 * Math.PI) / OUTER_ORBIT_COUNT;

const skillsConfig: SkillConfig[] = [
  // Inner orbit — Digital Marketing, Web development (React), CRM Pipeline, Sales Automation
  {
    id: "digital-marketing-inner",
    orbitRadius: INNER_RADIUS,
    size: 56,
    speed: 1,
    imageSrc: INNER_LAYER_ASSETS.digitalMarketing,
    accentColor: "#0082FB",
    phaseShift: 0,
    glowColor: "cyan",
    label: "Digital Marketing",
  },
  {
    id: "web-dev-inner",
    orbitRadius: INNER_RADIUS,
    size: 56,
    speed: 1,
    iconType: "react",
    accentColor: iconComponents.react.color,
    phaseShift: INNER_PHASE_STEP,
    glowColor: "cyan",
    label: "Web development",
  },
  {
    id: "crm-inner",
    orbitRadius: INNER_RADIUS,
    size: 56,
    speed: 1,
    imageSrc: INNER_LAYER_ASSETS.crm,
    accentColor: "#0ea5e9",
    contentScale: 1.3,
    phaseShift: 2 * INNER_PHASE_STEP,
    glowColor: "cyan",
    label: "CRM Pipeline",
  },
  {
    id: "sales-automation-inner",
    orbitRadius: INNER_RADIUS,
    size: 56,
    speed: 1,
    imageSrc: INNER_LAYER_ASSETS.salesAutomation,
    accentColor: "#a855f7",
    phaseShift: 3 * INNER_PHASE_STEP,
    glowColor: "cyan",
    label: "Sales Automation",
  },
  // Outer orbit — five hero SVGs
  {
    id: "agentic-ai-outer",
    orbitRadius: OUTER_RADIUS,
    size: 62,
    speed: -0.6,
    imageSrc: OUTER_LAYER_ASSETS.agenticAi,
    accentColor: "#8b5cf6",
    phaseShift: 0,
    glowColor: "purple",
    label: "Ai Agents",
  },
  {
    id: "bi-solution-outer",
    orbitRadius: OUTER_RADIUS,
    size: 62,
    speed: -0.6,
    imageSrc: OUTER_LAYER_ASSETS.biSolution,
    accentColor: "#0ea5e9",
    phaseShift: OUTER_PHASE_STEP,
    glowColor: "purple",
    label: "BI Solutions",
  },
  {
    id: "javascript-outer",
    orbitRadius: OUTER_RADIUS,
    size: 56,
    speed: -0.6,
    imageSrc: OUTER_LAYER_ASSETS.predictiveModel,
    accentColor: "#6366f1",
    phaseShift: 2 * OUTER_PHASE_STEP,
    glowColor: "purple",
    label: "Predictive Models",
  },
  {
    id: "data-engineer-outer",
    orbitRadius: OUTER_RADIUS,
    size: 62,
    speed: -0.6,
    imageSrc: OUTER_LAYER_ASSETS.dataEngineer,
    accentColor: "#10b981",
    phaseShift: 3 * OUTER_PHASE_STEP,
    glowColor: "purple",
    label: "Data Engineering",
  },
  {
    id: "placement-programs-outer",
    orbitRadius: OUTER_RADIUS,
    size: 62,
    speed: -0.6,
    imageSrc: OUTER_LAYER_ASSETS.placementPrograms,
    accentColor: "#f59e0b",
    phaseShift: 4 * OUTER_PHASE_STEP,
    glowColor: "purple",
    label: "Placement Programs",
  },
];

const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, imageSrc, accentColor, contentScale, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      suppressHydrationWarning
      className="absolute left-1/2 top-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 30 : 10,
      }}
      aria-label={label}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-full
          border border-slate-200/90 bg-white p-2 shadow-md transition-all duration-300
          ${isHovered ? "shadow-2xl" : "hover:shadow-lg"}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 28px ${accentColor}35, 0 0 52px ${accentColor}18, 0 10px 25px -8px rgb(15 23 42 / 0.12)`
            : undefined,
        }}
      >
        <OrbitIcon
          iconType={iconType}
          imageSrc={imageSrc}
          contentScale={contentScale}
        />
      </div>
      {/* Outside overflow-hidden circle so label is not clipped (pill below icon) */}
      <div
        className="pointer-events-none absolute left-1/2 top-full z-[40] mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1a1c23] px-3 py-1.5 font-[family-name:var(--font-heading)] text-[11px] font-semibold leading-snug tracking-tight text-white/95 shadow-lg sm:text-[13px]"
        aria-hidden
      >
        {label}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = "OrbitingSkill";

const GlowingOrbitPath = memo(
  ({ radius, glowColor = "cyan", animationDelay = 0 }: GlowingOrbitPathProps) => {
    const ringColors = {
      cyan: "rgba(6, 182, 212, 0.35)",
      purple: "rgba(147, 51, 234, 0.35)",
    };
    const border = ringColors[glowColor] ?? ringColors.cyan;

    return (
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: `${radius * 2}px`,
          height: `${radius * 2}px`,
          animationDelay: `${animationDelay}s`,
        }}
      >
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{
            border: `1px solid ${border}`,
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: `${animationDelay}s`,
          }}
        />
      </div>
    );
  },
);
GlowingOrbitPath.displayName = "GlowingOrbitPath";

const orbitPathConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
  { radius: INNER_RADIUS, glowColor: "cyan", delay: 0 },
  { radius: OUTER_RADIUS, glowColor: "purple", delay: 1.5 },
];

export default function OrbitingSkills({ className }: OrbitingSkillsProps) {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
      setTime((prevTime) => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  return (
    <div
      className={`relative flex w-full flex-col items-center justify-center overflow-visible bg-transparent ${className ?? ""}`}
      role="img"
      aria-label="Lottie robot at center with orbiting icons: inner ring Digital Marketing, Web development, CRM Pipeline, Sales Automation; outer ring Ai Agents, BI Solutions, Predictive Model, Data Engineering, Placement Programs"
    >
      <div
        className="relative flex h-[min(calc(100vw-32px),500px)] w-[min(calc(100vw-32px),500px)] items-center justify-center pb-12 sm:h-[580px] sm:w-[580px] md:h-[620px] md:w-[620px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative z-10 flex h-40 w-40 min-h-0 min-w-0 items-center justify-center sm:h-44 sm:w-44 md:h-30 md:w-30">
          <OrbitingCenterLottie />
        </div>

        {orbitPathConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return <OrbitingSkill key={config.id} config={config} angle={angle} />;
        })}
      </div>
    </div>
  );
}
