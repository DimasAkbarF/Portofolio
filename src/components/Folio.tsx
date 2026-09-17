import { useEffect, useState } from 'react';
import { chapters, landmarks } from '@/lib/landmarks';

/**
 * The press proof margin. A bespoke apparatus — not an engine device.
 *
 * As each chapter is read its stamp presses into the margin and stays pressed,
 * so the left edge accumulates the reading. The folio number walks all six
 * leaves; the stamps only mark the four chapters. It flips its own ink when a
 * dark plate is under it, and below 1024px it folds into a bottom rail rather
 * than disappearing.
 */
export function Folio() {
  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(-1);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = window.scrollY;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    const read = () => {
      frame = 0;
      const mid = window.innerHeight * 0.42;
      let idx = 0;
      for (let i = 0; i < landmarks.length; i++) {
        const el = document.getElementById(landmarks[i].id);
        if (el && el.getBoundingClientRect().top <= mid) idx = i;
      }
      const atEnd =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atEnd) idx = landmarks.length - 1;
      setActive(idx);
      setReached((prev) => {
        const activeChapter = chapters.reduce(
          (acc, c, ci) => (landmarks.findIndex((l) => l.id === c.id) <= idx ? ci : acc),
          -1
        );
        return Math.max(prev, activeChapter);
      });

      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      setHidden((prev) => {
        if (reduce.matches || y < 100) return false;
        if (dy > 6) return true;
        if (dy < -6) return false;
        return prev;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    reduce.addEventListener('change', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      reduce.removeEventListener('change', onScroll);
    };
  }, []);

  const current = landmarks[active] ?? landmarks[0];
  const folioNum = String(active + 1).padStart(2, '0');
  const total = String(landmarks.length).padStart(2, '0');

  return (
    <nav
      className="folio"
      data-tone={current.tone}
      data-hidden={hidden ? 'true' : 'false'}
      aria-label="Chapters"
    >
      <div>
        <span className="folio__mark" aria-hidden="true">
          DA
        </span>
      </div>

      <ol className="folio__stamps">
        {chapters.map((c, ci) => {
          const isActive = current.id === c.id;
          const isPressed = ci <= reached;
          return (
            <li key={c.id}>
              <a
                className="stamp"
                href={`#${c.id}`}
                aria-label={`${c.num} ${c.label}`}
                data-pressed={isPressed ? 'true' : 'false'}
                data-active={isActive ? 'true' : 'false'}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="stamp__num">{c.num}</span>
                <span className="stamp__label">{c.label}</span>
              </a>
            </li>
          );
        })}
      </ol>

      <p className="folio__foot">
        <b>{folioNum}</b> / {total}
        <span className="folio__running-inline"> — {current.label}</span>
      </p>
    </nav>
  );
}
