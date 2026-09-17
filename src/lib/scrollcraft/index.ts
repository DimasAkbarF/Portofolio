/**
 * Boots the scrollcraft runtime against the rendered document.
 *
 * The engine is browser-only (it attaches itself to `window`), so it lives
 * behind a dynamic import. That keeps it out of the server-render bundle used
 * for prerendering, while `preloadScrollcraft` starts fetching the chunk as
 * soon as the client entry runs so it is ready by the time the effect that
 * mounts it fires.
 */
let engine: Promise<unknown> | null = null;

export function preloadScrollcraft() {
  if (typeof window === 'undefined') return;
  engine ??= import('./scrollcraft.js');
}

export function mountScrollcraft(root?: Element | null) {
  if (typeof window === 'undefined') return;
  preloadScrollcraft();
  void engine!.then(() => {
    window.ScrollCraft?.mount(root ?? document, {});
  });
}
