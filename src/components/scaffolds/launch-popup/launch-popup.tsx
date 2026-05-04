"use client";

import { useCallback, useEffect, useState } from "react";

const ENROLL_URL = "https://pages.razorpay.com/discussion";

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

export default function LaunchPopup() {
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  const dismissPopup = useCallback(() => {
    document.body.style.overflow = "";
    setIsPopupOpen(false);
  }, []);

  useEffect(() => {
    if (!isPopupOpen) {
      return;
    }

    // Prevent background scroll while modal is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isPopupOpen]);

  useEffect(() => {
    if (!isPopupOpen) return;

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissPopup();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [dismissPopup, isPopupOpen]);

  return (
    <>
      {isPopupOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Industry Ready GenAI program offer"
          onClick={dismissPopup}
        >
          <div
            className="aa-card relative w-full max-w-[680px] rounded-[var(--aa-radius-2xl)] bg-[var(--aa-surface)] px-5 pb-7 pt-8 sm:px-8"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close popup"
              onClick={dismissPopup}
              className="absolute right-4 top-4 z-10 rounded p-1 text-2xl leading-none text-slate-400 transition hover:text-[var(--aa-text-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aa-primary)]"
            >
              ×
            </button>

            <div className="text-center">
              <h2
                className={`${fontHeading} mx-auto max-w-[620px] text-3xl font-extrabold leading-tight text-[var(--aa-primary)] sm:text-4xl`}
              >
                Industry Ready GenAI program
                <br />
                for Data Aspirants
              </h2>

              <p
                className={`${fontBody} mt-4 text-2xl font-extrabold text-[var(--aa-text-strong)] sm:text-2xl`}
              >
                Only for Shortlisted 150 Aspirants
              </p>

              <a
                href={ENROLL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`${fontBody} aa-btn-primary mt-7 min-w-44 px-8 py-3 text-base font-semibold`}
                style={{ backgroundColor: "#1C3D76" }}
                onClick={dismissPopup}
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div
          role="region"
          aria-label="GenAI program enrollment"
          className="fixed bottom-0 left-0 right-0  z-40 border-t flex justify-between items-center border-slate-200/90 bg-gradient-to-r from-[#1A73E8]/12 via-white to-[#7F86FF]/12 shadow-[0_-10px_36px_-14px_rgba(15,23,42,0.18)] backdrop-blur-md"
        >
          <div className="aa-container flex flex-col items-center justify-center gap-15 px-4 py-3 text-center sm:flex-row sm:text-left">
            <p className="max-w-3xl text-sm font-semibold leading-snug text-[#080808] sm:text-base">
              Industry Ready GenAI program for Data Aspirants (Only for
              Shortlisted 150 Aspirants)
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
      )}
    </>
  );
}
