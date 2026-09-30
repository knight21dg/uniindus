import { ArrowRight, CircleCheckBig, ShieldCheck } from 'lucide-react'
import { COMPANY, HERO, SERVING_INDUSTRIES } from '../content/company'
import { Img } from '../components/ui'

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title">
      <div className="relative isolate flex min-h-[max(640px,100svh)] items-center overflow-hidden bg-navy-950 pt-24 pb-14 lg:pt-[112px] lg:pb-16">
        <Img
          name="hero-rig"
          alt=""
          priority
          sizes="100vw"
          className="absolute inset-0 -z-20 size-full object-cover object-[55%_45%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,16,31,0.78)_0%,rgba(6,16,31,0.5)_42%,rgba(6,16,31,0.62)_72%,rgba(6,16,31,0.96)_100%)]"
        />

        <div className="container-x flex flex-col items-center text-center">
          <p className="inline-flex min-h-12 items-center gap-3 rounded-full border border-gold-400/80 bg-navy-900/80 py-1.5 pr-5 pl-1.5 sm:min-h-14 sm:pr-7">
            <span className="grid size-9 place-items-center rounded-full bg-white sm:size-10">
              <img src="/images/logo-mark-96.webp" width={106} height={96} alt="" className="h-6 w-auto sm:h-7" />
            </span>
            <span className="text-xs font-bold tracking-[0.25em] text-gold-400 uppercase sm:text-base">{COMPANY.motto}</span>
          </p>

          <h1
            id="hero-title"
            className="mt-8 font-heading text-[clamp(2.6rem,9vw,5.5rem)] leading-[1.05] font-extrabold tracking-[-0.02em] sm:mt-10"
          >
            <span className="block text-white">{COMPANY.nameLines[0]}</span>
            <span className="block bg-linear-to-b from-gold-300 to-gold-400 bg-clip-text text-transparent">
              {COMPANY.nameLines[1]}
            </span>
          </h1>

          <p className="mt-6 max-w-[860px] text-lg leading-snug font-light text-white/90 text-balance sm:mt-9 sm:text-2xl lg:text-[1.875rem] lg:leading-[1.35]">
            {HERO.subtitle}
          </p>

          <ul className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-11 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:gap-7">
            {HERO.chips.map((chip) => (
              <li key={chip} className="chip justify-center">
                <CircleCheckBig className="size-5 text-gold-400 sm:size-6" strokeWidth={1.75} aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex w-full flex-col gap-4 sm:mt-12 sm:w-auto sm:flex-row sm:gap-5">
            <a href="#verticals" className="btn btn-primary min-h-[52px] sm:min-h-[70px] sm:px-10 sm:text-xl">
              Explore Solutions
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a href="#about" className="btn btn-secondary min-h-[52px] sm:min-h-[70px] sm:px-10 sm:text-xl">
              <ShieldCheck className="size-5 text-gold-400" aria-hidden="true" />
              About Our Company
            </a>
          </div>
        </div>
      </div>

      <IndustryBar />
    </section>
  )
}

/** The gold "Serving Industries" bar from the foot of every PDF page. */
export function IndustryBar() {
  return (
    <div className="bg-linear-to-r from-gold-500 via-gold-400 to-gold-500 text-navy-950">
      <div className="container-x flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:gap-0 lg:py-0">
        <p className="font-heading text-sm font-extrabold tracking-wide uppercase lg:min-h-[72px] lg:border-r lg:border-navy-950/30 lg:pr-8 lg:leading-[72px]">
          Serving Industries
        </p>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3 md:flex md:flex-1 md:justify-between lg:pl-4">
          {SERVING_INDUSTRIES.map(({ name, icon: Icon }, i) => (
            <li
              key={name}
              className={`flex min-h-10 items-center gap-2.5 font-heading text-sm font-bold uppercase md:flex-1 md:justify-center lg:min-h-[72px] ${
                i > 0 ? 'md:border-l md:border-navy-950/30' : ''
              }`}
            >
              <Icon className="size-6 shrink-0 lg:size-7" strokeWidth={1.75} aria-hidden="true" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
