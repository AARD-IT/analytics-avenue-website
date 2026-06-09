import Image from "next/image";
import { forwardRef } from "react";

/** Site primary — matches Hero / CTAs */
export const PRIMARY = "var(--aa-primary)";
export const PRIMARY_HOVER = "var(--aa-primary-hover)";

/** @deprecated use PRIMARY */
export const CHALLENGE_BRAND = PRIMARY;

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

export type ChallengeCardProps = {
  badgeLabel: string;
  headline: string;
  description: string;
  bullets: [string, string, string];
  imageSrc: string;
  imageAlt: string;
  featured?: boolean;
  className?: string;
};

function BulletIcon() {
  return (
    <span
      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white"
      style={{ backgroundColor: PRIMARY }}
      aria-hidden
    >
      <svg
        viewBox="0 0 12 12"
        className="h-2.5 w-2.5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

const ChallengeCard = forwardRef<HTMLElement, ChallengeCardProps>(
  function ChallengeCard(
    {
      badgeLabel,
      headline,
      description,
      bullets,
      imageSrc,
      imageAlt,
      featured = false,
      className = "",
    },
    ref,
  ) {
    return (
      <article
        ref={ref}
        className={`grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)] md:grid-cols-[40%_60%] md:h-[340px] ${className}`}
      >
        <div className="relative h-[180px] overflow-hidden bg-[#f7fbff] sm:h-[200px] md:h-full md:min-h-0">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-[center_28%]"
            sizes="(max-width: 768px) 100vw, 40vw"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div
          className={`flex flex-col justify-center p-4 sm:p-5 md:p-6 ${fontBody}`}
        >
          {featured && (
            <p
              className={`${fontBody} mb-2 w-fit rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white sm:mb-2.5 sm:text-[10px] md:mb-3`}
              style={{ backgroundColor: PRIMARY_HOVER }}
            >
              Featured
            </p>
          )}

          <p
            className={`${fontBody} mb-2 text-[11px] font-semibold text-slate-900 sm:mb-2.5 sm:text-[12px] md:mb-3`}
          >
            <span
              className="rounded-sm px-2 py-1 text-white"
              style={{ backgroundColor: PRIMARY }}
            >
              {badgeLabel}
            </span>
          </p>

          <h3
            className={`${fontHeading} mb-2 text-[15px] font-bold leading-tight text-black sm:text-[16px] md:mb-3`}
          >
            {headline}
          </h3>

          <p
            className={`${fontBody} mb-3 text-[11px] leading-relaxed text-slate-600 sm:mb-4 sm:text-[12px] md:text-[12px]`}
          >
            {description}
          </p>

          <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:gap-2.5 md:gap-3">
            {bullets.map((line) => (
              <div key={line} className="flex flex-row items-start gap-2">
                <BulletIcon />
                <span
                  className={`${fontBody} text-[11px] leading-snug text-slate-900 sm:text-[12px]`}
                >
                  {line}
                </span>
              </div>
            ))}
          </div>

          <div>
            <a
              href="https://www.analyticsavenuerd.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${fontBody} aa-btn-primary group min-h-[48px] cursor-pointer rounded-lg px-4 py-2 text-[14px] font-bold hover:opacity-95 sm:text-[16px]`}
            >
              Get Started
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              >
                <path
                  d="M8.5 3.5L12 7.5L8.5 11.5M3 7.5H12"
                  stroke="white"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </article>
    );
  },
);

ChallengeCard.displayName = "ChallengeCard";

export default ChallengeCard;
