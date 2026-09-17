import { createRoot, hydrateRoot } from 'react-dom/client'

import '@fontsource/archivo/latin-400.css'
import '@fontsource/archivo/latin-500.css'
import '@fontsource/archivo/latin-600.css'
import '@fontsource/archivo/latin-700.css'
import '@fontsource/newsreader/latin-400.css'
import '@fontsource/newsreader/latin-400-italic.css'
import '@fontsource/newsreader/latin-500.css'
import './index.css'
import App from './App.tsx'
import { preloadScrollcraft } from './lib/scrollcraft'

preloadScrollcraft()

const container = document.getElementById('root')!

// The document is prerendered, so it is already readable before this bundle
// runs. Hydrating immediately puts the entry chunk and the reconciliation of
// the whole tree in front of the first paint, which is exactly the "element
// render delay" Lighthouse measures. Hand the thread back for one paint first:
// hydration is invisible because the markup already matches the render.
// web.dev/articles/optimize-long-tasks
function hydrate() {
  if (container.hasChildNodes()) {
    hydrateRoot(container, <App />)
  } else {
    createRoot(container).render(<App />)
  }
}

requestAnimationFrame(() => setTimeout(hydrate, 0))

// The grain is a full-viewport fractal-noise layer: cheap to look at, not
// cheap to rasterise, and purely decorative. Paint it once the page has
// loaded so it never sits in front of first paint or competes with it.
const enableGrain = () => document.documentElement.classList.add('sc-grain-on')
if (document.readyState === 'complete') {
  enableGrain()
} else {
  window.addEventListener('load', enableGrain, { once: true })
}
