import {
  Award,
  BadgeCheck,
  Cog,
  Clock,
  Gem,
  Globe,
  Handshake,
  HardHat,
  Headset,
  IndianRupee,
  Landmark,
  MountainSnow,
  ShieldCheck,
  Target,
  TrendingUp,
  Truck,
  Users,
  Zap,
  Ship,
  Factory,
} from 'lucide-react'
import { Crane, OilRig, type IconType } from '../components/icons'

export type Titled = { title: string; text: string; icon: IconType }

export const COMPANY = {
  name: 'UNI INDUS GLOBAL LLP',
  nameLines: ['UNI INDUS', 'GLOBAL LLP'] as const,
  formerly: 'Formerly Gamanas Uni Indus Co.',
  motto: 'We Serve The Purpose',
  location: 'Kakinada, Andhra Pradesh, India',
}

/* ---------- Hero (PDF p1) ---------- */

export const HERO = {
  /** PDF p1 cover heading and line. */
  tagline: ['Project', 'Resources', '& Services'] as const,
  lead: 'Delivering integrated solutions for Oil & Gas, Marine and Industrial sectors across global markets.',
}

/** The gold "Serving Industries" strip that closes every PDF page. */
export const SERVING_INDUSTRIES: { name: string; icon: IconType }[] = [
  { name: 'Oil & Gas', icon: OilRig },
  { name: 'Marine', icon: Ship },
  { name: 'Energy', icon: Zap },
  { name: 'Construction', icon: Crane },
  { name: 'Manufacturing', icon: Factory },
]

/* ---------- Why Choose (PDF p13) ---------- */

export const WHY_CHOOSE = {
  /** Followed by the cover heading, Project Resources & Services (HERO.tagline). */
  subtitleLead: 'Your Trusted Partner for',
  hubMessage: ['Reliable', 'Responsive', 'Resourceful'],
  /** Clockwise from the top of the PDF wheel. */
  points: [
    { title: 'Industry Expertise', text: 'Extensive experience across Oil & Gas, Marine and Industrial sectors.', icon: Target },
    { title: 'Global Vendor Network', text: 'Access to trusted manufacturers and suppliers worldwide.', icon: Globe },
    { title: 'Quality Assurance', text: 'Products and services sourced from reliable and certified partners.', icon: ShieldCheck },
    { title: 'Rapid Response', text: 'Quick turnaround for urgent procurement and manpower requirements.', icon: Zap },
    { title: 'Skilled Workforce', text: 'Experienced offshore, marine and industrial professionals.', icon: HardHat },
    { title: 'Procurement & Manpower Under One Roof', text: 'Single-window solution for products, services and workforce support.', icon: Handshake },
    { title: 'Competitive Pricing', text: 'Cost-effective sourcing through strategic partnerships and efficient procurement.', icon: IndianRupee },
  ] satisfies Titled[],
  solutionAreas: [
    { title: 'Offshore Operations', image: 'about-offshore-rig', icon: OilRig },
    { title: 'Industrial Procurement', image: 'hero-warehouse', icon: Cog },
    { title: 'Global Logistics', image: 'about-shipping-port', icon: Globe },
    { title: 'Workforce Deployment', image: 'hero-engineers', icon: Users },
  ],
  trustPoints: [
    { title: 'Proven Track Record', text: 'Consistent performance and trusted by leading companies.', icon: Award },
    { title: 'Global Reach', text: 'Serving clients across continents with strong local support.', icon: Globe },
    { title: 'Timely Delivery', text: 'On-time delivery with efficient logistics and reliable processes.', icon: Truck },
    { title: 'Compliance & Safety', text: 'Adhering to international standards and strict safety protocols.', icon: ShieldCheck },
    { title: 'Customer-Centric Approach', text: 'Understanding client needs and delivering tailored solutions.', icon: Handshake },
    { title: 'Long-Term Partnerships', text: 'Building lasting relationships based on trust, value and commitment.', icon: TrendingUp },
  ] satisfies Titled[],
  /** Value strip above the banner, as supplied by the client. */
  values: [
    { title: 'Global Reach', text: 'Strong network of manufacturers and suppliers worldwide.', icon: Globe },
    { title: 'Quality Assurance', text: 'Products sourced from certified and trusted manufacturers.', icon: BadgeCheck },
    { title: 'Cost Efficiency', text: 'Optimized procurement to deliver best value to our customers.', icon: IndianRupee },
    { title: 'Reliable Partnerships', text: 'Long-term relationships built on trust, performance and transparency.', icon: ShieldCheck },
    { title: 'End-to-End Support', text: 'From sourcing to delivery, complete solutions under one roof.', icon: Headset },
  ] satisfies Titled[],
  banner: ['One Partner', 'Multiple Solutions', 'Total Commitment'],
}

/* ---------- About (PDF p2) and Vision / Mission / Values (PDF p3) ---------- */

export const ABOUT = {
  tagline: ['People', 'Resources', 'Global Reach', 'Reliable Solutions'],
  description:
    'UNI INDUS GLOBAL LLP is a trusted partner delivering end-to-end solutions through expertise, global networks and reliable partnerships. We connect industries, resources and opportunities worldwide to create value for our clients.',
  formerlyIcon: Landmark,
  /** Photo mosaic with the PDF's own captions. */
  mosaic: [
    { image: 'about-offshore-rig', caption: 'Energy Projects', sub: 'People Solutions' },
    { image: 'hero-engineers', caption: 'Expertise in Action', sub: 'From concept to completion' },
    { image: 'about-global-logistics', caption: 'Global Supply Chains', sub: 'Stronger Together' },
    { image: 'about-valves', caption: 'Quality in Every Component', sub: '' },
  ],
  strengths: [
    { title: 'Quality', text: 'We never compromise', icon: BadgeCheck },
    { title: 'Reliability', text: 'On time, every time', icon: Clock },
    { title: 'Commitment', text: 'Dedicated to our customers', icon: Users },
    { title: 'Excellence', text: 'Driven by continuous improvement', icon: TrendingUp },
  ] satisfies Titled[],
}

export const VMV = {
  heading: ['Vision,', 'Mission & Values'] as const,
  subtitle: 'Guided by Purpose. Driven by Excellence.',
  vision: {
    title: 'Vision',
    icon: Target,
    text: 'Creating sustainable value through reliable supplies, services and strategic partnerships.',
  },
  mission: {
    title: 'Mission',
    icon: MountainSnow,
    text: 'Delivering quality products and solutions at competitive cost while ensuring operational excellence.',
  },
  values: {
    title: 'Values',
    icon: Gem,
    items: ['Integrity', 'Collaboration', 'Commitment', 'Continuous Improvement', 'Gratitude'],
  },
}
