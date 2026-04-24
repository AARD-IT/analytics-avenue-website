import { BlueCirclePattern } from "@/components/patterns/blue-circle-pattern";
import NewsletterForm from "@/components/scaffolds/footer/newsletter-form";

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

const Cta = () => {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-[#f8fafc] px-4 sm:px-8 sm:py-14"
    >
      <div className="aa-container">
        <div className="relative overflow-hidden rounded-[28px] border border-white/20 shadow-[0_24px_60px_-20px_rgba(26,115,232,0.45)]">
          {/* Saturated blue base + depth */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1A73E8] via-[#1d63e8] to-[#1557c7]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_-10%,rgba(255,255,255,0.18),transparent_55%)]"
            aria-hidden
          />
          <BlueCirclePattern />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.12] via-transparent to-transparent"
            aria-hidden
          />

          <div className="relative z-10 px-6 py-10 text-center sm:px-10 sm:py-14">
            <h2
              className={`${fontHeading} text-2xl font-extrabold leading-tight text-[#080808] sm:text-4xl lg:text-5xl`}
            >
              Ready to Build Your Data and AI Advantage?
            </h2>
            <p
              className={`${fontBody} mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/90 sm:text-base`}
            >
              Partner with Analytics Avenue to upskill teams, deliver real-world
              analytics solutions, and accelerate measurable business outcomes.
            </p>

            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
