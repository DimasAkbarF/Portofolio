import { lazy, Suspense, type ComponentType } from 'react';
import { Navigation } from '@/components/Navigation';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';

const lazySection = <T extends Record<string, unknown>>(
  loader: () => Promise<T>,
  exportName: keyof T
) =>
  lazy(() =>
    loader().then((module) => ({
      default: module[exportName] as ComponentType,
    }))
  );

const AboutSection = lazySection(
  () => import('@/sections/AboutSection'),
  'AboutSection'
);
const SkillsSection = lazySection(
  () => import('@/sections/SkillsSection'),
  'SkillsSection'
);
const ProjectsSection = lazySection(
  () => import('@/sections/ProjectsSection'),
  'ProjectsSection'
);
const ExperienceSection = lazySection(
  () => import('@/sections/ExperienceSection'),
  'ExperienceSection'
);
const AchievementsSection = lazySection(
  () => import('@/sections/AchievementsSection'),
  'AchievementsSection'
);
const ContactSection = lazySection(
  () => import('@/sections/ContactSection'),
  'ContactSection'
);

function SectionFallback() {
  return <div className="h-40 bg-black" aria-hidden />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navigation />
      <ScrollIndicator />

      <main id="main-content" tabIndex={-1}>
        <nav className="sr-only" aria-label="Breadcrumb">
          <ol>
            <li>
              <a href="https://dimz.dev/">Home</a>
            </li>
          </ol>
        </nav>
        <HeroSection />

        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <AchievementsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
