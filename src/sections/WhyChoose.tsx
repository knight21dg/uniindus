import type React from 'react'
import { COMPANY, WHY_CHOOSE } from '../content/company'
import { Img, SectionHeading, StrengthStrip } from '../components/ui'

const N = WHY_CHOOSE.points.length
const RADIUS = 34 // % of the wheel's width, to each point's centre
const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / N

function Hub() {
  return (
    <div className="text-center">
      <p className="font-heading text-2xl leading-tight font-extrabold text-white uppercase xl:text-[1.9rem]">
        {COMPANY.nameLines[0]}
        <br />
        {COMPANY.nameLines[1]}
      </p>
      <p className="mt-3 text-xs font-bold tracking-[0.16em] text-gold-400 uppercase xl:text-[0.68rem] xl:tracking-[0.12em]">
        {WHY_CHOOSE.hubMessage.join(' • ')}
      </p>
    </div>
  )
}

/**
 * The PDF p13 wheel. One list serves every width: below 1280px it is a hub card
 * over a grid; from 1280px the same items are placed around the ring.
 */
function Wheel() {
  return (
    <div className="relative mx-auto w-full xl:aspect-square xl:max-w-[56rem]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 hidden size-full xl:block" aria-hidden="true">
        <circle cx="50" cy="50" r="48.5" fill="rgb(11 27 52 / 0.55)" stroke="var(--color-gold-400)" strokeWidth="0.35" />
        <circle cx="50" cy="50" r="19" fill="var(--color-navy-950)" stroke="var(--color-gold-400)" strokeWidth="0.6" />
        {WHY_CHOOSE.points.map((_, i) => {
          const a = angle(i) + Math.PI / N
          return (
            <line
              key={i}
              x1={50 + 19 * Math.cos(a)}
              y1={50 + 19 * Math.sin(a)}
              x2={50 + 48.5 * Math.cos(a)}
              y2={50 + 48.5 * Math.sin(a)}
              stroke="var(--color-gold-400)"
              strokeOpacity="0.55"
              strokeWidth="0.3"
            />
          )
        })}
      </svg>
      <div className="panel mx-auto mb-4 max-w-md rounded-2xl border-gold-400/70 xl:rounded-full px-8 py-7 xl:absolute xl:top-1/2 xl:left-1/2 xl:mb-0 xl:w-[34%] xl:-translate-x-1/2 xl:-translate-y-1/2 xl:border-0 xl:bg-transparent xl:p-0">
        <Hub />
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:block">
        {WHY_CHOOSE.points.map(({ title, text, icon: Icon }, i) => (
          <li
            key={title}
            style={
              {
                '--x': `${50 + RADIUS * Math.cos(angle(i))}%`,
                '--y': `${50 + RADIUS * Math.sin(angle(i))}%`,
              } as React.CSSProperties
            }
            className="reveal panel-subtle hover-card xl-plain flex gap-4 p-4 sm:p-5 xl:absolute xl:top-(--y) xl:left-(--x) xl:block xl:w-[25%] xl:-translate-x-1/2 xl:-translate-y-1/2 xl:border-0 xl:bg-transparent xl:p-0 xl:text-center"
          >
            <Icon className="size-8 shrink-0 text-gold-400 xl:mx-auto" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3 className="font-heading text-base leading-tight font-bold text-gold-400 uppercase xl:mt-2 xl:text-[1.05rem]">{title}</h3>
              <p className="mt-1.5 text-sm leading-snug text-slate-200 xl:text-[0.95rem]">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function WhyChoose() {
  return (
    <section id="why-choose" aria-labelledby="why-title" className="section-y relative overflow-hidden bg-navy-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(253,184,19,0.07),transparent_60%)]"
      />
      <div className="container-x relative">
        <SectionHeading
          id="why-title"
          lines={['Why Choose', COMPANY.name]}
          subtitle={WHY_CHOOSE.subtitle}
          className="reveal"
        />

        <div className="mt-10 grid gap-8 lg:mt-14 xl:grid-cols-12 xl:items-center xl:gap-10">
          <div className="xl:col-span-8">
            <Wheel />
          </div>

          <ul aria-label="Solution areas" className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:col-span-4 xl:grid-cols-1">
            {WHY_CHOOSE.solutionAreas.map(({ title, image, icon: Icon }) => (
              <li
                key={title}
                className="reveal group hover-card relative isolate flex h-36 items-end overflow-hidden rounded-[var(--radius-card)] border border-gold-400/40 sm:h-44 xl:h-[9.375rem] xl:items-center xl:justify-end"
              >
                <Img
                  name={image}
                  alt=""
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 25vw, 50vw"
                  className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-500 group-hover:scale-105 xl:w-[70%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/60 to-transparent xl:bg-linear-to-r xl:from-transparent xl:via-navy-950/85 xl:to-navy-950"
                />
                <div className="flex w-full items-center gap-2.5 p-3 xl:w-[48%] xl:flex-col xl:gap-2 xl:p-4 xl:text-center">
                  <span className="icon-ring size-9 bg-navy-950/60 xl:size-12">
                    <Icon className="size-5 xl:size-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-heading text-sm leading-tight font-bold text-white uppercase xl:text-[0.95rem]">{title}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal mt-10 lg:mt-14">
          <StrengthStrip items={WHY_CHOOSE.trustPoints} label="Why clients work with us" />
        </div>

        <div className="reveal mt-6 flex items-center gap-3 sm:gap-5" role="presentation">
          <span className="hazard hidden h-9 w-16 shrink-0 opacity-80 sm:block" aria-hidden="true" />
          <p className="flex flex-1 flex-col items-center justify-center gap-1 text-center font-heading text-lg font-extrabold tracking-wide text-gold-400 uppercase sm:flex-row sm:gap-4 sm:text-2xl">
            {WHY_CHOOSE.banner.map((part, i) => (
              <span key={part} className="flex items-center gap-4">
                {i > 0 && <span className="hidden size-2 rounded-full bg-gold-400 sm:inline-block" aria-hidden="true" />}
                {part}
              </span>
            ))}
          </p>
          <span className="hazard hidden h-9 w-16 shrink-0 opacity-80 sm:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
