import { useRef, type CSSProperties } from 'react';
import { TagLabel } from '@/components/TagLabel';
import { bottomSkills, topSkills, type Skill } from '@/data/skills';
import { useSectionReveal } from '@/hooks/use-section-reveal';

type SkillStyle = CSSProperties & {
  '--skill-color': string;
};

function SkillPill({ skill }: { skill: Skill }) {
  return (
    <li
      className="skills-pill"
      style={{ '--skill-color': skill.color } as SkillStyle}
      aria-label={skill.name}
    >
      <svg
        className="skills-pill-icon"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d={skill.icon.path} />
      </svg>
      <span>{skill.name}</span>
    </li>
  );
}

function SkillsMarquee({
  skills,
  direction,
  label,
}: {
  skills: Skill[];
  direction: 'left' | 'right';
  label: string;
}) {
  const repeatedSkills = [...skills, ...skills];

  return (
    <div className="skills-marquee" aria-label={label}>
      <ul className={`skills-track ${direction === 'right' ? 'skills-track-reverse' : ''}`}>
        {repeatedSkills.map((skill, index) => (
          <SkillPill key={`${skill.name}-${index}`} skill={skill} />
        ))}
      </ul>
    </div>
  );
}

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionReveal(sectionRef, { itemSelector: '[data-skills-reveal]' });

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute bottom-10 left-0 h-72 w-72 rounded-full bg-white/[0.018] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div data-skills-reveal className="mb-12 grid gap-8 md:mb-16 md:grid-cols-[0.95fr_1.05fr] md:items-end">
          <div>
            <TagLabel text="TECH STACK" className="mb-5 text-zinc-500" />

            <h2 id="skills-heading" className="font-heading text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
              Skill
              <span className="block text-[#2563eb]">Technical.</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-zinc-400 md:ml-auto md:text-base">
            Teknologi dan tools yang saya gunakan untuk membangun pengalaman
            web modern yang cepat, responsif, dan nyaman digunakan.
          </p>
        </div>

        <div data-skills-reveal className="space-y-4 md:space-y-5">
          <SkillsMarquee
            skills={topSkills}
            direction="right"
            label="Frontend and backend technologies"
          />
          <SkillsMarquee
            skills={bottomSkills}
            direction="left"
            label="Design, database, and tooling technologies"
          />
        </div>
      </div>
    </section>
  );
}
