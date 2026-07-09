import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Instagram, Mail, Send } from 'lucide-react';
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
      const passFloat = q<HTMLElement>('[data-hero-pass-float]');
      const passTilt = q<HTMLElement>('[data-hero-pass-tilt]');
      const passLanyard = q<HTMLElement>('[data-hero-pass-lanyard]');
      const scrollCue = q<HTMLElement>('[data-hero-scroll]');
      const detailItems = q<HTMLElement>('[data-hero-detail]');
      const mainChildren = [
        ...tag,
        ...headlineLines,
        ...role,
        ...description,
        ...ctas,
        ...detailItems,
        ...scrollCue,
      ];
      const mainRevealTargets = [
        ...tag,
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
        gsap.set(mainRevealTargets, {
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

      const firstIntroCard = introCards[0];

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
      if (firstIntroCard) {
        gsap.set(firstIntroCard, {
          autoAlpha: 1,
          y: 0,
          filter: 'blur(0px)',
          scale: 1,
        });
      }
      gsap.set(main, { autoAlpha: 0, clearProps: 'transform,filter' });
      gsap.set(headlineLines, { yPercent: 112, autoAlpha: 0, filter: 'blur(12px)' });
      setHidden([...tag, ...role, ...description, ...ctas, ...detailItems, ...scrollCue]);
      gsap.set(visual, {
        autoAlpha: 0,
        y: -190,
        rotate: -2.5,
        filter: 'blur(10px)',
        scale: 0.98,
        transformOrigin: '50% 0%',
        willChange: 'transform, opacity, filter',
      });
      gsap.set(passFloat, {
        y: 0,
        rotate: 0,
        transformOrigin: '50% 0%',
        willChange: 'transform',
      });
      gsap.set(passTilt, {
        rotateX: 0,
        rotateY: 0,
        transformPerspective: 900,
        transformOrigin: '50% 50%',
        willChange: 'transform',
      });

      const mm = gsap.matchMedia();
      const refreshFrames: number[] = [];
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
        gsap.set([...introLayers, ...main, ...headlineLines, ...mainRevealTargets], {
          autoAlpha: 1,
          clearProps: 'transform,filter,willChange',
        });
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

      const addPassCardReveal = (
        timeline: gsap.core.Timeline,
        labelOffset: string,
        yFrom: number,
        settleDuration: number
      ) => {
        timeline
          .addLabel('pass-card-in', labelOffset)
          .fromTo(visual, {
            autoAlpha: 0,
            y: yFrom,
            rotate: -2.5,
            filter: 'blur(10px)',
            scale: 0.98,
          }, {
            autoAlpha: 1,
            y: 8,
            rotate: 0.55,
            filter: 'blur(0px)',
            scale: 1,
            duration: settleDuration * 0.72,
            ease: 'power4.out',
          }, 'pass-card-in')
          .to(visual, {
            y: 0,
            rotate: 0,
            duration: settleDuration * 0.28,
            ease: 'sine.inOut',
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
            end: '+=450%',
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
          .set(firstIntroCard, { autoAlpha: 1, y: 0, filter: 'blur(0px)', scale: 1 }, 'intro-start')
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
          }, 'main-hero-in+=0.54');

        if (detailItems.length > 0) {
          timeline.to(detailItems, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.26,
            stagger: 0.06,
          }, 'main-hero-in+=0.48');
        }

        timeline
          .to(scrollCue, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.18,
          }, 'main-hero-in+=0.68')
          .to({}, { duration: 0.18 });

        addPassCardReveal(timeline, 'main-hero-in+=0.82', -210, 0.74);

        timeline
          .addLabel('navbar-in', 'pass-card-in+=0.22')
          .to({}, { duration: 0.46 });

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
            end: '+=440%',
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
          .set(firstIntroCard, { autoAlpha: 1, y: 0, filter: 'blur(0px)', scale: 1 }, 'intro-start')
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
          }, 'main-hero-in+=0.58');

        if (detailItems.length > 0) {
          timeline.to(detailItems, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.26,
            stagger: 0.05,
          }, 'main-hero-in+=0.52');
        }

        timeline
          .to(scrollCue, {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.24,
          }, 'main-hero-in+=0.7')
          .to({}, { duration: 0.16 });

        addPassCardReveal(timeline, 'main-hero-in+=0.86', -150, 0.68);

        timeline
          .addLabel('navbar-in', 'pass-card-in+=0.2')
          .to({}, { duration: 0.42 });

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

      scheduleHeroRefresh(2);

      const motionSafe = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
      const idleTween = motionSafe
        ? gsap.to(passFloat, {
          y: 7,
          rotate: 0.7,
          duration: 5.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        : null;
      const desktopParallax = window.matchMedia('(min-width: 768px)').matches;
      const passInteractiveArea = visual[0];
      const passCard = passTilt[0];
      const setTiltX = gsap.quickTo(passTilt, 'rotateX', { duration: 0.55, ease: 'power3.out' });
      const setTiltY = gsap.quickTo(passTilt, 'rotateY', { duration: 0.55, ease: 'power3.out' });
      const setCardX = gsap.quickTo(passTilt, 'x', { duration: 0.58, ease: 'power3.out' });
      const setCardY = gsap.quickTo(passTilt, 'y', { duration: 0.58, ease: 'power3.out' });
      const setLanyardX = gsap.quickTo(passLanyard, 'x', { duration: 0.72, ease: 'power3.out' });
      const setLanyardRotate = gsap.quickTo(passLanyard, 'rotate', { duration: 0.72, ease: 'power3.out' });
      let passCardRect: DOMRect | null = null;
      let pendingPointerEvent: PointerEvent | null = null;
      let pointerFrame = 0;

      const measurePassCard = () => {
        passCardRect = passInteractiveArea?.getBoundingClientRect() ?? null;
      };
      const invalidatePassCardRect = () => {
        passCardRect = null;
      };

      const updatePointerTilt = (event: PointerEvent) => {
        if (!desktopParallax || !passInteractiveArea || !passCard) return;

        const rect = passCardRect;
        if (!rect) return;

        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        const clampedX = gsap.utils.clamp(-0.5, 0.5, x);
        const clampedY = gsap.utils.clamp(-0.5, 0.5, y);

        passCard.style.setProperty('--pass-shine-x', `${(clampedX + 0.5) * 100}%`);
        passCard.style.setProperty('--pass-shine-y', `${(clampedY + 0.5) * 100}%`);
        passCard.style.setProperty('--pass-shine-opacity', '0.82');
        setTiltY(gsap.utils.clamp(-5, 5, clampedX * 9));
        setTiltX(gsap.utils.clamp(-4.5, 4.5, clampedY * -8));
        setCardX(clampedX * 8);
        setCardY(clampedY * 6);
        setLanyardX(clampedX * 3);
        setLanyardRotate(clampedX * 1.15);
      };

      const handlePointerMove = (event: PointerEvent) => {
        if (!desktopParallax || !passInteractiveArea || !passCard) return;

        pendingPointerEvent = event;
        if (pointerFrame) return;

        pointerFrame = requestAnimationFrame(() => {
          pointerFrame = 0;
          if (!pendingPointerEvent) return;

          updatePointerTilt(pendingPointerEvent);
          pendingPointerEvent = null;
        });
      };

      const resetPointerTilt = () => {
        pendingPointerEvent = null;
        if (pointerFrame) {
          cancelAnimationFrame(pointerFrame);
          pointerFrame = 0;
        }
        passCardRect = null;
        passCard?.style.setProperty('--pass-shine-opacity', '0');
        setTiltX(0);
        setTiltY(0);
        setCardX(0);
        setCardY(0);
        setLanyardX(0);
        setLanyardRotate(0);
      };

      passInteractiveArea?.addEventListener('pointerenter', measurePassCard);
      passInteractiveArea?.addEventListener('pointermove', handlePointerMove);
      passInteractiveArea?.addEventListener('pointerleave', resetPointerTilt);
      window.addEventListener('resize', invalidatePassCardRect, { passive: true });

      if (document.readyState === 'complete') {
        scheduleHeroRefresh(1);
      } else {
        didAddLoadListener = true;
        window.addEventListener('load', refreshHeroTrigger, { once: true });
      }

      return () => {
        isHeroMounted = false;
        refreshFrames.forEach((frameId) => cancelAnimationFrame(frameId));
        if (didAddLoadListener) {
          window.removeEventListener('load', refreshHeroTrigger);
        }
        idleTween?.kill();
        if (pointerFrame) {
          cancelAnimationFrame(pointerFrame);
        }
        passInteractiveArea?.removeEventListener('pointerenter', measurePassCard);
        passInteractiveArea?.removeEventListener('pointermove', handlePointerMove);
        passInteractiveArea?.removeEventListener('pointerleave', resetPointerTilt);
        window.removeEventListener('resize', invalidatePassCardRect);
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
          <span className="mb-4 font-mono text-[10px] font-semibold uppercase tracking-[0.42em] text-[#F08A8A]/95 md:mb-5">
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
        style={{ opacity: 0 }}
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
        style={{ opacity: 0 }}
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
        className="relative z-10 flex min-h-[100svh] min-h-[100dvh] flex-col items-center justify-center px-6 pb-28 pt-24 md:py-28"
      >
        <div className="mx-auto grid w-full max-w-6xl items-center gap-0 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
            <div data-hero-tag>
              <TagLabel text="Hello, I am..." className="mb-4" />
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
              Freelance Web Developer
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
            className="hero-pass-visual relative mx-auto mt-4 flex w-[min(82vw,320px)] justify-center pt-[8.5rem] sm:w-[min(78vw,330px)] md:mr-0 md:mt-0 md:w-full md:max-w-[360px] md:pt-0"
          >
            <div
              data-hero-pass-float
              className="relative w-full origin-top"
            >
              <div
                data-hero-pass-lanyard
                aria-hidden="true"
                className="hero-pass-lanyard pointer-events-none absolute left-1/2 top-[-126px] z-20 h-[150px] w-[132px] -translate-x-1/2 sm:top-[-140px] sm:h-[164px] sm:w-[144px] md:top-[-214px] md:h-[238px] md:w-[188px]"
              >
                <div className="hero-pass-strap hero-pass-strap-left absolute left-[32px] top-0 h-[126px] w-2 origin-bottom rotate-[-9deg] rounded-full sm:left-[36px] sm:h-[140px] sm:w-2.5 md:left-[48px] md:h-[210px] md:w-4" />
                <div className="hero-pass-strap hero-pass-strap-right absolute right-[32px] top-0 h-[126px] w-2 origin-bottom rotate-[9deg] rounded-full sm:right-[36px] sm:h-[140px] sm:w-2.5 md:right-[48px] md:h-[210px] md:w-4" />
                <div className="hero-pass-connector absolute bottom-[23px] left-1/2 h-7 w-11 -translate-x-1/2 rounded-[0.68rem] sm:h-8 sm:w-12 md:bottom-[30px] md:h-10 md:w-16" />
                <div className="hero-pass-ring absolute bottom-[8px] left-1/2 h-9 w-8 -translate-x-1/2 rounded-full sm:h-10 sm:w-9 md:bottom-[10px] md:h-11 md:w-10" />
                <div className="hero-pass-hook absolute bottom-[2px] left-1/2 h-4 w-7 -translate-x-1/2 rounded-full md:h-5 md:w-8" />
              </div>

              <div
                data-hero-pass-tilt
                className="hero-pass-card relative isolate aspect-[1/1.58] w-full overflow-hidden rounded-[1.55rem] border border-white/[0.1] bg-[linear-gradient(145deg,rgba(24,27,33,0.9),rgba(4,5,7,0.96)_54%,rgba(17,21,28,0.9))] px-6 pb-7 pt-12 text-left shadow-[0_34px_110px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.14),inset_0_-1px_0_rgba(96,165,250,0.08)] backdrop-blur-xl sm:px-7 md:px-8 md:pb-8 md:pt-14"
              >
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-4 z-10 h-4 w-[4.75rem] -translate-x-1/2 rounded-full border border-white/[0.14] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.98),rgba(0,0,0,0.86)_58%,rgba(255,255,255,0.08)_61%,rgba(255,255,255,0.02)_100%)] shadow-[inset_0_2px_8px_rgba(0,0,0,0.95),0_1px_0_rgba(255,255,255,0.08)] md:top-5 md:h-[1.1rem] md:w-20"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[1.55rem] bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent_22%,transparent_62%,rgba(96,165,250,0.08)_84%,transparent)] opacity-70" />
                <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-28 rotate-[24deg] bg-white/[0.055] blur-xl" />
                <div className="pointer-events-none absolute inset-px rounded-[1.45rem] border border-white/[0.05]" />

                <div className="relative z-10 flex h-full flex-col justify-center">
                  <div>
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.38em] text-[#7FA6D8]">
                      Personal Pass
                    </p>
                    <h2 className="mt-5 font-heading text-[clamp(2.1rem,8vw,3.2rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.045em] text-[#f0f0ee] md:text-[3.45rem]">
                      Dimas Akbar
                    </h2>
                    <p className="mt-3 text-sm font-medium text-[#a7abb3]">
                      Freelance Web Developer
                    </p>
                  </div>

                  <div className="my-7 h-px w-full bg-gradient-to-r from-transparent via-white/[0.18] to-transparent" />

                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3">
                      <Instagram
                        size={17}
                        strokeWidth={1.7}
                        className="mt-0.5 shrink-0 text-[#b8c7df]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                          Instagram
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#e2e2e2]">@dimasakbr29</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3">
                      <Send
                        size={17}
                        strokeWidth={1.7}
                        className="mt-0.5 shrink-0 text-[#b8c7df]"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                          Telegram
                        </p>
                        <p className="mt-1 text-sm font-semibold text-[#e2e2e2]">@DimmsSkuyyy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] px-3.5 py-3">
                      <Mail
                        size={17}
                        strokeWidth={1.7}
                        className="mt-0.5 shrink-0 text-[#b8c7df]"
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                          Email
                        </p>
                        <p className="mt-1 break-all text-sm font-semibold text-[#e2e2e2]">
                          dimasakbr299@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
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
