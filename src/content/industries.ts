import { Droplet, Factory, Ship, Zap } from 'lucide-react'
import { Crane, type IconType } from '../components/icons'

export type Industry = { name: string; icon: IconType; image: string; items: string[] }

/** The panorama across the top of PDF p12. */
export const INDUSTRIES_BANNER = '/images/pdf/industry-panorama.webp'

/** PDF p12. */
export const INDUSTRIES_INTRO =
  'Delivering quality products and solutions that power industries and drive progress.'

export const INDUSTRIES: Industry[] = [
  {
    name: 'Oil & Gas',
    icon: Droplet,
    image: '/images/pdf/industry-oilgas.webp',
    items: [
      'Upstream',
      'Offshore Exploration',
      'Offshore Drilling Operations',
      'Production Facilities',
      'Midstream',
      'Downstream',
      'Refineries & Pipelines',
      'Process Equipment & Instrumentation',
      'Safety & Maintenance',
    ],
  },
  {
    name: 'Marine',
    icon: Ship,
    image: '/images/pdf/industry-marine.webp',
    items: ['Shipbuilding', 'Ship Repair', 'Marine Equipment', 'Deck & Engine Supplies', 'Navigation & Safety Equipment', 'Marine Chemicals & Lubricants'],
  },
  {
    name: 'Construction',
    icon: Crane,
    image: '/images/pdf/industry-construction.webp',
    items: ['Infrastructure', 'Heavy Equipment', 'Building Materials', 'Industrial Tools', 'Project Supplies', 'Electrical & Mechanical Equipment'],
  },
  {
    name: 'Energy',
    icon: Zap,
    image: '/images/pdf/industry-energy.webp',
    items: ['Power Generation', 'Renewable Energy', 'Transmission', 'Electrical Solutions', 'Process Control & Automation', 'Energy Equipment & Systems'],
  },
  {
    name: 'Manufacturing',
    icon: Factory,
    image: '/images/pdf/industry-manufacturing.webp',
    items: ['Process Equipment', 'Industrial Components', 'Machine Tools', 'Plant Maintenance', 'Automation Systems', 'Production Support'],
  },
]

export const INDUSTRY_STRENGTHS = ['Quality Products', 'Reliable Partners', 'Global Reach', 'Timely Delivery', 'Safety & Compliance', 'Customer Focus']
