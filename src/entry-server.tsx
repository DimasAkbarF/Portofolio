import { renderToString } from 'react-dom/server';

import App from './App';

/**
 * Server entry used at build time to prerender the static HTML that ships in
 * dist/index.html. The client then hydrates it via main.tsx.
 */
export function render() {
  return renderToString(<App />);
}
