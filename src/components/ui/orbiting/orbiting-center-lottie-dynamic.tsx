"use client";

import dynamic from "next/dynamic";

/** Client-only DotLottie canvas — isolated so SSR/HMR never picks up stale hub markup. */
export default dynamic(() => import("./orbiting-center-lottie"), {
  ssr: false,
  loading: () => <span className="sr-only">Loading center animation</span>,
});
