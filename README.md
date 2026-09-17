# dimasakbar.xyz — Portfolio

The personal portfolio of **Dimas Akbar**, a freelance web developer and
Informatics Engineering student at Universitas Pamulang. A single-page,
print-inspired "book" of chapters — Title, Who, Work, Route, Proof, Colophon —
where the scroll layer is built by hand and motion carries hierarchy rather
than decoration.

Live site: <https://dimasakbar.xyz>

---

## Highlights

- **Prerendered single page.** The document is rendered to static HTML at build
  time (`react-dom/server`), shipped as `dist/index.html`, then hydrated by
  React 19. There is no blank screen and no First Contentful Paint that waits on
  JavaScript.
- **`scrollcraft` — a hand-rolled scroll runtime.** Vanilla JS, zero
  dependencies, zero DOM generation. `src/lib/scrollcraft` reads declarative
  `data-sc-*` attributes and drives them from a single scroll value on a single
  `requestAnimationFrame` loop. Ships lazy-loaded via dynamic `import()`.
- **Print-style chapter apparatus.** The left margin is a live *folio*: chapter
  stamps press in as they are read, the page number walks each leaf, and the
  rail flips its ink over dark plates and folds to the bottom on small screens.
- **Fast by construction.** Inlined critical CSS, deferred hydration, async
  code-split bundles, lazy `async` images with responsive WebP variants, and
  `font-display: optional` eliminate both render-blocking round trips and
  font-swap layout shifts (web.dev `font-display` guidance).
- **SEO & tools of record.** Full head metadata, a JSON-LD `@graph`
  (Person / Organization / WebSite / ProfilePage / BreadcrumbList / ItemList),
  `sitemap.xml`, `robots.txt` (explicitly welcoming GPTBot, ClaudeBot,
  PerplexityBot, etc.), `llms.txt`, Open Graph / Twitter cards, and a web
  manifest.

## Tech stack

| Layer        | Choice                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| UI           | React 19 · TypeScript                                                   |
| Build        | Vite 7 (plugin-react) · SSR entry (`src/entry-server.tsx`)             |
| Styling      | Tailwind CSS 3.4 · custom CSS tokens · `tailwindcss-animate`           |
| Fonts        | Self-hosted `@fontsource/archivo` + `@fontsource/newsreader` (WOFF2)   |
| Scroll layer | `scrollcraft` (custom, in-repo)                                        |
| Linting      | ESLint 9 · `typescript-eslint` · `react-hooks` · `react-refresh`       |
| Deploy       | Vercel (`vercel.json`: security headers + long-lived asset cache)      |

## Getting started

Requires **Node.js ≥ 20.19** (Vite 7 baseline) and `npm`.

```bash
npm ci                 # install from the lockfile
npm run dev            # Vite dev server → http://localhost:3000
npm run lint           # ESLint over the project
npm run preview        # serve the production build locally
npm run build          # typecheck → client build → SSR run → prerender
```

The production build is a pipeline:

```text
tsc -b                       # typecheck (project references)
vite build                   # client bundle → dist/
vite build --ssr src/entry-server.tsx --outDir dist-ssr   # server bundle
node scripts/prerender.mjs   # post-process dist/index.html
```

`scripts/prerender.mjs` performs three documented optimizations on the emitted
`index.html`:

1. **Inline stylesheets** — replaces every `<link rel="stylesheet">` with the
   file's contents in place (Vite has no official inline option;
   vitejs/vite#18062). Kills the render-blocking request.
2. **`font-display: optional`** — rewrites fontsource's `swap` so text commits
   to its fallback for the pageview instead of repainting after the reader can
   see it. Removes the final CLS source; cached visits still get the real faces.
3. **Inject server-rendered HTML** — the placeholder `<div id="root"></div>` is
   replaced with rendered markup that the client later hydrates.

## Project structure

```text
.
├── public/                  # static assets & SEO/meta files
│   ├── assets/              # WebP sources + responsive variants (*-400/600/800)
│   ├── certificates/        # certificate scans
│   ├── robots.txt · sitemap.xml · llms.txt · manifest.webmanifest · og.png
├── scripts/
│   └── prerender.mjs        # build-time POST-processing of dist/index.html
├── src/
│   ├── components/
│   │   ├── Folio.tsx        # chapter margin: stamps, page numbers, rail
│   │   └── ui/              # shadcn/ui source components (op-in library)
│   ├── lib/
│   │   ├── landmarks.ts     # chapter order, labels, tones
│   │   ├── scrollcraft/     # scroll runtime (vanilla JS + data-sc-* API)
│   │   └── utils.ts         # shared helpers
│   ├── sections/            # TitlePage · WhoChapter · WorkChapter
│   │                        # RouteChapter · ProofChapter · Colophon
│   ├── data/                # projects · skills · experience · certificates
│   ├── entry-server.tsx     # renderToString entry used by prerender
│   ├── main.tsx             # client entry: deferred hydration + grain
│   └── index.css            # design tokens & chapter/folio styles
├── index.html               # document shell with full head + JSON-LD
├── vite.config.ts           # aliases, manualChunks, dev port 3000
└── vercel.json              # headers: security + immutable asset cache
```

### scrollcraft, in brief

Author real, semantic HTML; mark motion targets with attributes; the engine
drives them from one scroll value on one rAF loop.

- **Acts** — the unit of scroll time: `flow`, `pin`, `scrub`, `pan`
  (`data-sc-act` + `data-sc-span`); each publishes normalized progress `p` as
  the CSS variable `--sc-p`.
- **Devices** — what `p` drives: `data-sc-parallax`, `data-sc-cue`
  (opacity/rise), `data-sc-kinetic` (line/word/char splits), `data-sc-reveal`
  (clip-path wipes), `data-sc-count` (number bloom), `data-sc-pan` (wide rail),
  `data-sc-tilt`, `data-sc-spotlight`, `data-sc-stagger`, `data-sc-magnet`.
- **Reduced motion** — the runtime disables itself under
  `prefers-reduced-motion`; content stays readable and static.

The runtime is loaded as a separate chunk (`preloadScrollcraft` in
`src/main.tsx`) and mounted only after the first paint, so the motion layer
enhances rather than taxes LCP.

## Performance

Mobile Lighthouse (current): **~95–98 / 100** — FCP ≈ 1.7 s, LCP ≈ 2.1 s,
**TBT 0 ms**, **CLS 0**, and no render-blocking or font-display warnings.

Key techniques and the audits they address:

| Technique                                                        | Lighthouse audit                       |
| ---------------------------------------------------------------- | -------------------------------------- |
| Hero not gated behind JS; `transform`-only reveal                 | `largest-contentful-paint`             |
| Critical CSS inlined at build time                                | `render-blocking-resources`            |
| Responsive WebP `srcset` + correct intrinsic `width`/`height`     | `uses-responsive-images`, `cls`        |
| Hydration deferred past first paint; scrollcraft chunk lazily     | `mainthread-work-breakdown`, `tbt`     |
| Grain (fractal-noise) layer painted only after `load`             | `total-blocking-time`                  |
| `font-display: optional` at prerender                             | `cumulative-layout-shift`              |

## Deployment

Deployed on **Vercel**: import the repository, framework preset *Vite*
(build `npm run build`, output `dist`).

`vercel.json` applies, on every response: HSTS (preload), `X-Frame-Options:
DENY`, `X-Content-Type-Options: nosniff`, a restrictive CSP, and Cross-Origin /
Referrer / Permissions-Policy headers. `/assets/*` and `/certificates/*` are
served `immutable` with a one-year cache (hashed filenames make this safe).

## Author

**Dimas Akbar Firdaus**

- Website — <https://dimasakbar.xyz>
- GitHub — <https://github.com/DimasAkbarF>
- Email — <mailto:dimasakbr299@gmail.com>

## License

All rights reserved. This repository is private source material for the
portfolio; code within `public/`, assets, and design are © Dimas Akbar
(dimasakbar.xyz), 2026.