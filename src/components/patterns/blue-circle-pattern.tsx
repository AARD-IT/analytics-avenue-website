"use client";

import { useId } from "react";

type BlueCirclePatternProps = {
  className?: string;
  /** Tailwind min-height for short strips vs tall banners */
  minHeightClass?: string;
};

/**
 * Overlapping circle outlines + light sheen on saturated blue — shared by CTA and stats strips.
 */
export function BlueCirclePattern({
  className = "",
  minHeightClass = "min-h-[280px]",
}: BlueCirclePatternProps) {
  const sheenId = `bcp-sheen-${useId().replace(/:/g, "")}`;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${minHeightClass} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={sheenId}
          x1="0"
          y1="0"
          x2="1200"
          y2="420"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="rgba(255,255,255,0.09)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
        </linearGradient>
      </defs>
      <rect width="1200" height="420" fill={`url(#${sheenId})`} />
      <g fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1">
        <circle cx="96" cy="92" r="216" />
        <circle cx="504" cy="244" r="384" />
        <circle cx="1056" cy="147" r="288" />
        <circle cx="864" cy="328" r="240" />
        <circle cx="264" cy="344" r="168" />
        <circle cx="660" cy="50" r="192" />
      </g>
      <g fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1">
        <circle cx="360" cy="168" r="456" />
        <circle cx="1140" cy="294" r="264" />
        <circle cx="-24" cy="202" r="240" />
      </g>
    </svg>
  );
}
