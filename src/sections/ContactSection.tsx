import { useRef } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { TagLabel } from '@/components/TagLabel';
import { SectionHeading } from '@/components/SectionHeading';
import { useSectionReveal } from '@/hooks/use-section-reveal';

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useSectionReveal(sectionRef);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full pt-[120px] pb-[160px] bg-black"
    >
      <div
        ref={contentRef}
        className="relative z-10 max-w-[600px] mx-auto px-6 text-center flex flex-col items-center bg-black"
      >
        <div data-section-reveal>
          <TagLabel text="GET IN TOUCH" className="mb-4" />
        </div>

        <div data-section-reveal>
          <SectionHeading text="Let's Work Together" centered />
        </div>

        <p data-section-reveal className="mt-6 text-[13px] text-[#9c9c9c] leading-relaxed max-w-[440px]">
          Have a project in mind or just want to say hello? I'm always open to discussing new
          opportunities and interesting ideas.
        </p>

        <a
          data-section-reveal
          href="mailto:hello@dimz.dev"
          className="mt-8 font-heading text-[24px] font-bold tracking-[-0.5px] text-[#2563eb] hover:text-[#3b82f6] hover:underline underline-offset-4 transition-all duration-300"
        >
          hello@dimz.dev
        </a>

        <div data-section-reveal className="mt-8 flex items-center gap-6 bg-black">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="social-icon text-[#9c9c9c] hover:text-[#e2e2e2] hover:-translate-y-1 transition-all duration-300 transform"
              >
                <Icon size={20} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
