import Image from "next/image";
import { CAREERS_LINKEDIN_URL, CAREERS_TEAM } from "../data";

const AVATAR_PX = 144;

function TeamMemberTile({ member }: { member: (typeof CAREERS_TEAM)[number] }) {
  return (
    <div className="flex w-full max-w-[200px] flex-col items-center text-center">
      <div
        className="relative shrink-0 overflow-hidden rounded-full border-[3px] border-white shadow-[0_12px_40px_-12px_rgba(15,23,42,0.25)] ring-1 ring-slate-200/90"
        style={{ width: AVATAR_PX, height: AVATAR_PX }}
      >
        <Image
          src={member.image}
          alt={member.name}
          width={AVATAR_PX}
          height={AVATAR_PX}
          className="h-full w-full object-cover object-top"
          sizes="144px"
        />
      </div>
      <h3 className="mt-4 font-[family-name:var(--font-heading)] text-sm font-bold leading-snug tracking-tight text-[var(--aa-primary)] sm:text-[1.05rem]">
        {member.name}
      </h3>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{member.role}</p>
    </div>
  );
}

export default function CareersTeam() {
  return (
    <section
      className="aa-section relative overflow-hidden py-14 sm:py-20 bg-[var(--aa-surface-soft)]"
      aria-labelledby="careers-team-title"
      
      
    >
      <div className="aa-container relative px-4 sm:px-6">
        <h2
          id="careers-team-title"
          className="mb-2 text-center text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl"
        >
          Meet the{" "}
          <span className="rounded-sm bg-[var(--aa-primary)] px-2 py-0.5 text-white">Team</span>
        </h2>

        <ul className="mx-auto mt-12 grid w-full max-w-6xl grid-cols-1 justify-items-center gap-10 sm:mt-14 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
          {CAREERS_TEAM.map((member, i) => (
            <li
              key={member.name}
              className={
                i === 0 ? "flex w-full justify-center sm:col-span-2 lg:col-span-4" : "flex w-full justify-center"
              }
            >
              <TeamMemberTile member={member} />
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:mt-14 sm:text-lg lg:mt-16">
          Meet the people behind Analytics Avenue. Our team of dedicated professionals works together to innovate, grow,
          and create meaningful impact.
        </p>

        <div className="mt-8 flex justify-center sm:mt-10">
          <a
            href={CAREERS_LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="aa-btn-primary px-8 text-sm"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
}
