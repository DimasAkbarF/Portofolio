import { useEffect } from 'react';
import { Folio } from '@/components/Folio';
import { mountScrollcraft } from '@/lib/scrollcraft';
import { TitlePage } from '@/sections/TitlePage';
import { WhoChapter } from '@/sections/WhoChapter';
import { WorkChapter } from '@/sections/WorkChapter';
import { RouteChapter } from '@/sections/RouteChapter';
import { ProofChapter } from '@/sections/ProofChapter';
import { Colophon } from '@/sections/Colophon';

export default function App() {
  useEffect(() => {
    // Booting the engine measures the document and rewrites element heights,
    // which is real main-thread work. Let the browser commit the first paint
    // of the hero before it runs, so the motion layer is an enhancement rather
    // than a cost paid against LCP.
    // web.dev/articles/optimize-long-tasks
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => mountScrollcraft());
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  return (
    <>
      <div className="sc-grain" aria-hidden="true" />
      <div data-sc-progress aria-hidden="true" />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Folio />

      <main id="main-content" tabIndex={-1}>
        <TitlePage />
        <WhoChapter />
        <WorkChapter />
        <RouteChapter />
        <ProofChapter />
      </main>

      <Colophon />
    </>
  );
}
