import { useEffect, useRef } from 'react'
import type React from 'react'
import { Award } from 'lucide-react'
import { PARTNERS, PARTNERS_INTRO, PARTNER_STRENGTHS } from '../content/partners'
import { Img, SectionHeading, StrengthStrip } from '../components/ui'

// Three copies of the list, as on the previous live site: the track slides left
// by one copy's width and repeats, so the strip never shows a gap.
const COPIES = 3
/** A card within this many pixels of the strip's centre is the highlighted one. */
const CENTER_RANGE = 230

/**
 * Marks whichever card is passing the centre of the strip, so CSS can enlarge
 * it. One animation-frame loop for the whole strip, running only while the
 * section is on screen, and not at all for reduced-motion visitors.
 */
function useCenterHighlight(stripRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const strip = stripRef.current
    if (!strip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = Array.from(strip.querySelectorAll<HTMLElement>('.partner-card'))
    let frame = 0
    let running = false

    const tick = () => {
      const box = strip.getBoundingClientRect()
      const centre = box.left + box.width / 2
      for (const card of cards) {
        const r = card.getBoundingClientRect()
        const near = Math.abs(r.left + r.width / 2 - centre) < CENTER_RANGE
        if (near !== card.hasAttribute('data-center')) card.toggleAttribute('data-center', near)
      }
      frame = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !running) {
        running = true
        frame = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && running) {
        running = false
        cancelAnimationFrame(frame)
      }
    })
    io.observe(strip)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [stripRef])
}

/**
 * The scrolling partner strip from the previous live site, carrying the eight
 * partners, logos and descriptors of PDF p16.
 */
export function Partners() {
  const stripRef = useRef<HTMLDivElement>(null)
  useCenterHighlight(stripRef)

  return (
    <section id="partners" aria-labelledby="partners-title" className="theme-light relative isolate overflow-hidden border-y border-[#e2e8f0] bg-[#f8fafc]">
      <Img name="hero-network" alt="" sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover opacity-[0.08]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-r from-[#f1f5f9]/90 via-[#ffffff]/80 to-[#f1f5f9]/90" />

      <div className="container-x flex flex-col items-center pt-16 text-center lg:pt-20">
        <p className="reveal mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold tracking-widest text-amber-800 uppercase shadow-sm">
          <Award className="size-4 text-amber-600" aria-hidden="true" />
          Our Key Partners &amp; Collaborators
        </p>
        <SectionHeading
          id="partners-title"
          lines={['Strategic', 'Partnerships & Collaborations']}
          subtitle={PARTNERS_INTRO}
          align="center"
          className="reveal"
        />
      </div>

      <div
        ref={stripRef}
        className="marquee reveal relative mt-6 py-8"
        style={{ '--marquee-copies': COPIES, '--marquee-duration': '48s' } as React.CSSProperties}
        tabIndex={0}
        role="group"
        aria-label="Partners and collaborators"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-40 w-16 bg-linear-to-r from-[#f8fafc] to-transparent sm:w-24" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-40 w-16 bg-linear-to-l from-[#f8fafc] to-transparent sm:w-24" />
        <div className="marquee-track items-center">
          {Array.from({ length: COPIES }, (_, copy) => (
            <ul key={copy} aria-hidden={copy > 0 ? true : undefined} className="flex shrink-0 items-center gap-8 pr-8">
              {PARTNERS.map((p) => (
                <li key={p.name} className="partner-card">
                  {p.photo ? (
                    <img src={p.photo} alt="" loading="lazy" className="w-[42%] shrink-0 border-r border-amber-500/40 object-cover" />
                  ) : (
                    <span className="flex w-[42%] shrink-0 items-center justify-center p-3">
                      <img src={p.logo} alt="" loading="lazy" className="max-h-full max-w-full rounded-sm object-contain" />
                    </span>
                  )}
                  <span className="flex min-w-0 flex-1 flex-col">
                    {p.photo && (
                      <span className="flex h-[52%] shrink-0 items-center justify-center bg-[#ececec] px-3 py-1.5">
                        <img src={p.logo} alt="" loading="lazy" className="max-h-full max-w-full object-contain" />
                      </span>
                    )}
                    <span className="flex flex-1 flex-col justify-center px-3.5 py-2">
                      <span className="text-[0.9rem] leading-snug font-medium text-[#ffffff]">{p.name}</span>
                      {p.descriptor && (
                        <span className="mt-0.5 font-heading text-[0.78rem] leading-snug font-bold text-amber-400 uppercase">
                          {p.descriptor}
                        </span>
                      )}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="container-x pb-16 lg:pb-20">
        <div className="reveal">
          <StrengthStrip items={PARTNER_STRENGTHS} label="What our partnerships bring" />
        </div>
      </div>
    </section>
  )
}
