import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer
      className="w-full bg-black border-t border-[rgba(255,255,255,0.06)]"
      style={{ height: '64px' }}
    >
      <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6">
        <span className="text-[12px] text-[#9c9c9c] font-sans">
          &copy; 2026 DIMZ.DEV. All rights reserved.
        </span>
        <a
          href="https://github.com/DimasAkbarF"

          target="_blank"
          rel="noopener noreferrer"
          className="text-[#9c9c9c] hover:text-[#e2e2e2] transition-colors duration-300"
        >
          <Github size={20} />
        </a>
      </div>
    </footer>
  );
}
