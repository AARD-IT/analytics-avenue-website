"use client";
import React, { useState } from "react";
import Image from "next/image";

type ServiceIcon = {
  id: number;
  label: string;
  src: string;
  alt: string;
  accentColor: string;
};

const SERVICE_ICONS: ServiceIcon[] = [
  {
    id: 1,
    label: "Nationwide Data Analytics / AI Programs",
    src: "/assets/careers/graduation-cap.svg",
    alt: "Graduation Cap",
    accentColor: "#1A73E8",
  },
  {
    id: 2,
    label: "AI Enhanced Digital Marketing Solutions",
    src: "/assets/hero/inner-layer/digital-marketing.svg",
    alt: "Digital Marketing",
    accentColor: "#0EA5E9",
  },
  {
    id: 3,
    label: "End to End GenAI Automation",
    src: "/assets/hero/outer-layer/agentic-ai.svg",
    alt: "Agentic AI",
    accentColor: "#8B5CF6",
  },
  {
    id: 4,
    label: "Predictive Dashboards and CRM Pipeline Designs",
    src: "/assets/hero/outer-layer/bi-solution.svg",
    alt: "BI Solution",
    accentColor: "#6366F1",
  },
  {
    id: 5,
    label: "Data Engineering & Data Analytics",
    src: "/assets/hero/outer-layer/data-engineer.svg",
    alt: "Data Engineer",
    accentColor: "#10B981",
  },
];

// Wrapper for individual icons to give them the glassy container style and hover effects
const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
  accentColor = "#1A73E8",
}: {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isHovered?: boolean;
  animationDelay?: number;
  accentColor?: string;
}) => (
  <div
    className={`
        rounded-2xl flex items-center justify-center transition-all duration-300 border
        ${isHighlighted
        ? "bg-gray-100/85 border-blue-300/60 shadow-2xl animate-breathing-glow"
        : `  ${!isHovered && "animate-float"}`
      }
        ${isHovered
        ? "bg-white border-slate-200/90 scale-105 shadow-2xl"
        : "bg-white/90 border-slate-200/90 hover:bg-white hover:shadow-lg"
      }
        ${className}
    `}
    style={{
      animationDelay: `${animationDelay}s`,
      boxShadow: isHovered
        ? `0 0 28px ${accentColor}35, 0 0 52px ${accentColor}18, 0 10px 25px -8px rgb(15 23 42 / 0.12)`
        : undefined,
    }}
  >
    {children}
  </div>
);

// The grid of icons, now with a "spider net" connecting line system
const IconGrid = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const outerIcons = SERVICE_ICONS;

  // Constants for layout calculation
  const radius = 210;
  const centralIconRadius = 56; // w-28 is 112px, radius is 56px
  const outerIconRadius = 40; // w-20 is 80px, radius is 40px
  const svgSize = 520;
  const svgCenter = svgSize / 2;

  return (
    // Use scale to make the entire component responsive
    <div className="relative w-[520px] h-[520px] scale-75 md:scale-90 lg:scale-100">
      {/* SVG container for all connecting lines, drawn underneath the icons */}
      <svg width={svgSize} height={svgSize} className="absolute top-0 left-0" viewBox={`0 0 ${svgSize} ${svgSize}`}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g>
          {/* Draw lines between outer icons (the "web") */}
          {outerIcons.map((icon, i) => {
            const nextIndex = (i + 1) % outerIcons.length;
            const nextIcon = outerIcons[nextIndex];

            const angle1 =
              (-90 + i * (360 / outerIcons.length)) * (Math.PI / 180);
            const x1 =
              svgCenter + (radius - outerIconRadius) * Math.cos(angle1);
            const y1 =
              svgCenter + (radius - outerIconRadius) * Math.sin(angle1);

            const angle2 =
              (-90 + nextIndex * (360 / outerIcons.length)) * (Math.PI / 180);
            const x2 =
              svgCenter + (radius - outerIconRadius) * Math.cos(angle2);
            const y2 =
              svgCenter + (radius - outerIconRadius) * Math.sin(angle2);

            const isLineActive =
              hoveredId === icon.id || hoveredId === nextIcon.id;

            return (
              <line
                key={`web-line-${icon.id}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isLineActive ? "#3B82F6" : "#6B7280"}
                strokeWidth="1.5"
                className="transition-all duration-300"
                style={{ opacity: isLineActive ? 0.8 : 0.25 }}
                filter={isLineActive ? "url(#glow)" : "none"}
              />
            );
          })}

          {/* Draw lines from center to outer icons (the "spokes") */}
          {outerIcons.map((icon, i) => {
            const angleInDegrees = -90 + i * (360 / outerIcons.length);
            const angleInRadians = angleInDegrees * (Math.PI / 180);

            const startX =
              svgCenter + centralIconRadius * Math.cos(angleInRadians);
            const startY =
              svgCenter + centralIconRadius * Math.sin(angleInRadians);
            const endX =
              svgCenter + (radius - outerIconRadius) * Math.cos(angleInRadians);
            const endY =
              svgCenter + (radius - outerIconRadius) * Math.sin(angleInRadians);
            const isSpokeActive = hoveredId === icon.id;

            return (
              <line
                key={`spoke-line-${icon.id}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke={isSpokeActive ? "#3B82F6" : "#6B7280"}
                strokeWidth="1.5"
                className="transition-all duration-300"
                style={{ opacity: isSpokeActive ? 1 : 0.25 }}
                filter={isSpokeActive ? "url(#glow)" : "none"}
              />
            );
          })}
        </g>
      </svg>

      {/* The main container that acts as the center for the circle */}
      <div className="absolute top-1/2 left-1/2">
        {/* Center Icon */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10">
          <IconWrapper
            className="w-28 h-28 p-2"
            isHighlighted={true}
            animationDelay={0}
          >
            <Image
              src="/assets/logo/logo.svg"
              alt="Analytics Avenue Logo"
              width={56}
              height={56}
              className="block h-[56px] w-[56px] object-contain mx-auto"
            />
          </IconWrapper>
        </div>

        {/* Mapping over the outer icons to place them */}
        {outerIcons.map((icon, i) => {
          const angleInDegrees = -90 + i * (360 / outerIcons.length);
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);

          const iconStyle = {
            transform: `translate(${x}px, ${y}px)`,
          };
          const isHovered = hoveredId === icon.id;

          return (
            <div
              key={icon.id}
              className="absolute z-10"
              style={iconStyle}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="-translate-x-1/2 -translate-y-1/2 relative">
                <IconWrapper
                  className="w-20 h-20"
                  isHovered={isHovered}
                  animationDelay={i * 0.15}
                  accentColor={icon.accentColor}
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={52}
                    height={52}
                    className="h-[52px] w-[52px] object-contain"
                  />
                </IconWrapper>

                {/* Label pill — same style as orbiting component */}
                <div
                  className="pointer-events-none absolute left-1/2 top-full z-[40] mt-2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#1a1c23] px-3 py-1.5 font-[family-name:var(--font-heading)] text-[10px] font-semibold leading-snug tracking-tight text-white/95 shadow-lg"
                  aria-hidden
                >
                  {icon.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MobileServicesGrid = () => {
  return (
    <div className="md:hidden w-full max-w-sm rounded-3xl border border-slate-200/70 bg-white/70 p-4 shadow-[0_15px_45px_-30px_rgba(15,23,42,0.6)] backdrop-blur">
      <h3 className="mb-4 text-center font-[family-name:var(--font-heading)] text-base font-bold text-slate-800">
        Our Core Services
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {SERVICE_ICONS.map((icon) => (
          <div
            key={icon.id}
            className="rounded-2xl border border-slate-200/70 bg-white/80 p-3 text-center shadow-sm"
          >
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
              <Image
                src={icon.src}
                alt={icon.alt}
                width={30}
                height={30}
                className="h-[30px] w-[30px] object-contain"
              />
            </div>
            <p className="text-[11px] font-semibold leading-4 text-slate-700">
              {icon.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// The main App component that brings everything together
export default function CareersHeroServicesCard() {
  return (
    <div className="w-full flex items-center justify-center font-sans px-2 py-6 sm:px-4 sm:py-8">
      {/* Style block to define the animations. */}
      <style>
        {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }

                @keyframes breathing-glow {
                    0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
                    50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.1); }
                    100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.3); }
                }
                @keyframes breathing-glow-light {
                    0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); }
                    50% { box-shadow: 0 0 35px 10px rgba(59, 130, 246, 0.05); }
                    100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.2); }
                }
                .animate-breathing-glow {
                    animation: breathing-glow 3s ease-in-out infinite;
                }
                .dark .animate-breathing-glow {
                    animation: breathing-glow 3s ease-in-out infinite;
                }
                :not(.dark) .animate-breathing-glow {
                    animation: breathing-glow-light 3s ease-in-out infinite;
                }
            `}
      </style>



      <div className="relative z-10 container mx-auto flex items-center justify-center">
        <MobileServicesGrid />
        <div className="hidden md:block">
          <IconGrid />
        </div>
      </div>
    </div>
  );
}
