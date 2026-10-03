import { useRef, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { VERTICALS, VERTICALS_INTRO, VERTICAL_STRENGTHS, type DetailTab, type Vertical } from '../content/verticals'
import { SectionHeading, StrengthStrip } from '../components/ui'
import { Capabilities, Products } from './Capabilities'
import { scrollToElement } from '../lib/scroll'

function DetailButton({ v, onOpen }: { v: Vertical; onOpen: (t: DetailTab) => void }) {
  if (!v.detail) return null
  const tab = v.detail
  return (
    <button
      type="button"
      onClick={() => onOpen(tab)}
      className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs font-bold tracking-wider text-gold-400 uppercase hover:text-gold-300"
      aria-label={`View ${v.title} capabilities`}
    >
      View capabilities
      <ArrowDown className="size-3.5" aria-hidden="true" />
    </button>
  )
}

/**
 * The eight verticals as on the PDF cover (p1): a 4 x 2 grid of navy cards,
 * each with a gold ring icon. 2 columns on tablets, 1 on phones.
 */
function VerticalGrid({ onOpen }: { onOpen: (t: DetailTab) => void }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
      {VERTICALS.map((v) => {
        const Icon = v.icon
        return (
          <li
            key={v.id}
            className="theme-dark reveal hover-card flex flex-col items-center rounded-[var(--radius-card)] border border-amber-500/40 bg-navy-900 px-5 py-8 text-center shadow-lg"
          >
            <span className="icon-ring size-24 border-[3px] bg-navy-950">
              <Icon className="size-11" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-heading text-[1.05rem] leading-tight font-bold text-white uppercase">{v.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-snug text-slate-300">{v.text}</p>
            <DetailButton v={v} onOpen={onOpen} />
          </li>
        )
      })}
    </ul>
  )
}

export function Verticals() {
  const [tab, setTab] = useState<DetailTab>('manpower')
  const detailRef = useRef<HTMLDivElement>(null)

  const openDetail = (t: DetailTab) => {
    setTab(t)
    const el = detailRef.current
    if (!el) return
    scrollToElement(el)
    // Move focus to the chosen tab so keyboard users land where they asked to go.
    requestAnimationFrame(() => document.getElementById(`tab-${t}`)?.focus({ preventScroll: true }))
  }

  return (
    <section id="verticals" aria-labelledby="verticals-title" className="theme-light relative bg-[#f1f5f9]">
      <div className="section-y container-x relative">
        <div className="reveal grid gap-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="verticals-title"
            eyebrow={VERTICALS_INTRO.hub.join(' ')}
            lines={['Business', 'Verticals']}
            subtitle={VERTICALS_INTRO.subtitle}
            className="lg:col-span-6"
          />
          <p className="lead text-slate-200 lg:col-span-6">
            <span className="font-semibold text-gold-400">UNI INDUS GLOBAL LLP</span>
            {VERTICALS_INTRO.text.replace('UNI INDUS GLOBAL LLP', '')}
          </p>
        </div>

        <div className="mt-10 lg:mt-12">
          <VerticalGrid onOpen={openDetail} />
        </div>

        <div className="reveal mt-10 lg:mt-12">
          <StrengthStrip items={VERTICAL_STRENGTHS} label="How we deliver" />
        </div>
      </div>

      <div ref={detailRef} id="services" data-anchor className="theme-dark bg-navy-950">
        <Capabilities tab={tab} onTabChange={setTab} />
      </div>

      <div id="products" data-anchor className="theme-light bg-[#ffffff]">
        <Products />
      </div>
    </section>
  )
}
