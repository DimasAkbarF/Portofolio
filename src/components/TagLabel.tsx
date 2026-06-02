interface TagLabelProps {
  text: string;
  className?: string;
}

export function TagLabel({ text, className = '' }: TagLabelProps) {
  return (
    <span
      className={`inline-block font-mono text-[11px] uppercase tracking-[1.5px] text-[#9c9c9c] ${className}`}
    >
      {text}
    </span>
  );
}
