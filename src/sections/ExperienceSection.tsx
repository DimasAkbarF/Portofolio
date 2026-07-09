import { memo, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { TagLabel } from '@/components/TagLabel';
import { timelineItems, type TimelineItem } from '@/data/experience';
import { useSectionReveal } from '@/hooks/use-section-reveal';

const JourneyCard = memo(function JourneyCard({
  item,
}: {
  item: TimelineItem;
}) {
  return (
    <article
      data-section-reveal
      className="group relative grid gap-4 border-t border-white/[0.08] py-7 transition-colors duration-300 hover:border-white/[0.18] md:grid-cols-[170px_1fr] md:gap-10 md:py-8 lg:grid-cols-[190px_1fr]"
    >
      <div className="flex items-center justify-between gap-4 md:block">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          {item.period}
        </p>

        <div className="mt-4 hidden h-px w-14 bg-white/10 transition-all duration-300 group-hover:w-20 group-hover:bg-white/25 md:block" />
      </div>

      <div className="relative">
        <div className="absolute -left-[46px] top-6 hidden h-2.5 w-2.5 rounded-full border border-white/20 bg-black shadow-[0_0_0_6px_rgba(255,255,255,0.03)] md:block lg:-left-[56px]" />

        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition duration-300 group-hover:-translate-y-1 group-hover:border-white/[0.16] group-hover:bg-white/[0.04] group-hover:shadow-[0_24px_80px_rgba(0,0,0,0.3)] sm:p-6">
          <div className="mb-4 flex items-start justify-between gap-5">
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-500">
                {item.category}
              </p>

              <h3 className="mt-3 font-heading text-[22px] font-semibold leading-tight tracking-[-0.03em] text-[#e2e2e2] transition-colors duration-300 group-hover:text-white md:text-2xl">
                {item.title}
              </h3>
            </div>

            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/[0.08] text-zinc-500 transition duration-300 group-hover:border-white/20 group-hover:text-[#93c5fd]">
              <ArrowUpRight
                size={15}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-300">
              {item.role}
            </p>

            <p className="mt-3 max-w-3xl text-[13px] leading-6 text-zinc-400 md:text-sm md:leading-7">
              {item.description}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 font-mono text-[10.5px] leading-none text-zinc-400 transition duration-300 group-hover:border-white/[0.14] group-hover:text-zinc-300"
              >
                {tag}
              </span>
            ))}
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
      aria-labelledby="journey-heading"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-white/[0.025] blur-3xl" />
        <div className="absolute bottom-24 left-0 h-72 w-72 rounded-full bg-white/[0.018] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div data-section-reveal className="mb-12 grid gap-6 md:mb-14 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <TagLabel text="Learning Journey" className="mb-5 text-zinc-500" />

            <h2
              id="journey-heading"
              className="font-heading text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-white md:text-6xl lg:text-7xl"
            >
              Education &
              <span className="block text-[#2563eb]">Growth.</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-zinc-400 md:ml-auto md:text-base">
            A simple overview of my journey as an Informatics Engineering student
            at Universitas Pamulang, where I am developing my skills in
            programming, databases, software development, and web technologies
            through study, practice, and small personal projects.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[170px] top-0 hidden h-full w-px bg-white/[0.06] md:block lg:left-[190px]" />

          <div>
            {timelineItems.map((item) => (
              <JourneyCard
                key={`${item.period}-${item.title}`}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
