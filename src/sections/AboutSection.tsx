import { useRef } from 'react';
import { TagLabel } from '@/components/TagLabel';
import { SectionHeading } from '@/components/SectionHeading';
import { useSectionReveal } from '@/hooks/use-section-reveal';

const techLabels = [
  'React / TypeScript / Next.js',
  'GSAP / Three.js / Tailwind',
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useSectionReveal(sectionRef, { parallaxSelector: '[data-section-parallax]' });

  return (
    <section id="about" ref={sectionRef} className="relative w-full py-[120px] bg-black">
      <div>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 items-center">
            <div data-section-reveal className="flex justify-center lg:justify-start">
              <div className="relative w-[60%] sm:w-[50%] lg:w-full">
                <div
                  className="absolute -inset-2 opacity-20 blur-2xl pointer-events-none lg:hidden"
                  style={{
                    borderRadius: '30% 6% 30% 6%',
                    background: 'radial-gradient(circle at 40% 40%, #2563eb, transparent 70%)',
                  }}
                />
                <img
                  data-section-parallax
                  src="/assets/About.webp"
                  alt="DIMZ.DEV - Frontend Developer"
                  width={941}
                  height={1369}
                  className="w-full aspect-[3/4] object-cover shadow-2xl lg:rounded-lg"
                  style={{
                    borderRadius: 'clamp(24px, 8vw, 60px) 6px clamp(24px, 8vw, 60px) 6px',
                  }}
                  loading="lazy"
                  decoding="async"
                />
                <div
                  className="absolute inset-0 pointer-events-none lg:hidden"
                  style={{
                    borderRadius: 'clamp(24px, 8vw, 60px) 6px clamp(24px, 8vw, 60px) 6px',
                    border: '1px solid rgba(37, 99, 235, 0.15)',
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div data-section-reveal className="about-item">
                <TagLabel text="ABOUT" />
              </div>

              <div data-section-reveal className="about-item">
                <SectionHeading text="About Me" />
              </div>

              <p data-section-reveal className="about-item text-[13px] text-[#9c9c9c] leading-relaxed max-w-[520px]">
                I'm a frontend developer with a passion for creating immersive, interactive web
                experiences. I specialize in building modern web applications using React, TypeScript,
                and cutting-edge animation libraries. With a background in design and a deep
                understanding of web technologies, I bridge the gap between aesthetics and
                functionality. Every project I work on is an opportunity to push the boundaries of
                what's possible on the web.
              </p>

              <div data-section-reveal className="about-item flex flex-col gap-2 mt-2">
                {techLabels.map((label, i) => (
                  <span
                    key={i}
                    className="inline-block self-start font-mono text-[11px] text-[#e2e2e2] bg-[#28282a] px-3 py-1.5 rounded"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
