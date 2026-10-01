import { useRef, useState } from 'react'
import type React from 'react'
import { ArrowDown } from 'lucide-react'
import { VERTICALS, VERTICALS_INTRO, VERTICAL_STRENGTHS, type DetailTab, type Vertical } from '../content/verticals'
import { HexIcon, SectionHeading, StrengthStrip } from '../components/ui'
import { Capabilities, Products } from './Capabilities'
import { scrollToElement } from '../lib/scroll'

/*
 * Flat-top honeycomb. The board is 4 hexes wide and 3 tall; columns step
 * by 3/4 of a hex width and odd columns drop by half a hex height.
 * Positions are [column offset in hex widths, row offset in hex heights],
 * in the same order as VERTICALS: the six neighbours clockwise from the top,
 * then the two wings.
 */
const CENTER: [number, number] = [1.5, 1]
const CELLS: [number, number][] = [
  [1.5, 0],
  [2.25, 0.5],
  [2.25, 1.5],
  [1.5, 2],
  [0.75, 1.5],
  [0.75, 0.5],
  [0, 1],
  [3, 1],
]

const cellStyle = ([x, y]: [number, number]) => ({ left: `${(x / 4) * 100}%`, top: `${(y / 3) * 100}%` })

function HexShape({ strong, dashed }: { strong?: boolean; dashed?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
      <polygon
        points="25,1 75,1 99,50 75,99 25,99 1,50"
        vectorEffect="non-scaling-stroke"
        strokeWidth={strong ? 2.5 : 1.5}
        strokeDasharray={dashed ? '6 5' : undefined}
        className={`transition-[fill,stroke] duration-300 ${
          strong
            ? 'fill-navy-900 stroke-gold-400'
            : 'fill-navy-900/95 stroke-gold-400/75 group-hover:fill-navy-800 group-hover:stroke-gold-300 group-focus-within:stroke-gold-300'
        }`}
      />
    </svg>
  )
}

function DetailButton({ v, onOpen, className = '' }: { v: Vertical; onOpen: (t: DetailTab) => void; className?: string }) {
  if (!v.detail) return null
  const tab = v.detail
  return (
    <button
      type="button"
      onClick={() => onOpen(tab)}
      className={`inline-flex min-h-11 items-center gap-1.5 text-xs font-bold tracking-wider text-gold-400 uppercase hover:text-gold-300 ${className}`}
      aria-label={`View ${v.title} capabilities`}
    >
      View capabilities
      <ArrowDown className="size-3.5" aria-hidden="true" />
    </button>
  )
}

/**
 * One list for every width. From 1280px each item is a hexagon placed on the
 * honeycomb; below that it is a card (4 columns from 1024px, 2 on tablet, 1 on phones).
 */
function Honeycomb({ onOpen }: { onOpen: (t: DetailTab) => void }) {
  return (
    <div className="relative mx-auto w-full max-w-[84rem] xl:aspect-[4/2.598]">
      <div
        className="panel mb-4 flex items-center justify-center px-5 py-5 xl:absolute xl:mb-0 xl:h-1/3 xl:w-1/4 xl:border-0 xl:bg-transparent xl:p-[1.5%]"
        style={cellStyle(CENTER)}
      >
        <div className="relative flex size-full items-center justify-center">
          <span className="hidden xl:contents">
            <HexShape strong />
          </span>
          <p className="relative text-center font-heading text-xl leading-[1.15] font-extrabold uppercase xl:text-[1.7rem] 2xl:text-[1.9rem]">
            <span className="mx-auto mb-2 hidden h-0.5 w-8 bg-gold-400 xl:block" aria-hidden="true" />
            <span className="text-white xl:block">{VERTICALS_INTRO.hub[0]} </span>
            <span className="text-gold-400 xl:block">{VERTICALS_INTRO.hub[1]} </span>
            <span className="text-gold-400 xl:block">{VERTICALS_INTRO.hub[2]}</span>
            <span className="mx-auto mt-2 hidden h-0.5 w-8 bg-gold-400 xl:block" aria-hidden="true" />
          </p>
        </div>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:block">
        {VERTICALS.map((v, i) => {
          const Icon = v.icon
          return (
            <li
              key={v.id}
              style={{ '--x': cellStyle(CELLS[i]).left, '--y': cellStyle(CELLS[i]).top } as React.CSSProperties}
              className={`reveal group panel-subtle hover-card hex-cell p-4 xl:absolute xl:top-(--y) xl:left-(--x) xl:h-1/3 xl:w-1/4 xl:border-0 xl:bg-transparent xl:p-[1.5%] ${
                v.supporting ? 'border-dashed border-gold-400/50' : ''
              }`}
            >
              <div className="relative flex gap-4 lg:flex-col lg:gap-3 xl:size-full xl:flex-col xl:items-center xl:justify-center xl:gap-0 xl:px-[19%] xl:text-center">
                <span className="hidden xl:contents">
                  <HexShape dashed={v.supporting} />
                </span>
                <span className="xl:hidden">
                  <HexIcon icon={Icon} />
                </span>
                <Icon className="relative hidden size-8 text-gold-400 xl:block" strokeWidth={1.6} aria-hidden="true" />
                <div className="relative">
                  <h3 className="font-heading text-base leading-tight font-bold text-white uppercase xl:mt-2 xl:text-[0.95rem] 2xl:text-[1.05rem]">
                    {v.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-muted xl:mt-1.5 xl:text-[0.84rem] 2xl:text-[0.92rem] xl:text-slate-300">{v.text}</p>
                  <DetailButton v={v} onOpen={onOpen} className="-mb-2 xl:-mb-3 xl:min-h-11" />
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
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
          <Honeycomb onOpen={openDetail} />
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
