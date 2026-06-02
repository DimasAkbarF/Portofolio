import { useRef, type CSSProperties } from 'react';
import type { SimpleIcon } from 'simple-icons';
import {
  siDocker,
  siFigma,
  siGit,
  siGithub,
  siJavascript,
  siLaravel,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
} from 'simple-icons/icons';
import { TagLabel } from '@/components/TagLabel';
import { useSectionReveal } from '@/hooks/use-section-reveal';

type Skill = {
  name: string;
  icon: SimpleIcon;
  color: string;
};

type SkillStyle = CSSProperties & {
  '--skill-color': string;
};

const topSkills: Skill[] = [
  { name: 'JavaScript', icon: siJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: siTypescript, color: '#3178C6' },
  { name: 'ReactJS', icon: siReact, color: '#61DAFB' },
  { name: 'Next.js', icon: siNextdotjs, color: '#FFFFFF' },
  { name: 'Laravel', icon: siLaravel, color: '#FF2D20' },
  { name: 'PostgreSQL', icon: siPostgresql, color: '#4169E1' },
  { name: 'Tailwind CSS', icon: siTailwindcss, color: '#06B6D4' },
  { name: 'Docker', icon: siDocker, color: '#2496ED' },
];

const bottomSkills: Skill[] = [
  { name: 'Figma', icon: siFigma, color: '#F24E1E' },
  { name: 'Git', icon: siGit, color: '#F05032' },
  { name: 'PHP', icon: siPhp, color: '#777BB4' },
  { name: 'MySQL', icon: siMysql, color: '#4479A1' },
  { name: 'Node.js', icon: siNodedotjs, color: '#5FA04E' },
  { name: 'MongoDB', icon: siMongodb, color: '#47A248' },
  { name: 'GitHub', icon: siGithub, color: '#FFFFFF' },
  { name: 'Vite', icon: siVite, color: '#646CFF' },
];

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
      aria-label="Keahlian Teknis"
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

            <h2 className="font-heading text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
              Keahlian
              <span className="block text-[#2563eb]">Teknis.</span>
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
