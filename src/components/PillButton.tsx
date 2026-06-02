import type { ReactNode } from 'react';

interface PillButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function PillButton({ children, href, onClick, className = '' }: PillButtonProps) {
  const baseClasses =
    'inline-block px-6 py-3 border border-white/15 rounded-full font-heading text-xs font-bold uppercase tracking-[0.4px] text-[#e2e2e2] transition-all duration-400 ease-in-out hover:border-[rgba(37,99,235,0.5)] hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] hover:text-[#2563eb] cursor-pointer bg-transparent';

  if (href) {
    return (
      <a href={href} className={`${baseClasses} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${className}`}>
      {children}
    </button>
  );
}
