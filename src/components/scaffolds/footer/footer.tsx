import { BrandLogoWithText } from "@/components/scaffolds/brand-logo-with-text";

const fontHeading = "font-[family-name:var(--font-heading)]";
const fontBody = "font-[family-name:var(--font-body)]";

const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "Data Strategy", href: "#services" },
      { label: "Business Intelligence", href: "#services" },
      { label: "Data Engineering", href: "#services" },
      { label: "Machine Learning", href: "#services" },
      { label: "Generative AI", href: "#services" },
    ],
  },
  {
    title: "Learning Programs",
    links: [
      { label: "Data Analytics Placement Program", href: "#about" },
      { label: "SQL and Power BI", href: "#about" },
      { label: "Career Transition Support", href: "#about" },
      { label: "Internship Tracks", href: "#about" },
      { label: "Corporate Upskilling", href: "#about" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Analytics Avenue", href: "#about" },
      { label: "Careers", href: "/careers" },
      { label: "Core Technology", href: "#challenges" },
      { label: "Client Testimonials", href: "#testimonial-title" },
      { label: "AI Program", href: "/#curriculum-heading" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
] as const;

type FooterProps = {
  /** When true, footer sits directly under the home CTA (border + spacing only below the rule). */
  afterCta?: boolean;
};

const Footer = ({ afterCta = false }: FooterProps) => {
  const shellClass = afterCta
    ? "aa-section relative overflow-hidden bg-[#ffffff] pb-8 pt-0"
    : "aa-section relative overflow-hidden bg-[#ffffff] pb-8 pt-10 sm:pt-14";
  const innerClass = afterCta
    ? "relative border-t border-slate-200/80 pt-10 sm:pt-12"
    : "relative";

  return (
    <footer className={shellClass}>
      <div className="aa-container">
        <div className={innerClass}>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_2.75fr] lg:gap-12">
            <div>
              <div className="flex flex-nowrap items-center whitespace-nowrap">
                <BrandLogoWithText variant="footer" />
              </div>
              <p className={`${fontBody} mt-4 max-w-sm text-sm font-semibold leading-relaxed text-slate-600`}>
                AI Business Partner for Ed-Tech and enterprise teams - building
                talent, systems, and solutions for measurable impact.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-10">
              {footerColumns.map((column) => (
                <div key={column.title}>
                  <h3 className={`${fontHeading} text-sm font-bold text-slate-900`}>
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className={`${fontBody} text-xs font-semibold text-slate-500 transition hover:text-[var(--aa-primary)] sm:text-sm`}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 flex flex-col gap-3 border-t border-slate-200/80 pt-4 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <p className={fontBody}>
              © {new Date().getFullYear()}{" "}
              <span className="whitespace-nowrap">
                <span className="text-[#1C3D76]">Analytics</span>
                <span className="text-[#080808]"> Avenue</span>
              </span>
              . All rights reserved.
            </p>
            <div className={`${fontBody} flex items-center gap-5`}>
              <a href="#" className="transition hover:text-[var(--aa-primary)]">
                Terms & Conditions
              </a>
              <a href="#" className="transition hover:text-[var(--aa-primary)]">
                Privacy Policy
              </a>
            </div>
          </div>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;