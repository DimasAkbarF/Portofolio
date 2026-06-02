import { type MouseEvent, useEffect, useRef, useState } from 'react';

const navItems = [
  { label: 'Beranda', target: 'home' },
  { label: 'Tentang', target: 'about' },
  { label: 'Keahlian', target: 'skills' },
  { label: 'Proyek', target: 'projects' },
  { label: 'Pengalaman', target: 'experience' },
  { label: 'Sertifikat', target: 'achievements' },
  { label: 'Kontak', target: 'contact' },
];

const sectionTargets = navItems
  .filter((item) => item.target !== 'home')
  .map((item) => item.target);

export function Navigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(true);
  const [isDesktopTabletNavVisible, setIsDesktopTabletNavVisible] = useState(true);
  const [isHeroNavigationVisible, setIsHeroNavigationVisible] = useState(false);
  const lastScrollYRef = useRef(0);
  const desktopTabletLastScrollYRef = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const syncHeroNavigationVisibility = (isVisible: boolean) => {
      setIsHeroNavigationVisible(isVisible);
      if (!isVisible) {
        setIsMenuOpen(false);
      }
    };

    const handleHeroNavigationVisibility = (event: Event) => {
      const { isVisible } = (event as CustomEvent<{ isVisible: boolean }>).detail;
      syncHeroNavigationVisibility(isVisible);
    };

    window.addEventListener('hero:navigation-visibility', handleHeroNavigationVisibility);
    syncHeroNavigationVisibility(
      document.documentElement.dataset.heroNavigationVisible === 'true'
    );

    return () => {
      window.removeEventListener('hero:navigation-visibility', handleHeroNavigationVisibility);
    };
  }, []);

  useEffect(() => {
    const observedTargets = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-28% 0px -46% 0px',
        threshold: 0,
      }
    );

    const observeSections = () => {
      sectionTargets.forEach((target) => {
        if (observedTargets.has(target)) return;

        const section = document.getElementById(target);
        if (section) {
          observer.observe(section);
          observedTargets.add(target);
        }
      });
    };

    observeSections();

    const mutationObserver = new MutationObserver(observeSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);

      if (window.scrollY < 120) {
        setActiveSection('home');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const threshold = 10;
    const mobileQuery = window.matchMedia('(max-width: 767px)');

    lastScrollYRef.current = window.scrollY;

    const handleMobileNavVisibility = () => {
      if (!mobileQuery.matches) {
        setIsMobileNavVisible(true);
        lastScrollYRef.current = window.scrollY;
        return;
      }

      if (isMenuOpen) {
        setIsMobileNavVisible(true);
        lastScrollYRef.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollYRef.current;

      if (currentScrollY <= 8) {
        setIsMobileNavVisible(true);
        lastScrollYRef.current = currentScrollY;
        return;
      }

      if (Math.abs(scrollDelta) < threshold) return;

      setIsMobileNavVisible(scrollDelta < 0);
      lastScrollYRef.current = currentScrollY;
    };

    handleMobileNavVisibility();
    window.addEventListener('scroll', handleMobileNavVisibility, {
      passive: true,
    });
    mobileQuery.addEventListener('change', handleMobileNavVisibility);

    return () => {
      window.removeEventListener('scroll', handleMobileNavVisibility);
      mobileQuery.removeEventListener('change', handleMobileNavVisibility);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const threshold = 12;
    const desktopTabletQuery = window.matchMedia('(min-width: 768px)');

    desktopTabletLastScrollYRef.current = window.scrollY;

    const handleDesktopTabletNavVisibility = () => {
      if (!desktopTabletQuery.matches) {
        setIsDesktopTabletNavVisible(true);
        desktopTabletLastScrollYRef.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - desktopTabletLastScrollYRef.current;

      if (currentScrollY <= 20) {
        setIsDesktopTabletNavVisible(true);
        desktopTabletLastScrollYRef.current = currentScrollY;
        return;
      }

      if (Math.abs(scrollDelta) < threshold) return;

      setIsDesktopTabletNavVisible(scrollDelta < 0);
      desktopTabletLastScrollYRef.current = currentScrollY;
    };

    handleDesktopTabletNavVisibility();
    window.addEventListener('scroll', handleDesktopTabletNavVisibility, {
      passive: true,
    });
    desktopTabletQuery.addEventListener('change', handleDesktopTabletNavVisibility);

    return () => {
      window.removeEventListener('scroll', handleDesktopTabletNavVisibility);
      desktopTabletQuery.removeEventListener('change', handleDesktopTabletNavVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const header = headerRef.current;
      const menu = mobileMenuRef.current;
      const target = event.target as Node;

      if (header?.contains(target) || menu?.contains(target)) return;

      setIsMenuOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isMenuOpen]);

  const handleNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    target: string
  ) => {
    event.preventDefault();
    setIsMenuOpen(false);

    if (target === 'home') {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    document.getElementById(target)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const renderLink = (item: (typeof navItems)[number], isMobile = false) => {
    const isActive = activeSection === item.target;

    return (
      <a
        key={item.target}
        href={item.target === 'home' ? '#' : `#${item.target}`}
        onClick={(event) => handleNavigate(event, item.target)}
        className={
          isMobile
            ? `block rounded-[14px] border-l px-4 py-3 text-[15px] font-medium leading-5 transition-[background-color,border-color,color] duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 ${
                isActive
                  ? 'border-l-white/55 bg-white/[0.07] text-white'
                  : 'border-l-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100'
              }`
            : `text-[13px] font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/70 ${
                isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`
        }
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
      </a>
    );
  };

  const shouldShowMobileNavigation =
    isHeroNavigationVisible && (isMobileNavVisible || isMenuOpen);
  const shouldShowDesktopTabletNavigation =
    isHeroNavigationVisible && isDesktopTabletNavVisible;

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-[999] px-4 py-4 transition-[transform,opacity] duration-300 ease-out ${
        shouldShowMobileNavigation
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        shouldShowDesktopTabletNavigation
          ? 'md:translate-y-0 md:opacity-100 md:pointer-events-auto'
          : 'md:-translate-y-full md:opacity-0 md:pointer-events-none'
      }`}
    >
      <nav
        className={`mx-auto flex h-[52px] max-w-6xl items-center justify-between rounded-[22px] border px-3.5 transition-all duration-300 lg:h-14 lg:rounded-full lg:px-5 ${
          isScrolled || isMenuOpen
            ? 'border-white/[0.12] bg-[#050505]/95 shadow-[0_10px_30px_rgba(0,0,0,0.22)] lg:border-white/[0.12] lg:bg-black/85 lg:shadow-[0_16px_50px_rgba(0,0,0,0.32)]'
            : 'border-white/[0.08] bg-[#050505]/88 shadow-none lg:border-white/[0.08] lg:bg-black/55'
        } backdrop-blur-md lg:backdrop-blur-xl`}
        aria-label="Primary navigation"
      >
        <a
          href="#"
          onClick={(event) => handleNavigate(event, 'home')}
          className="font-heading text-[13px] font-bold uppercase tracking-[0.04em] text-[#e2e2e2] transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/70"
          aria-label="Kembali ke beranda"
        >
          Dimz.dev
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => renderLink(item))}
        </div>

        <button
          type="button"
          className={`relative z-[1001] inline-flex h-11 min-h-11 min-w-11 items-center gap-2 rounded-[14px] border px-3 text-[12px] font-medium transition-[background-color,border-color,color] duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 lg:hidden ${
            isMenuOpen
              ? 'border-white/20 bg-white/[0.08] text-white'
              : 'border-white/[0.12] bg-transparent text-zinc-300 hover:border-white/20 hover:bg-white/[0.04] hover:text-white'
          }`}
          aria-label={isMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
          <span className="relative h-3.5 w-4" aria-hidden="true">
            <span
              className={`absolute left-0 top-[4px] h-px w-4 bg-current transition-transform duration-200 motion-reduce:transition-none ${
                isMenuOpen ? 'translate-y-[3px] rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-1 top-[10px] h-px w-3 bg-current transition-[left,width,transform] duration-200 motion-reduce:transition-none ${
                isMenuOpen ? 'left-0 w-4 -translate-y-[3px] -rotate-45' : ''
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        ref={mobileMenuRef}
        id="mobile-navigation"
        className={`fixed left-4 right-4 top-[76px] z-[1000] mx-auto max-w-6xl overflow-hidden rounded-[20px] border border-white/[0.1] bg-[#080808] shadow-[0_14px_34px_rgba(0,0,0,0.32)] transition-[max-height,opacity,transform,visibility] duration-200 motion-reduce:transition-none lg:hidden ${
          isMenuOpen
            ? 'visible pointer-events-auto max-h-[430px] translate-y-0 opacity-100'
            : 'invisible pointer-events-none max-h-0 -translate-y-2 opacity-0'
        }`}
      >
        <div className="grid gap-1.5 p-2.5">
          {navItems.map((item) => renderLink(item, true))}
        </div>
      </div>
    </header>
  );
}
