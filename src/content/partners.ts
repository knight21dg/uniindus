import { ClipboardCheck, Globe, Handshake, MapPin, ShieldCheck } from 'lucide-react'

/**
 * PDF p16, "Our Key Partners & Collaborators". Names, descriptors, logos and
 * photos are all taken from that page.
 */
export type Partner = { name: string; short: string; descriptor?: string; logo: string; photo?: string }

export const PARTNERS_INTRO =
  'Building long-term relationships with global leaders to deliver reliable solutions and create value across industries.'

export const PARTNERS: Partner[] = [
  { name: 'M/s Dolphin Drilling', short: 'Dolphin Drilling', logo: '/images/pdf/partner-logo-dolphin.webp', photo: '/images/pdf/partner-photo-dolphin.webp', descriptor: 'Rig – Blackford Dolphin' },
  { name: 'M/s Dynamic Drilling & Services Pvt. Ltd.', short: 'Dynamic Drilling & Services', logo: '/images/pdf/partner-logo-dynamic.webp', photo: '/images/pdf/partner-photo-dynamic.webp' },
  { name: 'M/s Servicios de Petróleo Constellation SA', short: 'Constellation', logo: '/images/pdf/partner-logo-constellation.webp', photo: '/images/pdf/partner-photo-constellation.webp', descriptor: 'Rig – Olinda Star' },
  { name: 'M/s Universal Energy Resources, Inc.', short: 'Universal Energy Resources', logo: '/images/pdf/partner-logo-uer.webp', photo: '/images/pdf/partner-photo-uer.webp', descriptor: 'Rig – SSV Louisiana' },
  { name: 'Weatherford', short: 'Weatherford', logo: '/images/pdf/partner-logo-weatherford.webp', photo: '/images/pdf/partner-photo-weatherford.webp' },
  { name: 'ONGC', short: 'ONGC', logo: '/images/pdf/partner-logo-ongc.webp', descriptor: "Trusted Partner in India's Energy Journey" },
  { name: 'L&T Energy Offshore', short: 'L&T Energy Offshore', logo: '/images/pdf/partner-logo-lt.webp', photo: '/images/pdf/partner-photo-lt.webp' },
  { name: 'Swan Defence and Heavy Industries', short: 'Swan Defence', logo: '/images/pdf/partner-logo-swan.webp', photo: '/images/pdf/partner-photo-swan.webp', descriptor: 'Building A Stronger Tomorrow' },
]

export const PARTNER_STRENGTHS = [
  { title: 'Global Network', text: 'Access to leading international vendors and technology partners.', icon: Globe },
  { title: 'Strong Relationships', text: 'Built on trust, transparency and mutual growth.', icon: Handshake },
  { title: 'Reliable Solutions', text: 'Delivering high-quality products and services across industries.', icon: ShieldCheck },
  { title: 'Value Creation', text: 'Collaborations that drive efficiency, innovation and long-term value.', icon: ClipboardCheck },
  { title: 'PAN India Presence', text: 'Extensive reach and support across India.', icon: MapPin },
]
