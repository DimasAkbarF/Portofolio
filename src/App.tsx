import { lazy, Suspense } from 'react';
import { Navigation } from '@/components/Navigation';
import { ScrollIndicator } from '@/components/ScrollIndicator';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/sections/HeroSection';

const AboutSection = lazy(() =>
  import('@/sections/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const ProjectsSection = lazy(() =>
  import('@/sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection }))
);
const AchievementsSection = lazy(() =>
  import('@/sections/AchievementsSection').then((m) => ({ default: m.AchievementsSection }))
);
const SkillsSection = lazy(() =>
  import('@/sections/SkillsSection').then((m) => ({ default: m.SkillsSection }))
);
const ExperienceSection = lazy(() =>
  import('@/sections/ExperienceSection').then((m) => ({ default: m.ExperienceSection }))
);
const ContactSection = lazy(() =>
  import('@/sections/ContactSection').then((m) => ({ default: m.ContactSection }))
);

function SectionFallback() {
  return <div className="h-40 bg-black" aria-hidden />;
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <ScrollIndicator />

      <main>
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
