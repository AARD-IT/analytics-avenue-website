"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

/** Lottie.host asset (same URL as your LottieFiles embed / DotLottieReact example). */
export const ORBITING_CENTER_LOTTIE_SRC =
  "https://lottie.host/eace283a-3c20-4473-81dc-e0055a627f3a/JVL5jMPPAP.lottie";

/**
 * Center hub animation — mirrors your React snippet: `DotLottieReact` + `src` + `loop` + `autoplay`.
 */
export default function OrbitingCenterLottie() {
  return (
    <DotLottieReact
      src={ORBITING_CENTER_LOTTIE_SRC}
      loop
      autoplay
      className="size-full min-h-0 min-w-0"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
