import { VERTICALS } from './verticals'

export type Person = {
  name: string
  role: string
  phone: string
  /** E.164 form for the tel: link. */
  tel: string
  email: string
  /** "Core Expertise" from the leadership page (PDF p14). */
  expertise: string[]
  /** Portrait cropped from the leadership page (PDF p14). */
  photo: string
}

/** PDF p15, in the PDF's order. */
export const PEOPLE: Person[] = [
  {
    name: 'Seshu Kashyapa',
    role: 'Head – Operations & Supply Chain',
    phone: '+91 95151 42492',
    tel: '+919515142492',
    email: 'kashyapa@uniindusglobal.com',
    expertise: ['Offshore Operations Support', 'Industrial Procurement', 'Global Sourcing', 'Supply Chain Management', 'Vendor Development', 'Materials & Logistics Management'],
    photo: '/images/pdf/leader-seshu.webp',
  },
  {
    name: 'Rajendra Jeena',
    role: 'Head – Operations & Business Development',
    phone: '+91 99976 94335',
    tel: '+919997694335',
    email: 'rjeena@uniindusglobal.com',
    expertise: ['Offshore Operations', 'Business Development', 'Client Relationship Management', 'Strategic Partnerships', 'Project Execution', 'Commercial Growth Initiatives'],
    photo: '/images/pdf/leader-rajendra.webp',
  },
  {
    name: 'Binu Nair',
    role: 'Head – Finance & Tax',
    phone: '+91 98205 84276',
    tel: '+919820584276',
    email: 'bnair@uniindusglobal.com',
    expertise: ['Finance & Commercial Management', 'Taxation & Compliance', 'Budgeting & Forecasting', 'Contract Administration', 'Financial Controls', 'Strategic Financial Planning'],
    photo: '/images/pdf/leader-binu.webp',
  },
]

export const GENERAL_CONTACT = {
  website: 'www.uniindusglobal.com',
  websiteUrl: 'https://www.uniindusglobal.com',
  email: 'info@uniindusglobal.com',
  location: 'Kakinada, Andhra Pradesh, India',
}

/** PDF p14 lists the leaders in a different order from p15. */
export const LEADERSHIP = {
  heading: ['Our Core', 'Leadership Team'] as const,
  tagline: 'Experienced Leadership. Proven Industry Expertise.',
  order: ['Rajendra Jeena', 'Binu Nair', 'Seshu Kashyapa'],
  themes: ['Offshore Expertise', 'Operational Excellence', 'Customer Commitment', 'Sustainable Growth', 'Governance & Compliance', 'Industry Knowledge'],
}

/** PDF p14. */
export const LEADERSHIP_QUOTE =
  'Our leadership team combines deep offshore industry expertise, operational excellence and commercial acumen to deliver reliable solutions and long-term value to our clients.'

/** Where the inquiry form delivers. FormSubmit relays to this inbox. */
export const INQUIRY_INBOX = GENERAL_CONTACT.email

export const REQUIREMENT_OPTIONS = [
  ...VERTICALS.map((v) => v.title),
  'OEM Spare Parts & MRO',
  'Product Portfolio',
  'Hydraulics & Technical Supplies',
  'Other',
]
