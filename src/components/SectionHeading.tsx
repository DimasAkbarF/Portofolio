interface SectionHeadingProps {
  text: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({ text, className = '', centered = false }: SectionHeadingProps) {
  return (
    <h2
      className={`font-heading text-[35px] font-bold tracking-[-1.4px] leading-[1.2] text-[#e2e2e2] ${centered ? 'text-center' : ''} ${className}`}
    >
      {text}
    </h2>
  );
}
