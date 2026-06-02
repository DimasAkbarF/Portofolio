import { memo, useRef } from 'react';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import { useSectionReveal } from '@/hooks/use-section-reveal';

const timelineItems = [
  {
    date: '2024 — Present',
    title: 'Senior Frontend Developer',
    company: 'TechVision Labs',
    description:
      'Leading frontend architecture decisions, mentoring developers, and building large-scale enterprise dashboards focused on performance, scalability, and exceptional user experience.',
    stack: ['React', 'Next.js', 'TypeScript', 'Architecture'],
  },
  {
    date: '2022 — 2024',
    title: 'Frontend Developer',
    company: 'PixelCraft Studio',
    description:
      'Developed premium digital experiences, marketing platforms, and e-commerce solutions using Next.js, React, GSAP, and modern headless architectures.',
    stack: ['Next.js', 'React', 'GSAP', 'Headless CMS'],
  },
  {
    date: '2021 — 2022',
    title: 'Junior Web Developer',
    company: 'Digital Forge Agency',
    description:
      'Built responsive websites, integrated complex animation systems, collaborated with designers, and transformed Figma concepts into production-ready applications.',
    stack: ['JavaScript', 'Figma', 'CSS', 'Responsive UI'],
  },
  {
    date: '2019 — 2021',
    title: 'Freelance Developer',
    company: 'Self-Employed',
    description:
      'Worked with startups and growing businesses to create custom websites, React applications, and modernized legacy platforms into scalable solutions.',
    stack: ['React', 'Web Apps', 'UI Design', 'Client Work'],
  },
];

const JourneyCard = memo(function JourneyCard({
  item,
}: {
  item: (typeof timelineItems)[0];
}) {
  const isCurrent = item.date.includes('Present');

  return (
    <article data-section-reveal className="group relative grid gap-6 border-t border-white/[0.08] py-10 transition-colors duration-300 hover:border-white/20 md:grid-cols-[180px_1fr] md:gap-12 lg:py-12">
      <div className="flex items-start justify-between gap-4 md:block">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">
          {item.date}
        </p>

        <div className="mt-4 hidden h-px w-16 bg-white/10 transition-all duration-300 group-hover:w-24 group-hover:bg-white/30 md:block" />
      </div>

      <div className="relative">
        <div className="absolute -left-6 top-1 hidden h-3 w-3 rounded-full border border-white/20 bg-black shadow-[0_0_0_6px_rgba(255,255,255,0.03)] md:block" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 group-hover:-translate-y-1 group-hover:border-white/[0.16] group-hover:bg-white/[0.045] md:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-white/[0.06] blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="mb-7 flex items-center justify-between gap-5">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/[0.08] bg-black text-zinc-300">
                  <BriefcaseBusiness size={18} />
                </span>

                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                    {item.company}
                  </p>
                  {isCurrent && (
                    <p className="mt-1 text-xs font-medium text-white/70">
                      Current position
                    </p>
                  )}
                </div>
              </div>

              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] text-zinc-500 transition duration-300 group-hover:border-white/20 group-hover:text-white">
                <ArrowUpRight size={16} />
              </span>
            </div>

            <h3 className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-white md:text-4xl">
              {item.title}
            </h3>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
              {item.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {item.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.08] bg-black px-3 py-1.5 text-xs text-zinc-400 transition duration-300 group-hover:border-white/[0.14] group-hover:text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-6 py-28 text-white md:py-36"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-white/[0.035] blur-3xl" />
        <div className="absolute bottom-24 left-0 h-72 w-72 rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div data-section-reveal className="mb-20 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.34em] text-zinc-500">
              Career Journey
            </p>

            <h2 className="font-heading text-5xl font-semibold tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
              Experience
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-zinc-400 md:ml-auto md:text-base">
            A focused timeline of professional growth, technical exploration,
            and building scalable digital products with modern web technologies.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[180px] top-0 hidden h-full w-px bg-white/[0.06] md:block" />

          <div>
            {timelineItems.map((item) => (
              <JourneyCard
                key={`${item.date}-${item.title}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
