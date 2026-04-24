"use client";

import dynamic from "next/dynamic";

/** Client-only load avoids Swiper + App Router timing issues (“Router action dispatched before initialization”). */
const Gallery = dynamic(() => import("./gallery"), {
  ssr: false,
  loading: () => (
    <section className="aa-section min-h-[280px] bg-[#f4f8fc] py-6 sm:min-h-[320px] sm:py-8" aria-hidden />
  ),
});

export default Gallery;
