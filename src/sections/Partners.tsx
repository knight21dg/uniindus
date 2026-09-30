import { PARTNERS, PARTNERS_INTRO, PARTNER_STRENGTHS } from '../content/partners'
import { Img, SectionHeading, StrengthStrip } from '../components/ui'

/** Laid out as on PDF p16: photo, white logo panel, then name and rig in gold. */
export function Partners() {
  return (
    <section id="partners" aria-labelledby="partners-title" className="relative isolate overflow-hidden bg-navy-900">
      <Img name="hero-network" alt="" sizes="100vw" className="absolute inset-x-0 top-0 -z-20 h-[520px] w-full object-cover opacity-50" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-navy-900/60 via-navy-900/95 to-navy-900" />

      <div className="section-y container-x">
        <SectionHeading
          id="partners-title"
          lines={['Strategic', 'Partnerships & Collaborations']}
          subtitle={PARTNERS_INTRO}
          className="reveal"
        />

        <p className="reveal mt-10 flex items-center gap-4 text-sm font-bold tracking-[0.2em] text-gold-400 uppercase lg:mt-12">
          <span className="h-px flex-1 bg-gold-400/40" aria-hidden="true" />
          Our Key Partners &amp; Collaborators
          <span className="h-px flex-1 bg-gold-400/40" aria-hidden="true" />
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {PARTNERS.map((p, i) => (
            <li
              key={p.name}
              className={`reveal panel flex overflow-hidden border-gold-400/60 transition-colors hover:border-gold-400 ${
                i < 6 ? 'lg:col-span-2' : 'lg:col-span-3'
              }`}
            >
              {p.photo ? (
                <img
                  src={p.photo}
                  alt=""
                  loading="lazy"
                  className="w-[44%] shrink-0 border-r border-gold-400/40 object-cover"
                />
              ) : (
                <span className="flex w-[44%] shrink-0 items-center justify-center p-3">
                  <img src={p.logo} alt={`${p.short} logo`} loading="lazy" className="max-h-28 w-full rounded-sm object-contain" />
                </span>
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                {p.photo && (
                  <span className="flex h-20 items-center justify-center bg-[#ececec] px-3 sm:h-24">
                    <img src={p.logo} alt={`${p.short} logo`} loading="lazy" className="max-h-full w-full object-contain" />
                  </span>
                )}
                <div className="flex flex-1 flex-col justify-center p-3 sm:p-4">
                  <h3 className="text-[0.95rem] leading-snug font-medium text-white">{p.name}</h3>
                  {p.descriptor && (
                    <p className="mt-1 font-heading text-[0.85rem] leading-snug font-bold text-gold-400 uppercase">{p.descriptor}</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="reveal mt-8">
          <StrengthStrip items={PARTNER_STRENGTHS} label="What our partnerships bring" />
        </div>
      </div>
    </section>
  )
}
