import Image from "next/image";

const fontHeading = "font-[family-name:var(--font-heading)]";

type BrandLogoWithTextProps = {
  variant: "nav" | "footer";
  className?: string;
};

/**
 * Logo mark from `/public/assets/logo/logo.svg` with “Analytics Avenue” label.
 */
export function BrandLogoWithText({ variant, className }: BrandLogoWithTextProps) {
  const isNav = variant === "nav";
  const logoSize = isNav
    ? { width: 23, height: 36 }
    : { width: 31, height: 49 };

  return (
    <span
      className={`inline-flex items-center ${isNav ? "gap-2" : "gap-3"} ${className ?? ""}`}
    >
      <Image
        src="/assets/logo/logo.svg"
        alt=""
        width={logoSize.width}
        height={logoSize.height}
        className="shrink-0 object-contain"
        priority={isNav}
      />
      <span
        className={
          isNav
            ? "text-lg font-extrabold tracking-tight sm:text-xl"
            : `${fontHeading} text-3xl font-black sm:text-4xl`
        }
      >
        <span className="text-[#1C3D76]">Analytics</span>
        <span className="text-[#080808]"> Avenue</span>
      </span>
    </span>
  );
}
