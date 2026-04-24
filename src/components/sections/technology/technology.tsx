import type { CSSProperties } from "react";
import Image from "next/image";

type LogoItem = {
  name: string;
  src: string;
};

type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  ariaLabel?: string;
};

const LogoLoop = ({
  logos,
  speed = 100,
  logoHeight = 60,
  gap = 60,
  hoverSpeed = 0,
  ariaLabel = "Technology logos",
}: LogoLoopProps) => {
  const isPauseOnHover = hoverSpeed === 0;
  const estimatedLogoWidth = logoHeight * 2.2;
  const trackWidth = logos.length * estimatedLogoWidth + (logos.length - 1) * gap;
  const durationSeconds = Math.max(trackWidth / Math.max(speed, 1), 10);
  const hoverDurationSeconds =
    hoverSpeed <= 0
      ? durationSeconds
      : Math.max(trackWidth / Math.max(hoverSpeed, 1), durationSeconds);

  return (
    <div
      className={`tech-logo-loop group relative w-full overflow-hidden ${
        isPauseOnHover ? "tech-logo-loop--pause-on-hover" : "tech-logo-loop--slow-on-hover"
      }`}
      aria-label={ariaLabel}
    >
      <div
        className="tech-logo-track flex w-max items-center"
        style={
          {
            "--logo-gap": `${gap}px`,
            "--loop-duration": `${durationSeconds}s`,
            "--hover-loop-duration": `${hoverDurationSeconds}s`,
          } as CSSProperties
        }
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="logo-item flex shrink-0 items-center justify-center px-3 py-3 transition-transform duration-300 hover:scale-105"
            style={{ height: `${logoHeight + 22}px` }}
            title={logo.name}
          >
            <Image
              src={logo.src}
              alt={logo.name}
              width={160}
              height={80}
              style={{ height: `${logoHeight}px`, width: "auto" }}
              className="select-none object-contain transition duration-300"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
};

const logos: LogoItem[] = [
  { name: "AI", src: "/assets/technology/ai.svg" },
  { name: "Python", src: "/assets/technology/python.svg" },
  { name: "JavaScript", src: "/assets/technology/javascript.svg" },
  { name: "Node.js", src: "/assets/technology/nodejs.svg" },
  { name: "MySQL", src: "/assets/technology/mysql.svg" },
  { name: "Hadoop", src: "/assets/technology/hadoop.svg" },
  { name: "PHP", src: "/assets/technology/php.svg" },
  { name: "Laravel", src: "/assets/technology/laravel.svg" },
  { name: "HTML", src: "/assets/technology/html.svg" },
  { name: "CSS", src: "/assets/technology/css.svg" },
];

const Technology = () => {
  return (
    <section className=" bg-white pt-8 sm:pt-10">
      <div className="aa-container">
        
        <LogoLoop logos={logos} speed={100} hoverSpeed={0} logoHeight={50} gap={36} />
      </div>
    </section>
  );
};

export default Technology;