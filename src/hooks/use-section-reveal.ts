import { type RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type SectionRevealOptions = {
  rootMargin?: string;
  itemSelector?: string;
  parallaxSelector?: string;
};

export function useSectionReveal(
  scope: RefObject<HTMLElement | null>,
  {
    rootMargin = 'top 78%',
    itemSelector = '[data-section-reveal]',
    parallaxSelector,
  }: SectionRevealOptions = {}
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const items = gsap.utils.toArray<HTMLElement>(itemSelector, root);
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      if (items.length > 0) {
        gsap.set(items, {
          autoAlpha: 0,
          y: isMobile ? 26 : 36,
          filter: isMobile ? 'blur(6px)' : 'blur(10px)',
          willChange: 'transform, opacity, filter',
        });

        gsap.to(items, {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.1,
          clearProps: 'transform,opacity,visibility,filter,willChange',
          scrollTrigger: {
            trigger: root,
            start: rootMargin,
            once: true,
          },
        });
      }

      if (parallaxSelector && window.matchMedia('(min-width: 768px)').matches) {
        const parallaxItems = gsap.utils.toArray<HTMLElement>(parallaxSelector, root);

        parallaxItems.forEach((item) => {
          gsap.to(item, {
            yPercent: -5,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          });
        });
      }
    },
    { scope }
  );
}
