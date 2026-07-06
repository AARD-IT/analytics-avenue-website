const ENROLL_URL = "https://edtech.analyticsavenue.in";

export default function CareersPromoBanner() {
  return (
    <div
      role="region"
      aria-label="GenAI program enrollment"
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between border-t border-slate-200/90 bg-gradient-to-r from-[#1A73E8]/12 via-white to-[#7F86FF]/12 shadow-[0_-10px_36px_-14px_rgba(15,23,42,0.18)] backdrop-blur-md"
    >
      <div className="aa-container flex flex-col items-center justify-center gap-4 px-4 py-3 text-center sm:flex-row sm:text-left sm:gap-15">
        <p className="max-w-3xl text-sm font-semibold leading-snug text-[#080808] sm:text-base">
          Industry Ready GenAI program for Data Aspirants (Only for Shortlisted 150 Aspirants)
        </p>
        <a
          href={ENROLL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="aa-btn-primary shrink-0 px-5 py-2 text-sm"
        >
          Enroll Now
        </a>
      </div>
    </div>
  );
}
