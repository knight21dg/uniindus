import { COMPANY } from '../content/company'

/** Logo tile + wordmark, as in the reference header. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`grid shrink-0 place-items-center rounded-[10px] bg-white shadow-sm ${
          compact ? 'h-11 w-14' : 'h-11 w-14 lg:h-[58px] lg:w-[88px]'
        }`}
      >
        <img
          src="/images/logo-mark-96.webp"
          srcSet="/images/logo-mark-96.webp 1x, /images/logo-mark-192.webp 2x"
          width={106}
          height={96}
          alt=""
          className={compact ? 'h-8 w-auto' : 'h-8 w-auto lg:h-11'}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-heading font-extrabold tracking-tight text-white ${compact ? 'text-lg' : 'text-lg lg:text-[1.6rem]'}`}>
          {COMPANY.nameLines[0]}
        </span>
        <span className={`mt-1 font-body font-bold tracking-[0.2em] text-gold-400 ${compact ? 'text-[0.62rem]' : 'text-[0.62rem] lg:text-[0.8rem]'}`}>
          {COMPANY.nameLines[1]}
        </span>
      </span>
    </span>
  )
}
