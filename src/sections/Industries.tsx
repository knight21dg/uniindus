import { INDUSTRIES, INDUSTRIES_BANNER, INDUSTRIES_INTRO, INDUSTRY_STRENGTHS } from '../content/industries'
import { SectionHeading, StrengthChips } from '../components/ui'

/** Laid out as on PDF p12: panorama beside the heading, then five image cards. */
export function Industries() {
  return (
    <section id="industries" aria-labelledby="industries-title" className="theme-light relative bg-[#f1f5f9]">
      <div className="theme-dark relative isolate overflow-hidden bg-navy-950">
        <img
          src={INDUSTRIES_BANNER}
          alt=""
          width={824}
          height={320}
          loading="lazy"
          className="absolute inset-y-0 right-0 -z-20 h-full w-full object-cover object-right opacity-60 lg:w-[70%] lg:opacity-100"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-linear-to-b from-navy-950/60 to-navy-950 lg:bg-linear-to-r lg:from-navy-950 lg:via-navy-950/70 lg:to-transparent"
        />
                <div className="container-x pt-14 pb-16 sm:pt-[4.5rem] lg:pt-24 lg:pb-28">
          <SectionHeading id="industries-title" lines={['Industries', 'We Serve']} subtitle={INDUSTRIES_INTRO} className="reveal max-w-md" />
        </div>
      </div>

      <div className="container-x pb-14 sm:pb-[4.5rem] lg:pb-24">
        <ul className="-mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:-mt-12 xl:grid-cols-5">
          {INDUSTRIES.map(({ name, icon: Icon, image, items }) => (
            <li
              key={name}
              className="theme-dark reveal group relative isolate min-h-[20.625rem] overflow-hidden rounded-[var(--radius-card)] border border-amber-500/60 bg-navy-900 shadow-lg hover-card"
            >
              <img
                src={image}
                alt=""
                loading="lazy"
                className="absolute top-0 right-0 -z-10 h-[62%] w-[78%] object-cover opacity-90 [mask-image:linear-gradient(to_left,black_45%,transparent),linear-gradient(to_top,transparent,black_40%)] [mask-composite:intersect] transition-transform duration-700 group-hover:scale-105"
              />
              <div className="flex items-center gap-3 p-4">
                <span className="icon-ring size-12 border-2 bg-navy-950/80">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="font-heading text-lg font-bold text-white uppercase drop-shadow xl:text-[1.05rem]">{name}</h3>
              </div>
              <ul className="space-y-1.5 px-4 pt-16 pb-5 xl:pt-24">
                {items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-snug text-slate-100 [text-shadow:0_1px_3px_rgb(6_16_31)]">
                    <span className="mt-[7px] size-1.5 shrink-0 rounded-full bg-gold-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <StrengthChips items={INDUSTRY_STRENGTHS} label="What every industry gets" className="reveal mt-10 justify-center" />
      </div>
    </section>
  )
}
