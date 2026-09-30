# UNI INDUS GLOBAL LLP website

A single-page corporate site built from the company presentation (`../Presentation_UNI INDUS GLOBAL_Updated_20260907.pdf`) and the audit in `../report.pdf`.

Stack: Vite 6, React 19, TypeScript, Tailwind CSS 4, lucide-react icons. There is no other runtime dependency. The page is prerendered at build time, so the HTML already contains all content before JavaScript runs.

## Commands

```bash
npm install
npm run dev       # local development at http://localhost:5173
npm run build     # typecheck, client build, SSR prerender, robots.txt and sitemap.xml into dist/
npm run preview   # serve dist/ at http://localhost:4173
```

## Deploying on Vercel

Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`. No environment variables are needed.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/content/` | All copy, typed. `company.ts` (hero, Why Choose, About, Vision/Mission/Values), `verticals.ts` (8 verticals and the PDF p5–p11 detail), `industries.ts`, `partners.ts`, `contact.ts`, `site.ts` (nav, SEO, domain) |
| `src/sections/` | One component per page section, in page order |
| `src/components/` | Header, Footer, Logo, the inquiry form and shared UI pieces |
| `src/lib/inquiry.ts` | Form validation and the FormSubmit call |
| `scripts/prerender.mjs` | Writes the rendered HTML, meta tags, JSON-LD, robots.txt and sitemap.xml |
| `public/images/` | Optimised WebP images (see `ASSETS.md`) |

To change wording, edit `src/content/`. Layout files contain no company copy.

## Page structure

Header: Home · About · Verticals · Industries · Partners · Contact Us.

1. `#home`: hero and the gold Serving Industries bar
2. `#why-choose`: PDF p13
3. `#about`: PDF p2, then Vision, Mission & Values (p3), then Our Core Leadership Team (p14)
4. `#verticals`: the 8 verticals (p1, p2, p4), then "Capabilities in depth" tabs: Manpower and Positions (p5, p6), Procurement and OEM/MRO (p7, p8), Product Portfolio and Hydraulics (p9, p10), Global Sourcing & EXIM (p11)
5. `#industries`: PDF p12
6. `#partners`: PDF p16
7. `#contact`: PDF p15 and the inquiry form
8. Footer

## Inquiry form

The form posts to FormSubmit (`https://formsubmit.co/ajax/info@uniindusglobal.com`), the same service the previous site used. FormSubmit sends a one-time activation email to info@uniindusglobal.com the first time a new site submits. Until someone clicks that link, submissions fail, and the form shows that error instead of a false "sent" message. After deploying, send one real test inquiry and confirm it arrives.

## Domain

`SITE_URL` in `src/content/site.ts` is `https://www.uniindusglobal.com`, the domain printed in the PDF. The canonical tag, Open Graph URLs, robots.txt and sitemap.xml all use it. If the site will be served from a different domain, change it there.
