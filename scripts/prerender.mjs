import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const clientIndex = path.join(root, 'dist', 'index.html');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');

// Every stylesheet is small (a few kB) and same-origin, and this is a
// single-page document, so a separate request for it buys nothing and costs a
// render-blocking round trip (developer.chrome.com/docs/lighthouse/performance/render-blocking-resources).
// Vite always emits <link rel="stylesheet"> and has no option to inline the
// bundled CSS (vitejs/vite#18062, build.cssCodeSplit only controls splitting),
// so the documented critical-CSS pattern is applied here as a post-build step:
// replace each link with the file's contents in a <style> tag, in place, so
// cascade order is preserved.
const stylesheetLink = /<link\b[^>]*\brel="stylesheet"[^>]*>/g;

function inlineStylesheets(html) {
  return html.replace(stylesheetLink, (tag) => {
    const href = /href="([^"]+)"/.exec(tag)?.[1];
    if (!href || /^[a-z]+:|^\/\//i.test(href)) return tag;
    const file = path.join(root, 'dist', href.replace(/^\//, ''));
    if (!fs.existsSync(file)) {
      throw new Error(`Prerender: stylesheet ${href} not found at ${file}`);
    }
    return `<style>${fs.readFileSync(file, 'utf8')}</style>`;
  });
}

// fontsource declares `font-display: swap`, which repaints the hero in a new
// face after the reader can already see it: the last layout shift on the page.
// `optional` gives the face a short block period and then commits to the
// fallback for the pageview, so text never moves. The face is still used when
// it is already cached, which is every visit after the first.
// web.dev/articles/font-display (see "optional")
function preferOptionalFontDisplay(css) {
  return css.replace(/font-display:\s*swap/g, 'font-display:optional');
}

const template = fs.readFileSync(clientIndex, 'utf8');
const { render } = await import(serverEntry);
const appHtml = render();

const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`Prerender: could not find ${placeholder} in ${clientIndex}`);
}

const html = preferOptionalFontDisplay(
  inlineStylesheets(template.replace(placeholder, `<div id="root">${appHtml}</div>`)),
);

fs.writeFileSync(clientIndex, html, 'utf8');

const inlined = (template.match(stylesheetLink) || []).length;
console.log(
  `Prerendered dist/index.html (${(appHtml.length / 1024).toFixed(1)} kB of markup, ` +
    `${inlined} stylesheet${inlined === 1 ? '' : 's'} inlined)`,
);
