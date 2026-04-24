import Link from "next/link";

/** Tiny SVG noise tile — adds film-grain over the gradient (no extra assets). */
const NOISE_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")";

type ContactIntroProps = {
  address: string;
  whatsappDisplay: string;
  whatsappUrl: string;
  email: string;
};

const WhatsAppIcon = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="h-4 w-4 fill-current"
  >
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.17 1.59 5.98L0 24l6.2-1.62a11.95 11.95 0 0 0 5.86 1.5h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.2-3.52-8.43Zm-8.46 18.38h-.01a9.9 9.9 0 0 1-5.04-1.37l-.36-.21-3.68.96.98-3.59-.24-.37a9.91 9.91 0 0 1-1.52-5.3c0-5.45 4.43-9.88 9.89-9.88 2.64 0 5.11 1.02 6.97 2.89a9.8 9.8 0 0 1 2.9 6.99c0 5.45-4.44 9.88-9.89 9.88Zm5.42-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.08-.3-.15-1.25-.46-2.38-1.47a8.87 8.87 0 0 1-1.65-2.04c-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.51.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.66-1.58-.9-2.17-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.52.08-.8.37-.27.3-1.03 1-1.03 2.43 0 1.43 1.05 2.8 1.2 2.99.15.2 2.07 3.15 5.01 4.41.7.3 1.25.48 1.68.61.7.22 1.35.19 1.86.12.57-.08 1.75-.71 2-1.4.24-.69.24-1.28.17-1.4-.08-.12-.27-.2-.57-.35Z" />
  </svg>
);

export default function ContactIntro({
  address,
  whatsappDisplay,
  whatsappUrl,
  email,
}: ContactIntroProps) {
  return (
    <section
      className="relative overflow-hidden border-b border-slate-200/60 pb-12 pt-8 sm:pb-16 sm:pt-10"
      aria-labelledby="contact-page-title"
    >
      {/* —— Background stack (decorative only) —— */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#f0f6ff] via-[#f8fafc] to-white" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_0%_-20%,rgba(26,115,232,0.18),transparent_55%),radial-gradient(ellipse_100%_70%_at_100%_0%,rgba(127,134,255,0.14),transparent_50%),radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(56,189,248,0.08),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-[min(28vw,220px)] top-[8%] h-[min(85vw,560px)] w-[min(85vw,560px)] rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(26,115,232,0.35),transparent_68%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-[min(22vw,180px)] bottom-[-10%] h-[min(75vw,500px)] w-[min(75vw,500px)] rounded-full bg-[radial-gradient(circle_at_70%_60%,rgba(99,102,241,0.22),transparent_65%)] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(105deg,transparent_0%,rgba(255,255,255,0.5)_45%,rgba(255,255,255,0.15)_52%,transparent_58%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4] mix-blend-soft-light"
        style={{ backgroundImage: NOISE_DATA_URI }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.055)_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_85%_75%_at_50%_35%,#080808,transparent)]"
        aria-hidden
      />

      <div className="aa-container relative z-10 px-4 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-[var(--aa-primary)]">
                Home
              </Link>
            </li>
            <li aria-hidden className="text-slate-300">
              /
            </li>
            <li className="font-medium text-slate-800">Contact Us</li>
          </ol>
        </nav>

        <div className="mt-8 max-w-3xl">
          <p className="aa-kicker">Get in touch</p>
          <h1 id="contact-page-title" className="aa-title mt-2">
            Contact Us
          </h1>
          <p className="aa-subtitle mt-4">We&apos;re always here to help you.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-[var(--aa-surface-soft)] p-6 shadow-[var(--aa-shadow-sm)]">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-slate-900">
              Our Address
            </h2>
            <p className="mt-1 text-sm font-medium text-[var(--aa-primary)]">Our location</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{address}</p>
          </article>

          <article className="rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-[var(--aa-surface-soft)] p-6 shadow-[var(--aa-shadow-sm)]">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-slate-900">
              Contact on WhatsApp
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Reach our support team directly on WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-[var(--aa-primary)] transition hover:text-[var(--aa-primary-hover)]"
            >
              <WhatsAppIcon />
              {whatsappDisplay}
            </a>
          </article>

          <article className="rounded-[var(--aa-radius-2xl)] border border-[var(--aa-border)] bg-[var(--aa-surface-soft)] p-6 shadow-[var(--aa-shadow-sm)] sm:col-span-2 lg:col-span-1">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-slate-900">
              Contact Email
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">Send your message</p>
            <a
              href={`mailto:${email}`}
              className="mt-2 inline-block break-all text-base font-semibold text-[var(--aa-primary)] transition hover:text-[var(--aa-primary-hover)]"
            >
              {email}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
