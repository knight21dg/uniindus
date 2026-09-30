import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { SEO, SITE_URL } from './content/site'
import { COMPANY } from './content/company'
import { GENERAL_CONTACT, PEOPLE } from './content/contact'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

export const site = { SEO, SITE_URL }

/** Organization structured data, built only from facts in the company PDF. */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: COMPANY.name,
  alternateName: 'Gamanas Uni Indus Co.',
  slogan: COMPANY.motto,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-mark-192.png`,
  email: GENERAL_CONTACT.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Kakinada',
    addressRegion: 'Andhra Pradesh',
    addressCountry: 'IN',
  },
  contactPoint: PEOPLE.map((p) => ({
    '@type': 'ContactPoint',
    name: p.name,
    contactType: p.role,
    telephone: p.tel,
    email: p.email,
  })),
}
