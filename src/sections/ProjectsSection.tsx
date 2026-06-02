import { memo, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { useSectionReveal } from '@/hooks/use-section-reveal';

const projects = [
  {
    id: 'nebula',
    title: 'Nebula Dashboard',
    description:
      'A comprehensive analytics dashboard for SaaS platforms featuring real-time data visualization, customizable widgets, and dark-mode-first design. Built with performance and accessibility in mind.',
    tags: ['React', 'TypeScript', 'D3.js', 'Tailwind'],
    image: '/assets/project-nebula.webp',
  },
  {
    id: 'prism',
    title: 'Prism E-Commerce',
    description:
      'A headless e-commerce platform with seamless checkout flows, real-time inventory management, and immersive product showcases. Designed for luxury brands seeking a premium online presence.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Framer Motion'],
    image: '/assets/project-prism.webp',
  },
  {
    id: 'flux',
    title: 'Flux Social App',
    description:
      'A real-time social platform with live feeds, instant messaging, and collaborative features. Engineered for scale with WebSocket-based real-time updates and optimistic UI patterns.',
    tags: ['React', 'Socket.io', 'MongoDB', 'GraphQL'],
    image: '/assets/project-flux.webp',
  },
];

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <div
      data-section-reveal
      className="project-card grid min-h-[70vh] w-full grid-cols-1 items-center gap-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] p-4 shadow-[0_0_100px_rgba(37,99,235,0.08)] backdrop-blur-2xl transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_0_100px_rgba(37,99,235,0.14)] lg:grid-cols-[62%_38%] lg:p-8 group cursor-pointer"
    >
      <div
        className="overflow-hidden rounded-2xl"
      >
        <div className="relative overflow-hidden rounded-lg">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            width={1344}
            height={768}
            className="project-card-image w-full aspect-video object-cover rounded-lg"
            loading="lazy"
            decoding="async"
          />
          <div
            ref={overlayRef}
            className="project-card-overlay pointer-events-none absolute inset-0 bg-black opacity-0"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:pl-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-blue-400">
          Exhibit 0{index + 1}
        </span>
        <h3 className="font-heading text-[24px] font-bold tracking-[-0.5px] leading-[1.2] text-[#e2e2e2]">
          {project.title}
        </h3>
        <p className="text-[13px] text-[#9c9c9c] leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] text-[#9c9c9c] bg-[#28282a] px-2.5 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1 font-heading text-[12px] font-bold text-[#2563eb] hover:underline underline-offset-4 transition-all duration-300 group/link"
        >
          View Project
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/link:translate-x-1"
          />
        </a>
      </div>
    </div>
  );
});

export function ProjectsSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black py-[120px] lg:min-h-screen"
    >
      <div>
        <div className="mx-auto max-w-[1200px] px-6">
          <div
            ref={headingRef}
            data-section-reveal
            className="mx-auto mb-20 max-w-[1200px] text-center text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent"
          >
            <h1>Projects</h1>
          </div>

          <div ref={cardsRef} className="flex flex-col gap-10">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
