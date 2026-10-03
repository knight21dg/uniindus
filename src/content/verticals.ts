import {
  Anchor,
  Award,
  BatteryCharging,
  Boxes,
  Bot,
  Cable,
  ClipboardList,
  Clock,
  Cog,
  Droplet,
  FileText,
  FlaskConical,
  Gauge,
  Globe,
  Handshake,
  HardHat,
  Headset,
  Layers,
  Network,
  Package,
  PaintBucket,
  Plane,
  Ship,
  ShieldCheck,
  Truck,
  UserCog,
  Users,
  Wind,
  Wrench,
  Zap,
  Factory,
  TrendingUp,
  Hammer,
} from 'lucide-react'
import { OilRig, type IconType } from '../components/icons'

/* ---------- Business Verticals (PDF p1, p2, p4) ---------- */

export type DetailTab = 'manpower' | 'procurement' | 'exim'

export type Vertical = {
  id: string
  title: string
  text: string
  icon: IconType
  /** Opens the matching "Capabilities in depth" tab. */
  detail?: DetailTab
  /** Listed on p1/p2 but not one of the p4 hexagons. */
  supporting?: boolean
}

export const VERTICALS_INTRO = {
  subtitle: 'Integrated Solutions for Industry & Business',
  text: 'UNI INDUS GLOBAL LLP delivers comprehensive project resources and services through strategic partnerships, global networks and industry expertise, creating sustainable value for our clients.',
  hub: ['Project', 'Resources &', 'Services'],
  lead: 'Delivering integrated solutions for Oil & Gas, Marine and Industrial sectors across global markets.',
}

/**
 * The eight verticals, in the order of the PDF cover (p1). "Lasioning Works" is the PDF's spelling on p1, p2 and p4;
 * it is kept as written until the client confirms it (likely "Liaisoning").
 */
export const VERTICALS: Vertical[] = [
  { id: 'oil-gas-consultants', title: 'Oil & Gas Consultants', text: 'Expert advisory and consultancy for oil & gas projects.', icon: OilRig },
  { id: 'offshore-marine-pm', title: 'Offshore & Marine Project Management', text: 'End-to-end project management for offshore and marine operations.', icon: Ship },
  { id: 'lasioning-works', title: 'Lasioning Works', text: 'Liaison, coordination and stakeholder management.', icon: Users },
  { id: 'business-auxiliary', title: 'Business Auxiliary Services', text: 'Support services to enhance business efficiency.', icon: Cog },
  { id: 'industrial-procurement', title: 'Industrial Procurement', text: 'One-stop sourcing for industrial products, equipment and services.', icon: ClipboardList, detail: 'procurement' },
  { id: 'global-sourcing-exim', title: 'Global Sourcing & EXIM Solutions', text: 'Access to global markets with reliable sourcing and EXIM support.', icon: Globe, detail: 'exim' },
  { id: 'industrial-manpower', title: 'Industrial & Manpower Services', text: 'Skilled, certified and experienced workforce solutions.', icon: HardHat, detail: 'manpower' },
  { id: 'global-network', title: 'Global Network – Local Operations', text: 'Worldwide reach with on-ground support.', icon: Network, supporting: true },
]

export const VERTICAL_STRENGTHS = [
  { title: 'Quality', text: 'Committed to delivering highest quality.', icon: Award },
  { title: 'Reliability', text: 'Solutions you can depend on.', icon: Handshake },
  { title: 'Timely Delivery', text: 'On time, every time, where it matters.', icon: Truck },
  { title: 'Compliance', text: 'Adhering to global standards and regulations.', icon: ShieldCheck },
  { title: 'Operational Excellence', text: 'Continuous improvement for better performance.', icon: TrendingUp },
]

/* ---------- Capabilities in depth (PDF p5 to p11) ---------- */

export const DETAIL_TABS: { id: DetailTab; label: string; short: string }[] = [
  { id: 'manpower', label: 'Offshore & Industrial Manpower', short: 'Manpower' },
  { id: 'procurement', label: 'Industrial Procurement & MRO', short: 'Procurement & MRO' },
  { id: 'exim', label: 'Global Sourcing & EXIM', short: 'Sourcing & EXIM' },
]

export type ListItem = { label: string; icon: IconType }

/** p5 */
export const MANPOWER = {
  heading: ['Offshore & Industrial', 'Manpower Services'] as const,
  tagline: 'Skilled People. Safe Operations. Stronger Performance.',
  image: 'services-collage',
  workforce: [
    { label: 'Offshore Drilling Personnel', icon: OilRig },
    { label: 'Marine Crew', icon: Ship },
    { label: 'Production Personnel', icon: Factory },
    { label: 'Maintenance Teams', icon: Wrench },
    { label: 'Engineers', icon: HardHat },
    { label: 'Supervisors', icon: Users },
    { label: 'Safety Officers', icon: ShieldCheck },
    { label: 'Offshore Coordinators', icon: Headset },
  ] satisfies ListItem[],
  deployment: ['Contract Staffing', 'Long-Term Deployment', 'Shutdown Support', 'Project Mobilization'],
  strengths: ['Safety First', 'Qualified Workforce', 'Reliable Partner', 'On-Time Delivery', 'Cost Effective'],
}

/** p6 */
export const POSITIONS = {
  heading: ['Positions', 'We Supply'] as const,
  tagline: 'Skilled Professionals. Critical Roles. Complete Workforce Solutions.',
  groups: [
    {
      title: 'Offshore Personnel',
      icon: OilRig,
      roles: ['OIM', 'Toolpusher', 'Driller', 'Assistant Driller', 'Derrickman', 'Roustabout', 'Crane Operator', 'Rig Mover', 'Motorman', 'Bosun', 'Able Seaman'],
    },
    {
      title: 'Technical Personnel',
      icon: UserCog,
      roles: ['Chief Electrician', 'Electrician', 'Chief Mechanic', 'Mechanic', 'Instrument Technician', 'Production Operator', 'Safety Officer', 'Offshore Coordinator', 'Welder (6G)', 'Fitter'],
    },
  ],
  strengths: ['Experienced Professionals', 'Safety Compliant', 'Reliable Workforce', 'On-Time Deployment', 'Client Focused'],
}

export type Category = { title: string; icon: IconType; items: string[] }

export type Brand = { name: string; logo: string }

function brandList(page: 'p9' | 'p10', rows: [string, string][]): Brand[] {
  return rows.map(([file, name]) => ({ name, logo: `/images/pdf/brands/${page}-${file}.webp` }))
}

/** p7. The PDF closes each list with "& more". */
export const PROCUREMENT = {
  heading: ['Industrial', 'Procurement Solutions'] as const,
  tagline: 'Right Products. Right Quality. Right Time.',
  text: 'End-to-end procurement services for industrial, marine, offshore and energy sectors. Sourcing globally. Delivering reliably.',
  image: 'hero-warehouse',
  categories: [
    { title: 'Mechanical', icon: Cog, items: ['Pumps', 'Valves', 'Fittings', 'Flanges', 'Gaskets', 'Fasteners'] },
    { title: 'Electrical', icon: Zap, items: ['Cables', 'Switchgear', 'Panels', 'Lighting', 'Connectors'] },
    { title: 'Instrumentation', icon: Gauge, items: ['Transmitters', 'Sensors', 'Controllers', 'Analyzers', 'Meters'] },
    { title: 'Safety', icon: HardHat, items: ['PPE', 'Safety Equipment', 'Fire Protection', 'Signage', 'Safety Systems'] },
    { title: 'Marine', icon: Anchor, items: ['Deck Equipment', 'Marine Stores', 'Navigation Lights', 'Mooring'] },
    { title: 'Industrial', icon: Factory, items: ['Bearings', 'Lubricants', 'Tools', 'Consumables', 'Structural Items'] },
    { title: 'Automation', icon: Bot, items: ['PLCs', 'Drives', 'HMI', 'Control Systems', 'Robotics'] },
    { title: 'Energy', icon: BatteryCharging, items: ['Generators', 'Transformers', 'Batteries', 'Solar', 'UPS Systems'] },
  ] satisfies Category[],
  slogan: ['One Source. Global Reach.', 'Complete Procurement Support.'] as const,
  strengths: ['Quality Assured', 'Cost Effective', 'On-Time Delivery', 'Risk Mitigation', 'End-to-End Support'],
}

/** p8 */
export const OEM_MRO = {
  heading: ['OEM Spare Parts', '& MRO'] as const,
  tagline: 'Keep Operations Running. Maximize Reliability.',
  text: 'High-quality OEM spare parts and comprehensive MRO solutions to ensure optimal performance, reduce downtime and extend asset life.',
  oem: 'Supply of genuine and equivalent replacement parts.',
  mro: [
    { label: 'Maintenance', icon: Wrench },
    { label: 'Repair', icon: Cog },
    { label: 'Operations', icon: HardHat },
    { label: 'Asset Reliability', icon: TrendingUp },
    { label: 'Emergency Procurement', icon: Clock },
  ] satisfies ListItem[],
  benefits: [
    { label: 'Reduce Downtime', icon: Clock },
    { label: 'Wide Range of Inventory', icon: Boxes },
    { label: 'Expert Technical Support', icon: Users },
    { label: 'Improve Asset Performance', icon: TrendingUp },
  ] satisfies ListItem[],
  strengths: ['Genuine & Equivalent Quality', 'Cost Effective', 'Fast Delivery', 'Reliable Partners', 'Safety & Compliance'],
}

/** p9 */
export const PORTFOLIO = {
  heading: ['Product', 'Portfolio'] as const,
  tagline: 'Trusted Products. Reliable Performance.',
  text: 'A comprehensive range of industrial, offshore, marine and maintenance products sourced from trusted manufacturers and global supply partners.',
  categories: [
    { title: 'Lubricants', icon: Droplet, items: ['Marine Lubricants', 'High Temperature Greases', 'Anti-Corrosion Lubricants', 'Specialty Oils'] },
    { title: 'Chemicals', icon: FlaskConical, items: ['Maintenance Chemicals', 'Cleaning Chemicals', 'Laboratory Chemicals', 'Marine Chemicals'] },
    { title: 'Paints & Coatings', icon: PaintBucket, items: ['Marine Paints', 'Protective Coatings', 'Aerosol Sprays'] },
    { title: 'Steel Products', icon: Layers, items: ['Plates', 'Angles', 'Gratings', 'Channels', 'Beams'] },
    { title: 'Pipes & Fittings', icon: Cable, items: ['Pipes', 'Valves', 'Couplings', 'Clamps', 'Connectors'] },
    { title: 'Adhesives & Sealants', icon: Package, items: ['Epoxy', 'Silicone', 'Polyurethane', 'Industrial Adhesives', 'Industrial Tapes'] },
    { title: 'Safety Products', icon: ShieldCheck, items: ['PPE', 'Spill Kits', 'Lockout/Tagout Systems', 'Industrial Safety Equipment'] },
    { title: 'Industrial Consumables', icon: Cog, items: ['Hydraulics', 'Pneumatics', 'Welding Consumables', 'Rubber Products', 'General Industrial Supplies'] },
  ] satisfies Category[],
  strengths: ['Quality Products', 'Global Sourcing', 'Timely Delivery', 'Safety & Compliance', 'Trusted Brands'],
  /** "Trusted Global Brands" panel (p9), logos cropped from the PDF. */
  brands: brandList('p9', [
    ['3m', '3M'], ['honeywell', 'Honeywell'], ['ansell', 'Ansell'], ['brady', 'Brady'], ['portwest', 'Portwest'], ['bosch', 'Bosch'],
    ['stanley', 'Stanley'], ['ridgid', 'Ridgid'], ['fluke', 'Fluke'], ['parker', 'Parker'], ['molykote', 'Molykote'], ['jotun', 'Jotun'],
    ['loctite', 'Loctite'], ['permatex', 'Permatex'], ['crc', 'CRC'], ['gates', 'Gates'], ['esab', 'ESAB'], ['band-it', 'Band-It'],
  ]),
}

/** p10 */
export const HYDRAULICS = {
  heading: ['Hydraulics &', 'Technical Supplies'] as const,
  text: 'High performance components and technical supplies to ensure reliability, efficiency and safety across industrial operations.',
  image: 'products-collage',
  groups: [
    { title: 'Hydraulics', icon: Droplet, items: ['Pumps', 'Valves', 'Hoses', 'Fittings'] },
    { title: 'Pneumatics', icon: Wind, items: ['Sensors', 'Gauges', 'Air Tools'] },
    { title: 'Technical Supplies', icon: Hammer, items: ['Lab Equipment', 'Welding Accessories', 'General Supplies'] },
  ] satisfies Category[],
  strengths: ['Premium Quality', 'High Performance', 'Fast Delivery', 'Safety & Reliability', 'Technical Support'],
  /** "Our Premium Brands" band (p10), logos cropped from the PDF. */
  brands: brandList('p10', [
    ['eaton', 'Eaton'], ['parker', 'Parker'], ['rexroth', 'Rexroth (Bosch Group)'], ['yuken', 'Yuken'], ['danfoss', 'Danfoss'],
    ['hydac', 'Hydac'], ['smc', 'SMC'], ['festo', 'Festo'], ['norgren', 'Norgren'], ['skf', 'SKF'],
    ['ina', 'INA'], ['timken', 'Timken'], ['loctite', 'Loctite'], ['mahle', 'Mahle'], ['fluke', 'Fluke'],
    ['mitutoyo', 'Mitutoyo'], ['lincoln-electric', 'Lincoln Electric'], ['drager', 'Dräger'], ['groz', 'Groz'], ['techspan', 'Techspan'],
  ]),
}

/** p11 */
export const EXIM = {
  heading: ['Global Sourcing', '& EXIM Solutions'] as const,
  text: 'Connecting global resources with local needs through seamless sourcing, procurement and international trade solutions.',
  image: 'about-global-logistics',
  network: ['Non-Stocking Products', 'Obsolete Parts', 'Critical Spares', 'International Vendors', 'PAN India Delivery', 'Global EXIM Support'],
  steps: [
    { label: 'Global Sourcing', text: 'Access to reliable global suppliers', icon: Globe },
    { label: 'Procurement', text: 'Competitive pricing with quality assurance', icon: ClipboardList },
    { label: 'Logistics', text: 'Efficient shipping & freight solutions', icon: Ship },
    { label: 'EXIM Support', text: 'Complete documentation & customs clearance', icon: FileText },
    { label: 'On-Time Delivery', text: 'Timely and secure delivery anywhere in India', icon: Truck },
  ] satisfies (ListItem & { text: string })[],
  strengths: ['Global Reach', 'Quality Assurance', 'Cost Efficiency', 'Reliable Partnerships', 'End-to-End Support'],
}

// Used by the detail tab headers.
export const TAB_ICONS: Record<DetailTab, IconType> = {
  manpower: HardHat,
  procurement: ClipboardList,
  exim: Plane,
}
