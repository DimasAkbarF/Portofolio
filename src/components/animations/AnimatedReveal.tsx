import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';

type AnimatedRevealProps = {
  children?: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li';
  style?: CSSProperties;
};

type RevealStyle = CSSProperties & {
  '--reveal-delay'?: string;
};

export function AnimatedReveal({
  children,
  className = '',
  delay = 0,
  as: Component = 'div',
  style,
}: AnimatedRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref as never}
      data-visible={visible}
      className={`rb-reveal ${className}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as RevealStyle}
    >
      {children}
    </Component>
  );
}
