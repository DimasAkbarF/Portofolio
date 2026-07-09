import { memo, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { TagLabel } from '@/components/TagLabel';
import { projects, type Project } from '@/data/projects';
import { useSectionReveal } from '@/hooks/use-section-reveal';

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      data-section-reveal
      className="project-card group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.04] hover:shadow-[0_24px_80px_rgba(0,0,0,0.3)]"
    >
      <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-[#050505]">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} project preview by Dimas Akbar`}
            width={1344}
            height={768}
            className="project-card-image h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="project-card-overlay pointer-events-none absolute inset-0 bg-black opacity-0"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="flex min-h-[214px] flex-col px-2 pb-3 pt-4 sm:px-3 sm:pt-5">
        <div className="mb-3.5 flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
            Project 0{index + 1}
          </span>
          <span className="h-px flex-1 bg-white/[0.08]" aria-hidden="true" />
        </div>

        <h3 className="font-heading text-[20px] font-semibold leading-snug tracking-[-0.025em] text-[#e2e2e2] transition-colors duration-300 group-hover:text-white sm:text-[22px]">
          {project.title}
        </h3>

        <p className="mt-2.5 overflow-hidden text-[13px] leading-6 text-zinc-400 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2.5 py-1 font-mono text-[10.5px] leading-none text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href={project.detailTarget}
          aria-label={`Discuss the ${project.title} project with Dimas Akbar`}
          className="group/link mt-auto inline-flex min-h-10 w-fit items-center gap-1.5 pt-5 font-heading text-[12px] font-semibold text-zinc-300 transition-colors duration-300 hover:text-[#93c5fd] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
        >
          Discuss Project
          <ArrowRight
            size={14}
            strokeWidth={1.8}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
            aria-hidden="true"
          />
        </a>
      </div>
    </article>
  );
});

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-heading"
      className="relative w-full overflow-hidden bg-black px-6 py-24 text-white md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div
          data-section-reveal
          className="mb-12 grid gap-5 md:mb-14 md:grid-cols-[0.9fr_1fr] md:items-end"
        >
          <div>
            <TagLabel text="Selected Work" className="mb-5 text-zinc-500" />
            <h2
              id="projects-heading"
              className="font-heading text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-white md:text-6xl lg:text-7xl"
            >
              Featured
              <span className="block text-[#2563eb]">Projects.</span>
            </h2>
          </div>

          <p className="max-w-xl text-sm leading-7 text-zinc-400 md:ml-auto md:text-base">
            A focused selection of interfaces built with attention to structure,
            clarity, and polished user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
