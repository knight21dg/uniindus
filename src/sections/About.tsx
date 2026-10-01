import { CircleCheckBig } from 'lucide-react'
import { ABOUT, COMPANY, VMV } from '../content/company'
import { Img, SectionHeading } from '../components/ui'
import { Leadership } from './Leadership'

export function About() {
  const FormerlyIcon = ABOUT.formerlyIcon
  return (
    <section id="about" aria-labelledby="about-title" className="theme-light relative overflow-x-clip bg-[#f8fafc]">
      <div className="section-y container-x grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:col-span-5" data-reveal="left">
          <SectionHeading id="about-title" lines={['About', COMPANY.name]} />

          <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-semibold text-white">
            {ABOUT.tagline.map((word, i) => (
              <span key={word} className="flex items-center gap-3">
                {i > 0 && <span className="h-4 w-px bg-gold-400" aria-hidden="true" />}
                {word}
              </span>
            ))}
          </p>

          <p className="lead mt-5 text-slate-200">{ABOUT.description}</p>

          <p className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-full border border-gold-400/70 py-1.5 pr-5 pl-1.5 font-heading font-semibold text-gold-400">
            <span className="icon-ring size-10 bg-navy-950">
              <FormerlyIcon className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            {COMPANY.formerly}
          </p>

          <ul className="mt-8 grid grid-cols-2 gap-3">
            {ABOUT.strengths.map(({ title, text, icon: Icon }) => (
              <li key={title} className="panel-subtle hover-card flex gap-3 p-4">
                <Icon className="size-7 shrink-0 text-gold-400" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="font-heading text-sm font-bold text-gold-400 uppercase">{title}</p>
                  <p className="mt-0.5 text-sm leading-snug text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ul data-reveal="right" className="reveal grid grid-cols-2 gap-3 self-start sm:gap-4 lg:col-span-7 lg:grid-rows-[repeat(2,minmax(0,1fr))_auto]" aria-label="Company imagery">
          {ABOUT.mosaic.map(({ image, caption, sub }, i) => (
            <li
              key={image}
              className={`theme-dark group hover-card relative isolate overflow-hidden rounded-[var(--radius-card)] border border-amber-500/40 shadow-lg ${
                i === 0 ? 'col-span-2 aspect-[16/9] sm:col-span-1 sm:row-span-2 sm:aspect-auto' : 'aspect-[4/3]'
              } ${i === 3 ? 'sm:col-span-2 sm:aspect-[21/8]' : ''}`}
            >
              <Img
                name={image}
                alt=""
                sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="font-heading text-sm leading-tight font-bold text-white uppercase sm:text-base">{caption}</p>
                {sub && <p className="mt-0.5 text-xs text-slate-200 sm:text-sm">{sub}</p>}
                <span className="mt-2 block h-0.5 w-8 bg-gold-400" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <VisionMissionValues />
      <Leadership />
    </section>
  )
}

function VisionMissionValues() {
  const cards = [VMV.vision, VMV.mission]
  const ValuesIcon = VMV.values.icon
  return (
    <div className="theme-dark relative isolate overflow-hidden bg-navy-950">
      <Img name="hero-network" alt="" sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover opacity-45" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-navy-950/70 via-navy-950/85 to-navy-950" />
      <div className="section-y container-x">
        <SectionHeading as="h3" inline lines={VMV.heading} subtitle={VMV.subtitle} align="center" className="reveal" />

        <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-6 lg:gap-8">
          {cards.map(({ title, text, icon: Icon }) => (
            <article key={title} className="reveal panel hover-card relative flex flex-col items-center px-6 pt-14 pb-8 text-center">
              <span className="icon-ring absolute -top-9 size-[4.5rem] border-2 bg-navy-900">
                <Icon className="size-8" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h4 className="font-heading text-2xl font-extrabold tracking-wide text-gold-400 uppercase">{title}</h4>
              <span className="mt-3 block h-0.5 w-10 bg-gold-400" aria-hidden="true" />
              <p className="mt-5 text-lg leading-relaxed text-slate-100">{text}</p>
            </article>
          ))}
          <article className="reveal panel hover-card relative flex flex-col items-center px-6 pt-14 pb-8">
            <span className="icon-ring absolute -top-9 size-[4.5rem] border-2 bg-navy-900">
              <ValuesIcon className="size-8" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h4 className="font-heading text-2xl font-extrabold tracking-wide text-gold-400 uppercase">{VMV.values.title}</h4>
            <span className="mt-3 block h-0.5 w-10 bg-gold-400" aria-hidden="true" />
            <ul className="mt-5 space-y-2.5">
              {VMV.values.items.map((value) => (
                <li key={value} className="flex items-center gap-3 text-lg text-slate-100">
                  <CircleCheckBig className="size-5 shrink-0 text-gold-400" strokeWidth={1.75} aria-hidden="true" />
                  {value}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </div>
  )
}
