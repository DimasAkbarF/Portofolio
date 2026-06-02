import { type CSSProperties } from 'react';

type SplitTextHeadingProps = {
  text: string;
  className?: string;
};

export function SplitTextHeading({ text, className = '' }: SplitTextHeadingProps) {
  return (
    <h2 className={`rb-split-heading ${className}`} aria-label={text}>
      {text.split(' ').map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="rb-split-word"
          style={{ '--word-delay': `${index * 70}ms` } as CSSProperties}
          aria-hidden="true"
        >
          {word}
        </span>
      ))}
    </h2>
  );
}
