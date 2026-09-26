# dimasakbar.xyz

The personal portfolio of Dimas Akbar Faturohman, a web developer and Informatics
Engineering student at Universitas Pamulang. One page, built as a printed book:
six chapters read top to bottom, with a live margin that tracks where you are.

Live site: <https://dimasakbar.xyz>

The document is prerendered. Every word on the page exists as static HTML in the
first response, so it is readable before any JavaScript runs and to crawlers that
never run it at all.

## How it is built

The production build is four steps, wired together in `npm run build`:

```bash
tsc -b                                                  # typecheck
vite build                                              # client bundle into dist/
vite build --ssr src/entry-server.tsx --outDir dist-ssr # server bundle
node scripts/prerender.mjs                              # post-process dist/index.html
```

`scripts/prerender.mjs` then does three things to the emitted document:

1. **Inlines every stylesheet.** Vite always emits `<link rel="stylesheet">` and
   has no option to inline the bundled CSS (vitejs/vite#18062), so the documented
   critical-CSS pattern is applied by hand after the build. The files are small
   and same-origin, and the render-blocking round trip disappears.
2. **Rewrites `font-display: swap` to `optional`.** fontsource ships `swap`, which
   repaints the hero in a new face after the reader can already see it, and that
   was the last layout shift on the page. `optional` lets the block period pick
   the face for the pageview, so committed text never moves
   (web.dev/articles/font-display). Cached visits still get the real faces.
3. **Injects the server-rendered markup** in place of the `<div id="root"></div>`
   placeholder, which React hydrates afterwards.

## The scroll runtime

`src/lib/scrollcraft` is a hand-written scroll engine in vanilla JS, with no
dependencies and no DOM generation. It reads declarative `data-sc-*` attributes
and drives them from one scroll value on one `requestAnimationFrame` loop.

- **Acts** are the units of scroll time: `flow`, `pin`, `scrub`, `pan`. Each
  publishes normalized progress as the CSS variable `--sc-p`.
- **Devices** are what that progress drives: parallax, cues, kinetic text splits,
  reveal wipes, counters, rail pans, tilt, spotlight, stagger, magnet.
- **Reduced motion** switches the runtime off under `prefers-reduced-motion`. The
  content stays readable and static.

It ships as its own chunk and mounts after first paint, so motion enhances the
page instead of taxing LCP.

## Measured, not claimed

Every number below is read out of the current `npm run build` output.

| Metric                                        | Value                                  |
| --------------------------------------------- | -------------------------------------- |
| `dist/index.html`                             | 57.1 kB, 813 words of prerendered copy  |
| Render-blocking stylesheets in the document   | 0 (2 inlined `<style>` blocks)          |
| CSS across all chunks                         | 29.0 kB                                |
| JS across all chunks                          | 249.2 kB                               |
| `font-display` in shipped CSS                | `optional`                             |
| Images                                        | 11, all `loading="lazy"`, `decoding="async"` |
| Images with a responsive `srcset`             | 6 of 11                                |
| Images carrying intrinsic `width`/`height`    | 1 of 11 (the portrait)                 |

There is no Lighthouse score here. It is not run in CI, so quoting one would be a
number nobody could reproduce.

## SEO

`index.html` carries the whole head: title, description, canonical, `hreflang`,
Open Graph, Twitter cards, and a JSON-LD `@graph` holding `Person`, `WebSite`,
`ProfilePage`, `BreadcrumbList`, `ItemList` (the projects, typed as
`SoftwareApplication` and `SoftwareSourceCode`), and `ContactPoint`. Nothing is
invented there: no employer, no company, no testimonials.

`public/` holds `sitemap.xml`, `robots.txt`, and the web manifest. `robots.txt`
allows the wildcard group and then names the AI crawlers one by one, with a
comment per bot saying what that one actually does.

`llms.txt` is there as well, with a caveat worth stating plainly: Google Search
does not read it. Google's own documentation says machine-readable text files are
ignored, and that the file neither helps nor hurts visibility there. It exists
for third-party systems that choose to consume it.

## Project structure

```text
.
├── public/                  # static assets and SEO/meta files
│   ├── assets/              # WebP sources plus responsive variants (*-400/600/800)
│   ├── certificates/        # certificate scans
│   └── robots.txt · sitemap.xml · llms.txt · manifest.webmanifest · og.png
├── scripts/
│   └── prerender.mjs        # build-time post-processing of dist/index.html
├── src/
│   ├── components/
│   │   ├── Folio.tsx        # the margin: chapter stamps, page numbers, rail
│   │   └── ui/              # shadcn/ui components, opt-in
│   ├── data/                # projects · skills · experience · certificates
│   ├── hooks/
│   ├── lib/
│   │   ├── landmarks.ts     # chapter order, labels, tones
│   │   ├── scrollcraft/     # the scroll runtime (vanilla JS, data-sc-* API)
│   │   └── utils.ts
│   ├── sections/            # TitlePage · WhoChapter · WorkChapter
│   │                        # RouteChapter · ProofChapter · Colophon
│   ├── App.tsx              # chapter composition
│   ├── entry-server.tsx     # renderToString entry, used by the prerender
│   ├── main.tsx             # client entry: deferred hydration
│   └── index.css            # design tokens, chapter and folio styles
├── index.html               # document shell with the full head and JSON-LD
├── vite.config.ts           # aliases, manualChunks, dev port 3000
└── vercel.json              # security headers, asset cache, cleanUrls
```

## Getting started

Node `^20.19.0 || >=22.12.0` (the Vite 7 floor) and npm.

```bash
npm ci         # install from the lockfile
npm run dev    # dev server on http://localhost:3000
npm run lint   # ESLint over the project
npm run build  # typecheck, client build, SSR build, prerender
npm run preview # serve the production build locally
```

## Deployment

Vercel, with the framework preset set to Vite, build command `npm run build`, and
output directory `dist`.

`vercel.json` applies HSTS with preload, `X-Frame-Options: DENY`,
`X-Content-Type-Options: nosniff`, a Content-Security-Policy, and the Cross-Origin
and Referrer and Permissions-Policy headers to every response. `/assets/*` and
`/certificates/*` are served `immutable` for a year, which is safe because the
filenames are hashed. `cleanUrls` sends any `.html` path to its extensionless
form, so `/index.html` resolves to `/` instead of competing with it.

## Author

Dimas Akbar Faturohman

- Website: <https://dimasakbar.xyz>
- GitHub: <https://github.com/DimasAkbarF>
- Instagram: <https://www.instagram.com/dimasakbr29>
- Email: <mailto:dimasakbr299@gmail.com>

## License

There is no LICENSE file. All rights reserved. The code, design, and assets are
copyright Dimas Akbar, 2026. This repository is public on GitHub.
