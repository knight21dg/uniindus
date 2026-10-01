import type { ReactNode } from 'react'
import { CircleCheckBig } from 'lucide-react'
import type { IconType } from './icons'

/** Intrinsic sizes of the optimized images in /public/images (at the 1024 width). */
const IMAGE_SIZES: Record<string, [number, number]> = {
  'about-offshore-rig': [1024, 682],
  'hero-engineers': [1024, 576],
  'about-global-logistics': [1024, 682],
  'about-valves': [1024, 682],
  'hero-warehouse': [1024, 576],
  'about-shipping-port': [1024, 682],
  'about-refinery': [1024, 682],
  'services-collage': [1024, 682],
  'products-collage': [1024, 682],
  'hero-network': [1024, 512],
  'construction-site': [1024, 678],
  'manufacturing-automation': [1024, 683],
}

type ImgProps = {
  name: string
  alt: string
  className?: string
  sizes?: string
  priority?: boolean
}

/** Responsive WebP image. Lazy unless `priority`. */
export function Img({ name, alt, className, sizes = '(min-width: 1024px) 33vw, 100vw', priority }: ImgProps) {
  const [w, h] = IMAGE_SIZES[name] ?? [1024, 682]
  const small = 640
  return (
    <img
      src={`/images/${name}-1024.webp`}
      srcSet={`/images/${name}-${small}.webp ${small}w, /images/${name}-1024.webp 1024w`}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
    />
  )
}

type HeadingProps = {
  id?: string
  eyebrow?: string
  /** Line one renders white, line two gold (the PDF's two-tone heading). */
  lines: readonly [string, string] | readonly string[]
  subtitle?: ReactNode
  align?: 'left' | 'center'
  as?: 'h2' | 'h3'
  /** Keep both tones on one line where they fit (the PDF sets some headings this way). */
  inline?: boolean
  className?: string
}

export function SectionHeading({ id, eyebrow, lines, subtitle, align = 'left', as: Tag = 'h2', inline, className = '' }: HeadingProps) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <Tag id={id} className={Tag === 'h2' ? 'h2' : 'h3-panel'}>
        <span className={`${inline ? '' : 'block'} text-white`}>{lines[0]}</span>
        {inline && ' '}
        {lines[1] && <span className={`${inline ? '' : 'block'} text-gold-400`}>{lines[1]}</span>}
      </Tag>
      <span className={`gold-rule mt-4 ${center ? 'mx-auto' : ''}`} aria-hidden="true" />
      {subtitle && <div className={`lead mt-4 ${center ? 'mx-auto' : ''} max-w-2xl`}>{subtitle}</div>}
    </div>
  )
}

/** Gold outline hexagon around an icon (the PDF's icon frame). */
export function HexIcon({ icon: Icon, size = 'md', filled }: { icon: IconType; size?: 'sm' | 'md' | 'lg'; filled?: boolean }) {
  const dims = { sm: 'size-10', md: 'size-12', lg: 'size-16' }[size]
  const iconDims = { sm: 'size-[1.125rem]', md: 'size-[1.375rem]', lg: 'size-7' }[size]
  return (
    <span className={`hex-icon relative grid shrink-0 place-items-center ${dims}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" preserveAspectRatio="none">
        <polygon
          points="50,3 94,27 94,73 50,97 6,73 6,27"
          className={filled ? 'fill-gold-400/12' : 'fill-navy-950/60'}
          stroke="var(--color-gold-400)"
          strokeWidth="4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <Icon className={`relative text-gold-400 ${iconDims}`} strokeWidth={1.75} aria-hidden="true" />
    </span>
  )
}

/** The PDF's benefits strip, condensed to labels. */
export function StrengthChips({ items, label, className = '' }: { items: string[]; label: string; className?: string }) {
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-x-5 gap-y-2 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <CircleCheckBig className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

/** The PDF's 5-up benefits strip with icons, titles and one-liners. */
export function StrengthStrip({ items, label }: { items: { title: string; text: string; icon: IconType }[]; label: string }) {
  return (
    <ul
      aria-label={label}
      className="panel grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-3 xl:flex xl:divide-x"
    >
      {items.map(({ title, text, icon: Icon }) => (
        <li key={title} className="flex min-w-0 flex-1 gap-3 p-4 transition-colors duration-200 hover:bg-white/5 sm:p-5">
          <Icon className="mt-0.5 size-7 shrink-0 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
          <div>
            <p className="font-heading text-sm font-bold tracking-wide text-gold-400 uppercase">{title}</p>
            <p className="mt-1 text-sm leading-snug text-muted">{text}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function BulletList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2 text-sm leading-snug text-slate-200">
          <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}
