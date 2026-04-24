import Link from "next/link";

export default function CareersPromoBanner() {
  return (
    <div
      role="region"
      aria-label="GenAI program enrollment"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200/90 bg-gradient-to-r from-[#1A73E8]/12 via-white to-[#7F86FF]/12 shadow-[0_-10px_36px_-14px_rgba(15,23,42,0.18)] backdrop-blur-md"
      
    >
      <div className="aa-container flex flex-col items-center justify-between gap-3 px-4 py-3 text-center sm:flex-row sm:text-left">
        <p className="max-w-3xl text-sm font-semibold leading-snug text-[#080808] sm:text-base">
          Industry Ready GenAI program for Data Aspirants (Only for Shortlisted 150 Aspirants)
        </p>
        <Link
          href="/#curriculum-section"
          className="aa-btn-primary shrink-0 px-5 py-2 text-sm"
        >
          Enroll Now
        </Link>
      </div>
    </div>
  );
}
