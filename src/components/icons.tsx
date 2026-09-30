import type { ComponentType, SVGProps } from 'react'

/** Anything that renders an icon: lucide icons and the custom ones below both fit. */
export type IconType = ComponentType<{ className?: string; strokeWidth?: number; 'aria-hidden'?: boolean | 'true' | 'false' }>

type Props = SVGProps<SVGSVGElement> & { strokeWidth?: number }

const base = (strokeWidth = 2): SVGProps<SVGSVGElement> => ({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

/** Offshore drilling derrick, the PDF's Oil & Gas mark. */
export function OilRig({ strokeWidth, ...props }: Props) {
  return (
    <svg {...base(strokeWidth)} {...props}>
      <path d="M12 2v2" />
      <path d="M9 22 12 4l3 18" />
      <path d="M10.2 15h3.6" />
      <path d="M10.8 10h2.4" />
      <path d="m9.6 19 4.2-4" />
      <path d="m14.4 19-4.2-4" />
      <path d="M4 22h16" />
      <path d="M6 22v-4h3" />
      <path d="M18 22v-4h-3" />
    </svg>
  )
}

/** Tower crane, the PDF's Construction mark. */
export function Crane({ strokeWidth, ...props }: Props) {
  return (
    <svg {...base(strokeWidth)} {...props}>
      <path d="M7 22V4" />
      <path d="M11 22V4" />
      <path d="M3 4h19" />
      <path d="M7 4l4-2 4 2" />
      <path d="M7 9l4 3" />
      <path d="M11 12l-4 3" />
      <path d="M7 15l4 3" />
      <path d="M19 4v7" />
      <path d="M17.5 11h3v2.5h-3z" />
      <path d="M4 22h10" />
    </svg>
  )
}
