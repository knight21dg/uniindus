import { Award, BarChart3, Cog, Globe, Handshake, ShieldCheck } from 'lucide-react'
import { LEADERSHIP, LEADERSHIP_QUOTE, PEOPLE } from '../content/contact'
import { SectionHeading } from '../components/ui'
import { OilRig } from '../components/icons'

const THEME_ICONS = [OilRig, Cog, Handshake, BarChart3, ShieldCheck, Globe]

/** "Our Core Leadership Team", laid out as on PDF p14. */
export function Leadership() {
  const leaders = LEADERSHIP.order.map((name) => PEOPLE.find((p) => p.name === name)!)
  return (
    <div id="leadership" data-anchor className="border-t border-gold-400/15 bg-navy-900">
      <div className="section-y container-x">
        <SectionHeading as="h3" lines={LEADERSHIP.heading} subtitle={<em className="text-slate-100">{LEADERSHIP.tagline}</em>} className="reveal" />

        <ul className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {leaders.map((p) => (
            <li key={p.name} className="reveal panel flex flex-col p-5 sm:p-6">
              <div className="flex items-center gap-5 border-b border-gold-400/30 pb-5">
                <img
                  src={p.photo}
                  alt={`Portrait of ${p.name}`}
                  width={152}
                  height={152}
                  loading="lazy"
                  className="size-24 shrink-0 rounded-full border-2 border-gold-400 bg-slate-200 object-cover sm:size-28"
                />
                <div className="min-w-0">
                  <h4 className="font-heading text-xl font-bold tracking-wide text-white uppercase">{p.name}</h4>
                  <span className="mt-2 flex items-center" aria-hidden="true">
                    <span className="h-0.5 flex-1 bg-gold-400" />
                    <span className="size-2 rounded-full bg-gold-400" />
                  </span>
                  <p className="mt-2 font-heading text-base leading-snug font-semibold text-gold-400">{p.role}</p>
                </div>
              </div>
              <p className="mx-auto -mt-3.5 rounded-full bg-gold-400 px-5 py-1 font-heading text-sm font-extrabold tracking-wide text-navy-950 uppercase">
                Core Expertise
              </p>
              <ul className="mt-4 space-y-2.5">
                {p.expertise.map((x) => (
                  <li key={x} className="flex items-center gap-3 text-slate-100">
                    <Award className="size-4 shrink-0 text-gold-400" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <ul aria-label="Leadership strengths" className="reveal mt-8 grid grid-cols-2 gap-y-4 border-b border-gold-400/30 pb-6 sm:grid-cols-3 lg:grid-cols-6 lg:divide-x lg:divide-gold-400/40">
          {LEADERSHIP.themes.map((t, i) => {
            const Icon = THEME_ICONS[i]
            return (
              <li key={t} className="flex items-center gap-3 px-3 text-sm font-semibold tracking-wide text-slate-100 uppercase">
                <Icon className="size-8 shrink-0 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
                {t}
              </li>
            )
          })}
        </ul>

        <blockquote className="reveal mx-auto mt-6 flex max-w-4xl gap-4 text-center text-lg leading-relaxed text-slate-100 italic sm:text-xl">
          <span className="font-heading text-5xl leading-none text-gold-400 not-italic" aria-hidden="true">“</span>
          <p>{LEADERSHIP_QUOTE}</p>
          <span className="self-end font-heading text-5xl leading-none text-gold-400 not-italic" aria-hidden="true">”</span>
        </blockquote>
      </div>
    </div>
  )
}
