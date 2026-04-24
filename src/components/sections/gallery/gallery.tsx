"use client";

import Image, { type StaticImageData } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import galleryImage1 from "../../../../public/assets/images/gallery/image1.png";
import galleryImage2 from "../../../../public/assets/images/gallery/image2.png";
import galleryImage3 from "../../../../public/assets/images/gallery/image3.png";
import galleryImage4 from "../../../../public/assets/images/gallery/image4.png";
import galleryImage5 from "../../../../public/assets/images/gallery/image5.png";
import galleryImage6 from "../../../../public/assets/images/gallery/image6.png";
import galleryImage7 from "../../../../public/assets/images/gallery/image7.png";
import galleryImage8 from "../../../../public/assets/images/gallery/image8.png";
import galleryImage9 from "../../../../public/assets/images/gallery/image9.png";
import galleryImage10 from "../../../../public/assets/images/gallery/image10.png";

import "swiper/css";

type GallerySlide = {
  id: string;
  image: StaticImageData;
};

const gallerySlides: GallerySlide[] = [
  { id: "gallery-1", image: galleryImage1 },
  { id: "gallery-2", image: galleryImage2 },
  { id: "gallery-3", image: galleryImage3 },
  { id: "gallery-4", image: galleryImage4 },
  { id: "gallery-5", image: galleryImage5 },
  { id: "gallery-6", image: galleryImage6 },
  { id: "gallery-7", image: galleryImage7 },
  { id: "gallery-8", image: galleryImage8 },
  { id: "gallery-9", image: galleryImage9 },
  { id: "gallery-10", image: galleryImage10 },
];

const swiperModules = [A11y];

const AUTO_ADVANCE_MS = 2000;

const fontBody = "font-[family-name:var(--font-body)]";
const primary = "var(--aa-primary)";

const Gallery = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [pausedByHover, setPausedByHover] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);

  const goPrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const goNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  /** Same motion as “Next”; avoids Swiper Autoplay (can clash with App Router init). */
  useEffect(() => {
    if (reduceMotion || pausedByHover) return;
    const id = window.setInterval(() => {
      swiperRef.current?.slideNext();
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, pausedByHover]);

  return (
   
      
        <div className="flex w-full min-w-0 flex-col  bg-[var(--aa-surface-soft)] p-6  sm:px-8 sm:pb-15">
          {/* Nav first in DOM; `order-*` keeps visual: title → carousel → controls. Clicks call Swiper via ref (avoids broken external Navigation binding). */}
          <div
            className={`${fontBody} order-3 mt-6 flex shrink-0 flex-wrap items-center justify-center gap-6 sm:mt-8 sm:gap-10 md:gap-14`}
          >
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-300/90 bg-white/90 text-slate-600 shadow-sm transition-[background-color,transform,color,opacity] hover:bg-sky-50/90 hover:text-slate-800 active:scale-[0.97]"
              aria-label="Previous slide"
              onClick={goPrev}
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
            <p className="min-w-0 max-w-[16rem] text-center text-sm leading-snug text-slate-500 sm:max-w-none sm:text-base">
              Scroll to explore
            </p>
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sky-300/90 bg-white/90 text-slate-600 shadow-sm transition-[background-color,transform,color,opacity] hover:bg-sky-50/90 hover:text-slate-800 active:scale-[0.97]"
              aria-label="Next slide"
              onClick={goNext}
            >
              <ChevronRight className="h-5 w-5" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <div
            className="gallery-swiper-root order-2 mt-6 w-full shrink-0 sm:mt-8"
            onMouseEnter={() => setPausedByHover(true)}
            onMouseLeave={() => setPausedByHover(false)}
          >
            <Swiper
              modules={swiperModules}
              onSwiper={(instance) => {
                swiperRef.current = instance;
              }}
              spaceBetween={10}
              slidesPerView={1.08}
              loop={gallerySlides.length > 3}
              speed={reduceMotion ? 0 : 450}
              a11y={{ enabled: true, prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide" }}
              breakpoints={{
                520: { slidesPerView: 1.25, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 10 },
                1024: { slidesPerView: 3, spaceBetween: 10 },
                1280: { slidesPerView: 4, spaceBetween: 10 },
              }}
              className="!pb-1"
            >
              {gallerySlides.map((slide) => (
                <SwiperSlide key={slide.id} className="!h-auto">
                  <div className="w-full overflow-hidden rounded-xl border border-slate-100 bg-[var(--aa-surface-soft)] shadow-sm">
                    <Image
                      src={slide.image}
                      alt=""
                      width={slide.image.width}
                      height={slide.image.height}
                      sizes="(max-width: 640px) 88vw, (max-width: 1024px) 45vw, 25vw"
                      className="h-auto w-full max-w-full object-contain"
                      priority={slide.id === "gallery-1"}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <h2
            id="gallery-title"
            className="order-1 text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl"
          >
            Honours and{" "}
            <span
              className="rounded-sm px-2 py-0.5 text-white"
              style={{ backgroundColor: primary }}
            >
              Recognitions
            </span>
          </h2>
        </div>
      
    
  );
};

export default Gallery;
