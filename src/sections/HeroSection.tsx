import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { TagLabel } from '@/components/TagLabel';
import { PillButton } from '@/components/PillButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);
ScrollTrigger.config({ ignoreMobileResize: true });

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;

      const q = gsap.utils.selector(hero);
      const introCards = q<HTMLElement>('[data-hero-intro-card]');
      const introLayers = [...introCards];
      const main = q<HTMLElement>('[data-hero-main]');
      const tag = q<HTMLElement>('[data-hero-tag]');
      const headlineLines = q<HTMLElement>('[data-hero-line]');
      const role = q<HTMLElement>('[data-hero-role]');
      const description = q<HTMLElement>('[data-hero-description]');
      const ctas = q<HTMLElement>('[data-hero-cta]');
      const visual = q<HTMLElement>('[data-hero-visual]');
      const scrollCue = q<HTMLElement>('[data-hero-scroll]');
      const detailItems = q<HTMLElement>('[data-hero-detail]');
      const mainChildren = [
        ...tag,
        ...headlineLines,
        ...role,
        ...description,
        ...ctas,
        ...visual,
        ...detailItems,
        ...scrollCue,
      ];

      const killHeroTimeline = () => {
        timelineRef.current?.scrollTrigger?.kill();
        timelineRef.current?.kill();
        timelineRef.current = null;

        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === hero) {
            trigger.kill();
          }
        });
      };

      const setHidden = (targets: gsap.TweenTarget) => {
        gsap.set(targets, {
          autoAlpha: 0,
          y: 30,
          filter: 'blur(14px)',
          scale: 0.98,
          willChange: 'transform, opacity, filter',
        });
      };

      const setNavigationVisible = (isVisible: boolean) => {
        document.documentElement.dataset.heroNavigationVisible = String(isVisible);
        window.dispatchEvent(
          new CustomEvent('hero:navigation-visibility', {
            detail: { isVisible },
          })
        );
      };

      const showMainContent = () => {
        gsap.killTweensOf([...introLayers, ...mainChildren]);
        gsap.set(introLayers, {
          autoAlpha: 0,
          y: -28,
          filter: 'blur(8px)',
          scale: 1,
          clearProps: 'willChange',
        });
        gsap.set(main, { autoAlpha: 1 });
        gsap.set(headlineLines, {
          autoAlpha: 1,
          yPercent: 0,
          filter: 'blur(0px)',
          clearProps: 'willChange',
        });
        gsap.set([tag, role, description, ctas, visual, detailItems, scrollCue], {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
          clearProps: 'willChange',
        });
        gsap.set(visual, { scale: 1 });
      };

      if (
        introCards.length === 0 ||
        main.length === 0 ||
        headlineLines.length === 0
      ) {
        showMainContent();
        setNavigationVisible(true);
        return;
      }

      killHeroTimeline();
      setNavigationVisible(false);
      gsap.killTweensOf([...introLayers, ...main, ...mainChildren]);
      gsap.set(introLayers, {
        autoAlpha: 0,
        y: 32,
        filter: 'blur(10px)',
        scale: 0.98,
        willChange: 'transform, opacity, filter',
      });
      gsap.set(main, { autoAlpha: 0, clearProps: 'transform,filter' });
      gsap.set(headlineLines, { yPercent: 112, autoAlpha: 0, filter: 'blur(12px)' });
      setHidden([...tag, ...role, ...description, ...ctas, ...visual, ...detailItems, ...scrollCue]);

      const mm = gsap.matchMedia();
      const refreshFrames: number[] = [];
      const refreshTimeouts: number[] = [];
      let isHeroMounted = true;
      let didAddLoadListener = false;
      const refreshHeroTrigger = () => {
        if (!isHeroMounted) return;

        ScrollTrigger.sort();
        timelineRef.current?.scrollTrigger?.refresh();
        timelineRef.current?.scrollTrigger?.update();
        ScrollTrigger.refresh(true);
      };
      const scheduleHeroRefresh = (frameCount = 1) => {
        const tick = (remainingFrames: number) => {
          const frameId = requestAnimationFrame(() => {
            if (!isHeroMounted) return;

            if (remainingFrames <= 1) {
              refreshHeroTrigger();
              return;
            }

            tick(remainingFrames - 1);
          });

          refreshFrames.push(frameId);
        };

        tick(frameCount);
      };

      document.fonts?.ready.then(refreshHeroTrigger).catch(() => undefined);

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          [introCards, main, tag, headlineLines, role, description, ctas, visual, detailItems, scrollCue],
          {
            autoAlpha: 1,
            clearProps: 'transform,filter,willChange',
          }
        );
        gsap.set(introCards, { autoAlpha: 0 });
        showMainContent();
        setNavigationVisible(true);
      });

      const addIntroCardSequence = (timeline: gsap.core.Timeline, cards: HTMLElement[], holdDuration: number) => {
        cards.forEach((card, index) => {
          const language = card.dataset.heroIntroCard ?? `intro-${index + 1}`;

          timeline
            .addLabel(`${language}-in`)
            .to(card, {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              scale: 1,
              duration: 0.42,
              ease: 'power3.out',
            })
            .to({}, { duration: holdDuration })
            .addLabel(`${language}-out`)
            .to(card, {
              autoAlpha: 0,
              y: -28,
              filter: 'blur(8px)',
              duration: 0.4,
              ease: 'power2.inOut',
            })
            .set(card, { autoAlpha: 0, pointerEvents: 'none' })
            .to({}, { duration: 0.16 });
        });
      };

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        let isNavigationVisible = false;
        let navbarStartProgress = 1;
        const syncNavigationFromProgress = (progress: number) => {
          const shouldShowNavigation = progress >= navbarStartProgress;

          if (shouldShowNavigation !== isNavigationVisible) {
            isNavigationVisible = shouldShowNavigation;
            setNavigationVisible(shouldShowNavigation);
          }
        };

        const timeline = gsap.timeline({
          defaults: {
            ease: 'power3.out',
            overwrite: 'auto',
          },
          scrollTrigger: {
            id: 'hero-intro-desktop',
            trigger: hero,
            start: 'top top',
            end: '+=420%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onUpdate: (self) => syncNavigationFromProgress(self.progress),
            onRefresh: (self) => syncNavigationFromProgress(self.progress),
            onLeave: () => setNavigationVisible(true),
            onEnterBack: (self) => syncNavigationFromProgress(self.progress),
          },
        });
        timelineRef.current = timeline;

        timeline
          .addLabel('intro-start', 0)
          .set(main, { autoAlpha: 0 }, 'intro-start')
          .set(introLayers, { autoAlpha: 0, y: 32, filter: 'blur(10px)', scale: 0.98 }, 'intro-start')
          .set(mainChildren, { autoAlpha: 0 }, 'intro-start')
          .to({}, { duration: 0.45 }, 'intro-start');

        addIntroCardSequence(timeline, introCards, 0.28);

        timeline
          .set(introLayers, {
            autoAlpha: 0,
            pointerEvents: 'none',
            clearProps: 'willChange',
          })
          .to({}, { duration: 0.18 })
          .addLabel('main-hero-in')
          .to(main, { autoAlpha: 1, duration: 0.01, immediateRender: false }, 'main-hero-in')
          .to(tag, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.24,
          }, 'main-hero-in+=0.04')
          .to(headlineLines, {
            autoAlpha: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            duration: 0.56,
            stagger: 0.09,
          }, 'main-hero-in+=0.12')
          .to(role, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.28,
          }, 'main-hero-in+=0.36')
          .to(description, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.3,
          }, 'main-hero-in+=0.44')
          .to(ctas, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.28,
            stagger: 0.08,
          }, 'main-hero-in+=0.54')
          .to(visual, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.46,
          }, 'main-hero-in+=0.22')
          .to(detailItems, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.26,
            stagger: 0.06,
          }, 'main-hero-in+=0.48')
          .to(scrollCue, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.18,
          }, 'main-hero-in+=0.68')
          .addLabel('navbar-in', 'main-hero-in+=0.1')
          .to({}, { duration: 0.42 });

        navbarStartProgress = timeline.labels['navbar-in'] / timeline.duration();

        return () => {
          timeline.kill();
          if (timelineRef.current === timeline) {
            timelineRef.current = null;
          }
          setNavigationVisible(false);
        };
      });

      mm.add('(max-width: 767.98px) and (prefers-reduced-motion: no-preference)', () => {
        let isNavigationVisible = false;
        let navbarStartProgress = 1;
        const syncNavigationFromProgress = (progress: number) => {
          const shouldShowNavigation = progress >= navbarStartProgress;

          if (shouldShowNavigation !== isNavigationVisible) {
            isNavigationVisible = shouldShowNavigation;
            setNavigationVisible(shouldShowNavigation);
          }
        };

        const timeline = gsap.timeline({
          defaults: {
            ease: 'power3.out',
            overwrite: 'auto',
          },
          scrollTrigger: {
            id: 'hero-intro-mobile',
            trigger: hero,
            start: 'top top',
            end: '+=400%',
            scrub: 1,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onEnter: () => setNavigationVisible(false),
            onUpdate: (self) => syncNavigationFromProgress(self.progress),
            onRefresh: (self) => syncNavigationFromProgress(self.progress),
            onLeave: () => setNavigationVisible(true),
            onEnterBack: (self) => syncNavigationFromProgress(self.progress),
            onLeaveBack: () => setNavigationVisible(false),
          },
        });
        timelineRef.current = timeline;

        timeline
          .addLabel('intro-start', 0)
          .set(main, { autoAlpha: 0 }, 'intro-start')
          .set(introLayers, { autoAlpha: 0, y: 32, filter: 'blur(10px)', scale: 0.98 }, 'intro-start')
          .set(mainChildren, { autoAlpha: 0 }, 'intro-start')
          .to({}, { duration: 0.42 }, 'intro-start');

        addIntroCardSequence(timeline, introCards, 0.3);

        timeline
          .set(introLayers, {
            autoAlpha: 0,
            pointerEvents: 'none',
            clearProps: 'willChange',
          })
          .to({}, { duration: 0.16 })
          .addLabel('main-hero-in')
          .to(main, { autoAlpha: 1, duration: 0.01, immediateRender: false }, 'main-hero-in')
          .to(tag, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.34,
          }, 'main-hero-in+=0.04')
          .to(headlineLines, {
            autoAlpha: 1,
            yPercent: 0,
            filter: 'blur(0px)',
            duration: 0.54,
            stagger: 0.08,
          }, 'main-hero-in+=0.12')
          .to([role, description], {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.38,
            stagger: 0.08,
          }, 'main-hero-in+=0.42')
          .to(ctas, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.34,
            stagger: 0.07,
          }, 'main-hero-in+=0.58')
          .to(visual, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.44,
          }, 'main-hero-in+=0.26')
          .to(detailItems, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.26,
            stagger: 0.05,
          }, 'main-hero-in+=0.52')
          .to(scrollCue, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.24,
          }, 'main-hero-in+=0.7')
          .addLabel('navbar-in', 'main-hero-in+=0.1')
          .to({}, { duration: 0.36 });

        navbarStartProgress = timeline.labels['navbar-in'] / timeline.duration();
        timeline.scrollTrigger?.refresh();
        timeline.scrollTrigger?.update();

        if (!timeline.scrollTrigger) {
          showMainContent();
          setNavigationVisible(true);
        }

        return () => {
          timeline.kill();
          if (timelineRef.current === timeline) {
            timelineRef.current = null;
          }
          setNavigationVisible(false);
        };
      });

      refreshHeroTrigger();
      scheduleHeroRefresh(1);
      scheduleHeroRefresh(2);
      refreshTimeouts.push(window.setTimeout(refreshHeroTrigger, 180));
      refreshTimeouts.push(window.setTimeout(refreshHeroTrigger, 600));

      if (document.readyState === 'complete') {
        scheduleHeroRefresh(1);
      } else {
        didAddLoadListener = true;
        window.addEventListener('load', refreshHeroTrigger, { once: true });
      }

      return () => {
        isHeroMounted = false;
        refreshFrames.forEach((frameId) => cancelAnimationFrame(frameId));
        refreshTimeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
        if (didAddLoadListener) {
          window.removeEventListener('load', refreshHeroTrigger);
        }
        mm.revert();
        killHeroTimeline();
        setNavigationVisible(false);
      };
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] min-h-[100dvh] w-full overflow-hidden bg-black"
      aria-label="Intro"
    >
      <div className="absolute inset-0 z-0 bg-black" />

      <div
        className="absolute top-0 left-0 right-0 z-[5] pointer-events-none"
        style={{ height: '120px' }}
      />

      <div
        data-hero-intro-card="japanese"
        className="pointer-events-none absolute inset-0 z-10 flex min-h-[100svh] min-h-[100dvh] items-center justify-center px-6 text-center"
      >
        <div className="flex max-w-[92vw] flex-col items-center">
          <span className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-[#D86C6C]/80 md:mb-5">
            JP
          </span>
          <p className="font-heading text-[clamp(2.4rem,14vw,4.5rem)] font-extrabold leading-[0.92] tracking-[0.02em] text-[#F5F1E8] md:text-[clamp(3rem,9vw,8rem)]">
            こんにちは
          </p>
          <p className="mt-5 font-heading text-[clamp(0.9rem,4vw,1.15rem)] font-semibold leading-relaxed tracking-[0.08em] text-[#D86C6C]/85 md:mt-6 md:text-[clamp(1rem,2vw,1.5rem)]">
            私はディマス・アクバルです
          </p>
          <span className="mt-5 h-px w-14 bg-[#D86C6C]/45 md:mt-6" />
        </div>
      </div>

      <div
        data-hero-intro-card="korean"
        className="pointer-events-none absolute inset-0 z-10 flex min-h-[100svh] min-h-[100dvh] items-center justify-center px-6 text-center"
      >
        <div className="flex max-w-[92vw] flex-col items-center">
          <span className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-[#7FA6D8]/80 md:mb-5">
            KR
          </span>
          <p className="font-heading text-[clamp(2.4rem,14vw,4.5rem)] font-extrabold leading-[0.92] tracking-[0.01em] text-[#EEF3F8] md:text-[clamp(3rem,9vw,8rem)]">
            안녕하세요
          </p>
          <p className="mt-5 font-heading text-[clamp(0.9rem,4vw,1.15rem)] font-semibold leading-relaxed tracking-[0.06em] text-[#7FA6D8]/85 md:mt-6 md:text-[clamp(1rem,2vw,1.5rem)]">
            저는 디마스 아크바르입니다
          </p>
          <span className="mt-5 h-px w-14 bg-[#7FA6D8]/45 md:mt-6" />
        </div>
      </div>

      <div
        data-hero-intro-card="chinese"
        className="pointer-events-none absolute inset-0 z-10 flex min-h-[100svh] min-h-[100dvh] items-center justify-center px-6 text-center"
      >
        <div className="flex max-w-[92vw] flex-col items-center">
          <span className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-[#C96A4A]/80 md:mb-5">
            CN
          </span>
          <p className="font-heading text-[clamp(2.4rem,14vw,4.5rem)] font-extrabold leading-[0.92] tracking-[0.04em] text-[#E8C76A] md:text-[clamp(3rem,9vw,8rem)]">
            你好
          </p>
          <p className="mt-5 font-heading text-[clamp(0.9rem,4vw,1.15rem)] font-semibold leading-relaxed tracking-[0.08em] text-[#C96A4A]/85 md:mt-6 md:text-[clamp(1rem,2vw,1.5rem)]">
            我是迪马斯·阿克巴尔
          </p>
          <span className="mt-5 h-px w-14 bg-[#C96A4A]/45 md:mt-6" />
        </div>
      </div>

      <div
        data-hero-main
        className="relative z-10 flex min-h-[100svh] min-h-[100dvh] flex-col items-center justify-center px-6 py-24 md:py-28"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
            <div data-hero-tag>
              <TagLabel text="Halo saya" className="mb-4" />
            </div>

            <h1 aria-label="Dimas Akbar">
              <div className="overflow-hidden">
                <span
                  data-hero-line
                  className=" font-heading text-[65px] font-bold leading-[1.1] tracking-[-2.6px] text-[#e2e2e2] sm:text-[84px] md:text-[96px] lg:text-[118px]"
                >
                  Dimas
                </span>
              </div>
              <div className="overflow-hidden">
                <span
                  data-hero-line
                  className=" font-heading text-[65px] font-bold leading-[1.1] tracking-[-2.6px] text-[#e2e2e2] sm:text-[84px] md:text-[96px] lg:text-[118px]"
                >
                  Akbar
                </span>
              </div>
            </h1>

            <p
              data-hero-role
              className="mt-5 font-mono text-[11px] uppercase tracking-[0.32em] text-[#2563eb]"
            >
              Frelance Web Dev
            </p>

            <p
              data-hero-description
              className="mt-4 max-w-[440px] text-[13px] leading-relaxed text-[#9c9c9c] shadow-xl md:text-[14px]"
            >
              Crafting interactive web experiences with modern technologies. Passionate about
              performance, animations, and user-centric design.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 shadow md:justify-start">
              <span data-hero-cta>
                <PillButton href="#projects">View My Work</PillButton>
              </span>
              <span data-hero-cta>
                <PillButton href="#contact">Contact Me</PillButton>
              </span>
            </div>
          </div>

          <div
            data-hero-visual
            className="relative mx-auto w-full max-w-[360px] scale-[0.96] md:mr-0"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.42)] backdrop-blur-sm md:p-7">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-[#2563eb]/10 blur-3xl" />
                <div className="absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-white/[0.035] blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="mb-10 flex items-center justify-between gap-5">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-500">
                      Portfolio
                    </p>
                    <p className="mt-2 font-heading text-2xl font-semibold tracking-[-0.04em] text-[#e2e2e2]">
                      Motion-first UI
                    </p>
                  </div>

                  <div className="grid h-12 w-12 place-items-center rounded-full border border-white/[0.08] bg-black text-sm font-semibold text-[#2563eb]">
                    DA
                  </div>
                </div>

                <div className="space-y-3">
                  {['React interfaces', 'GSAP storytelling', 'Responsive systems'].map((item) => (
                    <div
                      key={item}
                      data-hero-detail
                      className="flex items-center justify-between rounded-2xl border border-white/[0.07] bg-black/50 px-4 py-3 text-xs text-zinc-400"
                    >
                      <span>{item}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2563eb] shadow-[0_0_16px_rgba(37,99,235,0.75)]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          data-hero-scroll
          className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        >
          <span className="font-mono text-[11px] uppercase tracking-[1.5px] text-[#2563eb]">
            Scroll to explore
          </span>
          <ChevronDown size={16} className="text-[#2563eb]" />
        </div>
      </div>
    </section>
  );
}
