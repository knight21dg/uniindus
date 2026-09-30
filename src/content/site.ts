/**
 * Site-wide constants. SITE_URL is the domain printed in the company PDF (p15).
 * Change it here if the site is served from a different domain; canonical,
 * Open Graph, robots.txt and sitemap.xml all derive from it at build time.
 */
export const SITE_URL = 'https://www.uniindusglobal.com'

export const SEO = {
  title: 'UNI INDUS GLOBAL LLP | Industrial Procurement, Global Sourcing & Offshore Manpower',
  description:
    'UNI INDUS GLOBAL LLP (formerly Gamanas Uni Indus Co.) delivers project resources and services for Oil & Gas, Marine, Energy, Construction and Manufacturing: industrial procurement, global sourcing & EXIM, OEM spares & MRO, and offshore & industrial manpower. Kakinada, Andhra Pradesh, India.',
  ogImage: '/images/og-image.jpg',
}

export type NavItem = { id: string; label: string }

/** The client-fixed header order. Contact Us renders as the highlighted CTA. */
export const NAV: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'verticals', label: 'Verticals' },
  { id: 'industries', label: 'Industries' },
  { id: 'partners', label: 'Partners' },
  { id: 'contact', label: 'Contact Us' },
]
