// Renders the app to static HTML after `vite build` so crawlers and no-JS
// visitors get the full page, then writes head tags, robots.txt and sitemap.xml.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')

const { render, site, organizationJsonLd } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const { SEO, SITE_URL } = site
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const head = [
  `<meta name="description" content="${esc(SEO.description)}" />`,
  `<link rel="canonical" href="${SITE_URL}/" />`,
  `<meta property="og:type" content="website" />`,
  `<meta property="og:site_name" content="UNI INDUS GLOBAL LLP" />`,
  `<meta property="og:title" content="${esc(SEO.title)}" />`,
  `<meta property="og:description" content="${esc(SEO.description)}" />`,
  `<meta property="og:url" content="${SITE_URL}/" />`,
  `<meta property="og:image" content="${SITE_URL}${SEO.ogImage}" />`,
  `<meta property="og:image:width" content="1200" />`,
  `<meta property="og:image:height" content="630" />`,
  `<meta property="og:locale" content="en_IN" />`,
  `<meta name="twitter:card" content="summary_large_image" />`,
  `<meta name="twitter:title" content="${esc(SEO.title)}" />`,
  `<meta name="twitter:description" content="${esc(SEO.description)}" />`,
  `<meta name="twitter:image" content="${SITE_URL}${SEO.ogImage}" />`,
  `<script type="application/ld+json">${JSON.stringify(organizationJsonLd).replace(/</g, '\\u003c')}</script>`,
].join('\n    ')

const templatePath = path.join(dist, 'index.html')
let html = await readFile(templatePath, 'utf8')
if (!html.includes('<div id="root"></div>') || !html.includes('<!--app-head-->')) {
  throw new Error('prerender: index.html is missing the root or head placeholder')
}
html = html.replace('<!--app-head-->', head).replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
await writeFile(templatePath, html)

await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>\n</urlset>\n`,
)
await rm(ssrDir, { recursive: true, force: true })
console.log(`prerender: wrote ${(html.length / 1024).toFixed(0)} KB index.html, robots.txt, sitemap.xml`)
