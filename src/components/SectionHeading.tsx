import type { ReactNode } from 'react';

interface SectionHeadingProps {
  text: ReactNode;
  className?: string;
  centered?: boolean;
  id?: string;
}

export function SectionHeading({ text, className = '', centered = false, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className={`font-heading text-[35px] font-bold tracking-[-1.4px] leading-[1.2] text-[#e2e2e2] ${centered ? 'text-center' : ''} ${className}`}
    >
      {text}
    </h2>
  );
}
